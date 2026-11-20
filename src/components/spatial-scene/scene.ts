import * as THREE from 'three';
import { cameraPose, clamp, phaseAt, type LabSettings } from './trajectory';
import { createSpatialBand } from './volume';
import { immersiveMotion } from '../immersive-home/config';

type Options = {
  mount: HTMLDivElement;
  journey: HTMLDivElement;
  getSettings: () => LabSettings;
  isPaused: () => boolean;
  onStatus: (text: string) => void;
  onTelemetry: (text: string) => void;
  getProgress?: () => number;
  profile?: 'lab' | 'home' | 'immersive';
  getOrbFrame?: () => DOMRect | null;
};

export function createMotionScene({ mount, journey, getSettings, isPaused, onStatus, onTelemetry, getProgress, getOrbFrame, profile = 'lab' }: Options) {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
  } catch {
    onStatus('Vista estática · WebGL no disponible');
    mount.dataset.mode = 'fallback';
    return () => {};
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const compact = window.matchMedia('(max-width: 760px)');
  const limited = (navigator.hardwareConcurrency || 4) <= 4;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07100b, .023);
  const camera = new THREE.PerspectiveCamera(57, 1, .1, 160);
  const target = new THREE.Vector3();
  const pointer = new THREE.Vector2();
  const cursor = new THREE.Vector2();
  const neutral = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const vertex = new THREE.Vector3();
  const closest = new THREE.Vector3();
  const orbDirection = new THREE.Vector3();
  const clock = { time: 0, previous: 0, progress: 0, lastReport: -Infinity, count: 0, drawn: 0, sum: 0 };
  let frame = 0, disposed = false, visible = true, lost = false, pointerActive = false;
  let width = 1, height = 1, lastDraw = 0, quality = 1, lastCount = -1, pointerWeight = 0;
  let volumeKey = '', orbHover = 0;
  const worldBands = new Map<number, ReturnType<typeof createSpatialBand>>();

  renderer.setClearColor(0x060b09, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.dataset.motionCanvas = 'true';
  mount.appendChild(renderer.domElement);
  mount.dataset.mode = 'webgl';

  // One deterministic volume. Z never wraps as the camera passes a node.
  const maximum = 900;
  let seed = 9719;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 4294967296; };
  const nodes = Array.from({ length: maximum }, () => {
    const angle = random() * Math.PI * 2;
    const radius = 3 + Math.pow(random(), .6) * 20;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * .53, z: random(), phase: random() * Math.PI * 2, speed: .3 + random() * .65, size: 4 + random() * 5 };
  });
  const positions = new Float32Array(maximum * 3);
  const sizes = new Float32Array(nodes.map(node => node.size));
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  const material = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uPixelRatio: { value: 1 }, uOpacity: { value: 1 } },
    vertexShader: `attribute float aSize; uniform float uPixelRatio; varying float vDistance;
      void main(){vec4 view=modelViewMatrix*vec4(position,1.0); vDistance=-view.z;
      gl_PointSize=clamp(aSize*uPixelRatio*(18.0/max(1.0,-view.z)),1.0,32.0*uPixelRatio);
      gl_Position=projectionMatrix*view;}`,
    fragmentShader: `uniform float uOpacity; varying float vDistance;
      void main(){float d=length(gl_PointCoord-.5)*2.0; if(d>1.0)discard;
      float core=exp(-d*d*13.0);float halo=pow(1.0-d,2.2)*.5;
      float nearFade=smoothstep(.6,2.8,vDistance);float fog=exp(-vDistance*.019);
      gl_FragColor=vec4(mix(vec3(.61,.90,.23),vec3(.92,1.0,.75),core), (core+halo)*fog*nearFade*uOpacity);}`,
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);

  // A bounded neighbour graph, sorted by highest node index for density changes.
  const pairs: [number, number][] = [];
  for (let i = 1; i < maximum; i++) {
    let found = 0;
    for (let j = i - 1; j >= 0 && found < 1; j--) {
      const a = nodes[i], b = nodes[j];
      if (Math.hypot(a.x - b.x, a.y - b.y, (a.z - b.z) * 64) < 4.8) { pairs.push([i, j]); found++; }
    }
  }
  const linePositions = new Float32Array(maximum * 6);
  const linesGeometry = new THREE.BufferGeometry();
  linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
  const linesMaterial = new THREE.LineBasicMaterial({ color: 0xa3e635, transparent: true, opacity: .1, depthWrite: false, blending: THREE.AdditiveBlending });
  const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
  lines.frustumCulled = false;
  scene.add(lines);

  // A real mesh provides a spatial landmark and makes orientation/lighting legible.
  const landmark = new THREE.Group();
  const coreGeometry = new THREE.IcosahedronGeometry(2.8, 1);
  const coreMaterial = new THREE.MeshStandardMaterial(profile === 'immersive' ? {
    color: 0x6b874b, transparent: true, opacity: .18, depthWrite: true,
    polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
    roughness: .26, metalness: .18, flatShading: true,
    emissive: 0x3f5b29, emissiveIntensity: .12,
  } : { color: 0x46652a, roughness: .32, metalness: .55, flatShading: true, emissive: 0x37551a, emissiveIntensity: .3 });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  const edgesGeometry = new THREE.EdgesGeometry(coreGeometry);
  const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xb4f254, transparent: true, opacity: profile === 'immersive' ? .23 : .38 });
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  if (profile === 'immersive') { core.renderOrder = 1; edges.renderOrder = 2; }
  landmark.add(core, edges);
  let orbNodesGeometry: THREE.BufferGeometry | null = null;
  if (profile === 'immersive') {
    // Icosahedron triangles repeat vertices; one light per unique corner avoids hot spots.
    const corners = new Map<string, [number, number, number]>();
    const vertices = coreGeometry.attributes.position;
    for (let i = 0; i < vertices.count; i++) {
      const point: [number, number, number] = [vertices.getX(i), vertices.getY(i), vertices.getZ(i)];
      corners.set(point.map(value => value.toFixed(5)).join(':'), point);
    }
    orbNodesGeometry = new THREE.BufferGeometry();
    orbNodesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(Array.from(corners.values()).flat(), 3));
    orbNodesGeometry.setAttribute('aSize', new THREE.Float32BufferAttribute(Array(corners.size).fill(5.5), 1));
    const orbNodes = new THREE.Points(orbNodesGeometry, material);
    orbNodes.name = 'orb-vertices';
    orbNodes.renderOrder = 3;
    landmark.add(orbNodes);
  }
  landmark.position.set(5.8, .8, -9);
  if (profile === 'home') { landmark.position.x = 8; landmark.scale.setScalar(.82); }
  scene.add(landmark);
  const key = new THREE.PointLight(profile === 'immersive' ? 0xe0f2dc : 0xb6f75a, 220, 45, 2);
  key.position.set(3, 6, 0);
  const rim = new THREE.PointLight(0x67cba6, 40, 35, 2);
  rim.position.set(10, -1, -14);
  scene.add(key, rim, new THREE.AmbientLight(0x6b9864, .6));

  // Low, receding topography gives the field a horizon without external assets.
  const groundGeometry = new THREE.PlaneGeometry(75, 110, 36, 50);
  groundGeometry.rotateX(-Math.PI / 2);
  const groundPositions = groundGeometry.attributes.position;
  for (let i = 0; i < groundPositions.count; i++) {
    const x = groundPositions.getX(i), z = groundPositions.getZ(i);
    groundPositions.setY(i, -8 + Math.sin(x * .18 + z * .08) * Math.cos(z * .17) * Math.min(3, Math.abs(x) * .13));
  }
  groundGeometry.computeVertexNormals();
  const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x83b748, wireframe: true, transparent: true, opacity: .035, depthWrite: false });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.position.z = -32;
  scene.add(ground);

  function active() { return !disposed && !lost && visible && !document.hidden; }
  function moving() { return !reduced.matches && !isPaused(); }
  function report() {
    onStatus(reduced.matches ? 'Movimiento reducido · vista estática' : isPaused() ? 'Movimiento pausado' : `WebGL activo · ${clock.count} partículas · DPR ${renderer.getPixelRatio().toFixed(1)}`);
  }
  function resize() {
    const rect = mount.getBoundingClientRect();
    width = Math.max(1, rect.width); height = Math.max(1, rect.height);
    const ratio = Math.min(window.devicePixelRatio || 1, compact.matches || limited ? 1.25 : 1.75) * quality;
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    material.uniforms.uPixelRatio.value = ratio;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    wake();
  }
  function progress() {
    if (getProgress) return clamp(getProgress());
    const rect = journey.getBoundingClientRect();
    return clamp(-rect.top / Math.max(1, journey.offsetHeight - height));
  }
  function draw(now: number) {
    frame = 0;
    if (!active()) return;
    const animated = moving();
    const delta = clock.previous ? Math.min(.05, (now - clock.previous) / 1000) : 1 / 60;
    clock.previous = now;
    if (animated && now - lastDraw < (compact.matches ? 31 : profile === 'immersive' ? 15 : 0)) { frame = requestAnimationFrame(draw); return; }
    const dt = Math.min(.065, (now - lastDraw) / 1000 || delta);
    lastDraw = now;
    const settings = getSettings();
    if (profile === 'immersive') {
      const bounds = journey.getBoundingClientRect();
      journey.style.setProperty('--scene-clip-top', `${Math.max(0, bounds.top)}px`);
      journey.style.setProperty('--scene-clip-bottom', `${Math.max(0, height - bounds.bottom)}px`);
    }
    const blend = 1 - Math.exp(-dt * 13);
    const raw = progress();
    if (animated) {
      clock.time += dt * settings.ambient;
      clock.progress += (raw - clock.progress) * blend;
      cursor.lerp(pointerActive && fine.matches ? pointer : neutral, blend);
      pointerWeight += ((pointerActive && fine.matches ? 1 : 0) - pointerWeight) * blend;
    } else if (reduced.matches) { clock.progress = 0; cursor.set(0, 0); pointerWeight = 0; }
    const pose = profile === 'immersive' ? {
      x: Math.sin(clock.progress * Math.PI * 5) * 1.6,
      y: 1.1 + Math.sin(clock.progress * Math.PI * 4) * .45,
      z: 16 - clock.progress * immersiveMotion.cameraTravel * settings.camera,
      targetX: Math.sin(clock.progress * Math.PI * 5) * 1.1, targetY: .3, fade: 1,
    } : cameraPose(clock.progress, settings.camera * (compact.matches ? .7 : 1), settings.depth);
    camera.position.set(pose.x, pose.y, pose.z);
    target.set(pose.targetX, pose.targetY, pose.z - 22);
    camera.lookAt(target);
    camera.updateMatrixWorld();
    raycaster.setFromCamera(cursor, camera);
    const cap = compact.matches ? 300 : limited ? 460 : 900;
    const count = Math.min(Math.round(cap * quality), settings.density);
    if (profile === 'immersive') {
      const bandLength = settings.depth / 3;
      const first = Math.floor((16 - camera.position.z) / bandLength) - 1;
      const perBand = Math.ceil(count / 4);
      const key = `${first}:${perBand}:${settings.depth}`;
      if (key !== volumeKey) {
        if (!volumeKey.endsWith(`:${perBand}:${settings.depth}`)) worldBands.clear();
        volumeKey = key;
        for (const band of worldBands.keys()) if (band < first || band > first + 3) worldBands.delete(band);
        for (let i = 0; i < count; i++) {
          const band = first + Math.floor(i / perBand);
          if (!worldBands.has(band)) worldBands.set(band, createSpatialBand(band, perBand, bandLength));
          const node = worldBands.get(band)![i % perBand];
          nodes[i] = { ...node, z: (8 - node.worldZ) / settings.depth };
          sizes[i] = node.size;
        }
        pairs.length = 0;
        for (let i = 1; i < count; i++) for (let j = i - 1; j >= 0; j--) {
          const a = nodes[i], b = nodes[j];
          if (Math.hypot(a.x - b.x, a.y - b.y, (a.z - b.z) * settings.depth) < 4.6) { pairs.push([i, j]); break; }
        }
        linesGeometry.setDrawRange(0, pairs.length * 2);
        geometry.attributes.aSize.needsUpdate = true;
      }
    }
    if (count !== lastCount) {
      geometry.setDrawRange(0, count);
      linesGeometry.setDrawRange(0, pairs.filter(pair => pair[0] < count).length * 2);
      clock.count = lastCount = count;
      report();
    }
    for (let i = 0; i < count; i++) {
      const node = nodes[i], t = clock.time * node.speed;
      vertex.set(node.x + Math.sin(t * .43 + node.phase) * .65, node.y + Math.cos(t * .37 + node.phase) * .55, 8 - node.z * settings.depth + Math.sin(t * .25 + node.phase) * .35);
      if (animated && pointerWeight > .001 && settings.mouse > 0) {
        raycaster.ray.closestPointToPoint(vertex, closest);
        const distance = vertex.distanceTo(closest);
        if (distance < 2.8 && vertex.z < camera.position.z) {
          const strength = Math.pow(1 - distance / 2.8, 2) * settings.mouse * .85 * pointerWeight;
          vertex.x += (vertex.x - closest.x) * strength;
          vertex.y += (vertex.y - closest.y) * strength;
        }
      }
      positions[i * 3] = vertex.x; positions[i * 3 + 1] = vertex.y; positions[i * 3 + 2] = vertex.z;
    }
    geometry.attributes.position.needsUpdate = true;
    for (let k = 0; k < pairs.length && pairs[k][0] < count; k++) {
      const [a, b] = pairs[k];
      for (let axis = 0; axis < 3; axis++) { linePositions[k * 6 + axis] = positions[a * 3 + axis]; linePositions[k * 6 + 3 + axis] = positions[b * 3 + axis]; }
    }
    linesGeometry.attributes.position.needsUpdate = true;
    landmark.position.z = -settings.depth * .17;
    landmark.rotation.set(.25 + clock.time * .065, clock.time * .11 + clock.progress * .9, -.16);
    if (profile === 'immersive' && getOrbFrame) {
      const rect = getOrbFrame();
      landmark.visible = !!rect && rect.bottom > 0 && rect.top < height && rect.width > 0;
      if (rect && landmark.visible) {
        const distance = 14;
        orbDirection.set((rect.left + rect.width / 2) / width * 2 - 1, -(rect.top + rect.height / 2) / height * 2 + 1, .5).unproject(camera).sub(camera.position).normalize();
        landmark.position.copy(camera.position).addScaledVector(orbDirection, distance);
        const viewDepth = -vertex.copy(landmark.position).applyMatrix4(camera.matrixWorldInverse).z;
        const radius = Math.min(rect.width, rect.height) * .31 * (2 * viewDepth * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / height);
        landmark.scale.setScalar(radius / 2.8);
        const hit = pointerWeight > .01 && raycaster.ray.distanceToPoint(landmark.position) < radius * 1.15;
        orbHover += ((hit ? 1 : 0) - orbHover) * blend;
        landmark.lookAt(camera.position);
        landmark.rotateX(.2 + Math.sin(clock.time * .23) * .08 - cursor.y * immersiveMotion.orbMouseRotation * orbHover);
        landmark.rotateY(clock.time * .065 + cursor.x * immersiveMotion.orbMouseRotation * orbHover + clock.progress * .2);
        landmark.rotateZ(Math.sin(clock.time * .19) * .035);
        landmark.position.x += Math.sin(clock.time * .22) * .025;
        landmark.position.y += Math.sin(clock.time * .36) * .04;
        landmark.position.x += cursor.x * immersiveMotion.orbMouseOffset * orbHover;
        landmark.position.y += cursor.y * immersiveMotion.orbMouseOffset * orbHover;
        coreMaterial.emissiveIntensity = .12 + orbHover * .05;
        coreMaterial.roughness = .26 - orbHover * .04;
        key.intensity = 340; rim.intensity = 100;
        key.position.copy(landmark.position).add(new THREE.Vector3(-4 + cursor.x, 6, 9));
        rim.position.copy(landmark.position).add(new THREE.Vector3(5, -1, -1));
      }
    }
    const opacity = reduced.matches ? 1 : pose.fade;
    mount.style.opacity = String(opacity);
    renderer.render(scene, camera);
    clock.drawn++;
    if (now - clock.lastReport > 300) {
      onTelemetry(`${phaseAt(raw)} · cámara Z ${pose.z.toFixed(1)} · ${Math.round(raw * 100)} %`);
      Object.assign(renderer.domElement.dataset, { cameraZ: pose.z.toFixed(4), cameraX: pose.x.toFixed(4), progress: raw.toFixed(4), ambientTime: clock.time.toFixed(4), renderedFrames: String(clock.drawn), particles: String(count), reduced: String(reduced.matches), paused: String(isPaused()), drawCalls: String(renderer.info.render.calls), profile, worldBands: String(worldBands.size), orbVisible: String(landmark.visible), orbHover: orbHover.toFixed(3) });
      clock.lastReport = now;
    }
    // Downshift only; no quality oscillation during a session.
    if (animated && clock.drawn > 40 && !compact.matches) {
      clock.sum += dt;
      if (clock.drawn % 120 === 0) {
        if (clock.sum / 120 > .027 && quality > .65) { quality = Math.max(.65, quality - .15); resize(); }
        clock.sum = 0;
      }
    }
    const restingAtEnd = profile === 'home' && raw >= 1 && clock.progress > .9999;
    if (animated && !frame && !restingAtEnd) frame = requestAnimationFrame(draw);
  }
  function wake() { if (active() && !frame) frame = requestAnimationFrame(draw); }
  function stop() { cancelAnimationFrame(frame); frame = 0; clock.previous = 0; lastDraw = 0; }
  function sync() { stop(); clock.lastReport = -Infinity; report(); wake(); }
  function visibility() { if (document.hidden) stop(); else { clock.previous = 0; wake(); } }
  function scroll() { if (profile === 'immersive' || (profile === 'home' && moving() && progress() < 1)) wake(); }
  function pointerMove(event: PointerEvent) {
    if (!fine.matches || event.pointerType === 'touch' || !moving()) return;
    const rect = mount.getBoundingClientRect();
    pointer.set((event.clientX - rect.left) / width * 2 - 1, -(event.clientY - rect.top) / height * 2 + 1);
    pointerActive = true;
  }
  function pointerLeave() { pointerActive = false; }
  function contextLost(event: Event) {
    event.preventDefault(); lost = true; stop();
    mount.dataset.mode = 'fallback'; renderer.domElement.style.visibility = 'hidden';
    onStatus('Vista estática · contexto WebGL interrumpido');
  }
  function contextRestored() { lost = false; mount.dataset.mode = 'webgl'; renderer.domElement.style.visibility = ''; sync(); }
  const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) wake(); else stop(); });
  const sizeObserver = new ResizeObserver(resize);
  observer.observe(profile === 'immersive' ? journey : mount);
  sizeObserver.observe(mount);
  reduced.addEventListener('change', sync);
  fine.addEventListener('change', sync);
  compact.addEventListener('change', resize);
  document.addEventListener('visibilitychange', visibility);
  if (profile !== 'lab') window.addEventListener('scroll', scroll, { passive: true });
  journey.addEventListener('pointermove', pointerMove, { passive: true });
  journey.addEventListener('pointerleave', pointerLeave);
  mount.addEventListener('labsettings', sync);
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
  resize(); report();

  return () => {
    disposed = true; stop(); observer.disconnect(); sizeObserver.disconnect();
    reduced.removeEventListener('change', sync); fine.removeEventListener('change', sync); compact.removeEventListener('change', resize);
    document.removeEventListener('visibilitychange', visibility);
    if (profile !== 'lab') window.removeEventListener('scroll', scroll);
    journey.removeEventListener('pointermove', pointerMove); journey.removeEventListener('pointerleave', pointerLeave);
    mount.removeEventListener('labsettings', sync);
    renderer.domElement.removeEventListener('webglcontextlost', contextLost);
    renderer.domElement.removeEventListener('webglcontextrestored', contextRestored);
    [geometry, linesGeometry, coreGeometry, edgesGeometry, groundGeometry].forEach(resource => resource.dispose());
    orbNodesGeometry?.dispose();
    [material, linesMaterial, coreMaterial, edgesMaterial, groundMaterial].forEach(resource => resource.dispose());
    scene.clear(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    worldBands.clear();
    if (profile === 'immersive') { journey.style.removeProperty('--scene-clip-top'); journey.style.removeProperty('--scene-clip-bottom'); }
    delete mount.dataset.mode; mount.style.removeProperty('opacity');
  };
}
