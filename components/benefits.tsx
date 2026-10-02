'use client'

import { motion } from 'motion/react'
import { Reveal, staggerContainer, staggerItem } from './motion-primitives'

const benefits = [
  { title: 'Fast', desc: 'Built for quick loading and smooth browsing.' },
  { title: 'Responsive', desc: 'Designed to look great on phones, tablets and desktops.' },
  { title: 'Modern', desc: 'Clean interfaces built around current web standards.' },
  {
    title: 'Custom',
    desc: 'Designed around your business instead of forcing your business into a template.',
  },
  { title: 'SEO Ready', desc: 'Structured with search engines in mind.' },
  { title: 'Detail-Driven', desc: 'Small details that make the final experience feel polished.' },
]

export function Benefits() {
  return (
    <section className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Why FORMA
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            More than just a pretty homepage.
          </h2>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              variants={staggerItem}
              className="group bg-background p-8 transition-colors duration-500 hover:bg-card sm:p-10"
            >
              <span className="font-display text-xs text-muted-foreground">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold uppercase tracking-[0.12em]">
                {b.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
