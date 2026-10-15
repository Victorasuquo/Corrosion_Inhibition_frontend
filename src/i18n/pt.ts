import type { Translations } from './config'

export const pt: Translations = {
  meta: {
    title: 'Inhibiepdt — Previsão da eficiência de inibição da corrosão',
    description:
      'Predict the corrosion inhibition efficiency of an organic molecule on iron, aluminium, magnesium or copper under stated experimental conditions, with a calibrated uncertainty band and an honest applicability-domain verdict.',  // TODO(i18n)
  },

  nav: {
    skip: 'Ir para o conteúdo',
    sections: 'Secções',
    predict: 'Prever',
    method: 'Método',
    results: 'Resultados',
    limits: 'Limites',
    language: 'Idioma',
    home: 'Visão geral',
    batch: 'Lote',
    figures: 'Figuras',
    cite: 'Citar',
    history: 'Atividade',
    login: 'Entrar',
    register: 'Registar',
  },

  pages: {
    nextSteps: 'A seguir',
    predictNextTitle: 'Para onde ir a seguir.',
    cardBatch: 'Vai avaliar mais do que um candidato? Carregue um CSV e receba a série ordenada.',
    cardLimits: 'Antes de agir sobre um número, leia onde este modelo deixa de funcionar.',
    cardCite: 'Vai usar uma previsão num artigo ou relatório? Leve a citação e o bloco de reprodutibilidade.',
    notFoundTitle: 'Não há leitura neste endereço.',
    notFoundBody: 'Essa página não existe. O instrumento continua na bancada.',
    backHome: 'Voltar à visão geral',
  },

  hero: {
    titleA: 'A corrosão custa',
    titleB: 'ao mundo 2,5',
    titleC: 'biliões por ano.',
    p1: 'Cerca de 3,4 % do PIB mundial, perdidos todos os anos em tubagens, navios, pontes, refinarias e betão armado. Aplicar práticas de controlo da corrosão já bem conhecidas pouparia entre 15 e 35 % desse valor — entre 375 e 875 mil milhões de dólares.',
    p2: 'Uma das defesas mais baratas é um inibidor de corrosão orgânico: uma molécula doseada em partes por milhão que se adsorve ao metal e forma uma película protetora.',
    p3: 'Encontrar a molécula certa obriga a ensaiar candidatas uma a uma, durante semanas. Este modelo estima primeiro a resposta.',
    ctaPrimary: 'Fazer uma previsão',
    ctaSecondary: 'Como funciona',
    scaleTitle: 'A escala que este instrumento lê',
    scaleNote:
      'A eficiência de inibição não é uma pontuação abstrata. É a diferença entre um metal que se dissolve e outro que não — e tem cor.',
    patch0: 'Metal nu, a corroer livremente',
    patch40: 'Película parcial',
    patch80: 'Película protetora em formação',
    patch100: 'Passivado, protegido',
    sources: 'Fontes',
  },

  predictor: {
    eyebrow: 'O instrumento',
    title: 'Ler uma eficiência.',
    lead: 'Introduza uma molécula e as condições a que ficará exposta. Obtém um intervalo calibrado, não um ponto enganador — e uma indicação clara de se esta química é realmente conhecida do modelo.',

    formTitle: 'Amostra e condições',
    inputCount: '11 inputs',  // TODO(i18n)
    smilesLabel: 'Molécula (SMILES)',
    gramsPerMol: 'g/mol',
    heavyAtoms: 'átomos pesados',
    inCorpus: 'Presente no corpus de treino',
    examplesHint:
      'Não tem um SMILES à mão? Carregue acima um inibidor real — preenchem as mesmas cinco entradas.',

    metalLabel: 'Metal do substrato',
    rows: 'linhas',

    conditionsLabel: 'Condições experimentais',
    conditionsHint:
      'Desmarque tudo o que não tiver medido. O modelo foi treinado com indicadores de valor em falta, pelo que «não registado» é uma resposta que ele compreende — não um palpite.',
    recorded: 'registado',
    notRecorded: 'não registado',
    temperature: 'Temperatura',
    temperatureHint: '283–606 K in training. 298 K is room temperature.',  // TODO(i18n)
    duration: 'Tempo de exposição',
    durationHint: 'Recorded for only 54% of the corpus.',  // TODO(i18n)
    concentration: 'Concentração do inibidor',
    concentrationHint: 'Spans 3×10⁻⁵ to 3300 mM; the model sees log₁₀.',  // TODO(i18n)

    submit: 'Prever a eficiência de inibição',
    submitPending: 'A ler…',
    emptyTitle: 'A leitura aparece aqui',
    emptyBody:
      'Uma previsão lê-se como uma banda, não como um ponto — tal como se lê uma cor contra uma carta de comparação. A largura da banda é a incerteza calibrada do modelo.',
    errorTitle: 'Não é possível ler',
    genericError: 'Algo correu mal.',

    readingTitle: 'Leitura',
    modelVersion: 'modelo',
    efficiencyLabel: 'Eficiência de inibição',
    formula: 'Fórmula',
    mass: 'Massa',
    substrate: 'Substrato',
    interval: 'intervalo',

    imputedOne: 'condição não foi registada',
    imputedMany: 'condições não foram registadas',
    imputedBody:
      'O modelo usou a mediana de treino e foi informado de que o valor estava em falta — exatamente o tratamento que essas linhas receberam durante o treino.',

    trustTitle: 'Até que ponto pode confiar nisto?',
    nearestMatch: 'Vizinho mais próximo',
    scaffoldSeen: 'Esqueleto já visto',
    yes: 'Sim',
    no: 'Não',
    trustFooter:
      'O R² citado é aquele a que este pedido tem direito. A química familiar é medida pela partição aleatória; tudo o resto pela partição por esqueleto, mais estrita.',

    // TODO(i18n): the keys below carry English text pending translation.
    saltStripped: 'Counter-ion removed',
    contextLabel: 'Substrate & technique',
    contextHint:
      'Both are model inputs, and both matter: adding them lifted explained variance from 0.395 to 0.456 on unseen molecules. Pick from the lists — they are the exact values the model encodes.',
    alloyLabel: 'Alloy designation',
    alloyHint:
      'Carbon steel lives here, not under metal. Grades with fewer than 30 corpus rows were pooled during training, and anything outside the list is pooled the same way.',
    methodLabel: 'Measurement technique',
    methodHint:
      'Techniques disagree by tens of efficiency points, so the model is told which one you mean. Use "not stated" if you do not know — it is a real category with 1,389 rows.',
    unreliableTag: '\u26a0',
    synergistLabel: 'A synergistic additive is present',
    synergistHint: 'Only 110 corpus rows record one, so this is weakly supported either way.',
    ph: 'Electrolyte pH',
    phHint:
      'A model feature in this version. Negative values are real — the corpus reaches \u22121.0 in concentrated acid.',
    phSourceLabel: 'This pH was',
    salt: 'Supporting salt',
    saltHint: 'Recorded for only 39% of the corpus, so leaving this unticked is normal.',
    intervalNote:
      'Every reading is a 90% band, never a bare number. On an unseen molecule that band is \u00b138.6 efficiency points, which is the honest width.',
    preflightTitle: 'Before you read this',
    explain: 'Explain',
    close: 'Close',
    nearestIs: 'Closest molecule in the training corpus:',
    pooledInto: 'is not encoded individually, so it was pooled into',
    replicateNote:
      'For scale, two independent laboratory measurements of the same experiment differ by about {spread} efficiency points. A large part of the error is in the measurements, not the model.',
    warningsTitle: 'Known limits on this reading',
    warnUnreliableAlloy:
      'the model explains no variance on this grade. It is in the study as a documented failure.',
    warnUnreliableMethod: 'measurements made this way are the ones the model fits worst.',

    shapTitle: 'O que determinou este número',
    shapLead:
      'Valores de Shapley exatos sobre as variáveis do próprio modelo, em pontos de eficiência.',
  },

  domain: {
    in_domain: 'Dentro do domínio',
    edge_of_domain: 'Limite do domínio',
    out_of_domain: 'Fora do domínio',
    inShort: 'Química conhecida',
    edgeShort: 'Química relacionada',
    outShort: 'Química desconhecida',
  },

  efficiency: {
    veryHigh: 'Inibição muito elevada',
    high: 'Inibição elevada',
    moderate: 'Inibição moderada',
    low: 'Inibição baixa',
    none: 'Inibição escassa ou nula',
  },

  method: {
    eyebrow: 'Método',
    title: 'A eficiência depende das condições. Por isso o modelo recebe-as.',
    lead: 'A maioria dos modelos estrutura–propriedade publicados prevê apenas a partir da estrutura molecular, ao passo que a eficiência com que são treinados depende da temperatura, da concentração, da duração e do substrato. Este projeto manteve essas condições e entregou-as ao modelo. Essa decisão é a investigação.',
    s1h: 'Três conjuntos de dados, um esquema',
    s1p: 'Inhibitor 1368, the DataCor aluminium set and the CORDATA multi-metal export, harmonised onto one 15-field schema with SMILES canonicalised, salts stripped, and the measurement techniques mapped onto a controlled vocabulary.',  // TODO(i18n)
    s2h: 'Desduplicar sem descartar as condições',
    s2p: 'An earlier pipeline averaged each molecule across every condition, collapsing thousands of rows to 717. Keying on molecule, metal, temperature, duration, concentration and pH instead preserves distinct measurements — 8,359 of them, over 1,050 molecules on four base metals.',  // TODO(i18n)
    s3h: '283 features',  // TODO(i18n)
    s3p: '211 non-constant RDKit descriptors, then the context: temperature and its inverse, duration and log₁₀ duration, log₁₀ concentration, pH, log₁₀ salt concentration, a was-missing indicator for each, and one-hot encodings of base metal, alloy grade, measurement technique and pH provenance, plus a synergist flag.',  // TODO(i18n)
    s4h: 'Two honest splits, always reported together',  // TODO(i18n)
    s4p: 'Five-fold grouped by molecule, so no test molecule appears in training, and Bemis–Murcko scaffold five-fold, where molecules sharing a core stay in the same fold. A third, row-wise split was run as a control and is reported only to show how badly it flatters the model.',  // TODO(i18n)
    statMeasurements: 'medições',
    statMolecules: 'moléculas únicas',
    statMetals: 'metais',
    statDescriptors: 'descritores',
    statConditions: 'variáveis de condição',
    statPh: 'variáveis de pH',
    figure4:
      'O pipeline executado, dos três conjuntos de dados de origem até à construção do ensemble e à calibração conforme.',
    figure4Alt:
      'Arquitetura do pipeline: três conjuntos de dados de origem alimentam a inspeção e o pré-processamento numa tabela mestra, que alimenta a análise de variáveis e quatro fluxos de modelação, que alimentam a construção do ensemble.',
    serving: 'Modelo servido',
    features: 'variáveis',
    seed: 'semente',
    run: 'execução',
  },

  results: {
    eyebrow: 'Resultados',
    title: 'Dois números, nunca um.',
    leadA: 'O modelo obtém',
    leadB: 'numa partição aleatória e',
    leadC: 'numa partição por esqueleto. Ambos são verdadeiros e respondem a perguntas diferentes. Citar apenas o primeiro seria a forma mais fácil de o induzir em erro, e esta página recusa-se a fazê-lo.',
    // TODO(i18n): English text pending translation.
    groupedTitle: 'By molecule — R\u00b2 0.461',
    groupedBody:
      'Every measurement of a molecule is held in the same fold, so no test molecule appears in training under any conditions. This is the honest estimate for a molecule the model has not met: it explains 46% of the variance, with a typical error of 15.7 efficiency points.',
    scaffoldTitle: 'Partição por esqueleto — R² 0,310',
    scaffoldBody:
      'As moléculas que partilham um núcleo de Bemis–Murcko permanecem no mesmo bloco, pelo que cada molécula de teste é estruturalmente desconhecida. Isto mede o desempenho sobre química genuinamente nova. É o número a citar para um candidato não ensaiado, e o que este serviço usa sempre que a sua molécula lhe é nova.',
    ablationTitle: 'O resultado central',
    ablationLead:
      'A mesma floresta aleatória, com e sem condições experimentais. O ganho é sistemático — verificou-se em todos os modelos clássicos testados, o que faz dele sinal e não sorte.',
    leaderboardTitle: 'Todos os modelos testados',
    leaderboardLead:
      'Quatro famílias de modelos em ambas as partições. A floresta aleatória sensível às condições vence em todo o lado — incluindo face às redes de grafos e ao transformador afinado, que leem apenas a estrutura.',
    unavailable: 'Métricas em direto indisponíveis — o serviço de previsão em',
    unreachable: 'está inacessível.',
    loading: 'A carregar métricas…',
  },

  charts: {
    structureOnly: 'Apenas estrutura',
    structurePlusConditions: 'Estrutura + condições experimentais',
    structurePlusShort: 'Estrutura + condições',
    scaffoldSplit: 'Partição por esqueleto',
    scaffoldSub: 'Genuinely new chemistry',  // TODO(i18n)
    r2Note: 'R² — coeficiente de determinação, de 0 a 1. Quanto mais alto, melhor.',
    splitGroup: 'Partição de avaliação',
    scaffoldExplain:
      'As moléculas que partilham um núcleo de Bemis–Murcko permanecem no mesmo bloco, pelo que cada molécula de teste é estruturalmente nova. Esta é a estimativa honesta para um candidato desconhecido.',
    groupedSplit: 'By molecule',
    groupedSub: 'Molecules absent from training',
    groupedExplain:
      'Every measurement of a molecule is held in the same fold, so no test molecule appears in training under any conditions. This is the honest estimate for a molecule the model has not seen.',
    colStep: 'Feature block added',
    colFeatures: 'cols',
    colMarginal: '\u0394 R\u00b2',
    colModel: 'Modelo',
    colRepresentation: 'Representação',
    colMae: 'MAE',
    negative: 'negativo',
    tableCaption: 'Desempenho dos modelos, ordenado por R².',
    ridgeNote:
      'Um R² negativo significa que o modelo previu pior do que a simples média do corpus. A regressão ridge colapsa nas partições por esqueleto porque descritores não limitados como o Ipc assumem valores extremos em esqueletos desconhecidos. É precisamente o desvio de distribuição que uma partição por esqueleto serve para revelar, não um defeito do pipeline.',
    raises: 'Aumenta a eficiência prevista',
    lowers: 'Reduz a eficiência prevista',
    condition: 'condição',
  },

  learned: {
    eyebrow: 'Interpretabilidade',
    title: 'Aprendeu química ou apenas aritmética?',
    lead: 'Os valores de Shapley sobre todo o corpus indicam em que se apoia o modelo. A resposta é tranquilizadora: a identidade do substrato, o tamanho molecular e as condições de dosagem — que é o que a ciência da corrosão previria.',
    figure7:
      'Resumo SHAP global para a floresta aleatória afinada. Cada ponto é uma molécula; a posição mostra o efeito sobre a eficiência prevista.',
    figure7Alt:
      'Gráfico resumo SHAP. As variáveis mais fortes são metal igual a alumínio, refratividade molar, log da concentração, temperatura e duração, seguidas de descritores de conectividade e de carga parcial.',
    i1h: 'O substrato domina',
    i1p: 'Qual o metal que se está a proteger é a variável mais forte. O alumínio e o magnésio comportam-se de forma suficientemente distinta do aço para que o modelo os trate quase como problemas separados.',
    i2h: 'O tamanho governa a cobertura',
    i2p: 'A refratividade molar e os índices de conectividade ocupam os primeiros lugares. Moléculas mais volumosas cobrem mais superfície por molécula adsorvida — a imagem física que a ciência da corrosão já sustenta.',
    i3h: 'A dose e o calor importam, por esta ordem',
    i3p: 'O log da concentração supera a temperatura, e ambos superam a maioria dos descritores estruturais. É a hipótese das condições confirmada por dentro.',
    i4h: 'Surgem os sítios ricos em eletrões',
    i4p: 'Os descritores de carga parcial e eletrotopológicos surgem abaixo dos primeiros, coerentes com uma adsorção através de átomos dadores de azoto, enxofre e oxigénio.',
    footer:
      'A atribuição mostra em que se apoia o modelo. É prova de que aprendeu algo fisicamente sensato — não uma medição da química de adsorção em si.',
  },

  limits: {
    eyebrow: 'Limites',
    title: 'Onde este modelo deixa de funcionar.',
    leadA: 'Cada ponto aqui é um que um examinador teria de descobrir por si. Uma incerteza calibrada de',
    leadB: 'pontos de eficiência com uma cobertura empírica de',
    leadC: 'é ampla — e declará-lo com clareza é precisamente o objetivo.',
    l1h: 'The band is wider than the answer',  // TODO(i18n)
    l1p: 'The 90% interval is ±38.6 efficiency points on an unseen molecule. That is honest, and it is also wide enough that this model ranks candidates rather than measuring them. Treat any single number as a position in a queue.',  // TODO(i18n)
    l2h: 'Some groups fail outright',  // TODO(i18n)
    l2p: 'On the alloys recorded as Cold rolled steel, Stainless steel, Fe, Steel and AA1100, and on gravimetric, polarisation-resistance and current-density measurements, the model explains no variance at all. Those readings are flagged where they occur rather than quietly averaged into the headline.',  // TODO(i18n)
    l3h: 'Much of the context was never recorded',  // TODO(i18n)
    l3p: 'Duration is absent for a third of the corpus and supporting salt concentration for 61%. A was-missing indicator is honest bookkeeping, but it cannot recover information nobody measured.',  // TODO(i18n)
    l4h: 'pH was recovered, not measured',  // TODO(i18n)
    l4p: 'pH became a feature in this version, but only 49% of values were measured directly — the rest were calculated from the stated corrodent or inferred as a band. The model is told which, and on its own the provenance block slightly lowered accuracy rather than raising it.',  // TODO(i18n)
    l5h: 'The reported tuning is not nested cross-validation',  // TODO(i18n)
    l5p: 'Nested CV was implemented but not executed in the reported run; the served hyperparameters come from a direct 10-trial search against the scaffold objective. The tuned figures should be read as optimistic by an unmeasured margin, which is why the untuned benchmark carries the comparative conclusions.',  // TODO(i18n)
    l6h: 'Validated against the literature, not against a bench',  // TODO(i18n)
    l6p: 'Every figure here is measured against the published record. The comparison against this project’s own laboratory measurements has not been done. Weight-loss and electrochemical testing remain the evidence.',  // TODO(i18n)
  },

  batch: {
    eyebrow: 'Lote',
    title: 'Ordene uma série inteira de candidatos.',
    lead: 'Carregue um CSV de moléculas sob uma mesma condição de serviço e receba-as ordenadas por eficiência prevista, cada uma com a sua banda e o seu veredito de confiança.',
    panelTitle: 'Triar uma série',
    panelLead:
      'Carregue um CSV para ordenar candidatos sob uma mesma condição de serviço. Os descritores são guardados em cache por molécula única e a floresta é chamada uma só vez para todo o ficheiro.',
    template: 'Descarregar modelo',
    choose: 'Escolher um ficheiro CSV',
    reading: 'A ler o ficheiro…',
    predicted: 'previstas',
    failed: 'falhadas',
    download: 'Descarregar resultados',
    colMolecule: 'Molécula',
    colReading: 'Leitura',
    colTrust: 'Confiança',
    tableCaption: 'Resultados do lote, ordenados por eficiência prevista.',
    row: 'linha',
  },

  figures: {
    eyebrow: 'Apêndice',
    title: 'Figuras da execução.',
    lead: 'Produzidas diretamente pelo notebook, reproduzidas aqui sem alterações.',
    f1: 'Distribuições brutas do alvo nos três conjuntos de dados de origem, antes da harmonização.',
    f3: 'Distribuição harmonizada da eficiência após canonicalização, desduplicação e seleção de metais.',
    f5: 'Os 30 melhores descritores por informação mútua com o alvo.',
    f6: 'Correlação entre os principais descritores, revelando redundância nas famílias de tamanho e conectividade.',
    f8: 'Saliência atómica por gradientes integrados na rede de passagem de mensagens.',
    f9: 'Propagação da atenção sobre uma cadeia SMILES pelo ChemBERTa afinado.',
    f10: 'Previsões com intervalos conformes a 90 % face aos valores observados.',
  },

  colophon: {
    author: 'Autora',
    supervisor: 'Orientador',
    coSupervisor: 'Coorientador',
    institution: 'Instituição',
    provenance: 'Proveniência',
    modelVersion: 'Versão do modelo',
    sourceRun: 'Execução de origem',
    seed: 'Semente',
    modelHash: 'SHA-256 do modelo',
    unavailable: 'Serviço indisponível.',
    provenanceNote:
      'Cada artefacto é verificado contra um manifesto SHA-256 antes de o serviço arrancar. As citações dos conjuntos de dados ainda estão a ser rastreadas; os três conjuntos de origem são ligados em vez de redistribuídos.',
  },

  cite: {
    eyebrow: 'Citação',
    title: 'Como citar este trabalho.',
    lead: 'Três coisas podem ser citadas aqui, e não são intercambiáveis: a investigação em si, o software que a serve e uma previsão concreta que dele obteve.',

    thesisTitle: 'Citar a investigação',
    thesisBody: 'Cite a tese quando se referir ao método, ao corpus ou ao resultado de que as condições experimentais transportam o sinal. Confirme o ano e o estado das provas antes de submeter: o ano abaixo é o corrente, não uma data de publicação verificada.',

    softwareTitle: 'Citar o software',
    softwareBody: 'Cite a ferramenta quando a tiver usado para produzir números. A versão importa: uma versão posterior do modelo daria respostas diferentes, por isso fixe aquela que realmente usou.',

    reproTitle: 'Citar uma previsão',
    reproBody: 'Esta é a parte habitualmente omitida. Uma previsão só é reprodutível se o leitor souber que artefacto a produziu, por isso este bloco traz a versão do modelo em serviço, o seu SHA-256 e as versões fixadas das bibliotecas. Cole-o na sua secção de métodos.',
    methodsParagraph: 'Parágrafo de métodos',

    copy: 'Copiar',
    copied: 'Copiado',

    dataEyebrow: 'Dados',
    dataTitle: 'Citar os conjuntos de dados de origem.',
    dataBody: 'O corpus foi harmonizado a partir de três conjuntos de dados públicos. Pertencem aos seus autores originais e são aqui ligados em vez de redistribuídos.',
    dataGapTitle: 'Referências ainda a rastrear',
    dataGapBody: 'As publicações originais destes três conjuntos ainda não foram confirmadas, pelo que não se imprime aqui qualquer referência, em vez de imprimir uma que possa estar errada. Se usar o corpus, rastreie cada conjunto até à sua publicação de origem e cite-a diretamente.',
    dsInhibitor:
      '1,364 entries for carbon steel in 1 M HCl, with quantum-chemical descriptors.',  // TODO(i18n)
    dsDatacor:
      'The CORDATA multi-metal export: 5,000 rows across seventeen fields, covering aluminium, copper, iron, magnesium and zinc, with per-row conditions.',  // TODO(i18n)
    dsExcorr:
      '4,616 entries spanning iron, aluminium, magnesium, copper and zinc.',  // TODO(i18n)
    citationPending: 'Referência pendente',

    licenceEyebrow: 'Termos',
    licenceTitle: 'Licença e contacto.',
    licenceBody: 'O código é aberto. Os conjuntos de dados mantêm as suas licenças originais e não são redistribuídos.',
    codeLicence: 'Licença do código',
    contact: 'Contacto',
  },

  history: {
    eyebrow: 'Atividade',
    title: 'O que foi pedido a este serviço.',
    lead: 'Cada previsão é registada com a versão do modelo que a produziu, para que qualquer resultado possa ser rastreado até um artefacto exato. Apenas a molécula canónica é mostrada.',
    emptyTitle: 'Ainda nada registado',
    emptyBody: 'As previsões aparecem aqui assim que o serviço tiver servido algumas. Faça uma e volte.',
    tableCaption: 'Previsões servidas recentemente, as mais recentes primeiro.',
    colWhen: 'Quando',
    rows: 'entradas',
  },

  metals: {
    Al: 'Alumínio',
    Cu: 'Cobre',
    Fe: 'Ferro',
    Mg: 'Magnésio',
  },

  // TODO(i18n): English text pending translation.
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
}
