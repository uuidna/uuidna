// wave-deposit — writes lean/wave-queue.json via the runtime's own registry (lazy node:fs, the api.ts law —
// no module-scope builtin rides the edge bundle; a Worker has no filesystem, so the deposit tool is declared
// CAPABILITY-absent in EDGE_ABSENT and this module's write path is never reached there).
// THE DEPOSIT HALF OF THE ONE-CALL DISCOVERY LOOP (queue lead 131, the captain's realization:
// "uuidna has all the tools to compute all coordinates where clusters of theorems expose themselves lean —
// and to save the theorems in one automated mcp call"). Candidates arrive over the wire as {key, why, lean},
// are validated by the SAME laws the conveyor runner enforces (one declaration, imported by queue-wave.ts),
// and the lawful ones land in lean/wave-queue.json `pending` — where the resident half-hourly wave probes each
// alone with the kernel as the judge, survivors lift into Wave.lean, refusals enroll at the law school.
//
// a deposit buys VALIDATION and QUEUEING, never a seal — only the kernel issues verdicts (the
// first cron wave's lesson: a missing instrument VOIDS, it never refuses), and the kernel judges host-side on
// the janitor's next tick. A deposit that validates is still only PENDING; its theorem exists when the kernel
// says so. Integrity, not truth (theorem provenance_integrity_not_content_truth).
import { theoremByKey } from './theorems/index.js'
import { toUuid } from './address.js'
import { hexbitDoorOf, type HexbitDoor } from './hexbit/index.js'
import { vacuityReason } from './vacuity.js'

export interface WaveCandidate { key: string; why: string; lean: string }
export interface DepositResult extends HexbitDoor {
  deposited: string[]
  refused: { key: string; reason: string }[]
  pending: number
  receipt: string
  honest: string
}

const KEY = /^[a-z][a-z0-9_]{3,60}$/
const LIT = String.raw`(?:\(\s*\d+\s*:\s*Nat\s*\)|\d+)`
const BARE_LITERAL_CLAUSE = new RegExp('^\\s*\\(?\\s*' + LIT + '\\s*(?:≠|<|>|≤|≥|=)\\s*' + LIT + '\\s*\\)?\\s*$')

const OPENERS = '([{⟨'
const CLOSERS = ')]}⟩'

/** splitTheorem(lean) → the name, statement and proof of `theorem <name> : <statement> := <proof>`, split at the
 *  first `:=` outside every bracket, or null when no top-level `:=` separates a non-empty statement from a
 *  non-empty proof. A `:=` inside a bracket belongs to the statement (a `fun`, a structure literal), so the
 *  bracket depth decides which one ends it. */
export function splitTheorem(lean: string): { name: string; statement: string; proof: string } | null {
  const head = lean.match(/^theorem\s+(\S+?)\s*:/)
  if (!head) return null
  let depth = 0
  for (let i = head[0].length; i < lean.length - 1; i++) {
    const ch = lean[i]!
    if (OPENERS.includes(ch)) depth++
    else if (CLOSERS.includes(ch)) depth = depth > 0 ? depth - 1 : 0
    else if (depth === 0 && ch === ':' && lean[i + 1] === '=') {
      const statement = lean.slice(head[0].length, i).trim()
      const proof = lean.slice(i + 2).trim()
      return statement && proof ? { name: head[1]!, statement, proof } : null
    }
  }
  return null
}

function statementFromLean(lean: string): string | null {
  return splitTheorem(lean)?.statement ?? null
}

// What the door refuses in the proof text is only what the kernel's receipt could never accept: `sorry` and
// `admit` leave the proof incomplete (the term carries sorryAx), `axiom` declares an assumption instead of proving
// one, and `native_decide` trusts the compiler through Lean.ofReduceBool. Everything else, whatever the tactic, is
// the kernel probe's to judge — it refuses any error and any axiom `#print axioms` names.
const NEVER_PASSES = /\b(sorry|admit|axiom|native_decide)\b/

function isBareLiteralStatement(stmt: string): boolean {
  return stmt.split('∧').every((c) => BARE_LITERAL_CLAUSE.test(c.trim()))
}

/** isBareLiteralLean(lean) → would the door turn this away as bare literals? EXPORTED so a MINTER can ask before
 *  it proposes, instead of the conveyor discovering it after. The Alpine port census walked 28,635 packages and
 *  offered 79 candidates; all 79 were refused here, every one a `5 = 5` read off a digit in a package name
 *  (attica5-dev). Refusing at the door was correct and far too late — the census had already been walked and the
 *  ore already carried. The predicate stays declared HERE, once: a miner that re-states this law would drift from
 *  the door that enforces it, and then the two would disagree about what a claim is. */
