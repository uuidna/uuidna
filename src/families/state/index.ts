import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STATE — WEB APP STATE MANAGEMENT, AS ARITHMETIC (stores, actions, selectors, rerenders, memoization, immutability).
 *  State is numbers: the stores an app holds, actions dispatched per second, selectors registered, the share of components
 *  that rerender, the share of selectors served from cache, the depth of nested state, hydration coverage, and the diff a
 *  change touches. Crosses to `frontend` — state is what the frontend renders. A measure. */

const PROOF = 'state arithmetic (stores, actions, selectors, rerenders, memoization, depth, hydration, diff); web app state management as exact integers; a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'state', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `state.${name}`, params })

export class StateFormulas {
  /** DISPATCH RATE: actions dispatched over seconds. value ⌊dispatched / seconds⌋. */
  static actions(dispatched: number, seconds: number): CrossFormula { return c('state-actions', 'actions(dispatched, seconds) = ⌊dispatched / seconds⌋', seconds > 0 ? Math.floor(dispatched / seconds) : 0, nat(dispatched, seconds) && seconds > 0, 'actions', [dispatched, seconds]) }
  /** NESTING DEPTH: how deeply state is nested; holds when shallow. value nested. */
  static depth(nested: number): CrossFormula { return c('state-depth', 'depth(nested) = nested', nested, nat(nested) && nested <= 5, 'depth', [nested]) }
  /** DIFF: the share of a tree a change touches, as a percentage. value ⌊changed · 100 / total⌋. */
  static diff(changed: number, total: number): CrossFormula { return c('state-diff', 'diff(changed, total) = ⌊changed · 100 / total⌋', total > 0 ? Math.floor((changed * 100) / total) : 0, nat(changed, total) && total > 0 && changed <= total, 'diff', [changed, total]) }
  /** HYDRATION: the share of persisted state restored, as a percentage. value ⌊restored · 100 / total⌋. */
  static hydration(restored: number, total: number): CrossFormula { return c('state-hydration', 'hydration(restored, total) = ⌊restored · 100 / total⌋', total > 0 ? Math.floor((restored * 100) / total) : 0, nat(restored, total) && total > 0 && restored <= total, 'hydration', [restored, total]) }
  /** MEMOIZATION: the share of selector computes served from cache, as a percentage. value ⌊cached · 100 / computes⌋. */
  static memoized(cached: number, computes: number): CrossFormula { return c('state-memoized', 'memoized(cached, computes) = ⌊cached · 100 / computes⌋', computes > 0 ? Math.floor((cached * 100) / computes) : 0, nat(cached, computes) && computes > 0 && cached <= computes, 'memoized', [cached, computes]) }
  /** RERENDERS: the share of components that rerender on a change, as a percentage. value ⌊changed · 100 / components⌋. */
  static rerenders(changed: number, components: number): CrossFormula { return c('state-rerenders', 'rerenders(changed, components) = ⌊changed · 100 / components⌋', components > 0 ? Math.floor((changed * 100) / components) : 0, nat(changed, components) && components > 0 && changed <= components, 'rerenders', [changed, components]) }
  /** SELECTORS: the selectors registered. value count. */
  static selectors(count: number): CrossFormula { return c('state-selectors', 'selectors(count) = count', count, nat(count), 'selectors', [count]) }
  /** STORES: the stores an app holds. value count. */
  static stores(count: number): CrossFormula { return c('state-stores', 'stores(count) = count', count, nat(count), 'stores', [count]) }
}

for (const name of ['actions', 'depth', 'diff', 'hydration', 'memoized', 'rerenders', 'selectors', 'stores'] as const)
  hexRegisterOf('state', name, (StateFormulas[name] as (...x: unknown[]) => unknown).bind(StateFormulas))
