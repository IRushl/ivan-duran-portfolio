import { motionPreferenceEvent, readMotionPreference } from '@/lib/motion-preference';

import { homeStoryTiming } from './home-story-config';

const clamp=(value:number)=>Math.max(0,Math.min(1,value));
const ease=(value:number)=>{const t=clamp(value);return t*t*(3-2*t)};
export function storyPose(progress:number,count:number,photo=false) {
  const phaseTotal=homeStoryTiming.entrance+homeStoryTiming.hold+homeStoryTiming.exit;
  const entrance=homeStoryTiming.entrance/phaseTotal,exit=homeStoryTiming.exit/phaseTotal;
  const position=clamp(Number.isFinite(progress)?progress:0)*count;
  const panels=Array.from({length:count},()=>({opacity:0,y:0,imageOpacity:0}));
  let active=Math.min(count-1,Math.floor(position));
  let transition=false;
  for(let boundary=1;boundary<count;boundary++) {
    const start=boundary-exit,end=boundary+entrance;
    if(position<start||position>end)continue;
    const t=clamp((position-start)/(end-start));
    active=t<.5?boundary-1:boundary;transition=true;
    if(photo) {
      const slide=ease(t);
      const fade=ease((t-.5)/homeStoryTiming.photoCrossfade+.5);
      panels[boundary-1]={opacity:1,y:-slide,imageOpacity:1-fade};
      panels[boundary]={opacity:1,y:1-slide,imageOpacity:fade};
    } else {
      panels[boundary-1]={opacity:1-ease(t*2),y:-ease(t*2),imageOpacity:0};
      panels[boundary]={opacity:ease((t-.5)*2),y:1-ease((t-.5)*2),imageOpacity:0};
    }
    break;
  }
  if(!transition)panels[active]={opacity:1,y:0,imageOpacity:1};
  return {active,panels};
}

