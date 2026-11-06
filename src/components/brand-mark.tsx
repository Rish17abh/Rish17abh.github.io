import { Database, BrainCircuit, ChartNoAxesCombined, ListChecks, Target, Users } from 'lucide-react';
const logos: Record<string,string> = {
  Python:'python.svg', 'Power BI':'power-bi.svg',Tableau:'tableau.svg',QuickSight:'aws.png',
  'AWS Glue':'glue.svg',S3:'s3.svg',Redshift:'redshift.svg',Athena:'athena.svg',Airflow:'airflow.png',PySpark:'spark.svg',
  'Amazon Bedrock':'bedrock.svg',OpenSearch:'opensearch.webp','Azure OpenAI':'azure-openai.svg',Jira:'jira.svg','Power Automate':'power-automate.svg',
};
export function BrandMark({name}:{name:string}) {
  if (logos[name]) return <span className={`brand-mark ${name==='PySpark'?'spark-mark':''}`}><img src={`/logos/${logos[name]}`} alt={`${name==='QuickSight'?'AWS':name} logo`} width="26" height="26" loading="lazy"/></span>;
  const Icon = name==='SQL'?Database:name==='RAG'?BrainCircuit:name==='Predictive modeling'?ChartNoAxesCombined:name==='Requirements'?ListChecks:name==='KPI design'?Target:Users;
  return <span className="brand-mark generic" aria-hidden="true"><Icon size={18} strokeWidth={1.7}/></span>;
}
