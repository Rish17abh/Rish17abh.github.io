'use client';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/** Animate measured height so text reflows naturally instead of being scaled. */
export function SmoothSize({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const content = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    const el = content.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setHeight(el.getBoundingClientRect().height));
    observer.observe(el);
    setHeight(el.getBoundingClientRect().height);
    return () => observer.disconnect();
  }, []);
  return <motion.div className={`smooth-size ${className}`} animate={{height:height ?? 'auto'}} transition={{duration:reduced ? 0 : .34,ease:[.22,1,.36,1]}}><div ref={content}>{children}</div></motion.div>;
}

export function Disclosure({ title, children, className = '' }: { title:string; children:React.ReactNode; className?:string }) {
  const [open,setOpen] = useState(false);
  const id = useId();
  return <div className={`animated-disclosure ${className}`}><button type="button" aria-expanded={open} aria-controls={id} onClick={()=>setOpen(!open)}>{title}<span aria-hidden="true" className={open?'disclosure-chevron open':'disclosure-chevron'}>⌄</span></button><SmoothSize><div id={id} inert={!open} aria-hidden={!open} style={{display:open?'block':'none'}}>{children}</div></SmoothSize></div>;
}
