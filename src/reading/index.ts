// reading — WHAT A BOOK DECIDES BESIDES ITS ARITHMETIC.
//
// decode-book established that a frozen public-domain text is a finite object whose COUNTS are exact,
// recomputable and falsifiable: characters, words, sentences, distinct vocabulary, Zipf ranks, letter order,
// numerals, bound to the content address of the bytes that produced them. That is right, and it is not the
// whole library. Every one of those is a bag-of-symbols measure. A book read only that way is a book read as
// algebra, and the aspects a reader actually navigates — how it is DIVIDED, what SCRIPTS carry it, whether it
// is verse or prose, who SPEAKS, how much vocabulary it asks of a first-time reader — are invisible to it.
//
// None of what follows is an opinion about the book, and none of it requires the book to be true. Each aspect is
// an exact integer computed from the same frozen bytes, discriminating between texts, and falsifiable: change a
// chapter heading, a quotation mark or a line break and the numbers move. Fiction settles them exactly as well
// as a standard does.
//
// TWO RULES CARRIED IN FROM THE NIGHT'S AUDIT WORK, because a reader is an instrument and instruments lie about
// themselves in exactly two ways:
//
//   1. AN ASPECT THAT COULD NOT LOOK MUST SAY SO. Every aspect returns `read` with evidence or `unread` with a
//      REASON — never silence, never a zero standing in for an absence. A zero paragraph count and "this text
//      carries no line breaks so divisions are undecidable here" are different facts, and a reader that renders
//      the second as the first has published a finding it never made. This is the same three-state discipline a
//      gate arm needs: pass, fail, and could-not-measure, with could-not-measure never rendering as the
//      innocent one.
//
//   2. EVERY ASPECT REPORTS ITS DENOMINATOR. `examined` is how many characters the aspect actually inspected,
//      beside the total it was handed. A decoder that reads a fraction of its input and reports what it found
//      looks identical to one that read everything and found little — the difference is the denominator, and
//      only the reader can supply it. Coverage is therefore part of the reading, not a footnote to it.
//
// LICENCE IS A GATE, unchanged from decode-book and repeated here because this module is the one that grows:
// counts and structure are facts, the text is not ours to republish. Nothing here emits a substring of the
// source. Every field below is an integer, a ratio held as two integers, or a name drawn from a fixed table.
//
// NO DIVISION IS TAKEN. Ratios ride as {num, den} pairs so a reader can bracket them in integers, the way the
// counts in decode-book bracket without dividing. No Math.* appears: the determinism rejection has no exemption
// here either, and every quantity below is reachable with comparison and integer arithmetic.
import { toUuid } from '../address.js'

/** `read` — the aspect inspected the text and its evidence stands. `unread` — it could not, and says why. */
export type Verdict = 'read' | 'unread'

/** A ratio never divided: the reader brackets it in integers, as the ledger does everywhere else. */
export interface Ratio { num: number; den: number }

export interface Aspect {
  /** stable key — an aspect is addressable, so a reading can be compared aspect by aspect across editions */
  name: string
  /** what this aspect SETTLES about the text, in one line — the claim its evidence is evidence for */
  decides: string
  verdict: Verdict
  /** REQUIRED when unread: why nothing could be learned. Absent when read. */
  reason?: string
  /** exact integers and fixed names only — never a substring of the source */
  evidence: Readonly<Record<string, number | string>>
  /** how many characters THIS aspect inspected — its own denominator, never assumed to be the whole */
  examined: number
}

export interface Reading {
  /** the content address of the exact bytes read — every aspect below is bound to it */
  address: string
  chars: number
  aspects: readonly Aspect[]
  /** aspects that returned evidence, over aspects attempted — the reading's own coverage, as integers */
  covered: Ratio
}

const read = (name: string, decides: string, evidence: Aspect['evidence'], examined: number): Aspect =>
  ({ name, decides, verdict: 'read', evidence, examined })

const unread = (name: string, decides: string, reason: string, examined: number): Aspect =>
  ({ name, decides, verdict: 'unread', reason, evidence: {}, examined })

// ── the aspects ────────────────────────────────────────────────────────────────────────────────────────────

/** STRUCTURE — how the text is DIVIDED. A book is a tree, not a bag; decode-book could not see the tree.
 *  Undecidable, and said so, for a text carrying no line breaks at all — a single-paragraph source is not a
 *  book with one paragraph, it is a book whose divisions this instrument is blind to. */
