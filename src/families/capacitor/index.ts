import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CAPACITOR — scaffolded integer measures crossed to electronics. Every output an exact finite nonnegative integer. */

const PROOF = 'capacitor arithmetic (charge, energy, reactance, timeconstant, seriescombos, voltagerating, parallelsum, leakage); scaffolded from the integer-op palette; a measure crossed to electronics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'capacitor', dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name: `capacitor.${name}`, params })

export class CapacitorFormulas {
  static charge(x: number, y: number): CrossFormula { return c('capacitor-charge', 'charge(x, y) = x · y', x * y, nat(x, y), 'charge', [x, y]) }
  static energy(x: number, y: number): CrossFormula { return c('capacitor-energy', 'energy(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'energy', [x, y]) }
  static reactance(x: number, y: number): CrossFormula { return c('capacitor-reactance', 'reactance(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'reactance', [x, y]) }
  static timeconstant(x: number, y: number): CrossFormula { return c('capacitor-timeconstant', 'timeconstant(x, y) = x · y', x * y, nat(x, y), 'timeconstant', [x, y]) }
  static seriescombos(x: number, y: number): CrossFormula { return c('capacitor-seriescombos', 'seriescombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'seriescombos', [x, y]) }
  static voltagerating(x: number, y: number): CrossFormula { return c('capacitor-voltagerating', 'voltagerating(x, y) = x · y', x * y, nat(x, y), 'voltagerating', [x, y]) }
  static parallelsum(x: number, y: number): CrossFormula { return c('capacitor-parallelsum', 'parallelsum(x, y) = x + y', x + y, nat(x, y), 'parallelsum', [x, y]) }
  static leakage(x: number, y: number): CrossFormula { return c('capacitor-leakage', 'leakage(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'leakage', [x, y]) }
}

for (const name of ['charge', 'energy', 'leakage', 'parallelsum', 'reactance', 'seriescombos', 'timeconstant', 'voltagerating'] as const)
  hexRegisterOf('capacitor', name, (CapacitorFormulas[name] as (...x: unknown[]) => unknown).bind(CapacitorFormulas))
