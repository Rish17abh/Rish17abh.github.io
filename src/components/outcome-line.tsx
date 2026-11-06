'use client';
import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type OutcomePoint = {label:string; value:number; display:string; detail:string; bound?:boolean};
export function OutcomeLine({ title, points, unit, max, caption }: { title:string; points:OutcomePoint[]; unit:string; max:number; caption:string }) {
  const [active,setActive] = useState(points.length-1);
  const reduced=useReducedMotion();
  const id=useId();
  const width=500, left=55, right=460, top=25, bottom=175;
  const coords=points.map((p,i)=>({x:points.length===1?260:left+i*(right-left)/(points.length-1),y:bottom-p.value/max*(bottom-top)}));
  const line=coords.map((p,i)=>`${i?'L':'M'}${p.x},${p.y}`).join(' ');
  const p=points[active];
  return <figure className="outcome-line" aria-labelledby={id}>
    <div className="line-chart-top"><span id={id}>{title}</span><span>{unit}</span></div>
    <svg viewBox={`0 0 ${width} 212`} role="img" aria-label={`${title}. ${points.map(p=>`${p.label}: ${p.display}`).join('. ')}. ${caption}`} onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();const x=(e.clientX-r.left)/r.width*width;setActive(coords.reduce((a,p,i)=>Math.abs(p.x-x)<Math.abs(coords[a].x-x)?i:a,0));}}>
      {[0,.5,1].map(n=><g key={n} aria-hidden="true"><line x1={left} y1={bottom-n*(bottom-top)} x2={right} y2={bottom-n*(bottom-top)} className="line-grid"/><text x={left-12} y={bottom-n*(bottom-top)+4} textAnchor="end" className="line-tick">{max*n}</text></g>)}
      {points.length>1 && <motion.path d={line} className="outcome-stroke" fill="none" initial={reduced?false:{pathLength:0}} animate={{pathLength:1}} transition={{duration:reduced?0:.65,ease:'easeOut'}}/>}
      {coords.map((c,i)=><g key={points[i].label} aria-hidden="true"><line x1={c.x} x2={c.x} y1={c.y} y2={bottom} className="line-guide"/>{active===i && <circle cx={c.x} cy={c.y} r="15" className="line-halo"/>}<motion.circle cx={c.x} cy={c.y} r={active===i?6:4.5} className={points[i].bound?'line-point bound':'line-point'} initial={reduced?false:{opacity:0}} animate={{opacity:1}} transition={{duration:.25,delay:reduced?0:i*.15}}/><text x={c.x} y={bottom+26} textAnchor={points.length===1?'middle':i===0?'start':'end'} className="line-tick">{points[i].label}</text></g>)}
    </svg>
    <div className="line-point-picker" role="group" aria-label={`Inspect ${title}`}>{points.map((point,i)=><button key={point.label} type="button" aria-pressed={active===i} onPointerEnter={()=>setActive(i)} onFocus={()=>setActive(i)} onClick={()=>setActive(i)}>{point.label}<strong>{point.display}</strong></button>)}</div>
    <p className="line-detail" aria-live="polite">{p.detail}</p><figcaption>{caption}</figcaption>
  </figure>;
}
