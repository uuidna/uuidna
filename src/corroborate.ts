// @non-harmonic: orchestrates the uuidnaOS research sweep (network in quantum/os/research) — async fan-out boundary.
// corroborate — augment the LOCAL binary verification (adjudicate: VERIFIED / UNVERIFIED, where UNVERIFIED is never
// "false", only "not yet verified") with EXTERNAL RESEARCH streamed from FREE APIs. external evidence
// is a recomputable PROVENANCE FINGERPRINT of what a public source says — it CORROBORATES, it does NOT prove. Only a
// `by decide` theorem SEALS (VERIFIED); CORROBORATED means "unverified locally, but a named free source attests it" —
// evidence, never truth. A local VERIFIED (a sealed proof) always outranks external evidence; a binary gate can prove
// but never refute, so external research only ever populates the silent UNVERIFIED bucket.
// The evidence folds ORDER-INVARIANTLY to one receipt (the same merkle-gravity fold the quantum domain uses).
// Integrity — the record recomputes for anyone.
import { adjudicate } from './adjudicate.js'
import { merkleGravity } from './gravity/index.js'
import { toUuid } from './address.js'
import { researchEvidence, researchSweep } from './quantum/os/research/index.js'
import { hexbitDoorOf, evidenceRow, type HexbitDoor } from './hexbit/index.js'

/** One piece of external research — a provenance-fingerprinted attestation from a free public API. NOT a proof. */
export interface ResearchEvidence extends HexbitDoor { source: string; address: string; note: string }

export { evidenceRow } from './hexbit/index.js'

export interface Corroboration {
  statement: string
  local: 'VERIFIED' | 'UNVERIFIED'                     // the binary local gate (a sealed by-decide proof, or not)
  evidence: ResearchEvidence[]                                  // external research, each a provenance fingerprint
  // sealed proof · external attestation · asked and nothing attests · COULD NOT ASK ENOUGH TO SAY (never "false")
  verdict: 'VERIFIED' | 'CORROBORATED' | 'UNVERIFIED' | 'UNMEASURED'
  reach?: Reach                                         // the denominator the verdict was computed against
  receipt: string                                       // order-invariant fold of the evidence addresses
  handle: string                                        // eight hexbits — permanent door into uuidna.com
  hexbits: number[]                                     // 32 states compiled from the receipt
  door: string                                          // https://uuidna.com/<handle>
  develop: string[]                                     // the REFLECTION — the recomputable path to seal it (never a dead end)
  honest: string
}

const HONEST =
  'External research CORROBORATES, it does not PROVE: each evidence item is a provenance fingerprint of what a FREE ' +
  'public API says. Only a `by decide` theorem SEALS (VERIFIED). CORROBORATED = unverified locally but ' +
  'attested by a named external source — evidence; UNVERIFIED is never "false", only "not yet verified". A ' +
  'binary gate proves but never refutes, so a local VERIFIED always outranks external evidence, and no stream can ' +
  'promote a claim to SEALED. The evidence folds order-invariantly to the receipt, recomputable by anyone.'

/** corroborate(statement, evidence[, decidableTest]) → the LOCAL binary verdict augmented with external evidence,
 *  folded to an order-invariant receipt. A sealed proof (VERIFIED) outranks everything; else evidence from TWO
 *  INDEPENDENT SOURCES yields CORROBORATED (attestation; else UNVERIFIED (never "false"). Pure.
 *
 *  TWO, NOT ONE, AND SOURCES, NOT ROWS — this function contradicted the theorem it is named for. reporter.ts:34
 *  has always read `sources.length >= 2` — the threshold is the code's, and the theorem that once "sealed" it only compared 1 to 2 — while this line
 *  read `evidence.length` — ONE, and one ROW at that, so eight hits from a single stream would have cleared even a
 *  naive two-check. MEASURED before the fix: corroborateWithResearch('qwertzuiop asdfghjkl yxcvbnm') returned
 *  CORROBORATED on a single CrossRef row. Retrieval is not corroboration, the same way a citation is not
 *  entailment; a ranked search engine answers with the best of what it has.
 *
 *  WHAT THIS STILL DOES NOT FIX, said plainly rather than left to be discovered: a uuidna coinage naming nothing
 *  outside this repository ("The 8x8 core") returns THREE independent sources and clears the bar honestly. Counting
 *  is blind to relevance. This closes the gibberish class and no more. */
