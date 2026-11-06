import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export default function NotFound() {
  return <main id="main" className="shell not-found"><p className="eyebrow">404 / A small detour</p><h1>This page<br/>isn’t <em>here.</em></h1><p>Let’s get you back to the work.</p><Link href="/#work" className="button"><ArrowLeft size={18} aria-hidden="true"/>Selected work</Link></main>;
}
