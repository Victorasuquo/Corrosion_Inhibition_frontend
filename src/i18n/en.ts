/**
 * English — the canonical dictionary.
 *
 * Every other locale is typechecked against this shape, so a missing or renamed key
 * is a build error rather than a blank space on a translated page.
 */

export const en = {
  meta: {
    title: 'Inhibiepdt — Corrosion Inhibition Efficiency Prediction',
    description:
      'Predict the corrosion inhibition efficiency of an organic molecule on aluminium, carbon steel, copper, iron or magnesium under stated experimental conditions, with a calibrated uncertainty band and an honest applicability-domain verdict.',
  },

  nav: {
    skip: 'Skip to content',
    sections: 'Sections',
    predict: 'Predict',
    method: 'Method',
    results: 'Results',
    limits: 'Limits',
    language: 'Language',
  },

  hero: {
    titleA: 'Corrosion costs',
    titleB: 'the world $2.5',
    titleC: 'trillion a year.',
    p1: 'That is about 3.4% of global GDP, lost every year across pipelines, ships, bridges, refineries and reinforced concrete. Applying corrosion-control practice that is already well understood could save 15–35% of it — between $375 and $875 billion.',
    p2: 'One of the cheapest defences is an organic corrosion inhibitor: a molecule dosed at parts per million that adsorbs onto the metal and forms a protective film.',
    p3: 'Finding the right molecule means bench-testing candidates one at a time, for weeks. This model estimates the answer first.',
    ctaPrimary: 'Make a prediction',
    ctaSecondary: 'How it works',
    scaleTitle: 'The scale this instrument reads',
    scaleNote:
      'Inhibition efficiency is not an abstract score. It is the difference between a metal that dissolves and one that does not — and it has a colour.',
    patch0: 'Bare metal, corroding freely',
    patch40: 'Partial film',
    patch80: 'Protective film forming',
    patch100: 'Passivated, protected',
    sources: 'Sources',
  },

  predictor: {
    eyebrow: 'The instrument',
    title: 'Read an efficiency.',
    lead: 'Enter a molecule and the conditions it will face. You get a calibrated band, not a false point — and a plain statement of whether this is chemistry the model actually knows.',

    formTitle: 'Specimen & conditions',
    inputCount: '5 inputs',
    smilesLabel: 'Molecule (SMILES)',
    gramsPerMol: 'g/mol',
    heavyAtoms: 'heavy atoms',
    inCorpus: 'In the training corpus',
    examplesHint: 'No SMILES to hand? Load a real inhibitor above — these fill the same five inputs.',

    metalLabel: 'Substrate metal',
    rows: 'rows',

    conditionsLabel: 'Experimental conditions',
    conditionsHint:
      'Untick anything you did not measure. The model was trained with missing-value indicators, so “not recorded” is an answer it understands — not a guess.',
    recorded: 'recorded',
    notRecorded: 'not recorded',
    temperature: 'Temperature',
    temperatureHint: '283–606 K in training. 298 K is room temperature.',
    duration: 'Exposure duration',
    durationHint: 'Recorded for only 54% of the corpus.',
    concentration: 'Inhibitor concentration',
    concentrationHint: 'Spans 3×10⁻⁵ to 3280 mM; the model sees log₁₀.',

    submit: 'Predict inhibition efficiency',
    submitPending: 'Reading…',
    phNote:
      'pH is not an input. It is carried through the research pipeline for analysis only and was never a model feature.',

    emptyTitle: 'The reading appears here',
    emptyBody:
      'A prediction is read as a band, not a point — the way you read a colour against a comparator card. The band’s width is the model’s calibrated uncertainty.',
    errorTitle: 'Cannot read',
    genericError: 'Something went wrong.',

    readingTitle: 'Reading',
    modelVersion: 'model',
    efficiencyLabel: 'Inhibition efficiency',
    formula: 'Formula',
    mass: 'Mass',
    substrate: 'Substrate',
    interval: 'interval',

    imputedOne: 'condition was not recorded',
    imputedMany: 'conditions were not recorded',
    imputedBody:
      'The model used the training median and was told the value was missing — the same treatment those rows received during training.',

    trustTitle: 'How far can you trust this?',
    nearestMatch: 'Nearest match',
    scaffoldSeen: 'Scaffold seen',
    yes: 'Yes',
    no: 'No',
    trustFooter:
      'The quoted R² is the one this request is entitled to. Familiar chemistry is measured by the random split; anything else is measured by the stricter scaffold split.',

    shapTitle: 'What drove this number',
    shapLead: 'Exact Shapley values over the model’s own features, in efficiency points.',
  },

  domain: {
    in_domain: 'In domain',
    edge_of_domain: 'Edge of domain',
    out_of_domain: 'Outside domain',
    inShort: 'Known chemistry',
    edgeShort: 'Related chemistry',
    outShort: 'Unfamiliar chemistry',
  },

  efficiency: {
    veryHigh: 'Very high inhibition',
    high: 'High inhibition',
    moderate: 'Moderate inhibition',
    low: 'Low inhibition',
    none: 'Little to no inhibition',
  },

  method: {
    eyebrow: 'Method',
    title: 'Efficiency depends on conditions. So the model is given them.',
    lead: 'Most published structure–property models predict from molecular structure alone, while the efficiency they are trained against depends on temperature, concentration, duration and substrate. This project carried those conditions through and handed them to the model. That decision is the research.',
    s1h: 'Three datasets, one schema',
    s1p: 'Inhibitor 1368, DataCor aluminium and the Excorr database — 7,991 raw measurements harmonised onto a common scale, with SMILES canonicalised and salts stripped.',
    s2h: 'Deduplicate without discarding conditions',
    s2p: 'An earlier pipeline averaged each molecule across every condition, collapsing ~8,000 rows to 717. Keying on molecule, metal, temperature, duration and concentration instead preserves distinct measurements — and yields 5,170 usable rows.',
    s3h: '220 features',
    s3p: '209 non-constant RDKit descriptors, plus temperature, duration, log₁₀ concentration, a was-missing indicator for each, and a one-hot substrate.',
    s4h: 'Two evaluation splits, always reported together',
    s4p: 'Random five-fold, and Bemis–Murcko scaffold five-fold where molecules sharing a core stay in the same fold. The gap between them is the honest story.',
    statMeasurements: 'measurements',
    statMolecules: 'unique molecules',
    statMetals: 'metals',
    statDescriptors: 'descriptors',
    statConditions: 'condition features',
    statPh: 'pH features',
    figure4:
      'The executed pipeline, from three source datasets through to ensemble construction and conformal calibration.',
    figure4Alt:
      'Pipeline architecture: three source datasets feed inspection and preprocessing into a master table, which feeds feature analysis and four modelling streams, which feed ensemble construction.',
    serving: 'Serving',
    features: 'features',
    seed: 'seed',
    run: 'run',
  },

  results: {
    eyebrow: 'Results',
    title: 'Two numbers, never one.',
    leadA: 'The model scores',
    leadB: 'on a random split and',
    leadC: 'on a scaffold split. Both are true, and they answer different questions. Quoting only the first would be the easiest way to mislead you, so this page refuses to.',
    randomTitle: 'Random split — R² 0.806',
    randomBody:
      'Folds drawn at random. A test molecule may already appear in training under different conditions, so this measures how well the model predicts a new measurement of a molecule it has met. Useful, and not the question a screening chemist is asking.',
    scaffoldTitle: 'Scaffold split — R² 0.310',
    scaffoldBody:
      'Molecules sharing a Bemis–Murcko core are held in the same fold, so every test molecule is structurally unfamiliar. This measures performance on genuinely new chemistry. It is the number to quote for an untested candidate, and the one this service uses whenever your molecule is new to it.',
    ablationTitle: 'The central result',
    ablationLead:
      'The same random forest, with and without experimental conditions. The lift is systematic — it held for every classical model tested, which is what makes it signal rather than luck.',
    leaderboardTitle: 'Every model tested',
    leaderboardLead:
      'Four model families across both splits. The condition-aware random forest wins everywhere — including against the graph networks and the fine-tuned transformer, which read structure only.',
    unavailable: 'Live metrics unavailable — the prediction service at',
    unreachable: 'is not reachable.',
    loading: 'Loading metrics…',
  },

  charts: {
    structureOnly: 'Structure only',
    structurePlusConditions: 'Structure + experimental conditions',
    structurePlusShort: 'Structure + conditions',
    randomSplit: 'Random split',
    scaffoldSplit: 'Scaffold split',
    randomSub: 'New measurements of known molecules',
    scaffoldSub: 'Genuinely new chemistry',
    r2Note: 'R² — coefficient of determination, 0 to 1. Higher is better.',
    splitGroup: 'Evaluation split',
    scaffoldExplain:
      'Molecules sharing a Bemis–Murcko core are held in the same fold, so every test molecule is structurally new. This is the honest estimate for an unseen candidate.',
    randomExplain:
      'Folds are drawn at random, so a test molecule may already appear in training under different conditions. This measures new measurements, not new chemistry.',
    colModel: 'Model',
    colRepresentation: 'Representation',
    colMae: 'MAE',
    negative: 'negative',
    tableCaption: 'Model performance, sorted by R².',
    ridgeNote:
      'A negative R² means the model predicted worse than always guessing the corpus mean. Ridge regression collapses on scaffold splits because unbounded descriptors such as Ipc take extreme values on unfamiliar scaffolds. That is the distribution shift a scaffold split exists to expose, not a defect in the pipeline.',
    raises: 'Raises predicted efficiency',
    lowers: 'Lowers predicted efficiency',
    condition: 'condition',
  },

  learned: {
    eyebrow: 'Interpretability',
    title: 'Did it learn chemistry, or just arithmetic?',
    lead: 'Shapley values over the whole corpus name what the model leans on. The answer is reassuring: substrate identity, molecular size and the dosing conditions — which is what corrosion science would predict.',
    figure7:
      'Global SHAP summary for the tuned random forest. Each point is one molecule; position shows the effect on predicted efficiency.',
    figure7Alt:
      'SHAP summary plot. The strongest features are metal equals aluminium, molar refractivity, log concentration, temperature and duration, followed by connectivity and partial-charge descriptors.',
    i1h: 'Substrate dominates',
    i1p: 'Which metal you are protecting is the single strongest feature. Aluminium and magnesium behave differently enough from steel that the model treats them almost as separate problems.',
    i2h: 'Size governs coverage',
    i2p: 'Molar refractivity and connectivity indices rank high. Bulkier molecules cover more surface per adsorbed molecule — the physical picture corrosion science already holds.',
    i3h: 'Dose and heat matter, in that order',
    i3p: 'Log concentration outranks temperature, and both outrank most structural descriptors. This is the conditions hypothesis confirmed from the inside.',
    i4h: 'Electron-rich sites appear',
    i4p: 'Partial-charge and electrotopological descriptors surface below the leaders, consistent with adsorption through nitrogen, sulfur and oxygen donor atoms.',
    footer:
      'Attribution shows what the model relies on. It is evidence that the model learned something physically sensible — not a measurement of adsorption chemistry itself.',
  },

  limits: {
    eyebrow: 'Limits',
    title: 'Where this model stops working.',
    leadA: 'Every item here is one an examiner would otherwise have to find. Calibrated uncertainty of',
    leadB: 'efficiency points at',
    leadC: 'empirical coverage is wide — and stating it plainly is the point.',
    l1h: 'The scaffold gap is large, and it did not close',
    l1p: 'Conditions lifted scaffold R² from 0.124 to 0.310 — real, but far below the 0.806 random-split figure. Knowing the conditions cannot substitute for having seen the chemistry.',
    l2h: 'Duration is missing for 46% of the corpus',
    l2p: 'Imputation with a was-missing indicator is honest bookkeeping, but it cannot recover information that was never measured.',
    l3h: 'pH is excluded by design',
    l3p: 'It is recorded for only 32% of rows and is carried for analysis only. Adding it would have meant imputing a majority of the column.',
    l4h: 'Iron and carbon steel are still separate',
    l4p: 'Carbon steel is iron-based and both are usually tested in acid, but the sources do not record the distinction reliably. Whether to merge them into one ferrous group is an open scientific decision, deliberately unresolved.',
    l5h: 'Tuning was 10 trials, not nested cross-validation',
    l5p: 'A direct Optuna search against the scaffold objective. The tuning curve was flat across all trials, so the model is not hyperparameter-limited — but the methodology labels nested CV as planned, not done.',
    l6h: 'This is not a substitute for testing',
    l6p: 'It is a research demonstrator for screening and ranking. Weight-loss and electrochemical measurement remain the evidence.',
  },

  batch: {
    eyebrow: 'Batch',
    title: 'Rank a whole candidate series.',
    lead: 'Upload a CSV of molecules under one service condition and get them back ordered by predicted efficiency, each with its own band and trust verdict.',
    panelTitle: 'Screen a series',
    panelLead:
      'Upload a CSV to rank candidates under one service condition. Descriptors are cached per unique molecule and the forest is called once for the whole file.',
    template: 'Download template',
    choose: 'Choose a CSV file',
    reading: 'Reading file…',
    predicted: 'predicted',
    failed: 'failed',
    download: 'Download results',
    colMolecule: 'Molecule',
    colReading: 'Reading',
    colTrust: 'Trust',
    tableCaption: 'Batch results, ranked by predicted efficiency.',
    row: 'row',
  },

  figures: {
    eyebrow: 'Appendix',
    title: 'Figures from the executed run.',
    lead: 'Produced directly by the notebook, reproduced here unaltered.',
    f1: 'Raw target distributions across the three source datasets, before harmonisation.',
    f3: 'The harmonised efficiency distribution after canonicalisation, deduplication and metal scoping.',
    f5: 'Top 30 descriptors by mutual information with the target.',
    f6: 'Correlation among the leading descriptors, exposing redundancy in the size and connectivity families.',
    f8: 'Integrated-gradients atom saliency on the message-passing network.',
    f9: 'Attention rollout over a SMILES string from the fine-tuned ChemBERTa.',
    f10: 'Predictions with 90% conformal intervals against observed values.',
  },

  colophon: {
    author: 'Author',
    supervisor: 'Supervisor',
    coSupervisor: 'Co-supervisor',
    institution: 'Institution',
    provenance: 'Provenance',
    modelVersion: 'Model version',
    sourceRun: 'Source run',
    seed: 'Seed',
    modelHash: 'Model SHA-256',
    unavailable: 'Service unavailable.',
    provenanceNote:
      'Every artefact is verified against a SHA-256 manifest before the service will start. Dataset citations are still being traced; the three source datasets are linked to rather than redistributed.',
  },

  metals: {
    aluminium: 'Aluminium',
    carbon_steel: 'Carbon steel',
    copper: 'Copper',
    iron: 'Iron',
    magnesium: 'Magnesium',
  },
} as const

export type Dictionary = typeof en
