import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONVECTION — HEAT CARRIED BY A MOVING FLUID, AS ARITHMETIC. Running a flow is numbers: the heat flux a surface sheds, the
 *  film coefficient, the Reynolds number that says laminar or turbulent, Prandtl, Grashof and Rayleigh for buoyancy, the film
 *  temperature a property is read at, and how thick the boundary layer grows. Crosses to `thermodynamics` — convection is one
 *  mode of heat transfer the first law accounts for. A measure. */

const PROOF = 'convection arithmetic (heat flux, film coefficient, Reynolds, Prandtl, Grashof, Rayleigh, film temperature, boundary layer); a measure crossed to thermodynamics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'convection', dst: 'thermodynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `convection.${name}`, params })

export class ConvectionFormulas {
  /** HEAT FLUX: Newton's cooling, the heat a surface sheds. value coeff · area · deltat. */
  static heatflux(coeff: number, area: number, deltat: number): CrossFormula { return c('convection-heatflux', 'heatflux(coeff, area, deltat) = coeff · area · deltat', coeff * area * deltat, nat(coeff, area, deltat), 'heatflux', [coeff, area, deltat]) }
  /** FILM COEFFICIENT: the heat flux spread over the area. value ⌊flux / area⌋. */
  static coefficient(flux: number, area: number): CrossFormula { return c('convection-coefficient', 'coefficient(flux, area) = ⌊flux / area⌋', area > 0 ? Math.floor(flux / area) : 0, nat(flux, area) && area > 0, 'coefficient', [flux, area]) }
  /** REYNOLDS NUMBER: inertia over viscosity. value ⌊velocity · length / visc⌋. */
  static reynolds(velocity: number, length: number, visc: number): CrossFormula { return c('convection-reynolds', 'reynolds(velocity, length, visc) = ⌊velocity · length / visc⌋', visc > 0 ? Math.floor((velocity * length) / visc) : 0, nat(velocity, length, visc) && visc > 0, 'reynolds', [velocity, length, visc]) }
  /** PRANDTL NUMBER: momentum diffusivity over thermal diffusivity. value ⌊visc / diff⌋. */
  static prandtl(visc: number, diff: number): CrossFormula { return c('convection-prandtl', 'prandtl(visc, diff) = ⌊visc / diff⌋', diff > 0 ? Math.floor(visc / diff) : 0, nat(visc, diff) && diff > 0, 'prandtl', [visc, diff]) }
  /** GRASHOF NUMBER: buoyancy over viscosity, as the driving product. value gbeta · deltat · length. */
  static grashof(gbeta: number, deltat: number, length: number): CrossFormula { return c('convection-grashof', 'grashof(gbeta, deltat, length) = gbeta · deltat · length', gbeta * deltat * length, nat(gbeta, deltat, length), 'grashof', [gbeta, deltat, length]) }
  /** RAYLEIGH NUMBER: Grashof times Prandtl. value grashof · prandtl. */
  static rayleigh(grashof: number, prandtl: number): CrossFormula { return c('convection-rayleigh', 'rayleigh(grashof, prandtl) = grashof · prandtl', grashof * prandtl, nat(grashof, prandtl), 'rayleigh', [grashof, prandtl]) }
  /** FILM TEMPERATURE: the mean of surface and fluid. value ⌊(surface + fluid) / 2⌋. */
  static filmtemp(surface: number, fluid: number): CrossFormula { return c('convection-filmtemp', 'filmtemp(surface, fluid) = ⌊(surface + fluid) / 2⌋', Math.floor((surface + fluid) / 2), nat(surface, fluid), 'filmtemp', [surface, fluid]) }
  /** BOUNDARY LAYER: thickness falling with the Reynolds number. value ⌊5 · length / reynolds⌋. */
  static boundarylayer(length: number, reynolds: number): CrossFormula { return c('convection-boundarylayer', 'boundarylayer(length, reynolds) = ⌊5 · length / reynolds⌋', reynolds > 0 ? Math.floor((5 * length) / reynolds) : 0, nat(length, reynolds) && reynolds > 0, 'boundarylayer', [length, reynolds]) }
}

for (const name of ['boundarylayer', 'coefficient', 'filmtemp', 'grashof', 'heatflux', 'prandtl', 'rayleigh', 'reynolds'] as const)
  hexRegisterOf('convection', name, (ConvectionFormulas[name] as (...x: unknown[]) => unknown).bind(ConvectionFormulas))
