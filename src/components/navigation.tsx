'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { ArrowUpRight, Monitor, Moon, Sun, X } from 'lucide-react';

const links = [['About','about'],['Experience','experience'],['Work','work'],['Skills','skills'],['Contact','contact']];
export function ThemePicker({ label = 'Color theme' }: { label?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const Icon = mounted && theme === 'dark' ? Moon : mounted && theme === 'light' ? Sun : Monitor;
  return <label className="theme-picker"><Icon size={16} aria-hidden="true"/><span className="sr-only">{label}</span><select aria-label={label} value={mounted ? theme : 'system'} onChange={event => setTheme(event.target.value)}><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></label>;
}
export function Navigation() {
  const path = usePathname(); const dialog = useRef<HTMLDialogElement>(null); const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [expandedName,setExpandedName] = useState(false);
  useEffect(()=>{
    const update=()=>setExpandedName(current=>window.scrollY>120?true:window.scrollY<70?false:current);
    update();window.addEventListener('scroll',update,{passive:true});
    return()=>window.removeEventListener('scroll',update);
  },[]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  function close() { dialog.current?.close(); setOpen(false); }
  function navigate(id: string) {
    close();
    if (path === '/') requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
  }
  return <>
    <header className="site-header">
      <div className="shell header-inner">
        <Link className={`wordmark ${expandedName ? 'name-expanded' : ''}`} href="/" aria-label="Rishabh Ramteke, home"><span className="wordmark-content" aria-hidden="true">R<span className="name-reveal">ishabh</span><span className="name-slash"> / </span><span className="name-space"> </span>R<span className="name-reveal">amteke</span><span className="brand-dot"/></span></Link>
        <nav aria-label="Main navigation" className="desktop-nav">{links.map(([label,id]) => <a key={id} href={`/#${id}`}>{label}</a>)}</nav>
        <div className="header-controls"><ThemePicker/><button ref={trigger} type="button" className="menu-trigger" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-menu" onClick={() => {dialog.current?.showModal();setOpen(true);}}>Menu<span className="menu-lines" aria-hidden="true"/></button></div>
      </div>
    </header>
    <dialog id="mobile-menu" ref={dialog} className="mobile-menu" aria-labelledby="menu-title" onClose={() => {setOpen(false); trigger.current?.focus();}} onClick={e => {if(e.target === e.currentTarget)close();}}>
      <div className="menu-head"><span id="menu-title" className="eyebrow">Explore</span><button type="button" className="close-menu" onClick={close}>Close<X size={18} aria-hidden="true"/></button></div>
      <nav aria-label="Mobile navigation">{links.map(([label,id],i) => <a key={id} href={`/#${id}`} onClick={() => navigate(id)}><span className="eyebrow">0{i+1}</span>{label}<ArrowUpRight size={23} aria-hidden="true"/></a>)}</nav>
      <div className="menu-bottom"><span className="eyebrow">Appearance</span><ThemePicker label="Menu color theme"/></div>
    </dialog>
  </>;
}
