# Inhibiepdt

Web application for predicting the **corrosion inhibition efficiency (IE, %)** of an organic
molecule on a given metal under stated experimental conditions, with a calibrated uncertainty
band and an explicit applicability-domain verdict.

Frontend for the doctoral project *An Artificial Intelligence Driven Quantitative
Structure–Property Relationship Framework for the Prediction of Organic Corrosion Inhibition
Efficiency* — Anne Sylvanus Obot, Department of Chemistry, University of Uyo.

React 19 · TypeScript · Vite · Tailwind v4 · deploys to Vercel.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # point VITE_API_BASE_URL at your backend
npm run dev                    # http://localhost:5173
```

The backend must be running — see the `backend` repository. With it on
`http://localhost:8000` the default configuration works unchanged.

```bash
npm run check      # typecheck + lint + build
```

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8000` | Backend origin, no trailing slash |

On Vercel, set `VITE_API_BASE_URL` in **Project → Settings → Environment Variables** to the
deployed API origin, and add that Vercel domain to the backend's `CORS_ORIGINS`.

## Design

The visual world is a **printed colorimetric comparator card** — the instrument a chemist holds
against a sample to read a value by matching it to reference patches. That is not decoration:
on a comparator card the colour *is* the measurement, and inhibition efficiency genuinely lives
on a physical colour axis, from iron-oxide rust at 0% to passivation green at 100%.

Two consequences drive the whole interface:

1. **A reading is a band, not a point.** The ±19.52 IE-point conformal interval is drawn as the
   literal width of the readable band on the scale, because that is how an indicator strip is
   actually read. Uncertainty is part of the instrument, not a caveat beneath it.
2. **The green end is passivation, not branding.** `#008751` is the colour of copper patina and
   of a passivated surface, so the top of the ramp is fixed by the chemistry rather than chosen
   from a brand palette.

Full system in [`DESIGN.md`](./DESIGN.md). Chart palettes were validated with the `dataviz`
skill's `validate_palette.js` — all six checks pass, including colour-vision-deficiency
separation.

## Structure

```
src/
  App.tsx                    page composition, all eight sections
  components/
    ComparatorScale.tsx      the primary reading device
    Predictor.tsx            the five inputs and the result
    Charts.tsx               ablation, leaderboard, SHAP contributions
    BatchPanel.tsx           CSV upload and ranked results
  lib/
    api.ts                   Zod-validated backend client
    ramp.ts                  the IE colour ramp and domain styling
    charts.ts                validated categorical and diverging palettes
    constants.ts             product identity, attribution, examples, citations
public/figures/              figures from the executed research run
```

## What the interface refuses to do

- **It never quotes R² 0.806 alone.** Both splits appear together everywhere, and each
  prediction is told which R² it is entitled to based on its applicability domain.
- **It never invents a placeholder reading.** Before a prediction exists, the panel shows the
  bare reference scale with no value on it.
- **It never adds an input the model was not trained on.** Exactly five: SMILES, metal,
  temperature, duration, concentration. pH is excluded by design.
- **"Not recorded" is a real answer**, not a blank. The model was trained with was-missing
  indicators, so an unmeasured condition is handled the way training handled it.

## Accessibility

Colour never carries meaning alone — every domain verdict and ramp reading also carries a text
label and a numeric value. The design is committed light-only: a printed card is not a dark
interface, and that is a decision rather than an omission.

## Licence

MIT — see `LICENSE`.
