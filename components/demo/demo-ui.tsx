'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/**
 * Small chrome shared by every demo concept page: a "back to FORMA" control
 * and a clear "demo concept" badge so these are never mistaken for real clients.
 * Colors are passed in as class strings so each page can match its own palette.
 */
export function DemoBar({
  className = '',
  linkClassName = '',
  badgeClassName = '',
  label,
}: {
  className?: string
  linkClassName?: string
  badgeClassName?: string
  label: string
}) {
  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8 ${className}`}
    >
      <Link
        href="/#work"
        className={`group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-70 ${linkClassName}`}
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
        Back to FORMA
      </Link>
      <span
        className={`rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${badgeClassName}`}
      >
        {label}
      </span>
    </div>
  )
}

/** Fade-up wrapper for scroll-triggered reveals inside demo pages. */
export function DemoReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Parallax helper — returns a MotionValue for translating an element on scroll. */
export function useParallax(distance = 60): {
  ref: React.RefObject<HTMLDivElement | null>
  y: MotionValue<number>
} {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return { ref, y }
}

export { motion }
