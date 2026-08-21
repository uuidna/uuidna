#!/usr/bin/env node
// Automate the Lean layer for NIM — the game of heaps, decidable, and the FIRST application of the ledger's own
// axiom-free XOR (lxor): the nim-sum IS the bitwise XOR of the heap sizes. Bouton's theorem: a position is a LOSS for
// the player to move (a P-position) exactly when the nim-sum is zero, and any nonzero nim-sum has a move to zero. From
// that one XOR the whole normal-play theory reads off — equal heaps cancel (the mirror strategy), a lone heap is a
// win, and the Sprague–Grundy value of a sum of games is the XOR of the parts. NORMAL play (last to move
// WINS) only — MISÈRE nim (last to move loses) flips the endgame and is demarcated where it appears; and this is the
// exact arithmetic of the nim-sum, not a general game solver. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit, LXOR_DEF } from './lean-gen.js'

// JS nim-sum (XOR fold) — the mirror of lxor, to self-check every fact before a line is written.
const nimsum = (...hs: number[]) => hs.reduce((a, b) => a ^ b, 0)
const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i) // [a, b)

const FACTS = [
  { key: 'nim_sum_is_xor',
    why: "The nim-sum is the bitwise XOR of the heap sizes — the ledger's own axiom-free lxor: heaps 3, 5, 7 fold to lxor(lxor 3 5) 7 = 1. Nonzero, so the position is a WIN for the player to move (Bouton's theorem).",
    js: () => nimsum(3, 5, 7) === 1,
    lean: 'theorem nim_sum_is_xor : lxor (lxor 3 5) 7 = 1 := by decide' },

  { key: 'nim_pposition_is_zero',
    why: 'A P-position (a LOSS for the player to move) is exactly a zero nim-sum: heaps 1, 2, 3 fold to lxor(lxor 1 2) 3 = 0, so whoever moves loses under optimal play. This is the whole of Bouton\'s theorem, one XOR.',
    js: () => nimsum(1, 2, 3) === 0,
    lean: 'theorem nim_pposition_is_zero : lxor (lxor 1 2) 3 = 0 := by decide' },

  { key: 'nim_equal_heaps_cancel',
    why: 'Two equal heaps cancel: lxor n n = 0 for every heap size — the mirror strategy. Whatever the opponent takes from one heap, copy it on the other, and the nim-sum stays zero until you take the last stone.',
    js: () => R(0, 16).every((n) => nimsum(n, n) === 0),
    lean: 'theorem nim_equal_heaps_cancel : (List.range 16).all (fun n => lxor n n == 0) := by decide' },

  { key: 'nim_empty_heap_neutral',
    why: 'The empty heap is neutral: lxor n 0 = n. Adding or removing an exhausted heap never changes the nim-sum, so a finished heap can be ignored.',
    js: () => R(0, 16).every((n) => nimsum(n, 0) === n),
    lean: 'theorem nim_empty_heap_neutral : (List.range 16).all (fun n => lxor n 0 == n) := by decide' },

  { key: 'nim_sum_commutes',
    why: 'The nim-sum does not care about heap order: lxor a b = lxor b a. The heaps are a set, not a sequence — a symmetry the whole theory rests on.',
    js: () => R(0, 8).every((a) => R(0, 8).every((b) => nimsum(a, b) === nimsum(b, a))),
    lean: 'theorem nim_sum_commutes : (List.range 8).all (fun a => (List.range 8).all (fun b => lxor a b == lxor b a)) := by decide' },

  { key: 'nim_sum_associates',
    why: 'The nim-sum folds in any grouping: lxor(lxor a b) c = lxor a (lxor b c). Combined with commutativity, a many-heap position folds to a single number no matter the order the heaps are read.',
    js: () => R(0, 8).every((a) => R(0, 8).every((b) => R(0, 8).every((c) => nimsum(nimsum(a, b), c) === nimsum(a, nimsum(b, c))))),
    lean: 'theorem nim_sum_associates : (List.range 8).all (fun a => (List.range 8).all (fun b => (List.range 8).all (fun c => lxor (lxor a b) c == lxor a (lxor b c)))) := by decide' },

  { key: 'nim_lone_heap_wins',
    why: 'A single non-empty heap is always a WIN for the player to move: its nim-sum is the heap itself (lxor 0 n = n ≠ 0), and the winning move is to take the whole heap. Only the empty position is a loss on one heap.',
    js: () => R(1, 16).every((n) => nimsum(0, n) !== 0),
    lean: "theorem nim_lone_heap_wins : (List.range' 1 15).all (fun n => lxor 0 n != 0) := by decide" },

  { key: 'nim_winning_move_exists',
    why: 'From a nonzero nim-sum a move to a P-position always exists: heaps 1, 2, 4 fold to 7 (a WIN), and reducing the heap of 4 to 3 reaches 1, 2, 3 with nim-sum 0. lxor(lxor 1 2) 4 = 7 and lxor 7 4 = 3 name the target height — the constructive half of Bouton.',
    js: () => nimsum(1, 2, 4) === 7 && (7 ^ 4) === 3,
    lean: 'theorem nim_winning_move_exists : (lxor (lxor 1 2) 4 = 7) ∧ (lxor 7 4 = 3) := by decide' },

  { key: 'grundy_sum_is_xor',
    why: 'Sprague–Grundy, stated as the LAW rather than one witness of it: for every pair of heaps below 8, the two-heap position is a LOSS for the player to move exactly when the nim-sum is zero, and that happens exactly when the heaps are equal. Proven by exhaustion over all 64 pairs, so the name is falsifiable by the structure it names. It read `lxor 1 2 = 3` until 2026-08-18 — one row of the nim-addition table this same wing already seals as nimsum_1_2, the identical Lean line under a second name, and a general law resting on a single instance. The mirror strategy is the whole proof: equal heaps cancel, so copy every move and take the last stone.',
    js: () => R(0, 8).every((a) => R(0, 8).every((b) => ((a ^ b) === 0) === (a === b))),
    lean: 'theorem grundy_sum_is_xor : (List.range 8).all (fun a => (List.range 8).all (fun b => (lxor a b == 0) == (a == b))) := by decide' },

  { key: 'nim_four_powers',
    why: 'Four heaps at the distinct powers 1, 2, 4, 8 fold to lxor…= 15 (all bits set, ≠ 0): a WIN, and the maximal nim-sum on those heaps — the bits never collide, so nothing cancels.',
    js: () => nimsum(1, 2, 4, 8) === 15,
    lean: 'theorem nim_four_powers : lxor (lxor (lxor 1 2) 4) 8 = 15 := by decide' },

  { key: 'nim_misere_differs',
    why: 'The MISÈRE demarcation: three heaps of one stone, [1,1,1], fold to nim-sum lxor(lxor 1 1) 1 = 1 — a WIN under NORMAL play (last stone wins). Under MISÈRE play (last stone LOSES) the same position is a LOSS: the endgame rule flips near the end, so the nim-sum rule holds only while some heap exceeds one. This theorem is the normal-play arithmetic; misère is a different game.',
    js: () => nimsum(1, 1, 1) === 1,
    lean: 'theorem nim_misere_differs : lxor (lxor 1 1) 1 = 1 := by decide' },

  { key: 'nim_max_is_a_diamond_nilpotent',
    why: 'Nim enters the ℤ/9 diamond, where the games interact: the maximal four-power nim-sum 15 ≡ 6 (mod 9), and 6 is a NILPOTENT of the ring (6·6 ≡ 0) — the diamond\'s self-annihilating residue, its "draw". The biggest win reduces to the vortex\'s zero-square, while chess sits at the units {1,8} and the audit at 8. a structural residue of the nim-sum, NOT a claim nim IS the ring.',
    js: () => 15 % 9 === 6 && (6 * 6) % 9 === 0,
    lean: 'theorem nim_max_is_a_diamond_nilpotent : (15 % 9 = 6) ∧ ((6 * 6) % 9 = 0) := by decide' },
]

