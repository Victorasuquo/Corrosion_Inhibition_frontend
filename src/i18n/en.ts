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
      'Predict the corrosion inhibition efficiency of an organic molecule on iron, aluminium, magnesium or copper under stated experimental conditions, with a calibrated uncertainty band and an honest applicability-domain verdict.',
  },

  nav: {
    skip: 'Skip to content',
    sections: 'Sections',
    predict: 'Predict',
    method: 'Method',
    results: 'Results',
    limits: 'Limits',
    language: 'Language',
    home: 'Overview',
    batch: 'Batch',
    figures: 'Figures',
    cite: 'Cite',
    history: 'Activity',
    login: 'Login',
    register: 'Register',
  },

  pages: {
    nextSteps: 'Next',
    predictNextTitle: 'Where to go from here.',
    cardBatch: 'Screening more than one candidate? Upload a CSV and get the series back ranked.',
    cardLimits: 'Before you act on a number, read where this model stops working.',
    cardCite: 'Using a prediction in a paper or report? Take the citation and the reproducibility block.',
    notFoundTitle: 'No reading at this address.',
    notFoundBody: 'That page does not exist. The instrument is still on the bench.',
    backHome: 'Back to the overview',
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
    inputCount: '11 inputs',
    smilesLabel: 'Molecule (SMILES)',
    gramsPerMol: 'g/mol',
    heavyAtoms: 'heavy atoms',
    inCorpus: 'In the training corpus',
    examplesHint:
      'No SMILES to hand? Load a real inhibitor above. Each one is an actual row from the training corpus, so every field is filled with a measurement that was really taken.',
    saltStripped: 'Counter-ion removed',

    metalLabel: 'Base metal',
    rows: 'rows',

    contextLabel: 'Substrate & technique',
    contextHint:
      'Both are model inputs, and both matter: adding them lifted explained variance from 0.395 to 0.456 on unseen molecules. Pick from the lists — they are the exact values the model encodes.',
    alloyLabel: 'Alloy designation',
    alloyHint:
      'Carbon steel lives here, not under metal. Grades with fewer than 30 corpus rows were pooled during training, and anything outside the list is pooled the same way.',
    methodLabel: 'Measurement technique',
    methodHint:
      'Techniques disagree by tens of efficiency points, so the model is told which one you mean. Use “not stated” if you do not know — it is a real category with 1,389 rows.',
    unreliableTag: '⚠',
    synergistLabel: 'A synergistic additive is present',
    synergistHint: 'Only 110 corpus rows record one, so this is weakly supported either way.',

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
    concentrationHint: 'Spans 3×10⁻⁵ to 3300 mM; the model sees log₁₀.',
    ph: 'Electrolyte pH',
    phHint:
      'A model feature in this version. Negative values are real — the corpus reaches −1.0 in concentrated acid.',
    phSourceLabel: 'This pH was',
    salt: 'Supporting salt',
    saltHint: 'Recorded for only 39% of the corpus, so leaving this unticked is normal.',

    submit: 'Predict inhibition efficiency',
    submitPending: 'Reading…',
    intervalNote:
      'Every reading is a 90% band, never a bare number. On an unseen molecule that band is ±38.6 efficiency points, which is the honest width.',
    preflightTitle: 'Before you read this',

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
    explain: 'Explain',
    close: 'Close',

    imputedOne: 'condition was not recorded',
    imputedMany: 'conditions were not recorded',
    imputedBody:
      'The model used the training median and was told the value was missing — the same treatment those rows received during training.',

    trustTitle: 'How far can you trust this?',
    nearestMatch: 'Nearest match',
    scaffoldSeen: 'Scaffold seen',
    yes: 'Yes',
    no: 'No',
    nearestIs: 'Closest molecule in the training corpus:',
    pooledInto: 'is not encoded individually, so it was pooled into',
    trustFooter:
      'The quoted R² is the one this request is entitled to. A molecule absent from training is measured at 0.461; one whose scaffold is also new is measured by the stricter 0.398.',
    replicateNote:
      'For scale, two independent laboratory measurements of the same experiment differ by about {spread} efficiency points. A large part of the error is in the measurements, not the model.',

    warningsTitle: 'Known limits on this reading',
    warnUnreliableAlloy:
      'the model explains no variance on this grade. It is in the study as a documented failure.',
    warnUnreliableMethod:
      'measurements made this way are the ones the model fits worst.',

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
    s1p: 'Inhibitor 1368, the ExCorr multi-metal set and the CORDATA multi-metal export, harmonised onto one 15-field schema with SMILES canonicalised, salts stripped, and the measurement techniques mapped onto a controlled vocabulary.',
    s2h: 'Deduplicate without discarding conditions',
    s2p: 'An earlier pipeline averaged each molecule across every condition, collapsing thousands of rows to 717. Keying on molecule, metal, temperature, duration, concentration and pH instead preserves distinct measurements — 8,359 of them, over 1,050 molecules on four base metals.',
    s3h: '283 features',
    s3p: '211 non-constant RDKit descriptors, then the context: temperature and its inverse, duration and log₁₀ duration, log₁₀ concentration, pH, log₁₀ salt concentration, a was-missing indicator for each, and one-hot encodings of base metal, alloy grade, measurement technique and pH provenance, plus a synergist flag.',
    s4h: 'Two honest splits, always reported together',
    s4p: 'Five-fold grouped by molecule, so no test molecule appears in training, and Bemis–Murcko scaffold five-fold, where molecules sharing a core stay in the same fold. A third, row-wise split was run as a control and is reported only to show how badly it flatters the model.',
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
    leadB: 'on molecules absent from training and',
    leadC: 'when the molecular scaffold is new as well. Both are true, and they answer different questions. There is a third, higher figure in the research notebook — it comes from a split that let the model see its own test molecules, and this page will not quote it.',
    groupedTitle: 'By molecule — R² 0.461',
    groupedBody:
      'Every measurement of a molecule is held in the same fold, so no test molecule appears in training under any conditions. This is the honest estimate for a molecule the model has not met: it explains 46% of the variance, with a typical error of 15.7 efficiency points.',
    scaffoldTitle: 'By scaffold — R² 0.398',
    scaffoldBody:
      'Molecules sharing a Bemis–Murcko core are held in the same fold, so every test molecule is structurally unfamiliar. This is the number to quote for an untested candidate, and the one this service uses whenever your molecule’s scaffold is new to it.',
    ablationTitle: 'What each block bought',
    ablationLead:
      'A cumulative ablation: descriptors alone, then the experimental conditions, pH provenance, substrate and technique added in turn. The substrate and technique blocks carry most of the lift; pH provenance, on its own, slightly cost accuracy.',
    leaderboardTitle: 'Every model tested',
    leaderboardLead:
      'Fourteen configurations across five families, on both honest schemes. They cluster tightly — the graph networks and the fine-tuned transformer do not beat a random forest given the same context, which says the ceiling is in the data rather than the architecture.',
    unavailable: 'Live metrics unavailable — the prediction service at',
    unreachable: 'is not reachable.',
    loading: 'Loading metrics…',
  },

  charts: {
    structureOnly: 'Structure only',
    structurePlusConditions: 'Structure + experimental conditions',
    structurePlusShort: 'Structure + conditions',
    scaffoldSplit: 'Scaffold split',
    scaffoldSub: 'Genuinely new chemistry',
    r2Note: 'R² — coefficient of determination, 0 to 1. Higher is better.',
    splitGroup: 'Evaluation split',
    scaffoldExplain:
      'Molecules sharing a Bemis–Murcko core are held in the same fold, so every test molecule is structurally new. This is the honest estimate for an unseen candidate.',
    groupedSplit: 'By molecule',
    groupedSub: 'Molecules absent from training',
    groupedExplain:
      'Every measurement of a molecule is held in the same fold, so no test molecule appears in training under any conditions. This is the honest estimate for a molecule the model has not seen.',
    colStep: 'Feature block added',
    colFeatures: 'cols',
    colMarginal: 'Δ R²',
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
    l1h: 'The band is wider than the answer',
    l1p: 'The 90% interval is ±38.6 efficiency points on an unseen molecule. That is honest, and it is also wide enough that this model ranks candidates rather than measuring them. Treat any single number as a position in a queue.',
    l2h: 'Some groups fail outright',
    l2p: 'On the alloys recorded as Cold rolled steel, Stainless steel, Fe, Steel and AA1100, and on gravimetric, polarisation-resistance and current-density measurements, the model explains no variance at all. Those readings are flagged where they occur rather than quietly averaged into the headline.',
    l3h: 'Much of the context was never recorded',
    l3p: 'Duration is absent for a third of the corpus and supporting salt concentration for 61%. A was-missing indicator is honest bookkeeping, but it cannot recover information nobody measured.',
    l4h: 'pH was recovered, not measured',
    l4p: 'pH became a feature in this version, but only 49% of values were measured directly — the rest were calculated from the stated corrodent or inferred as a band. The model is told which, and on its own the provenance block slightly lowered accuracy rather than raising it.',
    l5h: 'The reported tuning is not nested cross-validation',
    l5p: 'Nested CV was implemented but not executed in the reported run; the served hyperparameters come from a direct 10-trial search against the scaffold objective. The tuned figures should be read as optimistic by an unmeasured margin, which is why the untuned benchmark carries the comparative conclusions.',
    l6h: 'Validated against the literature, not against a bench',
    l6p: 'Every figure here is measured against the published record. The comparison against this project’s own laboratory measurements has not been done. Weight-loss and electrochemical testing remain the evidence.',
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

  cite: {
    eyebrow: 'Citation',
    title: 'How to cite this work.',
    lead: 'Three things can be cited here, and they are not interchangeable: the research itself, the software that serves it, and a specific prediction you obtained from it.',

    thesisTitle: 'Citing the research',
    thesisBody: 'Cite the thesis when you are referring to the method, the corpus, or the finding that experimental conditions carry the signal. Confirm the year and award status before submitting — the year below is the current one, not a verified publication date.',

    softwareTitle: 'Citing the software',
    softwareBody: 'Cite the tool when you used it to produce numbers. The version matters: a later model version would give different answers, so pin the one you actually used.',

    reproTitle: 'Citing a prediction',
    reproBody: 'This is the part usually left out. A prediction is only reproducible if the reader knows which artefact produced it, so this block carries the live model version, its SHA-256 and the pinned library versions. Paste it into your methods section.',
    methodsParagraph: 'Methods paragraph',

    copy: 'Copy',
    copied: 'Copied',

    dataEyebrow: 'Data',
    dataTitle: 'Citing the source datasets.',
    dataBody: 'The corpus was harmonised from three public datasets. They belong to their original authors and are linked to rather than redistributed here.',
    dataGapTitle: 'Citations still being traced',
    dataGapBody: 'The original publications for these three datasets have not yet been confirmed, so no reference is printed here rather than printing one that might be wrong. If you use the corpus, trace each dataset to its source publication and cite that directly.',
    dsInhibitor:
      '1,364 entries for carbon steel in 1 M HCl, with quantum-chemical descriptors.',
    dsCordata:
      'The CORDATA multi-metal export: 5,000 rows across seventeen fields, covering aluminium, copper, iron, magnesium and zinc, with per-row conditions.',
    dsExcorr:
      '4,616 entries spanning iron, aluminium, magnesium, copper and zinc.',
    citationPending: 'Reference pending',

    licenceEyebrow: 'Terms',
    licenceTitle: 'Licence and contact.',
    licenceBody: 'The code is open. The datasets retain their original licences and are not redistributed.',
    codeLicence: 'Code licence',
    contact: 'Contact',
  },

  history: {
    eyebrow: 'Activity',
    title: 'What this service has been asked.',
    lead: 'Every prediction is logged with the model version that produced it, so any result can be traced back to an exact artefact. Only the canonical molecule is shown.',
    emptyTitle: 'Nothing logged yet',
    emptyBody: 'Predictions appear here once the service has served some. Make one and come back.',
    tableCaption: 'Recently served predictions, newest first.',
    colWhen: 'When',
    rows: 'entries',
  },

  metals: {
    Al: 'Aluminium',
    Cu: 'Copper',
    Fe: 'Iron',
    Mg: 'Magnesium',
  },

  phSources: {
    measured: 'measured',
    derived: 'calculated',
    banded: 'a range',
    missing: 'not known',
  },

  warningKinds: {
    unsupported_metal: 'Metal',
    extrapolation: 'Outside range',
    unreliable_group: 'Known weakness',
    out_of_vocabulary: 'Pooled',
  },
} as const

export type Dictionary = typeof en
