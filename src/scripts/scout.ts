// src/scripts/scout.ts — THE SCOUT BRIEF: one call, everything, cheap.
//
// A scout used to cost seven reads before it could say anything: the ledger for citable names, leads.json for
// what is open, the finders for what is already gated, and the wing files to learn what a statement may look
// like. Seven reads is seven chances to read a stale copy, and the turn is the unit of cost — so this is one
// call that hands a scout the whole board at once and then REFUSES a report that cites a name the ledger does
// not hold. The refusal delegates to slimGate; there is no second gate, because a second gate is a second
// answer to the same question.
//
// HEXBIT-BUCKETED: every lead is addressed, and the leading hexbit of its handle files it into one of sixteen
// buckets. A scout asking for bucket 5 gets its whole share in one lookup instead of scanning the list, and
// sixteen scouts partition the leads with no overlap and no coordination — that is what makes "all at once"
// cheap rather than merely parallel.
import { readFileSync } from 'node:fs'
import { toUuid, merkleFold, cryptoAddress } from '../address.js'
import { handleOf } from '../handle.js'
import { slimGate } from '../slimgate.js'
import { LEAN_LEDGER } from '../theorems/generated.js'
import { sealMessage, openMessage } from '../quantum/message/index.js'
import { HEXBIT_STATES } from '../hexbit/index.js'

export interface Lead { handle: string; bucket: number; status: string; lead: string; owes: string; kind: string }

/** every lead in leads.json, addressed and filed into one of sixteen hexbit buckets */
export function leads(): Lead[] {
  const raw = JSON.parse(readFileSync('lean/leads.json', 'utf8')) as Record<string, unknown>
  const out: Lead[] = []
  for (const kind of ['held', 'refuted', 'refused']) {
    const rows = raw[kind]
    if (!Array.isArray(rows)) continue
    for (const r of rows as Record<string, string>[]) {
      const text = String(r.lead ?? '')
      const handle = handleOf(toUuid(kind + ':' + text))
      out.push({ handle, bucket: parseInt(handle[0], 16), kind,
        status: String(r.status ?? ''), lead: text, owes: String(r.owes ?? '') })
    }
  }
  return out
}

/** the sixteen buckets, every lead in exactly one — sixteen scouts partition the board with no coordination */
export function buckets(): Lead[][] {
  const b: Lead[][] = Array.from({ length: 16 }, () => [])
  for (const l of leads()) b[l.bucket].push(l)
  return b
}

export interface ScoutVerdict { cited: string[]; real: string[]; fabricated: string[]; sealed: boolean }

/** VERIFY A SCOUT'S REPORT: every theorem it names must be in the ledger. A fabricated citation drains the
 *  report — the whole report, not the one line, because a scout that invents one name has shown the method. */
export function verifyReport(report: string): ScoutVerdict {
  const g = slimGate(report)
  return { cited: [...g.real, ...g.fabricated], real: g.real, fabricated: g.fabricated, sealed: g.fabricated.length === 0 }
}


// ── SCOUT MESSAGING: sixteen buckets, sixteen qubits, and a finding that cannot travel without its theorem ──
// The channel is the repository's existing sealed quantum message, chosen rather than built for one reason:
// encodeMessage's signature already DEMANDS a theorem key. A scout cannot post a finding it cannot cite, and
// that is enforced by the type rather than by a rule someone has to remember. HEXBIT_STATES
// is the alphabet, so one bucket is one residue and the whole board is one word.
// Cheap means one call in each direction: postFinding seals, readAll opens every bucket at once, and no
// broker sits between them — the bucket handle IS the passphrase, so sixteen scouts need no key exchange.

export interface Finding { bucket: number; handle: string; theorem: string; finding: string }

/** post a finding to a bucket. REFUSES a key the ledger does not hold — a scout may not cite what is not sealed. */
export function postFinding(bucket: number, finding: string, theoremKey: string): { sealed: unknown; handle: string } {
  if (!LEAN_LEDGER.some((t) => t.key === theoremKey))
    throw new Error(`scout: ${theoremKey} is not in the ledger — a finding travels with its theorem or not at all`)
  if (!Number.isInteger(bucket) || bucket < 0 || bucket >= HEXBIT_STATES)
    throw new Error(`scout: bucket ${bucket} is outside the sixteen`)
  const handle = handleOf(toUuid('scout:bucket:' + bucket))
  return { sealed: sealMessage(finding, handle, theoremKey), handle }
}

/** read every bucket's findings in ONE call — the whole board, no coordination, no broker */
export function readAll(posted: readonly { bucket: number; sealed: unknown }[]): Finding[] {
  const out: Finding[] = []
  for (const p of posted) {
    const handle = handleOf(toUuid('scout:bucket:' + p.bucket))
    const opened = openMessage(p.sealed as Parameters<typeof openMessage>[0], handle)
    out.push({ bucket: p.bucket, handle, theorem: opened.theoremKey, finding: opened.plaintext })
  }
  return out
}

