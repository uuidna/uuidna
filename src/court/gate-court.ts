/**
 * Every tightened gate is tried in court on each case — improved by use.
 *
 * Trial pack (aligned with priceCourtTrialOf):
 *   court.standard(confidence, required) — verdict boolean
 *   law.fidelity(first, second) — re-trial stability (same params, same boolean)
 *   law.standing(receipts) — hex-backed gate+trial calls are the receipt record
 *   law.reviewed(0) — advice stays a lead
 *
 * Cases: discover.capacity, connect.bill, access.screen, access.execute (unix x),
 * crypt.digest.*, price.relation. Combinatorics.combinations(n,1) indexes the set.
 *
 * Connector: { court: true } | { trial: true } | { court|trial, case, flags?, digest?, mode? }.
 */
import { AccessFormulas } from '../families/access/index.js'
import { CloudFormulas } from '../families/cloud/index.js'
import { CombinatoricsFormulas } from '../families/combinatorics/index.js'
import { CourtFormulas } from '../families/court/index.js'
import { LawFormulas } from '../families/law/index.js'
import { crossBridgesOf } from '../families/cross/index.js'
import {
  facesOf,
  hexFamiliesOf,
  qpuHexUuidOf,
  leanOf,
  mcpToolsListOf,
  statementUuidOf,
} from '../quantum/processing/unit/index.js'
import { modeAccessOf, modeBitsOf } from './access-mode.js'
import { goalStateOf } from './goal.js'

const BALANCE = 51

const rawNextOf = (r: object) =>
  Object.prototype.hasOwnProperty.call(r, 'next') ? ((r as { next?: unknown }).next ?? null) : ('absent' as const)

export type GateCall = {
  call: string
  name: string
  params: number[]
  hex: string | null
  value: number
  holds: boolean
  rawNext: unknown
  definition?: string
}

export type GateCourtCase = {
  case: string
  gate: GateCall
  confidence: number
  required: number
  trial: GateCall
  reviewed: GateCall
  fidelity: GateCall
  standing: GateCall
  /** The full legal framework, each a lean formula (only lean evidence is accepted): law.lawful is the safety floor
   *  (genuine harm/illegality/fabrication, upheld against the author too), law.violation is work against the order,
   *  law.redirected is the measure the order lost to the required bar, law.remedy is what a lead is owed. */
  lawful: GateCall
  violation: GateCall
  redirected: GateCall
  remedy: GateCall
  /** The court involves ALL families: the jury is the whole registry, not only the subject's domain siblings. `count`
   *  is every registered family; `siblings` is how many share the subject's cross domain; `panel` shows a lattice slice. */
  experts: { subject: string; domain: string | undefined; count: number; siblings?: number; all?: boolean; panel: string[] }
  /** Where the matter is heard. Every case gets a forum and a remedy — none is refused; a floor failure is a LEAD. */
  forum: string
  allow: boolean
  holds: boolean
  /** Filled by caller or goalOf — OPEN|LEAD from combinatorics when attached. */
  goal: 'OPEN' | 'LEAD'
  note: string
}

const callOf = (
  name: string,
  params: number[],
  r: { hex?: string | null; value: number; holds: boolean; formula?: string },
  familyHint?: string,
): GateCall => {
  const family = familyHint ?? name.split('.')[0]!
  const formula = name.includes('.') ? name.slice(name.indexOf('.') + 1) : name
  let hex = r.hex ?? null
  if (!hex) {
    try {
      hex = qpuHexUuidOf({ family, program: [formula], params })
    } catch {
      hex = null
    }
  }
  return {
    call: `${name}(${params.join(', ')})`,
    name,
    params,
    hex,
    value: Number(r.value),
    holds: r.holds === true,
    rawNext: rawNextOf(r),
    definition: r.formula,
  }
}

const receiptsOf = (...calls: GateCall[]): number =>
  calls.filter((c) => typeof c.hex === 'string' && c.hex.length > 0).length

/**
 * Try one gate case: standard + fidelity re-trial + standing(hex receipts) + reviewed lead.
 */
