'use client'

import { Reveal } from './motion-primitives'
import { navLinks, siteConfig } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-2xl font-bold tracking-tight">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {siteConfig.label}
                </span>
              </div>
              <p className="mt-4 max-w-xs font-display text-lg leading-snug text-muted-foreground">
                {siteConfig.tagline}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Navigate
              </h3>
              <ul className="mt-5 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Connect
              </h3>
              <ul className="mt-5 space-y-3">
                {siteConfig.channels.map((c) =>
                  c.live && c.href ? (
                    <li key={c.key}>
                      <a
                        href={c.href}
                        target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {c.label}
                      </a>
                    </li>
                  ) : (
                    <li
                      key={c.key}
                      className="flex items-center gap-2 text-sm text-foreground/50"
                    >
                      {c.label}
                      <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground/50">
                        Soon
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-foreground">
              © 2026 {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Built with intention.
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
