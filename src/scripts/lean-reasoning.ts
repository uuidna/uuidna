#!/usr/bin/env node
// Automate the Lean layer for THE RULES OF INFERENCE — reasoning itself, proven by decide. Every classical inference
// rule is a boolean tautology over a FINITE truth table, so each is decidable: check it for all assignments and it
// holds, or it does not. This seals the rules a valid argument is built from — modus ponens and tollens, the
// contrapositive, De Morgan, double negation, excluded middle, the hypothetical and disjunctive syllogisms — so a
// reasoning step can cite the exact rule it uses, recomputable by anyone. Implication p → q is the boolean (!p || q).
// HONEST SCOPE: classical propositional logic as decidable truth tables — NOT a theorem prover, NOT predicate logic
// with quantifiers over infinite domains. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
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
]

emit({
  file: 'Reasoning.lean',
  header: 'THE RULES OF INFERENCE — classical propositional logic as decidable truth tables (modus ponens/tollens, De Morgan, the syllogisms).',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
