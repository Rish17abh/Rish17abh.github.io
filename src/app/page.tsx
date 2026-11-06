import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { HorizontalRail } from '@/components/horizontal-rail';
import { BrandMark } from '@/components/brand-mark';
import { HeroArt } from '@/components/hero-art';
import { OutcomeExplorer } from '@/components/outcome-explorer';
import { ProjectLink } from '@/components/project-link';
import { RestorePosition } from '@/components/restore-position';
import { Contact } from '@/components/contact';
import { ProjectWorkbench } from '@/components/project-workbench';

const skillGroups = [
  { name: 'Analytics', note: 'Make the business question measurable.', tools: ['SQL','Python','Power BI','Tableau','QuickSight'], href: 'pcc-inventory', work: 'Applied at PCC' },
  { name: 'Data engineering', note: 'Build a foundation people can trust.', tools: ['AWS Glue','S3','Redshift','Athena','Airflow','PySpark'], href:'urbanfleet', work:'Explore UrbanFleet' },
  { name: 'AI & modeling', note: 'Connect intelligence with useful context.', tools: ['RAG','Amazon Bedrock','OpenSearch','Azure OpenAI','Predictive modeling'], href:'pcc-knowledge-retrieval',work:'Applied at PCC' },
  { name: 'Delivery', note: 'Keep the work connected to the outcome.', tools: ['Requirements','KPI design','Stakeholder collaboration','Jira','Power Automate'],href:'bosch-risk',work:'Explore the Bosch capstone' },
];

export default function Home() {
  return <><main id="main" tabIndex={-1}><RestorePosition/>
    <section className="shell hero" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow hero-reveal">Rishabh Ramteke</p><p className="hero-role hero-reveal">Business Intelligence Engineer <span>|</span> Data & AI</p><h1 id="hero-title" className="hero-reveal">Complex data.<br/><em>Clear decisions.</em></h1><p className="hero-intro hero-reveal">I build analytical systems that connect business questions with reliable data and practical AI.</p><div className="hero-actions hero-reveal"><a className="button" href="#work">Explore my work<ArrowUpRight size={19} aria-hidden="true"/></a><a className="text-link" href="#contact">Get in touch<ArrowUpRight size={17} aria-hidden="true"/></a></div></div>
      <HeroArt/>
      <div className="hero-bottom"><span className="eyebrow">01 / INTRODUCTION</span><a href="#about">Scroll to explore<ArrowDown size={16} aria-hidden="true"/></a></div>
    </section>

    <section id="about" className="shell section about-section" tabIndex={-1} aria-labelledby="about-title">
      <div className="section-label"><span>02 / ABOUT</span><span>The thread that connects my work</span></div>
      <div className="about-grid" data-reveal><h2 id="about-title">A bridge between <br/>operations, data <br/>and <em>intelligence.</em></h2><div className="about-copy"><p className="large-copy">I turn operational questions into dependable reporting, data pipelines and practical AI tools.</p><p>My work spans construction analytics and plant operations, alongside industry-sponsored and university capstone projects. I’m interested in the entire journey: understanding the question, building the system, and making the result useful.</p><div className="education"><span className="eyebrow">Education</span><div className="education-entry"><img src="/logos/illinois.svg" alt="University of Illinois logo" width="46" height="56"/><div><strong>Master of Science in Business Analytics</strong><span>University of Illinois Urbana-Champaign · 2026</span></div></div><div className="education-entry"><img src="/logos/mnit.png" alt="Malaviya National Institute of Technology Jaipur logo" width="62" height="62"/><div><strong>Bachelor of Technology in Materials Engineering</strong><span>Malaviya National Institute of Technology Jaipur · 2021</span></div></div></div></div></div>
    </section>

    <section id="experience" className="shell section" tabIndex={-1} aria-labelledby="experience-title">
      <div className="section-label"><span>03 / EXPERIENCE & IMPACT</span><span>Professional work</span></div>
      <div className="section-heading" data-reveal><h2 id="experience-title">Built around<br/><em>real decisions.</em></h2><p>Analytics grounded in the way teams<br className="desktop-break"/> work, plan and improve.</p></div>
      <HorizontalRail label="Professional work experience"><article className="experience-row"><div><span className="eyebrow">Dec 2022 — Jun 2025</span><h3>PCC</h3><p className="experience-location">Nagpur, India</p></div><div><h4>Business Intelligence Analyst</h4><p>Led a four-person technical team delivering Finance and Operations analytics, daily reporting, inventory intelligence and AI self-service.</p><div className="impact-pills"><span>25–30% fewer stockout incidents</span><span>12–15 reporting hours saved / week</span></div><ProjectLink id="pcc-inventory" label="Explore the work"/></div></article>
      <article className="experience-row"><div><span className="eyebrow">Aug 2021 — Aug 2022</span><h3>Hindustan Zinc</h3><p className="experience-location">Chittorgarh, India</p></div><div><h4>Data Analyst / Assistant Manager, Plant Analytics</h4><p>Connected plant telemetry, statistical analysis and maintenance feedback to earlier warnings and consistent performance reporting.</p><div className="impact-pills"><span>~50% lower mean downtime per incident</span></div><p className="small-note">Contributed to the reported improvement through analytics and maintenance workflows.</p><ProjectLink id="hzl-maintenance" label="Explore the work"/></div></article></HorizontalRail>
    </section>

    <section id="work" className="shell section work-section" tabIndex={-1} aria-labelledby="work-title">
      <div className="section-label"><span>04 / SELECTED WORK</span><span>Five projects. One place to explore.</span></div>
      <div className="section-heading" data-reveal><h2 id="work-title">Systems<br/><em>with purpose.</em></h2><p>Choose a project. Explore the impact.<br className="desktop-break"/> Follow the workflow.</p></div>
      <ProjectWorkbench/>
    </section>

    <section id="skills" className="shell section skills-section" tabIndex={-1} aria-labelledby="skills-title">
      <div className="section-label"><span>05 / SKILLS</span><span>The tools behind the work</span></div><div className="section-heading" data-reveal><h2 id="skills-title">A considered<br/><em>toolkit.</em></h2><p>Different problems call for different tools.<br className="desktop-break"/> The goal stays the same: useful outcomes.</p></div>
      <div className="skills-grid">{skillGroups.map((group,i) => <article key={group.name} data-reveal><span className="eyebrow">0{i+1}</span><h3>{group.name}</h3><p>{group.note}</p><ul>{group.tools.map(tool => <li key={tool}><BrandMark name={tool}/><span>{tool}</span></li>)}</ul><ProjectLink id={group.href} label={group.work}/></article>)}</div>
    </section>
  </main><Contact/></>;
}
