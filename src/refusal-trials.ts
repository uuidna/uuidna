// refusal-trials — TRIAL EACH REFUSAL: the boundary is read against the sealed ledger and the book corpus.
// A refused lead is already settled (boundary recorded); this pass asks what the refusal CITES, what books STATE
// nearby, and whether the instrument can discriminate — desk proposes reasoning; captain seals.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { handleOf } from './handle.js'
import { adjudicate, contentWords, type VerdictKind } from './adjudicate.js'
import { testClaim } from './quantum/apps/categories/coding/claim-tester.js'
import { LEAN_LEDGER } from './theorems/generated.js'
import { theoremByKey } from './theorems/index.js'

export type RefusalStatus = 'lean' | 'policy' | 'open'
export type RefusalDisposition = 'verified' | 'purged' | 'open'

export interface RefusalPairCollision {
  handle: string
  sharedKeys: string[]
  overlap: string[]
}

export interface TheoremTrial {
  key: string
  verdict: VerdictKind
}

export interface BookHit {
  claim: string
  bookTitle: string
  bookId: number
  address: string
  overlap: string[]
}

export interface RefusalTrialRow {
  lead: string
  handle: string
  boundary: string
  leadVerdict: VerdictKind
  boundaryVerdict: VerdictKind
  instrumentValid: boolean
  /** Keys named verbatim in lead, boundary, or note. */
  citedKeys: string[]
  /** Keys the ledger already seals for this topic but the refusal boundary omitted. */
  witnessKeys: string[]
  /** citedKeys ∪ witnessKeys — backward-compatible union. */
  sealedKeys: string[]
  status: RefusalStatus
  bookHits: BookHit[]
  /** Pairwise collisions with other refusals (shared keys or strong vocabulary). */
  collisions: RefusalPairCollision[]
  /** Each sealed key trialed with adjudicate — relevance floor on the theorem name. */
  theoremTrials: TheoremTrial[]
  disposition: RefusalDisposition
  purgeReason?: string
  receipt: string
}

export interface RefusalTrialsRecord {
  why: string
  recorded: string
  refused: number
  lean: number
  policy: number
  open: number
  verified: number
  purged: number
  collisionPairs: number
  rounds: number
  receipt: string
  trials: RefusalTrialRow[]
}

export interface RefusalInput {
  lead?: string
  boundary?: string
  note?: string
}

export interface BookLeadInput {
  claim: string
  sentence: string
  book: { id: number; title: string; address: string }
}

const POLICY =
  /\b(desk|captain|robots\.txt|auto-?seal|HONEST SCOPE|gen-quantum|versionSeat|stackoverflow|chitanka|ceccec\.psg|scrape|import.*origin|two-handle|RFC 8439 stays|meaning is always null|Wall-clock|Standing architecture)\b/i

/** Topic → sealed keys the ledger already holds; boundaries often refuse without naming them. */
const WITNESS_RULES: readonly { pattern: RegExp; keys: readonly string[] }[] = [
  {
    pattern: /girdler|dual-temperature|separation-by-involution|isotope|deuterium/i,
    keys: ['dz_loses_nothing', 'doubling_collapses_nine', 'maps_differ_in_reach', 'reversible_erases_nothing'],
  },
  {
    pattern: /over-unity|free energy|first law|net-positive loop|perpetual motion|carnot/i,
    keys: ['no_perpetual_motion', 'first_law_conservation', 'carnot_efficiency_below_one'],
  },
  {
    pattern: /water.*fuel|combustion'?s ash|fully oxid|contaminant.*fuel|splitting water/i,
    keys: ['oxidation_states_sum', 'combustion_methane_balances', 'molar_mass_water'],
  },
  {
    pattern: /\bMFC\b|CH4 combustion|pilot effluent|drinkable water/i,
    keys: ['combustion_methane_balances', 'molar_mass_water', 'oxidation_states_sum'],
  },
]

