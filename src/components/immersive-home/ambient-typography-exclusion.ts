type Rect={left:number;top:number;right:number;bottom:number};

/** Union intersecting reading zones before making even-odd holes (overlaps must never reopen). */
export function ambientExclusion(width:number,height:number,rects:Rect[],padding=18) {
  const zones=rects.map(r=>({left:Math.max(0,r.left-padding),top:Math.max(0,r.top-padding),right:Math.min(width,r.right+padding),bottom:Math.min(height,r.bottom+padding)})).filter(r=>r.right>r.left&&r.bottom>r.top);
  for(let i=0;i<zones.length;i++)for(let j=i+1;j<zones.length;j++) {
    const a=zones[i],b=zones[j];
    if(a.left>b.right||b.left>a.right||a.top>b.bottom||b.top>a.bottom)continue;
    zones[i]={left:Math.min(a.left,b.left),top:Math.min(a.top,b.top),right:Math.max(a.right,b.right),bottom:Math.max(a.bottom,b.bottom)};
    zones.splice(j,1);i=-1;break;
  }
  const loop=(r:Rect)=>`${r.left}px ${r.top}px,${r.right}px ${r.top}px,${r.right}px ${r.bottom}px,${r.left}px ${r.bottom}px,${r.left}px ${r.top}px`;
  return `polygon(evenodd,${loop({left:0,top:0,right:width,bottom:height})}${zones.map(r=>`,${loop(r)},0px 0px`).join('')})`;
}
