import type { Translations } from '@/i18n/config'
import { Figures } from '@/pages/Home'

export default function FiguresPage({ t }: { t: Translations }) {
  return <Figures t={t} />
}
