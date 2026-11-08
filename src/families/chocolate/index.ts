import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CHOCOLATE — THE CHOCOLATIER'S CRAFT, AS ARITHMETIC. Making chocolate is numbers: the cacao percentage of a bar, whether
 *  temper holds at the working temperature, viscosity from the solids a given fat must carry, the sugar ratio, conche
 *  machine-hours, the crystal seeds a mass needs, the melt point as it rises with cocoa, and the butter a bean batch yields.
 *  Crosses to `chemistry` — chocolate is phase behaviour and composition, what chemistry explains. A measure. */

const PROOF = 'chocolate arithmetic (cacao percent, temper, viscosity, sugar ratio, conche hours, crystal seeds, melt point, cocoa butter); the chocolatier\'s craft as integers; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'chocolate', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `chocolate.${name}`, params })

export class ChocolateFormulas {
  /** CACAO PERCENT: the cocoa share of a bar. value ⌊cocoa · 100 / total⌋. */
  static cacaopercent(cocoa: number, total: number): CrossFormula { return c('chocolate-cacaopercent', 'cacaopercent(cocoa, total) = ⌊cocoa · 100 / total⌋', total > 0 ? Math.floor((cocoa * 100) / total) : 0, nat(cocoa, total) && total > 0 && cocoa <= total, 'cacaopercent', [cocoa, total]) }
  /** COCOA BUTTER: the butter (percent) a bean batch yields. value ⌊beans · pct / 100⌋. */
  static cocoabutter(beans: number, pct: number): CrossFormula { return c('chocolate-cocoabutter', 'cocoabutter(beans, pct) = ⌊beans · pct / 100⌋', Math.floor((beans * pct) / 100), nat(beans, pct), 'cocoabutter', [beans, pct]) }
  /** CONCHE: machine-hours at a per-hour rate. value hours · rate. */
  static conche(hours: number, rate: number): CrossFormula { return c('chocolate-conche', 'conche(hours, rate) = hours · rate', hours * rate, nat(hours, rate), 'conche', [hours, rate]) }
  /** CRYSTAL SEED: the seeds a mass needs at a per-seed mass. value ⌈mass / perSeed⌉. */
  static crystalseed(mass: number, perSeed: number): CrossFormula { return c('chocolate-crystalseed', 'crystalseed(mass, perSeed) = ⌈mass / perSeed⌉', perSeed > 0 ? Math.ceil(mass / perSeed) : 0, nat(mass, perSeed) && perSeed > 0, 'crystalseed', [mass, perSeed]) }
  /** MELT POINT: a base point raised by the cocoa carried. value base + cocoa. */
  static meltpoint(base: number, cocoa: number): CrossFormula { return c('chocolate-meltpoint', 'meltpoint(base, cocoa) = base + cocoa', base + cocoa, nat(base, cocoa), 'meltpoint', [base, cocoa]) }
  /** SUGAR RATIO: the sugar share of a bar. value ⌊sugar · 100 / total⌋. */
  static sugarratio(sugar: number, total: number): CrossFormula { return c('chocolate-sugarratio', 'sugarratio(sugar, total) = ⌊sugar · 100 / total⌋', total > 0 ? Math.floor((sugar * 100) / total) : 0, nat(sugar, total) && total > 0 && sugar <= total, 'sugarratio', [sugar, total]) }
  /** TEMPER: 1 when the working temperature reaches the target. value [temp ≥ target]. */
  static temper(temp: number, target: number): CrossFormula { return c('chocolate-temper', 'temper(temp, target) = [temp ≥ target]', temp >= target ? 1 : 0, nat(temp, target), 'temper', [temp, target]) }
  /** VISCOSITY: the solids a unit of fat must carry. value ⌊solids / fat⌋. */
  static viscosity(solids: number, fat: number): CrossFormula { return c('chocolate-viscosity', 'viscosity(solids, fat) = ⌊solids / fat⌋', fat > 0 ? Math.floor(solids / fat) : 0, nat(solids, fat) && fat > 0, 'viscosity', [solids, fat]) }
}

for (const name of ['cacaopercent', 'cocoabutter', 'conche', 'crystalseed', 'meltpoint', 'sugarratio', 'temper', 'viscosity'] as const)
  hexRegisterOf('chocolate', name, (ChocolateFormulas[name] as (...x: unknown[]) => unknown).bind(ChocolateFormulas))
