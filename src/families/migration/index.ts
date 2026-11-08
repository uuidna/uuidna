import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MIGRATION — HUMAN MOVEMENT, AS ARITHMETIC (chosen by the public-API registry, not by hand). People moving is numbers:
 *  net migration, the gross flow across a border, the rate per thousand, push vs pull pressure, the share sent home as
 *  remittances, how many of the arrivals settle, how many return, and an integration index. Crosses to `sociology` —
 *  migration is what sociology studies. A measure. */

const PROOF = 'migration arithmetic (net migration, gross flow, rate, push-pull, remittance share, settlement ratio, return rate, integration index); a public-API registry domain; a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'migration', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `migration.${name}`, params })

export class MigrationFormulas {
  /** NET MIGRATION: arrivals minus departures, never below zero. value max(0, inflow − outflow). */
  static netmigration(inflow: number, outflow: number): CrossFormula { return c('migration-netmigration', 'netmigration(inflow, outflow) = max(0, inflow − outflow)', Math.max(0, inflow - outflow), nat(inflow, outflow), 'netmigration', [inflow, outflow]) }
  /** GROSS FLOW: total movement across the border. value inflow + outflow. */
  static grossflow(inflow: number, outflow: number): CrossFormula { return c('migration-grossflow', 'grossflow(inflow, outflow) = inflow + outflow', inflow + outflow, nat(inflow, outflow), 'grossflow', [inflow, outflow]) }
  /** MIGRATION RATE per thousand of population. value ⌊migrants · 1000 / population⌋. */
  static rate(migrants: number, population: number): CrossFormula { return c('migration-rate', 'rate(migrants, population) = ⌊migrants · 1000 / population⌋', population > 0 ? Math.floor((migrants * 1000) / population) : 0, nat(migrants, population) && population > 0, 'rate', [migrants, population]) }
  /** PUSH-PULL: net pull pressure, never below zero. value max(0, pull − push). */
  static pushpull(push: number, pull: number): CrossFormula { return c('migration-pushpull', 'pushpull(push, pull) = max(0, pull − push)', Math.max(0, pull - push), nat(push, pull), 'pushpull', [push, pull]) }
  /** REMITTANCE SHARE of income, as a percentage. value ⌊remittance · 100 / income⌋. */
  static remittanceshare(remittance: number, income: number): CrossFormula { return c('migration-remittanceshare', 'remittanceshare(remittance, income) = ⌊remittance · 100 / income⌋', income > 0 ? Math.floor((remittance * 100) / income) : 0, nat(remittance, income) && income > 0, 'remittanceshare', [remittance, income]) }
  /** SETTLEMENT RATIO: arrivals that settle, as a percentage. value ⌊settled · 100 / arrivals⌋. */
  static settlementratio(settled: number, arrivals: number): CrossFormula { return c('migration-settlementratio', 'settlementratio(settled, arrivals) = ⌊settled · 100 / arrivals⌋', arrivals > 0 ? Math.floor((settled * 100) / arrivals) : 0, nat(settled, arrivals) && arrivals > 0 && settled <= arrivals, 'settlementratio', [settled, arrivals]) }
  /** RETURN RATE: emigrants that return, as a percentage. value ⌊returned · 100 / emigrated⌋. */
  static returnrate(returned: number, emigrated: number): CrossFormula { return c('migration-returnrate', 'returnrate(returned, emigrated) = ⌊returned · 100 / emigrated⌋', emigrated > 0 ? Math.floor((returned * 100) / emigrated) : 0, nat(returned, emigrated) && emigrated > 0 && returned <= emigrated, 'returnrate', [returned, emigrated]) }
  /** INTEGRATION INDEX: the mean of employment, language and tenure scores. value ⌊(employed + language + years) / 3⌋. */
  static integrationindex(employed: number, language: number, years: number): CrossFormula { return c('migration-integrationindex', 'integrationindex(employed, language, years) = ⌊(employed + language + years) / 3⌋', Math.floor((employed + language + years) / 3), nat(employed, language, years), 'integrationindex', [employed, language, years]) }
}

for (const name of ['grossflow', 'integrationindex', 'netmigration', 'pushpull', 'rate', 'remittanceshare', 'returnrate', 'settlementratio'] as const)
  hexRegisterOf('migration', name, (MigrationFormulas[name] as (...x: unknown[]) => unknown).bind(MigrationFormulas))
