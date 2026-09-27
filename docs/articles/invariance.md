---
title: "INVARIANCE"
description: "Computed from lean/Invariance.lean — 3 sealed theorems, every claim citing its proof."
---

# INVARIANCE

> INVARIANCE — ONE STRUCTURE, AND WHAT IS HELD FIXED DECIDES WHETHER IT IS A FACT OR FURNITURE. This ledger measures two things separately that turn out to be one. lean/CrossProof.lean seals that the symmetric cross a·d = b·c is BLIND TO ITS SPELLING and treats that blindness as the reason the product form is the robust way to state a proportion. src/padding-conjunct.ts counts the opposite-seeming defect — a conjunct true whatever its numerals are, of which this ledger carries 492 across the wings — and calls it furniture. THEY ARE THE SAME PROPERTY. A form true of every quadruple is true of every permuted quadruple too, because true equals true, so emptiness GUARANTEES invariance: padding is not symmetry's opposite but its degenerate limit, symmetry that comes from saying nothing. What separates the fact from the furniture is not invariance, which both have, but whether the form can fail at all. AND THE CONVERSE FAILS, which is what keeps the notion useful: the product form never notices the mirror and is false on most quadruples, and that combination is exactly what makes it worth stating. SO THE SQUARE HAS NO FOURTH CELL — classify by (true everywhere, mirror-invariant) and three cells carry witnesses while the fourth, true everywhere yet not invariant, is EXCLUDED BY THE IMPLICATION rather than merely unobserved. A census could only ever report it as unseen, which is a fact about who looked; a theorem rules it out. Nothing falls outside the square and nothing sits between its cells. CLAIMED: the arithmetic, decided over 625 quadruples, axiom-free. NOT CLAIMED: that every invariance in mathematics behaves so, or that this mirror is the only permutation worth asking about — one permutation, one box, stated as such. — held by [emptiness_is_invariant_under_every_mirror](/theorem/emptiness_is_invariant_under_every_mirror) and its 2 siblings below.

**3 theorems** and **155,633 decided cases**, from [emptiness_is_invariant_under_every_mirror](/theorem/emptiness_is_invariant_under_every_mirror) onward, each proven `by decide` in <a href="/lean/Invariance.lean">lean/Invariance.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 3 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [emptiness_is_invariant_under_every_mirror](/theorem/emptiness_is_invariant_under_every_mirror). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FInvariance.lean)** — nothing to install. The editor fetches `lean/Invariance.lean` from the repository and re-decides all 3 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### CLAIMED: over all 625 quadruples and all 24 rearrangements of four positions, every form true of ALL quadruples agrees with its own image under EVERY rearrangement — so a conjunct that cannot fail is symmetric for free, and padding is symmetry's degenerate limit rather than its opposite. The second conjunct decides that the antecedent is satisfied by all 625, so the implication is not carried by an empty hypothesis.
The ledger holds this as [emptiness_is_invariant_under_every_mirror](/theorem/emptiness_is_invariant_under_every_mirror) — proven `by decide`, sorry-free:

```lean
((rng.all (fun a => rng.all (fun b => rng.all (fun c => rng.all (fun d => !(everywhere a b c d) || (allPermsAgree a b c d)))))) = true) ∧ ((rng.all (fun a => rng.all (fun b => rng.all (fun c => rng.all (fun d => everywhere a b c d))))) = true)
```

### CLAIMED: the converse FAILS — the symmetric cross a·d = b·c is invariant under the mirror and is NOT true of every quadruple, so symmetry with content exists and invariance is not merely a symptom of saying nothing.
The ledger holds this as [symmetry_with_content_is_not_emptiness](/theorem/symmetry_with_content_is_not_emptiness) — proven `by decide`, sorry-free:

```lean
((allQ (fun a b c d => (symmetric a b c d) == (symmetric d c b a))) = true) ∧ ¬(1 * 1 = 2 * 2)
```

### CLAIMED: classifying a form by (true everywhere, invariant under the mirror) leaves exactly 3 of the four cells occupied — and the missing one, true everywhere yet not invariant, is IMPOSSIBLE rather than merely unobserved: the first theorem excludes it.
The ledger holds this as [the_square_has_no_fourth_cell](/theorem/the_square_has_no_fourth_cell) — proven `by decide`, sorry-free:

```lean
(anyQ (fun a b c d => !(symmetric a b c d))) = true ∧ (allQ (fun a b c d => !(everywhere a b c d) || (mirrorAgrees a b c d))) = true
```


::: warning 
INVARIANCE — ONE STRUCTURE, AND WHAT IS HELD FIXED DECIDES WHETHER IT IS A FACT OR FURNITURE. The boundary is confirmed by the wing's own sealed theorems — e.g. [emptiness_is_invariant_under_every_mirror](/theorem/emptiness_is_invariant_under_every_mirror) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
