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
import { AdminRoute, DashboardPage, ForgotPasswordPage, LoginPage, MessageThreadPage, ProtectedRoute, RegisterPage, ResetPasswordPage, VerifyEmailPage } from '@/pages/PlatformPages'
import AdminPage from '@/pages/admin/AdminPage'
import { AdminCustomerPage, AdminInvoicePage, AdminPredictionPage, AdminRequestPage } from '@/pages/admin/AdminDetail'

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
          {/* Producing a model output requires a verified account; the backend enforces
              the same rule, so these guards are the courtesy of asking before the work
              is typed rather than the thing standing between a visitor and a prediction. */}
          <Route path="/predict" element={<ProtectedRoute><PredictPage {...shared} /></ProtectedRoute>} />
          <Route path="/batch" element={<ProtectedRoute><BatchPage t={t} /></ProtectedRoute>} />
          <Route path="/method" element={<MethodPage t={t} model={model} />} />
          <Route path="/results" element={<ResultsPage {...shared} />} />
          <Route path="/limits" element={<LimitsPage t={t} model={model} />} />
          <Route path="/figures" element={<FiguresPage t={t} />} />
          <Route path="/cite" element={<CitePage t={t} model={model} />} />
          <Route path="/history" element={<HistoryPage t={t} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/dashboard/messages/:threadId" element={<ProtectedRoute><MessageThreadPage /></ProtectedRoute>} />
          <Route path="/dashboard/*" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          {/* The admin surface. Tabs resolve inside AdminPage from the path, matching how
              /dashboard works; the detail routes are declared first so that `customers`
              and `predictions` are not swallowed by the tab route. */}
          <Route path="/admin/customers/:id" element={<AdminRoute><AdminCustomerPage /></AdminRoute>} />
          <Route path="/admin/predictions/:id" element={<AdminRoute><AdminPredictionPage /></AdminRoute>} />
          <Route path="/admin/invoices/:id" element={<AdminRoute><AdminInvoicePage /></AdminRoute>} />
          <Route path="/admin/requests/:kind/:id" element={<AdminRoute><AdminRequestPage /></AdminRoute>} />
          <Route path="/admin/threads/:threadId" element={<AdminRoute><MessageThreadPage /></AdminRoute>} />
          <Route path="/admin/*" element={<AdminRoute><AdminPage /></AdminRoute>} />
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
    void api.visit(pathname)
  }, [pathname])
  return null
}
