// calendar — THE GAPLESS DAY INDEX, and the gaps it makes visible in the calendar that is not.
//
// (the captain's claim, 2026-08-25: "captain calendar is gapless across all times")
//
// The wing sealed as Calendar.lean is about the RULE — 365 ≡ 1 (mod 7), the 400-year cycle closing in 20,871
// weeks. The rule is clean. THE CALENDAR THAT WAS KEPT IS NOT, and a theorem about the rule quietly reads as a
// theorem about history unless somebody counts the holes:
//
//   1582      October 5th through 14th DO NOT EXIST. Ten days deleted to drag the equinox back.
//   1 BC → AD 1   there is no year zero; the civil era numbers step from −1 to +1.
//   45 BC – AD 8  the Julian leap rule was misapplied for roughly fifty years, then suspended to correct it.
//
// So "the calendar repeats every 400 years" is true of the rule and false of the record. A cycle cannot close
// over a span with a hole in it.
//
// WHAT A GAPLESS COUNT IS. Not a calendar at all: an INTEGER INDEX for each day, consecutive by construction,
// with no reform, no epoch break and no missing year. Successive days differ by exactly one — which is the same
// discreteness the ledger already seals in ym_quantum ("no integer strictly between n and n+1"), applied to time
// instead of to winding number. The index is proleptic: it extends the Gregorian RULE backwards through the
// dates history never kept, which is precisely what makes it continuous where the record is not.
//
// AND IT MEASURES THE HOLES RATHER THAN INHERITING THEM. The two days either side of the 1582 reform were
// CONSECUTIVE as lived — the 4th, then the 15th — and their indices differ by eleven. Eleven minus the one day
// that actually passed is ten: the deletion, recovered as arithmetic rather than remembered as a fact. That is
// the whole use of a gapless ruler — you lay it against a thing with gaps and the gaps become numbers.
//
// PURE. No clock, no Date, no timezone, no locale: integer arithmetic over (year, month, day). Nothing here
// reads the present moment, so every value it returns is the same for every caller forever.

/** THE ERA. Four hundred proleptic Gregorian years are 146,097 days — the same number Calendar.lean seals as
 *  20,871 weeks. The index is built on it because 400 years is the shortest span over which the leap rule
 *  repeats, so era arithmetic is exact with no correction terms. */
export const ERA_DAYS = 146097
export const ERA_YEARS = 400

/** the integer division this file uses everywhere — floor toward minus infinity, so negative years (the ones
 *  history numbers backwards) behave like any other. The ledger admits no maths intrinsic, so it is written. */
const fdiv = (a: number, b: number): number => {
  const q = (a - ((a % b) + b) % b) / b
  return q
}

/** dayIndex(y, m, d) → the gapless integer index of a proleptic Gregorian date. Day 0 is 1970-01-01, chosen
 *  because it is the epoch every other system already agrees on; the ORIGIN is arbitrary and the CONSECUTIVENESS
 *  is not, which is the whole point.
 *
 *  Years are ASTRONOMICAL: 0 exists and means 1 BC, −1 means 2 BC. That is the first gap closed — the civil era
 *  steps from −1 to +1 and loses a year in the arithmetic while losing none in time. */
export function dayIndex(y: number, m: number, d: number): number {
  const yy = y - (m <= 2 ? 1 : 0)                       // March-first years, so the leap day lands last
  const era = fdiv(yy, ERA_YEARS)
  const yoe = yy - era * ERA_YEARS                       // [0, 399]
  const doy = fdiv(153 * (m + (m > 2 ? -3 : 9)) + 2, 5) + d - 1
  const doe = yoe * 365 + fdiv(yoe, 4) - fdiv(yoe, 100) + doy
  return era * ERA_DAYS + doe - 719468
}

/** THE PROPERTY THE INDEX EXISTS FOR: successive days differ by exactly one, with nothing between them. */
export const isConsecutive = (a: number, b: number): boolean => b - a === 1

/** A GAP, MEASURED. Two dates the record treats as adjacent, and the number of days the index says are missing
 *  between them: their distance, less the one day that actually elapsed. Zero everywhere the record is honest. */
export function gapBetween(a: readonly [number, number, number], b: readonly [number, number, number]): number {
  return dayIndex(...b) - dayIndex(...a) - 1
}

/** THE DELETED DAYS OF 1582, as the record kept them: Thursday 4 October was followed by Friday 15 October.
 *  A gapless ruler laid against that pair returns the ten days nobody lived. */
export const GREGORIAN_REFORM = {
  last: [1582, 10, 4] as const,      // the last day of the Julian reckoning in the papal states
  first: [1582, 10, 15] as const,    // the first day of the Gregorian
}

/** every day between two indices, inclusive — used to show the index has no holes to walk over */
export const spanDays = (from: number, to: number): number => to - from + 1
