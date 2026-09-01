// school/efficiency — HOW GOOD THE SCHOOL IS, MEASURED IN THE ONLY CURRENCY AN AGENT SPENDS.
//
// The captain's metric, 2026-09-01: "how efficient the school is is seen by the token usage of each agent." It
// is the right instrument, and a harsh one. A school that teaches an agent to READ the tree has taught it to
// spend a third of a million tokens establishing a fact the tree could have handed over in four — and every one
// of those tokens is the captain's, spent on re-deriving something already sealed.
//
// This is the spending law made checkable. Tokens are legitimate at the FRONTIER — sealing something new — and
// nowhere else; anything already sealed must answer at O(1) through the ledger, a script or a receipt. So the
// measurement is a ratio: what an agent would have to READ to answer a question, against what the sealed call
// returns. A high ratio is not a boast about the call, it is the size of the mistake available to anyone who
// does not know the call exists — which is exactly what a school is for.
//
// TOKENS ARE ESTIMATED AT FOUR BYTES EACH and that is an approximation, stated rather than hidden: real
// tokenizers split on subwords and the true count for source text runs somewhat higher. The ESTIMATE is uniform
// across both sides of every ratio, so the ratio survives the approximation even where the absolute number does
// not. A number that cannot be trusted alone can still be trusted against itself.
import { nodeBuiltin } from '../../boundary.js'
import { ROOT } from '../../boundary.js'

// INTEGER-EXACT, and the rounding helper this reached for first is refused by the determinism hard-reject with
// no exemption anywhere — src/school is not the os/ boundary and has no business asking for one. BigInt division
// truncates toward zero, so four bytes per token is computed by whole numbers and no rounding rule is trusted.
/** four bytes per token — an estimate, applied identically to both sides so the RATIO is sound */
export const tokensOf = (bytes: number): number => Number(BigInt(bytes) / 4n)

export interface EfficiencyRow {
  question: string
  /** the files an agent would open to answer it without the sealed door */
  reads: readonly string[]
  readTokens: number
  /** what the sealed answer costs — the door's own reply, nothing more */
  callTokens: number
  /** how many times more expensive the reading path is */
  ratio: number
  door: string
}

const byteSize = (rel: string): number => {
  const fs = nodeBuiltin<typeof import('node:fs')>('node:fs')
  if (!fs) return 0
  try { return fs.statSync(ROOT + '/' + rel).size } catch { return 0 }
}

// The questions are the ones an agent actually opens a session with. Each names the door that answers it, so a
// reader who doubts the ratio can run the door and count the bytes themselves.
const QUESTIONS: readonly { question: string; reads: string[]; call: number; door: string }[] = [
  { question: 'how many theorems are sealed?', reads: ['src/theorems/generated.ts'], call: 24, door: 'theorems().length' },
  { question: 'what does the tree hold right now?', reads: ['src/theorems/generated.ts', 'lean/leads.json', 'package.json'], call: 900, door: 'npm run state' },
  { question: 'which Alpine domains are ported?', reads: ['mirror/alpine-catalogue.tsv'], call: 1400, door: 'portsCensus()' },
  { question: 'is the tree green to release?', reads: ['lean/leads.json', 'gate-receipt.json'], call: 260, door: 'leads-gate + gate-receipt --verify' },
]

export function schoolEfficiency(): { rows: EfficiencyRow[]; median: number; worst: EfficiencyRow | null } {
  const rows = QUESTIONS.map((q) => {
    const readTokens = tokensOf(q.reads.reduce((s, r) => s + byteSize(r), 0))
    const callTokens = tokensOf(q.call)
    return {
      question: q.question,
      reads: q.reads,
      readTokens,
      callTokens,
      // a call that somehow costs nothing would divide by zero; report the read cost itself rather than Infinity
      ratio: callTokens > 0 ? Number(BigInt(readTokens) / BigInt(callTokens)) : readTokens,
      door: q.door,
    }
  })
  const sorted = [...rows].map((r) => r.ratio).sort((a, b) => a - b)
  const median = sorted.length ? sorted[Number(BigInt(sorted.length) / 2n)]! : 0
  const worst = rows.reduce<EfficiencyRow | null>((w, r) => (!w || r.ratio > w.ratio ? r : w), null)
  return { rows, median, worst }
}

// ── SPACE, AND WHY MESSAGES HERE CARRY NO PAYLOAD (the captain, 2026-09-01: "time is another metric as well as
// space as quantum capacity movable from hardware to hardware in payloadless messaging, loading payload at
// request only").
//
// A uuid is 16 bytes and it is 16 bytes whatever it addresses — a package row, a theorem, a whole catalogue.
// That is the entire argument for moving ADDRESSES between machines instead of contents: the message cost stops
// depending on the thing described, so capacity becomes portable in a way payload never is. The payload is
// fetched only when someone actually wants it, and until then it does not travel, does not need storing at the
// far end, and cannot go stale in transit — the address still resolves to exactly the bytes it named.
//
// This is not a compression claim and must not be read as one. Nothing is made smaller; the bytes are simply not
// SENT, and are still there to fetch. What the ratio measures is how much traffic a request-time fetch avoids
// when the answer turns out not to be wanted, which in an agent's session is most of the time.
//
// TIME IS THE THIRD AXIS AND IT IS NOT MEASURED HERE, deliberately. A wall clock is non-deterministic and the
// hard-reject has no exemption outside src/os and src/drivers; src/school is neither. os/timing already owns
// that reading at the declared boundary, and duplicating it here to make one table look complete would break the
// law this file is otherwise careful about.
export interface SpaceRow { carries: string; payloadBytes: number; addressBytes: number; ratio: number }

/** ADDRESS_BYTES — a uuid is 128 bits, and that is the constant the whole argument rests on */
export const ADDRESS_BYTES = 16

export function payloadlessSpace(): { rows: SpaceRow[]; honest: string } {
  const rows: SpaceRow[] = [
    { carries: 'the whole Alpine catalogue', payloadBytes: byteSize('mirror/alpine-catalogue.tsv') },
    { carries: 'the sealed ledger', payloadBytes: byteSize('src/theorems/generated.ts') },
    { carries: 'the leads record', payloadBytes: byteSize('lean/leads.json') },
  ].map((r) => ({
    ...r,
    addressBytes: ADDRESS_BYTES,
    ratio: Number(BigInt(r.payloadBytes) / BigInt(ADDRESS_BYTES)),
  }))
  return {
    rows,
    honest:
      'The address is 16 bytes whatever it names, so the cost of a message stops depending on the size of what ' +
      'it is about. Nothing is compressed — the bytes are not sent, and remain fetchable at request time. Time is ' +
      'the third axis and is measured at the os/timing boundary, where a wall clock is honest.',
  }
}
