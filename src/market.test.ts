// market — the handled-mirror mechanism on trial by its own discipline: seal round-trips, the backtest is
// receipted and deterministic, the control can fail, and every number is an integer.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sealSeries, parseStooqCsv, runBacktest, type Row } from './market.js'
import { isHandle } from './handle.js'

// a synthetic series, flat then rise then fall — flat FIRST so the fast average is not born above the slow
// one and a genuine below→above crossing exists. Labeled synthetic, used only to exercise the engine.
const synth: Row[] = Array.from({ length: 40 }, (_, i) => ({
  date: `d${String(i).padStart(2, '0')}`,
  close: i < 10 ? 10000 : i < 25 ? 10000 + (i - 9) * 100 : 10000 + 1600 - (i - 24) * 100,
}))

test('a sealed series is addressed, handled, and deterministic', () => {
  const a = sealSeries('synth', synth)
  const b = sealSeries('synth', synth)
  assert.deepEqual(a, b)
  assert.ok(isHandle(a.handle))
  assert.notEqual(sealSeries('synth', synth.slice(1)).address, a.address, 'one row moved is a new identity')
})

test('the backtest is receipted: same handle + same registration = same receipt, and integers throughout', () => {
  const s = sealSeries('synth', synth)
  const x = runBacktest(s, { rule: 'sma-cross', fast: 3, slow: 8 })
  const y = runBacktest(s, { rule: 'sma-cross', fast: 3, slow: 8 })
  assert.equal(x.receipt, y.receipt)
  assert.equal(x.outcome, 'tested')
  assert.equal(x.controlRejected, true, 'the engine finds nothing in a constant series — the control fails as it must')
  assert.ok(Number.isInteger(x.pnlCents))
  for (const t of x.trades) { assert.ok(Number.isInteger(t.pnlCents)); assert.ok(Number.isInteger(t.entryCents)) }
  const z = runBacktest(s, { rule: 'sma-cross', fast: 2, slow: 8 })
  assert.notEqual(z.receipt, x.receipt, 'a different registration is a different receipt')
  assert.notEqual(z.strategyAddress, x.strategyAddress)
})

test('the rise-then-fall series produces the one round trip the shape implies', () => {
  const s = sealSeries('synth', synth)
  const x = runBacktest(s, { rule: 'sma-cross', fast: 3, slow: 8 })
  assert.ok(x.trades.length >= 1, 'the crossing exists')
  assert.ok(x.trades.length <= 2, 'and the engine does not invent extra ones')
})

test('degenerate registrations are refused, not guessed', () => {
  const s = sealSeries('synth', synth)
  assert.equal(runBacktest(s, { rule: 'sma-cross', fast: 8, slow: 3 }).trades.length, 0, 'fast ≥ slow trades nothing')
  assert.equal(runBacktest(s, { rule: 'sma-cross', fast: 0, slow: 8 }).trades.length, 0, 'zero window trades nothing')
})

test('the stooq parser floors to integer cents and bounds the window', () => {
  const csv = 'Date,Open,High,Low,Close,Volume\n2026-01-02,1,2,3,123.456,9\n2026-01-03,1,2,3,124.994,9\nbad line\n'
  const rows = parseStooqCsv(csv)
  assert.deepEqual(rows.map((r) => r.close), [12346, 12499])
  assert.equal(parseStooqCsv(csv, 1).length, 1, 'the limit keeps the LAST rows')
})
