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

export const applicabilityDomainSchema = z.object({
  verdict: z.enum(['in_domain', 'edge_of_domain', 'out_of_domain']),
  max_tanimoto: z.number(),
  nearest_is_analogue: z.boolean(),
  scaffold: z.string(),
  scaffold_in_training: z.boolean(),
  metal_in_training: z.boolean(),
  conditions: z.array(conditionCheckSchema),
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
  temperature_k: z.number().nullable(),
  duration_h: z.number().nullable(),
  concentration_mm: z.number().nullable(),
  imputed_conditions: z.array(z.string()),
  inhibition_efficiency: z.number(),
  interval_low: z.number(),
  interval_high: z.number(),
  interval_half_width: z.number(),
  nominal_coverage: z.number(),
  empirical_coverage: z.number(),
  applicability_domain: applicabilityDomainSchema,
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
  in_training_corpus: z.boolean().nullable().optional(),
  max_tanimoto: z.number().nullable().optional(),
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
})

export const modelInfoSchema = z.object({
  version: z.string(),
  algorithm: z.string(),
  representation: z.string(),
  hyperparameters: z.record(z.union([z.number(), z.string()])),
  features: z.object({
    total: z.number(),
    descriptors: z.number(),
    conditions: z.number(),
    condition_names: z.array(z.string()),
    excluded: z.array(z.string()),
  }),
  performance: z.object({
    random_split: splitMetricsSchema,
    scaffold_split: splitMetricsSchema,
    reporting_rule: z.string(),
  }),
  ablation: z.object({
    description: z.string(),
    descriptors_only: z.object({
      random_split_r2: z.number(),
      scaffold_split_r2: z.number(),
    }),
    descriptors_plus_conditions: z.object({
      random_split_r2: z.number(),
      scaffold_split_r2: z.number(),
    }),
  }),
  all_models: z.array(
    z.object({
      family: z.string(),
      model: z.string(),
      rep: z.string(),
      split: z.string(),
      r2: z.number(),
      rmse: z.number(),
      mae: z.number(),
      spearman: z.number(),
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
  }),
  provenance: z.object({
    source_run: z.string(),
    seed: z.number(),
    created_utc: z.string(),
    pins: z.record(z.string()),
    rdkit_runtime: z.string(),
    verification: z.record(z.union([z.boolean(), z.number()])),
    artifact_hashes: z.record(z.string()),
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
      temperature_k: z.number().nullable().optional(),
      duration_h: z.number().nullable().optional(),
      concentration_mm: z.number().nullable().optional(),
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

export type RecentPrediction = z.infer<typeof recentPredictionsSchema>['items'][number]
export type Prediction = z.infer<typeof predictionSchema>
export type ValidationResult = z.infer<typeof validationSchema>
export type BatchResult = z.infer<typeof batchResultSchema>
export type Explanation = z.infer<typeof explanationSchema>
export type ModelInfo = z.infer<typeof modelInfoSchema>

export interface PredictionInput {
  smiles: string
  metal: string
  temperature_k: number | null
  duration_h: number | null
  concentration_mm: number | null
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
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        ...(init?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
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

  recentPredictions: (limit = 20) =>
    request(`/api/v1/predictions/recent?limit=${limit}`, recentPredictionsSchema),
}
