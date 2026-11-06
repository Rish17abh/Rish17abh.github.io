'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown, Layers3, Database, Search, Sparkles, FileCheck2, Activity, SlidersHorizontal, Wrench, RotateCcw, BarChart3, ShieldCheck, Mail, UserCheck } from 'lucide-react';
import { OutcomeLine } from './outcome-line';
import { SmoothSize, Disclosure } from './smooth-size';
import type { ProjectId } from '@/lib/projects';

type Step = { label: string; title: string; body: string; tool?: string };
const flows: Record<string, Step[]> = {
  inventory: [
    {label:"Collect", title:"Bring operational data together", body:"SQL and Python pipelines stage source data and prepare consistent reporting datasets. The public diagram summarizes the documented system without exposing internal records.", tool:"SQL · Python · S3"},
    {label:"Model", title:"Make the metrics consistent", body:"A movement ledger and dimensional models align inventory, purchasing and supplier measures. Validation and reconciliation checks support reliable refreshes.", tool:"AWS Glue · Redshift"},
    {label:"Analyze", title:"Connect demand to replenishment", body:"Demand and lead-time analysis, ABC/XYZ segmentation and EOQ-based ordering inform replenishment recommendations.", tool:"Inventory analysis · Power BI"},
    {label:"Decide", title:"Put the insight into daily use", body:"Daily reporting supports Finance and Operations. Purchasing recommendations pass through buyer review; the system supports human decisions.", tool:"Daily reporting · Buyer review"},
  ],
  maintenance: [
    {label:"Observe", title:"Read the operating signals", body:"More than 40 sensor streams provide vibration, temperature, current, pressure and throughput history for analysis.", tool:"SQL · PySpark · R"},
    {label:"Analyze", title:"Find useful warning indicators", body:"Rolling statistics and FFT-based features inform indicators. Precision-recall tradeoffs are considered alongside the crew’s ability to act.", tool:"Time-series features"},
    {label:"Prepare", title:"Give crews time to respond", body:"High-confidence warnings support control-room and maintenance workflows. The reported 12–24 hour warning interval applies to selected failure modes.", tool:"Maintenance planning"},
    {label:"Refine", title:"Learn from inspection feedback", body:"Technician-confirmed failures, false positives and inspection findings help refine the indicators. The feedback returns to subsequent analysis.", tool:"Technician feedback"},
  ],
  retrieval: [
    { label: 'Question', title: 'Start with a documentation question', body: 'An employee asks a question about the available documentation. The service is intended to help locate relevant material and prepare business documents.', tool: 'Internal self-service' },
    { label: 'Retrieve', title: 'Find relevant, permitted context', body: 'The retrieval stage finds relevant source material within the caller’s permitted context. Access-aware retrieval happens before context reaches the model.', tool: 'S3 · OpenSearch' },
    { label: 'Answer', title: 'Use the source context', body: 'The model uses retrieved material to prepare an answer. Evaluation checks whether the response stays grounded in its supporting context.', tool: 'Amazon Bedrock' },
    { label: 'Sources', title: 'Make the answer checkable', body: 'Citations return the reader to the underlying source material. Citation accuracy and answer groundedness are evaluated separately.', tool: 'Source citations' },
  ],
  bosch: [
    { label: 'Review', title: 'Explain why an account is flagged', body: 'An interpretable score combines more than 10 signals. Synthetic legitimate, suspicious and ambiguous cases help reveal where a reviewer needs additional context.', tool: 'Streamlit · Explainable rules' },
    { label: 'Prepare', title: 'Bring the case together', body: 'The prototype combines a prioritized review queue with investigation support. No per-step timing is claimed; the reported comparison covers overall case handling.', tool: 'Risk · Exposure · SLA age' },
    { label: 'Draft', title: 'Assist with correspondence', body: 'Case facts and approved language support draft preparation. A static-template fallback keeps review handling possible if the model cannot complete a request.', tool: 'Power Automate · Azure OpenAI' },
    { label: 'Approve', title: 'Keep the decision with a person', body: 'Correspondence requires human approval before sending. Production integrations and operational controls were documented as an intended deployment path.', tool: 'Human approval' },
  ],
  fleet: [
    { label: 'Ingest', title: 'Receive vehicle events', body: 'The design maps vehicle-event ingestion to a streaming workflow. Its target is 200 vehicles and 73K events per day, not a measured live workload.', tool: 'Kinesis · Lambda' },
    { label: 'Store', title: 'Preserve the source record', body: 'Raw records remain authoritative. Curated outputs can be rebuilt, and replay and backfill procedures support changes to analytical logic.', tool: 'Amazon S3' },
    { label: 'Curate', title: 'Prepare consistent datasets', body: 'Partitioning and Parquet compaction reduce unnecessary scanning. Repeated and late events are handled before trip and service-level aggregation.', tool: 'AWS Glue · Parquet · SQL' },
    { label: 'Query', title: 'Answer operating questions', body: 'Reporting supports vehicle activity, idle-time and service-level questions. Prototype tests showed 70% less data scanned per query.', tool: 'Amazon Athena' },
  ],
};

