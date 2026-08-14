# The calendar

## The Sealed Truth

**Theorem:** `Calendar.lean` (0 theorems, all `by decide`)

the Gregorian calendar and the seven-day week as decidable arithmetic — the week IS the rosette ℤ/7 (advance seven days, the day returns: 7 % 7 = 0), so the calendar counts mod 7: a common year of 365 = 52·7 + 1 days shifts a fixed date one weekday (365 % 7 = 1), a leap year two (366 % 7 = 2); the Gregorian rule keeps 97 leap years per 400 (every 4th − centuries + every 400th = 100 − 4 + 1), making 400 years = 146097 days, a whole number of weeks (146097 % 7 = 0), so the calendar repeats EXACTLY every 400 years; the century exception is decided (2000 leap, 1900 not); and the doomsday even months 4/4, 6/6, 8/8, 10/10, 12/12 sit 63 = 9·7 days apart, so they share a weekday — mod-7 congruence, NOT a locale date library

**Why sealed:** Pure decidable arithmetic. No paradox, no experiment needed — the mathematics as recomputable facts.

---

## The Honest Boundary

**What this CANNOT prove:**
- Whether the mechanism explains the phenomenon
- Why humans find this beautiful, important, or meaningful
- Whether the future will follow the same rules
- What the universe "should" do

**Honest scope:** This theorem seals STRUCTURE. It does NOT settle meaning, purpose, or consequence.

---

## The Metaphysical Pair

**The Question:** *Is the calendar discovered or invented?*

**The Trinity:**

| Perspective | What It Proves | What It Cannot |
|---|---|---|
| **Decidable (Sealed)** | [The sealed mathematics is exact and recomputable.] | Whether this mechanism is "all there is"; whether understanding it diminishes wonder; whether meaning requires non-mechanism |
| **Honest Boundary** | Understanding the structure does NOT negate the phenomenon. Both truth and beauty are real simultaneously. | Whether reduction to mechanism makes something "less real" or "less meaningful"; whether your experience is diminished by knowing its basis |
| **Metaphysical** | [The open question posed above.] | Whether the universe cares about this; whether your existence or choice matters; whether meaning requires transcendence |

**The court decides:** This theorem seals the mechanism. Philosophy settles the meaning.

---

## Read the Sealed Proof

[`Calendar.lean`](../../lean/Calendar.lean)

Each theorem proven `by decide` — recompute it yourself.

---

## The Research Question

[Open question for you to explore. This is where inquiry begins.]

**These are open.** Mathematics does not answer them. Philosophy, art, and human judgment do.
