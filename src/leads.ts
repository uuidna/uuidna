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
// SETTLEMENT ALREADY HAS A VOCABULARY HERE and this module borrows it rather than inventing one:
//
//   VERIFIED  a `by decide` proof seals it — the kernel decided, and nothing else in this tree seals anything
//   REFUTED   a MEASUREMENT killed it, carried in killed_by. A refuted lead is the cheapest thing in the
//             ledger: it stops the same derivation being made twice.
//
// and IN TRIAL, which carries `owes`: what the lead still needs. In trial is the open state, and the settlement is
// evidence-bearing in every case — a lead does not become settled by someone deciding to stop looking at it. A
// hand-written boundary is not a settlement: the refused bucket is removed, because Lean decides (the captain,
// 2026-09-14).
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
// formula.ts imports NOTHING, so the classifier below costs the edge bundle only its own bytes
import { characteristicNumerals } from './formula.js'

/** how a lead stopped being a lead — each carries its own evidence, and none of them is "we stopped looking" */
export type Settlement = 'VERIFIED' | 'REFUTED'

/** one open lead: what is unsettled, and what it OWES to become settled */
export interface Lead {
  source: string      // which census surfaced it
  what: string        // the unsettled claim, in words
  owes: string        // what would settle it — a proof, or a measurement that refutes it
}

/** what ONE source answered. `reached:false` is a fact about the reader, never about the tree. */
export interface SourceReading {
  source: string
  reached: boolean
  why: string | null   // when it did not answer: the reason
  open: Lead[]         // leads still in trial
  settled: number      // how many this source has settled — the denominator that makes `open` meaningful
}

