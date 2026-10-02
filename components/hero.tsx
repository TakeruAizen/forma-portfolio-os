'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { RevealWords } from './motion-primitives'

const easeOut = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden pt-32 pb-20"
    >
      {/* Animated monochrome background */}
      <motion.div style={{ y: yBg }} className="pointer-events-none absolute inset-0">
        <div className="grid-bg radial-fade absolute inset-0" />
        <FloatingShapes />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.3 }}
          className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground"
        >
          <span className="inline-block h-px w-8 bg-muted-foreground/60" />
          Independent Digital Web Studio
        </motion.p>

        <h1 className="font-display text-[13vw] font-bold leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl">
          <span className="block">
            <RevealWords text="Websites, shaped" delay={0.4} />
          </span>
          <span className="block text-muted-foreground">
            <RevealWords text="with purpose." delay={0.6} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 1 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Modern, responsive websites for businesses and brands that want to look as good online as
          they do in real life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 1.15 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#pricing"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            View Packages
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:bg-muted"
          >
            Start a Project
          </a>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <div className="flex flex-col items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Scroll to explore
          <span className="relative flex h-10 w-px overflow-hidden bg-border">
            <motion.span
              animate={{ y: ['-100%', '150%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-0 top-0 h-4 bg-foreground"
            />
          </span>
        </div>
      </motion.div>
    </section>
  )
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-20 top-1/4 h-[28rem] w-[28rem] rounded-full border border-white/[0.06]"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-10 top-1/3 h-80 w-80 rounded-full border border-white/[0.05]"
      />
      <motion.div
        animate={{ y: [0, -24, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-40 top-1/2 hidden h-40 w-40 rotate-45 border border-white/[0.07] lg:block"
      />
    </div>
  )
}
