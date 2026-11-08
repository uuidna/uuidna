import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FRACTURE — HOW SOLIDS BREAK, AS ARITHMETIC. When a crack runs is numbers: the toughness a material holds, the stress
 *  intensity at a crack tip, the critical crack length, the energy a running crack releases, the Griffith energy, notch
 *  sensitivity, the growth per cycle, and the stress at failure. Crosses to `materials` — fracture is how materials give
 *  way. A measure. */

const PROOF = 'fracture arithmetic (toughness, stress intensity, critical crack, energy release, Griffith, notch sensitivity, crack growth, failure stress); how solids break; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fracture', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `fracture.${name}`, params })

export class FractureFormulas {
  /** TOUGHNESS: the resistance a material holds, stress through a crack of some length. value stress · crack. */
  static toughness(stress: number, crack: number): CrossFormula { return c('fracture-toughness', 'toughness(stress, crack) = stress · crack', stress * crack, nat(stress, crack), 'toughness', [stress, crack]) }
  /** STRESS INTENSITY at a crack tip: a geometry factor on stress through a crack. value factor · stress · crack. */
  static stressintensity(stress: number, crack: number, factor: number): CrossFormula { return c('fracture-stressintensity', 'stressintensity(stress, crack, factor) = factor · stress · crack', factor * stress * crack, nat(stress, crack, factor), 'stressintensity', [stress, crack, factor]) }
  /** CRITICAL CRACK: the crack length the toughness allows at a stress. value ⌊toughness / stress⌋. */
  static criticalcrack(toughness: number, stress: number): CrossFormula { return c('fracture-criticalcrack', 'criticalcrack(toughness, stress) = ⌊toughness / stress⌋', stress > 0 ? Math.floor(toughness / stress) : 0, nat(toughness, stress) && stress > 0, 'criticalcrack', [toughness, stress]) }
  /** ENERGY RELEASE: the energy a running crack frees, stress through a crack over the modulus. value ⌊stress · crack / modulus⌋. */
  static energyrelease(stress: number, crack: number, modulus: number): CrossFormula { return c('fracture-energyrelease', 'energyrelease(stress, crack, modulus) = ⌊stress · crack / modulus⌋', modulus > 0 ? Math.floor((stress * crack) / modulus) : 0, nat(stress, crack, modulus) && modulus > 0, 'energyrelease', [stress, crack, modulus]) }
  /** GRIFFITH ENERGY: the surface energy a new crack face costs, surface at a modulus. value surface · modulus. */
  static griffith(surface: number, modulus: number): CrossFormula { return c('fracture-griffith', 'griffith(surface, modulus) = surface · modulus', surface * modulus, nat(surface, modulus), 'griffith', [surface, modulus]) }
  /** NOTCH SENSITIVITY: the notched strength against the smooth, as a percentage. value ⌊notched · 100 / smooth⌋. */
  static notchsensitivity(notched: number, smooth: number): CrossFormula { return c('fracture-notchsensitivity', 'notchsensitivity(notched, smooth) = ⌊notched · 100 / smooth⌋', smooth > 0 ? Math.floor((notched * 100) / smooth) : 0, nat(notched, smooth) && smooth > 0, 'notchsensitivity', [notched, smooth]) }
  /** CRACK GROWTH: the length a crack advances over the cycles at a per-cycle rate. value cycles · rate. */
  static crackgrowth(cycles: number, rate: number): CrossFormula { return c('fracture-crackgrowth', 'crackgrowth(cycles, rate) = cycles · rate', cycles * rate, nat(cycles, rate), 'crackgrowth', [cycles, rate]) }
  /** FAILURE STRESS: the stress at which a crack of some length runs, toughness over the crack. value ⌊toughness / crack⌋. */
  static failurestress(toughness: number, crack: number): CrossFormula { return c('fracture-failurestress', 'failurestress(toughness, crack) = ⌊toughness / crack⌋', crack > 0 ? Math.floor(toughness / crack) : 0, nat(toughness, crack) && crack > 0, 'failurestress', [toughness, crack]) }
}

for (const name of ['crackgrowth', 'criticalcrack', 'energyrelease', 'failurestress', 'griffith', 'notchsensitivity', 'stressintensity', 'toughness'] as const)
  hexRegisterOf('fracture', name, (FractureFormulas[name] as (...x: unknown[]) => unknown).bind(FractureFormulas))
