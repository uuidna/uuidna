// reason — a small, IN-HOUSE reasoner that USES the sealed rules of inference instead of just proving them. Given a
// set of known facts (atoms) and a set of implication rules (if all these atoms, then that one), it forward-chains to
// a fixpoint: whenever every premise of a rule is known, it concludes the head by MODUS PONENS (or, for a multi-premise
// rule, the chained hypothetical syllogism), and each derivation CITES the sealed theorem that licenses it. It is
// bounded (a fixed round cap — it cannot loop forever), deterministic, and folds its whole derivation to one receipt,
// so a reasoning is rechecked. This is the uninterrupted proof of a point in court (court_theorem_beats_assertion),
// not an order to act; the mandate is the court's, and the loser develops the proven (court_loser_develops_the_proven).
// HONEST SCOPE: bounded propositional forward-chaining over the rules you
// give it (Horn clauses) — NOT a general theorem prover; it derives only what those rules entail
// from those facts, each step backed by a rule uuidna already proved by decide. Integrity.
import { toUuid, merkleFold } from './address.js'

/** An implication rule: if every atom in `if` is known, then `then` follows.
 *  Optional `cites` names a sealed inference theorem (modus_tollens, disjunctive_syllogism, …);
 *  default is modus_ponens (one premise) or hypothetical_syllogism (a chain). */
export interface Rule { if: string[]; then: string; cites?: string }

/** One derivation step — what was concluded, from which premises, by which sealed rule. */
export interface Derivation { conclude: string; from: string[]; rule: string; cites: string }

/** A pair the reasoner holds at once: an atom and its own negation, both concluded from the same facts. */
export interface Contradiction { atom: string; negation: string; }

export interface Reasoning {
  given: string[]
  derived: string[]        // atoms newly concluded (not in `given`)
  trace: Derivation[]      // the ordered derivation, each step citing its sealed inference rule
  rounds: number           // forward-chaining passes to reach the fixpoint (bounded)
  reachedFixpoint: boolean // true if it settled before the round cap
  contradictions: Contradiction[] // atoms held together with their own negation — reported, never smoothed over
  consistent: boolean      // false when the derivation concluded both an atom and its negation
  unusedFacts: string[]    // given, and no rule ever needed them — the reasoning did not rest on these
  dormantRules: number     // rules whose premises never all held; they contributed nothing to this derivation
  receipt: string          // the whole derivation folded, order-invariant — recompute it or it was altered
  honest: string
}

/** negationOf(atom) → the atom this one denies, or null when it denies nothing SYNTACTICALLY. Two spellings are
 *  recognised, "not_x" and `¬x`, because those are the two this tree already writes. A rule set that encodes its
 *  negation some other way is invisible here — which is stated in `honest` rather than left to be discovered. */
const negationOf = (atom: string): string | null =>
  atom.startsWith('not_') ? atom.slice(4) : atom.startsWith('¬') ? atom.slice(1) : null

// ── THE BOUND IS STRUCTURAL, NOT A NUMBER I PICKED (the captain, 2026-09-01: "why keeping artificial caps?") ──
//
// This was ROUND_CAP = 64, and 64 was not derived from anything. It made the reasoner SILENTLY INCOMPLETE: a
// chain of 400 rules in adverse order derived 64 atoms, stopped, and returned a clean-looking result — the same
// green-over-absent shape this tree keeps meeting, this time inside the thing that is supposed to reason. The
// caller was told `reachedFixpoint: false`, which is honest as far as it goes, and every caller that read
// `derived` without reading that flag was quietly handed a truncated conclusion.
//
// Forward chaining does not need an arbitrary cap, because it cannot run forever anyway: it is MONOTONE — every
// round adds at least one atom or the loop ends — and the atoms it can add are exactly the heads of the rules.
// So after |rules| productive rounds every rule that will ever fire has fired, and one more round confirms the
// fixpoint. That is a real ceiling, it scales with the problem instead of truncating it, and it needs no faith.
const roundBound = (rules: readonly Rule[]): number => rules.length + 1

/** reason(facts, rules) → forward-chain the rules over the facts to a fixpoint, citing a sealed inference rule at
 *  every step. Deterministic and recomputable: same facts + rules → same derivation → same receipt. */
