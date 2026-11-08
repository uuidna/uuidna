import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NUCLEAR — THE PHYSICS OF THE REACTOR CORE, AS ARITHMETIC. Nuclei are numbers: atoms left after a run of half-lives,
 *  the decay rate, binding energy per nucleon, the chain's k-factor, enrichment, fission yield, dose at a distance, and
 *  what the shielding stops. Crosses to `energy` — nuclear is where energy is released. A measure. */

const PROOF = 'nuclear arithmetic (decay, activity, binding energy per nucleon, criticality k-factor, enrichment, fission yield, dose by inverse square, shielding attenuation); a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'nuclear', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `nuclear.${name}`, params })

export class NuclearFormulas {
  /** DECAY: atoms remaining after a run of half-lives. value ⌊initial / 2^halflives⌋. */
  static decay(initial: number, halflives: number): CrossFormula { return c('nuclear-decay', 'decay(initial, halflives) = ⌊initial / 2^halflives⌋', halflives >= 0 ? Math.floor(initial / (2 ** halflives)) : 0, nat(initial, halflives), 'decay', [initial, halflives]) }
  /** ACTIVITY: decay rate proxy from atoms at a decay constant. value ⌊atoms · constant / 1000⌋. */
  static activity(atoms: number, constant: number): CrossFormula { return c('nuclear-activity', 'activity(atoms, constant) = ⌊atoms · constant / 1000⌋', Math.floor((atoms * constant) / 1000), nat(atoms, constant), 'activity', [atoms, constant]) }
  /** BINDING: binding energy per nucleon. value ⌊mass / nucleons⌋. */
  static binding(mass: number, nucleons: number): CrossFormula { return c('nuclear-binding', 'binding(mass, nucleons) = ⌊mass / nucleons⌋', nucleons > 0 ? Math.floor(mass / nucleons) : 0, nat(mass, nucleons) && nucleons > 0, 'binding', [mass, nucleons]) }
  /** CRITICALITY: the chain's k-factor ×100. value ⌊neutrons · 100 / previous⌋. */
  static criticality(neutrons: number, previous: number): CrossFormula { return c('nuclear-criticality', 'criticality(neutrons, previous) = ⌊neutrons · 100 / previous⌋', previous > 0 ? Math.floor((neutrons * 100) / previous) : 0, nat(neutrons, previous) && previous > 0, 'criticality', [neutrons, previous]) }
  /** ENRICHMENT: the U-235 fraction as a percentage. value ⌊u235 · 100 / total⌋. */
  static enrichment(u235: number, total: number): CrossFormula { return c('nuclear-enrichment', 'enrichment(u235, total) = ⌊u235 · 100 / total⌋', total > 0 ? Math.floor((u235 * 100) / total) : 0, nat(u235, total) && total > 0 && u235 <= total, 'enrichment', [u235, total]) }
  /** FISSION: energy yield over the input. value ⌊released / input⌋. */
  static fission(released: number, input: number): CrossFormula { return c('nuclear-fission', 'fission(released, input) = ⌊released / input⌋', input > 0 ? Math.floor(released / input) : 0, nat(released, input) && input > 0, 'fission', [released, input]) }
  /** DOSE: radiation by the inverse square of distance. value ⌊activity / distance^2⌋. */
  static dose(activity: number, distance: number): CrossFormula { return c('nuclear-dose', 'dose(activity, distance) = ⌊activity / distance^2⌋', distance > 0 ? Math.floor(activity / (distance * distance)) : 0, nat(activity, distance) && distance > 0, 'dose', [activity, distance]) }
  /** SHIELDING: what gets through after layers of attenuation. value ⌊incident / 2^layers⌋. */
  static shielding(incident: number, layers: number): CrossFormula { return c('nuclear-shielding', 'shielding(incident, layers) = ⌊incident / 2^layers⌋', Math.floor(incident / (2 ** layers)), nat(incident, layers), 'shielding', [incident, layers]) }
}

for (const name of ['activity', 'binding', 'criticality', 'decay', 'dose', 'enrichment', 'fission', 'shielding'] as const)
  hexRegisterOf('nuclear', name, (NuclearFormulas[name] as (...x: unknown[]) => unknown).bind(NuclearFormulas))
