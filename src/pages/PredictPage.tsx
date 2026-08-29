import { Link } from 'react-router-dom'

import type { ModelInfo } from '@/lib/api'
import type { Translations } from '@/i18n/config'
import { Predictor } from '@/components/Predictor'
import { Section } from '@/components/Shell'

interface Props {
  t: Translations
  model: ModelInfo | null
}

/** Direct entry point to the instrument, for someone who arrived to predict. */
export default function PredictPage({ t, model }: Props) {
  return (
    <>
      <Section eyebrow={t.predictor.eyebrow} title={t.predictor.title} lead={t.predictor.lead}>
        <Predictor />
      </Section>

      <Section tone="sunk" eyebrow={t.pages.nextSteps} title={t.pages.predictNextTitle}>
        <div className="grid gap-px bg-rule sm:grid-cols-3">
          <NextCard
            to="/batch"
            title={t.batch.panelTitle}
            body={t.pages.cardBatch}
            cta={t.nav.batch}
          />
          <NextCard
            to="/limits"
            title={t.limits.title}
            body={t.pages.cardLimits}
            cta={t.nav.limits}
          />
          <NextCard to="/cite" title={t.cite.title} body={t.pages.cardCite} cta={t.nav.cite} />
        </div>

        {model && (
          <p className="mt-6 font-mono text-xs text-ink-3" dir="ltr">
            {t.method.serving} v{model.version} · R² {model.performance.random_split.r2} (
            {t.charts.randomSplit}) · R² {model.performance.scaffold_split.r2} (
            {t.charts.scaffoldSplit}) · ±{model.calibration.half_width_ie_points}
          </p>
        )}
      </Section>
    </>
  )
}

function NextCard({
  to,
  title,
  body,
  cta,
}: {
  to: string
  title: string
  body: string
  cta: string
}) {
  return (
    <div className="flex flex-col bg-card p-6">
      <h3 className="font-display text-base font-700 leading-snug">{title}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-2">{body}</p>
      <Link
        to={to}
        className="patch-label mt-5 self-start border border-rule px-3 py-2 text-ink-2 transition-colors hover:border-ink hover:text-ink"
      >
        {cta} →
      </Link>
    </div>
  )
}
