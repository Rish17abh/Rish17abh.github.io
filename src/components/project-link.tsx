'use client';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useId } from 'react';

export function ProjectLink({ id, label = 'Read case study' }: { id: string; label?: string }) {
  const unique = useId();
  const returnId = `open-${id}-${unique}`;
  return <Link className="text-link" id={returnId} href={`/work/${id}/`} onClick={() => {try {sessionStorage.setItem('rr-work-origin', JSON.stringify({y: window.scrollY,returnId}));} catch { /* Navigation remains usable when storage is unavailable. */ }}}>{label}<ArrowUpRight size={18} aria-hidden="true"/></Link>;
}
export function BackToWork() {
  const router = useRouter();
  return <a className="back-link" href="/#work" onClick={event => {
    let origin;
    try { origin = sessionStorage.getItem('rr-work-origin'); } catch { return; }
    if (!origin) return;
    try { sessionStorage.setItem('rr-restore-work', origin); } catch { return; }
    event.preventDefault();
    router.push('/', {scroll:false});
  }}><ArrowLeft size={16} aria-hidden="true"/>Back to selected work</a>;
}
