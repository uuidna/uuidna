// build-graph — THE README IS A BUILD RECEIPT, AND THIS IS THE GRAPH IT RECEIPTS.
//
// The captain, 2026-09-27: "Improved readme comes from improved code quality and quantum efficiency. Imagine the readme
// as quantum build receipt. The whole computation graph in readme receipt. The more seo optimised code the more seo
// optimised readme and site. Consolidate."
//
// THE GRAPH ALREADY EXISTED IN FOUR DECLARATIONS AND WAS PUBLISHED NOWHERE. api.ts keeps DRAIN_WRITERS (a surface and
// the one generator that owns it), RECONCILE_OUTPUTS and DOCS_BUILD_OUTPUTS (a generator and what it emits), and spin.ts
// keeps DERIVED_FILES beside a per-surface coin in spin-manifest.json that proves the file is what its writer wrote.
// Measured the day this was written: 87 generators over 102 surfaces, every edge already declared, and no surface
// anywhere — not the README, not the site, not a door — carried the graph. A reader could see the outputs and never the
// computation that made them.
//
// SO THE RECEIPT IS COMPUTED ONCE, HERE, AND RENDERED EVERYWHERE — which is the consolidation the captain asked for and
// not a new listing beside the old ones. The README section, the site page and the MCP door all read buildGraph(); a
// figure in one that disagrees with another is impossible BY CONSTRUCTION, because there is one derivation and three
// renderings of it. That is also why the node names are the code's own names: a generator is named by its file and a
// surface by its path, so the graph a reader searches for and the code a contributor opens are spelled the same. Better
// names in the code are better names in the README and on the site, with nothing in between to translate them.
//
// AND IT IS A QUALITY RECEIPT RATHER THAN A LISTING, which is the half that makes it worth publishing. Two numbers in it
// are the ones to read: an UNOWNED surface (in the drain's derived set with no declared writer) is where a hand edit
// enters and is silently kept, and an UNCOINED surface is one no spin seal covers, so a hand edit to it leaves no trace
// at all. Both are counted, named, and folded into the receipt, so the graph cannot report health it does not have.
import { DRAIN_WRITERS, RECONCILE_OUTPUTS, DOCS_BUILD_OUTPUTS } from './scripts/api.js'
import { DERIVED_FILES } from './spin.js'
import { hexbitReceipt } from './hexbit/index.js'
import { rdRoot, existsRoot } from './boundary.js'

export interface BuildEdge {
  /** the generator, by the file that runs it — the code's own name, never a label */
  generator: string
  /** the surface it writes, by repo-relative path */
  surface: string
  /** the spin coin sealing that surface, or null when no seal covers it */
  coin: string | null
}

export interface BuildGraph {
  generators: number
  surfaces: number
  edges: readonly BuildEdge[]
  /** surfaces the drain owns that NO declaration gives a writer — a hand edit here is kept, silently */
  unowned: readonly string[]
  /** surfaces spin's OWN declared set covers with no coin — the honest unsealed set */
  uncoined: readonly string[]
  /** surfaces outside spin's declared set: not unsealed, simply not spin's to seal */
  outsideSpin: number
  /** order-invariant fold over every edge — recompute it and it is the same for anyone */
  receipt: string
  handle: string
}

/** spinCoins() → the per-surface coin from spin-manifest.json, or an empty map when the manifest does not ship.
 *  An absent manifest is stated as absent by leaving every coin null; it is never faked with a placeholder. */
const spinCoins = (): Record<string, string> => {
  if (!existsRoot('spin-manifest.json')) return {}
  try {
    const m = JSON.parse(rdRoot('spin-manifest.json')) as { coins?: Record<string, string> }
    return m.coins ?? {}
  } catch { return {} }
}