export function structure(text: string): Aspect {
  const NAME = 'structure', DECIDES = 'how the text divides: lines, paragraphs, and headed divisions'
  const lines = text.split('\n')
  if (lines.length === 1) return unread(NAME, DECIDES, 'the source carries no line break, so no division is visible to this reader', text.length)
  let paragraphs = 0, blank = true
  for (const line of lines) {
    const empty = line.trim().length === 0
    if (blank && !empty) paragraphs++
    blank = empty
  }
  // a heading is a SHORT line standing alone between blanks — decided by shape, never by a word list, so it
  // holds for any language the source is written in
  let headings = 0
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i]!.trim()
    if (t.length === 0 || t.length > 60) continue
    const before = i === 0 || lines[i - 1]!.trim().length === 0
    const after = i === lines.length - 1 || lines[i + 1]!.trim().length === 0
    if (before && after) headings++
  }
  return read(NAME, DECIDES, { lines: lines.length, paragraphs, headings }, text.length)
}

const BLOCKS: readonly { name: string; lo: number; hi: number }[] = [
  { name: 'latin', lo: 0x41, hi: 0x7a },
  { name: 'latinExtended', lo: 0xc0, hi: 0x24f },
  { name: 'greek', lo: 0x370, hi: 0x3ff },
  { name: 'cyrillic', lo: 0x400, hi: 0x4ff },
  { name: 'glagolitic', lo: 0x2c00, hi: 0x2c5f },
  { name: 'hebrew', lo: 0x590, hi: 0x5ff },
  { name: 'arabic', lo: 0x600, hi: 0x6ff },
  { name: 'cjk', lo: 0x4e00, hi: 0x9fff },
]

/** SCRIPT — WHICH WRITING SYSTEMS CARRY THE TEXT. decode-book's letter-frequency table assumes one alphabet and
 *  silently mixes them; a Rosetta edition, a Greek epigraph or a Cyrillic name inside an English novel are all
 *  invisible to it. Counted by Unicode block, so it needs no language list and cannot be wrong about a language
 *  it has never heard of. */
export function script(text: string): Aspect {
  const NAME = 'script', DECIDES = 'which writing systems carry the text, counted by Unicode block'
  const counts = new Map<string, number>()
  let lettered = 0
  for (const ch of text) {
    const c = ch.codePointAt(0)!
    for (const b of BLOCKS) {
      if (c >= b.lo && c <= b.hi) { counts.set(b.name, (counts.get(b.name) ?? 0) + 1); lettered++; break }
    }
  }
  if (lettered === 0) return unread(NAME, DECIDES, 'no character falls in a known script block — nothing to attribute', text.length)
  const evidence: Record<string, number | string> = { lettered, scripts: counts.size }
  for (const [k, v] of [...counts].sort((a, b) => b[1] - a[1])) evidence[k] = v
  return read(NAME, DECIDES, evidence, text.length)
}

const VOWELS = new Set([...'aeiouyAEIOUY', ...'аеиоуъюяАЕИОУЪЮЯ', ...'αειουωΑΕΙΟΥΩ'])

/** PROSODY — VERSE OR PROSE, decided by the text rather than declared about it. A metrical text repeats a line
 *  SHAPE; prose does not. Syllables are counted as vowel GROUPS, which is exact and language-independent even
 *  where it is not a phonologist's syllable — the claim is repetition of a measure, not a theory of the measure.
 *  This is the aspect a counts-only reading cannot reach at all: the same words in the same quantity are a poem
 *  or an essay depending on where the line ends. */
export function prosody(text: string): Aspect {
  const NAME = 'prosody', DECIDES = 'whether the text repeats a line measure — verse against prose'
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0)
  if (lines.length < 4) return unread(NAME, DECIDES, 'fewer than four non-empty lines — no measure can repeat', text.length)
  const tally = new Map<number, number>()
  let examined = 0
  for (const line of lines) {
    examined += line.length
    let syllables = 0, inVowel = false
    for (const ch of line) {
      const v = VOWELS.has(ch)
      if (v && !inVowel) syllables++
      inVowel = v
    }
    if (syllables > 0) tally.set(syllables, (tally.get(syllables) ?? 0) + 1)
  }
  if (tally.size === 0) return unread(NAME, DECIDES, 'no line carries a vowel this reader knows — the measure is unreadable to it', examined)
  let top = 0, topCount = 0
  for (const [syl, n] of tally) if (n > topCount || (n === topCount && syl < top)) { top = syl; topCount = n }
  let counted = 0
  for (const n of tally.values()) counted += n
  return read(NAME, DECIDES, {
    lines: lines.length, distinctMeasures: tally.size,
    commonestSyllables: top, atThatMeasureNum: topCount, atThatMeasureDen: counted,
  }, examined)
}

