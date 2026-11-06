'use client';
import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ScrollMotion() {
  const path = usePathname();
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.hero-reveal', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .075, ease: 'power2.out', clearProps: 'transform,opacity' });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        gsap.fromTo(el, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .55, ease: 'power2.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
      });
      gsap.utils.toArray<SVGPathElement>('.signal-line').forEach((el, i) => {
        const length = el.getTotalLength();
        gsap.fromTo(el, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.35, delay: .12 + i * .025, ease: 'power2.out', clearProps: 'strokeDasharray,strokeDashoffset' });
      });
    });
    return () => media.revert();
  }, [path]);
  return null;
}
