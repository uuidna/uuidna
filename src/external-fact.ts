// external-fact — WHICH THEOREMS CLAIM SOMETHING ABOUT THE WORLD, measured by instruments that fail differently.
//
// THE INVOLUTE OF THE PRIOR-ART SWEEP. Asking the literature about every sealed row does not work and cannot be
// made to work: measured across four indexes, the claim sentence retrieves n=0, and the only queries that find
// the known DOIs are the target papers' own titles (src/scripts/prior-art-retrieval.test.ts). So stop asking the
// world about every row and ask which rows make a claim ABOUT the world. That question is offline, complete over
// the ledger, and decidable here.
//
// WHY THREE ARMS AND NOT A BETTER ONE. The incumbent instrument, rosetta's WITNESS, is a hand-maintained list of
// about twenty proper nouns plus a DOI pattern — and `claimedBy()` calls the SAME regex, so the witness leg and
// the attribution census are ONE predicate at two call sites and cannot disagree by construction. Their matching
// counts of 16 read as corroboration and were a single measurement twice. A longer list is the identical trap
// one turn later: a list is blind to every field nobody enumerated, and nothing in this tree refuses a longer
// one.
//
// So the arms are chosen to be blind in DIFFERENT directions, which is the only property that buys anything:
//
//   NAMED     an enumerated originator      blind to fields nobody listed
//   EPONYM    possessive/attributive grammar before a law-word, enumerating NO surnames
//                                           blind to a fact named without eponym grammar
//   UNITS     a measured quantity with a real-world unit or a named standard
//                                           blind to a fact stated dimensionlessly
//
// None is complete and the union is not either. That is stated rather than hidden: the output is a FLOOR with
// the instrument named, the same shape as the sweep's `notFoundByTheseQueries`. What the arms buy is the
// DISAGREEMENT — rows one finds and another misses measure how far all of them are from the truth, and a row
// every arm agrees on is the strongest evidence available without a human reading it. (The eponym shape is
// uuidna-49's, contributed as material; the rule lives here so there is one trust base and not two.)
//
// PURE: rows in, verdicts out. No filesystem, no network — a test can hand it a crafted ledger.

export type Arm = 'named' | 'eponym' | 'units'

export interface Verdict { key: string; arms: Arm[]; evidence: string }

/** Originators this file has been told about. A FLOOR, never a definition — see the header on why the cure for a
 *  short list is not a long one. Kept small and honest rather than grown: growth here buys rows and hides the
 *  blindness that makes the other two arms necessary. */
const NAMED = /\b(Maxwell|Chargaff|Kepler|Avogadro|Planck|Euler|Fibonacci|Gauss|Fourier|Newton|Boltzmann|Shannon|Turing|Nyquist|Hamming|Bayes|Markov|Pascal|Archimedes|Mendel|Darwin|Watson|Crick|Nirenberg|Faraday|Ohm|Hooke|Bernoulli|Doppler|Coriolis|Riemann|Noether|Galois|Fermat|Lagrange|Laplace|Poisson|Dirac|Bohr|Nernst|Arrhenius|Gibbs|Carnot|Joule|Kelvin|Celsius|Snell|Boyle|Dalton|Charles|Coulomb|Hasse|Post|Singleton|Naismith|Mertens|Bouton|Josephson|Shafranov|Cassini|Hick)\b/

/** A law-word: the noun an eponym attaches to when a person's name becomes a fact's name. */
const LAW_WORD = '(?:law|theorem|rule|principle|limit|constant|identity|criterion|equation|bound|inequality|sieve|efficiency|paradox|transform|lemma|conjecture|scale|number|series|effect|hypothesis|postulate)'

/** THE SHAPE, NOT THE NAME. A capitalised token in possessive ("Snell's law") or attributive ("the Hasse bound")
 *  position before a law-word. It enumerates no surnames, so unlike NAMED it cannot be blind to a field nobody
 *  thought of — and unlike NAMED it IS blind to a fact named without this grammar, "Fermat" beside a prime claim
 *  with no "theorem" after it. The two blindnesses are independent, which is the whole point of having both. */
// Up to two lowercase words may sit between the name and the law-word — "Kepler's THIRD law", "the Hasse
// UPPER bound". Measured: without this the shape missed every ordinal-qualified eponym, which is most of the
// famous ones. Bounded at two because a longer gap starts matching across clause boundaries.
const EPONYM = new RegExp(`\\b([A-Z][a-z]{2,})(?:'s|’s)?(?:\\s+[a-z]+){0,2}\\s+${LAW_WORD}\\b`, 'g')

/** A claim carrying a real-world unit or a named measurement standard is about the world whoever first said it.
 *  Blind to a fact stated dimensionlessly, which is most of pure mathematics — hence the other two arms. */
const UNITS = /\b(?:\d+\s*)?(?:kelvin|joules?|watts?|volts?|amperes?|ohms?|pascals?|newtons?|hertz|metres?|meters?|kilograms?|seconds?|candela|moles?|degrees? Celsius|°C|K\b|m\/s|kg\b|NIST|CODATA|IUPAC|WGS ?84|ISO ?\d|RFC ?\d|SI\b)\b/