const sealedKeySet = (): Set<string> => new Set(LEAN_LEDGER.map((t) => t.key))

/** sealedKeysIn(text) → every ledger key mentioned verbatim in prose. */
export function sealedKeysIn(text: string, keys: Set<string> = sealedKeySet()): string[] {
  return [...keys].filter((k) => text.includes(k))
}

/** witnessKeysFor(prose) → sealed keys the topic already has in the ledger but prose did not cite. */
export function witnessKeysFor(prose: string, keys: Set<string> = sealedKeySet()): string[] {
  const cited = new Set(sealedKeysIn(prose, keys))
  const out = new Set<string>()
  for (const rule of WITNESS_RULES) {
    if (!rule.pattern.test(prose)) continue
    for (const k of rule.keys) if (keys.has(k) && !cited.has(k)) out.add(k)
  }
  return [...out].sort()
}

/** relatedWords(a, b) → shared content words (adjudicate's floor), strong overlap only. */
export function relatedWords(a: string, b: string): string[] {
  const wa = new Set(contentWords(a))
  return contentWords(b).filter((w) => wa.has(w) && (w.length >= 4 || /\d/.test(w)))
}

/** refusalStatus(row) → lean when boundary cites sealed keys; policy when boundary is process-only; else open. */
export function refusalStatus(sealedKeys: string[], lead: string, boundary: string): RefusalStatus {
  if (sealedKeys.length > 0) return 'lean'
  const prose = `${lead} ${boundary}`
  if (POLICY.test(prose)) return 'policy'
  return 'open'
}

/** bookHitsFor(lead, boundary, corpus) → book claims sharing vocabulary with the refusal (top 5). */
export function bookHitsFor(lead: string, boundary: string, corpus: readonly BookLeadInput[], limit = 5): BookHit[] {
  const query = `${lead} ${boundary}`
  const scored = corpus
    .map((b) => {
      const overlap = relatedWords(query, `${b.claim} ${b.sentence}`)
      return { b, overlap }
    })
    .filter((x) => x.overlap.length > 0)
    .sort((a, b) => b.overlap.length - a.overlap.length || a.b.claim.localeCompare(b.b.claim))
  return scored.slice(0, limit).map(({ b, overlap }) => ({
    claim: b.claim,
    bookTitle: b.book.title,
    bookId: b.book.id,
    address: b.book.address,
    overlap,
  }))
}

/** theoremTrialStatement(key) → adjudicate-ready sentence with vocabulary from the sealed name. */
export function theoremTrialStatement(key: string): string {
  const th = theoremByKey().get(key)
  if (!th) return `proven by theorem ${key}`
  const gloss = contentWords(th.name).slice(0, 12).join(' ')
  return gloss ? `${gloss}, proven by theorem ${key}` : `proven by theorem ${key}`
}

/** theoremTrialsFor(keys) → one adjudicate verdict per sealed key. */
export function theoremTrialsFor(keys: readonly string[]): TheoremTrial[] {
  return keys.map((key) => ({ key, verdict: adjudicate(theoremTrialStatement(key)).verdict }))
}

const COLLISION_OVERLAP = 3

