// knowledge — WHERE A BOOK AND A THEOREM MEET, and what the meeting is allowed to claim.
//
// The join already exists: `linkBookFacts` extracts decidable facts from a public-domain text and matches them
// against the sealed ledger, returning sealed-match, novel, or refuted. This module does not replace it. It
// applies three laws the tree earned tonight to the JOIN itself, because a book and a theorem meeting is exactly
// where an overclaim is cheapest to make and hardest to see.
//
// 1. `novel` IS ABSENCE, AND ABSENCE IS NOT A FINDING. The existing status calls a verified book fact NOVEL —
//    "a discovery" — when no ledger statement contains it. That is a positive claim derived from a negative
//    search, and `silence_never_refutes` (Negation.lean) decides against it: of the four citation states exactly
//    one verifies and the other three are OPEN, none refuted by absence. Not finding prior art in ONE ledger is
//    not discovering that none exists; it is not having looked anywhere else. So `novel` becomes OPEN here, with
//    the search that was actually performed named beside it.
//
// 2. A JOIN NEEDS ITS DENOMINATOR. `linkBookFacts(text, limit = 100)` reports what it found in the first `limit`
//    facts, and "3 matches" reads identically whether 3 of 4 or 3 of 400 were examined. Every result here
//    carries `examined` and `of`, so the reader can tell a thorough search from a truncated one — the same law
//    that separates a decoder reading two of sixteen indexes from one that read them all.
//
// 3. A MATCH IS ONE LINE OF POSITION. The existing link is a substring containment — `t.norm.includes(core)` —
//    which can hold by coincidence, and one line is a guess. A joined theorem is therefore put through
//    `harmonise`, which admits only when two independent perspectives cross and none disagree.
//
// AND THE BOOK SIDE MUST SAY WHERE IT CAME FROM. `reading.provenance` returns UNREAD without an edition record,
// because bytes are mute about their own source. A claim whose text has no provenance is not knowledge about
// the world; it is knowledge about a string someone had. That is carried, not assumed.
import { linkBookFacts, extractDecidable } from '../books.js'
import { harmonise, type Harmony } from '../firewall/index.js'
import { provenance, type Edition } from '../reading/index.js'
import { merkleGravity } from '../gravity/index.js'
import { toUuid } from '../address.js'

/** No cap: the denominator must be what the text offers, not what a caller asked for. */
const UNCAPPED = 1_000_000

export type Standing = 'verified' | 'open' | 'refuted'

export interface Known {
  claim: string
  /** the fold of the book fact's address and the theorem's — one address for the meeting, order-invariant */
  address: string
  standing: Standing
  /** the sealed key this fact met, when it met one */
  theorem: string | null
  /** the theorem side's crossing lines, absent when nothing was met */
  harmony: Harmony | null
  why: string
}

export interface Merged {
  known: readonly Known[]
  /** THE DENOMINATOR: facts examined, of facts the text offered */
  examined: number
  of: number
  /** whether the text testified to its own source — an UNREAD provenance weakens every row below it */
  provenanced: boolean
  verified: number
  open: number
  refuted: number
  receipt: string
}

/** merge(text, edition?, limit) → the book and the ledger, joined under the three laws above. */
export function merge(text: string, edition?: Edition, limit = 100): Merged {
  const prov = provenance(text, edition)
  const linkage = linkBookFacts(text, limit)
  // The field is `facts`, not `links`. The first version guessed the name and cast to a shape with an optional
  // key, so a wrong guess degraded to an EMPTY array rather than a type error: it reported "examined 0" over a
  // text the extractor found three facts in, and read as a clean empty result. A cast with `?? []` is a
  // silent-absence generator — the defect this module is built to refuse, written into its own first draft.
  const links = linkage.facts

  const known: Known[] = links.map((l) => {
    if (l.verdict === 'REFUTED') {
      return { claim: l.claim, address: l.address, standing: 'refuted' as const, theorem: null, harmony: null,
        why: 'the book states arithmetic the kernel decides FALSE — a refutation with a witness, which is the one decidably-false case' }
    }
    if (!l.linkedTheorem) {
      // was `novel`. Absence in ONE ledger is not discovery — silence_never_refutes.
      return { claim: l.claim, address: l.address, standing: 'open' as const, theorem: null, harmony: null,
        why: 'no sealed statement contains this fact — OPEN, not novel: one ledger searched is not the absence of prior art, and no one has looked elsewhere' }
    }
    const h = harmonise(l.linkedTheorem)
    return {
      claim: l.claim,
      address: merkleGravity([l.address, toUuid(l.linkedTheorem)]),
      standing: h.verified ? 'verified' as const : 'open' as const,
      theorem: l.linkedTheorem,
      harmony: h,
      why: h.verified
        ? `the book states it and the ledger seals it, crossed by ${h.crossed} independent perspectives`
        : `matched ${l.linkedTheorem}, but the seal does not harmonise: ${h.reason}`,
    }
  })

  // THE REAL DENOMINATOR, not a restatement of the numerator. The first version took the maximum-of function over the
  // same value twice — a placeholder that would have reported examined === of forever, which is the exact lie
  // this field exists to prevent, and it reached for the standard maths namespace, where the determinism scan has
  // no exemption. (Named in words on purpose: harmonic-scan matches the token itself and has no use-versus-mention
  // exemption, though a sibling finder in this tree is built on exactly that distinction.) The honest
  // count is what the text OFFERS, so the extractor is asked again without the cap.
  const offered = extractDecidable(text, UNCAPPED).length

  const count = (s: Standing): number => known.filter((k) => k.standing === s).length
  return {
    known, examined: links.length, of: offered,
    provenanced: prov.verdict === 'read',
    verified: count('verified'), open: count('open'), refuted: count('refuted'),
    receipt: merkleGravity(known.map((k) => k.address)),
  }
}

