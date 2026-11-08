import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VIROLOGY — THE VIRUS, AS ARITHMETIC. Counting virus is numbers: titer by plaque assay, viral load per volume, burst size,
 *  infectivity, mutation rate per million bases, incubation days, how fast the host clears it, and how much antibody neutralizes.
 *  Crosses to `med` — virology is what medicine measures and treats. A measure. */

const PROOF = 'virology arithmetic (titer, viral load, burst size, infectivity, mutation rate, latency, clearance, neutralization); counting the virus; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'virology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `virology.${name}`, params })

export class VirologyFormulas {
  /** TITER: plaques at a dilution, a PFU/mL proxy. value plaques · dilution. */
  static titer(plaques: number, dilution: number): CrossFormula { return c('virology-titer', 'titer(plaques, dilution) = plaques · dilution', plaques * dilution, nat(plaques, dilution), 'titer', [plaques, dilution]) }
  /** VIRAL LOAD: genome copies over the sample volume. value ⌊copies / volume⌋. */
  static load(copies: number, volume: number): CrossFormula { return c('virology-load', 'load(copies, volume) = ⌊copies / volume⌋', volume > 0 ? Math.floor(copies / volume) : 0, nat(copies, volume) && volume > 0, 'load', [copies, volume]) }
  /** BURST SIZE: virions produced per infected cell. value ⌊produced / infected⌋. */
  static replication(produced: number, infected: number): CrossFormula { return c('virology-replication', 'replication(produced, infected) = ⌊produced / infected⌋', infected > 0 ? Math.floor(produced / infected) : 0, nat(produced, infected) && infected > 0, 'replication', [produced, infected]) }
  /** INFECTIVITY as a percentage of those exposed. value ⌊infected · 100 / exposed⌋. */
  static infectivity(infected: number, exposed: number): CrossFormula { return c('virology-infectivity', 'infectivity(infected, exposed) = ⌊infected · 100 / exposed⌋', exposed > 0 ? Math.floor((infected * 100) / exposed) : 0, nat(infected, exposed) && exposed > 0 && infected <= exposed, 'infectivity', [infected, exposed]) }
  /** MUTATION RATE: changed bases per million of the genome. value ⌊changed · 1000000 / genome⌋. */
  static mutation(changed: number, genome: number): CrossFormula { return c('virology-mutation', 'mutation(changed, genome) = ⌊changed · 1000000 / genome⌋', genome > 0 ? Math.floor((changed * 1000000) / genome) : 0, nat(changed, genome) && genome > 0 && changed <= genome, 'mutation', [changed, genome]) }
  /** LATENCY: incubation days before symptoms. value days. */
  static latency(days: number): CrossFormula { return c('virology-latency', 'latency(days) = days', days, nat(days), 'latency', [days]) }
  /** CLEARANCE as a percentage of the initial load cleared. value ⌊cleared · 100 / initial⌋. */
  static clearance(cleared: number, initial: number): CrossFormula { return c('virology-clearance', 'clearance(cleared, initial) = ⌊cleared · 100 / initial⌋', initial > 0 ? Math.floor((cleared * 100) / initial) : 0, nat(cleared, initial) && initial > 0 && cleared <= initial, 'clearance', [cleared, initial]) }
  /** NEUTRALIZATION as a percentage of virus blocked by antibody. value ⌊blocked · 100 / virus⌋. */
  static neutralization(blocked: number, virus: number): CrossFormula { return c('virology-neutralization', 'neutralization(blocked, virus) = ⌊blocked · 100 / virus⌋', virus > 0 ? Math.floor((blocked * 100) / virus) : 0, nat(blocked, virus) && virus > 0 && blocked <= virus, 'neutralization', [blocked, virus]) }
}

for (const name of ['clearance', 'infectivity', 'latency', 'load', 'mutation', 'neutralization', 'replication', 'titer'] as const)
  hexRegisterOf('virology', name, (VirologyFormulas[name] as (...x: unknown[]) => unknown).bind(VirologyFormulas))