export function isBareLiteralLean(lean: string): boolean {
  const stmt = statementFromLean(lean)
  return stmt !== null && isBareLiteralStatement(stmt)
}

/** validateCandidate(c, sealed) → the reason this candidate cannot even reach the kernel, or null when it may.
 *  THE ONE DECLARATION of the conveyor's door laws — queue-wave.ts imports this, never re-states it. */
export function validateCandidate(c: WaveCandidate, sealed: ReadonlyMap<string, unknown>): string | null {
  if (!KEY.test(c.key)) return 'key is not a lawful theorem key'
  if (typeof c.why !== 'string' || c.why.length < 20) return 'why is missing — a theorem presents with its prose'
  if (typeof c.lean !== 'string') return 'lean statement missing'
  if (!c.lean.startsWith(`theorem ${c.key} : `)) return 'lean must state exactly `theorem <key> : ...`'
  const parts = splitTheorem(c.lean)
  if (!parts) return 'lean must read `theorem <key> : <statement> := <proof>` — no top-level `:=` separates a statement from a proof'
  // lean-ledger reads a theorem only as `theorem <key> : <statement> := by <tactic>`, so a term proof would be
  // lifted into Wave.lean and never read back as a sealed row; the tactic after `by` is free.
  if (!/^by\s+\S/.test(parts.proof)) return 'the proof must be a tactic block `:= by <tactic>`, because lean-ledger reads a sealed row only in that shape'
  const never = c.lean.match(NEVER_PASSES)
  if (never) return `sorry/admit/axiom/native_decide are refused at the door: \`${never[1]}\` can never earn the axiom-free receipt, since it leaves the proof incomplete or rests it on an assumption`
  if ((c.lean.match(/\btheorem\b/g) ?? []).length !== 1) return 'one candidate, one theorem'
  // a later line at column 0 opens a new command in Lean, and lean-ledger ends a theorem at such a line
  if (c.lean.split('\n').slice(1).some((l) => /^\S/.test(l))) return 'one candidate, one theorem — a later line at column 0 opens a new command; indent the proof under its theorem'
  if (sealed.has(c.key)) return 'key already sealed in the ledger'
  const stmt = parts.statement
  if (isBareLiteralStatement(stmt)) return 'comparison of bare literals — the claim its key makes is nowhere in the algebra (literal gap law)'
  // VACUITY IS THE FAULT THAT SURVIVES EVERY OTHER DOOR LAW, because the statement is perfectly TRUE: it has a
  // lawful key, prose, one theorem, a proof the kernel accepts on the first try, and no literal to compare
  // (`alpine_security_ops_plannable_4 : (4 + 0 = 4) ∧ (0 = 0)` is the shape). The rule is one declaration in
  // src/vacuity.ts; one-receipt's vacuousGaps is the other consumer.
  const void_ = vacuityReason(stmt)
  if (void_) return `the statement is TRUE and says nothing — ${void_} (vacuity law)`
  return null
}

/** A refusal MUST carry its reason — the type has always said so and the data did not. Enforced at the write. */
export const assertReason = (key: string, reason: string | undefined): string => {
  const r = (reason ?? '').trim()
  if (!r) throw new Error(`wave-deposit: a refusal must name its reason (${key}) — an unreasoned refusal cannot be answered, re-offered, or audited`)
  return r
}

interface WaveQueueFile { pending: WaveCandidate[]; accepted: (WaveCandidate & { receipt: string })[]; refused: (WaveCandidate & { reason: string })[] }

// node:fs and node:path ride LAZILY through the runtime's own registry — a top-level import rides every
// bundle that reaches this module, and the edge worker has no filesystem (the api.ts pattern, same law).
const fsm = (): typeof import('node:fs') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:fs') as typeof import('node:fs')

/** waveQueueInFlightKeys(queuePath) → keys already pending or accepted — harvest on the conveyor is not "waiting". */
export function waveQueueInFlightKeys(queuePath: string): Set<string> {
  return waveQueueKeySets(queuePath).inFlight
}

/** waveQueueRefusedKeys(queuePath) → keys the kernel refused — no longer harvest-waiting. */
export function waveQueueRefusedKeys(queuePath: string): Set<string> {
  return waveQueueKeySets(queuePath).refused
}

/** refusalAddress(key, lean) → what a kernel refusal blocks: the key paired with the content address of the exact
 *  lean text the kernel refused. The same text under the same key stays refused; a changed proof under that key is
 *  a new text, and it returns to the probe. */
export const refusalAddress = (key: string, lean: string): string => `${key}:${toUuid(lean)}`

interface QueueKeySets { inFlight: Set<string>; refused: Set<string>; refusedTexts: Set<string> }
const emptyKeySets = (): QueueKeySets => ({ inFlight: new Set(), refused: new Set(), refusedTexts: new Set() })