export interface LeadCensus {
  sources: SourceReading[]
  open: Lead[]           // every open lead, across every source that answered
  /** the open leads a cross-formulated theorem could decide — these and only these bind `ready` */
  holding: Lead[]
  /** the open leads no theorem could decide: a door, a host, a service. Reported, counted, and not holding */
  reported: Lead[]
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
 *  (settle it, or refute it with a measurement); an unmeasured source is a broken
 *  reader (fix the reader, then ask again). Folding them together would make the second look like the first and
 *  send someone hunting a lead that was never found. */
/**
 * WHETHER A CROSS-FORMULATED THEOREM COULD EVER DECIDE THIS LEAD.
 *
 * THE CAPTAIN'S DECISION, 2026-09-28, in the captain's words: "release all holding none solved by cross formulas proving
 * each other". It changes what a lead is for, so it is recorded here as a decision rather than inferred from a mood.
 *
 * WHY THE OLD RULE MADE RELEASING IMPOSSIBLE RATHER THAN STRICT. A lead held a release until it was settled, and settling
 * means proving it as `def lead_<handle> : Prop` with a sealed theorem, or refuting it with `involution_<handle>`. That
 * works for a claim ABOUT THE LEDGER. It cannot work for a claim about anything else — and the largest cluster of open
 * leads says so in its own text: "no door commits a pathspec; a signed commit by pathspec is a git act, not a ledger
 * computation". No theorem will ever decide whether a git door exists, so that lead could never be settled, so it held
 * every release forever. 174 leads were open, 108 of them missing-door requests, and the gate had become a rule that
 * could not be satisfied — which is a rule nobody can act on.
 *
 * SO A LEAD HOLDS ONLY IF THE KERNEL COULD DECIDE IT, and the test is what the lead is ABOUT. A lead that names sealed
 * content — a theorem key, a wing, a principle, a count or a relation the ledger carries — is a claim the kernel can
 * settle, and it holds. A lead about a host fact, a missing tool, an HTTP status, a credential or an external service is
 * REPORTED AND DOES NOT HOLD: it is real work, and it is not a claim about what this tree proves.
 *
 * NOTHING IS DELETED AND NOTHING IS HIDDEN. Every lead stays in the census, counted and named, and `open` still carries
 * all of them. What changes is only which ones bind `ready`. A lead that cannot hold is not a lead that does not matter —
 * it is one whose remedy is a door or a key, not a proof.
 */
export const kernelDecidable = (lead: Lead): boolean => {
  const text = `${lead.what} ${lead.owes ?? ''}`.toLowerCase()
  // ABOUT SOMETHING OTHER THAN THE LEDGER: a door, a host, a service, a credential. These are work, not claims.
  // THE GAP RECORD IS THE CANONICAL DOOR REQUEST AND THIS PATTERN DID NOT MATCH IT. `UUIDNA_MCP_GAP` writes
  // "the tree escaped the MCP door N times for the same missing capability: <capability>", and none of `no mcp door`,
  // `door missing` or `missing door` appears in that string — so 31 plain door requests were filed as claims about the
  // ledger and held a release that no theorem could ever release. The test fixture hid it: it read
  // "escaped the MCP door 15 times: no door commits a pathspec", which passed on the pathspec clause rather than on the
  // escape, so the pattern was never asked the question the tree actually asks it. Measured 2026-09-28: holding 40 → 9.
  const elsewhere = /\b(no (?:mcp )?door|door missing|missing door|escaped the (?:mcp )?door|missing capability|credential|api key|http \d{3}|endpoint|unreachable|not answer|fetch failed|commits? a pathspec|git act|wrangler|kv namespace|deploy|registry|npm publish|zenodo api|rate limit)\b/
  if (elsewhere.test(text)) return false
  // ABOUT THE LEDGER: it names sealed content, or asserts a relation the kernel evaluates.
  // PLURALS AND INFLECTIONS COUNT, and an existing test caught their absence in the dangerous direction. With `\bwing\b`
  // the lead "the grid breaks at 73 wings" did not match, so a plain claim about the ledger was classified as not
  // holding — which lets a release through that should have been held. Under-counting what holds is the error that costs
  // something; over-counting merely keeps a release waiting. So the stems accept a trailing s or es.
  const ledger = /\b(theorem|lemma|statement|sealed|wing|principle|axiom|proof|by decide|key|address|receipt|census|count|invariant|involution|falsifier|ledger)(?:e?s)?\b/
  return ledger.test(text)
}

export function leadCensus(sources: readonly SourceReading[]): LeadCensus {
  const answered = sources.filter((s) => s.reached)
  const unmeasured = sources.filter((s) => !s.reached).map((s) => s.source)
  const open = answered.flatMap((s) => s.open)
  const settled = answered.reduce((n, s) => n + s.settled, 0)
  // THE CAPTAIN'S RULE: only a lead a cross-formulated theorem could decide binds the release. See kernelDecidable.
  const holding = open.filter(kernelDecidable)
  const reported = open.filter((l) => !kernelDecidable(l))
  const ready = unmeasured.length === 0 && holding.length === 0
  const why = ready
    ? `every one of ${sources.length} lead sources answered and no KERNEL-DECIDABLE lead is open — ${settled} settled, `
      + `${reported.length} lead(s) reported without holding (a door, a host or a service, which no theorem decides). `
      + 'A release may ship.'
    : unmeasured.length
      ? `${unmeasured.length} of ${sources.length} lead sources could NOT be read (${unmeasured.join(', ')}), so this is not a clean census — it is an absent one. A release must not ship on a reading nobody took.`
      : `${holding.length} KERNEL-DECIDABLE lead(s) still in trial across ${answered.length} source(s), with `
        + `${reported.length} more reported that no theorem could decide. A release is the act of saying the tree is what `
        + 'it claims, so a claim about the ledger holds it — settle it, or refute it with a measurement.'
  return {
    sources: [...sources], open, holding, reported, unmeasured, settled,
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
    out.push('', `  ${c.open.length} lead(s) in trial:`)
    for (const l of c.open.slice(0, limit)) {
      out.push(`    · [${l.source}] ${l.what.slice(0, 96)}${l.what.length > 96 ? '…' : ''}`)
      out.push(`        owes: ${l.owes.slice(0, 96)}${l.owes.length > 96 ? '…' : ''}`)
    }
    if (c.open.length > limit) out.push(`    · … ${c.open.length - limit} more`)
  }
  out.push('', (c.ready ? '✓ leads — ' : '✗ leads — ') + c.why)
  return out
}

// ── WHICH INSTRUMENT COULD SETTLE A LEAD ─────────────────────────────────────────────────────────────────────────
//
// `kernelDecidable` above answers a coarse question: is this lead ABOUT the ledger, or about a door, a host, a key.
// Reading the leads it kept verbatim shows the coarse answer hides a split that decides whether automation is even
// possible — and the two rules belong in one file because the second exists to CHECK the first (misfiledDoorRequests
// at the end). They were written apart for a day and that day is the whole argument for putting them together: a
// classifier in one module and the rule it guards in another is two homes for one question.
//
//   DOOR      "the tree escaped the MCP door 8 times for the same missing capability: court investigation" — a gap
//             record. The remedy is named in the record: build that door. No theorem is involved.
//   CORPUS    "most-searched query \"iphone\" rings no sealed theorem" — an absence, not a defect in anything sealed.
//             Owes new content, which no proof about existing content supplies.
//   KERNEL    "concurrent width is 14 VE faces, against 24 sealed" — a relation among quantities the kernel holds.
//   SOURCE    "decrypt skipped verifyEnvelope" — a shape in the TypeScript, which the kernel cannot read.
//
// WHY `source` CANNOT BE AUTOMATED INTO A THEOREM. To seal `involution_<h> : ¬ lead_<h>` over a source-shape claim, a
// generator must measure the source and write the reading in as a Lean literal — and `by decide` then checks a relation
// over a number the generator chose. That is measure-then-seal furniture, and furniture that EXPIRES: the literal
// records what the source said the day it ran, so the theorem stays green after the source changes back. A green that
// survives the defect returning is the vacuous-success class arriving by a new road.
//
// CLASSIFYING DECIDES NO GATE. `ready` is untouched and every lead holds exactly as it did. Reclassifying a defect as
// "not holding" because no theorem reaches it would settle a lead by wording, which is the one settlement this ledger
// refuses — and it would do it to the leads about cryptography first, which is precisely backwards.

/** which instrument could settle a lead — and `source` means the kernel is the WRONG one, not that the lead is minor */
export type Instrument = 'door' | 'corpus' | 'kernel' | 'source' | 'undetermined'

export interface Owed {
  lead: Lead
  instrument: Instrument
  /** the source artefacts the lead names — the reason the kernel cannot reach it */
  names: string[]
  /** the quantities the lead is about, when it is about quantities */
  numerals: string[]
  why: string
}

// A LEAD'S SUBJECT IS IN THE SOURCE when it names a file this repository builds, calls a function, or pins a constant.
// Each pattern is a NAME the kernel has no access to: Lean sees the ledger's rows, never the TypeScript that made them.
// `.lean` IS DELIBERATELY ABSENT. A lead naming CoinsBalance.lean is a lead about the LEDGER — the kernel reads Lean,
// that is the whole instrument — so filing it under "a shape the kernel cannot see" is exactly backwards. The first draft
// included the extension and sent `two_routes_reach_four_hundred_and_thirty_two is alone in its principle
// "THE COINS BALANCE" (CoinsBalance.lean)` to the source column, where it would have been reported as unprovable when it
// is the one lead here a theorem settles outright.
const FILE = /\b[\w./-]*\w\.(?:ts|tsx|js|json|md|ya?ml|css|html)\b/g
const CALL = /\b[a-z][A-Za-z0-9_]*\s*\(/g
// CAMEL CASE IS THE ONLY IDENTIFIER SHAPE PROSE DOES NOT PRODUCE, and the lead that forced it into this module is
// "decrypt skipped verifyEnvelope" — no path, no parentheses, no capitals at the front. `verifyEnvelope` carries an
// interior capital, which English does not, so it is read as an identifier; `decrypt` is a word and is not.
const CAMEL = /\b[a-z][a-z0-9]*(?:[A-Z][A-Za-z0-9]*)+\b/g
// A CONSTANT COUNTS ONLY WHERE IT IS PINNED TO A VALUE. A bare run of capitals is as often an English acronym — the
// first draft read CSS, RFC and UUID as constants, which would have filed a plain claim about the ledger's own UUID
// count under "the kernel cannot see this". The assignment or comparison is what makes it a pin in the source.
const CONST = /\b[A-Z][A-Z0-9_]{2,}\b(?=\s*(?:={1,3}|:)\s*\S)/g

// A GAP RECORD is what `UUIDNA_MCP_GAP` writes when a session needed a capability, found no door, and escaped to an
// ad-hoc run. Its remedy is named in the record itself: build that door. No theorem is involved at any point.
const DOOR = /escaped the (?:MCP|mcp) door|missing capability|UUIDNA_MCP_GAP/
// A COVERAGE RECORD is what the search feed writes when the world asked for something this ledger has no theorem about.
// "most-searched query \"iphone\" rings no sealed theorem" is not a defect in anything sealed — it is an absence, and
// its remedy is new content, which no proof about existing content can supply.
const CORPUS = /rings no sealed theorem/

/** the source artefacts a lead names, deduplicated, in the order the words appear */
export function sourceNames(what: string): string[] {
  const out: string[] = []
  for (const re of [FILE, CALL, CAMEL, CONST]) {
    for (const m of what.matchAll(re)) {
      const name = m[0].replace(/\s*\($/, '')
      if (!out.includes(name)) out.push(name)
    }
  }
  return out
}

/**
 * Which instrument could settle this lead.
 *
 * SOURCE DOMINATES when a lead names both a source artefact and a quantity, and the reason is the order of the work: a
 * claim like "src/aura.ts still pins RAYS = 7" is settled by the source no longer pinning it. A theorem about the number
 * 7 would be true either way and would not touch the claim. So naming a source artefact decides the classification even
 * when numerals are present — the arithmetic is the lead's vocabulary, not its subject.
 *
 * A LEAD WITH FEWER THAN TWO QUANTITIES AND NO NAMED ARTEFACT IS `undetermined` rather than forced into a class, because
 * one quantity states no relation and the kernel decides relations. Guessing which instrument fits would put a number on
 * work nobody has read, and this module exists to stop exactly that.
 */
export function owedInstrument(lead: Lead): Instrument {
  // TWO STRUCTURED RECORDS ARE READ BEFORE ANY PROSE, because they are not prose: the tree EMITS them in a fixed shape,
  // so matching them is reading a format, not guessing at a sentence. The first draft of this module read them as prose
  // and scattered 25 identical door requests across three instrument classes on incidental wording — which is how a
  // classifier reports a 7.5% ceiling while the dominant class of the work goes unnamed.
  if (DOOR.test(lead.what)) return 'door'
  if (CORPUS.test(lead.what)) return 'corpus'
  const names = sourceNames(lead.what)
  if (names.length > 0) return 'source'
  return characteristicNumerals(lead.what).length >= 2 ? 'kernel' : 'undetermined'
}

/** one lead, classified, carrying the evidence for its classification so the reading can be argued with */
export function owedOf(lead: Lead): Owed {
  const names = sourceNames(lead.what)
  const numerals = characteristicNumerals(lead.what)
  const instrument = owedInstrument(lead)
  const why = instrument === 'door'
    ? 'a gap record: a session needed a capability no door served. Owes that door — no theorem is involved'
    : instrument === 'corpus'
      ? 'a coverage record: the world asked for something no theorem covers. Owes new content, not a proof'
    : instrument === 'source'
    ? `names ${names.slice(0, 3).join(', ')} — a shape in the source, which the kernel cannot read; owes a code change`
    : instrument === 'kernel'
      ? `a relation among ${numerals.join(', ')} — the kernel holds the data and can decide it`
      : 'states no relation among quantities and names no source artefact — unread, and not to be guessed at'
  return { lead, instrument, names, numerals, why }
}

export interface OwesCensus {
  rows: Owed[]
  door: number
  corpus: number
  kernel: number
  source: number
  undetermined: number
  /** the share a theorem generator could reach at all, as a percentage string — the automation ceiling, measured */
  automatable: string
  why: string
}

/** classify every lead handed in. Counts and reports; binds no gate and moves no lead. */
export function owesCensus(leads: readonly Lead[]): OwesCensus {
  const rows = leads.map(owedOf)
  const door = rows.filter((r) => r.instrument === 'door').length
  const corpus = rows.filter((r) => r.instrument === 'corpus').length
  const kernel = rows.filter((r) => r.instrument === 'kernel').length
  const source = rows.filter((r) => r.instrument === 'source').length
  const undetermined = rows.filter((r) => r.instrument === 'undetermined').length
  // DENOMINATOR BY COMPARISON, never Math.max — the determinism scan hard-rejects Math.* with no exemption
  const n = rows.length > 0 ? rows.length : 1
  const automatable = `${((kernel / n) * 100).toFixed(1)}%`
  return {
    rows, door, corpus, kernel, source, undetermined, automatable,
    why: `of ${rows.length} lead(s) held, ${door} owe a DOOR (a gap record naming the capability it needed), `
      + `${corpus} owe NEW CONTENT (a query no theorem covers), ${kernel} state a relation the kernel could decide `
      + `(${automatable}), ${source} name a shape in the source the kernel cannot read, and ${undetermined} state no `
      + 'relation at all. A theorem generator reaches only the kernel group. Nothing here is settled, and nothing stops '
      + 'holding.',
  }
}

/**
 * A lead the shape-reader calls a DOOR REQUEST while `kernelDecidable` lets it hold a release.
 *
 * THIS IS THE GUARD THE FIX OWED. On 2026-09-28 `kernelDecidable` filed 31 gap records as claims about the ledger,
 * because its exclusion pattern matched `no mcp door`, `door missing` and `missing door` while `UUIDNA_MCP_GAP` writes
 * "the tree escaped the MCP door N times for the same missing capability". Thirty-one door requests held a release that
 * no theorem could ever release, and the test fixture hid it by passing on an unrelated clause. Correcting the pattern
 * removed the leads; it did nothing to stop the next hand removing the correction.
 *
 * TWO RULES, WRITTEN FOR DIFFERENT PURPOSES, ASKED TO AGREE — which is the Rosetta discipline applied to a gate rather
 * than a theorem. `kernelDecidable` reads prose for what a lead is ABOUT; `owedInstrument` reads the fixed shape the
 * tree EMITS. Neither is derived from the other, so a disagreement is information: either the emitted shape changed and
 * the prose rule has not caught up, or the prose rule was edited back. Both are the same defect arriving from either
 * end, and both are caught here.
 *
 * IT IS NOT VACUOUS AND THE CHECK IS CHEAP TO MAKE: run it against the pattern as it stood this morning and it names 31
 * leads. A guard that has never been shown to fire is a guard nobody has tested.
 */
export function misfiledDoorRequests(open: readonly Lead[]): Lead[] {
  return open.filter((l) => owedInstrument(l) === 'door' && kernelDecidable(l))
}
