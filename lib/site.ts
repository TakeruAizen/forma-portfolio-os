import ownerProfile from '@/content/owner-profile.json'

// Central place for approved site identity and public contact details.
export const siteConfig = {
  name: ownerProfile.identity.osName.toUpperCase(),
  label: `${ownerProfile.identity.fullName.toUpperCase()}’S DESKTOP`,
  tagline: `${ownerProfile.identity.headline}. ${ownerProfile.identity.intro}.`,
  channels: [
    { key: 'instagram', label: 'Instagram', href: ownerProfile.conversion.secondaryUrl ?? '', live: Boolean(ownerProfile.conversion.secondaryUrl) },
  ] as const,
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'FAQ', href: '#faq' },
]
