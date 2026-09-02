// gap-survey — WHAT IS STILL OPEN, DERIVED FROM THE RECORDS. Counts never pinned; the survey recomputes.
// Desk-automatable gaps carry an act; kernel-only gaps cite sealed theorems — no boundary prose.
import { readRepoJson } from './desk/repo/json/index.js'
import { leadCensus, type SourceReading } from './leads.js'
import { theoremCountByFile, theoremCasesByFile, theoremByKey, theorems } from './theorems/index.js'
import { pendingHarvestLeads } from './search-feed.js'
import { waveQueueState } from './wave-deposit.js'
import { leadsTrialGaps, type LeadsRecord } from './school/leads/index.js'
import { gatherOpenLeads } from './school/open/questions/springs.js'
import { ROOT } from './boundary.js'
import { DERIVE_SURFACES_CMD } from './derive-surfaces-cmd.js'
import { alpineExpectedClaimKeys } from './quantum/os/domains/index.js'
import { bookTrialsUntried, type BookTrialsRecord } from './book-trials.js'
import { refusalTrialsOpen, type RefusalTrialsRecord } from './refusal-trials.js'

// ── boundary-law — NO BOUNDARY UNLESS IN THEOREMS. ──

export const BOUNDARY_POINTER = 'Boundary declared — theorem drift_is_named_or_caught'

export const BOUNDARY_THEOREMS = {
  harmony: 'drift_is_named_or_caught',
  admission: 'legal_only_the_proven_is_admitted',
  integrity: 'provenance_integrity_not_content_truth',
  silence: 'silence_never_refutes',
  window: 'window_not_universal',
  remand: 'legal_remand_is_total_nothing_discarded',
} as const

export type BoundaryTheoremKey = (typeof BOUNDARY_THEOREMS)[keyof typeof BOUNDARY_THEOREMS]

export function boundaryCitation(key: BoundaryTheoremKey): string {
  return `Boundary declared — theorem ${key}`
}

export function isSealedBoundaryTheorem(key: string): boolean {
  return theoremByKey().has(key)
}

export function allBoundaryTheoremsSealed(): string[] {
  const missing: string[] = []
  for (const key of Object.values(BOUNDARY_THEOREMS)) {
    if (!isSealedBoundaryTheorem(key)) missing.push(key)
  }
  return missing
}

const sealedKeys = (): ReadonlySet<string> => new Set(theoremByKey().keys())

export function hasBoundaryPointer(text: string, keys: ReadonlySet<string> = sealedKeys()): boolean {
  if (/Boundary declared — theorem [a-z][a-z0-9_]+/i.test(text)) return true
  if (/\/theorem\/[a-z][a-z0-9_]+/.test(text)) return true
  return [...text.matchAll(/\b([a-z][a-z0-9_]{6,})\b/g)].some((m) => keys.has(m[1]!))
}

export function bareBoundaryProse(text: string, keys: ReadonlySet<string> = sealedKeys()): boolean {
  // THE PHRASE THIS ONCE LED WITH IS GONE FROM THE TREE, and the sweep that removed it removed it from inside
  // this regex too — leaving /\b\b/, which matches EVERY string, so every boundary line read as unlawful. A
  // detector emptied of what it detects does not fail quietly: it fails loudly and in the wrong direction, which
  // is why a test caught it in one run. The remaining alternatives are the boundary tells that survive: an
  // explicit NOT PROVEN, a "never a chip/solver/proof", a "solves none". A line carrying one of those still
  // needs a sealed pointer beside it.
  if (!/\bNOT PROVEN\b|\bnever a (?:chip|solver|proof)\b|\bsolv(?:e[sd])?\s+none\b/i.test(text)) return false
  return !hasBoundaryPointer(text, keys)
}

// ── table-leads — tables.found vs sealed census. ──

export interface TableFound { wing: string; object: string; size: string }
export interface TableLead {
  wing: string
  file: string
  object: string
  stated: number
  /** ENUMERATED ROWS the wing seals — the summed `cases`, which is the unit a table row is measured in */
  sealed: number
  /** how those cases were split into theorems — informative, and deliberately not the denominator */
  theorems: number
  owes: string
}

export const tableFileOf = (wing: string): string => `${wing}.lean`

/** tableLeadsFrom(found, cases, theoremCounts) → the tables a wing STATES and has yet to ENUMERATE.
 *
 *  THE DENOMINATOR WAS THE WRONG QUANTITY (measured 2026-09-02). This compared a table's ROW COUNT against the
 *  number of THEOREMS in the wing's file, which are different units — and the difference is exactly what
 *  `by decide` is for: one theorem enumerating 512 rows seals a 512-row table. Counting it as "1" reported 56
 *  wings short, of which 21 had already enumerated their table: Editor.lean states 512 and carries 60739 cases
 *  across 4 theorems, Hardware states 64 and carries 2692, Calendar states 412 and carries 515. A gap that
 *  closable only by writing 8160 theorems reads as permanent debt and stops being read at all — the top lead asked for
 *  8160 theorems in Os.lean, which nobody would ever write.
 *
 *  So the sealed side is now the summed CASES, and the theorem count rides along in the report because both
 *  numbers are informative: cases say whether the table is enumerated, theorems say how it was split. This
 *  SHRINKS the metric from 56 to 35, and the shrink is earned by measuring the right thing rather than by
 *  loosening a threshold — which is why both numbers are printed rather than one. */
