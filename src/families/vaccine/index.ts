import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VaccineFormulas — 8 exact-integer formulas of the vaccine domain, each at a hex address crossing to cross; develops the vaccine leads. */

const PROOF = "vaccine counts: doses(x, y) = x + y; efficacy(x, y) = x · 100 / y; coverage(x, y) = x · 100 / y; antigens(x, y) = x · y; boosters(x, y) = x + y; coldchain(x, y) = max(0, x − y); batches(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'vaccine', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `vaccine.${name}`, params })

export class VaccineFormulas {
  /** doses(x, y) = x + y. */
  static doses(x: number, y: number): CrossFormula { return f('vaccine-doses', 'doses(x, y) = x + y', x + y, nat(x, y), 'doses', [x, y]) }
  /** efficacy(x, y) = x · 100 / y. */
  static efficacy(x: number, y: number): CrossFormula { return f('vaccine-efficacy', 'efficacy(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'efficacy', [x, y]) }
  /** coverage(x, y) = x · 100 / y. */
  static coverage(x: number, y: number): CrossFormula { return f('vaccine-coverage', 'coverage(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coverage', [x, y]) }
  /** antigens(x, y) = x · y. */
  static antigens(x: number, y: number): CrossFormula { return f('vaccine-antigens', 'antigens(x, y) = x · y', x * y, nat(x, y), 'antigens', [x, y]) }
  /** boosters(x, y) = x + y. */
  static boosters(x: number, y: number): CrossFormula { return f('vaccine-boosters', 'boosters(x, y) = x + y', x + y, nat(x, y), 'boosters', [x, y]) }
  /** coldchain(x, y) = max(0, x − y). */
  static coldchain(x: number, y: number): CrossFormula { return f('vaccine-coldchain', 'coldchain(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'coldchain', [x, y]) }
  /** batches(x, y) = x · y. */
  static batches(x: number, y: number): CrossFormula { return f('vaccine-batches', 'batches(x, y) = x · y', x * y, nat(x, y), 'batches', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('vaccine-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['antigens', 'batches', 'boosters', 'coldchain', 'combos', 'coverage', 'doses', 'efficacy'] as const)
  hexRegisterOf('vaccine', name, (VaccineFormulas[name] as (...x: unknown[]) => unknown).bind(VaccineFormulas))
