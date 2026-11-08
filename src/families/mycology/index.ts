import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MYCOLOGY — THE GROWTH OF FUNGI, AS ARITHMETIC (chosen by the registry, not by hand). Fungal life is numbers: biomass
 *  doubling, spores over an area, mycelial reach, decomposition of substrate, germination and colonization rates,
 *  biological efficiency, and fruiting per day. Crosses to `agriculture` — mushrooms are a crop. A measure. */

const PROOF = 'mycology arithmetic (growth, spore density, mycelium, decomposition, germination, colonization, biological efficiency, fruiting); a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mycology', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `mycology.${name}`, params })

export class MycologyFormulas {
  /** COLONIZATION of the substrate as a percentage. value ⌊covered · 100 / substrate⌋. */
  static colonization(covered: number, substrate: number): CrossFormula { return c('mycology-colonization', 'colonization(covered, substrate) = ⌊covered · 100 / substrate⌋', substrate > 0 ? Math.floor((covered * 100) / substrate) : 0, nat(covered, substrate) && substrate > 0 && covered <= substrate, 'colonization', [covered, substrate]) }
  /** DECOMPOSITION of matter as a percentage. value ⌊broken · 100 / total⌋. */
  static decomposition(broken: number, total: number): CrossFormula { return c('mycology-decomposition', 'decomposition(broken, total) = ⌊broken · 100 / total⌋', total > 0 ? Math.floor((broken * 100) / total) : 0, nat(broken, total) && total > 0 && broken <= total, 'decomposition', [broken, total]) }
  /** BIOLOGICAL EFFICIENCY: harvest over substrate as a percentage. value ⌊harvest · 100 / substrate⌋. */
  static efficiency(harvest: number, substrate: number): CrossFormula { return c('mycology-efficiency', 'efficiency(harvest, substrate) = ⌊harvest · 100 / substrate⌋', substrate > 0 ? Math.floor((harvest * 100) / substrate) : 0, nat(harvest, substrate) && substrate > 0, 'efficiency', [harvest, substrate]) }
  /** FRUITING bodies per day. value ⌊bodies / days⌋. */
  static fruiting(bodies: number, days: number): CrossFormula { return c('mycology-fruiting', 'fruiting(bodies, days) = ⌊bodies / days⌋', days > 0 ? Math.floor(bodies / days) : 0, nat(bodies, days) && days > 0, 'fruiting', [bodies, days]) }
  /** GERMINATION of spores as a percentage. value ⌊germinated · 100 / spores⌋. */
  static germination(germinated: number, spores: number): CrossFormula { return c('mycology-germination', 'germination(germinated, spores) = ⌊germinated · 100 / spores⌋', spores > 0 ? Math.floor((germinated * 100) / spores) : 0, nat(germinated, spores) && spores > 0 && germinated <= spores, 'germination', [germinated, spores]) }
  /** GROWTH: biomass doubling. value initial · 2^doublings. */
  static growth(initial: number, doublings: number): CrossFormula { return c('mycology-growth', 'growth(initial, doublings) = initial · 2^doublings', initial * (2 ** doublings), nat(initial, doublings), 'growth', [initial, doublings]) }
  /** MYCELIUM reach: length over branches. value length · branches. */
  static mycelium(length: number, branches: number): CrossFormula { return c('mycology-mycelium', 'mycelium(length, branches) = length · branches', length * branches, nat(length, branches), 'mycelium', [length, branches]) }
  /** SPORE density: spores released over an area. value ⌊released / area⌋. */
  static spore(released: number, area: number): CrossFormula { return c('mycology-spore', 'spore(released, area) = ⌊released / area⌋', area > 0 ? Math.floor(released / area) : 0, nat(released, area) && area > 0, 'spore', [released, area]) }
}

for (const name of ['colonization', 'decomposition', 'efficiency', 'fruiting', 'germination', 'growth', 'mycelium', 'spore'] as const)
  hexRegisterOf('mycology', name, (MycologyFormulas[name] as (...x: unknown[]) => unknown).bind(MycologyFormulas))