export const gateCourtTrialOf = (input: {
  case: string
  gate: GateCall
  confidence?: number
  required?: number
  harm?: number
  against?: number
  note?: string
}): GateCourtCase => {
  const confidence =
    typeof input.confidence === 'number' && Number.isSafeInteger(input.confidence)
      ? Math.max(0, Math.min(100, input.confidence))
      : input.gate.holds
        ? 100
        : 0
  const required =
    typeof input.required === 'number' && Number.isSafeInteger(input.required)
      ? Math.max(0, Math.min(100, input.required))
      : BALANCE
  const trial = CourtFormulas.standard(confidence, required)
  const again = CourtFormulas.standard(confidence, required)
  const fidelity = LawFormulas.fidelity(trial.value, again.value)
  const reviewed = LawFormulas.reviewed(0)
  const trialCall = callOf('court.standard', [confidence, required], trial, 'court')
  const fidelityCall = callOf('law.fidelity', [trial.value, again.value], fidelity, 'law')
  const reviewedCall = callOf('law.reviewed', [0], reviewed, 'law')
  const receipts = receiptsOf(input.gate, trialCall, fidelityCall)
  const standing = LawFormulas.standing(receipts)
  const standingCall = callOf('law.standing', [receipts], standing, 'law')
  // THE FULL LEGAL FRAMEWORK, every measure a lean formula — only lean evidence is accepted. law.lawful(harm) is the
  // safety floor, upheld against the author too; law.violation(against) is work against the order; law.redirected is
  // the measure the order lost to the required bar; law.remedy is what a lead is owed. Nothing is refused: a floor or
  // framework failure routes the matter to a LEAD in its forum, with its remedy owed — the court handles it, legally.
  const harm = typeof input.harm === 'number' && Number.isSafeInteger(input.harm) ? Math.max(0, input.harm) : 0
  const against = typeof input.against === 'number' && Number.isSafeInteger(input.against) ? Math.max(0, input.against) : 0
  const lawful = LawFormulas.lawful(harm)
  const violation = LawFormulas.violation(against)
  const redirected = LawFormulas.redirected(required, confidence)
  const lawfulCall = callOf('law.lawful', [harm], lawful, 'law')
  const violationCall = callOf('law.violation', [against], violation, 'law')
  const redirectedCall = callOf('law.redirected', [required, confidence], redirected, 'law')
  // THE COURT INVOLVES ALL FAMILIES. The jury is the whole registry — every registered family, not only the subject's
  // domain siblings — so no case is tried by a hand-picked bench. This lists family NAMES only (hexFamiliesOf keys);
  // it never runs a family's formula, so the re-entrant trial cannot deadlock. The domain still names the subject's own
  // field and its siblings, but the panel is the full court; a lattice slice is shown, the whole count stands behind it.
  const subject = input.gate.name.split('.')[0]!
  const bridges = crossBridgesOf()
  const domain = bridges.get(subject)
  const siblings = domain ? [...bridges].filter(([s, d]) => d === domain && s !== subject).map(([s]) => s).sort() : []
  const jury = [...hexFamiliesOf().keys()].filter((s) => s !== subject).sort()
  const experts = { subject, domain, siblings: siblings.length, count: jury.length, all: true as const, panel: jury.slice(0, facesOf().faces) }
  const forum = `${subject} · /qpu/court`
  const allow =
    input.gate.holds === true &&
    trial.value === 1 &&
    fidelity.value === 1 &&
    standing.value > 0 &&
    lawful.value === 1 &&
    violation.holds === true
  const leads = allow ? 0 : 1
  const remedy = LawFormulas.remedy(0, leads)
  const remedyCall = callOf('law.remedy', [0, leads], remedy, 'law')
  return {
    case: input.case,
    gate: input.gate,
    confidence,
    required,
    trial: trialCall,
    reviewed: reviewedCall,
    fidelity: fidelityCall,
    standing: standingCall,
    lawful: lawfulCall,
    violation: violationCall,
    redirected: redirectedCall,
    remedy: remedyCall,
    experts,
    forum,
    allow,
    holds: allow && fidelity.holds === true && standing.holds === true && lawful.holds === true,
    goal: allow ? 'OPEN' : 'LEAD',
    note:
      input.note ??
      'gate ∧ court.standard ∧ law.fidelity re-trial ∧ law.standing(hex); law.reviewed(0) stays a lead',
  }
}

