import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NIM — scaffolded integer measures crossed to logic. Every output an exact finite nonnegative integer. */

const PROOF = 'nim arithmetic (heaps, totalstones, movecombos, positionsubsets, grundyvalue, winningmoves, heapmax, parity); scaffolded from the integer-op palette; a measure crossed to logic'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'nim', dst: 'logic', formula, value, proof: PROOF, ...extra }, holds, { name: `nim.${name}`, params })

export class NimFormulas {
  static heaps(x: number, y: number): CrossFormula { return c('nim-heaps', 'heaps(x, y) = x + y', x + y, nat(x, y), 'heaps', [x, y]) }
  static totalstones(x: number, y: number, z: number): CrossFormula { return c('nim-totalstones', 'totalstones(x, y, z) = x + y + z', x + y + z, nat(x, y, z), 'totalstones', [x, y, z]) }
  static movecombos(x: number, y: number): CrossFormula { return c('nim-movecombos', 'movecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'movecombos', [x, y]) }
  static positionsubsets(x: number): CrossFormula { return c('nim-positionsubsets', 'positionsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'positionsubsets', [x]) }
  static grundyvalue(x: number, y: number): CrossFormula { return c('nim-grundyvalue', 'grundyvalue(x, y) = x mod y', y > 0 ? x % y : 0, nat(x, y) && y > 0, 'grundyvalue', [x, y]) }
  static winningmoves(x: number, y: number): CrossFormula { return c('nim-winningmoves', 'winningmoves(x, y) = x + y', x + y, nat(x, y), 'winningmoves', [x, y]) }
  static heapmax(x: number, y: number): CrossFormula { return c('nim-heapmax', 'heapmax(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'heapmax', [x, y]) }
  static parity(x: number, y: number): CrossFormula { return c('nim-parity', 'parity(x, y) = x mod y', y > 0 ? x % y : 0, nat(x, y) && y > 0, 'parity', [x, y]) }
}

for (const name of ['grundyvalue', 'heapmax', 'heaps', 'movecombos', 'parity', 'positionsubsets', 'totalstones', 'winningmoves'] as const)
  hexRegisterOf('nim', name, (NimFormulas[name] as (...x: unknown[]) => unknown).bind(NimFormulas))
