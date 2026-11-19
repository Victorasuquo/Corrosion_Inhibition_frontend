import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link, NavLink, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { ApiError, api, type Payment, type User } from '@/lib/api'
import { clearSession, rememberReturnTo, takeReturnTo, useSession } from '@/lib/session'
import { BatchPanel } from '@/components/BatchPanel'
import { Predictor } from '@/components/Predictor'
import { Section } from '@/components/Shell'
import { RAMP_GRADIENT } from '@/lib/ramp'

const inputClass = 'mt-1.5 w-full border border-rule bg-card px-3 py-2.5 text-sm outline-none focus:border-ink'
const buttonClass = 'bg-ink px-4 py-2.5 font-display text-sm font-700 text-card transition-opacity hover:opacity-90 active:translate-y-px'
const secondaryClass = 'border border-rule px-4 py-2.5 font-display text-sm font-700 text-ink-2 transition-colors hover:border-ink hover:bg-card-2'

function ErrorLine({ error }: { error: string | null }) {
  return error ? <p className="mt-4 border-l-2 border-ie-00 px-3 py-2 text-sm text-ink-2" role="alert">{error}</p> : null
}

function Field({ label, value, onChange, type = 'text', required = false, textarea = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; textarea?: boolean }) {
  return <label className="block text-sm text-ink-2"><span>{label}</span>{textarea ? <textarea required={required} rows={4} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} /> : <input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} />}</label>
}

function AuthFrame({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children: ReactNode }) {
  return <Section eyebrow={eyebrow} title={title} lead={lead}><div className="mx-auto max-w-xl panel registered p-6 sm:p-8">{children}</div></Section>
}

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  async function submit(event: FormEvent) {
    event.preventDefault(); setPending(true); setError(null)
    try {
      await api.login({ email, password })
      // The cached answer from before signing in is now wrong; leaving it would keep
      // the interface in its signed-out state until a full reload.
      clearSession()
      navigate(takeReturnTo() ?? '/dashboard', { replace: true })
    } catch (err) { setError(err instanceof ApiError ? err.message : 'Unable to sign in.') } finally { setPending(false) }
  }
  return <AuthFrame eyebrow="ACCOUNT" title="Sign in to the research platform" lead="Predictions require a verified account. History, requests and platform messaging live here too.">
    <form onSubmit={submit} className="space-y-5"><Field label="Email" type="email" value={email} onChange={setEmail} required /><Field label="Password" type="password" value={password} onChange={setPassword} required /><ErrorLine error={error} /><button className={buttonClass} disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button></form>
    <div className="mt-6 flex flex-wrap gap-4 text-sm text-ink-2"><Link className="underline underline-offset-4" to="/register">Create an account</Link><Link className="underline underline-offset-4" to="/forgot-password">Forgot password?</Link></div>
  </AuthFrame>
}

export function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', full_name: '', school: '', department: '', bio: '', research_area: '', country: '' })
  const [error, setError] = useState<string | null>(null); const [pending, setPending] = useState(false)
  const update = (key: keyof typeof form) => (value: string) => setForm((current) => ({ ...current, [key]: value }))
  async function submit(event: FormEvent) { event.preventDefault(); setPending(true); setError(null); try { const result = await api.register(form); navigate(result.development_verification_token ? `/verify-email?token=${encodeURIComponent(result.development_verification_token)}` : '/verify-email') } catch (err) { setError(err instanceof ApiError ? err.message : 'Unable to create the account.') } finally { setPending(false) } }
  return <AuthFrame eyebrow="ACCOUNT" title="Create a research account" lead="Use a verified account to request data, communicate with the platform, and purchase prediction batches.">
    <form onSubmit={submit} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><Field label="Full name" value={form.full_name} onChange={update('full_name')} required /><Field label="Email" type="email" value={form.email} onChange={update('email')} required /></div><Field label="Password" type="password" value={form.password} onChange={update('password')} required /><div className="grid gap-4 sm:grid-cols-2"><Field label="School or institution" value={form.school} onChange={update('school')} /><Field label="Department" value={form.department} onChange={update('department')} /><Field label="Research area" value={form.research_area} onChange={update('research_area')} /><Field label="Country" value={form.country} onChange={update('country')} /></div><Field label="Short biography" textarea value={form.bio} onChange={update('bio')} /><ErrorLine error={error} /><button className={buttonClass} disabled={pending}>{pending ? 'Creating account…' : 'Create account'}</button></form>
    <p className="mt-6 text-sm text-ink-2">Already registered? <Link className="underline underline-offset-4" to="/login">Sign in</Link>.</p>
  </AuthFrame>
}

