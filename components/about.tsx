'use client'

import { motion } from 'motion/react'
import { Reveal, staggerContainer, staggerItem } from './motion-primitives'

const statements = [
  {
    title: 'Direct Communication',
    desc: 'Talk directly with the person building your website.',
  },
  {
    title: 'Thoughtful Design',
    desc: 'Every section has a purpose.',
  },
  {
    title: 'Quality Over Quantity',
    desc: 'Fewer projects means more attention for each one.',
  },
]

export function About() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-card py-28 sm:py-40">
      <div className="grid-bg radial-fade pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                About FORMA
              </p>
              <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
                Small studio. Big attention to detail.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                FORMA is built around a simple idea: a good website doesn&apos;t need to be
                complicated. It needs to understand the business, communicate clearly and feel great
                to use.
              </p>
            </Reveal>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-20 grid gap-8 border-t border-border pt-12 sm:grid-cols-3"
        >
          {statements.map((s, i) => (
            <motion.div key={s.title} variants={staggerItem}>
              <span className="font-display text-sm text-muted-foreground">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-[0.1em]">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
