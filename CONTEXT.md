# guvengursel.com

Personal site and writing surface for Güven Gürsel. This repository is the
development source; the production site is a separately promoted release.

## Identity

**Forward Pass**:
The site's design identity — a neural sampler's terminal: dark, neon
duo-tone, every element earning its place.
_Avoid_: Sumi (retired name; survives only as the `.sumi` shell class)

**Stage**:
The homepage's interactive sampling console — temperature, top-p,
autopilot, waveform, poem output.
_Avoid_: hero, demo

**Seed**:
The number fixing a generative visual's randomness so it renders
identically on every build. One seed per locale per visual.

**Blueprint**:
A documented, reusable page-skeleton pattern of the identity
(docs/design-system.md).

**Human output**:
Copy set in Cormorant italic — haiku, ledes, closers — reserved for the
moments the machine hands over to the person.

## Languages & routes

**Locale**:
en, tr, or de. English is the default locale at the root; the others live
under /tr/ and /de/.
_Avoid_: language, lang

**Base path**:
A route stripped of its locale prefix — what a page is, independent of
where it is served ('/', '/about', '/blog/<slug>').
_Avoid_: canonical URL

**Localized path**:
The URL a base path occupies in one locale ('/tr/about').

**Variant page**:
A base path that exists translated in a non-default locale — currently
'/', '/about', '/contact', '/vibe-lab', '/impressum', '/privacy' (ADRs
0006–0010).
_Avoid_: translated page, mirror

**Blog gating**:
/blog exists in a locale only once that locale has a published post;
until then the route is not built at all.

**Language notice**:
The banner offering the current page in the reader's language, shown only
when a variant exists (ADR 0007).

## Authority & release

**Development source**:
This repository. All testing, review, and approval happen here; it never
deploys.

**Production repo**:
guvengursel-web. Its main branch deploys to Cloudflare Pages.

**Promotion**:
The approved act of carrying a verified release from the development
source into the production repo. A push to the development source is
never a deployment.

## Portfolio transition

**River Runs Again (RRA)**:
Güven's consultancy. Owns "For Organizations" and "The Lab", visibly
endorsed from this site.
_Avoid_: sister site, sub-brand

**R0–R7**:
The sole active roadmap for the transition.
_Avoid_: B0–B9, C0–C6 (preserved lineage, non-executable)

**Evidence file**:
Untracked planning, presentation, or spike material kept as history.
Preserved, but never self-authorizing work.
