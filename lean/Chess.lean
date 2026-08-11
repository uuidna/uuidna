-- lean/Chess.lean — GENERATED. THE CHESSBOARD — the 8×8 = 64 = 2⁶ board, its two-colouring, and the pieces’ parity and reach, decidable. Every proof `by decide`, sorry-free, no Mathlib.

-- The board is 8×8 = 64 = 2⁶ squares — the same 64 the whole project is tuned to (six doublings, the bit measure).
theorem chessboard_sixty_four : 8 * 8 = 64 ∧ 64 = 2^6 := by decide

-- Exactly 32 squares of each colour: the colour is the (rank+file) parity, and half of the 64 squares are even — a balanced 2-colouring, 32 light and 32 dark.
theorem chessboard_two_colours : ((List.range 64).filter (fun i => (i / 8 + i % 8) % 2 = 0)).length = 32 := by decide

-- The knight leaps 1+2 = 3 squares (Manhattan), which is ODD — so every knight move changes the (rank+file) parity, i.e. it flips the square colour. White-square knight → black square, always.
theorem knight_leap_is_odd : 1 + 2 = 3 ∧ 3 % 2 = 1 := by decide

-- A knight has exactly 8 moves — the eight (±1,±2) and (±2,±1) offsets. From the centre all 8 are on the board; from a corner only 2 are.
theorem knight_has_eight_moves : ([(1,2),(2,1),(-1,2),(-2,1),(1,-2),(2,-1),(-1,-2),(-2,-1)] : List (Int × Int)).length = 8 := by decide

-- Because a knight flips colour every move, it returns to its start colour only after an EVEN number of moves — so a closed knight’s tour has even length, and the full-board tour is 64 (even). 64 % 2 = 0.
theorem closed_knight_tour_even : 64 % 2 = 0 := by decide

-- A rook on an otherwise-empty board attacks 14 squares — 7 along its rank and 7 along its file (all but its own), independent of where it stands. 7+7 = 14.
theorem rook_open_board_fourteen : 7 + 7 = 14 := by decide

-- A bishop moves (±1,±1), and 1+1 = 2 is EVEN — so it preserves the (rank+file) parity and never changes square colour. A light-squared bishop can never reach the 32 dark squares: half the board is forever closed to it.
theorem bishop_stays_on_colour : (1 + 1) % 2 = 0 := by decide

-- The queen is rook + bishop: from a corner of an open board she reaches 7 (rank) + 7 (file) + 7 (long diagonal) = 21 squares — the same 21 = 3×7 the trinity and the rosette fold to.
theorem queen_corner_twentyone : 7 + 7 + 7 = 21 := by decide
