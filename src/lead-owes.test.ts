import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sourceNames, owedInstrument, owedOf, owesCensus } from './lead-owes.js'
import type { Lead } from './leads.js'

const lead = (what: string): Lead => ({ source: 'ledger', what, owes: 'the sealed theorem that proves what its settlement meant' })

// the five are verbatim from the live census of 2026-09-28, so the classification is argued against real leads
const DECRYPT = lead('decrypt skipped verifyEnvelope, so a mutated address still decoded')
const AURA = lead('src/aura.ts CSS still pins RAYS = 7, period = 12 + ray*2')
const WIDTH = lead('Plan leftover: concurrent width is 14 VE faces, against 24 sealed')
const HONEST = lead("trading-shelf.test.ts still hunt honesty by honest.includes('never money')")
const THIN = lead('the grid is thin')
const GAP = lead('the tree escaped the MCP door 2 times for the same missing capability: read lead records by handle from lean/leads.json')
const QUERY = lead('most-searched query "iphone" rings no sealed theorem')

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
  assert.equal(owedInstrument(lead('the roof sits at 22')), 'undetermined')
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
  assert.equal(owedInstrument(lead('the tree escaped the MCP door 8 times for the same missing capability: court investigation')), 'door')
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
