# ADR 0001: Use outlined SVG text for deterministic brand assets

- Status: Accepted
- Date: 2026-07-14

## Context

`public/og-image.png` and `public/apple-touch-icon.png` are generated from SVG sources with Sharp/librsvg. The original SVGs used `<text>` with system font stacks. Linux substituted missing Consolas and Georgia faces, so tracked PNGs drifted when regenerated.

Embedding the repository WOFF2 files through SVG `@font-face` data URIs was tested and rejected. librsvg did not load those webfonts consistently: the native Linux host, GitHub Actions `ubuntu-latest`, and a clean Node 22 Docker container produced different PNG hashes. GitHub Actions run `29343370415` exposed the cross-host failure.

## Decision

Brand SVG text is stored as outlined `<path>` geometry in `public/og-image.svg` and `public/favicon.svg`. The outlines were shaped from the repository's DM Mono 400 and Cormorant Garamond 300 regular/italic files.

`scripts/build-assets.mjs` rejects any `<text>` node before rendering. `scripts/verify.sh` regenerates both PNGs and fails when they differ from the tracked outputs.

## Consequences

- PNG generation no longer depends on installed fonts, fontconfig, or librsvg webfont support.
- Local Linux and a clean Node 22 Docker container produce byte-identical PNGs.
- Brand copy or typography changes require regenerating the SVG outlines with an outline-capable font tool, then running `npm run build:assets` and `npm run verify`.
- The outlined SVG source is less human-readable, but it is the portable asset source promoted from this development repository to the separate production repository.

## Rejected alternatives

1. System font stacks: rejected because font availability differs by host.
2. SVG `@font-face` with embedded WOFF2 data URIs: rejected because librsvg silently fell back to host fonts.
3. Accepting host-specific PNG drift: rejected because CI could not verify tracked assets reliably.
