// structure — THE ARITHMETIC A BOOK IS (the literature-yield refutal).
//
// Counting only the arithmetic a text ASSERTS scored literature as empty. The decoder counts what a frozen
// public-domain object IS: characters, words, ranks, letters, numerals written as words. Those integers move
// when the text moves. iq-books then refused two of the decoder's own facts as identity — they held on every
// book in the declared corpus — so a fact that merely HOLDS is tagged, never sealed as what a book is.
import { toUuid } from '../../../../address.js'

export interface Decoding {
  chars: number
  words: number
  sentences: number
  distinct: number
  richness: number
  ranks: { word: string; count: number; rank: number }[]
  letters: { letter: string; count: number }[]
  numerals: { word: string; value: number; count: number }[]
  address: string
}

export interface StructureFact { claim: string; holds: boolean; shape: 'structure' | 'vacuous-on-corpus' }

export interface Probe { id: number; words: number; distinct: number; richness: number; top1: string; top2: string; c1: number; c2: number; letters: string }
export interface Verdict { fact: string; held: number; failed: number; discriminates: boolean }

const NUMERALS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70,
  eighty: 80, ninety: 90, hundred: 100, thousand: 1000,
  едно: 1, един: 1, една: 1, две: 2, два: 2, три: 3, четири: 4, пет: 5, шест: 6,
  седем: 7, осем: 8, девет: 9, десет: 10, единадесет: 11, дванадесет: 12,
  двайсет: 20, двадесет: 20, трийсет: 30, тридесет: 30, четирийсет: 40, петдесет: 50,
  шейсет: 60, седемдесет: 70, осемдесет: 80, деветдесет: 90, сто: 100, хиляда: 1000, хиляди: 1000,
}

const WORD = /[\p{L}\p{M}'\u2019]+/gu
const LETTER = /\p{L}/u

/** Shapes iq-books measured as holding on every book of the declared corpus — identity, not a discriminator. */
export const VACUOUS_ON_CORPUS = ['rank1 exceeds rank2', "commonest word is 'the'"] as const

export const IQ_FACTS: { name: string; of: (p: Probe) => boolean }[] = [
  { name: 'vocabulary richness is exactly 10x distinct', of: (p) => p.richness === 10 },
  { name: 'rank1 exceeds rank2', of: (p) => p.c1 > p.c2 },
  { name: 'rank1 is under twice rank2', of: (p) => p.c1 < 2 * p.c2 },
  { name: "commonest word is 'the'", of: (p) => p.top1 === 'the' },
  { name: "letter order begins 'eta'", of: (p) => p.letters === 'eta' },
]

/** strip the Project Gutenberg header and licence so the counts describe the WORK. */
export function body(raw: string): string {
  const start = raw.indexOf('*** START OF')
  const end = raw.indexOf('*** END OF')
  const from = start >= 0 ? raw.indexOf('\n', start) + 1 : 0
  const to = end > from ? end : raw.length
  return raw.slice(from, to)
}

/** every number below is computed from the text and moves if the text moves. */
export function decode(raw: string, top = 12): Decoding {
  const text = body(raw)
  const words = text.toLowerCase().match(WORD) ?? []
  const freq = new Map<string, number>()
  for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1)

  const ordered = [...freq.entries()].sort((a, b) => (b[1] === a[1] ? (a[0] < b[0] ? -1 : 1) : b[1] - a[1]))
  const letters = new Map<string, number>()
  for (const ch of text.toLowerCase()) if (LETTER.test(ch)) letters.set(ch, (letters.get(ch) ?? 0) + 1)
  const wordCount = words.length
  const distinct = freq.size
  let richness = 0
  if (distinct) while ((richness + 1) * distinct <= wordCount) richness++

  return {
    chars: text.length,
    words: wordCount,
    sentences: (text.match(/[.!?]+(\s|$)/g) ?? []).length,
    distinct,
    richness,
    ranks: ordered.slice(0, top).map(([word, count], i) => ({ word, count, rank: i + 1 })),
    letters: [...letters.entries()].sort((a, b) => b[1] - a[1]).map(([letter, count]) => ({ letter, count })),
    numerals: Object.entries(NUMERALS)
      .map(([word, value]) => ({ word, value, count: freq.get(word) ?? 0 }))
      .filter((n) => n.count > 0)
      .sort((a, b) => b.count - a.count),
    address: toUuid(text),
  }
}

export function probeOfDecoding(d: Decoding, id = 0): Probe | null {
  if (!d.words || d.ranks.length < 2) return null
  return {
    id, words: d.words, distinct: d.distinct, richness: d.richness,
    top1: d.ranks[0]!.word, top2: d.ranks[1]!.word, c1: d.ranks[0]!.count, c2: d.ranks[1]!.count,
    letters: d.letters.slice(0, 3).map((l) => l.letter).join(''),
  }
}

export function judge(probes: readonly Probe[]): Verdict[] {
  return IQ_FACTS.map((f) => {
    const held = probes.filter((p) => f.of(p)).length
    return { fact: f.name, held, failed: probes.length - held, discriminates: held > 0 && held < probes.length }
  })
}

/** Candidate integer relations this text decides. Vacuous-on-corpus shapes are tagged, not proposed as identity.
 *  The floor(words/distinct) bracket is the definition of richness — occupancy, never a candidate. */
export function candidates(d: Decoding): StructureFact[] {
  const out: StructureFact[] = []
  const push = (claim: string, holds: boolean): void => {
    const vacuous = VACUOUS_ON_CORPUS.some((v) => claim.startsWith(v))
    out.push({ claim, holds, shape: vacuous ? 'vacuous-on-corpus' : 'structure' })
  }
  if (d.ranks.length >= 2) {
    const [a, b] = d.ranks
    push(`rank1 exceeds rank2: ${a!.count} > ${b!.count} (${a!.word} over ${b!.word})`, a!.count > b!.count)
    push(`rank1 under twice rank2: ${a!.count} < 2 * ${b!.count}`, a!.count < 2 * b!.count)
  }
  if (d.letters.length >= 2) {
    push(`commonest letter '${d.letters[0]!.letter}' beats '${d.letters[1]!.letter}': ${d.letters[0]!.count} > ${d.letters[1]!.count}`, d.letters[0]!.count > d.letters[1]!.count)
  }
  return out
}

export function structureOf(text: string, top = 12): { decoding: Decoding; facts: StructureFact[] } {
  const decoding = decode(text, top)
  return { decoding, facts: candidates(decoding) }
}
