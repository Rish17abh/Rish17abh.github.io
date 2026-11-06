'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BarChart3, BrainCircuit, Activity, ShieldCheck, Route } from 'lucide-react';
import { SmoothSize } from './smooth-size';
import { projects } from '@/lib/projects';
import { OutcomeExplorer, ProjectWorkflow } from './outcome-explorer';
import { ProjectLink } from './project-link';

const labels = ['Inventory BI', 'Knowledge AI', 'Predictive maintenance', 'Account review', 'Fleet analytics'];
const icons = [BarChart3, BrainCircuit, Activity, ShieldCheck, Route];

export function ProjectWorkbench() {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    try { const id = sessionStorage.getItem('rr-selected-project'); const index = projects.findIndex(p => p.id === id); if (index >= 0) setSelected(index); } catch { /* Selection works without storage. */ }
  }, []);
  function choose(index: number, focus = false) {
    setSelected(index);
    try { sessionStorage.setItem('rr-selected-project', projects[index].id); } catch { /* Optional persistence. */ }
    buttons.current[index]?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest',inline:'center'});
    if (focus) buttons.current[index]?.focus();
  }
  function browse(index: number) {
    choose(index);
    document.querySelector('.workbench')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'start'});
    document.getElementById('selected-project')?.focus({preventScroll:true});
  }
  const project = projects[selected];
  return <div className="workbench">
    <div className="project-picker" role="tablist" aria-label="Choose a project">
      {projects.map((p, i) => { const Icon = icons[i]; return <button key={p.id} ref={el => {buttons.current[i] = el;}} type="button" role="tab" id={`tab-${p.id}`} aria-selected={selected === i} aria-controls="selected-project" tabIndex={selected === i ? 0 : -1} data-project={p.id} onClick={() => choose(i)} onKeyDown={event => {
        const next = event.key === 'ArrowRight' ? (i+1)%projects.length : event.key === 'ArrowLeft' ? (i+projects.length-1)%projects.length : event.key === 'Home' ? 0 : event.key === 'End' ? projects.length-1 : null;
        if (next !== null) {event.preventDefault(); choose(next,true);}
      }}><Icon size={23} strokeWidth={1.7} aria-hidden="true"/><span>{labels[i]}</span><small>{p.company} · {p.academic ? 'Capstone' : 'Professional'}</small></button>; })}
    </div>
    <label className="mobile-project-picker">Choose a project<select value={selected} onChange={event => choose(Number(event.target.value))}>{projects.map((p,i) => <option key={p.id} value={i}>{i+1}. {labels[i]} — {p.company}</option>)}</select></label>
    <div className="project-pager"><span aria-live="polite">Project {selected+1} of {projects.length} <span className="pager-hint">· Scroll the cards or choose a project</span></span><div><button type="button" aria-label="Previous project" disabled={selected===0} onClick={() => choose(selected-1)}><ArrowLeft size={19}/></button><button type="button" aria-label="Next project" disabled={selected===projects.length-1} onClick={() => choose(selected+1)}><ArrowRight size={19}/></button></div></div>
    <SmoothSize><div id="selected-project" role="tabpanel" aria-label={`${labels[selected]} project`} tabIndex={0} data-project={project.id}>
      <article className="project-detail" key={project.id}>
        <div className="project-row">
          <div className="project-story"><div className="project-kicker"><span className="eyebrow">{project.company} / {project.number}</span></div><span className={`project-kind ${project.academic ? 'academic' : ''}`}>{project.category}</span><h3>{project.name}</h3><p>{project.description}</p><div className="tool-tags">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div><ProjectLink id={project.id} label="Explore full case study"/></div>
          <OutcomeExplorer project={project.id} compact/>
        </div>
        {project.id !== 'pcc-knowledge-retrieval' && <ProjectWorkflow project={project.id}/>}
      </article>
    </div>
    </SmoothSize><div className="project-bottom-nav" aria-label="Browse more projects"><button type="button" disabled={selected===0} onClick={() => browse(selected-1)}><ArrowLeft size={18} aria-hidden="true"/><span><small>Previous project</small>{selected>0 ? labels[selected-1] : 'You’re at the beginning'}</span></button><button type="button" disabled={selected===projects.length-1} onClick={() => browse(selected+1)}><span><small>Next project</small>{selected<projects.length-1 ? labels[selected+1] : 'You’ve explored all five'}</span><ArrowRight size={18} aria-hidden="true"/></button></div>
    <noscript><p>Explore the full case studies:</p><ul>{projects.map(p => <li key={p.id}><a href={`/work/${p.id}/`}>{p.name}</a></li>)}</ul></noscript>
  </div>;
}
