/**
 * Chart parameters, validated with the dataviz skill's palette validator.
 *
 * Categorical hues are assigned in this fixed order and never cycled. The order is
 * load-bearing: green and orange are non-adjacent, which is what lifts the
 * colour-vision-deficiency separation on the worst adjacent pair from a 7.3 warning
 * to a 15.7 pass.
 */

export const CATEGORICAL = ['#0b8a53', '#3a7cb8', '#bf4f1c', '#8f57a6'] as const

/** Diverging poles for signed values. Neutral grey sits at zero. */
export const DIVERGING = {
  positive: '#0b8a53',
  negative: '#bf4f1c',
  zero: '#c9cec7',
} as const

/** Model families, coloured by identity in fixed categorical order. */
export const FAMILY_COLOR: Record<string, string> = {
  classical: CATEGORICAL[0],
  neural_baseline: CATEGORICAL[1],
  graph_nn: CATEGORICAL[2],
  transformer: CATEGORICAL[3],
  ensemble: '#4a514c',
}

export const FAMILY_LABEL: Record<string, string> = {
  classical: 'Classical',
  neural_baseline: 'Neural',
  graph_nn: 'Graph',
  transformer: 'Transformer',
  ensemble: 'Ensemble',
}

export const MODEL_LABEL: Record<string, string> = {
  random_forest: 'Random forest',
  grad_boost: 'Gradient boosting',
  svr_rbf: 'SVR (RBF)',
  ridge: 'Ridge',
  mlp: 'Neural network',
  mpnn: 'MPNN',
  gat: 'Graph attention',
  chemberta_ft: 'ChemBERTa',
  weighted_avg: 'Weighted ensemble',
  stacked: 'Stacked ensemble',
}

export const REP_LABEL: Record<string, string> = {
  desc: 'Descriptors',
  desc_cond: 'Descriptors + conditions',
  fp: 'Fingerprints',
  graph: 'Molecular graph',
  smiles: 'SMILES',
  'desc+fp': 'Descriptors + fingerprints',
  oof: 'Out-of-fold',
}
