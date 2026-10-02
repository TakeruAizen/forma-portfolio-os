'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

// template.tsx re-mounts on every navigation into a /work route, giving each
// demo concept a smooth, intentional enter transition.
export default function WorkTemplate({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
