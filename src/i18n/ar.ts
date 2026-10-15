import type { Translations } from './config'

export const ar: Translations = {
  meta: {
    title: 'Inhibiepdt — التنبؤ بكفاءة تثبيط التآكل',
    description:
      'Predict the corrosion inhibition efficiency of an organic molecule on iron, aluminium, magnesium or copper under stated experimental conditions, with a calibrated uncertainty band and an honest applicability-domain verdict.',  // TODO(i18n)
  },

  nav: {
    skip: 'انتقل إلى المحتوى',
    sections: 'الأقسام',
    predict: 'تنبّأ',
    method: 'المنهجية',
    results: 'النتائج',
    limits: 'الحدود',
    language: 'اللغة',
    home: 'نظرة عامة',
    batch: 'دفعة',
    figures: 'الأشكال',
    cite: 'الاستشهاد',
    history: 'النشاط',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
  },

  pages: {
    nextSteps: 'التالي',
    predictNextTitle: 'إلى أين بعد ذلك.',
    cardBatch: 'هل تقيّم أكثر من مرشّح؟ ارفع ملف CSV واستعد السلسلة مرتّبة.',
    cardLimits: 'قبل أن تتصرّف بناءً على رقم، اقرأ أين يتوقّف هذا النموذج عن العمل.',
    cardCite: 'هل ستستخدم تنبؤًا في بحث أو تقرير؟ خذ صيغة الاستشهاد وفقرة قابلية إعادة الإنتاج.',
    notFoundTitle: 'لا توجد قراءة على هذا العنوان.',
    notFoundBody: 'هذه الصفحة غير موجودة. أما الأداة فلا تزال على منضدة المختبر.',
    backHome: 'العودة إلى النظرة العامة',
  },

  hero: {
    titleA: 'يكلّف التآكل',
    titleB: 'العالم ٢٫٥',
    titleC: 'تريليون دولار سنويًا.',
    p1: 'أي نحو ٣٫٤٪ من الناتج المحلي الإجمالي العالمي، تُهدر كل عام في خطوط الأنابيب والسفن والجسور والمصافي والخرسانة المسلّحة. وتطبيق ممارسات مكافحة التآكل المعروفة جيدًا يمكن أن يوفّر ما بين ١٥٪ و٣٥٪ من هذه التكلفة — أي بين ٣٧٥ و٨٧٥ مليار دولار.',
    p2: 'من أرخص وسائل الحماية مثبّط التآكل العضوي: جزيء يُضاف بتركيز أجزاء من المليون فيمتزّ على سطح المعدن ويكوّن طبقة واقية.',
    p3: 'العثور على الجزيء المناسب يعني اختبار المرشّحين واحدًا تلو الآخر على منضدة المختبر لأسابيع. هذا النموذج يقدّر الإجابة أولًا.',
    ctaPrimary: 'أجرِ تنبؤًا',
    ctaSecondary: 'كيف يعمل',
    scaleTitle: 'المقياس الذي تقرأه هذه الأداة',
    scaleNote:
      'كفاءة التثبيط ليست درجة مجرّدة. إنها الفرق بين معدن يذوب وآخر لا يذوب — ولها لون.',
    patch0: 'معدن عارٍ، يتآكل بحرية',
    patch40: 'طبقة جزئية',
    patch80: 'طبقة واقية قيد التكوّن',
    patch100: 'مُخمَّل ومحمي',
    sources: 'المصادر',
  },

  predictor: {
    eyebrow: 'الأداة',
    title: 'اقرأ قيمة كفاءة.',
    lead: 'أدخل جزيئًا والظروف التي سيتعرّض لها. ستحصل على نطاق معايَر لا على نقطة مضلِّلة — مع بيان صريح لما إذا كانت هذه كيمياء يعرفها النموذج فعلًا.',

    formTitle: 'العيّنة والظروف',
    inputCount: '11 inputs',  // TODO(i18n)
    smilesLabel: 'الجزيء (SMILES)',
    gramsPerMol: 'غ/مول',
    heavyAtoms: 'ذرة ثقيلة',
    inCorpus: 'موجود في مجموعة التدريب',
    examplesHint:
      'لا تملك صيغة SMILES؟ حمِّل مثبّطًا حقيقيًا من الأعلى — فهي تملأ المدخلات الخمسة نفسها.',

    metalLabel: 'معدن الركيزة',
    rows: 'سجل',

    conditionsLabel: 'الظروف التجريبية',
    conditionsHint:
      'أزل التحديد عن أي قيمة لم تقِسها. دُرِّب النموذج بمؤشرات للقيم المفقودة، لذا فإن «غير مسجَّل» إجابة يفهمها، لا تخمينًا.',
    recorded: 'مسجَّل',
    notRecorded: 'غير مسجَّل',
    temperature: 'درجة الحرارة',
    temperatureHint: '283–606 K in training. 298 K is room temperature.',  // TODO(i18n)
    duration: 'مدة التعرّض',
    durationHint: 'Recorded for only 54% of the corpus.',  // TODO(i18n)
    concentration: 'تركيز المثبّط',
    concentrationHint: 'Spans 3×10⁻⁵ to 3300 mM; the model sees log₁₀.',  // TODO(i18n)

    submit: 'تنبّأ بكفاءة التثبيط',
    submitPending: 'جارٍ القراءة…',
    emptyTitle: 'تظهر القراءة هنا',
    emptyBody:
      'يُقرأ التنبؤ كنطاق لا كنقطة — تمامًا كما تقرأ لونًا بمقارنته ببطاقة مرجعية. وعرض النطاق هو عدم اليقين المعايَر للنموذج.',
    errorTitle: 'تعذّرت القراءة',
    genericError: 'حدث خطأ ما.',

    readingTitle: 'القراءة',
    modelVersion: 'النموذج',
    efficiencyLabel: 'كفاءة التثبيط',
    formula: 'الصيغة',
    mass: 'الكتلة',
    substrate: 'الركيزة',
    interval: 'نطاق',

    imputedOne: 'ظرف واحد لم يُسجَّل',
    imputedMany: 'ظروف لم تُسجَّل',
    imputedBody:
      'استخدم النموذج الوسيط المستمد من التدريب وأُبلغ بأن القيمة مفقودة — وهي المعاملة نفسها التي تلقّتها تلك السجلات أثناء التدريب.',

    trustTitle: 'إلى أي حد يمكن الوثوق بهذه النتيجة؟',
    nearestMatch: 'أقرب تطابق',
    scaffoldSeen: 'الهيكل معروف',
    yes: 'نعم',
    no: 'لا',
    trustFooter:
      'قيمة R² المذكورة هي ما يستحقه هذا الطلب. فالكيمياء المألوفة تُقاس بالتقسيم العشوائي؛ وكل ما عداها يُقاس بالتقسيم الهيكلي الأكثر صرامة.',

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

    shapTitle: 'ما الذي حدّد هذا الرقم',
    shapLead: 'قيم شابلي الدقيقة على سمات النموذج نفسه، بوحدات نقاط الكفاءة.',
  },

  domain: {
    in_domain: 'ضمن النطاق',
    edge_of_domain: 'على حافة النطاق',
    out_of_domain: 'خارج النطاق',
    inShort: 'كيمياء معروفة',
    edgeShort: 'كيمياء قريبة',
    outShort: 'كيمياء غير مألوفة',
  },

  efficiency: {
    veryHigh: 'تثبيط مرتفع جدًا',
    high: 'تثبيط مرتفع',
    moderate: 'تثبيط متوسط',
    low: 'تثبيط منخفض',
    none: 'تثبيط ضعيف أو معدوم',
  },

  method: {
    eyebrow: 'المنهجية',
    title: 'الكفاءة تعتمد على الظروف، لذلك يتلقّاها النموذج.',
    lead: 'تتنبأ معظم نماذج البنية–الخاصية المنشورة انطلاقًا من البنية الجزيئية وحدها، في حين أن الكفاءة التي تُدرَّب عليها تعتمد على درجة الحرارة والتركيز والمدة والركيزة. حافظ هذا المشروع على تلك الظروف وسلّمها إلى النموذج. وهذا القرار هو جوهر البحث.',
    s1h: 'ثلاث مجموعات بيانات، مخطّط واحد',
    s1p: 'Inhibitor 1368, the DataCor aluminium set and the CORDATA multi-metal export, harmonised onto one 15-field schema with SMILES canonicalised, salts stripped, and the measurement techniques mapped onto a controlled vocabulary.',  // TODO(i18n)
    s2h: 'إزالة التكرار دون إهدار الظروف',
    s2p: 'An earlier pipeline averaged each molecule across every condition, collapsing thousands of rows to 717. Keying on molecule, metal, temperature, duration, concentration and pH instead preserves distinct measurements — 8,359 of them, over 1,050 molecules on four base metals.',  // TODO(i18n)
    s3h: '283 features',  // TODO(i18n)
    s3p: '211 non-constant RDKit descriptors, then the context: temperature and its inverse, duration and log₁₀ duration, log₁₀ concentration, pH, log₁₀ salt concentration, a was-missing indicator for each, and one-hot encodings of base metal, alloy grade, measurement technique and pH provenance, plus a synergist flag.',  // TODO(i18n)
    s4h: 'Two honest splits, always reported together',  // TODO(i18n)
    s4p: 'Five-fold grouped by molecule, so no test molecule appears in training, and Bemis–Murcko scaffold five-fold, where molecules sharing a core stay in the same fold. A third, row-wise split was run as a control and is reported only to show how badly it flatters the model.',  // TODO(i18n)
    statMeasurements: 'قياسًا',
    statMolecules: 'جزيئًا فريدًا',
    statMetals: 'معادن',
    statDescriptors: 'واصفًا',
    statConditions: 'سمة ظرفية',
    statPh: 'سمة للأس الهيدروجيني',
    figure4:
      'المسار المنفَّذ، من مجموعات البيانات الثلاث وحتى بناء التجميعة والمعايرة المطابقة.',
    figure4Alt:
      'بنية المسار: ثلاث مجموعات بيانات مصدرية تُغذّي الفحص والمعالجة المسبقة نحو جدول رئيسي، يُغذّي بدوره تحليل السمات وأربعة مسارات نمذجة، تُغذّي بناء التجميعة.',
    serving: 'النموذج المُشغَّل',
    features: 'سمة',
    seed: 'البذرة',
    run: 'التشغيل',
  },

  results: {
    eyebrow: 'النتائج',
    title: 'رقمان، لا رقم واحد أبدًا.',
    leadA: 'يحقّق النموذج',
    leadB: 'في التقسيم العشوائي و',
    leadC: 'في التقسيم الهيكلي. وكلاهما صحيح، لكنهما يجيبان عن سؤالين مختلفين. والاكتفاء بذكر الأول هو أسهل طريقة لتضليلك، وهذه الصفحة ترفض ذلك.',
    // TODO(i18n): English text pending translation.
    groupedTitle: 'By molecule — R\u00b2 0.461',
    groupedBody:
      'Every measurement of a molecule is held in the same fold, so no test molecule appears in training under any conditions. This is the honest estimate for a molecule the model has not met: it explains 46% of the variance, with a typical error of 15.7 efficiency points.',
    scaffoldTitle: 'التقسيم الهيكلي — R² ٠٫٣١٠',
    scaffoldBody:
      'تبقى الجزيئات المتشاركة في نواة Bemis–Murcko ضمن الطيّة نفسها، فيكون كل جزيء اختبار غير مألوف بنيويًا. وهذا يقيس الأداء على كيمياء جديدة فعلًا. وهو الرقم الواجب ذكره لمرشّح لم يُختبر، وهو ما تستخدمه هذه الخدمة كلما كان جزيئك جديدًا عليها.',
    ablationTitle: 'النتيجة المحورية',
    ablationLead:
      'الغابة العشوائية نفسها، مع الظروف التجريبية وبدونها. التحسّن منهجي — تكرّر مع كل نموذج تقليدي جرى اختباره، وهو ما يجعله إشارة لا مصادفة.',
    leaderboardTitle: 'كل النماذج المختبَرة',
    leaderboardLead:
      'أربع عائلات من النماذج عبر التقسيمين. تتفوّق الغابة العشوائية المدركة للظروف في كل الحالات — بما في ذلك على الشبكات الرسومية والمحوّل المضبوط، اللذين يقرآن البنية وحدها.',
    unavailable: 'المقاييس الحيّة غير متاحة — خدمة التنبؤ على',
    unreachable: 'غير قابلة للوصول.',
    loading: 'جارٍ تحميل المقاييس…',
  },

  charts: {
    structureOnly: 'البنية فقط',
    structurePlusConditions: 'البنية + الظروف التجريبية',
    structurePlusShort: 'البنية + الظروف',
    scaffoldSplit: 'التقسيم الهيكلي',
    scaffoldSub: 'Genuinely new chemistry',  // TODO(i18n)
    r2Note: 'R² — معامل التحديد، من ٠ إلى ١. كلما ارتفع كان أفضل.',
    splitGroup: 'تقسيم التقييم',
    scaffoldExplain:
      'تبقى الجزيئات المتشاركة في نواة Bemis–Murcko ضمن الطيّة نفسها، فيكون كل جزيء اختبار جديدًا بنيويًا. وهذا هو التقدير الصادق لمرشّح غير معروف.',
    groupedSplit: 'By molecule',
    groupedSub: 'Molecules absent from training',
    groupedExplain:
      'Every measurement of a molecule is held in the same fold, so no test molecule appears in training under any conditions. This is the honest estimate for a molecule the model has not seen.',
    colStep: 'Feature block added',
    colFeatures: 'cols',
    colMarginal: '\u0394 R\u00b2',
    colModel: 'النموذج',
    colRepresentation: 'التمثيل',
    colMae: 'MAE',
    negative: 'سالب',
    tableCaption: 'أداء النماذج، مرتّبًا حسب R².',
    ridgeNote:
      'قيمة R² السالبة تعني أن النموذج تنبّأ بأسوأ من مجرد استخدام متوسط المجموعة. وينهار انحدار ريدج في التقسيم الهيكلي لأن واصفات غير محدودة مثل Ipc تأخذ قيمًا متطرفة على الهياكل غير المألوفة. وهذا بالضبط هو انزياح التوزيع الذي وُجد التقسيم الهيكلي لكشفه، لا عيبًا في المسار.',
    raises: 'يرفع الكفاءة المتوقَّعة',
    lowers: 'يخفض الكفاءة المتوقَّعة',
    condition: 'ظرف',
  },

  learned: {
    eyebrow: 'قابلية التفسير',
    title: 'هل تعلّم كيمياء، أم مجرّد حساب؟',
    lead: 'تكشف قيم شابلي على كامل المجموعة عمّا يعتمد عليه النموذج. والإجابة مطمئنة: هوية الركيزة، وحجم الجزيء، وظروف الجرعة — وهو ما تتوقّعه علوم التآكل.',
    figure7:
      'ملخّص SHAP الشامل للغابة العشوائية المضبوطة. كل نقطة تمثّل جزيئًا؛ والموضع يبيّن الأثر على الكفاءة المتوقَّعة.',
    figure7Alt:
      'مخطط ملخّص SHAP. أقوى السمات هي «المعدن = ألومنيوم»، والانكسارية المولية، ولوغاريتم التركيز، ودرجة الحرارة، والمدة، تليها واصفات الاتصالية والشحنة الجزئية.',
    i1h: 'الركيزة هي المهيمنة',
    i1p: 'المعدن الذي تحميه هو أقوى سمة منفردة. فالألومنيوم والمغنيسيوم يسلكان سلوكًا مختلفًا عن الفولاذ بما يكفي ليعاملهما النموذج كمسألتين شبه منفصلتين.',
    i2h: 'الحجم يحكم التغطية',
    i2p: 'تتصدّر الانكسارية المولية ومؤشرات الاتصالية. فالجزيئات الأضخم تغطّي مساحة أكبر لكل جزيء ممتزّ — وهي الصورة الفيزيائية التي تتبنّاها علوم التآكل أصلًا.',
    i3h: 'الجرعة والحرارة مهمّتان، وبهذا الترتيب',
    i3p: 'يتقدّم لوغاريتم التركيز على درجة الحرارة، ويتقدّم كلاهما على معظم الواصفات البنيوية. وهذا تأكيد لفرضية الظروف من الداخل.',
    i4h: 'تظهر المواقع الغنية بالإلكترونات',
    i4p: 'تظهر واصفات الشحنة الجزئية والواصفات الكهروطوبولوجية دون المتصدّرين، بما يتّسق مع الامتزاز عبر ذرات النيتروجين والكبريت والأكسجين المانحة.',
    footer:
      'يبيّن الإسناد ما يعتمد عليه النموذج. وهو دليل على أنه تعلّم شيئًا معقولًا فيزيائيًا — لا قياسًا لكيمياء الامتزاز نفسها.',
  },

  limits: {
    eyebrow: 'الحدود',
    title: 'أين يتوقّف هذا النموذج عن العمل.',
    leadA: 'كل بند هنا هو بند كان على الممتحِن أن يكتشفه بنفسه. وعدم اليقين المعايَر البالغ',
    leadB: 'نقطة كفاءة عند تغطية تجريبية قدرها',
    leadC: 'نطاق واسع — والتصريح به بوضوح هو المقصود.',
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
    eyebrow: 'دفعة',
    title: 'رتّب سلسلة مرشّحين كاملة.',
    lead: 'ارفع ملف CSV لجزيئات ضمن ظرف تشغيلي واحد، لتستعيدها مرتّبة حسب الكفاءة المتوقَّعة، ولكل منها نطاقها وحكم الثقة الخاص بها.',
    panelTitle: 'افرز سلسلة',
    panelLead:
      'ارفع ملف CSV لترتيب المرشّحين ضمن ظرف تشغيلي واحد. تُخزَّن الواصفات مؤقتًا لكل جزيء فريد، وتُستدعى الغابة مرة واحدة للملف بأكمله.',
    template: 'تنزيل القالب',
    choose: 'اختر ملف CSV',
    reading: 'جارٍ قراءة الملف…',
    predicted: 'تنبؤًا',
    failed: 'إخفاقًا',
    download: 'تنزيل النتائج',
    colMolecule: 'الجزيء',
    colReading: 'القراءة',
    colTrust: 'الثقة',
    tableCaption: 'نتائج الدفعة، مرتّبة حسب الكفاءة المتوقَّعة.',
    row: 'سطر',
  },

  figures: {
    eyebrow: 'ملحق',
    title: 'أشكال من التشغيل المنفَّذ.',
    lead: 'أُنتجت مباشرة من الدفتر الحسابي، وأُعيد عرضها هنا دون تعديل.',
    f1: 'التوزيعات الخام للهدف عبر مجموعات البيانات الثلاث، قبل التوحيد.',
    f3: 'توزيع الكفاءة الموحَّد بعد التوحيد القياسي وإزالة التكرار وحصر المعادن.',
    f5: 'أفضل ٣٠ واصفًا حسب المعلومات المتبادلة مع الهدف.',
    f6: 'الارتباط بين الواصفات الرئيسية، بما يكشف التكرار في عائلتي الحجم والاتصالية.',
    f8: 'بروز الذرات بالتدرّجات المتكاملة على شبكة تمرير الرسائل.',
    f9: 'تجميع الانتباه على سلسلة SMILES من نموذج ChemBERTa المضبوط.',
    f10: 'التنبؤات مع نطاقات مطابقة بنسبة ٩٠٪ مقابل القيم المرصودة.',
  },

  colophon: {
    author: 'الباحثة',
    supervisor: 'المشرف',
    coSupervisor: 'المشرف المشارك',
    institution: 'المؤسسة',
    provenance: 'المصدر والتتبّع',
    modelVersion: 'إصدار النموذج',
    sourceRun: 'التشغيل المصدري',
    seed: 'البذرة',
    modelHash: 'بصمة SHA-256 للنموذج',
    unavailable: 'الخدمة غير متاحة.',
    provenanceNote:
      'يُتحقَّق من كل ناتج مقابل بيان SHA-256 قبل أن تبدأ الخدمة. ولا تزال استشهادات مجموعات البيانات قيد التتبّع؛ وتُربط المجموعات الثلاث بمصادرها بدل إعادة نشرها.',
  },

  cite: {
    eyebrow: 'الاستشهاد',
    title: 'كيف تستشهد بهذا العمل.',
    lead: 'ثلاثة أشياء يمكن الاستشهاد بها هنا، وهي ليست بدائل لبعضها: البحث نفسه، والبرنامج الذي يقدّمه، وتنبؤ بعينه حصلت عليه منه.',

    thesisTitle: 'الاستشهاد بالبحث',
    thesisBody: 'استشهد بالأطروحة عند الإشارة إلى المنهجية أو المجموعة أو النتيجة القائلة بأن الظروف التجريبية هي التي تحمل الإشارة. تحقّق من السنة وحالة المناقشة قبل التقديم — فالسنة أدناه هي السنة الجارية، لا تاريخ نشر موثّقًا.',

    softwareTitle: 'الاستشهاد بالبرنامج',
    softwareBody: 'استشهد بالأداة إذا استخدمتها لإنتاج أرقام. والإصدار مهم: إصدار لاحق من النموذج سيعطي إجابات مختلفة، لذا ثبّت الإصدار الذي استخدمته فعلًا.',

    reproTitle: 'الاستشهاد بتنبؤ',
    reproBody: 'هذا هو الجزء الذي يُغفل عادة. لا يكون التنبؤ قابلًا لإعادة الإنتاج إلا إذا عرف القارئ أي ناتج أنتجه، ولذلك تحمل هذه الفقرة إصدار النموذج العامل وبصمته SHA-256 وإصدارات المكتبات المثبَّتة. الصقها في قسم المنهجية لديك.',
    methodsParagraph: 'فقرة المنهجية',

    copy: 'نسخ',
    copied: 'تم النسخ',

    dataEyebrow: 'البيانات',
    dataTitle: 'الاستشهاد بمجموعات البيانات المصدرية.',
    dataBody: 'وُحِّدت المجموعة من ثلاث مجموعات بيانات عامة. وهي ملك لمؤلفيها الأصليين، وتُربط هنا بدل إعادة نشرها.',
    dataGapTitle: 'الاستشهادات قيد التتبّع',
    dataGapBody: 'لم تُؤكَّد بعد المنشورات الأصلية لهذه المجموعات الثلاث، ولذلك لا يُطبع أي مرجع هنا بدلًا من طباعة مرجع قد يكون خاطئًا. إن استخدمت المجموعة، فتتبّع كل مجموعة إلى منشورها الأصلي واستشهد به مباشرة.',
    dsInhibitor:
      '1,364 entries for carbon steel in 1 M HCl, with quantum-chemical descriptors.',  // TODO(i18n)
    dsDatacor:
      'The CORDATA multi-metal export: 5,000 rows across seventeen fields, covering aluminium, copper, iron, magnesium and zinc, with per-row conditions.',  // TODO(i18n)
    dsExcorr:
      '4,616 entries spanning iron, aluminium, magnesium, copper and zinc.',  // TODO(i18n)
    citationPending: 'المرجع قيد الإعداد',

    licenceEyebrow: 'الشروط',
    licenceTitle: 'الترخيص والتواصل.',
    licenceBody: 'الشيفرة مفتوحة. أما مجموعات البيانات فتحتفظ بتراخيصها الأصلية ولا يُعاد نشرها.',
    codeLicence: 'ترخيص الشيفرة',
    contact: 'التواصل',
  },

  history: {
    eyebrow: 'النشاط',
    title: 'ما الذي سُئلت عنه هذه الخدمة.',
    lead: 'يُسجَّل كل تنبؤ مع إصدار النموذج الذي أنتجه، بحيث يمكن تتبّع أي نتيجة إلى ناتج محدّد بدقة. ولا يُعرض سوى الجزيء بصيغته المعيارية.',
    emptyTitle: 'لا سجلات بعد',
    emptyBody: 'ستظهر التنبؤات هنا بمجرد أن تخدم المنظومة بعضها. أجرِ تنبؤًا ثم عد.',
    tableCaption: 'التنبؤات المقدَّمة حديثًا، الأحدث أولًا.',
    colWhen: 'الوقت',
    rows: 'مدخلًا',
  },

  metals: {
    Al: 'ألومنيوم',
    Cu: 'نحاس',
    Fe: 'حديد',
    Mg: 'مغنيسيوم',
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
