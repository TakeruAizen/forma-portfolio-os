'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from './motion-primitives'

const steps = [
  { n: '01', title: 'Discover', desc: 'We learn about your business, audience and goals.' },
  { n: '02', title: 'Design', desc: 'We establish the visual direction and structure.' },
  { n: '03', title: 'Build', desc: 'We turn the design into a fast, responsive website.' },
  { n: '04', title: 'Launch', desc: 'We test everything and get your website online.' },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="process" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Process
          </p>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            From idea to launch.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16">
          {/* Progress line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-0 md:right-0 md:top-[3.25rem] md:bottom-auto md:h-px md:w-full">
            <motion.div
              style={{
                scaleY: lineScale,
                scaleX: lineScale,
              }}
              className="absolute inset-0 origin-top bg-foreground md:origin-left"
            />
          </div>

          <div className="grid gap-12 md:grid-cols-4 md:gap-8">
            {steps.map((step, i) => (
              <ProcessStep key={step.n} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessStep({
  step,
  index,
}: {
  step: { n: string; title: string; desc: string }
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      className="relative pl-8 md:pl-0 md:pt-20"
    >
      <span className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border border-foreground bg-background md:top-[2.55rem] md:-translate-y-1/2" />
      <span className="font-display text-sm text-muted-foreground">{step.n}</span>
      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
    </motion.div>
  )
}
