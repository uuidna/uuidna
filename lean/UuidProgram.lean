-- lean/UuidProgram.lean — GENERATED. UUID QUANTUM PROGRAMS — a UUID register and the program it names, with exact quantum semantics: every theorem states what the program at adb1b053-39db-3a30-0000-000000000000 (uuidna_quantum) computes, and its JS mirror calls that program by its UUID Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- a Gaussian integer re + im·i: an exact amplitude, never a float -/
structure GI where
  re : Int
  im : Int
deriving DecidableEq

instance (n : Nat) : OfNat GI n := ⟨⟨n, 0⟩⟩
instance : Add GI := ⟨fun a b => ⟨a.re + b.re, a.im + b.im⟩⟩
instance : Neg GI := ⟨fun a => ⟨-a.re, -a.im⟩⟩
instance : Mul GI := ⟨fun a b => ⟨a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re⟩⟩

/-- the imaginary unit, the conjugate and the squared modulus (a measurement weight) -/
def GI.i : GI := ⟨0, 1⟩
def GI.conj (a : GI) : GI := ⟨a.re, -a.im⟩
def GI.normSq (a : GI) : Int := a.re * a.re + a.im * a.im

/-- the sum of f k for k < n -/
def sumTo (n : Nat) (f : Nat → GI) : GI := (List.range n).foldl (fun acc k => acc + f k) 0

/-- a state: its amplitude on each basis index; a matrix read below its dimension -/
abbrev Vec := Nat → GI
abbrev Mat := Nat → Nat → GI
def basis (b : Nat) : Vec := fun r => if r = b then 1 else 0
def mm (n : Nat) (a b : Mat) : Mat := fun r c => sumTo n fun k => a r k * b k c
def dag (a : Mat) : Mat := fun r c => GI.conj (a c r)
def idm : Mat := fun r c => if r = c then 1 else 0
def smul (k : GI) (a : Mat) : Mat := fun r c => k * a r c
def kron (m : Nat) (a b : Mat) : Mat := fun r c => a (r / m) (c / m) * b (r % m) (c % m)
def perm (p : Nat → Nat) : Mat := fun r c => if r = p c then 1 else 0
def ap (n : Nat) (u : Mat) (v : Vec) : Vec := fun r => sumTo n fun k => u r k * v k
def Same (n : Nat) (a b : Mat) : Prop := ∀ r, r < n → ∀ c, c < n → a r c = b r c
instance (n : Nat) (a b : Mat) : Decidable (Same n a b) := by unfold Same; infer_instance

/-- the gates: Hadamard unscaled, the Paulis, the phase gate, and the permutation gates -/
def H : Mat := fun r c => if r = 1 ∧ c = 1 then -1 else 1
def X : Mat := perm fun c => 1 - c
def Z : Mat := fun r c => if r = c then (if r = 0 then 1 else -1) else 0
def S : Mat := fun r c => if r = c then (if r = 0 then 1 else GI.i) else 0
def CNOT : Mat := perm fun c => if c = 2 then 3 else if c = 3 then 2 else c
def Y : Mat := fun r c => if r = 0 ∧ c = 1 then -GI.i else if r = 1 ∧ c = 0 then GI.i else 0
def SWAP : Mat := perm fun c => if c = 1 then 2 else if c = 2 then 1 else c
def TOFFOLI : Mat := perm fun c => if c = 6 then 7 else if c = 7 then 6 else c

/-- a UUID as its 32 hex digits, split as src/hex-programs.ts lays a program address out -/
structure Uuid where
  hex : List Nat
deriving DecidableEq
def Uuid.valid (u : Uuid) : Bool := u.hex.length == 32 && u.hex.all (· < 16)
def Uuid.handle (u : Uuid) : List Nat := u.hex.take 8
def Uuid.program (u : Uuid) : List Nat := (u.hex.drop 8).take 8
def Uuid.params (u : Uuid) : List Nat := (u.hex.drop 16).take 4
def Uuid.envelope (u : Uuid) : List Nat := u.hex.drop 20

/-- the program this wing speaks of: uuidna_quantum at the address adb1b053-39db-3a30-0000-000000000000 -/
def quantumProgram : Uuid := ⟨[10, 13, 11, 1, 11, 0, 5, 3, 3, 9, 13, 11, 3, 10, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]⟩

