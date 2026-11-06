'use client';
import { useEffect } from 'react';
export function RestorePosition() {
  useEffect(() => {
    let saved;
    try { saved = sessionStorage.getItem('rr-restore-work'); } catch { return; }
    if (!saved) return;
    sessionStorage.removeItem('rr-restore-work');
    let timer: ReturnType<typeof setTimeout>;
    try {
      const {y,returnId} = JSON.parse(saved);
      timer = setTimeout(() => {window.scrollTo({top:y, behavior:'instant'});document.getElementById(returnId)?.focus({preventScroll:true});},80);
    } catch { /* An expired or malformed saved position falls back to normal navigation. */ }
    return () => clearTimeout(timer);
  }, []);
  return null;
}
