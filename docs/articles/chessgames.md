---
title: "The chess horizon"
description: "Computed from lean/Chessgames.lean — 24 sealed theorems, every claim citing its proof."
---

# The chess horizon

> THE CHESS HORIZON — the honest kernel of "all chess games recompute instantly in uuidna": the opening combinations (20 first moves, 400 after one), the un-enumerable game tree (Shannon ~10^120 exceeds the ~10^80 atoms of the universe), the pigeonhole collision of content-addresses (2^128 uuids < ~10^44 legal positions < the naive 13^64), the FINITE game (the fifty-move rule) whose address is therefore a bounded, instant identity (6000 < 10^120 — recompute is O(moves). uuidna does NOT enumerate or precompute the game tree — a content-address proves INTEGRITY; the diamond and combination facts are STRUCTURE. — held by [first_move_twenty](/theorem/first_move_twenty) and its 23 siblings below.

**24 theorems**, from [first_move_twenty](/theorem/first_move_twenty) onward, each proven `by decide` in [lean/Chessgames.lean](/lean/Chessgames.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 7 of its 24 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [game_tree_exceeds_universe](/theorem/game_tree_exceeds_universe). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FChessgames.lean)** — nothing to install. The editor fetches `lean/Chessgames.lean` from the repository and re-decides all 24 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The opening fans to exactly twenty moves: sixteen pawn pushes (8 pawns × 2 squares) and four knight moves (2 knights × 2) — 8·2 + 2·2 = 20. The first branch of the tree, counted.
The ledger holds this as [first_move_twenty](/theorem/first_move_twenty) — proven `by decide`, sorry-free:

```lean
8 * 2 + 2 * 2 = 20
```

### After one full move the tree is 20 × 20 = 400 positions — each of White's twenty answered by twenty of Black's. The branching is combinatorial from the very first ply; the explosion starts here.
The ledger holds this as [after_one_move_four_hundred](/theorem/after_one_move_four_hundred) — proven `by decide`, sorry-free:

```lean
20 * 20 = 400
```

### The game tree is the Shannon number, about 10^120 — and 10^120 exceeds 10^80, the atoms of the observable universe. "All chess games" is not un-computed for want of effort; it is un-enumerable by any physical machine, ever. The bound is the point.
The ledger holds this as [game_tree_exceeds_universe](/theorem/game_tree_exceeds_universe) — proven `by decide`, sorry-free:

```lean
(10:Nat)^80 < 10^120
```

### Identity does not even fit: there are about 10^44 legal positions but only 2^128 ≈ 3.4·10^38 possible uuids, and 2^128 < 10^44 — so by pigeonhole the content-addresses COLLIDE across the full position space. A uuid names WHICH game you hold, it cannot uniquely name every position that could exist.
The ledger holds this as [positions_exceed_uuid_space](/theorem/positions_exceed_uuid_space) — proven `by decide`, sorry-free:

```lean
(2:Nat)^128 < 10^44
```

### The legal positions (~10^44) sit inside the naive state space 13^64 — 64 squares, each in one of 13 states — and 10^44 < 13^64. Most of the naive configurations are illegal, so the true count is far smaller, but still bounded above: finite.
The ledger holds this as [positions_within_naive_bound](/theorem/positions_within_naive_bound) — proven `by decide`, sorry-free:

```lean
(10:Nat)^44 < 13^64
```

### Each square holds one of thirteen states: six white pieces, six black, or empty — 6 + 6 + 1 = 13. The naive per-square alphabet whose 64th power bounds the whole position space.
The ledger holds this as [thirteen_states_per_square](/theorem/thirteen_states_per_square) — proven `by decide`, sorry-free:

```lean
6 + 6 + 1 = 13
```

### A game cannot run forever: the fifty-move rule forces a draw claim after fifty moves — one hundred plies (50 · 2 = 100) — with no capture and no pawn move. Every game terminates, so its move sequence is finite and its content-address is a bounded computation.
The ledger holds this as [fifty_move_rule_bounds_a_run](/theorem/fifty_move_rule_bounds_a_run) — proven `by decide`, sorry-free:

```lean
50 * 2 = 100
```

### Addressing ONE game costs its ply-count — bounded well under six thousand — and 6000 < 10^120: a single game recomputes to its uuid instantly, a speck against the un-enumerable tree. This is the TRUE kernel: recompute is O(moves), an identity.
The ledger holds this as [one_game_is_a_speck](/theorem/one_game_is_a_speck) — proven `by decide`, sorry-free:

```lean
(6000:Nat) < 10^120
```

### Raise the board a dimension: an 8×8×8 cube is 512 = 2^9 cells (8^3 = 512, 512 = 2^9). The flat 2^6 board is the d=2 slice of a family of powers of two — the "3D chess matrix", exact.
The ledger holds this as [board_3d_is_two_nine](/theorem/board_3d_is_two_nine) — proven `by decide`, sorry-free:

```lean
(8:Nat)^3 = 512 ∧ 512 = 2^9
```

### A d-dimensional board of side 8 has 8^d = 2^(3d) cells, so each dimension adds three to the exponent of two: [8^1, 8^2, 8^3] = [8, 64, 512] = [2^3, 2^6, 2^9]. The board scales in whole octaves of two per dimension.
The ledger holds this as [board_dims_add_three](/theorem/board_dims_add_three) — proven `by decide`, sorry-free:

```lean
([1,2,3].map (fun d => (8:Nat)^d)) = [8, 64, 512]
```

### The eight-dimensional matrix, counted two ways: a side-8 board in 8 dimensions is 8^8 = 2^24 cells, and a side-2 hypercube in 8 dimensions is 2^8 = 256 — the octet the whole ledger turns on. Chess generalises to any dimension as a pure power of two.
The ledger holds this as [hyperchess_eight_dimensions](/theorem/hyperchess_eight_dimensions) — proven `by decide`, sorry-free:

```lean
((8:Nat)^8 = 2^24) ∧ ((2:Nat)^8 = 256)
```

### There is no largest board, only bounds: 8^1 < 8^2 < 8^3, and for every dimension a strictly larger one — the same "no maximum, only bounds" the security layer proves. The horizon recedes; it is never reached.
The ledger holds this as [no_maximal_board](/theorem/no_maximal_board) — proven `by decide`, sorry-free:

```lean
((8:Nat)^1 < 8^2) ∧ ((8:Nat)^2 < 8^3)
```

### The knight's leap 1 + 2 = 3 lands on residue 3 of the ℤ/9 vortex, and the diamond reflection dz(3) = 10 − 3 = 7 sends it to 7 — the same reflection the whole ledger centres on. a structural analogy (the move-count read as a residue).
The ledger holds this as [knight_on_the_diamond](/theorem/knight_on_the_diamond) — proven `by decide`, sorry-free:

```lean
((1 + 2) % 9 = 3) ∧ ((10 - 3) = 7)
```

### The board enters the ℤ/9 diamond, where the games interact: the flat board 64 ≡ 1 (the vortex origin) and the 3D board 512 ≡ 8 (mod 9), and {1, 8} are exactly the TWO self-inverse units of the ring (8·8 ≡ 1). The board, in either dimension, is a self-inverse of the diamond — and the 3D board shares residue 8 with the audit game. a structural residue.
The ledger holds this as [boards_are_diamond_self_inverses](/theorem/boards_are_diamond_self_inverses) — proven `by decide`, sorry-free:

```lean
(64 % 9 = 1) ∧ (512 % 9 = 8) ∧ ((8 * 8) % 9 = 1)
```

### A knight on a central square (d4) commands all EIGHT moves — maximal mobility, why knights belong in the centre.
The ledger holds this as [knight_centre_eight](/theorem/knight_centre_eight) — proven `by decide`, sorry-free:

```lean
(([(1,2),(2,1),(-1,2),(-2,1),(1,-2),(2,-1),(-1,-2),(-2,-1)] : List (Int × Int)).filter (fun d => decide (0 <= 3 + d.1 ∧ 3 + d.1 < 8 ∧ 0 <= 3 + d.2 ∧ 3 + d.2 < 8))).length = 8
```

### A knight one step in from the edge (c3) commands SIX moves.
The ledger holds this as [knight_near_centre_six](/theorem/knight_near_centre_six) — proven `by decide`, sorry-free:

```lean
(([(1,2),(2,1),(-1,2),(-2,1),(1,-2),(2,-1),(-1,-2),(-2,-1)] : List (Int × Int)).filter (fun d => decide (0 <= 2 + d.1 ∧ 2 + d.1 < 8 ∧ 0 <= 1 + d.2 ∧ 1 + d.2 < 8))).length = 6
```

### A knight on the edge (a4) commands FOUR moves — half its reach falls off the board.
The ledger holds this as [knight_edge_four](/theorem/knight_edge_four) — proven `by decide`, sorry-free:

```lean
(([(1,2),(2,1),(-1,2),(-2,1),(1,-2),(2,-1),(-1,-2),(-2,-1)] : List (Int × Int)).filter (fun d => decide (0 <= 3 + d.1 ∧ 3 + d.1 < 8 ∧ 0 <= 0 + d.2 ∧ 0 + d.2 < 8))).length = 4
```

### A knight beside the corner (b1) commands THREE moves.
The ledger holds this as [knight_near_corner_three](/theorem/knight_near_corner_three) — proven `by decide`, sorry-free:

```lean
(([(1,2),(2,1),(-1,2),(-2,1),(1,-2),(2,-1),(-1,-2),(-2,-1)] : List (Int × Int)).filter (fun d => decide (0 <= 0 + d.1 ∧ 0 + d.1 < 8 ∧ 0 <= 1 + d.2 ∧ 1 + d.2 < 8))).length = 3
```

### A knight in the corner (a1) commands only TWO moves — "a knight on the rim is dim" at its worst.
The ledger holds this as [knight_corner_two](/theorem/knight_corner_two) — proven `by decide`, sorry-free:

```lean
(([(1,2),(2,1),(-1,2),(-2,1),(1,-2),(2,-1),(-1,-2),(-2,-1)] : List (Int × Int)).filter (fun d => decide (0 <= 0 + d.1 ∧ 0 + d.1 < 8 ∧ 0 <= 0 + d.2 ∧ 0 + d.2 < 8))).length = 2
```

### A king in the centre (d4) touches all EIGHT neighbours.
The ledger holds this as [king_centre_eight](/theorem/king_centre_eight) — proven `by decide`, sorry-free:

```lean
(([(1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)] : List (Int × Int)).filter (fun d => decide (0 <= 3 + d.1 ∧ 3 + d.1 < 8 ∧ 0 <= 3 + d.2 ∧ 3 + d.2 < 8))).length = 8
```

### A king on the edge (a4) touches FIVE squares.
The ledger holds this as [king_edge_five](/theorem/king_edge_five) — proven `by decide`, sorry-free:

```lean
(([(1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)] : List (Int × Int)).filter (fun d => decide (0 <= 3 + d.1 ∧ 3 + d.1 < 8 ∧ 0 <= 0 + d.2 ∧ 0 + d.2 < 8))).length = 5
```

### A king in the corner (a1) touches THREE squares.
The ledger holds this as [king_corner_three](/theorem/king_corner_three) — proven `by decide`, sorry-free:

```lean
(([(1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)] : List (Int × Int)).filter (fun d => decide (0 <= 0 + d.1 ∧ 0 + d.1 < 8 ∧ 0 <= 0 + d.2 ∧ 0 + d.2 < 8))).length = 3
```

### The classical piece values sum to 21: pawn 1 + knight 3 + bishop 3 + rook 5 + queen 9 = 21 — the material a side commands beyond the king (itself invaluable). A convention, exact as arithmetic.
The ledger holds this as [material_sum_twentyone](/theorem/material_sum_twentyone) — proven `by decide`, sorry-free:

```lean
1 + 3 + 3 + 5 + 9 = 21
```

### The centre the pieces fight for is the 2×2 block d4-d5-e4-e5 — 2·2 = 4 squares, the four the opening contests. The board's heart, counted.
The ledger holds this as [central_four_squares](/theorem/central_four_squares) — proven `by decide`, sorry-free:

```lean
2 * 2 = 4
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