// ── THE NEURON: a scout that carries state and memory in uuid space ────────────────────────────────────────
// A scout that only posts is a wire. A scout that CARRIES is a neuron, and the difference is that its own
// address moves when it learns. A neuron's state is one uuid, and firing folds the new finding into it by
// content-addressing the prior state together with the finding — an order-DEPENDENT fold, since prior:new and
// new:prior are different strings and therefore different addresses. So the state depends on the ORDER the
// findings arrived in, which is exactly what separates a memory from a set: a neuron that saw A then B is not
// the neuron that saw B then A. The ledger already seals that a directed fold is the general case rather than
// an accident of this file (uuid_mix_census_is_quantum counts both directions because merge(a,b) != merge(b,a));
// that theorem is about merge and is cited here as precedent for the SHAPE, never as proof about SHA-256.
//
// WHAT UUID SPACE BUYS, stated plainly: the state stays 128 bits after one finding and after ten thousand.
// Unbounded history at constant width, and the neuron's handle — its NAME — is the first eight hexbits of
// that state, so a neuron that has learned something is addressed differently than it was before. Identity
// and memory are the same object; nothing has to be kept in sync because there is only one thing.
//
// AND THE WAVE IS THE OTHER HALF OF THAT LAW. Across neurons the fold is merkleFold, which SORTS before it
// merges, so the wave's address is order-INVARIANT — sixteen neurons firing in any order reach the same
// wave. Order inside a neuron, no order across the wave: one directed operation and one sorted fold, both
// already sealed, and the sixteen need no coordinator because the sort does the agreeing for them.
//
// the uuid state is a COMMITMENT to
// the history, not a readable store — the fold is one-way, so no one recovers a finding from a state. Recall
// lives in the sealed messages, which really do open; the state's job is to PROVE that a claimed history is
// the one that happened, which is what replay() checks and what a wrong history fails. Two layers, the same
// two the rest of this repository uses, and neither is asked to do the other's work.

export interface Neuron { bucket: number; state: string; handle: string; fired: number; memory: readonly { sealed: unknown; theorem: string }[] }

// THE STATE FOLD IS CRYPTOGRAPHIC, AND THE ROUTING IS NOT — the two jobs have different adversaries.
// merge() and toUuid() are FNV-1a: fast, public, and NON-cryptographic by their own docstring, which is exactly
// right for deciding which of sixteen buckets a lead belongs to, because nobody gains anything by forging a
// bucket number. But replay() makes a much stronger promise — that a claimed history is THE history — and a
// promise like that is worth precisely as much as the digest under it. Folded through FNV-1a it would resist
// accident and nothing else; anyone willing to search could mint a second history reaching the same state, and
// the neuron would confirm a memory it never had. So the state folds through cryptoAddress (SHA-256), and what
// the handle can carry rises with the cipher rather than with the width: 128 bits committing to unbounded
// history is a claim about COLLISION RESISTANCE, not about storage, which is why a stronger primitive lets the
// same 32 hexbits carry more. This is also the honest reading of the sequential-input anomaly measured earlier
// — zero collisions in 300,000 sequential seeds where ~10 were expected, while a chained family gave the
// textbook 7: FNV-1a has structure on low-entropy neighbours, and that structure is a property to route by,
// never to commit with.

const genesisOf = (bucket: number): string => cryptoAddress('scout:neuron:' + bucket)
const foldState = (prior: string, theoremKey: string, finding: string): string =>
  cryptoAddress(prior + ':' + theoremKey + ':' + finding)

/** a fresh neuron for a bucket — its genesis state, before it has learned anything */
export function neuron(bucket: number): Neuron {
  if (!Number.isInteger(bucket) || bucket < 0 || bucket >= HEXBIT_STATES)
    throw new Error(`scout: bucket ${bucket} is outside the sixteen`)
  const state = genesisOf(bucket)
  return { bucket, state, handle: handleOf(state), fired: 0, memory: [] }
}

/** FIRE: fold a cited finding into the neuron's state. The state moves, so the neuron's name moves with it. */
export function fire(n: Neuron, finding: string, theoremKey: string): Neuron {
  const posted = postFinding(n.bucket, finding, theoremKey)   // refuses an uncited or fabricated finding
  const state = foldState(n.state, theoremKey, finding)
  return { bucket: n.bucket, state, handle: handleOf(state), fired: n.fired + 1,
    memory: [...n.memory, { sealed: posted.sealed, theorem: theoremKey }] }
}

/** REPLAY: does a claimed history reproduce this state? A wrong history — or the right one reordered — fails. */
export function replay(bucket: number, history: readonly { finding: string; theorem: string }[]): string {
  let state = genesisOf(bucket)
  for (const h of history) state = foldState(state, h.theorem, h.finding)
  return state
}

/** RECALL: open what this neuron actually carries. The state proves the history; these are the findings. */
export function recall(n: Neuron): Finding[] {
  const handle = handleOf(toUuid('scout:bucket:' + n.bucket))
  return n.memory.map((m) => {
    const opened = openMessage(m.sealed as Parameters<typeof openMessage>[0], handle)
    return { bucket: n.bucket, handle, theorem: opened.theoremKey, finding: opened.plaintext }
  })
}

