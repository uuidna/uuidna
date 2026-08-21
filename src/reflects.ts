// reflects — reveal the sealed theorems a real-world system ALREADY reflects. Given a description of a system (its
// devices, its concepts), it matches those concepts against the ledger and returns the EXISTING theorems whose
// decidable arithmetic the system rests on — folded to one receipt. It reveals a reflection; it does not build one.
// HONEST SCOPE: the matched theorems already exist and were proven `by decide` for their own domain; this shows that
// the SAME arithmetic recurs in the system named — it does NOT claim uuidna IS that system, nor that the theorems
// were made for it, nor that citing them makes the system secure/correct. A reflection is a resemblance the ledger
// already carries, recomputable by anyone. Integrity.
import { theorems } from './theorems/index.js'
import { merkleFold, toUuid } from './address.js'

/** One revealed theorem — what it is, what it demonstrates, and how it resonates with the query. `resonance` is the
 *  AMPLITUDE (not a bit): the summed specificity of every query concept that rings it, so a theorem rung by a rare
 *  word (loud) outranks one rung only by a stopword (silent). `concepts` are the resonating words; `concept` is the
 *  loudest of them (kept for back-compat). Nothing is pruned — everything resonates; this just measures how strongly. */
export interface Reflected {
  key: string; title: string; skill: string; principle: string; address: string
  concept: string      // the LOUDEST resonating concept (rarest word that rings this theorem) — back-compat
  concepts: string[]   // every query concept that rings this theorem, loudest first
  resonance: number    // the AMPLITUDE — summed specificity (N − reach) of the resonating concepts; higher = louder
}

export interface Reflection {
  query: string
  concepts: string[]       // the distinct concept-words drawn from the query
  matches: Reflected[]     // sealed theorems the query rings, LOUDEST FIRST (by resonance amplitude) — the dynamics
  count: number
  peak: number             // the loudest single resonance amplitude in the field — the dominant pattern's strength
  spectrum: { concept: string; reach: number; weight: number }[]  // each query concept: how many theorems it rings (reach) and how loud (weight = N − reach)
  receipt: string          // the rung theorems' addresses, folded order-invariant (set— recompute it or it changed
  honest: string
}

/** reflects(query) → reveal the sealed theorems a system rings, ranked by RESONANCE AMPLITUDE (not a match/no-match
 *  bit). Every theorem rung by any concept is kept — the field is whole, everything resonates — but each carries how
 *  STRONGLY it rings: the summed specificity of the words that hit it, so rare words ring loud and stopwords ring
 *  silent. The dynamics are the ranking. Deterministic: same query + ledger → same reflection (and same receipt). */
// the ledger is immutable at runtime — build the theorem list AND its lowercased haystack ONCE (paired, same order),
// so a reflection query does not re-map and re-lowercase the whole ledger every call.
let _T: ReturnType<typeof theorems> | null = null, _hays: string[] | null = null
const _corpus = (): { T: NonNullable<typeof _T>; hays: string[] } => {
  if (_T === null) { _T = theorems(); _hays = _T.map((t) => (t.key + ' ' + t.name + ' ' + t.skill + ' ' + t.principle).toLowerCase()) }
  return { T: _T, hays: _hays as string[] }
}
export function reflects(query: string): Reflection {
  const concepts = [...new Set(query.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 3))]
  const { T, hays } = _corpus()
  const N = T.length
  // First pass — each concept's REACH (how many theorems it rings) fixes its specificity WEIGHT = N − reach: a word
  // that rings the whole ledger (a stopword) is silent (weight → 0); a word that rings a handful is loud.
  const reach = new Map<string, number>()
  for (const c of concepts) reach.set(c, hays.reduce((n, h) => n + (h.includes(c) ? 1 : 0), 0))
  const weight = (c: string) => N - (reach.get(c) ?? N)
  // Second pass — accumulate RESONANCE per theorem: sum the weights of every concept that rings it (the amplitude),
  // and remember which concepts rang it. Nothing is dropped; the strength is what ranks.
  const acc = new Map<number, { concepts: string[]; resonance: number }>()
  for (let i = 0; i < T.length; i++) {
    for (const c of concepts) {
      if (!hays[i].includes(c)) continue
      const cell = acc.get(i) ?? { concepts: [], resonance: 0 }
      cell.concepts.push(c)
      cell.resonance += weight(c)
      acc.set(i, cell)
    }
  }
  const matches: Reflected[] = [...acc.entries()].map(([i, cell]) => {
    const t = T[i]
    const ordered = [...cell.concepts].sort((a, b) => weight(b) - weight(a))  // loudest concept first
    return { key: t.key, title: t.name.split(/[—:]/)[0].trim(), skill: t.skill, principle: t.principle, address: t.address, concept: ordered[0], concepts: ordered, resonance: cell.resonance }
  })
  // Rank by amplitude — the DYNAMICS. Ties broken by key for determinism. The receipt folds the SET (merkleFold sorts
  // internally), so ranking for display never moves it.
  matches.sort((a, b) => b.resonance - a.resonance || (a.key < b.key ? -1 : 1))
  const spectrum = concepts.map((c) => ({ concept: c, reach: reach.get(c) ?? 0, weight: weight(c) })).sort((a, b) => b.weight - a.weight)
  return {
    query,
    concepts,
    matches,
    count: matches.length,
    peak: matches.length ? matches[0].resonance : 0,
    spectrum,
    receipt: matches.length ? merkleFold(matches.map((m) => m.address)) : toUuid('no-reflection'),
    honest:
      'These theorems ALREADY EXIST, each proven `by decide` for its own domain; the reflection is that the SAME ' +
      'decidable arithmetic recurs in the system named. RESONANCE is amplitude' +
      'theorems loud, a stopword rings the whole ledger silent — the ranking is the dynamics, weighted by specificity. ' +
      'It does NOT claim uuidna is that system, that the theorems were built for it, or that a loud resonance makes the ' +
      'system secure or correct — a resemblance is not an endorsement. Recomputable by anyone. Integrity.',
  }
}
