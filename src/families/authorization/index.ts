import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AUTHORIZATION — DEFENSIVE ACCESS-CONTROL AS ARITHMETIC. Who may do what is numbers: the roles a user base carries, the
 *  cells of a subject×object permission matrix, the permissions granted beyond what is needed, whether a policy allows more
 *  than it denies, the share of grants a request stream wins, the breadth of a scope set, the share of duty pairs in conflict,
 *  and the access reviews left overdue. Crosses to `networking` — authorization is what the network perimeter enforces. A measure. */

const PROOF = 'authorization arithmetic (role count, permission matrix, least privilege, policy eval, grant ratio, scope breadth, separation of duty, access review lag); defensive access-control metrics; a measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'authorization', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `authorization.${name}`, params })

export class AuthorizationFormulas {
  /** ROLE COUNT: the roles a user base carries at roles-per-user. value users · rolesPer. */
  static rolecount(users: number, rolesPer: number): CrossFormula { return c('authorization-rolecount', 'rolecount(users, rolesPer) = users · rolesPer', users * rolesPer, nat(users, rolesPer), 'rolecount', [users, rolesPer]) }
  /** PERMISSION MATRIX: the cells of a subject×object grid. value subjects · objects. */
  static permissionmatrix(subjects: number, objects: number): CrossFormula { return c('authorization-permissionmatrix', 'permissionmatrix(subjects, objects) = subjects · objects', subjects * objects, nat(subjects, objects), 'permissionmatrix', [subjects, objects]) }
  /** LEAST PRIVILEGE: permissions granted beyond what is needed. value max(0, granted − needed). */
  static leastprivilege(granted: number, needed: number): CrossFormula { return c('authorization-leastprivilege', 'leastprivilege(granted, needed) = max(0, granted − needed)', Math.max(0, granted - needed), nat(granted, needed), 'leastprivilege', [granted, needed]) }
  /** POLICY EVAL: 1 when a policy allows at least as much as it denies. value [allow ≥ deny]. */
  static policyeval(allow: number, deny: number): CrossFormula { return c('authorization-policyeval', 'policyeval(allow, deny) = [allow ≥ deny]', allow >= deny ? 1 : 0, nat(allow, deny), 'policyeval', [allow, deny]) }
  /** GRANT RATIO: the share of requests granted, as a percentage. value ⌊grants · 100 / requests⌋. */
  static grantratio(grants: number, requests: number): CrossFormula { return c('authorization-grantratio', 'grantratio(grants, requests) = ⌊grants · 100 / requests⌋', requests > 0 ? Math.floor((grants * 100) / requests) : 0, nat(grants, requests) && requests > 0 && grants <= requests, 'grantratio', [grants, requests]) }
  /** SCOPE BREADTH: the entries across a scope set at per-scope size. value scopes · perScope. */
  static scopebreadth(scopes: number, perScope: number): CrossFormula { return c('authorization-scopebreadth', 'scopebreadth(scopes, perScope) = scopes · perScope', scopes * perScope, nat(scopes, perScope), 'scopebreadth', [scopes, perScope]) }
  /** SEPARATION OF DUTY: the share of duty pairs in conflict, as a percentage. value ⌊conflicts · 100 / pairs⌋. */
  static separationofduty(conflicts: number, pairs: number): CrossFormula { return c('authorization-separationofduty', 'separationofduty(conflicts, pairs) = ⌊conflicts · 100 / pairs⌋', pairs > 0 ? Math.floor((conflicts * 100) / pairs) : 0, nat(conflicts, pairs) && pairs > 0 && conflicts <= pairs, 'separationofduty', [conflicts, pairs]) }
  /** ACCESS REVIEW LAG: the reviews left overdue. value max(0, due − reviewed). */
  static accessreviewlag(due: number, reviewed: number): CrossFormula { return c('authorization-accessreviewlag', 'accessreviewlag(due, reviewed) = max(0, due − reviewed)', Math.max(0, due - reviewed), nat(due, reviewed), 'accessreviewlag', [due, reviewed]) }
}

for (const name of ['accessreviewlag', 'grantratio', 'leastprivilege', 'permissionmatrix', 'policyeval', 'rolecount', 'scopebreadth', 'separationofduty'] as const)
  hexRegisterOf('authorization', name, (AuthorizationFormulas[name] as (...x: unknown[]) => unknown).bind(AuthorizationFormulas))
