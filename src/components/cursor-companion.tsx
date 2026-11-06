'use client';
import { useEffect, useRef } from 'react';
import { samplePointer, type PointerSample } from '@/lib/cursor-physics';

export function CursorCompanion() {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = element.current;
    if (!el) return;
    const eligible = matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const forced = matchMedia('(forced-colors: active)');
    let sample: PointerSample | null = null;
    let x = 0, y = 0, px = 0, py = 0, intensity = 0, lastMove = 0, frame = 0, lastFrame = 0;
    let suppressed = false;
    const reset = () => { cancelAnimationFrame(frame); frame = 0; sample = null; intensity = 0; lastFrame = 0; el.style.opacity = '0'; };
    const tick = (now: number) => {
      frame = 0;
      const dt = Math.min(40, now - (lastFrame || now - 16)); lastFrame = now;
      const age = now - lastMove;
      const target = age < 70 ? (sample?.acceleration || 0) : 0;
      intensity += (target - intensity) * (1 - Math.exp(-dt / 100));
      const ease = 1 - Math.exp(-dt / 65);
      px += (x - px) * ease; py += (y - py) * ease;
      const lag = Math.hypot(x - px, y - py);
      if (lag > 55) { px = x - (x - px) / lag * 55; py = y - (y - py) / lag * 55; }
      const fade = age < 450 ? 1 : Math.max(0, 1 - (age - 450) / 650);
      el.style.opacity = String(suppressed ? 0 : (.44 + intensity * .14) * fade);
      el.style.setProperty('--cursor-x', `${px}px`);
      el.style.setProperty('--cursor-y', `${py}px`);
      el.style.setProperty('--cursor-radius', `${105 + intensity * 20}px`);
      if (age < 1150 && !document.hidden) frame = requestAnimationFrame(tick);
      else { el.style.opacity = '0'; lastFrame = 0; }
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !eligible.matches || reduced.matches || forced.matches || document.hidden) { reset(); return; }
      const now = performance.now();
      if (!sample || now - lastMove > 120) { px = event.clientX; py = event.clientY; }
      sample = samplePointer(sample, event.clientX, event.clientY, now);
      x = event.clientX; y = event.clientY; lastMove = now;
      const target = event.target instanceof Element ? event.target : null;
      suppressed = Boolean(target?.closest('[data-cursor-suppress],input,textarea,select,[contenteditable="true"]')) || Boolean(window.getSelection()?.toString());
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const selection = () => { if (window.getSelection()?.toString()) { suppressed = true; el.style.opacity = '0'; } };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', reset);
    document.documentElement.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', reset);
    document.addEventListener('selectionchange', selection);
    [eligible,reduced,forced].forEach(query => query.addEventListener('change', reset));
    return () => { reset(); window.removeEventListener('pointermove', move); window.removeEventListener('blur', reset); document.documentElement.removeEventListener('pointerleave', reset); document.removeEventListener('visibilitychange', reset); document.removeEventListener('selectionchange', selection); [eligible,reduced,forced].forEach(query => query.removeEventListener('change', reset)); };
  }, []);
  return <div ref={element} className="cursor-companion cursor-dot-plane" aria-hidden="true"/>;
}