function Selector({ options, value, onChange, label }: { options: string[]; value: number; onChange: (n: number) => void; label: string }) {
  return <div className="metric-selector" role="group" aria-label={label}>{options.map((option, i) =>
    <button type="button" key={option} aria-pressed={value === i} onClick={() => onChange(i)}>{option}</button>
  )}</div>;
}

const flowIcons = {
  inventory: [Database, Layers3, BarChart3, UserCheck],
  maintenance: [Activity, SlidersHorizontal, Wrench, RotateCcw],
  retrieval: [Search, Database, Sparkles, FileCheck2],
  bosch: [ShieldCheck, Layers3, Mail, UserCheck],
  fleet: [Activity, Database, SlidersHorizontal, BarChart3],
};
function Flow({ name }: { name: keyof typeof flowIcons }) {
  const [selected, setSelected] = useState(0);
  const steps = flows[name]; const current = steps[selected];
  const reduced = useReducedMotion();
  const detailId = useId();
  return <div className="flow-explorer">
    <div className="workflow-map" role="group" aria-label="Explore workflow stages">
      {steps.map((step, i) => { const Icon = flowIcons[name][i]; return <div className="workflow-cell" key={step.label}>
        <button type="button" onClick={() => setSelected(i)} aria-pressed={selected === i} aria-controls={detailId}>
          <span className="node-number">0{i+1}</span><span className="node-icon"><Icon size={23} strokeWidth={1.7} aria-hidden="true"/></span><strong>{step.label}</strong>
        </button>{i < steps.length-1 && <span className={`workflow-connector ${i < selected ? 'visited' : ''}`} aria-hidden="true"><ArrowRight size={17}/></span>}
      </div>; })}
    </div>
    <SmoothSize><div className="flow-explanation" id={detailId} aria-live="polite" aria-atomic="true">
      <motion.div key={current.label} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : .18 }}><span className="eyebrow">{current.tool}</span><h4>{current.title}</h4><p>{current.body}</p></motion.div>
    </div></SmoothSize>
    <div className="flow-controls"><p className="graphic-caption">Illustrative workflow · select a node</p><div><button type="button" aria-label="Previous workflow stage" disabled={selected===0} onClick={() => setSelected(selected-1)}><ChevronLeft size={18}/></button><span>{selected+1} / {steps.length}</span><button type="button" aria-label="Next workflow stage" disabled={selected===steps.length-1} onClick={() => setSelected(selected+1)}><ChevronRight size={18}/></button></div></div>
    {name === 'maintenance' && <p className="feedback-note"><RotateCcw size={14} aria-hidden="true"/> Inspection feedback informs the next analysis cycle.</p>}
  </div>;
}
export function ProjectWorkflow({ project }: { project: ProjectId }) {
  const name = project === 'pcc-inventory' ? 'inventory' : project === 'hzl-maintenance' ? 'maintenance' : project === 'bosch-risk' ? 'bosch' : project === 'urbanfleet' ? 'fleet' : 'retrieval';
  return <section className="project-workflow" data-project={project} data-cursor-suppress aria-label="Interactive project workflow"><div className="workflow-heading"><div><span className="eyebrow">How it works</span><h3>From input to impact.</h3></div><p>Select a stage to see what happens.<br/>{project === 'bosch-risk' || project === 'urbanfleet' ? 'Academic prototype · simplified workflow.' : 'Professional work · simplified workflow.'}</p></div><Flow name={name}/></section>;
}

