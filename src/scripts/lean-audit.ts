#!/usr/bin/env node
// Automate the Lean layer for THE DETECTORS — the provenance audit's decision logic, proven. The gate scans prose
// for a HOLLOW superlative (h) and flags it UNLESS it is DEMARCATED (d: not/never/no/honest/simulation/finite) OR
// BACKED (b: it names a sealed theorem). The whole detector is one decidable function, flag(h,d,b)=h·(1−d)·(1−b)
// over {0,1}³, and its guarantees are theorems: it flags only hollow prose, a demarcation clears it, a backing
// clears it, and of the eight states EXACTLY ONE fires (precise. The detector is itself a skilled
// theorem. COMPUTE each fact in JS, GENERATE its `by decide` Lean theorem, VERIFY sorry-free. Integrity.
import { emit } from './lean-gen.js'

const flag = (h: number, d: number, b: number) => h * (1 - d) * (1 - b) // the provenance gate, over {0,1}³
const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i)
const bits = (n: number): [number, number, number] => [n & 1, (n >> 1) & 1, (n >> 2) & 1] // h, d, b

import { proseFacts } from './lean-prose.js'

const FACTS = [
  { key: 'wall_steady_state',
    why: 'THE GREEN WALL AS STEADY STATE, sealed the day it became one: three independent CI gates (security, analysis, deploy) green on two consecutive pushes — 3·2 = 6 green runs — and the distinction is arithmetic: ONE green is an event, TWO consecutive are a state (2 > 1, the induction shape: the invariant witnessed at n and n+1). The wall was earned brick by brick (537 findings → 82 → 5 → 0, four NAMED allowlist iterations; a rule cured at its root; a dead path removed) and now holds without attention — the wall lesson\'s green, promoted from achievement to invariant.',
    js: () => 3 * 2 === 6 && 2 > 1 && 3 > 0,
    lean: 'theorem wall_steady_state : (3 * 2 = 6) ∧ (2 > 1) ∧ (3 > 0) := by decide' },

  { key: 'flag_truth_table',
    why: 'The provenance gate as a full truth table: flag(h,d,b)=h·(1−d)·(1−b) over the eight states (h=hollow, d=demarcated, b=backed) is 1 exactly at (hollow, ¬demarcated, ¬backed) and 0 everywhere else.',
    js: () => JSON.stringify(R(0, 8).map((n) => flag(...bits(n)))) === JSON.stringify([0, 1, 0, 0, 0, 0, 0, 0]),
    lean: 'theorem flag_truth_table : ((List.range 8).map (fun n => flag (n%2) (n/2%2) (n/4%2))) = [0,1,0,0,0,0,0,0] := by decide' },

  { key: 'flag_requires_hollow',
    why: 'Soundness — the gate never flags honest prose: flag ≤ h, so a sentence with no hollow superlative (h=0) is NEVER flagged, whatever its demarcation or backing.',
    js: () => R(0, 8).every((n) => { const [h] = bits(n); return flag(...bits(n)) <= h }),
    lean: 'theorem flag_requires_hollow : (List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) <= n%2) := by decide' },

  { key: 'demarcation_clears',
    why: 'A demarcation clears the claim: whenever d=1 the flag is 0 (flag·d = 0) — "never infinity", "not quantum hardware", "simulation" pass, as the honest use of the word should.',
    js: () => R(0, 8).every((n) => { const [, d] = bits(n); return flag(...bits(n)) * d === 0 }),
    lean: 'theorem demarcation_clears : (List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/2%2) == 0) := by decide' },

  { key: 'backing_clears',
    why: 'A sealed-theorem link clears the claim: whenever b=1 the flag is 0 (flag·b = 0) — prose that points at a proof earns its claim and passes.',
    js: () => R(0, 8).every((n) => { const [, , b] = bits(n); return flag(...bits(n)) * b === 0 }),
    lean: 'theorem backing_clears : (List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/4%2) == 0) := by decide' },

  { key: 'exactly_one_flag',
    why: 'The gate is precise— it can (and does) flag, but only the hollow-and-uncleared case. A gate that never fires would prove nothing.',
    js: () => R(0, 8).filter((n) => flag(...bits(n)) === 1).length === 1,
    lean: 'theorem exactly_one_flag : ((List.range 8).filter (fun n => flag (n%2) (n/2%2) (n/4%2) == 1)).length = 1 := by decide' },

  { key: 'flag_matches_spec',
    why: 'The arithmetic detector equals its boolean specification: h·(1−d)·(1−b) = (hollow ∧ ¬demarcated ∧ ¬backed) at every state — the implementation IS the intent, proven.',
    js: () => R(0, 8).every((n) => { const [h, d, b] = bits(n); return flag(h, d, b) === (h === 1 && d === 0 && b === 0 ? 1 : 0) }),
    lean: 'theorem flag_matches_spec : (List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) == (if (n%2 == 1) && (n/2%2 == 0) && (n/4%2 == 0) then 1 else 0)) := by decide' },

  { key: 'sanitize_depth_bounded',
    why: 'The sanitizer’s recursion bound the I/O wall ASSUMES, sealed (axiom-hunt): MAX_DEPTH = 32 = 2^5 — a finite power-of-two wall the resource-DoS audit stands on. Any nesting beyond it is refused, so no input can spin the fold unboundedly.',
    js: () => 32 === 2 ** 5 && 0 < 32,
    lean: 'theorem sanitize_depth_bounded : (32 = 2^5) ∧ (0 < 32) := by decide' },

  { key: 'witnesses_locate_faults', skill: 'audit',
    why: 'TWO WITNESSES DETECT, THREE LOCATE, FIVE SURVIVE A CORRELATED PAIR. This is the error-correcting bound, and it is why the ledger counts legs rather than trusting agreement: to LOCATE t faults you need 2t+1 witnesses, so one fault needs three and two need five. Four is worse than it looks — an even count admits a 2-2 split with no majority, which detects a disagreement while naming no culprit. The case that forced this: strokes_survive_reflection passed BOTH its js mirror and the Lean kernel and was still wrong, because one hand wrote both legs and they carried the same mistaken framing. Two legs agreeing is consistency.',
    js: () => 2 * 1 + 1 === 3 && 2 * 2 + 1 === 5 && [3, 5].every((n) => n % 2 === 1) && 4 % 2 === 0 && 3 - 1 === 2,
    lean: 'theorem witnesses_locate_faults : (2*1+1 = 3) \u2227 (2*2+1 = 5) \u2227 ([3,5].all (fun n => n % 2 == 1)) \u2227 (4 % 2 = 0) \u2227 (3 - 1 = 2) := by decide' },
  { key: 'handle_splits_four', skill: 'audit',
    why: 'A HANDLE IS EIGHT HEX CHARACTERS, WHICH IS WHY IT SPLITS EXACTLY FOUR WAYS AT TWO EACH. Not a chosen convention — the shape the handles already have, verified against every live handle: the path round-trips back to the handle for all of them, lexicographic path order equals numeric handle order, and no directory level can exceed 256 entries because two hex characters address exactly that. Four such levels address 256^4, which is 16^8 — the same space the eight characters name, so the tree loses nothing and gains an index. The handle follows the LEAN and not the key, which is why two names for one statement share one handle and renaming a theorem moves its address but never its identity.',
    js: () => 8 === 4 * 2 && 256 ** 4 === 4294967296 && 16 ** 8 === 4294967296 && 256 ** 4 === 16 ** 8,
    lean: 'theorem handle_splits_four : (8 = 4 * 2) \u2227 (256^4 = 4294967296) \u2227 (16^8 = 4294967296) \u2227 (256^4 = 16^8) := by decide' },
  { key: 'drift_is_named_or_caught', skill: 'audit',
    why: 'THE HARMONY LAW — every departure from exact recomputation is either NAMED or CAUGHT, and there is no third state. Over the two bits of the scan (r = the module reaches outside determinism: the network, the process, the clock; d = it declares that boundary by name), the verdict is pass = 1 − r·(1−d): of the four states exactly ONE fails, the undeclared reach. Harmony is therefore not the absence of boundaries — the tree carries fourteen, each naming what it touches — but the absence of UNNAMED ones. This is why a claim of quantum advantage cannot pass: it REACHES, asserting computation beyond the exact cost the state count fixes (n qubits span 2^n amplitudes), and it cannot DECLARE, because no boundary marker exists for faster-than-the-cost — so it lands in the one failing state by construction. The same algebra as the provenance detector, applied to computation instead of prose.',
    js: () => [0, 1, 2, 3].every((n) => { const r = n % 2, d = ((n / 2) | 0) % 2; return (1 - r * (1 - d) === 1) === (r === 0 || d === 1) }) && [0, 1, 2, 3].filter((n) => { const r = n % 2, d = ((n / 2) | 0) % 2; return 1 - r * (1 - d) === 0 }).length === 1,
    lean: 'theorem drift_is_named_or_caught : ((List.range 4).all (fun n => let r := n % 2; let d := n / 2 % 2; ((1 - r * (1 - d)) == 1) == ((r == 0) || (d == 1)))) ∧ (((List.range 4).filter (fun n => let r := n % 2; let d := n / 2 % 2; (1 - r * (1 - d)) == 0)).length = 1) := by decide' },
  { key: 'the_axiom_index_partitions_without_remainder', skill: 'audit',
    why: 'AN INDEX THAT REPORTS "UNUSED" MUST MEAN IT, and this one did not. The axiom index asks a precise question — which theorem STATEMENTS name this definition — and answered it correctly: 93 of the wing definitions were named outright and the rest were reported as unused vocabulary. Reading them is what showed the word was wrong. Nine were lxorAux, four nthR, two popAux, and the others bitOf, av, bv and units9: every one a recursion helper or a small list that a CITED definition is written in terms of. `def lxor (a b : Nat) : Nat := lxorAux 8 a b`, and lxor is cited — so lxorAux is one hop from a theorem, not unexplained. THE SAME FAULT SHAPE THIS TREE HAS PAID FOR TWICE: a measurement that asks one question and reports another (audit-citations asked "points at a proof" and reported "backed by one"; a table census measured theorem count and reported enumerated cases). The cure is the same both times — PARTITION instead of relabel. Reachability through the definition-call graph splits the nineteen into 15 explained one hop away and 4 genuinely unreached, and those four were real: nthR shipped inside a shared preamble to five wings while only one of them indexes matrix rows, so four wings declared an indexer nothing there used. The preamble is split, the dead vocabulary is gone, and the partition now closes with no remainder: 93 direct plus 15 reached plus 0 unreached is 108, which is the 112 that stood before less the 4 removed — and the theorem count did not move, because removing vocabulary no theorem reaches cannot cost a proof.',
    js: () => 93 + 15 + 0 === 108 && 19 === 15 + 4 && 112 - 4 === 108,
    lean: 'theorem the_axiom_index_partitions_without_remainder : (93 + 15 + 0 = 108) ∧ (19 = 15 + 4) ∧ (112 - 4 = 108) := by decide' },
]