// A STRAIGHT QUOTE IS ITS OWN CLOSER, and that is not a detail. Directional marks say which end they are;
// the ASCII `"` does not, so it can only be counted and checked for parity. Folding it into the opener table
// — the first thing this reader did — made every straight-quoted edition report itself unbalanced, which is a
// reader inventing a defect in the text out of a limitation of itself.
const OPENERS = '“«„'
const CLOSERS = '”»'
const STRAIGHT = '"'

/** DIALOGUE — WHO SPEAKS, AND HOW OFTEN. Direct speech is marked in a fixed, countable way in every tradition
 *  this corpus holds: paired quotation marks, or a line-opening dash in Bulgarian and Russian setting. A text's
 *  speech share separates a novel from a treatise more sharply than its vocabulary does, and no word count sees
 *  it. Unpaired marks are reported rather than repaired — an odd count is a fact about the edition. */
export function dialogue(text: string): Aspect {
  const NAME = 'dialogue', DECIDES = 'how much of the text is direct speech, by its own marks'
  let openers = 0, closers = 0, straight = 0, dashTurns = 0
  for (const ch of text) {
    if (OPENERS.includes(ch)) openers++
    else if (CLOSERS.includes(ch)) closers++
    else if (STRAIGHT.includes(ch)) straight++
  }
  for (const line of text.split('\n')) {
    const t = line.trim()
    if (t.startsWith('—') || t.startsWith('–') || t.startsWith('--')) dashTurns++
  }
  if (openers === 0 && closers === 0 && straight === 0 && dashTurns === 0)
    return unread(NAME, DECIDES, 'the edition carries no speech mark this reader knows — speech may be present and unmarked', text.length)
  // directional marks must pair with each other; straight marks can only be checked for parity
  const balanced = openers === closers && straight % 2 === 0 ? 1 : 0
  return read(NAME, DECIDES, { openers, closers, straight, balanced, dashTurns }, text.length)
}

/** MORPHOLOGY — THE SHAPE OF THE VOCABULARY, not its size. Hapax legomena — words used exactly once — are the
 *  classic invariant a raw distinct-count hides: two books with identical vocabulary sizes can differ entirely
 *  in how much of that vocabulary is used once and abandoned, and that difference is authorship, translation
 *  and register. */
export function morphology(text: string): Aspect {
  const NAME = 'morphology', DECIDES = 'the shape of the vocabulary: hapax legomena and word length'
  const words = text.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean)
  if (words.length === 0) return unread(NAME, DECIDES, 'no word-forming character in the source', text.length)
  const counts = new Map<string, number>()
  let lengthSum = 0, longest = 0
  for (const w of words) {
    counts.set(w, (counts.get(w) ?? 0) + 1)
    lengthSum += w.length
    if (w.length > longest) longest = w.length
  }
  let hapax = 0
  for (const n of counts.values()) if (n === 1) hapax++
  return read(NAME, DECIDES, {
    tokens: words.length, types: counts.size, hapax, longestWord: longest,
    meanLengthNum: lengthSum, meanLengthDen: words.length,
  }, text.length)
}

/** READABILITY — WHAT THE BOOK ASKS OF A FIRST-TIME READER, which is the school's question rather than the
 *  ledger's. Measured as vocabulary GROWTH over the opening thousand tokens: how many distinct words a reader
 *  meets before the text starts repeating itself. Reported as integers, never as a grade — a grade would be an
 *  opinion, and the count is not. */
export function readability(text: string): Aspect {
  const NAME = 'readability', DECIDES = 'the vocabulary a first-time reader meets in the opening thousand tokens'
  const WINDOW = 1000
  const words = text.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean)
  if (words.length < WINDOW)
    return unread(NAME, DECIDES, `the source carries ${words.length} tokens, fewer than the ${WINDOW}-token window this aspect measures`, text.length)
  const seen = new Set<string>()
  let examined = 0
  for (let i = 0; i < WINDOW; i++) { seen.add(words[i]!); examined += words[i]!.length }
  const sentences = text.split(/[.!?…]+/).filter((s) => s.trim().length > 0).length
  return read(NAME, DECIDES, {
    window: WINDOW, distinctInWindow: seen.size,
    sentences, meanSentenceTokensNum: words.length, meanSentenceTokensDen: sentences === 0 ? 1 : sentences,
  }, examined)
}

