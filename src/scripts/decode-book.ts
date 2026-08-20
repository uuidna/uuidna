#!/usr/bin/env node
// @non-harmonic: fetches a book over the network before decoding it — a NAMED boundary, like books.ts.
//
// decode-book — WHAT A BOOK DECIDES, NOT WHAT IT SAYS.
//
// I measured the corpus wrong and reached a wrong conclusion from a right number. Counting only theorems that state
// exact arithmetic, prose scored about one per quarter-million characters against a standards table's dozens per
// page, and I concluded literature was the wrong end of the library. The ledger already refuted that: gematria_
// ignores_order, gematria_forces_collisions and alphabetic_three_ranks were all decoded out of scripture, and the
// King James Bible is in the corpus BECAUSE its numbers are written as words. The error was the metric. I counted
// the arithmetic a book ASSERTS and ignored the arithmetic a book IS.
//
// A fixed public-domain text is a finite, frozen object. Everything below is an exact integer computed from it,
// recomputable by anyone holding the same edition, and FALSIFIABLE — change one word and the numbers move. That is
// precisely the shape a `by decide` theorem needs, and prose supplies it in quantity:
//
//   COUNTS      characters, words, sentences, distinct vocabulary — exact, and their RATIOS bracket in integers
//               without ever taking a division, the way caesium_light_step brackets a distance.
//   RANKS       the frequency-ordered vocabulary. Zipf's relation between rank and count is a claim ABOUT a text
//               that the text itself settles — and settles differently for different books, so it discriminates.
//   NUMERALS    numbers written as words. This is the seam the Bible note already named, and it is the one place
//               prose states arithmetic outright.
//   LETTERS     the frequency order of the alphabet, which is a fact about a language as carried by this witness.
//   ADDRESS     the content address of the text itself, so every count above is bound to the exact bytes that
//               produced it. A count without its address is an assertion; with it, it is a receipt.
//
// None of these are opinions about the book, and none require it to be true — they hold for fiction exactly as
// well as for a standard. That is why literature is not the wrong end of the library: a novel cannot tell you a
// defining constant, but it can DECIDE its own structure, and it does so with more integers than a table.
//
// LICENCE IS A GATE, NOT A PROMISE. This decodes public-domain text and quotes nothing verbatim into the ledger —
// it emits counts. A source whose copyright has not expired must not be sealed here at all: the ledger publishes
// to npm, the site and a DOI'd Zenodo deposit, and a permanent citable deposit of in-copyright text is exactly the
// exposure the legal arm exists to prevent. Counts are facts; the text is not ours to republish.
//
//   node dist/scripts/decode-book.js <gutenberg-id> [--top N]
import { toUuid } from '../index.js'

export interface Decoding {
  chars: number
  words: number
  sentences: number
  distinct: number
  ranks: { word: string; count: number; rank: number }[]
  letters: { letter: string; count: number }[]
  numerals: { word: string; value: number; count: number }[]
  address: string
}

const NUMERALS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70,
  eighty: 80, ninety: 90, hundred: 100, thousand: 1000,
  // Bulgarian. Without these the densest seam in a Cyrillic text is invisible: a single English novel
  // carried 206 instances of 'one', and the same density sits in Bulgarian prose spelled едно, две, три.
  едно: 1, един: 1, една: 1, две: 2, два: 2, три: 3, четири: 4, пет: 5, шест: 6,
  седем: 7, осем: 8, девет: 9, десет: 10, единадесет: 11, дванадесет: 12,
  двайсет: 20, двадесет: 20, трийсет: 30, тридесет: 30, четирийсет: 40, петдесет: 50,
  шейсет: 60, седемдесет: 70, осемдесет: 80, деветдесет: 90, сто: 100, хиляда: 1000, хиляди: 1000,
}

/** Letters, in any script the source is written in. The first version matched [a-z'] only, so every Cyrillic
 *  text decoded to ZERO words — the counts came back empty and looked like a quiet result rather than a broken
 *  tokenizer. Unicode property escapes keep this script-agnostic instead of trading one hardcoded alphabet for
 *  two. */
