// refusal-trials — TRIAL EACH REFUSAL: the boundary is read against the sealed ledger and the book corpus.
// A refused lead is already settled (boundary recorded); this pass asks what the refusal CITES, what books STATE
// nearby, and whether the instrument can discriminate — desk proposes reasoning; captain seals.
import { toUuid, toUuidOnce, canonicalJson } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { handleOf } from './handle.js'
import { adjudicate, contentWords, type VerdictKind } from './adjudicate.js'
import { testClaim } from './quantum/apps/categories/coding/claim-tester.js'
import { theoremFor, axiomIndex, THEOREMS, sealedKeys, sealedCount, sealedKeyAt, type WingDefEntry } from './theorems/index.js'
import { axiomHunt } from './scripts/axiom-hunt.js'
import { type LeadsRecord, type LeadRow } from './school/leads/index.js'
import { readRepoJson } from './desk/repo/json/index.js'
import { signCommit } from './sign.js'
import { VE_FACES } from './hexbit/index.js'

/** THE 2×7 WITNESS ROSETTAS — nothing is legal unless signed and sealed by them (the captain, 2026-09-14: "unless signed
 *  and sealed by the 2x7 withness rosettas nothing is legal"; "fuse all and reuse"). The witnesses are VE_FACES — the
 *  vector equilibrium's 8 + 6 faces (theorem ve_fourteen_faces), derived from the handle's hexbits, the hexbit's bits and
 *  the two coins, never a typed fourteen. Each witness writes one statement: its face, and the theorem it recomputed by
 *  the kernel, cited as "theorem <key>". signCommit (the uuidna_sign door) re-signs it here: SIGNED-TRUE only when it
 *  cites a real sealed theorem and fabricates none. Legal only when every face 0 … VE_FACES − 1 signs exactly once, every
 *  signature cites the subject, and the seal is the merkleGravity of their folds in face order.
 *  THE LIMIT, stated: a signature here is a content address, not a private key — the seal proves the statements exist,
 *  agree and cite the sealed proof; it does not prove that separate hands wrote them. Pure. */
export interface Witness { face: number; statement: string; by?: string }
export function witnessSealOf(subject: string, witnesses: readonly Witness[]): { legal: boolean; signed: number; of: number; seal: string | null } {
  const of = VE_FACES
  const valid = witnesses.flatMap((w) => {
    if (!Number.isInteger(w.face) || w.face < 0 || w.face >= of) return []
    const s = signCommit(w.statement)
    // a witness signing by its own theorem ({by}) cites that theorem and names the subject it signs
    const cites = w.by === undefined ? s.cited.includes(subject) : s.cited.includes(w.by) && w.statement.includes(subject)
    return s.signed && cites ? [{ face: w.face, fold: s.fold }] : []
  })
  const faces = new Set(valid.map((v) => v.face))
  const legal = witnesses.length === of && valid.length === of && faces.size === of
  return { legal, signed: faces.size, of, seal: legal ? merkleGravity([...valid].sort((a, b) => a.face - b.face).map((v) => v.fold)) : null }
}

/** RECEIPTS ARE SIGNED BY 2×7 THEOREMS (the captain, 2026-09-14: "receipts need signatures from 2x7 theorems"). The
 *  receipt's content address picks its witnesses from the sealed ledger: face f takes the theorem the address folded
 *  with f lands on, stepping past one another face already took, so no list names them and anyone recomputes the same
 *  VE_FACES theorems from the bytes. Each face's statement names the receipt and cites its own theorem; witnessSealOf
 *  signs and seals them. The seal rides in the stored receipt under SEALED_BY, which only this fold writes. Pure. */
