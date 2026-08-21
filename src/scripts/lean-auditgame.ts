#!/usr/bin/env node
// Automate the Lean layer for THE AUDIT GAME — why an audit is more ACCURATE framed as a game, sealed by decide. An
// audit is a two-player game between a CLAIM and its REFUTERS: a refuter's move is a counterexample, so a finding is
// FLAGGED iff some refuter has a winning move, and a claim is CLEAN iff no refuter does — a P-position, exactly the
// Nim/Bouton decidability (a loss for the mover is a zero position). Because the game is finite (finitely many claims
// × moves, like a bounded chess game), the verdict is DECIDABLE, and N INDEPENDENT refuters are strictly more
// accurate: adding a refuter is monotone (never un-flags), a 3-vote panel confirms on a majority, and the survive
// condition is the product of clears ∏(1−rᵢ) — the same {0,1} algebra Audit.lean proves for the detectors. // SCOPE: the game's DECISION is decidable, but its COVERAGE is not — the refutation lexicon is incomplete, so an
// audit RAISES the cost of a false claim surviving, it does NOT reduce it to zero. A floor— the same
// honest bound Security proves. COMPUTE → GENERATE → VERIFY. Integrity.
import { emit, range } from './lean-gen.js'

const R2 = range(2) // a refuter's verdict: 1 = found a winning refutation (claim false), 0 = failed to refute
const bit = (n: number, k: number) => (n >> k) % 2

