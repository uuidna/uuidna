#!/usr/bin/env node
// Automate the Lean layer for THE CHESS HORIZON — the HONEST kernel of "all chess games recompute instantly in
// uuidna", sealed by decide. The claim as ENUMERATION is false and un-fixable: the game tree is the Shannon number
// (~10^120), which exceeds the atoms of the observable universe (~10^80), so no machine can ever traverse it; and
// there are ~10^44 legal positions but only 2^128 uuids, so content-addresses even COLLIDE across the position space
// (pigeonhole) — identity is not injective over all of chess. What IS true, and is uuidna's actual thing: any GIVEN
// game recomputes to its content-address in O(moves), a bounded, instant IDENTITY (a game is finite — the fifty-move
// rule forbids an endless run), and the decidable arithmetic of the board and its d-dimensional generalisation
// (8^d = 2^(3d) cells) is sealed. HONEST SCOPE: a content-address proves INTEGRITY, not truth — here, not
// enumeration; the ℤ/9-diamond and opening-combination facts are STRUCTURE, not a claim that chess IS the ring.
// COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

// Board-geometry helpers — the JS mirror of "how many of a piece's move-deltas stay on the 8×8 board", to self-check
// every mobility fact before it is written; the Lean side filters the same deltas by the same bounds (axiom-free).
const KN = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]] // knight deltas
const KG = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]] // king deltas
const onB = (r: number, c: number) => 0 <= r && r < 8 && 0 <= c && c < 8
const mob = (ds: number[][], r: number, c: number) => ds.filter(([dr, dc]) => onB(r + dr, c + dc)).length
const KND = '[(1,2),(2,1),(-1,2),(-2,1),(1,-2),(2,-1),(-1,-2),(-2,-1)]'
const KGD = '[(1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)]'
const mobLean = (deltas: string, r: number, c: number, n: number) =>
  `((${deltas} : List (Int × Int)).filter (fun d => decide (0 <= ${r} + d.1 ∧ ${r} + d.1 < 8 ∧ 0 <= ${c} + d.2 ∧ ${c} + d.2 < 8))).length = ${n}`

