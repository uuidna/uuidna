import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HOOK — THE PAYLOAD CMS LIFECYCLE HOOKS API, AS ARITHMETIC. The hooks a document walks on its way through the CMS are
 *  numbers: how many fire across a save, their average latency, whether a hook sits in order, the fields a beforeChange
 *  mutates, the failure rate, nesting depth, collection coverage, and the total fired. beforeChange, afterRead,
 *  beforeValidate, beforeDelete, afterDelete, beforeOperation. Crosses to `payload` — hooks are Payload's lifecycle. */

const PROOF = 'hook arithmetic (chain, latency, order, mutations, failures, depth, coverage, fired) over the Payload lifecycle hooks (beforeChange, afterRead, beforeValidate, beforeDelete, afterDelete, beforeOperation); a measure crossed to payload'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hook', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `hook.${name}`, params })

/** The Payload lifecycle hooks this family is the arithmetic of — the single canonical list, read wherever hooks are enumerated. */
export const HOOK_LIFECYCLE = ['beforeOperation', 'beforeValidate', 'beforeChange', 'afterRead', 'beforeDelete', 'afterDelete'] as const

export class HookFormulas {
  /** CHAIN: hooks fired per document across a save. value hooks · perDoc. */
  static chain(hooks: number, perDoc: number): CrossFormula { return c('hook-chain', 'chain(hooks, perDoc) = hooks · perDoc', hooks * perDoc, nat(hooks, perDoc), 'chain', [hooks, perDoc]) }
  /** AVERAGE LATENCY: total milliseconds over the hooks fired. value ⌊total / hooks⌋. */
  static latency(total: number, hooks: number): CrossFormula { return c('hook-latency', 'latency(total, hooks) = ⌊total / hooks⌋', hooks > 0 ? Math.floor(total / hooks) : 0, nat(total, hooks) && hooks > 0, 'latency', [total, hooks]) }
  /** ORDER: 1 when a hook's position sits within the chain. value [position ≤ total]. */
  static order(position: number, total: number): CrossFormula { return c('hook-order', 'order(position, total) = [position ≤ total]', position <= total ? 1 : 0, nat(position, total), 'order', [position, total]) }
  /** MUTATIONS: fields a beforeChange touched, as a percentage. value ⌊changed · 100 / fields⌋. */
  static mutations(changed: number, fields: number): CrossFormula { return c('hook-mutations', 'mutations(changed, fields) = ⌊changed · 100 / fields⌋', fields > 0 ? Math.floor((changed * 100) / fields) : 0, nat(changed, fields) && fields > 0 && changed <= fields, 'mutations', [changed, fields]) }
  /** FAILURES: hooks that threw, as a percentage of those fired. value ⌊failed · 100 / fired⌋. */
  static failures(failed: number, fired: number): CrossFormula { return c('hook-failures', 'failures(failed, fired) = ⌊failed · 100 / fired⌋', fired > 0 ? Math.floor((failed * 100) / fired) : 0, nat(failed, fired) && fired > 0 && failed <= fired, 'failures', [failed, fired]) }
  /** DEPTH: nested hook invocations (a hook that triggers another). value nested, holds ≤ 5. */
  static depth(nested: number): CrossFormula { return c('hook-depth', 'depth(nested) = nested', nested, nat(nested) && nested <= 5, 'depth', [nested]) }
  /** COVERAGE: collections with a hook, as a percentage. value ⌊hooked · 100 / collections⌋. */
  static coverage(hooked: number, collections: number): CrossFormula { return c('hook-coverage', 'coverage(hooked, collections) = ⌊hooked · 100 / collections⌋', collections > 0 ? Math.floor((hooked * 100) / collections) : 0, nat(hooked, collections) && collections > 0 && hooked <= collections, 'coverage', [hooked, collections]) }
  /** FIRED: hooks fired across every collection. value collections · each. */
  static fired(collections: number, each: number): CrossFormula { return c('hook-fired', 'fired(collections, each) = collections · each', collections * each, nat(collections, each), 'fired', [collections, each]) }
}

for (const name of ['chain', 'coverage', 'depth', 'failures', 'fired', 'latency', 'mutations', 'order'] as const)
  hexRegisterOf('hook', name, (HookFormulas[name] as (...x: unknown[]) => unknown).bind(HookFormulas))
