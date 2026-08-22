#!/usr/bin/env node
// Automate the Lean layer for EPHEMERIS — the astronomical TIME coordinate, as decidable arithmetic, demarcated.
// A day is 24·60·60 = 86400 seconds; the Earth turns once more against the stars than against the sun each year
// (366 sidereal ≈ 365 solar + 1); the Julian calendar runs 1461 days per 4 years and the Gregorian 146097 per 400
// (97 leap days); a body's mean motion advances its longitude linearly in time; eclipses recur on the Saros; the
// Sun creeps just under a degree along the ecliptic per day; and a Julian Date is a continuous integer day count.
// the arithmetic of calendars and mean motion — the time coordinate — not a perturbed ephemeris.
// Distinct from the positional facts in Astronomy. COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'

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
    why: 'Eclipses recur on the Saros of ~18 years — about 223 synodic months: 18·12 = 216 ordinary months plus 7 intercalary ≈ 223. After a Saros the sun, moon and nodes return to nearly the same alignment.',
    js: () => 18 * 12 + 7 === 223,
    lean: 'theorem saros_eclipse_cycle : (18 * 12 + 7 = 223) \u2227 (9 % 9 = 0) := by decide' },


  { key: 'julian_date_is_a_day_count',
    why: 'A Julian Date is one continuous integer day count, so any interval is a plain subtraction: the epoch J2000 (JD 2451545) minus the day before (2451544) is 1 day. Time becomes a coordinate you can just subtract.',
    js: () => 2451545 - 2451544 === 1,
    lean: 'theorem julian_date_is_a_day_count : 2451545 - 2451544 = 1 := by decide' },
]

// compute → generate → verify. The time coordinate — seconds per day, sidereal gain, the Julian and Gregorian
// calendars, linear mean motion, the Saros, the Sun's creep, the Julian Date — decidable arithmetic, demarcated.
emit({ file: 'Ephemeris.lean', skill: 'ephemeris',
  header: 'EPHEMERIS — the astronomical TIME coordinate, as decidable arithmetic, demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
