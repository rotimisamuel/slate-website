import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Services from '@/components/Services'
import Difference from '@/components/Difference'
import StatsBand from '@/components/StatsBand'
import Partnership from '@/components/Partnership'
import Quote from '@/components/Quote'
import FAQ from '@/components/FAQ'
import CTAStrip from '@/components/CTAStrip'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav active="home" />
      <Hero />
      <Marquee />
      <Services />
      <Difference />
      <StatsBand />
      <Partnership />
      <Quote />
      <FAQ />
      <CTAStrip />
      <Footer />
    </main>
  )
}