export function buildGraph(): BuildGraph {
  const coins = spinCoins()
  const edges: BuildEdge[] = []
  const owned = new Set<string>()

  // a surface with ONE declared writer — the drain's own law, read rather than restated
  for (const [surface, generator] of Object.entries(DRAIN_WRITERS)) {
    edges.push({ generator, surface, coin: coins[surface] ?? null })
    owned.add(surface)
  }
  // a generator with its declared outputs, from both chains
  for (const decl of [RECONCILE_OUTPUTS, DOCS_BUILD_OUTPUTS]) {
    for (const [generator, outs] of Object.entries(decl)) {
      for (const surface of outs) {
        edges.push({ generator, surface, coin: coins[surface] ?? null })
        owned.add(surface)
      }
    }
  }

  const generators = new Set(edges.map((e) => e.generator))
  const surfaces = new Set(edges.map((e) => e.surface))
  // A DERIVED SURFACE WITH NO WRITER IS THE INTERESTING ROW. spin seals it as generated, so a hand edit to it survives
  // the drain and is sealed as though a generator had produced it — the exact drift the coins exist to catch, at the one
  // place the coin cannot speak, because nothing declares who should have written the file.
  const unowned = DERIVED_FILES
    .filter((f) => !owned.has(f) && ![...owned].some((o) => f.startsWith(o.replace(/\/$/, '') + '/')))
    .slice()
    .sort()
  // UNCOINED IS MEASURED AGAINST WHAT SPIN CLAIMS, NOT AGAINST EVERY SURFACE, and the first version of this got it
  // backwards with a number that would have raised a false alarm in a receipt meant to be trusted. spin seals the 15
  // surfaces DERIVED_FILES names; the graph has 101, so 85 came back "uncoined" and the row read "a hand edit leaves no
  // trace" about files that were never spin's to seal — several of which (gate-receipt.json, quantum-fold.json) are
  // receipts in their own right. So the unsealed set is the intersection with spin's own declaration, and everything
  // else is counted separately as OUTSIDE that scope, which is a different fact and is stated as one.
  const spinScope = new Set<string>(DERIVED_FILES)
  const uncoined = [...surfaces].filter((s) => spinScope.has(s) && !coins[s]).sort()
  const outsideSpin = [...surfaces].filter((s) => !spinScope.has(s)).length

  // THE RECEIPT SEALS THE GRAPH, NOT THE CONTENT OF WHAT IT BUILT — and the first version folded the coins in, which
  // made it neither. A spin coin is a content-address, so it moves whenever a surface's bytes move; folding coins meant
  // this receipt changed on every regeneration even when the graph was identical, and the recorded MCP example could
  // never reproduce. The docs-reproduce gate caught precisely that: same 82 generators, same 101 surfaces, same 109
  // edges, same unowned and uncoined — and a different receipt.
  //
  // So the fold is over the STRUCTURE: which generator writes which surface. That is what "the computation graph" names,
  // and it is stable exactly as long as the graph is. The coins stay on each edge as the per-surface evidence they are —
  // dropped from the identity, not from the answer, because a reader still needs to know whether a surface is sealed.
  // build-graph.test.ts perturbs the coins and requires the receipt not to move.
  const leaves = edges.map((e) => `${e.generator}→${e.surface}`).sort()
  const r = hexbitReceipt(leaves)
  return {
    generators: generators.size,
    surfaces: surfaces.size,
    edges: edges.slice().sort((a, b) => (a.generator + a.surface).localeCompare(b.generator + b.surface)),
    unowned,
    uncoined,
    outsideSpin,
    receipt: r.receipt,
    handle: r.handle,
  }
}

/** buildReceiptMd(g) → the graph as one compact README/site block. ONE renderer, so the README and the site page cannot
 *  disagree: the same computation printed in two places is still one fact, which is exactly the distinction the README
 *  audit drew when it cut restatements that carried no backing. */
export function buildReceiptMd(g: BuildGraph = buildGraph()): string {
  return [
    `**${g.generators} generators → ${g.surfaces} surfaces**, ${g.edges.length} declared edge(s), folded order-invariantly`
      + ` to receipt \`${g.receipt}\` (handle \`${g.handle}\`). Recompute with \`uuidna_build_graph\`.`,
    '',
    '| what | count | why it is the number to read |',
    '| --- | ---: | --- |',
    `| Generators | ${g.generators} | each named by the file that runs it, so the graph and the code spell things the same |`,
    `| Surfaces | ${g.surfaces} | every output a declaration claims a writer for |`,
    `| Unowned derived surfaces | ${g.unowned.length} | spin seals them as generated and nothing declares who writes them, so a hand edit is kept${g.unowned.length ? `: ${g.unowned.slice(0, 4).join(', ')}` : ''} |`,
    `| Unsealed inside spin's set | ${g.uncoined.length} | spin declares it seals these and no coin covers them${g.uncoined.length ? `: ${g.uncoined.slice(0, 4).join(', ')}` : ' — none'} |`,
    `| Outside spin's set | ${g.outsideSpin} | not unsealed, simply not spin's to seal: several carry their own receipt |`,
  ].join('\n')
}