export const connectBillGateOf = (): GateCourtCase => {
  const tools = mcpToolsListOf()
  const listBytes = JSON.stringify({ resultType: 'complete', tools }).length
  const doors = tools.length
  const qpuPrefixed = tools.filter((t) => t.name.startsWith('qpu_')).length
  const billHolds = doors <= 16 && listBytes < 16384 && qpuPrefixed === 0
  const measure = CloudFormulas.storage(doors, Math.max(1, listBytes))
  const gate = callOf(
    'cloud.storage',
    [doors, Math.max(1, listBytes)],
    { ...measure, holds: billHolds && measure.holds === true },
    'cloud',
  )
  return gateCourtTrialOf({
    case: 'connect.bill',
    gate: {
      ...gate,
      value: doors,
      holds: billHolds,
      definition: `connectBill doors=${doors} bytes=${listBytes} qpu_=${qpuPrefixed}; holds ⟺ doors≤16 ∧ bytes<16384 ∧ qpu_=0`,
    },
    confidence: billHolds ? 100 : 0,
    note: 'connect bill measured on tools/list; court.standard tries the holds bit',
  })
}

export const discoverCapacityGateOf = (): GateCourtCase & {
  families: number
  faces: number
  nodes: number
  path: 'full-registry' | 'seal-wave'
} => {
  const faces = facesOf().faces
  const families = hexFamiliesOf().size
  const scale = CloudFormulas.scale(families, Math.max(1, faces))
  const nodes = Number(scale.value)
  // THE CLAIM THIS CASE DECIDES IS THE SEAL-WAVE PATH: the registry is covered by ⌈families/faces⌉ passes of one faces
  // window each. The earlier full-registry claim (all families in ONE window, nodes <= 1) was false: 1171 families over
  // 14 faces need 84 windows, and a Lean theorem in the deposit decides that. It is retired here, not made to pass.
  const covers = nodes * Math.max(1, faces) >= families && scale.holds === true
  const gate = callOf('cloud.scale', [families, Math.max(1, faces)], { ...scale, holds: covers }, 'cloud')
  const trial = gateCourtTrialOf({
    case: 'discover.capacity',
    gate,
    confidence: covers ? 100 : 0,
    note: covers
      ? `seal-wave covers the registry: ${nodes} passes of ${Math.max(1, faces)} faces hold ${families} families; the single-window claim is retired`
      : 'seal-wave does not cover the registry: passes times faces is below the family count',
  })
  return {
    ...trial,
    families,
    faces,
    nodes,
    path: 'seal-wave',
  }
}

export const accessScreenGateOf = (flags: number): GateCourtCase => {
  const screen = AccessFormulas.screen(flags)
  const gate = callOf('access.screen', [flags], screen, 'access')
  const passed = Number(screen.value)
  const confidence = screen.holds ? 100 : Math.floor((passed * 100) / 5)
  return gateCourtTrialOf({
    case: 'access.screen',
    gate,
    confidence,
    note: 'access.screen flags tried as court.standard confidence from checks passed',
  })
}

