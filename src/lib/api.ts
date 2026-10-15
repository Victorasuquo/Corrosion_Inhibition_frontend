/**
 * Typed client for the Inhibiepdt FastAPI backend.
 *
 * Every response is parsed through Zod, so a backend contract change surfaces as a
 * clear error here rather than as an undefined field deep in a component.
 */

import { z } from 'zod'

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
).replace(/\/+$/, '')

/* -------------------------------------------------------------------------- */
/* Schemas                                                                     */
/* -------------------------------------------------------------------------- */

export const conditionCheckSchema = z.object({
  name: z.string(),
  value: z.number().nullable(),
  imputed: z.boolean(),
  within_training_range: z.boolean(),
  training_min: z.number(),
  training_max: z.number(),
  coverage: z.number(),
})

export const categoryResolutionSchema = z.object({
  field: z.string(),
  supplied: z.string(),
  encoded: z.string(),
  in_vocabulary: z.boolean(),
})

/**
 * A documented failure mode of the served model, for this specific request.
 *
 * `out_of_vocabulary` is the one the bundle's own reference implementation misses: an alloy
 * the encoders have never seen is pooled rather than rejected, and the user has to be told
 * the answer is not specific to the grade they typed.
 */
export const reliabilityWarningSchema = z.object({
  kind: z.enum(['unsupported_metal', 'extrapolation', 'unreliable_group', 'out_of_vocabulary']),
  subject: z.string(),
  message: z.string(),
  group_r2: z.number().nullable().optional(),
  group_n: z.number().nullable().optional(),
})

export const applicabilityDomainSchema = z.object({
  verdict: z.enum(['in_domain', 'edge_of_domain', 'out_of_domain']),
  max_tanimoto: z.number(),
  nearest_is_analogue: z.boolean(),
  nearest_training_smiles: z.string().nullable().optional(),
  scaffold: z.string(),
  scaffold_in_training: z.boolean(),
  metal_in_training: z.boolean(),
  conditions: z.array(conditionCheckSchema),
  categories: z.array(categoryResolutionSchema),
  reference_r2: z.number(),
  reference_split: z.string(),
  rationale: z.string(),
})

export const predictionSchema = z.object({
  input_smiles: z.string(),
  canonical_smiles: z.string(),
  formula: z.string(),
  molecular_weight: z.number(),
  heavy_atoms: z.number(),
  metal: z.string(),
  alloy: z.string(),
  methodology: z.string(),
  ph_source: z.string(),
  temperature_k: z.number().nullable(),
  duration_h: z.number().nullable(),
  concentration_mm: z.number().nullable(),
  ph: z.number().nullable(),
  salt_concentration_m: z.number().nullable(),
  synergist_present: z.number(),
  imputed_conditions: z.array(z.string()),
  inhibition_efficiency: z.number(),
  interval_low: z.number(),
  interval_high: z.number(),
  interval_half_width: z.number(),
  nominal_coverage: z.number(),
  empirical_coverage: z.number(),
  applicability_domain: applicabilityDomainSchema,
  reliability_warnings: z.array(reliabilityWarningSchema),
  model_version: z.string(),
})

export const validationSchema = z.object({
  valid: z.boolean(),
  input_smiles: z.string(),
  canonical_smiles: z.string().nullable().optional(),
  formula: z.string().nullable().optional(),
  molecular_weight: z.number().nullable().optional(),
  heavy_atoms: z.number().nullable().optional(),
  rings: z.number().nullable().optional(),
  scaffold: z.string().nullable().optional(),
  scaffold_in_training: z.boolean().nullable().optional(),
  in_training_corpus: z.boolean().nullable().optional(),
  max_tanimoto: z.number().nullable().optional(),
  nearest_training_smiles: z.string().nullable().optional(),
  salt_stripped: z.boolean().nullable().optional(),
  error: z.string().nullable().optional(),
})

export const batchResultSchema = z.object({
  total: z.number(),
  succeeded: z.number(),
  failed: z.number(),
  elapsed_ms: z.number(),
  results: z.array(
    z.object({
      index: z.number(),
      ok: z.boolean(),
      prediction: predictionSchema.nullable().optional(),
      error: z.string().nullable().optional(),
    }),
  ),
})

export const explanationSchema = z.object({
  canonical_smiles: z.string(),
  inhibition_efficiency: z.number(),
  baseline: z.number(),
  contributions: z.array(
    z.object({
      feature: z.string(),
      label: z.string(),
      kind: z.enum(['descriptor', 'condition']),
      value: z.number(),
      contribution: z.number(),
    }),
  ),
  note: z.string(),
})

