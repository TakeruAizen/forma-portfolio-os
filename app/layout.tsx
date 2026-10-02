import { MotionConfig } from 'motion/react'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { AnalyticsConsent } from '@/components/analytics-consent'
import ownerProfile from '@/content/owner-profile.json'
import { siteUrl } from '@/lib/site-url'
import './globals.css'

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: ownerProfile.identity.osName,
      url: siteUrl,
      description: `${ownerProfile.identity.fullName}’s web development portfolio.`,
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#marco`,
      name: ownerProfile.identity.fullName,
      jobTitle: ownerProfile.identity.profession,
      url: siteUrl,
      sameAs: ownerProfile.socials.filter((social) => social.public).map((social) => social.url),
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#forma`,
      name: ownerProfile.identity.osName,
      url: siteUrl,
      description: ownerProfile.services.join(', '),
      founder: { '@id': `${siteUrl}/#marco` },
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${ownerProfile.identity.osName} — ${ownerProfile.identity.fullName}’s Personal OS`,
  description: `Explore ${ownerProfile.identity.fullName}’s web development portfolio through the ${ownerProfile.identity.osName} desktop.`,
  alternates: { canonical: siteUrl },
  openGraph: {
    title: `${ownerProfile.identity.osName} — ${ownerProfile.identity.fullName}’s Personal OS`,
    description: `Explore ${ownerProfile.identity.fullName}’s web development portfolio through the ${ownerProfile.identity.osName} desktop.`,
    type: 'website',
    url: siteUrl,
  },
  twitter: { card: 'summary', title: `${ownerProfile.identity.osName} — ${ownerProfile.identity.fullName}’s Personal OS`, description: `Explore ${ownerProfile.identity.fullName}’s web development portfolio through the ${ownerProfile.identity.osName} desktop.` },
  icons: { icon: '/icon.svg', apple: '/icon.svg' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        <MotionConfig reducedMotion="user">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
          {children}
          <AnalyticsConsent />
        </MotionConfig>
      </body>
    </html>
  )
}
