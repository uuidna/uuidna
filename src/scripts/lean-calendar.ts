#!/usr/bin/env node
// Automate the Lean layer for THE CALENDAR — the Gregorian calendar and the seven-day week as decidable arithmetic.
// The week IS the rosette ℤ/7 uuidna already turns on: advance seven days and the day returns. From there the whole
// calendar is counting mod 7 — a common year of 365 days shifts the weekday by one (365 = 52·7 + 1), a leap year by
// two (366 % 7 = 2); the Gregorian leap rule keeps 97 leap years per 400 (every 4th, minus centuries, plus every
// 400th), so 400 years is 146097 days, and 146097 is a whole number of weeks (146097 % 7 = 0) — the calendar repeats
// EXACTLY every 400 years, the same dates on the same weekdays. The doomsday rule falls out: 4/4, 6/6, 8/8, 10/10 and
// 12/12 are all 63 = 9·7 days apart, so they always share a weekday. HONEST SCOPE: calendar arithmetic and mod-7
// congruence — NOT a date library or a proleptic conversion for every locale. COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

const COMMON = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const sum = (a: number[]) => a.reduce((s, n) => s + n, 0)

const FACTS = [
  { key: 'week_is_z7',
    why: 'The week is the rosette ℤ/7: seven days, and advancing by seven returns to the same day — 7 % 7 = 0. The calendar counts in the same ring uuidna turns on.',
    js: () => [0, 1, 2, 3, 4, 5, 6].length === 7 && 7 % 7 === 0,
    lean: 'theorem week_is_z7 : [0,1,2,3,4,5,6].length = 7 ∧ 7 % 7 = 0 := by decide' },

  { key: 'common_year_shifts_one',
    why: 'A common year is 365 = 52·7 + 1 days, so 365 % 7 = 1: every ordinary year the weekday of a fixed date advances by exactly one — New Year walks forward a day a year.',
    js: () => 365 % 7 === 1,
    lean: 'theorem common_year_shifts_one : 365 % 7 = 1 := by decide' },

  { key: 'leap_year_shifts_two',
    why: 'A leap year is 366 days, and 366 % 7 = 2: a fixed date jumps forward TWO weekdays across a leap year — the extra day is the extra shift.',
    js: () => 366 % 7 === 2,
    lean: 'theorem leap_year_shifts_two : 366 % 7 = 2 := by decide' },

  { key: 'leap_years_per_400',
    why: 'The Gregorian rule keeps 97 leap years per 400: every 4th year (100), minus the centuries (4), plus every 400th (1) — 100 − 4 + 1 = 97. Just short of the Julian 100, tuned to the tropical year.',
    js: () => 100 - 4 + 1 === 97,
    lean: 'theorem leap_years_per_400 : 100 - 4 + 1 = 97 := by decide' },

  { key: 'gregorian_cycle_400_years',
    why: 'The whole Gregorian calendar repeats EXACTLY every 400 years: 400·365 + 97 = 146097 days, and 146097 % 7 = 0 — a whole number of weeks, so the same dates fall on the same weekdays, forever.',
    js: () => 400 * 365 + 97 === 146097 && 146097 % 7 === 0,
    lean: 'theorem gregorian_cycle_400_years : 400 * 365 + 97 = 146097 ∧ 146097 % 7 = 0 := by decide' },

  { key: 'century_leap_rule',
    why: 'The century exception, decided: 2000 is a leap year (2000 % 400 = 0) but 1900 is not (1900 % 100 = 0 yet 1900 % 400 ≠ 0) — the rule that made the Gregorian reform, on two famous years.',
    js: () => 2000 % 400 === 0 && 1900 % 100 === 0 && 1900 % 400 !== 0,
    lean: 'theorem century_leap_rule : 2000 % 400 = 0 ∧ 1900 % 100 = 0 ∧ 1900 % 400 ≠ 0 := by decide' },

  { key: 'doomsday_even_months',
    why: 'The doomsday rule for the even months: in a common year 4/4, 6/6, 8/8, 10/10 and 12/12 fall on day-of-year 94, 157, 220, 283, 346 — each 63 = 9·7 apart, so all ≡ 3 (mod 7). Five dates, one weekday, every year.',
    js: () => [94, 157, 220, 283, 346].every((d) => d % 7 === 3),
    lean: 'theorem doomsday_even_months : [94,157,220,283,346].all (fun d => d % 7 == 3) := by decide' },

  { key: 'months_sum_common_365',
    why: 'The twelve months of a common year sum to 365: [31,28,31,30,31,30,31,31,30,31,30,31] folds to 365 — the year closed, February short.',
    js: () => sum(COMMON) === 365,
    lean: 'theorem months_sum_common_365 : [31,28,31,30,31,30,31,31,30,31,30,31].foldl (· + ·) 0 = 365 := by decide' },

  { key: 'months_sum_leap_366',
    why: 'A leap year gives February its 29th and the twelve months sum to 366: [31,29,31,30,31,30,31,31,30,31,30,31] folds to 366 — exactly one more day than the common year.',
    js: () => sum(LEAP) === 366 && sum(LEAP) === sum(COMMON) + 1,
    lean: 'theorem months_sum_leap_366 : [31,29,31,30,31,30,31,31,30,31,30,31].foldl (· + ·) 0 = 366 := by decide' },
]

emit({
  file: 'Calendar.lean',
  header: 'THE CALENDAR — the seven-day week as ℤ/7 and the Gregorian 400-year cycle, as decidable arithmetic.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