export function corroborate(statement: string, evidence: ResearchEvidence[] = [], decidableTest?: () => boolean, reach?: Reach): Corroboration {
  const adj = adjudicate(statement, decidableTest)
  const local = adj.verdict
  const rows = evidence.map((e) => evidenceRow(e.source, e.address, e.note))
  const receipt = merkleGravity(rows.map((e) => e.address))
  const independentSources = new Set(rows.map((e) => e.source)).size
  // A SILENCE ONLY MEANS SOMETHING IF THE THRESHOLD WAS REACHABLE. The bar is two INDEPENDENT sources, so to
  // conclude UNVERIFIED — "the world does not attest this" — at least two must have ANSWERED. With fewer,
  // CORROBORATED was unreachable no matter what the archives hold, and the silence measures the network rather
  // than the world. That is UNMEASURED, and it is a different fact for a caller to act on: retry, versus think.
  //
  // A local seal still outranks everything, including an unmeasured sweep: a `by decide` proof needs no archive.
  const verdict: Corroboration['verdict'] =
    local === 'VERIFIED' ? 'VERIFIED'
      : independentSources >= 2 ? 'CORROBORATED'
        : reach && reach.answered < 2 ? 'UNMEASURED'
          : 'UNVERIFIED'
  const door = hexbitDoorOf(receipt)
  return { statement, local, evidence: rows, verdict, receipt, ...door, develop: adj.develop, honest: HONEST, ...(reach ? { reach } : {}) }
}

// THE RESEARCH SOURCES — the ONE registry of reachable free API streams, each a best-effort fetch returning provenance-
// fingerprinted evidence and NEVER a fabricated one. researchEvidence fans them ALL out in parallel, so the concurrency
// lives in ONE place: every consumer (corroborateWithResearch, scanPublications) gets every source at once, and adding a
// source is a single line here — the parallel speedup is DRY.
/** What ONE archive answered — the READING, not just the rows.
 *
 *  THE DEFECT THIS TYPE ENDS. Every source returned `[]` for three different worlds: the archive answered and held
 *  nothing, the archive REFUSED (rate-limit, 503, a query it would not parse), and the archive was never reached at
 *  all (offline, DNS, a timeout). One value, three facts. Downstream, `independentSources >= 2` then counted
 *  against a denominator nobody had measured — so with three archives down the corroboration bar quietly became
 *  "two of the two that answered", and a claim the world attests loudly came back UNVERIFIED because a laptop had
 *  no network. For a surface whose entire job is to separate evidence from the ABSENCE of evidence, that was the
 *  one distinction it could not make.
 *
 *  A reached source that found nothing is a real, weak, honest datum: the archive looked and had none. An
 *  unreached source is not a datum at all. */
export interface SourceReading {
  source: string                  // the archive's name — present whether or not it answered
  reached: boolean                // did it ANSWER — never "did it have something"
  why: string | null              // when it did not: the reason, in the host's own words
  evidence: ResearchEvidence[]    // what it attested
}

export type ResearchSource = (query: string) => Promise<SourceReading>

/** the denominator a verdict was computed against — asked, answered, and who was missing */
export interface Reach { asked: number; answered: number; unreachable: string[] }

export const reachOf = (readings: readonly SourceReading[]): Reach => ({
  asked: readings.length,
  answered: readings.filter((r) => r.reached).length,
  unreachable: readings.filter((r) => !r.reached).map((r) => r.source),
})

export { researchEvidence, researchSweep, RESEARCH_SOURCE_NAMES } from './quantum/os/research/index.js'

/** approve(c) → the HARD gate: ONLY a local by-decide seal (the "quantum" verification — a proof that COMPUTES)
 *  approves a claim. THROWS if a non-sealed source is used as approval — CORROBORATED (external research) and
 *  UNVERIFIED (silence) are evidence and not-yet. This makes "only lean approves" a HARD FAILURE, not
 *  a soft downgrade: no external stream, no attestation, can ever seal. (Honest caveat: this gates APPROVAL
 *  ledger — uuidna's own arithmetic is classical and honestly so; "quantum" here names the recomputable Lean seal.) */
