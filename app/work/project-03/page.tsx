'use client'

import Image from 'next/image'
import { DemoBar, DemoReveal, useParallax, motion } from '@/components/demo/demo-ui'

const products = [
  { name: 'Barrier Serum', note: 'ceramides + squalane', price: '₹1,890' },
  { name: 'Quiet Cleanser', note: 'gentle, pH balanced', price: '₹1,240' },
  { name: 'Day Fluid SPF', note: 'weightless mineral', price: '₹2,150' },
]

const rituals = [
  { step: '01', title: 'Cleanse', copy: 'A soft, low-foam wash that never strips.' },
  { step: '02', title: 'Restore', copy: 'Serum that rebuilds the skin barrier overnight.' },
  { step: '03', title: 'Protect', copy: 'A breathable fluid that finishes the ritual.' },
]

export default function AuraPage() {
  const hero = useParallax(50)

  return (
    <main className="min-h-screen bg-[#f7f1ea] font-[family-name:var(--font-aura)] text-[#3a2e2a] antialiased">
      <DemoBar
        label="Demo Concept"
        className="text-[#3a2e2a]"
        linkClassName="text-[#3a2e2a]"
        badgeClassName="border-[#c2755c]/40 text-[#c2755c]"
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pt-28 pb-16 lg:grid-cols-2 lg:pt-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs font-medium uppercase tracking-[0.35em] text-[#c2755c]"
            >
              Skincare · Made Simple
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mt-5 text-7xl font-semibold leading-[0.95] tracking-tight sm:text-8xl"
            >
              AURA
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="mt-6 max-w-md text-base font-light leading-relaxed text-[#3a2e2a]/70"
            >
              A calm, three-step routine built around your skin barrier. No noise, no thirty-step
              rituals — just what actually works.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <button className="rounded-full bg-[#c2755c] px-7 py-3 text-sm font-medium text-[#f7f1ea] transition-transform hover:scale-105">
                Shop the Ritual
              </button>
              <button className="rounded-full border border-[#3a2e2a]/20 px-7 py-3 text-sm font-medium transition-colors hover:border-[#c2755c] hover:text-[#c2755c]">
                Take the Skin Quiz
              </button>
            </motion.div>
          </div>

          <motion.div ref={hero.ref} style={{ y: hero.y }} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem]"
            >
              <Image
                src="/work/aura/hero.png"
                alt="Minimal skincare products in soft blush and terracotta tones"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ritual steps */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <DemoReveal className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#c2755c]">
            The Ritual
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
            Three steps. Nothing wasted.
          </h2>
        </DemoReveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {rituals.map((r, i) => (
            <DemoReveal key={r.step} delay={i * 0.08}>
              <div className="group h-full rounded-[1.5rem] border border-[#3a2e2a]/10 bg-white/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#c2755c]/40 hover:shadow-[0_20px_50px_-20px_rgba(194,117,92,0.4)]">
                <span className="text-sm font-semibold text-[#c2755c]">{r.step}</span>
                <h3 className="mt-4 text-2xl font-semibold">{r.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-[#3a2e2a]/65">
                  {r.copy}
                </p>
              </div>
            </DemoReveal>
          ))}
        </div>
      </section>

      {/* Texture band */}
      <section className="relative overflow-hidden bg-[#e8b7ac] py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <DemoReveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
              <Image
                src="/work/aura/texture.png"
                alt="Close up of soft blush cosmetic serum texture"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </DemoReveal>
          <DemoReveal delay={0.1}>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#7a3f30]">
              Formulated Kindly
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-[#3a2e2a] sm:text-5xl">
              Gentle enough to trust.
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-[#3a2e2a]/70">
              Fragrance-free, dermatologist-reviewed and made without the fillers that irritate.
              Every ingredient has a reason to be there.
            </p>
          </DemoReveal>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <DemoReveal className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#c2755c]">The Range</p>
          <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">Everything you need</h2>
        </DemoReveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {products.map((p, i) => (
            <DemoReveal key={p.name} delay={i * 0.08}>
              <div className="group rounded-[1.5rem] border border-[#3a2e2a]/10 bg-white/60 p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#c2755c]/40">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e8b7ac]/50 text-2xl font-semibold text-[#c2755c] transition-transform duration-500 group-hover:scale-110">
                  {p.name.charAt(0)}
                </div>
                <h3 className="mt-6 text-xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm font-light text-[#3a2e2a]/55">{p.note}</p>
                <p className="mt-4 text-lg font-medium text-[#c2755c]">{p.price}</p>
              </div>
            </DemoReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-32 text-center">
        <DemoReveal>
          <h2 className="text-4xl font-semibold leading-tight sm:text-6xl">
            Calm skin starts here.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base font-light text-[#3a2e2a]/70">
            Start with the full ritual and adjust as your skin tells you what it needs.
          </p>
          <button className="mt-10 rounded-full bg-[#c2755c] px-8 py-3.5 text-sm font-medium text-[#f7f1ea] transition-transform hover:scale-105">
            Build My Routine
          </button>
        </DemoReveal>
      </section>

      <footer className="border-t border-[#3a2e2a]/12 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#c2755c]">
            Fictional demo concept
          </p>
          <p className="max-w-md text-xs font-light leading-relaxed text-[#3a2e2a]/55">
            AURA is not a real brand. It was designed by FORMA to demonstrate the kind of brand
            experience we build for clients.
          </p>
        </div>
      </footer>
    </main>
  )
}
