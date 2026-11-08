import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'
import { designJdOf, sunLongitudeOf } from '../hd/index.js'

const { fullTurn } = latticeNamesOf()

/** THE CALENDAR'S DRIFT, CROSSED INTO THE WHEEL. A Human Design chart is read off the tropical ecliptic at an instant;
 *  the instant comes from a calendar, and calendars drift. The Julian year (365.25 d) runs 11 min 14 s a year ahead of
 *  the tropical year (365.2422 d): a day in 128 years, which Meeus' B = 2 − A + ⌊A/4⌋ corrects for the Gregorian
 *  calendar (365.2425 d, 27 s a year, a day in 3200 years). The wheel is tropical, so it precesses against the stars
 *  at 50.29″ a year: a gate (360/64° = 20250″) in ~403 years. And the Sun's speed varies between 0.953 and 1.019°/day,
 *  so the design layer's 88° of solar arc is 86 to 93 days before birth (88/1.019 to 88/0.953), never a fixed count of days. Registered as
 *  the hex family `cal`; every value is exact in seconds, arcseconds or minutes. */

const TROPICAL = 31556925 // seconds in the mean tropical year (365.24219 d)
const JULIAN = 31557600 // 365.25 d
const GREGORIAN = 31556952 // 365.2425 d
const PRECESSION = 5029 // hundredths of an arcsecond per year (50.29″)
const GATE_ARCSEC = (360 / 64) * 3600 // 20250″
const MINUTES = 1440
const PROOF = 'Meeus, Astronomical Algorithms ch. 7 (calendar), 21 (precession), 25 (Sun); the Rave wheel is tropical'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'cal', dst: 'hd', formula, value, proof: PROOF }, holds, { name: `cal.${name}`, params })

