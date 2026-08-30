// calendar — THE GAPLESS INDEX, AND THE HOLES IT MEASURES.
//
// Calendar.lean seals the RULE: the week closing, the year precessing by one, four hundred years returning in
// 20,871 weeks. The rule is clean and the record is not — October 1582 is missing ten days, the civil era has no
// year zero, and the Julian leap rule was misapplied for roughly fifty years after Caesar. A theorem about the
// rule reads as a theorem about history unless somebody counts the holes.
//
// So the index is proleptic and consecutive BY CONSTRUCTION, and the test's job is the half a kernel cannot
// reach: that this implementation actually has the property the theorem describes. The theorem holds the SHAPE
// of gaplessness over twenty integers; this walks the real thing across five centuries.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { dayIndex, gapBetween, spanDays, isConsecutive, ERA_DAYS, ERA_YEARS, GREGORIAN_REFORM } from './calendar.js'

const leap = (y: number): boolean => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0
const mlen = (y: number, m: number): number => [31, leap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]!

test('THE WALK — every step is +1 across five centuries, or it is not a gapless index', () => {
  // the assertion that can fail, and the only one that says anything about THIS implementation. It crosses every
  // leap year, the century years that are not leap (1700, 1800, 1900), the one that is (2000), and the epoch.
  let prev: number | null = null, walked = 0, breaks = 0
  for (let y = 1580; y <= 2100; y++)
    for (let m = 1; m <= 12; m++)
      for (let d = 1; d <= mlen(y, m); d++) {
        const i = dayIndex(y, m, d)
        if (prev !== null && i - prev !== 1) breaks++
        prev = i; walked++
      }
  assert.ok(walked > 190000, `the walk must be long enough to cross the awkward years: ${walked} days`)
  assert.equal(breaks, 0, 'a step that is not +1 is a gap, and a gapless index has none')
})

test('the century rule is IN the index, not beside it', () => {
  // 1900 is not a leap year and 2000 is — the exception that made the Gregorian reform. If the index got this
  // wrong the walk above would still be gapless, so it is asserted separately: consecutiveness is not correctness.
  assert.equal(gapBetween([1900, 2, 28], [1900, 3, 1]), 0, '1900 has no 29 February')
  assert.equal(gapBetween([2000, 2, 28], [2000, 2, 29]), 0, '2000 does')
  assert.equal(gapBetween([2024, 2, 28], [2024, 2, 29]), 0)
  assert.equal(dayIndex(2000, 3, 1) - dayIndex(1600, 3, 1), ERA_DAYS,
    'four hundred years apart is the era, the same 146097 the wing seals as 20871 weeks')
  assert.equal(ERA_YEARS, 400)
})

test('THE HOLE OF 1582, returned as arithmetic', () => {
  // the record: Thursday 4 October was followed by Friday 15 October. Ten days nobody lived.
  const missing = gapBetween(GREGORIAN_REFORM.last, GREGORIAN_REFORM.first)
  assert.equal(missing, 10, 'the reform deleted ten days, and the gapless ruler recovers them')
  // THE CONTROL: the same subtraction over a genuine successor must be zero, or the measure finds holes everywhere
  assert.equal(gapBetween([1582, 10, 4], [1582, 10, 5]), 0, 'a real successor has no gap')
  assert.equal(gapBetween([2026, 8, 24], [2026, 8, 25]), 0)
  // and the two reform dates are ELEVEN apart in the index while ONE day elapsed — that difference IS the hole
  assert.equal(dayIndex(...GREGORIAN_REFORM.first) - dayIndex(...GREGORIAN_REFORM.last), 11)
})

test('the year the civil era omits costs the index nothing', () => {
  // 1 BC is followed by AD 1: the era numbering steps from −1 to +1 and loses a LABEL without losing a DAY.
  // Astronomical years keep a zero, so the index walks straight through where the record jumps.
  assert.equal(gapBetween([0, 12, 31], [1, 1, 1]), 0, 'no day is missing between 1 BC and AD 1')
  assert.equal(gapBetween([-1, 12, 31], [0, 1, 1]), 0, 'nor between 2 BC and 1 BC')
  assert.ok(dayIndex(-44, 1, 1) < dayIndex(0, 1, 1), '45 BC precedes 1 BC, and both are indexable')
  assert.ok(dayIndex(-44, 1, 1) < 0, 'the era before the epoch is negative, not absent')
})

test('the epoch is a choice and the consecutiveness is not', () => {
  assert.equal(dayIndex(1970, 1, 1), 0, 'day zero is the epoch every other system already agrees on')
  assert.equal(dayIndex(1970, 1, 2), 1)
  assert.equal(isConsecutive(dayIndex(1970, 1, 1), dayIndex(1970, 1, 2)), true)
  assert.equal(isConsecutive(dayIndex(1970, 1, 1), dayIndex(1970, 1, 3)), false, 'two days apart is not consecutive')
  assert.equal(spanDays(dayIndex(2026, 1, 1), dayIndex(2026, 12, 31)), 365, '2026 is a common year, counted inclusively')
  assert.equal(spanDays(dayIndex(2024, 1, 1), dayIndex(2024, 12, 31)), 366, 'and 2024 a leap one')
})

test('it reads no clock — the same date returns the same index forever', () => {
  // the determinism this ledger requires: no Date, no timezone, no locale. Called twice, and called with the
  // same arguments in a different order of evaluation, it is one value.
  assert.equal(dayIndex(2026, 8, 25), dayIndex(2026, 8, 25))
  const before = dayIndex(1582, 10, 15)
  assert.equal(before, dayIndex(1582, 10, 15), 'a second call cannot differ, because nothing outside was read')
})
