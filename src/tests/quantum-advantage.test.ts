// quantum/advantage — A REPORT MUST NOT FLATTER ITSELF WHERE IT DID NOT MEASURE.
//
// The three ways a per-level advantage report can lie without anybody editing a number:
//   · it fills a level it could not measure with a default, and a zero cost renders as a spectacular result;
//   · it lets a DECLARED figure (2^128 addresses, true by construction) wear the class of a MEASURED one;
//   · it seals a raw timing, which has no fixed point, so the derived layer alternates forever and every
//     reconcile undoes the last one.
// This tree has actually been bitten by the third. Each test below holds one of those shut and can genuinely
// fail — the last one fails the moment somebody writes `opNs` where `opNsDecade` belongs.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  advantageRows, advantageReport, LEVELS, REPORTED_BASELINE, ratioHundredths, renderHundredths,
  decadesAgree, spreadHundredths, marginOf,
  type LevelMeasurement,
} from '../quantum/advantage/index.js'

/** a measurement as the generator hands one in: several independent estimates that AGREED on a decade, unless a
 *  test deliberately supplies estimates that did not */
const m = (
  level: string, opNs: number, opNsDecade: number, ops: number, disagreements = 0,
  estimates: number[] = [opNs, opNs, opNs, opNs, opNs], decades?: number[],
): LevelMeasurement =>
  ({
    level, opNs, opNsDecade, ops, disagreements,
    decades: decades ?? estimates.map(() => opNsDecade),
    estimates,
    costOps: 2048 * 20,
    what: 'a unit of work',
  })

const full = (): LevelMeasurement[] => [
  m('hexbit tile', 26, 1, 12000),
  m('handle', 248, 2, 12000),
  m('uuid', 1144, 3, 12000),
  m('sealed ledger', 1865, 3, 13512),
]

test('every level that was measured produces a row, in the datapath order', () => {
  const rows = advantageRows(full())
  assert.equal(rows.length, LEVELS.length)
  assert.deepEqual(rows.map((r) => r.level), LEVELS.map((l) => l.name))
})

test('A LEVEL THAT WAS NOT MEASURED IS DROPPED, NEVER DEFAULTED — and the report says it is incomplete', () => {
  const partial = full().filter((x) => x.level !== 'uuid')
  const rows = advantageRows(partial)
  assert.equal(rows.length, LEVELS.length - 1)
  assert.ok(!rows.some((r) => r.level === 'uuid'), 'an unmeasured level must not appear at all')
  const report = advantageReport('host', partial)
  assert.equal(report.complete, false, 'a partial sweep must not be able to pass itself off as a full one')
  assert.equal(report.levelsMeasured, LEVELS.length - 1)
  assert.equal(report.levelsDeclared, LEVELS.length)
})

test('a measurement of zero measured NOTHING, so it is refused rather than rendered as a perfect score', () => {
  // 0 ns per operation and 0 executions are the two most flattering numbers in the report; both are the shape a
  // missing measurement takes, and neither may become a row.
  assert.equal(advantageRows([m('uuid', 0, 0, 12000)]).length, 0)
  assert.equal(advantageRows([m('uuid', 1144, 3, 0)]).length, 0)
})

test('REACH IS DECLARED, COST AND FIDELITY ARE MEASURED — the classes never collapse into one', () => {
  for (const r of advantageRows(full())) {
    assert.equal(r.reach.class, 'declared', `${r.level}: 2^n by construction is not a measurement`)
    assert.equal(r.cost.class, 'measured')
    assert.equal(r.fidelity.class, 'measured')
  }
})

test('THE SEALED COST IS THE DECADE, NOT THE RAW TIMING — the row carries no figure that drifts', () => {
  // the same level measured three times as a real host measures it: same decade, three different raw values
  const a = advantageRows([m('handle', 261, 2, 12000)])[0]
  const b = advantageRows([m('handle', 330, 2, 12000)])[0]
  const c = advantageRows([m('handle', 332, 2, 12000)])[0]
  assert.equal(a.cost.opNsDecade, 2)
  assert.equal(a.address, b.address, 'three runs of the same level must fold to ONE address, or the derived layer never reseals')
  assert.equal(b.address, c.address)
  assert.deepEqual(a, c, 'nothing on the row may vary with the raw figure')
  // and a genuine decade change MUST move it — a stable address that never moves is not a seal, it is a constant
  const moved = advantageRows([m('handle', 2610, 3, 12000)])[0]
  assert.notEqual(moved.address, a.address, 'a level that changed order of magnitude must reseal')
})

test('ops-per-second is DERIVED from the cost decade, so the two can never disagree', () => {
  for (const r of advantageRows(full())) assert.equal(r.cost.opsPerSecondDecade, 9 - r.cost.opNsDecade)
})

test('fidelity is stated as a BOUND over its own denominator, never as a proof of zero', () => {
  const r = advantageRows([m('uuid', 1144, 3, 12000, 0)])[0]
  assert.equal(r.fidelity.bound, 12000, 'zero disagreements over N is a bound of one in N')
  assert.match(r.claim, /never a proof of zero/)
  assert.match(r.claim, /12000 executions/)
  // and a real disagreement must be reported as a rate, not swallowed
  const bad = advantageRows([m('uuid', 1144, 3, 12000, 3)])[0]
  assert.equal(bad.fidelity.bound, 4000)
  assert.match(bad.claim, /3 of 12000 executions disagreed/)
})

