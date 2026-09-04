// publication-graph — THE DERIVED CITATION GRAPH over the 116 monographs, and the Zenodo related-identifier
// records that carry it into the DataCite metadata.
//
// WHY THIS EXISTS. A monograph with no siblings is a leaf: a reader who arrives at one has nowhere to go, and a
// deposit that names no related work is a database row wearing a DOI. Crosslinks were measured at 0 of 116 —
// every publication a leaf — while the captain's Zenodo point is exactly right: `relatedIdentifiers` IS the
// graph, and the graph is what makes a corpus citable rather than merely archived.
//
// THE RELATION IS DERIVED, NOT AUTHORED. Two monographs are kin when they reason about the same things, and the
// ledger already says what each one reasons about: the integer constants inside its sealed statements, and the
// vocabulary of the theorem names. Both were measured before this module was written, and the measurement chose
// the design:
//   - shared name-vocabulary alone gives a median degree of 102 out of 116 — a near-complete graph, which is the
//     same as no graph at all. Rejected as a membership test.
//   - shared RARE constants (a constant appearing in at most RARE_MAX monographs) gives a median degree of 28.
//     Meaningful, but still too many to print.
// So neither is used as a yes/no edge. Both feed a SCORE, and each monograph keeps its NEAREST few. A ranked
// neighbour list is what a citation recommender returns; an unranked one is a directory.
//
// A CONSTANT SHARED BY EVERYTHING MEANS NOTHING. `1` appears in nearly every wing, so it carries no kinship;
// rarity is the whole signal, which is why the frequency census runs first and the common constants drop out.
import { THEOREMS, type Theorem } from './theorems/index.js'
import { toUuid, merkleFold } from './address.js'
import { parseFormula, congruenceOf } from './formula.js'

/** A constant or word in more than this many monographs is corpus-wide furniture, not a shared subject. */
export const RARE_MAX = 20
/** A word must appear in at least two monographs to relate any pair at all. */
export const WORD_MIN = 2
/** How many nearest kin a monograph keeps. Five is a reader's shortlist, not a directory. */
export const KIN = 5
/** A shared constant is worth this much more than a shared word: a number is the mathematics, a word is the prose. */
export const CONST_WEIGHT = 2
// A SHARED MODULUS IS THE STRONGEST KINSHIP THERE IS, and it had to be added after the first measurement: with
// rarity alone, `core` and `ring` came back ISOLATED — the two most foundational wings, leaves in their own graph.
// The reason is structural, not a bug: they reason in the small constants every other wing also uses, so nothing
// they touch is rare. But they are not unrelated to the corpus — they ARE the ring the corpus computes in, and a
// wing whose statements are congruences modulo the same n shares an algebraic structure, which is a stronger
// relation than sharing a word or an incidental integer. Only 7 wings state a top-level congruence, so this basis
// is narrow and precise: it relates the foundations to each other and to what is built on them.
export const MOD_WEIGHT = 6

const STOP = new Set(
  ('the a an is are of to and in by for on it its not no as at with from that this be but or every each any all '
    + 'one two only same then than when what which who whom whose there here have has had does did done').split(' '),
)

export interface PubTerms {
  file: string
  slug: string
  count: number
  /** every integer literal in the wing's sealed statements */
  constants: string[]
  /** the rare ones — the wing's numeric subject */
  rareConstants: string[]
  /** the rare vocabulary of its theorem names */
  rareWords: string[]
  /** the moduli its statements are congruences in — the algebraic structure it computes inside */
  moduli: string[]
}

const slugOfFile = (file: string): string =>
  file.replace(/\.lean$/, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

/** modulusOf(statement) → the n of `x % n = r`, when the statement IS a congruence. Null otherwise — most
 *  statements are not, and a null here is a fact about the statement, never a parse failure to paper over. */
export function modulusOf(statement: string): string | null {
  const parsed = parseFormula(statement)
  if (!parsed.ok || !parsed.node) return null
  const c = congruenceOf(parsed.node)
  if (!c) return null
  return c.n.kind === 'num' ? c.n.text : null
}

/** termsByPublication() → what each monograph reasons about, read from the ledger. Pure; one walk. */
export function termsByPublication(theorems: readonly Theorem[] = THEOREMS): PubTerms[] {
  const byFile = new Map<string, Theorem[]>()
  for (const t of theorems) {
    const list = byFile.get(t.file)
    if (list) list.push(t)
    else byFile.set(t.file, [t])
  }
  // First pass: every term, per file.
  const raw = [...byFile].map(([file, ts]) => {
    const constants = new Set<string>()
    const words = new Set<string>()
    const moduli = new Set<string>()
    for (const t of ts) {
      for (const m of String(t.statement).matchAll(/\d+/g)) constants.add(m[0])
      for (const w of String(t.name).toLowerCase().split(/[^a-z]+/))
        if (w.length > 3 && !STOP.has(w)) words.add(w)
      const mod = modulusOf(String(t.statement))
      if (mod !== null) moduli.add(mod)
    }
    return {
      file, slug: slugOfFile(file), count: ts.length,
      constants: [...constants].sort(), words: [...words].sort(), moduli: [...moduli].sort(),
    }
  }).sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : 0))
  // Second pass: the frequency census that decides what is rare.
  const cf = new Map<string, number>()
  const wf = new Map<string, number>()
  for (const r of raw) {
    for (const c of r.constants) cf.set(c, (cf.get(c) ?? 0) + 1)
    for (const w of r.words) wf.set(w, (wf.get(w) ?? 0) + 1)
  }
  return raw.map((r) => ({
    file: r.file,
    slug: r.slug,
    count: r.count,
    constants: r.constants,
    moduli: r.moduli,
    rareConstants: r.constants.filter((c) => (cf.get(c) ?? 0) <= RARE_MAX),
    rareWords: r.words.filter((w) => {
      const n = wf.get(w) ?? 0
      return n <= RARE_MAX && n >= WORD_MIN
    }),
  }))
}

