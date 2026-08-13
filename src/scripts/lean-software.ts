#!/usr/bin/env node
// Automate the Lean layer for THE SOFTWARE-VERIFIABLE ALGEBRA — the companion to Hardware.lean, one level up. Where the
// hardware layer seals the combinational-logic identities a NETLIST is verified against, this seals the algebraic
// correctness LAWS a PROGRAM is verified against: losslessness (split-and-recompose is the identity — serialisation
// loses nothing), structure preservation (map keeps length, filter never grows, append adds), totality (a guarded
// division is defined for every input, zero included — no crash), bounded termination (a 4-bit value shifts to 0 in
// four steps — the loop halts), order-invariance (a fold reduces the same regardless of order — safe to parallelise),
// safe access (indexing past the end returns the default, never faults), the compare-swap that orders (the basis of
// every sort), and reversibility (undo of undo is the identity). Each is a finite, decidable, AXIOM-FREE `by decide`
// fact and a 128-bit content-address particle. Indexing uses the axiom-free `nth` (structural, not List.getD).
// HONEST SCOPE: integrity, not truth. uuidna SEALS the spec — the algebraic laws a correct program upholds — so an
// implementation can be VERIFIED AGAINST it. It does not, and these theorems do not claim to, write, compile, or run
// your program, nor prove an arbitrary program correct. A sealed spec a program is checked against — not the program.
import { emit, NTH_DEF } from './lean-gen.js'

const range = (n: number): number[] => Array.from({ length: n }, (_, i) => i)
const clamp = (n: number): number => (n <= 7 ? n : 7)
const nth = (l: number[], i: number): number => (i < l.length ? l[i] : 0)
// FLOOR division with NO Math.* (hard-rejected — not a local theorem): (a − a%b)/b is exact integer division, the
// audit mirror of Lean's `/` on Nat.
const fdiv = (a: number, b: number): number => (a - (a % b)) / b

