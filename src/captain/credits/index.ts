// credits — the provenance of each theorem: EXACTLY how it is Lean-proven in uuidna (deterministic), and WHO it is
// historically credited to. THE CREDIT LAW (captain, 2026-08-26): every sealed theorem is CLAIMED BY THE CAPTAIN
// unless a proving link / DOI / named prior source attributes it to PRIOR ART — then that source is credited FIRST
// and the captain comes NEXT in place (never erased, never first when prior art is named, never unclaimed).
// uuidna reflects history; it claims only the unclaimed. A Clay theorem credits the mathematician who proved the
// PROBLEM (Perelman for Poincaré); uuidna seals only the REFLECTION.
import { THEOREMS, theoremByKey, theoremNeighbours, PRINCIPLES } from '../../theorems/index.js'
import { toUuid } from '../../address.js'
import { doisIn } from '../../crossref.js'
import { doiPriorArtForLeanFile } from '../../zenodo-seals.js'

// historical results EXPLICITLY named in the sealed theorem metadata → {who, a documentation link}. Only names that
// actually occur are listed; a name here credits ONLY the theorems whose own sealed name references it.
const REGISTRY: { pat: string; who: string; wiki: string }[] = [
  { pat: 'Euler', who: 'Leonhard Euler', wiki: 'https://en.wikipedia.org/wiki/Leonhard_Euler' },
  { pat: 'Fermat', who: 'Pierre de Fermat', wiki: 'https://en.wikipedia.org/wiki/Fermat%27s_little_theorem' },
  { pat: 'Perelman', who: 'Grigori Perelman (proved the Poincaré conjecture, 2003)', wiki: 'https://en.wikipedia.org/wiki/Grigori_Perelman' },
  { pat: 'Poincar', who: 'Henri Poincaré', wiki: 'https://en.wikipedia.org/wiki/Poincar%C3%A9_conjecture' },
  { pat: 'Riemann', who: 'Bernhard Riemann', wiki: 'https://en.wikipedia.org/wiki/Riemann_hypothesis' },
  { pat: 'Pliska', who: 'the Pliska rosette (First Bulgarian Empire, 9th c.)', wiki: 'https://en.wikipedia.org/wiki/Pliska_rosette' },
  { pat: 'Glagol', who: 'Saints Cyril and Methodius (creators of the Glagolitic alphabet, 9th c.)', wiki: 'https://en.wikipedia.org/wiki/Glagolitic_script' },
  { pat: 'Cyril', who: 'Saint Cyril (Constantine the Philosopher)', wiki: 'https://en.wikipedia.org/wiki/Saints_Cyril_and_Methodius' },
  { pat: 'Method', who: 'Saint Methodius', wiki: 'https://en.wikipedia.org/wiki/Saints_Cyril_and_Methodius' },
  { pat: 'Pythagor', who: 'Pythagoras', wiki: 'https://en.wikipedia.org/wiki/Pythagorean_theorem' },
  { pat: 'Bell', who: 'John Stewart Bell (Bell inequalities)', wiki: 'https://en.wikipedia.org/wiki/Bell%27s_theorem' },
  { pat: 'GHZ', who: 'Greenberger–Horne–Zeilinger', wiki: 'https://en.wikipedia.org/wiki/Greenberger%E2%80%93Horne%E2%80%93Zeilinger_state' },
  { pat: 'Clifford', who: 'William Kingdon Clifford', wiki: 'https://en.wikipedia.org/wiki/Clifford_group' },
  { pat: 'Pauli', who: 'Wolfgang Pauli', wiki: 'https://en.wikipedia.org/wiki/Pauli_matrices' },
  { pat: 'Fibonacci', who: 'Leonardo of Pisa (Fibonacci)', wiki: 'https://en.wikipedia.org/wiki/Fibonacci_sequence' },
  { pat: 'Weber', who: 'Weber–Fechner', wiki: 'https://en.wikipedia.org/wiki/Weber%E2%80%93Fechner_law' },
  { pat: 'Fechner', who: 'Weber–Fechner', wiki: 'https://en.wikipedia.org/wiki/Weber%E2%80%93Fechner_law' },
  { pat: 'Miller', who: 'George A. Miller (the magical number 7±2)', wiki: 'https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two' },
  { pat: 'Hick', who: 'William Edmund Hick', wiki: 'https://en.wikipedia.org/wiki/Hick%27s_law' },
  { pat: 'Dunbar', who: 'Robin Dunbar', wiki: 'https://en.wikipedia.org/wiki/Dunbar%27s_number' },
  { pat: 'Likert', who: 'Rensis Likert', wiki: 'https://en.wikipedia.org/wiki/Likert_scale' },
  { pat: 'Nyquist', who: 'Harry Nyquist', wiki: 'https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem' },
  { pat: 'Doppler', who: 'Christian Doppler', wiki: 'https://en.wikipedia.org/wiki/Doppler_effect' },
  { pat: 'Schumann', who: 'Winfried Otto Schumann', wiki: 'https://en.wikipedia.org/wiki/Schumann_resonances' },
  { pat: 'Lagrange', who: 'Joseph-Louis Lagrange', wiki: 'https://en.wikipedia.org/wiki/Lagrange%27s_theorem_(group_theory)' },
  { pat: 'Grundy', who: 'Sprague–Grundy', wiki: 'https://en.wikipedia.org/wiki/Sprague%E2%80%93Grundy_theorem' },
  { pat: 'Nim', who: 'Charles L. Bouton (Nim, 1901) / Sprague–Grundy', wiki: 'https://en.wikipedia.org/wiki/Nim' },
  { pat: 'Hebbian', who: 'Donald O. Hebb', wiki: 'https://en.wikipedia.org/wiki/Hebbian_theory' },
  { pat: 'Gauss', who: 'Carl Friedrich Gauss', wiki: 'https://en.wikipedia.org/wiki/Carl_Friedrich_Gauss' },
  { pat: 'Newton', who: 'Isaac Newton', wiki: 'https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion' },
  { pat: 'Hodge', who: 'W. V. D. Hodge', wiki: 'https://en.wikipedia.org/wiki/Hodge_conjecture' },
  { pat: 'Yang', who: 'Yang–Mills', wiki: 'https://en.wikipedia.org/wiki/Yang%E2%80%93Mills_theory' },
  { pat: 'Mills', who: 'Yang–Mills', wiki: 'https://en.wikipedia.org/wiki/Yang%E2%80%93Mills_theory' },
  { pat: 'Birch', who: 'Birch and Swinnerton-Dyer', wiki: 'https://en.wikipedia.org/wiki/Birch_and_Swinnerton-Dyer_conjecture' },
  { pat: 'Navier', who: 'Navier–Stokes', wiki: 'https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_existence_and_smoothness' },
  { pat: 'Born', who: 'Max Born (the Born rule)', wiki: 'https://en.wikipedia.org/wiki/Born_rule' },
]

