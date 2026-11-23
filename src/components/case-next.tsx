'use client';

import { useLayoutEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { getNextProject, type ProjectSlug } from '@/data/projects';
import { Localized } from '@/i18n/localized';

// Only an explicit next-case navigation starts at the top. History restoration stays native.
let requestedStart: string | null = null;

export function CaseNext({ slug, labelClassName='eyebrow' }: { slug: ProjectSlug; labelClassName?: string }) {
  const pathname=usePathname();
  const next=getNextProject(slug);
  const href=next?`/proyectos/${next.slug}`:'/#proyectos';
  useLayoutEffect(()=>{
    if(requestedStart!==pathname)return;
    requestedStart=null;
    window.scrollTo({top:0,left:0,behavior:'instant'});
  },[pathname]);
  return <Localized><Link className="case-next" href={href} scroll onNavigate={()=>{requestedStart=next?href:null}}>
    <div><span className={labelClassName}>{next?'Siguiente proyecto':'Seguir explorando'}</span><strong>{next?next.name:'Volver a proyectos'}</strong></div>
    <ArrowRight size={26} aria-hidden="true" />
  </Link></Localized>;
}