/** collisionPairCount(trials) → undirected collision pair count. */
export function collisionPairCount(trials: readonly RefusalTrialRow[]): number {
  let n = 0
  for (let i = 0; i < trials.length; i++) {
    for (let j = i + 1; j < trials.length; j++) {
      const a = trials[i]!
      const b = trials[j]!
      const sharedKeys = a.sealedKeys.filter((k) => b.sealedKeys.includes(k))
      const overlap = relatedWords(`${a.lead} ${a.boundary}`, `${b.lead} ${b.boundary}`)
      if (sharedKeys.length || overlap.length >= COLLISION_OVERLAP) n++
    }
  }
  return n
}
export function pairCollisions(trials: readonly RefusalTrialRow[]): RefusalPairCollision[][] {
  const out: RefusalPairCollision[][] = trials.map(() => [])
  for (let i = 0; i < trials.length; i++) {
    for (let j = i + 1; j < trials.length; j++) {
      const a = trials[i]!
      const b = trials[j]!
      const sharedKeys = a.sealedKeys.filter((k) => b.sealedKeys.includes(k))
      const overlap = relatedWords(`${a.lead} ${a.boundary}`, `${b.lead} ${b.boundary}`)
      if (!sharedKeys.length && overlap.length < COLLISION_OVERLAP) continue
      const hit: RefusalPairCollision = { handle: b.handle, sharedKeys, overlap }
      const hitB: RefusalPairCollision = { handle: a.handle, sharedKeys, overlap }
      out[i]!.push(hit)
      out[j]!.push(hitB)
    }
  }
  return out
}

/** dispositionFor(trial, theoremTrials, purgeReason?) → verified, purged, or still open. */
export function dispositionFor(
  trial: Pick<RefusalTrialRow, 'status'>,
  theoremTrials: readonly TheoremTrial[],
  purgeReason?: string,
): RefusalDisposition {
  if (purgeReason) return 'purged'
  if (trial.status === 'policy') return 'verified'
  if (trial.status === 'lean') {
    return theoremTrials.length > 0 && theoremTrials.every((t) => t.verdict === 'VERIFIED') ? 'verified' : 'open'
  }
  return 'open'
}

const normLead = (lead: string): string => lead.trim().toLowerCase()

/** duplicateLeadPurges(refused) → handle → reason for exact duplicate leads. */
export function duplicateLeadPurges(refused: readonly RefusalInput[]): Map<string, string> {
  const seen = new Map<string, string>()
  const purges = new Map<string, string>()
  for (const row of refused) {
    const lead = String(row.lead ?? '').trim()
    if (!lead) continue
    const handle = handleOf(toUuid(lead))
    const n = normLead(lead)
    const first = seen.get(n)
    if (first) purges.set(handle, `duplicate lead of ${first}`)
    else seen.set(n, handle)
  }
  return purges
}

/** pushCollidingWitness(rows, trials) → append sealed keys from colliding lean rows onto open neighbours. */
export function pushCollidingWitness(
  rows: readonly RefusalInput[],
  trials: readonly RefusalTrialRow[],
): { rows: RefusalInput[]; changed: boolean } {
  const collisions = pairCollisions(trials)
  const next = rows.map((r) => ({ ...r }))
  const byHandle = new Map(trials.map((t, i) => [t.handle, i]))
  let changed = false
  for (let i = 0; i < trials.length; i++) {
    const t = trials[i]!
    if (t.status !== 'open') continue
    const keys = new Set<string>()
    for (const c of collisions[i] ?? []) {
      const other = trials[byHandle.get(c.handle) ?? -1]
      if (!other || other.status !== 'lean') continue
      for (const k of other.sealedKeys) keys.add(k)
    }
    if (!keys.size) continue
    const rowIdx = next.findIndex((r) => handleOf(toUuid(String(r.lead ?? ''))) === t.handle)
    if (rowIdx < 0) continue
    const row = next[rowIdx]!
    const prose = `${t.lead} ${t.boundary} ${row.note ?? ''}`
    const add = [...keys].filter((k) => !prose.includes(k))
    if (!add.length) continue
    next[rowIdx] = {
      ...row,
      note: `${row.note ?? ''} collision-witness: ${add.join(' ')}`.trim(),
    }
    changed = true
  }
  return { rows: next, changed }
}

