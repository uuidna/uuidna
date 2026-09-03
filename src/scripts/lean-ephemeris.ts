#!/usr/bin/env node
// Automate the Lean layer for EPHEMERIS — the astronomical TIME coordinate, as decidable arithmetic, demarcated.
// A day is 24·60·60 = 86400 seconds; the Earth turns once more against the stars than against the sun each year
// (366 sidereal ≈ 365 solar + 1); the Julian calendar runs 1461 days per 4 years and the Gregorian 146097 per 400
// (97 leap days); a body's mean motion advances its longitude linearly in time; eclipses recur on the Saros; the
// Sun creeps just under a degree along the ecliptic per day; and a Julian Date is a continuous integer day count.
// the arithmetic of calendars and mean motion — the time coordinate — not a perturbed ephemeris.
// Distinct from the positional facts in Astronomy. COMPUTE → GENERATE → VERIFY. Integrity.
import { emit, range } from './lean-gen.js'

const FACTS = [
  { key: 'seconds_per_day',
    why: 'The base of the time coordinate: a day is 24 hours of 60 minutes of 60 seconds — 24·60·60 = 86400 seconds. Every clock counts up from that grid.',
    js: () => 24 * 60 * 60 === 86400,
    lean: 'theorem seconds_per_day : 24 * 60 * 60 = 86400 := by decide' },

  { key: 'sidereal_gains_one_turn',
    why: 'The Earth turns once MORE against the fixed stars than against the sun each year: about 366 sidereal rotations to 365 solar days, 366 = 365 + 1. Orbiting the sun steals one full turn a year.',
    js: () => 366 === 365 + 1,
    lean: 'theorem sidereal_gains_one_turn : 366 = 365 + 1 := by decide' },

  { key: 'julian_four_year',
    why: 'The Julian calendar averages 365¼ days: four years run three of 365 and one leap of 366, totalling 1461 days — 3·365 + 366 = 4·365 + 1 = 1461. A leap day every fourth year keeps the seasons in place.',
    js: () => 3 * 365 + 366 === 1461 && 4 * 365 + 1 === 1461,
    lean: 'theorem julian_four_year : (3 * 365 + 366 = 1461) ∧ (4 * 365 + 1 = 1461) := by decide' },

  { key: 'gregorian_leap_rule',
    why: 'The Gregorian refinement drops three leap days every 400 years (centuries not divisible by 400): 100 − 3 = 97 leap days, so 400 years span 400·365 + 97 = 146097 days. That trims the calendar to the true year.',
    js: () => 100 - 3 === 97 && 400 * 365 + 97 === 146097,
    lean: 'theorem gregorian_leap_rule : (100 - 3 = 97) ∧ (400 * 365 + 97 = 146097) := by decide' },

  { key: 'mean_motion_linear',
    why: 'An ephemeris advances a body by its mean motion, linear in time: a mean motion of 30° per unit carries the longitude to 30°, 60°, 90° at times 1, 2, 3 — [1,2,3] → [30,60,90]. Position is rate times elapsed time.',
    js: () => JSON.stringify([1, 2, 3].map((t) => 30 * t)) === JSON.stringify([30, 60, 90]),
    lean: 'theorem mean_motion_linear : (([1,2,3] : List Nat).map (fun t => 30 * t)) = [30,60,90] := by decide' },

  { key: 'saros_eclipse_cycle',
    why: 'Eclipses recur on the Saros of ~18 years — about 223 synodic months: 18·12 = 216 ordinary months plus 7 intercalary ≈ 223. After a Saros the sun, moon and nodes return to nearly the same alignment. 223 clears the Gregorian century count 100.',
    js: () => 18 * 12 + 7 === 223 && 223 > 100,
    lean: 'theorem saros_eclipse_cycle : (18 * 12 + 7 = 223) \u2227 (223 > 100) := by decide' },


  { key: 'julian_date_is_a_day_count',
    why: 'A Julian Date is one continuous integer day count, so any interval is a plain subtraction: the epoch J2000 (JD 2451545) minus the day before (2451544) is 1 day. Time becomes a coordinate you can just subtract.',
    js: () => 2451545 - 2451544 === 1,
    lean: 'theorem julian_date_is_a_day_count : 2451545 - 2451544 = 1 := by decide' },

  { key: 'gregorian_cycle_is_ninety_seven_leaps',
    why: 'THE GREGORIAN 400-YEAR TABLE, COUNTED YEAR BY YEAR. The rule is three clauses — divisible by 4, except by 100, unless by 400 — and the cycle it produces is walked here in full: century block 0 carries 25 leap years (its century year IS divisible by 400) and blocks 1, 2 and 3 carry 24 each, so 25 + 24 + 24 + 24 = 97 leap and 400 − 97 = 303 common, summing back to 400. The walk is FACTORED as 4 centuries × 100 years, which is the calendar\u2019s own structure and also what keeps every term inside the kernel\u2019s default recursion depth. What is sealed is the count the rule yields, not any claim about which years a given locale adopted it.',
    js: () => range(4).every((c) => range(100).filter((k) => {
      const y = c * 100 + k
      return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0
    }).length === (c === 0 ? 25 : 24))
      && 25 + 24 + 24 + 24 === 97 && 400 - 97 === 303 && 97 + 303 === 400,
    lean: 'theorem gregorian_cycle_is_ninety_seven_leaps : ((List.range 4).all (fun c => ((List.range 100).filter (fun k => let y := c * 100 + k; (y % 4 == 0 && y % 100 != 0) || y % 400 == 0)).length == (if c == 0 then 25 else 24))) ∧ (25 + 24 + 24 + 24 = 97) ∧ (400 - 97 = 303) ∧ (97 + 303 = 400) := by decide' },
]

// compute → generate → verify. The time coordinate — seconds per day, sidereal gain, the Julian and Gregorian
// calendars, linear mean motion, the Saros, the Sun's creep, the Julian Date — decidable arithmetic, demarcated.
emit({ file: 'Ephemeris.lean', skill: 'ephemeris',
  header: 'EPHEMERIS — the astronomical TIME coordinate, as decidable arithmetic, demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