test('the baseline is REPORTED and its expectation is COMPUTED from the same op count', () => {
  const r = advantageRows([m('uuid', 1144, 3, 12000)])[0]
  // 1000 errors per million over 12000 operations
  assert.equal(r.fidelity.baselineExpected, 12)
  assert.equal(REPORTED_BASELINE.errorsPerMillion, 1000)
})

test('EVERY ROW CITES A SEALED THEOREM BY KEY, so the gate can read the claim it publishes', () => {
  for (const r of advantageRows(full())) {
    assert.ok(r.reach.seals.length > 0)
    assert.ok(r.claim.includes(`theorem ${r.reach.seals}`),
      `${r.level} publishes a sentence that does not cite its own seal — the slim gate would read it UNVERIFIED`)
  }
})

test('the report receipt follows the HOST as well as the rows — two machines cannot share one seal', () => {
  const here = advantageReport('host-a', full())
  const same = advantageReport('host-a', full())
  const there = advantageReport('host-b', full())
  assert.equal(here.receipt, same.receipt, 'the same measurements on the same host must reseal')
  assert.notEqual(here.receipt, there.receipt, '"measured on this host" must be recomputable, so the host is in the fold')
})

test('the honest scope survives in the report itself, not only in a comment', () => {
  const r = advantageReport('host', full())
  assert.match(r.honest, /TypeScript computes|quantum by architecture/i)
  assert.match(r.honest, /usable_gap_is_two_to_eighty/)
  assert.match(r.honest, /n_qubit_dimension/)
  assert.doesNotMatch(r.honest, /no physics quantum advantage/i)
})

test('THE SEAL IS WARRANTED BY AGREEMENT, NOT BY A THRESHOLD — split estimates are refused', () => {
  // the real case from this host: the uuid level reads ~1120 ns, only 1.12x above the 10^3 boundary. Five
  // independent estimates all landing in decade 3 is what makes 10^3 publishable; a threshold on the margin
  // would have refused a figure that is stable in fact, because host noise is one-sided and the floor cannot
  // fall below the true cost.
  const agreed = advantageReport('host', [m('uuid', 1116, 3, 12000, 0, [1116, 1119, 1124, 1101, 1131])])
  assert.deepEqual(agreed.unsealable, [], 'unanimous estimates are exactly what a decade seal needs')

  // and the case that must fail: estimates straddling a boundary. A sibling session measured this shape for
  // real — ten launches reading 9761-10139 ns, splitting six/four across 10^3/10^4.
  const split = advantageReport('host', [
    m('uuid', 9761, 3, 12000, 0, [9761, 9880, 10139, 10021, 9990], [3, 3, 4, 4, 3]),
  ])
  assert.equal(split.unsealable.length, 1, 'a decade that two runs disagree about is a coin flip, not a seal')
  assert.equal(split.unsealable[0].level, 'uuid')
  assert.deepEqual(split.unsealable[0].decades, [3, 3, 4, 4, 3])
})

test('ONE estimate is trivially unanimous, so it does not count as agreement', () => {
  assert.equal(decadesAgree([3]), false, 'a single estimate cannot answer "would the next run seal this too?"')
  assert.equal(decadesAgree([]), false)
  assert.equal(decadesAgree([3, 3, 3]), true)
  assert.equal(decadesAgree([3, 3, 4]), false)
})

test('the row carries the AGREEMENT as its warrant — margin and spread stay computable but unsealed', () => {
  const r = advantageRows([m('uuid', 1116, 3, 12000, 0, [1116, 1119, 1124, 1101, 1131])])[0]
  assert.equal(r.cost.agreedEstimates, 5)
  assert.equal(marginOf(1116, 3), 111, "the margin is still computable — it is just not sealed")
  assert.equal(spreadHundredths([1101, 1131]), 102)
  assert.equal(spreadHundredths([1101, 1131]), 102, '1131/1101 is 1.02x')
})

test('marginOf measures distance to the NEARER boundary, in exact integer hundredths', () => {
  assert.equal(marginOf(1000, 3), 100, 'sitting exactly on the floor of its decade is a margin of 1.00x')
  assert.equal(marginOf(1116, 3), 111, '1116/1000')
  assert.equal(marginOf(9500, 3), 105, '10000/9500 — the nearer boundary is the ceiling here')
  assert.equal(marginOf(3162, 3), 316, 'mid-decade is the furthest a value can be from either edge')
  assert.equal(marginOf(0, 3), 0, 'a measurement of nothing has no margin, and must not divide')
})

test('the integer ratio helpers hold no float', () => {
  assert.equal(ratioHundredths(4, 1), 400)
  assert.equal(renderHundredths(400), '4.00')
  assert.equal(renderHundredths(405), '4.05')
  assert.equal(ratioHundredths(1, 0), 0, 'a zero denominator answers 0 rather than throwing or returning Infinity')
})
