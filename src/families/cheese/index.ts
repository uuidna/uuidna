import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CHEESE — MAKING CHEESE, AS ARITHMETIC (the make sheet is numbers, not taste). Milk becomes curd by counting: yield from
 *  milk, moisture of the paste, titratable acidity, salt-in-moisture, aging units, rennet dose, fat-in-dry-matter, and the
 *  culture inoculation ratio. Crosses to `chemistry` — a cheese is acid, fat and water measured. A measure. */

const PROOF = 'cheese arithmetic (yield, moisture, acidity, salt-in-moisture, aging, rennet dose, fat-in-dry-matter, culture ratio); the make sheet as counting; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cheese', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `cheese.${name}`, params })

export class CheeseFormulas {
  /** AGING: flavour units built over days at a per-day rate. value days · rate. */
  static aging(days: number, rate: number): CrossFormula { return c('cheese-aging', 'aging(days, rate) = days · rate', days * rate, nat(days, rate), 'aging', [days, rate]) }
  /** CULTURE RATIO: starter per mille of the milk. value ⌊culture · 1000 / milk⌋. */
  static cultureratio(culture: number, milk: number): CrossFormula { return c('cheese-cultureratio', 'cultureratio(culture, milk) = ⌊culture · 1000 / milk⌋', milk > 0 ? Math.floor((culture * 1000) / milk) : 0, nat(culture, milk) && milk > 0, 'cultureratio', [culture, milk]) }
  /** FAT IN DRY MATTER: fat as a percentage of the dry matter. value ⌊fat · 100 / dry⌋. */
  static fatindrymatter(fat: number, dry: number): CrossFormula { return c('cheese-fatindrymatter', 'fatindrymatter(fat, dry) = ⌊fat · 100 / dry⌋', dry > 0 ? Math.floor((fat * 100) / dry) : 0, nat(fat, dry) && dry > 0 && fat <= dry, 'fatindrymatter', [fat, dry]) }
  /** MOISTURE: water as a percentage of the whole paste. value ⌊water · 100 / total⌋. */
  static moisture(water: number, total: number): CrossFormula { return c('cheese-moisture', 'moisture(water, total) = ⌊water · 100 / total⌋', total > 0 ? Math.floor((water * 100) / total) : 0, nat(water, total) && total > 0 && water <= total, 'moisture', [water, total]) }
  /** PH ACIDITY: titratable acidity, acid per unit of volume. value ⌊acid · 100 / volume⌋. */
  static phacidity(acid: number, volume: number): CrossFormula { return c('cheese-phacidity', 'phacidity(acid, volume) = ⌊acid · 100 / volume⌋', volume > 0 ? Math.floor((acid * 100) / volume) : 0, nat(acid, volume) && volume > 0, 'phacidity', [acid, volume]) }
  /** RENNET: coagulant doses a batch of milk needs at a per-dose strength. value ⌈milk / strength⌉. */
  static rennet(milk: number, strength: number): CrossFormula { return c('cheese-rennet', 'rennet(milk, strength) = ⌈milk / strength⌉', strength > 0 ? Math.ceil(milk / strength) : 0, nat(milk, strength) && strength > 0, 'rennet', [milk, strength]) }
  /** SALT IN MOISTURE: salt as a percentage of the moisture. value ⌊salt · 100 / moisture⌋. */
  static salt(salt: number, moisture: number): CrossFormula { return c('cheese-salt', 'salt(salt, moisture) = ⌊salt · 100 / moisture⌋', moisture > 0 ? Math.floor((salt * 100) / moisture) : 0, nat(salt, moisture) && moisture > 0, 'salt', [salt, moisture]) }
  /** YIELD: cheese made from milk at a yield factor (percent). value ⌊milk · factor / 100⌋. */
  static yield(milk: number, factor: number): CrossFormula { return c('cheese-yield', 'yield(milk, factor) = ⌊milk · factor / 100⌋', Math.floor((milk * factor) / 100), nat(milk, factor), 'yield', [milk, factor]) }
}

for (const name of ['aging', 'cultureratio', 'fatindrymatter', 'moisture', 'phacidity', 'rennet', 'salt', 'yield'] as const)
  hexRegisterOf('cheese', name, (CheeseFormulas[name] as (...x: unknown[]) => unknown).bind(CheeseFormulas))
