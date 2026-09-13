// decipher — THE BENCH A DECIPHERMENT MUST BEAT, in integers. A proposed reading of an unread text (the Voynich
// manuscript, transcribed in EVA) counts only when its denial fails: shuffled text, a control language and chance must
// all fail to reproduce what it claims. The refutation every letter-for-letter claim meets is structural — a simple
// substitution is a bijective relabeling of the alphabet, and a relabeling maps equal letters to equal letters and
// equal bigrams to equal bigrams, so every collision count below is carried across UNCHANGED. A claimed plaintext
// therefore inherits the source's statistics exactly, and a claim is judged by comparing them to real text in the
// claimed language, never by how readable a few words look. Rates stay exact fractions (the float law), compared by
// cross-multiplication; the controls shuffle with a fixed-seed generator, so every run agrees.

/** a transcription parsed by the IVTFF conventions: `<...>` comments and locus ids dropped, `[a:b]` alternatives keep
 *  the first reading, `.` and `,` are word breaks, and `?` `*` mark unreadable glyphs (counted, then dropped) */
export interface Ivtff { words: string[]; unreadable: number; lines: number }

export function parseIvtff(text: string): Ivtff {
  let unreadable = 0, lines = 0
  const words: string[] = []
  for (const line of text.split('\n')) {
    if (!line.startsWith('<f')) continue
    lines++
    let t = line.replace(/^<[^>]*>\s*/, '').replace(/<[^>]*>/g, '').replace(/\[([^:\]]*):[^\]]*\]/g, '$1')
    unreadable += (t.match(/[?*]/g) ?? []).length
    t = t.replace(/[?*!]/g, '')
    for (const w of t.split(/[.,\s]+/)) if (/^[a-z]+$/.test(w)) words.push(w)
  }
  return { words, unreadable, lines }
}

/** ordered pairs (i ≠ j) of equal items over all ordered pairs — the collision rate, kept as its two integers */
export interface Collision { same: bigint; pairs: bigint }

export const collisionOf = (items: readonly string[]): Collision => {
  const counts = new Map<string, number>()
  for (const x of items) counts.set(x, (counts.get(x) ?? 0) + 1)
  let same = 0n
  for (const c of counts.values()) same += BigInt(c) * BigInt(c - 1)
  const n = BigInt(items.length)
  return { same, pairs: n === 0n ? 0n : n * (n - 1n) }
}

/** −1, 0 or 1 as rate a is below, equal to or above rate b — exact, by cross-multiplication */
export const compareRates = (a: Collision, b: Collision): -1 | 0 | 1 => {
  const l = a.same * b.pairs, r = b.same * a.pairs
  return l < r ? -1 : l > r ? 1 : 0
}

export interface Profile {
  tokens: number
  types: number
  letters: number
  alphabet: number
  /** equal letters */
  letter: Collision
  /** equal adjacent-letter pairs inside words — the spelling structure */
  bigram: Collision
  /** equal adjacent-word pairs — the word-order structure */
  wordPair: Collision
}

export function profileOf(words: readonly string[]): Profile {
  const letters = words.join('').split('')
  const bigrams: string[] = []
  for (const w of words) for (let i = 1; i < w.length; i++) bigrams.push(w[i - 1]! + w[i]!)
  const wordPairs: string[] = []
  for (let i = 1; i < words.length; i++) wordPairs.push(words[i - 1] + ' ' + words[i])
  return {
    tokens: words.length, types: new Set(words).size, letters: letters.length, alphabet: new Set(letters).size,
    letter: collisionOf(letters), bigram: collisionOf(bigrams), wordPair: collisionOf(wordPairs),
  }
}

// Numerical Recipes' 32-bit linear congruential constants; every product stays below 2^53, so plain integers suffice
const LCG_A = 1664525, LCG_C = 1013904223, LCG_M = 4294967296

/** a fixed-seed Fisher–Yates shuffle: the same seed gives the same order on every machine */
export function shuffledBy<T>(xs: readonly T[], seed: number): T[] {
  const a = [...xs]
  let s = seed % LCG_M
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * LCG_A + LCG_C) % LCG_M
    const j = s % (i + 1)
    const t = a[i]!; a[i] = a[j]!; a[j] = t
  }
  return a
}

/** CONTROL: letters shuffled across the whole text, word lengths kept — destroys spelling, keeps the length profile */
export function letterShuffle(words: readonly string[], seed: number): string[] {
  const letters = shuffledBy(words.join('').split(''), seed)
  let k = 0
  return words.map((w) => { const out = letters.slice(k, k + w.length).join(''); k += w.length; return out })
}

/** CONTROL: word order shuffled — keeps every word, destroys the order between them */
export const wordShuffle = (words: readonly string[], seed: number): string[] => shuffledBy(words, seed)

/** a simple substitution: each letter replaced by its image. Refuses a mapping that sends two letters to one, which
 *  is not a substitution cipher but a lossy code, and a letter it has no image for. */
export function relabel(words: readonly string[], map: ReadonlyMap<string, string>): string[] {
  const images = new Set(map.values())
  if (images.size !== map.size) throw new Error('relabel: the mapping sends two letters to one image — not a bijection, so not a simple substitution')
  return words.map((w) => [...w].map((c) => {
    const to = map.get(c)
    if (to === undefined) throw new Error(`relabel: no image for letter "${c}"`)
    return to
  }).join(''))
}

/** what a letter-for-letter reading does to the statistics: nothing. `preserved` is true for every bijection, which is
 *  the refutation — the claimed plaintext's rates ARE the source's, and must be compared to the claimed language. */
export function substitutionInvariants(words: readonly string[], map: ReadonlyMap<string, string>): { before: Profile; after: Profile; preserved: boolean } {
  const before = profileOf(words), after = profileOf(relabel(words, map))
  const same = (a: Collision, b: Collision): boolean => a.same === b.same && a.pairs === b.pairs
  return { before, after, preserved: same(before.letter, after.letter) && same(before.bigram, after.bigram) && same(before.wordPair, after.wordPair) }
}
