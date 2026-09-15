-- lean/UuidLaws.lean — GENERATED. The uuid laws — what the version-8 stamp keeps and fixes, and why an address never determines its payload; proved by ceccec, re-judged on this host Every proof checked by the kernel (by decide, by exact, by intro, by match, by rw, by show), sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def andF : Nat → Nat → Nat → Nat | 0, _, _ => 0 | _, 0, _ => 0 | _, _, 0 => 0 | Nat.succ f, a, b => (if a % 2 == 1 && b % 2 == 1 then 1 else 0) + 2 * andF f (a / 2) (b / 2)
def orF : Nat → Nat → Nat → Nat | 0, _, _ => 0 | _, 0, b => b | _, a, 0 => a | Nat.succ f, a, b => (if a % 2 == 1 || b % 2 == 1 then 1 else 0) + 2 * orF f (a / 2) (b / 2)
def and8 (a b : Nat) : Nat := andF 9 a b
def or8 (a b : Nat) : Nat := orF 9 a b
/-- the version stamp on byte 6: (b & 0x0F) | 0x80 -/
def versionStamp (b : Nat) : Nat := or8 (and8 b 15) 128
/-- the variant stamp on byte 8: (b & 0x3F) | 0x80 -/
def variantStamp (b : Nat) : Nat := or8 (and8 b 63) 128
def bitAt (x i : Nat) : Nat := x / 2 ^ i % 2
/-- every byte 0 … 255, as sixteen high nibbles by sixteen low ones — exhaustive, and within the default recursion depth -/
def allBytes (p : Nat → Bool) : Bool := (List.range 16).all (fun hi => (List.range 16).all (fun lo => p (16 * hi + lo)))
/-- the bit positions of a byte that a stamp sets to the same value for every input byte -/
def fixedPositions (stamp : Nat → Nat) : List Nat :=
  (List.range 8).filter (fun i => allBytes (fun b => bitAt (stamp b) i == bitAt (stamp 0) i))

/-- every one of the 256 bytes keeps its low nibble under the version stamp -/
theorem version_stamp : allBytes (fun b => or8 (and8 b 15) 128 == 128 + b % 16) = true := by decide

/-- every one of the 256 bytes keeps its low six bits under the variant stamp -/
theorem variant_stamp : allBytes (fun b => or8 (and8 b 63) 128 == 128 + b % 64) = true := by decide

/-- every one of the 256 stamped bytes carries the high nibble 8 -/
theorem version_high_nibble_is_eight : allBytes (fun b => versionStamp b / 16 == 8) = true := by decide

/-- every one of the 256 stamped bytes carries the high bits 10 -/
theorem variant_high_two_are_one_zero : allBytes (fun b => variantStamp b / 64 == 2) = true := by decide

/-- of the 8 bit positions, the stamps fix exactly 4 and 2, measured over all 256 bytes -/
theorem fixed_positions_exact : fixedPositions versionStamp = [4, 5, 6, 7] ∧ fixedPositions variantStamp = [6, 7] := by decide

/-- the 128 bits of a UUID keep 122 free once the 4 + 2 measured stamp bits are fixed -/
theorem free_bits_122 : 16 * 8 - ((fixedPositions versionStamp).length + (fixedPositions variantStamp).length) = 122 := by
  rw [fixed_positions_exact.1, fixed_positions_exact.2]; decide

/-- for every map, value and bound, a search either finds the value or shows no input up to the bound has it -/
theorem bounded_search_finds_or_refutes : ∀ (f : Nat → Nat) (v n : Nat), (∃ x, x ≤ n ∧ f x = v) ∨ (∀ x, x ≤ n → f x ≠ v) := by
  intro f v n
  induction n with
  | zero =>
    exact match Nat.decEq (f 0) v with
    | isTrue h => Or.inl ⟨0, Nat.le_refl 0, h⟩
    | isFalse h => Or.inr (fun x hx => match x, hx with | 0, _ => h)
  | succ n ih =>
    exact match ih with
    | Or.inl ⟨x, hx, h⟩ => Or.inl ⟨x, Nat.le_succ_of_le hx, h⟩
    | Or.inr hn => match Nat.decEq (f (n + 1)) v with
      | isTrue h => Or.inl ⟨n + 1, Nat.le_refl _, h⟩
      | isFalse h => Or.inr (fun x hx => match Nat.eq_or_lt_of_le hx with
        | Or.inl e => e ▸ h
        | Or.inr l => hn x (Nat.le_of_lt_succ l))

/-- for every size n, any map of the n + 1 inputs into n values sends two of them to the same value -/
theorem pigeonhole_for_every_size : ∀ (n : Nat) (f : Nat → Nat), (∀ x, x ≤ n → f x < n) → ∃ x y, x < y ∧ y ≤ n ∧ f x = f y := by
  intro n
  induction n with
  | zero => intro f hf; exact absurd (hf 0 (Nat.le_refl 0)) (Nat.not_lt_zero _)
  | succ n ih =>
    intro f hf
    exact match bounded_search_finds_or_refutes f (f (n + 1)) n with
    | Or.inl ⟨x, hx, h⟩ => ⟨x, n + 1, Nat.lt_succ_of_le hx, Nat.le_refl _, h⟩
    | Or.inr hne =>
      let g : Nat → Nat := fun x => if f x = n then f (n + 1) else f x
      have hg : ∀ x, x ≤ n → g x < n := fun x hx => by
        show (if f x = n then f (n + 1) else f x) < n
        match Nat.decEq (f x) n with
        | isTrue e =>
          rw [if_pos e]
          match Nat.eq_or_lt_of_le (Nat.le_of_lt_succ (hf (n + 1) (Nat.le_refl _))) with
          | Or.inl e' => exact absurd (e.trans e'.symm) (hne x hx)
          | Or.inr l => exact l
        | isFalse e =>
          rw [if_neg e]
          match Nat.eq_or_lt_of_le (Nat.le_of_lt_succ (hf x (Nat.le_succ_of_le hx))) with
          | Or.inl e' => exact absurd e' e
          | Or.inr l => exact l
      match ih g hg with
      | ⟨x, y, hxy, hy, he⟩ =>
        have hx : x ≤ n := Nat.le_of_lt (Nat.lt_of_lt_of_le hxy hy)
        ⟨x, y, hxy, Nat.le_succ_of_le hy, by
          match Nat.decEq (f x) n, Nat.decEq (f y) n with
          | isTrue a, isTrue b => exact a.trans b.symm
          | isTrue a, isFalse b =>
            have : g x = g y := he
            simp only [g, if_pos a, if_neg b] at this
            exact absurd this.symm (hne y hy)
          | isFalse a, isTrue b =>
            have : g x = g y := he
            simp only [g, if_neg a, if_pos b] at this
            exact absurd this (hne x hx)
          | isFalse a, isFalse b =>
            have : g x = g y := he
            simp only [g, if_neg a, if_neg b] at this
            exact this⟩

/-- for every width k, any k-bit address of the 2^k + 1 inputs 0 … 2^k gives two of them the same address -/
theorem address_never_determines_payload : ∀ (k : Nat) (f : Nat → Nat), (∀ x, f x < 2 ^ k) → ∃ x y, x < y ∧ y ≤ 2 ^ k ∧ f x = f y := by exact fun k f hf => pigeonhole_for_every_size (2 ^ k) f (fun x _ => hf x)
