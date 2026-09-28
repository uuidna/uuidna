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
import { leadCensus, renderCensus, read, unread, type Lead , kernelDecidable,
  sourceNames, owedInstrument, owedOf, owesCensus, misfiledDoorRequests } from './leads.js'
import { gatherLeads, autoSettle, type LeadsFile } from './scripts/leads-gate.js'
import { ROOT } from './boundary.js'
import { handleOf } from './handle.js'
import { toUuid } from './address.js'

const lead = (source: string, what: string): Lead => ({ source, what, owes: 'evidence' })

// ── AUTO-SETTLE: the kernel's verdict moves a lead; nothing else does, and no lead is dropped ──
const hOf = (text: string): string => handleOf(toUuid(text))
const REFUTE = 'a lead the kernel refutes'
const PROVE = 'a lead the kernel proves'
const NAMES = 'a lead that names two_coins, a sealed theorem'
const fixture = (): LeadsFile => ({
  why: 'fixture', trial: [{ lead: REFUTE }, { lead: PROVE }, { lead: NAMES, boundary: 'two_coins' }], refuted: [{ lead: 'already refuted', killed_by: 'x' }],
})
const sealed = [
  { key: `involution_${hOf(REFUTE)}`, statement: `¬ lead_${hOf(REFUTE)}` },
  { key: `proof_${hOf(PROVE)}`, statement: `lead_${hOf(PROVE)}` },
  { key: 'two_coins', statement: '110 - 108 = 2' },
]
const leadsIn = (r: LeadsFile): string[] => [...r.trial, ...r.refuted, ...(r.proved ?? [])].map((x) => String(x.lead)).sort()

test('autoSettle — involution_<h> : ¬ lead_<h> moves the lead to refuted; naming a sealed key moves nothing', () => {
  const r = fixture()
  const out = autoSettle(r, sealed, () => true)
  assert.equal(out.before, 4)
  assert.equal(out.after, 4)
  assert.deepEqual(leadsIn(out.record), leadsIn(r), 'every lead is still in the record, same text')
  const moved = out.record.refuted.find((x) => x.lead === REFUTE)!
  assert.equal(moved.killed_by, `theorem involution_${hOf(REFUTE)} : ¬ lead_${hOf(REFUTE)}`)
  assert.ok(out.record.trial.some((x) => x.lead === NAMES && x.proved === undefined), 'a lead whose text names two_coins stays in trial: two_coins states another proposition')
  assert.equal(out.record.trial.find((x) => x.lead === PROVE)!.proved, `proof_${hOf(PROVE)}`, 'no proved list, so the proved lead stays in trial carrying the key')
  assert.equal(r.trial.length, 3, 'the input record is not mutated')
})

test('autoSettle — a proved list, when the record has one, receives the proved lead; the count never drops', () => {
  const out = autoSettle({ ...fixture(), proved: [] }, sealed, () => true)
  assert.equal(out.before, out.after)
  assert.deepEqual(out.record.proved!.map((x) => x.lead), [PROVE])
  assert.deepEqual(out.moved.map((m) => m.to).sort(), ['proved', 'refuted'])
})

test('autoSettle — without the kernel\'s yes nothing moves, and a second pass over a settled record is a no-op', () => {
  const none = autoSettle(fixture(), sealed, () => false)
  assert.equal(none.moved.length, 0)
  assert.deepEqual(none.record.trial, fixture().trial)
  const once = autoSettle(fixture(), sealed, () => true)
  const twice = autoSettle(once.record, sealed, () => true)
  assert.equal(twice.moved.length, 0)
  assert.equal(twice.after, once.after)
})

test('a clean census PERMITS — the half a red tree never shows you', () => {
  const c = leadCensus([read('ledger', [], 17), read('expose', [], 23), read('coverage', [], 41)])
  assert.equal(c.ready, true)
  assert.equal(c.open.length, 0)
  assert.deepEqual(c.unmeasured, [])
  // arbitrary figures on purpose: the census sums what it is given and must not be pinned to a live count
  assert.equal(c.settled, 17 + 23 + 41, 'the settled denominator is carried, so zero-open is not an empty tree')
  assert.match(c.why, /may ship/)
})

