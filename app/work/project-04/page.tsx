'use client'

import Image from 'next/image'
import { DemoBar, DemoReveal, useParallax, motion } from '@/components/demo/demo-ui'

const projects = [
  { name: 'Cliff House', year: '2025', place: 'Coastal Residence' },
  { name: 'Union Atrium', year: '2024', place: 'Civic & Cultural' },
  { name: 'Sand Court', year: '2024', place: 'Private Residence' },
  { name: 'Meridian HQ', year: '2023', place: 'Workplace' },
]

const disciplines = ['Architecture', 'Interior', 'Masterplanning', 'Research']

export default function MeridianPage() {
  const hero = useParallax(80)

  return (
    <main className="min-h-screen bg-[#e9e5dd] font-[family-name:var(--font-meridian)] text-[#1a2436] antialiased">
      <DemoBar
        label="Demo Concept"
        className="text-[#1a2436]"
        linkClassName="text-[#1a2436]"
        badgeClassName="border-[#1a2436]/30 text-[#1a2436]"
      />

      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <motion.div ref={hero.ref} style={{ y: hero.y }} className="absolute inset-0 -z-10">
          <Image
            src="/work/meridian/hero.png"
            alt="Minimalist concrete and glass architecture at blue hour"
            fill
            priority
            className="scale-110 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#e9e5dd] via-[#e9e5dd]/40 to-transparent" />
        </motion.div>

        <div className="mx-auto w-full max-w-7xl px-6 pb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-medium uppercase tracking-[0.4em] text-[#c98a3c]"
          >
            Architecture Studio · Est. 2011
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mt-5 text-6xl font-semibold uppercase leading-[0.9] tracking-tight sm:text-8xl"
          >
            Meridian
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-[#1a2436]/75"
          >
            We design buildings that hold light, weather and time with quiet precision. Spaces
            reduced to what matters.
          </motion.p>
        </div>
      </section>

      {/* Statement */}
      <section className="border-b border-[#1a2436]/12 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <DemoReveal>
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-[#c98a3c]">
              Practice
            </p>
            <h2 className="mt-6 text-3xl font-medium leading-tight sm:text-5xl">
              Restraint is a discipline. We remove until only the essential remains — structure,
              light and material speaking for themselves.
            </h2>
          </DemoReveal>
          <div className="mt-12 flex flex-wrap gap-3">
            {disciplines.map((d, i) => (
              <DemoReveal key={d} delay={i * 0.06}>
                <span className="rounded-full border border-[#1a2436]/25 px-5 py-2 text-xs font-medium uppercase tracking-[0.18em]">
                  {d}
                </span>
              </DemoReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interior feature */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <DemoReveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/work/meridian/interior.png"
                alt="Minimalist interior with sand walls, navy accents and a sculptural staircase"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </DemoReveal>
          <DemoReveal delay={0.1}>
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-[#c98a3c]">
              Approach
            </p>
            <h2 className="mt-5 text-4xl font-medium leading-tight sm:text-5xl">
              Light is the first material.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#1a2436]/70">
              Every plan begins with the path of the sun. We shape rooms so daylight moves through
              them — warm in the morning, soft by evening.
            </p>
          </DemoReveal>
        </div>
      </section>

      {/* Selected works */}
      <section className="border-y border-[#1a2436]/12 bg-[#1a2436] py-24 text-[#e9e5dd]">
        <div className="mx-auto max-w-6xl px-6">
          <DemoReveal>
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-[#c98a3c]">
              Selected Works
            </p>
            <h2 className="mt-5 text-4xl font-medium sm:text-5xl">Recent projects</h2>
          </DemoReveal>
          <div className="mt-12 divide-y divide-[#e9e5dd]/15 border-t border-[#e9e5dd]/15">
            {projects.map((p, i) => (
              <DemoReveal key={p.name} delay={i * 0.06}>
                <div className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6 transition-colors hover:text-[#c98a3c]">
                  <span className="font-mono text-xs text-[#e9e5dd]/50">{p.year}</span>
                  <h3 className="text-2xl font-medium sm:text-3xl">{p.name}</h3>
                  <span className="text-xs uppercase tracking-[0.18em] text-[#e9e5dd]/55 transition-transform duration-300 group-hover:-translate-x-1">
                    {p.place}
                  </span>
                </div>
              </DemoReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-32 text-center">
        <DemoReveal>
          <h2 className="text-4xl font-medium leading-tight sm:text-6xl">
            Let&apos;s build something lasting.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-[#1a2436]/70">
            We take on a small number of projects each year. Tell us about yours.
          </p>
          <button className="mt-10 rounded-full bg-[#1a2436] px-8 py-3.5 text-sm font-medium text-[#e9e5dd] transition-transform hover:scale-105">
            Start a Conversation
          </button>
        </DemoReveal>
      </section>

      <footer className="border-t border-[#1a2436]/12 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#c98a3c]">
            Fictional demo concept
          </p>
          <p className="max-w-md text-xs leading-relaxed text-[#1a2436]/55">
            MERIDIAN is not a real studio. It was designed by FORMA to demonstrate the kind of brand
            experience we build for clients.
          </p>
        </div>
      </footer>
    </main>
  )
}
