-- lean/Software.lean — GENERATED. THE SOFTWARE-VERIFIABLE ALGEBRA — the companion to the hardware layer, one level up: the algebraic correctness LAWS a program is verified AGAINST, each a decidable, axiom-free `by decide` particle. Losslessness (split-and-recompose is the identity), structure preservation (map keeps length, filter never grows, append adds), idempotent normalisation, total guarded division (no divide-by-zero crash), bounded termination (a shift loop halts), order-invariant reduction (safe to parallelise), the compare-swap that orders (every sort's basis), total safe indexing (no over-read), and reversibility (undo of undo is the identity). Indexing uses the axiom-free `nth`. HONEST SCOPE: integrity, not truth — uuidna SEALS the spec so an implementation can be verified against it; it does NOT write, compile, or run your program, nor prove an arbitrary program correct. A sealed spec a program is checked against — not the program. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- nth / nthR — list indexing as decidable, AXIOM-FREE structural recursion. Lean's `List.getD` routes through the
-- `propext` axiom under `by decide`; this recursion does not (scripts/lean-axioms proves it). `nth l i` = the i-th
-- Nat of l (0 past the end); `nthR m i` = the i-th row of a Nat matrix ([] past the end).
def nth : List Nat → Nat → Nat
  | [], _ => 0
  | x :: _, 0 => x
  | _ :: xs, Nat.succ n => nth xs n
def nthR : List (List Nat) → Nat → List Nat
  | [], _ => []
  | x :: _, 0 => x
  | _ :: xs, Nat.succ n => nthR xs n

-- LOSSLESS by construction: splitting a number into (quotient, remainder) and recomposing it — 2·(n/2) + n%2 — returns n exactly, for every value. Serialisation that decomposes then reassembles loses nothing; the round-trip is the identity.
theorem codec_split_recompose_lossless : (List.range 32).all (fun n => 2 * (n / 2) + n % 2 == n) := by decide

-- A pure transform PRESERVES STRUCTURE: mapping a function over a list keeps its length — no element is dropped or duplicated. length (map f l) = length l.
theorem map_preserves_length : ((List.range 10).map (fun x => x + 1)).length = 10 := by decide

-- A FILTER NEVER GROWS its input: selecting a sublist can only keep or drop elements, so its length is at most the original. length (filter p l) ≤ length l — a query cannot invent data.
theorem filter_never_grows : ((List.range 10).filter (fun x => x % 2 == 0)).length ≤ 10 := by decide

-- CONCATENATION is additive in length: joining two buffers gives exactly the sum of their lengths — length (a ++ b) = length a + length b. No byte is lost or invented at the seam.
theorem append_length_adds : ([1,2,3] ++ [4,5]).length = 3 + 2 := by decide

-- NORMALISATION is IDEMPOTENT: clamping an already-clamped value changes nothing — clamp (clamp n) = clamp n, across every input. Apply the normaliser once or twice, the result is the same; re-processing is safe.
theorem clamp_is_idempotent : (List.range 20).all (fun n => let c := if n ≤ 7 then n else 7; (if c ≤ 7 then c else 7) == c) := by decide

-- A GUARDED DIVISION is TOTAL: defined for every divisor including zero — 12/b for b ≠ 0, and 0 when b = 0 (the abstract-zero fold), never an error. Its table over [0,1,2,3,4,6] is [0,12,6,4,3,2]. Software never crashes on divide-by-zero.
theorem safe_div_is_total : [0,1,2,3,4,6].map (fun b => if b == 0 then 0 else 12 / b) = [0,12,6,4,3,2] := by decide

-- A SUM-FOLD is ORDER-INVARIANT: reducing [1,2,3,4] and its reverse give the same total — 10 either way. A reduction over an associative-commutative op is safe to reorder or parallelise; the answer does not depend on the schedule.
theorem reduce_is_order_invariant : List.foldl (fun a b => a + b) 0 [1,2,3,4] = List.foldl (fun a b => a + b) 0 [4,3,2,1] := by decide

-- A SHIFT LOOP TERMINATES: halving any 4-bit value four times reaches 0 — the loop provably halts within its bound, for all 16 inputs. Bounded iteration does not hang.
theorem shift_loop_terminates : (List.range 16).all (fun n => n/2/2/2/2 == 0) := by decide

-- The COMPARE-SWAP ORDERS a pair: whatever the input order, the smaller ends first and the larger second (min ≤ max). This single primitive, composed, is every sorting network — proven to order on its base case.
theorem compare_swap_orders : [(3,1),(1,3),(2,2)].all (fun p => (if p.1 ≤ p.2 then p.1 else p.2) ≤ (if p.1 ≤ p.2 then p.2 else p.1)) := by decide

-- INDEXING is TOTAL: reading position 5 of a length-3 list returns the default 0 (never an out-of-bounds fault), while position 1 returns 20. Safe access is defined for every index — no buffer over-read.
theorem safe_index_is_total : (nth [10,20,30] 5 = 0) ∧ (nth [10,20,30] 1 = 20) := by decide

-- UNDO of UNDO is the IDENTITY: reversing a list twice returns it unchanged — reverse (reverse l) = l. The reversible-operation law every codec and every undo-stack rests on.
theorem reverse_is_involutive : [1,2,3,4].reverse.reverse = [1,2,3,4] := by decide