// UPDATED FOR THE CAPTAIN'S RULE of 2026-09-28 — "release all holding none solved by cross formulas proving each other".
// The claim this test protects is unchanged and is the important half: a settled count NEVER buys off an open lead. What
// changed is WHICH open lead binds — one a cross-formulated theorem could decide. The lead here names a sealed walk, so
// it is decidable and still refuses, exactly as before.
test('ONE held kernel-decidable lead REFUSES the release, however many are settled', () => {
  const c = leadCensus([read('ledger', [lead('ledger', 'the 42-state paired walk is a sealed statement')], 17), read('expose', [], 23)])
  assert.equal(c.ready, false)
  assert.equal(c.open.length, 1)
  assert.equal(c.holding.length, 1, 'a claim about sealed content holds')
  assert.match(c.why, /still in trial/)
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

test('closed refuted and refused stay on leads.md, not open-questions', () => {
  const page = readFileSync(join(ROOT, 'docs', 'open-questions.md'), 'utf8')
  const leads = JSON.parse(readFileSync(join(ROOT, 'lean', 'leads.json'), 'utf8')) as {
    refuted?: { lead: string; killed_by?: string }[]
    refused?: { lead: string; boundary?: string }[]
  }
  const settled = [
    ...(leads.refuted ?? []).filter((r) => r.killed_by && r.lead),
    ...(leads.refused ?? []).filter((r) => r.boundary && r.lead),
  ]
  const leaked = settled.filter((s) => s.lead && page.includes(s.lead.slice(0, 48)))
  assert.deepEqual(leaked.map((s) => s.lead.slice(0, 60)), [],
    'refuted and refused are closed — they belong on docs/leads, not open-questions homework')
})

// ── THE CAPTAIN'S RULE, 2026-09-28: "release all holding none solved by cross formulas proving each other" ───────

test('kernelDecidable — a claim about the ledger HOLDS a release, plurals included', () => {
  for (const what of [
    'the grid breaks at 73 wings',
    'two sealed statements share one principle',
    'the falsifier cache holds stale receipts',
    'predict-and-fill.ts:57 hardcodes an expected principle count the ledger has passed',
    'two_routes_reach_four_hundred_and_thirty_two is alone in its principle',
    'the falsifier ceiling is short by four sealed statements',
    'a wing definition no theorem reaches',
  ]) {
    assert.equal(kernelDecidable({ source: 's', what, owes: 'seal a theorem' }), true, what)
  }
})

// A LEAD NO THEOREM COULD EVER DECIDE could never be settled, so under the old rule it held every release forever.
// The largest open cluster says it in its own text: a signed commit by pathspec is a git act, not a ledger computation.
test('kernelDecidable — a claim about a door, a host or a service does NOT hold', () => {
  for (const what of [
    // VERBATIM FROM THE LIVE CENSUS OF 2026-09-28, because the old fixture was not the string the tree writes. It read
    // "escaped the MCP door 15 times: no door commits a pathspec" and passed on the pathspec clause, so the escape shape
    // itself was never tested — and 31 records in exactly this shape held a release no theorem could release.
    'the tree escaped the MCP door 8 times for the same missing capability: court investigation',
    'the tree escaped the MCP door 2 times for the same missing capability: read lead records by handle from lean/leads.json',
    'the tree escaped the MCP door 15 times: no door commits a pathspec',
    'no MCP door greps theorem keys by word',
    'powo answers HTTP 403 to an identified probe',
    'a credential is required and none is held',
    'wrangler kv namespace create SCHOOL is an owner act',
  ]) {
    assert.equal(kernelDecidable({ source: 's', what, owes: 'build the door' }), false, what)
  }
})

test('leadCensus — a reported lead is counted and named, never hidden', () => {
  const census = leadCensus([{
    source: 'mcp', reached: true, why: null, settled: 0,
    open: [
      { source: 'mcp', what: 'no door commits a pathspec', owes: 'build the door' },
      { source: 'mcp', what: 'a sealed theorem is alone in its principle', owes: 'seal a second' },
    ],
  }])
  assert.equal(census.open.length, 2, 'both stay in the census')
  assert.equal(census.holding.length, 1)
  assert.equal(census.reported.length, 1)
  assert.equal(census.ready, false, 'the decidable one still holds')
})

test('leadCensus — only reported leads left means a release may ship', () => {
  const census = leadCensus([{
    source: 'mcp', reached: true, why: null, settled: 9,
    open: [{ source: 'mcp', what: 'no door reads a generated page', owes: 'build the door' }],
  }])
  assert.equal(census.ready, true, 'no theorem could decide it, so it does not hold')
  assert.match(census.why, /reported without holding/)
  assert.equal(census.open.length, 1, 'and it is still on the record')
})

// AN UNREADABLE SOURCE STILL BLOCKS, because a census nobody took is absent rather than clean — the new rule changes
// which OPEN leads bind, and touches nothing about a reader that failed.
test('leadCensus — an unmeasured source blocks regardless of the new rule', () => {
  const census = leadCensus([{ source: 'x', reached: false, why: 'reader threw', settled: 0, open: [] }])
  assert.equal(census.ready, false)
  assert.match(census.why, /could NOT be read/)
})

// ── WHICH INSTRUMENT COULD SETTLE A LEAD, and the cross-check that keeps the two rules agreeing ────────────────

const held = (what: string): Lead => ({ source: 'ledger', what, owes: 'the sealed theorem that proves what its settlement meant' })

// the five are verbatim from the live census of 2026-09-28, so the classification is argued against real leads
const DECRYPT = held('decrypt skipped verifyEnvelope, so a mutated address still decoded')
const AURA = held('src/aura.ts CSS still pins RAYS = 7, period = 12 + ray*2')
const WIDTH = held('Plan leftover: concurrent width is 14 VE faces, against 24 sealed')
const HONEST = held("trading-shelf.test.ts still hunt honesty by honest.includes('never money')")
const THIN = held('the grid is thin')
const GAP = held('the tree escaped the MCP door 2 times for the same missing capability: read lead records by handle from lean/leads.json')
const QUERY = held('most-searched query "iphone" rings no sealed theorem')

test('a lead whose subject is a shape in the source is classified source, and the artefact is named', () => {
  const o = owedOf(DECRYPT)
  assert.equal(o.instrument, 'source')
  // `verifyEnvelope` carries an interior capital, so it is read as an identifier. `decrypt` is an English word and is
  // NOT read as one — the lead is classified by its camelCase sibling, and that asymmetry is the module's stated floor.
  assert.ok(o.names.includes('verifyEnvelope'), `names ${o.names.join(', ')}`)
  assert.ok(!o.names.includes('decrypt'), 'a lowercase word must not be guessed to be an identifier')
  assert.match(o.why, /owes a code change/)
})

test('a file path and a test file are both source artefacts the kernel cannot read', () => {
  assert.ok(sourceNames(AURA.what).includes('src/aura.ts'))
  assert.ok(sourceNames(HONEST.what).includes('trading-shelf.test.ts'))
  assert.equal(owedInstrument(AURA), 'source')
  assert.equal(owedInstrument(HONEST), 'source')
})

test('a relation among quantities, naming no artefact, is the kernel’s to decide', () => {
  const o = owedOf(WIDTH)
  assert.equal(o.instrument, 'kernel')
  assert.deepEqual(o.numerals, ['14', '24'])
  assert.match(o.why, /the kernel holds the data/)
})

// SOURCE DOMINATES, and this is the test that keeps the count honest. `src/aura.ts still pins RAYS = 7, period = 12`
// carries two numerals AND a filename. Classifying it as kernel would put it in the automatable column, where a
// generator would seal a theorem about 7 and 12 that is true whatever aura.ts does — a green beside an untouched defect.
test('a lead naming both an artefact and quantities is source, not kernel', () => {
  assert.ok(owedOf(AURA).numerals.length >= 2, 'the fixture must carry numerals or it tests nothing')
  assert.equal(owedInstrument(AURA), 'source')
})

test('one quantity and no artefact states no relation, so it is undetermined rather than guessed', () => {
  assert.equal(owedInstrument(held('the roof sits at 22')), 'undetermined')
  assert.equal(owedInstrument(THIN), 'undetermined')
  assert.match(owedOf(THIN).why, /not to be guessed at/)
})

// THE CLASSIFIER MUST BE ABLE TO ANSWER DIFFERENTLY. A function that returns 'source' for everything would pass every
// test above except this one, and it would report an automation ceiling of 0% that no reader could challenge.
test('the classifier separates: a mixed census does not collapse to one class', () => {
  const c = owesCensus([DECRYPT, AURA, WIDTH, HONEST, THIN, GAP, QUERY])
  assert.equal(c.source, 3)
  assert.equal(c.kernel, 1)
  assert.equal(c.undetermined, 1)
  assert.equal(c.door, 1)
  assert.equal(c.corpus, 1)
  assert.equal(new Set(c.rows.map((r) => r.instrument)).size, 5)
})

// THE TWO STRUCTURED RECORDS MUST BE READ AS RECORDS, and this is the test the first draft of the module failed. The gap
// record below names `lean/leads.json`, so prose-reading filed it under source; its siblings naming no file went to
// undetermined, and one mentioning two counts went to kernel. Twenty-five identical door requests, three answers.
test('a gap record owes a door however it is worded, and a file it happens to name does not make it source', () => {
  assert.equal(owedInstrument(GAP), 'door')
  assert.equal(owedInstrument(held('the tree escaped the MCP door 8 times for the same missing capability: court investigation')), 'door')
  assert.match(owedOf(GAP).why, /no theorem is involved/)
})

test('a coverage record owes new content, not a proof about content that exists', () => {
  assert.equal(owedInstrument(QUERY), 'corpus')
  assert.match(owedOf(QUERY).why, /Owes new content/)
})

test('an empty census divides by comparison, not by zero, and claims no ceiling', () => {
  const c = owesCensus([])
  assert.equal(c.automatable, '0.0%')
  assert.equal(c.rows.length, 0)
  assert.equal(c.door, 0)
})

// IT BINDS NO GATE: the leads handed in come back untouched, so no lead can stop holding because it was classified.
test('classification moves nothing — every lead comes back as it went in', () => {
  const given = [DECRYPT, AURA, WIDTH]
  const c = owesCensus(given)
  assert.deepEqual(c.rows.map((r) => r.lead), given)
  assert.equal(c.rows.length, given.length)
})
