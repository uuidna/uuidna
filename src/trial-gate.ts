// trial-gate — NO TRAITOR ENTERS THE TRIAL BY ARCHITECTURE.
//
// The trial is a merkaba: eight sealed vertices (HANDLE_HEXBITS), two tetrahedra of four inputs each. Every input
// must recompute before the walk runs; anything unverified, forged, or architecturally forbidden is refused at the
// gate — not caught later, not debated. Cheap agents may involute statements all day; admission is exact ledger
// match or refusal.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { HANDLE_HEXBITS, UUID_HEXBITS } from './hexbit/index.js'
import { imprintTextChain } from './imprint.js'
import { applyToElements, INVOLUTIONS, involutionSurvives, type Involution, type Survival } from './involution/index.js'
import { THEOREMS, type Theorem } from './theorems/index.js'

export type TrialRefusalKind =
  | 'forged-dna'
  | 'key-collision'
  | 'address-collision'
  | 'seal-integrity'
  | 'architecture'
  | 'unverified'

export interface TrialCandidate {
  key: string
  statement: string
  lean: string
  file: string
}

export interface TrialAdmission {
  admitted: boolean
  kind: TrialRefusalKind | 'verified'
  detail: string
}

export interface TrialSeal {
  id: string
  receipt: string
  ok: boolean
}

export interface TrialMerkaba {
  vertices: number
  merkabasPacked: number
  yang: readonly TrialSeal[]
  yin: readonly TrialSeal[]
  inputs: readonly TrialSeal[]
  outputs: readonly TrialSeal[]
  traitorProof: { admitted: boolean; receipt: string }
  receipt: string
}

const HEXBIT_COURT = new Set([
  'hexbit_states_are_sixteen',
  'message_cap_is_four_hexbits',
  'hexbit_ring_mass_gap',
  'born_field_mass_gap_on_bell',
])
const HEXBIT_TRAITOR_ALIASES = new Set(['qft_mass_gap', 'mass_gap_on_bell_born_field'])

type LedgerRow = Pick<Theorem, 'key' | 'statement' | 'address' | 'lean' | 'file'>

const seal = (id: string, receipt: string, ok: boolean): TrialSeal => ({ id, receipt, ok })

/** trialAdmit(c) → architectural gate: exact sealed ledger row, or refused. */
// THE LEDGER IS INDEXED ONCE PER LEDGER, not scanned once per candidate. `ledger.find` here was a linear walk
// over every sealed row for EVERY candidate — 2653 × 2653 comparisons when the whole ledger is admitted, which
// is what publications() does to compose the monographs. Measured: 11.0s to build the corpus, ~3s of it inside
// this one line, and it grows quadratically with the ledger. The index is keyed on the ledger ARRAY so a caller
// that passes its own rows still gets its own index, and the default (THEOREMS) is built once for the process.
const INDEX = new WeakMap<readonly LedgerRow[], Map<string, LedgerRow>>()
const rowFor = (ledger: readonly LedgerRow[], key: string): LedgerRow | undefined => {
  let ix = INDEX.get(ledger)
  if (ix === undefined) {
    ix = new Map(ledger.map((t) => [t.key, t]))
    INDEX.set(ledger, ix)
  }
  return ix.get(key)
}

export function trialAdmit(
  c: TrialCandidate,
  ledger: readonly LedgerRow[] = THEOREMS,
): TrialAdmission {
  const row = rowFor(ledger, c.key)
  if (row && row.statement === c.statement && row.file === c.file) {
    const bound = c.lean.startsWith('theorem ' + c.key + ' ') || c.lean.startsWith('theorem ' + c.key + ':')
    if (bound && c.lean.includes(':= by decide') && toUuid(c.key + ':' + c.statement) === row.address) {
      return { admitted: true, kind: 'verified', detail: row.key }
    }
    return {
      admitted: false,
      kind: 'seal-integrity',
      detail: `${c.key} — lean does not bind to the sealed row or address drifted`,
    }
  }

  if (HEXBIT_COURT.has(c.key) && c.file !== 'Hexbit.lean') {
    return {
      admitted: false,
      kind: 'architecture',
      detail: `${c.key} — court voice must seal on Hexbit.lean (got ${c.file})`,
    }
  }
  if (HEXBIT_TRAITOR_ALIASES.has(c.key)) {
    return {
      admitted: false,
      kind: 'architecture',
      detail: `${c.key} — forbidden hexbit-court twin`,
    }
  }

  if (!(c.lean.startsWith('theorem ' + c.key + ' ') || c.lean.startsWith('theorem ' + c.key + ':')) || !c.lean.includes(':= by decide')) {
    return {
      admitted: false,
      kind: 'seal-integrity',
      detail: `${c.key} — not a by-decide proof bound to its key`,
    }
  }

  const address = toUuid(c.key + ':' + c.statement)
  if (row && row.statement !== c.statement) {
    return { admitted: false, kind: 'key-collision', detail: `${c.key} — key already sealed with a different statement` }
  }
  const addrOwner = ledger.find((t) => t.address === address)
  if (addrOwner && addrOwner.key !== c.key) {
    return { admitted: false, kind: 'address-collision', detail: `${c.key} collides at ${address} with ${addrOwner.key}` }
  }
  if (toUuid(c.key + ':' + c.statement) !== address) {
    return { admitted: false, kind: 'forged-dna', detail: `${c.key} — address does not recompute` }
  }

  return {
    admitted: false,
    kind: 'unverified',
    detail: `${c.key} — no sealed wing row admits this proposition`,
  }
}

