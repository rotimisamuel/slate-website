import ServiceTemplate from '@/components/ServiceTemplate'

export default function HardwarePage() {
  return (
    <ServiceTemplate
      num="06"
      heroTitle="Hardware & Flexi-Pay"
      heroSub="Laptops, smartphones, tablets, desktops, and power systems — engineered for African infrastructure and accessible through our transparent Buy Now, Pay Later ownership model."
      buildTitle="Devices built for Africa"
      buildLead={[
        'Slate hardware is engineered for African realities — dustproof builds, extended battery life, offline capability, and voltage regulation for environments with unreliable power.',
        'Our Flexi-Pay plan makes premium devices accessible at every income level: acquire your device today and spread the cost over 6–24 months with a transparent 3% monthly declining-balance fee.',
      ]}
      buildCta="Enquire about Flexi-Pay"
      buildCards={[
        {
          title: 'Laptops & Desktops',
          texts: [
            'Professional, business, and student laptops — 13″ to 15.6″ — with Intel Core i3 to i7 processors, SSD storage, and dustproof builds rated for African working conditions.',
            'Slate desktops include the AiO 24 with built-in UPS and the Tower Pro — enterprise-grade, both available through our flexible payment plan.',
          ],
        },
        {
          title: 'Smartphones & Tablets',
          texts: [
            'Flagship, mid-range, and essential smartphones — from the 5G X1 Pro to the rugged E3 — alongside Pro, Student, and Junior tablet lines covering every use case and budget.',
            'All Slate mobile devices include dual SIM support, large-capacity batteries, and compatibility with our offline LMS applications.',
          ],
        },
        {
          title: 'Power & UPS',
          texts: [
            'UPS systems from 1KVA to 5KVA with pure sine wave output, auto-voltage regulation, and LCD monitoring — keeping devices running through power outages.',
            'Solar-capable power banks (10,000–40,000mAh) with 65W–100W USB-C PD output and field-grade rugged construction for outdoor deployment.',
          ],
        },
        {
          title: 'Warranty & Service',
          texts: [
            'Full 1-year manufacturer warranty on every Slate device, with extended SLA programmes for enterprise clients — on-site servicing and dedicated account management.',
            'Our nationwide service network covers major cities in Nigeria, with partner service points across West Africa for enterprise deployments.',
          ],
        },
      ]}
      pricing={[
        { term: '6 months',  monthly: '₦184',   total: '₦1,104', fees: '₦104' },
        { term: '12 months', monthly: '₦100',   total: '₦1,200', fees: '₦200' },
        { term: '18 months', monthly: '₦72.50', total: '₦1,305', fees: '₦305' },
        { term: '24 months', monthly: '₦59',    total: '₦1,416', fees: '₦416' },
      ]}
    />
  )
}
