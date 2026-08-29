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

/** Sources for the Niger Delta figures quoted on the page. */
export const CITATIONS = {
  spdcSpills: {
    claim:
      'Shell Petroleum Development Company recorded 810 oil-spill incidents totalling 46,758 barrels between 1989 and 1998; 310 incidents and 24,342 barrels were attributed to pipeline corrosion.',
    source: 'Management of Oil Spills Due to Pipeline Corrosion in the Niger Delta Region of Nigeria',
    url: 'https://www.researchgate.net/publication/306356390_MANAGEMENT_OF_OIL_SPILLS_DUE_TO_PIPELINE_CORROSION_IN_THE_NIGER_DELTA_REGION_OF_NIGERIA',
  },
  inhibitorEffect: {
    claim:
      'Amine-group inhibitor dosing reduced a measured corrosion rate from 42.71 to 1.34 mils per year.',
    source: 'Internal corrosion behaviour of Nigerian gas pipelines',
    url: 'https://journals.unizik.edu.ng/index.php/ujeas/article/download/6140/5109/13994',
  },
  nigerDelta: {
    claim:
      'Pitting and microbially induced corrosion dominate in the Niger Delta, driven by high humidity, salinity and corrosive bacteria.',
    source: 'Corrosion Management in the Niger Delta',
    url: 'https://www.gz-supplies.com/news/corrosion-management-in-the-niger-delta-innovative-solutions-for-oil-and-gas-infrastructure-/',
  },
} as const
