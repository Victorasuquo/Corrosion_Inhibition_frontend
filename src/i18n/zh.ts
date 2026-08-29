import type { Translations } from './config'

export const zh: Translations = {
  meta: {
    title: 'Inhibiepdt — 腐蚀缓蚀效率预测',
    description:
      '在给定实验条件下，预测有机分子对铝、碳钢、铜、铁或镁的腐蚀缓蚀效率，并给出经校准的不确定度区间与真实的适用域判定。',
  },

  nav: {
    skip: '跳至正文',
    sections: '章节',
    predict: '预测',
    method: '方法',
    results: '结果',
    limits: '局限',
    language: '语言',
    home: '总览',
    batch: '批量',
    figures: '图表',
    cite: '引用',
    history: '活动',
  },

  pages: {
    nextSteps: '下一步',
    predictNextTitle: '接下来去哪里。',
    cardBatch: '要评估多个候选物？上传 CSV，即可获得排序后的系列结果。',
    cardLimits: '在依据某个数值行动之前，请先了解这个模型在哪里失效。',
    cardCite: '要在论文或报告中使用预测结果？请取用引用格式与可复现性说明段落。',
    notFoundTitle: '此地址没有读数。',
    notFoundBody: '该页面不存在。仪器仍在实验台上。',
    backHome: '返回总览',
  },

  hero: {
    titleA: '腐蚀每年让全球',
    titleB: '损失 2.5',
    titleC: '万亿美元。',
    p1: '约占全球 GDP 的 3.4%，每年消耗在管道、船舶、桥梁、炼油厂和钢筋混凝土上。采用业已成熟的腐蚀控制实践，可节省其中的 15% 至 35%——即 3750 亿至 8750 亿美元。',
    p2: '最经济的防护手段之一是有机缓蚀剂：以百万分之几的浓度投加的分子，吸附在金属表面并形成保护膜。',
    p3: '找到合适的分子意味着逐一进行台架试验，耗时数周。本模型先给出估计答案。',
    ctaPrimary: '进行预测',
    ctaSecondary: '工作原理',
    scaleTitle: '本仪器所读取的标度',
    scaleNote:
      '缓蚀效率不是抽象分数。它是金属溶解与否的差别——而且它有颜色。',
    patch0: '裸金属，自由腐蚀',
    patch40: '部分成膜',
    patch80: '保护膜正在形成',
    patch100: '已钝化，受保护',
    sources: '资料来源',
  },

  predictor: {
    eyebrow: '仪器',
    title: '读取一个效率值。',
    lead: '输入分子及其将面临的条件。你会得到一个经校准的区间，而非虚假的点估计——并明确得知这是否属于模型真正掌握的化学。',

    formTitle: '试样与条件',
    inputCount: '5 项输入',
    smilesLabel: '分子（SMILES）',
    gramsPerMol: 'g/mol',
    heavyAtoms: '个重原子',
    inCorpus: '存在于训练语料中',
    examplesHint: '手头没有 SMILES？点击上方载入真实缓蚀剂——它们填充的是同样的五项输入。',

    metalLabel: '基体金属',
    rows: '条记录',

    conditionsLabel: '实验条件',
    conditionsHint:
      '未测量的项请取消勾选。模型训练时带有缺失值指示变量，因此「未记录」是它能理解的答案，而不是猜测。',
    recorded: '已记录',
    notRecorded: '未记录',
    temperature: '温度',
    temperatureHint: '训练范围 283–606 K。298 K 为室温。',
    duration: '暴露时间',
    durationHint: '仅 54% 的语料记录了该项。',
    concentration: '缓蚀剂浓度',
    concentrationHint: '跨度为 3×10⁻⁵ 至 3280 mM；模型使用 log₁₀。',

    submit: '预测缓蚀效率',
    submitPending: '读取中…',
    phNote: 'pH 不是输入项。它在研究流程中仅作分析之用，从未作为模型特征。',

    emptyTitle: '读数将显示在此处',
    emptyBody:
      '预测应当读作一个区间，而非一个点——正如对照比色卡读取颜色一样。区间宽度即模型经校准的不确定度。',
    errorTitle: '无法读取',
    genericError: '出现了问题。',

    readingTitle: '读数',
    modelVersion: '模型',
    efficiencyLabel: '缓蚀效率',
    formula: '分子式',
    mass: '分子量',
    substrate: '基体',
    interval: '区间',

    imputedOne: '项条件未记录',
    imputedMany: '项条件未记录',
    imputedBody:
      '模型使用了训练中位数，并被告知该值缺失——与训练时这些记录所受的处理完全一致。',

    trustTitle: '这个结果可信到什么程度？',
    nearestMatch: '最近相似度',
    scaffoldSeen: '骨架是否已见',
    yes: '是',
    no: '否',
    trustFooter:
      '所引用的 R² 是本次请求应得的那一个。熟悉的化学以随机划分衡量；其余则以更严格的骨架划分衡量。',

    shapTitle: '是什么决定了这个数值',
    shapLead: '基于模型自身特征的精确 Shapley 值，以效率百分点表示。',
  },

  domain: {
    in_domain: '域内',
    edge_of_domain: '域边缘',
    out_of_domain: '域外',
    inShort: '已知化学',
    edgeShort: '相关化学',
    outShort: '陌生化学',
  },

  efficiency: {
    veryHigh: '缓蚀效果极高',
    high: '缓蚀效果高',
    moderate: '缓蚀效果中等',
    low: '缓蚀效果低',
    none: '几乎没有缓蚀效果',
  },

  method: {
    eyebrow: '方法',
    title: '效率取决于条件，因此模型必须知道条件。',
    lead: '多数已发表的结构—性质模型仅凭分子结构进行预测，而它们所依据的效率却取决于温度、浓度、时长与基体。本项目将这些条件贯穿始终并交给模型。这一决定本身就是研究内容。',
    s1h: '三套数据集，一个统一模式',
    s1p: 'Inhibitor 1368、DataCor 铝数据集与 Excorr 数据库——7991 条原始测量统一到同一标度，SMILES 经规范化并去除盐分。',
    s2h: '去重但不丢弃条件',
    s2p: '早期流程对每个分子在所有条件上取平均，将约 8000 条记录压缩为 717 条。改用分子、金属、温度、时长与浓度作为联合键，可保留不同的测量——得到 5170 条可用记录。',
    s3h: '220 个特征',
    s3p: '209 个非常量 RDKit 描述符，加上温度、时长、浓度的 log₁₀、各自的缺失指示变量，以及基体的独热编码。',
    s4h: '两种评估划分，始终一并报告',
    s4p: '随机五折交叉验证，以及 Bemis–Murcko 骨架五折划分——共享同一骨架的分子留在同一折中。两者之间的差距才是诚实的结论。',
    statMeasurements: '条测量',
    statMolecules: '个独立分子',
    statMetals: '种金属',
    statDescriptors: '个描述符',
    statConditions: '个条件特征',
    statPh: '个 pH 特征',
    figure4: '已执行的流程，从三套源数据集直到集成构建与共形校准。',
    figure4Alt:
      '流程架构：三套源数据集经检查与预处理汇入主表，主表再供给特征分析与四条建模流，最终汇入集成构建。',
    serving: '当前服务模型',
    features: '个特征',
    seed: '随机种子',
    run: '运行',
  },

  results: {
    eyebrow: '结果',
    title: '两个数字，绝不只报一个。',
    leadA: '模型在随机划分上取得',
    leadB: '，在骨架划分上取得',
    leadC: '。两者都属实，但回答的是不同的问题。只引用前者是误导你最简单的方式，本页拒绝这样做。',
    randomTitle: '随机划分 — R² 0.806',
    randomBody:
      '折随机划分。测试分子可能已在训练集中以其他条件出现，因此这衡量的是模型对已见过分子的新测量的预测能力。有用，但并不是筛选阶段的化学家真正要问的问题。',
    scaffoldTitle: '骨架划分 — R² 0.310',
    scaffoldBody:
      '共享 Bemis–Murcko 骨架的分子留在同一折中，因此每个测试分子在结构上都是陌生的。这衡量的是对真正新化学的性能。对于未经试验的候选物，应引用这个数字；每当你的分子对本服务而言是新的，它也使用这个数字。',
    ablationTitle: '核心结果',
    ablationLead:
      '同一个随机森林，有无实验条件的对比。提升是系统性的——在所测试的每个经典模型上都成立，这正说明它是信号而非偶然。',
    leaderboardTitle: '所有测试过的模型',
    leaderboardLead:
      '四个模型族在两种划分上的表现。考虑条件的随机森林全面胜出——包括胜过仅读取结构的图网络与微调后的 Transformer。',
    unavailable: '实时指标不可用——预测服务',
    unreachable: '无法访问。',
    loading: '正在加载指标…',
  },

  charts: {
    structureOnly: '仅结构',
    structurePlusConditions: '结构 + 实验条件',
    structurePlusShort: '结构 + 条件',
    randomSplit: '随机划分',
    scaffoldSplit: '骨架划分',
    randomSub: '已知分子的新测量',
    scaffoldSub: '真正的新化学',
    r2Note: 'R² — 决定系数，取值 0 至 1，越高越好。',
    splitGroup: '评估划分',
    scaffoldExplain:
      '共享 Bemis–Murcko 骨架的分子留在同一折中，因此每个测试分子在结构上都是全新的。这是对陌生候选物的诚实估计。',
    randomExplain:
      '折为随机划分，因此测试分子可能已在训练集中以其他条件出现。这衡量的是新测量，而非新化学。',
    colModel: '模型',
    colRepresentation: '表示方式',
    colMae: 'MAE',
    negative: '为负',
    tableCaption: '各模型性能，按 R² 排序。',
    ridgeNote:
      'R² 为负意味着模型的预测还不如始终取语料均值。岭回归在骨架划分上崩溃，是因为 Ipc 之类无界描述符在陌生骨架上会取到极端值。这正是骨架划分意在揭示的分布偏移，而非流程的缺陷。',
    raises: '提高预测效率',
    lowers: '降低预测效率',
    condition: '条件',
  },

  learned: {
    eyebrow: '可解释性',
    title: '它学到的是化学，还是只是算术？',
    lead: '基于整个语料的 Shapley 值揭示了模型所依赖的因素。答案令人安心：基体种类、分子尺寸与投加条件——正是腐蚀科学会预期的。',
    figure7:
      '调优后随机森林的全局 SHAP 摘要。每个点代表一个分子；位置表示对预测效率的影响。',
    figure7Alt:
      'SHAP 摘要图。最强的特征依次为「金属＝铝」、摩尔折射率、浓度对数、温度与时长，其后为连接性与部分电荷类描述符。',
    i1h: '基体占主导',
    i1p: '所保护的是哪种金属，是单一最强的特征。铝与镁的行为与钢差异足够大，模型几乎将它们视为不同的问题。',
    i2h: '尺寸决定覆盖度',
    i2p: '摩尔折射率与连接性指数排名靠前。分子越大，每个吸附分子覆盖的表面越多——这正是腐蚀科学既有的物理图像。',
    i3h: '投加量与温度都重要，且以此为序',
    i3p: '浓度对数排名高于温度，二者又高于多数结构描述符。这从模型内部印证了「条件假说」。',
    i4h: '富电子位点显现',
    i4p: '部分电荷与电拓扑描述符位列其后，与通过氮、硫、氧供电子原子发生吸附的机理一致。',
    footer:
      '归因显示的是模型依赖什么。它证明模型学到了物理上合理的东西——而不是对吸附化学本身的测量。',
  },

  limits: {
    eyebrow: '局限',
    title: '这个模型在哪里失效。',
    leadA: '此处每一条，都是答辩委员本来需要自己找出来的。经校准的不确定度为',
    leadB: '个效率百分点，经验覆盖率为',
    leadC: '——区间确实很宽，而明确说出来正是本页的用意。',
    l1h: '骨架划分的差距很大，且并未缩小',
    l1p: '加入条件后骨架 R² 从 0.124 提升至 0.310——提升真实，但远低于随机划分的 0.806。知道条件并不能替代见过这类化学。',
    l2h: '46% 的语料缺少暴露时长',
    l2p: '带缺失指示变量的插补是诚实的记账方式，但无法还原从未被测量过的信息。',
    l3h: 'pH 被有意排除',
    l3p: '它仅在 32% 的记录中有值，且只保留作分析之用。若纳入模型，就意味着对该列的大多数进行插补。',
    l4h: '铁与碳钢仍分列两类',
    l4p: '碳钢以铁为基，且两者通常都在酸性介质中试验，但各数据源对这一区分的记录并不可靠。是否合并为单一铁基类别，是一个悬而未决且有意保留的科学决定。',
    l5h: '调参为 10 次试验，而非嵌套交叉验证',
    l5p: '针对骨架目标的直接 Optuna 搜索。调参曲线在所有试验中都很平坦，说明模型并未受超参数限制——但方法学中将嵌套交叉验证标注为「计划中」，而非已完成。',
    l6h: '这不能替代试验',
    l6p: '它是用于筛选与排序的研究演示系统。失重法与电化学测量仍然是证据本身。',
  },

  batch: {
    eyebrow: '批量',
    title: '为整个候选系列排序。',
    lead: '上传同一服务条件下的分子 CSV，即可按预测效率排序返回，每一行都附带各自的区间与可信度判定。',
    panelTitle: '筛选一个系列',
    panelLead:
      '上传 CSV，在同一服务条件下对候选物排序。描述符按唯一分子缓存，整个文件只调用一次随机森林。',
    template: '下载模板',
    choose: '选择 CSV 文件',
    reading: '正在读取文件…',
    predicted: '条已预测',
    failed: '条失败',
    download: '下载结果',
    colMolecule: '分子',
    colReading: '读数',
    colTrust: '可信度',
    tableCaption: '批量结果，按预测效率排序。',
    row: '行',
  },

  figures: {
    eyebrow: '附录',
    title: '本次运行产出的图。',
    lead: '由 notebook 直接生成，此处原样重现。',
    f1: '三套源数据集在统一化之前的原始目标分布。',
    f3: '经规范化、去重与金属筛选后的统一效率分布。',
    f5: '与目标互信息量最高的前 30 个描述符。',
    f6: '主要描述符之间的相关性，显示尺寸与连接性两类描述符的冗余。',
    f8: '消息传递网络上的积分梯度原子显著性。',
    f9: '微调后 ChemBERTa 对某条 SMILES 的注意力汇总。',
    f10: '带 90% 共形区间的预测值与观测值对比。',
  },

  colophon: {
    author: '作者',
    supervisor: '导师',
    coSupervisor: '副导师',
    institution: '所属机构',
    provenance: '溯源',
    modelVersion: '模型版本',
    sourceRun: '源运行',
    seed: '随机种子',
    modelHash: '模型 SHA-256',
    unavailable: '服务不可用。',
    provenanceNote:
      '服务启动前，每个产物都会对照 SHA-256 清单校验。数据集引用仍在追溯之中；三套源数据集以链接形式给出，而非再分发。',
  },

  cite: {
    eyebrow: '引用',
    title: '如何引用这项工作。',
    lead: '这里有三样东西可以引用，且彼此不可替换：研究本身、承载它的软件，以及你从中获得的某一次具体预测。',

    thesisTitle: '引用研究',
    thesisBody: '当你提及方法、语料，或「实验条件承载了信号」这一结论时，请引用学位论文。投稿前请确认年份与答辩状态——下方给出的是当前年份，并非经核实的出版日期。',

    softwareTitle: '引用软件',
    softwareBody: '当你用它产出数值时，请引用该工具。版本很重要：更晚的模型版本会给出不同答案，因此请锁定你实际使用的那一个。',

    reproTitle: '引用一次预测',
    reproBody: '这是通常被略去的部分。只有当读者知道是哪个产物生成了它，预测才是可复现的。因此这段文本包含在线模型版本、其 SHA-256 以及锁定的库版本。请粘贴到你的方法部分。',
    methodsParagraph: '方法段落',

    copy: '复制',
    copied: '已复制',

    dataEyebrow: '数据',
    dataTitle: '引用源数据集。',
    dataBody: '语料由三套公开数据集统一而来。它们归原作者所有，此处以链接给出，而非再分发。',
    dataGapTitle: '引用仍在追溯中',
    dataGapBody: '这三套数据集的原始出版物尚未确认，因此此处不印出任何参考文献，以免印出可能有误的一条。若你使用该语料，请将每套数据集追溯至其源出版物并直接引用。',
    dsInhibitor: '1364 条碳钢在 1 M HCl 中的记录，附量子化学描述符。',
    dsDatacor: '涵盖十七种铝基体的 2011 条测量，逐行记录实验条件。',
    dsExcorr: '4616 条记录，涵盖铁、铝、镁、铜与锌。',
    citationPending: '参考文献待补',

    licenceEyebrow: '条款',
    licenceTitle: '许可与联系方式。',
    licenceBody: '代码是开放的。数据集保留其原有许可，且不在此再分发。',
    codeLicence: '代码许可',
    contact: '联系方式',
  },

  history: {
    eyebrow: '活动',
    title: '这个服务被问过什么。',
    lead: '每次预测都会连同生成它的模型版本一起记录，因此任何结果都可以追溯到确切的产物。此处仅显示规范化后的分子。',
    emptyTitle: '暂无记录',
    emptyBody: '服务处理过预测后，记录就会出现在这里。先做一次预测再回来看看。',
    tableCaption: '近期服务的预测，最新在前。',
    colWhen: '时间',
    rows: '条记录',
  },

  metals: {
    aluminium: '铝',
    carbon_steel: '碳钢',
    copper: '铜',
    iron: '铁',
    magnesium: '镁',
  },
}
