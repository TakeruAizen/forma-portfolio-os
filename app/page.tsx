import { PersonalOS } from '@/components/personal-os'
import { IntroSequence } from '@/components/intro-sequence'

export default function Page() {
  return (
    <div className="forma-surface relative isolate min-h-screen">
      {/* The opening transition and desktop snowfall retain the existing motion system. */}
      <IntroSequence />
      <PersonalOS />
    </div>
  )
}
