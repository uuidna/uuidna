import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HARVEST — BRINGING A CROP IN, AS ARITHMETIC (chosen by the public-API registry, not by hand). Reaping is numbers: the
 *  yield an area collects, the fraction lost, units brought in per hour, labor spent, how hard a machine is worked, the
 *  moisture in the grain, what survives to store, and the days the window still holds. Crosses to `agriculture` — harvest
 *  is where agriculture is measured. A measure. */

const PROOF = 'harvest arithmetic (yield collected, loss percent, throughput, labor-hours, machine efficiency, moisture content, stored yield, window days); a reaping measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'harvest', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `harvest.${name}`, params })

export class HarvestFormulas {
  /** YIELD COLLECTED: an area at a per-area rate. value area · rate. */
  static ratescollected(area: number, rate: number): CrossFormula { return c('harvest-ratescollected', 'ratescollected(area, rate) = area · rate', area * rate, nat(area, rate), 'ratescollected', [area, rate]) }
  /** LOSS as a percentage of the crop. value ⌊lost · 100 / total⌋. */
  static losspercent(lost: number, total: number): CrossFormula { return c('harvest-losspercent', 'losspercent(lost, total) = ⌊lost · 100 / total⌋', total > 0 ? Math.floor((lost * 100) / total) : 0, nat(lost, total) && total > 0 && lost <= total, 'losspercent', [lost, total]) }
  /** THROUGHPUT: units brought in over the hours worked. value ⌊units / hours⌋. */
  static throughput(units: number, hours: number): CrossFormula { return c('harvest-throughput', 'throughput(units, hours) = ⌊units / hours⌋', hours > 0 ? Math.floor(units / hours) : 0, nat(units, hours) && hours > 0, 'throughput', [units, hours]) }
  /** LABOR: workers over the hours each works. value workers · hours. */
  static laborhours(workers: number, hours: number): CrossFormula { return c('harvest-laborhours', 'laborhours(workers, hours) = workers · hours', workers * hours, nat(workers, hours), 'laborhours', [workers, hours]) }
  /** MACHINE EFFICIENCY: worked against rated capacity, as a percentage. value ⌊actual · 100 / capacity⌋. */
  static machineefficiency(actual: number, capacity: number): CrossFormula { return c('harvest-machineefficiency', 'machineefficiency(actual, capacity) = ⌊actual · 100 / capacity⌋', capacity > 0 ? Math.floor((actual * 100) / capacity) : 0, nat(actual, capacity) && capacity > 0, 'machineefficiency', [actual, capacity]) }
  /** MOISTURE: water in the grain, as a percentage. value ⌊water · 100 / total⌋. */
  static moisturecontent(water: number, total: number): CrossFormula { return c('harvest-moisturecontent', 'moisturecontent(water, total) = ⌊water · 100 / total⌋', total > 0 ? Math.floor((water * 100) / total) : 0, nat(water, total) && total > 0 && water <= total, 'moisturecontent', [water, total]) }
  /** STORED YIELD: what survives the gross after loss. value max(0, gross − loss). */
  static storageyield(gross: number, loss: number): CrossFormula { return c('harvest-storageyield', 'storageyield(gross, loss) = max(0, gross − loss)', Math.max(0, gross - loss), nat(gross, loss), 'storageyield', [gross, loss]) }
  /** WINDOW: days the harvest window still holds. value max(0, deadline − current). */
  static windowdays(deadline: number, current: number): CrossFormula { return c('harvest-windowdays', 'windowdays(deadline, current) = max(0, deadline − current)', Math.max(0, deadline - current), nat(deadline, current), 'windowdays', [deadline, current]) }
}

for (const name of ['laborhours', 'losspercent', 'machineefficiency', 'moisturecontent', 'ratescollected', 'storageyield', 'throughput', 'windowdays'] as const)
  hexRegisterOf('harvest', name, (HarvestFormulas[name] as (...x: unknown[]) => unknown).bind(HarvestFormulas))