const FACTS = [
  // ── the opening combinations — the "rosetta combinations" branch, exact ──
  { key: 'first_move_twenty',
    why: 'The opening fans to exactly twenty moves: sixteen pawn pushes (8 pawns × 2 squares) and four knight moves (2 knights × 2) — 8·2 + 2·2 = 20. The first branch of the tree, counted.',
    js: () => 8 * 2 + 2 * 2 === 20,
    lean: 'theorem first_move_twenty : 8 * 2 + 2 * 2 = 20 := by decide' },

  { key: 'after_one_move_four_hundred',
    why: 'After one full move the tree is 20 × 20 = 400 positions — each of White\'s twenty answered by twenty of Black\'s. The branching is combinatorial from the very first ply; the explosion starts here.',
    js: () => 20 * 20 === 400,
    lean: 'theorem after_one_move_four_hundred : 20 * 20 = 400 := by decide' },

  // ── the honest ceiling — the game tree is un-enumerable in principle ──
  { key: 'game_tree_exceeds_universe',
    why: 'The game tree is the Shannon number, about 10^120 — and 10^120 exceeds 10^80, the atoms of the observable universe. "All chess games" is not un-computed for want of effort; it is un-enumerable by any physical machine, ever. The bound is the point.',
    js: () => 10 ** 80 < 10 ** 120,
    lean: 'theorem game_tree_exceeds_universe : (10:Nat)^80 < 10^120 := by decide' },

  { key: 'positions_exceed_uuid_space',
    why: 'Identity does not even fit: there are about 10^44 legal positions but only 2^128 ≈ 3.4·10^38 possible uuids, and 2^128 < 10^44 — so by pigeonhole the content-addresses COLLIDE across the full position space. A uuid names WHICH game you hold, it cannot uniquely name every position that could exist.',
    js: () => 2 ** 128 < 10 ** 44,
    lean: 'theorem positions_exceed_uuid_space : (2:Nat)^128 < 10^44 := by decide' },

  { key: 'positions_within_naive_bound',
    why: 'The legal positions (~10^44) sit inside the naive state space 13^64 — 64 squares, each in one of 13 states — and 10^44 < 13^64. Most of the naive configurations are illegal, so the true count is far smaller, but still bounded above: finite, never infinite.',
    js: () => 10 ** 44 < 13 ** 64,
    lean: 'theorem positions_within_naive_bound : (10:Nat)^44 < 13^64 := by decide' },

  { key: 'thirteen_states_per_square',
    why: 'Each square holds one of thirteen states: six white pieces, six black, or empty — 6 + 6 + 1 = 13. The naive per-square alphabet whose 64th power bounds the whole position space.',
    js: () => 6 + 6 + 1 === 13,
    lean: 'theorem thirteen_states_per_square : 6 + 6 + 1 = 13 := by decide' },

  // ── a game is FINITE — so its address is bounded and instant ──
  { key: 'fifty_move_rule_bounds_a_run',
    why: 'A game cannot run forever: the fifty-move rule forces a draw claim after fifty moves — one hundred plies (50 · 2 = 100) — with no capture and no pawn move. Every game terminates, so its move sequence is finite and its content-address is a bounded computation.',
    js: () => 50 * 2 === 100,
    lean: 'theorem fifty_move_rule_bounds_a_run : 50 * 2 = 100 := by decide' },

  { key: 'one_game_is_a_speck',
    why: 'Addressing ONE game costs its ply-count — bounded well under six thousand — and 6000 < 10^120: a single game recomputes to its uuid instantly, a speck against the un-enumerable tree. This is the TRUE kernel: recompute is O(moves), an identity, not O(all games), an enumeration.',
    js: () => 6000 < 10 ** 120,
    lean: 'theorem one_game_is_a_speck : (6000:Nat) < 10^120 := by decide' },

  // ── the 8-dimensional board — the "3D chess matrix" and its generalisation ──
  { key: 'board_3d_is_two_nine',
    why: 'Raise the board a dimension: an 8×8×8 cube is 512 = 2^9 cells (8^3 = 512, 512 = 2^9). The flat 2^6 board is the d=2 slice of a family of powers of two — the "3D chess matrix", exact.',
    js: () => 8 ** 3 === 512 && 512 === 2 ** 9,
    lean: 'theorem board_3d_is_two_nine : (8:Nat)^3 = 512 ∧ 512 = 2^9 := by decide' },

  { key: 'board_dims_add_three',
    why: 'A d-dimensional board of side 8 has 8^d = 2^(3d) cells, so each dimension adds three to the exponent of two: [8^1, 8^2, 8^3] = [8, 64, 512] = [2^3, 2^6, 2^9]. The board scales in whole octaves of two per dimension.',
    js: () => JSON.stringify([1, 2, 3].map((d) => 8 ** d)) === JSON.stringify([8, 64, 512]),
    lean: 'theorem board_dims_add_three : ([1,2,3].map (fun d => (8:Nat)^d)) = [8, 64, 512] := by decide' },

  { key: 'hyperchess_eight_dimensions',
    why: 'The eight-dimensional matrix, counted two ways: a side-8 board in 8 dimensions is 8^8 = 2^24 cells, and a side-2 hypercube in 8 dimensions is 2^8 = 256 — the octet the whole ledger turns on. Chess generalises to any dimension as a pure power of two.',
    js: () => 8 ** 8 === 2 ** 24 && 2 ** 8 === 256,
    lean: 'theorem hyperchess_eight_dimensions : ((8:Nat)^8 = 2^24) ∧ ((2:Nat)^8 = 256) := by decide' },

  { key: 'no_maximal_board',
    why: 'There is no largest board, only bounds: 8^1 < 8^2 < 8^3, and for every dimension a strictly larger one — the same "no maximum, only bounds" the security layer proves. The horizon recedes; it is never reached.',
    js: () => 8 ** 1 < 8 ** 2 && 8 ** 2 < 8 ** 3,
    lean: 'theorem no_maximal_board : ((8:Nat)^1 < 8^2) ∧ ((8:Nat)^2 < 8^3) := by decide' },

  // ── the diamant — the knight's leap reflected in the ℤ/9 diamond ──
  { key: 'knight_on_the_diamond',
    why: 'The knight\'s leap 1 + 2 = 3 lands on residue 3 of the ℤ/9 vortex, and the diamond reflection dz(3) = 10 − 3 = 7 sends it to 7 — the same reflection the whole ledger centres on. HONEST SCOPE: a structural analogy (the move-count read as a residue), NOT a claim that chess IS the ring.',
    js: () => (1 + 2) % 9 === 3 && (10 - 3) === 7,
    lean: 'theorem knight_on_the_diamond : ((1 + 2) % 9 = 3) ∧ ((10 - 3) = 7) := by decide' },

  { key: 'boards_are_diamond_self_inverses',
    why: 'The board enters the ℤ/9 diamond, where the games interact: the flat board 64 ≡ 1 (the vortex origin) and the 3D board 512 ≡ 8 (mod 9), and {1, 8} are exactly the TWO self-inverse units of the ring (8·8 ≡ 1). The board, in either dimension, is a self-inverse of the diamond — and the 3D board shares residue 8 with the audit game. HONEST SCOPE: a structural residue, NOT a claim the board IS the ring.',
    js: () => 64 % 9 === 1 && 512 % 9 === 8 && (8 * 8) % 9 === 1,
    lean: 'theorem boards_are_diamond_self_inverses : (64 % 9 = 1) ∧ (512 % 9 = 8) ∧ ((8 * 8) % 9 = 1) := by decide' },
]