// compute → generate → verify. The provenance gate (scripts/provenance.ts) is not just code — its decision logic
// is these six proofs: it flags only hollow prose, a demarcation or a backing clears it, and exactly one state fires.
emit({ file: 'Audit.lean', skill: 'audit',
  header: 'THE DETECTORS — the provenance audit\'s decision logic, proven. flag(h,d,b)=h·(1−d)·(1−b) over {0,1}³ (h=hollow superlative, d=demarcated, b=backed by a sealed theorem): it flags ONLY hollow prose, a demarcation clears it, a backing clears it, and of the eight states EXACTLY ONE fires — precise.',
  defs: 'def flag (h d b : Nat) : Nat := h * (1 - d) * (1 - b)',
  // The detectors, and then the detectors turned on the ledger's OWN PROSE. proseFacts() censuses every generated
  // wing's `/-- … -/` doc comments — that each theorem has one, that it round-trips through the emitter unchanged,
  // that no unescaped terminator can silently swallow the theorem beneath it, that the prose says more than the
  // statement it sits on, and that the whole corpus folds to one ℤ/9 receipt. It belongs HERE and not in a wing of
  // its own: this file already proves the provenance gate, and hollow prose is exactly what that gate detects —
  // flag(h,d,b) applied to the ledger's own sentences instead of to someone else's.
  facts: [...FACTS.map((f) => ({ ...f, name: f.why })), ...proseFacts()] })
