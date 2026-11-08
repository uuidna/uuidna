import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CALENDAR — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'calendar arithmetic (daysinyear, leapcycle, weekcombos, monthorderings, intercalations, dayofweek, epochspan, cyclepermutations); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'calendar', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `calendar.${name}`, params })

export class CalendarFormulas {
  static daysinyear(x: number, y: number): CrossFormula { return c('calendar-daysinyear', 'daysinyear(x, y) = x + y', x + y, nat(x, y), 'daysinyear', [x, y]) }
  static leapcycle(x: number, y: number): CrossFormula { return c('calendar-leapcycle', 'leapcycle(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'leapcycle', [x, y]) }
  static weekcombos(x: number, y: number): CrossFormula { return c('calendar-weekcombos', 'weekcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'weekcombos', [x, y]) }
  static monthorderings(x: number): CrossFormula { return c('calendar-monthorderings', 'monthorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'monthorderings', [x]) }
  static intercalations(x: number, y: number): CrossFormula { return c('calendar-intercalations', 'intercalations(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'intercalations', [x, y]) }
  static dayofweek(x: number, y: number): CrossFormula { return c('calendar-dayofweek', 'dayofweek(x, y) = x mod y', y > 0 ? x % y : 0, nat(x, y) && y > 0, 'dayofweek', [x, y]) }
  static epochspan(x: number, y: number): CrossFormula { return c('calendar-epochspan', 'epochspan(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'epochspan', [x, y]) }
  static cyclepermutations(x: number, y: number): CrossFormula { return c('calendar-cyclepermutations', 'cyclepermutations(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'cyclepermutations', [x, y]) }
}

for (const name of ['cyclepermutations', 'dayofweek', 'daysinyear', 'epochspan', 'intercalations', 'leapcycle', 'monthorderings', 'weekcombos'] as const)
  hexRegisterOf('calendar', name, (CalendarFormulas[name] as (...x: unknown[]) => unknown).bind(CalendarFormulas))
