#!/usr/bin/env node
// Automate the Lean layer for UUID QUANTUM PROGRAMS — a UUID register and the program it names, as Lean definitions with
// exact quantum semantics, so a theorem states what a program computes rather than a count wearing a quantum name.
// The register is the layout src/hex-programs.ts declares (handle · program · params · envelope); the semantics is
// exact (Gaussian-integer amplitudes, unscaled Hadamard, weights compared, never normalised), ported from qpu's
// Physics/HilbertSpace, Physics/Operator and Processing/QuantumGate. Each fact's JS mirror checks it by the road it
// claims: the UUID facts through the codec the door resolves calls with, the gate facts by exact integer matrices, and
// the program facts by CALLING the program through its UUID — so Lean and the program check each other.
import { emit, leanList } from './lean-gen.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'
import { uuidOfCall, callOfUuid } from '../hex-programs.js'
import { callTool } from '../mcp.js'

// ── the program this wing speaks of: uuidna_quantum, addressed from this wing's own handle ──
const DOOR = 'uuidna_quantum'
const PROGRAM_UUID = uuidOfCall({ handle: handleOf(toUuid('lean:UuidProgram.lean')), door: DOOR })
const nibbles = (u: string): number[] => [...u.replace(/-/g, '')].map((c) => parseInt(c, 16))

// ── exact 2×2 / 4×4 / 8×8 matrices over the Gaussian integers, as pairs [re, im] — the JS side of the gate facts ──
type G = [number, number]
type M = (r: number, c: number) => G
const gmul = (a: G, b: G): G => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]
const gadd = (a: G, b: G): G => [a[0] + b[0], a[1] + b[1]]
const mm = (n: number, a: M, b: M): M => (r, c) => [...Array(n).keys()].reduce<G>((s, k) => gadd(s, gmul(a(r, k), b(k, c))), [0, 0])
const dag = (a: M): M => (r, c) => { const [re, im] = a(c, r); return [re, -im] }
const idm: M = (r, c) => [r === c ? 1 : 0, 0]
const smul = (k: number, a: M): M => (r, c) => { const [re, im] = a(r, c); return [k * re, k * im] }
const perm = (p: (c: number) => number): M => (r, c) => [r === p(c) ? 1 : 0, 0]
const same = (n: number, a: M, b: M): boolean => [...Array(n).keys()].every((r) => [...Array(n).keys()].every((c) => a(r, c)[0] === b(r, c)[0] && a(r, c)[1] === b(r, c)[1]))
const H: M = (r, c) => [r === 1 && c === 1 ? -1 : 1, 0]
const X = perm((c) => 1 - c)
const Z: M = (r, c) => [r === c ? (r === 0 ? 1 : -1) : 0, 0]
const S: M = (r, c) => (r === c ? (r === 0 ? [1, 0] : [0, 1]) : [0, 0])
const CNOT = perm((c) => (c === 2 ? 3 : c === 3 ? 2 : c))
const SWAP = perm((c) => (c === 1 ? 2 : c === 2 ? 1 : c))
const TOFFOLI = perm((c) => (c === 6 ? 7 : c === 7 ? 6 : c))
const Y: M = (r, c) => (r === 0 && c === 1 ? [0, -1] : r === 1 && c === 0 ? [0, 1] : [0, 0])
const kron = (m: number, a: M, b: M): M => (r, c) => gmul(a((r - (r % m)) / m, (c - (c % m)) / m), b(r % m, c % m))
/** U · P · U† — how a gate carries a Pauli, the step a stabilizer tableau records */
const conj = (n: number, u: M, p: M): M => mm(n, mm(n, u, p), dag(u))

// the program's own answer, by its UUID: the outcome weights it serves for a named circuit, as the unscaled weights the
// Lean state carries. Only an exact equal split reads as weights — every served probability exactly 1/k over its k
// outcomes — so a program that served the right support with the wrong shares (a dropped Hadamard scale) reads as none.
const served = (circuit: string, n: number): number[] => {
  const r = callTool(PROGRAM_UUID, { circuit }) as { outcomes: Record<string, string> }
  const shares = Object.values(r.outcomes)
  if (!shares.length || !shares.every((s) => s === '1/' + shares.length)) return []
  return [...Array(2 ** n).keys()].map((i) => (r.outcomes[i.toString(2).padStart(n, '0')] ? 1 : 0))
}