/** trialAdmitMany — batch gate for agent swarms; order preserved. */
export function trialAdmitMany(
  candidates: readonly TrialCandidate[],
  ledger: readonly LedgerRow[] = THEOREMS,
): readonly TrialAdmission[] {
  return candidates.map((c) => trialAdmit(c, ledger))
}

/** assertTrialGate — every ledger row must pass admission before runTrial walks. */
export function assertTrialGate(ledger: readonly LedgerRow[] = THEOREMS): void {
  for (const t of ledger) {
    const a = trialAdmit({ key: t.key, statement: t.statement, lean: t.lean, file: t.file }, ledger)
    if (!a.admitted) throw new Error(`trial gate refused sealed ledger row ${t.key}: ${a.detail}`)
  }
}

/** buildTrialMerkaba — eight inputs (4+4), multiple sealed outputs, traitor-proof fold. */
export function buildTrialMerkaba(opts: {
  ledgerReceipt: string
  sequenceReceipt: string
  count: number
  polarities: { minus: number; neutral: number; plus: number }
  gateReceipt: string
}): TrialMerkaba {
  const yang: TrialSeal[] = [
    seal('ledger', opts.ledgerReceipt, true),
    seal('sequence', opts.sequenceReceipt, true),
    seal('count', toUuid(`trial-count|${opts.count}`), opts.count > 0),
    seal('polarity-partition', toUuid(`polarity|${opts.polarities.minus}|${opts.polarities.neutral}|${opts.polarities.plus}`), true),
  ]
  const yin: TrialSeal[] = [
    seal('gate', opts.gateReceipt, true),
    seal('merkaba-vertices', toUuid(`merkaba|${HANDLE_HEXBITS}`), HANDLE_HEXBITS === 8),
    seal('merkabas-packed', toUuid(`packed|${UUID_HEXBITS}`), UUID_HEXBITS === 32),
    seal('traitor-refused', toUuid('trial-gate|no-unverified'), true),
  ]
  const inputs = [...yang, ...yin]
  const outputs: TrialSeal[] = [
    seal('receipt', opts.ledgerReceipt, true),
    seal('sequence-out', opts.sequenceReceipt, true),
    seal('polarity-out', yang[3]!.receipt, true),
    seal('walk-out', toUuid(`walk|${opts.count}`), true),
    seal('spin-out', toUuid(`spin|${opts.polarities.minus}|${opts.polarities.plus}`), true),
    seal('angle-out', toUuid(`angle|${opts.polarities.neutral}`), true),
    seal('ray-out', toUuid(`ray|7`), true),
    seal('merkaba-out', merkleGravity(inputs.map((s) => s.receipt)), true),
  ]
  const traitorProof = { admitted: true, receipt: opts.gateReceipt }
  const receipt = merkleGravity([...inputs.map((s) => s.receipt), ...outputs.map((s) => s.receipt), traitorProof.receipt])
  return {
    vertices: HANDLE_HEXBITS,
    merkabasPacked: UUID_HEXBITS,
    yang,
    yin,
    inputs,
    outputs,
    traitorProof,
    receipt,
  }
}

export interface TrialAgentRecord {
  key: string
  involution: string
  denial: string
  survival: Survival | 'fixed-at-source'
  denialAdmission: TrialAdmission
  candidate: TrialCandidate
  admission: TrialAdmission
  refusalReceipt: string
  verified: boolean
}

export interface TrialSwarmSeal {
  agents: number
  verified: number
  denialsRefused: number
  denialsFixed: number
  involutions: Readonly<Record<string, number>>
  kinds: Readonly<Record<TrialRefusalKind, number>>
  refusals: readonly { kind: TrialRefusalKind; receipt: string }[]
  admissions: readonly { key: string; receipt: string }[]
  receipt: string
}

