# The identifiers

## The Sealed Truth

**Theorem:** `Identifiers.lean` (0 theorems, all `by decide`)

the check-digit arithmetic of ISBN/ISSN as decidable facts — the same integrity theme as content-addressing (a check digit is a one-symbol fold of the content that catches tampering): ISBN-10 is a weighted sum mod 11 (prime), so every weight is nonzero mod 11 (any single-digit error shifts the checksum) and consecutive weights differ by 1 (any adjacent transposition shifts it), needing 11 symbols (X for 10); ISBN-13 is alternating 1/3 weights mod 10 in the 978/979 Bookland EAN — the checksum arithmetic and what it catches, NOT a validator library

**Why sealed:** Pure decidable arithmetic. No paradox, no experiment needed — the mathematics as recomputable facts.

---

## The Honest Boundary

**What this CANNOT prove:**
- Whether the mechanism explains the phenomenon
- Why humans find this beautiful, important, or meaningful
- Whether the future will follow the same rules
- What the universe "should" do

**Honest scope:** This theorem seals STRUCTURE. It does NOT settle meaning, purpose, or consequence.

---

## The Metaphysical Pair

**The Question:** *Can a check digit verify identity?*

**The Trinity:**

| Perspective | What It Proves | What It Cannot |
|---|---|---|
| **Decidable (Sealed)** | [The sealed mathematics is exact and recomputable.] | Whether this mechanism is "all there is"; whether understanding it diminishes wonder; whether meaning requires non-mechanism |
| **Honest Boundary** | Understanding the structure does NOT negate the phenomenon. Both truth and beauty are real simultaneously. | Whether reduction to mechanism makes something "less real" or "less meaningful"; whether your experience is diminished by knowing its basis |
| **Metaphysical** | [The open question posed above.] | Whether the universe cares about this; whether your existence or choice matters; whether meaning requires transcendence |

**The court decides:** This theorem seals the mechanism. Philosophy settles the meaning.

---

## Read the Sealed Proof

[`Identifiers.lean`](../../lean/Identifiers.lean)

Each theorem proven `by decide` — recompute it yourself.

---

## The Research Question

[Open question for you to explore. This is where inquiry begins.]

**These are open.** Mathematics does not answer them. Philosophy, art, and human judgment do.
