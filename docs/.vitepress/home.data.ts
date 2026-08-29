// home — THE FRAME HAS NO PROSE. Everything the home page states is computed here, from Lean.
//
// What this replaces, and why each layer had to go. docs/index.md was 131 lines of which the ledger backed four:
// a YAML hero whose tagline was typed; six feature cards whose `details` were paragraphs nothing could check; a
// bullet list asserting "Corruption is mathematically impossible" — a claim no theorem in the ledger makes and
// none could, since the ledger decides finite structures and says nothing about corruption; a hand-typed table of
// every page on the site, which computeSidebar() already derives from the real tree, so the two could drift and
// only the typed one would be wrong; and a closing "The future is now."
//
// The rule this file exists to hold: the home page may not say more than the ledger proves. Not "should not" —
// may not, because there is no longer anywhere to type it. A sentence that wants to appear here has to become a
// theorem first, and then it appears by itself.
//
// The ranking is the sharp end. Theorems are ordered by their MEASURED kernel decide-step cost (lean/heartbeats.json,
// one entry per address), which is the only ordering that is not an editorial choice. It is published unsorted by
// preference and unfiltered by topic, which is what makes it evidence: the seven named Clay theorems land at
// #1151–#1157 of 1336, all at 49 steps, below the median of 60 — because each states a STATUS, and a status is
// cheap to decide. A home page that ranked by computation and put a Clay result on top would be reporting a
// laundered claim, and security-audit.ts's `clay-uuidna-solves-none` would refuse the build. The ordering agrees
// with the gate without being told about it.
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems, PRINCIPLES, runTrial } from '../../dist/theorems/index.js'
import { statementCensus } from '../../dist/editorial.js'
import { coins } from '../../dist/captain/billing/index.js'
import { publications } from '../../dist/publish.js'
import { merkleGravity } from '../../dist/gravity/index.js'
import { computeSidebar } from '../../dist/site.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

export type Cluster = { name: string; blurb: string; count: number; fold: string; monograph: string | null }
export type Ranked = { key: string; name: string; cost: number; rank: number; principle: string }
export type MapGroup = { text: string; items: { text: string; link: string }[] }

export type HomeData = {
  /** the headline, computed the same way README.md's H1 is — one derivation, two surfaces */
  distinct: number
  keys: number
  coins: number
  receipt: string
  /** the clusters, which are the Lean files — each with the count and fold it already carries */
  clusters: Cluster[]
  /** every theorem by MEASURED decide-step cost: the dearest few, and where the Clay problems actually land */
  costliest: Ranked[]
  clay: Ranked[]
  medianCost: number
  measured: number
  /** the whole site, from the real page tree — never typed twice */
  map: MapGroup[]
  pages: number
}

declare const data: HomeData
export { data }

export default {
  watch: [
    '../../dist/theorems/generated.js',
    '../../dist/editorial.js',
    '../../dist/publish.js',
    '../../dist/site.js',
    '../../lean/heartbeats.json',
  ],
  load(): HomeData {
    const T = theorems()
    const costs = (JSON.parse(readFileSync(join(ROOT, 'lean', 'heartbeats.json'), 'utf8')) as
      { costs?: Record<string, number> }).costs ?? {}

    // The ordering: measured cost, descending. A theorem with no heartbeat sorts as 0 rather than being dropped,
    // because a missing measurement is a fact about the measurement and must not silently shrink the ledger.
    const ranked: Ranked[] = T
      .map((t) => ({ key: t.key, name: t.name, principle: t.principle, cost: costs[t.address] ?? 0, rank: 0 }))
      .sort((a, b) => (b.cost - a.cost) || (a.key < b.key ? -1 : 1))
      .map((r, i) => ({ ...r, rank: i + 1 }))

    const blurb = Object.fromEntries(PRINCIPLES.map((p: string[]) => [p[1], p[2]])) as Record<string, string>
    const monographByFile = Object.fromEntries(publications().map((p) => [p.file, p.slug])) as Record<string, string>
    const clusters: Cluster[] = PRINCIPLES
      .map((p: string[]) => p[1])
      .filter((name: string) => T.some((t) => t.principle === name))
      .map((name: string) => {
        const list = T.filter((t) => t.principle === name)
        const slug = monographByFile[list[0]?.file]
        return {
          name,
          blurb: blurb[name] || '',
          count: list.length,
          fold: merkleGravity(list.map((t) => t.address)),
          monograph: slug ? `/publications/${slug}` : null,
        }
      })
      .sort((a, b) => b.count - a.count)

    const map = computeSidebar() as MapGroup[]

    return {
      distinct: statementCensus().distinct,
      keys: T.length,
      coins: coins(),
      receipt: runTrial().receipt,
      clusters,
      costliest: ranked.slice(0, 7),
      clay: ranked.filter((r) => r.key.startsWith('clay_')).sort((a, b) => a.rank - b.rank),
      medianCost: ranked[Math.floor(ranked.length / 2)].cost,
      measured: Object.keys(costs).length,
      map,
      pages: map.reduce((n, g) => n + g.items.length, 0),
    }
  },
}
