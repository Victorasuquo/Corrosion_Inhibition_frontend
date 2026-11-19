/**
 * Product identity and attribution.
 *
 * Names are recorded exactly as supplied by the author. Change them here and they
 * update everywhere — nothing else in the codebase hard-codes a name.
 */

export const PRODUCT_NAME = 'Inhibiepdt'

export const ATTRIBUTION = {
  author: 'Anne Sylvanus Obot',
  supervisor: 'Dr Ekerete Jackson Boekom',
  coSupervisor: 'Prof. Philip Asuquo',
  department: 'Department of Chemistry',
  institution: 'University of Uyo',
} as const

export const THESIS_TITLE =
  'An Artificial Intelligence Driven Quantitative Structure–Property Relationship Framework for the Prediction of Organic Corrosion Inhibition Efficiency'

/**
 * The four base metals the model was trained on, with their corpus row counts.
 *
 * Zinc is absent on purpose: it had 33 rows, below the 40-row threshold the run required of
 * a metal group, so it is not served. Carbon steel is also absent — it is not a base metal
 * here but an *alloy* designation of iron, which is how the corpus records it and how the
 * model encodes it. Order matches the model's one-hot encoding.
 */
export const METALS = [
  { value: 'Al', label: 'Aluminium', rows: 2783 },
  { value: 'Cu', label: 'Copper', rows: 431 },
  { value: 'Fe', label: 'Iron', rows: 3514 },
  { value: 'Mg', label: 'Magnesium', rows: 1631 },
] as const

export type MetalValue = (typeof METALS)[number]['value']

/**
 * Where a pH value came from. The model is told this so it can discount an inferred value
 * rather than treating every pH as equally certain.
 */
export const PH_SOURCES = [
  { value: 'measured', label: 'Measured' },
  { value: 'derived', label: 'Calculated from the medium' },
  { value: 'banded', label: 'Only a range was known' },
  { value: 'missing', label: 'Not known' },
] as const

export type PhSourceValue = (typeof PH_SOURCES)[number]['value']

/**
 * Defaults used when a value is genuinely unknown.
 *
 * These are not placeholders — each is a real category with real support in the training
 * corpus (335 rows recorded as `unspecified`, 1,389 as `not stated`, 43 as `missing`), so a
 * request that uses them is encoded exactly as those rows were.
 */
export const UNKNOWN_DEFAULTS = {
  alloy: 'unspecified',
  methodology: 'not stated',
  ph_source: 'missing',
} as const

/** Buckets a value outside the model's vocabulary is pooled into. */
export const POOLED_LABELS = {
  alloy: 'other_alloy',
  method: 'other_method',
} as const

/**
 * Real rows from the training corpus, for one-click loading.
 *
 * Every field is taken from an actual measurement, so each prefill is in-domain, carries a
 * valid alloy, technique and pH provenance, and has a known observed efficiency to compare
 * the prediction against. One example per base metal.
 */
export const EXAMPLES = [
  {
    name: 'Benzotriazole',
    smiles: 'c1ccc2[nH]nnc2c1',
    note: 'The reference copper and steel inhibitor. Widely used industrially.',
    metal: 'Al' as MetalValue,
    alloy: 'AA2024',
    methodology: 'impedance spectroscopy',
    ph_source: 'measured' as PhSourceValue,
    temperature_k: 293,
    duration_h: 24,
    concentration_mm: 0.5,
    ph: 7,
    salt_concentration_m: 0.05,
    observed: 97.95,
  },
  {
    name: '3-Amino-5-mercapto-1,2,4-triazole',
    smiles: 'Nc1n[nH]c(S)n1',
    note: 'Triazole thiol on aluminium alloy 2024. Complete protection in the corpus.',
    metal: 'Al' as MetalValue,
    alloy: 'AA2024',
    methodology: 'optical',
    ph_source: 'measured' as PhSourceValue,
    temperature_k: 298,
    duration_h: 24,
    concentration_mm: 1,
    ph: 4,
    salt_concentration_m: 0.1,
    observed: 100,
  },
  {
    name: 'Diethyldithiocarbamic acid',
    smiles: 'CCN(CC)C(=S)S',
    note: 'Sulfur-donor chelator on copper in near-neutral chloride.',
    metal: 'Cu' as MetalValue,
    alloy: 'Cu',
    methodology: 'impedance spectroscopy',
    ph_source: 'measured' as PhSourceValue,
    temperature_k: 298,
    duration_h: 24,
    concentration_mm: 1,
    ph: 7,
    salt_concentration_m: 0.05,
    observed: 99.3,
  },
  {
    name: '8-Hydroxyquinoline',
    smiles: 'Oc1cccc2cccnc12',
    note: 'Chelating N,O-donor studied on aluminium alloys.',
    metal: 'Al' as MetalValue,
    alloy: 'AA2024',
    methodology: 'optical',
    ph_source: 'measured' as PhSourceValue,
    temperature_k: 298,
    duration_h: 24,
    concentration_mm: 1,
    ph: 4,
    salt_concentration_m: 0.1,
    observed: 50,
  },
  {
    name: 'Potassium nitrite',
    smiles: 'O=N[O-]',
    note: 'Inorganic inhibitor on magnesium AZ31, measured by hydrogen evolution.',
    metal: 'Mg' as MetalValue,
    alloy: 'AZ31',
    methodology: 'hydrogen evolution',
    ph_source: 'measured' as PhSourceValue,
    temperature_k: 296,
    duration_h: 20,
    concentration_mm: 50,
    ph: 7,
    salt_concentration_m: 0.09,
    observed: 95,
  },
  {
    name: 'Thiourea',
    smiles: 'NC(N)=S',
    note: 'Classic sulfur donor — but on AA1100 by gravimetry, where the model is weakest. Loads the warnings.',
    metal: 'Al' as MetalValue,
    alloy: 'AA1100',
    methodology: 'gravimetric',
    ph_source: 'measured' as PhSourceValue,
    temperature_k: 298,
    duration_h: 144,
    concentration_mm: 660,
    ph: -0.14,
    salt_concentration_m: null,
    observed: 28.59,
  },
] as const

