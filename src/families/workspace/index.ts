import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WORKSPACE — scaffolded integer measures crossed to robotics. Every output an exact finite nonnegative integer. */

const PROOF = 'workspace arithmetic (volume, reachradius, area, dexterityindex, singularitymargin, jointrange, coveragepct, envelopeheight); scaffolded from the integer-op palette; a measure crossed to robotics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'workspace', dst: 'robotics', formula, value, proof: PROOF, ...extra }, holds, { name: `workspace.${name}`, params })

export class WorkspaceFormulas {
  static volume(x: number, y: number, z: number): CrossFormula { return c('workspace-volume', 'volume(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'volume', [x, y, z]) }
  static reachradius(x: number, y: number): CrossFormula { return c('workspace-reachradius', 'reachradius(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'reachradius', [x, y]) }
  static area(x: number, y: number): CrossFormula { return c('workspace-area', 'area(x, y) = x · y', x * y, nat(x, y), 'area', [x, y]) }
  static dexterityindex(x: number, y: number): CrossFormula { return c('workspace-dexterityindex', 'dexterityindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'dexterityindex', [x, y]) }
  static singularitymargin(x: number, y: number): CrossFormula { return c('workspace-singularitymargin', 'singularitymargin(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'singularitymargin', [x, y]) }
  static jointrange(x: number, y: number): CrossFormula { return c('workspace-jointrange', 'jointrange(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'jointrange', [x, y]) }
  static coveragepct(x: number, y: number): CrossFormula { return c('workspace-coveragepct', 'coveragepct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coveragepct', [x, y]) }
  static envelopeheight(x: number, y: number): CrossFormula { return c('workspace-envelopeheight', 'envelopeheight(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'envelopeheight', [x, y]) }
}

for (const name of ['area', 'coveragepct', 'dexterityindex', 'envelopeheight', 'jointrange', 'reachradius', 'singularitymargin', 'volume'] as const)
  hexRegisterOf('workspace', name, (WorkspaceFormulas[name] as (...x: unknown[]) => unknown).bind(WorkspaceFormulas))
