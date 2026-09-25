#!/usr/bin/env node
// formula-duplication — how many distinct FORMULAS the ledger holds, and which copies a new wing should cite.
//
// The key count is not the formula count. src/proposition-address.ts folds the keys that differ only in spelling;
// this folds the ones that differ only by the order of a commutative operator, which that key cannot see BY
// CONSTRUCTION — it addresses the statement's normalised TEXT, and `a + b` and `b + a` are different text.
//
// THE TWO CLASSES GET OPPOSITE TREATMENT, and separating them is the whole value of the census:
//   COPIES  — one skill sealing one form repeatedly. `(2*5) % 9 = 1` is sealed five times by `z9-ring` across
//             Core.lean, Ring.lean and Vortex.lean, under three names, with the same human-readable gloss on each.
//             That is the ℤ/9 multiplication table written three times. A new wing should cite, not re-seal.
//   SHARED  — two or more DIFFERENT skills arriving at one form. `(3^2)+(4^2) = (5^2)` is sealed by navigation and
//             by sailing; `(2*6) = (3*4)` by chemistry and by statics. These are not waste at all — they are the
//             corpus telling you that two domains need the same identity for independent reasons, which is what a
//             cross formula IS. They are the most interesting rows here and they are ranked separately for that.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { theorems } from '../theorems/index.js'
import { duplicationCensus } from '../formula-duplication.js'

const c = duplicationCensus(theorems().map((t) => ({
  key: t.key, statement: String(t.statement ?? ''), file: String(t.file ?? ''), skill: String(t.skill ?? ''), name: String(t.name ?? ''),
})))

console.log('formula-duplication — the ledger by FORMULA rather than by key\n')
console.log(`  ${c.statements} sealed statements · ${c.formulas} are pure formulas · ${c.forms} distinct algebraic forms`)
// the percentage is reported as two integers rather than a float: Math.* is rejected tree-wide, and a share of a
// count is exactly a ratio of counts. A zero denominator prints the count alone rather than dividing by a guarded 1.
console.log(c.formulas > 0
  ? `  ${c.restatements} restatements (${c.restatements} of ${c.formulas} formulas) across ${c.groups.length} groups`
  : `  ${c.restatements} restatements across ${c.groups.length} groups (no formulas counted)`)
console.log(`  ${c.copies} COPIES (one skill, sealed more than once) · ${c.crosses} CROSSES (two skills, two meanings, one identity)\n`)

console.log('  SHARED — two domains needing one identity. These are crosses; read them, do not delete them.')
for (const g of c.groups.filter((g) => g.cross)) {
  console.log(`    x${g.keys.length}  ${g.canonical.slice(0, 46).padEnd(46)}  ${g.skills.join(' + ')}`)
  for (const k of g.keys) console.log(`         ${k.key}  [${k.file}]`)
}

console.log('\n  COPIES — one skill sealing one form repeatedly. Cite the first; do not seal another.')
for (const g of c.groups.filter((g) => g.withinOneSkill).slice(0, 20)) {
  console.log(`    x${g.keys.length}  ${g.canonical.slice(0, 34).padEnd(34)}  [${g.skills[0]}]  ${g.files.join(', ')}`)
}
if (c.copies > 20) console.log(`    … ${c.copies - 20} more, all in lean/formula-duplication.json`)

writeFileSync(join(ROOT, 'lean', 'formula-duplication.json'), JSON.stringify(c, null, 1) + '\n')
console.log(`\n  receipt ${c.receipt} · written to lean/formula-duplication.json`)
console.log('\n  IT DELETES NOTHING. A sealed theorem is a published record and no one withdraws a settlement; what a')
console.log('  census owes is the true count and a pointer for the next wing.')