/** Words that make a capitalised token a section heading or this tree's own noun rather than a person. */
const NOT_A_PERSON = /^(The|This|That|These|Those|Every|Each|Any|All|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Gregorian|Julian|Lean|Nat|Int|Bool|List|String|Type|Prop|Set|Coin|Hexbit|Uuid|Address|Handle|Ledger|Wing|Captain|Rosetta|Merkle)$/

/** classify(key, claim) → which arms fire, and on what. An empty `arms` is NOT "internal"; it is "no arm here
 *  fired", which is a different statement and the reason nothing in this module returns a novelty verdict. */
export function classify(key: string, claim: string): Verdict {
  const arms: Arm[] = []
  const evidence: string[] = []
  const named = NAMED.exec(claim)
  if (named) { arms.push('named'); evidence.push(named[0]) }
  for (const m of claim.matchAll(EPONYM)) {
    if (NOT_A_PERSON.test(m[1]!)) continue
    // THE GRAMMAR IS THE EVIDENCE, not the position and not another exclusion list. A name in this role is
    // either POSSESSIVE ("Burnside's lemma") or ATTRIBUTIVE behind an article or preposition ("the Hasse
    // bound", "by Snell's law"). Bare capitalisation is not enough: the arm reported "Stated beside the
    // constant" and "Same honest limit", where every word is capitalised because it opens a sentence.
    // Cutting position zero instead was measured and REFUSED — it killed "Burnside's lemma counts the orbits",
    // a claim that legitimately opens with its eponym, which is the shape this arm exists to catch.
    const at = m.index ?? 0
    const possessive = /['’]s\s/.test(m[0]!)
    const before = claim.slice(0, at).trimEnd()
    const attributive = /\b(the|a|an|by|via|under|from|of|in)$/i.test(before)
    if (!possessive && !attributive) continue
    arms.push('eponym'); evidence.push(m[0]); break
  }
  const unit = UNITS.exec(claim)
  if (unit) { arms.push('units'); evidence.push(unit[0]) }
  return { key, arms: [...new Set(arms)], evidence: [...new Set(evidence)].join(' · ') }
}

/** externalFactGaps(rows, attributed) → rows an arm says are about the world, carrying no attribution.
 *
 *  A FLOOR AND NAMED AS ONE. Every arm is incomplete, so this is "at least these", never "exactly these" — a row
 *  absent from this list has not been shown to be the captain's, only not to have been caught. */
export function externalFactGaps(
  rows: readonly { key: string; name: string }[],
  attributed: ReadonlySet<string>,
): Verdict[] {
  return rows
    .filter((r) => !attributed.has(r.key))
    .map((r) => classify(r.key, r.name))
    .filter((v) => v.arms.length > 0)
    .sort((a, b) => b.arms.length - a.arms.length || a.key.localeCompare(b.key))
}

/** armDisagreement(verdicts) → how far the arms are from each other, which is the only available measure of how
 *  far they all are from the truth. `onlyOneArm` is the count no single instrument could have produced alone. */
export function armDisagreement(verdicts: readonly Verdict[]): {
  byArm: Record<Arm, number>
  allThree: number
  onlyOneArm: number
  soleFinder: Record<Arm, number>
} {
  const byArm = { named: 0, eponym: 0, units: 0 }
  const soleFinder = { named: 0, eponym: 0, units: 0 }
  let allThree = 0, onlyOneArm = 0
  for (const v of verdicts) {
    for (const a of v.arms) byArm[a]++
    if (v.arms.length === 3) allThree++
    if (v.arms.length === 1) { onlyOneArm++; soleFinder[v.arms[0]!]++ }
  }
  return { byArm, allThree, onlyOneArm, soleFinder }
}

/** How good the evidence for a credit is. NOT how true the fact is — how CHECKABLE the attribution is. */
export type Grade =
  | 'identifier'  // a DOI: a stranger can fetch the source and read it
  | 'standard'    // a named body or datum (SI, CODATA, WGS 84, ISO/RFC): findable, not a single citation
  | 'named'       // a person or law named in the claim, with no identifier on file

/** gradeOf(source) → the grade of a credit's evidence.
 *
 *  CREDITED IS NOT ONE THING, and collapsing the grades would be the artefact-over-source fault again: a number
 *  that says "228 credited" invites the reader to assume 228 checkable citations. MEASURED on the rows already
 *  attributed: of 16, exactly FOUR carry a DOI — 10.1038/345229a0, 10.3181/00379727-43-11151,
 *  10.1073/pnas.47.10.1588, 10.1038/171737a0. The other twelve are SI, CODATA, WGS 84, Landauer, Eratosthenes
 *  and Gutenberg: real credits, findable by anyone, but not a citation anyone can fetch.
 *
 *  This lives with the classifier and not in a generator because it is a property of the EVIDENCE, and a second
 *  derivation of it downstream is the two-trust-bases fault this module was built to end. */
export function gradeOf(source: string): Grade {
  if (/^10\.\d{4,9}\//.test(source)) return 'identifier'
  if (/^(SI|CODATA|NIST|IUPAC|WGS ?84|ISO ?\d|RFC ?\d)\b/.test(source)) return 'standard'
  return 'named'
}

/** gradeCensus(sources) → how many credits of each grade, so a total can never be reported without them. */
export function gradeCensus(sources: readonly string[]): Record<Grade, number> {
  const out: Record<Grade, number> = { identifier: 0, standard: 0, named: 0 }
  for (const s of sources) out[gradeOf(s)]++
  return out
}