export function tableLeadsFrom(
  found: readonly TableFound[],
  cases: ReadonlyMap<string, number>,
  theoremCounts: ReadonlyMap<string, number> = new Map(),
): TableLead[] {
  const out: TableLead[] = []
  for (const row of found) {
    const stated = Number(row.size)
    if (!Number.isFinite(stated) || stated <= 0) continue
    const file = tableFileOf(row.wing)
    const sealed = cases.get(file) ?? 0
    if (sealed >= stated) continue
    const theorems = theoremCounts.get(file) ?? 0
    out.push({
      wing: row.wing,
      file,
      object: row.object,
      stated,
      sealed,
      theorems,
      owes: `${file} states ${row.object} (${stated}) and enumerates ${sealed} case(s) across ${theorems} theorem(s) — enumerate the table; desk proposes, kernel disposes`,
    })
  }
  return out.sort((a, b) => (b.stated - b.sealed) - (a.stated - a.sealed) || (a.wing < b.wing ? -1 : 1))
}

// ── lonely-gaps — wing-isolated theorems. ──

export interface LonelyGap {
  what: string
  fix: string
}

export function lonelyGaps(): LonelyGap[] {
  const STOP = /^(List|range|fun|all|Nat|Int|true|false|filter|map|length|sum|if|then|else)$/
  const toks = (s: string): Set<string> => new Set([
    ...(s.match(/[A-Za-z_][A-Za-z0-9_]{2,}/g) ?? []).filter((w) => !STOP.test(w)),
    ...(s.match(/\b\d+\b/g) ?? []),
  ])
  const byWing = new Map<string, ReturnType<typeof theorems>>()
  for (const t of theorems()) byWing.set(t.file, [...(byWing.get(t.file) ?? []), t])
  const gaps: LonelyGap[] = []
  for (const [file, ts] of byWing) {
    if (ts.length < 2) continue
    for (const t of ts) {
      const mine = toks(t.statement)
      if (mine.size === 0) continue
      if (ts.some((o) => o.key !== t.key && [...toks(o.statement)].some((w) => mine.has(w)))) continue
      gaps.push({
        what: `${t.key} shares no symbol and no constant with any neighbour in ${file} — \`${t.statement.slice(0, 46)}\``,
        fix: 'connect it: state it over a constant or definition the wing already uses, so the theorem leans on its neighbours instead of standing alone under its name',
      })
    }
  }
  return gaps
}

/** Re-export for gap buckets — defined in derive-surfaces-cmd to avoid circular init with fill-gaps-plan. */
export { DERIVE_SURFACES_CMD } from './derive-surfaces-cmd.js'

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
  /** Alpine claims the current catalogue implies that are neither sealed NOR already on the conveyor. */
  alpinePending: number
  wavePending: number
  waveInFlight: number
  refusalOpen: number
  bookTrialsUntried: number
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
  const short = tableLeadsFrom(tables?.tables?.found ?? [], theoremCasesByFile(), theoremCountByFile())
  const lonely = lonelyGaps().length
  const wave = waveQueueState(readRepoJson('lean/wave-queue.json'))
  const harvest = pendingHarvestLeads(wave.refused, wave.inFlight).length

  // THE ALPINE PHASES ASKED THE WRONG QUEUE (held lead 2). They gated on `harvest`, which counts SEARCH-FEED
  // leads — a stand-in taken because the honest signal was measured at 644 ms (lead 4) and that is too slow to
  // sit in a gate. Both leads dissolve at once: every Alpine claim embeds the catalogue count in its own name,
  // so the keys the catalogue implies are derivable without running any census, and the only question left is
  // whether the ledger or the conveyor already holds them.
  //
  // NEITHER SEALED NOR PENDING is the whole condition, and the pending half is not decoration: 57 Alpine claims
  // sit deposited-but-unsealed right now, which is the system working as designed — the desk proposes and the
  // kernel disposes on its own schedule. A gate that read the LEDGER alone would call those 57 pending forever
  // and re-offer them on every pass, so the phase would never go quiet while the kernel was simply taking its
  // time. Reading both is what makes the signal mean "there is something NEW to offer".
  const rawQueue = readRepoJson('lean/wave-queue.json') as { pending?: unknown[]; accepted?: unknown[] } | null
  const alpineQueued = new Set<string>(
    [...(rawQueue?.pending ?? []), ...(rawQueue?.accepted ?? [])].map((c) => String((c as { key?: unknown }).key ?? '')),
  )
  const sealedNames = new Set<string>(theorems().map((t: { name: string }) => t.name))
  const alpinePending = alpineExpectedClaimKeys().filter((k) => !sealedNames.has(k) && !alpineQueued.has(k)).length
  const trialsRecord = readRepoJson('lean/refusal-trials.json') as RefusalTrialsRecord | null
  const refusedCount = (record?.refused ?? []).filter((r) => String(r.boundary ?? '').trim() && String(r.lead ?? '').trim()).length
  const refusalOpen = trialsRecord ? refusalTrialsOpen(trialsRecord) : refusedCount
  const bookRaw = readRepoJson('book-leads.json') as { lead?: unknown[] } | null
  const bookCorpus = bookRaw?.lead?.length ?? 0
  const bookRecord = readRepoJson('lean/book-trials.json') as BookTrialsRecord | null
  const bookTrialsGap = bookTrialsUntried(bookCorpus, bookRecord)
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
  if (bookTrialsGap > 0) buckets.push({
    kind: 'book-trials', count: bookTrialsGap, automatable: true,
    act: 'node dist/scripts/trial-book-leads.js',
    note: `${boundaryCitation(BOUNDARY_THEOREMS.remand)} — trial every book-leads candidate; remand open doors to school`,
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
    alpinePending,
    wavePending: wave.pending,
    waveInFlight: wave.inFlight.size,
    refusalOpen,
    bookTrialsUntried: bookTrialsGap,
    buckets,
    kernelOnly,
    automatable,
  }
}
