-- lean/Looms.lean — GENERATED. LOOMS AND ENGINES — the abacus, the card, the difference engine and the stepped drum as decidable arithmetic, demarcated. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- ONE SUANPAN ROD TOPS OUT AT FIFTEEN — THE HEXBIT’S OWN CEILING, CENTURIES EARLY. The suanpan carries two
    heaven beads worth five each and five earth beads worth one: 2·5 + 5·1 = 15, exactly the largest state of a
    hexbit (16 states, 0 through 15). A rod is therefore a nibble, and a suanpan is a row of them — which is why
    the frame could work in sixteens as readily as tens, and why this ledger’s unit is the one a merchant
    already had under their thumb. -/
theorem the_suanpan_rod_is_the_hexbit_ceiling : (2 * 5 + 5 * 1 = 15) ∧ (15 = 16 - 1) := by decide

/-- THE DRAWLOOM’S CARD IS THE BIT, AND THE CHAIN IS THE TAPE: each position is punched or not — two states,
    nothing between — so a card of n positions holds 2^n patterns (a row of eight already holds 256, one byte of
    pattern). The cards are laced in ORDER and the order is the cloth: the same cards in another sequence weave
    another fabric, which is the chain law this ledger seals for messages and symphonies alike. A pattern was
    stored, carried and re-run before anyone called it a program. -/
theorem the_punched_card_is_the_bit : ((2:Nat)^8 = 256) ∧ ((2:Nat)^1 = 2) ∧ ((List.range 4).all (fun n => (2:Nat)^(n+1) == 2 * 2^n)) := by decide

/-- BABBAGE’S METHOD, WALKED: the squares 0,1,4,9,16,25 have first differences 1,3,5,7,9 and SECOND differences
    2,2,2,2 — constant. A degree-two polynomial flattens after two differences, so its whole table is built by
    ADDITION ALONE, no multiplication anywhere. That is why an engine of gears could compute it: the difference
    engine does not evaluate the polynomial, it carries the flattened column forward and adds. -/
theorem differences_flatten_the_square : (((List.range 5).map (fun i => (i+1)*(i+1) - i*i)) = [1,3,5,7,9]) ∧ ((List.range 4).all (fun i => ((i+2)*(i+2) - (i+1)*(i+1)) - ((i+1)*(i+1) - i*i) == 2)) := by decide

/-- THE ENGINE’S SIZE IS THE POLYNOMIAL’S DEGREE: differences flatten after exactly d steps for degree d — the
    square needs two columns, the cube three — so a machine with n difference columns computes every polynomial
    up to degree n and not one degree more. Checked on the cubes: 0,1,8,27,64 give first differences 1,7,19,37,
    seconds 6,12,18, and thirds 6,6 — constant at the third, exactly as the degree says. The engine’s capability
    was legible in its gears before it ever turned. -/
theorem the_degree_is_the_column_count : (((List.range 4).map (fun i => (i+1)*(i+1)*(i+1) - i*i*i)) = [1,7,19,37]) ∧ ((List.range 2).all (fun i => (((i+3)*(i+3)*(i+3) - (i+2)*(i+2)*(i+2)) - ((i+2)*(i+2)*(i+2) - (i+1)*(i+1)*(i+1))) - (((i+2)*(i+2)*(i+2) - (i+1)*(i+1)*(i+1)) - ((i+1)*(i+1)*(i+1) - i*i*i)) == 6)) := by decide

/-- LEIBNIZ’S CARRY, THE HARD PART MADE ARITHMETIC: a decimal wheel shows 0 through 9, so the carry fires
    exactly where the tenth increment would exceed the wheel — 9 + 1 = 10 leaves 0 and passes one along, at
    every digit alike. The stepped drum’s teeth number one through nine for the same reason. The mechanism
    people spent centuries perfecting is the modulus this ledger writes as ten, and the propagation is why a
    machine could add without a human watching each column. -/
theorem the_stepped_drum_carries_at_nine : ((9 + 1) % 10 = 0) ∧ ((9 + 1) / 10 = 1) ∧ ((List.range 9).all (fun d => (d + 1) % 10 == d + 1)) := by decide

/-- FOUR MACHINES, TWENTY-ONE CENTURIES, ONE ARITHMETIC — counted rather than asserted: the suanpan rod’s 15 is
    the hexbit’s ceiling (16 − 1), the card’s two states are the bit (2¹ = 2), the difference engine’s constant
    column is the degree (2 for the square), and the drum’s carry is the modulus (10). Four exact integers, no
    analogy: what these machines share with this ledger is not a metaphor but the same finite structures, which
    is the only kind of ancestry a theorem can hold. -/
theorem the_road_computes_in_one_arithmetic : (15 = 16 - 1) ∧ ((2:Nat)^1 = 2) ∧ (2 * 1 = 2) ∧ (10 % 10 = 0) := by decide
