// vocab — a COMMON, COMPUTABLE, translation-ready vocabulary derived from every theorem and its domain. Each term is
// a concept the ledger already carries (a domain or a capability), its definition drawn from the sealed prose that
// defines it, its content-address recomputed from that text, and its honesty SELF-AUDITED by the same gate the site
// runs — so a term earns its place or is flagged. The terms fold, order-invariant, to ONE recomputable receipt: the
// honest "all is one" — one receipt. It is translation-READY
// term is content-addressed, so a translation binds to THIS term by a provenance receipt (auditTranslation), the same
// way a source binds to its rendering — uuidna proves the pairing.
//
//  (integrity
// and folds to one receipt. It maps each domain to the STANDARDS it formalizes or references (RFC 8439, ISBN/ISO
// 2108, SMPTE, Nyquist–Shannon …) — a citation
// content-address can settle. Efficiency here is MEASURED and recomputable"maximum".
import { theorems, theoremCountByFile, PRINCIPLES, skillGroups } from './theorems/index.js'
import { toUuid, merkleFold } from './address.js'
import { overreachOf } from './prose-gate.js'

/** One vocabulary term — a concept the ledger defines, content-addressed and self-audited. */
export interface Term {
  term: string
  kind: 'domain' | 'capability'
  definition: string      // drawn from the sealed ledger prose (a domain blurb, or the capability's own theorems)
  theorems: number        // how many sealed theorems carry it
  address: string         // content-address of term + definition — recompute it from the same ledger
  audit: string | null    // the honesty gate's verdict on the definition — null is clean, else the drained token
}

/** The standards a domain FORMALIZES or REFERENCES — a citation. Only domains that genuinely
 *  touch a published standard are listed; the rest reference none. */
const STANDARDS: Record<string, string[]> = {
  'Codes.lean': ['Hamming(7,4)', 'Singleton bound (coding theory)'],
  'Identifiers.lean': ['ISBN (ISO 2108)', 'ISSN (ISO 3297)', 'Bookland EAN'],
  'Cipher.lean': ['ChaCha20-Poly1305 (RFC 8439)', 'SHA-256 (FIPS 180-4)', 'PBKDF2 (RFC 8018)'],
  'Editing.lean': ['SMPTE timecode', 'NTSC drop-frame', 'UHD (Rec. 2020)'],
  'Production.lean': ['MIDI 1.0', 'Nyquist–Shannon', '48 kHz (AES)', '12-tone equal temperament'],
  'Calendar.lean': ['Gregorian calendar', 'ISO 8601 (week)'],
  'Typesetting.lean': ['point–pica system', 'the folded signature'],
  'Quantum.lean': ['the Clifford gate set'],
  'Navigation.lean': ['the 60 nautical-mile degree'],
}

const blurbByFile = Object.fromEntries(PRINCIPLES.map((p) => [p[0], p[2]]))
const titleByFile = Object.fromEntries(PRINCIPLES.map((p) => [p[0], p[1]]))

export interface Vocabulary {
  terms: Term[]
  count: number
  clean: number             // terms whose definition passes the honesty gate
  flagged: Term[]           // terms whose definition overreaches (should be none — the ledger prose is gate-clean)
  trinities: number         // the terms grouped in threes — the trinity fold below
  trinityRoots: string[]    // each trinity of terms folded to a receipt (the last may hold 1–3)
  receipt: string           // ALL terms folded, order-invariant, to ONE receipt — the honest "all is one"
  standards: Record<string, string[]>
  honest: string
}

/** vocabulary() → the common computable vocabulary of uuidna, self-audited and folded to one receipt. Deterministic:
 *  same ledger → same terms, same addresses, same receipt, recomputable by anyone. */
export function vocabulary(): Vocabulary {
  const countByFile = theoremCountByFile() // the shared core index — DRY: count-by-file computed once
  // domain terms — one per principle that has theorems, defined by its committed blurb (gate-clean by construction).
  const files = PRINCIPLES.map((p) => p[0]).filter((f) => countByFile.has(f))
  const domainTerms: Term[] = files.map((f) => {
    const definition = blurbByFile[f] || ''
    const term = (titleByFile[f] || f).replace(/^The /, '')
    return { term, kind: 'domain', definition, theorems: countByFile.get(f) ?? 0,
      address: toUuid(term + ':' + definition), audit: overreachOf(definition) }
  })
  // capability terms — one per skill, defined factually from its own theorems (no hand-prose to overreach).
  const capabilityTerms: Term[] = skillGroups().map((g) => {
    const domains = new Set(g.theorems.map((t) => t.file)).size
    const definition = `the ${g.skill} capability — ${g.count} sealed theorems across ${domains} domain(s), each proven by decide`
    return { term: g.skill, kind: 'capability', definition, theorems: g.count,
      address: toUuid(g.skill + ':' + definition), audit: overreachOf(definition) }
  })
  const terms = [...domainTerms, ...capabilityTerms]
  // the TRINITY fold — terms grouped in threes, each trinity folded, then the trinities folded to one root. Honours
  // the trinity (ℤ/3) as a real fold structure, and lands on the same order-invariant receipt as folding all at once.
  const trinityRoots: string[] = []
  for (let i = 0; i < terms.length; i += 3) trinityRoots.push(merkleFold(terms.slice(i, i + 3).map((t) => t.address)))
  return {
    terms,
    count: terms.length,
    clean: terms.filter((t) => t.audit === null).length,
    flagged: terms.filter((t) => t.audit !== null),
    trinities: trinityRoots.length,
    trinityRoots,
    receipt: merkleFold(terms.map((t) => t.address)),
    standards: STANDARDS,
    honest:
      'Each term is defined by the sealed ledger, self-audited by the honesty gate, and content-addressed; all terms ' +
      'fold to ONE recomputable receipt — one receipt, integrity. Standards are cited, ' +
      'never claimed as compliance. Translation-ready: a translation binds to a term by a provenance receipt, which ' +
      'proves the pairing. Efficiency is measured and recomputable. Integrity.',
  }
}
