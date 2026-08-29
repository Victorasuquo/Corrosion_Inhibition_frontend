import type { ModelInfo } from '@/lib/api'
import type { Translations } from '@/i18n/config'
import { Method } from '@/pages/Home'

export default function MethodPage({ t, model }: { t: Translations; model: ModelInfo | null }) {
  return <Method t={t} model={model} />
}
