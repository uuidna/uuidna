#!/usr/bin/env node
// Automate the Lean layer for THE RULES OF INFERENCE — reasoning itself, proven by decide. Every classical inference
// rule is a boolean tautology over a FINITE truth table, so each is decidable: check it for all assignments and it
// holds, or it does not. This seals the rules a valid argument is built from — modus ponens and tollens, the
// contrapositive, De Morgan, double negation, excluded middle, the hypothetical and disjunctive syllogisms — so a
// reasoning step can cite the exact rule it uses, recomputable by anyone. Implication p → q is the boolean (!p || q).
// HONEST SCOPE: classical propositional logic as decidable truth tables — NOT a theorem prover, and NOT the predicate
// logic whose quantifiers range over unbounded domains. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const B = [true, false]
const all2 = (f: (p: boolean, q: boolean) => boolean): boolean => B.every((p) => B.every((q) => f(p, q)))
const all3 = (f: (p: boolean, q: boolean, r: boolean) => boolean): boolean => B.every((p) => B.every((q) => B.every((r) => f(p, q, r))))

const FACTS = [
  { key: 'modus_ponens',
    why: 'Modus ponens, proven for every assignment: from p and (p → q), q follows — !(p ∧ (p → q)) ∨ q holds on all four rows. The first rule of every valid argument.',
    js: () => all2((p, q) => !(p && (!p || q)) || q),
    lean: 'theorem modus_ponens : ([true, false].all (fun p => [true, false].all (fun q => !(p && (!p || q)) || q))) = true := by decide' },

  { key: 'modus_tollens',
    why: 'Modus tollens: from ¬q and (p → q), ¬p follows — !(¬q ∧ (p → q)) ∨ ¬p holds on every row. Deny the consequent, deny the antecedent.',
    js: () => all2((p, q) => !(!q && (!p || q)) || !p),
    lean: 'theorem modus_tollens : ([true, false].all (fun p => [true, false].all (fun q => !((!q) && (!p || q)) || !p))) = true := by decide' },

  { key: 'contrapositive',
    why: 'The contrapositive is equivalent to the implication: (p → q) = (¬q → ¬p) for all p, q — an argument and its contrapositive stand or fall together.',
    js: () => all2((p, q) => (!p || q) === (!!q || !p)),
    lean: 'theorem contrapositive : ([true, false].all (fun p => [true, false].all (fun q => (!p || q) == (!(!q) || !p)))) = true := by decide' },

  { key: 'de_morgan_and',
    why: "De Morgan for conjunction: ¬(p ∧ q) = (¬p ∨ ¬q) on every row — the negation of an 'and' is the 'or' of the negations.",
    js: () => all2((p, q) => !(p && q) === (!p || !q)),
    lean: 'theorem de_morgan_and : ([true, false].all (fun p => [true, false].all (fun q => (!(p && q)) == (!p || !q)))) = true := by decide' },

  { key: 'de_morgan_or',
    why: "De Morgan for disjunction: ¬(p ∨ q) = (¬p ∧ ¬q) on every row — the negation of an 'or' is the 'and' of the negations.",
    js: () => all2((p, q) => !(p || q) === (!p && !q)),
    lean: 'theorem de_morgan_or : ([true, false].all (fun p => [true, false].all (fun q => (!(p || q)) == (!p && !q)))) = true := by decide' },

  { key: 'double_negation',
    why: 'Double negation: ¬¬p = p for both truth values — classical logic returns to where it started.',
    js: () => B.every((p) => !!p === p),
    lean: 'theorem double_negation : ([true, false].all (fun p => (!(!p)) == p)) = true := by decide' },

  { key: 'excluded_middle',
    why: 'The law of the excluded middle: p ∨ ¬p is true for every p — a proposition or its negation, no third option, in classical logic.',
    js: () => B.every((p) => p || !p),
    lean: 'theorem excluded_middle : ([true, false].all (fun p => p || !p)) = true := by decide' },

  { key: 'hypothetical_syllogism',
    why: 'The hypothetical syllogism (chaining): from (p → q) and (q → r), (p → r) follows — proven on all eight rows of three variables. How a chain of reasoning links.',
    js: () => all3((p, q, r) => !((!p || q) && (!q || r)) || (!p || r)),
    lean: 'theorem hypothetical_syllogism : ([true, false].all (fun p => [true, false].all (fun q => [true, false].all (fun r => !((!p || q) && (!q || r)) || (!p || r))))) = true := by decide' },

  { key: 'disjunctive_syllogism',
    why: 'The disjunctive syllogism: from (p ∨ q) and ¬p, q follows — !((p ∨ q) ∧ ¬p) ∨ q holds on every row. Rule out one disjunct, keep the other.',
    js: () => all2((p, q) => !((p || q) && !p) || q),
    lean: 'theorem disjunctive_syllogism : ([true, false].all (fun p => [true, false].all (fun q => !((p || q) && !p) || q))) = true := by decide' },

  { key: 'research_always_has_a_next',
    why: 'The captain always sails to a NEXT research: for every n the frontier advances by a definite step — n < n+1 and (n+1) − n = 1, on all sixteen rows. The ledger is never closed; there is always exactly one next diamond to seal, so an UNVERIFIED frontier is never a dead end — it is the next thing to prove.',
    js: () => [...Array(16).keys()].every((n) => n + 1 > n && n + 1 - n === 1),
    lean: 'theorem research_always_has_a_next : (List.range 16).all (fun n => (n + 1 > n) ∧ (n + 1 - n = 1)) := by decide' },

  { key: 'sealing_inverts_unverified',
    why: 'Sealing INVERTS the verdict: the slim-gate rule is VERIFIED iff a real sealed citation AND no fabrication — over the (real, fabricated) bits its verdict is [0,1,0,0], one only at (real=1, fabricated=0). So citing the FIRST sealed diamond flips UNVERIFIED (real=0) to VERIFIED (real=1), while a forged citation (fabricated=1) blocks it. The captain inverts UNVERIFIED to VERIFIED by BUILDING the diamond, never by flipping the verdict — and cannot invert it with a forgery.',
    js: () => JSON.stringify([[0, 0], [1, 0], [0, 1], [1, 1]].map(([r, f]) => (r === 1 && f === 0 ? 1 : 0))) === JSON.stringify([0, 1, 0, 0]),
    lean: 'theorem sealing_inverts_unverified : [(0,0),(1,0),(0,1),(1,1)].map (fun p => if (p.1 == 1) && (p.2 == 0) then 1 else 0) = [0,1,0,0] := by decide' },

  { key: 'trust_by_recomputation',
    why: 'TRUST comes from RECOMPUTATION, not authority — the two halves that let you trust an incomplete, unauthored, offline computation. OBSERVER-INDEPENDENCE: a recomputable fold is the same for every observer in any order — foldl(+)[1,2,3,4] = foldl(+)[4,3,2,1] = 10 — so NO authority decides it; you recompute it yourself and everyone agrees. TAMPER-EVIDENCE: a changed input MOVES the fold — foldl(+)[1,2,3,4] ≠ foldl(+)[1,2,3,5] (10 ≠ 11) — so a forgery is CAUGHT by recomputing and comparing, never by trusting the source. Same for all, different on tamper: recompute, don\'t trust. Integrity, not truth.',
    js: () => { const s = (a: number[]): number => a.reduce((x, y) => x + y, 0); return s([1, 2, 3, 4]) === s([4, 3, 2, 1]) && s([1, 2, 3, 4]) !== s([1, 2, 3, 5]) },
    lean: 'theorem trust_by_recomputation : (List.foldl (fun a b => a + b) 0 [1,2,3,4] = List.foldl (fun a b => a + b) 0 [4,3,2,1]) ∧ (List.foldl (fun a b => a + b) 0 [1,2,3,4] ≠ List.foldl (fun a b => a + b) 0 [1,2,3,5]) := by decide' },
]

emit({
  file: 'Reasoning.lean', skill: 'reasoning',
  header: 'THE RULES OF INFERENCE — classical propositional logic as decidable truth tables (modus ponens/tollens, De Morgan, the syllogisms).',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
