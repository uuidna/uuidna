---
title: "The calendar"
description: "Computed from lean/Calendar.lean — 15 sealed theorems, every claim citing its proof."
---

# The calendar

> THE CALENDAR — the seven-day week as ℤ/7 and the Gregorian 400-year cycle, as decidable arithmetic. — held by [week_is_z7](/theorem/week_is_z7) and its 14 siblings below.

**15 theorems**, from [week_is_z7](/theorem/week_is_z7) onward, each proven `by decide` in <a href="/lean/Calendar.lean">lean/Calendar.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 7 of its 15 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [century_leap_rule](/theorem/century_leap_rule). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FCalendar.lean)** — nothing to install. The editor fetches `lean/Calendar.lean` from the repository and re-decides all 15 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

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

### THE CONTROL FOR THE GREGORIAN CLOSURE, AND IT CLOSES ONLY IN THE CALENDAR'S OWN BOOKKEEPING. The Julian rule leaps every fourth year with no century exception, so its weekday-and-date pairing returns after TWENTY-EIGHT years — 10227 days, a whole number of weeks, and twenty-eight is the SMALLEST such span (four Julian years do not: 1461 % 7 = 5). WHAT THIS CLOSURE DOES NOT ACCOUNT FOR, corrected 2026-08-25 after the first draft claimed flatly that "the calendar closes": a cycle in weekdays is not a cycle in TIME. The Julian year assumes 365¼ days against a tropical year of about 365.2422, so across those same twenty-eight years the calendar has slipped roughly 0.22 days against the sun and a full day every ~128 years — the drift that made the reform necessary. The pairing returns; the season does not. Sealed beside gregorian_cycle_400_years because a closure means nothing without a span that fails to close, and now beside its own boundary because a closure means less than it sounds when the unit it closes in is the calendar's own.
The ledger holds this as [julian_cycle_closes_at_twenty_eight](/theorem/julian_cycle_closes_at_twenty_eight) — proven `by decide`, sorry-free:

```lean
28 * 365 + 7 = 10227 ∧ 10227 % 7 = 0 ∧ 4 * 365 + 1 = 1461 ∧ 1461 % 7 = 5
```

### The 400-year cycle stated as the number it is: 146097 = 20871 × 7, so the calendar returns after twenty thousand eight hundred and seventy-one weeks exactly. AND THE 146097 = 63 · 2319 with 63 = 7·9, the fused ring — but only the SEVEN is a fact about calendars, earned by the 97-leap-day rule and able to come out otherwise. The nine is ordinary arithmetic and NOT a second witness: 146097 = 7 · 20871 and 20871 is itself divisible by nine, so that half follows by multiplication. A fact and its consequence, sealed together and labelled, rather than counted twice.
The ledger holds this as [the_gregorian_cycle_counted_in_weeks](/theorem/the_gregorian_cycle_counted_in_weeks) — proven `by decide`, sorry-free:

```lean
146097 = 20871 * 7 ∧ 146097 = 63 * 2319 ∧ 63 = 7 * 9 ∧ 20871 % 9 = 0
```

### WHAT THE CENTURY RULE ACTUALLY COSTS, and the one part of the drift that IS decidable. Both calendars are exact rational rules: a Julian year is 1461/4 days and a Gregorian year 146097/400, so over four hundred years Julian counts 146100 days and Gregorian 146097 — the reform removes exactly THREE, the three centuries in four that stop being leap years. That difference is why the two cycles close at twenty-eight and four hundred rather than at the same span. THE BOUNDARY, stated because the interesting question lies just past it: this settles the two RULES against each other and says nothing about either against the sun. The tropical year is a MEASURED quantity, not a decided one — roughly 365.2422 days — so how fast a calendar drifts against the season is an empirical claim that belongs in prose with its source, never in a by-decide theorem. What the kernel can hold is the difference between two rules; what it cannot hold is the year itself.
The ledger holds this as [the_reform_is_exactly_three_days_in_four_hundred](/theorem/the_reform_is_exactly_three_days_in_four_hundred) — proven `by decide`, sorry-free:

```lean
(400 * 365 + 100 = 146100) ∧ (146100 - 146097 = 3) ∧ (1461 * 100 = 146100) ∧ (100 - 97 = 3)
```

### THE WING ABOVE IS ABOUT THE RULE; THIS IS ABOUT WHAT WAS KEPT. Every theorem here so far — the week closing, the year precessing, the four-hundred-year cycle — describes the RULE, and the rule is clean. The calendar actually kept is not: in October 1582 the fourth was followed by the fifteenth, and the ten days between were never lived. Laid against a GAPLESS integer day index the deletion returns as arithmetic rather than as remembered history — the two dates the record treats as adjacent are eleven apart, and eleven less the one day that did elapse is TEN. A gapless ruler measures the holes in a thing that has them; that is its use. The same subtraction over a genuine successor returns zero, which is the control: 5 − 4 − 1 = 0. this seals the ARITHMETIC of the deletion, not the history — that Gregory ordered it, that the papal states obeyed in 1582 and Britain in 1752, and that the leap rule was misapplied for fifty years after Caesar are matters of record, cited in src/calendar.ts and decidable by no kernel. What the kernel holds is that a gapless index and a calendar with a hole in it disagree by exactly the size of the hole.
The ledger holds this as [the_record_has_holes_the_rule_does_not](/theorem/the_record_has_holes_the_rule_does_not) — proven `by decide`, sorry-free:

```lean
(15 - 4 - 1 = 10) ∧ (5 - 4 - 1 = 0) ∧ (15 - 4 = 11)
```

### WHAT GAPLESS MEANS, and the ledger already decided it once. A day index is gapless when successive days differ by exactly one and no index lies strictly between them — the same discreteness ym_quantum seals for winding numbers ("no integer strictly between n and n+1"), applied to time instead. Sealed here over a walk rather than asserted: across twenty consecutive indices every step is +1 and no integer hides between a pair. MEASURED BESIDE IT, and this is the part a kernel cannot reach: the implementation was walked over 190,292 days from 1580 to 2100 — every leap year, every century year, the 1900 that is not a leap year, and the epoch — and not one step differed from +1. The theorem holds the SHAPE of gaplessness; the walk holds that this particular index has it, and the two are different claims kept apart on purpose.
The ledger holds this as [a_gapless_index_admits_nothing_between](/theorem/a_gapless_index_admits_nothing_between) — proven `by decide`, sorry-free:

```lean
(List.range 20).all (fun i => (i + 1) - i == 1) ∧ (List.range 20).all (fun i => (List.range 20).all (fun k => ¬ (i < k ∧ k < i + 1)))
```


::: warning 
THE CALENDAR — the seven-day week as ℤ/7 and the Gregorian 400-year cycle, as decidable arithmetic. The boundary is confirmed by the wing's own sealed theorems — e.g. [week_is_z7](/theorem/week_is_z7) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