/** One reusable, event-driven controller. Native scroll is never intercepted. */
export function mountHomeStory(root:HTMLElement) {
  const frame=root.querySelector<HTMLElement>('[data-story-frame]');
  const panels=[...root.querySelectorAll<HTMLElement>('[data-story-panel]')];
  const photo=root.dataset.storyKind==='photo';
  const timing=photo?homeStoryTiming.photo:homeStoryTiming.narrative;
  const copies=panels.map(panel=>panel.querySelector<HTMLElement>('[data-story-copy]'));
  const windows=panels.map(panel=>panel.querySelector<HTMLElement>('[data-story-window]'));
  if(!frame||panels.length<2)return()=>{};
  const desktop=window.matchMedia('(min-width:1000px) and (min-height:700px)');
  const compact=window.matchMedia('(max-width:999px)');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let raf=0,visible=false,enabled=false,flow=false,top=98,copyTravel=0;
  const cancel=()=>{if(raf)cancelAnimationFrame(raf);raf=0};
  const draw=()=>{
    raf=0;
    if(!enabled||document.hidden)return;
    if(flow) {
      panels.forEach(panel=>{
        const rect=panel.getBoundingClientRect();
        const reveal=clamp((window.innerHeight*.9-rect.top)/Math.max(1,Math.min(rect.height,window.innerHeight)*.5));
        panel.style.setProperty('--story-copy-y',`${(1-ease(reveal))*18}px`);
      });
      return;
    }
    const range=Math.max(1,root.offsetHeight-frame.offsetHeight);
    const pose=storyPose((top-root.getBoundingClientRect().top)/range,panels.length,photo);
    root.dataset.stage=String(pose.active+1);
    panels.forEach((panel,index)=>{
      const state=pose.panels[index];
      panel.style.setProperty('--story-opacity',String(state.opacity));
      panel.style.setProperty('--story-copy-y',`${state.y*(photo?copyTravel:compact.matches?homeStoryTiming.mobile.textTravel:homeStoryTiming.narrative.textTravel)}px`);
      panel.style.setProperty('--story-image-opacity',String(state.imageOpacity));
    });
  };
  const schedule=()=>{if(enabled&&visible&&!document.hidden&&!raf)raf=requestAnimationFrame(draw)};
  const sync=()=>{
    cancel();
    flow=false;root.dataset.flow='false';
    enabled=(desktop.matches||compact.matches)&&!reduced.matches&&!readMotionPreference();
    const touchTiming=window.innerWidth<=650?homeStoryTiming.mobile:homeStoryTiming.tablet;
    const distance=compact.matches?(photo?touchTiming.photoViewportPerStage:touchTiming.narrativeViewportPerStage):timing.viewportPerStage;
    root.style.setProperty('--story-scroll-distance',`${Math.round(panels.length*distance*100)}svh`);
    root.dataset.enhanced=String(enabled);
    if(enabled&&photo) {
      root.style.removeProperty('--story-copy-window-height');
      root.style.removeProperty('--story-mobile-photo-height');
      if(compact.matches&&window.innerWidth<=650) {
        root.style.setProperty('--story-mobile-photo-height','0px');
        const tallest=Math.max(...copies.map(copy=>copy?.scrollHeight??0));
        const available=frame.clientHeight??frame.offsetHeight;
        if(tallest>available-128)flow=true;
        const image=Math.max(96,Math.min(240,available-tallest-64));
        // Reserve the full paragraph first; contain the complete photo in the remaining space.
        root.style.setProperty('--story-mobile-image-height',`${image}px`);
        root.style.setProperty('--story-mobile-photo-height',`${Math.ceil(image+tallest+64)}px`);
      }
      const available=Math.min(...windows.map(view=>view?.clientHeight??0));
      const tallest=Math.max(...copies.map(copy=>copy?.scrollHeight??0));
      // Long translations / enlarged text retain a complete sequential reading layout.
      const phone=compact.matches&&window.innerWidth<=650;
      if(available<tallest+(phone?8:32)){enabled=false;root.dataset.enhanced='false'}
      const windowHeight=Math.min(available,tallest+(phone?16:48));
      root.style.setProperty('--story-copy-window-height',`${windowHeight}px`);
      copyTravel=windowHeight*homeStoryTiming.photo.textTravel;
    }
    root.dataset.flow=String(enabled&&flow);
    root.dataset.enhanced=String(enabled&&!flow);
    top=Number.parseFloat(getComputedStyle(frame).top)||98;
    if(enabled)draw();
  };
  const visibility=()=>{if(document.hidden){cancel()}else schedule()};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)schedule();else{cancel()}});
  observer.observe(root);
  const resize=new ResizeObserver(sync);resize.observe(root);resize.observe(frame);
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',sync,{passive:true});
  document.addEventListener('visibilitychange',visibility);document.addEventListener(motionPreferenceEvent,sync);
  desktop.addEventListener('change',sync);compact.addEventListener('change',sync);reduced.addEventListener('change',sync);sync();
  return()=>{
    cancel();observer.disconnect();resize.disconnect();
    window.removeEventListener('scroll',schedule);window.removeEventListener('resize',sync);
    document.removeEventListener('visibilitychange',visibility);document.removeEventListener(motionPreferenceEvent,sync);
    desktop.removeEventListener('change',sync);compact.removeEventListener('change',sync);reduced.removeEventListener('change',sync);
    root.style.removeProperty('--story-scroll-distance');
    root.style.removeProperty('--story-copy-window-height');
    root.style.removeProperty('--story-mobile-photo-height');
    root.style.removeProperty('--story-mobile-image-height');
    delete root.dataset.enhanced;delete root.dataset.stage;delete root.dataset.flow;
    panels.forEach(panel=>{panel.style.removeProperty('--story-opacity');panel.style.removeProperty('--story-copy-y');panel.style.removeProperty('--story-image-opacity')});
  };
}