/** enrichTrials(base, purges) → attach collisions, theorem trials, and disposition. */
export function enrichTrials(
  base: readonly RefusalTrialRow[],
  purges: ReadonlyMap<string, string>,
): RefusalTrialRow[] {
  const collisions = pairCollisions(base)
  return base.map((t, i) => {
    const theoremTrials = theoremTrialsFor(t.sealedKeys)
    const purgeReason = purges.get(t.handle)
    const disposition = dispositionFor(t, theoremTrials, purgeReason)
    return {
      ...t,
      collisions: collisions[i] ?? [],
      theoremTrials,
      disposition,
      purgeReason,
      receipt: merkleGravity([
        t.receipt,
        toUuid(`collide|${(collisions[i] ?? []).map((c) => c.handle).join(',')}`),
        toUuid(`theorems|${theoremTrials.map((x) => `${x.key}:${x.verdict}`).join(',')}`),
        toUuid(`disposition|${disposition}`),
      ]),
    }
  })
}

/** collideRefusals(refused, corpus?, maxRounds?) → push colliding refusals and theorems until stable. */
export function collideRefusals(
  refused: readonly RefusalInput[],
  corpus: readonly BookLeadInput[] = [],
  maxRounds = 12,
): RefusalTrialsRecord {
  const purges = duplicateLeadPurges(refused)
  let rows = refused.map((r) => ({ ...r }))
  let rounds = 0
  let base = trialAllRefusals(rows, corpus, { enrich: false })
  while (rounds < maxRounds) {
    const pushed = pushCollidingWitness(rows, base.trials)
    if (!pushed.changed) break
    rows = pushed.rows
    rounds++
    base = trialAllRefusals(rows, corpus, { enrich: false })
  }
  const trials = enrichTrials(base.trials, purges)
  const lean = trials.filter((t) => t.status === 'lean').length
  const policy = trials.filter((t) => t.status === 'policy').length
  const open = trials.filter((t) => t.status === 'open').length
  const verified = trials.filter((t) => t.disposition === 'verified').length
  const purged = trials.filter((t) => t.disposition === 'purged').length
  const collisionPairs = collisionPairCount(trials)
  const receipt = merkleGravity(trials.map((t) => t.receipt))
  return {
    why:
      'Each refused lead trialed against the sealed ledger, book corpus, pairwise refusal collisions, and per-key ' +
      'theorem adjudication. Witness keys push across colliding lean→open neighbours until stable. verified = policy ' +
      'boundary OR lean with every sealed key adjudicated VERIFIED; purged = duplicate lead; open = still unsettled. ' +
      'Desk proposes; captain seals.',
    recorded: receipt.slice(0, 10),
    refused: trials.length,
    lean,
    policy,
    open,
    verified,
    purged,
    collisionPairs,
    rounds,
    receipt,
    trials,
  }
}

/** trialRefusal(row, corpus?) → one refusal trialed against ledger + optional book leads. Pure. */
export function trialRefusal(row: RefusalInput, corpus: readonly BookLeadInput[] = []): RefusalTrialRow | null {
  const lead = String(row.lead ?? '').trim()
  const boundary = String(row.boundary ?? '').trim()
  if (!lead || !boundary) return null
  const prose = `${lead} ${boundary} ${row.note ?? ''}`
  const citedKeys = sealedKeysIn(prose)
  const witnessKeys = witnessKeysFor(prose)
  const sealedKeys = [...new Set([...citedKeys, ...witnessKeys])].sort()
  const claim = testClaim(lead)
  const handle = handleOf(toUuid(lead))
  const bookHits = bookHitsFor(lead, boundary, corpus)
  const status = refusalStatus(sealedKeys, lead, boundary)
  const receipt = merkleGravity([
    toUuid(`refusal|${handle}|${status}`),
    toUuid(`keys|${sealedKeys.join(',')}`),
    toUuid(`witness|${witnessKeys.join(',')}`),
    toUuid(`books|${bookHits.map((h) => h.address).join(',')}`),
  ])
  const base: RefusalTrialRow = {
    lead,
    handle,
    boundary,
    leadVerdict: claim.subject?.verdict ?? 'UNVERIFIED',
    boundaryVerdict: adjudicate(boundary).verdict,
    instrumentValid: claim.instrumentValid,
    citedKeys,
    witnessKeys,
    sealedKeys,
    status,
    bookHits,
    collisions: [],
    theoremTrials: [],
    disposition: 'open',
    receipt,
  }
  const enriched = enrichTrials([base], new Map())
  return enriched[0] ?? null
}

