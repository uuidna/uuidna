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
// HONEST SCOPE: a deposit buys VALIDATION and QUEUEING, never a seal — only the kernel issues verdicts (the
// first cron wave's lesson: a missing instrument VOIDS, it never refuses), and the kernel judges host-side on
// the janitor's next tick. A deposit that validates is still only PENDING; its theorem exists when the kernel
// says so. Integrity, not truth (theorem provenance_integrity_not_content_truth).
import { theoremByKey } from './theorems/index.js'
import { toUuid } from './address.js'
import { hexbitDoorOf, type HexbitDoor } from './hexbit/index.js'

export interface WaveCandidate { key: string; why: string; lean: string }
export interface DepositResult extends HexbitDoor {
  deposited: string[]
  refused: { key: string; reason: string }[]
  pending: number
  receipt: string
  honest: string
}

const KEY = /^[a-z][a-z0-9_]{3,60}$/

/** validateCandidate(c, sealed) → the reason this candidate cannot even reach the kernel, or null when it may.
 *  THE ONE DECLARATION of the conveyor's door laws — queue-wave.ts imports this, never re-states it. */
export function validateCandidate(c: WaveCandidate, sealed: ReadonlyMap<string, unknown>): string | null {
  if (!KEY.test(c.key)) return 'key is not a lawful theorem key'
  if (typeof c.why !== 'string' || c.why.length < 20) return 'why is missing — a theorem presents with its prose'
  if (typeof c.lean !== 'string') return 'lean statement missing'
  if (!c.lean.startsWith(`theorem ${c.key} : `)) return 'lean must state exactly `theorem <key> : ...`'
  if (!c.lean.trimEnd().endsWith(':= by decide')) return 'the court decides lean: the proof must be `by decide`'
  if (/\bsorry\b|\baxiom\b/.test(c.lean)) return 'sorry/axiom are refused at the door'
  if ((c.lean.match(/\btheorem\b/g) ?? []).length !== 1) return 'one candidate, one theorem'
  if (sealed.has(c.key)) return 'key already sealed in the ledger'
  return null
}

interface WaveQueueFile { pending: WaveCandidate[]; accepted: (WaveCandidate & { receipt: string })[]; refused: (WaveCandidate & { reason: string })[] }

// node:fs and node:path ride LAZILY through the runtime's own registry — a top-level import rides every
// bundle that reaches this module, and the edge worker has no filesystem (the api.ts pattern, same law).
const fsm = (): typeof import('node:fs') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:fs') as typeof import('node:fs')

/** waveQueueInFlightKeys(queuePath) → keys already pending or accepted — harvest on the conveyor is not "waiting". */
export function waveQueueInFlightKeys(queuePath: string): Set<string> {
  try {
    const fs = fsm()
    if (typeof fs?.readFileSync !== 'function' || !fs.existsSync(queuePath)) return new Set()
    const q = JSON.parse(fs.readFileSync(queuePath, 'utf8')) as WaveQueueFile
    if (!Array.isArray(q.pending) || !Array.isArray(q.accepted)) return new Set()
    return new Set([...q.pending.map((c) => c.key), ...q.accepted.map((c) => c.key)])
  } catch { return new Set() }
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
  const inFlight = new Set([...q.pending.map((c) => c.key), ...q.accepted.map((c) => c.key)])
  const deposited: string[] = []
  const refused: { key: string; reason: string }[] = []
  for (const raw of candidates) {
    const c: WaveCandidate = { key: String(raw?.key ?? ''), why: String(raw?.why ?? ''), lean: String(raw?.lean ?? '') }
    const bad = validateCandidate(c, sealed) ?? (inFlight.has(c.key) ? 'key already pending or accepted in the queue' : null)
    if (bad) { refused.push({ key: c.key, reason: bad }); continue }
    q.pending.push(c)
    inFlight.add(c.key)
    deposited.push(c.key)
  }
  if (deposited.length) fs.writeFileSync(queuePath, JSON.stringify(q, null, 2) + '\n')
  const receipt = toUuid(['wave-deposit', ...deposited, ...refused.map((r) => `${r.key}:${r.reason}`)].join('|'))
  return {
    deposited, refused, pending: q.pending.length, receipt, ...hexbitDoorOf(receipt),
    honest: 'a deposit buys VALIDATION and QUEUEING, never a seal — the kernel judges each candidate alone on the resident wave, host-side; a validated candidate is PENDING, its theorem exists only when the kernel says so',
  }
}