const WORD = /[\p{L}\p{M}'\u2019]+/gu
const LETTER = /\p{L}/u

/** strip the Project Gutenberg header and licence so the counts describe the WORK, not the wrapper. */
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

  return {
    chars: text.length,
    words: words.length,
    sentences: (text.match(/[.!?]+(\s|$)/g) ?? []).length,
    distinct: freq.size,
    ranks: ordered.slice(0, top).map(([word, count], i) => ({ word, count, rank: i + 1 })),
    letters: [...letters.entries()].sort((a, b) => b[1] - a[1]).map(([letter, count]) => ({ letter, count })),
    numerals: Object.entries(NUMERALS)
      .map(([word, value]) => ({ word, value, count: freq.get(word) ?? 0 }))
      .filter((n) => n.count > 0)
      .sort((a, b) => b.count - a.count),
    address: toUuid(text),
  }
}

/** Candidate sealable facts: exact integer relations this text decides. Ratios are BRACKETED, never divided —
 *  the same discipline as caesium_light_step, so nothing irrational or rounded enters the ledger. */
export function candidates(d: Decoding): { claim: string; holds: boolean }[] {
  const out: { claim: string; holds: boolean }[] = []
  // vocabulary richness, bracketed: words / distinct lies between k and k+1
  let k = 0
  while ((k + 1) * d.distinct <= d.words) k++
  out.push({ claim: `words/distinct brackets: ${d.words} >= ${k} * ${d.distinct} and < ${k + 1} * ${d.distinct}`, holds: k * d.distinct <= d.words && d.words < (k + 1) * d.distinct })
  // Zipf: the first rank's count against the second's, as an integer bracket
  if (d.ranks.length >= 2) {
    const [a, b] = d.ranks
    out.push({ claim: `rank1 exceeds rank2: ${a.count} > ${b.count} (${a.word} over ${b.word})`, holds: a.count > b.count })
    out.push({ claim: `rank1 under twice rank2: ${a.count} < 2 * ${b.count}`, holds: a.count < 2 * b.count })
  }
  // the alphabet's frequency order, as carried by this witness
  if (d.letters.length >= 2) out.push({ claim: `commonest letter '${d.letters[0].letter}' beats '${d.letters[1].letter}': ${d.letters[0].count} > ${d.letters[1].count}`, holds: d.letters[0].count > d.letters[1].count })
  // every count is bound to the bytes that produced it
  out.push({ claim: `address ${d.address} folds the exact text these counts describe`, holds: true })
  return out
}

if (process.argv[1] && /decode-book\.(js|ts)$/.test(process.argv[1])) {
  const id = Number(process.argv[2])
  if (!id) { console.error('decode-book — usage: decode-book.js <gutenberg-id> [--top N]'); process.exit(1) }
  const topArg = process.argv.indexOf('--top')
  const top = topArg > 0 ? Number(process.argv[topArg + 1]) || 12 : 12

  const { fetchGutenberg } = await import('../books.js')
  const fetched = await fetchGutenberg(id) as unknown
  const raw = typeof fetched === 'string' ? fetched : String((fetched as { text?: string }).text ?? '')
  const d = decode(raw, top)

  console.log(`decode-book ${id} — address ${d.address}`)
  console.log(`  chars ${d.chars}  words ${d.words}  sentences ${d.sentences}  distinct ${d.distinct}`)
  console.log(`  ranks: ${d.ranks.map((r) => `${r.rank}.${r.word}=${r.count}`).join('  ')}`)
  console.log(`  letters: ${d.letters.slice(0, 8).map((l) => l.letter + l.count).join(' ')}`)
  console.log(`  numerals written as words: ${d.numerals.slice(0, 10).map((n) => `${n.word}(${n.value})×${n.count}`).join('  ') || 'none'}`)
  console.log(`\n  candidate sealable facts:`)
  for (const c of candidates(d)) console.log(`    ${c.holds ? '✓' : '✗'} ${c.claim}`)
}
