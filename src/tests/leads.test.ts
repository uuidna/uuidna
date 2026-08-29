// leads — THE RELEASE GATE ON TRIAL.
//
// "next release only possible if all leads verified. lead is anything not verified." (2026-08-25)
//
// A gate that only ever runs against the live tree can only be observed doing ONE of its two jobs — on a tree
// with open leads it refuses, and nobody ever sees it permit; on a clean tree it permits, and nobody ever sees it
// refuse. Both halves are driven here with constructed readings, no checkout involved, because the pure census is
// separated from the reading of files precisely so this test can exist.
//
// THE HALF THAT MATTERS MOST is neither: it is the THIRD state. A source that could not be READ contributes an
// empty list exactly like a source that answered and holds nothing, and a release gate that folds those together
// ships on a census nobody managed to take. That is the shape theorem no_instrument_narrower_than_its_question
// forbids — a two-valued instrument (ready / not ready) put to a three-valued question (clean / holding / unread).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { leadCensus, renderCensus, read, unread, type Lead } from '../leads.js'
import { gatherLeads } from '../scripts/leads-gate.js'
import { ROOT } from '../boundary.js'

const lead = (source: string, what: string): Lead => ({ source, what, owes: 'evidence' })

test('a clean census PERMITS — the half a red tree never shows you', () => {
  const c = leadCensus([read('ledger', [], 17), read('expose', [], 23), read('coverage', [], 41)])
  assert.equal(c.ready, true)
  assert.equal(c.open.length, 0)
  assert.deepEqual(c.unmeasured, [])
  // arbitrary figures on purpose: the census sums what it is given and must not be pinned to a live count
  assert.equal(c.settled, 17 + 23 + 41, 'the settled denominator is carried, so zero-open is not an empty tree')
  assert.match(c.why, /may ship/)
})

test('ONE held lead REFUSES the release, however many are settled', () => {
  const c = leadCensus([read('ledger', [lead('ledger', 'the 42-state paired walk')], 17), read('expose', [], 23)])
  assert.equal(c.ready, false)
  assert.equal(c.open.length, 1)
  assert.match(c.why, /still held/)
  // the settled count must NOT buy off the open one — 17 settled and 1 open is not 94% ready, it is not ready
  assert.equal(c.settled, 40)
  assert.equal(c.ready, false, 'a release is not a percentage')
})

// ── THE THIRD STATE. This is the assertion the whole design exists for.
test('a source that could not be READ blocks — an unread source is not a clean one', () => {
  const unreadable = leadCensus([read('ledger', [], 17), unread('expose', 'the coordinate walk threw')])
  assert.equal(unreadable.ready, false, 'a census nobody managed to take must never permit a release')
  assert.deepEqual(unreadable.open, [], 'and it reports NO open leads, because it found none — it looked at nothing')
  assert.deepEqual(unreadable.unmeasured, ['expose'])
  assert.match(unreadable.why, /could NOT be read/)
  assert.match(unreadable.why, /absent one/, 'it says plainly that this is an absent census, not a clean one')

  // THE MUTATION THAT BREAKS IT: fold unread into clean and this census becomes indistinguishable from a green
  // tree. Both have zero open leads; only `unmeasured` and `answered` tell them apart.
  const clean = leadCensus([read('ledger', [], 17), read('expose', [], 0)])
  assert.equal(clean.open.length, unreadable.open.length, 'the two states have IDENTICAL open lists — that is the trap')
  assert.notEqual(clean.ready, unreadable.ready, 'and the verdict must still separate them')
  assert.notEqual(clean.answered, unreadable.answered, 'the denominator is what separates them')
  assert.notEqual(clean.receipt, unreadable.receipt, 'and the receipt moves, so the difference is recomputable')
})

test('the receipt binds each source VERDICT, not just its name', () => {
  const base = leadCensus([read('a', [], 1), read('b', [], 1)])
  const held = leadCensus([read('a', [lead('a', 'x')], 1), read('b', [], 1)])
  const silent = leadCensus([unread('a', 'threw'), read('b', [], 1)])
  assert.notEqual(base.receipt, held.receipt, 'a source that starts holding moves the receipt')
  assert.notEqual(base.receipt, silent.receipt, 'a source that goes silent moves it too')
  assert.notEqual(held.receipt, silent.receipt, 'and holding is not the same state as silent')
  // order-invariant: two observers listing the sources differently fold the same census
  assert.equal(leadCensus([read('a', [], 1), read('b', [], 1)]).receipt,
    leadCensus([read('b', [], 1), read('a', [], 1)]).receipt, 'the census is a set, not a sequence')
})

test('the render names every lead\'s DEBT — a refusal that does not say what it wants is an obstacle', () => {
  const c = leadCensus([read('ledger', [{ source: 'ledger', what: 'the grid breaks at 73 wings', owes: 'a decision, not a fix' }], 0)])
  const out = renderCensus(c).join('\n')
  assert.match(out, /the grid breaks at 73 wings/)
  assert.match(out, /owes: a decision, not a fix/, 'what would settle it is shown beside it')
  assert.match(out, /✗ leads/)
  assert.match(renderCensus(leadCensus([read('x', [], 3)])).join('\n'), /✓ leads/)
})

test('the LIVE sources all answer — every declared source is readable on this tree', () => {
  // This one CAN fail, and that is its point: it fails the day a source is renamed, moved or breaks, which is
  // exactly when the gate would otherwise start silently measuring less than it claims.
  const readings = gatherLeads()
  assert.ok(readings.length >= 4, 'every declared source produces a reading')
  const silent = readings.filter((r) => !r.reached)
  assert.deepEqual(silent.map((r) => `${r.source}: ${r.why}`), [],
    'a source that cannot be read makes the gate measure less than it claims — fix the reader, not the census')
})

test('open-questions lists refuted and refused leads — they map to UNVERIFIED, not VERIFIED', () => {
  const page = readFileSync(join(ROOT, 'docs', 'open-questions.md'), 'utf8')
  const leads = JSON.parse(readFileSync(join(ROOT, 'lean', 'leads.json'), 'utf8')) as {
    refuted?: { lead: string; killed_by?: string }[]
    refused?: { lead: string; boundary?: string }[]
  }
  const settled = [
    ...(leads.refuted ?? []).filter((r) => r.killed_by && r.lead),
    ...(leads.refused ?? []).filter((r) => r.boundary && r.lead),
  ]
  const missing = settled.filter((s) => s.lead && !page.includes(s.lead.slice(0, 48)))
  assert.deepEqual(missing.map((s) => s.lead.slice(0, 60)), [],
    'refuted and refused are open leads — they adjudicate UNVERIFIED until a seal verifies')
})
