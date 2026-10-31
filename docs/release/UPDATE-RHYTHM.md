# Regular update rhythm — Forward Pass

After the first public promotion, keep changes small and the path fixed.

## Loop

1. **Edit** only in `guvengursel-dev` (private source).
2. **Lock** with `npm run verify` on a native filesystem (evo-x2 or Legion clone — not SFTP `npm ci`).
3. **Preview** with `npx astro preview` (or a Cloudflare Pages preview branch if used).
4. **Promote** the approved public Astro tree to `guvengursel/guvengursel-web` `main` (never push `guvengursel-dev` as the Pages source).
5. **Confirm** Cloudflare Pages deployment status = success, then read-back `guvengursel.com` (and `/tr/`, `/de/` when those pages changed).

## Do not

- Point Pages at the private `guvengursel-dev` repo.
- Promote with a dirty lockfile (`package.json` / `package-lock.json` out of sync) — that is what failed the May 2026 AgentHub deploy.
- Ship placeholders, lorem, or unowned product claims.
- Treat architecture deepening (route inventory, Layout chrome extract, Stage CSS merge) as a release gate unless promote friction demands it.

## Creative iteration backlog (non-blocking)

Use this as a menu after live, not as go-live debt:

- Homepage Stage: haiku sets, seeds, default temperature / top-p, which “Human output” moments earn motion
- About / contact voice: shorter, more specific, still Forward Pass (no card/stat clutter)
- tr/de quality pass: same voice, not literal translate; DE progressive drafts first
- Vibe Lab / blog: when to add a second experiment or post vs keep one strong piece
- Visual rhythm: pick winning motion moments; avoid stacking more effects

## Rollback

Cloudflare Pages → Deployments → roll back to the last successful production deployment if a promote misbehaves.
