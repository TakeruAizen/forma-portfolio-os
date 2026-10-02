'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, SkipForward } from 'lucide-react'

const sessionKey = 'forma-intro-seen'

export function IntroSequence({ previewMode = false }: { previewMode?: boolean }) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(previewMode)

  useEffect(() => {
    if (previewMode) return
    if (window.sessionStorage.getItem(sessionKey)) return
    setActive(true)
  }, [previewMode])

  const finish = useCallback(() => {
    if (!previewMode) window.sessionStorage.setItem(sessionKey, '1')
    setActive(false)
  }, [previewMode])

  useEffect(() => {
    if (!active || reduceMotion) return
    const timeout = window.setTimeout(finish, 4300)
    return () => window.clearTimeout(timeout)
  }, [active, finish, reduceMotion])

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            key="forma-opening"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.015 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex min-h-svh items-center justify-center overflow-hidden bg-[#080808] text-white"
            aria-label="FORMA website opening sequence"
            role="group"
          >
            <div className="pointer-events-none absolute inset-0 intro-grid opacity-70" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_0%,#080808_74%)]" />

            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-10 sm:py-8">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold tracking-tight">FORMA</span>
                <span className="hidden h-3 w-px bg-white/20 sm:block" />
                <span className="hidden text-[9px] uppercase tracking-[0.24em] text-white/45 sm:block">Forma personal desktop</span>
              </div>
              <button
                type="button"
                onClick={finish}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Skip intro <SkipForward size={13} aria-hidden="true" />
              </button>
            </div>

            {reduceMotion ? (
              <div className="relative z-10 mx-5 w-full max-w-xl rounded-2xl border border-white/15 bg-[#0d0d0d] p-7 sm:p-10">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">Forma personal desktop</p>
                <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
                  Professionalism<br /><span className="text-white/45">starts here.</span>
                </h1>
                <button onClick={finish} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-medium text-black">
                  Open Marco’s desktop <ArrowDownRight size={15} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center px-5 pt-12 sm:px-10">
                <div className="pointer-events-none absolute left-[8%] top-[21%] hidden w-44 space-y-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/40 lg:block">
                  <motion.p initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.5 }}>01 / Structure</motion.p>
                  <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.45, duration: 0.8 }} className="block h-px origin-left bg-white/20" />
                  <motion.p initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65, duration: 0.5 }}>02 / Interaction</motion.p>
                  <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.75, duration: 0.8 }} className="block h-px origin-left bg-white/20" />
                  <motion.p initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.95, duration: 0.5 }}>03 / Form</motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: '-20vw', y: '12vh' }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.82], x: ['-20vw', '0vw', '9vw', '18vw'], y: ['12vh', '0vh', '-4vh', '-8vh'] }}
                  transition={{ duration: 3.65, times: [0, 0.28, 0.72, 1], ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 shadow-[0_0_28px_rgba(255,255,255,0.65)]"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span className="absolute inset-[-9px] rounded-full border border-white/25" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 28, scale: 0.97, clipPath: 'inset(12% 20% 12% 20% round 18px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 18px)' }}
                  transition={{ delay: 0.85, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-[850px] overflow-hidden rounded-2xl border border-white/20 bg-[#0d0d0d] shadow-[0_35px_120px_rgba(0,0,0,0.72)]"
                >
                  <div className="flex h-9 items-center gap-1.5 border-b border-white/10 px-4 sm:h-11 sm:px-5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20 sm:h-2 sm:w-2" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20 sm:h-2 sm:w-2" />
                    <span className="h-1.5 w-1.5 w-1.5 rounded-full bg-white/20 sm:h-2 sm:w-2" />
                    <span className="ml-3 flex-1 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1 text-center font-mono text-[8px] tracking-[0.14em] text-white/35 sm:ml-6 sm:text-[9px]">FORMA.STUDIO</span>
                    <span className="ml-2 font-mono text-[8px] text-white/30">01—01</span>
                  </div>

                  <div className="relative min-h-[310px] overflow-hidden px-6 py-7 sm:min-h-[410px] sm:px-12 sm:py-11 md:px-16">
                    <div className="pointer-events-none absolute inset-0 intro-screen-grid opacity-60" />
                    <motion.div
                      initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute bottom-0 left-[62%] top-0 hidden w-px origin-top bg-white/[0.08] sm:block"
                    />
                    <div className="relative flex items-center justify-between text-[8px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-[9px]">
                      <span>FORMA <span className="mx-1 text-white/20">/</span> Marco’s desktop</span>
                      <span className="hidden gap-5 sm:flex"><span>Work</span><span>Studio</span><span>Contact</span></span>
                      <span className="sm:hidden">Menu <span aria-hidden="true">+</span></span>
                    </div>

                    <div className="relative mt-12 sm:mt-[4.5rem]">
                      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.5 }} className="flex items-center gap-2 text-[8px] uppercase tracking-[0.24em] text-white/40 sm:text-[9px]">
                        <span className="h-px w-5 bg-white/35" /> Forma personal desktop
                      </motion.p>
                      <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="mt-5 font-display text-[clamp(2.7rem,8vw,6.2rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
                        Professionalism<br /><span className="text-white/45">starts here.</span>
                      </motion.h1>
                      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mt-7 h-px w-full origin-left bg-white/20" />
                      <div className="mt-5 flex items-end justify-between gap-5">
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.95, duration: 0.6 }} className="max-w-xs text-[10px] leading-relaxed text-white/45 sm:text-xs">
                          Web development · editing · entrepreneurship
                        </motion.p>
                        <motion.span initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.05, duration: 0.45 }} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 sm:h-11 sm:w-11">
                          <ArrowUpRight size={15} strokeWidth={1.4} aria-hidden="true" />
                        </motion.span>
                      </div>
                    </div>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 0.6 }} className="absolute bottom-4 right-5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/25 sm:bottom-5 sm:right-7">Designed with purpose</motion.span>
                  </div>
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.6 }} className="pointer-events-none absolute bottom-[12%] right-[9%] hidden font-mono text-[9px] uppercase tracking-[0.18em] text-white/35 md:block">
                  <span className="mb-2 block text-white/65">We Build n We Conquer.</span>
                  Forma / Marco
                </motion.p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {previewMode && !active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="fixed bottom-5 right-5 z-40 rounded-full border border-border bg-background/90 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground backdrop-blur transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          Replay intro
        </button>
      )}
    </>
  )
}