/** waveQueueKeySetsFromData(q) → in-flight keys, refused keys, and refused (key, text) addresses from parsed queue
 *  JSON. Pure — edge bundle or host disk. */
export function waveQueueKeySetsFromData(q: WaveQueueFile | null | undefined): QueueKeySets {
  if (!q || !Array.isArray(q.pending) || !Array.isArray(q.accepted)) return emptyKeySets()
  const inFlight = new Set([...q.pending.map((c) => c.key), ...q.accepted.map((c) => c.key)])
  const rows = Array.isArray(q.refused) ? q.refused : []
  const refused = new Set(rows.map((c) => c.key))
  const refusedTexts = new Set(rows.map((c) => refusalAddress(c.key, String(c.lean ?? ''))))
  return { inFlight, refused, refusedTexts }
}

/** waveQueueState(q) → pending count plus in-flight and refused key sets from parsed queue JSON. Pure. */
export function waveQueueState(q: unknown): {
  pending: number
  inFlight: Set<string>
  refused: Set<string>
} {
  const { inFlight, refused } = waveQueueKeySetsFromData(q as WaveQueueFile | null | undefined)
  const file = q as WaveQueueFile | null | undefined
  return { pending: file?.pending?.length ?? 0, inFlight, refused }
}

function waveQueueKeySets(queuePath: string): QueueKeySets {
  try {
    const fs = fsm()
    if (typeof fs?.readFileSync !== 'function' || !fs.existsSync(queuePath)) return emptyKeySets()
    const q = JSON.parse(fs.readFileSync(queuePath, 'utf8')) as WaveQueueFile
    return waveQueueKeySetsFromData(q)
  } catch {
    return emptyKeySets()
  }
}

/** depositCandidates(candidates[, queuePath]) → validate every candidate at the conveyor's own door and land
 *  the lawful ones in `pending`; refusals return WITH their reasons and are never written (the wire's refusals
 *  go back to the depositor — the queue file's refused[] is the KERNEL's roster, not the doorman's). */
export function depositCandidates(candidates: WaveCandidate[], queuePath: string): DepositResult {
  const hostReceipt = toUuid('wave-deposit:no-fs')
  const hostRefuse: DepositResult = {
    deposited: [],
    refused: candidates.map((raw) => ({ key: String(raw?.key ?? ''), reason: 'CAPABILITY: no filesystem — deposits are host-side' })),
    pending: 0,
    receipt: hostReceipt,
    ...hexbitDoorOf(hostReceipt),
    honest: 'a deposit buys VALIDATION and QUEUEING, never a seal — the kernel judges each candidate alone on the resident wave, host-side; a Worker has no disk, so this path refuses by name rather than throwing',
  }
  let fs: typeof import('node:fs')
  try {
    fs = fsm()
    if (typeof fs?.readFileSync !== 'function') return hostRefuse
  } catch { return hostRefuse }
  const q = JSON.parse(fs.readFileSync(queuePath, 'utf8')) as WaveQueueFile
  if (!Array.isArray(q.pending) || !Array.isArray(q.accepted) || !Array.isArray(q.refused)) throw new Error('wave-queue.json is malformed (pending/accepted/refused arrays required)')
  const sealed = theoremByKey()
  const { inFlight, refusedTexts } = waveQueueKeySets(queuePath)
  const blocked = new Set(inFlight)
  const deposited: string[] = []
  const refused: { key: string; reason: string }[] = []
  for (const raw of candidates) {
    const c: WaveCandidate = { key: String(raw?.key ?? ''), why: String(raw?.why ?? ''), lean: String(raw?.lean ?? '') }
    const bad = validateCandidate(c, sealed)
      ?? (blocked.has(c.key) ? 'key already pending or accepted in the queue' : null)
      ?? (refusedTexts.has(refusalAddress(c.key, c.lean)) ? 'the kernel already refused this exact text under this key — a changed proof returns to the probe, the identical one stays refused' : null)
    if (bad) { refused.push({ key: c.key, reason: bad }); continue }
    q.pending.push(c)
    blocked.add(c.key)
    deposited.push(c.key)
  }
  if (deposited.length) fs.writeFileSync(queuePath, JSON.stringify(q, null, 2) + '\n')
  const receipt = toUuid(['wave-deposit', ...deposited, ...refused.map((r) => `${r.key}:${r.reason}`)].join('|'))
  return {
    deposited, refused, pending: q.pending.length, receipt, ...hexbitDoorOf(receipt),
    honest: 'a deposit buys VALIDATION and QUEUEING, never a seal — the kernel judges each candidate alone on the resident wave, host-side; a validated candidate is PENDING, its theorem exists only when the kernel says so',
  }
}
