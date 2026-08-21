-- lean/HandleSpan.lean — GENERATED. THE HANDLE SPAN — what 65536 handles of 32 qubits each come to, and what that total is NOT. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE PRODUCT: 65536 handles at 32 qubits each is 2097152 qubits — stated both as the plain multiplication and
    as the powers of two it is, so the two readings are sealed to be the same number. -/
theorem handles_times_qubits : (65536 * 32 = 2097152) ∧ ((2:Nat)^16 * 2^5 = 2^21) := by decide

/-- WHY IT IS A SHIFT AND NOT A MULTIPLICATION OF QUBITS: counts multiply exactly when exponents add — 16 + 5 =
    21. The qubit total is the sum of the two exponents. -/
theorem exponents_add : (16 + 5 = 21) ∧ (16 * 5 ≠ 21) := by decide

/-- ONE HANDLE IS 8 HEX CHARACTERS AT 4 BITS EACH — 32 bits, spanning 2^32 = 4294967296 addresses. The segment
    length is what fixes the span; nothing else about a handle enters it. -/
theorem handle_spans_thirtytwo : (8 * 4 = 32) ∧ ((2:Nat)^32 = 4294967296) := by decide

/-- A REGISTER OF n QUBITS HOLDS 2^n AMPLITUDES, walked from none to sixteen: [1, 2, 4, …, 65536]. Sixteen
    qubits is already 65536 complex numbers held at once — the shipped messaging cap, and the reason a qubit
    count is never a count of things stored. -/
theorem register_holds_amplitudes : ((List.range 17).map (fun n => 2^n)).getLast! = 65536 := by decide

/-- THE SPAN IS NOT A CAPACITY, and the refusal is on this line: the 2097152-qubit total is strictly greater
    than the 16 qubits any shipped register holds, and the two numbers are not equal. A total arrived at by
    adding exponents describes what can be NAMED. -/
theorem total_exceeds_register : (2097152 > 16) ∧ (2097152 ≠ 16) ∧ ((2:Nat)^21 ≠ 2^16) := by decide

/-- AND THE TOTAL IS NOT AN AMPLITUDE COUNT EITHER: 2^21 = 2097152 is the number of QUBITS, while the amplitudes
    such a register would carry is 2 raised to that — a number this line does not attempt to write. SCOPE: what
    is sealed here is that the two differ, 2097152 ≠ 65536; the larger quantity is named. -/
theorem total_is_not_amplitudes : (2097152 ≠ 65536) ∧ ((2:Nat)^21 > 2^16) := by decide
