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
import { theoremCountByFile, theoremCasesByFile } from '../index.js'
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
  const leads = tableLeadsFrom(found, theoremCasesByFile(), theoremCountByFile())
  for (const l of leads) {
    assert.ok(l.stated > l.sealed, `${l.file} would not be a lead if it already enumerated`)
    assert.match(l.file, /\.lean$/)
  }
})

// ── THE TABLE METRIC MEASURES ENUMERATED ROWS, NOT THEOREM FILES. Measured 2026-09-02: the sealed side was
// theoremCountByFile(), so a table's ROW COUNT was compared against the number of THEOREMS in its wing — two
// different units, and the difference is what `by decide` is for. It reported 56 wings short, of which 21 had
// already enumerated their table (Editor.lean states 512 and carries 60739 cases across 4 theorems), and its top
// lead asked for 8160 theorems in Os.lean. A gap whose only stated remedy is 8160 theorems stops being read.
test('the sealed side is summed CASES — one theorem enumerating a table closes it', () => {
  const found = [{ wing: 'Editor', object: '512-row table', size: '512' }]
  // four theorems carrying the whole table between them: enumerated, so SILENT
  assert.deepEqual(tableLeadsFrom(found, new Map([['Editor.lean', 60739]]), new Map([['Editor.lean', 4]])), [])
  // the same wing measured by theorem COUNT would report it short — the defect, held here so it cannot return
  const byCount = tableLeadsFrom(found, new Map([['Editor.lean', 4]]), new Map([['Editor.lean', 4]]))
  assert.equal(byCount.length, 1, 'counting theorems instead of cases is what produced 21 false gaps')
  // and a wing that truly states more than it enumerates is STILL a lead, with both numbers reported
  const short = tableLeadsFrom([{ wing: 'Structures', object: '220 rows', size: '220' }],
    new Map([['Structures.lean', 3]]), new Map([['Structures.lean', 3]]))
  assert.equal(short.length, 1)
  assert.equal(short[0]!.sealed, 3, 'the sealed side is the enumerated cases')
  assert.equal(short[0]!.theorems, 3, 'and the theorem split rides along, informative but not the denominator')
  assert.match(short[0]!.owes, /enumerates 3 case\(s\) across 3 theorem\(s\)/, 'the report names both units')
})

test('theoremCasesByFile sums declared cases, and an undeclared theorem counts as its one case', () => {
  const cases = theoremCasesByFile()
  const counts = theoremCountByFile()
  for (const [file, n] of counts)
    assert.ok((cases.get(file) ?? 0) >= n, `${file}: cases can never be fewer than theorems — each is at least one`)
  // and the two indexes DIFFER somewhere, or the change measured nothing
  assert.ok([...counts].some(([f, n]) => (cases.get(f) ?? 0) > n),
    'some wing enumerates more rows than it has theorems — otherwise the units were never distinct')
})

test('lonelyGaps — each gap names a wing-isolated theorem and a connect fix', () => {
  const gaps = lonelyGaps()
  for (const g of gaps.slice(0, 5)) {
    assert.match(g.what, /\bshares no symbol\b/)
    assert.match(g.fix, /connect it/i)
  }
})
