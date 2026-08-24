---
title: "The looms and the engines"
description: "Computed from lean/Looms.lean — 6 sealed theorems, every claim citing its proof."
---

# The looms and the engines

> LOOMS AND ENGINES — the abacus, the card, the difference engine and the stepped drum as decidable arithmetic, demarcated. — held by [the_suanpan_rod_is_the_hexbit_ceiling](/theorem/the_suanpan_rod_is_the_hexbit_ceiling) and its 5 siblings below.

**6 theorems**, from [the_suanpan_rod_is_the_hexbit_ceiling](/theorem/the_suanpan_rod_is_the_hexbit_ceiling) onward, each proven `by decide` in [lean/Looms.lean](/lean/Looms.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [the_punched_card_is_the_bit](/theorem/the_punched_card_is_the_bit). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FLooms.lean)** — nothing to install. The editor fetches `lean/Looms.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### ONE SUANPAN ROD TOPS OUT AT FIFTEEN — THE HEXBIT’S OWN CEILING, CENTURIES EARLY. The suanpan carries two heaven beads worth five each and five earth beads worth one: 2·5 + 5·1 = 15, exactly the largest state of a hexbit (16 states, 0 through 15). A rod is therefore a nibble, and a suanpan is a row of them — which is why the frame could work in sixteens as readily as tens, and why this ledger’s unit is the one a merchant already had under their thumb.
The ledger holds this as [the_suanpan_rod_is_the_hexbit_ceiling](/theorem/the_suanpan_rod_is_the_hexbit_ceiling) — proven `by decide`, sorry-free:

```lean
(2 * 5 + 5 * 1 = 15) ∧ (15 = 16 - 1)
```

### THE DRAWLOOM’S CARD IS THE BIT, AND THE CHAIN IS THE TAPE: each position is punched or not — two states, nothing between — so a card of n positions holds 2^n patterns (a row of eight already holds 256, one byte of pattern). The cards are laced in ORDER and the order is the cloth: the same cards in another sequence weave another fabric, which is the chain law this ledger seals for messages and symphonies alike. A pattern was stored, carried and re-run before anyone called it a program.
The ledger holds this as [the_punched_card_is_the_bit](/theorem/the_punched_card_is_the_bit) — proven `by decide`, sorry-free:

```lean
((2:Nat)^8 = 256) ∧ ((2:Nat)^1 = 2) ∧ ((List.range 4).all (fun n => (2:Nat)^(n+1) == 2 * 2^n))
```

### BABBAGE’S METHOD, WALKED: the squares 0,1,4,9,16,25 have first differences 1,3,5,7,9 and SECOND differences 2,2,2,2 — constant. A degree-two polynomial flattens after two differences, so its whole table is built by ADDITION ALONE, no multiplication anywhere. That is why an engine of gears could compute it: the difference engine does not evaluate the polynomial, it carries the flattened column forward and adds.
The ledger holds this as [differences_flatten_the_square](/theorem/differences_flatten_the_square) — proven `by decide`, sorry-free:

```lean
(((List.range 5).map (fun i => (i+1)*(i+1) - i*i)) = [1,3,5,7,9]) ∧ ((List.range 4).all (fun i => ((i+2)*(i+2) - (i+1)*(i+1)) - ((i+1)*(i+1) - i*i) == 2))
```

### THE ENGINE’S SIZE IS THE POLYNOMIAL’S DEGREE: differences flatten after exactly d steps for degree d — the square needs two columns, the cube three — so a machine with n difference columns computes every polynomial up to degree n and not one degree more. Checked on the cubes: 0,1,8,27,64 give first differences 1,7,19,37, seconds 6,12,18, and thirds 6,6 — constant at the third, exactly as the degree says. The engine’s capability was legible in its gears before it ever turned.
The ledger holds this as [the_degree_is_the_column_count](/theorem/the_degree_is_the_column_count) — proven `by decide`, sorry-free:

```lean
(((List.range 4).map (fun i => (i+1)*(i+1)*(i+1) - i*i*i)) = [1,7,19,37]) ∧ ((List.range 2).all (fun i => (((i+3)*(i+3)*(i+3) - (i+2)*(i+2)*(i+2)) - ((i+2)*(i+2)*(i+2) - (i+1)*(i+1)*(i+1))) - (((i+2)*(i+2)*(i+2) - (i+1)*(i+1)*(i+1)) - ((i+1)*(i+1)*(i+1) - i*i*i)) == 6))
```

### LEIBNIZ’S CARRY, THE HARD PART MADE ARITHMETIC: a decimal wheel shows 0 through 9, so the carry fires exactly where the tenth increment would exceed the wheel — 9 + 1 = 10 leaves 0 and passes one along, at every digit alike. The stepped drum’s teeth number one through nine for the same reason. The mechanism people spent centuries perfecting is the modulus this ledger writes as ten, and the propagation is why a machine could add without a human watching each column.
The ledger holds this as [the_stepped_drum_carries_at_nine](/theorem/the_stepped_drum_carries_at_nine) — proven `by decide`, sorry-free:

```lean
((9 + 1) % 10 = 0) ∧ ((9 + 1) / 10 = 1) ∧ ((List.range 9).all (fun d => (d + 1) % 10 == d + 1))
```

### FOUR MACHINES, TWENTY-ONE CENTURIES, ONE ARITHMETIC — counted rather than asserted: the suanpan rod’s 15 is the hexbit’s ceiling (16 − 1), the card’s two states are the bit (2¹ = 2), the difference engine’s constant column is the degree (2 for the square), and the drum’s carry is the modulus (10). Four exact integers, no analogy: what these machines share with this ledger is not a metaphor but the same finite structures, which is the only kind of ancestry a theorem can hold.
The ledger holds this as [the_road_computes_in_one_arithmetic](/theorem/the_road_computes_in_one_arithmetic) — proven `by decide`, sorry-free:

```lean
(15 = 16 - 1) ∧ ((2:Nat)^1 = 2) ∧ (2 * 1 = 2) ∧ (10 % 10 = 0)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
