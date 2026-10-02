'use client'

import { motion, useInView, useReducedMotion, type Variants } from 'motion/react'
import { useRef, type ReactNode } from 'react'

const easeOut = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-10% 0px -10% 0px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: reduceMotion ? 0 : 0.8, ease: easeOut, delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  )
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

/** Reveals text word-by-word (used for large headlines). */
export function RevealWords({
  text,
  className,
  delay = 0,
  once = true,
}: {
  text: string
  className?: string
  delay?: number
  once?: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-10% 0px' })
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden
            className="inline-block"
            initial={reduceMotion ? false : { y: '110%' }}
            animate={reduceMotion || inView ? { y: 0 } : { y: '110%' }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: easeOut, delay: reduceMotion ? 0 : delay + i * 0.07 }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
