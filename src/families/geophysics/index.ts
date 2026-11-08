import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GEOPHYSICS — THE SOLID EARTH, AS ARITHMETIC (chosen by the registry, not by hand). Probing the ground is numbers:
 *  seismic velocity, surface gravity, a magnetic dipole, heat flow, bulk density, electrical resistivity, earthquake
 *  magnitude, and the isostatic ratio. Crosses to `geology` — geophysics is how the solid earth is measured. A measure. */

const PROOF = 'geophysics arithmetic (seismic velocity, gravity, magnetic dipole, heat flow, density, resistivity, magnitude, isostasy); the solid earth as a measure crossed to geology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'geophysics', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `geophysics.${name}`, params })

export class GeophysicsFormulas {
  /** SEISMIC VELOCITY: distance over travel time. value ⌊distance / time⌋. */
  static seismicvelocity(distance: number, time: number): CrossFormula { return c('geophysics-seismicvelocity', 'seismicvelocity(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'seismicvelocity', [distance, time]) }
  /** SURFACE GRAVITY: mass over the radius squared. value ⌊mass / radius²⌋. */
  static gravity(mass: number, radius: number): CrossFormula { return c('geophysics-gravity', 'gravity(mass, radius) = ⌊mass / radius²⌋', radius > 0 ? Math.floor(mass / (radius * radius)) : 0, nat(mass, radius) && radius > 0, 'gravity', [mass, radius]) }
  /** MAGNETIC DIPOLE: field over the distance cubed. value ⌊field / distance³⌋. */
  static magnetic(field: number, distance: number): CrossFormula { return c('geophysics-magnetic', 'magnetic(field, distance) = ⌊field / distance³⌋', distance > 0 ? Math.floor(field / (distance * distance * distance)) : 0, nat(field, distance) && distance > 0, 'magnetic', [field, distance]) }
  /** HEAT FLOW: gradient times conductivity. value gradient · conductivity. */
  static heatflow(gradient: number, conductivity: number): CrossFormula { return c('geophysics-heatflow', 'heatflow(gradient, conductivity) = gradient · conductivity', gradient * conductivity, nat(gradient, conductivity), 'heatflow', [gradient, conductivity]) }
  /** BULK DENSITY: mass over volume. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('geophysics-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** ELECTRICAL RESISTIVITY: voltage over current. value ⌊voltage / current⌋. */
  static resistivity(voltage: number, current: number): CrossFormula { return c('geophysics-resistivity', 'resistivity(voltage, current) = ⌊voltage / current⌋', current > 0 ? Math.floor(voltage / current) : 0, nat(voltage, current) && current > 0, 'resistivity', [voltage, current]) }
  /** EARTHQUAKE MAGNITUDE: the amplitude itself. value amplitude. */
  static magnitude(amplitude: number): CrossFormula { return c('geophysics-magnitude', 'magnitude(amplitude) = amplitude', amplitude, nat(amplitude), 'magnitude', [amplitude]) }
  /** ISOSTASY: the load-to-mantle ratio in hundredths. value ⌊load · 100 / mantle⌋. */
  static isostasy(load: number, mantle: number): CrossFormula { return c('geophysics-isostasy', 'isostasy(load, mantle) = ⌊load · 100 / mantle⌋', mantle > 0 ? Math.floor((load * 100) / mantle) : 0, nat(load, mantle) && mantle > 0, 'isostasy', [load, mantle]) }
}

for (const name of ['density', 'gravity', 'heatflow', 'isostasy', 'magnetic', 'magnitude', 'resistivity', 'seismicvelocity'] as const)
  hexRegisterOf('geophysics', name, (GeophysicsFormulas[name] as (...x: unknown[]) => unknown).bind(GeophysicsFormulas))
