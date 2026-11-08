import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MAILLARD — scaffolded integer measures crossed to chemistry. Every output an exact finite nonnegative integer. */

const PROOF = 'maillard arithmetic (reactionrate, browningindex, temperaturefactor, aminosugarratio, flavorcompounds, phfactor, timetocolor, crustthickness); scaffolded from the integer-op palette; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'maillard', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `maillard.${name}`, params })

export class MaillardFormulas {
  static reactionrate(x: number, y: number): CrossFormula { return c('maillard-reactionrate', 'reactionrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'reactionrate', [x, y]) }
  static browningindex(x: number, y: number): CrossFormula { return c('maillard-browningindex', 'browningindex(x, y) = x · y', x * y, nat(x, y), 'browningindex', [x, y]) }
  static temperaturefactor(x: number, y: number): CrossFormula { return c('maillard-temperaturefactor', 'temperaturefactor(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'temperaturefactor', [x, y]) }
  static aminosugarratio(x: number, y: number): CrossFormula { return c('maillard-aminosugarratio', 'aminosugarratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'aminosugarratio', [x, y]) }
  static flavorcompounds(x: number, y: number): CrossFormula { return c('maillard-flavorcompounds', 'flavorcompounds(x, y) = x · y', x * y, nat(x, y), 'flavorcompounds', [x, y]) }
  static phfactor(x: number, y: number): CrossFormula { return c('maillard-phfactor', 'phfactor(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'phfactor', [x, y]) }
  static timetocolor(x: number, y: number): CrossFormula { return c('maillard-timetocolor', 'timetocolor(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'timetocolor', [x, y]) }
  static crustthickness(x: number, y: number): CrossFormula { return c('maillard-crustthickness', 'crustthickness(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'crustthickness', [x, y]) }
}

for (const name of ['aminosugarratio', 'browningindex', 'crustthickness', 'flavorcompounds', 'phfactor', 'reactionrate', 'temperaturefactor', 'timetocolor'] as const)
  hexRegisterOf('maillard', name, (MaillardFormulas[name] as (...x: unknown[]) => unknown).bind(MaillardFormulas))