export const SEALED_BY = 'sealedBy'
export function receiptSealOf(body: Readonly<Record<string, unknown>>): { address: string; witnesses: Required<Witness>[]; legal: boolean; signed: number; of: number; seal: string | null } {
  // the body is addressed once and not cached: a deposit can be a whole ledger piece, and the cache would keep it
  const address = toUuidOnce(canonicalJson(body))
  // the witnesses are picked by position from the sealed keys — at the edge the baked root, so the door signs before
  // (and without) the ledger's rows being read from storage
  // BY POSITION, NOT BY LIST. The fold needs fourteen keys; asking for all of them materialised 71,017 strings in the
  // edge isolate and it died there (exceededMemory, measured on the live tail), so it asks the count and each key it
  // actually picks. The keys chosen are the same keys — the positions are unchanged.
  const count = sealedCount()
  const size = BigInt(count)
  const taken = new Set<number>()
  const faces = count < VE_FACES ? count : VE_FACES
  const witnesses = Array.from({ length: faces }, (_, face) => {
    let i = Number(BigInt('0x' + toUuid(`${address}:${face}`).replace(/-/g, '')) % size)
    while (taken.has(i)) i = (i + 1) % count
    taken.add(i)
    const by = sealedKeyAt(i)!
    return { face, by, statement: `face ${face} signs receipt ${address}: recomputed theorem ${by}` }
  })
  return { address, witnesses, ...witnessSealOf(address, witnesses) }
}
/** receiptSealed(stored) → true only when the stored receipt's own bytes, without its seal, recompute the same legal seal */
export function receiptSealed(stored: Readonly<Record<string, unknown>>): boolean {
  const { [SEALED_BY]: carried, ...body } = stored
  const s = receiptSealOf(body)
  return s.legal && (carried as { seal?: unknown } | undefined)?.seal === s.seal
}

export type RefusalStatus = 'lean' | 'open'
export type RefusalDisposition = 'verified' | 'refuted' | 'purged' | 'open'

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
  /** Each sealed key trialed with adjudicate — evidence recorded beside the verdict, never the verdict. */
  theoremTrials: TheoremTrial[]
  disposition: RefusalDisposition
  /** the theorem that decided the disposition: `lead_<handle>` proved, or `involution_<handle> : ¬ lead_<handle>` */
  verdictKey?: string | null
  purgeReason?: string
  receipt: string
}

