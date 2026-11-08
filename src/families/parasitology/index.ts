import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PARASITOLOGY — HOST–PARASITE EPIDEMIOLOGY, AS ARITHMETIC (chosen by the public-API registry, not by hand). A parasite
 *  population in a host population is numbers: how many hosts carry it, how heavy each infection is, the total worm burden,
 *  the mean across every host, how clumped the distribution is, how many new infections a contact rate yields, how long a
 *  life cycle runs, and whether an infective dose clears threshold. Crosses to `microbiology` — parasitology is the
 *  macro-organism arm of what microbiology measures. A measure. */

const PROOF = 'parasitology arithmetic (prevalence, intensity, burden, abundance, aggregation, transmission, lifecycle, infectivity); the registry\'s host–parasite domain; a measure crossed to microbiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'parasitology', dst: 'microbiology', formula, value, proof: PROOF, ...extra }, holds, { name: `parasitology.${name}`, params })

export class ParasitologyFormulas {
  /** PREVALENCE: the percentage of hosts carrying the parasite. value ⌊infected · 100 / total⌋. */
  static prevalence(infected: number, total: number): CrossFormula { return c('parasitology-prevalence', 'prevalence(infected, total) = ⌊infected · 100 / total⌋', total > 0 ? Math.floor((infected * 100) / total) : 0, nat(infected, total) && total > 0 && infected <= total, 'prevalence', [infected, total]) }
  /** INTENSITY: mean parasites per infected host. value ⌊parasites / infected⌋. */
  static intensity(parasites: number, infected: number): CrossFormula { return c('parasitology-intensity', 'intensity(parasites, infected) = ⌊parasites / infected⌋', infected > 0 ? Math.floor(parasites / infected) : 0, nat(parasites, infected) && infected > 0, 'intensity', [parasites, infected]) }
  /** BURDEN: total parasite burden, hosts at a load each. value hosts · perHost. */
  static burden(hosts: number, perHost: number): CrossFormula { return c('parasitology-burden', 'burden(hosts, perHost) = hosts · perHost', hosts * perHost, nat(hosts, perHost), 'burden', [hosts, perHost]) }
  /** ABUNDANCE: mean parasites across every host, infected or not. value ⌊parasites / total⌋. */
  static abundance(parasites: number, total: number): CrossFormula { return c('parasitology-abundance', 'abundance(parasites, total) = ⌊parasites / total⌋', total > 0 ? Math.floor(parasites / total) : 0, nat(parasites, total) && total > 0, 'abundance', [parasites, total]) }
  /** AGGREGATION: the dispersion index, how clumped the parasites are. value ⌊variance / mean⌋. */
  static aggregation(variance: number, mean: number): CrossFormula { return c('parasitology-aggregation', 'aggregation(variance, mean) = ⌊variance / mean⌋', mean > 0 ? Math.floor(variance / mean) : 0, nat(variance, mean) && mean > 0, 'aggregation', [variance, mean]) }
  /** TRANSMISSION: new infections from contacts at a per-cent rate. value ⌊contacts · rate / 100⌋. */
  static transmission(contacts: number, rate: number): CrossFormula { return c('parasitology-transmission', 'transmission(contacts, rate) = ⌊contacts · rate / 100⌋', Math.floor((contacts * rate) / 100), nat(contacts, rate), 'transmission', [contacts, rate]) }
  /** LIFECYCLE: total development time, stages at a span each. value stages · days. */
  static lifecycle(stages: number, days: number): CrossFormula { return c('parasitology-lifecycle', 'lifecycle(stages, days) = stages · days', stages * days, nat(stages, days), 'lifecycle', [stages, days]) }
  /** INFECTIVITY: 1 when the dose clears the infective threshold (ID50). value [dose ≥ id50]. */
  static infectivity(dose: number, id50: number): CrossFormula { return c('parasitology-infectivity', 'infectivity(dose, id50) = [dose ≥ id50]', dose >= id50 ? 1 : 0, nat(dose, id50), 'infectivity', [dose, id50]) }
}

for (const name of ['abundance', 'aggregation', 'burden', 'infectivity', 'intensity', 'lifecycle', 'prevalence', 'transmission'] as const)
  hexRegisterOf('parasitology', name, (ParasitologyFormulas[name] as (...x: unknown[]) => unknown).bind(ParasitologyFormulas))