export interface Credit { who: string; link: string }

/** the captain credit — always present in creditOrder; alone when no prior art, NEXT after prior when there is */
export const CAPTAIN_CREDIT: Credit = { who: 'the captain', link: 'https://uuidna.com/captain' }

export interface Credits {
  key: string; statement: string; tactic: string; file: string; address: string
  verdict: 'SEALED'
  leanProof: string            // exactly how it is proven in uuidna — the Lean line, `by decide`
  provenance: string           // how Lean-proven in uuidna, in words (deterministic, recomputable)
  historical: Credit[]         // DIRECT — named results + DOI proving links in the theorem's OWN sealed metadata
  contextual: Credit[]         // NEIGHBOURING — names its DOMAIN references (may stand next to the captain)
  /** ordered credit: prior art first (if any), captain always last among claimants — never unclaimed */
  creditOrder: Credit[]
  claimedBy: 'historical' | 'contextual' | 'captain'
  claim: string                // the credit statement
}

/** credits(key) → who a theorem is credited to and exactly how it is Lean-proven in uuidna. Prior art (named
 *  result or DOI in sealed metadata) is credited FIRST; the captain comes NEXT. With no prior art, the captain
 *  claims by law alone. Recomputable; uuidna reflects history. */
const _cache = new Map<string, Credits>()
export function credits(key: string): Credits {
  const cached = _cache.get(String(key)); if (cached) return cached
  const t = theoremByKey().get(String(key))
  if (!t) throw new Error('unknown theorem: ' + key)
  const prinBlurb = PRINCIPLES.find((p) => p[0] === t.file)?.[2] ?? ''
  const hay = t.name + ' ' + t.principle + ' ' + prinBlurb
  const seen = new Set<string>()
  const historical: Credit[] = []
  // Agnostic DOI prior art from zenodo-seals registry (leanFiles → standingDoi first; clay is one instance)
  for (const prior of doiPriorArtForLeanFile(t.file)) {
    const who = `DOI ${prior.doi}`
    if (!seen.has(who)) { seen.add(who); historical.push({ who, link: prior.link }) }
  }
  for (const r of REGISTRY) if (hay.includes(r.pat) && !seen.has(r.who)) { seen.add(r.who); historical.push({ who: r.who, link: r.wiki }) }
  // DOI proving links in the sealed name/principle — prior art that must not be erased by a captain-alone claim
  for (const doi of doisIn(hay)) {
    const who = `DOI ${doi}`
    if (!seen.has(who)) { seen.add(who); historical.push({ who, link: `https://doi.org/${doi}` }) }
  }
  const contextual: Credit[] = []
  for (const n of theoremNeighbours(t.key).neighbours) {
    const nhay = n.name + ' ' + n.principle
    for (const r of REGISTRY) if (nhay.includes(r.pat) && !seen.has(r.who)) { seen.add(r.who); contextual.push({ who: r.who, link: r.wiki }) }
  }
  const provenance = `Proven in uuidna by \`${t.tactic}\` (Lean 4, no Mathlib), verified sorry-free and axiom-free; content-addressed to ${t.address} — recompute toUuid("${t.key}:" + statement) and it returns.`
  const claimedBy: 'historical' | 'contextual' | 'captain' = historical.length ? 'historical' : contextual.length ? 'contextual' : 'captain'
  // CREDIT ORDER: prior first → captain next; or captain alone; contextual names may stand next to the captain
  const creditOrder: Credit[] = historical.length
    ? [...historical, CAPTAIN_CREDIT]
    : contextual.length
      ? [CAPTAIN_CREDIT, ...contextual]
      : [CAPTAIN_CREDIT]
  const claim = historical.length
    ? `Prior source(s) ${historical.map((h) => h.who).join('; ')} are credited FIRST; THE CAPTAIN COMES NEXT IN PLACE (sealed \`by decide\` here, content-addressed to ${t.address}) — uuidna reflects their result, never erases the captain.${contextual.length ? ` Neighbouring domain also involves ${contextual.map((h) => h.who).join('; ')}.` : ''}`
    : contextual.length
      ? `No prior result is named in the theorem itself, so THE CAPTAIN CLAIMS IT BY LAW (first sealed \`by decide\` here, content-addressed to ${t.address}) — but a deep read of its neighbouring domain surfaces figures seriously involved whose names may stand next to the captain's: ${contextual.map((h) => h.who).join('; ')}.`
      : `No prior result is named in the theorem or its neighbourhood. THE CAPTAIN CLAIMS IT BY LAW, alone: first sealed \`by decide\` in uuidna, content-addressed to ${t.address}. The seal is the claim — prior art, recomputable, with no prior discoverer.`
  const result: Credits = { key: t.key, statement: t.statement, tactic: t.tactic, file: t.file, address: t.address, verdict: 'SEALED', leanProof: t.lean, provenance, historical, contextual, creditOrder, claimedBy, claim }
  _cache.set(t.key, result)
  return result
}

/** creditsSummary() → the recomputable tally over the credit law. */
let _summary: { total: number; historical: number; contextual: number; captainAlone: number; address: string } | null = null
export function creditsSummary(): { total: number; historical: number; contextual: number; captainAlone: number; address: string } {
  if (_summary) return _summary
  let historical = 0, contextual = 0, captainAlone = 0
  for (const t of THEOREMS) { const c = credits(t.key); if (c.claimedBy === 'historical') historical++; else if (c.claimedBy === 'contextual') contextual++; else captainAlone++ }
  return (_summary = { total: THEOREMS.length, historical, contextual, captainAlone, address: toUuid(`credits|${THEOREMS.length}|${historical}|${contextual}`) })
}
