import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { getProject, projects } from '@/lib/projects';
import { OutcomeExplorer, ProjectWorkflow } from '@/components/outcome-explorer';
import { BackToWork } from '@/components/project-link';
import { Disclosure } from '@/components/smooth-size';
import { Contact } from '@/components/contact';

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(project => ({slug:project.id})); }
export async function generateMetadata({ params }: { params: Promise<{ slug:string }> }): Promise<Metadata> {
  const {slug} = await params; const project = getProject(slug);
  return {title: project?.name || 'Project not found', description: project?.description};
}
export default async function CaseStudy({params}: {params: Promise<{slug:string}>}) {
  const {slug} = await params; const project = getProject(slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project)+1)%projects.length];
  return <><main id="main" className="shell case-page" data-project={project.id} tabIndex={-1}>
    <BackToWork/>
    <header className="case-hero"><div className="case-kicker hero-reveal"><span className={`project-kind ${project.academic ? 'academic' : ''}`}>{project.category}</span><span className="eyebrow">{project.company} / {project.number}</span></div><h1 className="hero-reveal">{project.name}<span className="title-period">.</span></h1><p className="case-intro hero-reveal">{project.introduction}</p><div className="case-meta"><div><span className="eyebrow">My role</span><p>{project.role}</p></div><div><span className="eyebrow">Period</span><p>{project.dates}</p></div><div><span className="eyebrow">Toolkit</span><p>{project.tools.join(' · ')}</p></div></div></header>
    <div className="case-graphic" data-reveal><div><span className="eyebrow">The outcome, explored</span><h2>{project.id === 'pcc-knowledge-retrieval' ? <>An answer is better<br/>with <em>context.</em></> : <>See the<br/><em>difference.</em></>}</h2><p>Choose a view to explore {project.id === 'pcc-knowledge-retrieval' ? 'the workflow and evaluation approach.' : 'the result and its context.'}</p>{project.academic && <p className="prototype-note">University capstone · prototype results and design targets.</p>}</div><OutcomeExplorer project={project.id}/></div>
    {project.id !== 'pcc-knowledge-retrieval' && <ProjectWorkflow project={project.id}/>}
    <div className="case-body"><aside className="case-toc"><span className="eyebrow">On this page</span><nav aria-label="Case study contents">{project.sections.map(section => <a href={`#${section.id}`} key={section.id}>{section.id === 'perspective' ? 'Perspective' : section.id.charAt(0).toUpperCase()+section.id.slice(1)}</a>)}</nav></aside><div className="case-prose"><Disclosure className="mobile-toc" title="On this page"><nav aria-label="Mobile case study contents">{project.sections.map(section => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav></Disclosure>{project.sections.map((section,i) => <section className="story-section" id={section.id} key={section.id} aria-labelledby={`heading-${section.id}`} data-reveal><span className="eyebrow">0{i+1} / {section.id}</span><h2 id={`heading-${section.id}`}>{section.title}</h2>{section.paragraphs.map(p => <p key={p.slice(0,40)}>{p}</p>)}{section.points && <ol className="approach-list">{section.points.map((point,j) => <li key={point}><span>0{j+1}</span>{point}</li>)}</ol>}</section>)}<p className="case-disclosure">This case study summarizes my documented experience. Graphics explain reported outcomes or illustrate a workflow; internal records and proprietary details are omitted.</p></div></div>
    <Link href={`/work/${next.id}/`} className="next-project"><div><span className="eyebrow">Next / {next.category}</span><h2>{next.name}</h2></div><ArrowUpRight size={40} strokeWidth={1} aria-hidden="true"/></Link>
  </main><Contact/></>;
}
