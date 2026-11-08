import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DEPLOYMENT — SHIPPING AS ARITHMETIC (the DORA measures, by hand only in name). How often a release goes out, how long a
 *  commit waits for release, what share of deploys fail, how fast service is restored, how often a release is rolled back,
 *  how available the result is, how healthy a canary is, how many replicas run. Crosses to `cloud` — deployment is what runs
 *  on the cloud. A measure. */

const PROOF = 'deployment arithmetic (frequency, lead time, change-fail rate, MTTR, rollback rate, availability, canary health, replicas); the DORA measures; a measure crossed to cloud'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'deployment', dst: 'cloud', formula, value, proof: PROOF, ...extra }, holds, { name: `deployment.${name}`, params })

export class DeploymentFormulas {
  /** DEPLOY FREQUENCY: deploys per day. value ⌊deploys / days⌋. */
  static frequency(deploys: number, days: number): CrossFormula { return c('deployment-frequency', 'frequency(deploys, days) = ⌊deploys / days⌋', days > 0 ? Math.floor(deploys / days) : 0, nat(deploys, days) && days > 0, 'frequency', [deploys, days]) }
  /** LEAD TIME: time a commit waits for its release. value max(0, release − commit). */
  static leadtime(commit: number, release: number): CrossFormula { return c('deployment-leadtime', 'leadtime(commit, release) = max(0, release − commit)', Math.max(0, release - commit), nat(commit, release), 'leadtime', [commit, release]) }
  /** CHANGE-FAIL RATE as a percentage. value ⌊failed · 100 / deploys⌋. */
  static failrate(failed: number, deploys: number): CrossFormula { return c('deployment-failrate', 'failrate(failed, deploys) = ⌊failed · 100 / deploys⌋', deploys > 0 ? Math.floor((failed * 100) / deploys) : 0, nat(failed, deploys) && deploys > 0 && failed <= deploys, 'failrate', [failed, deploys]) }
  /** MEAN TIME TO RESTORE: downtime over incidents. value ⌊downtime / incidents⌋. */
  static mttr(downtime: number, incidents: number): CrossFormula { return c('deployment-mttr', 'mttr(downtime, incidents) = ⌊downtime / incidents⌋', incidents > 0 ? Math.floor(downtime / incidents) : 0, nat(downtime, incidents) && incidents > 0, 'mttr', [downtime, incidents]) }
  /** ROLLBACK RATE as a percentage. value ⌊rollbacks · 100 / deploys⌋. */
  static rollback(rollbacks: number, deploys: number): CrossFormula { return c('deployment-rollback', 'rollback(rollbacks, deploys) = ⌊rollbacks · 100 / deploys⌋', deploys > 0 ? Math.floor((rollbacks * 100) / deploys) : 0, nat(rollbacks, deploys) && deploys > 0 && rollbacks <= deploys, 'rollback', [rollbacks, deploys]) }
  /** AVAILABILITY as a percentage. value ⌊up · 100 / total⌋. */
  static availability(up: number, total: number): CrossFormula { return c('deployment-availability', 'availability(up, total) = ⌊up · 100 / total⌋', total > 0 ? Math.floor((up * 100) / total) : 0, nat(up, total) && total > 0 && up <= total, 'availability', [up, total]) }
  /** CANARY HEALTH: healthy instances as a percentage. value ⌊healthy · 100 / instances⌋. */
  static canary(healthy: number, instances: number): CrossFormula { return c('deployment-canary', 'canary(healthy, instances) = ⌊healthy · 100 / instances⌋', instances > 0 ? Math.floor((healthy * 100) / instances) : 0, nat(healthy, instances) && instances > 0 && healthy <= instances, 'canary', [healthy, instances]) }
  /** REPLICAS: the running count. value count. */
  static replicas(count: number): CrossFormula { return c('deployment-replicas', 'replicas(count) = count', count, nat(count), 'replicas', [count]) }
}

for (const name of ['availability', 'canary', 'failrate', 'frequency', 'leadtime', 'mttr', 'replicas', 'rollback'] as const)
  hexRegisterOf('deployment', name, (DeploymentFormulas[name] as (...x: unknown[]) => unknown).bind(DeploymentFormulas))
