import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** APOPTOSIS — PROGRAMMED CELL DEATH, AS ARITHMETIC. The orderly removal of cells is numbers: the fraction that die, the
 *  fraction that survive, how active the caspases are, how fast a tissue turns over, how quickly apoptotic bodies are
 *  cleared, the net growth left behind, the apoptotic index a pathologist counts, and the half-life of a population.
 *  Crosses to `physiology` — apoptosis is what the living system regulates. A measure. */

const PROOF = 'apoptosis arithmetic (death rate, survival fraction, caspase activity, tissue turnover, clearance, net growth, apoptotic index, half-life); a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'apoptosis', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `apoptosis.${name}`, params })

export class ApoptosisFormulas {
  /** DEATH RATE: dead cells as a percentage of the total. value ⌊dead · 100 / total⌋. */
  static deathrate(dead: number, total: number): CrossFormula { return c('apoptosis-deathrate', 'deathrate(dead, total) = ⌊dead · 100 / total⌋', total > 0 ? Math.floor((dead * 100) / total) : 0, nat(dead, total) && total > 0 && dead <= total, 'deathrate', [dead, total]) }
  /** SURVIVAL FRACTION: survivors as a percentage of the total. value ⌊(total − dead) · 100 / total⌋. */
  static survivalfraction(dead: number, total: number): CrossFormula { return c('apoptosis-survivalfraction', 'survivalfraction(dead, total) = ⌊(total − dead) · 100 / total⌋', total > 0 ? Math.floor((Math.max(0, total - dead) * 100) / total) : 0, nat(dead, total) && total > 0 && dead <= total, 'survivalfraction', [dead, total]) }
  /** CASPASE ACTIVITY: substrate molecules cleaved at a per-substrate rate. value substrate · rate. */
  static caspaseactivity(substrate: number, rate: number): CrossFormula { return c('apoptosis-caspaseactivity', 'caspaseactivity(substrate, rate) = substrate · rate', substrate * rate, nat(substrate, rate), 'caspaseactivity', [substrate, rate]) }
  /** TURNOVER: cells replaced per day across the span. value ⌊cells / days⌋. */
  static turnover(cells: number, days: number): CrossFormula { return c('apoptosis-turnover', 'turnover(cells, days) = ⌊cells / days⌋', days > 0 ? Math.floor(cells / days) : 0, nat(cells, days) && days > 0, 'turnover', [cells, days]) }
  /** CLEARANCE: the phagocyte passes needed to clear the apoptotic bodies. value ⌈bodies / phagocytes⌉. */
  static clearance(bodies: number, phagocytes: number): CrossFormula { return c('apoptosis-clearance', 'clearance(bodies, phagocytes) = ⌈bodies / phagocytes⌉', phagocytes > 0 ? Math.ceil(bodies / phagocytes) : 0, nat(bodies, phagocytes) && phagocytes > 0, 'clearance', [bodies, phagocytes]) }
  /** NET GROWTH: births over deaths, never below zero. value max(0, births − deaths). */
  static netgrowth(births: number, deaths: number): CrossFormula { return c('apoptosis-netgrowth', 'netgrowth(births, deaths) = max(0, births − deaths)', Math.max(0, births - deaths), nat(births, deaths), 'netgrowth', [births, deaths]) }
  /** APOPTOTIC INDEX: apoptotic cells per thousand counted. value ⌊apoptotic · 1000 / total⌋. */
  static apoptoticindex(apoptotic: number, total: number): CrossFormula { return c('apoptosis-apoptoticindex', 'apoptoticindex(apoptotic, total) = ⌊apoptotic · 1000 / total⌋', total > 0 ? Math.floor((apoptotic * 1000) / total) : 0, nat(apoptotic, total) && total > 0 && apoptotic <= total, 'apoptoticindex', [apoptotic, total]) }
  /** HALF-LIFE: elapsed time per halving of the population. value ⌊elapsed / halvings⌋. */
  static halflife(elapsed: number, halvings: number): CrossFormula { return c('apoptosis-halflife', 'halflife(elapsed, halvings) = ⌊elapsed / halvings⌋', halvings > 0 ? Math.floor(elapsed / halvings) : 0, nat(elapsed, halvings) && halvings > 0, 'halflife', [elapsed, halvings]) }
}

for (const name of ['apoptoticindex', 'caspaseactivity', 'clearance', 'deathrate', 'halflife', 'netgrowth', 'survivalfraction', 'turnover'] as const)
  hexRegisterOf('apoptosis', name, (ApoptosisFormulas[name] as (...x: unknown[]) => unknown).bind(ApoptosisFormulas))
