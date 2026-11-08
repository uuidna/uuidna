/**
 * Goals compute from combinatorics — not prose "OPEN" leads.
 *
 * Measure = combination formula results (C(faces,k), C(seals,1), binomial(3)=8 modes,
 * wave width×passes as C(width,1)·passes). State is OPEN while those formulas hold and
 * the court trial allows; LEAD when a combination/court fails. Never flipped to complete
 * from chat — only computed holds change the reading.
 *
 * Connector: tools/call connector { goal: true } | { goal: true, k, width, passes, mode, who }.
 * Hex: combinatorics.combinations / binomial. Court-tried each case. Unix x when execute.
 */
import { CombinatoricsFormulas } from '../families/combinatorics/index.js'
import { CLAY_SEALS, claySealDomainCoverageOf } from '../families/clay/index.js'
import { facesOf, qpuHexUuidOf, mcpToolsListOf } from '../quantum/processing/unit/index.js'
import { modeAccessOf } from './access-mode.js'
import {
  accessExecuteGateOf,
  gateCourtTrialOf,
  type GateCall,
  type GateCourtCase,
} from './gate-court.js'

export type GoalCombo = {
  family: 'combinatorics'
  formula: string
  address: string
  params: number[]
  slots: string[]
  value: number
  hex: string | null
  holds: boolean
  role: 'faces' | 'seals' | 'modes' | 'wave' | 'domain'
}

export type GoalReading = {
  kind: 'goal'
  call: 'tools/call connector { goal: true }'
  endpoint: '/api/qpu/goal'
  /** Computed — OPEN while combination legs + court hold; LEAD otherwise. Never chat-complete. */
  state: 'OPEN' | 'LEAD'
  measure: number
  combinations: readonly GoalCombo[]
    lattice: { faces: number; k: number; seals: number; modes: number; domain: number; domainHeld: number }
  wave: { width: number; passes: number; cells: number }
  execute: { mode: number; who: string; allowed: boolean; trial: GateCourtCase }
  court: GateCourtCase
  connectBill: { doors: number; bytes: number; under16384: boolean; qpuPrefixed: number; holds: boolean }
  next: unknown
  holds: boolean
  goal: 'OPEN' | 'LEAD'
  note: string
}

const hexOf = (formula: string, params: number[]): string | null => {
  try {
    return qpuHexUuidOf({ family: 'combinatorics', program: [formula], params })
  } catch {
    return null
  }
}

const comboOf = (
  formula: string,
  slots: string[],
  params: number[],
  value: number,
  holds: boolean,
  role: GoalCombo['role'],
  hex?: string | null,
): GoalCombo => ({
  family: 'combinatorics',
  formula,
  address: `combinatorics.${formula}`,
  params,
  slots,
  value,
  hex: hex ?? hexOf(formula, params),
  holds,
  role,
})

export type GoalInput = {
  /** Pick size for C(faces, k) — default 1 (each face an open goal slot). */
  k?: number
  /** Wave sweep width (defaults to faces). */
  width?: number
  /** Wave passes (default 1). */
  passes?: number
  /** Unix triad for execute gate (default 5 = r-x). */
  mode?: number
  who?: 'other' | 'user' | 'group' | 'owner'
}

/**
 * Goal state from combinations. Recomputed each call — up to date, court-tried.
 */
