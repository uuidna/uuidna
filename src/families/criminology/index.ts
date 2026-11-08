import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CRIMINOLOGY — CRIME AS ARITHMETIC, MEASURED AGAINST THE LAW. Policing and justice are numbers: crime rate per
 *  100k, the share cleared, the share who reoffend, the share convicted of those charged, deterred attempts, who is
 *  victimised per 100k, harm per incident, and arrests per offence. Crosses to `law` — criminology is what the law
 *  measures. A measure. */

const PROOF = 'criminology arithmetic (crime rate, clearance, recidivism, conviction, deterrence, victimization, severity, arrest); crime measured against the law; a measure crossed to law'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'criminology', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `criminology.${name}`, params })

export class CriminologyFormulas {
  /** CRIME RATE per 100k of the population. value ⌊crimes · 100000 / population⌋. */
  static rate(crimes: number, population: number): CrossFormula { return c('criminology-rate', 'rate(crimes, population) = ⌊crimes · 100000 / population⌋', population > 0 ? Math.floor((crimes * 100000) / population) : 0, nat(crimes, population) && population > 0, 'rate', [crimes, population]) }
  /** CLEARANCE: the share of reported crimes solved. value ⌊solved · 100 / reported⌋. */
  static clearance(solved: number, reported: number): CrossFormula { return c('criminology-clearance', 'clearance(solved, reported) = ⌊solved · 100 / reported⌋', reported > 0 ? Math.floor((solved * 100) / reported) : 0, nat(solved, reported) && reported > 0 && solved <= reported, 'clearance', [solved, reported]) }
  /** RECIDIVISM: the share of released who reoffend. value ⌊reoffended · 100 / released⌋. */
  static recidivism(reoffended: number, released: number): CrossFormula { return c('criminology-recidivism', 'recidivism(reoffended, released) = ⌊reoffended · 100 / released⌋', released > 0 ? Math.floor((reoffended * 100) / released) : 0, nat(reoffended, released) && released > 0 && reoffended <= released, 'recidivism', [reoffended, released]) }
  /** CONVICTION: the share of charged who are convicted. value ⌊convicted · 100 / charged⌋. */
  static conviction(convicted: number, charged: number): CrossFormula { return c('criminology-conviction', 'conviction(convicted, charged) = ⌊convicted · 100 / charged⌋', charged > 0 ? Math.floor((convicted * 100) / charged) : 0, nat(convicted, charged) && charged > 0 && convicted <= charged, 'conviction', [convicted, charged]) }
  /** DETERRENCE: the share of attempts prevented. value ⌊prevented · 100 / attempts⌋. */
  static deterrence(prevented: number, attempts: number): CrossFormula { return c('criminology-deterrence', 'deterrence(prevented, attempts) = ⌊prevented · 100 / attempts⌋', attempts > 0 ? Math.floor((prevented * 100) / attempts) : 0, nat(prevented, attempts) && attempts > 0 && prevented <= attempts, 'deterrence', [prevented, attempts]) }
  /** VICTIMIZATION per 100k of the population. value ⌊victims · 100000 / population⌋. */
  static victimization(victims: number, population: number): CrossFormula { return c('criminology-victimization', 'victimization(victims, population) = ⌊victims · 100000 / population⌋', population > 0 ? Math.floor((victims * 100000) / population) : 0, nat(victims, population) && population > 0, 'victimization', [victims, population]) }
  /** SEVERITY: harm per incident. value ⌊harm / incidents⌋. */
  static severity(harm: number, incidents: number): CrossFormula { return c('criminology-severity', 'severity(harm, incidents) = ⌊harm / incidents⌋', incidents > 0 ? Math.floor(harm / incidents) : 0, nat(harm, incidents) && incidents > 0, 'severity', [harm, incidents]) }
  /** ARREST: arrests per hundred offences. value ⌊arrests · 100 / offenses⌋. */
  static arrest(arrests: number, offenses: number): CrossFormula { return c('criminology-arrest', 'arrest(arrests, offenses) = ⌊arrests · 100 / offenses⌋', offenses > 0 ? Math.floor((arrests * 100) / offenses) : 0, nat(arrests, offenses) && offenses > 0 && arrests <= offenses, 'arrest', [arrests, offenses]) }
}

for (const name of ['arrest', 'clearance', 'conviction', 'deterrence', 'rate', 'recidivism', 'severity', 'victimization'] as const)
  hexRegisterOf('criminology', name, (CriminologyFormulas[name] as (...x: unknown[]) => unknown).bind(CriminologyFormulas))