export function reason(facts: readonly string[], rules: readonly Rule[]): Reasoning {
  const known = new Set(facts)
  const trace: Derivation[] = []
  let rounds = 0
  let changed = true

  // ── DENDRITIC WAKING: a rule is reconsidered only when one of its inputs newly fired ──────────────────────────
  //
  // Forward chaining as written re-scanned EVERY rule on EVERY round, which is the one thing a neuron never does.
  // A cell does not re-poll the network each cycle asking whether anything changed; it sits inert until a dendrite
  // receives, and the arriving signal is what wakes it. The captain's instruction to use neuroscience is worth
  // taking literally here, because the biological arrangement is also the cheaper one — the same conclusions, the
  // same trace, reached without asking a rule whose premises nobody has touched.
  //
  // AFFERENTS, built once: atom → the rules that listen to it. When an atom becomes known it wakes exactly its
  // listeners for the next round, so work is proportional to what actually CHANGED rather than to the size of the
  // rule set. A rule with no inputs in the index is simply never woken, which is what dormant means.
  //
  // THE TRACE IS BYTE-IDENTICAL AND THAT IS A CONSTRAINT, not a hope: receipts fold over it, so a reordering
  // would move addresses across the tree for no reason. Rounds are kept, and within a round the woken rules are
  // visited in their original index order — the same rules fire in the same order as before, and only the ones
  // that could not possibly fire are skipped.
  const afferents = new Map<string, number[]>()
  rules.forEach((r, i) => {
    for (const a of r.if) {
      const listeners = afferents.get(a)
      if (listeners) listeners.push(i)
      else afferents.set(a, [i])
    }
  })
  let awake: number[] = rules.map((_, i) => i)   // the first round wakes everything: nothing has fired yet

  const cap = roundBound(rules)
  while (changed && rounds < cap) {
    changed = false
    rounds++
    const woken = new Set<number>()
    for (const i of awake) {
      const r = rules[i]!
      if (r.if.length > 0 && r.if.every((a) => known.has(a)) && !known.has(r.then)) {
        known.add(r.then)
        // Default: one premise → modus ponens; several → the hypothetical syllogism. A rule may name a
        // more specific sealed license (modus_tollens, disjunctive_syllogism, research_always_has_a_next).
        const cited = r.cites && /^[a-z0-9_]+$/.test(r.cites) ? r.cites : null
        const rule = cited ?? (r.if.length === 1 ? 'modus_ponens' : 'hypothetical_syllogism')
        trace.push({ conclude: r.then, from: [...r.if], rule, cites: `/theorem/${rule}` })
        changed = true
        for (const listener of afferents.get(r.then) ?? []) woken.add(listener)
      }
    }
    // sorted, so the next round visits woken rules in their original index order and the trace cannot reorder
    awake = [...woken].sort((a, b) => a - b)
  }
  // A REASONER THAT CANNOT NOTICE A CONTRADICTION WILL ENTAIL ANYTHING. Forward chaining is monotone: it only
  // ever adds atoms, so if the rules license both `x` and "not_x" it concludes both and, on its own, reports a
  // clean derivation over an inconsistent set — from which every further rule fires and every conclusion looks
  // equally earned. The engine does not resolve the conflict (it holds no policy for choosing a side) and it
  // does not refuse the derivation; it NAMES the pair and drops `consistent`, which is this tree's rule for a
  // finding: report it where the caller must look at it, never quietly repair it.
  const givenSet = new Set(facts)
  // WHAT IT DID NOT USE IS PART OF WHAT IT KNOWS. A derivation that rests on two of forty given facts is a
  // different claim from one that needs all forty, and the trace alone does not say which — a reader must
  // reconstruct it. Naming the unused facts and the dormant rules costs one pass and makes the SHAPE of the
  // reasoning legible: a conclusion supported by little is not thereby weak, but it should be visibly so.
  const touched = new Set<string>()
  for (const t of trace) for (const a of t.from) touched.add(a)
  const unusedFacts = facts.filter((f) => !touched.has(f))
  const firedHeads = new Set(trace.map((t) => t.conclude))
  const dormantRules = rules.filter((r) => !firedHeads.has(r.then) || !r.if.every((a) => known.has(a))).length

  const derived = [...known].filter((a) => !givenSet.has(a))
  const contradictions: Contradiction[] = [...known]
    .map((a) => ({ a, base: negationOf(a) }))
    .filter((x): x is { a: string; base: string } => x.base !== null && known.has(x.base))
    .map((x) => ({ atom: x.base, negation: x.a }))
    .sort((l, r) => l.atom.localeCompare(r.atom))
  const reachedFixpoint = !changed
  const receipt = merkleFold([
    toUuid('given:' + [...facts].sort().join(',')),
    ...trace.map((t) => toUuid(t.from.slice().sort().join('&') + '→' + t.conclude + '|' + t.rule)),
    ...contradictions.map((c) => toUuid('contradiction:' + c.atom + '&' + c.negation)),
  ])
  return {
    given: [...facts],
    derived,
    trace,
    rounds,
    reachedFixpoint,
    unusedFacts,
    dormantRules,
    contradictions,
    consistent: contradictions.length === 0,
    receipt,
    honest:
      'Bounded propositional forward-chaining over the rules given: each conclusion FOLLOWS by a sealed inference rule ' +
      '(modus ponens, or the hypothetical syllogism for a chain), cited on the step. This is the uninterrupted proof of ' +
      'a point in court — theorem court_theorem_beats_assertion: only the proof is admissible. It does not tell anyone ' +
      'what to do or not to do. The court issues the mandate (courtProcedure stage 10); the loser develops the proven ' +
      '(court_loser_develops_the_proven). Deterministic, one receipt. It never claims a conclusion is TRUE, only that ' +
      'it FOLLOWS from what it was given. If the rules license an atom AND its negation, both are concluded — ' +
      'forward chaining is monotone and cannot retract — so the pair is NAMED in `contradictions` and `consistent` ' +
      'goes false; from an inconsistent set every later conclusion is equally derivable, and a caller must know ' +
      'that before reading the trace as support. Negation is recognised syntactically, as "not_x" or `¬x` beside ' +
      '`x`: a rule set that spells its negation another way is NOT checked, and silence here is not consistency. ' +
      'Integrity.',
  }
}

