import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THE COUNTS PEOPLE ASK ABOUT, AS COMBINATORICS: the Tzolkin and the Dreamspell (a kin of 13 tones × 20 seals, its
 *  correlation a parameter), the Day Out of Time as a coin, the sexagenary pillars, the biorhythm phases, the periods
 *  (synodic month, Metonic, Saros, lcm 23·28·33, baktun, lunar year), the vortex 2ⁿ mod 9 and the digital root, the
 *  enneagram's 1/7. A hex family holds fifteen formulas (one nibble), so these are the family `kin` beside `cal`. */

const MINUTES = 1440
const PROOF = 'the counts as arithmetic: cycles, residues and least common multiples; correlations are parameters'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'kin', dst: 'cal', formula, value, proof: PROOF }, holds, { name: `kin.${name}`, params })

export class KinFormulas {
  /** THE TZOLKIN AND THE DREAMSPELL, AS COMBINATORICS. A kin is a point of the 260-day cycle of 13 tones × 20 seals; which
   *  day is kin 1 is a correlation the counts disagree on, so it is a parameter (the Julian day in minutes of a kin 1),
   *  never a constant here. The Dreamspell skips 29 February (a day out of the count), so against the traditional count
   *  that keeps every day it loses one kin per leap year: the drift. The calendar round is 52 × 365 = 18980 days. */
  static kin(jdm: number, kin1: number): CrossFormula {
    const days = Math.floor((jdm - kin1) / MINUTES)
    return f('cal-kin', 'kin(jdm, kin1) = ((⌊(jdm − kin1)/1440⌋) mod 260) + 1', ((days % 260) + 260) % 260 + 1, nat(jdm, kin1) && jdm > 0 && kin1 > 0, 'kin', [jdm, kin1])
  }
  /** The tone (1..13) of a kin. */
  static tone(kin: number): CrossFormula { return f('cal-tone', 'tone(k) = ((k − 1) mod 13) + 1', ((kin - 1) % 13) + 1, nat(kin) && kin >= 1 && kin <= 260, 'tone', [kin]) }
  /** The seal (1..20) of a kin. */
  static seal(kin: number): CrossFormula { return f('cal-seal', 'seal(k) = ((k − 1) mod 20) + 1', ((kin - 1) % 20) + 1, nat(kin) && kin >= 1 && kin <= 260, 'seal', [kin]) }
  /** The Dreamspell's drift against the count that keeps every day: one kin per leap year, ⌊years/4⌋ after n years. */
  static dreamspellDrift(years: number): CrossFormula { return f('cal-dreamspell-drift', 'drift_D(n) = ⌊n / 4⌋ kin (29 February is not counted)', Math.floor(years / 4), nat(years), 'dreamspellDrift', [years]) }
  /** The cycles: 0 the Tzolkin (260 = 13 × 20), 1 the Haab (365), 2 the calendar round (18980 = lcm), in days. */
  static cycle(which: number): CrossFormula { return f('cal-cycle', 'cycle(0) = 13 · 20, cycle(1) = 365, cycle(2) = lcm(260, 365) = 18980', [260, 365, 18980][which] ?? 0, nat(which) && which <= 2, 'cycle', [which]) }
  /** THE OTHER CYCLES PEOPLE ASK ABOUT, EXACT. 0 the synodic month in minutes (29.530589 d), 1 the Metonic cycle in
   *  days (235 lunations ≈ 19 years), 2 the Saros in days (223 synodic months), 3 the sexagenary cycle (lcm(10, 12)),
   *  4 the biorhythm round (lcm(23, 28, 33)), 5 the Long Count baktun in days (20 · 20 · 18 · 20), 6 the lunar year
   *  (12 lunations) in minutes. */
  static period(which: number): CrossFormula {
    const value = [Math.round(29.530589 * MINUTES), 6940, 6585, 60, 21252, 144000, Math.round(12 * 29.530589 * MINUTES)][which] ?? 0
    return f('cal-period', 'period(0) synodic month (min), 1 Metonic (d), 2 Saros (d), 3 stems × branches, 4 lcm(23, 28, 33), 5 baktun (d), 6 lunar year (min)', value, nat(which) && which <= 6, 'period', [which])
  }
  /** A pillar of the sexagenary cycle for a count of days or years from its epoch: stem = c mod 10, branch = c mod 12, as stem · 12 + branch. */
  static pillar(count: number, epoch: number): CrossFormula {
    const c = ((count - epoch) % 60 + 60) % 60
    return f('cal-pillar', 'pillar(c, e) = ((c − e) mod 10) · 12 + ((c − e) mod 12)', (c % 10) * 12 + (c % 12), nat(count, epoch), 'pillar', [count, epoch])
  }
  /** A biorhythm's phase at a birth minute and a day: 0 physical (23 d), 1 emotional (28), 2 intellectual (33); the day of the cycle, 0..period−1. */
  static biorhythm(which: number, birthJdm: number, jdm: number): CrossFormula {
    const period = [23, 28, 33][which] ?? 0
    const days = Math.floor((jdm - birthJdm) / MINUTES)
    return f('cal-biorhythm', 'phase(c, b, t) = ⌊(t − b)/1440⌋ mod period_c', period ? ((days % period) + period) % period : 0, nat(which, birthJdm, jdm) && which <= 2 && jdm >= birthJdm, 'biorhythm', [which, birthJdm, jdm])
  }
  /** The vortex: 2ⁿ mod 9 runs 1 2 4 8 7 5 with period 6 — the doubling of Qpu.Mint folded to a digital root. */
  static vortex(n: number): CrossFormula {
    let v = 1
    for (let i = 0; i < n % 6; i++) v = (v * 2) % 9
    return f('cal-vortex', 'vortex(n) = 2ⁿ mod 9, period 6', v, nat(n), 'vortex', [n])
  }
  /** The digital root of a count: the number mod 9, with 9 for a multiple of 9. */
  static digitalRoot(n: number): CrossFormula { return f('cal-digital-root', 'root(n) = 1 + (n − 1) mod 9', n === 0 ? 0 : 1 + ((n - 1) % 9), nat(n), 'digitalRoot', [n]) }
  /** The enneagram's loop is the period of 1/7: its six repeating digits 142857 as a number. */
  static enneagram(): CrossFormula { return f('cal-enneagram', '1/7 = 0.(142857): the 1-4-2-8-5-7 loop', 142857, true, 'enneagram', []) }
  /** The Day Out of Time walks 365 mod 260 = 105 kin a year; its kin returns after 260 / gcd(105, 260) = 52 years: the calendar round. */
  static dootKin(year: number, kinYear: number, kinThen: number): CrossFormula {
    const steps = ((year - kinYear) % 52 + 52) % 52
    return f('cal-doot-kin', 'doot(y) = ((kin₀ − 1 + 105 · (y − y₀)) mod 260) + 1, period 52', ((kinThen - 1 + 105 * steps) % 260) + 1, nat(year, kinYear, kinThen) && kinThen >= 1 && kinThen <= 260, 'dootKin', [year, kinYear, kinThen]) }
  /** 1 when two years' Days Out of Time carry the same kin: 52 | (a − b). */
  static crossed(a: number, b: number): CrossFormula { return f('cal-crossed', 'crossed(a, b) = [52 | a − b]', (a - b) % 52 === 0 ? 1 : 0, nat(a, b), 'crossed', [a, b]) }
  /** The pure combinations of a chart of n bodies: 64ⁿ gate placements (exact while it fits a number, n ≤ 8). */
  static combinations(bodies: number): CrossFormula { return f('cal-combinations', 'C(n) = 64ⁿ', bodies <= 8 ? 64 ** bodies : 0, nat(bodies) && bodies <= 8, 'combinations', [bodies]) }
  /** The information of a chart of n bodies, in bits: 6 per gate, plus log₂ 6 per line. */
  static bits(bodies: number): CrossFormula { return f('cal-bits', 'bits(n) = n · (6 + log₂ 6), rounded', Math.round(bodies * (6 + Math.log2(6))), nat(bodies), 'bits', [bodies]) }
}

for (const name of ['biorhythm', 'bits', 'combinations', 'crossed', 'cycle', 'digitalRoot', 'dootKin', 'dreamspellDrift', 'enneagram', 'kin', 'period', 'pillar', 'seal', 'tone', 'vortex'] as const)
  hexRegisterOf('kin', name, (KinFormulas[name] as (...x: unknown[]) => unknown).bind(KinFormulas))
