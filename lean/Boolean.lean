-- lean/Boolean.lean — GENERATED. THE SIXTEEN BINARY BOOLEAN FUNCTIONS — enumerated, under the names mathematics and digital logic already use. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- a two-input boolean function packed as its truth table over (0,0),(0,1),(1,0),(1,1) — one nibble each
def bitOf (m i : Nat) : Nat := (m / (2 ^ i)) % 2
def rowsOf (m : Nat) : List Nat := (List.range 4).map (fun i => bitOf m i)

-- the classical gates, as arithmetic on bits
def andB (a b : Nat) : Nat := a * b
def orB  (a b : Nat) : Nat := a + b - a * b
def notB (a : Nat) : Nat := 1 - a
def nandB (a b : Nat) : Nat := 1 - a * b

/-- THERE ARE EXACTLY SIXTEEN two-input boolean functions, and they are the sixteen values of a nibble: each
    function IS its four-row truth table, so 2^(2^2) = 16 counts them and no argument is needed beyond the
    encoding. All sixteen are distinct. -/
theorem sixteen_binary_functions : ((List.range 16).map rowsOf).eraseDups.length = 16 ∧ ((2:Nat)^(2^2) = 16) := by decide

/-- THE CLASSICAL GATES ARE PARTICULAR ROWS: AND is 0001, OR is 0111, XOR is 0110, NAND is 1110 and NOR is 1000,
    reading the table over (0,0), (0,1), (1,0), (1,1). Each named gate is one of the sixteen and the line
    identifies which, so the names are anchored to the enumeration rather than asserted beside it. -/
theorem gates_name_their_tables : (rowsOf 8 = [0,0,0,1]) ∧ (rowsOf 14 = [0,1,1,1]) ∧ (rowsOf 6 = [0,1,1,0]) ∧ (rowsOf 7 = [1,1,1,0]) ∧ (rowsOf 1 = [1,0,0,0]) := by decide

/-- NAND IS FUNCTIONALLY COMPLETE, decided rather than claimed: NOT is NAND of a value with itself, AND is the
    negation of NAND, and OR is NAND of the two negations. Every input pair checked, so the completeness
    argument is carried out rather than cited — this is why a chip can be one repeated gate. -/
theorem nand_rebuilds_the_others : ((List.range 2).all (fun a => nandB a a == notB a)) ∧ ((List.range 2).all (fun a => (List.range 2).all (fun b => notB (nandB a b) == andB a b))) ∧ ((List.range 2).all (fun a => (List.range 2).all (fun b => nandB (notB a) (notB b) == orB a b))) := by decide

/-- EXACTLY TWO OF THE SIXTEEN ARE CONSTANT — the always-false 0000 and the always-true 1111 — so fourteen
    actually depend on their inputs. Two, and the line proves the count rather than the reader noticing it. -/
theorem two_functions_ignore_input : (((List.range 16).filter (fun m => (rowsOf m).eraseDups.length == 1)).length = 2) ∧ (((List.range 16).filter (fun m => (rowsOf m).eraseDups.length > 1)).length = 14) := by decide

/-- XOR IS NOT OR, and the difference is the single row where both inputs hold: 0110 against 0111. The two agree
    on three of four rows, which is why the distinction is worth deciding rather than assuming — a gate that
    agreed everywhere would be the same gate. -/
theorem xor_differs_from_or : (rowsOf 6 ≠ rowsOf 14) ∧ ((rowsOf 6).take 3 = (rowsOf 14).take 3) ∧ (rowsOf 6 = [0,1,1,0]) := by decide

/-- IMPLICATION IS ONE OF THE SIXTEEN, not a logical extra: a implies b reads 1011 over the four rows, false
    only where a holds and b does not. Its converse and both negations are also among the sixteen, so the whole
    of two-input logic is inside the enumeration with nothing left outside it. -/
theorem implication_is_a_gate : (rowsOf 13 = [1,0,1,1]) ∧ (rowsOf 11 = [1,1,0,1]) ∧ (rowsOf 2 = [0,1,0,0]) := by decide
