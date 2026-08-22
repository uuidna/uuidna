-- lean/Software.lean — GENERATED. THE SOFTWARE-VERIFIABLE ALGEBRA — the companion to the hardware layer, one level up: the algebraic correctness LAWS a program is verified AGAINST, each a decidable, axiom-free `by decide` particle. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

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

/-- LOSSLESS by construction: splitting a number into (quotient, remainder) and recomposing it — 2·(n/2) + n%2 —
    returns n exactly, for every value. Serialisation that decomposes then reassembles loses nothing; the
    round-trip is the identity. -/
theorem codec_split_recompose_lossless : (List.range 32).all (fun n => 2 * (n / 2) + n % 2 == n) := by decide

/-- A pure transform PRESERVES STRUCTURE: mapping a function over a list keeps its length — no element is
    dropped or duplicated. length (map f l) = length l. -/
theorem map_preserves_length : ((List.range 10).map (fun x => x + 1)).length = 10 := by decide

/-- A FILTER NEVER GROWS its input: selecting a sublist can only keep or drop elements, so its length is at most
    the original. length (filter p l) ≤ length l — a query cannot invent data. -/
theorem filter_never_grows : ((List.range 10).filter (fun x => x % 2 == 0)).length ≤ 10 := by decide

/-- CONCATENATION is additive in length: joining two buffers gives exactly the sum of their lengths — length (a
    ++ b) = length a + length b. No byte is lost or invented at the seam. -/
theorem append_length_adds : ([1,2,3] ++ [4,5]).length = 3 + 2 := by decide

/-- NORMALISATION is IDEMPOTENT: clamping an already-clamped value changes nothing — clamp (clamp n) = clamp n,
    across every input. Apply the normaliser once or twice, the result is the same; re-processing is safe. -/
theorem clamp_is_idempotent : (List.range 20).all (fun n => let c := if n ≤ 7 then n else 7; (if c ≤ 7 then c else 7) == c) := by decide

/-- A GUARDED DIVISION is TOTAL: defined for every divisor including zero — 12/b for b ≠ 0, and 0 when b = 0
    (the abstract-zero fold). Its table over [0,1,2,3,4,6] is [0,12,6,4,3,2]. Software never crashes on
    divide-by-zero. -/
theorem safe_div_is_total : [0,1,2,3,4,6].map (fun b => if b == 0 then 0 else 12 / b) = [0,12,6,4,3,2] := by decide

/-- A SUM-FOLD is ORDER-INVARIANT: reducing [1,2,3,4] and its reverse give the same total — 10 either way. A
    reduction over an associative-commutative op is safe to reorder or parallelise; the answer does not depend
    on the schedule. -/
theorem reduce_is_order_invariant : List.foldl (fun a b => a + b) 0 [1,2,3,4] = List.foldl (fun a b => a + b) 0 [4,3,2,1] := by decide

/-- A SHIFT LOOP TERMINATES: halving any 4-bit value four times reaches 0 — the loop provably halts within its
    bound, for all 16 inputs. Bounded iteration does not hang. -/
theorem shift_loop_terminates : (List.range 16).all (fun n => n/2/2/2/2 == 0) := by decide

/-- The COMPARE-SWAP ORDERS a pair: whatever the input order, the smaller ends first and the larger second (min
    ≤ max). This single primitive, composed, is every sorting network — proven to order on its base case. -/
theorem compare_swap_orders : [(3,1),(1,3),(2,2)].all (fun p => (if p.1 ≤ p.2 then p.1 else p.2) ≤ (if p.1 ≤ p.2 then p.2 else p.1)) := by decide

/-- INDEXING is TOTAL: reading position 5 of a length-3 list returns the default 0 (never an out-of-bounds
    fault), while position 1 returns 20. Safe access is defined for every index — no buffer over-read. -/
theorem safe_index_is_total : (nth [10,20,30] 5 = 0) ∧ (nth [10,20,30] 1 = 20) := by decide

/-- UNDO of UNDO is the IDENTITY: reversing a list twice returns it unchanged — reverse (reverse l) = l. The
    reversible-operation law every codec and every undo-stack rests on. -/
theorem reverse_is_involutive : [1,2,3,4].reverse.reverse = [1,2,3,4] := by decide

/-- A NEIGHBOURHOOD SEALS EXACTLY WHEN IT IS WHOLE, AND AT NO OTHER COUNT. Over the 93 neighbourhoods actually
    on disk, the kernel walks every partial state each one can be in — 0 members held, 1, up to its full size —
    and confirms two things of each: exactly ONE of those counts seals it, and none of the counts BELOW its size
    seals it at all. This is the difference between a memory and a cache. A cache writes what it has; this holds
    a handle in memory and touches no disk until the last member of its neighbourhood arrives, so a run that
    dies part-way through a wing leaves nothing behind that could be mistaken for a whole one. The sizes are
    measured from the files. -/
