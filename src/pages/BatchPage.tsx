import type { Translations } from '@/i18n/config'
import { BatchPanel } from '@/components/BatchPanel'
import { Section } from '@/components/Shell'

/** Direct entry point for screening a candidate series. */
export default function BatchPage({ t }: { t: Translations }) {
  return (
    <Section eyebrow={t.batch.eyebrow} title={t.batch.title} lead={t.batch.lead}>
      <BatchPanel />
    </Section>
  )
}
