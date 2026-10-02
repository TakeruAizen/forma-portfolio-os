'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from './motion-primitives'

export function Intro() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-border py-28 sm:py-40">
      {/* Large subtle number */}
      <motion.span
        style={{ y }}
        aria-hidden
        className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 font-display text-[34vw] font-bold leading-none text-white/[0.03] sm:text-[28rem]"
      >
        01
      </motion.span>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              <span className="inline-block h-px w-8 bg-muted-foreground/60" />
              The Idea
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Your website is often the first impression.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              People decide what they think about a business before they ever make contact. FORMA
              creates websites that make that first impression count.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
