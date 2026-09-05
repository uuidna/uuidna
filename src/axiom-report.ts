// axiom-report — THE TRUST BASE AND THE KERNEL'S OWN WORDS FOR IT, as one declaration with two consumers.
//
// WHY IT MOVED HERE. The allowed-axiom set and the `#print axioms` parser lived inside scripts/lean-axioms.ts,
// which runs over the SEALED ledger. So the only moment this tree could learn that a theorem drags an axiom was
// after that theorem had been deposited, kernel-probed, accepted, sealed and written into a wing — and the audit's
// honest refusal to certify partially ("lean/axioms.json was NOT written: this run could not cover the ledger, so
// it has nothing to certify") means ONE bad row blocks the witness for all of them.
//
// uuidna-f8 hit that on 2026-09-05: `(i == j) == (l.getD i 0 == l.getD j 0)` PASSES the kernel and DEPENDS ON
// PROPEXT, because an equality of two Bool-valued comparisons at Prop level needs propositional extensionality.
// The conveyor's door had no word for it, exactly as it had no word for vacuity an hour earlier. Same shape, same
// cure: the rule belongs where the candidate is judged, not only where the ledger is audited.
//
// AND THE INSTRUMENT MUST BE THE KERNEL, NEVER A REGEX. propext is not dragged by one idiom — `^^^` on Nat drags
// it too, and so does any Prop-valued equality of decidable comparisons. A lexical gate would refuse the spellings
// somebody already met and pass the next one; `#print axioms` is the kernel reporting on the term it just checked.

/** The trust base is the kernel alone — NO axiom is tolerated, not even propext/Quot.sound. A `by decide` ledger
 *  should never need one. Widen this set only by a conscious, documented decision. */
export const ALLOWED_AXIOMS: ReadonlySet<string> = new Set<string>()

/** parseAxiomReport(out) → name → axiom list ([] = clean), read from Lean's own `#print axioms` stanzas:
 *      'name' does not depend on any axioms
 *      'name' depends on axioms: [Classical.choice, propext, Quot.sound]
 *  The name is captured LAZILY up to the verbatim verdict phrase — a prime in a Lean name (`foo'`) prints as
 *  `'foo''`, and a `'([^']+)'` class truncates it at the inner quote, dropping the theorem and then falsely
 *  draining it as unseen. */
export function parseAxiomReport(out: string): Record<string, string[]> {
  const verdict: Record<string, string[]> = {}
  for (const m of out.matchAll(/'(.+?)' does not depend on any axioms/g)) verdict[m[1]!] = []
  for (const m of out.matchAll(/'(.+?)' depends on axioms: \[([^\]]*)\]/g))
    verdict[m[1]!] = m[2]!.split(',').map((s) => s.trim()).filter(Boolean)
  return verdict
}

/** THE ONE INADMISSIBLE FAMILY, MEASURED RATHER THAN GUESSED. Of fourteen List primitives probed against the
 *  kernel on 2026-09-06, exactly TWO drag propext — and both are INDEXED ACCESS:
 *
 *      .getD      [1,2,3].getD 1 0 = 2      depends on axioms: [propext]
 *      [i]!       [1,2,3][1]! = 2           depends on axioms: [propext]
 *
 *  while .sum .length .eraseDups .drop .take .reverse .map .filter .all .any .contains .head? are all clean.
 *  The split has a reason: indexing with a default or a panic carries an out-of-bounds branch, and discharging
 *  it needs proof irrelevance; the total, structural operations do not.
 *
 *  WHY THIS IS WORTH WRITING DOWN. Both peers hit propext tonight through `.getD` and both cured it by
 *  RESTATING THE CLAIM — one moved to `.eraseDups`, the other rewrote a correct statement twice. The cure worked
 *  for a reason neither had: it avoided indexing. Naming the construct turns a trial-and-error loop into a
 *  one-line substitution, which is the whole difference between a gate that refuses and a gate that teaches.
 *  Zero of the 2657 sealed theorems use either, so the audit has been holding this line without anyone stating
 *  where the line was. */
export const AXIOM_INADMISSIBLE: readonly { form: string; why: string; instead: string }[] = [
  { form: '.getD', why: 'indexed access with a default carries an out-of-bounds branch; discharging it needs propext', instead: 'walk the list itself — .all / .any / .filter / .map — or compare structure with .eraseDups' },
  { form: '[i]!', why: 'panic-indexed access, same out-of-bounds branch as .getD', instead: 'the same: state the claim over the whole list rather than at an index' },
]

/** inadmissibleIn(statement) → the forms present that can never be axiom-free here, each with its substitution. */
export function inadmissibleIn(statement: string): readonly { form: string; why: string; instead: string }[] {
  return AXIOM_INADMISSIBLE.filter((r) => statement.includes(r.form))
}

/** disallowedAxioms(out, key) → the axioms this key carries that the trust base does not allow, or null when the
 *  report says nothing about the key at all. NULL AND [] ARE DIFFERENT ANSWERS: [] is the kernel vouching for the
 *  term, null is no verdict — an absent instrument, which may never be read as a pass. */
export function disallowedAxioms(out: string, key: string): string[] | null {
  const found = parseAxiomReport(out)[key]
  if (found === undefined) return null
  return found.filter((a) => !ALLOWED_AXIOMS.has(a))
}
