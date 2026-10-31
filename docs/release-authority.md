# Release Authority Contract

Status: Phase 1 candidate contract. This document does not authorize a release.

## Repository roles

- `guvengursel-dev` is the private canonical development source.
- `guvengursel-web` is the public release repository used by Cloudflare Pages.
- A clean development commit is not automatically a public release.

## Candidate requirements

A release candidate must bind:

1. the exact source commit and tree;
2. the exact generated static output hash;
3. a successful canonical verification run;
4. mobile and desktop browser acceptance;
5. a read-back of the target preview or public endpoint;
6. explicit approval for the exact artifact being promoted.

## Promotion boundary

Promotion is a separate operation from development. It must copy only the
approved public source and generated output required by the release contract.
Private configuration, credentials, evidence archives, working notes, and
internal topology must not enter the public repository.

## Proposed release sequence

1. Freeze the reviewed development candidate.
2. Build from the frozen candidate.
3. Verify source and generated-output contracts.
4. Produce an immutable preview release.
5. Obtain browser acceptance for the exact preview.
6. Request explicit approval for the exact public release artifact.
7. Promote to `guvengursel-web` only after approval.
8. Verify Cloudflare and the public domain by read-back.

Before any consultancy-oriented public promotion, obtain a current
legal-completeness review for the operator/contact disclosure and the intended
commercial posture. The provisional wording on the site is not a substitute
for that review.

No `git push`, public repository mutation, Cloudflare deployment, Caddy change,
cron activation, social publication, or other external publication is
authorized by this document.