/** trialAllRefusals(refused, corpus?, opts?) → census over every refused row with boundary. */
export function trialAllRefusals(
  refused: readonly RefusalInput[],
  corpus: readonly BookLeadInput[] = [],
  opts: { enrich?: boolean } = {},
): RefusalTrialsRecord {
  const raw = refused
    .map((r) => {
      const lead = String(r.lead ?? '').trim()
      const boundary = String(r.boundary ?? '').trim()
      if (!lead || !boundary) return null
      const prose = `${lead} ${boundary} ${r.note ?? ''}`
      const citedKeys = sealedKeysIn(prose)
      const witnessKeys = witnessKeysFor(prose)
      const sealedKeys = [...new Set([...citedKeys, ...witnessKeys])].sort()
      const claim = testClaim(lead)
      const handle = handleOf(toUuid(lead))
      const bookHits = bookHitsFor(lead, boundary, corpus)
      const status = refusalStatus(sealedKeys, lead, boundary)
      const receipt = merkleGravity([
        toUuid(`refusal|${handle}|${status}`),
        toUuid(`keys|${sealedKeys.join(',')}`),
        toUuid(`witness|${witnessKeys.join(',')}`),
        toUuid(`books|${bookHits.map((h) => h.address).join(',')}`),
      ])
      return {
        lead,
        handle,
        boundary,
        leadVerdict: claim.subject?.verdict ?? 'UNVERIFIED',
        boundaryVerdict: adjudicate(boundary).verdict,
        instrumentValid: claim.instrumentValid,
        citedKeys,
        witnessKeys,
        sealedKeys,
        status,
        bookHits,
        collisions: [] as RefusalPairCollision[],
        theoremTrials: [] as TheoremTrial[],
        disposition: 'open' as RefusalDisposition,
        receipt,
      }
    })
    .filter((t): t is RefusalTrialRow => t !== null)
  const purges = duplicateLeadPurges(refused)
  const trials = opts.enrich === false ? raw : enrichTrials(raw, purges)
  const lean = trials.filter((t) => t.status === 'lean').length
  const policy = trials.filter((t) => t.status === 'policy').length
  const open = trials.filter((t) => t.status === 'open').length
  const verified = trials.filter((t) => t.disposition === 'verified').length
  const purged = trials.filter((t) => t.disposition === 'purged').length
  const collisionPairs = collisionPairCount(trials)
  const receipt = merkleGravity(trials.map((t) => t.receipt))
  return {
    why:
      'Each refused lead from lean/leads.json trialed against the sealed ledger (cited + witness keys) and the book corpus ' +
      '(vocabulary overlap with book-leads.json). lean = boundary cites sealed theorem keys OR the ledger already seals the ' +
      'topic (witnessKeys — evidence the boundary omitted); policy = process/architecture boundary with no world predicate; ' +
      'open = no sealed witness yet. Desk proposes; captain seals.',
    recorded: receipt.slice(0, 10),
    refused: trials.length,
    lean,
    policy,
    open,
    verified,
    purged,
    collisionPairs,
    rounds: 0,
    receipt,
    trials,
  }
}

/** refusalTrialsOpen(record) → refusals still unsettled (not verified and not purged). */
export function refusalTrialsOpen(record: RefusalTrialsRecord | null | undefined): number {
  if (!record) return 0
  if (record.trials.length && 'disposition' in record.trials[0]!) {
    return record.trials.filter((t) => t.disposition === 'open').length
  }
  return record.open ?? record.trials.filter((t) => t.status === 'open').length
}
