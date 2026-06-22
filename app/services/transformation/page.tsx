import ServiceTemplate from '@/components/ServiceTemplate'

export default function TransformationPage() {
  return (
    <ServiceTemplate
      num="02"
      heroTitle="Digital Transformation"
      heroSub="End-to-end digital transformation — from legacy modernisation to full re-architecture, with change management built into every programme."
      buildTitle="Transformation at scale"
      buildLead={[
        'We partner with organisations undergoing digital change. We assess your existing processes and infrastructure, design pragmatic roadmaps, and implement solutions that deliver measurable operational improvement.',
        'Our transformation work is grounded in operational reality: we sequence change for absorbable disruption, prioritise quick wins, and build long-term capability with your team at the centre.',
      ]}
      buildCta="Discuss your transformation"
      buildCards={[
        {
          title: 'Roadmaps & Strategy',
          texts: [
            'Phased transformation strategies that align with operational rhythms and budget cycles — prioritising what delivers value early without compromising the long view.',
            'We produce a documented roadmap with milestones, decision points, and dependency mapping — ready for board approval.',
          ],
        },
        {
          title: 'Process Modernisation',
          texts: [
            'Replacing manual and legacy processes with efficient, automated digital workflows — reducing cost, errors, and time-to-completion measurably.',
            'We document current-state and future-state process flows, then implement them in modern systems with full audit trails.',
          ],
        },
        {
          title: 'System Integration',
          texts: [
            'Connecting fragmented HR, finance, operations, and field systems into a unified, coherent digital infrastructure that gives leadership a single source of truth.',
            'We deliver integration architectures that respect your existing investments while opening pathways to modernisation.',
          ],
        },
        {
          title: 'Change Management',
          texts: [
            'Structured adoption programmes ensuring your people embrace new technology confidently — training, documentation, super-users, and feedback loops.',
            'We treat change as a first-class workstream, not an afterthought — because the best system fails without adoption.',
          ],
        },
      ]}
      principlesLabel="Our approach"
      principlesTitle="Transformation principles"
      principles={[
        { title: 'Outcome-First', text: 'Every transformation starts with the business outcome, not the technology. We work backwards from value to capability.' },
        { title: 'Absorbable Change', text: 'We sequence change for absorbable disruption — quick wins that fund and build confidence for deeper change.' },
        { title: 'Capability Transfer', text: 'Our goal is to leave your team more capable than we found it — not dependent on us long after delivery.' },
        { title: 'Measured Impact', text: 'Every workstream has a measurable outcome. We instrument from day one so impact is visible, not anecdotal.' },
      ]}
    />
  )
}
