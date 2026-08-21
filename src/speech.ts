// speech — WHAT A HANDLE SAYS, COMPUTED BY THE SEALED WALK. Every derived word about a theorem — its title, its
// sentence, the period of its motion on the page — is READ OFF the ℤ/9 walk that src/sequence-run.ts already runs
// and lean/Sequence.lean + lean/DivByZero.lean already prove. Nothing here is authored: there is no lookup table
// from a shape to a phrase, because the orbit IS the shape and its own measured facts compose the sentence.
//
// WHY SIX. Run every ledger key through the walk and the whole ledger lands on exactly SIX distinct orbits — the
// same six sealed as a literal in theorem `orbits_closed_involution`, each proven closed under the reflection
// dz(x) = 10 − x. So the vocabulary is not a choice and cannot silently lose a word: it is a theorem, and a word
// that disappeared would move the wing and trip the guard.
//
// THE NAME COMES FROM THE ALGEBRA. A handle's title is its orbit written out — the digits the walk actually
// reaches, in order. No English is invented for it, so a title can never claim more than the walk performs.
//
// HONEST SCOPE: integrity. This reports the measured SHAPE of a handle's walk and composes a sentence
// from those measurements. A residue is not a fact about the thing that folded to it, and nothing here decides
// what a theorem MEANS — only which of the six orbits its address walks.
import { runSequence } from './sequence-run.js'

export interface Speech {
  input: string        // the handle spoken about, as given
  seed: number         // the residue its content-address folds to, 0..9
  orbit: number[]      // the digits the walk reaches — one of the six sealed orbits
  title: string        // the orbit written out — the name, taken from the algebra and nowhere else
  description: string  // composed from the walk's own measurements
  order: number        // the orbit's size — the period any motion derived from it must have
  period: string       // that order as a CSS duration, for the page that renders it
  direction: string    // 'paused' for a fixed point (it does not move), else 'normal'
  fixed: boolean       // is the orbit a single point — the walk that goes nowhere
  covers: boolean      // does the walk reach every one of the ten digits
  honest: string
}

const HONEST =
  'The measured shape of one handle\'s walk through the sealed ℤ/9 ring: which residue its content-address folds ' +
  'to, which of the six proven orbits it reaches, and the order of that orbit. The title is the orbit itself, so ' +
  'no word here claims more than the walk performs. HONEST SCOPE: integrity— a residue is not a fact ' +
  'about the thing that folded to it, and this decides no meaning.'

/** speak(input) → the title, sentence and motion of any handle, all read off the sealed walk. */
export function speak(input: string | number): Speech {
  const run = runSequence(input)
  const orbit = run.visited
  const order = orbit.length
  const fixed = order === 1
  // THE TITLE IS THE ORBIT. A contiguous run of every digit reads as its span; anything else lists what it reaches.
  const contiguous = orbit.every((d, i) => d === orbit[0] + i)
  const title = fixed ? `${orbit[0]}` : contiguous ? `${orbit[0]}–${orbit[order - 1]}` : orbit.join('·')
  // THE SENTENCE IS COMPOSED FROM MEASUREMENTS.
  const description = fixed
    ? `a fixed point: the walk starts at ${orbit[0]} and never leaves it — one digit of the ten, reached and held`
    : `walks ${order} of the ten digits (${orbit.join(', ')})${run.covers ? ', reaching every one' : ''}, closed under the reflection dz so the mirror adds nothing`
  return {
    input: String(input), seed: run.seed, orbit, title, description, order,
    period: `${order}s`, direction: fixed ? 'paused' : 'normal',
    fixed, covers: run.covers, honest: HONEST,
  }
}

/** census(keys) → how the whole ledger distributes over the six orbits. The vocabulary, counted rather than claimed. */
export function speechCensus(keys: readonly string[]): { orbits: { title: string; order: number; count: number }[]; distinct: number; total: number } {
  const by = new Map<string, { title: string; order: number; count: number }>()
  for (const k of keys) {
    const s = speak(k)
    const cur = by.get(s.title)
    if (cur) cur.count++
    else by.set(s.title, { title: s.title, order: s.order, count: 1 })
  }
  const orbits = [...by.values()].sort((a, b) => b.count - a.count)
  return { orbits, distinct: orbits.length, total: keys.length }
}

