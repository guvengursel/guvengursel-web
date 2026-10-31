# guvengursel.com

Personal site for Güven Gürsel — operations background, digital toolset, one goal: make the work flow.

→ [guvengursel.com](https://guvengursel.com)

## Stack

[Astro 7](https://astro.build) + vanilla CSS. No Tailwind, no UI kit, no third-party scripts.

- **Working voice:** DM Mono 300 / 400 (self-hosted, [SIL OFL](https://scripts.sil.org/OFL))
- **Headings:** Archivo 600 (self-hosted, [SIL OFL](https://scripts.sil.org/OFL))
- **Human output:** Cormorant Garamond 300 italic (self-hosted, [SIL OFL](https://scripts.sil.org/OFL))
- **Release target:** changes are promoted to the separate `guvengursel-web` production repository; only that repository deploys to Cloudflare Pages
- **Design:** Forward Pass — neural sampler identity, neon duo-tone, dark-only. Doctrine lives in [docs/design-system.md](./docs/design-system.md).

## Local dev

```sh
npm install
npm run dev          # localhost:4321
npm run build        # ./dist/
npm run build:assets # regenerate tracked PNGs from path-only SVGs
npm run verify       # check, asset drift, build, audit
npm run preview      # serve ./dist/
```

Requires Node 22.12+.

## Brand assets

`public/og-image.svg` and `public/favicon.svg` are the verified development sources to promote with an approved release to `guvengursel-web`. Their text is outlined as SVG paths so Sharp/librsvg never depends on host fonts. After editing either source, run `npm run build:assets`, then `npm run verify`. Do not add SVG `<text>` nodes; the asset build rejects them. See [ADR 0001](./docs/adr/0001-deterministic-brand-assets.md) for the cross-host determinism decision.

## Release boundary

This repository never deploys directly to Cloudflare. Development changes are tested and reviewed here, then explicitly promoted to the separate `guvengursel-web` production repository. Cloudflare deploys only from that repository. The promotion mechanism must be verified before a release; do not infer deployment from a `guvengursel-dev` push.

## Structure

```text
src/
├── layouts/Layout.astro   # head, chrome, language notice
├── pages/                 # file-based routes (root + /tr/, /de/)
├── i18n/                  # locale helpers + translated copy
└── styles/                # section stylesheets; global.css composes them in cascade order
public/
├── fonts/                 # 8 woff2 — 3 families, latin + ext (self-hosted)
└── favicon.svg
```

## What this site doesn't do

No analytics. No tracking pixels. No advertising networks. No cookies. No fingerprinting. No A/B tests. The only persistent client-side data is the homepage console's sampler state (`temp`, `topp`, `auto`) and a flag for dismissed language notices, stored in `localStorage` on your device.

## License

[MIT](./LICENSE) — code. Content (writing, design choices) belongs to Güven Gürsel; brand and font assets to their respective owners.
