'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

const flakes = Array.from({ length: 72 }, (_, index) => ({
  id: index,
  left: (index * 47 + 13) % 100,
  top: (index * 37 + 7) % 106,
  drift: ((index * 31) % 181) - 90,
  duration: 8 + ((index * 13) % 11),
  size: 14 + (index % 5) * 5,
  opacity: 0.3 + ((index * 7) % 32) / 100,
  pale: index % 4 === 0,
}))

export function Snowfall() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [particleCount, setParticleCount] = useState(72)

  useEffect(() => {
    const onVisibilityChange = () => setVisible(!document.hidden)
    const mobile = window.matchMedia('(max-width: 640px)')
    const onViewportChange = () => setParticleCount(mobile.matches ? 38 : 72)

    document.addEventListener('visibilitychange', onVisibilityChange)
    mobile.addEventListener('change', onViewportChange)
    onVisibilityChange()
    onViewportChange()
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      mobile.removeEventListener('change', onViewportChange)
    }
  }, [])

  if (reduceMotion || !visible) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {flakes.slice(0, particleCount).map((flake) => (
        <motion.span
          key={flake.id}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, flake.drift, -flake.drift * 0.25],
            y: '112vh',
            opacity: [0, flake.opacity, flake.opacity, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: -((flake.id * 5) % flake.duration),
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.12, 0.84, 1],
          }}
          className="absolute block rounded-full"
          style={{
            left: `${flake.left}%`,
            top: `${flake.top}vh`,
            width: flake.size,
            height: flake.size,
            backgroundColor: flake.pale ? 'rgb(210 216 225)' : 'rgb(255 255 255)',
            boxShadow: flake.size > 25 ? '0 0 8px rgb(230 235 245 / 22%)' : undefined,
          }}
        />
      ))}
    </div>
  )
}
