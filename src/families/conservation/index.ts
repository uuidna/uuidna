import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONSERVATION — PROTECTING LIFE, AS ARITHMETIC. The work of keeping species and habitats alive is numbers: the share of
 *  habitat reserved, a population against its historical baseline, how connected the fragments are, the share of species
 *  threatened, how much lost ground is restored, how many a place can carry, poaching seized against the estimate, and
 *  whether a population clears its minimum viable size. Crosses to `ecology` — conservation acts on what ecology describes. */

const PROOF = 'conservation arithmetic (protected share, population baseline, corridor connectivity, threatened share, restoration, carrying capacity, poaching seized, minimum viability); acting on what ecology describes; a measure crossed to ecology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'conservation', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `conservation.${name}`, params })

export class ConservationFormulas {
  /** PROTECTED SHARE: the percentage of habitat set aside. value ⌊reserved · 100 / habitat⌋. */
  static protected(reserved: number, habitat: number): CrossFormula { return c('conservation-protected', 'protected(reserved, habitat) = ⌊reserved · 100 / habitat⌋', habitat > 0 ? Math.floor((reserved * 100) / habitat) : 0, nat(reserved, habitat) && habitat > 0 && reserved <= habitat, 'protected', [reserved, habitat]) }
  /** POPULATION against its historical baseline. value ⌊current · 100 / historical⌋. */
  static population(current: number, historical: number): CrossFormula { return c('conservation-population', 'population(current, historical) = ⌊current · 100 / historical⌋', historical > 0 ? Math.floor((current * 100) / historical) : 0, nat(current, historical) && historical > 0, 'population', [current, historical]) }
  /** CORRIDOR connectivity: connected routes per fragment. value ⌊connected / fragments⌋. */
  static corridor(connected: number, fragments: number): CrossFormula { return c('conservation-corridor', 'corridor(connected, fragments) = ⌊connected / fragments⌋', fragments > 0 ? Math.floor(connected / fragments) : 0, nat(connected, fragments) && fragments > 0, 'corridor', [connected, fragments]) }
  /** THREATENED share of species. value ⌊endangered · 100 / species⌋. */
  static threatened(endangered: number, species: number): CrossFormula { return c('conservation-threatened', 'threatened(endangered, species) = ⌊endangered · 100 / species⌋', species > 0 ? Math.floor((endangered * 100) / species) : 0, nat(endangered, species) && species > 0 && endangered <= species, 'threatened', [endangered, species]) }
  /** RESTORATION: the share of lost ground restored. value ⌊restored · 100 / lost⌋. */
  static restoration(restored: number, lost: number): CrossFormula { return c('conservation-restoration', 'restoration(restored, lost) = ⌊restored · 100 / lost⌋', lost > 0 ? Math.floor((restored * 100) / lost) : 0, nat(restored, lost) && lost > 0, 'restoration', [restored, lost]) }
  /** CARRYING CAPACITY: individuals a place can carry at a per-head demand. value ⌊resources / demand⌋. */
  static carrying(resources: number, demand: number): CrossFormula { return c('conservation-carrying', 'carrying(resources, demand) = ⌊resources / demand⌋', demand > 0 ? Math.floor(resources / demand) : 0, nat(resources, demand) && demand > 0, 'carrying', [resources, demand]) }
  /** POACHING seized against the estimate. value ⌊seized · 100 / estimated⌋. */
  static poaching(seized: number, estimated: number): CrossFormula { return c('conservation-poaching', 'poaching(seized, estimated) = ⌊seized · 100 / estimated⌋', estimated > 0 ? Math.floor((seized * 100) / estimated) : 0, nat(seized, estimated) && estimated > 0, 'poaching', [seized, estimated]) }
  /** VIABILITY: a population against its minimum viable size. value ⌊individuals · 100 / minimum⌋. */
  static viability(individuals: number, minimum: number): CrossFormula { return c('conservation-viability', 'viability(individuals, minimum) = ⌊individuals · 100 / minimum⌋', minimum > 0 ? Math.floor((individuals * 100) / minimum) : 0, nat(individuals, minimum) && minimum > 0, 'viability', [individuals, minimum]) }
}

for (const name of ['carrying', 'corridor', 'poaching', 'population', 'protected', 'restoration', 'threatened', 'viability'] as const)
  hexRegisterOf('conservation', name, (ConservationFormulas[name] as (...x: unknown[]) => unknown).bind(ConservationFormulas))
