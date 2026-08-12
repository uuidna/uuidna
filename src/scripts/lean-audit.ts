#!/usr/bin/env node
// Automate the Lean layer for THE DETECTORS — the provenance audit's decision logic, proven. The gate scans prose
// for a HOLLOW superlative (h) and flags it UNLESS it is DEMARCATED (d: not/never/no/honest/simulation/finite) OR
// BACKED (b: it names a sealed theorem). The whole detector is one decidable function, flag(h,d,b)=h·(1−d)·(1−b)
// over {0,1}³, and its guarantees are theorems: it flags only hollow prose, a demarcation clears it, a backing
// clears it, and of the eight states EXACTLY ONE fires (precise, never vacuous). The detector is itself a skilled
// theorem. COMPUTE each fact in JS, GENERATE its `by decide` Lean theorem, VERIFY sorry-free. Integrity, not truth.
import { emit } from './lean-gen.js'

const flag = (h: number, d: number, b: number) => h * (1 - d) * (1 - b) // the provenance gate, over {0,1}³
const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i)
const bits = (n: number): [number, number, number] => [n & 1, (n >> 1) & 1, (n >> 2) & 1] // h, d, b

const FACTS = [
  { key: 'flag_truth_table',
    why: 'The provenance gate as a full truth table: flag(h,d,b)=h·(1−d)·(1−b) over the eight states (h=hollow, d=demarcated, b=backed) is 1 exactly at (hollow, ¬demarcated, ¬backed) and 0 everywhere else.',
    js: () => JSON.stringify(R(0, 8).map((n) => flag(...bits(n)))) === JSON.stringify([0, 1, 0, 0, 0, 0, 0, 0]),
    lean: 'theorem flag_truth_table : ((List.range 8).map (fun n => flag (n%2) (n/2%2) (n/4%2))) = [0,1,0,0,0,0,0,0] := by decide' },

  { key: 'flag_requires_hollow',
    why: 'Soundness — the gate never flags honest prose: flag ≤ h, so a sentence with no hollow superlative (h=0) is NEVER flagged, whatever its demarcation or backing.',
    js: () => R(0, 8).every((n) => { const [h] = bits(n); return flag(...bits(n)) <= h }),
    lean: 'theorem flag_requires_hollow : (List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) <= n%2) := by decide' },

  { key: 'demarcation_clears',
    why: 'A demarcation clears the claim: whenever d=1 the flag is 0 (flag·d = 0) — "never infinity", "not quantum hardware", "simulation, not hardware" pass, as the honest use of the word should.',
    js: () => R(0, 8).every((n) => { const [, d] = bits(n); return flag(...bits(n)) * d === 0 }),
    lean: 'theorem demarcation_clears : (List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/2%2) == 0) := by decide' },

  { key: 'backing_clears',
    why: 'A sealed-theorem link clears the claim: whenever b=1 the flag is 0 (flag·b = 0) — prose that points at a proof earns its claim and passes.',
    js: () => R(0, 8).every((n) => { const [, , b] = bits(n); return flag(...bits(n)) * b === 0 }),
    lean: 'theorem backing_clears : (List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/4%2) == 0) := by decide' },

  { key: 'exactly_one_flag',
    why: 'The gate is precise, never vacuous: of the eight states EXACTLY ONE fires — it can (and does) flag, but only the hollow-and-uncleared case. A gate that never fires would prove nothing.',
    js: () => R(0, 8).filter((n) => flag(...bits(n)) === 1).length === 1,
    lean: 'theorem exactly_one_flag : ((List.range 8).filter (fun n => flag (n%2) (n/2%2) (n/4%2) == 1)).length = 1 := by decide' },

  { key: 'flag_matches_spec',
    why: 'The arithmetic detector equals its boolean specification: h·(1−d)·(1−b) = (hollow ∧ ¬demarcated ∧ ¬backed) at every state — the implementation IS the intent, proven.',
    js: () => R(0, 8).every((n) => { const [h, d, b] = bits(n); return flag(h, d, b) === (h === 1 && d === 0 && b === 0 ? 1 : 0) }),
    lean: 'theorem flag_matches_spec : (List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) == (if (n%2 == 1) && (n/2%2 == 0) && (n/4%2 == 0) then 1 else 0)) := by decide' },
]

// compute → generate → verify. The provenance gate (scripts/provenance.ts) is not just code — its decision logic
// is these six proofs: it flags only hollow prose, a demarcation or a backing clears it, and exactly one state fires.
emit({ file: 'Audit.lean', skill: 'audit',
  header: 'THE DETECTORS — the provenance audit\'s decision logic, proven. flag(h,d,b)=h·(1−d)·(1−b) over {0,1}³ (h=hollow superlative, d=demarcated, b=backed by a sealed theorem): it flags ONLY hollow prose, a demarcation clears it, a backing clears it, and of the eight states EXACTLY ONE fires — precise, never vacuous. The honesty detector, itself a skilled theorem.',
  defs: 'def flag (h d b : Nat) : Nat := h * (1 - d) * (1 - b)',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
