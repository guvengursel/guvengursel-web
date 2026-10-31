# Design System — Forward Pass Blueprints

Status: active (2026-08-28). Supersedes the implicit per-page class vocabulary;
Sumi G3 is retired (see git history and AGENTS.md).

## Identity in one paragraph

Dark terminal world (`#0b0e13`) with a cyan/magenta signal pair, DM Mono as the
working voice, Archivo 600 uppercase for headings, Cormorant italic reserved
for human output (haiku, ledes, closers). Every element earns its place; type
size, spacing, and weight carry hierarchy; motion is state feedback and
interaction choreography — never scroll-tied or parallax.

## Page blueprints

| Blueprint | Routes | Shape |
| --- | --- | --- |
| Stage | `/`, `/tr/` | Full-viewport generated neural field + sampling console (`Network.astro`, see homepage script) |
| Dossier | `/about`, `/tr/about`, `/agenthub` | `PageHeader` + `NetStrip` + numbered `Section` rows (meta rail beside content) |
| Ledger | `/uses` | `PageHeader` + `NetStrip` + numbered `Section` rows of `ChipGroup`s |
| Log | `/now`, `/tr/now`, future writing | `PageHeader` (stamp as kicker) + `NetStrip` + timestamped list / `EntryCard`s |
| Document | `/colophon`, `/impressum`, `/privacy` | Prose with `PageHeader`; sticky mini-TOC when length demands |
| Master-detail | `/vibe-lab`, future `/projects` | Two-pane index/detail (existing `.lab-*` system) |
| Pointer | `/contact`, `/404` | Small centered compositions |

Rules:

- Every non-Stage page opens with `PageHeader` — it guarantees the
  one-`<h1>`-per-page contract that `verify-built-site` enforces.
- One `NetStrip` per page, seeded per route (see seeds table in the source);
  it is a divider, not decoration density — do not add more.
- Numbered `Section` indices are zero-padded strings (`"01"`), rendered in
  `--accent-2`; labels are uppercase mono in `--pitch`.

## Components (`src/components/`)

- `PageHeader.astro` — props: `title` (required), `kicker?`, `lede?`.
- `Section.astro` — props: `index?`, `label?`; slot body. Dossier rhythm.
- `ChipGroup.astro` — props: `label`, `chips: string[]`.
- `SnapRow.astro` — scroll-snap strip; props: `label?` (aria). Children snap
  to the start edge. Native swipe, keyboard scrollable, zero JS.
- `EntryCard.astro` — props: `index`, `title`, `meta?`, `href?` (whole card
  becomes the link when present).
- `NetStrip.astro` — props: `seed`, `class?`. Build-time deterministic slice
  of the neural identity; never animated.
- `Network.astro` — Stage-only full field; see homepage for the console
  contract (joint sampler `eff = temp × top-p`, greedy spine, reseed sweep).

## Tokens

Single source: `src/styles/global.css`. Fluid type scale (`--step--2`…`--step-4`),
spacing (`--space-1…8`), radii, and the signal pair (`--accent`, `--accent-2`).
Light theme is the print variant (no glows, no scanlines).

## Interaction budget

- No canvas, no rAF loops at idle, no packages for UI.
- Loops allowed only while an explicit control drives them (autopilot rAF).
- Numeric readouts refresh at ≤4 Hz (`updateTexts` gate).
- CSS animations retarget in coarse buckets only (retargeting a running
  animation restarts it — see `--heat-time` bucketing).
- `prefers-reduced-motion` collapses everything to instant state changes.

## Adding a page

1. Pick the blueprint; if none fits, extend this document first.
2. Compose from the primitives; do not invent page-private layout CSS when a
  `bp-*` class exists.
3. Seed choice: any fixed integer, recorded in the page markup.
4. `npm run verify` must stay green (routing, language matrix, one-h1,
  deterministic assets).
