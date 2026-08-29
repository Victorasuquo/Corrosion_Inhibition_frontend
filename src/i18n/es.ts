import type { Translations } from './config'

export const es: Translations = {
  meta: {
    title: 'Inhibiepdt — Predicción de la eficiencia de inhibición de la corrosión',
    description:
      'Predice la eficiencia de inhibición de la corrosión de una molécula orgánica sobre aluminio, acero al carbono, cobre, hierro o magnesio en condiciones experimentales dadas, con un intervalo de incertidumbre calibrado y un veredicto honesto sobre el dominio de aplicabilidad.',
  },

  nav: {
    skip: 'Ir al contenido',
    sections: 'Secciones',
    predict: 'Predecir',
    method: 'Método',
    results: 'Resultados',
    limits: 'Límites',
    language: 'Idioma',
    home: 'Resumen',
    batch: 'Lote',
    figures: 'Figuras',
    cite: 'Citar',
    history: 'Actividad',
  },

  pages: {
    nextSteps: 'Siguiente',
    predictNextTitle: 'Adónde ir ahora.',
    cardBatch: '¿Vas a evaluar más de un candidato? Sube un CSV y recibe la serie ordenada.',
    cardLimits: 'Antes de actuar sobre una cifra, lee dónde deja de funcionar este modelo.',
    cardCite: '¿Vas a usar una predicción en un artículo o informe? Toma la cita y el bloque de reproducibilidad.',
    notFoundTitle: 'No hay lectura en esta dirección.',
    notFoundBody: 'Esa página no existe. El instrumento sigue en la mesa de trabajo.',
    backHome: 'Volver al resumen',
  },

  hero: {
    titleA: 'La corrosión cuesta',
    titleB: 'al mundo 2,5',
    titleC: 'billones al año.',
    p1: 'Alrededor del 3,4 % del PIB mundial, perdido cada año en tuberías, buques, puentes, refinerías y hormigón armado. Aplicar prácticas de control de la corrosión ya bien conocidas permitiría ahorrar entre el 15 y el 35 % de esa cifra: entre 375 000 y 875 000 millones de dólares.',
    p2: 'Una de las defensas más baratas es un inhibidor de corrosión orgánico: una molécula dosificada en partes por millón que se adsorbe sobre el metal y forma una película protectora.',
    p3: 'Encontrar la molécula adecuada exige ensayar candidatas una a una durante semanas. Este modelo estima la respuesta primero.',
    ctaPrimary: 'Hacer una predicción',
    ctaSecondary: 'Cómo funciona',
    scaleTitle: 'La escala que lee este instrumento',
    scaleNote:
      'La eficiencia de inhibición no es una puntuación abstracta. Es la diferencia entre un metal que se disuelve y uno que no — y tiene color.',
    patch0: 'Metal desnudo, corroyéndose libremente',
    patch40: 'Película parcial',
    patch80: 'Película protectora en formación',
    patch100: 'Pasivado, protegido',
    sources: 'Fuentes',
  },

  predictor: {
    eyebrow: 'El instrumento',
    title: 'Lee una eficiencia.',
    lead: 'Introduce una molécula y las condiciones a las que se enfrentará. Obtendrás un intervalo calibrado, no un punto engañoso — y una indicación clara de si esta química es realmente conocida por el modelo.',

    formTitle: 'Muestra y condiciones',
    inputCount: '5 entradas',
    smilesLabel: 'Molécula (SMILES)',
    gramsPerMol: 'g/mol',
    heavyAtoms: 'átomos pesados',
    inCorpus: 'Presente en el corpus de entrenamiento',
    examplesHint:
      '¿No tienes un SMILES a mano? Carga arriba un inhibidor real: rellenan las mismas cinco entradas.',

    metalLabel: 'Metal del sustrato',
    rows: 'filas',

    conditionsLabel: 'Condiciones experimentales',
    conditionsHint:
      'Desmarca todo lo que no hayas medido. El modelo se entrenó con indicadores de valor ausente, así que «no registrado» es una respuesta que entiende, no una suposición.',
    recorded: 'registrado',
    notRecorded: 'no registrado',
    temperature: 'Temperatura',
    temperatureHint: '283–606 K en el entrenamiento. 298 K es temperatura ambiente.',
    duration: 'Tiempo de exposición',
    durationHint: 'Registrado en solo el 54 % del corpus.',
    concentration: 'Concentración del inhibidor',
    concentrationHint: 'De 3×10⁻⁵ a 3280 mM; el modelo utiliza el log₁₀.',

    submit: 'Predecir la eficiencia de inhibición',
    submitPending: 'Leyendo…',
    phNote:
      'El pH no es una entrada. Se conserva en el pipeline de investigación solo para análisis y nunca fue una variable del modelo.',

    emptyTitle: 'La lectura aparece aquí',
    emptyBody:
      'Una predicción se lee como una banda, no como un punto — igual que se lee un color contra una carta de comparación. El ancho de la banda es la incertidumbre calibrada del modelo.',
    errorTitle: 'No se puede leer',
    genericError: 'Algo ha salido mal.',

    readingTitle: 'Lectura',
    modelVersion: 'modelo',
    efficiencyLabel: 'Eficiencia de inhibición',
    formula: 'Fórmula',
    mass: 'Masa',
    substrate: 'Sustrato',
    interval: 'intervalo',

    imputedOne: 'condición no fue registrada',
    imputedMany: 'condiciones no fueron registradas',
    imputedBody:
      'El modelo usó la mediana de entrenamiento y fue informado de que el valor faltaba — el mismo tratamiento que recibieron esas filas durante el entrenamiento.',

    trustTitle: '¿Cuánto puedes fiarte de esto?',
    nearestMatch: 'Vecino más próximo',
    scaffoldSeen: 'Esqueleto ya visto',
    yes: 'Sí',
    no: 'No',
    trustFooter:
      'El R² citado es el que corresponde a esta consulta. La química familiar se mide con la partición aleatoria; todo lo demás, con la partición por esqueleto, más estricta.',

    shapTitle: 'Qué determinó esta cifra',
    shapLead:
      'Valores de Shapley exactos sobre las variables del propio modelo, en puntos de eficiencia.',
  },

  domain: {
    in_domain: 'Dentro del dominio',
    edge_of_domain: 'Borde del dominio',
    out_of_domain: 'Fuera del dominio',
    inShort: 'Química conocida',
    edgeShort: 'Química relacionada',
    outShort: 'Química desconocida',
  },

  efficiency: {
    veryHigh: 'Inhibición muy alta',
    high: 'Inhibición alta',
    moderate: 'Inhibición moderada',
    low: 'Inhibición baja',
    none: 'Inhibición escasa o nula',
  },

  method: {
    eyebrow: 'Método',
    title: 'La eficiencia depende de las condiciones. Por eso el modelo las recibe.',
    lead: 'La mayoría de los modelos estructura–propiedad publicados predicen solo a partir de la estructura molecular, mientras que la eficiencia con la que se entrenan depende de la temperatura, la concentración, la duración y el sustrato. Este proyecto conservó esas condiciones y se las entregó al modelo. Esa decisión es la investigación.',
    s1h: 'Tres conjuntos de datos, un esquema',
    s1p: 'Inhibitor 1368, DataCor aluminio y la base Excorr: 7991 mediciones brutas armonizadas a una escala común, con SMILES canonicalizados y sales eliminadas.',
    s2h: 'Deduplicar sin descartar las condiciones',
    s2p: 'Un pipeline anterior promediaba cada molécula sobre todas las condiciones, reduciendo unas 8000 filas a 717. Usar como clave molécula, metal, temperatura, duración y concentración preserva las mediciones distintas y arroja 5170 filas utilizables.',
    s3h: '220 variables',
    s3p: '209 descriptores RDKit no constantes, más temperatura, duración, log₁₀ de la concentración, un indicador de ausencia para cada uno y un sustrato codificado one-hot.',
    s4h: 'Dos particiones de evaluación, siempre reportadas juntas',
    s4p: 'Validación cruzada aleatoria de cinco bloques y partición por esqueleto de Bemis–Murcko, donde las moléculas que comparten núcleo permanecen en el mismo bloque. La brecha entre ambas es el relato honesto.',
    statMeasurements: 'mediciones',
    statMolecules: 'moléculas únicas',
    statMetals: 'metales',
    statDescriptors: 'descriptores',
    statConditions: 'variables de condición',
    statPh: 'variables de pH',
    figure4:
      'El pipeline ejecutado, desde los tres conjuntos de datos fuente hasta la construcción del ensamblado y la calibración conforme.',
    figure4Alt:
      'Arquitectura del pipeline: tres conjuntos de datos fuente alimentan la inspección y el preprocesamiento hacia una tabla maestra, que alimenta el análisis de variables y cuatro flujos de modelado, que alimentan la construcción del ensamblado.',
    serving: 'Modelo servido',
    features: 'variables',
    seed: 'semilla',
    run: 'ejecución',
  },

  results: {
    eyebrow: 'Resultados',
    title: 'Dos cifras, nunca una.',
    leadA: 'El modelo obtiene',
    leadB: 'en una partición aleatoria y',
    leadC: 'en una partición por esqueleto. Ambas son ciertas y responden a preguntas distintas. Citar solo la primera sería la forma más fácil de inducirte a error, y esta página se niega a hacerlo.',
    randomTitle: 'Partición aleatoria — R² 0,806',
    randomBody:
      'Bloques tomados al azar. Una molécula de prueba puede ya aparecer en el entrenamiento bajo otras condiciones, así que esto mide cómo predice el modelo una nueva medición de una molécula que ya conoce. Útil, pero no es la pregunta que se hace un químico en fase de cribado.',
    scaffoldTitle: 'Partición por esqueleto — R² 0,310',
    scaffoldBody:
      'Las moléculas que comparten un núcleo de Bemis–Murcko permanecen en el mismo bloque, de modo que cada molécula de prueba es estructuralmente desconocida. Esto mide el rendimiento sobre química genuinamente nueva. Es la cifra que hay que citar para un candidato no ensayado, y la que este servicio usa siempre que tu molécula le resulta nueva.',
    ablationTitle: 'El resultado central',
    ablationLead:
      'El mismo bosque aleatorio, con y sin condiciones experimentales. La mejora es sistemática: se mantuvo en todos los modelos clásicos probados, lo que la convierte en señal y no en casualidad.',
    leaderboardTitle: 'Todos los modelos probados',
    leaderboardLead:
      'Cuatro familias de modelos en ambas particiones. El bosque aleatorio consciente de las condiciones gana en todas partes, incluso frente a las redes de grafos y al transformador ajustado, que solo leen la estructura.',
    unavailable: 'Métricas en vivo no disponibles — el servicio de predicción en',
    unreachable: 'no está accesible.',
    loading: 'Cargando métricas…',
  },

  charts: {
    structureOnly: 'Solo estructura',
    structurePlusConditions: 'Estructura + condiciones experimentales',
    structurePlusShort: 'Estructura + condiciones',
    randomSplit: 'Partición aleatoria',
    scaffoldSplit: 'Partición por esqueleto',
    randomSub: 'Nuevas mediciones de moléculas conocidas',
    scaffoldSub: 'Química genuinamente nueva',
    r2Note: 'R² — coeficiente de determinación, de 0 a 1. Cuanto más alto, mejor.',
    splitGroup: 'Partición de evaluación',
    scaffoldExplain:
      'Las moléculas que comparten un núcleo de Bemis–Murcko permanecen en el mismo bloque, de modo que cada molécula de prueba es estructuralmente nueva. Esta es la estimación honesta para un candidato desconocido.',
    randomExplain:
      'Los bloques se toman al azar, así que una molécula de prueba puede ya figurar en el entrenamiento bajo otras condiciones. Esto mide nuevas mediciones, no química nueva.',
    colModel: 'Modelo',
    colRepresentation: 'Representación',
    colMae: 'MAE',
    negative: 'negativo',
    tableCaption: 'Rendimiento de los modelos, ordenado por R².',
    ridgeNote:
      'Un R² negativo significa que el modelo predijo peor que limitarse a la media del corpus. La regresión ridge se desploma en las particiones por esqueleto porque descriptores no acotados como Ipc toman valores extremos en esqueletos desconocidos. Ese es justamente el desplazamiento de distribución que una partición por esqueleto sirve para revelar, no un defecto del pipeline.',
    raises: 'Aumenta la eficiencia predicha',
    lowers: 'Reduce la eficiencia predicha',
    condition: 'condición',
  },

  learned: {
    eyebrow: 'Interpretabilidad',
    title: '¿Aprendió química o solo aritmética?',
    lead: 'Los valores de Shapley sobre todo el corpus revelan en qué se apoya el modelo. La respuesta es tranquilizadora: la identidad del sustrato, el tamaño molecular y las condiciones de dosificación, que es lo que predeciría la ciencia de la corrosión.',
    figure7:
      'Resumen SHAP global para el bosque aleatorio ajustado. Cada punto es una molécula; la posición muestra el efecto sobre la eficiencia predicha.',
    figure7Alt:
      'Gráfico resumen SHAP. Las variables más fuertes son metal igual a aluminio, refractividad molar, log de la concentración, temperatura y duración, seguidas de descriptores de conectividad y de carga parcial.',
    i1h: 'El sustrato domina',
    i1p: 'Qué metal se está protegiendo es la variable más fuerte. El aluminio y el magnesio se comportan de forma suficientemente distinta al acero como para que el modelo los trate casi como problemas separados.',
    i2h: 'El tamaño gobierna la cobertura',
    i2p: 'La refractividad molar y los índices de conectividad ocupan los primeros puestos. Las moléculas más voluminosas cubren más superficie por molécula adsorbida: la imagen física que la ciencia de la corrosión ya sostiene.',
    i3h: 'La dosis y el calor importan, en ese orden',
    i3p: 'El log de la concentración supera a la temperatura, y ambos superan a la mayoría de los descriptores estructurales. Es la hipótesis de las condiciones confirmada desde dentro.',
    i4h: 'Aparecen los sitios ricos en electrones',
    i4p: 'Los descriptores de carga parcial y electrotopológicos aparecen por debajo de los líderes, coherentes con una adsorción a través de átomos donantes de nitrógeno, azufre y oxígeno.',
    footer:
      'La atribución muestra en qué se apoya el modelo. Es evidencia de que aprendió algo físicamente sensato, no una medición de la química de adsorción en sí.',
  },

  limits: {
    eyebrow: 'Límites',
    title: 'Dónde deja de funcionar este modelo.',
    leadA: 'Cada punto aquí es uno que un examinador tendría que encontrar por su cuenta. Una incertidumbre calibrada de',
    leadB: 'puntos de eficiencia con una cobertura empírica del',
    leadC: 'es amplia — y declararlo con claridad es precisamente la intención.',
    l1h: 'La brecha por esqueleto es grande y no se cerró',
    l1p: 'Las condiciones elevaron el R² por esqueleto de 0,124 a 0,310: real, pero muy por debajo del 0,806 de la partición aleatoria. Conocer las condiciones no sustituye a haber visto la química.',
    l2h: 'Falta la duración en el 46 % del corpus',
    l2p: 'La imputación con indicador de ausencia es contabilidad honesta, pero no puede recuperar información que nunca se midió.',
    l3h: 'El pH se excluye por diseño',
    l3p: 'Solo está registrado en el 32 % de las filas y se conserva únicamente para análisis. Incluirlo habría supuesto imputar la mayoría de la columna.',
    l4h: 'El hierro y el acero al carbono siguen separados',
    l4p: 'El acero al carbono es a base de hierro y ambos suelen ensayarse en medio ácido, pero las fuentes no registran la distinción de forma fiable. Fusionarlos en un único grupo ferroso es una decisión científica abierta, deliberadamente sin resolver.',
    l5h: 'El ajuste fueron 10 ensayos, no validación cruzada anidada',
    l5p: 'Una búsqueda Optuna directa sobre el objetivo por esqueleto. La curva de ajuste se mantuvo plana en todos los ensayos, así que el modelo no está limitado por sus hiperparámetros — pero la metodología califica la validación cruzada anidada como prevista, no realizada.',
    l6h: 'Esto no sustituye a los ensayos',
    l6p: 'Es un demostrador de investigación para cribado y clasificación. Las mediciones de pérdida de masa y electroquímicas siguen siendo la evidencia.',
  },

  batch: {
    eyebrow: 'Lote',
    title: 'Clasifica toda una serie de candidatos.',
    lead: 'Sube un CSV de moléculas bajo una misma condición de servicio y recíbelas ordenadas por eficiencia predicha, cada una con su banda y su veredicto de confianza.',
    panelTitle: 'Cribar una serie',
    panelLead:
      'Sube un CSV para clasificar candidatos bajo una misma condición de servicio. Los descriptores se almacenan en caché por molécula única y el bosque se invoca una sola vez para todo el archivo.',
    template: 'Descargar plantilla',
    choose: 'Elegir un archivo CSV',
    reading: 'Leyendo el archivo…',
    predicted: 'predichas',
    failed: 'fallidas',
    download: 'Descargar resultados',
    colMolecule: 'Molécula',
    colReading: 'Lectura',
    colTrust: 'Confianza',
    tableCaption: 'Resultados del lote, ordenados por eficiencia predicha.',
    row: 'fila',
  },

  figures: {
    eyebrow: 'Apéndice',
    title: 'Figuras de la ejecución.',
    lead: 'Producidas directamente por el notebook, reproducidas aquí sin alterar.',
    f1: 'Distribuciones brutas del objetivo en los tres conjuntos de datos fuente, antes de la armonización.',
    f3: 'Distribución armonizada de la eficiencia tras canonicalización, deduplicación y selección de metales.',
    f5: 'Los 30 mejores descriptores por información mutua con el objetivo.',
    f6: 'Correlación entre los descriptores principales, que revela redundancia en las familias de tamaño y conectividad.',
    f8: 'Saliencia atómica por gradientes integrados en la red de paso de mensajes.',
    f9: 'Propagación de la atención sobre una cadena SMILES por el ChemBERTa ajustado.',
    f10: 'Predicciones con intervalos conformes al 90 % frente a los valores observados.',
  },

  colophon: {
    author: 'Autora',
    supervisor: 'Director de tesis',
    coSupervisor: 'Codirector',
    institution: 'Institución',
    provenance: 'Procedencia',
    modelVersion: 'Versión del modelo',
    sourceRun: 'Ejecución fuente',
    seed: 'Semilla',
    modelHash: 'SHA-256 del modelo',
    unavailable: 'Servicio no disponible.',
    provenanceNote:
      'Cada artefacto se verifica contra un manifiesto SHA-256 antes de que el servicio arranque. Las citas de los conjuntos de datos aún se están rastreando; los tres conjuntos fuente se enlazan en lugar de redistribuirse.',
  },

  cite: {
    eyebrow: 'Cita',
    title: 'Cómo citar este trabajo.',
    lead: 'Aquí se pueden citar tres cosas, y no son intercambiables: la investigación en sí, el software que la sirve y una predicción concreta que hayas obtenido de él.',

    thesisTitle: 'Citar la investigación',
    thesisBody: 'Cita la tesis cuando te refieras al método, al corpus o al hallazgo de que las condiciones experimentales portan la señal. Confirma el año y el estado de defensa antes de enviar: el año que aparece abajo es el actual, no una fecha de publicación verificada.',

    softwareTitle: 'Citar el software',
    softwareBody: 'Cita la herramienta cuando la hayas usado para producir cifras. La versión importa: una versión posterior del modelo daría respuestas distintas, así que fija la que realmente usaste.',

    reproTitle: 'Citar una predicción',
    reproBody: 'Esta es la parte que suele omitirse. Una predicción solo es reproducible si el lector sabe qué artefacto la produjo, así que este bloque lleva la versión del modelo en servicio, su SHA-256 y las versiones fijadas de las bibliotecas. Pégalo en tu sección de métodos.',
    methodsParagraph: 'Párrafo de métodos',

    copy: 'Copiar',
    copied: 'Copiado',

    dataEyebrow: 'Datos',
    dataTitle: 'Citar los conjuntos de datos fuente.',
    dataBody: 'El corpus se armonizó a partir de tres conjuntos de datos públicos. Pertenecen a sus autores originales y aquí se enlazan en lugar de redistribuirse.',
    dataGapTitle: 'Referencias aún en rastreo',
    dataGapBody: 'Las publicaciones originales de estos tres conjuntos aún no se han confirmado, así que no se imprime ninguna referencia aquí en lugar de imprimir una que podría ser errónea. Si usas el corpus, rastrea cada conjunto hasta su publicación fuente y cítala directamente.',
    dsInhibitor: '1364 entradas de acero al carbono en HCl 1 M, con descriptores cuánticos.',
    dsDatacor: '2011 mediciones en diecisiete sustratos de aluminio, con condiciones por fila.',
    dsExcorr: '4616 entradas que abarcan hierro, aluminio, magnesio, cobre y cinc.',
    citationPending: 'Referencia pendiente',

    licenceEyebrow: 'Términos',
    licenceTitle: 'Licencia y contacto.',
    licenceBody: 'El código es abierto. Los conjuntos de datos conservan sus licencias originales y no se redistribuyen.',
    codeLicence: 'Licencia del código',
    contact: 'Contacto',
  },

  history: {
    eyebrow: 'Actividad',
    title: 'Qué se le ha pedido a este servicio.',
    lead: 'Cada predicción se registra con la versión del modelo que la produjo, de modo que cualquier resultado puede rastrearse hasta un artefacto exacto. Solo se muestra la molécula canónica.',
    emptyTitle: 'Aún no hay registros',
    emptyBody: 'Las predicciones aparecerán aquí en cuanto el servicio haya atendido alguna. Haz una y vuelve.',
    tableCaption: 'Predicciones servidas recientemente, las más nuevas primero.',
    colWhen: 'Cuándo',
    rows: 'entradas',
  },

  metals: {
    aluminium: 'Aluminio',
    carbon_steel: 'Acero al carbono',
    copper: 'Cobre',
    iron: 'Hierro',
    magnesium: 'Magnesio',
  },
}