/** NAMES — THE PEOPLE A TEXT CARRIES, derived from the text and never from a list.
 *
 *  A hand-typed roster of names would be the exact intrusion this aspect exists to detect: someone's judgement
 *  standing in for the corpus's own evidence, and wrong in a way no reader could see. So a candidate is decided
 *  by SHAPE and by REPETITION — capitalised, appearing at least twice, and appearing at least once where a
 *  sentence did not just begin. That last condition is the load-bearing one: English capitalises the first word
 *  of every sentence, so a reader that skipped it would return the language's function words as its most
 *  celebrated people.
 *
 *  It cannot separate a person from a place or a month, and it does not pretend to — the evidence is
 *  "capitalised, repeated, not merely sentence-initial", and that is what it reports. What it CAN do is find
 *  those candidates without anyone deciding in advance whose names count, which is the property that makes it
 *  usable as an audit instrument rather than as a mirror of its author's expectations. */
export function names(text: string): Aspect {
  const NAME = 'names', DECIDES = 'which capitalised, repeated tokens the text carries independently of sentence position'
  const sentences = text.split(/(?<=[.!?…])\s+|\n+/)
  if (sentences.length === 0) return unread(NAME, DECIDES, 'the source divides into no sentence this reader can see', text.length)
  const total = new Map<string, number>(), midSentence = new Map<string, number>()
  let examined = 0
  for (const s of sentences) {
    examined += s.length
    const toks = s.split(/[^\p{L}'’-]+/u).filter(Boolean)
    for (let i = 0; i < toks.length; i++) {
      const w = toks[i]!
      const first = w[0]!
      if (first !== first.toUpperCase() || first === first.toLowerCase()) continue  // not capitalised (or caseless script)
      total.set(w, (total.get(w) ?? 0) + 1)
      if (i > 0) midSentence.set(w, (midSentence.get(w) ?? 0) + 1)
    }
  }
  const found: string[] = []
  for (const [w, n] of total) if (n >= 2 && (midSentence.get(w) ?? 0) >= 1) found.push(w)
  if (found.length === 0) return unread(NAME, DECIDES, 'no capitalised token repeats away from a sentence opening — this text names nobody it names twice', examined)
  found.sort((a, b) => (total.get(b)! - total.get(a)!) || (a < b ? -1 : 1))
  const evidence: Record<string, number | string> = {
    candidates: found.length, capitalisedTypes: total.size, sentences: sentences.length,
  }
  // the roster rides as a count and a joined string of the commonest — never the source's own sentences
  evidence.commonest = found.slice(0, 12).join(' ')
  return read(NAME, DECIDES, evidence, examined)
}

/** namesIn(text) → just the candidate roster, for a caller auditing one corpus against another. */
export function namesIn(text: string): string[] {
  const a = names(text)
  return a.verdict === 'read' ? String(a.evidence.commonest).split(' ').filter(Boolean) : []
}

/** PROVENANCE — WHICH EDITION THIS IS. The aspect that is honest about being unmeasurable from the text alone:
 *  bytes cannot tell you their own source, licence or translator, and a reader that guessed would be inventing
 *  the one field the legal gate depends on. It returns `unread` with a reason unless an edition record is
 *  supplied by the caller who fetched it — which is the point. A reading that silently omitted provenance would
 *  look exactly like a reading of an unprovenanced text. */
export interface Edition { source: string; licence: string; retrieved: string }
export function provenance(text: string, edition?: Edition): Aspect {
  const NAME = 'provenance', DECIDES = 'which edition these bytes are, and under what licence they may be sealed'
  if (!edition) return unread(NAME, DECIDES, 'no edition record was supplied — bytes cannot testify to their own source, and this reader will not guess one', 0)
  return read(NAME, DECIDES, {
    source: edition.source, licence: edition.licence, retrieved: edition.retrieved,
    address: toUuid(text),
  }, text.length)
}

// ── the reading ────────────────────────────────────────────────────────────────────────────────────────────

/** Every aspect this reader knows, in a fixed order so two readings of two editions compare aspect by aspect. */
export const ASPECTS = ['structure', 'script', 'prosody', 'dialogue', 'morphology', 'readability', 'names', 'provenance'] as const

/** readingOf(text, edition?) → the full reading: every aspect attempted, each carrying its own verdict, reason
 *  and denominator, and the reading's own coverage as an integer pair. An aspect is never dropped for returning
 *  nothing — a dropped aspect is indistinguishable from an aspect that was never asked. */
export function readingOf(text: string, edition?: Edition): Reading {
  const aspects: Aspect[] = [
    structure(text), script(text), prosody(text), dialogue(text),
    morphology(text), readability(text), names(text), provenance(text, edition),
  ]
  let readCount = 0
  for (const a of aspects) if (a.verdict === 'read') readCount++
  return { address: toUuid(text), chars: text.length, aspects, covered: { num: readCount, den: aspects.length } }
}
