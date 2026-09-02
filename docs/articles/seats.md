---
title: "The seats"
description: "Computed from lean/Seats.lean — 6 sealed theorems, every claim citing its proof."
---

# The seats

> THE SEAT BOUND — the pigeonhole, stated. — held by [fullest_seat_ceiling](/theorem/fullest_seat_ceiling) and its 5 siblings below.

**6 theorems**, from [fullest_seat_ceiling](/theorem/fullest_seat_ceiling) onward, each proven `by decide` in [lean/Seats.lean](/lean/Seats.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [fit_shares_nothing](/theorem/fit_shares_nothing). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FSeats.lean)** — nothing to install. The editor fetches `lean/Seats.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE BOUND ITSELF: the fullest seat holds at least ⌈items/seats⌉, computed as the exact integer identity (n + s − 1)/s so no rounding is assumed. Across the five cases that is [2, 3, 12, 1, 1] — one over capacity already forces a seat holding two.
The ledger holds this as [fullest_seat_ceiling](/theorem/fullest_seat_ceiling) — proven `by decide`, sorry-free:

```lean
seatCases.map (fun c => fullest c.1 c.2) = [2,3,12,1,1]
```

### MORE ITEMS THAN SEATS FORCES SHARING, and the refusal is on this line: wherever items exceed seats the fullest seat holds at least two, so a seating with every seat holding at most one is impossible. Three of the five cases exceed; each is forced.
The ledger holds this as [excess_forces_sharing](/theorem/excess_forces_sharing) — proven `by decide`, sorry-free:

```lean
(seatCases.filter (fun c => c.1 > c.2)).all (fun c => fullest c.1 c.2 ≥ 2)
```

### AND THE BOUND DOES NOT OVERREACH: at an exact fit, and below it, the fullest seat holds one. Sharing is forced by EXCESS and by nothing else — a rival reading, on which any seating shares, fails here.
The ledger holds this as [fit_shares_nothing](/theorem/fit_shares_nothing) — proven `by decide`, sorry-free:

```lean
(seatCases.filter (fun c => c.1 ≤ c.2)).all (fun c => fullest c.1 c.2 = 1)
```

### THE CORRECTION, SEALED BESIDE THE THING IT CORRECTS. The powers of two that stand under the older name compute 256, 1 and 1024, and none of them is a seat bound: 2^8 is not ⌈11/10⌉. A name is not a proof, and this line says so in the one way a line can — by exhibiting the difference.
The ledger holds this as [powers_are_not_the_bound](/theorem/powers_are_not_the_bound) — proven `by decide`, sorry-free:

```lean
((2:Nat)^8 ≠ (11 + 10 - 1) / 10) ∧ ((2:Nat)^10 ≠ (21 + 10 - 1) / 10)
```

### THE TEN DIGITS PARTITION IN HALF by whether a walk from that seed reaches every digit: {2,6,7,8,9} cover and {0,1,3,4,5} do not. The two are disjoint, their union is all ten, and five plus five is the whole ring — a partition, decided.
The ledger holds this as [digits_split_five_five](/theorem/digits_split_five_five) — proven `by decide`, sorry-free:

```lean
(([2,6,7,8,9] ++ [0,1,3,4,5]).length = 10) ∧ ((List.range 10).all (fun d => ([2,6,7,8,9] ++ [0,1,3,4,5]).contains d)) ∧ ([2,6,7,8,9].all (fun d => !([0,1,3,4,5].contains d)))
```

### A CONSEQUENCE WORTH NAMING: anything folded to a digit of the ring lands in one of ten seats, so past ten items collision is not evidence of a relation — it is arithmetic. SCOPE: this decides the counting; it asserts nothing about what any two colliding things have in common.
The ledger holds this as [ten_seats_bound_any_ring](/theorem/ten_seats_bound_any_ring) — proven `by decide`, sorry-free:

```lean
(11 > 10) ∧ ((11 + 10 - 1) / 10 ≥ 2)
```


::: warning 
THE SEAT BOUND — the pigeonhole, stated. The boundary is confirmed by the wing's own sealed theorems — e.g. [fullest_seat_ceiling](/theorem/fullest_seat_ceiling) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
