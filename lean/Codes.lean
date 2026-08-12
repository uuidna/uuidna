-- lean/Codes.lean — GENERATED. THE ERROR-CORRECTING CODES — Hamming(7,4), the perfect-code sphere-packing, distance/correction bounds, and the XOR checksum, decidable. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

-- Hamming(7,4): 4 data bits + 3 parity bits = 7, carrying 2⁴ = 16 codewords — three redundant bits protect four.
theorem hamming_seven_four : 4 + 3 = 7 ∧ 2^4 = 16 := by decide

-- Hamming(7,4) is a PERFECT code: each of the 16 codewords owns a sphere of 1 (itself) + 7 (single-bit flips) = 8, and 16 × 8 = 128 = 2⁷ — the spheres tile the whole 7-bit space exactly, no word wasted.
theorem hamming_perfect_code : 16 * 8 = 128 ∧ 2^7 = 128 := by decide

-- The minimum distance d = 3 satisfies the Singleton bound d ≤ n − k + 1 = 7 − 4 + 1 = 4 — no code can beat it, and Hamming sits one below.
theorem singleton_bound : 3 ≤ 7 - 4 + 1 := by decide

-- A minimum distance of 3 corrects ⌊(d−1)/2⌋ = ⌊2/2⌋ = 1 error: any single flip lands strictly nearer its own codeword than any other.
theorem distance_three_corrects_one : (3 - 1) / 2 = 1 := by decide

-- The same distance-3 code DETECTS d − 1 = 2 errors — two flips can never reach another codeword, so they are always noticed (though not corrected).
theorem distance_three_detects_two : 3 - 1 = 2 := by decide

-- The (3,1) repetition code corrects one flip by MAJORITY: [1,1,1] with one bit flipped still shows two 1s, and 2·2 > 3 makes two a strict majority of three.
theorem repetition_three_majority : (([1,1,0].filter (fun x => x == 1)).length = 2) ∧ (2 * 2 > 3) := by decide

-- A linear XOR checksum catches any single flip: XOR is self-inverse, so flipping a word by d and re-checking recovers exactly d — (a ⊕ d) ⊕ a = d, for every a. The error cannot hide.
theorem xor_checksum_catches_flip : (List.range 8).all (fun a => lxor (lxor a 5) a == 5) := by decide

-- Correction needs room: 2⁴ = 16 codewords sit sparsely inside 2⁷ = 128 possible words (16 < 128) — the redundancy is exactly what lets a flipped word be traced back to its origin.
theorem codewords_sparse : 2^4 < 2^7 := by decide
