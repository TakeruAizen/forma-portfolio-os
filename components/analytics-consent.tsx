'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { X } from 'lucide-react'

const consentKey = 'forma-analytics-consent-v1'

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<'accepted' | 'declined' | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(consentKey)
      if (saved === 'accepted' || saved === 'declined') setChoice(saved)
      else setVisible(true)
    } catch { setVisible(true) }
  }, [])

  function choose(next: 'accepted' | 'declined') {
    try { sessionStorage.setItem(consentKey, next) } catch { /* Consent remains effective until this view closes. */ }
    setChoice(next)
    setVisible(false)
  }

  return <>
    {process.env.NODE_ENV === 'production' && choice === 'accepted' && <Analytics />}
    {visible && <aside className="os-consent" aria-label="Analytics consent">
      <div><b>Help Forma understand site visits?</b><p>Optional Vercel Analytics loads only if you accept. Your choice lasts for this browser session.</p></div>
      <div className="os-consent-actions"><button onClick={() => choose('declined')}>Decline</button><button onClick={() => choose('accepted')}>Accept</button><button aria-label="Close consent notice" onClick={() => choose('declined')}><X size={14}/></button></div>
    </aside>}
  </>
}
