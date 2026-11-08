import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CLOUDPHYSICS — scaffolded integer measures crossed to physics. Every output an exact finite nonnegative integer. */

const PROOF = 'cloudphysics arithmetic (dropletcount, condensationlevel, nucleipairs, albedo, opticalthickness, terminalvelocity, phasesubsets, precipefficiency); scaffolded from the integer-op palette; a measure crossed to physics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cloudphysics', dst: 'physics', formula, value, proof: PROOF, ...extra }, holds, { name: `cloudphysics.${name}`, params })

export class CloudphysicsFormulas {
  static dropletcount(x: number, y: number): CrossFormula { return c('cloudphysics-dropletcount', 'dropletcount(x, y) = x · y', x * y, nat(x, y), 'dropletcount', [x, y]) }
  static condensationlevel(x: number, y: number): CrossFormula { return c('cloudphysics-condensationlevel', 'condensationlevel(x, y) = x · y', x * y, nat(x, y), 'condensationlevel', [x, y]) }
  static nucleipairs(x: number, y: number): CrossFormula { return c('cloudphysics-nucleipairs', 'nucleipairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'nucleipairs', [x, y]) }
  static albedo(x: number, y: number): CrossFormula { return c('cloudphysics-albedo', 'albedo(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'albedo', [x, y]) }
  static opticalthickness(x: number, y: number): CrossFormula { return c('cloudphysics-opticalthickness', 'opticalthickness(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'opticalthickness', [x, y]) }
  static terminalvelocity(x: number, y: number): CrossFormula { return c('cloudphysics-terminalvelocity', 'terminalvelocity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'terminalvelocity', [x, y]) }
  static phasesubsets(x: number): CrossFormula { return c('cloudphysics-phasesubsets', 'phasesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'phasesubsets', [x]) }
  static precipefficiency(x: number, y: number): CrossFormula { return c('cloudphysics-precipefficiency', 'precipefficiency(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'precipefficiency', [x, y]) }
}

for (const name of ['albedo', 'condensationlevel', 'dropletcount', 'nucleipairs', 'opticalthickness', 'phasesubsets', 'precipefficiency', 'terminalvelocity'] as const)
  hexRegisterOf('cloudphysics', name, (CloudphysicsFormulas[name] as (...x: unknown[]) => unknown).bind(CloudphysicsFormulas))
