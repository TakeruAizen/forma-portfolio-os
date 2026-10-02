'use client'

import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from './motion-primitives'
import { siteConfig } from '@/lib/site'

type Errors = Partial<Record<'name' | 'email' | 'need' | 'message', string>>

const budgets = ['₹3,999 – Starter', '₹7,999 – Pro', '₹14,999 – Premium', 'Custom / Not sure']

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form)
    const next: Errors = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const need = String(data.get('need') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (name.length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email.'
    if (!need) next.need = 'Let us know what you need.'
    if (message.length < 10) next.message = 'Please add a little more detail (10+ characters).'
    return next
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validate(e.currentTarget)
    setErrors(found)
    if (Object.keys(found).length === 0) {
      // NOTE: No backend connected yet — this only shows a local success state.
      setSubmitted(true)
    }
  }

  return (
    <section id="contact" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                Contact
              </p>
              <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Have a project in mind?
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                Tell us what you&apos;re building. Let&apos;s turn the idea into something people
                remember.
              </p>

              <p className="mt-12 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Direct channels
              </p>
              <div className="mt-4 space-y-px overflow-hidden rounded-2xl border border-border">
                {siteConfig.channels.map((c) => (
                  <ContactRow key={c.key} label={c.label} href={c.href} live={c.live} />
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground/70">
                Social and email channels are being set up. For now, the fastest way to reach us is
                the form.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-9">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.1 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full border border-foreground"
                      >
                        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
                          <motion.path
                            d="M5 13l4 4L19 7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          />
                        </svg>
                      </motion.div>
                      <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                        Request received.
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        Thanks for reaching out. This is a demo confirmation — no message has been
                        sent yet since no backend is connected. Connect a form handler to start
                        receiving real requests.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-8 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid gap-5 sm:grid-cols-2"
                    >
                      <Field label="Name" name="name" error={errors.name} placeholder="Your name" />
                      <Field
                        label="Email"
                        name="email"
                        type="email"
                        error={errors.email}
                        placeholder="you@email.com"
                      />
                      <Field
                        label="Business / Brand"
                        name="business"
                        placeholder="Optional"
                        className="sm:col-span-2"
                      />
                      <Field
                        label="What do you need?"
                        name="need"
                        error={errors.need}
                        placeholder="Business website, landing page…"
                        className="sm:col-span-2"
                      />

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="budget"
                          className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
                        >
                          Budget
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          defaultValue=""
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                        >
                          <option value="" disabled>
                            Select a range
                          </option>
                          {budgets.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="message"
                          className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell us about your project…"
                          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
                        />
                        {errors.message && (
                          <p className="mt-2 text-xs text-muted-foreground">{errors.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.02] sm:col-span-2"
                      >
                        Send Project Request
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ label, href, live }: { label: string; href: string; live: boolean }) {
  if (live && href) {
    return (
      <a
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel="noopener noreferrer"
        className="group flex items-center justify-between bg-background px-5 py-4 transition-colors hover:bg-muted"
      >
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        <span className="flex items-center gap-2 text-sm text-foreground">
          Open
          <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </span>
      </a>
    )
  }

  return (
    <div className="flex items-center justify-between bg-background px-5 py-4">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground/50">
        Coming soon
      </span>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  className = '',
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  error?: string
  className?: string
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground aria-[invalid=true]:border-foreground/60"
      />
      {error && <p className="mt-2 text-xs text-muted-foreground">{error}</p>}
    </div>
  )
}
