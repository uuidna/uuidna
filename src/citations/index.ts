// citations — THE CITATION GRAPH OF THE SEALED LEDGER, extracted so more than one surface can share it.
//
// THE RULE, unchanged from where it was written: every snake_case token inside a sealed theorem's NAME that is
// itself a sealed key is a citation. It is SCANNED, never picked — a theorem sealed tomorrow that cites
// dz_table appears in the graph tomorrow, and no hand-kept row can linger or hide. That rule was living inside
// scripts/gen-school, which is the only reason it is being moved: a second surface needed the same relation,
// and the choice was to copy the regex or to share it. A copied rule is two rules the moment either is edited.
//
// WHAT AN EDGE MEANS. `a → b` means a's own name cites b, so b is the walk to take first: the in-degree ranks
// the foundations. Nothing here interprets the edge further — the graph is organisation, and what it is used
// FOR (a learning order, a team's seams) belongs to the surface that asks.
import { theorems, type Theorem } from '../theorems/index.js'

/** the token shape a sealed name uses: snake_case, at least two parts */
const KEY_TOKEN = /\b[a-z][a-z0-9]*(?:_[a-z0-9]+)+\b/g

export interface CitationEdge { from: string; to: string }

/** citationEdges() → every (citer → cited) pair the ledger's own names carry. Pure, deterministic, sorted. */
export function citationEdges(): CitationEdge[] {
  const all = theorems() as readonly Theorem[]
  const keys = new Set(all.map((t) => t.key))
  const seen = new Set<string>()
  const out: CitationEdge[] = []
  for (const t of all) {
    for (const m of t.name.matchAll(KEY_TOKEN)) {
      const to = m[0]
      if (to === t.key || !keys.has(to)) continue
      const id = t.key + '>' + to
      if (seen.has(id)) continue
      seen.add(id)
      out.push({ from: t.key, to })
    }
  }
  return out.sort((a, b) => (a.from === b.from ? (a.to < b.to ? -1 : 1) : a.from < b.from ? -1 : 1))
}

/** citersOf() → cited key → the keys that cite it. The in-degree map gen-school ranks its prerequisites by. */
export function citersOf(): Map<string, string[]> {
  const out = new Map<string, string[]>()
  for (const e of citationEdges()) {
    const arr = out.get(e.to) ?? []
    if (!arr.includes(e.from)) { arr.push(e.from); out.set(e.to, arr) }
  }
  return out
}

export interface SkillEdge { a: string; b: string; edges: number }

/** skillCitationGraph() → the citation graph LIFTED to the skill axis: skills a and b are adjacent when a
 *  theorem carrying one cites a theorem carrying the other. Self-edges are dropped (a skill citing itself is
 *  internal depth, not a relation between capabilities), and the pair is unordered because the seam between two
 *  capabilities has to be held by someone regardless of which side cites which. */
export function skillCitationGraph(): SkillEdge[] {
  const all = theorems() as readonly Theorem[]
  const skillOf = new Map(all.map((t) => [t.key, t.skill]))
  const weight = new Map<string, number>()
  for (const e of citationEdges()) {
    const sa = skillOf.get(e.from), sb = skillOf.get(e.to)
    if (sa === undefined || sb === undefined || sa === sb) continue
    const key = sa < sb ? sa + '|' + sb : sb + '|' + sa
    weight.set(key, (weight.get(key) ?? 0) + 1)
  }
  return [...weight.entries()]
    .map(([k, edges]) => ({ a: k.split('|')[0]!, b: k.split('|')[1]!, edges }))
    .sort((x, y) => y.edges - x.edges || (x.a < y.a ? -1 : x.a > y.a ? 1 : x.b < y.b ? -1 : 1))
}

/** componentsOf(nodes, adjacent) → the connected components of a graph over the given nodes, each sorted, and
 *  the components ordered by size then name so the answer is stable for anyone who recomputes it. */
export function componentsOf(nodes: readonly string[], adjacent: readonly { a: string; b: string }[]): string[][] {
  const present = new Set(nodes)
  const near = new Map<string, string[]>()
  for (const { a, b } of adjacent) {
    if (!present.has(a) || !present.has(b)) continue
    near.set(a, [...(near.get(a) ?? []), b])
    near.set(b, [...(near.get(b) ?? []), a])
  }
  const seen = new Set<string>()
  const out: string[][] = []
  for (const n of [...present].sort()) {
    if (seen.has(n)) continue
    const stack = [n], group: string[] = []
    seen.add(n)
    while (stack.length) {
      const cur = stack.pop()!
      group.push(cur)
      for (const m of near.get(cur) ?? []) if (!seen.has(m)) { seen.add(m); stack.push(m) }
    }
    out.push(group.sort())
  }
  return out.sort((x, y) => y.length - x.length || (x[0]! < y[0]! ? -1 : 1))
}
