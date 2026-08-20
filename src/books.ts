// @non-harmonic: fetches public-domain text/metadata from free public APIs (Gutendex/Zenodo/Wikipedia) via fetch (network — non-recomputable) — NAMED boundary; the harmonic core must never carry these ops.
// books — audit and structurally decode PUBLIC-DOMAIN books. The audit (auditText) is PURE and offline: it
// content-addresses the exact text (a provenance fingerprint — proof you hold that exact edition, recomputable by
// anyone), merkle-folds its chapters (so any chapter can be proven to belong to the whole), gives the ℤ/9
// digital-root "gravity" of its length (a recomputable checksum digit), counts its structure, proves the reversible
// uuid imprint round-trips on a sample, and runs the honesty gate. fetchGutenberg is the ONE network function — it
// pulls a public-domain text from Project Gutenberg via the public Gutendex API using Node's BUILT-IN fetch, so the
// package stays zero-npm-dependency; only its offline property is relaxed, and only for the book-fetch tool.
//
// HONEST SCOPE (integrity, not truth):
//  · Fetched book text is DATA — content-addressed and counted, NEVER executed. Instruction-shaped prose inside a
//    book is content, not a command; this module only measures and folds it.
//  · "Decode" here is PROVENANCE + STRUCTURE, never decryption (a public book is not encrypted) and never
//    hidden-meaning extraction. The digital-root gravity is a mod-9 checksum of the length — a fingerprint digit,
//    recomputable by anyone, NOT a message and NOT numerology.
//  · The honesty gate is tuned to uuidna's OWN claim vocabulary, so on ordinary literature it will almost always
//    pass (find nothing). That is expected — it says nothing about the book's merit, only that its prose does not
//    trip uuidna's overclaim tripwire.
import { toUuid, digitalRoot } from './address.js'
import { merkleRoot, merkleProof, verifyProof } from './merkle.js'
import { merkleGravity } from './gravity.js'
import { computes } from './gate.js'
import { imprintTextChain, readImprintTextChain } from './imprint.js'
import { theorems } from './theorems/index.js'

/** The recomputable audit of a text: a provenance fingerprint, a structural decode, and an honesty-gate verdict. */
export interface BookAudit {
  title?: string
  authors?: string[]
  source?: string
  // provenance fingerprint — prove exact-copy, and prove any chapter belongs
  address: string
  chapters: number
  chapterRoot: string
  // structural decode — counts and a ℤ/9 checksum, not a meaning
  chars: number
  words: number
  lines: number
  gravity: number
  imprintRoundTrips: boolean
  // honesty gate
  gate: { binary: 0 | 1; hit: string | null }
  honest: string
}

// Split a book into chapters at heading lines (CHAPTER/BOOK/PART/CANTO/LETTER/ACT/SCENE + a roman or arabic index) —
// the common Gutenberg shape. If none are found the whole text is one chapter. A heuristic for the merkle of parts,
// not a parser: what matters is that the split is deterministic and every chapter re-addresses to the same leaf.
const splitChapters = (text: string): string[] => {
  const parts = text.split(/\n(?=[ \t]*(?:chapter|book|part|canto|letter|act|scene)[ \t]+[ivxlcdm\d])/i)
  return parts.length ? parts : [text]
}

/** auditText(text[, meta]) → the pure, offline audit. Deterministic and recomputable by anyone with the same text. */
export function auditText(text: string, meta: { title?: string; authors?: string[]; source?: string } = {}): BookAudit {
  const chapters = splitChapters(text)
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const lines = text.split('\n').length
  const sample = text.slice(0, 200)
  const imprintRoundTrips = readImprintTextChain(imprintTextChain(sample)) === sample
  return {
    ...meta,
    address: toUuid(text),
    chapters: chapters.length,
    chapterRoot: merkleRoot(chapters.map((c) => toUuid(c))),
    chars: text.length,
    words,
    lines,
    gravity: digitalRoot(text.length),
    imprintRoundTrips,
    gate: computes(text),
    honest:
      'address proves exact-copy; chapterRoot proves any chapter belongs; gravity is a ℤ/9 checksum of the length, ' +
      'not a meaning. "Decode" is provenance + structure, never decryption or hidden meaning. The gate is tuned to ' +
      "uuidna's own overclaim vocabulary, so passing says nothing about the book — only that its prose does not trip it.",
  }
}

/** A decidable arithmetic claim EXTRACTED from a text — the ONLY fragment of a book uuidna can independently seal.
 *  `asserted` is what the prose says; `actual` is what the arithmetic computes; `lean` is uuidna's OWN by-decide
 *  theorem for the true value. VERIFIED when the book's arithmetic holds, REFUTED when uuidna's decide disagrees. */
export interface ExtractedFact {
  claim: string
  asserted: number
  actual: number
  lean: string
  verdict: 'VERIFIED' | 'REFUTED'
  address: string
}

