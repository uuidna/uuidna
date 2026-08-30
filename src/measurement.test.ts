// measurement — ONE SHAPE FOR EVERY PUBLISHED FIGURE, tested on the axis that matters: a reader must be able to
// filter by HOW a number was determined. The load-bearing law is the expensive one — a measured time has no fixed
// point across runs and may not be sealed exact, which this tree learned by publishing two coins alternately for
// a run of commits. Each test carries the mutation that breaks it (the falsifiability law in scripts/api.ts).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { filterMeasurements, facets, violations, violationReport, decadeOf, type Measurement } from './measurement.js'

const M: Measurement[] = [
  { subject: 'handle', metric: 'fold cost', value: 330, unit: 'ns', technique: 'measured', sealing: 'decade', over: 4096, source: 'quantum/advantage' },
  { subject: 'handle', metric: 'reach', value: 4294967296, unit: 'states', technique: 'declared', sealing: 'exact', source: 'quantum/advantage' },
  { subject: 'gate', metric: 'device-eligible share', value: 5, unit: 'ppm', technique: 'measured', sealing: 'exact', over: 1, source: 'hardware/lanes' },
  { subject: 'gate', metric: 'kernel share', value: 30, unit: 'percent', technique: 'measured', sealing: 'exact', over: 1, source: 'hardware/lanes' },
  { subject: 'two-qubit gate', metric: 'published error', value: 1000, unit: 'count', technique: 'convention', sealing: 'exact', source: 'REPORTED_BASELINE' },
]

test('a reader can ask for only what was actually MEASURED — the filter every honest surface needs', () => {
  const measured = filterMeasurements(M, { technique: 'measured' })
  assert.equal(measured.length, 3)
  assert.ok(!measured.some((m) => m.technique === 'declared'), 'a declared figure must never survive a measured filter')
  // THE MUTATION: reach is the row most tempted to read as a measurement. If `declared` ever leaked into this
  // set, the surface would be publishing a construction as an observation — the exact substitution the advantage
  // module refuses in its own words.
  assert.ok(filterMeasurements(M, { technique: 'declared' }).every((m) => m.metric === 'reach'))
})

test('axes compose, and an omitted axis filters nothing', () => {
  assert.equal(filterMeasurements(M).length, M.length, 'no filter is not an empty filter')
  assert.equal(filterMeasurements(M, { subject: 'gate' }).length, 2)
  assert.equal(filterMeasurements(M, { technique: 'measured', unit: ['ppm', 'percent'] }).length, 2)
  assert.equal(filterMeasurements(M, { technique: 'convention', subject: 'gate' }).length, 0, 'composed axes intersect, never union')
})

test('minOver demands the denominator a bound was taken over', () => {
  // a bound is only as strong as its count, so "show me figures taken over at least 1000 operations" must be
  // askable — otherwise a surface can present a one-shot reading beside a 4096-sample floor as equals
  const strong = filterMeasurements(M, { minOver: 1000 })
  assert.deepEqual(strong.map((m) => m.metric), ['fold cost'])
  assert.equal(filterMeasurements(M, { minOver: 1 }).length, 3, 'figures with no `over` at all are not silently promoted')
})

test('a filter is a VIEW and never reorders — a reordering view invents a ranking nobody expressed', () => {
  const all = filterMeasurements(M, {})
  assert.deepEqual(all.map((m) => m.metric), M.map((m) => m.metric))
})

test('facets are built from the DATA, so a new unit can never go missing from a control', () => {
  const f = facets(M)
  assert.deepEqual([...f.technique].sort(), ['convention', 'declared', 'measured'])
  assert.deepEqual([...f.subject].sort(), ['gate', 'handle', 'two-qubit gate'])
  // the mutation a hand-kept list would fail: add a figure in a unit no control knew about
  const widened = facets([...M, { subject: 'x', metric: 'y', value: 1, unit: 'ratio', technique: 'declared', sealing: 'exact', source: 's' }])
  assert.ok(widened.unit.includes('ratio'), 'a facet list that misses a present value is a control that hides data')
})

test('THE EXPENSIVE LAW — a measured time sealed exact is NAMED, and the healthy tree is silent', () => {
  assert.deepEqual(violations(M), [], 'the fixture is lawful, so the auditor must say nothing about it')
  // this is the exact shape that flip-flopped README.md and lean/quantum-capacity.* between two coins
  const bad: Measurement = { subject: 'ledger', metric: 'fold cost', value: 330, unit: 'ns', technique: 'measured', sealing: 'exact', source: 'gen-quantum-capacity' }
  const v = violations([bad])
  assert.equal(v.length, 1)
  assert.match(v[0]!.law, /may not be sealed exact/)
  // and the same figure sealed as its DECADE is lawful — the cure, not merely the complaint
  assert.deepEqual(violations([{ ...bad, sealing: 'decade' }]), [])
})

test('a measured figure with no denominator is a claim wearing an observation’s clothes', () => {
  const v = violations([{ subject: 's', metric: 'm', value: 1, unit: 'count', technique: 'measured', sealing: 'exact', over: 0, source: 'x' }])
  assert.equal(v.length, 1)
  assert.match(v[0]!.law, /no denominator/)
})

test('decadeOf is integer arithmetic — the determinism scan admits no host Math call anywhere', () => {
  assert.equal(decadeOf(0), 0)
  assert.equal(decadeOf(9), 0)
  assert.equal(decadeOf(10), 1)
  assert.equal(decadeOf(330), 2)
  assert.equal(decadeOf(10662), 4)
  // the two figures whose decade boundary cost this tree a run of commits: 10662 and 48 are decades apart,
  // which is why one pass of a cold generator could straddle it
  assert.notEqual(decadeOf(10662), decadeOf(48))
})

// ── THE COLLAPSE I BUILT tensionReport TO REFUSE, AND THEN REPRODUCED HERE (2026-08-25). violations([]) and
// violations([all lawful]) both return [], so the healthy case and the unasked case are one value. A peer named
// the shape — an instrument narrower than its own question, reporting the collapse as a pass — and it caught this
// file within minutes. Knowing the shape is not the same as checking for it.
test('an empty result over an empty input reports itself UNCHECKED, never clean', () => {
  const r = violationReport([])
  assert.deepEqual(r.violations, [])
  assert.equal(r.checkable, false)
  assert.equal(r.checked, 0)
  assert.match(r.honest, /NOT CHECKABLE/)
  assert.match(r.honest, /never a clean bill of health/)
})

test('a checked-and-clean list is DIFFERENT from an unchecked one, which is the whole point', () => {
  const clean = violationReport(M)
  assert.deepEqual(clean.violations, [], 'the fixture is lawful')
  assert.equal(clean.checkable, true, 'and it was actually checked — the distinction the bare array cannot carry')
  assert.match(clean.honest, /checked 5 measurement\(s\); 0 breach\(es\)/)
  // CONTROL — a real breach must still be counted and named, or the report is only reassuring
  const bad = violationReport([{ subject: 'ledger', metric: 'fold cost', value: 330, unit: 'ns', technique: 'measured', sealing: 'exact', source: 'x' }])
  assert.equal(bad.violations.length, 1)
  assert.equal(bad.checkable, true)
  assert.match(bad.honest, /1 breach\(es\)/)
})