// ── THE LAW, AS CODE ────────────────────────────────────────────────────────────────────────────────────────────
// "Any prose not derived from the Lean algebra is treason, trialed in court, edited strictly by the proceedings."
//
// THE FIRST ATTEMPT WAS A FORGERY AND IS RECORDED HERE RATHER THAN DELETED. It compared the NUMERALS in a sentence
// against the numerals the walk measured, and called that derivation. It acquitted "this theorem proves the Riemann
// hypothesis" (no digits, so nothing to compare, and [].every() is true), acquitted a lie assembled from measured
// numbers, and acquitted the empty string — then reported 1371/1371 loyal, because the sentences it judged were
// composed OUT OF the very numbers it checked for. An instrument that cannot fail, reporting its own passing as
// evidence. That is the clay_launder_refused defect exactly: a name claiming what the statement cannot support.
//
// THE TEST THAT DECIDES. Prose is DERIVED iff it is what the algebra GENERATES — byte-identical to compose(facts).
// Not "contains the right numbers""mentions no forbidden word": REGENERABLE. Anything a person authored
// differs from the generated string somewhere, and the difference is the evidence. This is harsh by construction
// and that is the point — "lean computes and all prose emerges from there" admits no gap for a template a person
// fills in. compose() below IS the whole vocabulary; it takes only measured facts and can say nothing else.
//
// THE COURT DECIDES. A verdict comes from adjudicate() over the sealed legal vocabulary in
// lean/Legal.lean. Undecided prose is REMANDED— theorem legal_remand_is_total_nothing_discarded.
import { adjudicate } from './adjudicate.js'

export type ProseVerdict = 'DERIVED' | 'TREASON' | 'REMAND'

export interface ProseTrial {
  prose: string          // the sentence on trial, as given
  generated: string      // what the algebra produces from the same facts — the only admissible prose
  verdict: ProseVerdict  // DERIVED (identical), TREASON (differs AND the court refuses it), REMAND (differs, undecided)
  divergesAt: number     // first byte where the prose leaves the derivation; -1 when identical
  court: string          // the court's own verdict on the statement, from adjudicate()
  honest: string
}

/** compose(s) → THE ONLY ADMISSIBLE SENTENCE for a walk. Every word is a function of a measured fact; there is no
 *  branch a person can widen and no slot a person can fill. If prose differs from this, a person wrote it. */
export function compose(s: Speech): string {
  return s.fixed
    ? `${s.title}: a fixed point — the walk holds at ${s.orbit[0]} and reaches 1 of the 10 digits.`
    : `${s.title}: the walk reaches ${s.order} of the 10 digits (${s.orbit.join(', ')}) from seed ${s.seed}, closed under dz.`
}

/** tryProse(prose, s) → the trial. Identical to the derivation is DERIVED; otherwise the COURT decides whether the
 *  divergence is refused outright (TREASON) or merely undecided (REMAND — held. */
export function tryProse(prose: string, s: Speech): ProseTrial {
  const generated = compose(s)
  let i = 0
  while (i < prose.length && i < generated.length && prose[i] === generated[i]) i++
  const identical = prose === generated
  const court = adjudicate(prose)
  return {
    prose, generated, divergesAt: identical ? -1 : i,
    verdict: identical ? 'DERIVED' : court.verdict === 'UNVERIFIED' ? 'TREASON' : 'REMAND',
    court: court.verdict,
    honest:
      'Prose is DERIVED only when it is byte-identical to what the algebra generates from the same measured facts. ' +
      'A difference is not evidence of falsehood — it is evidence of AUTHORSHIP, which is what the law forbids. ' +
      'The court supplies the verdict; undecided prose is REMANDED and kept (theorem legal_remand_is_total_nothing_discarded).',
  }
}
