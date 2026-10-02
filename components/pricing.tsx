'use client'

import { motion } from 'motion/react'
import { Reveal, staggerContainer, staggerItem } from './motion-primitives'

const plans = [
  {
    name: 'Starter',
    price: '₹3,999',
    desc: 'For individuals and small businesses that need a professional online presence.',
    features: [
      'Up to 3 pages',
      'Responsive design',
      'Modern UI',
      'Contact section',
      'Social media links',
      'Basic animations',
      'Mobile optimization',
      'Basic SEO setup',
    ],
    cta: 'Choose Starter',
    featured: false,
  },
  {
    name: 'Pro',
    price: '₹7,999',
    badge: 'Most Popular',
    desc: 'For businesses that want a polished website with more depth and interaction.',
    features: [
      'Up to 6 pages',
      'Custom visual design',
      'Advanced animations',
      'Responsive design',
      'Contact form',
      'Social media integration',
      'Google Maps integration',
      'Basic SEO',
      'Performance optimization',
      '2 rounds of revisions',
    ],
    cta: 'Choose Pro',
    featured: true,
  },
  {
    name: 'Premium',
    price: '₹14,999',
    desc: 'For brands and businesses that want a fully custom digital experience.',
    features: [
      'Fully custom website',
      'Up to 10 pages',
      'Premium animations',
      'Advanced interactions',
      'Custom sections',
      'Advanced responsive design',
      'Contact forms',
      'Social integrations',
      'SEO optimization',
      'Performance optimization',
      '3 rounds of revisions',
      'Priority support',
    ],
    cta: 'Choose Premium',
    featured: false,
  },
]

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 8.5L6.5 12L13 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Packages
          </p>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Simple pricing. Clear expectations.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Choose a starting point or tell us what you need and we&apos;ll create a custom plan.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.featured
                  ? 'border-white/25 bg-gradient-to-b from-card to-background shadow-[0_0_60px_-15px_rgba(255,255,255,0.15)]'
                  : 'border-border bg-background'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold tracking-tight">{plan.price}</span>
              </div>
              <p className="mt-4 min-h-14 text-sm leading-relaxed text-muted-foreground">
                {plan.desc}
              </p>

              <div className="my-7 h-px w-full bg-border" />

              <ul className="flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/90">
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium transition-transform duration-300 hover:scale-[1.02] ${
                  plan.featured
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border text-foreground hover:bg-muted'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                Need something different?
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Every project doesn&apos;t fit into a package. Tell us what you&apos;re building and
                we&apos;ll create a custom quote around it.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors duration-300 hover:bg-muted"
            >
              Request a Custom Quote
              <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
