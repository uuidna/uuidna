// research — deep-research with the REVERSIBLE imprint codec: PRESS external research into a uuid chain and
// DECOMPRESS it back LOSSLESSLY (the round-trip proves it), bind the pressed pieces to the computable ENTANGLED
// algebra (the order-invariant merkle-gravity fold), and report NOVELTY as content-address uniqueness — a never-seen
// address is novel CONTENT. HONEST SCOPE, stated first because it is the whole point: uuidna fingerprints STRUCTURE
// and NOVELTY, it does NOT extract MEANING — "decode is provenance + structure, never hidden meaning" (books.ts).
// Novelty is DECIDABLE (a new content-address); MEANING is human/semantic and is left to the reader — `meaning` is
// null by design. Integrity, not truth.
import { toUuid } from './address.js'
import { imprintTextChain, readImprintTextChain } from './imprint.js'
import { merkleGravity } from './gravity.js'
import { reflects, type Reflected } from './reflects.js'

export interface DeepResearch {
  address: string            // the content-address (fingerprint) of the research text
  compressed: string[]       // the imprint uuid chain — the research PRESSED (reversible)
  losslessRoundTrip: boolean // DECOMPRESS returns the exact input — the codec is reversible, nothing lost
  entangledReceipt: string   // the order-invariant fold binding the pressed pieces — the computable entangled algebra
  novel: boolean             // is the content-address NEW (not among the seen ones)? novelty = never-seen content
  meaning: null              // uuidna does NOT extract meaning — always null, by design
  relatedMath: Reflected[]   // the NULL-HOOK: the sealed theorems the prose REFLECTS — R&D from related MATH, not meaning
  develop: string[]          // when meaning is null, the develop path — research the related math (never a dead end)
  honest: string
}

const HONEST =
  'Deep research pressed and decompressed with the REVERSIBLE imprint codec (the round-trip returns the exact input), ' +
  'bound to the computable ENTANGLED algebra (the order-invariant fold), with NOVELTY reported as content-address ' +
  'uniqueness — a never-seen address is novel CONTENT. HONEST SCOPE: uuidna fingerprints STRUCTURE and NOVELTY, it ' +
  'does NOT extract MEANING — provenance + structure, never hidden meaning. Novelty is decidable (a new address); ' +
  'meaning is the reader\'s — `meaning` is null by design. Integrity, not truth.'

/** deepResearch(text, seenAddresses) → PRESS the research into a reversible uuid chain, bind the pieces to the
 *  entangled algebra (order-invariant fold), and report NOVELTY (a content-address not among the seen ones). It does
 *  NOT extract MEANING — provenance + structure + novelty only; meaning is left to the reader. */
export function deepResearch(text: string, seenAddresses: readonly string[] = []): DeepResearch {
  const address = toUuid(text)
  const compressed = imprintTextChain(text)
  const losslessRoundTrip = readImprintTextChain(compressed) === text
  const entangledReceipt = merkleGravity(compressed)
  const novel = !seenAddresses.includes(address)
  // the NULL-HOOK: meaning is null, so instead of a dead end, reflect the prose onto the SEALED MATH it touches and
  // hand back a develop path — R&D from the related math, never from a meaning uuidna cannot extract. Capped to a
  // meaningful few: the reflect matcher is a concept-word overlap (a floor, not semantic ranking), so a loose query
  // can touch most of the ledger — the cap keeps the hook a lead, not a firehose.
  const relatedMath = reflects(text).matches.slice(0, 8)
  const develop = relatedMath.length
    ? [
        'Meaning is null (uuidna extracts none). HOOK to the related SEALED math the prose reflects — develop from these:',
        ...relatedMath.slice(0, 6).map((r) => `  • /theorem/${r.key} — ${r.title} (${r.principle})`),
        'Develop: cite these, or seal a NEW `by decide` theorem the prose reflects — the meaning is the reader\'s, the math is uuidna\'s.',
      ]
    : ['Meaning is null and the prose reflects NO sealed theorem yet — the frontier. Develop: name the finite structure it lives in (ℤ/9, a truth table, a finite group) and seal it `by decide`.']
  return { address, compressed, losslessRoundTrip, entangledReceipt, novel, meaning: null, relatedMath, develop, honest: HONEST }
}