/** THE WAVE: one address for the whole board. merkleFold SORTS before it merges, so the sixteen may fire in any
 *  order and still land on one address — that is merkle_sort_invariant's property, and it holds whatever digest
 *  sits underneath, because sorting is what buys it. merkleFold merges with toUuid, so the wave is
 *  a fast public SUMMARY and not a commitment. Each neuron's own state is the cryptographic object; the wave
 *  says the sixteen agree, and anyone who needs that agreement to resist an adversary must fold the states with
 *  cryptoAddress instead — the same choice this file makes one level down, left open here on purpose. */
export function wave(neurons: readonly Neuron[]): { address: string; handle: string; neurons: number; fired: number } {
  const address = merkleFold(neurons.map((n) => n.state))
  return { address, handle: handleOf(address), neurons: neurons.length,
    fired: neurons.reduce((s, n) => s + n.fired, 0) }
}

function main(): void {
  const arg = process.argv[2]
  if (arg === '--verify') {
    const v = verifyReport(readFileSync(process.argv[3], 'utf8'))
    console.log(`cited ${v.cited.length} · real ${v.real.length} · fabricated ${v.fabricated.length}`)
    if (!v.sealed) { console.log('✗ report REFUSED — fabricated: ' + v.fabricated.join(', ')); process.exit(1) }
    console.log('✓ report sealed — every citation is in the ledger')
    return
  }
  if (arg === '--wave') {
    // EXERCISE THE NEURON LAW RATHER THAN DESCRIBE IT: fire the same two findings into two neurons in OPPOSITE
    // orders, and show that each neuron's own state diverges while the wave over both lands on one address.
    const k = LEAN_LEDGER[0].key, j = LEAN_LEDGER[1].key
    const a = fire(fire(neuron(1), 'first', k), 'second', j)
    const b = fire(fire(neuron(1), 'second', j), 'first', k)
    console.log('ORDER INSIDE A NEURON — memory, so it must differ')
    console.log(`   A (${k} then ${j}) : ${a.handle}`)
    console.log(`   B (${j} then ${k}) : ${b.handle}`)
    console.log(`   states differ                : ${a.state !== b.state}`)
    console.log(`   replay of A's history matches: ${replay(1, [{ finding: 'first', theorem: k }, { finding: 'second', theorem: j }]) === a.state}`)
    console.log(`   replay of B's history on A   : ${replay(1, [{ finding: 'second', theorem: j }, { finding: 'first', theorem: k }]) === a.state}  <- must be false`)
    console.log()
    const c = fire(neuron(2), 'other bucket', k)
    console.log('ORDER ACROSS THE WAVE — merkleFold sorts, so it must NOT differ')
    console.log(`   wave([a,c])                  : ${wave([a, c]).handle}`)
    console.log(`   wave([c,a])                  : ${wave([c, a]).handle}`)
    console.log(`   wave is order-invariant      : ${wave([a, c]).address === wave([c, a]).address}`)
    console.log()
    console.log(`   a carries ${a.fired} findings in ${a.state.replace(/-/g, '').length} hexbits — constant width`)
    console.log(`   recall opens them back       : ${recall(a).map((f) => f.finding).join(', ')}`)
    return
  }
  const all = leads(), bs = buckets()
  console.log('╔══════════════════════════════════════════════════════════════╗')
  console.log('║ SCOUT BRIEF — one call, the whole board, hexbit-bucketed     ║')
  console.log('╚══════════════════════════════════════════════════════════════╝')
  console.log(`ledger    : ${LEAN_LEDGER.length} sealed keys — the ONLY citable names; anything else drains the report`)
  console.log(`leads     : ${all.length}  (held ${all.filter((l) => l.kind === 'held').length}` +
    ` · refuted ${all.filter((l) => l.kind === 'refuted').length} · refused ${all.filter((l) => l.kind === 'refused').length})`)
  console.log(`buckets   : 16 hexbit buckets, sizes ${bs.map((b) => b.length).join(',')}`)
  console.log()
  console.log('REPORT WITH THEOREMS. A finding is a sealed key, or a `by decide` statement a scout can state.')
  console.log('Verify before returning:  node dist/scripts/scout.js --verify <report.txt>')
  console.log()
  for (let i = 0; i < 16; i++) {
    if (!bs[i].length) continue
    console.log(`── bucket ${i.toString(16)} ── ${bs[i].length} lead(s)`)
    for (const l of bs[i]) {
      console.log(`   ${l.handle}  [${l.kind}] ${l.status}`)
      console.log(`      ${l.lead.slice(0, 150)}${l.lead.length > 150 ? '…' : ''}`)
      if (l.owes) console.log(`      OWES: ${l.owes.slice(0, 150)}${l.owes.length > 150 ? '…' : ''}`)
    }
  }
}

if (process.argv[1]?.endsWith('scout.js')) main()