export function approve(c: Corroboration): Corroboration {
  if (c.local !== 'VERIFIED')
    throw new Error(
      `corroborate: HARD FAIL — approval requires a local by-decide seal (the "quantum" verification); ` +
        `"${c.statement.slice(0, 60)}" is ${c.verdict}. External research CORROBORATES, it never APPROVES; ` +
        `UNVERIFIED is not "false", only not-yet. Only lean approves.\n` +
        `REFLECT — the failure is not a dead end; the recomputable path to seal it (the quantum solution):\n` +
        (c.develop.length ? c.develop.map((d) => '  • ' + d).join('\n') : '  • express it as a decidable proposition and prove it `by decide`.'),
    )
  return c
}

/** corroborateWithResearch(statement) → corroborate a claim against the free research streams (one network call).
 *  HONEST: it can only CORROBORATE (external evidence) or leave UNVERIFIED — it can NEVER seal; only a by-decide
 *  theorem does, and it can never refute (no counterexample lives in an external stream). */
export async function corroborateWithResearch(statement: string): Promise<Corroboration> {
  // the SWEEP, not just the rows: the verdict needs to know how many archives actually answered, or it cannot
  // tell "nothing attests this" from "nobody was asked"
  const readings = await researchSweep(statement)
  return corroborate(statement, readings.flatMap((r) => r.evidence), undefined, reachOf(readings))
}

export interface FirewallResult {
  passed: string[]           // the sealed layers that crossed, in order
  blockedAt: number | null   // the index of the first UNSEALED layer, or null if the whole waterfall cleared
  blocked: string | null     // the statement of the layer that blocked
  reflection: string[]       // the develop path for the blocked layer — a hard fail is never a dead end
  receipt: string            // order-invariant fold of the passed layers
  cleared: boolean
  honest: string
}

const FIREWALL_HONEST =
  'A WATERFALL of hard gates: each layer crosses ONLY on a local by-decide seal (VERIFIED); the first unsealed layer ' +
  'BLOCKS the whole cascade — nothing downstream is even reached — and reflects the develop path to seal it. Defence-' +
  'in-depth, the same "no maximum, only bounds" the Security domain proves. "quantum" names the ' +
  'recomputable Lean seal and the order-invariant fold; external research corroborates but never crosses.'

/** firewall(layers) → the QUANTUM FIREWALL as a WATERFALL: run the corroborations in order, each APPROVED only by a
 *  local by-decide seal. The FIRST unsealed layer blocks the whole cascade (a hard drop) and reflects its develop
 *  path; nothing crosses unless every prior layer is sealed. The passed layers fold order-invariantly to a receipt. */
export function firewall(layers: Corroboration[]): FirewallResult {
  const passed: string[] = []
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].local !== 'VERIFIED') {
      return { passed, blockedAt: i, blocked: layers[i].statement, reflection: layers[i].develop, receipt: merkleGravity(passed.map((s) => toUuid(s))), cleared: false, honest: FIREWALL_HONEST }
    }
    passed.push(layers[i].statement)
  }
  return { passed, blockedAt: null, blocked: null, reflection: [], receipt: merkleGravity(passed.map((s) => toUuid(s))), cleared: true, honest: FIREWALL_HONEST }
}

export interface Entanglement {
  members: string[]     // the entangled claims, in the order given (the receipt does not depend on it)
  verified: number      // how many members are sealed by decide — only sealed members truly bind
  receipt: string       // the ENTANGLED receipt — the order-invariant fold of (statement | verdict) for every member
  handle: string
  hexbits: number[]
  door: string
  entangled: boolean    // ≥2 members bound into one shared receipt
  honest: string
}

const ENTANGLE_HONEST =
  'A set of claims ENTANGLED into ONE receipt: verifying the whole verifies every part, and altering ANY member — its ' +
  'statement OR its verdict — moves the receipt, so the binding collapses VISIBLY (change-sensitive, like the memory-' +
  'store receipt). The receipt is the SAME for any observer ordering (order-invariant, bell_no_signaling). HONEST ' +
  'SCOPE: the merkle / no-signaling binding — the structural analogue of entanglement — NOT quantum hardware; nothing ' +
  'signals, no correlation is causal, and only members SEALED by decide truly bind (external evidence never entangles).'

