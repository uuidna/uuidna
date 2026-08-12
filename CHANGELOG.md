# Changelog

All notable changes to uuidna, **honest by construction**. Each release names the ledger it shipped — the theorem
count and the **order-invariant receipt** its proofs fold to — so the changelog audits itself: recompute the receipt
(`npm run lean`, then fold the addresses) and it returns, or an entry was quietly changed. The version is a
single-digit odometer; no version is minted forward past an unpublished one.

Format follows [Keep a Changelog](https://keepachangelog.com/). A content-address proves integrity, not truth.

## [0.1.1] — unreleased

**Pending first publish.** npm currently has only `0.1.0`; this is the next release, not yet pushed.
Ledger: **821 theorems** across **44 principles**, folded to receipt `30933be2-0672-8672-9e68-9cc819836d75`
(recompute with `npm run lean`). Every proof `by decide`, sorry-free, no Mathlib; 100% decide-step heartbeat coverage.

### Added
- **Skilled-theorem domains** grown to 806 across 42 principles — including the error-correcting codes, the
  identifiers (ISBN/ISSN check digits), the tides, the chessboard, the calendar (the week as ℤ/7), the measures of
  type (typesetting), the cut (video editing), and the mix (music production, with the reverse/invert/fused
  involutions). Each domain measured for its decide-step heartbeat cost (100% coverage).
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
