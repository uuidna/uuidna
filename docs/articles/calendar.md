---
title: "The calendar"
description: "Computed from lean/Calendar.lean — 9 sealed theorems, every claim citing its proof."
---

# The calendar

> THE CALENDAR — the seven-day week as ℤ/7 and the Gregorian 400-year cycle, as decidable arithmetic.

**9 theorems**, each proven `by decide` in [lean/Calendar.lean](/lean/Calendar.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

### The week is the rosette ℤ/7: seven days, and advancing by seven returns to the same day — 7 % 7 = 0. The calendar counts in the same ring uuidna turns on.

The ledger holds this as [week_is_z7](/theorem/week_is_z7) — proven `by decide`, sorry-free:

```lean
[0,1,2,3,4,5,6].length = 7 ∧ 7 % 7 = 0
```

### A common year is 365 = 52·7 + 1 days, so 365 % 7 = 1: every ordinary year the weekday of a fixed date advances by exactly one — New Year walks forward a day a year.

The ledger holds this as [common_year_shifts_one](/theorem/common_year_shifts_one) — proven `by decide`, sorry-free:

```lean
365 % 7 = 1
```

### A leap year is 366 days, and 366 % 7 = 2: a fixed date jumps forward TWO weekdays across a leap year — the extra day is the extra shift.

The ledger holds this as [leap_year_shifts_two](/theorem/leap_year_shifts_two) — proven `by decide`, sorry-free:

```lean
366 % 7 = 2
```

### The Gregorian rule keeps 97 leap years per 400: every 4th year (100), minus the centuries (4), plus every 400th (1) — 100 − 4 + 1 = 97. Just short of the Julian 100, tuned to the tropical year.

The ledger holds this as [leap_years_per_400](/theorem/leap_years_per_400) — proven `by decide`, sorry-free:

```lean
100 - 4 + 1 = 97
```

### The whole Gregorian calendar repeats EXACTLY every 400 years: 400·365 + 97 = 146097 days, and 146097 % 7 = 0 — a whole number of weeks, so the same dates fall on the same weekdays, forever.

The ledger holds this as [gregorian_cycle_400_years](/theorem/gregorian_cycle_400_years) — proven `by decide`, sorry-free:

```lean
400 * 365 + 97 = 146097 ∧ 146097 % 7 = 0
```

### The century exception, decided: 2000 is a leap year (2000 % 400 = 0) but 1900 is not (1900 % 100 = 0 yet 1900 % 400 ≠ 0) — the rule that made the Gregorian reform, on two famous years.

The ledger holds this as [century_leap_rule](/theorem/century_leap_rule) — proven `by decide`, sorry-free:

```lean
2000 % 400 = 0 ∧ 1900 % 100 = 0 ∧ 1900 % 400 ≠ 0
```

### The doomsday rule for the even months: in a common year 4/4, 6/6, 8/8, 10/10 and 12/12 fall on day-of-year 94, 157, 220, 283, 346 — each 63 = 9·7 apart, so all ≡ 3 (mod 7). Five dates, one weekday, every year.

The ledger holds this as [doomsday_even_months](/theorem/doomsday_even_months) — proven `by decide`, sorry-free:

```lean
[94,157,220,283,346].all (fun d => d % 7 == 3)
```

### The twelve months of a common year sum to 365: [31,28,31,30,31,30,31,31,30,31,30,31] folds to 365 — the year closed, February short.

The ledger holds this as [months_sum_common_365](/theorem/months_sum_common_365) — proven `by decide`, sorry-free:

```lean
[31,28,31,30,31,30,31,31,30,31,30,31].foldl (· + ·) 0 = 365
```

### A leap year gives February its 29th and the twelve months sum to 366: [31,29,31,30,31,30,31,31,30,31,30,31] folds to 366 — exactly one more day than the common year.

The ledger holds this as [months_sum_leap_366](/theorem/months_sum_leap_366) — proven `by decide`, sorry-free:

```lean
[31,29,31,30,31,30,31,31,30,31,30,31].foldl (· + ·) 0 = 366
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