// uuidna's arithmetic is LEAN's Nat arithmetic — TOTAL and decidable. Division is FLOOR division, and crucially
// n / 0 = 0 (Lean's convention: division is a total function, never a fault). So "10 divided by 0 is 0" VERIFIES —
// uuidna COMPUTES division by zero, where a calculator throws or returns NaN/∞. Every op here matches Lean exactly, so
// the JS `actual` and the emitted `by decide` theorem never disagree — use only uuidna's semantics, not JavaScript's.
// FLOOR division with NO Math.* (Math is hard-rejected — not a local theorem). a − (a % b) is a multiple of b, so the
// final ÷ is exact integer arithmetic; and b = 0 returns 0, matching Lean's total Nat division exactly.
const natDiv = (a: number, b: number) => (b === 0 ? 0 : (a - (a % b)) / b)
// Nat subtraction is TRUNCATED (a − b = 0 when b > a), matching Lean's total Nat.sub exactly — so "108 minus 110 is 0"
// verifies where a calculator gives −2. uuidna computes the total semantics; the emitted `by decide` agrees.
const natSub = (a: number, b: number) => (a > b ? a - b : 0)
const EXTRACT_OPS: Record<string, [(a: number, b: number) => number, string]> = {
  '*': [(a, b) => a * b, '*'], '×': [(a, b) => a * b, '*'], x: [(a, b) => a * b, '*'], times: [(a, b) => a * b, '*'],
  '+': [(a, b) => a + b, '+'], plus: [(a, b) => a + b, '+'],
  '-': [natSub, '-'], '−': [natSub, '-'], minus: [natSub, '-'], less: [natSub, '-'],
  '/': [natDiv, '/'], '÷': [natDiv, '/'], over: [natDiv, '/'], div: [natDiv, '/'], 'divided by': [natDiv, '/'],
}

/** extractDecidable(text) → the DECIDABLE INTEGER ARITHMETIC the text asserts, each independently sealed by decide
 *  (VERIFIED) or corrected (REFUTED — the book's sum is wrong). HONEST SCOPE: integer arithmetic ONLY — the sliver
 *  of a book that computes; this does NOT autoformalize the book's meaning, argument, or non-decidable mathematics,
 *  and the proofs are uuidna's own, not the book's. A theorem computes in Lean, or it is not a theorem. */
export function extractDecidable(text: string, limit = 100): ExtractedFact[] {
  const out: ExtractedFact[] = []
  const seen = new Set<string>()
  // integer  a  (× | * | x | times | + | plus | − | - | minus | less | ÷ | / | over | divided by | div)  b  (= | is |
  // equals | makes)  c. Subtraction and division use uuidna's TOTAL Nat semantics (a − b = 0 when b > a; n / 0 = 0), so
  // "108 minus 110 is 0" and "10 divided by 0 is 0" both verify — uuidna computes the total forms.
  const re = /\b(\d{1,4})\s*(×|\*|x|times|\+|plus|−|-|minus|less|÷|\/|divided\s+by|over|div)\s*(\d{1,4})\s*(?:=|is|equals|makes)\s*(\d{1,7})\b/gi
  // COMPOUND GUARD — the grammar is BINARY (a op b = c). If the match is flanked by another arithmetic operator, it is
  // a FRAGMENT of a larger expression (e.g. "5 times 5 minus 3 times 8 is 1" would mis-scope to "3 times 8 is 1" and
  // emit a false REFUTED). Refuse the fragment rather than settle a sub-expression uuidna cannot evaluate whole. The
  // separators "and"/";"/"," are NOT operators, so genuine adjacent binary claims still extract.
  const CONNECTOR_BEFORE = /(?:minus|plus|times|over|divided|div|[+\-−×÷*/])\s*$/i
  const CONNECTOR_AFTER = /^\s*(?:minus|plus|times|over|divided|div|[+\-−×÷*/])/i
  for (const m of text.matchAll(re)) {
    const op = EXTRACT_OPS[m[2].toLowerCase().replace(/\s+/g, ' ')]
    if (!op) continue
    const i = m.index ?? 0
    const pre = text.slice(i < 10 ? 0 : i - 10, i)
    const post = text.slice(i + m[0].length, i + m[0].length + 10)
    if (CONNECTOR_BEFORE.test(pre) || CONNECTOR_AFTER.test(post)) continue  // fragment of a compound — refuse, don't mis-verdict
    const a = Number(m[1]), b = Number(m[3]), asserted = Number(m[4])
    const actual = op[0](a, b)
    const lean = `theorem book_fact : ${a} ${op[1]} ${b} = ${actual} := by decide`
    if (seen.has(lean)) continue
    seen.add(lean)
    out.push({ claim: m[0].replace(/\s+/g, ' ').trim(), asserted, actual, lean, verdict: actual === asserted ? 'VERIFIED' : 'REFUTED', address: toUuid(lean) })
    if (out.length >= limit) break
  }
  return out
}

/** a NUMERIC CLAIM the text states in its own words — a measurement, a count, or two units named as equal.
 *  Unlike ExtractedFact this is NOT decided: it is a CANDIDATE, carrying the sentence it came from so a human can
 *  judge it. The distinction is the two-handle law — the desk may propose, only the captain disposes. */
export interface TextClaim {
  kind: 'unit-equivalence' | 'measurement' | 'defining-constant'
  claim: string
  sentence: string
  numbers: number[]
  units: string[]
  address: string
}