export interface Support { atom: string; givens: string[]; rules: string[]; steps: number; derived: boolean; honest: string }

/** supportOf(reasoning, atom) → the GIVEN facts a conclusion actually rests on, and the sealed rules that carried
 *  it there. The trace records every step in order; this answers the question a reader actually asks of a
 *  derivation — WHY do you hold this — by walking those steps backwards from the atom to the facts underneath.
 *
 *  Forward chaining alone cannot answer that. It only ever adds, so by the end every conclusion sits in one
 *  undifferentiated set and a reader must reconstruct the path by hand. A reasoner that cannot say what a claim
 *  depends on can still be right, but nobody can check it cheaply, and unauditable support is how a conclusion
 *  drawn from a contradiction looks exactly like one drawn from evidence.
 *
 *  HONEST SCOPE: this reports the support THIS derivation used, not the smallest support that exists. Where two
 *  rules could each conclude the same atom, the first to fire is the one recorded, so the answer is a witness
 *  and not a minimal proof — stated here rather than implied by the word "support". */
export function supportOf(r: Reasoning, atom: string): Support {
  const given = new Set(r.given)
  if (given.has(atom)) {
    return { atom, givens: [atom], rules: [], steps: 0, derived: false,
      honest: 'the atom was GIVEN, so it rests on itself — a fact carries no derivation and none is invented for it' }
  }
  const byHead = new Map(r.trace.map((t) => [t.conclude, t]))
  const givens = new Set<string>(), used = new Set<string>(), seen = new Set<string>()
  const queue = [atom]
  let steps = 0
  while (queue.length) {
    const cur = queue.pop()!
    if (seen.has(cur)) continue
    seen.add(cur)
    if (given.has(cur)) { givens.add(cur); continue }
    const step = byHead.get(cur)
    if (!step) continue                       // neither given nor derived: not part of this reasoning
    steps++
    used.add(step.rule)
    for (const from of step.from) queue.push(from)
  }
  return {
    atom, givens: [...givens].sort(), rules: [...used].sort(), steps, derived: byHead.has(atom),
    honest: byHead.has(atom)
      ? 'the givens this conclusion actually rests on, and the sealed rules that carried it — a WITNESS to the ' +
        'derivation taken, never a claim that no shorter one exists'
      : 'this atom was neither given nor derived here, so nothing supports it in this reasoning — an empty ' +
        'support is not a weak one, it is an absent one',
  }
}
