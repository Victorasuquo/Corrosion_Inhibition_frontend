import type { Translations } from './config'

export const fr: Translations = {
  meta: {
    title: 'Inhibiepdt — Prédiction de l’efficacité d’inhibition de la corrosion',
    description:
      'Prédisez l’efficacité d’inhibition de la corrosion d’une molécule organique sur l’aluminium, l’acier au carbone, le cuivre, le fer ou le magnésium dans des conditions expérimentales données, avec un intervalle de confiance calibré et un verdict honnête sur le domaine d’applicabilité.',
  },

  nav: {
    skip: 'Aller au contenu',
    sections: 'Sections',
    predict: 'Prédire',
    method: 'Méthode',
    results: 'Résultats',
    limits: 'Limites',
    language: 'Langue',
    home: 'Aperçu',
    batch: 'Lot',
    figures: 'Figures',
    cite: 'Citer',
    history: 'Activité',
  },

  pages: {
    nextSteps: 'Suite',
    predictNextTitle: 'Où aller ensuite.',
    cardBatch: 'Plusieurs candidats à évaluer ? Téléversez un CSV et récupérez la série classée.',
    cardLimits: 'Avant d’agir sur un chiffre, lisez où ce modèle cesse de fonctionner.',
    cardCite: 'Vous utilisez une prédiction dans un article ou un rapport ? Prenez la citation et le bloc de reproductibilité.',
    notFoundTitle: 'Aucune lecture à cette adresse.',
    notFoundBody: 'Cette page n’existe pas. L’instrument est toujours sur la paillasse.',
    backHome: 'Retour à l’aperçu',
  },

  hero: {
    titleA: 'La corrosion coûte',
    titleB: 'au monde 2 500',
    titleC: 'milliards par an.',
    p1: 'Soit environ 3,4 % du PIB mondial, perdus chaque année sur les pipelines, les navires, les ponts, les raffineries et le béton armé. Appliquer des pratiques de lutte contre la corrosion déjà bien comprises permettrait d’en économiser 15 à 35 % — entre 375 et 875 milliards de dollars.',
    p2: 'L’une des défenses les moins coûteuses est un inhibiteur de corrosion organique : une molécule dosée à quelques parties par million qui s’adsorbe sur le métal et forme un film protecteur.',
    p3: 'Trouver la bonne molécule suppose de tester les candidates une par une, pendant des semaines. Ce modèle en estime d’abord la réponse.',
    ctaPrimary: 'Faire une prédiction',
    ctaSecondary: 'Comment ça marche',
    scaleTitle: 'L’échelle que lit cet instrument',
    scaleNote:
      'L’efficacité d’inhibition n’est pas un score abstrait. C’est la différence entre un métal qui se dissout et un métal qui résiste — et elle a une couleur.',
    patch0: 'Métal nu, corrosion libre',
    patch40: 'Film partiel',
    patch80: 'Film protecteur en formation',
    patch100: 'Passivé, protégé',
    sources: 'Sources',
  },

  predictor: {
    eyebrow: 'L’instrument',
    title: 'Lire une efficacité.',
    lead: 'Saisissez une molécule et les conditions auxquelles elle sera exposée. Vous obtenez un intervalle calibré, pas un point trompeur — et une indication claire de savoir si cette chimie est réellement connue du modèle.',

    formTitle: 'Échantillon et conditions',
    inputCount: '5 entrées',
    smilesLabel: 'Molécule (SMILES)',
    gramsPerMol: 'g/mol',
    heavyAtoms: 'atomes lourds',
    inCorpus: 'Présente dans le corpus d’entraînement',
    examplesHint:
      'Pas de SMILES sous la main ? Chargez un inhibiteur réel ci-dessus — ils remplissent les mêmes cinq entrées.',

    metalLabel: 'Métal du substrat',
    rows: 'lignes',

    conditionsLabel: 'Conditions expérimentales',
    conditionsHint:
      'Décochez tout ce que vous n’avez pas mesuré. Le modèle a été entraîné avec des indicateurs de valeur manquante : « non mesuré » est donc une réponse qu’il comprend, et non une supposition.',
    recorded: 'mesuré',
    notRecorded: 'non mesuré',
    temperature: 'Température',
    temperatureHint: '283–606 K à l’entraînement. 298 K correspond à la température ambiante.',
    duration: 'Durée d’exposition',
    durationHint: 'Renseignée pour seulement 54 % du corpus.',
    concentration: 'Concentration en inhibiteur',
    concentrationHint: 'De 3×10⁻⁵ à 3280 mM ; le modèle utilise le log₁₀.',

    submit: 'Prédire l’efficacité d’inhibition',
    submitPending: 'Lecture…',
    phNote:
      'Le pH n’est pas une entrée. Il est conservé dans le pipeline de recherche à des fins d’analyse uniquement et n’a jamais été une variable du modèle.',

    emptyTitle: 'La lecture apparaît ici',
    emptyBody:
      'Une prédiction se lit comme une bande, non comme un point — de la même façon qu’on lit une couleur sur une carte de comparaison. La largeur de la bande est l’incertitude calibrée du modèle.',
    errorTitle: 'Lecture impossible',
    genericError: 'Une erreur est survenue.',

    readingTitle: 'Lecture',
    modelVersion: 'modèle',
    efficiencyLabel: 'Efficacité d’inhibition',
    formula: 'Formule',
    mass: 'Masse',
    substrate: 'Substrat',
    interval: 'intervalle',

    imputedOne: 'condition n’a pas été mesurée',
    imputedMany: 'conditions n’ont pas été mesurées',
    imputedBody:
      'Le modèle a utilisé la médiane d’entraînement et a été informé que la valeur manquait — exactement le traitement appliqué à ces lignes pendant l’entraînement.',

    trustTitle: 'Quelle confiance accorder à ce résultat ?',
    nearestMatch: 'Plus proche voisin',
    scaffoldSeen: 'Squelette déjà vu',
    yes: 'Oui',
    no: 'Non',
    trustFooter:
      'Le R² cité est celui auquel cette requête a droit. La chimie familière est mesurée par la partition aléatoire ; tout le reste l’est par la partition par squelette, plus stricte.',

    shapTitle: 'Ce qui a déterminé ce chiffre',
    shapLead:
      'Valeurs de Shapley exactes sur les variables du modèle, exprimées en points d’efficacité.',
  },

  domain: {
    in_domain: 'Dans le domaine',
    edge_of_domain: 'Limite du domaine',
    out_of_domain: 'Hors domaine',
    inShort: 'Chimie connue',
    edgeShort: 'Chimie apparentée',
    outShort: 'Chimie inconnue',
  },

  efficiency: {
    veryHigh: 'Inhibition très élevée',
    high: 'Inhibition élevée',
    moderate: 'Inhibition modérée',
    low: 'Inhibition faible',
    none: 'Inhibition faible ou nulle',
  },

  method: {
    eyebrow: 'Méthode',
    title: 'L’efficacité dépend des conditions. Le modèle les reçoit donc.',
    lead: 'La plupart des modèles structure–propriété publiés prédisent à partir de la seule structure moléculaire, alors que l’efficacité sur laquelle ils sont entraînés dépend de la température, de la concentration, de la durée et du substrat. Ce projet a conservé ces conditions et les a fournies au modèle. Cette décision constitue la recherche.',
    s1h: 'Trois jeux de données, un seul schéma',
    s1p: 'Inhibitor 1368, DataCor aluminium et la base Excorr — 7 991 mesures brutes harmonisées sur une échelle commune, SMILES canonicalisés et sels retirés.',
    s2h: 'Dédoublonner sans écarter les conditions',
    s2p: 'Un pipeline antérieur moyennait chaque molécule sur toutes les conditions, réduisant environ 8 000 lignes à 717. Une clé combinant molécule, métal, température, durée et concentration préserve les mesures distinctes — et donne 5 170 lignes exploitables.',
    s3h: '220 variables',
    s3p: '209 descripteurs RDKit non constants, plus la température, la durée, le log₁₀ de la concentration, un indicateur de valeur manquante pour chacun, et un encodage one-hot du substrat.',
    s4h: 'Deux partitions d’évaluation, toujours rapportées ensemble',
    s4p: 'Validation croisée aléatoire à cinq blocs, et partition par squelette de Bemis–Murcko où les molécules partageant un noyau restent dans le même bloc. L’écart entre les deux constitue le récit honnête.',
    statMeasurements: 'mesures',
    statMolecules: 'molécules uniques',
    statMetals: 'métaux',
    statDescriptors: 'descripteurs',
    statConditions: 'variables de condition',
    statPh: 'variables de pH',
    figure4:
      'Le pipeline exécuté, des trois jeux de données source jusqu’à la construction de l’ensemble et à la calibration conforme.',
    figure4Alt:
      'Architecture du pipeline : trois jeux de données source alimentent l’inspection et le prétraitement vers une table maîtresse, qui alimente l’analyse des variables et quatre flux de modélisation, lesquels alimentent la construction de l’ensemble.',
    serving: 'Modèle servi',
    features: 'variables',
    seed: 'graine',
    run: 'exécution',
  },

  results: {
    eyebrow: 'Résultats',
    title: 'Deux chiffres, jamais un seul.',
    leadA: 'Le modèle obtient',
    leadB: 'sur une partition aléatoire et',
    leadC: 'sur une partition par squelette. Les deux sont vrais et répondent à des questions différentes. Ne citer que le premier serait le moyen le plus simple de vous induire en erreur ; cette page s’y refuse.',
    randomTitle: 'Partition aléatoire — R² 0,806',
    randomBody:
      'Blocs tirés au hasard. Une molécule de test peut déjà figurer dans l’entraînement sous d’autres conditions : cela mesure donc la capacité du modèle à prédire une nouvelle mesure d’une molécule qu’il connaît déjà. Utile, mais ce n’est pas la question que pose un chimiste en phase de criblage.',
    scaffoldTitle: 'Partition par squelette — R² 0,310',
    scaffoldBody:
      'Les molécules partageant un noyau de Bemis–Murcko restent dans le même bloc : chaque molécule de test est donc structurellement inconnue. Cela mesure la performance sur une chimie réellement nouvelle. C’est le chiffre à citer pour un candidat non testé, et celui que ce service utilise dès que votre molécule lui est inconnue.',
    ablationTitle: 'Le résultat central',
    ablationLead:
      'La même forêt aléatoire, avec et sans conditions expérimentales. Le gain est systématique — il s’est vérifié pour chaque modèle classique testé, ce qui en fait un signal et non un hasard.',
    leaderboardTitle: 'Tous les modèles testés',
    leaderboardLead:
      'Quatre familles de modèles sur les deux partitions. La forêt aléatoire tenant compte des conditions l’emporte partout — y compris face aux réseaux de graphes et au transformeur affiné, qui ne lisent que la structure.',
    unavailable: 'Métriques en direct indisponibles — le service de prédiction à',
    unreachable: 'est injoignable.',
    loading: 'Chargement des métriques…',
  },

  charts: {
    structureOnly: 'Structure seule',
    structurePlusConditions: 'Structure + conditions expérimentales',
    structurePlusShort: 'Structure + conditions',
    randomSplit: 'Partition aléatoire',
    scaffoldSplit: 'Partition par squelette',
    randomSub: 'Nouvelles mesures de molécules connues',
    scaffoldSub: 'Chimie réellement nouvelle',
    r2Note: 'R² — coefficient de détermination, de 0 à 1. Plus il est élevé, mieux c’est.',
    splitGroup: 'Partition d’évaluation',
    scaffoldExplain:
      'Les molécules partageant un noyau de Bemis–Murcko restent dans le même bloc : chaque molécule de test est donc structurellement nouvelle. C’est l’estimation honnête pour un candidat inconnu.',
    randomExplain:
      'Les blocs sont tirés au hasard : une molécule de test peut déjà figurer dans l’entraînement sous d’autres conditions. Cela mesure de nouvelles mesures, pas une nouvelle chimie.',
    colModel: 'Modèle',
    colRepresentation: 'Représentation',
    colMae: 'MAE',
    negative: 'négatif',
    tableCaption: 'Performance des modèles, triée par R².',
    ridgeNote:
      'Un R² négatif signifie que le modèle a prédit moins bien que la simple moyenne du corpus. La régression ridge s’effondre sur les partitions par squelette car des descripteurs non bornés comme Ipc prennent des valeurs extrêmes sur des squelettes inconnus. C’est précisément le décalage de distribution qu’une partition par squelette sert à révéler, non un défaut du pipeline.',
    raises: 'Augmente l’efficacité prédite',
    lowers: 'Diminue l’efficacité prédite',
    condition: 'condition',
  },

  learned: {
    eyebrow: 'Interprétabilité',
    title: 'A-t-il appris de la chimie, ou seulement de l’arithmétique ?',
    lead: 'Les valeurs de Shapley sur l’ensemble du corpus indiquent ce sur quoi le modèle s’appuie. La réponse est rassurante : l’identité du substrat, la taille moléculaire et les conditions de dosage — soit ce que la science de la corrosion prédirait.',
    figure7:
      'Résumé SHAP global pour la forêt aléatoire optimisée. Chaque point est une molécule ; la position indique l’effet sur l’efficacité prédite.',
    figure7Alt:
      'Graphique de synthèse SHAP. Les variables les plus fortes sont métal égale aluminium, la réfractivité molaire, le log de la concentration, la température et la durée, suivies des descripteurs de connectivité et de charge partielle.',
    i1h: 'Le substrat domine',
    i1p: 'Le métal que vous protégez est la variable la plus forte. L’aluminium et le magnésium se comportent assez différemment de l’acier pour que le modèle les traite presque comme des problèmes distincts.',
    i2h: 'La taille gouverne la couverture',
    i2p: 'La réfractivité molaire et les indices de connectivité arrivent en tête. Les molécules plus volumineuses couvrent davantage de surface par molécule adsorbée — l’image physique que la science de la corrosion retient déjà.',
    i3h: 'La dose et la chaleur comptent, dans cet ordre',
    i3p: 'Le log de la concentration devance la température, et les deux devancent la plupart des descripteurs structuraux. C’est l’hypothèse des conditions confirmée de l’intérieur.',
    i4h: 'Les sites riches en électrons apparaissent',
    i4p: 'Les descripteurs de charge partielle et électrotopologiques apparaissent sous les premiers, ce qui concorde avec une adsorption par les atomes donneurs d’azote, de soufre et d’oxygène.',
    footer:
      'L’attribution montre ce sur quoi le modèle s’appuie. C’est la preuve qu’il a appris quelque chose de physiquement sensé — non une mesure de la chimie d’adsorption elle-même.',
  },

  limits: {
    eyebrow: 'Limites',
    title: 'Là où ce modèle cesse de fonctionner.',
    leadA: 'Chaque point ci-dessous est un point qu’un examinateur devrait sinon découvrir lui-même. Une incertitude calibrée de',
    leadB: 'points d’efficacité pour une couverture empirique de',
    leadC: 'est large — et l’énoncer clairement est précisément l’objectif.',
    l1h: 'L’écart par squelette est grand, et il ne s’est pas refermé',
    l1p: 'Les conditions ont porté le R² par squelette de 0,124 à 0,310 — un gain réel, mais très en deçà des 0,806 de la partition aléatoire. Connaître les conditions ne remplace pas d’avoir déjà vu la chimie.',
    l2h: 'La durée manque pour 46 % du corpus',
    l2p: 'L’imputation avec indicateur de valeur manquante est une comptabilité honnête, mais elle ne peut restituer une information jamais mesurée.',
    l3h: 'Le pH est exclu par choix',
    l3p: 'Il n’est renseigné que pour 32 % des lignes et n’est conservé que pour l’analyse. L’ajouter aurait supposé d’imputer la majorité de la colonne.',
    l4h: 'Le fer et l’acier au carbone restent distincts',
    l4p: 'L’acier au carbone est à base de fer et les deux sont généralement testés en milieu acide, mais les sources ne consignent pas la distinction de façon fiable. Les fusionner en un seul groupe ferreux est une décision scientifique ouverte, délibérément non tranchée.',
    l5h: 'L’optimisation a compté 10 essais, sans validation croisée imbriquée',
    l5p: 'Une recherche Optuna directe sur l’objectif par squelette. La courbe d’optimisation est restée plate sur tous les essais : le modèle n’est donc pas limité par ses hyperparamètres — mais la méthodologie qualifie la validation croisée imbriquée de prévue, non de réalisée.',
    l6h: 'Ceci ne remplace pas les essais',
    l6p: 'C’est un démonstrateur de recherche pour le criblage et le classement. Les mesures de perte de masse et électrochimiques restent la preuve.',
  },

  batch: {
    eyebrow: 'Lot',
    title: 'Classez toute une série de candidats.',
    lead: 'Téléversez un CSV de molécules sous une même condition de service et récupérez-les triées par efficacité prédite, chacune avec sa bande et son verdict de confiance.',
    panelTitle: 'Cribler une série',
    panelLead:
      'Téléversez un CSV pour classer des candidats sous une même condition de service. Les descripteurs sont mis en cache par molécule unique et la forêt n’est appelée qu’une fois pour tout le fichier.',
    template: 'Télécharger le modèle',
    choose: 'Choisir un fichier CSV',
    reading: 'Lecture du fichier…',
    predicted: 'prédites',
    failed: 'en échec',
    download: 'Télécharger les résultats',
    colMolecule: 'Molécule',
    colReading: 'Lecture',
    colTrust: 'Confiance',
    tableCaption: 'Résultats du lot, classés par efficacité prédite.',
    row: 'ligne',
  },

  figures: {
    eyebrow: 'Annexe',
    title: 'Figures issues de l’exécution.',
    lead: 'Produites directement par le notebook, reproduites ici sans modification.',
    f1: 'Distributions brutes de la cible sur les trois jeux de données source, avant harmonisation.',
    f3: 'Distribution harmonisée de l’efficacité après canonicalisation, dédoublonnage et sélection des métaux.',
    f5: 'Les 30 meilleurs descripteurs par information mutuelle avec la cible.',
    f6: 'Corrélation entre les principaux descripteurs, révélant la redondance des familles de taille et de connectivité.',
    f8: 'Saillance atomique par gradients intégrés sur le réseau à passage de messages.',
    f9: 'Propagation de l’attention sur une chaîne SMILES par le ChemBERTa affiné.',
    f10: 'Prédictions avec intervalles conformes à 90 % face aux valeurs observées.',
  },

  colophon: {
    author: 'Auteure',
    supervisor: 'Directeur de thèse',
    coSupervisor: 'Co-directeur',
    institution: 'Établissement',
    provenance: 'Provenance',
    modelVersion: 'Version du modèle',
    sourceRun: 'Exécution source',
    seed: 'Graine',
    modelHash: 'SHA-256 du modèle',
    unavailable: 'Service indisponible.',
    provenanceNote:
      'Chaque artefact est vérifié par rapport à un manifeste SHA-256 avant le démarrage du service. Les citations des jeux de données sont en cours de recherche ; les trois jeux source sont liés plutôt que redistribués.',
  },

  cite: {
    eyebrow: 'Citation',
    title: 'Comment citer ce travail.',
    lead: 'Trois éléments peuvent être cités ici, et ils ne sont pas interchangeables : la recherche elle-même, le logiciel qui la sert, et une prédiction précise que vous en avez obtenue.',

    thesisTitle: 'Citer la recherche',
    thesisBody: 'Citez la thèse lorsque vous renvoyez à la méthode, au corpus ou au résultat selon lequel les conditions expérimentales portent le signal. Vérifiez l’année et le statut de soutenance avant soumission : l’année ci-dessous est l’année courante, non une date de publication vérifiée.',

    softwareTitle: 'Citer le logiciel',
    softwareBody: 'Citez l’outil lorsque vous l’avez utilisé pour produire des chiffres. La version compte : une version ultérieure du modèle donnerait d’autres réponses, alors fixez celle que vous avez réellement utilisée.',

    reproTitle: 'Citer une prédiction',
    reproBody: 'C’est la partie généralement omise. Une prédiction n’est reproductible que si le lecteur sait quel artefact l’a produite : ce bloc porte donc la version du modèle en service, son SHA-256 et les versions figées des bibliothèques. Collez-le dans votre section méthodes.',
    methodsParagraph: 'Paragraphe de méthodes',

    copy: 'Copier',
    copied: 'Copié',

    dataEyebrow: 'Données',
    dataTitle: 'Citer les jeux de données source.',
    dataBody: 'Le corpus a été harmonisé à partir de trois jeux de données publics. Ils appartiennent à leurs auteurs d’origine et sont liés plutôt que redistribués ici.',
    dataGapTitle: 'Références en cours de recherche',
    dataGapBody: 'Les publications d’origine de ces trois jeux de données n’ont pas encore été confirmées ; aucune référence n’est donc imprimée ici, plutôt que d’en imprimer une qui serait peut-être fausse. Si vous utilisez le corpus, remontez à la publication source de chaque jeu et citez-la directement.',
    dsInhibitor: '1 364 entrées pour l’acier au carbone dans HCl 1 M, avec descripteurs quantiques.',
    dsDatacor: '2 011 mesures sur dix-sept substrats d’aluminium, avec conditions par ligne.',
    dsExcorr: '4 616 entrées couvrant le fer, l’aluminium, le magnésium, le cuivre et le zinc.',
    citationPending: 'Référence à venir',

    licenceEyebrow: 'Conditions',
    licenceTitle: 'Licence et contact.',
    licenceBody: 'Le code est ouvert. Les jeux de données conservent leurs licences d’origine et ne sont pas redistribués.',
    codeLicence: 'Licence du code',
    contact: 'Contact',
  },

  history: {
    eyebrow: 'Activité',
    title: 'Ce qui a été demandé à ce service.',
    lead: 'Chaque prédiction est journalisée avec la version du modèle qui l’a produite, de sorte que tout résultat peut être rattaché à un artefact précis. Seule la molécule canonique est affichée.',
    emptyTitle: 'Rien de journalisé pour l’instant',
    emptyBody: 'Les prédictions apparaîtront ici dès que le service en aura servi. Faites-en une et revenez.',
    tableCaption: 'Prédictions récemment servies, les plus récentes d’abord.',
    colWhen: 'Quand',
    rows: 'entrées',
  },

  metals: {
    aluminium: 'Aluminium',
    carbon_steel: 'Acier au carbone',
    copper: 'Cuivre',
    iron: 'Fer',
    magnesium: 'Magnésium',
  },
}
