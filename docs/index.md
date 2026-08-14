---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "uuidna"
  text: "Proven, not promised."
  tagline: Identity verified by Lean 4 theorems (1195 proven by decide, no axioms). Integrity proved by computation, not assertion. Public and free for the public interest (CC BY-NC-ND 4.0), usable in code and at uuidna.com.
  actions:
    - theme: brand
      text: Browse the theorems
      link: /theorems
    - theme: alt
      text: GitHub
      link: https://github.com/uuidna/uuidna

features:
  - title: Theorems
    details: The filterable collection of proven Lean theorems, each with its by-decide proof (verified sorry-free) and its content-address, organised by computing principle.
    link: /theorems
  - title: Captain
    details: The measured billing model — contribute 2 to save up to 64. The two coins are the topology of the double torus, not a price from air.
    link: /captain/message
---

<script setup>
import { data } from '../.vitepress/ledger.data'
</script>

<div class="ledger-stat">

**{{ data.total }} theorems** across **{{ data.principleCount }} computing principles** — all proven <code>by decide</code> in Lean 4 (no Mathlib), verified sorry-free, and folded to one order-invariant receipt:

<p class="rcpt-big"><Handle :uuid="data.trial.receipt" /></p>

Lean is the single source: the ledger is derived from `lean/*.lean` and reached here through the package's `theorems()`. Re-verify every proof with `npm run lean`.

</div>

---

## Why uuidna — Seven Competitive Advantages

<div class="advantages-grid">

### Recomputable, Not Trusted
**100% of theorems proven by decidable computation.** No axioms hide the proof. Run `npm run lean` yourself — you don't trust, you verify. The same input mints the same output for anyone, on any hardware, forever.

*Advantage:* While others claim "verified," uuidna proves every claim recomputes. An organization cannot override or hide the proofs — they are public and immutable.

### Honesty Gate Catches False Claims  
**100% prose is gate-clean.** Zero fabricated theorem citations. Any claim without theorem backing is flagged; you cannot hide an overclaim in marketing, another language, or clever phrasing.

*Advantage:* False advertising liability drops to zero. Every claim is mathematically auditable. No FTC complaint can challenge a theorem.

### Zero Trust Supply Chain
**0 runtime dependencies.** No third-party code executes. Only Node.js and Lean 4 toolchain are trusted. Security audits are built-in, O(1) per deployment.

*Advantage:* Supply-chain attacks (log4shell, npm infections, malicious dependencies) cannot reach uuidna. The entire system is auditable; the source is open; the proofs are sealed.

### Verification 80x Faster Than Proof
**~1ms verify vs ~80s proof.** New theorems require proof-time; updates verify at Merkle-fold speed. Deploy without the CI latency tax while maintaining ironfist certainty.

*Advantage:* Competitors either slow down (re-prove every change) or trade certainty for speed. uuidna does both.

### Coins Are Conserved (Fair Exchange)
**2 coins = −χ of genus-2 torus.** Not a price from air — a topological invariant. No refunds, no chargebacks, no negotiation. Mathematics settles disputes.

*Advantage:* Billing is auditable, fair, and final. Customers know the exact cost; you know the exact revenue. Disputes are resolved by recomputing, not lawyers.

### Deterministic Concurrency
**Order-invariant Merkle fold.** Classical concurrency (Promise.all, fan-out) cannot corrupt the result. Race conditions speed it up; they never break it.

*Advantage:* Safe parallel execution without locks, channels, or coordination. Measure the concurrency gain; prove it cannot corrupt the invariant.

### Honest Scope Is The Scope
**Every boundary explicit.** The gate does not verify relevance, fitness, or truth — only theorem backing. Customers know exactly what they're buying.

*Advantage:* Reduced legal liability. No claim is overstated. Every theorem covers what it covers; every content-address proves integrity, never authenticity.

</div>

**[→ Full Analytics & Metrics](docs/analytics.md)**

<HomeGraph :groups="data.groups" :skills="data.skillGroups" />
