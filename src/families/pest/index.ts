import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PEST — INTEGRATED PEST MANAGEMENT AS ARITHMETIC. Deciding when and how to act on a pest is numbers: the economic
 *  threshold that justifies treating, the share of a stand infested, how well a control killed, the damage done, how a
 *  population grows, what a treatment costs, the fraction that survives, and the traps a field needs. Crosses to
 *  `ecology` — pest pressure is an ecological force acting on a system. A measure. */

const PROOF = 'pest arithmetic (economic threshold, infestation rate, control efficacy, damage index, population growth, treatment cost, surviving fraction, trap count); integrated pest management as a measure crossed to ecology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pest', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `pest.${name}`, params })

export class PestFormulas {
  /** ECONOMIC THRESHOLD: the pest density that justifies treating, control cost over value saved per unit. value ⌊cost / value⌋. */
  static economicthreshold(cost: number, value: number): CrossFormula { return c('pest-economicthreshold', 'economicthreshold(cost, value) = ⌊cost / value⌋', value > 0 ? Math.floor(cost / value) : 0, nat(cost, value) && value > 0, 'economicthreshold', [cost, value]) }
  /** INFESTATION RATE: infested units of a stand, as a percentage. value ⌊infested · 100 / total⌋. */
  static infestationrate(infested: number, total: number): CrossFormula { return c('pest-infestationrate', 'infestationrate(infested, total) = ⌊infested · 100 / total⌋', total > 0 ? Math.floor((infested * 100) / total) : 0, nat(infested, total) && total > 0 && infested <= total, 'infestationrate', [infested, total]) }
  /** CONTROL EFFICACY: the share of pests a control killed, as a percentage. value ⌊killed · 100 / initial⌋. */
  static controlefficacy(killed: number, initial: number): CrossFormula { return c('pest-controlefficacy', 'controlefficacy(killed, initial) = ⌊killed · 100 / initial⌋', initial > 0 ? Math.floor((killed * 100) / initial) : 0, nat(killed, initial) && initial > 0 && killed <= initial, 'controlefficacy', [killed, initial]) }
  /** DAMAGE INDEX: damaged units weighted by severity. value units · severity. */
  static damageindex(units: number, severity: number): CrossFormula { return c('pest-damageindex', 'damageindex(units, severity) = units · severity', units * severity, nat(units, severity), 'damageindex', [units, severity]) }
  /** POPULATION GROWTH: a population after one generation at a percentage growth rate. value pop + ⌊pop · rate / 100⌋. */
  static populationgrowth(pop: number, rate: number): CrossFormula { return c('pest-populationgrowth', 'populationgrowth(pop, rate) = pop + ⌊pop · rate / 100⌋', pop + Math.floor((pop * rate) / 100), nat(pop, rate), 'populationgrowth', [pop, rate]) }
  /** TREATMENT COST: area treated at a cost per unit area. value area · rate. */
  static treatmentcost(area: number, rate: number): CrossFormula { return c('pest-treatmentcost', 'treatmentcost(area, rate) = area · rate', area * rate, nat(area, rate), 'treatmentcost', [area, rate]) }
  /** SURVIVING FRACTION: the share of a population still alive after control, as a percentage. value ⌊survivors · 100 / initial⌋. */
  static survivingfraction(survivors: number, initial: number): CrossFormula { return c('pest-survivingfraction', 'survivingfraction(survivors, initial) = ⌊survivors · 100 / initial⌋', initial > 0 ? Math.floor((survivors * 100) / initial) : 0, nat(survivors, initial) && initial > 0 && survivors <= initial, 'survivingfraction', [survivors, initial]) }
  /** TRAP COUNT: the traps a field needs at a per-trap coverage. value ⌈area / perTrap⌉. */
  static trapcount(area: number, perTrap: number): CrossFormula { return c('pest-trapcount', 'trapcount(area, perTrap) = ⌈area / perTrap⌉', perTrap > 0 ? Math.ceil(area / perTrap) : 0, nat(area, perTrap) && perTrap > 0, 'trapcount', [area, perTrap]) }
}

for (const name of ['controlefficacy', 'damageindex', 'economicthreshold', 'infestationrate', 'populationgrowth', 'survivingfraction', 'trapcount', 'treatmentcost'] as const)
  hexRegisterOf('pest', name, (PestFormulas[name] as (...x: unknown[]) => unknown).bind(PestFormulas))
