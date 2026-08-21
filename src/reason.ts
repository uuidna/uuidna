// reason — a small, IN-HOUSE reasoner that USES the sealed rules of inference instead of just proving them. Given a
// set of known facts (atoms) and a set of implication rules (if all these atoms, then that one), it forward-chains to
// a fixpoint: whenever every premise of a rule is known, it concludes the head by MODUS PONENS (or, for a multi-premise
// rule, the chained hypothetical syllogism), and each derivation CITES the sealed theorem that licenses it. It is
// bounded (a fixed round cap — it cannot loop forever), deterministic, and folds its whole derivation to one receipt,
// so a reasoning is rechecked. HONEST SCOPE: bounded propositional forward-chaining over the rules you
// give it (Horn clauses) — NOT a general theorem prover; it derives only what those rules entail
// from those facts, each step backed by a rule uuidna already proved by decide. Integrity.
import { toUuid, merkleFold } from './address.js'

/** An implication rule: if every atom in `if` is known, then `then` follows. */
export interface Rule { if: string[]; then: string }

/** One derivation step — what was concluded, from which premises, by which sealed rule. */
export interface Derivation { conclude: string; from: string[]; rule: string; cites: string }

export interface Reasoning {
  given: string[]
  derived: string[]        // atoms newly concluded (not in `given`)
  trace: Derivation[]      // the ordered derivation, each step citing its sealed inference rule
  rounds: number           // forward-chaining passes to reach the fixpoint (bounded)
  reachedFixpoint: boolean // true if it settled before the round cap
  receipt: string          // the whole derivation folded, order-invariant — recompute it or it was altered
  honest: string
}

const ROUND_CAP = 64 // bounded: the reasoner cannot loop forever, even on a pathological rule set

/** reason(facts, rules) → forward-chain the rules over the facts to a fixpoint, citing a sealed inference rule at
 *  every step. Deterministic and recomputable: same facts + rules → same derivation → same receipt. */
export function reason(facts: readonly string[], rules: readonly Rule[]): Reasoning {
  const known = new Set(facts)
  const trace: Derivation[] = []
  let rounds = 0
  let changed = true
  while (changed && rounds < ROUND_CAP) {
    changed = false
    rounds++
    for (const r of rules) {
      if (r.if.length > 0 && r.if.every((a) => known.has(a)) && !known.has(r.then)) {
        known.add(r.then)
        // one premise → modus ponens; several chained premises → the hypothetical syllogism. Both are sealed.
        const rule = r.if.length === 1 ? 'modus_ponens' : 'hypothetical_syllogism'
        trace.push({ conclude: r.then, from: [...r.if], rule, cites: `/theorem/${rule}` })
        changed = true
      }
    }
  }
  const derived = [...known].filter((a) => !facts.includes(a))
  const reachedFixpoint = !changed
  const receipt = merkleFold([
    toUuid('given:' + [...facts].sort().join(',')),
    ...trace.map((t) => toUuid(t.from.slice().sort().join('&') + '→' + t.conclude + '|' + t.rule)),
  ])
  return {
    given: [...facts],
    derived,
    trace,
    rounds,
    reachedFixpoint,
    receipt,
    honest:
      'Bounded propositional forward-chaining over the rules given: each conclusion follows by a sealed inference rule ' +
      '(modus ponens, or the hypothetical syllogism for a chain), cited on the step. It is deterministic and folds to ' +
      'one receipt anyone rechecks. It derives only what these rules entail from these facts — NOT a general theorem ' +
      'prover, and it never claims a conclusion is TRUE, only that it FOLLOWS from what it was given. Integrity.',
  }
}
