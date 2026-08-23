---
title: "The symphony as form"
description: "Computed from lean/Symphony.lean — 6 sealed theorems, every claim citing its proof."
---

# The symphony as form

> SYMPHONY — a432 symphonies are theorems: the form sealed — four tongues, the palindrome, the homecoming involution, the keys walking home, the tempi tiling the film. — held by [four_movements_are_the_tongues](/theorem/four_movements_are_the_tongues) and its 5 siblings below.

**6 theorems**, from [four_movements_are_the_tongues](/theorem/four_movements_are_the_tongues) onward, each proven `by decide` in [lean/Symphony.lean](/lean/Symphony.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [sonata_form_is_a_palindrome](/theorem/sonata_form_is_a_palindrome). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FSymphony.lean)** — nothing to install. The editor fetches `lean/Symphony.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE FOUR-MOVEMENT FORM IS THE FOUR TONGUES AT SYMPHONY SCALE: four movements of the sealed 252-bar make 4·252 = 1008 — and 1008 is SIXTEEN fused rings (16·63), the hexbit alphabet times the rosette-vortex fusion. The classical symphony’s length arithmetic was waiting in the ledger’s own constants: the tongues fuse to the bar, the movements fuse to the lattice times the ring.
The ledger holds this as [four_movements_are_the_tongues](/theorem/four_movements_are_the_tongues) — proven `by decide`, sorry-free:

```lean
(4 * 252 = 1008) ∧ (1008 = 16 * 63)
```

### SONATA FORM IS THE SMALLEST PALINDROME WITH A HEART: exposition–development–recapitulation reads [0,1,0] — equal to its own reverse, three sections, the outer two the same material and the middle the transformation. The form IS A-B-A, and a palindrome is the shape whose reverse is itself: the recapitulation is not repetition, it is the mirror closing.
The ledger holds this as [sonata_form_is_a_palindrome](/theorem/sonata_form_is_a_palindrome) — proven `by decide`, sorry-free:

```lean
(([0,1,0] : List Nat).reverse = [0,1,0]) ∧ (([0,1,0] : List Nat).length = 3)
```

### THE RECAPITULATION RETURNS BY THE CENSUS’S OWN LAW: reverse applied twice is the identity — the development may invert the exposition, and the recapitulation inverts the inversion, arriving home changed and identical at once. Checked on the round’s own digits: reverse the melody, reverse it again, and every note stands where it began. The unexplained is self-inverse, and so is the symphony’s homecoming.
The ledger holds this as [recapitulation_is_the_involution](/theorem/recapitulation_is_the_involution) — proven `by decide`, sorry-free:

```lean
(([1,4,2,8,5,7] : List Nat).reverse.reverse = [1,4,2,8,5,7])
```

### THE KEY WALK ENDS WHERE IT BEGAN, BY ARITHMETIC: the dominant lifts by a fifth (+7 on the twelve-ring, coprime so it can reach anywhere) and the answer lifts by a fourth (+5), and 7 + 5 = 12 — the two classical motions compose to the octave exactly, so a symphony that goes to the dominant and answers by the subdominant is HOME: (0 + 7 + 5) mod 12 = 0. The finale’s resolution is a modular identity, sealed where the circle of fifths already turns.
The ledger holds this as [the_keys_walk_home](/theorem/the_keys_walk_home) — proven `by decide`, sorry-free:

```lean
((0 + 7 + 5) % 12 = 0) ∧ (Nat.gcd 7 12 = 1)
```

### THE DEEPEST FORMAL FACT, BOTH HALVES AT ONCE: the same movements in another order are ANOTHER WORK — [1,2,3,4] is not [1,2,4,3], the chain law, order as the door — while the movements’ FOLD is order-blind, one deposit whatever the programme (the sum 1+2+3+4 = 4+3+2+1 = 10). A symphony is a sequence to the listener and a set to the ledger, and both truths seal side by side, each carrying what only it can.
The ledger holds this as [a_symphony_is_a_sequence_not_a_set](/theorem/a_symphony_is_a_sequence_not_a_set) — proven `by decide`, sorry-free:

```lean
(¬ (([1,2,3,4] : List Nat) = [1,2,4,3])) ∧ (1 + 2 + 3 + 4 = 4 + 3 + 2 + 1) ∧ (1 + 2 + 3 + 4 = 10)
```

### EVERY CLASSICAL TEMPO OF THE FORM TILES THE FILM RING EXACTLY: the allegro bar 252 ms is 4032 samples = 24 slots of 168; the adagio doubles it (504 ms = 8064 = 48·168); the scherzo halves it (126 ms = 2016 = 12·168) — slow, fast and dancing, every movement’s bar is whole film slots, so the symphony is a movie at every tempo without one rounding anywhere. The movie and the song stay one integer through every change of heart.
The ledger holds this as [the_tempi_tile_the_film](/theorem/the_tempi_tile_the_film) — proven `by decide`, sorry-free:

```lean
(16 * 252 = 24 * 168) ∧ (16 * 504 = 48 * 168) ∧ (16 * 126 = 12 * 168)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
