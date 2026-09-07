// lean-ledger — A WING IS REGISTERED ONCE, AND THE LEDGER IS EXACTLY ITS WINGS.
//
// The defect this file is named for: `Pentagram.lean` was given a second PRINCIPLE row an hour after its
// first, by one hand that did not check. `ordered` is built from PRINCIPLE, so the wing was walked twice and
// each of its 27 theorems emitted twice — the ledger read 5333 where the wings held 5306. It took a census
// across five surfaces to find, and the finding was three steps from the cause.
//
// Worse, the duplicate row was itself the SECOND symptom of a first one: the file already existed, with a
// generator and thirteen sealed theorems about the star polygon {5/2}, and had been overwritten by a wing
// about hardware width that happened to want the same name. The Write tool said "has been updated
// successfully" rather than "created" and that word was read past. Both files are restored from origin; the
// overwriting wing is now BindingPoint.lean, named for what it decides.
//
// The generator now refuses a duplicate row outright. These assertions are the other half — that the refusal
// is reachable, and that the two counts it protects actually agree.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'

const wingFiles = readdirSync('lean').filter((f) => f.endsWith('.lean'))

test('no wing is registered twice in PRINCIPLE', () => {
  const rows = [...readFileSync('src/scripts/lean-ledger.ts', 'utf8').matchAll(/^ {2}\['([A-Za-z0-9]+\.lean)'/gm)]
    .map((m) => m[1]!)
  const dup = [...new Set(rows.filter((f, i, a) => a.indexOf(f) !== i))]
  assert.deepEqual(dup, [], `registered more than once: ${dup.join(', ')} — each duplicate emits its wing twice`)
  assert.ok(rows.length > 100, 'the table was found and parsed — an empty match here would pass vacuously')
})

test('the ledger holds exactly as many theorems as the wings do', () => {
  const inWings = wingFiles.reduce((n, f) => n + (readFileSync(`lean/${f}`, 'utf8').match(/^theorem /gm) ?? []).length, 0)
  const gen = readFileSync('src/theorems/generated.ts', 'utf8')
  const stated = Number(/The (\d+) Lean-proven theorems/.exec(gen)?.[1] ?? -1)
  assert.ok(inWings > 5000, `only ${inWings} theorems parsed from ${wingFiles.length} wings — the parse failed`)
  assert.equal(stated, inWings,
    `the ledger states ${stated} where the wings hold ${inWings}. A gap of exactly one wing's theorem count is `
    + 'the duplicate-row signature; check PRINCIPLE before anything else.')
})

test('every PRINCIPLE row names a wing that exists, or is dropped rather than counted', () => {
  const rows = [...readFileSync('src/scripts/lean-ledger.ts', 'utf8').matchAll(/^ {2}\['([A-Za-z0-9]+\.lean)'/gm)]
    .map((m) => m[1]!)
  const missing = rows.filter((r) => !wingFiles.includes(r))
  // rows for unwritten wings are FILTERED by the generator, so they are allowed to stand as intent — but they
  // must never reach the emitted index, or the site links a principle to a file nobody can open
  const md = readFileSync('lean/PRINCIPLE.md', 'utf8')
  for (const m of missing) assert.ok(!md.includes(m), `${m} has no wing yet reaches the published index`)
})
