// bound-perturbation — IS A FINITE BOUND LOAD-BEARING, OR AN ARTIFACT OF `decide` NEEDING SOMETHING FINITE?
//
// THE METHOD IS zeropoint-node-8a's (2026-09-04) and it is better than mine was. I had tried to answer it by
// reading the prose: find a theorem whose statement ranges over `List.range N` while its sentence asserts a
// universal, and check whether the sentence names N. That instrument flagged 150 of 793 and I read ten of them
// and most were CORRECT — `every_digit_has_neighbours` over range 10 says "every digit", which names the domain
// BY NAME rather than by cardinality, and my separator scored better prose as worse.
//
// THEIR MOVE: do not compare the prose to the bound. PERTURB THE BOUND. Widen every domain in the statement by
// one element and re-decide. If it FAILS, the bound carries the theorem — that direction is conclusive. If it
// still holds, all that is established is that it survived ONE STEP: a lower bound, not a verdict, because the
// new element may satisfy the property by coincidence and a mutation respecting a symmetry moves the probe while
// leaving the answer wrong. Same peer, same day, and the reason the field is named survivedOneStep. This is decidable, needs no wordlist, and cannot mistake
// "every digit" for a cardinality claim because it never reads the sentence at all.
//
// WHAT IT DOES NOT SETTLE, and this is why nothing gates on it yet. A bound can be load-bearing precisely
// BECAUSE the finite domain is the real domain: ℤ/9 has exactly six units, two qubits have exactly four basis
// states, the pH scale runs 0..14. Widening those breaks the theorem and should. So load-bearing does NOT imply
// over-claiming, and separating the two still needs the domain-naming judgement I could not make reliably. The
// measurement is sealed; the verdict is withheld. Their own warning said this would happen.
import { holds } from './involution/index.js'

/** widenBounds(statement) → every `List.range N` becomes N+1, and every `List.range' s N` becomes `s (N+1)`. */
export function widenBounds(statement: string): string {
  return statement.replace(/List\.range('?)\s+(\d+)(\s+(\d+))?/g, (_m, tick: string, a: string, _g: string, b: string) =>
    tick ? `List.range' ${a} ${Number(b) + 1}` : `List.range ${Number(a) + 1}`)
}

export type BoundVerdict = 'not-bounded' | 'base-undecidable' | 'survived-widening' | 'load-bearing' | 'undecidable-widened'

/** boundVerdict(statement) → what the perturbation says. `undecidable-widened` is UNKNOWN and never "fine",
 *  because an evaluator that cannot read the widened form has established nothing about the bound — the same
 *  unread-is-not-empty law the refused-host and prior-art readings keep. */
export function boundVerdict(statement: string): BoundVerdict {
  if (!/List\.range/.test(statement)) return 'not-bounded'
  const widened = widenBounds(statement)
  if (widened === statement) return 'not-bounded'
  if (holds(statement) !== true) return 'base-undecidable'
  const h = holds(widened)
  return h === true ? 'survived-widening' : h === null ? 'undecidable-widened' : 'load-bearing'
}

export interface BoundCensus {
  bounded: number
  /** ONE widening step is ONE SAMPLE, so this is a LOWER BOUND and not a verdict — a peer's correction
   *  (zeropoint-node-8a, 2026-09-04: "report the negative as a lower bound"). A statement can survive n+1 for a
   *  reason that has nothing to do with the bound being decorative: the new element may satisfy the property by
   *  coincidence, and a mutation that respects a symmetry moves the probe while leaving the verdict wrong. So
   *  this counts bounds that survived one step, never bounds proven inessential. */
  survivedOneStep: number
  loadBearing: number
  baseUndecidable: number
  undecidableWidened: number
}

/** boundCensus(statements) → how much of a ledger rests on its bounds. Derived; no threshold, no verdict. */
export function boundCensus(statements: readonly string[]): BoundCensus {
  const c: BoundCensus = { bounded: 0, survivedOneStep: 0, loadBearing: 0, baseUndecidable: 0, undecidableWidened: 0 }
  for (const s of statements) {
    const v = boundVerdict(s)
    if (v === 'not-bounded') continue
    c.bounded++
    if (v === 'survived-widening') c.survivedOneStep++
    else if (v === 'load-bearing') c.loadBearing++
    else if (v === 'base-undecidable') c.baseUndecidable++
    else c.undecidableWidened++
  }
  return c
}
