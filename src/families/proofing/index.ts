import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROOFING — scaffolded integer measures crossed to biochemistry. Every output an exact finite nonnegative integer. */

const PROOF = 'proofing arithmetic (prooftime, volumegain, temperaturefactor, humiditylevel, fermentationdegree, overproofrisk, doughtemp, yeastdose); scaffolded from the integer-op palette; a measure crossed to biochemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'proofing', dst: 'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `proofing.${name}`, params })

export class ProofingFormulas {
  static prooftime(x: number, y: number): CrossFormula { return c('proofing-prooftime', 'prooftime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'prooftime', [x, y]) }
  static volumegain(x: number, y: number): CrossFormula { return c('proofing-volumegain', 'volumegain(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'volumegain', [x, y]) }
  static temperaturefactor(x: number, y: number): CrossFormula { return c('proofing-temperaturefactor', 'temperaturefactor(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'temperaturefactor', [x, y]) }
  static humiditylevel(x: number, y: number): CrossFormula { return c('proofing-humiditylevel', 'humiditylevel(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'humiditylevel', [x, y]) }
  static fermentationdegree(x: number, y: number): CrossFormula { return c('proofing-fermentationdegree', 'fermentationdegree(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'fermentationdegree', [x, y]) }
  static overproofrisk(x: number, y: number): CrossFormula { return c('proofing-overproofrisk', 'overproofrisk(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'overproofrisk', [x, y]) }
  static doughtemp(x: number, y: number): CrossFormula { return c('proofing-doughtemp', 'doughtemp(x, y) = x + y', x + y, nat(x, y), 'doughtemp', [x, y]) }
  static yeastdose(x: number, y: number): CrossFormula { return c('proofing-yeastdose', 'yeastdose(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'yeastdose', [x, y]) }
}

for (const name of ['doughtemp', 'fermentationdegree', 'humiditylevel', 'overproofrisk', 'prooftime', 'temperaturefactor', 'volumegain', 'yeastdose'] as const)
  hexRegisterOf('proofing', name, (ProofingFormulas[name] as (...x: unknown[]) => unknown).bind(ProofingFormulas))
