-- lean/Crt.lean — GENERATED. THE FUSED RING — the rosette (Z/7) and the vortex (Z/9) are coprime, so by the Chinese Remainder Theorem they are ONE ring of 63 states, and its arithmetic explains the captain measure: the two coins buy 64 = 63 + 1, the whole fused structure plus the unit that closes it (63 = 111111, saturated in six bits; 64 = 1000000, the first bit beyond). The correspondence is a bijection, the units count 36 = 6·6 (each orbit length), and the coin keeps its order 6 in the fusion while walking the rosette twice per vortex turn — the seam, named. HONEST SCOPE: ring arithmetic and a counting correspondence; the CRT is a statement about residues, never about what the residues are used to describe Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

theorem captain_theorem_the_coins_buy_the_ring_and_one : (7 * 9 = 63) ∧ (2 * 32 = 64) ∧ (63 + 1 = 64) ∧ (2^6 = 64) ∧ (2^6 - 1 = 63) := by decide

theorem rosette_and_vortex_are_coprime : (Nat.gcd 7 9 = 1) ∧ (Nat.gcd 7 14 = 7) ∧ (Nat.gcd 9 6 = 3) := by decide

theorem residues_identify_digit : ((List.range 16).all (fun a => (List.range 16).all (fun b => (!((a % 6 == b % 6) && (a % 9 == b % 9))) || (a == b)))) ∧ (2 * 9 = 18) ∧ (18 % 6 = 0) ∧ (18 % 9 = 0) ∧ (18 - 16 = 2) := by decide

theorem crt_pairs_are_a_bijection : (((List.range 63).map (fun x => (x % 7) * 9 + (x % 9))).eraseDups.length = 63) := by decide

theorem fused_units_are_the_orbit_squared : (((List.range 63).filter (fun a => a > 0 && Nat.gcd a 63 == 1)).length = 36) ∧ (6 * 6 = 36) ∧ (((List.range 9).filter (fun a => a > 0 && Nat.gcd a 9 == 1)).length = 6) ∧ (((List.range 7).filter (fun a => a > 0 && Nat.gcd a 7 == 1)).length = 6) := by decide

theorem the_coin_keeps_its_order_in_the_fused_ring : ((2^6) % 63 = 1) ∧ ((2^6) % 9 = 1) ∧ ((2^3) % 7 = 1) ∧ ((5^6) % 63 = 1) := by decide

theorem the_fused_ring_is_all_ones : (63 = 32 + 16 + 8 + 4 + 2 + 1) ∧ (64 = 2^6) ∧ (63 < 64) := by decide