/** Unix execute bit (mode triad × who) — seal-wave / native submit need x. */
export const accessExecuteGateOf = (mode = 5, who: 'other' | 'user' | 'group' | 'owner' = 'other'): GateCourtCase => {
  const access = modeAccessOf({ mode, who })
  const bits = modeBitsOf(mode)
  const whoIndex = access.unix.whoIndex
  // access.grant(actor, target) stands for execute reach; holds when mode x is set.
  const grant = AccessFormulas.grant(whoIndex, whoIndex)
  const gate = callOf(
    'access.grant',
    [whoIndex, whoIndex],
    { ...grant, holds: bits.execute && access.decides.execute && grant.holds === true },
    'access',
  )
  return gateCourtTrialOf({
    case: `access.execute.mode${mode}.${who}`,
    gate: {
      ...gate,
      holds: bits.execute && access.decides.execute === true,
      definition: `unix ${bits.symbolic} who=${who}; execute=${bits.execute}; decides.execute=${access.decides.execute}`,
    },
    confidence: bits.execute && access.decides.execute ? 100 : 0,
    note: bits.execute
      ? 'unix execute bit on — seal-wave / native submit allowed by mode'
      : 'unix execute bit off — tools/call seal/native gated (chmod x)',
  })
}

export const cryptDigestGateOf = (digest: string): GateCourtCase => {
  const name = String(digest).toLowerCase().replace(/^sha-/, 'sha')
  const registered = name === 'sha256' || name === 'sha512'
  const token = AccessFormulas.token(registered ? 256 : 0)
  const gate = callOf(
    'access.token',
    [registered ? 256 : 0],
    { ...token, holds: registered && token.holds === true },
    'access',
  )
  return gateCourtTrialOf({
    case: `crypt.digest.${name || 'none'}`,
    gate: { ...gate, holds: registered, definition: `pbkdf2 digest registry: sha256|sha512; asked=${name}` },
    confidence: registered ? 100 : 0,
    note: registered
      ? 'digest registered in formula port; court.standard allows'
      : 'digest unbound in formula port — gate denies (absent state, not policy refuse)',
  })
}

export const priceRelationGateOf = (input: {
  legsHold: boolean
  bareCount: number
  measure: number | null
}): GateCourtCase => {
  const confidence = input.legsHold && input.bareCount === 0 ? 100 : input.legsHold ? 75 : 0
  const measure = CloudFormulas.cost(1, Math.max(0, input.measure ?? 0))
  const gate = callOf(
    'cloud.cost',
    [1, Math.max(0, input.measure ?? 0)],
    { ...measure, holds: input.legsHold },
    'cloud',
  )
  return gateCourtTrialOf({
    case: 'price.relation',
    gate: {
      ...gate,
      holds: input.legsHold,
      definition: `priceRelation legs hold=${input.legsHold}; bare=${input.bareCount}; USD unbound`,
    },
    confidence,
    required: BALANCE,
    note:
      input.bareCount > 0
        ? 'bare tree slots (unbound quantities) — court lead until legs complete'
        : 'price = CrossFormula legs; court.standard on holds',
  })
}

export type GateCourtArgs = {
  case?: string
  flags?: number
  digest?: string
  /** chmod triad for access.execute trial (default 5 = r-x). */
  mode?: number
  who?: 'other' | 'user' | 'group' | 'owner'
}

/** All standing gate cases tried in court — diagnostics / connector { court|trial: true }. */
type LeanRow = { heading: string; theorem: string; formula: string; holds: boolean }
/** The court tries each tool as the Lean theorem that bears its name, hex-addressed by its statement UUID; only lean evidence. */
export const toolCourtCasesOf = (): GateCourtCase[] => {
  // A tool is a case only where a theorem answers for it: its name or its domain suffix (crypto_shor → shor) is a Lean
  // heading. Tools with no theorem yet are leads, not cases. No hand list.
  const want = new Set(mcpToolsListOf().flatMap((t) => { const nm = t.name.replace(/^qpu_/, ''); return [nm, nm.slice(nm.lastIndexOf('_') + 1)] }))
  const lean = leanOf() as unknown as { rows: readonly LeanRow[]; cover: readonly LeanRow[]; climb: LeanRow }
  const seen = new Set<string>()
  const rows = [...lean.rows, ...lean.cover, lean.climb].filter((r) => want.has(r.heading) && !seen.has(r.heading) && seen.add(r.heading))
  return rows.map((r) =>
    gateCourtTrialOf({
      case: `tool.${r.heading}`,
      gate: callOf('lean.' + r.heading, [], { hex: statementUuidOf(r.theorem), value: r.holds ? 1 : 0, holds: r.holds, formula: r.formula }, 'lean'),
      confidence: r.holds ? 100 : 0,
      note: `court tries the ${r.heading} tool as its lean theorem — only lean evidence`,
    }),
  )
}

