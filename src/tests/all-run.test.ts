// all-run — the arc's singularity on trial. The manifest must state the arc's order in SOURCE (the whole point
// of folding the `&&` chain out of package.json), and the arc receipt must behave like every other fold in this
// tree: order-invariant across observers, and MOVED by any change in what actually happened. A receipt that
// cannot tell a complete arc from a failed one would be the vacuous-audit disease at the outward door.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PHASES, phaseLeaf, arcReceipt } from '../scripts/all-run.js'
import { ROOT } from '../scripts/api.js'

test('the arc states its order in source, deposit before take', () => {
  assert.deepEqual(PHASES.map((p) => p.name), ['wave', 'ship'],
    'the wave reconciles to origin BEFORE the deploy ships — a deploy may only serve what origin holds')
  for (const p of PHASES) assert.ok(p.note.length > 20, `${p.name} presents with its prose`)
})

test('package.json carries no hand-typed chain for the arc — the manifest is the one declaration', () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts: Record<string, string> }
  assert.ok(!pkg.scripts.all.includes('&&') || pkg.scripts.all.startsWith('npm run build &&'),
    'the only && allowed in "all" is the build that precedes any node entry — the arc\'s own order lives in PHASES')
  assert.match(pkg.scripts.all, /all-run\.js$/, '"all" dispatches to the manifest, never to a chain of npm scripts')
})

test('the arc receipt is order-invariant across observers but moves with the verdicts', () => {
  const complete = [phaseLeaf('wave', true), phaseLeaf('ship', true)]
  assert.equal(arcReceipt(complete), arcReceipt([...complete].reverse()),
    'two observers who folded the phases in different orders hold the same arc address')
  const stopped = [phaseLeaf('wave', true), phaseLeaf('ship', false)]
  assert.notEqual(arcReceipt(stopped), arcReceipt(complete),
    'an arc that stopped at ship folds elsewhere than one that shipped — the receipt can tell them apart')
  assert.notEqual(arcReceipt([phaseLeaf('wave', true)]), arcReceipt(complete),
    'an arc missing a phase is a different act, and addresses as one')
  assert.match(arcReceipt(complete), /^[0-9a-f-]{36}$/, 'the arc folds to one address')
})