const DEFS = `/-- a Gaussian integer re + im·i: an exact amplitude, never a float -/
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

/-- the program this wing speaks of: ${DOOR} at the address ${PROGRAM_UUID} -/
def quantumProgram : Uuid := ⟨${leanList(nibbles(PROGRAM_UUID))}⟩

/-- the circuits that program runs, in exact amplitudes: Bell (H then CNOT) and GHZ(3) -/
def bell : Vec := ap 4 CNOT (ap 4 (kron 2 H idm) (basis 0))
def ghz : Vec := ap 8 (kron 4 idm CNOT) (ap 8 (kron 2 CNOT idm) (ap 8 (kron 4 H idm) (basis 0)))`

const programHex = nibbles(PROGRAM_UUID).slice(8, 16)

const FACTS = [
  { key: 'uuidprog_address', why: `the program's UUID is a valid 32-digit address whose program field is ${DOOR}'s derived 8-hex program`,
    js: () => callOfUuid(PROGRAM_UUID).door === DOOR && nibbles(PROGRAM_UUID).length === 32,
    lean: `theorem uuidprog_address : quantumProgram.valid = true ∧ quantumProgram.program = ${leanList(programHex)} := by decide` },
  { key: 'uuidprog_layout', why: 'the address splits into handle · program · params · envelope and the four fields rejoin to the whole UUID',
    js: () => { const c = callOfUuid(PROGRAM_UUID); return (handleOf(PROGRAM_UUID) + c.program + c.params + c.envelope) === PROGRAM_UUID.replace(/-/g, '') },
    lean: 'theorem uuidprog_layout : quantumProgram.handle ++ quantumProgram.program ++ quantumProgram.params ++ quantumProgram.envelope = quantumProgram.hex := by decide' },
  { key: 'uuidprog_h_unitary', why: 'Hadamard is unitary up to its scale: H · H† = 2 · I',
    js: () => same(2, mm(2, H, dag(H)), smul(2, idm)),
    lean: 'theorem uuidprog_h_unitary : Same 2 (mm 2 H (dag H)) (smul 2 idm) := by decide' },
  { key: 'uuidprog_paulis_unitary', why: 'X, Z and S are unitary, and S squared is Z',
    js: () => same(2, mm(2, X, dag(X)), idm) && same(2, mm(2, Z, dag(Z)), idm) && same(2, mm(2, S, dag(S)), idm) && same(2, mm(2, S, S), Z),
    lean: 'theorem uuidprog_paulis_unitary : Same 2 (mm 2 X (dag X)) idm ∧ Same 2 (mm 2 Z (dag Z)) idm ∧ Same 2 (mm 2 S (dag S)) idm ∧ Same 2 (mm 2 S S) Z := by decide' },
  { key: 'uuidprog_cnot_swap', why: 'CNOT and SWAP are unitary and each is its own inverse',
    js: () => same(4, mm(4, CNOT, dag(CNOT)), idm) && same(4, mm(4, CNOT, CNOT), idm) && same(4, mm(4, SWAP, dag(SWAP)), idm) && same(4, mm(4, SWAP, SWAP), idm),
    lean: 'theorem uuidprog_cnot_swap : Same 4 (mm 4 CNOT (dag CNOT)) idm ∧ Same 4 (mm 4 CNOT CNOT) idm ∧ Same 4 (mm 4 SWAP (dag SWAP)) idm ∧ Same 4 (mm 4 SWAP SWAP) idm := by decide' },
  { key: 'uuidprog_toffoli', why: 'Toffoli is unitary and its own inverse',
    js: () => same(8, mm(8, TOFFOLI, dag(TOFFOLI)), idm) && same(8, mm(8, TOFFOLI, TOFFOLI), idm),
    lean: 'theorem uuidprog_toffoli : Same 8 (mm 8 TOFFOLI (dag TOFFOLI)) idm ∧ Same 8 (mm 8 TOFFOLI TOFFOLI) idm := by decide +kernel' },
  { key: 'uuidprog_tableau_h', why: 'conjugating by Hadamard swaps X and Z and negates Y — the stabilizer tableau\'s H rule (swap the x and z bits, flip the phase where both are set)',
    js: () => same(2, conj(2, H, X), smul(2, Z)) && same(2, conj(2, H, Z), smul(2, X)) && same(2, conj(2, H, Y), smul(-2, Y)),
    lean: 'theorem uuidprog_tableau_h : Same 2 (mm 2 (mm 2 H X) (dag H)) (smul 2 Z) ∧ Same 2 (mm 2 (mm 2 H Z) (dag H)) (smul 2 X) ∧ Same 2 (mm 2 (mm 2 H Y) (dag H)) (smul (-2) Y) := by decide' },
  { key: 'uuidprog_tableau_s', why: 'conjugating by S sends X to Y and Y to −X and leaves Z — the stabilizer tableau\'s S rule (z gains x, the phase flips where both are set)',
    js: () => same(2, conj(2, S, X), Y) && same(2, conj(2, S, Y), smul(-1, X)) && same(2, conj(2, S, Z), Z),
    lean: 'theorem uuidprog_tableau_s : Same 2 (mm 2 (mm 2 S X) (dag S)) Y ∧ Same 2 (mm 2 (mm 2 S Y) (dag S)) (smul (-1) X) ∧ Same 2 (mm 2 (mm 2 S Z) (dag S)) Z := by decide' },
  { key: 'uuidprog_tableau_cnot', why: 'conjugating by CNOT copies X from control to target and Z from target to control — the stabilizer tableau\'s CNOT rule (x of the target gains x of the control, z of the control gains z of the target)',
    js: () => same(4, conj(4, CNOT, kron(2, X, idm)), kron(2, X, X)) && same(4, conj(4, CNOT, kron(2, idm, X)), kron(2, idm, X))
      && same(4, conj(4, CNOT, kron(2, Z, idm)), kron(2, Z, idm)) && same(4, conj(4, CNOT, kron(2, idm, Z)), kron(2, Z, Z)),
    lean: 'theorem uuidprog_tableau_cnot : Same 4 (mm 4 (mm 4 CNOT (kron 2 X idm)) (dag CNOT)) (kron 2 X X) ∧ Same 4 (mm 4 (mm 4 CNOT (kron 2 idm X)) (dag CNOT)) (kron 2 idm X) ∧ Same 4 (mm 4 (mm 4 CNOT (kron 2 Z idm)) (dag CNOT)) (kron 2 Z idm) ∧ Same 4 (mm 4 (mm 4 CNOT (kron 2 idm Z)) (dag CNOT)) (kron 2 Z Z) := by decide +kernel' },
  { key: 'uuidprog_bell_runs', why: `the program at ${PROGRAM_UUID}, run on the Bell circuit, puts weight on exactly 00 and 11, in equal shares — the weights its door serves`,
    js: () => served('bell', 2).join() === '1,0,0,1',
    lean: 'theorem uuidprog_bell_runs : (List.range 4).map (fun r => (bell r).normSq) = [1, 0, 0, 1] := by decide' },
  { key: 'uuidprog_ghz_runs', why: `the program at ${PROGRAM_UUID}, run on the GHZ circuit, puts weight on exactly 000 and 111, in equal shares — the weights its door serves`,
    js: () => served('ghz', 3).join() === '1,0,0,0,0,0,0,1',
    lean: 'theorem uuidprog_ghz_runs : (List.range 8).map (fun r => (ghz r).normSq) = [1, 0, 0, 0, 0, 0, 0, 1] := by decide +kernel' },
]

emit({ file: 'UuidProgram.lean', skill: 'quantum', defs: DEFS,
  header: `UUID QUANTUM PROGRAMS — a UUID register and the program it names, with exact quantum semantics: every theorem states what the program at ${PROGRAM_UUID} (${DOOR}) computes, and its JS mirror calls that program by its UUID`,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
