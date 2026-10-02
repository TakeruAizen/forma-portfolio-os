'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from './motion-primitives'

const faqs = [
  {
    q: 'How long does a website take?',
    a: 'Most standard websites are completed within 2–3 days. Larger or highly custom projects may take longer depending on scope.',
  },
  {
    q: 'What do I need to provide?',
    a: 'Usually just your business details, content, images and any examples of websites you like. If you’re missing something, we can help structure it.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Yes. We can redesign an existing website while improving its visual design, responsiveness, structure and overall user experience.',
  },
  {
    q: 'Can I request changes?',
    a: 'Yes. Revisions are included depending on the selected package. We’ll make sure the final result matches the agreed direction.',
  },
  {
    q: 'Do you provide hosting?',
    a: 'Yes. Hosting can be arranged as part of the project, depending on your requirements.',
  },
  {
    q: 'Can you connect my custom domain?',
    a: 'Yes. We can help connect your existing domain to the finished website.',
  },
  {
    q: 'Do you build e-commerce websites?',
    a: 'We focus on modern marketing and brand websites, and we can integrate lightweight commerce or discuss a custom scope for larger stores.',
  },
  {
    q: 'Can I request a custom package?',
    a: 'Of course. If none of the packages fit, tell us what you need and we will build a custom quote around your project.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            FAQ
          </p>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Questions, answered.
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg font-medium tracking-tight sm:text-xl">
                    {item.q}
                  </span>
                  <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                    <span className="absolute h-px w-4 bg-foreground" />
                    <motion.span
                      animate={{ rotate: isOpen ? 0 : 90 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute h-px w-4 bg-foreground"
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
