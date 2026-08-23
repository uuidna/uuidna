// categories/practice/prereq-walker — THE PREREQUISITE WALKER (lead 81c, 4 of 4): a failed theorem names its
// own prerequisite, and the walker turns that law into a road. The prerequisite edges are DERIVED, never
// authored: a sealed theorem's doc-name that speaks another theorem's key CITES it — the same citation-edge scan
// the school's graph is generated from — so the walk to any theorem is the chain of its cited keys, breadth-first,
// cycle-safe, deterministic. HONEST SCOPE: the edges are what the names actually cite — a missing edge means the
// prose cited nothing, not that no dependency exists; the walker reads the ledger's own words and invents no
// pedagogy.
export interface TheoremLike { key: string; name: string }
export interface Walk { target: string; chain: string[]; depth: number }

/** the keys a theorem's own name cites — the derived edge rule, one place. */
export function prerequisitesOf(key: string, ledger: readonly TheoremLike[]): string[] {
  const t = ledger.find((x) => x.key === key)
  if (!t) return []
  return ledger.filter((x) => x.key !== key && t.name.includes(x.key)).map((x) => x.key).sort()
}

/** the road to a theorem: BFS up the citation chain, each prerequisite before what cites it, cycles cut. */
export function walkTo(key: string, ledger: readonly TheoremLike[]): Walk {
  const seen = new Set<string>([key])
  const order: string[] = []
  let frontier = [key]
  let depth = 0
  while (frontier.length > 0 && depth < 16) {
    const next: string[] = []
    for (const k of frontier) for (const p of prerequisitesOf(k, ledger)) if (!seen.has(p)) { seen.add(p); next.push(p); order.push(p) }
    frontier = next
    if (next.length > 0) depth += 1
  }
  return { target: key, chain: order.reverse(), depth }
}
