import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AIRSHIP — scaffolded integer measures crossed to aerospace. Every output an exact finite nonnegative integer. */

const PROOF = 'airship arithmetic (lift, volume, heliumfraction, maxspeed, payload, ballastratio, lengthm, buoyancymargin); scaffolded from the integer-op palette; a measure crossed to aerospace'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'airship', dst: 'aerospace', formula, value, proof: PROOF, ...extra }, holds, { name: `airship.${name}`, params })

export class AirshipFormulas {
  static lift(x: number, y: number): CrossFormula { return c('airship-lift', 'lift(x, y) = x · y', x * y, nat(x, y), 'lift', [x, y]) }
  static volume(x: number, y: number, z: number): CrossFormula { return c('airship-volume', 'volume(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'volume', [x, y, z]) }
  static heliumfraction(x: number, y: number): CrossFormula { return c('airship-heliumfraction', 'heliumfraction(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'heliumfraction', [x, y]) }
  static maxspeed(x: number, y: number): CrossFormula { return c('airship-maxspeed', 'maxspeed(x, y) = x · y', x * y, nat(x, y), 'maxspeed', [x, y]) }
  static payload(x: number, y: number): CrossFormula { return c('airship-payload', 'payload(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'payload', [x, y]) }
  static ballastratio(x: number, y: number): CrossFormula { return c('airship-ballastratio', 'ballastratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'ballastratio', [x, y]) }
  static lengthm(x: number, y: number): CrossFormula { return c('airship-lengthm', 'lengthm(x, y) = x · y', x * y, nat(x, y), 'lengthm', [x, y]) }
  static buoyancymargin(x: number, y: number): CrossFormula { return c('airship-buoyancymargin', 'buoyancymargin(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'buoyancymargin', [x, y]) }
}

for (const name of ['ballastratio', 'buoyancymargin', 'heliumfraction', 'lengthm', 'lift', 'maxspeed', 'payload', 'volume'] as const)
  hexRegisterOf('airship', name, (AirshipFormulas[name] as (...x: unknown[]) => unknown).bind(AirshipFormulas))