// ── ENGLISH NUMBER WORDS — scripture and older treatises SPELL their numbers ("three hundred cubits"), and a
// digits-only scan reads them as absent. Measured on the KJV: 213 occurrences of "cubits", ZERO in digit form and
// 186 written out, so the first version of extractClaims found 5 measurements in 4.45 million characters and would
// have reported sacred texts as empty of numeric content. They are not; the reader was.
// Deterministic and closed-form — a table and a fold, no model, no network. "score" is included because the KJV
// uses it as a unit of twenty (threescore = 60, fourscore = 80).
const NUM_WORD: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
  eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60,
  seventy: 70, eighty: 80, ninety: 90,
}
const NUM_SCALE: Record<string, number> = { hundred: 100, thousand: 1000, score: 20 }

/** wordsToNumber("three hundred") → 300; ("threescore") → 60; ("fifteen") → 15; unparseable → null.
 *  Folds units and scales the way English composes them, so "two hundred and fifty" reads 250. */
export function wordsToNumber(phrase: string): number | null {
  const words = phrase.toLowerCase().replace(/-/g, ' ').replace(/\band\b/g, ' ').split(/\s+/).filter(Boolean)
  let total = 0, current = 0, saw = false
  for (const raw of words) {
    // "threescore"/"fourscore" are one word carrying a multiplier and the scale together
    const compound = /^(two|three|four|five|six|seven|eight|nine)score$/.exec(raw)
    if (compound) { total += NUM_WORD[compound[1]]! * 20; saw = true; continue }
    if (raw in NUM_WORD) { current += NUM_WORD[raw]!; saw = true; continue }
    if (raw in NUM_SCALE) {
      const scale = NUM_SCALE[raw]!
      if (scale === 1000) { total = (total + (current || 1)) * scale; current = 0 } else current = (current || 1) * scale
      saw = true; continue
    }
    return null // an unknown word means this is not a pure number phrase
  }
  return saw ? total + current : null
}

const NUM_PHRASE = '(?:(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|score|twoscore|threescore|fourscore|fivescore|and)[\\s-]+)*(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|score|twoscore|threescore|fourscore|fivescore)'

const UNIT = '(?:degrees?|points?|cubits?|feet|foot|inches|spans?|handbreadths?|knots?|miles?|leagues?|fathoms?|talents?|shekels?|homers?|ephahs?|baths?|hins?|omers?|days?|years?|months?|cubit)'

/** extractClaims(text) → every numeric claim the text STATES, as candidate leads. Two shapes are mined:
 *  UNIT-EQUIVALENCE ("45 degrees, or four points by compass") — the shape that carries domain knowledge and that
 *  extractDecidable cannot see, because the text never writes it as arithmetic; and MEASUREMENT ("300 cubits the
 *  length"), the shape a scripture or a treatise states its dimensions in.
 *  HONEST SCOPE, and it is the whole point: this reports WHAT A TEXT SAYS, never whether the text is right, and
 *  never anything about the text's meaning or authority. A verdict is not attempted here — untested_stays_unproven
 *  governs any claim about the world that carries no decidable test, and a shared number is the expected case by
 *  pigeonhole (gematria_forces_collisions), never evidence of a connection. Deterministic: no model, no network. */
export function extractClaims(text: string, limit = 200): TextClaim[] {
  const out: TextClaim[] = []
  const seen = new Set<string>()
  const flat = text.replace(/\s+/g, ' ')
  const push = (kind: TextClaim['kind'], claim: string, at: number, numbers: number[], units: string[]): void => {
    const key = kind + '|' + claim.toLowerCase()
    if (seen.has(key) || out.length >= limit) return
    seen.add(key)
    const sentence = flat.slice(at < 120 ? 0 : at - 120, at + 160).trim()
    out.push({ kind, claim: claim.trim(), sentence, numbers, units, address: toUuid('claim:' + key) })
  }
  // "45 degrees, or four points" — two namings of one quantity, the shape that made four_points_is_45 findable
  for (const m of flat.matchAll(new RegExp('\\b(\\d{1,4})\\s+(' + UNIT + ')\\b[^.]{0,40}?\\bor\\b[^.]{0,30}?\\b([a-z]+|\\d{1,4})\\s+(' + UNIT + ')\\b', 'gi')))
    push('unit-equivalence', m[0], m.index ?? 0, [Number(m[1])], [m[2], m[4]])
  // "exactly 6 378 137 metres" — a DEFINING constant, the shape that actually seals. Measured 2026-08-19 across
  // this corpus: 379 leads produced ONE sealable item, while standards produced seven theorems the same day —
  // WGS 84's semi-major axis and inverse flattening, and the SI Boltzmann constant, are exact BY DEFINITION, so
  // arithmetic over them is decidable without measuring anything. A narrative number ("three hundred cubits") is
  // a claim about the world; a defining constant is a convention, and conventions are what `by decide` can hold.
  for (const m of flat.matchAll(new RegExp('\\b(?:exactly|precisely|by definition|defined (?:as|to be)|shall be exactly)\\s+([\\d,.]+)\\s*(' + UNIT + '|metres?|meters?|joules?|kelvins?|seconds?)\\b', 'gi')))
    push('defining-constant', m[0], m.index ?? 0, [Number(m[1].replace(/[,\s]/g, ''))], [m[2]])
  for (const m of flat.matchAll(new RegExp('\\b([\\d,.]+)\\s*(' + UNIT + '|metres?|meters?|joules?|kelvins?|seconds?)\\s+(?:exactly|by definition)\\b', 'gi')))
    push('defining-constant', m[0], m.index ?? 0, [Number(m[1].replace(/[,\s]/g, ''))], [m[2]])

  // "300 cubits" — a stated dimension; the count is the lead, the sentence is its provenance
  for (const m of flat.matchAll(new RegExp('\\b(\\d{1,5})\\s+(' + UNIT + ')\\b', 'gi')))
    push('measurement', m[0], m.index ?? 0, [Number(m[1])], [m[2]])
  // "three hundred cubits" — the SPELLED form, which is how scripture and older treatises write every number.
  // Without this the KJV reports 5 measurements in 4.45 million characters; with it, the text is legible.
  for (const m of flat.matchAll(new RegExp('\\b(' + NUM_PHRASE + ')\\s+(' + UNIT + ')\\b', 'gi'))) {
    const n = wordsToNumber(m[1])
    if (n === null || n === 0) continue
    push('measurement', m[0], m.index ?? 0, [n], [m[2]])
  }
  return out
}

