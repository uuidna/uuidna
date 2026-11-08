import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MINING — MINERAL EXTRACTION ECONOMICS, AS ARITHMETIC. Pulling metal from rock is numbers: the grade of the ore, how
 *  much of the metal is recovered, the reserves a deposit holds, the waste stripped per tonne of ore, whether a block
 *  clears the cut-off, the mill's throughput, the process yield, and the cost to move a tonne. Crosses to `econ` — mining
 *  is economics in the ground. A measure. */

const PROOF = 'mining arithmetic (ore grade, recovery, reserves, stripping ratio, cut-off, throughput, yield, cost); mineral extraction economics as integers; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mining', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `mining.${name}`, params })

export class MiningFormulas {
  /** ORE GRADE: metal in the ore, in parts per million. value ⌊metal · 1000000 / ore⌋. */
  static grade(metal: number, ore: number): CrossFormula { return c('mining-grade', 'grade(metal, ore) = ⌊metal · 1000000 / ore⌋', ore > 0 ? Math.floor((metal * 1000000) / ore) : 0, nat(metal, ore) && ore > 0, 'grade', [metal, ore]) }
  /** RECOVERY: the metal recovered out of what the ore contained, as a percentage. value ⌊recovered · 100 / contained⌋. */
  static recovery(recovered: number, contained: number): CrossFormula { return c('mining-recovery', 'recovery(recovered, contained) = ⌊recovered · 100 / contained⌋', contained > 0 ? Math.floor((recovered * 100) / contained) : 0, nat(recovered, contained) && contained > 0 && recovered <= contained, 'recovery', [recovered, contained]) }
  /** RESERVES: the metal a tonnage of ore holds at a grade (ppm). value ⌊tonnage · grade / 1000000⌋. */
  static reserves(tonnage: number, grade: number): CrossFormula { return c('mining-reserves', 'reserves(tonnage, grade) = ⌊tonnage · grade / 1000000⌋', Math.floor((tonnage * grade) / 1000000), nat(tonnage, grade), 'reserves', [tonnage, grade]) }
  /** STRIPPING RATIO: waste moved per tonne of ore, as a percentage. value ⌊waste · 100 / ore⌋. */
  static stripping(waste: number, ore: number): CrossFormula { return c('mining-stripping', 'stripping(waste, ore) = ⌊waste · 100 / ore⌋', ore > 0 ? Math.floor((waste * 100) / ore) : 0, nat(waste, ore) && ore > 0, 'stripping', [waste, ore]) }
  /** CUT-OFF: 1 when a block's grade clears the threshold. value [grade ≥ threshold]. */
  static cutoff(grade: number, threshold: number): CrossFormula { return c('mining-cutoff', 'cutoff(grade, threshold) = [grade ≥ threshold]', grade >= threshold ? 1 : 0, nat(grade, threshold), 'cutoff', [grade, threshold]) }
  /** THROUGHPUT: tonnes milled over the hours run. value ⌊tonnes / hours⌋. */
  static throughput(tonnes: number, hours: number): CrossFormula { return c('mining-throughput', 'throughput(tonnes, hours) = ⌊tonnes / hours⌋', hours > 0 ? Math.floor(tonnes / hours) : 0, nat(tonnes, hours) && hours > 0, 'throughput', [tonnes, hours]) }
  /** YIELD: product out of the feed, as a percentage. value ⌊product · 100 / feed⌋. */
  static yield(product: number, feed: number): CrossFormula { return c('mining-yield', 'yield(product, feed) = ⌊product · 100 / feed⌋', feed > 0 ? Math.floor((product * 100) / feed) : 0, nat(product, feed) && feed > 0 && product <= feed, 'yield', [product, feed]) }
  /** COST: tonnes moved at a per-tonne rate. value tonnes · rate. */
  static cost(tonnes: number, rate: number): CrossFormula { return c('mining-cost', 'cost(tonnes, rate) = tonnes · rate', tonnes * rate, nat(tonnes, rate), 'cost', [tonnes, rate]) }
}

for (const name of ['cost', 'cutoff', 'grade', 'recovery', 'reserves', 'stripping', 'throughput', 'yield'] as const)
  hexRegisterOf('mining', name, (MiningFormulas[name] as (...x: unknown[]) => unknown).bind(MiningFormulas))
