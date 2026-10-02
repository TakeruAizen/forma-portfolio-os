'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react'
import { navLinks, siteConfig } from '@/lib/site'

const easeOut = [0.22, 1, 0.36, 1] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 24)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
      >
        <motion.nav
          animate={{
            marginTop: scrolled ? 10 : 20,
            paddingTop: scrolled ? 10 : 16,
            paddingBottom: scrolled ? 10 : 16,
            backgroundColor: scrolled ? 'oklch(0.11 0 0 / 0.72)' : 'oklch(0.11 0 0 / 0)',
            borderColor: scrolled ? 'oklch(1 0 0 / 0.12)' : 'oklch(1 0 0 / 0)',
            width: scrolled ? '100%' : '100%',
          }}
          transition={{ duration: 0.4, ease: easeOut }}
          style={{ backdropFilter: scrolled ? 'blur(14px)' : 'none' }}
          className="flex w-full max-w-6xl items-center justify-between rounded-2xl border px-5"
        >
          <a href="#home" className="group flex items-baseline gap-2.5" aria-label="FORMA home">
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:inline">
              {siteConfig.label}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03] md:inline-block"
            >
              Let&apos;s Talk
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
            >
              <div className="flex flex-col items-center justify-center gap-1.5">
                <motion.span
                  animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  className="block h-px w-5 bg-foreground"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  className="block h-px w-5 bg-foreground"
                />
              </div>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, ease: easeOut }}
                  className="font-display text-4xl font-medium tracking-tight text-foreground"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.06, ease: easeOut }}
                className="mt-6 inline-flex w-fit rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground"
              >
                Let&apos;s Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