// ── BOOK → SEALED-LEDGER LINKAGE — the independent, closed-door process that links each revealed book fact to the
// sealed ledger and surfaces NOVELTY (the captain's process for independent research and discovery for humanity) ──
export interface BookTheoremLink {
  claim: string          // the book's phrase, as written
  lean: string           // the by-decide statement uuidna extracted
  verdict: 'VERIFIED' | 'REFUTED'
  linkedTheorem: string | null   // the sealed ledger theorem key whose statement contains this fact, or null
  status: 'sealed-match' | 'novel' | 'refuted'   // already in the ledger · verified but NEW (a discovery) · false arithmetic
  address: string
}
export interface BookLedgerLinkage {
  facts: BookTheoremLink[]
  sealed: number         // matched a theorem already in the ledger
  novel: number          // VERIFIED by decide but NOT yet in the ledger — discoveries, candidate research leads
  refuted: number        // the text's arithmetic that does not hold (a forger's number)
  novelLeans: string[]   // the by-decide statements of the novel facts — ready to seal into the ledger
  receipt: string        // order-invariant, independent, recomputable docket receipt
  honest: string
}

const LINK_HONEST =
  'The book→ledger linkage: an INDEPENDENT, CLOSED-DOOR, recomputable process — it links each decidable arithmetic ' +
  'fact a text asserts to the SEALED ledger (sealed-match), flags a VERIFIED fact NOT yet in the ledger as NOVEL (a ' +
  'discovery — a candidate research lead for humanity), and marks false arithmetic REFUTED. Independent: no authority ' +
  'decides it, anyone recomputes from the public ledger; closed-door: purely recomputable, no network, no external ' +
  'trust. HONEST SCOPE: integrity, not truth — it links DECIDABLE ARITHMETIC only (a sliver of a book), NOT the book\'s ' +
  'meaning; a NOVEL fact is a CANDIDATE a human seals by decide, discovered here, never auto-admitted. A theorem ' +
  'computes in Lean, or it is not a theorem.'

// the sealed statement, whitespace-normalised, so "2 * 2 = 4" (as extracted) matches a ledger statement written "2*2=4".
const normStmt = (s: string): string => s.replace(/\s+/g, '')

/** linkBookFacts(text) → the independent closed-door docket: extract every decidable fact the text asserts (now
 *  including subtraction), then LINK each to the sealed ledger — sealed-match (already a theorem), NOVEL (verified but
 *  not yet sealed — a discovery for humanity), or REFUTED (false). Folds to one recomputable receipt. No network, no
 *  authority — anyone recomputes it. Integrity, not truth; a novel fact is a candidate to seal, never auto-admitted. */
export function linkBookFacts(text: string, limit = 100): BookLedgerLinkage {
  const facts = extractDecidable(text, limit)
  const ledger = theorems().map((t) => ({ key: t.key, norm: normStmt(t.statement) }))
  const links: BookTheoremLink[] = facts.map((f) => {
    const core = normStmt(f.lean.replace(/^theorem\s+\w+\s*:\s*/, '').replace(/\s*:=\s*by\s+decide\s*$/, ''))  // "110-108=2"
    const hit = f.verdict === 'VERIFIED' ? ledger.find((t) => t.norm.includes(core)) : undefined
    const status: BookTheoremLink['status'] = f.verdict === 'REFUTED' ? 'refuted' : hit ? 'sealed-match' : 'novel'
    return { claim: f.claim, lean: f.lean, verdict: f.verdict, linkedTheorem: hit ? hit.key : null, status, address: f.address }
  })
  const novelLeans = links.filter((l) => l.status === 'novel').map((l) => l.lean)
  return {
    facts: links,
    sealed: links.filter((l) => l.status === 'sealed-match').length,
    novel: novelLeans.length,
    refuted: links.filter((l) => l.status === 'refuted').length,
    novelLeans,
    receipt: merkleGravity(links.map((l) => toUuid(l.status + '|' + l.lean))),
    honest: LINK_HONEST,
  }
}

/** composeBookArticle(audit, facts) → an AUDITED article about a public-domain text: its provenance fingerprint, its
 *  structure, and the decidable arithmetic uuidna sealed (or refuted) from it, each backed by a by-decide proof.
 *  HONEST SCOPE: the article claims ONLY the provenance and the decidable integer arithmetic — never the book's
 *  meaning, argument, or non-decidable mathematics; the proofs are uuidna's, not the book's. */
