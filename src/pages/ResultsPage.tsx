import type { ModelInfo } from '@/lib/api'
import type { Translations } from '@/i18n/config'
import { Learned, Results } from '@/pages/Home'

interface Props {
  t: Translations
  model: ModelInfo | null
  modelError: boolean
}

export default function ResultsPage({ t, model, modelError }: Props) {
  return (
    <>
      <Results t={t} model={model} modelError={modelError} />
      <Learned t={t} />
    </>
  )
}