const splitMetricsSchema = z.object({
  r2: z.number(),
  rmse: z.number(),
  mae: z.number(),
  spearman: z.number(),
  means: z.string().optional(),
})

const leaderboardRowSchema = z.object({
  model: z.string(),
  family: z.string(),
  representation: z.string(),
  r2: z.number(),
  r2_std: z.number(),
  rmse: z.number(),
  mae: z.number(),
  spearman: z.number().nullable(),
})

export const modelInfoSchema = z.object({
  version: z.string(),
  algorithm: z.string(),
  representation: z.string(),
  hyperparameters: z.record(z.union([z.number(), z.string()])),
  training: z.object({
    rows: z.number(),
    molecules: z.number(),
    metals: z.array(z.string()),
    target: z.string(),
  }),
  features: z.object({
    total: z.number(),
    descriptors: z.number(),
    descriptors_computed: z.number(),
    conditions: z.number(),
    numeric_conditions: z.array(z.string()),
    blocks: z.record(z.array(z.number())),
    categories: z.record(z.number()),
  }),
  /**
   * Both honest schemes, always together. There is deliberately no `random_split` key: the
   * row-wise control figure is stripped out of the served artefact at install time.
   */
  performance: z.object({
    grouped_molecule: splitMetricsSchema,
    scaffold_split: splitMetricsSchema,
    reporting_rule: z.string(),
    measurement_floor: z.object({
      replicate_spread_ie_points: z.number(),
      note: z.string(),
    }),
  }),
  leaderboard: z.object({
    grouped_molecule: z.array(leaderboardRowSchema),
    scaffold: z.array(leaderboardRowSchema),
  }),
  ablation: z.array(
    z.object({
      step: z.string(),
      n_features: z.number(),
      split: z.string(),
      r2: z.number(),
      mae: z.number(),
    }),
  ),
  calibration: z.object({
    method: z.string(),
    nominal_coverage: z.number(),
    empirical_coverage: z.number(),
    half_width_ie_points: z.number(),
  }),
  applicability_domain: z.object({
    near_neighbour_tanimoto: z.number(),
    related_tanimoto: z.number(),
    reference_molecules: z.number(),
    reference_scaffolds: z.number(),
    training_ranges: z.record(z.unknown()),
  }),
  known_failure_modes: z.object({
    alloys: z.array(z.string()),
    methods: z.array(z.string()),
    by_group: z.record(z.unknown()),
  }),
  provenance: z.object({
    source_run: z.string(),
    seed: z.number(),
    created_utc: z.string(),
    bundle_built_utc: z.string().nullable().optional(),
    pins: z.record(z.string()),
    rdkit_runtime: z.string(),
    derived_locally: z.record(z.string()).optional(),
    ad_reference_divergence: z.record(z.unknown()).nullable().optional(),
    artifact_hashes: z.record(z.string()),
  }),
})

/** The categorical vocabularies the form binds its selects to. */
const categoryOptionSchema = z.object({
  value: z.string(),
  rows: z.number().nullable().optional(),
  pooled: z.boolean().optional(),
  unreliable: z.boolean().optional(),
  group_r2: z.number().nullable().optional(),
})

export const categoriesSchema = z.object({
  metal: z.array(categoryOptionSchema),
  alloy: z.array(categoryOptionSchema),
  method: z.array(categoryOptionSchema),
  ph_source: z.array(categoryOptionSchema),
  pooling: z.object({
    alloy_other_label: z.string(),
    method_other_label: z.string(),
    note: z.string(),
  }),
})

export const recentPredictionsSchema = z.object({
  backend: z.string(),
  items: z.array(
    z.object({
      created_utc: z.string(),
      model_version: z.string(),
      canonical_smiles: z.string(),
      metal: z.string(),
      alloy: z.string().nullable().optional(),
      methodology: z.string().nullable().optional(),
      temperature_k: z.number().nullable().optional(),
      duration_h: z.number().nullable().optional(),
      concentration_mm: z.number().nullable().optional(),
      ph: z.number().nullable().optional(),
      inhibition_efficiency: z.number(),
      interval_low: z.number(),
      interval_high: z.number(),
      ad_verdict: z.string(),
      max_tanimoto: z.number(),
      scaffold_in_training: z.union([z.boolean(), z.number()]).optional(),
      source: z.string().optional(),
    }),
  ),
})

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  full_name: z.string(),
  school: z.string().optional().transform((value) => value ?? ''),
  department: z.string().optional().transform((value) => value ?? ''),
  bio: z.string().optional().transform((value) => value ?? ''),
  research_area: z.string().optional().transform((value) => value ?? ''),
  country: z.string().optional().transform((value) => value ?? ''),
  role: z.string(),
  email_verified: z.boolean(),
  created_at: z.string().optional(),
})