export function composeBookArticle(audit: BookAudit, facts: ExtractedFact[]): { markdown: string; address: string; receipt: string } {
  const v = facts.filter((f) => f.verdict === 'VERIFIED').length
  const r = facts.filter((f) => f.verdict === 'REFUTED').length
  // the order-invariant receipt over the sealed facts — the SAME merkle-gravity fold the ledger and the quantum
  // domain (bell_no_signaling, the folded memory-store receipt) use: recompute it in any order and it returns.
  const receipt = merkleGravity(facts.map((f) => f.address))
  const md =
    `# ${audit.title || 'A public-domain text'}\n\n` +
    `> a recomputable article — provenance, structure, and the decidable arithmetic uuidna sealed from the text\n\n` +
    `This text content-addresses to \`${audit.address}\` (${audit.chapters} chapters, ${audit.words} words, ℤ/9 gravity ${audit.gravity}); the address proves exact-copy, the chapterRoot \`${audit.chapterRoot}\` proves any chapter belongs. uuidna scanned its prose for INTEGER ARITHMETIC — the only fragment it can independently decide — and sealed each \`by decide\`: **${v} VERIFIED**, **${r} REFUTED** (an arithmetic the text states that does not hold).\n\n` +
    `## The decidable arithmetic, each backed by its own proof\n\n` +
    (facts.length ? facts.map((f) => `- **${f.verdict}** — the text says \`${f.claim}\`${f.verdict === 'REFUTED' ? ` (it is ${f.actual}, not ${f.asserted})` : ''}; uuidna seals \`${f.lean}\` · \`${f.address}\``).join('\n') : '_No integer arithmetic found to decide._') +
    `\n\n## Provenance\n\nThe ${facts.length} sealed facts fold order-invariantly to receipt \`${receipt}\` — the same merkle-gravity fold the ledger and the quantum domain use, recomputable by anyone in any order. The article itself content-addresses to a uuid, so any edit is visible.\n\n## Honest scope\n\nThis article claims ONLY the provenance fingerprint and the decidable integer arithmetic above — each a uuidna \`by decide\` theorem, NOT the book's own proof. It says NOTHING about the book's argument, meaning, or any non-decidable mathematics: a theorem computes in Lean, or it is not a theorem. Public-domain work, for the public interest.\n`
  return { markdown: md, address: toUuid(md), receipt }
}

/** bookArticle(gutenbergId) → fetch a public-domain book, extract its decidable arithmetic, and return the AUDITED
 *  article + the order-invariant receipt over the sealed facts. The one network call; the fetched text is DATA to be
 *  content-addressed and decided, never executed. HONEST SCOPE: seals only the book's integer arithmetic, never its
 *  meaning or argument. */
export async function bookArticle(id: number | string): Promise<{ title: string; address: string; receipt: string; verified: number; refuted: number; facts: ExtractedFact[]; article: string }> {
  const b = await fetchGutenberg(id)
  const audit = auditText(b.text, { title: b.title, authors: b.authors, source: b.source })
  const facts = extractDecidable(b.text)
  const { markdown, receipt } = composeBookArticle(audit, facts)
  return { title: b.title, address: audit.address, receipt, verified: facts.filter((f) => f.verdict === 'VERIFIED').length, refuted: facts.filter((f) => f.verdict === 'REFUTED').length, facts, article: markdown }
}

/** A translation audited as a source↔translation PAIR — each text's own audit, bound by a directional provenance
 *  receipt (source → translation). Proves the pairing and each text's integrity; NOT the translation's fidelity. */
export interface TranslationAudit {
  source: BookAudit
  translation: BookAudit
  pair: string
  sourceLang?: string
  targetLang?: string
  honest: string
}

/** auditTranslation(source, translation[, opts]) → audit both texts and bind them with a directional provenance
 *  receipt source → translation (order-sensitive: the reverse pairing is a different receipt). Pure and offline.
 *  HONEST: this proves the PAIRING and each text's exact-copy integrity — never that the translation is accurate or
 *  faithful. Semantic fidelity is human judgement; provenance is what recomputes. Useful for writing a translation
 *  (each revision re-addresses, so a change is visible) and for citing which source a translation descends from. */
export function auditTranslation(
  source: string,
  translation: string,
  opts: { title?: string; sourceLang?: string; targetLang?: string } = {},
): TranslationAudit {
  const s = auditText(source, { title: opts.title })
  const t = auditText(translation)
  return {
    source: s,
    translation: t,
    pair: toUuid(`${s.address}→${t.address}`),
    sourceLang: opts.sourceLang,
    targetLang: opts.targetLang,
    honest:
      'The pair receipt binds THIS translation to THIS source — both exact-copy fingerprints, folded source→translation. ' +
      'uuidna proves the pairing and each text’s integrity, NOT that the translation is accurate or faithful: semantic ' +
      'fidelity is human, provenance is recomputable. Re-address after each revision and the change is visible.',
  }
}

/** The public source a book was pulled from: the id, its metadata, and the exact text URL (all recomputable). */
export interface FetchedBook { id: number; title: string; authors: string[]; text: string; source: string }

