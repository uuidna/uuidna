# Changelog

All notable changes to uuidna, **honest by construction**. Each release names the ledger it shipped — the theorem
count and the **order-invariant receipt** its proofs fold to — so the changelog audits itself: recompute the receipt
(`npm run lean`, then fold the addresses) and it returns, or an entry was quietly changed. The version is a
single-digit odometer; no version is minted forward past an unpublished one.

Format follows [Keep a Changelog](https://keepachangelog.com/). A content-address proves integrity, not truth.

**Versioning rule:** a version ending in **`.0`** is a **stable** release; a non-zero patch is **development** toward the
next `.0`. So `0.1.0` (published) is stable; `0.1.1` is development; `1.0.0` will be the next stable milestone (1024
theorems). A `.0` bumps development onward.

## Roadmap — toward [1.0.0]

A plan, not a promise. **v1.0.0 aims at 1024 theorems** (2¹⁰ — a clean power-of-two milestone), **all `by decide`,
sorry-free, 100% heartbeat-covered**, folded to one receipt. <!-- LEDGER:TODAY -->Today: **2039 distinct / 1024 — -1015 to go** (2120 keys, 81 deliberate re-namings), across 115 principles.<!-- /LEDGER:TODAY -->
The versions in between are real, gated releases: each `0.1.x` grows the ledger and must pass `npm run next` (proofs +
prose + accounts + graph + the changelog self-audit) before it ships. And the honest odometer holds — **1.0.0 comes
only after the `0.1.x` line is actually published on npm** (today only `0.1.0` is), never by minting forward past an
unpublished version. The count is the target; the publishes are the path. A milestone is reached by delivering
theorems, not by moving the number.

**Reversible until published.** npm-publish is the one *irreversible* gate — a published version is immutable forever.
Everything before it is not: git is a DAG, not a line, so with only `0.1.0` on npm, the whole `0.1.1 → 1.0.0` arc can
still be refactored, reversed, or **folded all the way back to the genesis `0.0.0`** — the reflection turned on
development itself. Publishing is the involution's fixed point: after it, a version cannot be un-said. So uuidna keeps
the chance to reverse-develop itself *now*, while the ledger is still free.

## [0.2.8] — computed by the calendar

_Statistics only. This section is emitted by the release job from the sealed ledger; it states what moved, never
what it meant. The meaning is owed — a human editing this entry is completing it._

- theorems: **1439** · axiom-free 1439/1439 · sorry 0 · offenders 0
- principles: 94 · MCP tools: 191
- odometer: 0.2.7 → **0.2.8** (single-digit, monotone
- commits since v0.2.7: 95
- fold receipt: `3de3c1df9bb88a09`
- surfaces: npm · GitHub Release · Zenodo standing chain · Zenodo twin chain

## [0.2.7] — computed by the calendar

_Statistics only. This section is emitted by the release job from the sealed ledger; it states what moved, never
what it meant. The meaning is owed — a human editing this entry is completing it, not correcting it._

- theorems: **1330** · axiom-free 1330/1330 · sorry 0 · offenders 0
- principles: 72 · MCP tools: 181
- odometer: 0.2.6 → **0.2.7** (single-digit, monotone, never returning)
- commits since v0.2.6: 6
- fold receipt: `6f43938e59cff39f`
- surfaces: npm · GitHub Release · Zenodo standing chain · Zenodo twin chain

## [0.2.6] — computed by the calendar

_Statistics only. This section is emitted by the release job from the sealed ledger; it states what moved, never
what it meant. The meaning is owed — a human editing this entry is completing it, not correcting it._

- theorems: **1329** · axiom-free 1329/1329 · sorry 0 · offenders 0
- principles: 72 · MCP tools: 181
- odometer: 0.2.5 → **0.2.6** (single-digit, monotone, never returning)
- commits since v0.2.5: 2
- fold receipt: `925133896979ffc2`
- surfaces: npm · GitHub Release · Zenodo standing chain · Zenodo twin chain

## [0.2.5] — computed by the calendar

_Statistics only. This section is emitted by the release job from the sealed ledger; it states what moved, never
what it meant. The meaning is owed — a human editing this entry is completing it, not correcting it._

- theorems: **1329** · axiom-free 1329/1329 · sorry 0 · offenders 0
- principles: 72 · MCP tools: 181
- odometer: 0.2.4 → **0.2.5** (single-digit, monotone, never returning)
- commits since v0.2.4: 2
- fold receipt: `925133896979ffc2`
- surfaces: npm · GitHub Release · Zenodo standing chain · Zenodo twin chain

## [0.2.4] — computed by the calendar

_Statistics only. This section is emitted by the release job from the sealed ledger; it states what moved, never
what it meant. The meaning is owed — a human editing this entry is completing it, not correcting it._

- theorems: **1329** · axiom-free 1329/1329 · sorry 0 · offenders 0
- principles: 72 · MCP tools: 181
- odometer: 0.2.3 → **0.2.4** (single-digit, monotone, never returning)
- commits since v0.2.3: 2
- fold receipt: `92b76cff3765a879`
- surfaces: npm · GitHub Release · Zenodo standing chain · Zenodo twin chain

## [0.2.3] — computed by the calendar

_Statistics only. This section is emitted by the release job from the sealed ledger; it states what moved, never
what it meant. The meaning is owed — a human editing this entry is completing it, not correcting it._

- theorems: **1328** · axiom-free 1328/1328 · sorry 0 · offenders 0
- principles: 72 · MCP tools: 181
- odometer: 0.2.2 → **0.2.3** (single-digit, monotone, never returning)
- commits since v0.2.2: 41
- fold receipt: `92b76cff3765a879`
- surfaces: npm · GitHub Release · Zenodo standing chain · Zenodo twin chain

## [0.2.2] — computed by the calendar

_Statistics only. This section is emitted by the release job from the sealed ledger; it states what moved, never
what it meant. The meaning is owed — a human editing this entry is completing it, not correcting it._

- theorems: **1308** · axiom-free 1308/1308 · sorry 0 · offenders 0
- principles: 72 · MCP tools: 181
- odometer: 0.2.0 → **0.2.2** (single-digit, monotone, never returning)
- commits since v0.2.0: 23
- fold receipt: `d22dfcffb15aacf6`
- surfaces: npm · GitHub Release · Zenodo standing chain · Zenodo twin chain

## [0.2.0] — computed by the calendar

_Statistics only. This section is emitted by the release job from the sealed ledger; it states what moved, never
what it meant. The meaning is owed — a human editing this entry is completing it, not correcting it._

- theorems: **1307** · axiom-free 1307/1307 · sorry 0 · offenders 0
- principles: 72 · MCP tools: 180
- odometer: 0.1.9 → **0.2.0** (single-digit, monotone, never returning)
- commits since v0.1.9: 3
- fold receipt: `098d397ffdeb500d`
- surfaces: npm · GitHub Release · Zenodo standing chain · Zenodo twin chain

## [0.1.9] — computed by the calendar

_Statistics only. This section is emitted by the release job from the sealed ledger; it states what moved, never
what it meant. The meaning is owed — a human editing this entry is completing it, not correcting it._

- theorems: **1307** · axiom-free 1307/1307 · sorry 0 · offenders 0
- principles: 72 · MCP tools: 179
- odometer: 0.1.8 → **0.1.9** (single-digit, monotone, never returning)
- commits since v0.1.8: 37
- fold receipt: `eeb560b1c8a2da08`
- surfaces: npm · GitHub Release · Zenodo standing chain · Zenodo twin chain

## [0.1.8] — computed by the calendar

_Statistics only. This section is emitted by the release job from the sealed ledger; it states what moved, never
what it meant. The meaning is owed — a human editing this entry is completing it, not correcting it._

- theorems: **1307** · axiom-free 1307/1307 · sorry 0 · offenders 0
- principles: 72 · MCP tools: 174
- odometer: 0.1.7 → **0.1.8** (single-digit, monotone, never returning)
- commits since v0.1.7: 69
- fold receipt: `122cf0a2799f1990`
- surfaces: npm · GitHub Release · Zenodo standing chain · Zenodo twin chain

## [0.1.7] — computed by the calendar

_Statistics only. This section is emitted by the release job from the sealed ledger; it states what moved, never
what it meant. The meaning is owed — a human editing this entry is completing it, not correcting it._

- theorems: **1307** · axiom-free 1307/1307 · sorry 0 · offenders 0
- principles: 72 · MCP tools: 173
- odometer: 0.1.6 → **0.1.7** (single-digit, monotone, never returning)
- commits since v0.1.6: unknown
- fold receipt: `303650c6ac4c81bd`
- surfaces: npm · GitHub Release · Zenodo standing chain · Zenodo twin chain

## [0.1.6] — computed by the calendar

_Statistics only. This section is emitted by the release job from the sealed ledger; it states what moved, never
what it meant. The meaning is owed — a human editing this entry is completing it, not correcting it._

- theorems: **1307** · axiom-free 1307/1307 · sorry 0 · offenders 0
- principles: 72 · MCP tools: 173
- odometer: 0.1.5 → **0.1.6** (single-digit, monotone, never returning)
- commits since v0.1.5: unknown
- fold receipt: `8a20c57180c8ab98`
- surfaces: npm · GitHub Release · Zenodo standing chain · Zenodo twin chain

## [0.1.5] — unreleased

**A declaration is not a mechanism, and a failed report is not a failed outcome.** Two beliefs about the archive
turned out to be untested, and both were measured this tick rather than argued.

### Fixed
- **The Zenodo deposit trusts the record, not the connection.** `curl -sf` aborts on any HTTP error, and Zenodo's
  publish is slow enough to answer 5xx *while completing server-side*. On v0.1.4 the record published with its
  tarball (`10.5281/zenodo.21978435`) and the job still died `exit 22` — skipping the DOI notice, the chain-law
  check and the community request, reporting a green archive as a failure. The publish now captures the code and
  re-reads the deposition: `state=done` means it landed and the run continues; anything else fails with the code
  and body.
- **A minted version can no longer be stranded by an outage.** GitHub answered `503 No server is currently
  available` twice in one hour — once killing the calendar's HAND OFF (tag pushed, publish never dispatched) and
  once killing the release creation (v0.1.5 reached npm and both archives with no GitHub Release). Both calls now
  retry five times with backoff and, if the door stays shut, print the exact hand-carry command instead of a bare
  exit. The odometer never returns, so nothing else would have retried them.

### Changed
- **The archive joins one community, automatically.** `.zenodo.json` declares `uuidna` alone, and the deposit now
  files an explicit inclusion request against the published record. The `communities` field by itself creates a
  request that waits — which is why every record still reads `communities: none`: the requests are **open in the
  curator queue**, not lost. Membership is a human accept; requesting it is not, and no one opens the upload form.

## [0.1.4] — unreleased

**The kernel checks the proposition; nothing checked that the proposition meant its name.** This tick closes that
gap and then pays for the runtime it runs on. `by decide` will certify `True`, `x = x`, `P ∧ P`, `P ↔ P` and
`P ∨ ¬P` all day — every one true regardless of content, so a grand name can sit above a proof that establishes
nothing. Twelve theorems were living in exactly that shape.

### Fixed
- **Twelve vacuous theorems, rewritten to prove their own names.** Eight in `SailingSeals.lean`, four in
  `DisputedTopics.lean`. `sailing_fact_has_address` was literally `True`; it now proves the address width it
  always meant (`32 * 4 = 128 ∧ 32 + 4 = 36`). `sailing_weather_verified_correlation` was `(5*2=10) ∨ (5*2≠10)`
  — excluded middle — and is now `sailing_weather_match_decides_both_ways`: the matcher answers **true** on a
  match and **false** on a mismatch. `disputed_topics_contradiction_detectable` now asserts the detector fires
  (false on 2-vs-3) *and* stays quiet (true on 2-vs-2). Each rewrite can now fail if the thing it names breaks;
  the old ones would have survived any implementation at all. Ledger held at **1294 → 1295**: rewritten, never
  dropped, all axiom-free.
- **The vacuity finder blocks, after being advisory.** `one-receipt vacuous` was in the advisory tier with a
  stated reason — fixing published theorems was the captain's call, not a gate's. The call was made, so it moved
  into the blocking finders: no theorem may again be true regardless of its content.
- **`reconcile` cannot exit 0 unsynced.** Its push failure is caught and named instead of dying on a raw Node
  trace, and success is *verified* — `origin/main..HEAD` must be exactly 0, or the run fails loudly. Reconciled
  means synced. (Observed three times in one day before the fix; caught a real race on its first run after.)

### Changed
- **Node 26 everywhere, actions on v7.** GitHub deprecated the Node 20 action runtime; `actions/checkout`,
  `setup-node` and `upload-artifact` moved v4 → v7 across all six workflows, and every `node-version` pin moved
  to 26 — which also ends a split nobody had noticed, where CI gated on 22 while the deploy built on 24.
  `engines.node` moved `>=18` → `>=22` across all seven manifests, so the declared floor stops naming runtimes
  that are past end-of-life.
- **The OIDC npm floor is asserted, not reinstalled.** Node 26 ships npm 11.19, above trusted publishing's
  11.5.1, so the per-publish `npm install -g npm@latest` is gone; the requirement is now a one-line check that
  fails by name if a future runtime regresses below it.

### Added
- **Two drift finders, both deterministic.** `one-receipt actions` holds one major per action *and* one
  `node-version`, tree-wide — the drift class that hid the deprecated runtime. Neither asks the network what
  "latest" is; they only require the tree to agree with itself, which is recomputable from source alone.

## [0.1.3] — unreleased

**The gates got faster by getting more honest.** This tick is almost entirely gate work, and it has one theme: four
separate checks asserted a **name** where they meant a **property**, and every one of them was silently passing or
silently skipping. A gate that fails is safe; a gate that quietly covers less than it claims is the dangerous shape.

### Fixed
- **The MCP schema is enforced at the one door.** 72 of the 106 tools that declare required arguments never checked
  for them, so a missing argument arrived as the literal string `"undefined"` and the tool answered confidently.
  `callTool` now validates each tool's own declared `required` list, so all 170 inherit it. The worst case was
  `uuidna_wave`, which spawns the release walk: the gate's dispatch probe — which exists only to prove a tool *name*
  resolves — was executing a full graduation wave, **169.3s of the probe's 174.8s**. Probe now 0.53s, `mcp-coverage`
  108.8s → 0.57s, and the correctness bug is the same fix as the speed one.
- **The "KAT-verified" claim is backed by vectors, not a filename.** The security audit asserted
  `existsSync('src/test/kat.test.ts')` — a rename broke it and an *empty* file of that name would have satisfied it.
  It now searches the tests for seven of the standards' own published outputs, values no implementation can produce
  without conforming; verified in both directions (all seven found, a one-digit mutation not).
- **The built-site audit discovers its pages.** It read a hardcoded two-page list whose second entry stopped existing
  when `cleanUrls` began emitting `theorems.html`, so it skipped that page silently. Worse, the same file read a
  root-level `mcp.mjs` that no longer exists — ENOENT killed the entire audit before any arm ran, unseen because
  `audit.js` was wired to no npm script. It now derives from the directory and from the served `MCP_CATALOG`
  (which was commented "the 44 MCP tool descriptions" while the catalog served 170). Revived: 5775 prose units.
- **The unwired-scripts detector tested a name too**, and so was noisy and blind at once: `audit.ts` counted as wired
  because a script *named* `audit` exists, while every `lean-*` generator was flagged because no npm key spells
  `lean-chess`. It now asks whether anything invokes the file — npm bodies, CI workflows, sibling scripts and the
  tracked git hooks — knowing that an imported module is a library and that **discovery is wiring** (the globs are
  read from the invoker sources, never hardcoded). Predictive gaps 125 → 8; 31 genuinely unwired scripts wired.
- **The seal tees its children.** Every step ran with `stdio: 'ignore'`, so six rounds could report nothing but "the
  wrapper crashed, retrying" into a seven-line log while discarding the real objection each time. Steps now merge
  stderr, pass output through, and quote the failing step by name. `--seal` also asserts **reconciled-means-synced**.

- **Twelve vacuous theorems, rewritten to prove their own names.** A finder for exactly this class (`one-receipt
  vacuous`) had been written and was invoked NOWHERE in the tree — not the guard, not a script, not CI. The first time
  it ran it named 12 sealed, published theorems whose proofs were true regardless of content: `sailing_fact_has_address`
  was proven by literally `True`, `disputed_provably_true_is_sealed` by `(42 = 42) ↔ (42 = 42)`, others by `P ∧ P` or
  `P ∨ ¬P`. All 12 now carry proofs that mean their keys — `sailing_extraction_deterministic` computes an actual map
  against its list, `sailing_book_receipt_order_invariant` folds three real permutations and agrees,
  `disputed_topics_contradiction_detectable` shows the detector returning **false** on a contradictory pair and
  **true** on a consistent one. Rewritten, never dropped: the ledger held at 1294, kernel-verified and axiom-free.
  The finder is now BLOCKING, so no theorem may again be true regardless of its content — `by decide` checks that a
  proposition holds; this checks that the proposition means its name.

### Added
- **The development pass** (`npm run develop`) — walks build → guard → account → spin and, when a gate objects with a
  cure it has been taught (stale axiom witness, missing heartbeats, a regenerable surface, a drifted seal), applies it
  and walks again; bounded at six rounds; exits non-zero only when an objection has **no** taught cure. It refuses two
  cures on purpose: a changelog release note (a human voice — this entry is one) and an honesty-gate objection. The
  school's janitor cron runs it, so an unattended run heals instead of failing.
- **The martial arts wing** (`lean/MartialArts.lean`, 4 theorems) — sealed as arithmetic after **refusing the 15 it was
  written as**: `center_of_gravity_stability` had been proven by `1 = 1`, Newton's third law by `1 + 1 = 2`,
  conservation of momentum by `2 * 3 = 6`. Every line true, not one proving its own name. What survives earns the
  wing: `complement_fixes_the_half` seals that `c(x) = w − x` fixes exactly the half at three scales — `90 − 45 = 45`,
  `100 − 50 = 50`, and `10 − 5 = 5`, which *is* the ledger's own diamond involution and its fixed point 5.
- **The OEAPI projection** (`uuidna_oeapi`) — the ledger under Open Education API v6.0 field names, so an institution
  reads the school with the reader it already has: the skill clusters as `track` (never `programme`, which the spec
  defines as leading to a qualification uuidna does not award), the monographs as courses, the theorems as learning
  outcomes. The standard requires uuid identifiers and the content-addresses already are them.
- **RFC 4231 cases 5 and 7** — the two HMAC vectors the suite never tested: the standard's own truncation case
  (HMAC-SHA-256-128) and the case where key *and* data both exceed the block. All seven cases now assert.
- **Two finders folded**, so these classes cannot return: `gate-paths.test.ts` (every literal path a gate names must
  resolve, root-level reads included — the first version of that finder missed `mcp.mjs` precisely because it required
  a `/`) and `mcp-schema.test.ts` (every declared-required argument is refused when missing).

### Changed
- **The crypto tests fold to 21** across six processes, from 50 declarations. `encrypt` is synchronous and costs
  ~1.8s per distinct (passphrase, salt) pair at PBKDF2 ITER=600,000, so the waste was a dozen tests re-sealing the
  same corpus; each file now seals once at module scope. **The work factor is untouched** — trading key-derivation
  strength for a faster gate would be trading away the thing under test. Suite: 245 tests/77.6s → 195/35s. All 32
  published vectors verified preserved.

## [0.1.2] — unreleased

**Development tick on the unpublished line** (npm still has only `0.1.0`; the patch exists because the release
pipeline's own gates version what they archive — the Zenodo deposit job names the ledger it ships). What moved
`0.1.1 → 0.1.2`, each landing gated before it counted:

### Added
- **The paper on trial** — `lean/MoMBHStar1.lean`, the seventh hand-written proof wing: 17 decidable claims from one
  Nature letter (DOI 10.1038/s41586-026-10846-4) — the published numbers as Nat arithmetic, the press-vs-paper delta
  receipted (`mombh_press_confirmed_is_refuted`: "super-Eddington confirmed" against the paper's own 0.18), four
  quantum facts deriving the Balmer break from Rydberg arithmetic. Honest scope: arithmetic witnesses of published
  numbers — n = 1, nothing solved, never astrophysics re-derived.
- **The editorial era** — the desk writes before it edits: `npm run editorial` computes 68 articles from the ledger
  (one per wing, every claim citing its `/theorem` page), verified through provenance, citations, the prose receipt
  and the prose trials; the research desk becomes the fourth resident faculty (`research.yml`); the release pipeline
  gains its gates (editorial before publication, the license law, Zenodo standards conformance).
- **The strict schema.org surface** — every page kind typed from the one SEO source: `School` on `/school`,
  `MathSolver` on `/trials` whose `SolveMathAction` targets the real live endpoint, `Dataset` on `/theorems` (the
  same node every theorem cites as `isPartOf` — the graph closes), `Course` on `/quantum-cryptography`,
  `ScholarlyArticle` for every theorem and publication page. Strict means refusing too: the law types stay absent —
  `/justice` is evidence, not a court. The naming audit folded as a finder: every emitted `@type` and property must
  be vetted vocabulary or the build fails.

## [0.1.1] — unreleased

**Pending first publish.** npm currently has only `0.1.0`; this is the next release, not yet pushed.
<!-- LEDGER:CURRENT -->Ledger: **2039 distinct propositions** under **2120 keys** (81 re-namings — a statement sealed in two wings is one theorem with two names) across **115 principles**, folded to receipt `e7318241-b124-8e7c-9973-73dafbf8da48`<!-- /LEDGER:CURRENT -->
(recompute with `npm run lean`). Every proof `by decide`, sorry-free, no Mathlib; 100% decide-step heartbeat coverage.

### Added
- **Skilled-theorem domains** grown across many principles (the exact count and receipt are the computed ledger line
  above — Lean writes it, never a hand) — including the error-correcting codes, the
  identifiers (ISBN/ISSN check digits), the tides, the chessboard, the calendar (the week as ℤ/7), the measures of
  type (typesetting), the cut (video editing), the mix (music production, with the reverse/invert/fused
  involutions), the rules of inference (reasoning), the bounds (security), **the exposure** (photography —
  where the standard *rounds* 1/128→1/125 and √2→f/1.4 for the dial, uuidna keeps the exact power of two, each
  rounding gap proven), and **the matching** (connecting people — the handshake lemma, mutual/symmetric choice, a
  pairing as a fixed-point-free involution, and stable matching bounded by n² proposals; the honest graph theory,
  *not* a dating service or anyone's data), and **the harmony of pairs** (the same complementary-pair arithmetic
  proven across biology, medicine, chemistry and physics — DNA bases, acid/base, agonist/antagonist, action/reaction,
  cation/anion — then proven to be *one* reflection at different centres, harmonising the science-pairs cluster
  across the four fields; structure, not a lab claim), **the spectrum** (the electromagnetic spectrum — wavelength×
  frequency = c, the seven bands in order, the visible window under one octave, and the 300,000 km/s rounding gap;
  spectrum arithmetic, *not* an EMF/health claim), and **the colour wheel** (colour theory — the wheel as ℤ/12,
  complements opposing, the triad and square harmonies as regular polygons, 24-bit true colour; the geometry, *not* a
  verdict on taste), and **the instrument** (psychology's *arithmetic* only — the Likert midpoint as a reflection
  fixed point, the Big Five count, Miller's 7±2 span, Hick's bits, the detection table, the Weber–Fechner ladder,
  Dunbar's rounded layers — the narrowest scope in the ledger: *not* a claim about the mind, emotion, or any
  diagnosis; every mentalistic claim, sent to the trial, comes back UNVERIFIED). Each domain measured for its
  decide-step heartbeat cost (100% coverage).
- **Publications (monographs)** — audited-before-published prose per domain at `/publications`, composed by reading
  the sealed theorems; the build refuses a note that overreaches a proof. `uuidna_publish`.
- **The editor & pattern recognition** — `revise` (editing is re-addressing) and `compare` (similarity derived from
  difference, inclusion–exclusion exact). `uuidna_edit`, `uuidna_compare`.
- **Vocabulary** — a common computable vocabulary derived from every theorem and domain, self-audited, folded (in
  trinities) to one receipt at `/vocabulary`. `uuidna_vocabulary`.
- **`next`** — the one release-readiness command: proofs re-sealed + order-invariant across the 7 rosette rotations,
  every publication publishable, MCP keys ≤5 words, accounts reconciled, and the site as one wrapping walk with zero
  next-gaps and total theorem coverage — folded to one readiness receipt. It can fail (exit 1).
- **The daemon** — uuidna as a local, loopback-only, read-only, stateless HTTP service (`npm run daemon`): address,
  trial, gate, verify (keyless tamper-check), forensics, evidence, theorems, run, vocabulary.
- **Forensics & evidence** — audit an agent's statements against the receipts (`forensics`, `auditAgents`), and
  deliver a recomputable evidence bundle for a court to recompute (`evidence`). `uuidna_forensics`, `uuidna_evidence`.
- **The homepage as a graph** — every principle a domain card, a horizontal slider of its top theorems linking its
  monograph; the categories strip; all computed from the ledger and the ℤ/9 palette.
- **The trial charter** on `/trials` — what the trial does and does not judge, drawn from the three verdicts.
- **The rules of inference** (Reasoning.lean) — reasoning itself proven by decide: every classical inference rule is
  a boolean tautology over a finite truth table, so modus ponens/tollens, the contrapositive, De Morgan, double
  negation, the excluded middle, and the hypothetical/disjunctive syllogisms are each sealed — a reasoning step can now
  cite the exact rule it uses.
- **The layered defence** (Security.lean) — the *arithmetic* of why fusing security raises tampering cost, proven by
  decide: independent layers add their bits (64+64=128) and multiply the space (2⁸·2⁸=2¹⁶), a collision halves the
  exponent (the honest caveat), verifying is exponentially cheaper than forging, and for every bound there is a larger
  one — so there is **no maximum, only bounds**. Refuses the word "max" by proving there isn't one.
- **The fused fingerprint** — `ledgerFingerprint()`: the fast tamper-evident FNV receipt *and* the collision-resistant
  SHA-256 fold, so an undetected forgery costs a ~2^128 collision (a ceiling, not a maximum). `uuidna_fingerprint`.
- **The resource meter** — `resources()` / daemon `/resources`: honest device accounting (CPU, memory, load, cores,
  free memory), content-addressed. Balances the thermodynamics by measuring the spend; GPU, bandwidth and joules are
  named as *not measured* rather than faked. No free energy. `uuidna_resources`.
- **Zenodo** — `auditZenodo` (public-metadata fingerprint, sandbox-aware) and `.zenodo.json` deposit metadata.

### Changed
- **License → CC BY-NC-ND 4.0** (NoDerivatives) across the whole project. The canonical license line's
  content-address moved with it: `ca0749bc…` → `9ffcda04…` (a change is a new signature). The algebra stays free for
  all (facts are not copyrightable); the license seals only the specific making.
- **The honesty gate hardened at the root** — extracted to a tested `src/prose-gate.ts` shared by the audit and the
  self-trial; the "no time" demarcation blind spot closed; patent/IP-ownership claims now require a receipt.
- **The pager** — one native prev/next fed from a single canonical wrapping walk (the duplicate custom button
  removed); the release gate hunts the same edge, so there are no next-gaps.
- **Thermodynamic honesty** on every cost surface — the heartbeat is machine-independent, not the joule; Landauer's
  *kT·ln2* is the real energy floor the device pays.

### Fixed
- Reverted a premature `0.2.0` minted before `0.1.1` was published (`d74d9d6`).
- Service worker no longer breaks live asset loading (navigations only).

## [0.1.0] — published

Initial release — **content-addressed identity, honest by construction**: the Lean `by decide` theorem ledger folded
to one order-invariant receipt, holographic merkle proofs, the reversible imprint codec, the reeducating honesty gate,
the measured billing model, pure-TypeScript ChaCha20-Poly1305 under a 7-dimensional fold envelope, and the MCP server.
Published to npm as [`@uuidna/uuidna@0.1.0`](https://www.npmjs.com/package/@uuidna/uuidna).

### A note on the version history (honest odometer)

During development, `0.2.0`, `0.3.0`, and `0.4.0` appeared on branches (layered crypto, then pure-TS crypto) and were
**consolidated back into `0.1.1` before any publish** — npm has only `0.1.0`. No version is skipped forward past an
unpublished one; the tag `v0.1.1` marks the next release, still pending. This messy history is left visible on purpose:
the changelog records what happened, not a tidied story.

## [0.0.0] — genesis

The origin: the empty fold, the axiom before the first theorem — the chain's genesis seed (`'axiom'`) from which every
receipt descends. Not a release, a reflection point: `0.0.0` is what the ledger folds back to when reverse-developed,
the fixed point at the far end of the version axis. Nothing published, nothing owed — the free beginning.