export const gateCourtOf = (args: GateCourtArgs = {}) => {
  const discover = discoverCapacityGateOf()
  const bill = connectBillGateOf()
  const screen = accessScreenGateOf(typeof args.flags === 'number' ? args.flags : 0b11111)
  const digest = cryptDigestGateOf(typeof args.digest === 'string' ? args.digest : 'sha256')
  const mode = typeof args.mode === 'number' && Number.isSafeInteger(args.mode) ? args.mode & 7 : 5
  const who = args.who ?? 'other'
  const execute = accessExecuteGateOf(mode, who)
  const cases = [discover, bill, screen, execute, digest, ...toolCourtCasesOf()]
  const wanted = typeof args.case === 'string' ? args.case : undefined
  const selected = wanted
    ? cases.filter((c) => c.case === wanted || c.case.startsWith(wanted) || c.case.includes(wanted))
    : cases
  const held = selected.filter((c) => c.holds)
  const n = selected.length
  const comb = CombinatoricsFormulas.combinations(Math.max(1, n), 1)
  const bin = CombinatoricsFormulas.binomial(Math.min(4, Math.max(1, n)))
  const stable = selected.every((c) => c.fidelity.holds === true && c.fidelity.value === 1 && c.standing.holds === true)
  return {
    kind: 'gate-court' as const,
    call: 'tools/call connector { court: true } | { trial: true }' as const,
    endpoint: '/api/qpu/court' as const,
    thesis:
      'every tightened gate is tried in court on each case; allow/deny is hex/value/holds/rawNext' as const,
    balance: BALANCE,
    cases: selected,
    held: held.length,
    of: n,
    combinations: {
      formula: `combinatorics.combinations(${n},1)`,
      hex: comb.hex ?? bin.hex ?? null,
      value: Number(comb.value),
      holds: comb.holds === true,
    },
    discover,
    connectBill: bill,
    execute,
    sealPath: discover.path,
    /** Stability: every case fidelity re-trial + standing receipts hold. */
    stable,
    holds: n > 0 && stable && held.length > 0,
    /** OPEN only when every case holds and is stable AND the goal is OPEN from its combinatorics (goal.ts goalOf: the
     *  faces/seals/modes/wave/domain legs, its own court trial and the connect bill). It can only tighten, never loosen. */
    goal: held.length === n && stable && goalStateOf() === 'OPEN' ? ('OPEN' as const) : ('LEAD' as const),
  }
}

export const publicGateCourtOf = async (request?: Request): Promise<Response> => {
  const url = request ? new URL(request.url) : null
  const caseName = url?.searchParams.get('case') ?? undefined
  const digest = url?.searchParams.get('digest') ?? undefined
  const whoRaw = url?.searchParams.get('who')
  const who =
    whoRaw === 'other' || whoRaw === 'user' || whoRaw === 'group' || whoRaw === 'owner' ? whoRaw : undefined
  const flagsRaw = url?.searchParams.get('flags')
  const modeRaw = url?.searchParams.get('mode')
  const flags = flagsRaw !== null && flagsRaw !== undefined && /^\d+$/.test(flagsRaw) ? Number(flagsRaw) : undefined
  const mode = modeRaw !== null && modeRaw !== undefined && /^\d+$/.test(modeRaw) ? Number(modeRaw) : undefined
  return Response.json(
    gateCourtOf({
      ...(caseName ? { case: caseName } : {}),
      ...(digest ? { digest } : {}),
      ...(flags !== undefined ? { flags } : {}),
      ...(mode !== undefined ? { mode } : {}),
      ...(who ? { who } : {}),
    }),
    { headers: { 'cache-control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=300' } },
  )
}
