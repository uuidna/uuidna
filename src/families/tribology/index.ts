import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TRIBOLOGY — THE SCIENCE OF RUBBING SURFACES, AS ARITHMETIC. Friction, wear, and lubrication are numbers: the friction
 *  coefficient, the wear rate, the lubrication film ratio, the contact pressure, the viscosity, the hardness, the traction
 *  coefficient, and the fatigue life. Crosses to `materials` — tribology is what materials endure in contact. A measure. */

const PROOF = 'tribology arithmetic (friction, wear, lubrication, contact pressure, viscosity, hardness, traction, fatigue); the physics of rubbing surfaces; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tribology', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `tribology.${name}`, params })

export class TribologyFormulas {
  /** FRICTION COEFFICIENT: friction force over normal load, ×100. value ⌊force · 100 / normal⌋. */
  static friction(force: number, normal: number): CrossFormula { return c('tribology-friction', 'friction(force, normal) = ⌊force · 100 / normal⌋', normal > 0 ? Math.floor((force * 100) / normal) : 0, nat(force, normal) && normal > 0, 'friction', [force, normal]) }
  /** WEAR RATE: worn volume over sliding distance. value ⌊volume / distance⌋. */
  static wear(volume: number, distance: number): CrossFormula { return c('tribology-wear', 'wear(volume, distance) = ⌊volume / distance⌋', distance > 0 ? Math.floor(volume / distance) : 0, nat(volume, distance) && distance > 0, 'wear', [volume, distance]) }
  /** LUBRICATION FILM RATIO: film thickness over surface roughness. value ⌊film / roughness⌋. */
  static lubrication(film: number, roughness: number): CrossFormula { return c('tribology-lubrication', 'lubrication(film, roughness) = ⌊film / roughness⌋', roughness > 0 ? Math.floor(film / roughness) : 0, nat(film, roughness) && roughness > 0, 'lubrication', [film, roughness]) }
  /** CONTACT PRESSURE: load over contact area. value ⌊load / area⌋. */
  static contact(load: number, area: number): CrossFormula { return c('tribology-contact', 'contact(load, area) = ⌊load / area⌋', area > 0 ? Math.floor(load / area) : 0, nat(load, area) && area > 0, 'contact', [load, area]) }
  /** VISCOSITY: shear stress over shear rate. value ⌊stress / rate⌋. */
  static viscosity(stress: number, rate: number): CrossFormula { return c('tribology-viscosity', 'viscosity(stress, rate) = ⌊stress / rate⌋', rate > 0 ? Math.floor(stress / rate) : 0, nat(stress, rate) && rate > 0, 'viscosity', [stress, rate]) }
  /** HARDNESS: load over indentation area. value ⌊load / indentation⌋. */
  static hardness(load: number, indentation: number): CrossFormula { return c('tribology-hardness', 'hardness(load, indentation) = ⌊load / indentation⌋', indentation > 0 ? Math.floor(load / indentation) : 0, nat(load, indentation) && indentation > 0, 'hardness', [load, indentation]) }
  /** TRACTION COEFFICIENT: tangential force over normal load, ×100. value ⌊tangential · 100 / normal⌋. */
  static traction(tangential: number, normal: number): CrossFormula { return c('tribology-traction', 'traction(tangential, normal) = ⌊tangential · 100 / normal⌋', normal > 0 ? Math.floor((tangential * 100) / normal) : 0, nat(tangential, normal) && normal > 0, 'traction', [tangential, normal]) }
  /** FATIGUE LIFE: cycles to failure over load. value ⌊cycles / load⌋. */
  static fatigue(cycles: number, load: number): CrossFormula { return c('tribology-fatigue', 'fatigue(cycles, load) = ⌊cycles / load⌋', load > 0 ? Math.floor(cycles / load) : 0, nat(cycles, load) && load > 0, 'fatigue', [cycles, load]) }
}

for (const name of ['contact', 'fatigue', 'friction', 'hardness', 'lubrication', 'traction', 'viscosity', 'wear'] as const)
  hexRegisterOf('tribology', name, (TribologyFormulas[name] as (...x: unknown[]) => unknown).bind(TribologyFormulas))