export function VerifyEmailPage() {
  const [params] = useSearchParams(); const [status, setStatus] = useState<'idle' | 'pending' | 'done' | 'error'>('idle'); const [message, setMessage] = useState('')
  const verify = useCallback(async () => { const token = params.get('token') ?? ''; if (!token) { setStatus('error'); setMessage('Open the verification link from your email.') ; return } setStatus('pending'); try { await api.verifyEmail(token); setStatus('done'); setMessage('Your email is verified. You can now sign in.') } catch (err) { setStatus('error'); setMessage(err instanceof ApiError ? err.message : 'The verification link could not be used.') } }, [params])
  useEffect(() => { void verify() }, [verify])
  return <AuthFrame eyebrow="ACCOUNT" title="Verify your email" lead="Email verification protects prediction access and keeps research requests connected to the right account."><p className={status === 'error' ? 'text-ie-00' : 'text-ink-2'}>{status === 'pending' ? 'Verifying…' : message}</p>{status === 'done' && <Link className={`${buttonClass} mt-6 inline-block`} to="/login">Continue to sign in</Link>}{status === 'idle' && <button className={`${buttonClass} mt-6`} onClick={() => void verify()}>Verify email</button>}</AuthFrame>
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState(''); const [sent, setSent] = useState(false); const [error, setError] = useState<string | null>(null)
  async function submit(event: FormEvent) { event.preventDefault(); setError(null); try { await api.requestPasswordReset(email); setSent(true) } catch (err) { setError(err instanceof ApiError ? err.message : 'Unable to send the reset request.') } }
  return <AuthFrame eyebrow="ACCOUNT" title="Reset your password" lead="We will send a time-limited reset link if the account exists.">{sent ? <p className="text-ink-2">Check your email for the reset link.</p> : <form onSubmit={submit} className="space-y-5"><Field label="Email" type="email" value={email} onChange={setEmail} required /><ErrorLine error={error} /><button className={buttonClass}>Send reset link</button></form>}<Link className="mt-6 inline-block text-sm underline underline-offset-4" to="/login">Back to sign in</Link></AuthFrame>
}

export function ResetPasswordPage() {
  const [params] = useSearchParams(); const [password, setPassword] = useState(''); const [done, setDone] = useState(false); const [error, setError] = useState<string | null>(null)
  async function submit(event: FormEvent) { event.preventDefault(); try { await api.resetPassword(params.get('token') ?? '', password); setDone(true) } catch (err) { setError(err instanceof ApiError ? err.message : 'Unable to reset password.') } }
  return <AuthFrame eyebrow="ACCOUNT" title="Choose a new password" lead="Use at least ten characters for your research-platform account.">{done ? <p>Password changed. <Link className="underline" to="/login">Sign in</Link>.</p> : <form onSubmit={submit} className="space-y-5"><Field label="New password" type="password" value={password} onChange={setPassword} required /><ErrorLine error={error} /><button className={buttonClass}>Change password</button></form>}</AuthFrame>
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { status } = useSession()
  const destination = `${location.pathname}${location.search}`

  useEffect(() => {
    // Recorded on the way out, so signing in returns the person to the page they asked
    // for rather than dropping them on the dashboard to find it again.
    if (status === 'guest') rememberReturnTo(destination)
  }, [status, destination])

  if (status === 'loading') return <Section eyebrow="ACCOUNT" title="Loading account"><p className="text-ink-2">Checking your secure session…</p></Section>
  return status === 'guest' ? <Navigate to="/login" replace /> : <>{children}</>
}

/**
 * What stands in for the predictor when nobody is signed in.
 *
 * Not a disabled form: showing the eleven inputs and refusing on submit wastes the
 * visitor's work and teaches them the service is broken. This states the requirement
 * before anything is typed, and says plainly why it exists.
 */
