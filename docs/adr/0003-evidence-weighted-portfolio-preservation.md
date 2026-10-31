# ADR 0003: Adopt evidence-weighted portfolio governance and OAIS-inspired preservation

- Status: Accepted as the production-planning model; implementation is separately gated
- Date: 2026-07-31
- Decision owner: Güven Gürsel (Kaptan)
- Depends on: ADR 0002, endorsed dual-brand portfolio architecture
- Supersedes: date-only anti-stale rules and local brand documents acting as lifecycle authority
- Does not supersede: Legion project registry authority, project source authority, exact-artifact release gates, privacy, accessibility, or Hard Lines

## Context

ADR 0002 established a coherent dual-brand architecture, but the first B0-B9 plan remained a product roadmap rather than a complete production operating model.

A live reconciliation found that the canonical Legion registry classified `guvengursel-dev` as `maintained`, while the project-local brand index called it Active. The registry also permits exactly one active build. Therefore, local planning documents cannot grant Active lifecycle status.

The first plan also used elapsed-time rules to identify stale work, but did not account for evidence quality, confidence, uncertainty, maintenance cost, or strategic value. It preserved source, preview, and rollback identities, but did not define a long-term archive package, preservation metadata, independent restoration, copy topology, RPO/RTO, or integrity cadence.

A production-ready portfolio must answer four different questions:

1. What should receive attention now?
2. Which source and lifecycle state are authoritative?
3. Can an accepted release be understood and restored after current context disappears?
4. Can a public release be traced to exact source, build, archive, human approval, and rollback evidence?

## Decision

Adopt the governance and preservation model in `../brand-portfolio/GOVERNANCE-MODEL.md`.

### Authority

- Keep `/home/guven/projects/legion-project-registry/projects.json` as the only mutable portfolio lifecycle SSOT.
- Keep canonical Git worktrees as source authorities.
- Use Git history and immutable receipts as event history; do not create a competing portfolio database or JSONL state log.
- Treat `INDEX.md` as a compact projection that must match the registry.
- Do not classify River Runs Again as a registry project until canonical source exists and the registry admission transaction passes.

### Mathematical decision support

- Use AHP to make policy weights explicit and check their consistency.
- Use evidence grades E0-E4 and exponential half-life decay to reduce stale confidence.
- Shrink uncertain scores toward neutral rather than rewarding optimism.
- Use weighted benefit minus maintenance/risk burden as a review signal.
- Run plus-or-minus 20 percent weight sensitivity and penalty sensitivity before recommending a lifecycle band.
- Escalate fragile recommendations to Kaptan.
- Never allow a score to mutate lifecycle, publish, purchase, sign up, delete, or change credentials.

### Preservation

- Map candidate, preserved, and disseminated artifacts to OAIS-inspired SIP, AIP, and DIP boundaries.
- Use RFC 8493 BagIt for package layout and manifest closure.
- Store PREMIS-inspired Object, Event, Agent, and Rights metadata.
- Store SLSA-compatible provenance fields without claiming a formal SLSA level.
- Use WARC for accepted browser-facing public captures; never as a source or release substitute.
- Target 3-2-1-1-0 only for accepted AIPs and accept it only after independent copy and restore proof.
- Make archive creation and restoration prerequisites to public production readiness.

### Human organization

- Use PARA concepts for actionability: Projects, Areas, Resources, and Archives.
- Use numbered class ranges for stable human navigation.
- Keep machine identity based on stable IDs and full digests.
- Do not rename existing source trees merely to imitate an organizational methodology.

### Operations

- Classify the sites initially as P3 public static services.
- Target zero accepted-release loss, one-hour MBPU preview recovery, and four-hour public static-site restoration after authorized start.
- Treat targets as unproven until timed drills pass.
- Review live integrity and critical paths monthly; perform a real isolated restore quarterly and before material release-boundary changes.
- Admit only read-only, silent-when-clean automation after a manual cycle proves the contract.

## Consequences

### Positive

- Lifecycle authority can no longer split between the registry and project-local documents.
- Strategic prioritization becomes reproducible and uncertainty-aware without pretending to be objective.
- Stale evidence loses influence mathematically instead of triggering destructive calendar automation.
- Accepted releases become independently understandable and recoverable.
- Source, build, preview, archive, recovery, release, operations, and human authority remain separate gates.
- The archive can survive tool, host, repository, and operator-context changes.
- Restore evidence becomes part of production readiness rather than a future operational wish.
- Human navigation remains simple while machine identities remain exact.

### Costs

- Archive packages, metadata, fixity checks, WARC captures, and restore drills add time and storage.
- AHP inputs, evidence grades, and half-lives require disciplined calibration.
- Two brands still impose content, accessibility, legal, release, and operational overhead.
- A 3-2-1-1-0 target may later require security, credential, storage, and financial decisions.
- The first archive-tool implementation requires adversarial tests and independent review.

### Risks and mitigations

- False precision: expose raw inputs, confidence, and sensitivity; score only recommends review.
- Archive complexity: implement a minimal BagIt/PREMIS-inspired pilot before broader automation.
- Duplicate authority: registry remains SSOT and project index remains a projection.
- Storage growth: require byte budgets, retention classes, and digest-based deduplication.
- Secret leakage: keep private evidence separate and review WARC/public boundaries.
- Unrestorable encryption: no recovery claim without recipient/identity match and real restore.
- Standards overclaim: use explicit “inspired” or “compatible fields” language until formal assessment.

## Rejected alternatives

### Keep the first plan unchanged

Rejected because it contained a live lifecycle conflict and no archive/recovery acceptance model.

### Use date thresholds as automatic lifecycle authority

Rejected because inactivity and low value are not equivalent, and old high-confidence evidence should decay rather than force deletion or archive.

### Create a new portfolio state database

Rejected because the Legion registry already owns lifecycle. Another mutable state store would create split-brain authority.

### Treat Git and GitHub as the complete archive

Rejected because a Git repository does not preserve built output, browser-facing dissemination, complete acceptance evidence, preservation metadata, or tested recovery by itself.

### Treat MBPU preview and rollback as backup

Rejected because availability and rollback copies share operational dependencies and do not prove independent long-term recovery.

### Adopt a full archival platform immediately

Rejected as premature. A minimal, validated, content-addressed package and restore contract should prove the need before adding services.

### Archive every generated file forever

Rejected because it creates uncontrolled cost and hides important evidence among reproducible derivatives. Retention is evidence-class based and deletion remains separately gated.

### Automate scoring and lifecycle mutation

Rejected because weights and evidence remain policy judgments. Automation may calculate and alert but cannot decide or mutate.

## Current disposition

- ADR 0002 remains Accepted for the dual-brand direction.
- The Legion registry remains the lifecycle SSOT.
- `guvengursel-dev` remains Maintained according to the live registry.
- The dual-brand initiative and River Runs Again remain Incubating until explicit registry/source gates pass.
- The v1 roadmap and diagram are retained byte-exactly under `../brand-portfolio/archive/2026-07-31-v1/`.
- The rewritten `ROADMAP.md` is the only active execution-plan authority after this ADR.
- No new production-ready claim is granted by this planning decision.

## External-action boundary

This ADR authorizes local planning records only. It does not authorize purchase, signup, trademark filing, repository creation, push, DNS or hosting mutation, credential or security changes, archive-custody provisioning, cloud storage, public release, social publication, deletion, paid APIs, or privileged operations.