/**
 * The honest performance figures, for places that render before /api/v1/model resolves.
 *
 * There is a third figure in the research notebook — R² 0.817 — from a control split in
 * which 94.5% of test molecules had already been seen in training. It is not here, and it is
 * stripped out of the served artefact, because quoting it is the specific thing this study
 * exists to argue against.
 */
export const PERFORMANCE = {
  groupedMolecule: { r2: 0.461, mae: 15.65, rmse: 21.45, spearman: 0.687 },
  scaffold: { r2: 0.398, mae: 17.32, rmse: 22.23, spearman: 0.61 },
  intervalHalfWidth: 38.61,
  intervalCoverage: 0.926,
  /** Two independent laboratory measurements of the same experiment differ by about this. */
  replicateSpread: 8.8,
  rows: 8359,
  molecules: 1050,
} as const

/** Sources for the global corrosion figures quoted on the page. */
export const CITATIONS = {
  globalCost: {
    claim:
      'The global cost of corrosion is estimated at US$2.5 trillion a year, about 3.4% of global GDP.',
    source: 'NACE International IMPACT study (2016)',
    url: 'http://impact.nace.org/economic-impact.aspx',
  },
  savings: {
    claim:
      'Applying established corrosion-control practice could save 15–35% of that cost — between US$375 and US$875 billion a year.',
    source: 'NACE International IMPACT study, executive summary',
    url: 'http://impact.nace.org/executive-summary.aspx',
  },
  fullReport: {
    claim:
      'The estimate combines national corrosion-cost studies from India, the United States, Japan, Kuwait and the United Kingdom, extrapolated across World Bank GDP and sector data.',
    source: 'International Measures of Prevention, Application, and Economics of Corrosion Technologies',
    url: 'http://impact.nace.org/documents/Nace-International-Report.pdf',
  },
} as const

/**
 * The three source databases, with the references the thesis cites.
 *
 * These are not "pending". Each is confirmed in Chapter 3 and in the research
 * repository's DATA.md, and the corpus is not redistributable without them: the
 * measurements belong to these compilations and to the primary publications they
 * aggregate. Anyone using the corpus cites these as well as the thesis.
 */
export const SOURCE_DATASETS = [
  {
    name: 'Inhibitor 1368',
    reference:
      'Gong, H., Fu, Z., Ma, L., & Zhang, D. (2024). Inhibitor_Mol_VAE: A variational autoencoder approach for generating corrosion inhibitor molecules. npj Materials Degradation, 8(1), 102.',
    url: '',
  },
  {
    name: 'CORDATA',
    reference:
      'Galvão, T. L. P., Ferreira, I., Kuznetsova, A., Rocha, A. B., Tedim, J., & Ferreira, M. G. S. (2022). CORDATA: An open data management web application to select corrosion inhibitors. npj Materials Degradation, 6, 48.',
    url: 'https://doi.org/10.1038/s41529-022-00259-9',
  },
  {
    name: 'ExCorr',
    reference:
      'Würger, T. (n.d.). ExCorr: An interactive corrosion inhibitor database [Web application]. Helmholtz-Zentrum Hereon.',
    url: 'https://excorr.web.app',
  },
] as const
