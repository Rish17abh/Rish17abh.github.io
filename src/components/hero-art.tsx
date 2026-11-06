'use client';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { RotateCcw } from 'lucide-react';

const colors = ['#398ae2', '#9b75da', '#db779c'];
const dots = Array.from({ length: 180 }, (_, i) => {
  const group = i % 3, point = Math.floor(i / 3);
  // Each 60-point pattern closes all three rings: 12 + 20 + 28 points.
  const ring = point < 12 ? 0 : point < 32 ? 1 : 2;
  const count = [12, 20, 28][ring], offset = [0, 12, 32][ring];
  const angle = (point - offset) / count * Math.PI * 2 - Math.PI / 2;
  const radius = [12, 24, 36][ring];
  return { group, x: 245 + Math.cos(angle) * radius, y: 65 + group * 105 + Math.sin(angle) * radius,
    dx: 26 + (i % 12) * 8, dy: 114 + Math.floor(i / 12) * 8 };
});
const ease = (n: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, n)), 3);

export function HeroArt() {
  const section = useRef<HTMLElement>(null), svg = useRef<SVGSVGElement>(null), canvas = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false), [run, setRun] = useState(0), [phase, setPhase] = useState(4), [running, setRunning] = useState(false);
  const reduced = useReducedMotion(), started = useRef(false), id = useId().replaceAll(':', '');
  const replay = useCallback(() => setRun(value => value + 1), []);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted || reduced === null || started.current || !section.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { started.current = true; if (!reduced) replay(); observer.disconnect(); }
    }, { threshold: .18 });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, [mounted, reduced, replay]);

  useEffect(() => {
    if (!run || !canvas.current || !svg.current || reduced) { setRunning(false); setPhase(4); return; }
    const surface = canvas.current, context = surface.getContext('2d');
    if (!context) return;
    let frame = 0, beginning = 0, previousPhase = -1, width = 0, height = 0;
    // Fresh independent coordinates on every replay, rather than modular rows/diagonals.
    const random = crypto.getRandomValues(new Uint32Array(dots.length * 3));
    const starts = dots.map((_, i) => ({
      x: .025 + random[i * 3] / 4294967296 * .95,
      y: .04 + random[i * 3 + 1] / 4294967296 * .92,
      delay: random[i * 3 + 2] / 4294967296 * .1,
    }));
    setRunning(true); setPhase(0);
    const paint = (time: number) => {
      if (!beginning) beginning = time;
      const elapsed = (time - beginning) / 1000;
      if (width !== innerWidth || height !== innerHeight) {
        width = innerWidth; height = innerHeight;
        const dpr = Math.min(devicePixelRatio, 2);
        surface.width = width * dpr; surface.height = height * dpr;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      context.clearRect(0, 0, width, height);
      const bounds = svg.current!.getBoundingClientRect(), scale = bounds.width / 600;
      const currentPhase = elapsed < 1.35 ? 0 : elapsed < 1.8 ? 1 : elapsed < 3 ? 2 : elapsed < 4.25 ? 3 : 4;
      if (previousPhase !== currentPhase) { previousPhase = currentPhase; setPhase(currentPhase); }
      dots.forEach((dot, i) => {
        const start = starts[i];
        const gather = ease((elapsed - .3 - start.delay) / .9);
        // Let the connecting lines lead; the pattern points settle as each line arrives.
        const organize = Math.max(0, Math.min(1, (elapsed - 2.1 - start.delay) / .7));
        const dataX = bounds.left + dot.dx * scale, dataY = bounds.top + dot.dy * scale;
        const targetX = bounds.left + dot.x * scale, targetY = bounds.top + dot.y * scale;
        let x = start.x * width + (dataX - start.x * width) * gather;
        let y = start.y * height + (dataY - start.y * height) * gather;
        x += (targetX - dataX) * organize;
        y += (targetY - dataY) * organize;
        const dotRadius = Math.max(1.2, 2 * scale);
        context.globalAlpha = .55;
        context.fillStyle = colors[dot.group];
        // Preserve the collected source grid while a copy forms the patterns.
        if (organize > 0) {
          context.beginPath(); context.arc(dataX, dataY, dotRadius, 0, Math.PI * 2); context.fill();
          context.globalAlpha = .55 * Math.min(1, organize * 8);
        }
        context.beginPath(); context.arc(x, y, dotRadius, 0, Math.PI * 2); context.fill();
        // Send a signal from the completed pattern without removing its source points.
        // Signals fade before the icon's edge, never painting over its center/glyph.
        if (i % 4 === 0 && elapsed > 3) {
          const t = Math.min(1, Math.max(0, (elapsed - 3 - start.delay) / .65));
          const endX = bounds.left + 377 * scale, endY = bounds.top + 170 * scale;
          const controlX = bounds.left + 320 * scale;
          const signalX = (1-t)**2 * targetX + 2*(1-t)*t*controlX + t*t*endX;
          const signalY = (1-t)**2 * targetY + 2*(1-t)*t*targetY + t*t*endY;
          const distanceToIcon = Math.hypot(signalX - (bounds.left + 405 * scale), signalY - endY);
          if (t > 0 && t < 1 && distanceToIcon > 25 * scale + dotRadius) {
            context.globalAlpha = .8 * Math.min(1, t / .12) * (1 - Math.max(0, (t - .65) / .35));
            context.beginPath(); context.arc(signalX, signalY, dotRadius, 0, Math.PI * 2); context.fill();
          }
        }
      });
      if (elapsed < 4.95) frame = requestAnimationFrame(paint);
      else { context.clearRect(0, 0, width, height); setRunning(false); setPhase(4); }
    };
    frame = requestAnimationFrame(paint);
    return () => { cancelAnimationFrame(frame); context.clearRect(0, 0, width, height); };
  }, [run, reduced]);

  return <section ref={section} className="hero-art data-story" aria-label="From data to decision visualization" data-phase={phase} data-running={running}>
    <div className="data-story-top"><span className="eyebrow">From data to decision</span></div>
    {mounted && createPortal(<canvas ref={canvas} className="data-particle-plane" aria-hidden="true" />, document.body)}
    <svg ref={svg} className="data-cloud-svg" viewBox="0 0 600 340" role="img" aria-label="Randomly scattered points collect into a persistent Data grid. Copies form complete Patterns, which send signals into Insight and inform a Decision.">
      <defs><linearGradient id={`${id}-signal`} gradientUnits="userSpaceOnUse" x1="285" y1="170" x2="540" y2="170"><stop stopColor={colors[0]}/><stop offset=".5" stopColor={colors[1]}/><stop offset="1" stopColor={colors[2]}/></linearGradient></defs>
      {[65,170,275].map((y,i) => <motion.path key={`data-${y}`} d={`M 117 ${135+i*35} C 163 ${135+i*35}, 167 ${y}, 208 ${y}`} fill="none" stroke={colors[i]} strokeWidth="1.3" initial={false} animate={{opacity:phase>=2?.45:0,pathLength:phase>=2?1:0}} transition={{duration:reduced?0:1}}/>)}
      {[65,170,275].map((y,i) => <motion.path key={y} d={`M 280 ${y} C 330 ${y}, 345 170, 383 170`} fill="none" stroke={colors[i]} strokeWidth="1.3" initial={false} animate={{opacity:phase>=3?.45:0,pathLength:phase>=3?1:0}} transition={{duration:reduced?0:.6}}/>)}
      {!running && dots.map((dot,i)=><circle key={i} className="pattern-point" cx={dot.x} cy={dot.y} r="2" fill={colors[dot.group]} opacity=".55"/>)}
      {!running && dots.map((dot,i)=><circle key={i} className="data-grid-point" cx={dot.dx} cy={dot.dy} r="2" fill={colors[dot.group]} opacity=".55"/>)}
      {running && phase>=3 && !reduced && [0,1,2].map(i=><motion.circle key={`${run}-${i}`} cx="405" cy="170" fill="none" stroke="var(--accent)" strokeWidth="1.3" initial={{r:22,opacity:.45}} animate={{r:60+i*8,opacity:0}} transition={{duration:.85,delay:i*.13,ease:'easeOut'}}/>)}
      <motion.g initial={false} animate={{opacity:phase>=3?1:.18}} transition={{duration:reduced?0:.3}}><circle cx="405" cy="170" r="22" className="insight-core"/><path d="m395 175 7-9 5 5 8-11" className="insight-glyph"/></motion.g>
      <motion.path d="M 427 170 H 514" stroke={`url(#${id}-signal)`} strokeWidth="2" initial={false} animate={{pathLength:phase===4?1:0,opacity:phase===4?1:0}} transition={{duration:reduced?0:.4}}/>
      <motion.g initial={false} animate={{opacity:phase===4?1:.18}} transition={{duration:reduced?0:.3}}><rect x="514" y="144" width="52" height="52" rx="17" className="decision-node active"/><path d="m526 170 9 8 16-18" className="decision-check"/></motion.g>
      <text x="70" y="265" textAnchor="middle" className="cloud-label">Data</text><motion.g initial={false} animate={{opacity:phase>=2?1:0}}><text x="245" y="330" textAnchor="middle" className="cloud-label">Patterns</text></motion.g><text x="405" y="225" textAnchor="middle" className="cloud-label">Insight</text><text x="540" y="225" textAnchor="middle" className="cloud-label">Decision</text>
    </svg>
    <div className="data-story-copy"><h2>Put the evidence to work.</h2><p>Find the patterns. Understand the signal. Make a better decision.</p></div>
    <div className="data-story-bottom"><button type="button" className="story-replay" aria-label="Replay data to decision animation" title="Replay" onClick={replay}><RotateCcw size={19} aria-hidden="true"/></button></div>
  </section>;
}
