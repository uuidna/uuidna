import { test } from 'node:test'
import assert from 'node:assert/strict'
import { BUDGETS, timeNs, timingCensus, hostArch, calibrationNs } from './index.js'
import { valueOf } from '../../hexbit/index.js'

const ops = [{ op: 'handle.valueOf', run: () => valueOf('deadbeef').value }]

test('the census names the host, because a verdict about speed is a verdict about a machine', () => {
  const a = hostArch()
  assert.ok(a.platform.length > 0 && a.arch.length > 0)
  const c = timingCensus(ops)
  assert.deepEqual(c.arch, a)
  assert.ok(c.calibrationNs > 0, 'the calibration must measure something')
})

// ── WHAT MAY BE SEALED AND WHAT MAY NOT ──────────────────────────────────────────────────────────────────────
// Every other measurement in this tree folds its VALUE into its receipt, so recomputing reproduces the address.
// A duration cannot: the same code on the same tree gives a different number every run, and a receipt over it
// would move without anything changing. So the verdict is sealed and the nanoseconds are only reported.
test('durations differ between runs and the receipt does NOT', () => {
  const a = timingCensus(ops)
  const b = timingCensus(ops)
  assert.equal(a.receipt, b.receipt, 'op, budget and verdict are what the fold covers')
  assert.ok(a.timings[0]!.ns > 0 && b.timings[0]!.ns > 0, 'and the durations are still reported')
})

test('CONTROL — a budget that cannot be met is NAMED, and moves the receipt', () => {
  const clean = timingCensus(ops)
  const budget = BUDGETS.find((b) => b.op === 'handle.valueOf')!
  const saved = budget.ratio
  try {
    Object.defineProperty(budget, 'ratio', { value: 0.0001, writable: true, configurable: true })
    const crack = timingCensus(ops)
    assert.equal(crack.within, false, 'an op over budget is not "within"')
    assert.deepEqual(crack.cracks, ['handle.valueOf'], 'and it is named, never averaged away')
    assert.notEqual(crack.receipt, clean.receipt, 'a changed verdict must move the address')
  } finally {
    Object.defineProperty(budget, 'ratio', { value: saved, writable: true, configurable: true })
  }
})

test('CONTROL — an op with no declared budget is REFUSED, not silently passed', () => {
  assert.throws(() => timingCensus([{ op: 'not.declared', run: () => 1 }]), /no declared budget/,
    'a timing with nothing to fail against is a number, not a verdict')
})

test('CONTROL — an average over nothing is refused', () => {
  assert.throws(() => timeNs(() => 1, 0), /at least 1/)
})

test('budgets are RATIOS, so the claim survives a slower machine', () => {
  // the same work measured against the same calibration: a host half as fast stretches both, and the ratio holds.
  const unit = calibrationNs()
  assert.ok(unit > 0)
  for (const b of BUDGETS) {
    assert.ok(b.ratio > 0, `${b.op} has a positive budget`)
    assert.ok(b.why.length > 20, `${b.op} says why, so the number can be argued with`)
  }
  const c = timingCensus(ops)
  assert.ok(c.timings[0]!.units > 0, 'the verdict is taken in units, not nanoseconds')
})
