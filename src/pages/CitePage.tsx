import { useState } from 'react'

import type { ModelInfo } from '@/lib/api'
import { ATTRIBUTION, PERFORMANCE, PRODUCT_NAME, THESIS_TITLE } from '@/lib/constants'
import type { Translations } from '@/i18n/config'
import { Section } from '@/components/Shell'

interface Props {
  t: Translations
  model: ModelInfo | null
}

/**
 * How to cite the work, the tool, and — the part usually missing — a specific
 * prediction.
 *
 * A prediction is only reproducible if the reader knows which artefact produced it.
 * The reproducibility block therefore carries the live model version, the artefact
 * hash and the pinned library versions, read from the running service rather than
 * typed in by hand.
 */
export default function CitePage({ t, model }: Props) {
  const year = new Date().getFullYear()
  const accessed = new Date().toISOString().slice(0, 10)
  const site = typeof window !== 'undefined' ? window.location.origin : ''
  const version = model?.version ?? '2.0.0'
  const hash = model?.provenance.artifact_hashes['model.joblib'] ?? '—'
  const run = model?.provenance.source_run ?? 'run_20260923_134752'
  const seed = model?.provenance.seed ?? 42
  const rdkit = model?.provenance.rdkit_runtime ?? '2026.03.6'
  const sklearn = model?.provenance.pins['scikit-learn'] ?? '1.8.0'
  const groupedR2 = model?.performance.grouped_molecule.r2 ?? PERFORMANCE.groupedMolecule.r2
  const scaffoldR2 = model?.performance.scaffold_split.r2 ?? PERFORMANCE.scaffold.r2
  const halfWidth = model?.calibration.half_width_ie_points ?? PERFORMANCE.intervalHalfWidth

  const surname = ATTRIBUTION.author.split(' ').slice(-1)[0]
  const initials = ATTRIBUTION.author
    .split(' ')
    .slice(0, -1)
    .map((n) => `${n[0]}.`)
    .join(' ')

  const thesisApa = `${surname}, ${initials} (${year}). ${THESIS_TITLE} [Doctoral thesis, ${ATTRIBUTION.institution}].`

  const thesisBibtex = `@phdthesis{${surname.toLowerCase()}${year}inhibiepdt,
  author      = {${ATTRIBUTION.author}},
  title       = {${THESIS_TITLE}},
  school      = {${ATTRIBUTION.institution}, ${ATTRIBUTION.department}},
  year        = {${year}},
  type        = {Doctoral thesis}
}`

  const softwareApa = `${surname}, ${initials} (${year}). ${PRODUCT_NAME} (Version ${version}) [Computer software]. ${ATTRIBUTION.institution}. ${site}`

  const softwareBibtex = `@software{${surname.toLowerCase()}${year}${PRODUCT_NAME.toLowerCase()},
  author  = {${ATTRIBUTION.author}},
  title   = {{${PRODUCT_NAME}}: condition-aware prediction of organic corrosion inhibition efficiency},
  version = {${version}},
  year    = {${year}},
  url     = {${site}},
  note    = {Model artefact SHA-256 {${hash}}}
}`

  const rows = model?.training.rows ?? PERFORMANCE.rows
  const molecules = model?.training.molecules ?? PERFORMANCE.molecules

  const reproducibility = `Predictions were obtained with ${PRODUCT_NAME} v${version} (${site}, accessed ${accessed}).
The served model is a random forest (250 trees, maximum depth 31) over 283 features:
211 non-constant RDKit descriptors, seven numeric experimental conditions with their
missingness indicators, and one-hot encodings of base metal, alloy designation,
measurement methodology and pH provenance, plus a synergist flag. It was trained on
${rows.toLocaleString()} measurements of ${molecules.toLocaleString()} molecules across four base metals
(Al, Cu, Fe, Mg), from run ${run} with seed ${seed}.
Reported performance is R2 = ${groupedR2} under a five-fold split grouped by molecule,
so that no test molecule appears in training, and R2 = ${scaffoldR2} under a
Bemis-Murcko scaffold five-fold split, which is the appropriate estimate for a
structurally novel candidate. A third figure of R2 = 0.817 appears in the research
notebook; it comes from a row-wise control split in which 94.5% of test molecules had
already been seen in training and is not a valid estimate of generalisation.
Predictions carry split-conformal intervals of +/-${halfWidth} inhibition-efficiency
points at 90% nominal coverage (${((model?.calibration.empirical_coverage ?? PERFORMANCE.intervalCoverage) * 100).toFixed(1)}% empirical).
Featurisation used RDKit ${rdkit} and scikit-learn ${sklearn}.
Model artefact SHA-256: ${hash}.`

  return (
    <>
      <Section eyebrow={t.cite.eyebrow} title={t.cite.title} lead={t.cite.lead}>
        <div className="space-y-10">
          <Citation
            t={t}
            heading={t.cite.thesisTitle}
            body={t.cite.thesisBody}
            entries={[
              { label: 'APA', text: thesisApa },
              { label: 'BibTeX', text: thesisBibtex, mono: true },
            ]}
          />

          <Citation
            t={t}
            heading={t.cite.softwareTitle}
            body={t.cite.softwareBody}
            entries={[
              { label: 'APA', text: softwareApa },
              { label: 'BibTeX', text: softwareBibtex, mono: true },
            ]}
          />

          <Citation
            t={t}
            heading={t.cite.reproTitle}
            body={t.cite.reproBody}
            entries={[{ label: t.cite.methodsParagraph, text: reproducibility, mono: true }]}
          />
        </div>
      </Section>

      <Section tone="sunk" eyebrow={t.cite.dataEyebrow} title={t.cite.dataTitle} lead={t.cite.dataBody}>
        <div className="panel p-6 sm:p-7" style={{ borderColor: '#c08a2e' }}>
          <h3 className="patch-label mb-3" style={{ color: '#c08a2e' }}>
            {t.cite.dataGapTitle}
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-ink-2">{t.cite.dataGapBody}</p>
        </div>

        <ul className="mt-6 grid gap-px bg-rule sm:grid-cols-3">
          {[
            { name: 'Inhibitor 1368', note: t.cite.dsInhibitor },
            { name: 'DataCor (aluminium)', note: t.cite.dsDatacor },
            { name: 'Excorr', note: t.cite.dsExcorr },
          ].map((dataset) => (
            <li key={dataset.name} className="bg-card p-6">
              <h4 className="font-display text-base font-700">{dataset.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{dataset.note}</p>
              <p className="patch-label mt-4 text-ink-3">{t.cite.citationPending}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow={t.cite.licenceEyebrow} title={t.cite.licenceTitle} lead={t.cite.licenceBody}>
        <dl className="grid gap-px bg-rule sm:grid-cols-2">
          <div className="bg-card p-6">
            <dt className="patch-label mb-2 text-ink-3">{t.cite.codeLicence}</dt>
            <dd className="text-sm text-ink-2">MIT</dd>
          </div>
          <div className="bg-card p-6">
            <dt className="patch-label mb-2 text-ink-3">{t.cite.contact}</dt>
            <dd className="text-sm text-ink-2">
              {ATTRIBUTION.author} · {ATTRIBUTION.department}, {ATTRIBUTION.institution}
            </dd>
          </div>
        </dl>
      </Section>
    </>
  )
}

/* -------------------------------------------------------------------------- */

interface Entry {
  label: string
  text: string
  mono?: boolean
}

function Citation({
  t,
  heading,
  body,
  entries,
}: {
  t: Translations
  heading: string
  body: string
  entries: Entry[]
}) {
  return (
    <div>
      <h3 className="font-display text-lg font-700">{heading}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-2">{body}</p>
      <div className="mt-5 space-y-4">
        {entries.map((entry) => (
          <CopyBlock key={entry.label} t={t} entry={entry} />
        ))}
      </div>
    </div>
  )
}

function CopyBlock({ t, entry }: { t: Translations; entry: Entry }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(entry.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access can be blocked; the text is selectable either way.
    }
  }

  return (
    <div className="panel">
      <div className="flex items-center justify-between border-b border-rule px-4 py-2">
        <span className="patch-label text-ink-3">{entry.label}</span>
        <button
          type="button"
          onClick={copy}
          className="patch-label border border-rule px-2.5 py-1.5 text-ink-2 transition-colors hover:border-ink hover:text-ink"
        >
          {copied ? t.cite.copied : t.cite.copy}
        </button>
      </div>
      <pre
        dir="ltr"
        className={`overflow-x-auto px-4 py-3.5 text-xs leading-relaxed text-ink ${
          entry.mono ? 'font-mono' : 'whitespace-pre-wrap font-sans'
        }`}
      >
        {entry.text}
      </pre>
    </div>
  )
}
