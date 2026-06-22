import ServiceTemplate from '@/components/ServiceTemplate'

export default function ConsultingPage() {
  return (
    <ServiceTemplate
      num="05"
      heroTitle="Technology Consulting"
      heroSub="Strategic technology advisory for enterprises and institutions — system selection, vendor management, ICT governance, and digital investment planning."
      buildTitle="Strategic advisory"
      buildLead={[
        'We translate complexity into clear decisions. Our advisory work is independent, evidence-based, and grounded in delivery experience — we recommend what we ourselves would build.',
        'Whether you are evaluating a major system procurement, designing an ICT governance framework, or building a multi-year digital investment case, our consulting practice supports leadership with rigorous, vendor-neutral analysis.',
      ]}
      buildCta="Get expert advice"
      buildCards={[
        {
          title: 'Technology Strategy',
          texts: [
            'Multi-year technology strategies aligned with your organisational goals and the operational realities of your sector — not generic templates.',
            'We produce strategy documents that boards approve and operations teams can actually execute, with clear sequencing, cost models, and risk frameworks.',
          ],
        },
        {
          title: 'ICT Governance',
          texts: [
            'Frameworks and policies ensuring technology investments deliver value and manage risk appropriately — covering procurement, security, data, and architecture.',
            'Our governance frameworks are pragmatic — they enable speed where appropriate and apply controls where genuinely needed.',
          ],
        },
        {
          title: 'Vendor Management',
          texts: [
            'Independent vendor evaluation — procurement support, contract review, and performance monitoring. We are not a reseller, so our advice is genuinely independent.',
            'From RFP design to contract negotiation to ongoing SLA management, we represent your interests in the vendor relationship.',
          ],
        },
        {
          title: 'Digital Investment',
          texts: [
            'Business case development and investment appraisal — ensuring every pound or naira is well spent, with measurable returns mapped to organisational outcomes.',
            'We produce investment cases that withstand finance committee and board scrutiny — with sensitivity analysis, benefit realisation plans, and post-implementation review frameworks.',
          ],
        },
      ]}
      principlesLabel="How we engage"
      principlesTitle="Our advisory approach"
      principles={[
        { title: 'Independent', text: 'We do not resell software or hardware in this practice. Our recommendations are based on what is right for you, not what is profitable for us.' },
        { title: 'Evidence-Based', text: 'Every recommendation is supported by data — usage analytics, market evidence, peer benchmarking, and operational measurement.' },
        { title: 'Delivery-Grounded', text: 'We have built what we recommend. Our advice is shaped by hands-on knowledge of what actually works in production.' },
        { title: 'Plain-Spoken', text: 'We do not hide behind jargon. Our reports are written for the people who must read and act on them.' },
      ]}
    />
  )
}
