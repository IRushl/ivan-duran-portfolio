import { motionPreferenceEvent, readMotionPreference } from '@/lib/motion-preference';

const clamp=(value:number)=>Math.max(0,Math.min(1,value));
export function storyPose(progress:number,count:number) {
  const position=clamp(Number.isFinite(progress)?progress:0)*Math.max(0,count-1);
  const active=Math.min(count-1,Math.floor(position+.5));
  return {active,depthY:Math.max(-18,Math.min(18,(position-active)*30))};
}

/** One reusable, event-driven controller. Native scroll is never intercepted. */
export function mountHomeStory(root:HTMLElement) {
  const frame=root.querySelector<HTMLElement>('[data-story-frame]');
  const panels=[...root.querySelectorAll<HTMLElement>('[data-story-panel]')];
  const counter=root.querySelector<HTMLElement>('[data-story-counter]');
  if(!frame||panels.length<2)return()=>{};
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
    const pose=storyPose((top-root.getBoundingClientRect().top)/range,panels.length);
    root.dataset.stage=String(pose.active+1);
    if(counter)counter.textContent=String(pose.active+1).padStart(2,'0');
    const changed=lastActive!==pose.active;
    const direction=pose.active>=lastActive?1:-1;
    if(changed)stopEntries();
    panels.forEach((panel,index)=>{
      panel.style.setProperty('--story-opacity',String(index===pose.active?1:0));
      panel.style.setProperty('--story-depth-y',`${pose.depthY}px`);
      if(changed&&lastActive!==-1&&index===pose.active&&typeof panel.animate==='function') {
        entries.set(panel,panel.animate([{opacity:.35,transform:`translateY(${direction*12}px)`},{opacity:1,transform:'none'}],{duration:420,easing:'cubic-bezier(.2,.65,.3,1)',fill:'backwards'}));
      }
    });
    lastActive=pose.active;
  };
  const schedule=()=>{if(enabled&&visible&&!document.hidden&&!raf)raf=requestAnimationFrame(draw)};
  const sync=()=>{
    cancel();stopEntries();lastActive=-1;
    enabled=desktop.matches&&!reduced.matches&&!readMotionPreference();
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
    panels.forEach(panel=>{panel.style.removeProperty('--story-opacity');panel.style.removeProperty('--story-depth-y')});
  };
}
