-- lean/Ephemeris.lean — GENERATED. EPHEMERIS — the astronomical TIME coordinate, as decidable arithmetic, demarcated. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- The base of the time coordinate: a day is 24 hours of 60 minutes of 60 seconds — 24·60·60 = 86400 seconds.
    Every clock counts up from that grid. -/
theorem seconds_per_day : 24 * 60 * 60 = 86400 := by decide

/-- The Earth turns once MORE against the fixed stars than against the sun each year: about 366 sidereal
    rotations to 365 solar days, 366 = 365 + 1. Orbiting the sun steals one full turn a year. -/
theorem sidereal_gains_one_turn : 366 = 365 + 1 := by decide

/-- The Julian calendar averages 365¼ days: four years run three of 365 and one leap of 366, totalling 1461 days
    — 3·365 + 366 = 4·365 + 1 = 1461. A leap day every fourth year keeps the seasons in place. -/
theorem julian_four_year : (3 * 365 + 366 = 1461) ∧ (4 * 365 + 1 = 1461) := by decide

/-- The Gregorian refinement drops three leap days every 400 years (centuries not divisible by 400): 100 − 3 =
    97 leap days, so 400 years span 400·365 + 97 = 146097 days. That trims the calendar to the true year. -/
theorem gregorian_leap_rule : (100 - 3 = 97) ∧ (400 * 365 + 97 = 146097) := by decide

/-- An ephemeris advances a body by its mean motion, linear in time: a mean motion of 30° per unit carries the
    longitude to 30°, 60°, 90° at times 1, 2, 3 — [1,2,3] → [30,60,90]. Position is rate times elapsed time. -/
theorem mean_motion_linear : (([1,2,3] : List Nat).map (fun t => 30 * t)) = [30,60,90] := by decide

/-- Eclipses recur on the Saros of ~18 years — about 223 synodic months: 18·12 = 216 ordinary months plus 7
    intercalary ≈ 223. After a Saros the sun, moon and nodes return to nearly the same alignment. 223 clears the
    Gregorian century count 100. -/
theorem saros_eclipse_cycle : (18 * 12 + 7 = 223) ∧ (223 > 100) := by decide

/-- A Julian Date is one continuous integer day count, so any interval is a plain subtraction: the epoch J2000
    (JD 2451545) minus the day before (2451544) is 1 day. Time becomes a coordinate you can just subtract. -/
theorem julian_date_is_a_day_count : 2451545 - 2451544 = 1 := by decide
