# The software-verifiable algebra

## The Sealed Truth

**Theorem:** `Software.lean` (0 theorems, all `by decide`)

the algebraic correctness LAWS a program is verified against, one level up from the hardware layer, each a decidable axiom-free `by decide` particle: losslessness (split-and-recompose is the identity — serialisation loses nothing), structure preservation (map keeps length, filter never grows, append adds), idempotent normalisation, a TOTAL guarded division (no divide-by-zero crash), bounded termination (a shift loop halts), order-invariant reduction (safe to parallelise), the compare-swap that orders (every sort's basis), total safe indexing (no over-read), and reversibility (undo of undo is the identity). HONEST SCOPE: integrity, not truth — uuidna SEALS the spec an implementation is verified AGAINST; it does not write, compile, or run your program, nor prove an arbitrary program correct. A sealed spec, not the program

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

**The Question:** *Can software correctness be proven, or only verified?*

**The Trinity:**

| Perspective | What It Proves | What It Cannot |
|---|---|---|
| **Decidable (Sealed)** | [The sealed mathematics is exact and recomputable.] | Whether this mechanism is "all there is"; whether understanding it diminishes wonder; whether meaning requires non-mechanism |
| **Honest Boundary** | Understanding the structure does NOT negate the phenomenon. Both truth and beauty are real simultaneously. | Whether reduction to mechanism makes something "less real" or "less meaningful"; whether your experience is diminished by knowing its basis |
| **Metaphysical** | [The open question posed above.] | Whether the universe cares about this; whether your existence or choice matters; whether meaning requires transcendence |

**The court decides:** This theorem seals the mechanism. Philosophy settles the meaning.

---

## Read the Sealed Proof

[`Software.lean`](../../lean/Software.lean)

Each theorem proven `by decide` — recompute it yourself.

---

## The Research Question

[Open question for you to explore. This is where inquiry begins.]

**These are open.** Mathematics does not answer them. Philosophy, art, and human judgment do.
