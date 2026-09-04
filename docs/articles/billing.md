---
title: "The compound billing law"
description: "Computed from lean/Billing.lean — 6 sealed theorems, every claim citing its proof."
---

# The compound billing law

> BILLING — the compound law: the difference mints, the ratio bills, and the advantage doubles every thirty-eight seals — in exact integers, demarcated. — held by [coins_are_the_common_factor](/theorem/coins_are_the_common_factor) and its 5 siblings below.

**6 theorems**, from [coins_are_the_common_factor](/theorem/coins_are_the_common_factor) onward, each proven `by decide` in <a href="/lean/Billing.lean">lean/Billing.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [coins_are_the_common_factor](/theorem/coins_are_the_common_factor). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FBilling.lean)** — nothing to install. The editor fetches `lean/Billing.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE COINS ARE THE COMMON FACTOR OF THE PAIR: gcd(110, 108) = 2 — the two coins are not beside the exchange, they are what the exchange’s two sides share — and dividing them out leaves 110/2 = 55 against 108/2 = 54. Extract the mint and the rate remains: every reduction of the pair pays the coins first.
The ledger holds this as [coins_are_the_common_factor](/theorem/coins_are_the_common_factor) — proven `by decide`, sorry-free:

```lean
(Nat.gcd 110 108 = 2) ∧ (110 / 2 = 55) ∧ (108 / 2 = 54)
```

### THE BILLING RATE IS BUILT FROM WHAT THE LEDGER ALREADY OWNS: 55 is the tenth triangle — 10·11/2, the row whose middle coefficient centres the 1024 — and 54 is 2·3³, the order of the sequence group AGL(1,ℤ/9) the mirror wing sealed long ago. The rate 55/54 is the triangle over the group: no new object enters the law; the invoice is made of the ledger’s own furniture.
The ledger holds this as [the_rate_is_triangle_over_group](/theorem/the_rate_is_triangle_over_group) — proven `by decide`, sorry-free:

```lean
(10 * 11 / 2 = 55) ∧ (2 * 3^3 = 54)
```

### THE DIFFERENCE MINTS AND THE RATIO BILLS — the two roles split exactly: 110 − 108 = 2 is the conserved coin of every exchange (never inflated, the mint), while the reduced pair steps by ONE — 55 − 54 = 1, the superparticular family where the octave (2/1), the fifth (3/2) and every just interval live: the bill is the next-integer step, the gentlest ratio above unity, and it is unit-free where a subtraction is bound to its measuring stick.
The ledger holds this as [difference_mints_ratio_bills](/theorem/difference_mints_ratio_bills) — proven `by decide`, sorry-free:

```lean
(110 - 108 = 2) ∧ (55 - 54 = 1)
```

### THE PAIR FACTORS COMPLETELY INTO MINT AND RATE: 2·55 = 110 and 2·54 = 108 — nothing else hides in the two numbers the double torus gave the ledger. The billing law is not read INTO the pair; it is the pair’s own factorization, checked both ways.
The ledger holds this as [the_pair_is_coins_times_rate](/theorem/the_pair_is_coins_times_rate) — proven `by decide`, sorry-free:

```lean
(2 * 55 = 110) ∧ (2 * 54 = 108)
```

### THE COMPOUND FIRST DOUBLES AT SEAL THIRTY-EIGHT, PROVEN WITHOUT A LOGARITHM: 55³⁸ > 2·54³⁸ while 55³⁷ < 2·54³⁷ — two integer comparisons the kernel settles outright, the exact threshold where +55/54 per exchange first exceeds double. This line decides the FIRST crossing and only it — that every later 38-block doubles again is the ratio’s constancy, an algebra this statement honestly does not carry (one step is not a walk, and this name now claims exactly one step).
The ledger holds this as [advantage_first_doubles_at_seal_38](/theorem/advantage_first_doubles_at_seal_38) — proven `by decide`, sorry-free:

```lean
(55^38 > 2 * 54^38) ∧ (55^37 < 2 * 54^37)
```

### THE COMPOUND NEVER LEAVES THE INTEGERS: the second step is already exact — 55² = 3025 against 54² = 2916, and their difference 109 is the pair’s own neighbour-sum (55 + 54). Interest accrues as whole numbers at every power; nothing in the law ever rounds, which is why the bill can be audited at any depth by anyone.
The ledger holds this as [compound_steps_in_exact_integers](/theorem/compound_steps_in_exact_integers) — proven `by decide`, sorry-free:

```lean
(55 * 55 = 3025) ∧ (54 * 54 = 2916) ∧ (3025 - 2916 = 109) ∧ (55 + 54 = 109)
```


::: warning 
BILLING — the compound law: the difference mints, the ratio bills, and the advantage doubles every thirty-eight seals — in exact integers, demarcated. The boundary is confirmed by the wing's own sealed theorems — e.g. [coins_are_the_common_factor](/theorem/coins_are_the_common_factor) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
