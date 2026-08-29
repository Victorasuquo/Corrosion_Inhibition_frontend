import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { api, type ModelInfo } from '@/lib/api'
import { useT } from '@/i18n'
import { Colophon, Masthead } from '@/components/Shell'
import Home from '@/pages/Home'
import PredictPage from '@/pages/PredictPage'
import BatchPage from '@/pages/BatchPage'
import MethodPage from '@/pages/MethodPage'
import ResultsPage from '@/pages/ResultsPage'
import LimitsPage from '@/pages/LimitsPage'
import FiguresPage from '@/pages/FiguresPage'
import CitePage from '@/pages/CitePage'
import HistoryPage from '@/pages/HistoryPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  const [model, setModel] = useState<ModelInfo | null>(null)
  const [modelError, setModelError] = useState(false)
  const t = useT()

  useEffect(() => {
    api
      .model()
      .then(setModel)
      .catch(() => setModelError(true))
  }, [])

  const shared = { t, model, modelError }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-card"
      >
        {t.nav.skip}
      </a>
      <ScrollToTop />
      <Masthead t={t} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home {...shared} />} />
          <Route path="/predict" element={<PredictPage {...shared} />} />
          <Route path="/batch" element={<BatchPage t={t} />} />
          <Route path="/method" element={<MethodPage t={t} model={model} />} />
          <Route path="/results" element={<ResultsPage {...shared} />} />
          <Route path="/limits" element={<LimitsPage t={t} model={model} />} />
          <Route path="/figures" element={<FiguresPage t={t} />} />
          <Route path="/cite" element={<CitePage t={t} model={model} />} />
          <Route path="/history" element={<HistoryPage t={t} />} />
          <Route path="*" element={<NotFoundPage t={t} />} />
        </Routes>
      </main>
      <Colophon t={t} model={model} />
    </>
  )
}

/** A route change should land at the top, not wherever the last page was scrolled to. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}