export const goalOf = (input: GoalInput = {}): GoalReading => {
  const faces = facesOf().faces
  const seals = CLAY_SEALS.length
  // Do not clamp k to faces — C(n,k) holds false when k > n (goal → LEAD).
  const k = typeof input.k === 'number' && Number.isSafeInteger(input.k) && input.k >= 0 ? input.k : 1
  const width =
    typeof input.width === 'number' && Number.isSafeInteger(input.width) && input.width > 0 ? input.width : faces
  const passes =
    typeof input.passes === 'number' && Number.isSafeInteger(input.passes) && input.passes > 0 ? input.passes : 1
  const mode = typeof input.mode === 'number' && Number.isSafeInteger(input.mode) ? input.mode & 7 : 5
  const who = input.who ?? 'other'

  const facePick = CombinatoricsFormulas.combinations(faces, k)
  const sealPick = CombinatoricsFormulas.combinations(seals, 1)
  const modeSpace = CombinatoricsFormulas.binomial(3) // 2³ = 8 chmod triads
  const waveWidth = CombinatoricsFormulas.combinations(width, 1)
  const waveCells = Number(waveWidth.value) * passes
  // Seal-domain coverage: C(domainSize, 1) holds only when σ holds on every domain input (universal).
  const domainCov = claySealDomainCoverageOf(faces)
  const domainPick = CombinatoricsFormulas.combinations(domainCov.size, 1)

  const combinations: GoalCombo[] = [
    comboOf('combinations', ['n', 'k'], [faces, k], Number(facePick.value), facePick.holds === true, 'faces', facePick.hex ?? null),
    comboOf('combinations', ['n', 'k'], [seals, 1], Number(sealPick.value), sealPick.holds === true, 'seals', sealPick.hex ?? null),
    comboOf('binomial', ['n'], [3], Number(modeSpace.value), modeSpace.holds === true, 'modes', modeSpace.hex ?? null),
    comboOf(
      'combinations',
      ['n', 'k'],
      [width, 1],
      waveCells,
      waveWidth.holds === true && passes >= 1,
      'wave',
      waveWidth.hex ?? null,
    ),
    comboOf(
      'combinations',
      ['n', 'k'],
      [domainCov.size, 1],
      Number(domainPick.value),
      domainPick.holds === true && domainCov.universal,
      'domain',
      domainPick.hex ?? null,
    ),
  ]

  const holding = combinations.filter((c) => c.holds)
  const measure = holding.reduce((a, c) => a + c.value, 0)
  const legsHold = combinations.length > 0 && combinations.every((c) => c.holds) && measure > 0

  // Gate call for court: C(faces,k) is the primary open-slot measure
  const gate: GateCall = {
    call: `combinatorics.combinations(${faces}, ${k})`,
    name: 'combinatorics.combinations',
    params: [faces, k],
    hex: combinations[0]!.hex,
    value: combinations[0]!.value,
    holds: legsHold,
    rawNext: 'absent',
    definition: `goal measure = Σ combo legs; C(faces,k)+C(seals,1)+binomial(3)+width·passes+C(domain,1)`,
  }
  const confidence = legsHold ? 100 : Math.floor((holding.length * 100) / Math.max(1, combinations.length))
  const court = gateCourtTrialOf({
    case: 'goal.combinations',
    gate,
    confidence,
    note: 'goal state from combinatorics; court.standard on combination legs holding',
  })

  const executeTrial = accessExecuteGateOf(mode, who)
  const access = modeAccessOf({ mode, who })
  const executeAllowed = access.decides.execute === true && executeTrial.allow === true

  const tools = mcpToolsListOf()
  const listBytes = JSON.stringify({ resultType: 'complete', tools }).length
  const qpuPrefixed = tools.filter((t) => t.name.startsWith('qpu_')).length
  const billHolds = tools.length <= 16 && listBytes < 16384 && qpuPrefixed === 0

  const holds = legsHold && court.allow && court.holds && billHolds
  // OPEN while the operable combination space holds; LEAD when combinations/court/bill fail.
  const state: 'OPEN' | 'LEAD' = holds ? 'OPEN' : 'LEAD'

  return {
    kind: 'goal',
    call: 'tools/call connector { goal: true }',
    endpoint: '/api/qpu/goal',
    state,
    measure,
    combinations,
    lattice: { faces, k, seals, modes: Number(modeSpace.value), domain: domainCov.size, domainHeld: domainCov.held },
    wave: { width, passes, cells: waveCells },
    execute: { mode, who, allowed: executeAllowed, trial: executeTrial },
    court,
    connectBill: {
      doors: tools.length,
      bytes: listBytes,
      under16384: listBytes < 16384,
      qpuPrefixed,
      holds: billHolds,
    },
    next: court.trial.rawNext,
    holds,
    goal: state,
    note: 'goal = combinatorics combinations/binomial/wave/domain coverage; OPEN while holds; never chat-complete; not prose document-variant combinations',
  }
}

/** Compact state string for surfaces that previously hard-coded goal: 'OPEN'. */
export const goalStateOf = (input: GoalInput = {}): 'OPEN' | 'LEAD' => goalOf(input).state

export const publicGoalOf = async (request?: Request): Promise<Response> => {
  const url = request ? new URL(request.url) : null
  const num = (key: string) => {
    const raw = url?.searchParams.get(key)
    return raw !== null && raw !== undefined && /^\d+$/.test(raw) ? Number(raw) : undefined
  }
  const whoRaw = url?.searchParams.get('who')
  const who =
    whoRaw === 'other' || whoRaw === 'user' || whoRaw === 'group' || whoRaw === 'owner' ? whoRaw : undefined
  return Response.json(
    goalOf({
      ...(num('k') !== undefined ? { k: num('k') } : {}),
      ...(num('width') !== undefined ? { width: num('width') } : {}),
      ...(num('passes') !== undefined ? { passes: num('passes') } : {}),
      ...(num('mode') !== undefined ? { mode: num('mode') } : {}),
      ...(who ? { who } : {}),
    }),
    { headers: { 'cache-control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=300' } },
  )
}