export const authSchema = z.object({ user: userSchema })
export const registrationSchema = z.object({
  user: userSchema,
  verification_required: z.boolean(),
  development_verification_token: z.string().optional(),
})

export const paymentSchema = z.object({
  id: z.string().optional(),
  reference: z.string(),
  amount_major: z.number().optional(),
  currency: z.string().optional(),
  status: z.string(),
  created_at: z.string().optional(),
  paid_at: z.string().optional(),
  authorization_url: z.string().optional(),
})
export const paymentInitializeSchema = z.object({
  reference: z.string(),
  status: z.string(),
  amount_major: z.number().optional(),
  currency: z.string().optional(),
  development: z.boolean().optional(),
  authorization_url: z.string().optional(),
  access_code: z.string().nullable().optional(),
  payment: paymentSchema.optional(),
})
export const paymentsSchema = z.object({ items: z.array(paymentSchema) })
export const invoicesSchema = z.object({ items: z.array(z.record(z.unknown())) })
export const platformRequestsSchema = z.object({
  data: z.array(z.record(z.unknown())),
  papers: z.array(z.record(z.unknown())),
})
export const threadsSchema = z.object({ items: z.array(z.record(z.unknown())) })
export const threadSchema = z.object({ thread: z.record(z.unknown()), messages: z.array(z.record(z.unknown())) })
export const createdThreadSchema = z.object({ thread: z.record(z.unknown()), message: z.record(z.unknown()) })
export const overviewSchema = z.record(z.union([z.number(), z.string()]))
export const predictionHistorySchema = z.object({ items: z.array(z.record(z.unknown())) })

export type RecentPrediction = z.infer<typeof recentPredictionsSchema>['items'][number]
export type Prediction = z.infer<typeof predictionSchema>
export type ValidationResult = z.infer<typeof validationSchema>
export type BatchResult = z.infer<typeof batchResultSchema>
export type Explanation = z.infer<typeof explanationSchema>
export type ModelInfo = z.infer<typeof modelInfoSchema>
export type Categories = z.infer<typeof categoriesSchema>
export type CategoryOption = z.infer<typeof categoriesSchema>['alloy'][number]
export type ReliabilityWarning = z.infer<typeof reliabilityWarningSchema>
export type CategoryResolution = z.infer<typeof categoryResolutionSchema>
export type User = z.infer<typeof userSchema>
export type Payment = z.infer<typeof paymentSchema>
export type Thread = z.infer<typeof threadSchema>

/**
 * The request body. The categoricals are required because a blank would be encoded as an
 * all-zero block rather than rejected; the numerics are genuinely optional, because the model
 * was trained with was-missing indicators.
 */
export interface PredictionInput {
  smiles: string
  metal: string
  alloy: string
  methodology: string
  ph_source: string
  temperature_k: number | null
  duration_h: number | null
  concentration_mm: number | null
  ph: number | null
  salt_concentration_m: number | null
  synergist_present: number
}

/* -------------------------------------------------------------------------- */
/* Transport                                                                   */
/* -------------------------------------------------------------------------- */

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly kind: 'network' | 'validation' | 'server' = 'server',
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(path: string, schema: z.ZodType<T>, init?: RequestInit): Promise<T> {
  let response: Response
  const csrf = typeof document === 'undefined'
    ? ''
    : document.cookie.split('; ').find((part) => part.startsWith('inhibiepdt_csrf='))?.split('=')[1] ?? ''
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      credentials: 'include',
      headers: {
        ...(init?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...(csrf && init?.method && init.method !== 'GET' ? { 'X-CSRF-Token': decodeURIComponent(csrf) } : {}),
        ...init?.headers,
      },
    })
  } catch {
    throw new ApiError(
      `Cannot reach the prediction service at ${API_BASE_URL}. If you are running locally, start the backend with \`make run\`.`,
      0,
      'network',
    )
  }

  if (!response.ok) {
    let detail = `Request failed (${response.status}).`
    try {
      const body = await response.json()
      if (typeof body?.detail === 'string') detail = body.detail
      else if (Array.isArray(body?.detail) && body.detail[0]?.msg) detail = body.detail[0].msg
    } catch {
      /* keep the default message */
    }
    throw new ApiError(detail, response.status, response.status === 422 ? 'validation' : 'server')
  }

  return schema.parse(await response.json())
}

