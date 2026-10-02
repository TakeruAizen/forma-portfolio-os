'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Reveal } from './motion-primitives'

const projects = [
  { n: '01', name: 'NOIR', category: 'Luxury Coffee Brand', img: '/work/noir.png', href: '/work/noir' },
  { n: '02', name: 'NORTH', category: 'Modern Restaurant', img: '/work/north.png', href: '/work/north' },
  { n: '03', name: 'AURA', category: 'Skincare / Wellness', img: '/work/mono.png', href: '/work/project-03' },
  { n: '04', name: 'MERIDIAN', category: 'Architecture Studio', img: '/work/nova.png', href: '/work/project-04' },
]

export function Portfolio() {
  return (
    <section id="work" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Selected Work
          </p>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Selected work.
            </h2>
            <p className="max-w-xs text-sm text-muted-foreground">
              A few examples of what FORMA can create.
              <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-muted-foreground/70">
                Demo concepts — not real clients.
              </span>
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.n} project={p} index={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-16 text-center text-sm uppercase tracking-[0.2em] text-muted-foreground">
            More work coming soon.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: { n: string; name: string; category: string; img: string; href: string }
  index: number
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.1 }}
      className="group"
    >
      <Link href={project.href} aria-label={`View ${project.name} — ${project.category} demo concept`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card">
        <Image
          src={project.img || '/placeholder.svg'}
          alt={`${project.name} — demo website concept`}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover grayscale transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

        {/* Reveal overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="translate-y-3 rounded-full border border-white/30 bg-background/40 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-foreground opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View Project
          </span>
        </div>

        <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-background/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-foreground backdrop-blur-md">
          Demo · Project {project.n}
        </span>
      </div>

      <div className="mt-5 flex items-baseline justify-between">
        <h3 className="font-display text-2xl font-semibold tracking-tight">{project.name}</h3>
        <span className="text-sm text-muted-foreground">{project.category}</span>
      </div>
      </Link>
    </motion.article>
  )
}
