// population-census — the instrument must SEE a disagreement, and must not call an unreadable surface agreeable.
//
// The census exists because six gate failures on 2026-09-07 were one fact — a wing grew the population and five
// derived surfaces were counting the old one. So the tests that matter are not "it returns five numbers": they are
// that a PLANTED disagreement is reported, and that a surface the reader fails to open (a host fact: the file is
// absent or unreadable) comes back UNMEASURED rather than silently matching. A census whose failure mode is silence would reproduce the defect it was built to end.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { populationCensus, populationReport } from './population-census.js'

const ROOT = join(import.meta.dirname, '..')

/** a throwaway tree with a chosen population on every surface — the shared tree is never the fixture */
function fixture(counts: { wings: number; ledger: number; axioms: number; falsifiers: number; heartbeats: number }): string {
  const root = mkdtempSync(join(tmpdir(), 'uuidna-pop-'))
  mkdirSync(join(root, 'lean')); mkdirSync(join(root, 'src'), { recursive: true })
  writeFileSync(join(root, 'lean', 'A.lean'),
    Array.from({ length: counts.wings }, (_, i) => `theorem t${i} : 1 = 1 := by decide`).join('\n') + '\n')
  mkdirSync(join(root, 'src', 'theorems'), { recursive: true })
  writeFileSync(join(root, 'src', 'theorems', 'generated.ts'),
    Array.from({ length: counts.ledger }, (_, i) => `  { key: "t${i}", name: "n" },`).join('\n') + '\n')
  writeFileSync(join(root, 'lean', 'axioms.json'), JSON.stringify({ audited: counts.axioms }))
  writeFileSync(join(root, 'src', 'falsifiers.test.ts'),
    Array.from({ length: counts.falsifiers }, (_, i) => `  ["t${i}", "1 = 1", "A.lean"],`).join('\n') + '\n')
  writeFileSync(join(root, 'lean', 'heartbeats.json'), JSON.stringify({
    costs: Object.fromEntries(Array.from({ length: counts.heartbeats }, (_, i) => [`a${i}`, 1])) }))
  return root
}

test('a tree whose surfaces all carry the same population AGREES', () => {
  const c = populationCensus(fixture({ wings: 7, ledger: 7, axioms: 7, falsifiers: 7, heartbeats: 7 }))
  assert.equal(c.truth, 7, 'the wings are the source every other surface derives from')
  assert.deepEqual(c.disagreeing, [], 'nothing parts from the wings')
  assert.deepEqual(c.unmeasured, [], 'and every surface was read')
  assert.equal(c.agree, true)
})

test('THE PLANTED DISAGREEMENT — a surface counting the old population is NAMED, with its shortfall', () => {
  // exactly the shape of 2026-09-07: the wings grew, one derived surface did not
  const c = populationCensus(fixture({ wings: 9, ledger: 9, axioms: 7, falsifiers: 9, heartbeats: 9 }))
  assert.equal(c.agree, false, 'a census that called this agreement would be the defect it exists to end')
  assert.equal(c.disagreeing.length, 1)
  assert.match(c.disagreeing[0]!.surface, /axiom witness/)
  assert.equal(c.disagreeing[0]!.count, 7)
  assert.match(populationReport(c), /BEHIND by 2/, 'and the report names the shortfall, not merely the mismatch')
})

test('AN UNREADABLE SURFACE IS UNMEASURED, never agreement', () => {
  const root = mkdtempSync(join(tmpdir(), 'uuidna-pop-empty-'))
  mkdirSync(join(root, 'lean'))
  writeFileSync(join(root, 'lean', 'A.lean'), 'theorem t0 : 1 = 1 := by decide\n')
  // every other surface is absent
  const c = populationCensus(root)
  assert.equal(c.truth, 1, 'the wings still answer')
  assert.equal(c.unmeasured.length, 4, 'the four absent surfaces are UNMEASURED')
  assert.equal(c.agree, false,
    'unreadable is not agreeable — an absent file and a matching one both produce silence, and only the third '
    + 'state separates them. This is the same rule as lead 234 and it is why that arm exists here at birth.')
  for (const u of c.unmeasured) assert.ok(u.why && u.why.length > 0, `${u.surface} says WHY it could not be read`)
  assert.match(populationReport(c), /UNMEASURED/)
})

test('and over the real tree it answers, with the wings as the source', () => {
  const c = populationCensus(ROOT)
  assert.ok((c.truth ?? 0) > 5000, 'this ledger holds thousands of theorems')
  assert.equal(c.unmeasured.length, 0, 'every surface in the live tree is readable')
  // NOT asserted: that they agree. A measurement in flight legitimately leaves heartbeats behind, and a test
  // that demanded agreement here would fail for a running sync rather than for a defect. The gates own that
  // judgement; this census owns the REPORT.
  for (const s of c.surfaces) assert.ok(s.count === null || s.count > 0, `${s.surface} carries a population`)
})