export const api = {
  predict: (input: PredictionInput) =>
    request('/api/v1/predict', predictionSchema, {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  explain: (input: PredictionInput) =>
    request('/api/v1/explain', explanationSchema, {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  validate: (smiles: string) =>
    request(`/api/v1/validate?smiles=${encodeURIComponent(smiles)}`, validationSchema),

  batch: (items: PredictionInput[]) =>
    request('/api/v1/predict/batch', batchResultSchema, {
      method: 'POST',
      body: JSON.stringify({ items }),
    }),

  batchCsv: (file: File) => {
    const form = new FormData()
    form.append('file', file)
    return request('/api/v1/predict/csv', batchResultSchema, { method: 'POST', body: form })
  },

  model: () => request('/api/v1/model', modelInfoSchema),

  categories: () => request('/api/v1/categories', categoriesSchema),

  recentPredictions: (limit = 20) =>
    request(`/api/v1/predictions/recent?limit=${limit}`, recentPredictionsSchema),

  register: (input: { email: string; password: string; full_name: string; school: string; department: string; bio: string; research_area: string; country: string }) =>
    request('/api/v1/auth/register', registrationSchema, { method: 'POST', body: JSON.stringify(input) }),

  login: (input: { email: string; password: string }) =>
    request('/api/v1/auth/login', authSchema, { method: 'POST', body: JSON.stringify(input) }),

  logout: () => request('/api/v1/auth/logout', z.object({ ok: z.boolean() }), { method: 'POST' }),

  me: () => request('/api/v1/auth/me', authSchema),

  verifyEmail: (token: string) =>
    request('/api/v1/auth/verify-email', authSchema, { method: 'POST', body: JSON.stringify({ token }) }),

  requestPasswordReset: (email: string) =>
    request('/api/v1/auth/request-password-reset', z.object({ ok: z.boolean(), message: z.string() }), { method: 'POST', body: JSON.stringify({ email }) }),

  resetPassword: (token: string, password: string) =>
    request('/api/v1/auth/reset-password', z.object({ ok: z.boolean() }), { method: 'POST', body: JSON.stringify({ token, password }) }),

  initializePayment: (batch_size: number, source: string) =>
    request('/api/v1/payments/initialize', paymentInitializeSchema, { method: 'POST', body: JSON.stringify({ batch_size, source }) }),

  verifyPayment: (reference: string) =>
    request(`/api/v1/payments/verify/${encodeURIComponent(reference)}`, z.object({ status: z.string(), payment: paymentSchema }),),

  payments: () => request('/api/v1/payments', paymentsSchema),
  accountPredictions: () => request('/api/v1/account/predictions', predictionHistorySchema),
  accountOverview: () => request('/api/v1/account/overview', overviewSchema),
  invoices: () => request('/api/v1/invoices', invoicesSchema),
  profile: () => request('/api/v1/account/profile', z.record(z.unknown())),

  updateProfile: (input: Record<string, string>) =>
    request('/api/v1/account/profile', z.record(z.unknown()), { method: 'PATCH', body: JSON.stringify(input) }),

  dataRequest: (input: { subject: string; message: string; priority: string }) =>
    request('/api/v1/requests/data', z.record(z.unknown()), { method: 'POST', body: JSON.stringify(input) }),

  paperRequest: (input: { subject: string; message: string; priority: string }) =>
    request('/api/v1/requests/papers', z.record(z.unknown()), { method: 'POST', body: JSON.stringify(input) }),

  requests: () => request('/api/v1/requests', platformRequestsSchema),
  threads: () => request('/api/v1/threads', threadsSchema),
  thread: (id: string) => request(`/api/v1/threads/${id}`, threadSchema),
  createThread: (subject: string, message: string) =>
    request('/api/v1/threads', createdThreadSchema, { method: 'POST', body: JSON.stringify({ subject, message }) }),
  addMessage: (id: string, message: string) =>
    request(`/api/v1/threads/${id}/messages`, z.record(z.unknown()), { method: 'POST', body: JSON.stringify({ message }) }),

  adminOverview: () => request('/api/v1/admin/overview', overviewSchema),
  adminResource: (resource: string) => request(`/api/v1/admin/${resource}`, z.object({ items: z.array(z.record(z.unknown())) })),

  visit: (path: string) =>
    request('/api/v1/analytics/visit', z.any(), { method: 'POST', body: JSON.stringify({ path, referrer: document.referrer }) }).catch(() => undefined),
}