/-- the circuits that program runs, in exact amplitudes: Bell (H then CNOT) and GHZ(3) -/
def bell : Vec := ap 4 CNOT (ap 4 (kron 2 H idm) (basis 0))
def ghz : Vec := ap 8 (kron 4 idm CNOT) (ap 8 (kron 2 CNOT idm) (ap 8 (kron 4 H idm) (basis 0)))

/-- the program's UUID is a valid 32-digit address whose program field is uuidna_quantum's derived 8-hex program -/
theorem uuidprog_address : quantumProgram.valid = true ∧ quantumProgram.program = [3, 9, 13, 11, 3, 10, 3, 0] := by decide

/-- the address splits into handle · program · params · envelope and the four fields rejoin to the whole UUID -/
theorem uuidprog_layout : quantumProgram.handle ++ quantumProgram.program ++ quantumProgram.params ++ quantumProgram.envelope = quantumProgram.hex := by decide

/-- Hadamard is unitary up to its scale: H · H† = 2 · I -/
theorem uuidprog_h_unitary : Same 2 (mm 2 H (dag H)) (smul 2 idm) := by decide

/-- X, Z and S are unitary, and S squared is Z -/
theorem uuidprog_paulis_unitary : Same 2 (mm 2 X (dag X)) idm ∧ Same 2 (mm 2 Z (dag Z)) idm ∧ Same 2 (mm 2 S (dag S)) idm ∧ Same 2 (mm 2 S S) Z := by decide

/-- CNOT and SWAP are unitary and each is its own inverse -/
theorem uuidprog_cnot_swap : Same 4 (mm 4 CNOT (dag CNOT)) idm ∧ Same 4 (mm 4 CNOT CNOT) idm ∧ Same 4 (mm 4 SWAP (dag SWAP)) idm ∧ Same 4 (mm 4 SWAP SWAP) idm := by decide

/-- Toffoli is unitary and its own inverse -/
theorem uuidprog_toffoli : Same 8 (mm 8 TOFFOLI (dag TOFFOLI)) idm ∧ Same 8 (mm 8 TOFFOLI TOFFOLI) idm := by decide +kernel

/-- conjugating by Hadamard swaps X and Z and negates Y — the stabilizer tableau's H rule (swap the x and z
    bits, flip the phase where both are set) -/
theorem uuidprog_tableau_h : Same 2 (mm 2 (mm 2 H X) (dag H)) (smul 2 Z) ∧ Same 2 (mm 2 (mm 2 H Z) (dag H)) (smul 2 X) ∧ Same 2 (mm 2 (mm 2 H Y) (dag H)) (smul (-2) Y) := by decide

/-- conjugating by S sends X to Y and Y to −X and leaves Z — the stabilizer tableau's S rule (z gains x, the
    phase flips where both are set) -/
theorem uuidprog_tableau_s : Same 2 (mm 2 (mm 2 S X) (dag S)) Y ∧ Same 2 (mm 2 (mm 2 S Y) (dag S)) (smul (-1) X) ∧ Same 2 (mm 2 (mm 2 S Z) (dag S)) Z := by decide

/-- conjugating by CNOT copies X from control to target and Z from target to control — the stabilizer tableau's
    CNOT rule (x of the target gains x of the control, z of the control gains z of the target) -/
theorem uuidprog_tableau_cnot : Same 4 (mm 4 (mm 4 CNOT (kron 2 X idm)) (dag CNOT)) (kron 2 X X) ∧ Same 4 (mm 4 (mm 4 CNOT (kron 2 idm X)) (dag CNOT)) (kron 2 idm X) ∧ Same 4 (mm 4 (mm 4 CNOT (kron 2 Z idm)) (dag CNOT)) (kron 2 Z idm) ∧ Same 4 (mm 4 (mm 4 CNOT (kron 2 idm Z)) (dag CNOT)) (kron 2 Z Z) := by decide +kernel

/-- the program at adb1b053-39db-3a30-0000-000000000000, run on the Bell circuit, puts weight on exactly 00 and
    11, in equal shares — the weights its door serves -/
theorem uuidprog_bell_runs : (List.range 4).map (fun r => (bell r).normSq) = [1, 0, 0, 1] := by decide

/-- the program at adb1b053-39db-3a30-0000-000000000000, run on the GHZ circuit, puts weight on exactly 000 and
    111, in equal shares — the weights its door serves -/
theorem uuidprog_ghz_runs : (List.range 8).map (fun r => (ghz r).normSq) = [1, 0, 0, 0, 0, 0, 0, 1] := by decide +kernel
