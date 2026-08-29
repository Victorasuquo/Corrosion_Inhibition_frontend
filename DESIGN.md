# Design

<!-- impeccable:design-schema 1 -->

## The world: a colorimetric comparator card

Inhibiepdt is dressed as the instrument its audience already reads — a **printed colorimetric
comparator card**, the object a chemist holds against a sample to read a value by matching it
to reference patches.

That is not a metaphor borrowed for atmosphere. It is the correct instrument for this product,
for one reason: **on a comparator card the colour is the measurement, not decoration.** And
inhibition efficiency genuinely lives on a physical colour axis — iron-oxide rust at 0% (the
metal corroding) through to passivation green at 100% (the metal protected). The chemistry
supplies the ramp; the design does not invent it.

Two consequences follow, and they are the whole system:

1. **A reading is a band, never a point.** Nobody reads an indicator strip to three decimal
   places; they read it as sitting *between* two patches. The ±19.52 IE-point conformal
   interval is therefore drawn as the literal width of the band on the scale. Uncertainty is
   built into the primary reading device instead of appended as a caveat.
2. **The green end is passivation, not branding.** `#008751` is the colour of copper patina
   and of a passivated surface — the ramp's top stop is chosen from the chemistry, and every
   other colour in the system is derived from that same axis rather than from a brand palette.

**What this refuses:** the AI-product landing page (gradient hero, three feature cards, a
dashboard screenshot on a slab), and its predictable opposite, the paper-as-website (cream
ground, high-contrast serif display, hairline rules).

## Ground

**Light, committed, single-mode.** The physical scene is a printed card read under bench light
or thrown on a projector in a lit viva room. A printed object is not a dark interface; there is
no dark variant, and that is a decision, not an omission.

The ground is a cool printed card stock, never cream. Cream plus serif is the rut this world is
closest to falling into, and the comparator card is a cool, clinical, saturated object.

## Colour

**Strategy: full palette.** The IE ramp owns whole regions of the surface. It is the brand.

### The reading ramp — the one non-negotiable sequence

Ordered by inhibition efficiency. Every prediction, gauge, chart series and status colour
derives from this and nothing else.

| Stop | Token | Hex | Meaning |
|---|---|---|---|
| 0% | `--ie-00` | `#7B2E12` | Iron(III) oxide — active corrosion |
| 20% | `--ie-20` | `#B4551F` | Oxide orange — poor inhibition |
| 40% | `--ie-40` | `#C08A2E` | Brass edge — partial film |
| 60% | `--ie-60` | `#7E9A52` | Onset of passivation |
| 80% | `--ie-80` | `#2E8B7A` | Verdigris — protective film |
| 100% | `--ie-100` | `#008751` | Passivation green — fully protected |

The ramp is ordered by efficiency and must never be reordered, recoloured, or used for
categorical data. Its scope is the *reading* devices — the comparator strip, the prediction
gauge, and status — not chart series; see "Chart colour" below for why, and for the validated
categorical set that comparison charts use instead.

### Ground and ink

| Token | Hex | Use |
|---|---|---|
| `--card` | `#F4F5F2` | Page ground — printed card stock, cool not cream |
| `--card-2` | `#E8EAE5` | Recessed panels, table stripes |
| `--ink` | `#171A18` | Primary text — printing ink, never pure black |
| `--ink-2` | `#4A514C` | Secondary text |
| `--ink-3` | `#7C847E` | Labels, captions, axis text |
| `--rule` | `#C9CEC7` | Registration rules and borders |
| `--steel` | `#3C4A52` | Substrate/metal chrome, structural fields |

### Applicability-domain status

Status colours are drawn from the ramp, so trust and efficiency read on one visual logic.

- `in_domain` → `--ie-100`
- `edge_of_domain` → `--ie-40`
- `out_of_domain` → `--ie-00`

## Type

- **Display and UI: Archivo.** An industrial grotesque with the flat authority of printed
  instrument labelling. Used tight and wide, never a decorative serif.
- **Readings and data: Azeret Mono.** Every number a user reads as a *measurement* — the
  prediction, the interval bounds, R², Tanimoto, axis ticks, SMILES — is set in mono. This is
  the rule that keeps the instrument feeling calibrated: prose is Archivo, measurements are
  Azeret Mono.
- Patch labels and scale ticks are uppercase, tracked `+0.08em`, small. That tracked-caps label
  is the comparator card's native lettering.

## Composition

- **Registration marks and rules.** Panels are bounded by 1px `--rule` borders with corner
  registration ticks, like a printed card's trim marks. No soft drop shadows; a printed card
  has no elevation.
- **The patch strip is the recurring device.** Discrete colour patches in a row, with an
  indicator marking where a reading lands. It appears as the hero gauge, as the ablation
  comparison, and as a sparkline in the batch table.
- **Squared corners.** Radius 0 to 2px only. Rounded cards belong to the world this refuses.
- One spacing rhythm on a 4px base; more space above a heading than below it.

## Motion

The card's native motion is a **reading settling** — an indicator sliding to its value and
coming to rest, the way a needle or a matched patch resolves. One orchestrated motion, used on
prediction arrival. No scattered hover effects, no parallax. `prefers-reduced-motion` renders
the settled state directly.

## Accessibility

- Colour is never the sole carrier of meaning: every AD verdict and every ramp reading also
  carries a text label and a numeric value.
- Body text meets WCAG AA on `--card`. `--ink-3` is restricted to non-essential labelling at
  12px+ where it still clears 4.5:1.
- The ramp's mid stops are light; text placed on `--ie-40` or `--ie-60` uses `--ink`, not white.

## Chart colour — validated

Two colour jobs, kept strictly separate. Validated with the dataviz skill's
`validate_palette.js` against surface `#f4f5f2`.

### Categorical (identity) — fixed order, never cycled

| Slot | Hex | Used for |
|---|---|---|
| 1 | `#0b8a53` | Passivation green — the condition-aware model, the winning entity |
| 2 | `#3a7cb8` | Steel blue |
| 3 | `#bf4f1c` | Oxide orange |
| 4 | `#8f57a6` | Violet |

All six checks PASS: lightness band, chroma floor, CVD separation (worst adjacent
ΔE 15.7 deutan), normal-vision floor (ΔE 17.8), contrast ≥ 3:1. The order matters —
green and orange are deliberately non-adjacent, which is what lifts CVD separation
from a 7.3 WARN to a 15.7 PASS.

### The IE ramp — a reading scale, not a chart encoding

The rust→passivation ramp is multi-hue and therefore is **never** used to encode
series in a comparison chart. It is used only where it functions as its own legend:
the comparator strip and the prediction gauge, where the numeric value and a text
label always sit beside the colour. This is the deliberate, bounded exception, and it
is the product's thesis: on a comparator card the colour is the measurement.

### Diverging (SHAP contributions)

Two poles and a neutral midpoint: `#0b8a53` raises the predicted efficiency,
`#bf4f1c` lowers it, with `--rule` grey at zero. No hue at the midpoint.
