#!/usr/bin/env node
// @finder phase:22 — DISCOVERED, not listed. This file says that it belongs to the audit
// chain and where in it; the runner (finders.ts) reads that and nothing central is edited when a finder
// is added.
//
// school-families — FAMILIES FROM DIFFERENT DOMAINS PROVE EACH OTHER, and the grouping that claims so must be an
// inverse of the theorems it was read out of.
//
// The captain, 2026-09-28: "families from different domains prove each other. automate autonomy".
//
// AUTONOMY IS THE POINT OF PUTTING IT HERE. The family axis was computed in this session and served at
// uuidna_review_domains; a grouping served to callers and checked by nobody drifts the first time a wing is renamed —
// and renaming a theorem moves its handle is already an open lead in this tree. The runner discovers this finder from
// its own declaration, so the check runs on every audit with nothing central edited and no hand to remember it.
//
// WHAT IT REFUSES, and it is one law with two halves. domain → families is read from each theorem's file; family →
// domains is that map inverted. They are inverses or the grouping is wrong, and a check walking one direction cannot
// tell a dropped domain from a domain that was never there. Both halves are asserted, and either one failing refuses.
//
// WHAT IT REPORTS WITHOUT REFUSING. The cross density — 197 linked pairs of 13,366 possible, 1.5% — is a reading about
// the ledger's shape, not a defect: dense would mean the families are not families, empty would mean the axis carries
// nothing, and neither bound is this door's to set. A finder that refused on a number nobody has justified would be the
// hand-tuned threshold this tree keeps removing.
import { familyCrosses } from '../school/laboratory/index.js'

const c = familyCrosses()
const pct = `${(c.density / 100).toFixed(2)}%`

console.log(`school families — ${c.domains} admitted domain(s) across ${c.families} wing famil(ies)`)
console.log(`  ${c.spanning} domain(s) span more than one family: only these can link anything`)
console.log(`  ${c.crosses.length} linked pair(s) of ${c.possible} possible — density ${pct}`)
console.log(`  the inverse law (domain → families, and back): ${c.crossesHold ? 'HOLDS' : 'BROKEN'}`)
console.log(`  receipt ${c.receipt}`)
console.log()
console.log('the strongest crosses — each shared domain is evidence one family carries for the other:')
for (const x of c.crosses.slice(0, 8)) {
  console.log(`  ${x.families[0]} ↔ ${x.families[1]}  ${String(x.shared.length).padStart(3)} shared: ${x.shared.slice(0, 4).join(', ')}`)
}
if (c.crosses.length > 8) console.log(`  … and ${c.crosses.length - 8} more pairs`)

if (!c.crossesHold) {
  console.error(`\n✗ school-families — the family grouping is not an inverse of the theorems it was read from:`)
  for (const a of c.asymmetries) console.error(`    ${a}`)
  console.error('  A grouping served to callers that disagrees with the ledger routes a reader to the wrong family.')
  console.error('  Fix the derivation; do not reconcile the two maps by editing one of them.')
  process.exit(1)
}
console.log('\n✓ school-families — every domain is placed under exactly the families its theorems name, and back.')