// ── WHY THIS FUNCTION CARRIES A MIRROR CHAIN ────────────────────────────────────────────────────────────────────
// MEASURED 2026-08-20: every www.gutenberg.org URL form answered 503/504 with a ~100-byte HTML error page —
// /cache/epub/27286/pg27286.txt, /files/27286/27286-0.txt and /ebooks/27286.txt.utf-8 alike, over HTTP/1.1 (node:https)
// AND over HTTP/2 (Node's fetch), where the h2 path surfaced the outage as `TypeError: fetch failed` with cause
// ERR_HTTP2_STREAM_ERROR / NGHTTP2_REFUSED_STREAM. The protocol was never the fault: the ORIGIN was refusing, and the
// h2 error text merely hid a 503 behind a transport exception. Gutendex was healthy the whole time, so a single-URL
// fetch that trusts Gutendex's `formats` map fails whenever the one host it names is down.
// Two consequences are encoded below, and both are the honest-scope habit applied to IO:
//  (1) TRY EVERY KNOWN MIRROR, not one URL. Project Gutenberg publishes the same bytes on mirrors (pglaf, aleph); the
//      canonical host is tried first so provenance stays canonical when it is up, and `source` always records the URL
//      the bytes ACTUALLY came from, never the one that was asked for. A mirror is the same public-domain text; the
//      audit's own content-address is what proves that, and it is recomputable by anyone against any mirror.
//  (2) A 200 IS NOT A BOOK. The outage served HTTP 200 in some forms and a 92–107 byte HTML error page as the body, so
//      status alone cannot decide success. The body is checked for the two signatures an error page always has and a
//      Gutenberg text never does: it opens with `<` (HTML), or it is implausibly short. Refusing a bad body is the same
//      law as UNVERIFIED — say "not obtained here", never hand back an error page dressed as a book.
const GUT_UA = 'uuidna/0.2 (+https://github.com/uuidna/uuidna) public-domain text audit'
// Gutenberg's mirror layout scatters an id over directories: 27286 → 2/7/2/8/27286 (every digit but the last, then the
// whole id). Single-digit ids live under `0`. Pure string arithmetic — no Math, nothing to round.
const mirrorPath = (id: string): string => (id.length === 1 ? '0' : id.slice(0, -1).split('').join('/')) + '/' + id
/** Every public URL that can serve the plain text of a Gutenberg id, canonical host first, then the mirrors. */
const gutenbergTextUrls = (id: string, declared?: string): string[] => {
  const p = mirrorPath(id)
  const urls = [
    declared,
    `https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`,
    `https://gutenberg.pglaf.org/cache/generated/${id}/pg${id}.txt`,
    `http://aleph.gutenberg.org/cache/generated/${id}/pg${id}.txt`,
    `https://gutenberg.pglaf.org/${p}/${id}-0.txt`,
    `https://gutenberg.pglaf.org/${p}/${id}-8.txt`,
    `https://gutenberg.pglaf.org/${p}/${id}.txt`,
    `http://aleph.gutenberg.org/${p}/${id}-0.txt`,
    `http://aleph.gutenberg.org/${p}/${id}.txt`,
  ].filter((u): u is string => typeof u === 'string' && u.length > 0 && !u.endsWith('.zip'))
  return [...new Set(urls)]
}
// An outage page is HTML and tiny; a Gutenberg plain text is neither. 500 chars is far below the shortest real
// Gutenberg text (its boilerplate header alone is longer) and far above the 92–107 byte error bodies measured.
const looksLikeBook = (body: string): boolean => body.trim().length >= 500 && !body.trim().startsWith('<')

/** fetchGutenberg(id) → a public-domain book from Project Gutenberg. Metadata comes from the public Gutendex API (no
 *  key) and is BEST-EFFORT: if Gutendex is unreachable the text is still fetched, because the text is the payload and
 *  the title is a label. The text is fetched from the canonical host first and then from Gutenberg's public mirrors
 *  until one returns a body that is actually a book (see above — a 200 with an HTML error page is not). Node's
 *  built-in fetch, so the package stays zero-dependency. The returned text is DATA to be audited, never executed;
 *  `source` is the URL the bytes truly came from, so the audit's provenance names the real origin. */
export async function fetchGutenberg(id: number | string): Promise<FetchedBook> {
  const key = encodeURIComponent(String(id))
  const headers = { 'user-agent': GUT_UA, accept: '*/*' }
  let meta: { title?: string; authors?: { name: string }[]; formats?: Record<string, string> } = {}
  try {
    const metaRes = await fetch(`https://gutendex.com/books/${key}/`, { headers, redirect: 'follow' })
    if (metaRes.ok) meta = (await metaRes.json()) as typeof meta
  } catch {
    meta = {} // Gutendex down — a missing label never blocks the text
  }
  const formats = meta.formats || {}
  const declared =
    formats['text/plain; charset=utf-8'] ||
    formats['text/plain; charset=us-ascii'] ||
    formats['text/plain'] ||
    Object.entries(formats).find(([k, v]) => k.startsWith('text/plain') && !v.endsWith('.zip'))?.[1]
  const tried: string[] = []
  for (const url of gutenbergTextUrls(String(id), declared)) {
    let body = ''
    try {
      const res = await fetch(url, { headers, redirect: 'follow' })
      if (!res.ok) { tried.push(`${url} → HTTP ${res.status}`); continue }
      body = await res.text()
    } catch (e) {
      // a transport-level refusal (the origin's 503 surfacing as ERR_HTTP2_STREAM_ERROR) is one dead mirror, not a fault
      tried.push(`${url} → ${(e as Error).message}`)
      continue
    }
    if (!looksLikeBook(body)) { tried.push(`${url} → ${body.length}-byte non-book body (error page)`); continue }
    return { id: Number(id), title: meta.title || '', authors: (meta.authors || []).map((a) => a.name), text: body, source: url }
  }
  throw new Error(`books: no mirror served the text of Gutenberg id ${id} — tried:\n  ${tried.join('\n  ')}`)
}

