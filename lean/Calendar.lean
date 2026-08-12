-- lean/Calendar.lean — GENERATED. THE CALENDAR — the seven-day week as ℤ/7 and the Gregorian 400-year cycle, as decidable arithmetic. Every proof `by decide`, sorry-free, no Mathlib.

-- The week is the rosette ℤ/7: seven days, and advancing by seven returns to the same day — 7 % 7 = 0. The calendar counts in the same ring uuidna turns on.
theorem week_is_z7 : [0,1,2,3,4,5,6].length = 7 ∧ 7 % 7 = 0 := by decide

-- A common year is 365 = 52·7 + 1 days, so 365 % 7 = 1: every ordinary year the weekday of a fixed date advances by exactly one — New Year walks forward a day a year.
theorem common_year_shifts_one : 365 % 7 = 1 := by decide

-- A leap year is 366 days, and 366 % 7 = 2: a fixed date jumps forward TWO weekdays across a leap year — the extra day is the extra shift.
theorem leap_year_shifts_two : 366 % 7 = 2 := by decide

-- The Gregorian rule keeps 97 leap years per 400: every 4th year (100), minus the centuries (4), plus every 400th (1) — 100 − 4 + 1 = 97. Just short of the Julian 100, tuned to the tropical year.
theorem leap_years_per_400 : 100 - 4 + 1 = 97 := by decide

-- The whole Gregorian calendar repeats EXACTLY every 400 years: 400·365 + 97 = 146097 days, and 146097 % 7 = 0 — a whole number of weeks, so the same dates fall on the same weekdays, forever.
theorem gregorian_cycle_400_years : 400 * 365 + 97 = 146097 ∧ 146097 % 7 = 0 := by decide

-- The century exception, decided: 2000 is a leap year (2000 % 400 = 0) but 1900 is not (1900 % 100 = 0 yet 1900 % 400 ≠ 0) — the rule that made the Gregorian reform, on two famous years.
theorem century_leap_rule : 2000 % 400 = 0 ∧ 1900 % 100 = 0 ∧ 1900 % 400 ≠ 0 := by decide

-- The doomsday rule for the even months: in a common year 4/4, 6/6, 8/8, 10/10 and 12/12 fall on day-of-year 94, 157, 220, 283, 346 — each 63 = 9·7 apart, so all ≡ 3 (mod 7). Five dates, one weekday, every year.
theorem doomsday_even_months : [94,157,220,283,346].all (fun d => d % 7 == 3) := by decide

-- The twelve months of a common year sum to 365: [31,28,31,30,31,30,31,31,30,31,30,31] folds to 365 — the year closed, February short.
theorem months_sum_common_365 : [31,28,31,30,31,30,31,31,30,31,30,31].foldl (· + ·) 0 = 365 := by decide

-- A leap year gives February its 29th and the twelve months sum to 366: [31,29,31,30,31,30,31,31,30,31,30,31] folds to 366 — exactly one more day than the common year.
theorem months_sum_leap_366 : [31,29,31,30,31,30,31,31,30,31,30,31].foldl (· + ·) 0 = 366 := by decide
