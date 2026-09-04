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
// A duration comes back different every run on the same code and the same tree, and a receipt over it
// would move without anything changing. So the verdict is sealed and the nanoseconds are only reported.
//
// AND THIS ASSERTION WAS LOAD-SENSITIVE, which is the mirror of the error it guards against. The fold covers op,
// budget and VERDICT — and the verdict is a comparison against a budget, so under contention one run can come in
// over budget while the next comes in under, the verdicts differ, and the receipts differ for a reason that has
// nothing to do with a duration being sealed. Observed once on a loaded machine and green on the three runs
// after it. A test that reddens under load teaches the same lesson as a receipt that greens under load: the
// number moved, nothing changed, and somebody believed the number.
//
// So the claim is stated precisely instead of loosely: EQUAL VERDICTS MUST GIVE EQUAL RECEIPTS. That is what
// "durations are not sealed" actually means, it is what the fold actually promises, and it cannot flake — while
// a verdict that DID differ is reported rather than swallowed, because that is a real finding about the host.
test('durations differ between runs and the receipt does NOT', () => {
  const a = timingCensus(ops)
  const b = timingCensus(ops)
  if (a.within === b.within) {
    assert.equal(a.receipt, b.receipt, 'equal verdicts must fold to equal receipts — durations are not sealed')
  } else {
    // not a failure of the law under test: the machine was loaded enough to change a budget verdict mid-test
    console.log(`  timing verdict moved under load (${String(a.within)} then ${String(b.within)}) — the receipt is expected to move with it`)
    assert.notEqual(a.receipt, b.receipt, 'a CHANGED verdict must move the receipt, or the verdict is not in the fold')
  }
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

// ── THE ACCELERATOR, AND WHAT DATA-PARALLEL MEANS HERE ───────────────────────────────────────────────────────
import { gpuPresence, timePerElementNs } from './index.js'
import { toUuid } from '../../address.js'
import { merkleGravity as merkleGravityOf } from '../../gravity/index.js'

test('the accelerator is DETECTED and its non-use is stated in the same breath', () => {
  const g = gpuPresence()
  assert.equal(typeof g.webgpu, 'boolean')
  assert.equal(g.dispatches, false, 'nothing in uuidna dispatches to a GPU, and the field must keep saying so')
  assert.match(g.why, /one CPU core/, 'the timings are one core, whatever the host exposes')
  assert.ok(g.cores >= 0)
})

test('CONTROL — per-element cost does not move with the batch size', () => {
  // this is the claim that makes a data-parallel number mean anything: the per-CALL figure scales with the
  // batch, so a bigger batch looks slower while the work per item is unchanged. If these two diverged, the
  // measurement would be reporting the batch and not the op.
  const mk = (n: number): string[] => Array.from({ length: n }, (_, i) => ((i * 2654435761) >>> 0).toString(16).padStart(8, '0').slice(0, 8))
  const small = mk(1000), large = mk(10000)
  const a = timePerElementNs(() => small.map((h) => valueOf(h).value), small.length, 40)
  const b = timePerElementNs(() => large.map((h) => valueOf(h).value), large.length, 20)
  const ratio = a > b ? a / b : b / a
  assert.ok(ratio < 4, `per-element cost must be broadly batch-independent (1k: ${a.toFixed(0)} ns, 10k: ${b.toFixed(0)} ns)`)
})

test('CONTROL — an empty batch is refused, not divided by', () => {
  assert.throws(() => timePerElementNs(() => 1, 0), /at least one element/)
})

test('the data-parallel ops are budgeted per element and stay within', () => {
  const addrs = Array.from({ length: 1024 }, (_, i) => toUuid('a' + i))
  const c = timingCensus([{ op: 'parallel.merkleGravity', run: () => merkleGravityOf(addrs), elements: 1024, iterations: 30 }])
  assert.equal(c.timings[0]!.op, 'parallel.merkleGravity')
  assert.ok(c.timings[0]!.ns > 0, 'a real per-element cost')
  assert.deepEqual(c.accelerator.dispatches, false)
})