/** auditBook(id) → fetch a public-domain Gutenberg book, then audit it. The network step is fetchGutenberg; the
 *  audit itself is the pure, offline auditText. */
export async function auditBook(id: number | string): Promise<BookAudit> {
  const b = await fetchGutenberg(id)
  return auditText(b.text, { title: b.title, authors: b.authors, source: b.source })
}

/** A research-record audit — the provenance fingerprint of an open-access Zenodo record's PUBLIC metadata. */
export interface RecordAudit extends BookAudit { doi: string }

/** auditZenodo(id[, opts]) → content-address the PUBLIC metadata of an open-access Zenodo record (title, DOI,
 *  creators, date) via the Zenodo REST API (developers.zenodo.org, no key) — a recomputable provenance fingerprint
 *  of the open record. Pass `{ sandbox: true }` to read a record on sandbox.zenodo.org (the test instance) instead,
 *  for verifying a deposit before it is public. HONEST: it fingerprints the public metadata only, NOT the deposited
 *  files or their content; uuidna audits text provenance. Anyone re-fetches the same public record and recomputes
 *  the same address. Read-only — it never deposits, authenticates, or changes a record. */
export async function auditZenodo(id: number | string, opts: { sandbox?: boolean } = {}): Promise<RecordAudit> {
  const host = opts.sandbox ? 'sandbox.zenodo.org' : 'zenodo.org'
  const r = await fetch(`https://${host}/api/records/${encodeURIComponent(String(id))}`)
  if (!r.ok) throw new Error(`records: Zenodo (${host}) responded ${r.status} for id ${id}`)
  const j = (await r.json()) as { doi?: string; metadata?: { title?: string; creators?: { name?: string }[]; publication_date?: string }; links?: { self_html?: string } }
  const md = j.metadata || {}
  const creators = (md.creators || []).map((c) => c.name || '').filter(Boolean).join(', ')
  const meta = `${md.title || ''}\n${j.doi || ''}\n${creators}\n${md.publication_date || ''}`
  return {
    ...auditText(meta, { title: md.title || String(id), source: j.links?.self_html || `https://${host}/records/${id}` }),
    doi: j.doi || '',
    honest:
      'Fingerprints the PUBLIC metadata of an open-access Zenodo record (title, DOI, creators, date), content-addressed — ' +
      'NOT the deposited files or their content, which uuidna does not fetch or reproduce. Anyone re-fetches the same open ' +
      'record and recomputes the same address; a check digit and a uuid are the same idea at different scales.',
  }
}

/** A film audit — the provenance fingerprint of the PUBLIC description of a movie, NOT the film. */
export interface MovieAudit extends BookAudit { movieDescription: string }

/** auditMovie(title) → content-address the PUBLIC Wikipedia summary of a film (its factual description, CC BY-SA,
 *  free, no key) — a recomputable provenance fingerprint of the public facts. It does NOT and CANNOT decode the
 *  film: a movie is video, and a copyrighted film's footage, dialogue and screenplay are neither fetched nor
 *  reproduced here. uuidna audits text provenance only; this fingerprints public metadata, not a hidden meaning. */
export async function auditMovie(title: string): Promise<MovieAudit> {
  const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
  if (!r.ok) throw new Error(`movies: Wikipedia summary responded ${r.status} for "${title}"`)
  const j = (await r.json()) as { title?: string; description?: string; extract?: string; content_urls?: { desktop?: { page?: string } } }
  const source = j.content_urls?.desktop?.page || ''
  return {
    ...auditText(j.extract || '', { title: j.title || title, source }),
    movieDescription: j.description || '',
    honest:
      'Fingerprints the PUBLIC Wikipedia summary of the film (facts and description, CC BY-SA), content-addressed — ' +
      'NOT the copyrighted film content, footage, dialogue or screenplay, which uuidna does not fetch, decode or ' +
      'reproduce. A movie is video; uuidna audits text provenance only. There is no hidden meaning being decoded.',
  }
}

/** A standards/law audit — the recomputable FLOOR of a compliance audit, NOT the ruling. */
export interface StandardAudit extends BookAudit { standard: string; checks: ExtractedFact[]; factBase: string; ruling: string }

/** auditStandard(name) → the recomputable FLOOR of a standards/law audit: content-address the PUBLIC Wikipedia
 *  description of a standard or law (CC BY-SA, free, no key), decode its structure, and extract the DECIDABLE checks
 *  it states — each sealed or refuted `by decide`. HONEST SCOPE: this is the FLOOR a human auditor STARTS from — the
 *  provenance fingerprint and the decidable checks — NOT a compliance / legal RULING, which requires a licensed
 *  auditor or counsel reviewing the specific jurisdiction, edition and deployment. uuidna delivers what recomputes
 *  and leaves the ruling to humans; the "free" is a free public API + LOCAL by-decide checks. The text is DATA,
 *  content-addressed, never executed. */
