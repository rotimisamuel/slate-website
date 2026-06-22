import ServiceTemplate from '@/components/ServiceTemplate'

export default function SoftwarePage() {
  return (
    <ServiceTemplate
      num="01"
      heroTitle="Custom Software Development"
      heroSub="Bespoke web applications, mobile platforms, APIs, and backend systems — scalable, secure, and built to your exact specifications."
      buildTitle="What we build"
      buildLead={[
        'From citizen-facing government portals to high-throughput enterprise platforms, we architect and deliver software that performs at scale — on African infrastructure and beyond.',
        'Every engagement begins with discovery: understanding your users, your environment, and your constraints before a single line of code is written.',
      ]}
      buildCta="Start a project"
      buildCards={[
        {
          title: 'Web Applications',
          texts: [
            'Full-stack web platforms — from enterprise management portals and citizen-facing government services to SaaS products and internal tooling. Built for performance, accessibility, and long-term maintainability.',
            'We use proven frameworks matched to your requirements, with architecture decisions documented for your team to own and evolve after delivery.',
          ],
        },
        {
          title: 'Mobile Development',
          texts: [
            'iOS and Android apps with offline capability, optimised for low-bandwidth environments — essential for African markets where connectivity is variable.',
            'We build native and cross-platform mobile applications: field-force tools, inspection apps, learning apps, and consumer-facing products with robust offline sync.',
          ],
        },
        {
          title: 'API & Integrations',
          texts: [
            'Robust RESTful and GraphQL API design, third-party integration, and middleware development — connecting HR systems, payment gateways, biometric identity, and government databases.',
            'We follow API-first principles so your software is composable, extensible, and ready for future integrations from day one.',
          ],
        },
        {
          title: 'Cloud Infrastructure',
          texts: [
            'Scalable cloud architecture on AWS, Azure, or local providers — 99%+ uptime, data sovereignty compliance, and cost efficiency at every stage of growth.',
            'We handle infrastructure-as-code, CI/CD pipelines, containerisation, and monitoring so your team can ship with confidence.',
          ],
        },
      ]}
      techTags={['React / Next.js', 'Node.js', 'Python', 'React Native', 'PostgreSQL', 'AWS', 'Open Source']}
      principlesLabel="How we work"
      principlesTitle="Our delivery process"
      principles={[
        { title: '01 · Discovery', text: 'Requirements workshops, technical scoping, user research, and architecture planning — grounded in reality, not assumptions.' },
        { title: '02 · Design', text: 'UX wireframes, system design, and technical specification — reviewed and signed off before development begins.' },
        { title: '03 · Build', text: 'Agile sprints with regular demos, code reviews, automated testing, and continuous integration throughout.' },
        { title: '04 · Deploy & Support', text: 'Managed deployment, user acceptance testing, training, and ongoing maintenance post-launch.' },
      ]}
    />
  )
}
