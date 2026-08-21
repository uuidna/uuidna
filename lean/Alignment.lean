-- lean/Alignment.lean — GENERATED. ALIGNMENT — which moduli tile a qubit and which waste it. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- A HEX CHARACTER IS EXACTLY FOUR QUBITS: 16 = 2^4, so the two measures tile with no remainder. This is why a
    uuid of 32 hex characters is a clean 128 bits and a handle of 8 is a clean 32. -/
theorem hexbit_is_four_qubits : ((2:Nat)^4 = 16) ∧ (32 * 4 = 128) ∧ (8 * 4 = 32) := by decide

/-- WHAT EACH MODULUS COSTS IN ONE FOUR-QUBIT CELL: sixteen wastes nothing, fifteen wastes one, ten wastes six,
    nine wastes seven. The walk enters through a mod-ten reduction, so six of every sixteen states go unused at
    the door. -/
theorem moduli_waste_states : [9,10,15,16].map (fun m => 16 - m) = [7,6,1,0] := by decide

/-- ONLY SIXTEEN TILES THE CELL, and the others are named as failing: 16 leaves nothing over while 15, 10 and 9
    each leave a remainder. A modulus tiles a qubit cell exactly when it IS the cell, and none of the harmonic
    moduli is. -/
theorem sixteen_alone_tiles : (16 - 16 = 0) ∧ ([9,10,15].all (fun m => 16 - m > 0)) := by decide

/-- THE DOOR IS THE EXPENSIVE CHOICE: reducing mod ten wastes six of sixteen where the base's own invariant,
    fifteen, wastes one — six times the loss, on the same four qubits. SCOPE: this decides the counting only.
    The ledger walks ten DIGITS deliberately, because folding mod nine collapsed nine onto zero and made a tenth
    of the domain unreachable; that reason is recorded where the choice is made. -/
theorem ten_costs_more_than_fifteen : (16 - 10 = 6) ∧ (16 - 15 = 1) ∧ (16 - 10 > 16 - 15) := by decide

/-- THE ADDRESSING LAYER IS BUILT OF POWERS OF TWO — 16, 32, 128, 65536 are 2^4, 2^5, 2^7, 2^16 — while nine and
    ten are not powers of two at all, which the line proves by exhibiting the nearest ones on either side: 8 < 9
    < 16 and 8 < 10 < 16. -/
theorem powers_of_two_are_the_substance : ((2:Nat)^4 = 16 ∧ (2:Nat)^5 = 32 ∧ (2:Nat)^7 = 128 ∧ (2:Nat)^16 = 65536) ∧ ((2:Nat)^3 < 9 ∧ 9 < 2^4) ∧ ((2:Nat)^3 < 10 ∧ 10 < 2^4) := by decide

/-- AND THE DISCARD, COUNTED: a handle carries 32 qubits of span, the seed it becomes carries at most four, so
    28 are dropped before the walk takes its first step. The line proves the subtraction and that the two are
    not equal — the walk sees an eighth of what the handle names. -/
theorem handle_discards_before_walking : (32 - 4 = 28) ∧ (32 ≠ 4) ∧ (4 * 8 = 32) := by decide
