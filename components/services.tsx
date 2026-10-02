'use client'

import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { Reveal, staggerContainer, staggerItem } from './motion-primitives'
import { ArrowUpRight, Check, X } from 'lucide-react'

const services = [
  {
    n: '01',
    symbol: '◱',
    title: 'Business Websites',
    desc: 'Professional websites designed to establish trust and convert visitors.',
    audience: 'Businesses and brands that need a clear, credible home on the web.',
    includes: ['A structure shaped around your business and audience', 'Responsive layouts for phones, tablets and desktops', 'Clear sections that introduce your offering and guide visitors'],
    benefit: 'Give people a polished first impression and make it easier to understand what you do.',
  },
  {
    n: '02',
    symbol: '▤',
    title: 'Landing Pages',
    desc: 'Focused pages designed around a product, service or campaign.',
    audience: 'Teams and independent businesses promoting a particular offer, launch or campaign.',
    includes: ['A focused page hierarchy for one main message', 'Content sections arranged around the offer', 'A clear next step for interested visitors'],
    benefit: 'Keep attention on a single idea with a page that is easy to scan and act on.',
  },
  {
    n: '03',
    symbol: '◨',
    title: 'Portfolio Websites',
    desc: 'Minimal, visually impressive websites for creatives and professionals.',
    audience: 'Creatives and professionals who want their work to speak for itself.',
    includes: ['A visual framework for selected projects', 'Space for your profile and background', 'Responsive project presentation and contact details'],
    benefit: 'Present your work in a considered, easy-to-browse place you can share.',
  },
  {
    n: '04',
    symbol: '◇',
    title: 'Restaurant Websites',
    desc: 'Modern restaurant websites with menus, locations and reservations.',
    audience: 'Restaurants and food businesses sharing their menu and guest information online.',
    includes: ['Menu and location information', 'A layout for hours and essential visit details', 'Reservation information or a booking link, based on your setup'],
    benefit: 'Help guests find the details they need before they visit.',
  },
  {
    n: '05',
    symbol: '◈',
    title: 'Creator Websites',
    desc: 'Personal websites for YouTubers, editors, artists and online creators.',
    audience: 'YouTubers, editors, artists and online creators building a home for their work.',
    includes: ['A personal introduction and selected work', 'Links to your channels and platforms', 'A contact path for enquiries or collaborations'],
    benefit: 'Bring your work and online presence together in a space you control.',
  },
  {
    n: '06',
    symbol: '⬡',
    title: 'Custom Experiences',
    desc: 'Unique websites built around a specific idea or business requirement.',
    audience: 'Projects with a specific idea, audience or requirement that needs a tailored approach.',
    includes: ['A discovery conversation to understand the idea', 'A structure and visual direction shaped to the project', 'A responsive build scoped to the agreed requirements'],
    benefit: 'Create an experience that fits the project instead of starting from a generic layout.',
  },
]

export function Services() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [selected, setSelected] = useState<(typeof services)[number] | null>(null)

  function openOffering(service: (typeof services)[number]) {
    setSelected(service)
    dialogRef.current?.showModal()
  }

  return (
    <section id="services" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Services
          </p>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            What we build.
          </h2>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.button
              key={s.n}
              type="button"
              onClick={() => openOffering(s)}
              aria-haspopup="dialog"
              aria-label={`Learn about ${s.title}`}
              variants={staggerItem}
              className="group relative flex min-h-64 flex-col justify-between gap-10 bg-background p-8 text-left transition-colors duration-500 hover:bg-card focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground sm:min-h-72 sm:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-sm text-muted-foreground">{s.n}</span>
                <span className="text-2xl text-muted-foreground transition-all duration-500 group-hover:-translate-y-1 group-hover:text-foreground">
                  {s.symbol}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-foreground">
                  Explore offering <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </div>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-500 group-hover:w-full" />
            </motion.button>
          ))}
        </motion.div>

        <dialog
          ref={dialogRef}
          aria-labelledby="offering-title"
          aria-describedby="offering-description"
          onClose={() => setSelected(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current?.close()
          }}
          className="offering-dialog fixed inset-0 m-auto max-h-[min(88dvh,48rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm"
        >
          {selected && (
            <div className="relative p-7 sm:p-10">
              <button
                type="button"
                autoFocus
                onClick={() => dialogRef.current?.close()}
                aria-label="Close offering details"
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground sm:right-7 sm:top-7"
              >
                <X size={18} aria-hidden="true" />
              </button>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                What we build <span className="px-1">/</span> {selected.n}
              </p>
              <h2 id="offering-title" className="mt-6 max-w-xl pr-8 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {selected.title}
              </h2>
              <p id="offering-description" className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                {selected.desc}
              </p>

              <div className="mt-9 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Who it’s for</h3>
                  <p className="mt-3 text-sm leading-relaxed">{selected.audience}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">What it includes</h3>
                  <ul className="mt-3 space-y-3">
                    {selected.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <Check size={16} className="mt-0.5 shrink-0 text-foreground" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-border bg-card p-5">
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">The benefit</h3>
                <p className="mt-2 text-sm leading-relaxed">{selected.benefit}</p>
              </div>
              <a
                href="#contact"
                onClick={() => dialogRef.current?.close()}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Discuss your project <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          )}
        </dialog>
      </div>
    </section>
  )
}
