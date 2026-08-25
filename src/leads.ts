// leads — A LEAD IS ANYTHING NOT VERIFIED, AND NO RELEASE SHIPS OVER ONE.
//
// (the captain's order, 2026-08-25: "next release only possible if all leads verified. lead is anything not
// verified. automate")
//
// THE DEFINITION IS THE WHOLE DESIGN. Everything this ledger holds is either SETTLED or it is a lead: there is no
// third bucket called "known and tolerated". A commit may carry leads — that is what work in progress is — but a
// RELEASE is the act of telling the world the tree is what it says it is, and a release over an open lead
// publishes a claim nobody finished checking.
//
// SETTLEMENT ALREADY HAS A VOCABULARY HERE and this module borrows it rather than inventing one. lean/leads.json
// has kept three buckets since it was written:
//
//   VERIFIED  a `by decide` proof seals it — the kernel decided, and nothing else in this tree seals anything
//   REFUTED   a MEASUREMENT killed it, carried in killed_by. A refuted lead is the cheapest thing in the
//             ledger: it stops the same derivation being made twice.
//   REFUSED   a named BOUNDARY declines it, carried in `boundary` — physics, licence, scope.
//
// and HELD, which carries `owes`: what the lead still needs. Held is the open state, and the settlement is
// evidence-bearing in every case — a lead does not become settled by someone deciding to stop looking at it.
//
// THE THREE-STATE RULE, which this module exists to hold. A source is ASKED, and it either answers or it does
// not. A source that could not be read reports UNMEASURED and BLOCKS — it is never folded into "no leads found",
// because an unread source and a clean source return the same empty list and that is the defect this tree spent
// 2026-08-25 pulling out of eight instruments (theorem no_instrument_narrower_than_its_question: every two-valued
// instrument over a three-answer question collapses a pair). A release gate that cannot tell "nothing is open"
// from "I could not look" is exactly the instrument that theorem forbids.
//
// PURE. No filesystem, no network, no clock: the readings are gathered by scripts/leads-gate and handed here, so
// the census — and its refusal — can be driven directly by a test with no checkout at all.
import { merkleGravity } from './gravity/index.js'
import { toUuid } from './address.js'

/** how a lead stopped being a lead — each carries its own evidence, and none of them is "we stopped looking" */
export type Settlement = 'VERIFIED' | 'REFUTED' | 'REFUSED'

/** one open lead: what is unsettled, and what it OWES to become settled */
export interface Lead {
  source: string      // which census surfaced it
  what: string        // the unsettled claim, in words
  owes: string        // what would settle it — a proof, a measurement, or a named boundary
}

/** what ONE source answered. `reached:false` is a fact about the reader, never about the tree. */
export interface SourceReading {
  source: string
  reached: boolean
  why: string | null   // when it did not answer: the reason
  open: Lead[]         // leads still held
  settled: number      // how many this source has settled — the denominator that makes `open` meaningful
}

export interface LeadCensus {
  sources: SourceReading[]
  open: Lead[]           // every open lead, across every source that answered
  unmeasured: string[]   // sources that could NOT be read — each one blocks
  settled: number        // total settled, so a zero-open census is distinguishable from an empty tree
  asked: number          // how many sources were consulted
  answered: number       // how many spoke
  ready: boolean         // may a release ship — TRUE only when every source answered and none holds a lead
  why: string            // the verdict in words, so a caller need not re-derive it
  receipt: string        // order-invariant fold of the census, recomputable by anyone
}

/** a source that answered, with what it holds */
export const read = (source: string, open: Lead[], settled: number): SourceReading =>
  ({ source, reached: true, why: null, open, settled })

/** a source that could NOT be read — blocks the release, and says why */
export const unread = (source: string, why: string): SourceReading =>
  ({ source, reached: false, why, open: [], settled: 0 })

/** THE CENSUS. Ready iff every source ANSWERED and no answer holds a lead.
 *
 *  The two failure modes are reported apart because a caller acts differently on each: an open lead is work
 *  (settle it, or refute it with a measurement, or refuse it at a boundary); an unmeasured source is a broken
 *  reader (fix the reader, then ask again). Folding them together would make the second look like the first and
 *  send someone hunting a lead that was never found. */
export function leadCensus(sources: readonly SourceReading[]): LeadCensus {
  const answered = sources.filter((s) => s.reached)
  const unmeasured = sources.filter((s) => !s.reached).map((s) => s.source)
  const open = answered.flatMap((s) => s.open)
  const settled = answered.reduce((n, s) => n + s.settled, 0)
  const ready = unmeasured.length === 0 && open.length === 0
  const why = ready
    ? `every one of ${sources.length} lead sources answered, and none holds a lead — ${settled} settled. A release may ship.`
    : unmeasured.length
      ? `${unmeasured.length} of ${sources.length} lead sources could NOT be read (${unmeasured.join(', ')}), so this is not a clean census — it is an absent one. A release must not ship on a reading nobody took.`
      : `${open.length} lead(s) still held across ${answered.length} source(s). Each is unverified, and a release is the act of saying the tree is what it claims — settle, refute with a measurement, or refuse at a named boundary.`
  return {
    sources: [...sources], open, unmeasured, settled,
    asked: sources.length, answered: answered.length, ready, why,
    // the fold binds the VERDICT of each source, not just its name, so a source flipping from clean to
    // holding — or from answering to silent — moves the receipt
    receipt: merkleGravity(sources.map((s) => toUuid(`lead-source|${s.source}|${s.reached ? 'read' : 'unread'}|${s.open.length}`))),
  }
}

/** render the census for a human at a terminal — the gate's own voice, with every lead's debt named */
export function renderCensus(c: LeadCensus, limit = 12): string[] {
  const out: string[] = []
  for (const s of c.sources) {
    out.push(s.reached
      ? `  ${s.open.length ? '·' : '✓'} ${s.source.padEnd(16)} ${s.open.length} open, ${s.settled} settled`
      : `  ✗ ${s.source.padEnd(16)} UNREAD — ${s.why}`)
  }
  if (c.open.length) {
    out.push('', `  ${c.open.length} lead(s) held:`)
    for (const l of c.open.slice(0, limit)) {
      out.push(`    · [${l.source}] ${l.what.slice(0, 96)}${l.what.length > 96 ? '…' : ''}`)
      out.push(`        owes: ${l.owes.slice(0, 96)}${l.owes.length > 96 ? '…' : ''}`)
    }
    if (c.open.length > limit) out.push(`    · … ${c.open.length - limit} more`)
  }
  out.push('', (c.ready ? '✓ leads — ' : '✗ leads — ') + c.why)
  return out
}
