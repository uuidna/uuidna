// gap-survey — boundary law, table leads, lonely gaps, and kernel bucket citations.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  BOUNDARY_POINTER, BOUNDARY_THEOREMS, allBoundaryTheoremsSealed,
  boundaryCitation, hasBoundaryPointer, bareBoundaryProse,
  gapSurvey, tableLeadsFrom, tableFileOf, lonelyGaps,
} from '../gap-survey.js'
import { theoremCountByFile } from '../index.js'
import { ROOT } from '../boundary.js'

test('every cited boundary law key is sealed in the live ledger', () => {
  assert.deepEqual(allBoundaryTheoremsSealed(), [])
})

test('boundaryCitation points at a theorem — never restates scope', () => {
  for (const key of Object.values(BOUNDARY_THEOREMS)) {
    const line = boundaryCitation(key)
    assert.match(line, new RegExp(`theorem ${key}`))
    assert.ok(hasBoundaryPointer(line))
    assert.equal(bareBoundaryProse(line), false)
  }
})

test('bare boundary prose without a theorem pointer is unlawful surface prose', () => {
  // THE FIXTURE MOVED WITH THE PHRASE. This example used to lead with a label that has been purged from the
  // tree, and the sweep rewrote the fixture along with everything else — leaving a test asserting that a string
  // triggers a detector which no longer looks for it. The LAW is unchanged (boundary prose must point at a
  // sealed theorem); only the trigger it demonstrates had to become one that still exists.
  assert.equal(bareBoundaryProse('NOT PROVEN: not physics, not money'), true)
  assert.equal(bareBoundaryProse(`integrity only. ${boundaryCitation(BOUNDARY_THEOREMS.integrity)}`), false)
})

test('gap survey kernel buckets cite theorems — no free-standing boundary prose', () => {
  const s = gapSurvey(ROOT)
  for (const b of s.kernelOnly) {
    assert.ok(hasBoundaryPointer(b.note), `${b.kind} note must cite a sealed theorem`)
    // was a check that the note did not lead with the purged label; the label is gone tree-wide, so what
    // remains worth asserting is the pointer above — a note that cites nothing is the finding, not a note that
    // uses a particular word.
    assert.equal(bareBoundaryProse(b.note), false, `${b.kind} note must not be bare boundary prose`)
  }
  for (const b of s.automatable.filter((x) => x.kind !== 'guard-heal')) {
    if (b.note) assert.ok(hasBoundaryPointer(b.note), `${b.kind} note must cite a sealed theorem`)
  }
})

test('MCP lawful pointer matches boundary-law', () => {
  assert.equal(BOUNDARY_POINTER, boundaryCitation(BOUNDARY_THEOREMS.harmony))
})

test('a stating wing shorter than its table is a lead; an enumerating wing is silent', () => {
  const counts = new Map([['Spectrum.lean', 2], ['Sailing.lean', 32]])
  const found = [
    { wing: 'Spectrum', object: 'seven EM bands', size: '35' },
    { wing: 'Sailing', object: '32-point rose', size: '32' },
  ]
  const leads = tableLeadsFrom(found, counts)
  assert.equal(leads.length, 1)
  assert.equal(leads[0]!.file, 'Spectrum.lean')
  assert.equal(leads[0]!.stated, 35)
  assert.equal(leads[0]!.sealed, 2)
  assert.equal(tableFileOf('Os'), 'Os.lean')
})

test('live tables.found is read, never copied — the finder names the short wings', () => {
  const ledger = JSON.parse(readFileSync(join(ROOT, 'lean/leads.json'), 'utf8')) as {
    tables?: { found?: { wing: string; object: string; size: string }[] }
  }
  const found = ledger.tables?.found ?? []
  assert.ok(found.length > 0, 'the tables record names finite objects')
  const leads = tableLeadsFrom(found, theoremCountByFile())
  for (const l of leads) {
    assert.ok(l.stated > l.sealed, `${l.file} would not be a lead if it already enumerated`)
    assert.match(l.file, /\.lean$/)
  }
})

test('lonelyGaps — each gap names a wing-isolated theorem and a connect fix', () => {
  const gaps = lonelyGaps()
  for (const g of gaps.slice(0, 5)) {
    assert.match(g.what, /\bshares no symbol\b/)
    assert.match(g.fix, /connect it/i)
  }
})
