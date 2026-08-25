// wave-supply — WHY THE CONVEYOR IS EMPTY, which is not the same question as whether it is empty.
//
// The wave has a clock and no supply. wave.yml drains lean/wave-queue.json twice daily and deliberately never
// fills it — "no new claim enters the ledger from a cron, because a seal needs an author who can answer for it" —
// so `pending` returns to zero on a schedule and stays there until an author deposits. That much is by design.
//
// WHAT IS NOT BY DESIGN is that nothing could tell an empty conveyor from an exhausted one. circle.ts asked
// `pending === 0` and called the answer QUIET — "the tree is at its fixed point" — which reads as success and is
// true only in the arithmetic sense. Two completely different states print it: a tree that has sealed everything
// its finders know to look for, and a tree whose finders have simply stopped producing. The first is an
// achievement. The second is a stall wearing an achievement's words, and the loop that exists to keep development
// moving was the one component that could not see it.
//
// So the census is taken from the SOURCES rather than from the queue. Every finder that can propose work is asked
// how much it currently holds, and the answer carries WHICH finder is empty — because "no gaps, no leads, no
// exposed axioms" is a statement about the FINDERS, not about the tree. A finder that can only re-check
// assumptions someone already wrote down goes quiet the moment its table is fully proven, and reports that as
// health. (axiom-hunt is exactly this shape today: a hand-written CANDIDATES table, every entry now proven.)
//
// HONEST SCOPE: this counts what the existing finders hold. It does not discover work, and an exhausted census is
// evidence about the finders' reach, never a proof that no theorem remains to be found. Integrity, not truth.
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

/** One finder's current holding, and where a reader can go to check it. */
export interface SupplySource {
  name: string
  count: number
  where: string
  /** what this finder is able to notice at all — the reach an empty count is a statement about */
  reach: string
}

export interface Supply {
  sources: SupplySource[]
  /** candidates already validated and waiting on the kernel — the conveyor's own holding */
  pending: number
  /** everything a deposit could draw on, across every finder */
  available: number
  /** no finder holds anything: the conveyor is not merely empty, its suppliers are */
  exhausted: boolean
  honest: string
}

/** Count an array under `key` in a JSON file, or 0 when the file is absent or malformed. A missing finder holds
 *  nothing — which is the same count as an empty one, and deliberately so: this census reports SUPPLY, and both
 *  states supply nothing. What differs is the remedy, and the remedy belongs to the finder, not to the count. */
const countIn = (rel: string, key: string): number => {
  const p = join(ROOT, rel)
  if (!existsSync(p)) return 0
  try {
    const d = JSON.parse(readFileSync(p, 'utf8')) as Record<string, unknown>
    const v = d[key]
    return Array.isArray(v) ? v.length : 0
  } catch { return 0 }
}

/** waveSupply() → what every finder currently holds, and whether the conveyor is empty or its suppliers are. */
export function waveSupply(): Supply {
  const sources: SupplySource[] = [
    { name: 'gaps', count: countIn('gaps.json', 'gaps'), where: 'gaps.json',
      reach: 'coverage holes the gap predictor can name from the tree it scans' },
    { name: 'research-leads', count: countIn('research-leads.json', 'leads'), where: 'research-leads.json',
      reach: 'findings the desk filed for a proof it could not yet anchor' },
  ]
  const pending = countIn(join('lean', 'wave-queue.json'), 'pending')
  const available = sources.reduce((n, s) => n + s.count, 0)
  return {
    sources,
    pending,
    available,
    exhausted: available === 0 && pending === 0,
    honest:
      'A census of what the existing finders hold, never a discovery. An exhausted census is evidence about the ' +
      'FINDERS’ reach — it is not a proof that no theorem remains to be found, and it must never be read as one. ' +
      'axiom-hunt is deliberately absent from this count: it runs as a script rather than exporting its table, so ' +
      'counting it here would mean a second copy of that table, which the dry law refuses. Its verdict is printed ' +
      'by `npm run build && node dist/scripts/axiom-hunt.js`.',
  }
}

/** The one line a runner prints when it finds nothing to do — QUIET and DRY are different verdicts and must read
 *  as different verdicts. Quiet says the tree is settled; dry says the suppliers are. */
export const supplyVerdict = (s: Supply): string =>
  s.exhausted
    ? 'DRY — every finder is empty (' + s.sources.map((x) => `${x.name} ${x.count}`).join(', ') +
      ', pending 0). The conveyor is not finished, it is unsupplied: no finder currently holds a question, so ' +
      'nothing will enter the queue until an author deposits one or a finder gains reach.'
    : 'SUPPLIED — ' + s.available + ' candidate(s) across the finders (' +
      s.sources.filter((x) => x.count > 0).map((x) => `${x.name} ${x.count}`).join(', ') +
      ') and ' + s.pending + ' already pending on the conveyor.'
