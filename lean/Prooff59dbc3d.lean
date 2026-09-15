-- lean/Prooff59dbc3d.lean — GENERATED. PROOF f59dbc3d: lead f59dbc3d of lean/leads.json (refuted), stated in the row's own lean field as lead_f59dbc3d, and proof_f59dbc3d, the kernel's proof of it, accepted at the door for the text addressed ce486ef0-0d47-87df-b3c2-bce7276a4b3f. Every proof checked by the kernel (by unfold), sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- constants as derived in uuidna lean/src/hologram.ts and uuidna/src/hexagram.ts
def COINS : Nat := 2
def HEXBIT_BITS : Nat := 4
def HEXBIT_STATES : Nat := 2 ^ HEXBIT_BITS
def UUID_HEXBITS : Nat := HEXBIT_STATES * COINS
def HANDLE_HEXBITS : Nat := UUID_HEXBITS / HEXBIT_BITS
def HANDLE_BITS : Nat := HANDLE_HEXBITS * HEXBIT_BITS
def HEXAGRAM_BITS : Nat := HEXBIT_BITS + 2

/-- HANDLE_BITS % HEXAGRAM_BITS = 2 (the eight-hex handle does not tile as hexagrams). HEXBIT_STATES %
    HEXAGRAM_BITS = 4. Those remainders are different cuts. -/
def lead_f59dbc3d : Prop :=
  HANDLE_HEXBITS = 8 ∧
  HANDLE_BITS % HEXAGRAM_BITS = 2 ∧ HANDLE_BITS % HEXAGRAM_BITS ≠ 0 ∧
  HEXBIT_STATES % HEXAGRAM_BITS = 4 ∧ HANDLE_BITS % HEXAGRAM_BITS ≠ HEXBIT_STATES % HEXAGRAM_BITS

/-- The kernel proves lead f59dbc3d: HANDLE_BITS % HEXAGRAM_BITS = 2 (the eight-hex handle does not tile as
    hexagrams). HEXBIT_STATES % HEXAGRAM_BITS = 4. Those remainders are different cuts. -/
theorem proof_f59dbc3d : lead_f59dbc3d := by unfold lead_f59dbc3d; decide
