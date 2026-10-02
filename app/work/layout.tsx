import type { ReactNode } from 'react'
import {
  Playfair_Display,
  Cormorant_Garamond,
  Poppins,
  Archivo,
} from 'next/font/google'

// Each demo concept gets its own distinct typography so the four sites feel
// like genuinely different brands rather than one template reskinned.
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-noir',
  display: 'swap',
})
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-north',
  display: 'swap',
})
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-aura',
  display: 'swap',
})
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-meridian',
  display: 'swap',
})

export default function WorkLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${playfair.variable} ${cormorant.variable} ${poppins.variable} ${archivo.variable}`}
    >
      {children}
    </div>
  )
}
