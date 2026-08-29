import { Link } from 'react-router-dom'

import type { Translations } from '@/i18n/config'
import { RAMP } from '@/lib/ramp'
import { Section } from '@/components/Shell'

export default function NotFoundPage({ t }: { t: Translations }) {
  return (
    <Section eyebrow="404" title={t.pages.notFoundTitle} lead={t.pages.notFoundBody}>
      <div className="flex h-10 w-full max-w-md gap-0.5" aria-hidden>
        {RAMP.map((stop) => (
          <div key={stop.stop} className="flex-1" style={{ backgroundColor: stop.hex }} />
        ))}
      </div>
      <Link
        to="/"
        className="mt-8 inline-block bg-ink px-6 py-3.5 font-display text-sm font-700 uppercase tracking-[0.08em] text-card transition-opacity hover:opacity-90"
      >
        {t.pages.backHome}
      </Link>
    </Section>
  )
}
