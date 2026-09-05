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

/** disallowedAxioms(out, key) → the axioms this key carries that the trust base does not allow, or null when the
 *  report says nothing about the key at all. NULL AND [] ARE DIFFERENT ANSWERS: [] is the kernel vouching for the
 *  term, null is no verdict — an absent instrument, which may never be read as a pass. */
export function disallowedAxioms(out: string, key: string): string[] | null {
  const found = parseAxiomReport(out)[key]
  if (found === undefined) return null
  return found.filter((a) => !ALLOWED_AXIOMS.has(a))
}
