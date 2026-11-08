import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OPERA — scaffolded integer measures crossed to music. Every output an exact finite nonnegative integer. */

const PROOF = 'opera arithmetic (acts, arias, voicetypes, ensemblecombos, orchestrasize, scoreorderings, rangeoctaves, dynamicspan); scaffolded from the integer-op palette; a measure crossed to music'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'opera', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name: `opera.${name}`, params })

export class OperaFormulas {
  static acts(x: number, y: number): CrossFormula { return c('opera-acts', 'acts(x, y) = x + y', x + y, nat(x, y), 'acts', [x, y]) }
  static arias(x: number, y: number): CrossFormula { return c('opera-arias', 'arias(x, y) = x · y', x * y, nat(x, y), 'arias', [x, y]) }
  static voicetypes(x: number, y: number): CrossFormula { return c('opera-voicetypes', 'voicetypes(x, y) = x + y', x + y, nat(x, y), 'voicetypes', [x, y]) }
  static ensemblecombos(x: number, y: number): CrossFormula { return c('opera-ensemblecombos', 'ensemblecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'ensemblecombos', [x, y]) }
  static orchestrasize(x: number, y: number): CrossFormula { return c('opera-orchestrasize', 'orchestrasize(x, y) = x · y', x * y, nat(x, y), 'orchestrasize', [x, y]) }
  static scoreorderings(x: number): CrossFormula { return c('opera-scoreorderings', 'scoreorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'scoreorderings', [x]) }
  static rangeoctaves(x: number, y: number): CrossFormula { return c('opera-rangeoctaves', 'rangeoctaves(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rangeoctaves', [x, y]) }
  static dynamicspan(x: number, y: number): CrossFormula { return c('opera-dynamicspan', 'dynamicspan(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'dynamicspan', [x, y]) }
}

for (const name of ['acts', 'arias', 'dynamicspan', 'ensemblecombos', 'orchestrasize', 'rangeoctaves', 'scoreorderings', 'voicetypes'] as const)
  hexRegisterOf('opera', name, (OperaFormulas[name] as (...x: unknown[]) => unknown).bind(OperaFormulas))