export function SignInToPredict({ title, lead }: { title: string; lead: string }) {
  return <div className="panel registered p-6 sm:p-8">
    <p className="patch-label text-ink-3">ACCOUNT REQUIRED</p>
    <h3 className="mt-3 font-display text-2xl font-700">{title}</h3>
    <p className="mt-3 max-w-prose text-ink-2">{lead}</p>
    <p className="mt-3 max-w-prose text-sm text-ink-3">
      A reading from this model is a claim about chemistry, carried under the study's name and
      bounded by a calibrated interval. Each one is recorded against the account that asked for
      it, so a number quoted later can be traced back to the exact artefact that produced it.
    </p>
    <div className="mt-6 flex flex-wrap gap-3">
      <Link className={`${buttonClass} inline-block`} to="/login">Sign in</Link>
      <Link className={`${secondaryClass} inline-block`} to="/register">Create an account</Link>
    </div>
    <p className="mt-5 text-sm text-ink-3">
      The method, the results, the limits and the full research record stay open to everyone —
      no account needed to read any of them.
    </p>
  </div>
}

function DashboardNav({ user }: { user: User }) {
  const links = [['/dashboard', 'Overview'], ['/dashboard/predict', 'Predict'], ['/dashboard/history', 'History'], ['/dashboard/payments', 'Payments'], ['/dashboard/invoices', 'Invoices'], ['/dashboard/requests', 'Requests'], ['/dashboard/messages', 'Messages'], ['/dashboard/profile', 'Profile']] as const
  return <div className="mb-10 border-b border-rule">
    <div className="flex flex-wrap items-center justify-between gap-5 pb-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center border border-ink bg-card-2 font-display text-lg font-800" aria-hidden>{user.full_name.charAt(0).toUpperCase()}</div>
        <div>
          <p className="patch-label text-ink-3">RESEARCH ACCOUNT</p>
          <div className="mt-1 flex flex-wrap items-center gap-2"><p className="font-display text-lg font-700">{user.full_name}</p><span className="border border-ie-100/40 bg-ie-100/10 px-2 py-1 font-mono text-[10px] font-700 uppercase tracking-[0.08em] text-ie-100">{user.email_verified ? 'Verified' : 'Verify email'}</span></div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link className={`${buttonClass} inline-block`} to="/dashboard/predict">New prediction</Link>
        <button className="px-3 py-2 text-sm text-ink-3 underline-offset-4 hover:text-ink hover:underline" onClick={() => { void api.logout().finally(() => window.location.assign('/login')) }}>Sign out</button>
      </div>
    </div>
    <nav className="flex gap-1 overflow-x-auto" aria-label="Research account navigation">
      {links.map(([to, label]) => <NavLink key={to} end={to === '/dashboard'} className={({ isActive }) => `whitespace-nowrap border-b-2 px-3 py-3 text-sm transition-colors ${isActive ? 'border-ie-100 font-700 text-ink' : 'border-transparent text-ink-2 hover:border-rule hover:text-ink'}`} to={to}>{label}</NavLink>)}
      {user.role === 'platform_admin' && <NavLink className={({ isActive }) => `whitespace-nowrap border-b-2 px-3 py-3 text-sm font-700 transition-colors ${isActive ? 'border-ie-00 text-ie-00' : 'border-transparent text-ie-00 hover:border-ie-00'}`} to="/admin">Admin</NavLink>}
    </nav>
  </div>
}

function PaymentAction({ batchSize = 1, source = 'single' }: { batchSize?: number; source?: string }) {
  const [message, setMessage] = useState(''); const [pending, setPending] = useState(false)
  async function pay() { setPending(true); setMessage(''); try { const result = await api.initializePayment(batchSize, source); if (result.authorization_url) window.location.assign(result.authorization_url); else setMessage('Prediction credit is ready for this account.') } catch (err) { setMessage(err instanceof ApiError ? err.message : 'Payment could not be started.') } finally { setPending(false) } }
  return <div className="panel registered flex flex-wrap items-center justify-between gap-4 bg-card-2/40 p-5"><div><p className="patch-label text-ink-3">PREDICTION ACCESS</p><p className="mt-1 font-display font-700">Purchase one batch credit</p><p className="mt-1 text-sm text-ink-2">The configured Paystack price is applied to this batch submission.</p></div><div className="flex items-center gap-3"><button className={buttonClass} disabled={pending} onClick={() => void pay()}>{pending ? 'Opening Paystack…' : 'Pay and unlock'}</button>{message && <span className="text-sm text-ink-2">{message}</span>}</div></div>
}

