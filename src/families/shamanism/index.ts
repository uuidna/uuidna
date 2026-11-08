import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SHAMANISM — scaffolded integer measures crossed to anthropology. Every output an exact finite nonnegative integer. */

const PROOF = 'shamanism arithmetic (trancestates, journeyorderings, spiritallies, drumbeats, cosmiclayers, healingcombos, initiationstages, ecstasyratio); scaffolded from the integer-op palette; a measure crossed to anthropology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'shamanism', dst: 'anthropology', formula, value, proof: PROOF, ...extra }, holds, { name: `shamanism.${name}`, params })

export class ShamanismFormulas {
  static trancestates(x: number, y: number): CrossFormula { return c('shamanism-trancestates', 'trancestates(x, y) = x + y', x + y, nat(x, y), 'trancestates', [x, y]) }
  static journeyorderings(x: number): CrossFormula { return c('shamanism-journeyorderings', 'journeyorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'journeyorderings', [x]) }
  static spiritallies(x: number, y: number): CrossFormula { return c('shamanism-spiritallies', 'spiritallies(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'spiritallies', [x, y]) }
  static drumbeats(x: number, y: number): CrossFormula { return c('shamanism-drumbeats', 'drumbeats(x, y) = x · y', x * y, nat(x, y), 'drumbeats', [x, y]) }
  static cosmiclayers(x: number, y: number): CrossFormula { return c('shamanism-cosmiclayers', 'cosmiclayers(x, y) = x + y', x + y, nat(x, y), 'cosmiclayers', [x, y]) }
  static healingcombos(x: number, y: number): CrossFormula { return c('shamanism-healingcombos', 'healingcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'healingcombos', [x, y]) }
  static initiationstages(x: number, y: number): CrossFormula { return c('shamanism-initiationstages', 'initiationstages(x, y) = x + y', x + y, nat(x, y), 'initiationstages', [x, y]) }
  static ecstasyratio(x: number, y: number): CrossFormula { return c('shamanism-ecstasyratio', 'ecstasyratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'ecstasyratio', [x, y]) }
}

for (const name of ['cosmiclayers', 'drumbeats', 'ecstasyratio', 'healingcombos', 'initiationstages', 'journeyorderings', 'spiritallies', 'trancestates'] as const)
  hexRegisterOf('shamanism', name, (ShamanismFormulas[name] as (...x: unknown[]) => unknown).bind(ShamanismFormulas))
