---
title: "THE FAMILIES, Y"
description: "Computed from lean/FamiliesY.lean — 1 sealed theorems, every claim citing its proof."
---

# THE FAMILIES, Y

> THE FAMILIES, Y — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. — held by [fam_yield](/theorem/fam_yield) and its 0 siblings below.

**1 theorems** and **409 decided cases**, from [fam_yield](/theorem/fam_yield) onward, each proven `by decide` in <a href="/lean/FamiliesY.lean">lean/FamiliesY.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFamiliesY.lean)** — nothing to install. The editor fetches `lean/FamiliesY.lean` from the repository and re-decides all 1 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### yield: couponrate(80, 1000) = 8; current(500, 10000) = 5; dividendyield(250, 10000) = 2; effective(2, 4) = 8; nominal(60, 1000) = 6; realyield(7, 3) = 4; realyield(2, 5) = 0; taxequivalent(4, 20) = 5; yieldtomaturity(50, 10, 1000) = 6
The ledger holds this as [fam_yield](/theorem/fam_yield) — proven `by decide`, sorry-free:

```lean
((((80 : Int) * (100 : Int)) / (1000 : Int)) = (8 : Int)) ∧ ((((500 : Int) * (100 : Int)) / (10000 : Int)) = (5 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (10000 : Int)) = (2 : Int)) ∧ (((2 : Int) * (4 : Int)) = (8 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (1000 : Int)) = (6 : Int)) ∧ ((fmax (0 : Int) ((7 : Int) - (3 : Int))) = (4 : Int)) ∧ ((fmax (0 : Int) ((2 : Int) - (5 : Int))) = (0 : Int)) ∧ ((((4 : Int) * (100 : Int)) / ((100 : Int) - (20 : Int))) = (5 : Int)) ∧ (((((50 : Int) + (10 : Int)) * (100 : Int)) / (1000 : Int)) = (6 : Int))
```


::: warning 
THE FAMILIES, Y — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. The boundary is confirmed by the wing's own sealed theorems — e.g. [fam_yield](/theorem/fam_yield) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