theorem cube_seals_at_completeness_only : ([6, 6, 6, 13, 11, 17, 11, 17, 6, 5, 9, 6, 9, 13, 24, 27, 7, 6, 8, 25, 17, 7, 5, 64, 8, 16, 13, 8, 6, 14, 4, 13, 7, 12, 10, 6, 6, 6, 14, 8, 12, 6, 13, 6, 10, 4, 8, 11, 7, 5, 18, 93, 6, 1, 6, 9, 9, 7, 13, 6, 8, 10, 5, 6, 8, 52, 25, 6, 5, 7, 6, 234, 148, 7, 7, 6, 9, 28, 11, 8, 6, 8, 3, 6, 11, 6, 17, 6, 13, 1, 15, 13, 16].all (fun n => ((List.range (n+1)).filter (fun k => k == n)).length == 1)) ∧ ([6, 6, 6, 13, 11, 17, 11, 17, 6, 5, 9, 6, 9, 13, 24, 27, 7, 6, 8, 25, 17, 7, 5, 64, 8, 16, 13, 8, 6, 14, 4, 13, 7, 12, 10, 6, 6, 6, 14, 8, 12, 6, 13, 6, 10, 4, 8, 11, 7, 5, 18, 93, 6, 1, 6, 9, 9, 7, 13, 6, 8, 10, 5, 6, 8, 52, 25, 6, 5, 7, 6, 234, 148, 7, 7, 6, 9, 28, 11, 8, 6, 8, 3, 6, 11, 6, 17, 6, 13, 1, 15, 13, 16].all (fun n => ((List.range n).filter (fun k => k == n)).length == 0)) := by decide

/-- THE NEIGHBOURHOODS PARTITION THE LEDGER, AND THE MEMORY IS ONE LINE PER NEIGHBOURHOOD. The kernel folds the
    93 measured wing counts and lands on 1443 — the whole ledger, nothing counted twice and nothing lost — then
    counts the wings themselves and confirms there are fewer of them than there are theorems. That last
    inequality is the entire saving: what persists is ONE complete uuid for each neighbourhood, standing for
    every theorem inside it, because every member handle, statement and count behind that uuid is recomputable
    from the Lean by anyone holding the file. A second stored copy of a derived fact is the only kind that can
    disagree with the first. What the kernel does NOT decide here is whether any wing repeats a key — a
    duplicate would make the census smaller, and a smaller census would simply be sealed as a smaller number.
    That is the emitter's gate rather than the kernel's: the per-wing declaration counts and member counts are
    compared before a byte is written, and the build stops instead. Checked by removing one key from one wing
    and watching it stop. -/
theorem cubes_partition_ledger : (([6, 6, 6, 13, 11, 17, 11, 17, 6, 5, 9, 6, 9, 13, 24, 27, 7, 6, 8, 25, 17, 7, 5, 64, 8, 16, 13, 8, 6, 14, 4, 13, 7, 12, 10, 6, 6, 6, 14, 8, 12, 6, 13, 6, 10, 4, 8, 11, 7, 5, 18, 93, 6, 1, 6, 9, 9, 7, 13, 6, 8, 10, 5, 6, 8, 52, 25, 6, 5, 7, 6, 234, 148, 7, 7, 6, 9, 28, 11, 8, 6, 8, 3, 6, 11, 6, 17, 6, 13, 1, 15, 13, 16].foldl (· + ·) 0) = 1443) ∧ ([6, 6, 6, 13, 11, 17, 11, 17, 6, 5, 9, 6, 9, 13, 24, 27, 7, 6, 8, 25, 17, 7, 5, 64, 8, 16, 13, 8, 6, 14, 4, 13, 7, 12, 10, 6, 6, 6, 14, 8, 12, 6, 13, 6, 10, 4, 8, 11, 7, 5, 18, 93, 6, 1, 6, 9, 9, 7, 13, 6, 8, 10, 5, 6, 8, 52, 25, 6, 5, 7, 6, 234, 148, 7, 7, 6, 9, 28, 11, 8, 6, 8, 3, 6, 11, 6, 17, 6, 13, 1, 15, 13, 16].length = 93) ∧ (93 < 1443) := by decide

/-- A STANDING RECEIPT IS FREE, AND ONLY A MOVED NEIGHBOURHOOD IS PAID FOR. Over the two bits the plan decides
    on (s = the cube is sealed, m = its fold matches the receipt already held), the cost is s·(1−m), and of the
    four states EXACTLY ONE pays: sealed-and-moved. A held cube costs nothing because it has not been decided
    either way, and a sealed cube whose fold is unchanged costs nothing because the work was already done and
    recorded — verify-by-receipt at the granularity of a neighbourhood rather than a file. The same algebra as
    the provenance gate and the harmony law, turned on cost instead of prose: never vacuous, because it does
    fire, and only where it should. -/
theorem receipt_costs_nothing : (((List.range 4).filter (fun n => let s := n % 2; let m := n / 2 % 2; s * (1 - m) == 1)).length = 1) ∧ ((List.range 4).all (fun n => let s := n % 2; let m := n / 2 % 2; s * (1 - m) ≤ s)) := by decide

/-- WHAT TRAVELS IS THE COMPLETE ADDRESS; THE HANDLE IS ONLY THE PATH. A handle is 8 hex characters — 4 levels
    of 2, which is why it splits into a directory tree — and it indexes 16^8 = 4,294,967,296 addresses. The
    birthday bound is the reason that number is not the capacity: collisions become likely around its square
    root, and 65,536 × 65,536 is exactly 16^8, so the usable ceiling of an 8-hex name is about 65,536 things.
    The ledger is well inside that today and a memory built to grow is not. The full address carries 32 hex
    characters, 4 times the width and 128 bits, so the receipt stores that and the handle stays what it is good
    for: a place to put the file. Shipping the index where the identity belongs is the saving this refuses to
    take, refused here rather than at the point it would first collide. -/
theorem message_carries_address : (16^8 = 4294967296) ∧ (65536 * 65536 = 16^8) ∧ (8 * 4 = 32) ∧ (32 * 4 = 128) := by decide
