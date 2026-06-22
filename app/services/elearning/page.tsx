import ServiceTemplate from '@/components/ServiceTemplate'

export default function ElearningPage() {
  return (
    <ServiceTemplate
      num="04"
      heroTitle="E-Learning Platform Development"
      heroSub="Scalable, mobile-first LMS platforms for governments, universities, and corporates — offline-capable, AI-powered, and built for Africa's connectivity realities."
      buildTitle="Learning at national scale"
      buildLead={[
        'We are on the way to delivering the Nigerian Police Force Digital Learning Platform — a system designed for 370,000+ officers with offline access, AI personalisation, and full mobile capability.',
        'Our platforms are built on enterprise Moodle with custom extensions for African deployment: offline sync, SMS notifications, low-bandwidth media delivery, and multilingual content support.',
      ]}
      buildCta="Discuss your platform"
      buildCards={[
        {
          title: 'LMS Design & Build',
          texts: [
            'Custom Moodle-based platforms supporting hundreds of thousands of concurrent users — designed for 99%+ uptime, role-based access, and multi-organisation deployment.',
            'We handle the full LMS lifecycle: requirements, information architecture, UX design, custom module development, content migration, and launch support.',
          ],
        },
        {
          title: 'Mobile-First & Offline',
          texts: [
            'Dedicated iOS and Android apps with content download and offline sync — providing equitable access for users in low-connectivity regions across Africa.',
            'Our offline architecture allows learners to download entire course modules, complete assessments without internet, and sync automatically when connectivity is restored.',
          ],
        },
        {
          title: 'Gamification',
          texts: [
            'Points, badges, leaderboards, and challenges that drive completion rates and embed content through active engagement — proven to increase course completion by 40–60%.',
            'We design gamification systems that are contextually appropriate for your audience — motivating without trivialising the learning objective.',
          ],
        },
        {
          title: 'Analytics & Reporting',
          texts: [
            'Real-time dashboards tracking enrolment, completion, performance, and knowledge retention across learner cohorts — giving administrators actionable insight at every level.',
            'Custom reporting pipelines deliver compliance reports for regulators, performance data for line managers, and portfolio analytics for learning teams.',
          ],
        },
      ]}
      caseNoteTitle="Case Note · Nigerian Police Force"
      caseNote="Slate is delivering an LMS platform designed to serve 370,000+ officers across Nigeria — featuring offline access, AI tutoring, gamification, and full HR-system integration."
    />
  )
}
