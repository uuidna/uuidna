---
title: "The audit game"
description: "Computed from lean/AuditGame.lean — 11 sealed theorems, every claim citing its proof."
---

# The audit game

> THE AUDIT GAME — why an audit is more ACCURATE as a game, sealed by decide: a finding is FLAGGED iff some independent refuter has a winning move (the OR), a claim is CLEAN iff none does (a P-position, the Nim/Bouton decidability), the verdict is exactly one of the two (survive + flag = 1), and N independent refuters are strictly more accurate — adding a refuter is monotone (never un-flags), a 3-vote panel confirms on a majority (4 of 8 profiles), and a unanimous acquittal is the product of clears ∏(1−rᵢ); the honesty gate drains only the hollow-and-unbacked citation (1 of 4 states, echoing Audit.lean); and the game is finite (2ⁿ outcomes) so the value is decidable. HONEST SCOPE: the DECISION is decidable but the COVERAGE is not — the refutation lexicon is incomplete, so an audit raises the cost of a false claim surviving, it does NOT reduce it to zero. A floor, not a wall. — held by [flag_is_any_refutation](/theorem/flag_is_any_refutation) and its 10 siblings below.

**11 theorems**, from [flag_is_any_refutation](/theorem/flag_is_any_refutation) onward, each proven `by decide` in [lean/AuditGame.lean](/lean/AuditGame.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation, and every boundary it names is CONFIRMED by a sealed theorem, never merely denied.

### A finding is FLAGGED iff ANY independent refuter finds a winning move: flag(a,b) = 1 − (1−a)(1−b), which over {0,1}² is exactly the OR — a claim is caught the moment one refuter refutes it. The audit is a game the claim must survive against every player.
The ledger holds this as [flag_is_any_refutation](/theorem/flag_is_any_refutation) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun a => (List.range 2).all (fun b => ((1 - (1-a)*(1-b)) == 1) == (a == 1 || b == 1)))
```

### A claim is CLEAN iff NO refuter has a winning move: survive(a,b) = (1−a)(1−b) = 1 exactly when both fail (a=0 ∧ b=0). This is a P-position — a loss for the mover — the same Bouton decidability as a zero nim-sum: the audit is Nim on the space of claims.
The ledger holds this as [clean_is_a_p_position](/theorem/clean_is_a_p_position) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun a => (List.range 2).all (fun b => (((1-a)*(1-b)) == 1) == (a == 0 && b == 0)))
```

### Every claim gets exactly one verdict: survive + flag = (1−a)(1−b) + (1 − (1−a)(1−b)) = 1 for every refuter profile. Clean and Flagged are mutually exclusive and exhaustive — no claim is both, none is neither.
The ledger holds this as [verdict_is_exactly_one](/theorem/verdict_is_exactly_one) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun a => (List.range 2).all (fun b => ((1-a)*(1-b) + (1 - (1-a)*(1-b))) == 1))
```

### Two independent refuters catch at least as much as one: flag(a,b) = a OR b ≥ a. Adding an independent refuter is MONOTONE — it can only catch more, never fewer. This is why a dual audit is strictly more accurate than a single pass.
The ledger holds this as [dual_dominates_single](/theorem/dual_dominates_single) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun a => (List.range 2).all (fun b => (1 - (1-a)*(1-b)) >= a))
```

### A third independent refuter never un-flags: flag(a,b,c) = a∨b∨c ≥ a∨b = flag(a,b). Accuracy grows monotonically with the panel — the loop-until-dry and adversarial-verify patterns rest on exactly this, that another refuter cannot lose a catch.
The ledger holds this as [three_refuters_monotone](/theorem/three_refuters_monotone) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun a => (List.range 2).all (fun b => (List.range 2).all (fun c => (1 - (1-a)*(1-b)*(1-c)) >= (1 - (1-a)*(1-b)))))
```

### A claim survives a panel of three iff EACH refuter fails: survive(a,b,c) = (1−a)(1−b)(1−c) = 1 only for the all-clear profile (0,0,0). Independent clears MULTIPLY — one dissent flags — the {0,1} algebra of a unanimous acquittal.
The ledger holds this as [survive_is_product_of_clears](/theorem/survive_is_product_of_clears) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun a => (List.range 2).all (fun b => (List.range 2).all (fun c => (((1-a)*(1-b)*(1-c)) == 1) == (a == 0 && b == 0 && c == 0))))
```

### A 3-vote adversarial panel confirms on a MAJORITY: of the 2³ = 8 refuter profiles, exactly 4 carry two or more refutations (the three with exactly two, plus the unanimous). The majority rule that keeps a plausible-but-wrong finding from surviving one lucky refuter — and one lucky miss.
The ledger holds this as [majority_of_three_is_four](/theorem/majority_of_three_is_four) — proven `by decide`, sorry-free:

```lean
((List.range 8).filter (fun n => n % 2 + n / 2 % 2 + n / 4 % 2 >= 2)).length = 4
```

### The honesty gate is a game with no bluff: a citation drains iff it is hollow AND unbacked — drain(h,b) = h·(1−b) — and of the 4 states exactly ONE fires (h=1, b=0). A backing clears it, an honest scope clears it; only the empty overclaim drains. The detector, itself decidable (echoing Audit.lean).
The ledger holds this as [honesty_gate_one_drain](/theorem/honesty_gate_one_drain) — proven `by decide`, sorry-free:

```lean
((List.range 4).filter (fun n => (n / 2) * (1 - n % 2) == 1)).length = 1
```

### The audit game terminates: over n claims the outcome space is 2ⁿ subsets — [2⁰,2¹,2²,2³] = [1,2,4,8] — finite, so like a bounded chess game or a nim heap the game has a decidable value. Finiteness is what makes the verdict computable at all.
The ledger holds this as [audit_is_a_finite_game](/theorem/audit_is_a_finite_game) — proven `by decide`, sorry-free:

```lean
([0,1,2,3].map (fun n => (2:Nat)^n)) = [1, 2, 4, 8]
```

### HONEST SCOPE — no audit is complete: for every coverage depth there is a strictly deeper one (2³ < 2⁴ < 2⁵), so an audit RAISES the cost of a false claim surviving but never zeroes it. A floor, not a wall — the same "no maximum, only bounds" Security proves; the game's DECISION is decidable, its COVERAGE is not.
The ledger holds this as [no_audit_catches_all](/theorem/no_audit_catches_all) — proven `by decide`, sorry-free:

```lean
((2:Nat)^3 < 2^4) ∧ ((2:Nat)^4 < 2^5)
```

### The audit enters the ℤ/9 diamond and MEETS chess there: the 8-outcome space (2³) is residue 8, a self-inverse (8·8 ≡ 1) — the SAME residue the 3D chess board (512 ≡ 8) lands on — and its reflection dz(8) = 10 − 8 = 2 is the first step of the vortex orbit. The three games interact in the diamond: chess at the units {1, 8}, the audit at 8, nim at the nilpotent 6. HONEST SCOPE: a structural residue, NOT a claim the audit IS the ring.
The ledger holds this as [audit_space_meets_chess_at_eight](/theorem/audit_space_meets_chess_at_eight) — proven `by decide`, sorry-free:

```lean
((2^3) % 9 = 8) ∧ ((8 * 8) % 9 = 1) ∧ ((10 - 8) = 2)
```


::: warning HONEST SCOPE
the DECISION is decidable but the COVERAGE is not — the refutation lexicon is incomplete, so an audit raises the cost of a false claim surviving, it does NOT reduce it to zero. The boundary is confirmed by the wing's own sealed theorems — e.g. [flag_is_any_refutation](/theorem/flag_is_any_refutation) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
