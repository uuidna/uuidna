// audit-door-surface.test — THE FINDER'S OWN CONTROL, and the case that matters is the unreachable one.
//
// This audit asks a network. A network audit's characteristic failure is not a wrong number — it is reporting
// AGREEMENT when nothing was compared, which is the same defect latex-crosscheck names one level down: a surface that
// could not be read is not a surface that agreed. So the file it writes must never let those two states render alike,
// and that is what is asserted here, over the file the last real run produced.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'

interface Row { lead: string; status: string; owes: string }
interface File { why: string; host: string; unmeasured?: string; open: number; held: Row[] }
const PATH = join(ROOT, 'lean', 'door-surface.json')
const read = (): File => JSON.parse(readFileSync(PATH, 'utf8')) as File

test('the record exists at all — an absent file and an empty set are different facts', () => {
  assert.ok(existsSync(PATH), 'audit-door-surface writes on every run, empty included; no file means it never ran')
})

test('UNMEASURED AND A SURFACE CLAIM CAN NEVER BOTH STAND — the false green a network audit invites', () => {
  const d = read()
  if (d.unmeasured !== undefined) {
    // nothing was compared, so nothing may be claimed about the surface
    assert.equal(d.held.length, 0, 'a run that could not read the door claims nothing about it')
    assert.equal(d.open, 0)
    assert.match(d.unmeasured, /different facts|could not be read/, 'and it says why, in its own words')
    return
  }
  // it WAS measured, so it owes a coverage row that states how much of the surface it actually walked
  const coverage = d.held.filter((r) => /^Coverage of this run/.test(r.lead))
  assert.equal(coverage.length, 1, 'exactly one coverage row — a measurement states its own reach')
  const m = /Coverage of this run: (\d+) of (\d+)/.exec(coverage[0]!.lead)
  assert.ok(m, 'the coverage row names both numbers, so a partial walk cannot read as a whole one')
  const [compared, shared] = [Number(m[1]), Number(m[2])]
  assert.ok(compared <= shared, 'more compared than shared is impossible and would mean the census is wrong')
  // and the row closes ITSELF only at full coverage — the control against a partial walk marked done
  assert.equal(coverage[0]!.status === 'closed', compared >= shared,
    'the coverage row is closed exactly when every shared door was compared, never merely when some were')
})

test('every row is a LEAD and settles nothing — the shape lean/leads.json uses', () => {
  const d = read()
  for (const r of d.held) {
    assert.ok(r.lead.length > 0, 'a lead names what was noticed')
    assert.ok(r.owes.length > 0, 'and what would settle it — a lead with nothing owing is a verdict in disguise')
    assert.ok(r.status === 'open' || r.status === 'closed', `unknown status ${r.status}`)
    assert.doesNotMatch(r.lead, /\bis a (defect|bug)\b/i, 'this audit files leads; it does not return verdicts')
  }
  assert.equal(d.open, d.held.filter((r) => r.status === 'open').length, 'open is a census of the rows, not a separate claim')
})

test('it does not write lean/leads.json — no writer appends a row there, and a hand edit is refused by law', () => {
  const src = readFileSync(join(ROOT, 'src', 'scripts', 'audit-door-surface.ts'), 'utf8')
  const writes = [...src.matchAll(/wrRoot\('([^']+)'/g)].map((m) => m[1]!)
  assert.deepEqual(writes, ['lean/door-surface.json'], 'it writes its own file and only its own file')
})