export interface TrialSealedContent {
  trial: import('./theorems/index.js').TrialResult
  verified: readonly { key: string; address: string; carrier: readonly string[] }[]
  refused: readonly { kind: TrialRefusalKind; carrier: readonly string[] }[]
  swarm: TrialSwarmSeal
  imprint: readonly string[]
  address: string
  receipt: string
}

export const admissionReceipt = (c: TrialCandidate): string =>
  toUuid(`trial-admit|${c.key}|${toUuid(c.key + ':' + c.statement)}`)

export const refusalReceipt = (c: TrialCandidate, a: TrialAdmission): string =>
  toUuid(`trial-refusal|${a.kind}|${c.key}|${c.statement.length}|${a.detail.slice(0, 64)}`)

/** trialAgentVerifyByDenial — deny once (involute), return home, gate both; verify iff home admits. */
export function trialAgentVerifyByDenial(
  t: Theorem,
  inv: Involution,
  ledger: readonly LedgerRow[] = THEOREMS,
): TrialAgentRecord {
  const denial = applyToElements(t.statement, inv)
  const home = applyToElements(denial, inv)
  if (home !== t.statement) {
    throw new Error(`involution ${inv.name} did not return on ${t.key}`)
  }
  const survival = denial === t.statement ? 'fixed-at-source' : involutionSurvives(t.statement, inv)

  const denialCandidate: TrialCandidate = {
    key: t.key,
    statement: denial,
    lean: `theorem ${t.key} : ${denial} := by decide`,
    file: t.file,
  }
  const denialAdmission = trialAdmit(denialCandidate, ledger)

  const candidate: TrialCandidate = {
    key: t.key,
    statement: t.statement,
    lean: t.lean,
    file: t.file,
  }
  const admission = trialAdmit(candidate, ledger)
  const verified = admission.admitted && (denial === t.statement || !denialAdmission.admitted)
  const refusalReceiptId = denialAdmission.admitted
    ? admissionReceipt(denialCandidate)
    : refusalReceipt(denialCandidate, denialAdmission)

  return {
    key: t.key,
    involution: inv.name,
    denial,
    survival,
    denialAdmission,
    candidate,
    admission,
    refusalReceipt: refusalReceiptId,
    verified,
  }
}

/** trialAgentSwarm(n) — every agent verifies by involuting denials, then sealing home rows. */
export function trialAgentSwarm(
  count: number,
  ledger: readonly LedgerRow[] = THEOREMS,
  invs: readonly Involution[] = INVOLUTIONS,
): { records: readonly TrialAgentRecord[]; seal: TrialSwarmSeal } {
  const records: TrialAgentRecord[] = []
  const kinds: Record<TrialRefusalKind, number> = {
    'forged-dna': 0,
    'key-collision': 0,
    'address-collision': 0,
    'seal-integrity': 0,
    architecture: 0,
    unverified: 0,
  }
  const involutions: Record<string, number> = {}
  const admissions: { key: string; receipt: string }[] = []
  let verified = 0
  let denialsRefused = 0
  let denialsFixed = 0
  for (let i = 0; i < count; i++) {
    const t = THEOREMS[i % THEOREMS.length]!
    const inv = invs[i % invs.length]!
    const record = trialAgentVerifyByDenial(t, inv, ledger)
    involutions[inv.name] = (involutions[inv.name] ?? 0) + 1
    if (record.verified) {
      verified++
      admissions.push({ key: record.key, receipt: admissionReceipt(record.candidate) })
    }
    if (record.denial === t.statement) denialsFixed++
    else if (!record.denialAdmission.admitted) {
      denialsRefused++
      if (record.denialAdmission.kind !== 'verified') kinds[record.denialAdmission.kind]++
    }
    records.push(record)
  }
  const refusals = records
    .filter((r) => r.denial !== r.candidate.statement && !r.denialAdmission.admitted)
    .map((r) => ({ kind: r.denialAdmission.kind as TrialRefusalKind, receipt: r.refusalReceipt }))
  const receipt = merkleGravity([
    toUuid(`trial-swarm|${count}|${verified}|${denialsRefused}|${denialsFixed}`),
    ...admissions.map((a) => a.receipt),
    ...refusals.map((r) => r.receipt),
  ])
  return {
    records,
    seal: {
      agents: count,
      verified,
      denialsRefused,
      denialsFixed,
      involutions,
      kinds,
      refusals,
      admissions,
      receipt,
    },
  }
}
