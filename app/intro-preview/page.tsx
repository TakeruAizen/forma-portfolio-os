import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Intro } from '@/components/intro'
import { Services } from '@/components/services'
import { Pricing } from '@/components/pricing'
import { Benefits } from '@/components/benefits'
import { Process } from '@/components/process'
import { Portfolio } from '@/components/portfolio'
import { About } from '@/components/about'
import { FAQ } from '@/components/faq'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { IntroSequence } from '@/components/intro-sequence'
import { Snowfall } from '@/components/snowfall'

export default function IntroPreviewPage() {
  return (
    <div className="forma-surface relative isolate min-h-screen">
      <Snowfall />
      <div className="relative z-10">
        <IntroSequence previewMode />
        <Navbar />
        <main>
          <Hero />
          <Intro />
          <Services />
          <Pricing />
          <Benefits />
          <Process />
          <Portfolio />
          <About />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
