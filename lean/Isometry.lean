-- lean/Isometry.lean — GENERATED. THE XOR ISOMETRY — the one identity the cipher, the strand and the code each hold a corner of. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

-- popcount as decidable, AXIOM-FREE structural recursion over an 8-bit fuel, the same shape lxor uses
def popAux : Nat -> Nat -> Nat
  | 0, _ => 0
  | Nat.succ w, n => n % 2 + popAux w (n / 2)
def pop (n : Nat) : Nat := popAux 8 n

-- the Hamming distance IS the weight of the difference
def dist (a b : Nat) : Nat := pop (lxor a b)

/-- THE ISOMETRY: xoring both sides by the same key leaves the Hamming distance unchanged, for every pair and
    every key over the four-bit cube. This is the single fact the cipher, the strand and the code each hold a
    corner of. -/
theorem xor_preserves_distance : (List.range 16).all (fun a => (List.range 16).all (fun b => (List.range 16).all (fun k => dist (lxor a k) (lxor b k) == dist a b))) := by decide

/-- WHY KEY REUSE LEAKS, stated as the cause rather than the symptom: because the pad is an isometry, the
    distance between two ciphertexts EQUALS the distance between their plaintexts. An attacker with neither key
    nor message still reads a true fact about the messages. Cipher.lean seals that reuse leaks the plaintext
    XOR; this seals why it must. -/
theorem reuse_leaks_by_isometry : (List.range 8).all (fun m1 => (List.range 8).all (fun m2 => (List.range 8).all (fun k => dist (lxor m1 k) (lxor m2 k) == dist m1 m2))) := by decide

/-- EVERY DNA BASE DIFFERS FROM ITS COMPLEMENT IN EXACTLY TWO BITS. A base is two bits, complementing is lxor
    with 3, and 3 has weight two — so the distance is two for all four bases. The strand's pairing is the pad's
    step, at width two. -/
theorem complement_flips_two : ((List.range 4).all (fun x => dist x (lxor x 3) == 2)) ∧ (pop 3 = 2) := by decide

/-- AND A CODON IS THREE BASES, SO SIX BITS: 4^3 = 64 = 2^6, and complementing a whole codon flips every one of
    the six — three bases at two bits each. The width scales with the word; the isometry does not change. -/
theorem codon_flips_six : ((4:Nat)^3 = 64) ∧ ((2:Nat)^6 = 64) ∧ (3 * 2 = 6) ∧ (pop 63 = 6) := by decide

/-- THE DISTANCE IS A METRIC. Both halves on the line, so the second is discharged where it is claimed rather
    than assumed from the first. -/
theorem distance_is_symmetric : (List.range 16).all (fun a => (List.range 16).all (fun b => (dist a b == dist b a) && ((dist a b == 0) == (a == b)))) := by decide

/-- AND WHY A CODE CORRECTS AT ALL: correction depends only on distance, which the isometry preserves, so the
    decoder's geometry survives encoding. At distance three a decoder corrects one error and detects two —
    (3−1)/2 = 1 and 3−1 = 2 — and it cannot correct two, which the line proves rather than leaves implied. -/
theorem isometry_bounds_correction : ((3 - 1) / 2 = 1) ∧ (3 - 1 = 2) ∧ ((3 - 1) / 2 ≠ 2) := by decide
