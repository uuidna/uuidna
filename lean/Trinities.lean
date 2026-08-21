-- lean/Trinities.lean — GENERATED. THE TRINITY COVERING — how many threes span a space. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- A TRINITY IS THREE, and n of them span 3^n — the same shape as n qubits spanning 2^n. Walked from none to
    six: [1, 3, 9, 27, 81, 243, 729]. Nine is two trinities and eighty-one is four. -/
theorem trinities_span_powers : (List.range 7).map (fun n => 3^n) = [1,3,9,27,81,243,729] := by decide

/-- A TRINITY IS WORTH MORE THAN A QUBIT AND LESS THAN TWO: 2^1 < 3 < 2^2. Threes therefore never divide a
    binary space evenly, which is why a fold of fifteen leaves is five trinities and not a power of two. -/
theorem trinity_exceeds_qubit : ((2:Nat)^1 < 3) ∧ (3 < (2:Nat)^2) := by decide

/-- COVERING 10^9 TAKES 19 TRINITIES, AND 18 DO NOT — both halves on one line, so this states THE bound and not
    merely a bound. 3^19 reaches it; 3^18 falls short. A theorem that only said "19 suffice" would be satisfied
    by any larger number and would seal nothing. -/
theorem trinities_cover_billion : ((3:Nat)^19 ≥ 10^9) ∧ ((3:Nat)^18 < 10^9) := by decide

/-- COVERING 2^64 TAKES 41 TRINITIES, AND 40 DO NOT — both halves on one line, so this states THE bound and not
    merely a bound. 3^41 reaches it; 3^40 falls short. A theorem that only said "41 suffice" would be satisfied
    by any larger number and would seal nothing. -/
theorem trinities_cover_word : ((3:Nat)^41 ≥ 2^64) ∧ ((3:Nat)^40 < 2^64) := by decide

/-- COVERING 2^128 TAKES 81 TRINITIES, AND 80 DO NOT — both halves on one line, so this states THE bound and not
    merely a bound. 3^81 reaches it; 3^80 falls short. A theorem that only said "81 suffice" would be satisfied
    by any larger number and would seal nothing. -/
theorem trinities_cover_address : ((3:Nat)^81 ≥ 2^128) ∧ ((3:Nat)^80 < 2^128) := by decide

/-- THE COVERING NUMBER FOR THE ADDRESS SPACE IS THE RING'S OWN TABLE SIZE: 81 = 9^2 = 3^4, the full Z/9
    multiplication table. SCOPE: this seals the arithmetic identity and nothing else. 128 divided by log2(3) is
    80.76, so any space near 2^128 needs about eighty-one threes — the coincidence is decidable, its meaning is
    not, and no meaning is claimed here. -/
theorem eightyone_squares_nine : (81 = 9^2) ∧ (81 = 3^4) ∧ (9 = 3^2) := by decide
