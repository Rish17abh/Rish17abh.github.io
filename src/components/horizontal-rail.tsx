'use client';
import { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
export function HorizontalRail({ children, label }: { children:React.ReactNode; label:string }) {
  const rail=useRef<HTMLDivElement>(null);
  const [edges,setEdges]=useState({start:true,end:false});
  useEffect(()=>{ const el=rail.current;if(!el)return;const update=()=>setEdges({start:el.scrollLeft<5,end:el.scrollLeft+el.clientWidth>=el.scrollWidth-5}); const observer=new ResizeObserver(update);observer.observe(el);el.addEventListener('scroll',update,{passive:true});update();return()=>{observer.disconnect();el.removeEventListener('scroll',update);}; },[]);
  function move(direction:number) {const el=rail.current;if(!el)return;el.scrollBy({left:direction*((el.firstElementChild?.getBoundingClientRect().width ?? el.clientWidth)+24),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
  return <div className="horizontal-section"><div className="rail-tools"><span>Scroll to explore professional experience</span><div><button type="button" aria-label="Previous professional experience" disabled={edges.start} onClick={()=>move(-1)}><ArrowLeft size={18}/></button><button type="button" aria-label="Next professional experience" disabled={edges.end} onClick={()=>move(1)}><ArrowRight size={18}/></button></div></div><div className="experience-rail" ref={rail} role="region" aria-label={label} tabIndex={0}>{children}</div></div>;
}