export function DashboardPage() {
  const location = useLocation(); const [user, setUser] = useState<User | null>(null); const [error, setError] = useState<string | null>(null); const [overview, setOverview] = useState<Record<string, unknown> | null>(null); const [payments, setPayments] = useState<Payment[]>([]); const [invoices, setInvoices] = useState<Record<string, unknown>[]>([]); const [predictions, setPredictions] = useState<Record<string, unknown>[]>([]); const [requests, setRequests] = useState<{ data: Record<string, unknown>[]; papers: Record<string, unknown>[] }>({ data: [], papers: [] }); const [threads, setThreads] = useState<Record<string, unknown>[]>([])
  const section = location.pathname.replace('/dashboard', '').replace(/^\//, '') || 'overview'
  useEffect(() => { api.me().then((result) => setUser({ school: '', department: '', bio: '', research_area: '', country: '', ...result.user } as User)).catch((err) => setError(err instanceof ApiError ? err.message : 'Unable to load account.')) }, [])
  useEffect(() => { if (!user) return; const reference = new URLSearchParams(location.search).get('reference'); if (section === 'overview') api.accountOverview().then(setOverview).catch(() => undefined); if (section === 'payments') { void (async () => { if (reference) await api.verifyPayment(reference).catch(() => undefined); const result = await api.payments(); setPayments(result.items) })().catch(() => undefined) } if (section === 'invoices') api.invoices().then((result) => setInvoices(result.items)).catch(() => undefined); if (section === 'history') api.accountPredictions().then((result) => setPredictions(result.items)).catch(() => undefined); if (section === 'requests') api.requests().then(setRequests).catch(() => undefined); if (section === 'messages') api.threads().then((result) => setThreads(result.items)).catch(() => undefined) }, [section, user, location.search])
  if (!user) return <Section eyebrow="ACCOUNT" title="Loading dashboard"><ErrorLine error={error} /><p className="text-ink-2">Loading your secure research workspace…</p></Section>
  return <Section eyebrow="ACCOUNT" title={`Welcome back, ${user.full_name.split(' ')[0]}`} lead="Your predictions, research requests, payments, and platform communication in one place."><DashboardNav user={user}/>{section === 'overview' && <Overview user={user} overview={overview}/>} {section === 'predict' && <div className="space-y-8"><PaymentAction batchSize={1} source="dashboard"/><Predictor/><PaymentAction batchSize={2} source="batch"/><BatchPanel/></div>} {section === 'history' && <HistoryRows rows={predictions}/>} {section === 'payments' && <PaymentRows rows={payments}/>} {section === 'invoices' && <InvoiceRows rows={invoices}/>} {section === 'requests' && <RequestsPanel requests={requests}/>} {section === 'messages' && <MessagesPanel threads={threads} onRefresh={() => api.threads().then((result) => setThreads(result.items))}/>} {section === 'profile' && <ProfilePanel user={user} onSaved={setUser}/>}</Section>
}

function Overview({ user, overview }: { user: User; overview: Record<string, unknown> | null }) {
  const predictionCount = Number(overview?.predictions ?? 0)
  const requestCount = Number(overview?.data_requests ?? 0) + Number(overview?.paper_requests ?? 0)
  const cards: [string, string | number, string][] = [
    ['Predictions', overview ? String(overview.predictions ?? 0) : '—', predictionCount ? 'Saved to your private history' : 'No predictions yet'],
    ['Payments', overview ? String(overview.payments ?? 0) : '—', 'Paystack transactions'],
    ['Requests', requestCount, requestCount ? 'Data and paper requests' : 'No open requests'],
    ['Account', user.email_verified ? 'Verified' : 'Pending', user.email_verified ? 'Email confirmed' : 'Verification required'],
  ]
  return <div className="space-y-10">
    <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(([label, value, note]) => <div key={label} className="bg-card p-5 sm:p-6"><p className="patch-label text-ink-3">{label}</p><p className="mt-3 font-mono text-3xl font-700 tabular">{value}</p><p className="mt-2 text-xs text-ink-3">{note}</p></div>)}
    </div>
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
      <div className="registered bg-ink p-7 text-card sm:p-9">
        <div className="mb-8 h-2 max-w-xs border border-card/20" style={{ background: RAMP_GRADIENT }} aria-hidden />
        <p className="patch-label text-card/60">NEXT RESEARCH STEP</p>
        <h2 className="mt-3 max-w-xl font-display text-2xl font-800 leading-tight sm:text-3xl">Move from a candidate molecule to a defensible reading.</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-card/75">Enter the molecule and the conditions it will face. The service returns the predicted inhibition efficiency, a calibrated uncertainty band, and an applicability-domain verdict.</p>
        <div className="mt-7 flex flex-wrap gap-3"><Link className="bg-card px-4 py-2.5 font-display text-sm font-700 text-ink transition-colors hover:bg-card-2" to="/dashboard/predict">Start a prediction</Link><Link className="border border-card/40 px-4 py-2.5 font-display text-sm font-700 text-card transition-colors hover:border-card" to="/dashboard/history">View history</Link></div>
      </div>
      <div className="registered panel p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4"><div><p className="patch-label text-ink-3">ACCOUNT AT A GLANCE</p><h2 className="mt-2 font-display text-xl font-800">Research profile</h2></div><Link className="text-sm text-ink-2 underline-offset-4 hover:text-ink hover:underline" to="/dashboard/profile">Edit</Link></div>
        <dl className="mt-7 space-y-4 text-sm"><div className="border-b border-rule pb-3"><dt className="text-ink-3">Email</dt><dd className="mt-1 break-all font-mono text-xs">{user.email}</dd></div><div className="border-b border-rule pb-3"><dt className="text-ink-3">Institution</dt><dd className="mt-1">{user.school || 'Add your institution'}</dd></div><div><dt className="text-ink-3">Research area</dt><dd className="mt-1">{user.research_area || 'Add your research area'}</dd></div></dl>
      </div>
    </div>
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="patch-label text-ink-3">RESEARCH WORKSPACE</p><h2 className="mt-2 font-display text-2xl font-800">Everything you need for the next run.</h2></div><p className="max-w-sm text-sm text-ink-2">Your account keeps results, payment records, requests, and correspondence together.</p></div>
      <div className="grid gap-px bg-rule sm:grid-cols-2">
        {[['Predict', 'Run a single or batch prediction with a paid entitlement.', '/dashboard/predict', 'Open predictor'], ['History', predictionCount ? `${predictionCount} prediction${predictionCount === 1 ? '' : 's'} in your private record.` : 'Your completed predictions will appear here.', '/dashboard/history', 'Open history'], ['Requests', 'Ask for research data or a paper and track the response.', '/dashboard/requests', 'Make a request'], ['Messages', 'Keep technical questions and platform replies in one thread.', '/dashboard/messages', 'Open messages']].map(([label, description, to, action]) => <Link key={label} className="group bg-card p-6 transition-colors hover:bg-card-2" to={to}><div className="flex items-start justify-between gap-4"><div><p className="patch-label text-ink-3">{label}</p><p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-2">{description}</p></div><span className="font-mono text-lg text-ink-3 transition-transform group-hover:translate-x-1" aria-hidden>→</span></div><p className="mt-6 text-sm font-700 underline decoration-rule underline-offset-4 group-hover:decoration-ink">{action}</p></Link>)}
      </div>
    </div>
  </div>
}

function HistoryRows({ rows }: { rows: Record<string, unknown>[] }) { return <div className="panel overflow-x-auto"><table className="w-full min-w-[44rem] text-sm"><thead><tr className="border-b border-ink text-left"><th className="patch-label px-4 py-3">When</th><th className="patch-label px-4 py-3">Metal</th><th className="patch-label px-4 py-3">Inhibition efficiency</th><th className="patch-label px-4 py-3">Applicability</th></tr></thead><tbody>{rows.map((row) => <tr key={String(row.id)} className="border-b border-rule"><td className="px-4 py-3 font-mono text-xs">{String(row.created_at ?? '—')}</td><td className="px-4 py-3">{String(row.metal ?? '—')}</td><td className="px-4 py-3 font-mono">{Number(row.inhibition_efficiency ?? 0).toFixed(2)}%</td><td className="px-4 py-3">{String(row.ad_verdict ?? '—')}</td></tr>)}</tbody></table>{rows.length === 0 && <p className="p-8 text-sm text-ink-3">No private predictions yet.</p>}</div> }
function PaymentRows({ rows }: { rows: Payment[] }) { return <div className="space-y-3">{rows.map((row) => <div key={row.reference} className="panel flex flex-wrap justify-between gap-3 p-5"><div><p className="font-mono text-sm">{row.reference}</p><p className="mt-1 text-sm text-ink-2">{row.status}</p></div><p className="font-mono font-700">{row.currency ?? 'USD'} {row.amount_major?.toFixed(2) ?? '—'}</p></div>)}{rows.length === 0 && <p className="panel p-8 text-sm text-ink-3">No payments recorded.</p>}</div> }
function InvoiceRows({ rows }: { rows: Record<string, unknown>[] }) { return <div className="space-y-3">{rows.map((row) => <div key={String(row.id)} className="panel flex flex-wrap justify-between gap-3 p-5"><div><p className="font-display font-700">{String(row.invoice_number)}</p><p className="mt-1 text-sm text-ink-2">{String(row.description)}</p></div><p className="font-mono font-700">{String(row.currency)} {String(row.amount_major)}</p></div>)}{rows.length === 0 && <p className="panel p-8 text-sm text-ink-3">Invoices will appear after successful payment.</p>}</div> }

function RequestsPanel({ requests }: { requests: { data: Record<string, unknown>[]; papers: Record<string, unknown>[] } }) { const [kind, setKind] = useState<'data' | 'papers'>('data'); const [subject, setSubject] = useState(''); const [message, setMessage] = useState(''); const [sent, setSent] = useState(false); async function submit(event: FormEvent) { event.preventDefault(); if (kind === 'data') await api.dataRequest({ subject, message, priority: 'normal' }); else await api.paperRequest({ subject, message, priority: 'normal' }); setSent(true); setSubject(''); setMessage('') } return <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"><form onSubmit={(event) => void submit(event)} className="panel p-6"><div className="mb-5 flex gap-2"><button type="button" className={kind === 'data' ? buttonClass : secondaryClass} onClick={() => setKind('data')}>Request data</button><button type="button" className={kind === 'papers' ? buttonClass : secondaryClass} onClick={() => setKind('papers')}>Request paper</button></div><Field label="Subject" value={subject} onChange={setSubject} required/><Field label="Message" textarea value={message} onChange={setMessage} required/><button className={`${buttonClass} mt-5`}>Send request</button>{sent && <p className="mt-4 text-sm text-ink-2">Request sent to the research platform.</p>}</form><div className="space-y-3">{[...requests.data, ...requests.papers].map((row) => <div key={String(row.id)} className="panel p-5"><p className="font-display font-700">{String(row.subject)}</p><p className="mt-1 text-sm text-ink-2">{String(row.status)}</p></div>)}{requests.data.length + requests.papers.length === 0 && <p className="panel p-8 text-sm text-ink-3">Your submitted requests will appear here.</p>}</div></div> }

function MessagesPanel({ threads, onRefresh }: { threads: Record<string, unknown>[]; onRefresh: () => void }) { const [subject, setSubject] = useState(''); const [message, setMessage] = useState(''); async function submit(event: FormEvent) { event.preventDefault(); await api.createThread(subject, message); setSubject(''); setMessage(''); onRefresh() } return <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"><form onSubmit={(event) => void submit(event)} className="panel p-6"><Field label="Subject" value={subject} onChange={setSubject} required/><Field label="Message" textarea value={message} onChange={setMessage} required/><button className={`${buttonClass} mt-5`}>Send message</button></form><div className="space-y-3">{threads.map((thread) => <Link key={String(thread.id)} to={`/dashboard/messages/${String(thread.id)}`} className="panel block p-5 hover:bg-card-2"><p className="font-display font-700">{String(thread.subject)}</p><p className="mt-1 text-sm text-ink-2">{String(thread.status)}</p></Link>)}{threads.length === 0 && <p className="panel p-8 text-sm text-ink-3">No message threads yet.</p>}</div></div> }

export function MessageThreadPage() {
  const { threadId } = useParams(); const [thread, setThread] = useState<{ thread: Record<string, unknown>; messages: Record<string, unknown>[] } | null>(null); const [message, setMessage] = useState(''); const [error, setError] = useState<string | null>(null)
  const refresh = useCallback(async () => { if (!threadId) return; try { setThread(await api.thread(threadId)) } catch (err) { setError(err instanceof ApiError ? err.message : 'Unable to load this thread.') } }, [threadId])
  useEffect(() => { void refresh() }, [refresh])
  async function submit(event: FormEvent) { event.preventDefault(); if (!threadId || !message.trim()) return; try { await api.addMessage(threadId, message); setMessage(''); await refresh() } catch (err) { setError(err instanceof ApiError ? err.message : 'Unable to send the message.') } }
  return <Section eyebrow="MESSAGES" title={String(thread?.thread.subject ?? 'Message thread')} lead="Keep the research conversation and its platform responses together."><Link className="mb-6 inline-block text-sm underline" to="/dashboard/messages">← Back to messages</Link><ErrorLine error={error}/><div className="panel mb-6 space-y-4 p-6">{thread?.messages.map((item) => <div key={String(item.id)} className="border-b border-rule pb-4 last:border-0"><p className="patch-label text-ink-3">{String(item.sender_role ?? 'message')}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink-2">{String(item.body ?? '')}</p></div>) ?? <p className="text-sm text-ink-3">Loading messages…</p>}</div><form onSubmit={(event) => void submit(event)} className="panel flex gap-3 p-4"><textarea aria-label="Message" rows={3} value={message} onChange={(event) => setMessage(event.target.value)} className="min-h-20 flex-1 resize-y border border-rule bg-card px-3 py-2 text-sm outline-none focus:border-ink" placeholder="Write a reply…"/><button className={buttonClass}>Send reply</button></form></Section>
}

function ProfilePanel({ user, onSaved }: { user: User; onSaved: (user: User) => void }) { const [form, setForm] = useState({ full_name: user.full_name, school: user.school, department: user.department, research_area: user.research_area, country: user.country, bio: user.bio }); const [saved, setSaved] = useState(false); const update = (key: keyof typeof form) => (value: string) => setForm((current) => ({ ...current, [key]: value })); async function submit(event: FormEvent) { event.preventDefault(); const result = await api.updateProfile(form); onSaved({ ...user, ...result } as User); setSaved(true) } return <form onSubmit={(event) => void submit(event)} className="panel max-w-2xl space-y-4 p-6"><div className="grid gap-4 sm:grid-cols-2"><Field label="Full name" value={form.full_name} onChange={update('full_name')} required/><Field label="School" value={form.school} onChange={update('school')}/><Field label="Department" value={form.department} onChange={update('department')}/><Field label="Research area" value={form.research_area} onChange={update('research_area')}/><Field label="Country" value={form.country} onChange={update('country')}/></div><Field label="Biography" textarea value={form.bio} onChange={update('bio')}/><button className={buttonClass}>Save profile</button>{saved && <p className="text-sm text-ink-2">Profile saved.</p>}</form> }

export function AdminPage() { const [overview, setOverview] = useState<Record<string, unknown> | null>(null); const [rows, setRows] = useState<Record<string, unknown>[]>([]); const [resource, setResource] = useState('users'); useEffect(() => { api.adminOverview().then(setOverview).catch(() => undefined); api.adminResource(resource).then((result) => setRows(result.items)).catch(() => setRows([])) }, [resource]); return <Section eyebrow="ADMINISTRATION" title="Platform operations" lead="Account, payment, prediction, request, messaging, and privacy-preserving analytics oversight."><div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4 mb-10">{Object.entries(overview ?? {}).map(([key, value]) => <div className="bg-card p-5" key={key}><p className="patch-label text-ink-3">{key.replaceAll('_', ' ')}</p><p className="mt-3 font-mono text-2xl font-700">{String(value)}</p></div>)}</div><div className="mb-4 flex flex-wrap gap-2">{['users', 'payments', 'predictions', 'data_requests', 'paper_requests', 'message_threads', 'analytics_events', 'audit_logs'].map((name) => <button key={name} className={resource === name ? buttonClass : secondaryClass} onClick={() => setResource(name)}>{name.replaceAll('_', ' ')}</button>)}</div><div className="panel overflow-auto"><pre className="p-5 text-xs leading-relaxed text-ink-2">{JSON.stringify(rows, null, 2)}</pre></div></Section> }