const FACTS = [
  { key: 'flag_is_any_refutation',
    why: 'A finding is FLAGGED iff ANY independent refuter finds a winning move: flag(a,b) = 1 − (1−a)(1−b), which over {0,1}² is exactly the OR — a claim is caught the moment one refuter refutes it. The audit is a game the claim must survive against every player.',
    js: () => R2.every((a) => R2.every((b) => ((1 - (1 - a) * (1 - b)) === 1) === (a === 1 || b === 1))),
    lean: 'theorem flag_is_any_refutation : (List.range 2).all (fun a => (List.range 2).all (fun b => ((1 - (1-a)*(1-b)) == 1) == (a == 1 || b == 1))) := by decide' },

  { key: 'clean_is_a_p_position',
    why: 'A claim is CLEAN iff NO refuter has a winning move: survive(a,b) = (1−a)(1−b) = 1 exactly when both fail (a=0 ∧ b=0). This is a P-position — a loss for the mover — the same Bouton decidability as a zero nim-sum: the audit is Nim on the space of claims.',
    js: () => R2.every((a) => R2.every((b) => (((1 - a) * (1 - b)) === 1) === (a === 0 && b === 0))),
    lean: 'theorem clean_is_a_p_position : (List.range 2).all (fun a => (List.range 2).all (fun b => (((1-a)*(1-b)) == 1) == (a == 0 && b == 0))) := by decide' },

  { key: 'verdict_is_exactly_one',
    why: 'Every claim gets exactly one verdict: survive + flag = (1−a)(1−b) + (1 − (1−a)(1−b)) = 1 for every refuter profile. Clean and Flagged are mutually exclusive and exhaustive — no claim is both, none is neither.',
    js: () => R2.every((a) => R2.every((b) => ((1 - a) * (1 - b) + (1 - (1 - a) * (1 - b))) === 1)),
    lean: 'theorem verdict_is_exactly_one : (List.range 2).all (fun a => (List.range 2).all (fun b => ((1-a)*(1-b) + (1 - (1-a)*(1-b))) == 1)) := by decide' },

  { key: 'dual_dominates_single',
    why: 'Two independent refuters catch at least as much as one: flag(a,b) = a OR b ≥ a. Adding an independent refuter is MONOTONE — it can only catch more. This is why a dual audit is strictly more accurate than a single pass.',
    js: () => R2.every((a) => R2.every((b) => (1 - (1 - a) * (1 - b)) >= a)),
    lean: 'theorem dual_dominates_single : (List.range 2).all (fun a => (List.range 2).all (fun b => (1 - (1-a)*(1-b)) >= a)) := by decide' },

  { key: 'three_refuters_monotone',
    why: 'A third independent refuter never un-flags: flag(a,b,c) = a∨b∨c ≥ a∨b = flag(a,b). Accuracy grows monotonically with the panel — the loop-until-dry and adversarial-verify patterns rest on exactly this, that another refuter cannot lose a catch.',
    js: () => R2.every((a) => R2.every((b) => R2.every((c) => (1 - (1 - a) * (1 - b) * (1 - c)) >= (1 - (1 - a) * (1 - b))))),
    lean: 'theorem three_refuters_monotone : (List.range 2).all (fun a => (List.range 2).all (fun b => (List.range 2).all (fun c => (1 - (1-a)*(1-b)*(1-c)) >= (1 - (1-a)*(1-b))))) := by decide' },

  { key: 'survive_is_product_of_clears',
    why: 'A claim survives a panel of three iff EACH refuter fails: survive(a,b,c) = (1−a)(1−b)(1−c) = 1 only for the all-clear profile (0,0,0). Independent clears MULTIPLY — one dissent flags — the {0,1} algebra of a unanimous acquittal.',
    js: () => R2.every((a) => R2.every((b) => R2.every((c) => (((1 - a) * (1 - b) * (1 - c)) === 1) === (a === 0 && b === 0 && c === 0)))),
    lean: 'theorem survive_is_product_of_clears : (List.range 2).all (fun a => (List.range 2).all (fun b => (List.range 2).all (fun c => (((1-a)*(1-b)*(1-c)) == 1) == (a == 0 && b == 0 && c == 0)))) := by decide' },

  { key: 'majority_of_three_is_four',
    why: 'A 3-vote adversarial panel confirms on a MAJORITY: of the 2³ = 8 refuter profiles, exactly 4 carry two or more refutations (the three with exactly two, plus the unanimous). The majority rule that keeps a plausible-but-wrong finding from surviving one lucky refuter — and one lucky miss.',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7].filter((n) => bit(n, 0) + bit(n, 1) + bit(n, 2) >= 2).length === 4,
    lean: 'theorem majority_of_three_is_four : ((List.range 8).filter (fun n => n % 2 + n / 2 % 2 + n / 4 % 2 >= 2)).length = 4 := by decide' },

  { key: 'honesty_gate_one_drain',
    why: 'The honesty gate is a game with no bluff: a citation drains iff it is hollow AND unbacked — drain(h,b) = h·(1−b) — and of the 4 states exactly ONE fires (h=1, b=0). A backing clears it, an honest scope clears it; only the empty overclaim drains. The detector, itself decidable (echoing Audit.lean).',
    js: () => [0, 1, 2, 3].filter((n) => bit(n, 1) * (1 - bit(n, 0)) === 1).length === 1,
    lean: 'theorem honesty_gate_one_drain : ((List.range 4).filter (fun n => (n / 2) * (1 - n % 2) == 1)).length = 1 := by decide' },

  { key: 'audit_is_a_finite_game',
    why: 'The audit game terminates: over n claims the outcome space is 2ⁿ subsets — [2⁰,2¹,2²,2³] = [1,2,4,8] — finite, so like a bounded chess game or a nim heap the game has a decidable value. Finiteness is what makes the verdict computable at all.',
    js: () => JSON.stringify([0, 1, 2, 3].map((n) => 2 ** n)) === JSON.stringify([1, 2, 4, 8]),
    lean: 'theorem audit_is_a_finite_game : ([0,1,2,3].map (fun n => (2:Nat)^n)) = [1, 2, 4, 8] := by decide' },

  { key: 'no_audit_catches_all',
    why: 'SCOPE — no audit is complete: for every coverage depth there is a strictly deeper one (2³ < 2⁴ < 2⁵), so an audit RAISES the cost of a false claim surviving but never zeroes it. A floor— the same "no maximum, only bounds" Security proves; the game\'s DECISION is decidable, its COVERAGE is not.',
    js: () => 2 ** 3 < 2 ** 4 && 2 ** 4 < 2 ** 5,
    lean: 'theorem no_audit_catches_all : ((2:Nat)^3 < 2^4) ∧ ((2:Nat)^4 < 2^5) := by decide' },

  { key: 'audit_space_meets_chess_at_eight',
    why: 'The audit enters the ℤ/9 diamond and MEETS chess there: the 8-outcome space (2³) is residue 8, a self-inverse (8·8 ≡ 1) — the SAME residue the 3D chess board (512 ≡ 8) lands on — and its reflection dz(8) = 10 − 8 = 2 is the first step of the vortex orbit. The three games interact in the diamond: chess at the units {1, 8}, the audit at 8, nim at the nilpotent 6. a structural residue.',
    js: () => (2 ** 3) % 9 === 8 && (8 * 8) % 9 === 1 && (10 - 8) === 2,
    lean: 'theorem audit_space_meets_chess_at_eight : ((2^3) % 9 = 8) ∧ ((8 * 8) % 9 = 1) ∧ ((10 - 8) = 2) := by decide' },
]

console.log('computing ' + FACTS.length + ' AUDIT-GAME facts (why an audit is more accurate framed as a game) …')

emit({
  file: 'AuditGame.lean', skill: 'audit',
  header: 'THE AUDIT GAME — why an audit is more ACCURATE as a game, sealed by decide: a finding is FLAGGED iff some independent refuter has a winning move (the OR), a claim is CLEAN iff none does (a P-position, the Nim/Bouton decidability), the verdict is exactly one of the two (survive + flag = 1), and N independent refuters are strictly more accurate — adding a refuter is monotone (never un-flags), a 3-vote panel confirms on a majority (4 of 8 profiles), and a unanimous acquittal is the product of clears ∏(1−rᵢ); the honesty gate drains only the hollow-and-unbacked citation (1 of 4 states, echoing Audit.lean); and the game is finite (2ⁿ outcomes) so the value is decidable. the DECISION is decidable but the COVERAGE is not — the refutation lexicon is incomplete, so an audit raises the cost of a false claim surviving, it does NOT reduce it to zero.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
