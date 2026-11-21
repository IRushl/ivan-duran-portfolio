import { motionPreferenceEvent, readMotionPreference } from '@/lib/motion-preference';

const clamp=(value:number)=>Math.max(0,Math.min(1,value));
export function processStoryPose(progress:number) {
  const position=clamp(Number.isFinite(progress)?progress:0)*2;
  const active=Math.min(2,Math.floor(position+.5));
  return {active,visualY:Math.max(-24,Math.min(24,(position-active)*40))};
}

/** Natural scroll drives a short sticky interval. No scroll commands or persistent RAF. */
export function mountProcessStory(root:HTMLElement) {
  const frame=root.querySelector<HTMLElement>('[data-story-frame]');
  const panels=[...root.querySelectorAll<HTMLElement>('[data-story-panel]')];
  const counter=root.querySelector<HTMLElement>('[data-story-counter]');
  if(!frame||panels.length!==3||!counter)return()=>{};
  const desktop=window.matchMedia('(min-width:1000px) and (min-height:700px)');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let raf=0,visible=false,enabled=false,top=98,lastActive=-1;
  const entries=new Map<HTMLElement,Animation>();
  const stopEntries=()=>{entries.forEach(animation=>animation.cancel());entries.clear()};
  const cancel=()=>{if(raf)cancelAnimationFrame(raf);raf=0};
  const draw=()=>{
    raf=0;
    if(!enabled||document.hidden)return;
    const range=Math.max(1,root.offsetHeight-frame.offsetHeight);
    const pose=processStoryPose((top-root.getBoundingClientRect().top)/range);
    root.dataset.stage=String(pose.active+1);
    counter.textContent=String(pose.active+1).padStart(2,'0');
    const changed=lastActive!==pose.active;
    const direction=pose.active>=lastActive?1:-1;
    if(changed)stopEntries();
    panels.forEach((panel,index)=>{
      panel.style.setProperty('--story-opacity',String(index===pose.active?1:0));
      panel.style.setProperty('--story-visual-y',`${pose.visualY}px`);
      if(changed&&lastActive!==-1&&index===pose.active&&typeof panel.animate==='function') {
        entries.set(panel,panel.animate([{opacity:.5,transform:`translateY(${direction*8}px)`},{opacity:1,transform:'none'}],{duration:360,easing:'cubic-bezier(.2,.65,.3,1)',fill:'backwards'}));
      }
    });
    lastActive=pose.active;
  };
  const schedule=()=>{if(enabled&&visible&&!document.hidden&&!raf)raf=requestAnimationFrame(draw)};
  const sync=()=>{
    cancel();stopEntries();enabled=desktop.matches&&!reduced.matches&&!readMotionPreference();
    lastActive=-1;
    root.dataset.enhanced=String(enabled);
    top=Number.parseFloat(getComputedStyle(frame).top)||98;
    if(enabled)draw();
  };
  const visibility=()=>{if(document.hidden){cancel();stopEntries()}else schedule()};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)schedule();else{cancel();stopEntries()}});
  observer.observe(root);
  const resize=new ResizeObserver(sync);resize.observe(root);resize.observe(frame);
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',sync,{passive:true});
  document.addEventListener('visibilitychange',visibility);document.addEventListener(motionPreferenceEvent,sync);
  desktop.addEventListener('change',sync);reduced.addEventListener('change',sync);sync();
  return()=>{
    cancel();stopEntries();observer.disconnect();resize.disconnect();
    window.removeEventListener('scroll',schedule);window.removeEventListener('resize',sync);
    document.removeEventListener('visibilitychange',visibility);document.removeEventListener(motionPreferenceEvent,sync);
    desktop.removeEventListener('change',sync);reduced.removeEventListener('change',sync);
    delete root.dataset.enhanced;delete root.dataset.stage;
    panels.forEach(panel=>{panel.style.removeProperty('--story-opacity');panel.style.removeProperty('--story-visual-y')});
  };
}
