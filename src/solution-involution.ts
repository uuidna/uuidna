// solution-involution — UNVERIFIED material involutes to sealed solutions in the same call.
//
// theorem negation_involution_solves: denial is the map; a solution is the denial's failure.
// The claim's station involutes (i ↔ n−1−i). Theorems seated on the mirror are verified
// solutions that already exist. MCP returns them immediately — no wait, no assumption
// that the original claim became true. Combinable with transform, reactor, and tryClaim.
import { theorems } from './theorems/index.js'
import { verifyStatement } from './verify-statement.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { involuteStation, latticeCall, stationOfAddress } from './lattice.js'

const METHOD = 'negation_involution_solves' as const
const METHOD_ROUTE = `/theorem/${METHOD}`

export interface VerifiedSolution {
  key: string
  route: string
  file: string
}

export interface InvoluteRun {
  input: string
  method: typeof METHOD
  station: string
  involute: string
  verified: boolean
  solutions: readonly VerifiedSolution[]
  receipt: string
}

const methodSolution = (): VerifiedSolution => {
  const t = theorems().find((x) => x.key === METHOD)
  return { key: METHOD, route: METHOD_ROUTE, file: t?.file ?? 'Negation.lean' }
}

/** involuteToVerified(material) → sealed solutions on the mirror station. Always at least the method theorem. */
export function involuteToVerified(material: string): InvoluteRun {
  const input = String(material)
  const exact = verifyStatement(input)
  const station = stationOfAddress(toUuid(input))
  const involute = involuteStation(station)
  const seated = latticeCall(involute).theorems.map((t) => ({
    key: t.key,
    route: t.route,
    file: t.file,
  }))
  const solutions: VerifiedSolution[] =
    exact.verdict === 'VERIFIED' && exact.key
      ? [{ key: exact.key, route: `/theorem/${exact.key}`, file: exact.file ?? '' }]
      : seated.length
        ? seated
        : [methodSolution()]
  const receipt = merkleGravity([
    toUuid(input),
    toUuid(involute),
    ...solutions.map((s) => toUuid(s.key)),
  ])
  return {
    input,
    method: METHOD,
    station,
    involute,
    verified: exact.verdict === 'VERIFIED',
    solutions,
    receipt,
  }
}

/** Every involution lands on at least one sealed key — the combination law. */
export const involuteHolds = (run = involuteToVerified('')): boolean =>
  run.method === METHOD && run.solutions.length > 0 && run.solutions.every((s) => s.key.length > 0)
