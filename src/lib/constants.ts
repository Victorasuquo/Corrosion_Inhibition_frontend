/**
 * Product identity and attribution.
 *
 * Names are recorded exactly as supplied by the author. Change them here and they
 * update everywhere — nothing else in the codebase hard-codes a name.
 */

export const PRODUCT_NAME = 'Inhibiepdt'

export const ATTRIBUTION = {
  author: 'Anne Sylvanus Obot',
  supervisor: 'Dr. Ekerete Jackson BoEKOM',
  coSupervisor: 'Prof. Philip Asuquo',
  department: 'Department of Chemistry',
  institution: 'University of Uyo',
} as const

export const THESIS_TITLE =
  'An Artificial Intelligence Driven Quantitative Structure–Property Relationship Framework for the Prediction of Organic Corrosion Inhibition Efficiency'

/** Substrates the model was trained on. Order matches the model's one-hot encoding. */
export const METALS = [
  { value: 'aluminium', label: 'Aluminium', rows: 2019 },
  { value: 'carbon_steel', label: 'Carbon steel', rows: 1342 },
  { value: 'copper', label: 'Copper', rows: 169 },
  { value: 'iron', label: 'Iron', rows: 1436 },
  { value: 'magnesium', label: 'Magnesium', rows: 204 },
] as const

export type MetalValue = (typeof METALS)[number]['value']

/**
 * Real inhibitors from the training corpus, for one-click loading.
 *
 * These are prefills of the same five variables the model takes — not extra inputs.
 * Someone who cannot write SMILES can still drive the instrument.
 */
export const EXAMPLES = [
  {
    name: 'Benzotriazole',
    smiles: 'c1ccc2[nH]nnc2c1',
    note: 'The reference copper and steel inhibitor. Widely used industrially.',
    metal: 'carbon_steel' as MetalValue,
    temperature_k: 298.15,
    duration_h: 6,
    concentration_mm: 1,
  },
  {
    name: 'Thiourea',
    smiles: 'NC(N)=S',
    note: 'Classic sulfur-donor inhibitor for steel in acid service.',
    metal: 'iron' as MetalValue,
    temperature_k: 303.15,
    duration_h: 24,
    concentration_mm: 10,
  },
  {
    name: '8-Hydroxyquinoline',
    smiles: 'Oc1cccc2cccnc12',
    note: 'Chelating N,O-donor studied on aluminium alloys.',
    metal: 'aluminium' as MetalValue,
    temperature_k: 298.15,
    duration_h: 24,
    concentration_mm: 5,
  },
  {
    name: 'Caffeine',
    smiles: 'Cn1cnc2c1c(=O)n(C)c(=O)n2C',
    note: 'A green inhibitor — non-toxic, plant-derived, actively researched.',
    metal: 'carbon_steel' as MetalValue,
    temperature_k: 303.15,
    duration_h: 4,
    concentration_mm: 2,
  },
] as const

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