// The mobility map — how many moves each piece commands from a square, the decidable geometry of the board (counting
// deltas that stay on the 8×8), demarcated: real board arithmetic, still NOT a solved game or an engine.
const MOBS: [string, 'N' | 'K', number, number, number, string][] = [
  ['knight_centre_eight', 'N', 3, 3, 8, 'A knight on a central square (d4) commands all EIGHT moves — maximal mobility, why knights belong in the centre.'],
  ['knight_near_centre_six', 'N', 2, 1, 6, 'A knight one step in from the edge (c3) commands SIX moves.'],
  ['knight_edge_four', 'N', 3, 0, 4, 'A knight on the edge (a4) commands FOUR moves — half its reach falls off the board.'],
  ['knight_near_corner_three', 'N', 0, 1, 3, 'A knight beside the corner (b1) commands THREE moves.'],
  ['knight_corner_two', 'N', 0, 0, 2, 'A knight in the corner (a1) commands only TWO moves — "a knight on the rim is dim" at its worst.'],
  ['king_centre_eight', 'K', 3, 3, 8, 'A king in the centre (d4) touches all EIGHT neighbours.'],
  ['king_edge_five', 'K', 3, 0, 5, 'A king on the edge (a4) touches FIVE squares.'],
  ['king_corner_three', 'K', 0, 0, 3, 'A king in the corner (a1) touches THREE squares.'],
]
for (const [key, p, r, c, n, why] of MOBS)
  FACTS.push({ key, why, js: () => mob(p === 'N' ? KN : KG, r, c) === n, lean: `theorem ${key} : ${mobLean(p === 'N' ? KND : KGD, r, c, n)} := by decide` })

// two more of the board's exact arithmetic to close on 2¹⁰
FACTS.push({ key: 'material_sum_twentyone', why: 'The classical piece values sum to 21: pawn 1 + knight 3 + bishop 3 + rook 5 + queen 9 = 21 — the material a side commands beyond the king (itself invaluable). A convention, exact as arithmetic.',
  js: () => 1 + 3 + 3 + 5 + 9 === 21, lean: 'theorem material_sum_twentyone : 1 + 3 + 3 + 5 + 9 = 21 := by decide' })
FACTS.push({ key: 'central_four_squares', why: 'The centre the pieces fight for is the 2×2 block d4-d5-e4-e5 — 2·2 = 4 squares, the four the opening contests. The board\'s heart, counted.',
  js: () => 2 * 2 === 4, lean: 'theorem central_four_squares : 2 * 2 = 4 := by decide' })

console.log('computing ' + FACTS.length + ' CHESS-HORIZON facts (the honest kernel + the mobility map — integrity, not enumeration) …')

emit({
  file: 'Chessgames.lean', skill: 'chess',
  header: 'THE CHESS HORIZON — the honest kernel of "all chess games recompute instantly in uuidna": the opening combinations (20 first moves, 400 after one), the un-enumerable game tree (Shannon ~10^120 exceeds the ~10^80 atoms of the universe), the pigeonhole collision of content-addresses (2^128 uuids < ~10^44 legal positions < the naive 13^64), the FINITE game (the fifty-move rule) whose address is therefore a bounded, instant identity (6000 < 10^120 — recompute is O(moves), not O(all games)), the d-dimensional board (8^d = 2^(3d): the 3D 512 = 2^9, the 8-dimensional 8^8 = 2^24), no maximal board (only bounds), and the knight on the ℤ/9 diamond. HONEST SCOPE: uuidna does NOT enumerate or precompute the game tree — a content-address proves INTEGRITY, not truth, here not enumeration; the diamond and combination facts are STRUCTURE, not a claim that chess IS the ring.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
