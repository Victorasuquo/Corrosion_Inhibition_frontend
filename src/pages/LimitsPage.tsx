import type { ModelInfo } from '@/lib/api'
import type { Translations } from '@/i18n/config'
import { Limits } from '@/pages/Home'

export default function LimitsPage({ t, model }: { t: Translations; model: ModelInfo | null }) {
  return <Limits t={t} model={model} />
}
