'use client'

import Image from 'next/image'
import { DemoBar, DemoReveal, useParallax, motion } from '@/components/demo/demo-ui'

const menu = [
  { name: 'Single Origin Espresso', note: 'Ethiopia · Yirgacheffe', price: '₹320' },
  { name: 'Slow Pour Filter', note: 'Colombia · Huila', price: '₹280' },
  { name: 'Barrel-Aged Cold Brew', note: '18 hour steep', price: '₹360' },
  { name: 'Cortado', note: 'Double shot · silk milk', price: '₹240' },
]

export default function NoirPage() {
  const hero = useParallax(70)

  return (
    <main
      className="min-h-screen bg-[#161009] font-[family-name:var(--font-noir)] text-[#efe6d8] antialiased"
      style={{ colorScheme: 'dark' }}
    >
      <DemoBar
        label="Demo Concept"
        className="text-[#efe6d8]"
        linkClassName="text-[#efe6d8]"
        badgeClassName="border-[#c8a24a]/40 text-[#c8a24a]"
      />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <motion.div ref={hero.ref} style={{ y: hero.y }} className="absolute inset-0 -z-10">
          <Image
            src="/work/noir/hero.png"
            alt="Espresso pouring into a ceramic cup under warm light"
            fill
            priority
            className="scale-110 object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161009] via-[#161009]/70 to-[#161009]/40" />
        </motion.div>

        <div className="mx-auto w-full max-w-6xl px-6 pt-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs uppercase tracking-[0.4em] text-[#c8a24a]"
          >
            Est. — Small Batch Roastery
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mt-6 text-6xl font-medium leading-[0.95] tracking-tight sm:text-8xl"
          >
            NOIR
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="mt-6 max-w-md font-sans text-base leading-relaxed text-[#efe6d8]/70"
          >
            Coffee treated like fine spirits. Rare origins, roasted in small batches and poured with
            intent.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4 font-sans"
          >
            <button className="rounded-full bg-[#c8a24a] px-7 py-3 text-sm font-medium text-[#161009] transition-transform hover:scale-105">
              Explore the Menu
            </button>
            <button className="rounded-full border border-[#efe6d8]/25 px-7 py-3 text-sm font-medium transition-colors hover:border-[#c8a24a] hover:text-[#c8a24a]">
              Find the Roastery
            </button>
          </motion.div>
        </div>
      </section>

      {/* Ethos */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <DemoReveal>
            <p className="text-xs uppercase tracking-[0.4em] text-[#c8a24a]">The Craft</p>
            <h2 className="mt-6 text-4xl font-medium leading-tight sm:text-6xl">
              Darkness, done with warmth.
            </h2>
            <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-[#efe6d8]/70">
              Every bean is sourced from a single estate and roasted to a signature profile —
              deep, rounded and never bitter. NOIR is the ritual of the first cup, refined.
            </p>
          </DemoReveal>
          <DemoReveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#c8a24a]/20">
              <Image
                src="/work/noir/product.png"
                alt="Matte black NOIR coffee bag with gold accents"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </DemoReveal>
        </div>
      </section>

      {/* Menu */}
      <section className="border-y border-[#efe6d8]/10 bg-[#1d150d] py-28">
        <div className="mx-auto max-w-3xl px-6">
          <DemoReveal className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#c8a24a]">The Pour List</p>
            <h2 className="mt-5 text-4xl font-medium sm:text-5xl">Selected servings</h2>
          </DemoReveal>
          <div className="mt-14 space-y-px">
            {menu.map((item, i) => (
              <DemoReveal key={item.name} delay={i * 0.06}>
                <div className="group flex items-baseline justify-between gap-6 border-b border-[#efe6d8]/10 py-6 transition-colors hover:border-[#c8a24a]/50">
                  <div>
                    <h3 className="text-2xl font-medium transition-colors group-hover:text-[#c8a24a]">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-[#efe6d8]/50">{item.note}</p>
                  </div>
                  <span className="font-sans text-lg text-[#c8a24a]">{item.price}</span>
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
            A quieter kind of morning.
          </h2>
          <p className="mx-auto mt-6 max-w-md font-sans text-base text-[#efe6d8]/70">
            Reserve a tasting flight or subscribe to have fresh batches delivered as they roast.
          </p>
          <button className="mt-10 rounded-full bg-[#c8a24a] px-8 py-3.5 font-sans text-sm font-medium text-[#161009] transition-transform hover:scale-105">
            Reserve a Tasting
          </button>
        </DemoReveal>
      </section>

      <DemoFooter accent="#c8a24a" muted="#efe6d8" />
    </main>
  )
}

function DemoFooter({ accent, muted }: { accent: string; muted: string }) {
  return (
    <footer
      className="border-t border-white/10 px-6 py-10 font-sans"
      style={{ color: `${muted}` }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: accent }}>
          Fictional demo concept
        </p>
        <p className="max-w-md text-xs leading-relaxed opacity-60">
          NOIR is not a real business. It was designed by FORMA to demonstrate the kind of brand
          experience we build for clients.
        </p>
      </div>
    </footer>
  )
}
