// gap-survey — WHAT IS STILL OPEN, DERIVED FROM THE RECORDS. Counts never pinned; the survey recomputes.
// Desk-automatable gaps carry an act; kernel-only gaps cite sealed theorems — no boundary prose (boundary-law.ts).
import { boundaryCitation, BOUNDARY_THEOREMS } from './boundary-law.js'
import { readRepoJson } from './desk/index.js'
import { leadCensus, type SourceReading } from './leads.js'
import { tableLeadsFrom } from './table-leads.js'
import { theoremCountByFile } from './theorems/index.js'
import { pendingHarvestLeads } from './search-feed.js'
import { waveQueueState } from './wave-deposit.js'
import { leadsTrialGaps, type LeadsRecord } from './school/leads/index.js'
import { gatherOpenLeads } from './school/open/questions/springs.js'
import { lonelyGaps } from './lonely-gaps.js'
import { ROOT } from './boundary.js'
import { DERIVE_SURFACES_CMD } from './derive-surfaces.js'
import { refusalTrialsOpen, type RefusalTrialsRecord } from './refusal-trials.js'

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
  openLeads: number
  tableShort: number
  tableLeadTop: { file: string; object: string; gap: number } | null
  lonely: number
  harvest: number
  wavePending: number
  waveInFlight: number
  refusalOpen: number
  buckets: GapBucket[]
  kernelOnly: GapBucket[]
  automatable: GapBucket[]
}

const readLeadsRecord = (): LeadsRecord | null =>
  readRepoJson('lean/leads.json') as LeadsRecord | null

/** gapSurvey(root?, readings?) → every gap class the tree names, with desk vs kernel split. */
export function gapSurvey(_root: string = ROOT, readings: readonly SourceReading[] = []): GapSurvey {
  const record = readLeadsRecord()
  const trialGaps = record ? leadsTrialGaps(record).length : 0
  const held = (record?.held ?? []).filter((r) => String(r.lead ?? '').trim()).length
  const openLeads = gatherOpenLeads().length
  const tables = record as { tables?: { found?: { wing: string; object: string; size: string }[] } } | null
  const short = tableLeadsFrom(tables?.tables?.found ?? [], theoremCountByFile())
  const lonely = lonelyGaps().length
  const wave = waveQueueState(readRepoJson('lean/wave-queue.json'))
  const harvest = pendingHarvestLeads(wave.refused, wave.inFlight).length
  const trialsRecord = readRepoJson('lean/refusal-trials.json') as RefusalTrialsRecord | null
  const refusedCount = (record?.refused ?? []).filter((r) => String(r.boundary ?? '').trim() && String(r.lead ?? '').trim()).length
  const refusalOpen = trialsRecord ? refusalTrialsOpen(trialsRecord) : refusedCount
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
  if (refusalOpen > 0) buckets.push({
    kind: 'refusal-trials', count: refusalOpen, automatable: true,
    act: 'node dist/scripts/trial-refusals.js --books',
    note: `${boundaryCitation(BOUNDARY_THEOREMS.silence)} — trial each refused boundary against the ledger and book corpus until lean or exposed`,
  })
  if (openLeads > 0) buckets.push({
    kind: 'open-leads', count: openLeads, automatable: true,
    act: DERIVE_SURFACES_CMD,
    note: `${boundaryCitation(BOUNDARY_THEOREMS.silence)} — only held and undecided prose develop feed open-questions; refuted and refused are closed on docs/leads`,
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
    openLeads,
    tableShort: short.length,
    tableLeadTop: short.length
      ? { file: short[0]!.file, object: short[0]!.object, gap: short[0]!.stated - short[0]!.sealed }
      : null,
    lonely,
    harvest,
    wavePending: wave.pending,
    waveInFlight: wave.inFlight.size,
    refusalOpen,
    buckets,
    kernelOnly,
    automatable,
  }
}
