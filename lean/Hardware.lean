-- lean/Hardware.lean — GENERATED. THE HARDWARE-VERIFIABLE BINARY ALGEBRA — the named nucleus of low-level combinational logic, each fact a decidable, axiom-free `by decide` particle. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

/-- The NOT gate as arithmetic: NOT a = 1 − a over a bit. Its truth table is [0,1] ↦ [1,0] — the one-input
    inverter, sealed exactly. -/
theorem not_gate_truth_table : [0,1].map (fun a => 1 - a) = [1,0] := by decide

/-- The AND gate as arithmetic: AND a b = a · b over bits. Its truth table over (0,0),(0,1),(1,0),(1,1) is
    [0,0,0,1] — one only when both inputs are one. -/
theorem and_gate_truth_table : [(0,0),(0,1),(1,0),(1,1)].map (fun p => p.1 * p.2) = [0,0,0,1] := by decide

/-- The OR gate as arithmetic: OR a b = a + b − a·b over bits. Its truth table is [0,1,1,1] — zero only when
    both inputs are zero. -/
theorem or_gate_truth_table : [(0,0),(0,1),(1,0),(1,1)].map (fun p => p.1 + p.2 - p.1 * p.2) = [0,1,1,1] := by decide

/-- The XOR gate as the axiom-free bitwise `lxor`: its truth table over the four rows is [0,1,1,0] — one exactly
    when the inputs differ. The difference detector, kernel-only. -/
theorem xor_gate_truth_table : [(0,0),(0,1),(1,0),(1,1)].map (fun p => lxor p.1 p.2) = [0,1,1,0] := by decide

/-- XOR IS addition in ℤ/2: lxor a b = (a + b) mod 2 for bits. The difference gate and the parity sum are one
    arithmetic — the binary algebra folds back to the field of two elements. -/
theorem xor_is_addition_mod_two : [(0,0),(0,1),(1,0),(1,1)].all (fun p => lxor p.1 p.2 == (p.1 + p.2) % 2) := by decide

/-- The algebra is CLOSED on the bit: every primitive gate returns a value ≤ 1 for bit inputs — NOT, AND, OR,
    XOR all land back in {0,1}. Combinational logic never leaves 𝔹. -/
theorem gate_output_is_one_bit : [(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - p.1 <= 1) ∧ (p.1 * p.2 <= 1) ∧ (p.1 + p.2 - p.1 * p.2 <= 1) ∧ (lxor p.1 p.2 <= 1)) := by decide

/-- NAND rebuilds NOT: NAND a a = 1 − a·a = 1 − a for a bit — tie a NAND's inputs together and it inverts. The
    first leg of NAND's universality. -/
theorem nand_reconstructs_not : [0,1].all (fun a => (1 - a * a) == (1 - a)) := by decide

/-- NAND rebuilds AND: AND a b = NOT (NAND a b) = 1 − (1 − a·b) = a·b — a NAND followed by a NAND-inverter is an
    AND. The second leg. -/
theorem nand_reconstructs_and : [(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - (1 - p.1 * p.2)) == p.1 * p.2) := by decide

/-- NAND rebuilds OR: OR a b = NAND (NOT a) (NOT b) = 1 − (1−a)(1−b) = a + b − a·b — invert both inputs into a
    NAND. The third leg. -/
theorem nand_reconstructs_or : [(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - (1 - p.1) * (1 - p.2)) == p.1 + p.2 - p.1 * p.2) := by decide

/-- NAND is FUNCTIONALLY COMPLETE for {NOT, AND, OR}: across every bit assignment, the three NAND
    reconstructions all hold at once — so a single gate type generates the whole basis. This is why digital
    chips are one repeated NAND. -/
theorem nand_functionally_complete : (List.range 4).all (fun n => ((1 - (n%2) * (n%2)) == (1 - n%2)) ∧ ((1 - (1 - (n%2) * (n/2%2))) == (n%2) * (n/2%2)) ∧ ((1 - (1 - n%2) * (1 - n/2%2)) == (n%2) + (n/2%2) - (n%2) * (n/2%2))) := by decide

/-- De Morgan in gates: NOT (a AND b) = (NOT a) OR (NOT b), as 1 − a·b = (1−a) + (1−b) − (1−a)(1−b) over bits.
    The identity that lets a synthesiser push bubbles through gates. -/
theorem de_morgan_gate_law : [(0,0),(0,1),(1,0),(1,1)].all (fun p => (1 - p.1 * p.2) == (1 - p.1) + (1 - p.2) - (1 - p.1) * (1 - p.2)) := by decide

/-- The HALF-ADDER is correct: sum = XOR a b, carry = AND a b, and sum + 2·carry = a + b over every bit pair.
    The one-bit addition circuit, proven against its arithmetic meaning. -/
theorem half_adder_correct : [(0,0),(0,1),(1,0),(1,1)].all (fun p => lxor p.1 p.2 + 2 * (p.1 * p.2) == p.1 + p.2) := by decide

/-- The FULL-ADDER is correct: sum = XOR (XOR a b) cin, carry = (a+b+cin)/2, and sum + 2·carry = a + b + cin
    across all eight input rows. The cell every ripple-carry adder chains, proven exact. -/
theorem full_adder_correct : (List.range 8).all (fun n => lxor (lxor (n%2) (n/2%2)) (n/4%2) + 2 * ((n%2 + n/2%2 + n/4%2) / 2) == n%2 + n/2%2 + n/4%2) := by decide

/-- The 2:1 MULTIPLEXER selects: mux s a b = (1−s)·a + s·b equals a when the select is 0 and b when it is 1,
    across all eight rows. Routing as arithmetic — the primitive every datapath is woven from. -/
theorem mux_selects_input : (List.range 8).all (fun n => (1 - n%2) * (n/2%2) + (n%2) * (n/4%2) == (if n%2 == 0 then n/2%2 else n/4%2)) := by decide

/-- THE LANES PARTITION THE WORK EXACTLY: summing what each of 14 lanes receives from 64 items returns 64 —
    nothing is lost between lanes and nothing is counted twice. This is WHY no coordination is needed. Residue
    routing is a partition of the input, so a lane can never need to ask another what it holds; the question a
    scheduler exists to answer cannot arise. -/
theorem lanes_partition_the_work : (List.range 14).foldl (fun a l => a + ((List.range 64).filter (fun i => i % 14 == l)).length) 0 = 64 := by decide

/-- THE SHARD IS BALANCED TO WITHIN ONE ITEM, with no coordination and no measurement of load: 64 items over 14
    lanes give every lane either 4 or 5, never fewer and never more. 64 = 4·14 + 8, so eight lanes take five and
    six take four. The balance is a property of the residue map itself, which is why it holds without any lane
    knowing what another is doing. -/
theorem lanes_balance_within_one : ((List.range 14).map (fun l => ((List.range 64).filter (fun i => i % 14 == l)).length)).all (fun c => c == 4 || c == 5) := by decide

/-- ON A COMPLETE RESIDUE SYSTEM THE SHARD IS EXACTLY EVEN: 56 items over 14 lanes give every lane precisely 4,
    because 56 is a multiple of 14. The imbalance in the general case is therefore never structural — it is only
    the remainder, bounded by one item per lane, and it vanishes whenever the work divides. -/
theorem lanes_even_on_complete_system : (List.range 14).all (fun l => ((List.range 56).filter (fun i => i % 14 == l)).length == 4) := by decide