/** entangle(corroborations) → bind a set of audit claims into ONE entangled receipt (the order-invariant fold of
 *  each member's statement AND verdict). The whole is verified from any part; any altered member breaks the shared
 *  receipt. The audit-scale analogue of an entangled state: correlated fate, change-sensitive, order-invariant. */
export function entangle(corroborations: Corroboration[]): Entanglement {
  const members = corroborations.map((c) => c.statement)
  const receipt = merkleGravity(corroborations.map((c) => toUuid(c.statement + '|' + c.verdict)))
  const verified = corroborations.filter((c) => c.local === 'VERIFIED').length
  return { members, verified, receipt, ...hexbitDoorOf(receipt), entangled: corroborations.length >= 2, honest: ENTANGLE_HONEST }
}

// ── THE PUBLICATION SCANNER — scan online for uuidna-related mentions and INVESTIGATE each against the reservation ──
export interface PublicationFinding {
  source: string        // the free stream the mention came from
  address: string       // content-address of the raw response item — a provenance fingerprint
  note: string          // the fingerprinted snippet
  legitimacy: 'canonical' | 'external-unlicensed'  // per the sole-representation reservation
  investigation: string // the honest read: what this finding is, and what it is NOT
}
export interface PublicationScan {
  query: string
  canonical: string     // the one legitimate representation (uuidna.com)
  findings: PublicationFinding[]
  count: number
  receipt: string       // order-invariant fold of the finding addresses
  handle: string
  hexbits: number[]
  door: string
  honest: string
}

const SCAN_HONEST =
  'The publication scanner: a BEST-EFFORT scan of the NAMED FREE research streams for a query, each match a provenance ' +
  'fingerprint (content-addressed, never executed), INVESTIGATED against the sole-representation reservation — the one ' +
  'legitimate representation is uuidna.com; any external mention is legitimate ONLY if licensed by the captain. HONEST ' +
  'SCOPE: integrity — the record recomputes for anyone — it scans the streams it can REACH' +
  'no publication exists; it CORROBORATES a mention, it never proves authorship, endorsement, or infringement; a human ' +
  'court decides legitimacy. It fetches DATA.'

/** scanPublications(query='uuidna') → BEST-EFFORT scan the reachable free research streams for uuidna-related mentions
 *  and investigate each against the reservation (canonical uuidna.com vs external-unlicensed). The network call; the
 *  responses are DATA, content-addressed. Best-effort: an unreachable/empty stream yields no finding,
 *  never a fabricated one. HONEST: scans the reachable streams— absence is not proof of absence. */
export async function scanPublications(query = 'uuidna'): Promise<PublicationScan> {
  const canonical = 'https://uuidna.com'
  // researchEvidence is the ONE parallel fan-out over every reachable source (NIST + Zenodo + …) — so the scan gets the
  // concurrency for free, no per-caller Promise.all. The order-invariant fold below means the receipt is identical
  // however the sources race — concurrency speeds it up and can never corrupt the result (store_fold_order_invariant).
  const evidence = await researchEvidence(query)
  const findings: PublicationFinding[] = evidence.map((e) => {
    const canonicalHit = /uuidna\.com/i.test(e.note) || /uuidna\.com/i.test(e.source)
    return {
      source: e.source, address: e.address, note: e.note,
      legitimacy: canonicalHit ? 'canonical' : 'external-unlicensed',
      investigation: canonicalHit
        ? 'names the canonical representation (uuidna.com) — the one legitimate presence.'
        : 'an external mention — legitimate ONLY if licensed by the captain; not endorsed and does not speak for the work unless licensed. Not proof of infringement; a human court decides.',
    }
  })
  const receipt = merkleGravity([toUuid('scan:' + query + ':' + canonical), ...findings.map((f) => f.address)])
  return {
    query, canonical, findings, count: findings.length,
    receipt, ...hexbitDoorOf(receipt),
    honest: SCAN_HONEST,
  }
}
