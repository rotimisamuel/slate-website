import ServiceTemplate from '@/components/ServiceTemplate'

export default function AIPage() {
  return (
    <ServiceTemplate
      num="03"
      heroTitle="AI Strategy & Implementation"
      heroSub="We identify, design, and deploy artificial intelligence that delivers measurable outcomes — from intelligent tutoring to predictive analytics and process automation."
      buildTitle="AI that delivers results"
      buildLead={[
        'We do not sell AI as a concept. We build AI systems that work in production — trained on your data, deployed in your environment, and maintained by our team.',
        'Every engagement begins with a rigorous use-case assessment: identifying where AI will create real value and where it will not, based on data availability, organisational readiness, and return on investment.',
      ]}
      buildCta="Explore AI opportunities"
      buildCards={[
        {
          title: 'AI Strategy',
          texts: [
            'Identifying high-value AI use cases, building the business case, and developing an implementation roadmap — grounded in your data assets, technical capacity, and strategic priorities.',
            'We help leadership teams understand where AI will deliver genuine ROI and where hype exceeds reality — producing a clear, honest AI strategy with phased delivery milestones.',
          ],
        },
        {
          title: 'Intelligent Tutoring',
          texts: [
            'AI tutors that personalise learning paths and adapt content based on learner performance, pace, and knowledge gaps — deployed at national scale within our LMS platforms.',
            'Our intelligent tutoring systems support hundreds of thousands of learners with real-time personalisation, improving completion rates and knowledge retention measurably.',
          ],
        },
        {
          title: 'Predictive Analytics',
          texts: [
            'Data-driven models that forecast outcomes, detect anomalies, and surface actionable insights for decision-makers — applied to learner performance, operational risk, financial modelling, and resource planning.',
            'We build and maintain predictive models using your historical data, with explainability built in for regulated and public-sector contexts.',
          ],
        },
        {
          title: 'Process Automation',
          texts: [
            'Intelligent automation of repetitive tasks using machine learning, NLP, and workflow orchestration — reducing manual processing time and error rates dramatically.',
            "From document classification and data extraction to automated report generation and smart routing, we automate the processes that drain your team's time.",
          ],
        },
      ]}
      principlesLabel="Our principles"
      principlesTitle="Responsible AI by design"
      principles={[
        { title: 'Explainability', text: 'Every model we deploy includes explainability tools so stakeholders understand why the AI makes the decisions it does — critical in education, finance, and public sector contexts.' },
        { title: 'Data Sovereignty', text: 'We design AI systems that keep sensitive data within your jurisdiction — using local cloud, on-premise deployment, or privacy-preserving federated learning where appropriate.' },
        { title: 'Bias Testing', text: 'All models are tested for demographic bias before deployment, with ongoing monitoring and retraining schedules to ensure fairness is maintained as data distributions shift.' },
        { title: 'Human Oversight', text: 'Our AI systems are designed with human review workflows for high-stakes decisions. AI augments human judgement — it does not replace accountability.' },
      ]}
    />
  )
}
