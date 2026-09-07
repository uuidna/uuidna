// population-census — THE SURFACES THAT COUNT THE SAME THEOREMS MUST AGREE, AND ONE ASKS THEM ALL AT ONCE.
//
// WHY THIS EXISTS, from a day's evidence rather than a principle. On 2026-09-07 a wing of 129 theorems landed and
// SIX separate gate failures followed, spread over hours and found one at a time by three different sessions:
//
//   the axiom witness had audited 5124 while the ledger served 5253
//   64 ledger entries were "not witnessed by any wing" — the same gap, differently phrased
//   the falsifier table decided 5124 of 5253, so the new wing had no second leg
//   the README stated a coverage rate computed from the old population
//   the drain found 56 keys served and proved by no wing (the wing file was still the pre-split 73)
//   the heartbeat costs covered 5124
//
// EVERY ONE OF THEM IS THE SAME FACT: a derived surface counting a different population than the wings hold.
// They were found separately because nothing asks them together — each gate reads its own surface, notices its own
// disagreement, and reports it in its own words, so one cause arrives as six symptoms over half a day.
//
// This asks all of them in one pass and reports the population each carries. It does not replace those gates —
// each still knows what to DO about its own surface — it removes the delay between one cause and its six faces.
//
// THREE ANSWERS, NOT TWO. A surface that cannot be read is UNMEASURED and is never folded into agreement, which is
// the rule this tree keeps re-learning: an unreadable file and a matching one both produce silence, and only a
// third state separates them. A surface deliberately behind (a measurement still running) is reported as BEHIND
// with its shortfall named, because "behind" is a fact worth stating and not a fault worth blocking on.
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/** what one surface says the theorem population is */
export interface SurfaceCount {
  surface: string
  /** the population it carries, or null when the surface could not be read */
  count: number | null
  /** why it could not be read — present only when count is null */
  why?: string
}

export interface PopulationCensus {
  surfaces: SurfaceCount[]
  /** the population the WINGS hold — the source every other surface is derived from */
  truth: number | null
  /** surfaces whose count differs from the wings */
  disagreeing: SurfaceCount[]
  /** surfaces that could not be read at all — never counted as agreeing */
  unmeasured: SurfaceCount[]
  agree: boolean
}

const read = (root: string, rel: string): string => readFileSync(join(root, rel), 'utf8')

/** each surface, and how to count the theorems it carries — the readers live together so a new surface is added once */
const READERS: { surface: string; count: (root: string) => number }[] = [
  { surface: 'wings (lean/*.lean)', count: (root) =>
    readdirSync(join(root, 'lean')).filter((f) => f.endsWith('.lean'))
      .reduce((a, f) => a + (read(root, join('lean', f)).match(/^theorem /gm) ?? []).length, 0) },
  { surface: 'ledger (src/theorems/generated.ts)', count: (root) =>
    (read(root, 'src/theorems/generated.ts').match(/^ {2}\{ key: "/gm) ?? []).length },
  { surface: 'axiom witness (lean/axioms.json)', count: (root) =>
    Number((JSON.parse(read(root, 'lean/axioms.json')) as { audited?: number }).audited ?? -1) },
  { surface: 'falsifier table (src/falsifiers.test.ts)', count: (root) =>
    (read(root, 'src/falsifiers.test.ts').match(/^ {2}\[".*?", ".*?", ".*?"\],?$/gm) ?? []).length },
  { surface: 'heartbeat costs (lean/heartbeats.json)', count: (root) =>
    Object.keys((JSON.parse(read(root, 'lean/heartbeats.json')) as { costs: Record<string, number> }).costs).length },
]

/** populationCensus(root) → what every surface says, and where they part */
export function populationCensus(root: string): PopulationCensus {
  const surfaces: SurfaceCount[] = READERS.map(({ surface, count }) => {
    try {
      const n = count(root)
      return Number.isFinite(n) && n >= 0 ? { surface, count: n } : { surface, count: null, why: 'the surface parsed but carried no population' }
    } catch (e) {
      return { surface, count: null, why: e instanceof Error ? e.message : String(e) }
    }
  })
  const truth = surfaces[0]?.count ?? null
  const unmeasured = surfaces.filter((s) => s.count === null)
  const disagreeing = truth === null ? [] : surfaces.slice(1).filter((s) => s.count !== null && s.count !== truth)
  return { surfaces, truth, disagreeing, unmeasured, agree: disagreeing.length === 0 && unmeasured.length === 0 }
}

/** a line per surface, with the shortfall named — the form a gate or a person can read */
export function populationReport(c: PopulationCensus): string {
  return c.surfaces.map((s) => {
    const head = '  ' + s.surface.padEnd(40)
    if (s.count === null) return head + 'UNMEASURED — ' + (s.why ?? 'unread')
    if (c.truth === null || s.count === c.truth) return head + String(s.count).padStart(6)
    const d = s.count - c.truth
    return head + String(s.count).padStart(6) + `   BEHIND by ${-d}`.replace('BEHIND by -', 'AHEAD by ')
  }).join('\n')
}
