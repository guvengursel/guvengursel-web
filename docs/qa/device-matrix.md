# QA Device Matrix — Runbook

How the site is verified across viewports before it is called done.
Tooling: `astro build` → `astro preview` → browser automation (viewport
emulation + screenshots) + vision passes + DOM state reads. No new
packages; everything rides the existing toolchain.

## Matrix

| Viewport | Class | Routes |
| --- | --- | --- |
| 360×760 | small Android | `/` only (stress) |
| 390×844 | phone | all |
| 768×1024 | tablet portrait | all |
| 1180×820 | tablet landscape | spot |
| 1280×800, 1440×900, 1920×1080 | desktop | all at 1440; spot at others |

"All" = `/`, `/about`, `/blog`, `/blog/<post>`, `/contact`, `/vibe-lab`,
`/impressum`, `/privacy`, `/tr/`, `/tr/about`, `/de/`, `/de/about`, plus a
deliberate 404.

## Checks per route

1. **Render**: navigation completes; screenshot bytes > 0.
2. **Vision pass** (key frames): fonts loaded (no fallback serif), contrast,
   no horizontal overflow, no overlap, scrim readability on `/`.
3. **DOM state** (homes): `[data-temp-readout]` = 0.70, `--temp/--topp` set,
   `data-init=1`, `is-live` arrives (allow ≥6s in background-throttled tabs).
4. **Links**: `node scripts/qa-links.mjs` after every build.
5. **Interactions** (one desktop + one phone pass): sample → wave + poem,
   reseed → sweep + topology change, auto → drift, language switch →
   context-preserving navigation (ClientRouter rebinds the console).

## Known environmental notes

- The in-app browser's screenshot capture occasionally fails transiently
  ("activity capture failed"); a retry in the same tab recovers. Route-level
  failures that persist across ≥3 retries in one viewport but succeed in
  others are treated as pipe flakes, not site defects, and are re-verified
  via DOM state.
- Background tabs throttle timers: `is-live` (1100ms timeout) can land late.
  Verify with a 6s wait before concluding a binding failure.
- Kill stale `astro preview` processes before probing a port — an orphaned
  server happily serves a previous build's routes (this once produced
  phantom 404s).
- Firefox flags every font preload as "not used within a few seconds"
  after ClientRouter (view-transition) navigations — including the body
  face, which is always in use. Accounting artifact on fonts already in
  the memory cache from the previous page; the preloads match real
  per-page usage. Discriminating test: hard reload (Ctrl+Shift+R) — the
  warnings vanish on a fresh load. Chrome does not emit them.
- Firefox logs `Error in parsing value for ‘-webkit-text-size-adjust’
  Declaration dropped` against the minified CSS — a known cosmetic
  message for webkit-prefixed properties it does not implement. No
  effect on rendering.

## First-visit regression (keep forever)

Every console/storage read must treat a missing key as absent:
`Number(localStorage.getItem(x))` turns `null` into `0` and silently zeroes
the stage for first-time visitors. The canonical guard lives in
`StageScript.astro` — `raw === null ? NaN : Number(raw)`.
