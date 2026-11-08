import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HISTORIOGRAPHY — scaffolded integer measures crossed to sociology. Every output an exact finite nonnegative integer. */

const PROOF = 'historiography arithmetic (sourcecount, narrativeorderings, biasfactors, periodizations, crosschecks, interpretiveframes, consensuslevel, revisionspan); scaffolded from the integer-op palette; a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'historiography', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `historiography.${name}`, params })

export class HistoriographyFormulas {
  static sourcecount(x: number, y: number): CrossFormula { return c('historiography-sourcecount', 'sourcecount(x, y) = x + y', x + y, nat(x, y), 'sourcecount', [x, y]) }
  static narrativeorderings(x: number): CrossFormula { return c('historiography-narrativeorderings', 'narrativeorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'narrativeorderings', [x]) }
  static biasfactors(x: number, y: number, z: number): CrossFormula { return c('historiography-biasfactors', 'biasfactors(x, y, z) = x + y + z', x + y + z, nat(x, y, z), 'biasfactors', [x, y, z]) }
  static periodizations(x: number, y: number): CrossFormula { return c('historiography-periodizations', 'periodizations(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'periodizations', [x, y]) }
  static crosschecks(x: number, y: number): CrossFormula { return c('historiography-crosschecks', 'crosschecks(x, y) = x · y', x * y, nat(x, y), 'crosschecks', [x, y]) }
  static interpretiveframes(x: number): CrossFormula { return c('historiography-interpretiveframes', 'interpretiveframes(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'interpretiveframes', [x]) }
  static consensuslevel(x: number, y: number): CrossFormula { return c('historiography-consensuslevel', 'consensuslevel(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'consensuslevel', [x, y]) }
  static revisionspan(x: number, y: number): CrossFormula { return c('historiography-revisionspan', 'revisionspan(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'revisionspan', [x, y]) }
}

for (const name of ['biasfactors', 'consensuslevel', 'crosschecks', 'interpretiveframes', 'narrativeorderings', 'periodizations', 'revisionspan', 'sourcecount'] as const)
  hexRegisterOf('historiography', name, (HistoriographyFormulas[name] as (...x: unknown[]) => unknown).bind(HistoriographyFormulas))