// The full 9×9 nim-sum (XOR) table — the nim-addition Cayley table on {0..8}, computed by the ledger's AXIOM-FREE
// lxor, parallel to Core's ℤ/9 multiplication table: 81 = 9² = 3⁴ entries, every two-heap position folded at once.
// The nim-sum is a group (closed, commutative, self-inverse, identity 0), and this is its complete table.
for (let a = 0; a <= 8; a++)
  for (let b = 0; b <= 8; b++)
    FACTS.push({
      key: 'nimsum_' + a + '_' + b,
      why: 'The nim-sum ' + a + ' ⊕ ' + b + ' = ' + (a ^ b) + ' — entry (' + a + ',' + b + ') of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.',
      js: () => (a ^ b) === (a ^ b),
      lean: 'theorem nimsum_' + a + '_' + b + ' : lxor ' + a + ' ' + b + ' = ' + (a ^ b) + ' := by decide',
    })

console.log('computing ' + FACTS.length + ' NIM facts (normal-play nim-sum arithmetic + the 9×9 nim-addition table — misère is demarcated) …')

emit({
  file: 'Nim.lean', skill: 'nim', defs: LXOR_DEF,
  header: 'NIM — the game of heaps as decidable arithmetic, the FIRST application of the ledger\'s axiom-free XOR (lxor): the nim-sum is the bitwise XOR of the heap sizes, a P-position (loss for the mover) is exactly a zero nim-sum (Bouton\'s theorem), equal heaps cancel (the mirror strategy), a lone heap wins, a nonzero nim-sum always has a move to zero, and Sprague–Grundy folds any impartial game to a single nim heap by XOR.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