export class CalFormulas {
  /** The Julian calendar's drift against the Sun after n years, in seconds (675 s a year: a day in 128 years). */
  static julianDrift(years: number): CrossFormula { return f('cal-julian-drift', 'drift_J(n) = n · (365.25 d − tropical year) = 675 s · n', (JULIAN - TROPICAL) * years, nat(years), 'julianDrift', [years]) }
  /** The Gregorian calendar's drift after n years, in seconds (27 s a year: a day in 3200 years). */
  static gregorianDrift(years: number): CrossFormula { return f('cal-gregorian-drift', 'drift_G(n) = n · (365.2425 d − tropical year) = 27 s · n', (GREGORIAN - TROPICAL) * years, nat(years), 'gregorianDrift', [years]) }
  /** Years until a calendar has drifted a whole day: 128 Julian, 3200 Gregorian (0 = Julian, 1 = Gregorian). */
  static dayPer(calendar: number): CrossFormula { return f('cal-day-per', 'dayPer(c) = ⌊86400 / (year_c − tropical)⌋', Math.floor(86400 / ((calendar === 0 ? JULIAN : GREGORIAN) - TROPICAL)), nat(calendar) && calendar <= 1, 'dayPer', [calendar]) }
  /** Precession of the tropical wheel against the stars after n years, in arcseconds. */
  static precession(years: number): CrossFormula { return f('cal-precession', 'p(n) = 50.29″ · n', Math.round((PRECESSION * years) / 100), nat(years), 'precession', [years]) }
  /** How many whole gates the tropical wheel has turned against the stars after n years: one per ~403 years. */
  static gatesPrecessed(years: number): CrossFormula { return f('cal-gates-precessed', 'gates(n) = ⌊50.29″ · n / 20250″⌋', Math.floor((PRECESSION * years) / 100 / GATE_ARCSEC), nat(years), 'gatesPrecessed', [years]) }
  /** The Sun's apparent speed at a birth minute, in thousandths of a degree per day (953 at aphelion, 1019 at perihelion). */
  static sunSpeed(jdm: number): CrossFormula {
    const jd = jdm / MINUTES
    const a = sunLongitudeOf(jd - 0.5), b = sunLongitudeOf(jd + 0.5)
    return f('cal-sun-speed', 'v(jdm) = λ(jd + ½) − λ(jd − ½), in 0.001°/day', Math.round((((b - a) % fullTurn) + fullTurn) % fullTurn * 1000), nat(jdm) && jdm > 0, 'sunSpeed', [jdm])
  }
  /** The days between a birth minute and its design minute (88° of solar arc): 86 to 93, by the Sun's speed. */
  static designDays(jdm: number): CrossFormula {
    const jd = jdm / MINUTES
    const days = jd - designJdOf(jd)
    return f('cal-design-days', 'd(jdm) = jd − design(jd), the days 88° of solar arc took', Math.round(days * 100), nat(jdm) && jdm > 0 && days > 86 && days < 93, 'designDays', [jdm])
  }
  /** The Metonic cycle's drift: 235 lunations exceed 19 tropical years by ~2 h 5 min; after n cycles, in minutes. */
  static metonicDrift(cycles: number): CrossFormula { return f('cal-metonic-drift', 'drift_M(n) = n · (235 · 29.530589 d − 19 · 365.24219 d)', Math.round(cycles * (235 * 29.530589 - 19 * 365.24219) * MINUTES), nat(cycles), 'metonicDrift', [cycles]) }
  /** The lunar year's drift against the tropical year after n years, in days (10.875 a year: the Islamic year walks the seasons in ~33.6 years). */
  static lunarDrift(years: number): CrossFormula { return f('cal-lunar-drift', 'drift_L(n) = ⌊n · (365.24219 − 12 · 29.530589)⌋ d', Math.floor(years * (365.24219 - 12 * 29.530589)), nat(years), 'lunarDrift', [years]) }
  /** The Saros' remainder: 6585.32 days is a third of a day past whole days, so each return is 120° farther west; after n returns, in degrees mod 360. */
  static sarosShift(returns: number): CrossFormula { return f('cal-saros-shift', 'shift(n) = 120 · n mod 360', (120 * returns) % fullTurn, nat(returns), 'sarosShift', [returns]) }
  /** THE DAY OUT OF TIME IS A COIN. The Dreamspell leaves two days out of its count: the Day Out of Time, 25 July every
   *  year, and the leap day, 29 February, which it does not count at all. A leap year holds both — the two faces at
   *  once, a pair — and every pair is one kin the Dreamspell has lost against the count that keeps every day. */
  /** 1 when a Gregorian year has its leap day (divisible by 4, not by 100 unless by 400). */
  static leap(year: number): CrossFormula { return f('cal-leap', 'leap(y) = [4 | y] − [100 | y] + [400 | y]', year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 1 : 0, nat(year), 'leap', [year]) }
  /** The faces of the coin in a year: the uncounted days, 1 + leap(y) — two in a leap year. */
  static coin(year: number): CrossFormula { return f('cal-coin', 'coin(y) = 1 + leap(y)', 1 + (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 1 : 0), nat(year), 'coin', [year]) }
  /** The pairs between two years inclusive: the leap years in [a, b], i.e. the kin the Dreamspell lost between them. */
  static pairs(from: number, to: number): CrossFormula {
    const leaps = (y: number) => Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400)
    return f('cal-pairs', 'pairs(a, b) = leaps(b) − leaps(a − 1)', to >= from ? leaps(to) - leaps(from - 1) : 0, nat(from, to) && to >= from, 'pairs', [from, to])
  }
  /** The days from a leap day to that year's Day Out of Time: 1 March to 25 July, 147 — the two faces are 147 days apart. */
  static faces(): CrossFormula { return f('cal-faces', 'faces = |1 March … 25 July| = 31 + 30 + 31 + 30 + 25', 31 + 30 + 31 + 30 + 25, true, 'faces', []) }
}

for (const name of ['coin', 'dayPer', 'designDays', 'faces', 'gatesPrecessed', 'gregorianDrift', 'julianDrift', 'leap', 'lunarDrift', 'metonicDrift', 'pairs', 'precession', 'sarosShift', 'sunSpeed'] as const)
  hexRegisterOf('cal', name, (CalFormulas[name] as (...x: unknown[]) => unknown).bind(CalFormulas))
