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

// ── IMPORTING THE ARC MUST NOT RUN THE ARC. The finder for the worst defect this file ever had.
//
// all-run.ts carried no main guard, so the `import { PHASES }` at the top of THIS FILE executed the whole arc —
// and the arc's last phase is `ship`, which is deploy-run.js: contribute the coins, build the worker, push it to
// the live edge. Writing the perfectly correct test above armed a production deploy on every run of the
// tree-wide suite. It never fired only because the reconcile phase blocked on another session's writer lock and
// died there first; the lock, built for a different hazard entirely, is the only reason a unit test did not ship.
// So this test exists to make the guard structural rather than remembered.
test('the arc is inert when IMPORTED — a module that ships when named is not a module', () => {
  const src = readFileSync(join(ROOT, 'src/scripts/all-run.ts'), 'utf8')
  // the guard itself, in the tree's own established shape (one-writer.ts and every other runner test argv[1])
  assert.match(src, /const isMain = process\.argv\[1\]\?\.endsWith\('all-run\.js'\)/,
    'all-run must gate its execution on being the invoked command')
  assert.match(src, /if \(isMain\) \{\s*runArc\(\)/, 'and the arc body must run only under that gate')
  // the control that makes this meaningful: the arc really does reach an irreversible outward act, so the
  // guard is protecting something. If `ship` ever leaves PHASES this assertion should be revisited, not deleted.
  assert.ok(PHASES.some((p) => p.name === 'ship' && p.cmd.includes('deploy-run')),
    'the last phase is a real deploy — that is WHY the guard is load-bearing')
})

test('a phase that NEVER RAN folds elsewhere than one that ran and failed', () => {
  // THE OUTWARD FORM OF TONIGHT'S DEFECT. spawnSync returns status null when the command never started — a
  // missing shell, an unresolvable binary, a signal — and `r.status === 0` mapped that null to false, so the
  // leaf said "fail" for a phase the machine never attempted. The arc receipt is PUBLISHED, so that is not a
  // misleading log line; it is an address asserting an attempt that did not happen.
  const ranAndFailed = phaseLeaf('ship', 'fail')
  const neverRan = phaseLeaf('ship', 'unmeasured')
  assert.notEqual(neverRan, ranAndFailed, 'the receipt must tell an arc that was refused from one that could not start')
  assert.notEqual(neverRan, phaseLeaf('ship', 'ok'))

  // and the whole arc inherits the distinction, which is the point — the leaf is only a means
  const stopped = arcReceipt([phaseLeaf('wave', 'ok'), ranAndFailed])
  const stalled = arcReceipt([phaseLeaf('wave', 'ok'), neverRan])
  assert.notEqual(stopped, stalled, 'two arcs that ended differently must not share one address')

  // the boolean form still means what it always meant, so every existing caller and receipt is unmoved
  assert.equal(phaseLeaf('wave', true), phaseLeaf('wave', 'ok'))
  assert.equal(phaseLeaf('wave', false), phaseLeaf('wave', 'fail'))
})
