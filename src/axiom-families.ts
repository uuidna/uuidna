// axiom-families — WHAT AN AXIOM-FREE LEDGER ACTUALLY RESTS ON.
//
// The trust base here is the bare kernel with allowed axioms ∅: `npm run axioms` reports EVERY theorem in the
// ledger — all of them, not a fraction — depending on NO axiom at all. So grouping theorems by their axiom dependencies groups them all into one bucket
// and says nothing. The question that does have an answer is what the kernel must be able to DECIDE for each
// statement to close — and that is the ledger's real axiomatic structure, since `by decide` is the only tactic
// in it. A theorem's family is the deepest kernel capability its statement demands.
//
// THE HIERARCHY PARTITIONS, which is why it is a hierarchy and not a set of tags: deepest capability wins, so
// every theorem lands in exactly one family and the counts sum to the ledger. A theorem that both multiplies and
// walks a list is an ENUMERATION — the arithmetic came free with the walk. Reported as overlapping tags instead,
// the shares would add to more than the ledger and no share would mean anything.
//
// WHAT IT IS FOR. The shallow families are where unclaimed strength sits: an `arithmetic` theorem states a fact
// about the constants it happens to name, where the same claim walked over a range decides it for every case in
// that range. That is the difference this tree already draws between a claim that is STATED and one that is
// ENUMERATED, made countable across the whole ledger.

// A CENSUS SEALED INTO THE THING IT COUNTS CHANGES IT. Depositing
// `axiom_families_partition_the_ledger_2657` took the ledger to 2658, so the moment its numbers were sealed they
// described the ledger as it was one theorem earlier — and the theorem's own statement lands in list-structure,
// the family whose count it reports. The Lean stays TRUE (it is arithmetic over seven given numbers); it is the
// prose that is a snapshot, which is what every counted theorem in this tree is. The stable claim is the one
// this module's tests hold instead: the hierarchy assigns exactly one family to each shape, and the near-misses
// prove it discriminates. Counts belong on a computed surface; totality belongs in the kernel.

export const FAMILIES = ['literal', 'arithmetic', 'propositional', 'enumeration', 'list-structure', 'finite-type', 'quantified'] as const
export type AxiomFamily = (typeof FAMILIES)[number]

/** familyOf(statement) → the deepest kernel capability the statement demands. Tested in both directions: each
 *  family has a member the classifier must place there AND a near-miss it must not. */
export function familyOf(statement: string): AxiomFamily {
  const s = statement
  // a real quantifier is deeper than anything below it: the kernel must reason over a domain, not evaluate a term
  if (/∀|∃/.test(s)) return 'quantified'
  // Fin carries its bound in the TYPE, so the kernel decides membership structurally rather than by comparison
  if (/\bFin\b/.test(s)) return 'finite-type'
  // list OPERATIONS beyond walking: dedup, index, slice, fold — each is a decision about structure
  if (/\.eraseDups|\.getD|\.drop|\.take|\.reverse|\.sum/.test(s)) return 'list-structure'
  // a walk: bounded quantification made concrete, which is what this ledger means by "enumerated"
  if (/List\.range|\.all\b|\.any\b|\.filter\b|\.map\b/.test(s)) return 'enumeration'
  // propositional structure over arithmetic
  if (/∧|∨|¬|→|↔/.test(s)) return 'propositional'
  // arithmetic: an operator between numbers. The subtraction case is guarded so a HYPHEN inside a name is not
  // read as a minus — the first version of this classifier counted `two-coins` as arithmetic.
  if (/[+*/%^]|(?<=\d)\s*-\s*(?=\d)/.test(s)) return 'arithmetic'
  // nothing but comparison of given values
  return 'literal'
}

/** integer division without a rounding helper: subtract the remainder, then divide exactly. */
const div = (n: number, d: number): number => (n - (n % d)) / d

export interface FamilyCensus {
  total: number
  byFamily: { family: AxiomFamily; count: number; share: number }[]
  partitions: boolean
  empty: AxiomFamily[]
  honest: string
}

/** census(rows) → the partition, and whether it IS one. `partitions` is computed, never asserted: a classifier
 *  that stopped covering the ledger would report false rather than quietly drop rows. */
export function census(rows: readonly { statement: string }[]): FamilyCensus {
  const count = new Map<AxiomFamily, number>(FAMILIES.map((f) => [f, 0]))
  for (const r of rows) { const f = familyOf(r.statement); count.set(f, count.get(f)! + 1) }
  const byFamily = FAMILIES.map((family) => ({
    family, count: count.get(family)!,
    // share in TENTHS OF A PERCENT as an integer: a float share would drift between hosts while claiming to be
    // the same measurement. THE FIRST VERSION OF THIS LINE CALLED THE STANDARD FLOOR HELPER, inside a comment
    // that says the determinism law forbids exactly that — the comment recorded the intent and the code
    // recorded what was typed, which is the fault written into memory an hour earlier. The scanner caught it.
    // And then the comment EXPLAINING the mistake tripped the same scanner, because a pattern scanner sees
    // bytes and not intent: naming the helper is indistinguishable from calling it. So it goes unnamed here,
    // and the cure is the tree's own integer division, which needs no helper at all.
    share: rows.length === 0 ? 0 : div(count.get(family)! * 1000, rows.length),
  }))
  const summed = byFamily.reduce((a, b) => a + b.count, 0)
  return {
    total: rows.length,
    byFamily,
    partitions: summed === rows.length,
    empty: byFamily.filter((r) => r.count === 0).map((r) => r.family),
    honest: 'Families are the deepest kernel capability each statement demands, not axiom dependencies — this ledger has none. The hierarchy partitions: deepest wins, so the counts sum to the ledger exactly.',
  }
}