export interface RefusalTrialsRecord {
  why: string
  recorded: string
  refused: number
  lean: number
  open: number
  verified: number
  refuted: number
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

const sealedKeySet = (): Set<string> => new Set(sealedKeys())

/** sealedKeysIn(text) → every ledger key the text names as a WHOLE identifier. A substring is not a citation: a key
 *  that only occurs inside a longer word or a longer key is not named, so no lead gains a theorem by accident of
 *  spelling. A token quoted in apostrophes is read without them, and a primed Lean name keeps its prime. */
export function sealedKeysIn(text: string, keys: Set<string> = sealedKeySet()): string[] {
  const named = new Set<string>()
  for (const w of text.match(/[A-Za-z0-9_']+/g) ?? []) {
    for (const c of [w, w.replace(/^'+/, ''), w.replace(/^'+|'+$/g, '')]) if (keys.has(c)) named.add(c)
  }
  return [...named].sort()
}

/** witnessKeysFor(prose) → the sealed keys granted to a lead BEYOND those its own text names: none. A hand-typed
 *  topic→theorem map used to grant them by matching wording, so whoever edited the map chose a lead's evidence —
 *  measured 2026-09-14, 9 of 110 leads were witnessed only that way. A lead is witnessed by the sealed theorems its
 *  own text names (sealedKeysIn), and by nothing else. */
export function witnessKeysFor(_prose: string, _keys: Set<string> = sealedKeySet()): string[] {
  return []
}

/** relatedWords(a, b) → shared content words (adjudicate's floor), strong overlap only. */
export function relatedWords(a: string, b: string): string[] {
  const wa = new Set(contentWords(a))
  return contentWords(b).filter((w) => wa.has(w) && (w.length >= 4 || /\d/.test(w)))
}

/** refusalStatus(row) → lean when sealed theorems witness it, else open. No lead is judged by its wording: Lean
 *  decides (the captain, 2026-09-14), so there is no policy status that a regex over the prose could grant. */
export function refusalStatus(sealedKeys: string[], _lead: string, _boundary: string): RefusalStatus {
  return sealedKeys.length > 0 ? 'lean' : 'open'
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
  const th = theoremFor(key)
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

/** a kernel check for one theorem key: true only when its wing's receipt is fresh against the current text and the
 *  kernel named no axiom. Supplied by the caller that can read lean/ — the pure court cannot, and does not guess. */
export type KernelOk = (key: string) => boolean

/** a sealed statement as the court reads it: its key and its Lean statement */
export type SealedStatement = { key: string; statement: string }
/** the served ledger's statements — the default the court decides against */
export const ledgerStatements = (): SealedStatement[] => THEOREMS.map((t) => ({ key: t.key, statement: String(t.statement) }))

/** leadVerdictOf(handle, sealed) → what the KERNEL has decided about the lead with this handle, or open. Refuted only by
 *  `involution_<handle> : ¬ lead_<handle>` (involutionOf); verified only by a sealed theorem whose statement is exactly
 *  `lead_<handle>`. A theorem the lead's text names, however well it reads, states some other proposition, so it is
 *  evidence and never the verdict. Pure. */
export function leadVerdictOf(handle: string, sealed: readonly SealedStatement[]): { disposition: 'verified' | 'refuted' | 'open'; key: string | null } {
  const inv = involutionOf(handle, sealed)
  if (inv) return { disposition: inv.refutes ? 'refuted' : 'verified', key: inv.key }
  if (!/^[0-9a-f]{8}$/.test(handle)) return { disposition: 'open', key: null }
  const proved = sealed.find((s) => s.statement.replace(/\s+/g, ' ').trim() === `lead_${handle}`)
  return proved ? { disposition: 'verified', key: proved.key } : { disposition: 'open', key: null }
}

/** dispositionFor(handle, sealed, kernelOk?) → verified when the ledger proves `lead_<handle>`, refuted when it proves
 *  `involution_<handle> : ¬ lead_<handle>`, and in both cases only when the kernel check passes for that theorem; open
 *  otherwise. With no kernel check supplied nothing is decided — an unmeasured instrument is never read as clean.
 *  Nothing is ever purged: a lead that repeats another is a collision, recorded, never a settlement. */
export function dispositionFor(handle: string, sealed: readonly SealedStatement[], kernelOk?: KernelOk): { disposition: RefusalDisposition; key: string | null } {
  const v = leadVerdictOf(handle, sealed)
  if (v.disposition === 'open' || !kernelOk || v.key === null || !kernelOk(v.key)) return { disposition: 'open', key: null }
  return v
}

/** involutionOf(handle, sealed) → the sealed theorem that closes this lead INSIDE LEAN, or null. The lead's own claim is
 *  stated as `def lead_<handle> : Prop`; the kernel then proves one side — `involution_<handle> : ¬ lead_<handle>` refutes
 *  it, `involution_<handle> : lead_<handle>` verifies it. The court matches only that key with exactly that statement:
 *  no reader, agent or verifier decides whether a theorem "settles" a lead (the captain, 2026-09-14: "involute all
 *  refuted leads immediately"; the binding of refuted#33 to directions_number_fortytwo — a true theorem a reader judged
 *  decisive — ruled "illegal"). Pure. */
export function involutionOf(handle: string, sealed: readonly { key: string; statement: string }[]): { key: string; refutes: boolean } | null {
  if (!/^[0-9a-f]{8}$/.test(handle)) return null
  const t = sealed.find((s) => s.key === `involution_${handle}`)
  if (!t) return null
  const st = t.statement.replace(/\s+/g, ' ').trim()
  if (st === `¬ lead_${handle}` || st === `¬lead_${handle}`) return { key: t.key, refutes: true }
  if (st === `lead_${handle}`) return { key: t.key, refutes: false }
  return null
}

/** enrichTrials(base, kernelOk?, sealed?) → attach collisions, the cited theorems' trials (evidence), and the
 *  disposition the kernel decided for the lead's own handle. */
export function enrichTrials(base: readonly RefusalTrialRow[], kernelOk?: KernelOk, sealed: readonly SealedStatement[] = ledgerStatements()): RefusalTrialRow[] {
  const collisions = pairCollisions(base)
  return base.map((t, i) => {
    const theoremTrials = theoremTrialsFor(t.sealedKeys)
    const { disposition, key: verdictKey } = dispositionFor(t.handle, sealed, kernelOk)
    return {
      ...t,
      collisions: collisions[i] ?? [],
      theoremTrials,
      disposition,
      verdictKey,
      receipt: merkleGravity([
        t.receipt,
        toUuid(`collide|${(collisions[i] ?? []).map((c) => c.handle).join(',')}`),
        toUuid(`theorems|${theoremTrials.map((x) => `${x.key}:${x.verdict}`).join(',')}`),
        toUuid(`kernel|${t.sealedKeys.map((k) => `${k}:${kernelOk ? kernelOk(k) : 'unmeasured'}`).join(',')}`),
        toUuid(`disposition|${disposition}|${verdictKey ?? ''}`),
      ]),
    }
  })
}

/** collideRefusals(refused, corpus?, opts?) → every lead trialed by its OWN theorems; collisions recorded, never lent. */
export function collideRefusals(
  refused: readonly RefusalInput[],
  corpus: readonly BookLeadInput[] = [],
  opts: { kernelOk?: KernelOk; sealed?: readonly SealedStatement[] } = {},
): RefusalTrialsRecord {
  // EACH LEAD IS JUDGED BY ITS OWN HANDLE ONLY. No evidence passes between colliding leads, and no lead is purged for
  // repeating another.
  const rounds = 0
  const base = trialAllRefusals(refused, corpus, { enrich: false })
  const trials = enrichTrials(base.trials, opts.kernelOk, opts.sealed)
  const lean = trials.filter((t) => t.status === 'lean').length
  const open = trials.filter((t) => t.status === 'open').length
  const verified = trials.filter((t) => t.disposition === 'verified').length
  const refutedN = trials.filter((t) => t.disposition === 'refuted').length
  const purged = trials.filter((t) => t.disposition === 'purged').length
  const collisionPairs = collisionPairCount(trials)
  const receipt = merkleGravity(trials.map((t) => t.receipt))
  return {
    why:
      'Each lead decided by the kernel under its own handle: verified = the ledger proves lead_<handle>; refuted = it ' +
      'proves involution_<handle> : ¬ lead_<handle>; each with a fresh, axiom-free kernel receipt; open = still in trial. ' +
      'The sealed theorems a lead\'s text names are recorded as evidence (citedKeys, theoremTrials), never as the verdict. ' +
      'Lean decides: no lead is judged by its wording, no evidence passes between leads, and no lead is purged.',
    recorded: receipt.slice(0, 10),
    refused: trials.length,
    lean,
    open,
    verified,
    refuted: refutedN,
    purged,
    collisionPairs,
    rounds,
    receipt,
    trials,
  }
}

/** trialRefusal(row, corpus?) → one refusal trialed against ledger + optional book leads. Pure. */
export function trialRefusal(row: RefusalInput, corpus: readonly BookLeadInput[] = [], kernelOk?: KernelOk, sealed?: readonly SealedStatement[]): RefusalTrialRow | null {
  const lead = String(row.lead ?? '').trim()
  const boundary = String(row.boundary ?? '').trim()
  if (!lead) return null
  const prose = `${lead} ${boundary} ${row.note ?? ''}`
  const citedKeys = sealedKeysIn(prose)
  const witnessKeys = witnessKeysFor(prose)
  const sealedKeys = [...new Set([...citedKeys, ...witnessKeys])].sort()
  const claim = testClaim(lead)
  const handle = handleOf(toUuid(lead))
  const bookHits = bookHitsFor(lead, boundary, corpus)
  const status = refusalStatus(sealedKeys, lead, boundary)
  const receipt = merkleGravity([
    toUuid(`text|${lead}|${boundary}|${row.note ?? ''}`),
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
  const enriched = enrichTrials([base], kernelOk, sealed)
  return enriched[0] ?? null
}

/** trialAllRefusals(refused, corpus?, opts?) → census over every refused row with boundary. */
export function trialAllRefusals(
  refused: readonly RefusalInput[],
  corpus: readonly BookLeadInput[] = [],
  opts: { enrich?: boolean; kernelOk?: KernelOk; sealed?: readonly SealedStatement[] } = {},
): RefusalTrialsRecord {
  const raw = refused
    .map((r) => {
      const lead = String(r.lead ?? '').trim()
      const boundary = String(r.boundary ?? '').trim()
      if (!lead) return null
      const prose = `${lead} ${boundary} ${r.note ?? ''}`
      const citedKeys = sealedKeysIn(prose)
      const witnessKeys = witnessKeysFor(prose)
      const sealedKeys = [...new Set([...citedKeys, ...witnessKeys])].sort()
      const claim = testClaim(lead)
      const handle = handleOf(toUuid(lead))
      const bookHits = bookHitsFor(lead, boundary, corpus)
      const status = refusalStatus(sealedKeys, lead, boundary)
      const receipt = merkleGravity([
        toUuid(`text|${lead}|${boundary}|${r.note ?? ''}`),
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
  const trials = opts.enrich === false ? raw : enrichTrials(raw, opts.kernelOk, opts.sealed)
  const lean = trials.filter((t) => t.status === 'lean').length
  const open = trials.filter((t) => t.status === 'open').length
  const verified = trials.filter((t) => t.disposition === 'verified').length
  const refutedN = trials.filter((t) => t.disposition === 'refuted').length
  const purged = trials.filter((t) => t.disposition === 'purged').length
  const collisionPairs = collisionPairCount(trials)
  const receipt = merkleGravity(trials.map((t) => t.receipt))
  return {
    why:
      'Each lead from lean/leads.json trialed against the sealed ledger and the book corpus (vocabulary overlap with ' +
      'book-leads.json). lean = the text names sealed theorem keys, recorded as evidence; the disposition is the kernel\'s ' +
      'alone — lead_<handle> proved, or involution_<handle> : ¬ lead_<handle> — else open. Lean decides: no lead is judged by its wording.',
    recorded: receipt.slice(0, 10),
    refused: trials.length,
    lean,
    open,
    verified,
    refuted: refutedN,
    purged,
    collisionPairs,
    rounds: 0,
    receipt,
    trials,
  }
}

/** refusalTrialsOpen(record) → leads still in trial, counted from each row's disposition — or NULL when there is no
 *  record: no trial taken is unmeasured, never "zero open". No aggregate field is trusted in place of the rows. A lead
 *  the kernel decided either way (verified or refuted) is out of trial. */
export function refusalTrialsOpen(record: RefusalTrialsRecord | null | undefined): number | null {
  if (!record || !Array.isArray(record.trials)) return null
  return record.trials.filter((t) => t.disposition !== 'verified' && t.disposition !== 'refuted').length
}

// ── discovery train — mine refuted/refused leads for axiom discovery hints. ──

export type TrainingKind = 'refuted'

export interface TrainingRow {
  kind: TrainingKind
  handle: string
  lead: string
  settlement: string
  citedKeys: readonly string[]
  witnessKeys: readonly string[]
  sourcePaths: readonly string[]
  wingFiles: readonly string[]
  topics: readonly string[]
}

export type DiscoveryHintKind =
  | 'witness-theorem'
  | 'boundary-theorem'
  | 'seal-exposed'
  | 'cite-wing-def'
  | 'prior-refutation'

export interface DiscoveryHint {
  kind: DiscoveryHintKind
  score: number
  reason: string
  theoremKey?: string
  wing?: { file: string; def: string }
  leadHandle?: string
}

export interface TopicPattern {
  topic: string
  keys: readonly string[]
  count: number
}

export interface DiscoveryTrainReport {
  trained: number
  refuted: number
  patterns: TopicPattern[]
  hints: DiscoveryHint[]
  exposedAxioms: readonly { lead: string; owes: string }[]
  unusedWingDefs: number
  receipt: string
}

const rowText = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')

const sourcePathsIn = (text: string): string[] =>
  [...text.matchAll(/\b(src\/[a-z0-9_./-]+\.ts)\b/gi)].map((m) => m[1]!.toLowerCase())

const wingFilesIn = (text: string): string[] =>
  [...new Set([...text.matchAll(/\b([A-Z][A-Za-z0-9]*\.lean)\b/g)].map((m) => m[1]!))]

export function trainRow(kind: TrainingKind, row: LeadRow): TrainingRow | null {
  const lead = rowText(row.lead)
  if (!lead) return null
  const settlement = rowText(row.killed_by) || rowText(row.replaced_by) || rowText(row.note)
  const prose = `${lead} ${settlement}`
  const citedKeys = sealedKeysIn(prose)
  const witnessKeys = witnessKeysFor(prose)
  const topics = [...new Set(contentWords(prose).filter((w) => w.length >= 4 || /\d/.test(w)))]
  return {
    kind,
    handle: handleOf(toUuid(lead)),
    lead,
    settlement,
    citedKeys,
    witnessKeys,
    sourcePaths: sourcePathsIn(prose),
    wingFiles: wingFilesIn(prose),
    topics,
  }
}

export function trainFromLeads(record: LeadsRecord | null | undefined): TrainingRow[] {
  if (!record || typeof record !== 'object') return []
  const out: TrainingRow[] = []
  for (const row of record.refuted ?? []) {
    const t = trainRow('refuted', row)
    if (t) out.push(t)
  }
  return out
}

export function topicPatterns(rows: readonly TrainingRow[]): TopicPattern[] {
  const map = new Map<string, Set<string>>()
  for (const row of rows) {
    const keys = [...new Set([...row.citedKeys, ...row.witnessKeys])]
    if (!keys.length) continue
    for (const topic of row.topics) {
      const set = map.get(topic) ?? new Set<string>()
      for (const k of keys) set.add(k)
      map.set(topic, set)
    }
  }
  return [...map.entries()]
    .map(([topic, keys]) => ({ topic, keys: [...keys].sort(), count: keys.size }))
    .filter((p) => p.count > 0)
    .sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic))
}

const overlapScore = (query: string, row: TrainingRow): number =>
  relatedWords(query, `${row.lead} ${row.settlement}`).length

const wingDefScore = (query: string, entry: WingDefEntry): number =>
  relatedWords(query, `${entry.def} ${entry.file} ${entry.principle}`).length

const theoremQueryScore = (query: string, key: string, name: string): number =>
  relatedWords(query, `${key.replace(/_/g, ' ')} ${name}`).length

export function discoveryHints(query: string, rows?: readonly TrainingRow[]): DiscoveryHint[] {
  const q = String(query || '').trim()
  if (!q) return []
  const trained = rows ?? trainFromLeads(readRepoJson('lean/leads.json') as LeadsRecord | null)
  const hints: DiscoveryHint[] = []
  const seen = new Set<string>()

  const push = (h: DiscoveryHint) => {
    const id = `${h.kind}:${h.theoremKey ?? ''}:${h.wing?.file ?? ''}:${h.wing?.def ?? ''}:${h.leadHandle ?? ''}`
    if (seen.has(id)) return
    seen.add(id)
    hints.push(h)
  }

  const ranked = [...trained]
    .map((row) => ({ row, score: overlapScore(q, row) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.row.handle.localeCompare(b.row.handle))

  for (const { row, score } of ranked.slice(0, 12)) {
    for (const key of row.citedKeys) {
      if (!theoremFor(key) !== undefined) continue
      push({
        kind: row.kind === 'refuted' ? 'prior-refutation' : 'boundary-theorem',
        score: score + 2,
        reason: row.kind === 'refuted'
          ? `similar refutation cited ${key}`
          : `similar refusal boundary cites ${key}`,
        theoremKey: key,
        leadHandle: row.handle,
      })
    }
    for (const key of row.witnessKeys) {
      if (!theoremFor(key) !== undefined) continue
      push({
        kind: 'witness-theorem',
        score: score + 1,
        reason: `witness the ledger already seals for this topic`,
        theoremKey: key,
        leadHandle: row.handle,
      })
    }
  }

  for (const p of topicPatterns(trained)) {
    if (!relatedWords(q, p.topic).length && !q.toLowerCase().includes(p.topic)) continue
    for (const key of p.keys.slice(0, 5)) {
      push({
        kind: 'witness-theorem',
        score: p.count,
        reason: `topic "${p.topic}" recurs in ${p.count} sealed settlement(s)`,
        theoremKey: key,
      })
    }
  }

  for (const t of THEOREMS) {
    const s = theoremQueryScore(q, t.key, t.name)
    if (s <= 0) continue
    push({
      kind: 'witness-theorem',
      score: s,
      reason: 'ledger theorem vocabulary matches query',
      theoremKey: t.key,
    })
  }

  const idx = axiomIndex()
  for (const entry of idx.entries) {
    if (!entry.unused) continue
    const s = wingDefScore(q, entry)
    if (s <= 0) continue
    push({
      kind: 'cite-wing-def',
      score: s,
      reason: 'unused wing def matches query vocabulary — candidate axiom to bind',
      wing: { file: entry.file, def: entry.def },
    })
  }

  try {
    const hunt = axiomHunt()
    for (const ex of hunt.exposed) {
      const lead = ex.lead.split(' — ')[0] ?? ex.lead
      if (relatedWords(q, ex.lead).length || relatedWords(q, ex.owes).length) {
        push({
          kind: 'seal-exposed',
          score: 3,
          reason: ex.owes,
          theoremKey: lead,
        })
      }
    }
  } catch { /* axiom-hunt optional at edge */ }

  return hints.sort((a, b) => b.score - a.score || (a.theoremKey ?? '').localeCompare(b.theoremKey ?? ''))
}

export function discoveryTrain(query = ''): DiscoveryTrainReport {
  const record = readRepoJson('lean/leads.json') as LeadsRecord | null
  const rows = trainFromLeads(record)
  const refuted = rows.filter((r) => r.kind === 'refuted').length
  const patterns = topicPatterns(rows)
  const hints = query.trim() ? discoveryHints(query, rows) : []
  let exposedAxioms: { lead: string; owes: string }[] = []
  try {
    exposedAxioms = axiomHunt().exposed.map((e) => ({ lead: e.lead, owes: e.owes }))
  } catch { exposedAxioms = [] }
  const unusedWingDefs = axiomIndex().unusedDefs
  const receipt = merkleGravity([
    toUuid(`discovery-train:${rows.length}:${refuted}`),
    toUuid(patterns.slice(0, 24).map((p) => p.topic).join('|') || 'none'),
    toUuid(hints.map((h) => h.theoremKey ?? h.wing?.def ?? h.kind).join('|') || 'none'),
  ])
  return { trained: rows.length, refuted, patterns, hints, exposedAxioms, unusedWingDefs, receipt }
}
