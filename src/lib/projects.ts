export type ProjectId = 'pcc-inventory' | 'pcc-knowledge-retrieval' | 'hzl-maintenance' | 'bosch-risk' | 'urbanfleet';
export type StorySection = { id: string; title: string; paragraphs: string[]; points?: string[] };
export type Project = {
  id: ProjectId; number: string; name: string; company: string; category: string;
  academic: boolean; dates: string; role: string; description: string; introduction: string;
  result: string; resultLabel: string; tools: string[]; sections: StorySection[];
};

export const projects: Project[] = [
  {
    id: 'pcc-inventory', number: '01', name: 'Inventory intelligence', company: 'PCC',
    category: 'Professional work', academic: false, dates: 'Dec 2022 — Jun 2025',
    role: 'Business Intelligence Analyst · Technical team lead',
    description: 'Connecting daily reporting with better replenishment decisions.',
    introduction: 'A reporting and inventory analytics system that helped Finance and Operations work from consistent metrics, understand demand, and make replenishment decisions with more confidence.',
    result: '25–30%', resultLabel: 'fewer stockout incidents',
    tools: ['SQL', 'Python', 'AWS', 'Power BI'],
    sections: [
      { id: 'context', title: 'A clearer picture of operations', paragraphs: [
        'Finance and Operations needed reporting that could support recurring decisions about inventory, purchasing and suppliers. Periodic reporting and static replenishment thresholds left room for a more consistent view of stock movements, demand and lead times.',
        'The work connected two related problems: making operational information available more frequently and translating that information into practical replenishment decisions. A useful dashboard needed to share the same definitions as the underlying reporting datasets.'
      ] },
      { id: 'contribution', title: 'From business questions to working systems', paragraphs: [
        'As a founding technical team member and lead for a four-person team, I helped translate Finance and Operations questions into a prioritized BI roadmap. The role combined metric definition, data requirements, SQL/Python development, dashboard design and business validation.',
        'I worked with business owners on inventory turns, supplier performance, lead-time variance and purchasing measures. I also reviewed colleagues’ queries and dashboard layouts, connecting implementation decisions to acceptance criteria and ongoing maintenance.'
      ] },
      { id: 'approach', title: 'One set of definitions, from data to decision', paragraphs: [
        'SQL/Python ETL and automated reports used S3 staging, AWS Glue, DynamoDB lookups and Redshift reporting datasets. A movement ledger and dimensional reporting models created a consistent foundation for inventory analysis. Curated datasets and documented SQL transformations helped keep calculation logic aligned across reports.',
        'Demand- and lead-time-based reorder points replaced static thresholds. ABC/XYZ segmentation and EOQ-based ordering brought demand variability and inventory characteristics into replenishment decisions. The reporting experience made those analytical choices usable by the people making purchasing decisions.',
        'Validation and reconciliation checks helped protect recurring reports from unreliable refreshes. Scheduling and monitoring supported regular delivery, while purchasing recommendations still passed through buyer review. The system supported decisions without removing human authorization.'
      ], points: ['Consistent metric definitions', 'Daily automated reporting', 'Demand-aware replenishment', 'Business validation and buyer review'] },
      { id: 'outcomes', title: 'Measured operational improvements', paragraphs: [
        'The work reduced stockout incidents by 25–30% and improved inventory turns from 4 to 5. Automated reporting saved 12–15 hours of manual work each week and moved reporting cadence from monthly to daily. Self-service reporting also reduced ad hoc reporting requests by 30%.',
        'The interactive view shows the reported 25–30% reduction directly. Its line connects the lower and upper estimates; it does not imply observations over time. The inventory-turn comparison uses the actual reported values of 4 and 5.'
      ] },
      { id: 'perspective', title: 'The analytical work and the operational work belong together', paragraphs: [
        'This project joined data modeling, reporting and workflow design. Shared definitions made outputs comparable, while business validation and review kept the system connected to real decisions. The outcome depended on the team’s delivery and the people using the recommendations, as well as the analytics itself.'
      ] }
    ]
  },
  {
    id: 'pcc-knowledge-retrieval', number: '02', name: 'Knowledge, with context', company: 'PCC',
    category: 'Professional work', academic: false, dates: 'Within PCC employment · Dec 2022 — Jun 2025',
    role: 'Business Intelligence Analyst · AI initiative',
    description: 'An internal knowledge service that brings answers back to their sources.',
    introduction: 'A retrieval-augmented generation system that helped employees find documentation, check source material and prepare business documents through an internal self-service experience.',
    result: 'Source-first', resultLabel: 'answers grounded in retrieved documents',
    tools: ['Amazon Bedrock', 'OpenSearch', 'S3', 'Terraform'],
    sections: [
      { id: 'context', title: 'Finding the answer is only part of the task', paragraphs: [
        'An internal knowledge service needs to do more than produce plausible text. Employees need relevant material, a way to check where an answer came from and a system that respects the context they are allowed to access.',
        'This initiative was delivered during my Business Intelligence Analyst role at PCC and was used by employees to find source material and prepare business documents. It was part of the broader analytics and AI self-service work, rather than a separate employment role.'
      ] },
      { id: 'contribution', title: 'Building the retrieval and evaluation workflow', paragraphs: [
        'I built the retrieval workflow using S3, Amazon Bedrock and OpenSearch, returning relevant document context with citations. The work also covered ingestion orchestration, recoverable processing, evaluation and operational visibility.',
        'The system was designed around an important separation: retrieval determines which source context is available, and generation uses that context to prepare a response. Source citations give users a way to inspect the underlying material instead of relying on an answer alone.'
      ] },
      { id: 'approach', title: 'From source material to a checkable answer', paragraphs: [
        'An event-driven ingestion workflow processed documents into a searchable knowledge layer. Document-level exception handling and replay made it possible to recover affected files independently. The source document store remained authoritative, with the derived retrieval layer treated as rebuildable.',
        'Retrieval was access-aware before source context reached the model. The implementation included document processing and access controls, but the public diagram intentionally presents only the broad stages. It does not expose internal documents, queries, entitlement rules or infrastructure identifiers.',
        'Evaluation used a repeatable set of labeled questions. Recall at k assessed whether useful material was retrieved, groundedness assessed the relationship between an answer and its supplied context, and citation accuracy checked the supporting references. A common baseline made changes to retrieval, chunking and prompts easier to compare.'
      ], points: ['Recoverable ingestion', 'Relevant retrieval', 'Grounded responses', 'Checkable source citations'] },
      { id: 'outcomes', title: 'A delivered service, with a repeatable way to assess it', paragraphs: [
        'Employees used the service for documentation questions and document preparation. Beyond the user-facing workflow, the work established repeatable evaluation and operational investigation through structured logs, tracing and monitoring.',
        'The source material does not provide a numerical improvement in retrieval accuracy, time saved or return on investment. The interactive graphic therefore explains how the system works and what was evaluated; it does not invent benchmark scores.'
      ] },
      { id: 'perspective', title: 'Quality includes reliability and cost', paragraphs: [
        'Model and workflow options were compared across answer quality, latency and operating cost. Embedding, retrieval and generation were considered separately so a change could be investigated at the relevant stage. Reproducible environments and documented recovery procedures supported the service beyond its initial delivery.'
      ] }
    ]
  },
  {
    id: 'hzl-maintenance', number: '03', name: 'Earlier signals. Better preparation.', company: 'Hindustan Zinc',
    category: 'Professional work', academic: false, dates: 'Aug 2021 — Aug 2022',
    role: 'Data Analyst / Assistant Manager, Plant Analytics',
    description: 'Plant telemetry turned into earlier, actionable maintenance warnings.',
    introduction: 'Time-series analysis and operational reporting that helped maintenance teams prepare before selected equipment failures and understand recurring sources of downtime.',
    result: '~50%', resultLabel: 'lower mean downtime per incident',
    tools: ['SQL', 'PySpark', 'R', 'Time-series analysis'],
    sections: [
      { id: 'context', title: 'Make a warning useful to the crew', paragraphs: [
        'Plant analytics needed to connect sensor history with maintenance decisions. An alert only helped if a shift crew could understand and act on it. The work brought together telemetry, predictive indicators and consistent performance reporting.'
      ] },
      { id: 'contribution', title: 'Connecting telemetry and maintenance judgment', paragraphs: [
        'I analyzed data from more than 40 sensor streams, including vibration, temperature, current, pressure and throughput. SQL, PySpark and R supported data preparation, rolling-window analysis and investigation of recurring downtime patterns.',
        'Rolling statistical and FFT-based features informed predictive indicators. Precision-recall tradeoffs were considered alongside crew capacity. Technician-confirmed failures, false positives and inspection findings provided feedback for subsequent refinement.'
      ] },
      { id: 'approach', title: 'An operational feedback loop', paragraphs: [
        'High-confidence warnings were integrated into control-room and maintenance workflows so crews could prepare parts and labor. Daily OEE reporting gave leadership more consistent shift- and asset-level measures. Root-cause and process-control methods helped focus improvement work on recurring bottlenecks.'
      ], points: ['Observe sensor signals', 'Evaluate warning indicators', 'Prepare maintenance', 'Learn from inspection feedback'] },
      { id: 'outcomes', title: 'Earlier warnings and shorter incidents', paragraphs: [
        'The work contributed to approximately 50% lower mean downtime per incident. Selected failure modes had 12–24 hours of advance warning. These figures describe the reported scope; they do not imply that every failure was predicted or that total plant downtime was halved.',
        'The chart marks the approximate 50% reported reduction directly. A single reported outcome does not support a time trend. The warning graphic connects the reported 12–24 hour interval limits rather than simulating a sensor trace or model-confidence measure.'
      ] }
    ]
  },
  {
    id: 'bosch-risk', number: '04', name: 'A clearer account review', company: 'Bosch · UIUC',
    category: 'Academic prototype', academic: true, dates: 'Aug — Dec 2025',
    role: 'Project Lead · Industry-sponsored capstone',
    description: 'Explainable risk review, with a human at the point of decision.',
    introduction: 'An industry-sponsored university capstone demonstrated to Bosch stakeholders using synthetic B2B data. The prototype combined explainable scoring, review prioritization and assisted case preparation.',
    result: '~45 → <3 min', resultLabel: 'case handling in a timed synthetic-data comparison',
    tools: ['Streamlit', 'Power Automate', 'Azure OpenAI', 'Risk scoring'],
    sections: [
      { id: 'context', title: 'Help reviewers make an informed decision', paragraphs: [
        'The capstone explored an account-integrity review workflow: identify potentially suspicious accounts, explain why they were flagged and help reviewers prepare a case. Commercial exposure and service expectations also needed to inform the order in which cases were reviewed.',
        'The working prototype used synthetic B2B data and was demonstrated to Bosch stakeholders. It was an academic, industry-sponsored project. Production integrations and controls were documented as an intended deployment path, not presented as live corporate systems.'
      ] },
      { id: 'contribution', title: 'Turning stakeholder needs into a review experience', paragraphs: [
        'As project lead, I translated stakeholder needs into requirements, process maps, KPIs and acceptance criteria. A Streamlit dashboard brought together configurable risk scoring and a prioritized review queue, while assisted investigation and correspondence supported the surrounding workflow.',
        'More than 10 signals informed the explainable score. Versioned weights and thresholds helped make scoring changes understandable. The review queue considered risk, revenue exposure and SLA age rather than treating every flag as equally urgent.'
      ] },
      { id: 'approach', title: 'Explain the signal. Preserve the judgment.', paragraphs: [
        'Synthetic legitimate, suspicious and ambiguous scenarios were used to explore potential false positives. Some ordinary businesses can resemble simple risk patterns. Testing those edge cases helped identify where a reviewer needed context rather than another unqualified flag.',
        'Explainable rules were chosen after considering the limits of classifiers trained on synthetic labels. The design also specified reviewer-outcome capture and per-rule precision measures as a path toward later evaluation with real labeled cases.',
        'Power Automate supported review triggers, while Azure OpenAI assisted correspondence drafting using case facts and approved language. Human approval was retained before sending, and a static-template fallback ensured that a model failure did not have to block review handling.',
        'The intended production path documented integrations, permissions, retry behavior and tracing. Requirements for assignment, audit records and review controls were part of the design. They remain proposed production capabilities in this portfolio.'
      ], points: ['Explainable signals', 'Contextual review', 'Assisted case preparation', 'Human approval'] },
      { id: 'outcomes', title: 'A promising prototype result, within its test conditions', paragraphs: [
        'Case handling fell from about 45 minutes to under 3 in a timed synthetic-data comparison. The interactive graphic preserves both the approximate baseline and the less-than bound. Three minutes is shown as an upper bound, not as the exact observed result.',
        'This result demonstrates the prototype workflow’s time-saving potential in the test setting. It does not establish production return on investment, real-customer outcomes or an independently measured improvement across live operations.'
      ] },
      { id: 'perspective', title: 'Interpretability was a practical design choice', paragraphs: [
        'The work treated review support as a combination of understandable signals, usable prioritization and accountable decisions. Keeping the scoring explainable and human approval explicit helped connect the technical prototype to the workflow it was intended to support.'
      ] }
    ]
  },
  {
    id: 'urbanfleet', number: '05', name: 'From fleet events to useful answers', company: 'UIUC',
    category: 'Academic prototype', academic: true, dates: 'Jan — May 2026',
    role: 'Project Lead · MS capstone',
    description: 'A streaming analytics prototype designed for dependable fleet reporting.',
    introduction: 'An AWS fleet analytics design and prototype, built around vehicle activity, idle time and service-level questions. Its target scale was 200 vehicles and 73K events per day.',
    result: '70%', resultLabel: 'less data scanned per query in prototype tests',
    tools: ['Kinesis', 'S3', 'Glue', 'Athena'],
    sections: [
      { id: 'context', title: 'Start with the questions the fleet needs to answer', paragraphs: [
        'This university capstone translated fleet-operating questions into a four-phase analytics delivery plan. The design targeted 200 vehicles and 73K events per day, with cost and capacity modeled through 500 vehicles. These are design and modeling scopes, not an observed production fleet.'
      ] },
      { id: 'contribution', title: 'Designing the path from event to metric', paragraphs: [
        'As project lead, I mapped requirements to Kinesis and Lambda ingestion, S3 storage, Glue processing and Athena reporting. The work defined vehicle activity, idle-time and service-level measures alongside rules for late and repeated events.',
        'Date partitioning, Parquet compaction and SQL controls reduced unnecessary scanning. Generated implementation was checked against expected analytical results, and repeated delivery, consumer retries and replay were tested for duplicate handling.'
      ] },
      { id: 'approach', title: 'Make the reporting reproducible', paragraphs: [
        'The design separated event time from processing time and documented late-arrival treatment. Raw records remained authoritative, with curated datasets treated as rebuildable. Data contracts, exception handling, replay and backfill procedures addressed changes and failure scenarios.',
        'Monitoring considered processing lag, errors and freshness. A decision log and modeled service costs supported a simulated executive review of reliability, cost and privacy tradeoffs.'
      ], points: ['Ingest events', 'Preserve source records', 'Curate and compact', 'Query consistent metrics'] },
      { id: 'outcomes', title: 'Scan less data, preserve the result', paragraphs: [
        'Prototype tests showed 70% less data scanned per query. Zero duplicate trips were observed in the tested scenarios; this is not a guarantee for every possible workload. The graphic marks the reported 70% reduction directly, without inventing intermediate measurements.',
        'The reduction is a data-scan result, not a measured 70% improvement in speed or cost. The pipeline view explains the architecture without simulating unsupported live throughput.'
      ] }
    ]
  }
];

export function getProject(id: string) { return projects.find(project => project.id === id); }
