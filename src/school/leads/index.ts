// school/leads — EVERY LEAD ENROLLS AT SCHOOL.
//
// lean/leads.json carries three lists: held (open), refuted (closed by a measurement), refused (a boundary).
// /leads already renders them. /open-questions takes only the unverified remainder. The school curriculum named
// the held count in a practice and left the other two invisible — the same defect the wings table was written
// to close: a record the school does not name is a record the school does not teach.
//
// PURE over the record the caller hands in. The mill reads the file; this module does not. A student's answer
// to a held door is a two-coin deposit, never a comment. A refutation and a refusal are RESULTS: the measurement
// or the boundary is the lesson. Nothing here seals, mints, or verdicts.
import { toUuid } from '../../address.js'
import { handleOf } from '../../handle.js'
import { pageSafe } from '../../quantum/advantage/page/safe/index.js'

export const LEAD_KINDS = ['held', 'refuted', 'refused'] as const
export type LeadKind = (typeof LEAD_KINDS)[number]

export interface LeadRow {
  lead?: string
  owes?: string
  killed_by?: string
  replaced_by?: string
  boundary?: string
  note?: string
}

export interface LeadsRecord {
  held?: LeadRow[]
  refuted?: LeadRow[]
  refused?: LeadRow[]
}

export interface SchoolLead {
  kind: LeadKind
  lead: string
  lesson: string
  handle: string
  /** IN_TRIAL until measurement or boundary verifies it — held stays remanded; refuted/refused are results. */
  verdict: LeadTrialVerdict
}

/** Every lead is IN_TRIAL until evidence settles it — the same vocabulary as src/leads.ts and lean/leads.json. */
export type LeadTrialVerdict = 'IN_TRIAL' | 'REFUTED' | 'REFUSED'

const rowText = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')

/** leadTrialVerdict(kind, row) → IN_TRIAL for held; REFUTED/REFUSED only when killed_by/boundary is present. */
export function leadTrialVerdict(kind: LeadKind, row: LeadRow): LeadTrialVerdict {
  if (kind === 'held') return 'IN_TRIAL'
  if (kind === 'refuted') return rowText(row.killed_by) ? 'REFUTED' : 'IN_TRIAL'
  return rowText(row.boundary) ? 'REFUSED' : 'IN_TRIAL'
}

export function leadsTrialCensus(roster: readonly SchoolLead[]): {
  inTrial: number; refuted: number; refused: number; of: number
} {
  const inTrial = roster.filter((r) => r.verdict === 'IN_TRIAL').length
  const refuted = roster.filter((r) => r.verdict === 'REFUTED').length
  const refused = roster.filter((r) => r.verdict === 'REFUSED').length
  return { inTrial, refuted, refused, of: roster.length }
}

/** Gaps where a refuted/refused row lacks its settlement field — still in trial, not verified. */
export function leadsTrialGaps(record: LeadsRecord | null | undefined): string[] {
  const gaps: string[] = []
  if (!record || typeof record !== 'object') return gaps
  for (const row of rowsOf(record.refuted)) {
    const lead = rowText(row.lead)
    if (!lead) continue
    if (!rowText(row.killed_by)) gaps.push(`refuted without killed_by: ${lead.slice(0, 80)}`)
  }
  for (const row of rowsOf(record.refused)) {
    const lead = rowText(row.lead)
    if (!lead) continue
    if (!rowText(row.boundary)) gaps.push(`refused without boundary: ${lead.slice(0, 80)}`)
  }
  return gaps
}

const rowsOf = (raw: unknown): LeadRow[] => (Array.isArray(raw) ? raw as LeadRow[] : [])

const lessonOf = (row: LeadRow): string =>
  [row.owes, row.killed_by, row.replaced_by, row.boundary, row.note].filter((s) => typeof s === 'string' && s).join(' ')

/** schoolLeads(record) → every held, refuted, and refused lead, in that kind order, file order inside each kind.
 *  Empty lead text is skipped, not padded. Handle matches /leads so the two pages name the same address. */
export function schoolLeads(record: LeadsRecord | null | undefined): SchoolLead[] {
  if (!record || typeof record !== 'object') return []
  const out: SchoolLead[] = []
  for (const kind of LEAD_KINDS) {
    for (const row of rowsOf(record[kind])) {
      const lead = typeof row.lead === 'string' ? row.lead.trim() : ''
      if (!lead) continue
      out.push({
        kind, lead, lesson: lessonOf(row), handle: handleOf(toUuid(lead)),
        verdict: leadTrialVerdict(kind, row),
      })
    }
  }
  return out
}

export function leadsCensus(roster: readonly SchoolLead[]): { held: number; refuted: number; refused: number; of: number } {
  const held = roster.filter((r) => r.kind === 'held').length
  const refuted = roster.filter((r) => r.kind === 'refuted').length
  const refused = roster.filter((r) => r.kind === 'refused').length
  return { held, refuted, refused, of: roster.length }
}

const excerpt = (s: string, n = 220): string => (s.length > n ? s.slice(0, n) + '…' : s)

/** Markdown roster for /school. Leads are named in words, never backticked — a lead is not a sealed key. */
export function renderSchoolLeads(roster: readonly SchoolLead[]): string {
  const c = leadsCensus(roster)
  const rows = roster.map((r) => {
    const body = pageSafe(excerpt(r.lead).replace(/`/g, "'"))
    const lesson = r.lesson ? `\n  <br><small>${pageSafe(excerpt(r.lesson, 280).replace(/`/g, "'"))}</small>` : ''
    return `- **${r.kind}** · \`${r.handle}\` — ${body}${lesson}`
  })
  return [
    '<!-- leads: GENERATED by scripts/gen-school — every lead from the record, so none is invisible -->',
    '## The leads {#leads}',
    '',
    'Every lead the record carries enrolls here — held, refuted, and refused — so a curriculum cannot name only',
    'what someone remembered to write about. **All in trial unless verified:** held doors are remanded',
    '([open questions](/open-questions)); a refutation is a measurement that closed one; a refusal is a boundary',
    'that was read and respected. Nothing below is sealed: a lead is something noticed, and only a Lean proof',
    'settles anything ([`legal_only_the_proven_is_admitted`](/theorem/legal_only_the_proven_is_admitted)).',
    'Silence never refutes ([`silence_never_refutes`](/theorem/silence_never_refutes)). A student\'s answer is a',
    '**two-coin deposit**, never a comment ([`two_coins`](/theorem/two_coins)). The same record, addressed the',
    'same way, lives on [the leads page](/leads).',
    '',
    `**${c.of} leads** — ${c.held} held · ${c.refuted} refuted · ${c.refused} refused · ${leadsTrialCensus(roster).inTrial} in trial.`,
    '',
    ...(rows.length ? rows : ['- none — the record carries no lead today']),
    '<!-- /leads -->',
  ].join('\n')
}
