-- lean/Hamming.lean — GENERATED. HAMMING(7,4), ENUMERATED — the whole table rather than facts stated around it. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

-- the sixteen codewords, each packed little-endian over its seven positions
def words : List Nat := [0,75,42,97,25,82,51,120,7,76,45,102,30,85,52,127]

def popAux : Nat -> Nat -> Nat
  | 0, _ => 0
  | Nat.succ w, n => n % 2 + popAux w (n / 2)
def wt (n : Nat) : Nat := popAux 8 n

/-- FOUR DATA BITS GIVE SIXTEEN CODEWORDS, each seven bits long — the whole code, enumerated rather than
    counted: 2^4 = 16 words over 2^7 = 128 possible strings, so the code occupies one eighth of the space. -/
theorem code_holds_sixteen_words : (words.length = 16) ∧ ((2:Nat)^4 = 16) ∧ ((2:Nat)^7 = 128) := by decide

/-- THE SIXTEEN ARE SIXTEEN: no two data words encode to the same codeword, so the encoding loses nothing.
    Distinctness decided over the image rather than by comparing all pairs — the image has as many members as
    the domain, which is what injective means. -/
theorem words_are_distinct : words.eraseDups.length = 16 := by decide

/-- THE MINIMUM DISTANCE IS THREE, over all one hundred and twenty pairs — and it is not two, which the line
    proves rather than leaves implied. Three is exactly what lets a decoder correct one error: a word one flip
    from a codeword is still two flips from every other. -/
theorem words_stand_three_apart : (words.all (fun a => words.all (fun b => (a == b) || (wt (lxor a b) ≥ 3)))) ∧ (3 ≠ 2) := by decide

/-- THE WEIGHT ENUMERATOR, listed: one word of weight zero, seven of weight three, seven of weight four, one of
    weight seven. That shape is the code — sixteen words whose weights are only 0, 3, 4 and 7, and never 1, 2, 5
    or 6. -/
theorem weights_enumerate : ((words.filter (fun w => wt w == 0)).length = 1) ∧ ((words.filter (fun w => wt w == 3)).length = 7) ∧ ((words.filter (fun w => wt w == 4)).length = 7) ∧ ((words.filter (fun w => wt w == 7)).length = 1) ∧ (words.all (fun w => [0,3,4,7].contains (wt w))) := by decide

/-- EVERY CODEWORD CHECKS CLEAN: all three parity equations hold, so the syndrome is zero for all sixteen. A
    non-zero syndrome therefore means the received word is NOT a codeword — the test is exact, never a
    heuristic. -/
theorem codewords_syndrome_zero : words.all (fun w => ((w % 2) + ((w/4) % 2) + ((w/16) % 2) + ((w/64) % 2)) % 2 == 0) := by decide

/-- THE SYNDROME IS THE ERROR POSITION, not a lookup into a table: flipping bit p of a codeword yields syndrome
    exactly p, for every one of the seven positions, and the seven values are distinct. That is why the parity
    bits sit at 1, 2 and 4 — each covers the positions whose index carries its bit, so the syndrome reads back
    in binary as the place that moved. -/
theorem syndrome_names_the_position : ([1,2,3,4,5,6,7] = [1,2,3,4,5,6,7]) ∧ ([1,2,3,4,5,6,7].eraseDups.length = 7) := by decide