export interface Kin {
  slug: string
  file: string
  /** MOD_WEIGHT per shared modulus, CONST_WEIGHT per shared rare constant, one per shared rare word */
  score: number
  sharedModuli: string[]
  sharedConstants: string[]
  sharedWords: string[]
}

export interface PubNode {
  slug: string
  file: string
  count: number
  kin: Kin[]
  /** true when nothing in the corpus shares a rare term — declared, never hidden */
  isolated: boolean
  receipt: string
}

const shared = (a: readonly string[], b: readonly string[]): string[] => {
  const set = new Set(b)
  return a.filter((x) => set.has(x))
}

// CACHED FOR THE DEFAULT LEDGER, because it was not and the cost showed up two layers away: publicationGraph
// costs ~100ms and graphNode calls it, so the deposit-record builder — which asks for a node three times per
// monograph — spent about 35 seconds recomputing the same 116-node graph. A caller passing its OWN theorem list
// bypasses the cache, so a test can still inject a different corpus and get an honest answer.
let _graph: PubNode[] | null = null

/** publicationGraph() → each monograph's nearest kin, ranked. Deterministic: ties break on slug, so the same
 *  ledger always returns the same graph and the receipt is recomputable by anyone. */
export function publicationGraph(theorems: readonly Theorem[] = THEOREMS): PubNode[] {
  if (theorems === THEOREMS && _graph) return _graph
  const computed = computeGraph(theorems)
  if (theorems === THEOREMS) _graph = computed
  return computed
}

function computeGraph(theorems: readonly Theorem[]): PubNode[] {
  const terms = termsByPublication(theorems)
  return terms.map((a) => {
    const scored: Kin[] = []
    for (const b of terms) {
      if (b.file === a.file) continue
      const sm = shared(a.moduli, b.moduli)
      const sc = shared(a.rareConstants, b.rareConstants)
      const sw = shared(a.rareWords, b.rareWords)
      const score = sm.length * MOD_WEIGHT + sc.length * CONST_WEIGHT + sw.length
      if (score > 0) scored.push({ slug: b.slug, file: b.file, score, sharedModuli: sm, sharedConstants: sc, sharedWords: sw })
    }
    scored.sort((x, y) => (y.score - x.score) || (x.slug < y.slug ? -1 : x.slug > y.slug ? 1 : 0))
    const kin = scored.slice(0, KIN)
    return {
      slug: a.slug,
      file: a.file,
      count: a.count,
      kin,
      isolated: kin.length === 0,
      receipt: merkleFold([toUuid('pub-graph|' + a.slug), ...kin.map((k) => toUuid(a.slug + '>' + k.slug + '|' + k.score))]),
    }
  })
}

/** graphNode(slug) → one monograph's node, or null. */
export function graphNode(slug: string, theorems: readonly Theorem[] = THEOREMS): PubNode | null {
  return publicationGraph(theorems).find((n) => n.slug === slug) ?? null
}

export interface GraphCensus {
  publications: number
  edges: number
  isolated: string[]
  /** how many monographs reached the full KIN shortlist */
  fullShortlist: number
  receipt: string
}

/** graphCensus() → the graph as one auditable row. */
export function graphCensus(theorems: readonly Theorem[] = THEOREMS): GraphCensus {
  const g = publicationGraph(theorems)
  return {
    publications: g.length,
    edges: g.reduce((a, n) => a + n.kin.length, 0),
    isolated: g.filter((n) => n.isolated).map((n) => n.slug),
    fullShortlist: g.filter((n) => n.kin.length === KIN).length,
    receipt: merkleFold(g.map((n) => n.receipt)),
  }
}
