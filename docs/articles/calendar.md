---
title: "The calendar"
description: "Computed from lean/Calendar.lean — 12 sealed theorems, every claim citing its proof."
---

# The calendar

> THE CALENDAR — the seven-day week as ℤ/7 and the Gregorian 400-year cycle, as decidable arithmetic. — held by [week_is_z7](/theorem/week_is_z7) and its 11 siblings below.

**12 theorems**, from [week_is_z7](/theorem/week_is_z7) onward, each proven `by decide` in [lean/Calendar.lean](/lean/Calendar.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 12 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [century_leap_rule](/theorem/century_leap_rule). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FCalendar.lean)** — nothing to install. The editor fetches `lean/Calendar.lean` from the repository and re-decides all 12 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

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

### Of the twelve months exactly ONE is a whole number of weeks: a common February, 28 = 4·7. Thirty leaves two over and thirty-one leaves three, so every other month starts on a different weekday than it ended — which is why only February can repeat its shape. COUNTED, not asserted: the first draft of this fact claimed that NO month was a whole number of weeks, and the count refused it immediately. The exception IS the content.
The ledger holds this as [february_is_the_only_month_of_whole_weeks](/theorem/february_is_the_only_month_of_whole_weeks) — proven `by decide`, sorry-free:

```lean
([31,28,31,30,31,30,31,31,30,31,30,31].filter (fun m => m % 7 == 0)).length = 1 ∧ 28 % 7 = 0 ∧ 30 % 7 = 2 ∧ 31 % 7 = 3
```

### THE CONTROL FOR THE GREGORIAN CLOSURE. The Julian rule leaps every fourth year with no century exception, so its calendar closes at TWENTY-EIGHT years — 10227 days, a whole number of weeks — while four Julian years alone do not (1461 % 7 = 5). Sealed beside gregorian_cycle_400_years because a closure means nothing without a span that fails to close: the difference between 28 and 400 is exactly what the century rule costs, and without this contrast the 400 reads as arithmetic rather than as a consequence of the reform.
The ledger holds this as [julian_cycle_closes_at_twenty_eight](/theorem/julian_cycle_closes_at_twenty_eight) — proven `by decide`, sorry-free:

```lean
28 * 365 + 7 = 10227 ∧ 10227 % 7 = 0 ∧ 4 * 365 + 1 = 1461 ∧ 1461 % 7 = 5
```

### The 400-year cycle stated as the number it is: 146097 = 20871 × 7, so the calendar returns after twenty thousand eight hundred and seventy-one weeks exactly. AND THE HONEST SCOPE, because the factorisation invites more than it earns: 146097 = 63 · 2319 with 63 = 7·9, the fused ring — but only the SEVEN is a fact about calendars, earned by the 97-leap-day rule and able to come out otherwise. The nine is ordinary arithmetic and NOT a second witness: 146097 = 7 · 20871 and 20871 is itself divisible by nine, so that half follows by multiplication. A fact and its consequence, sealed together and labelled, rather than counted twice.
The ledger holds this as [the_gregorian_cycle_counted_in_weeks](/theorem/the_gregorian_cycle_counted_in_weeks) — proven `by decide`, sorry-free:

```lean
146097 = 20871 * 7 ∧ 146097 = 63 * 2319 ∧ 63 = 7 * 9 ∧ 20871 % 9 = 0
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
