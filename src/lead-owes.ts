// lead-owes — WHICH INSTRUMENT COULD SETTLE A LEAD, and the honest finding that for most of them the kernel is not it.
//
// The captain, 2026-09-28: "Land all leads" / "Release all leads". `kernelDecidable` in src/leads.ts answers a coarser
// question — is this lead ABOUT the ledger, or about a door, a host, a key — and 90 leads answered yes. Reading those 90
// verbatim shows the coarse answer hides a split that decides whether automation is even possible:
//
//   ARITHMETIC     "Plan leftover: concurrent width is 14 VE faces" — a relation among quantities. The kernel holds the
//                  data, evaluates the relation, and `by decide` settles it or refutes it. AUTOMATABLE.
//
//   SOURCE-SHAPE   "decrypt skipped verifyEnvelope, so a mutated address still decoded" · "trading-shelf.test.ts still
//                  hunt honesty by honest.includes('never money')" · "src/aura.ts CSS still pins RAYS = 7" — the subject
//                  is a SHAPE IN THE TYPESCRIPT, and the kernel cannot see TypeScript.
//
// WHY THE SECOND CLASS CANNOT BE AUTOMATED INTO A THEOREM, which is the whole point of this module. To seal
// `involution_<h> : ¬ lead_<h>` over a source-shape claim, a generator must measure the source and write the reading in
// as a Lean literal — and then `by decide` checks a relation over a number the generator already chose. That is the
// measure-then-seal furniture this tree has rejected since 2026-09-13: a theorem is furniture unless the answer is
// ABSENT from its input. Worse, it would be furniture that EXPIRES — the literal records what the source said on the day
// the generator ran, so the theorem stays green after the source changes back. A green that survives the defect
// returning is the vacuous-success class, arriving by a new road.
//
// SO THE SECOND CLASS OWES A CODE CHANGE, NOT A PROOF, and that is a fact about which instrument fits, not an excuse.
// `decrypt skipped verifyEnvelope` is the cheapest demonstration: crypt.ts now calls `insistEnvelope` in both `decrypt`
// and `decryptSession`, so the defect is GONE and the lead is STALE — and it still cannot pass the refute door, because
// that door requires a kernel involution and the kernel has no way to look at crypt.ts. The remedy is the captain's to
// choose: either the tree grows an instrument that settles a source reading, or these leads are carried openly as work.
//
// THE SOURCE COUNT IS A FLOOR AND THE KERNEL SHARE IS A CEILING, which is the direction the error must run. A lead that
// names only lowercase English words — "the roof walk is still hardcoded" — is indistinguishable from prose by any
// computation, so it is NOT counted as source. Every miss therefore moves a lead OUT of "owes a code change" and into
// the automatable or undetermined column, so the automatable percentage is the most generous reading available and the
// real reach of a theorem generator is no larger than it says.
//
// THIS MODULE DECIDES NO GATE. It classifies and counts, and `ready` is untouched: every one of the 90 still holds
// exactly as it did. Reclassifying a defect as "not holding" because no theorem reaches it would settle a lead by
// wording, which is the one settlement this ledger refuses — and it would do it to the most consequential leads in the
// list, the ones about cryptography, which is precisely backwards.
//
// PURE. No filesystem, no network, no clock: the leads are handed in, so a test can drive the whole classification.
import { kernelDecidable, type Lead } from './leads.js'
import { characteristicNumerals } from './formula.js'

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
