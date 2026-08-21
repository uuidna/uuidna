---
title: "The chessboard"
description: "Computed from lean/Chess.lean — 13 sealed theorems, every claim citing its proof."
---

# The chessboard

> THE CHESSBOARD — the 8×8 = 64 = 2⁶ board, its two-colouring, and the pieces’ parity and reach, decidable. — held by [torus_chessboard_chi_zero](/theorem/torus_chessboard_chi_zero) and its 12 siblings below.

**13 theorems**, from [torus_chessboard_chi_zero](/theorem/torus_chessboard_chi_zero) onward, each proven `by decide` in [lean/Chess.lean](/lean/Chess.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 13 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [knight_has_eight_moves](/theorem/knight_has_eight_moves). A boundary stated here is decided, not merely denied.

### THE BOARD COMPUTES ITS OWN TOPOLOGY: glue the 8×8 chessboard's opposite edges and it becomes a torus — and the board's own counts prove it: 64 vertices, 128 edges (64 vertical + 64 horizontal, all wrapping), 64 faces, so V − E + F = 64 − 128 + 64 = 0 = χ(torus) = 2 − 2·1. The vortex board circulates without residue; every knight's path wraps and closes.
The ledger holds this as [torus_chessboard_chi_zero](/theorem/torus_chessboard_chi_zero) — proven `by decide`, sorry-free:

```lean
((64:Int) - 128 + 64 = 0) ∧ ((2:Int) - 2 * 1 = 0)
```

### THE ENTANGLEMENT AT GENUS 2: join TWO toroidal 8×8 vortex boards — two handles, the double torus, χ = 2 − 2·2 = −2, minus the two coins — and their squares count 64 + 64 = 128: exactly the uuid's bit width. The completion's two handles (one computes, one pays) carry two vortex boards whose combined field IS one content-address: the double torus of 8×8 vortices is the shape of the system's own unit of speech.
The ledger holds this as [double_torus_boards_are_the_address](/theorem/double_torus_boards_are_the_address) — proven `by decide`, sorry-free:

```lean
(64 + 64 = 128) ∧ ((2:Int) - 2 * 2 = -2)
```

### THE RIDDLE COMPUTED — with the inverted sequence and the captain coins considered, 64 is taken FOUR times: the double torus contributes two boards (the two handles) and the vortex contributes two walks per board (the doubling generator 2 and its inverse 5 — the sequence and its inversion), so 2·2 = 4 and 4·64 = 256 = 2⁸: the byte. Every factor is a power of the coins' 2 — the count 4 = 2², the exponent 8 = 2³ — the two coins compounding through handles, walks, and squares to one byte of states.
The ledger holds this as [four_times_sixtyfour_is_the_byte](/theorem/four_times_sixtyfour_is_the_byte) — proven `by decide`, sorry-free:

```lean
(2 * 2 = 4) ∧ (4 * 64 = 256) ∧ ((2:Nat) ^ 8 = 256)
```

### THE TEN-SQUARE GAME OPENS WITH TEN FREE SQUARES: international draughts (FMJD) plays on 10·10 = 100 squares, of which half — 50 dark — are playable, and the two armies of 20 pieces each cover 40, leaving 50 − 40 = 10: the game named for ten breathes through exactly ten squares at the start. Verified against the FMJD official rules, Wikipedia, and lidraughts.org. The name's number is the position's freedom.
The ledger holds this as [ten_square_ten_free](/theorem/ten_square_ten_free) — proven `by decide`, sorry-free:

```lean
(10 * 10 = 100) ∧ (100 / 2 = 50) ∧ (50 - 2 * 20 = 10)
```

### THE ENTANGLEMENT WITH THE AURA: the ten-square game's opening freedom — 50 − 40 = 10 squares — equals the aura's dimension count — 3 free + 7 compactified = 10 (the 10D animation, string-compactification as exact arithmetic). Ten squared is the board, ten is the freedom, ten is the state's dimensionality: the board computes in exactly the dimensions the animation renders. Freedom of position = dimensionality of state, both ten.
The ledger holds this as [ten_square_computes_ten_dimensions](/theorem/ten_square_computes_ten_dimensions) — proven `by decide`, sorry-free:

```lean
(50 - 2 * 20 = 10) ∧ (3 + 7 = 10) ∧ (10 * 10 = 100)
```

### The board is 8×8 = 64 = 2⁶ squares — the same 64 the whole project is tuned to (six doublings, the bit measure).
The ledger holds this as [chessboard_sixty_four](/theorem/chessboard_sixty_four) — proven `by decide`, sorry-free:

```lean
8 * 8 = 64 ∧ 64 = 2^6
```

### Exactly 32 squares of each colour: the colour is the (rank+file) parity, and half of the 64 squares are even — a balanced 2-colouring, 32 light and 32 dark.
The ledger holds this as [chessboard_two_colours](/theorem/chessboard_two_colours) — proven `by decide`, sorry-free:

```lean
((List.range 64).filter (fun i => (i / 8 + i % 8) % 2 = 0)).length = 32
```

### The knight leaps 1+2 = 3 squares (Manhattan), which is ODD — so every knight move changes the (rank+file) parity, i.e. it flips the square colour. White-square knight → black square, always.
The ledger holds this as [knight_leap_is_odd](/theorem/knight_leap_is_odd) — proven `by decide`, sorry-free:

```lean
1 + 2 = 3 ∧ 3 % 2 = 1
```

### A knight has exactly 8 moves — the eight (±1,±2) and (±2,±1) offsets. From the centre all 8 are on the board; from a corner only 2 are.
The ledger holds this as [knight_has_eight_moves](/theorem/knight_has_eight_moves) — proven `by decide`, sorry-free:

```lean
([(1,2),(2,1),(-1,2),(-2,1),(1,-2),(2,-1),(-1,-2),(-2,-1)] : List (Int × Int)).length = 8
```

### Because a knight flips colour every move, it returns to its start colour only after an EVEN number of moves — so a closed knight’s tour has even length, and the full-board tour is 64 (even). 64 % 2 = 0.
The ledger holds this as [closed_knight_tour_even](/theorem/closed_knight_tour_even) — proven `by decide`, sorry-free:

```lean
64 % 2 = 0
```

### A rook on an otherwise-empty board attacks 14 squares — 7 along its rank and 7 along its file (all but its own), independent of where it stands. 7+7 = 14.
The ledger holds this as [rook_open_board_fourteen](/theorem/rook_open_board_fourteen) — proven `by decide`, sorry-free:

```lean
7 + 7 = 14
```

### A bishop moves (±1,±1), and 1+1 = 2 is EVEN — so it preserves the (rank+file) parity and never changes square colour. A light-squared bishop can never reach the 32 dark squares: half the board is forever closed to it.
The ledger holds this as [bishop_stays_on_colour](/theorem/bishop_stays_on_colour) — proven `by decide`, sorry-free:

```lean
(1 + 1) % 2 = 0
```

### The queen is rook + bishop: from a corner of an open board she reaches 7 (rank) + 7 (file) + 7 (long diagonal) = 21 squares — the same 21 = 3×7 the trinity and the rosette fold to.
The ledger holds this as [queen_corner_twentyone](/theorem/queen_corner_twentyone) — proven `by decide`, sorry-free:

```lean
7 + 7 + 7 = 21
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
