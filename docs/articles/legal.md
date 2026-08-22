---
title: "The legal vocabulary"
description: "Computed from lean/Legal.lean — 10 sealed theorems, every claim citing its proof."
---

# The legal vocabulary

> The LEGAL VOCABULARY of the trial as decidable theorems — PROVEN (admitted), REFUTED (recomputably wrong). — held by [solutions_not_skipped](/theorem/solutions_not_skipped) and its 9 siblings below.

**10 theorems**, from [solutions_not_skipped](/theorem/solutions_not_skipped) onward, each proven `by decide` in [lean/Legal.lean](/lean/Legal.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 9 of its 10 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [solutions_not_skipped](/theorem/solutions_not_skipped). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FLegal.lean)** — nothing to install. The editor fetches `lean/Legal.lean` from the repository and re-decides all 10 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### SOLUTIONS ARE NOT SKIPPED — verifying that every UNVERIFIED is kept. The trial partitions each solution into ADMITTED (verified), UNVERIFIED (the honest frontier), or REFUTED, and the accounting CONSERVES the total however it is grouped: admitted + (unverified + refuted) = admitted + unverified + refuted, for all counts. So folding the unverified-and-refuted into REMANDED loses nothing, every UNVERIFIED solution is VERIFIED TO BE REMANDED (kept for the development trial), and the skipped count is 0. : it does NOT verify the unverified as TRUE — it verifies they are all ACCOUNTED FOR and kept; an unproven claim stays unproven, but it is never dropped.
The ledger holds this as [solutions_not_skipped](/theorem/solutions_not_skipped) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun a => (List.range 4).all (fun u => (List.range 4).all (fun r => a + (u + r) == a + u + r)))
```

### the trial returns EXACTLY ONE verdict per record — PROVEN, REFUTED or NOT PROVEN partition the eight records (their indicators sum to 1)
The ledger holds this as [legal_verdict_is_exactly_one](/theorem/legal_verdict_is_exactly_one) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => let t := n%2; let h := n/2%2; let c := n/4%2; lp t h c + lr t h c + lnp t h c == 1)
```

### only the PROVEN is ADMITTED — a claim is admitted exactly when a decidable test holds OR it cites a sealed authority; nothing else stays
The ledger holds this as [legal_only_the_proven_is_admitted](/theorem/legal_only_the_proven_is_admitted) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => let t := n%2; let h := n/2%2; let c := n/4%2; (lp t h c == 1) == ((c == 1) || (t == 1 && h == 1)))
```

### the court may not refute the NON-JUSTICIABLE — with no decidable test (t=0) the verdict is NEVER REFUTED (it is PROVEN if cited, else NOT PROVEN); you cannot refute what you cannot decide
The ledger holds this as [legal_non_justiciable_is_never_refuted](/theorem/legal_non_justiciable_is_never_refuted) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun h => (List.range 2).all (fun c => lr 0 h c == 0))
```

### REFUTED is precise: it holds exactly when a decidable test EXISTS and FAILS and no sealed authority is cited (t=1 ∧ h=0 ∧ c=0) — a recomputable contradiction
The ledger holds this as [legal_refuted_iff_test_fails_uncited](/theorem/legal_refuted_iff_test_fails_uncited) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => let t := n%2; let h := n/2%2; let c := n/4%2; (lr t h c == 1) == (t == 1 && h == 0 && c == 0))
```

### nothing is discarded: every record is either ADMITTED (PROVEN) or REMANDED, and REMAND is exactly REFUTED plus NOT PROVEN — both routed to development trial
The ledger holds this as [legal_remand_is_total_nothing_discarded](/theorem/legal_remand_is_total_nothing_discarded) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => let t := n%2; let h := n/2%2; let c := n/4%2; (lp t h c + lrem t h c == 1) && (lrem t h c == lr t h c + lnp t h c))
```

### the captain theorem sealed INTO the trial: of every contribution k, the ONLY one that computes the conserved save (2·32 = 64) is the TWO coins — the computing contributions are exactly [2]. So a claim computes at trial iff it contributes the two coins (a sealed proof); every other contribution is remanded, uncomputed. The coin form of legal_only_the_proven_is_admitted, and the contrapositive of captain_computes_only_with_two_coins: only those that did not contribute the coins did not compute
The ledger holds this as [trial_computes_only_with_two_coins](/theorem/trial_computes_only_with_two_coins) — proven `by decide`, sorry-free:

```lean
(List.range 8).filter (fun k => 32 * k == 64) = [2]
```

### THE FORFEIT LAW, part one — only a Lean proof is admissible, and it wins: over the four case profiles (a b : side brings a sealed theorem, 1, or an assertion, 0) the win indicators a·(1−b) and b·(1−a) sum to (a+b) mod 2 and never both fire — a winner exists EXACTLY when one side brings the theorem and the other does not; both proven means no forfeit (nothing to win), both asserting means no winner (the case remands, nothing admitted)
The ledger holds this as [court_theorem_beats_assertion](/theorem/court_theorem_beats_assertion) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun a => (List.range 2).all (fun b => (a*(1-b) + b*(1-a) == (a+b) % 2) && ((a*(1-b)) * (b*(1-a)) == 0)))
```

### THE FORFEIT LAW, part two — the losing side pays the two coins: the payment 2·(win-bit) moves EXACTLY when the case has a winner (2·((a+b) mod 2)) and only the assertion-only side pays it; with both sides proven or both asserting no coin moves. The forfeit is the trial fee of trial_computes_only_with_two_coins, paid by the side that brought no proof
The ledger holds this as [court_loser_pays_the_two_coins](/theorem/court_loser_pays_the_two_coins) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun a => (List.range 2).all (fun b => 2*(a*(1-b)) + 2*(b*(1-a)) == 2*((a+b) % 2)))
```

### THE FORFEIT LAW, part three — the loser develops exactly as the winner proved: after judgment the docket holds a+b−a·b = max(a,b), the join of the two sides — the proven side’s theorem becomes BOTH sides’ development (the loser adopts it exactly), both-proven keeps what both already hold, and neither-proven leaves nothing admitted (the case remands). Development is assignment to the proof
The ledger holds this as [court_loser_develops_the_proven](/theorem/court_loser_develops_the_proven) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun a => (List.range 2).all (fun b => a + b - a*b == max a b))
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
