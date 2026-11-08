import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RECYCLING — MATERIAL RECOVERY AS ARITHMETIC (chosen by the registry, not by hand). Reclaiming material is numbers:
 *  the recycling rate, waste diverted, contamination, material recovery, output purity, energy saved over virgin production,
 *  processing throughput, and what still reaches landfill. Crosses to `logistics` — recycling is a flow of mass through
 *  collection and sorting. A measure. */

const PROOF = 'recycling arithmetic (rate, diversion, contamination, recovery, purity, energy saved, throughput, landfill); material recovery as a flow of mass; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'recycling', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `recycling.${name}`, params })

export class RecyclingFormulas {
  /** CONTAMINATION: rejected material as a percentage of what was collected. value ⌊rejected · 100 / collected⌋. */
  static contamination(rejected: number, collected: number): CrossFormula { return c('recycling-contamination', 'contamination(rejected, collected) = ⌊rejected · 100 / collected⌋', collected > 0 ? Math.floor((rejected * 100) / collected) : 0, nat(rejected, collected) && collected > 0 && rejected <= collected, 'contamination', [rejected, collected]) }
  /** DIVERSION: material diverted from landfill as a percentage of the total. value ⌊diverted · 100 / total⌋. */
  static diversion(diverted: number, total: number): CrossFormula { return c('recycling-diversion', 'diversion(diverted, total) = ⌊diverted · 100 / total⌋', total > 0 ? Math.floor((diverted * 100) / total) : 0, nat(diverted, total) && total > 0 && diverted <= total, 'diversion', [diverted, total]) }
  /** ENERGY: energy saved over virgin production, as a percentage. value ⌊saved · 100 / virgin⌋. */
  static energy(saved: number, virgin: number): CrossFormula { return c('recycling-energy', 'energy(saved, virgin) = ⌊saved · 100 / virgin⌋', virgin > 0 ? Math.floor((saved * 100) / virgin) : 0, nat(saved, virgin) && virgin > 0, 'energy', [saved, virgin]) }
  /** LANDFILL: what still reaches landfill as a percentage of what was generated. value ⌊(generated − diverted) · 100 / generated⌋. */
  static landfill(diverted: number, generated: number): CrossFormula { return c('recycling-landfill', 'landfill(diverted, generated) = ⌊(generated − diverted) · 100 / generated⌋', generated > 0 ? Math.floor(((generated - diverted) * 100) / generated) : 0, nat(diverted, generated) && generated > 0 && diverted <= generated, 'landfill', [diverted, generated]) }
  /** PURITY: output as a percentage of the feedstock. value ⌊output · 100 / feedstock⌋. */
  static purity(output: number, feedstock: number): CrossFormula { return c('recycling-purity', 'purity(output, feedstock) = ⌊output · 100 / feedstock⌋', feedstock > 0 ? Math.floor((output * 100) / feedstock) : 0, nat(output, feedstock) && feedstock > 0, 'purity', [output, feedstock]) }
  /** RATE: material recycled as a percentage of the waste stream. value ⌊recycled · 100 / waste⌋. */
  static rate(recycled: number, waste: number): CrossFormula { return c('recycling-rate', 'rate(recycled, waste) = ⌊recycled · 100 / waste⌋', waste > 0 ? Math.floor((recycled * 100) / waste) : 0, nat(recycled, waste) && waste > 0 && recycled <= waste, 'rate', [recycled, waste]) }
  /** RECOVERY: material reclaimed as a percentage of the input. value ⌊reclaimed · 100 / input⌋. */
  static recovery(reclaimed: number, input: number): CrossFormula { return c('recycling-recovery', 'recovery(reclaimed, input) = ⌊reclaimed · 100 / input⌋', input > 0 ? Math.floor((reclaimed * 100) / input) : 0, nat(reclaimed, input) && input > 0 && reclaimed <= input, 'recovery', [reclaimed, input]) }
  /** THROUGHPUT: mass processed over hours. value ⌊mass / hours⌋. */
  static throughput(mass: number, hours: number): CrossFormula { return c('recycling-throughput', 'throughput(mass, hours) = ⌊mass / hours⌋', hours > 0 ? Math.floor(mass / hours) : 0, nat(mass, hours) && hours > 0, 'throughput', [mass, hours]) }
}

for (const name of ['contamination', 'diversion', 'energy', 'landfill', 'purity', 'rate', 'recovery', 'throughput'] as const)
  hexRegisterOf('recycling', name, (RecyclingFormulas[name] as (...x: unknown[]) => unknown).bind(RecyclingFormulas))