export function OutcomeExplorer({ project, compact = false }: { project: ProjectId; compact?: boolean }) {
  const [view, setView] = useState(0);
  const reduced = useReducedMotion();
  const unique = useId();
  const options = project === 'pcc-inventory' ? ['Stockouts', 'Reporting', 'Turns'] : project === 'pcc-knowledge-retrieval' ? ['How it works', 'Evaluation'] : project === 'hzl-maintenance' ? ['Downtime', 'Advance warning'] : project === 'bosch-risk' ? ['Time comparison', 'Workflow'] : ['Query efficiency', 'Pipeline'];
  const academic = project === 'bosch-risk' || project === 'urbanfleet';
  let content;
  if (project === 'pcc-inventory') {
    content = view === 0 ? <><div className="chart-headline"><span className="serif">25–30<span className="unit">%</span></span><p>fewer stockout<br/>incidents</p></div><OutcomeLine title="Reported stockout reduction" unit="% reduction" max={40} points={[{label:'Lower estimate',value:25,display:'25%',detail:'Lower end of the reported stockout reduction.'},{label:'Upper estimate',value:30,display:'30%',detail:'Upper end of the reported stockout reduction.'}]} caption="The line connects the reported range limits. It is not a time series; incident counts are not supplied."/></> : view === 1 ? <><div className="chart-headline"><span className="serif">12–15<span className="unit"> h</span></span><p>saved each week<br/>in reporting</p></div><OutcomeLine title="Reporting time saved" unit="hours / week" max={20} points={[{label:'Lower estimate',value:12,display:'12 hours',detail:'Reported lower estimate of weekly manual reporting time saved.'},{label:'Upper estimate',value:15,display:'15 hours',detail:'Reported upper estimate. Reporting cadence also changed from monthly to daily.'}]} caption="Reported range, not a week-by-week trend. Reporting moved from monthly to daily."/></> : <><div className="chart-headline"><span className="serif">4 → 5</span><p>inventory<br/>turns</p></div><OutcomeLine title="Inventory turns" unit="turns" max={6} points={[{label:'Before',value:4,display:'4 turns',detail:'Inventory turns before the reported improvement.'},{label:'After',value:5,display:'5 turns',detail:'Inventory turns after the reported improvement.'}]} caption="Two reported outcomes. Intermediate observations and the observation period were not supplied."/></>;
  } else if (project === 'pcc-knowledge-retrieval') {
    content = view === 0 ? <Flow name="retrieval"/> : <div className="evaluation"><span className="eyebrow">How quality was assessed</span>{[['Recall at k','Does retrieval find the relevant material?'],['Groundedness','Does the answer stay supported by its context?'],['Citation accuracy','Do references point to the supporting sources?']].map(([title, body],i) => <div key={title}><span>0{i+1}</span><div><h4>{title}</h4><p>{body}</p></div></div>)}<p className="graphic-caption">Evaluation dimensions are documented; numerical scores are not provided.</p></div>;
  } else if (project === 'hzl-maintenance') {
    content = view === 0 ? <><div className="chart-headline"><span className="serif">~50<span className="unit">%</span></span><p>lower mean downtime<br/>per incident</p></div><OutcomeLine title="Mean downtime reduction per incident" unit="% reduction" max={60} points={[{label:'Reported outcome',value:50,display:'~50%',detail:'Contributed to approximately 50% lower mean downtime per incident.'}]} caption="One approximate reported result. No trend is inferred from a single measurement."/></> : <><div className="chart-headline"><span className="serif">12–24<span className="unit"> h</span></span><p>advance warning</p></div><OutcomeLine title="Advance warning interval" unit="hours" max={24} points={[{label:'Lower end',value:12,display:'12 hours',detail:'Lower end of the reported advance-warning interval.'},{label:'Upper end',value:24,display:'24 hours',detail:'Upper end of the reported interval for selected failure modes.'}]} caption="Selected failure modes only. This line shows a reported interval, not a sensor trace."/></>;
  } else if (project === 'bosch-risk') {
    content = view === 0 ? <><div className="chart-headline"><span className="serif">~45 → &lt;3</span><p>minutes of<br/>case handling</p></div><OutcomeLine title="Case handling time" unit="minutes" max={50} points={[{label:'Before',value:45,display:'~45 min',detail:'Approximate case handling time before the prototype comparison.'},{label:'Prototype',value:3,display:'<3 min',bound:true,detail:'Under 3 minutes. The hollow point marks the upper bound, not the exact measured value.'}]} caption="Timed synthetic-data comparison. The connecting line is not a measured trajectory; 3 minutes is an upper bound."/></> : <Flow name="bosch"/>;
  } else {
    content = view === 0 ? <><div className="chart-headline"><span className="serif">70<span className="unit">%</span></span><p>less data scanned<br/>per query</p></div><OutcomeLine title="Data-scan reduction" unit="% reduction" max={100} points={[{label:'Prototype result',value:70,display:'70%',detail:'70% less data scanned per query in prototype tests; not a speed or cost result.'}]} caption="One reported prototype result. No intermediate measurements or live workload are implied."/></> : <Flow name="fleet"/>;
  }
  const source = project === 'pcc-inventory' ? 'PCC Business Intelligence and Operational Analytics' : project === 'pcc-knowledge-retrieval' ? 'PCC AI Knowledge Retrieval and Document Analytics' : project === 'hzl-maintenance' ? 'HZL Industrial BI and Predictive Operations Analytics' : project === 'bosch-risk' ? 'Bosch Account Risk Analytics and Review Intelligence' : 'UrbanFleet Streaming BI and Service Performance Analytics';
  return <section className={`outcome-explorer ${compact ? 'compact' : ''}`} data-cursor-suppress aria-label={`${source} interactive graphic`}>
    <div className="explorer-top"><span className="eyebrow">{project === 'pcc-knowledge-retrieval' ? 'Explore the system' : 'Explore the outcome'}</span><span className="chart-context">{academic ? 'Prototype' : 'Professional work'}</span></div>
    <Selector options={options} value={view} onChange={setView} label="Choose a graphic view"/>
    <SmoothSize className="graphic-body"><div id={unique}>
      <AnimatePresence mode="popLayout" initial={false}><motion.div key={view} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: reduced ? 1 : 0 }} transition={{ duration: reduced ? 0 : .14 }} aria-live="polite" aria-atomic="true">{content}</motion.div></AnimatePresence>
    </div></SmoothSize>
    <Disclosure className="result-note" title={`About this ${project === 'pcc-knowledge-retrieval' ? 'system' : 'result'}`}><p>Based on my documented experience: {source}. {academic ? 'This is university capstone work; prototype measurements and design targets are not production results.' : 'The presentation summarizes reported professional work. Illustrations omit internal records and operational details.'} {project === 'pcc-knowledge-retrieval' ? 'The diagram explains the workflow; it does not query internal documents.' : 'Exact values, ranges and qualifications are repeated in the chart labels and captions.'}</p></Disclosure>
  </section>;
}
