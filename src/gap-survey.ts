// gap-survey — WHAT IS STILL OPEN, DERIVED FROM THE RECORDS. Counts never pinned; the survey recomputes.
// Desk-automatable gaps carry an act; kernel-only gaps cite sealed theorems — no boundary prose (boundary-law.ts).
import { readFileSync, existsSync } from 'node:fs'
import { boundaryCitation, BOUNDARY_THEOREMS } from './boundary-law.js'
import { join } from 'node:path'
import { leadCensus, type SourceReading } from './leads.js'
import { tableLeadsFrom } from './table-leads.js'
import { theoremCountByFile } from './theorems/index.js'
import { searchFeed } from './search-feed.js'
import { waveQueueInFlightKeys, waveQueueRefusedKeys } from './wave-deposit.js'
import { leadsTrialGaps, type LeadsRecord } from './school/leads/index.js'
import { gatherOpenItems } from './school/open/questions/springs.js'
import { lonelyGaps } from './scripts/one-receipt.js'

export interface GapBucket {
  kind: string
  count: number
  /** desk may run the act without inventing a seal */
  automatable: boolean
  act: string
  note: string
}

export interface GapSurvey {
  releaseReady: boolean
  releaseOpen: number
  trialGaps: number
  openDoors: number
  tableShort: number
  lonely: number
  harvest: number
  wavePending: number
  waveInFlight: number
  buckets: GapBucket[]
  kernelOnly: GapBucket[]
  automatable: GapBucket[]
}

const readLeadsRecord = (root: string): LeadsRecord | null => {
  const p = join(root, 'lean', 'leads.json')
  if (!existsSync(p)) return null
  return JSON.parse(readFileSync(p, 'utf8')) as LeadsRecord
}

const waveCounts = (root: string): { pending: number; inFlight: number } => {
  const p = join(root, 'lean', 'wave-queue.json')
  if (!existsSync(p)) return { pending: 0, inFlight: 0 }
  try {
    const q = JSON.parse(readFileSync(p, 'utf8')) as { pending?: unknown[] }
    const inFlight = waveQueueInFlightKeys(p)
    return { pending: q.pending?.length ?? 0, inFlight: inFlight.size }
  } catch {
    return { pending: 0, inFlight: 0 }
  }
}

const harvestWaiting = (root: string): number => {
  try {
    const queue = join(root, 'lean', 'wave-queue.json')
    const inFlight = waveQueueInFlightKeys(queue)
    const refused = waveQueueRefusedKeys(queue)
    return searchFeed().leads.filter((l) => l.harvest && !inFlight.has(l.harvest.key) && !refused.has(l.harvest.key)).length
  } catch {
    return 0
  }
}

/** gapSurvey(root, readings?) → every gap class the tree names, with desk vs kernel split. */
export function gapSurvey(root: string, readings: readonly SourceReading[] = []): GapSurvey {
  const record = readLeadsRecord(root)
  const trialGaps = record ? leadsTrialGaps(record).length : 0
  const held = (record?.held ?? []).filter((r) => String(r.lead ?? '').trim()).length
  const openDoors = gatherOpenItems(root).length
  const tables = record as { tables?: { found?: { wing: string; object: string; size: string }[] } } | null
  const short = tableLeadsFrom(tables?.tables?.found ?? [], theoremCountByFile())
  const lonely = lonelyGaps().length
  const harvest = harvestWaiting(root)
  const wave = waveCounts(root)
  const release = readings.length ? leadCensus(readings) : { ready: true, open: [] as never[] }

  const buckets: GapBucket[] = []
  if (trialGaps > 0) buckets.push({
    kind: 'trial-gaps', count: trialGaps, automatable: false,
    act: 'settle lean/leads.json — refuted needs killed_by, refused needs boundary',
    note: boundaryCitation(BOUNDARY_THEOREMS.admission),
  })
  if (held > 0) buckets.push({
    kind: 'held-leads', count: held, automatable: false,
    act: 'move held[] to refuted[] with killed_by, refused[] with boundary, or seal by decide',
    note: boundaryCitation(BOUNDARY_THEOREMS.admission),
  })
  if (release.open.length > 0) buckets.push({
    kind: 'release-open', count: release.open.length, automatable: false,
    act: 'npm run x -- leads-gate — each open lead names its source and debt',
    note: boundaryCitation(BOUNDARY_THEOREMS.admission),
  })
  if (lonely > 0) buckets.push({
    kind: 'lonely-theorems', count: lonely, automatable: true,
    act: 'node dist/scripts/connect-lonely.js --write',
    note: boundaryCitation(BOUNDARY_THEOREMS.harmony),
  })
  if (harvest > 0) buckets.push({
    kind: 'search-feed-harvest', count: harvest, automatable: true,
    act: 'npm run books',
    note: boundaryCitation(BOUNDARY_THEOREMS.integrity),
  })
  if (wave.pending > 0) buckets.push({
    kind: 'wave-pending', count: wave.pending, automatable: true,
    act: 'npm run wave',
    note: boundaryCitation(BOUNDARY_THEOREMS.integrity),
  })
  if (short.length > 0) {
    const top = short[0]!
    buckets.push({
      kind: 'table-enumeration', count: short.length, automatable: false,
      act: `enumerate ${top.file} (${top.object})`,
      note: boundaryCitation(BOUNDARY_THEOREMS.window),
    })
  }
  if (openDoors > 0) buckets.push({
    kind: 'open-doors', count: openDoors, automatable: true,
    act: 'node dist/scripts/derive-prose-trials.js && node dist/scripts/gen-search-feed.js && node dist/scripts/gen-open-questions.js && node dist/scripts/gen-school.js',
    note: boundaryCitation(BOUNDARY_THEOREMS.silence),
  })

  buckets.push({
    kind: 'guard-heal', count: 1, automatable: true,
    act: 'npm run develop',
    note: 'deterministic cures for every taught gate signature',
  })

  const automatable = buckets.filter((b) => b.automatable)
  const kernelOnly = buckets.filter((b) => !b.automatable && b.count > 0)

  return {
    releaseReady: release.ready && trialGaps === 0 && held === 0,
    releaseOpen: release.open.length,
    trialGaps,
    openDoors,
    tableShort: short.length,
    lonely,
    harvest,
    wavePending: wave.pending,
    waveInFlight: wave.inFlight,
    buckets,
    kernelOnly,
    automatable,
  }
}
