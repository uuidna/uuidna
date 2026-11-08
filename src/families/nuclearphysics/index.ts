import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NUCLEARPHYSICS — THE NUCLEUS AS ARITHMETIC (chosen by the registry, not by hand). A nucleus is numbers: how much is left
 *  after whole half-lives, how much has decayed, the binding energy that holds the nucleons, the mass defect, whether a
 *  chain stays critical, the activity, the absorbed dose, and the energy a fission releases. Crosses to `thermodynamics` —
 *  every nuclear process is heat. A measure. */

const PROOF = 'nuclearphysics arithmetic (half-life remaining, decay, binding energy, mass defect, criticality, activity, dose, fission energy); a measure crossed to thermodynamics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'nuclearphysics', dst: 'thermodynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `nuclearphysics.${name}`, params })

export class NuclearphysicsFormulas {
  /** HALF-LIFE REMAINING: the amount left after whole half-lives. value ⌊initial / 2^periods⌋. */
  static halflife(initial: number, periods: number): CrossFormula { return c('nuclearphysics-halflife', 'halflife(initial, periods) = ⌊initial / 2^periods⌋', Math.floor(initial / (2 ** periods)), nat(initial, periods), 'halflife', [initial, periods]) }
  /** DECAY: the amount gone after whole half-lives. value initial − ⌊initial / 2^periods⌋. */
  static decay(initial: number, periods: number): CrossFormula { return c('nuclearphysics-decay', 'decay(initial, periods) = initial − ⌊initial / 2^periods⌋', Math.max(0, initial - Math.floor(initial / (2 ** periods))), nat(initial, periods), 'decay', [initial, periods]) }
  /** BINDING ENERGY: the energy holding every nucleon. value nucleons · perNucleon. */
  static bindingenergy(nucleons: number, perNucleon: number): CrossFormula { return c('nuclearphysics-bindingenergy', 'bindingenergy(nucleons, perNucleon) = nucleons · perNucleon', nucleons * perNucleon, nat(nucleons, perNucleon), 'bindingenergy', [nucleons, perNucleon]) }
  /** MASS DEFECT: the mass of the parts less the bound mass. value max(0, parts − bound). */
  static massdefect(parts: number, bound: number): CrossFormula { return c('nuclearphysics-massdefect', 'massdefect(parts, bound) = max(0, parts − bound)', Math.max(0, parts - bound), nat(parts, bound), 'massdefect', [parts, bound]) }
  /** CRITICALITY: 1 when the neutrons produced meet the neutrons lost. value [produced ≥ lost]. */
  static criticality(produced: number, lost: number): CrossFormula { return c('nuclearphysics-criticality', 'criticality(produced, lost) = [produced ≥ lost]', produced >= lost ? 1 : 0, nat(produced, lost), 'criticality', [produced, lost]) }
  /** ACTIVITY: decays over the seconds observed. value ⌊decays / seconds⌋. */
  static activity(decays: number, seconds: number): CrossFormula { return c('nuclearphysics-activity', 'activity(decays, seconds) = ⌊decays / seconds⌋', seconds > 0 ? Math.floor(decays / seconds) : 0, nat(decays, seconds) && seconds > 0, 'activity', [decays, seconds]) }
  /** DOSE: energy absorbed per unit mass. value ⌊energy / mass⌋. */
  static dose(energy: number, mass: number): CrossFormula { return c('nuclearphysics-dose', 'dose(energy, mass) = ⌊energy / mass⌋', mass > 0 ? Math.floor(energy / mass) : 0, nat(energy, mass) && mass > 0, 'dose', [energy, mass]) }
  /** FISSION ENERGY: the energy released over every event. value events · perEvent. */
  static fission(events: number, perEvent: number): CrossFormula { return c('nuclearphysics-fission', 'fission(events, perEvent) = events · perEvent', events * perEvent, nat(events, perEvent), 'fission', [events, perEvent]) }
}

for (const name of ['activity', 'bindingenergy', 'criticality', 'decay', 'dose', 'fission', 'halflife', 'massdefect'] as const)
  hexRegisterOf('nuclearphysics', name, (NuclearphysicsFormulas[name] as (...x: unknown[]) => unknown).bind(NuclearphysicsFormulas))
