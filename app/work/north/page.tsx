'use client'

import Image from 'next/image'
import { DemoBar, DemoReveal, useParallax, motion } from '@/components/demo/demo-ui'

const courses = [
  { name: 'Charred Leek & Hazelnut', note: 'brown butter, aged parmesan', price: '₹480' },
  { name: 'Slow Lamb Shoulder', note: 'smoked root vegetables', price: '₹920' },
  { name: 'Wild Mushroom Risotto', note: 'thyme, truffle oil', price: '₹640' },
  { name: 'Burnt Honey Custard', note: 'sea salt, olive oil', price: '₹360' },
]

export default function NorthPage() {
  const hero = useParallax(60)

  return (
    <main className="min-h-screen bg-[#f4efe6] font-[family-name:var(--font-north)] text-[#24302a] antialiased">
      <DemoBar
        label="Demo Concept"
        className="text-[#24302a]"
        linkClassName="text-[#24302a]"
        badgeClassName="border-[#2f4a3a]/30 text-[#2f4a3a]"
      />

      {/* Hero */}
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pt-28 pb-16 lg:grid-cols-2 lg:pt-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-xs uppercase tracking-[0.4em] text-[#c06a45]"
          >
            Seasonal · Kitchen & Table
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mt-5 text-7xl font-light leading-[0.9] tracking-tight sm:text-8xl"
          >
            NORTH
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="mt-6 max-w-md font-sans text-base leading-relaxed text-[#24302a]/70"
          >
            A modern kitchen rooted in seasonal produce. Honest cooking, warm rooms and a menu that
            changes with the harvest.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-4 font-sans"
          >
            <button className="rounded-full bg-[#2f4a3a] px-7 py-3 text-sm font-medium text-[#f4efe6] transition-transform hover:scale-105">
              Reserve a Table
            </button>
            <button className="rounded-full border border-[#24302a]/25 px-7 py-3 text-sm font-medium transition-colors hover:border-[#c06a45] hover:text-[#c06a45]">
              View the Menu
            </button>
          </motion.div>
        </div>

        <motion.div ref={hero.ref} style={{ y: hero.y }} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl"
          >
            <Image
              src="/work/north/hero.png"
              alt="Warm modern restaurant interior with forest green accents"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy band */}
      <section className="border-y border-[#24302a]/10 bg-[#2f4a3a] py-24 text-[#f4efe6]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <DemoReveal>
            <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#e6d6a8]">
              Our Table
            </p>
            <h2 className="mt-6 text-4xl font-light leading-tight sm:text-6xl">
              Cooked close to the source.
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-[#f4efe6]/75">
              We work with a small circle of growers and change the menu as often as the seasons
              allow. Nothing travels far to reach your plate.
            </p>
          </DemoReveal>
        </div>
      </section>

      {/* Menu + dish */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <DemoReveal>
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image
                src="/work/north/dish.png"
                alt="Elegantly plated seasonal dish on a dark green table"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </DemoReveal>
          <DemoReveal delay={0.1}>
            <p className="font-sans text-xs uppercase tracking-[0.4em] text-[#c06a45]">
              Autumn Menu
            </p>
            <h2 className="mt-4 text-4xl font-light sm:text-5xl">A short, changing list</h2>
            <div className="mt-8 space-y-px">
              {courses.map((c) => (
                <div
                  key={c.name}
                  className="group flex items-baseline justify-between gap-6 border-b border-[#24302a]/12 py-5 transition-colors hover:border-[#2f4a3a]"
                >
                  <div>
                    <h3 className="text-2xl font-normal transition-colors group-hover:text-[#2f4a3a]">
                      {c.name}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-[#24302a]/55">{c.note}</p>
                  </div>
                  <span className="font-sans text-lg text-[#c06a45]">{c.price}</span>
                </div>
              ))}
            </div>
          </DemoReveal>
        </div>
      </section>

      {/* Hours / CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-32">
        <DemoReveal>
          <div className="grid gap-10 rounded-3xl border border-[#24302a]/12 bg-white/50 p-10 sm:grid-cols-3 sm:p-14">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.28em] text-[#c06a45]">Hours</p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#24302a]/75">
                Wed – Sun
                <br />
                6:00pm – 11:00pm
              </p>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.28em] text-[#c06a45]">Find us</p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#24302a]/75">
                14 Orchard Lane
                <br />
                The Old Mill District
              </p>
            </div>
            <div className="flex flex-col items-start justify-center">
              <button className="rounded-full bg-[#2f4a3a] px-7 py-3 font-sans text-sm font-medium text-[#f4efe6] transition-transform hover:scale-105">
                Book Your Table
              </button>
            </div>
          </div>
        </DemoReveal>
      </section>

      <footer className="border-t border-[#24302a]/12 px-6 py-10 font-sans">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c06a45]">Fictional demo concept</p>
          <p className="max-w-md text-xs leading-relaxed text-[#24302a]/55">
            NORTH is not a real restaurant. It was designed by FORMA to demonstrate the kind of
            brand experience we build for clients.
          </p>
        </div>
      </footer>
    </main>
  )
}