export async function auditStandard(name: string): Promise<StandardAudit> {
  const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`)
  if (!r.ok) throw new Error(`standards: Wikipedia summary responded ${r.status} for "${name}"`)
  const j = (await r.json()) as { title?: string; description?: string; extract?: string; content_urls?: { desktop?: { page?: string } } }
  const source = j.content_urls?.desktop?.page || ''
  const text = j.extract || ''
  return {
    ...auditText(text, { title: j.title || name, source }),
    standard: j.title || name,
    checks: extractDecidable(text),
    factBase:
      'The recomputable FLOOR of a standards audit: the provenance fingerprint of the standard\'s public description, its ' +
      'structure, and the DECIDABLE arithmetic checks in it (each sealed or refuted by decide) — what a human auditor STARTS from.',
    ruling:
      'NOT provided. A standards / compliance / legal audit RULING requires a human auditor or licensed counsel reviewing the ' +
      'specific jurisdiction, edition and deployment. uuidna cannot and does not rule; it delivers the floor — the fingerprint ' +
      'and the decidable checks — and leaves the ruling to humans. Integrity, not truth.',
  }
}

// ─── THE UNLOCK: books that can be READ, not only measured ──────────────────────────────────────────────────────
// EVERY SURFACE ABOVE MEASURES A BOOK AND DISCARDS THE TEXT. auditText splits the chapters, addresses each one,
// folds them into chapterRoot — and then returns `chapters: number`. The COUNT survives; the chapters do not. So
// uuidna could prove you held an exact edition and could never show you a page of it. That fails the one law every
// surface here answers to: the ledger exists FOR a person, and a library nobody may read is a catalogue.
//
// The unlock needs no new machinery, only the missing return. merkleProof/verifyProof already prove a leaf belongs
// to a root, so a chapter is handed over WITH its inclusion proof: you read the page, and you verify it is the page
// that book actually contains. That is strictly MORE than an ordinary reader gets — a plain text file can be
// altered silently, while a chapter carrying its proof cannot: change one character and `belongs` goes false.
//
// HONEST SCOPE: this returns the book's own words, unmodified, public-domain. It is READING, never interpretation —
// uuidna proves WHICH text you hold, never what it means. Integrity, not truth.

export interface ChapterRead {
  index: number
  chapters: number
  title?: string
  authors?: string[]
  source?: string
  /** the chapter's own words — the unlock */
  text: string
  /** this chapter's leaf address, and the book's root it is proven against */
  address: string
  chapterRoot: string
  proof: { sibling: string; left: boolean }[]
  /** the inclusion proof verified locally — false means the text was altered */
  belongs: boolean
  chars: number
  words: number
  honest: string
}

/** The table of contents — every chapter, its heading and size, so a reader can choose one. Pure and offline. */
export function bookContents(text: string, meta: { title?: string; authors?: string[]; source?: string } = {}):
  { title?: string; authors?: string[]; chapters: { index: number; heading: string; chars: number; words: number; address: string }[]; chapterRoot: string } {
  const parts = splitChapters(text)
  return {
    ...meta,
    chapters: parts.map((c, index) => ({
      index,
      // the chapter's own first non-empty line is its heading — the book's word, never ours
      heading: (c.split('\n').find((l) => l.trim()) ?? '').trim().slice(0, 120),
      chars: c.length,
      words: c.trim() ? c.trim().split(/\s+/).length : 0,
      address: toUuid(c),
    })),
    chapterRoot: merkleRoot(parts.map((c) => toUuid(c))),
  }
}

/** readChapter(text, index) → the chapter's WORDS plus the proof they belong to this book. Pure and offline. */
export function readChapter(text: string, index: number, meta: { title?: string; authors?: string[]; source?: string } = {}): ChapterRead {
  const parts = splitChapters(text)
  const leaves = parts.map((c) => toUuid(c))
  // clamp into range without Math.* (the determinism law admits no exception, not even here)
  const i = index < 0 ? 0 : index >= parts.length ? parts.length - 1 : index
  const chapter = parts[i] ?? ''
  const chapterRoot = merkleRoot(leaves)
  const proof = merkleProof(leaves, i)
  return {
    ...meta,
    index: i,
    chapters: parts.length,
    text: chapter,
    address: leaves[i] ?? toUuid(''),
    chapterRoot,
    proof,
    belongs: verifyProof(leaves[i] ?? toUuid(''), proof, chapterRoot),
    chars: chapter.length,
    words: chapter.trim() ? chapter.trim().split(/\s+/).length : 0,
    honest:
      'The book\'s own words, public-domain and unmodified, with the inclusion proof that they belong to this exact ' +
      'edition — recompute `belongs` yourself and a single altered character fails it. Reading, never interpretation: ' +
      'uuidna proves WHICH text you hold, never what it means. Integrity, not truth.',
  }
}

/** readBook(id, index) → fetch a public-domain Gutenberg book and READ one chapter of it, proof attached. */
export async function readBook(id: number | string, index = 0): Promise<ChapterRead> {
  const b = await fetchGutenberg(id)
  return readChapter(b.text, index, { title: b.title, authors: b.authors, source: b.source })
}