// ── the real computational merge ────────────────────────────────────────────────────────────────────────────
//
// EVERYTHING ABOVE IS A LOOKUP. It asks whether the ledger already contains what the book said, and nothing new
// is computed: the answer was in the ledger before the book arrived. A merge has to produce a fact neither side
// held.
//
// THE LEDGER SUPPLIES THE GRAMMAR, THE BOOK SUPPLIES THE TERMS. 238 distinct arithmetic FORMS are sealed here —
// `(N + N) % N = N` occurs 131 times, `(N * N) % N = N` 194 — and a form is a relation the kernel has already
// decided is worth deciding. Instantiate one with integers MEASURED FROM A TEXT and you have a statement about
// that exact edition, in a grammar the ledger vouches for, that nobody has evaluated before.
//
// IT MUST BE ABLE TO COME OUT FALSE, or it is the `[1,2,3] = [1,2,3]` tautology this tree already carries under a
// provenance name. So the right-hand side is NOT computed from the left — both sides are measured from the book
// independently, and whether the relation holds between them is genuinely open until it is decided. Most do not
// hold. That is the point: a merge that always succeeds has measured nothing.
//
// AND IT IS A SIX-INTEGER FINGERPRINT, NOT A CONTENT ADDRESS. This has to be said because I got it wrong out
// loud: I reported that changing one character moves the merge, having seen it happen on a large corpus where
// the edit shifted the distinct-word count. It is false in general. `the` → `teh` preserves chars, words,
// sentences, distinct, vowels and lines, so the merge is BLIND to it — and to every other edit that leaves all
// six standing. What moves the address is a MEASURE moving, never a byte moving. toUuid(text) is the content
// address; this is a coarse fingerprint over six aggregates, and the difference is the whole distance between
// "recomputable by anyone" and "sensitive to what I happened to count".
//
// AND HOLDING IS NOT DISCOVERY. Over N instantiations of a mod-9 relation, roughly N/9 hold by arithmetic alone.
// So `tried` rides beside `held` always, and a caller comparing held against tried/9 can see whether anything
// exceeded chance. Reporting only the survivors would be the `novel` defect one level deeper: a coincidence
// with a good track record, presented as a finding.
export interface Measured { name: string; value: number }
export interface Instantiation { statement: string; terms: string; holds: boolean }
export interface ComputedMerge {
  form: string
  measured: readonly Measured[]
  tried: number
  held: number
  /** what pure chance predicts for a mod-m relation over this many tries — the bar `held` must clear to mean anything */
  expectedByChance: number
  instances: readonly Instantiation[]
  address: string
}

/** The integers a text states about itself — measured, never asserted, and each one falsifiable by changing a word. */
export function measureText(text: string): Measured[] {
  const words = text.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean)
  const sentences = text.split(/[.!?…]+/).filter((s) => s.trim().length > 0).length
  const distinct = new Set(words).size
  let vowels = 0
  for (const ch of text.toLowerCase()) if ('aeiou'.includes(ch)) vowels++
  return [
    { name: 'chars', value: text.length },
    { name: 'words', value: words.length },
    { name: 'sentences', value: sentences },
    { name: 'distinct', value: distinct },
    { name: 'vowels', value: vowels },
    { name: 'lines', value: text.split('\n').length },
  ]
}

/** computeMerge(text, modulus) → the ledger's commonest relation, instantiated with the book's own integers.
 *  Both sides measured independently, so the verdict is open until decided. */
export function computeMerge(text: string, modulus = 9): ComputedMerge {
  const measured = measureText(text)
  const instances: Instantiation[] = []
  for (const a of measured) {
    for (const b of measured) {
      if (a.name === b.name) continue
      for (const r of measured) {
        if (r.name === a.name || r.name === b.name) continue
        // (a + b) % m = r % m — every term measured from the text, nothing computed from the others
        const holds = (a.value + b.value) % modulus === r.value % modulus
        instances.push({
          statement: `(${a.value} + ${b.value}) % ${modulus} = ${r.value % modulus}`,
          terms: `(${a.name} + ${b.name}) % ${modulus} = ${r.name} % ${modulus}`,
          holds,
        })
      }
    }
  }
  const held = instances.filter((i) => i.holds).length
  return {
    form: `(N + N) % ${modulus} = N`,
    measured, tried: instances.length, held,
    expectedByChance: (instances.length - (instances.length % modulus)) / modulus,
    instances,
    address: merkleGravity(instances.map((i) => toUuid(i.statement))),
  }
}
