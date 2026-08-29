// study — THE INVERTED SURFACE: uuidna serves YOUR research.
//
// The catalogue's self-scoped majority describes uuidna to itself. This module points the other way: the caller
// hands in their notes (a paper, a log, a claim, a fragment of code) and the sealed calculator plus the fused
// search accelerate THAT work. Occupancy counts what the text IS. extractDecidable / decide() verdicts what it
// ASSERTS — true and false wear different labels, in one pass. Fragments the ledger already settled are returned
// as identities you can skip re-deriving. Fragments decide() confirms that the ledger does not name stay OPEN in
// YOUR notes — desk proposes, the kernel does not auto-seal. Resonance is a lookup of related decided arithmetic,
// never a claim that your subject IS uuidna.
//
// Classical throughout: n qubits span 2^n amplitudes (simulation cost, not a physics speedup). The speed here is
// verify-beats-recompute — a sealed identity is O(1) to look up. Meaning is null.
import { toUuid } from './address.js'
import { handleOf } from './handle.js'
import { merkleGravity } from './gravity/index.js'
import { decide } from './decide.js'
import { extractDecidable, extractClaims, type ExtractedFact, type TextClaim } from './books.js'
import { harvestFragments } from './harvest.js'
import { reflects, type Reflected } from './reflects.js'
import { decode, candidates, type Decoding, type StructureFact } from './quantum/apps/categories/books/structure.js'
import { looksLikeSource, scanSource, type SourceScan } from './harmony.js'

const CAP = 12
const RING = 8
const QUERY = 2000

export interface SettledIdentity { fragment: string; key: string; lean: string }
export interface OpenFragment { fragment: string; verdict: string; receipt: string }
export interface StudyError { claim: string; asserted: number; actual: number }

export interface Study {
  address: string
  handle: string
  occupancy: Pick<Decoding, 'chars' | 'words' | 'distinct' | 'richness' | 'ranks' | 'letters' | 'numerals'>
  facts: StructureFact[]
  asserted: { verified: ExtractedFact[]; refuted: ExtractedFact[]; claims: TextClaim[] }
  settled: SettledIdentity[]
  open: OpenFragment[]
  errors: StudyError[]
  rings: Pick<Reflected, 'key' | 'skill' | 'resonance' | 'concept'>[]
  scan: SourceScan | null
  novel: boolean
  meaning: null
  receipt: string
}

const sliceQuery = (s: string): string => (s.length <= QUERY ? s : s.slice(0, QUERY))

/** studyOf(input) → YOUR notes, accelerated. Optional seenAddresses for novelty against YOUR own corpus. */
export function studyOf(input: string, seenAddresses: readonly string[] = [], query?: string): Study {
  const text = String(input)
  const address = toUuid(text)
  const occupancy = decode(text, RING)
  const facts = candidates(occupancy)
  const extracted = extractDecidable(text, CAP)
  const verified = extracted.filter((f) => f.verdict === 'VERIFIED')
  const refuted = extracted.filter((f) => f.verdict === 'REFUTED')
  const errors: StudyError[] = refuted.map((f) => ({ claim: f.claim, asserted: f.asserted, actual: f.actual }))
  const settled: SettledIdentity[] = []
  const open: OpenFragment[] = []
  const seenFrag = new Set<string>()
  for (const fragment of harvestFragments(sliceQuery(text))) {
    if (settled.length + open.length >= CAP) break
    const d = decide(fragment)
    const k = fragment.replace(/\s+/g, '')
    if (seenFrag.has(k)) continue
    seenFrag.add(k)
    if (d.kind === 'sealed-theorem' && d.cites[0]) {
      settled.push({ fragment, key: d.cites[0]!, lean: d.lean[0] ?? '' })
    } else if (d.verdict === 'VERIFIED_BY_DECIDE' && d.kind === 'decided-arithmetic') {
      open.push({ fragment, verdict: d.verdict, receipt: d.receipt })
    } else if (d.verdict === 'REFUTED' && d.kind === 'decided-arithmetic') {
      errors.push({ claim: fragment, asserted: 0, actual: 0 })
    }
  }
  const q = (query ?? text).trim()
  const rings = reflects(sliceQuery(q)).matches.slice(0, RING).map((r) => ({
    key: r.key, skill: r.skill, resonance: r.resonance, concept: r.concept,
  }))
  const scan = looksLikeSource(text) ? scanSource(text) : null
  const receipt = merkleGravity([
    address,
    occupancy.address,
    toUuid(String(verified.length)),
    toUuid(String(refuted.length)),
    toUuid(settled.map((s) => s.key).join(',')),
    toUuid(open.map((o) => o.fragment).join(',')),
    toUuid(rings.map((r) => r.key).join(',')),
  ])
  return {
    address,
    handle: handleOf(address),
    occupancy: {
      chars: occupancy.chars, words: occupancy.words, distinct: occupancy.distinct, richness: occupancy.richness,
      ranks: occupancy.ranks, letters: occupancy.letters.slice(0, RING), numerals: occupancy.numerals.slice(0, RING),
    },
    facts,
    asserted: { verified, refuted, claims: extractClaims(text).slice(0, CAP) },
    settled, open, errors: errors.slice(0, CAP), rings, scan,
    novel: !seenAddresses.includes(address),
    meaning: null,
    receipt,
  }
}
