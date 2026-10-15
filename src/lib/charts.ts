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

// Family names as the v2 run's results ledger records them.
export const FAMILY_LABEL: Record<string, string> = {
  classical: 'Classical',
  neural: 'Neural',
  graph: 'Graph',
  transformer: 'Transformer',
  hybrid: 'Hybrid',
  baseline: 'Baseline',
  ensemble: 'Ensemble',
  // Retained so a bundle from the earlier run still labels correctly.
  neural_baseline: 'Neural',
  graph_nn: 'Graph',
}

export const MODEL_LABEL: Record<string, string> = {
  random_forest: 'Random forest',
  xgboost: 'XGBoost',
  grad_boost: 'Gradient boosting',
  svr_rbf: 'SVR (RBF)',
  ridge: 'Ridge',
  baseline_mean: 'Corpus mean',
  feedforward_mlp: 'Neural network',
  mlp: 'Neural network',
  mpnn_fusion: 'MPNN + context',
  mpnn: 'MPNN',
  gat_fusion: 'Graph attention + context',
  gat: 'Graph attention',
  chemberta_ft: 'ChemBERTa',
  // The three hybrids, which couple a learned representation to a tabular learner.
  hybrid_h1_graph_gbm: 'Graph encoder + GBM',
  hybrid_h2_chemberta_gbm: 'ChemBERTa embedding + GBM',
  hybrid_h3_fusion_net: 'Three-branch fusion net',
  random_forest_structure_only: 'Random forest, structure only',
  xgboost_structure_only: 'XGBoost, structure only',
  weighted_avg: 'Weighted ensemble',
  stacked: 'Stacked ensemble',
}

export const REP_LABEL: Record<string, string> = {
  'structure+context': 'Descriptors + context',
  structure: 'Descriptors only',
  'graph embedding + context': 'Graph embedding + context',
  'pretrained embedding + context': 'Pretrained embedding + context',
  'sequence + structure + context': 'Sequence + structure + context',
  none: '—',
  desc: 'Descriptors',
  desc_cond: 'Descriptors + conditions',
  fp: 'Fingerprints',
  graph: 'Molecular graph',
  smiles: 'SMILES',
  'desc+fp': 'Descriptors + fingerprints',
  oof: 'Out-of-fold',
}
