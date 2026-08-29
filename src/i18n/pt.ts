import type { Translations } from './config'

export const pt: Translations = {
  meta: {
    title: 'Inhibiepdt — Previsão da eficiência de inibição da corrosão',
    description:
      'Preveja a eficiência de inibição da corrosão de uma molécula orgânica sobre alumínio, aço-carbono, cobre, ferro ou magnésio em condições experimentais definidas, com um intervalo de incerteza calibrado e um veredito honesto sobre o domínio de aplicabilidade.',
  },

  nav: {
    skip: 'Ir para o conteúdo',
    sections: 'Secções',
    predict: 'Prever',
    method: 'Método',
    results: 'Resultados',
    limits: 'Limites',
    language: 'Idioma',
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
    inputCount: '5 entradas',
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
    temperatureHint: '283–606 K no treino. 298 K é a temperatura ambiente.',
    duration: 'Tempo de exposição',
    durationHint: 'Registado em apenas 54 % do corpus.',
    concentration: 'Concentração do inibidor',
    concentrationHint: 'De 3×10⁻⁵ a 3280 mM; o modelo usa o log₁₀.',

    submit: 'Prever a eficiência de inibição',
    submitPending: 'A ler…',
    phNote:
      'O pH não é uma entrada. É mantido no pipeline de investigação apenas para análise e nunca foi uma variável do modelo.',

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
    s1p: 'Inhibitor 1368, DataCor alumínio e a base Excorr — 7991 medições brutas harmonizadas numa escala comum, com SMILES canonicalizados e sais removidos.',
    s2h: 'Desduplicar sem descartar as condições',
    s2p: 'Um pipeline anterior fazia a média de cada molécula sobre todas as condições, reduzindo cerca de 8000 linhas a 717. Usar como chave molécula, metal, temperatura, duração e concentração preserva as medições distintas — e produz 5170 linhas utilizáveis.',
    s3h: '220 variáveis',
    s3p: '209 descritores RDKit não constantes, mais temperatura, duração, log₁₀ da concentração, um indicador de ausência para cada um e um substrato codificado one-hot.',
    s4h: 'Duas partições de avaliação, sempre reportadas juntas',
    s4p: 'Validação cruzada aleatória de cinco blocos e partição por esqueleto de Bemis–Murcko, em que as moléculas que partilham um núcleo permanecem no mesmo bloco. A diferença entre ambas é a narrativa honesta.',
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
    randomTitle: 'Partição aleatória — R² 0,806',
    randomBody:
      'Blocos retirados ao acaso. Uma molécula de teste pode já constar do treino noutras condições, pelo que isto mede a capacidade do modelo de prever uma nova medição de uma molécula que já conhece. Útil, mas não é a pergunta que um químico em fase de triagem faz.',
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
    randomSplit: 'Partição aleatória',
    scaffoldSplit: 'Partição por esqueleto',
    randomSub: 'Novas medições de moléculas conhecidas',
    scaffoldSub: 'Química genuinamente nova',
    r2Note: 'R² — coeficiente de determinação, de 0 a 1. Quanto mais alto, melhor.',
    splitGroup: 'Partição de avaliação',
    scaffoldExplain:
      'As moléculas que partilham um núcleo de Bemis–Murcko permanecem no mesmo bloco, pelo que cada molécula de teste é estruturalmente nova. Esta é a estimativa honesta para um candidato desconhecido.',
    randomExplain:
      'Os blocos são retirados ao acaso, pelo que uma molécula de teste pode já constar do treino noutras condições. Isto mede novas medições, não química nova.',
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
    l1h: 'A diferença por esqueleto é grande e não se fechou',
    l1p: 'As condições elevaram o R² por esqueleto de 0,124 para 0,310 — real, mas muito abaixo dos 0,806 da partição aleatória. Conhecer as condições não substitui ter visto a química.',
    l2h: 'Falta a duração em 46 % do corpus',
    l2p: 'A imputação com indicador de ausência é contabilidade honesta, mas não recupera informação que nunca foi medida.',
    l3h: 'O pH é excluído por opção',
    l3p: 'Está registado em apenas 32 % das linhas e é mantido só para análise. Incluí-lo teria implicado imputar a maioria da coluna.',
    l4h: 'O ferro e o aço-carbono continuam separados',
    l4p: 'O aço-carbono é à base de ferro e ambos são normalmente ensaiados em meio ácido, mas as fontes não registam a distinção de forma fiável. Fundi-los num único grupo ferroso é uma decisão científica em aberto, deliberadamente por resolver.',
    l5h: 'A afinação foram 10 ensaios, não validação cruzada aninhada',
    l5p: 'Uma pesquisa Optuna direta sobre o objetivo por esqueleto. A curva de afinação manteve-se plana em todos os ensaios, pelo que o modelo não está limitado pelos hiperparâmetros — mas a metodologia classifica a validação cruzada aninhada como prevista, não realizada.',
    l6h: 'Isto não substitui os ensaios',
    l6p: 'É um demonstrador de investigação para triagem e ordenação. As medições de perda de massa e eletroquímicas continuam a ser a prova.',
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

  metals: {
    aluminium: 'Alumínio',
    carbon_steel: 'Aço-carbono',
    copper: 'Cobre',
    iron: 'Ferro',
    magnesium: 'Magnésio',
  },
}
