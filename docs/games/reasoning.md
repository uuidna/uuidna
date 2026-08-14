# The rules of inference

## The Sealed Truth

**Theorem:** `Reasoning.lean` (0 theorems, all `by decide`)

reasoning itself as decidable arithmetic — every classical inference rule is a boolean tautology over a finite truth table, so each is proven by decide: modus ponens (from p and p→q, q) and modus tollens (from ¬q and p→q, ¬p), the contrapositive (p→q equals ¬q→¬p), De Morgan for and/or, double negation (¬¬p = p), the excluded middle (p ∨ ¬p), and the hypothetical and disjunctive syllogisms — implication p→q being the boolean !p ∨ q, checked on every assignment. The rules a valid argument is built from, sealed so a reasoning step can cite the exact rule it uses — classical propositional logic as decidable truth tables, NOT a theorem prover or predicate logic over infinite domains

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

**The Question:** *Can reason prove itself?*

**The Trinity:**

| Perspective | What It Proves | What It Cannot |
|---|---|---|
| **Decidable (Sealed)** | [The sealed mathematics is exact and recomputable.] | Whether this mechanism is "all there is"; whether understanding it diminishes wonder; whether meaning requires non-mechanism |
| **Honest Boundary** | Understanding the structure does NOT negate the phenomenon. Both truth and beauty are real simultaneously. | Whether reduction to mechanism makes something "less real" or "less meaningful"; whether your experience is diminished by knowing its basis |
| **Metaphysical** | [The open question posed above.] | Whether the universe cares about this; whether your existence or choice matters; whether meaning requires transcendence |

**The court decides:** This theorem seals the mechanism. Philosophy settles the meaning.

---

## Read the Sealed Proof

[`Reasoning.lean`](../../lean/Reasoning.lean)

Each theorem proven `by decide` — recompute it yourself.

---

## The Research Question

[Open question for you to explore. This is where inquiry begins.]

**These are open.** Mathematics does not answer them. Philosophy, art, and human judgment do.