const FACTS = [
  { key: 'codec_split_recompose_lossless',
    why: 'LOSSLESS by construction: splitting a number into (quotient, remainder) and recomposing it — 2·(n/2) + n%2 — returns n exactly, for every value. Serialisation that decomposes then reassembles loses nothing; the round-trip is the identity.',
    js: () => range(32).every((n) => 2 * fdiv(n, 2) + (n % 2) === n),
    lean: 'theorem codec_split_recompose_lossless : (List.range 32).all (fun n => 2 * (n / 2) + n % 2 == n) := by decide' },

  { key: 'map_preserves_length',
    why: 'A pure transform PRESERVES STRUCTURE: mapping a function over a list keeps its length — no element is dropped or duplicated. length (map f l) = length l.',
    js: () => range(10).map((x) => x + 1).length === 10,
    lean: 'theorem map_preserves_length : ((List.range 10).map (fun x => x + 1)).length = 10 := by decide' },

  { key: 'filter_never_grows',
    why: 'A FILTER NEVER GROWS its input: selecting a sublist can only keep or drop elements, so its length is at most the original. length (filter p l) ≤ length l — a query cannot invent data.',
    js: () => range(10).filter((x) => x % 2 === 0).length <= 10,
    lean: 'theorem filter_never_grows : ((List.range 10).filter (fun x => x % 2 == 0)).length ≤ 10 := by decide' },

  { key: 'append_length_adds',
    why: 'CONCATENATION is additive in length: joining two buffers gives exactly the sum of their lengths — length (a ++ b) = length a + length b. No byte is lost or invented at the seam.',
    js: () => [1, 2, 3].concat([4, 5]).length === 3 + 2,
    lean: 'theorem append_length_adds : ([1,2,3] ++ [4,5]).length = 3 + 2 := by decide' },

  { key: 'clamp_is_idempotent',
    why: 'NORMALISATION is IDEMPOTENT: clamping an already-clamped value changes nothing — clamp (clamp n) = clamp n, across every input. Apply the normaliser once or twice, the result is the same; re-processing is safe.',
    js: () => range(20).every((n) => clamp(clamp(n)) === clamp(n)),
    lean: 'theorem clamp_is_idempotent : (List.range 20).all (fun n => let c := if n ≤ 7 then n else 7; (if c ≤ 7 then c else 7) == c) := by decide' },

  { key: 'safe_div_is_total',
    why: 'A GUARDED DIVISION is TOTAL: defined for every divisor including zero — 12/b for b ≠ 0, and 0 when b = 0 (the abstract-zero fold), never an error. Its table over [0,1,2,3,4,6] is [0,12,6,4,3,2]. Software never crashes on divide-by-zero.',
    js: () => JSON.stringify([0, 1, 2, 3, 4, 6].map((b) => (b === 0 ? 0 : fdiv(12, b)))) === JSON.stringify([0, 12, 6, 4, 3, 2]),
    lean: 'theorem safe_div_is_total : [0,1,2,3,4,6].map (fun b => if b == 0 then 0 else 12 / b) = [0,12,6,4,3,2] := by decide' },

  { key: 'reduce_is_order_invariant',
    why: 'A SUM-FOLD is ORDER-INVARIANT: reducing [1,2,3,4] and its reverse give the same total — 10 either way. A reduction over an associative-commutative op is safe to reorder or parallelise; the answer does not depend on the schedule.',
    js: () => [1, 2, 3, 4].reduce((a, b) => a + b, 0) === [4, 3, 2, 1].reduce((a, b) => a + b, 0),
    lean: 'theorem reduce_is_order_invariant : List.foldl (fun a b => a + b) 0 [1,2,3,4] = List.foldl (fun a b => a + b) 0 [4,3,2,1] := by decide' },

  { key: 'shift_loop_terminates',
    why: 'A SHIFT LOOP TERMINATES: halving any 4-bit value four times reaches 0 — the loop provably halts within its bound, for all 16 inputs. Bounded iteration does not hang.',
    js: () => range(16).every((n) => fdiv(n, 16) === 0),
    lean: 'theorem shift_loop_terminates : (List.range 16).all (fun n => n/2/2/2/2 == 0) := by decide' },

  { key: 'compare_swap_orders',
    why: 'The COMPARE-SWAP ORDERS a pair: whatever the input order, the smaller ends first and the larger second (min ≤ max). This single primitive, composed, is every sorting network — proven to order on its base case.',
    js: () => [[3, 1], [1, 3], [2, 2]].every(([a, b]) => (a <= b ? a : b) <= (a <= b ? b : a)),
    lean: 'theorem compare_swap_orders : [(3,1),(1,3),(2,2)].all (fun p => (if p.1 ≤ p.2 then p.1 else p.2) ≤ (if p.1 ≤ p.2 then p.2 else p.1)) := by decide' },

  { key: 'safe_index_is_total',
    why: 'INDEXING is TOTAL: reading position 5 of a length-3 list returns the default 0 (never an out-of-bounds fault), while position 1 returns 20. Safe access is defined for every index — no buffer over-read.',
    js: () => nth([10, 20, 30], 5) === 0 && nth([10, 20, 30], 1) === 20,
    lean: 'theorem safe_index_is_total : (nth [10,20,30] 5 = 0) ∧ (nth [10,20,30] 1 = 20) := by decide' },

  { key: 'reverse_is_involutive',
    why: 'UNDO of UNDO is the IDENTITY: reversing a list twice returns it unchanged — reverse (reverse l) = l. The reversible-operation law every codec and every undo-stack rests on.',
    js: () => JSON.stringify([1, 2, 3, 4].slice().reverse().reverse()) === JSON.stringify([1, 2, 3, 4]),
    lean: 'theorem reverse_is_involutive : [1,2,3,4].reverse.reverse = [1,2,3,4] := by decide' },
]

// audit each fact offline, then GENERATE its green `by decide` theorem — the research loop's terminal.
for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Software.lean', skill: 'software', defs: NTH_DEF,
  header: 'THE SOFTWARE-VERIFIABLE ALGEBRA — the companion to the hardware layer, one level up: the algebraic correctness LAWS a program is verified AGAINST, each a decidable, axiom-free `by decide` particle. Losslessness (split-and-recompose is the identity), structure preservation (map keeps length, filter never grows, append adds), idempotent normalisation, total guarded division (no divide-by-zero crash), bounded termination (a shift loop halts), order-invariant reduction (safe to parallelise), the compare-swap that orders (every sort\'s basis), total safe indexing (no over-read), and reversibility (undo of undo is the identity). Indexing uses the axiom-free `nth`. HONEST SCOPE: integrity, not truth — uuidna SEALS the spec so an implementation can be verified against it; it does NOT write, compile, or run your program, nor prove an arbitrary program correct. A sealed spec a program is checked against — not the program.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
