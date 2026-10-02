import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journal — Forma',
  description: 'Articles from Marco and Forma.',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0c1721] px-6 py-20 text-[#edf5f3]">
      <div className="mx-auto max-w-3xl">
        <a className="text-sm text-[#a8ebcf]" href="/">← Back to desktop</a>
        <p className="mt-16 text-xs uppercase tracking-[0.2em] text-[#a8ebcf]">Forma / Journal</p>
        <h1 className="mt-4 font-display text-5xl font-semibold">Notes from the studio.</h1>
        <p className="mt-5 text-sm leading-relaxed text-white/60">No articles have been published yet.</p>
      </div>
    </main>
  )
}
