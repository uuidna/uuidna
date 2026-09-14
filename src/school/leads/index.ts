// school/leads — EVERY LEAD ENROLLS AT SCHOOL.
//
// lean/leads.json carries two lists: trial (open, every lead in trial) and refuted (closed by a measurement). There is no third — the
// refused list is removed, because Lean decides (the captain, 2026-09-14): a hand-written boundary is not a verdict,
// only the kernel's is. /leads renders the record, and /open-questions takes
// every lead that adjudicates UNVERIFIED. A record the school does not name is a record the school does not teach.
//
// PURE over the record the caller hands in. The mill reads the file; this module does not. A student's answer
// to a lead in trial is a two-coin deposit, never a comment. A refutation is a RESULT: the measurement is the lesson.
// Nothing here seals, mints, or verdicts.
import { toUuid } from '../../address.js'
import { handleOf } from '../../handle.js'
import { pageSafe } from '../../quantum/advantage/page/safe/index.js'

export const LEAD_KINDS = ['trial', 'refuted'] as const
export type LeadKind = (typeof LEAD_KINDS)[number]

export interface LeadRow {
  lead?: string
  owes?: string
  killed_by?: string
  replaced_by?: string
  note?: string
}

export interface LeadsRecord {
  trial?: LeadRow[]
  refuted?: LeadRow[]
}

export interface SchoolLead {
  kind: LeadKind
  lead: string
  lesson: string
  handle: string
  /** IN_TRIAL until a measurement verifies it — a lead in trial stays remanded; refuted is a result. */
  verdict: LeadTrialVerdict
  /** a refuted lead whose settlement does not stand in the court: open again, its claim kept word for word */
  reopened: boolean
}

/** Every lead is IN_TRIAL until evidence settles it — the same vocabulary as src/leads.ts and lean/leads.json. */
export type LeadTrialVerdict = 'IN_TRIAL' | 'REFUTED'

const rowText = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')

/** leadTrialVerdict(kind, row, stands) → IN_TRIAL for a lead in trial; REFUTED only when killed_by is present AND the court says
 *  that settlement still stands (its theorem accepted by the kernel, every file it cites in the tree). Without the
 *  court's word it is IN_TRIAL — reopened by default, so no settlement escapes by being written down (the captain,
 *  2026-09-14: "reopen by default so no escape for traitors"; "noone can withdraw. only can prove what they meant"). */
export function leadTrialVerdict(kind: LeadKind, row: LeadRow, stands = false): LeadTrialVerdict {
  if (kind === 'trial') return 'IN_TRIAL'
  return rowText(row.killed_by) && stands ? 'REFUTED' : 'IN_TRIAL'
}

export function leadsTrialCensus(roster: readonly SchoolLead[]): { inTrial: number; refuted: number; of: number } {
  const inTrial = roster.filter((r) => r.verdict === 'IN_TRIAL').length
  const refuted = roster.filter((r) => r.verdict === 'REFUTED').length
  return { inTrial, refuted, of: roster.length }
}

/** Gaps where a refuted row lacks its measurement — still in trial, not verified. */
export function leadsTrialGaps(record: LeadsRecord | null | undefined): string[] {
  const gaps: string[] = []
  if (!record || typeof record !== 'object') return gaps
  for (const row of rowsOf(record.refuted)) {
    const lead = rowText(row.lead)
    if (!lead) continue
    if (!rowText(row.killed_by)) gaps.push(`refuted without killed_by: ${lead.slice(0, 80)}`)
  }
  return gaps
}

const rowsOf = (raw: unknown): LeadRow[] => (Array.isArray(raw) ? raw as LeadRow[] : [])

const lessonOf = (row: LeadRow): string =>
  [row.owes, row.killed_by, row.replaced_by, row.note].filter((s) => typeof s === 'string' && s).join(' ')

/** schoolLeads(record, standsAt?) → every lead in trial and every refuted lead, in that kind order, file order inside each kind.
 *  standsAt(i) is the court's word on the refuted lead at position i; absent, no settlement stands.
 *  Empty lead text is skipped, not padded. Handle matches /leads so the two pages name the same address. */
export function schoolLeads(record: LeadsRecord | null | undefined, standsAt?: (i: number) => boolean): SchoolLead[] {
  if (!record || typeof record !== 'object') return []
  const out: SchoolLead[] = []
  for (const kind of LEAD_KINDS) {
    rowsOf(record[kind]).forEach((row, i) => {
      const lead = typeof row.lead === 'string' ? row.lead.trim() : ''
      if (!lead) return
      const verdict = leadTrialVerdict(kind, row, kind === 'refuted' && standsAt ? standsAt(i) : false)
      out.push({
        kind, lead, lesson: lessonOf(row), handle: handleOf(toUuid(lead)),
        verdict, reopened: kind === 'refuted' && verdict === 'IN_TRIAL',
      })
    })
  }
  return out
}

/** in trial · reopened · refuted, where refuted counts only settlements that still stand */
export function leadsCensus(roster: readonly SchoolLead[]): { trial: number; reopened: number; refuted: number; of: number } {
  const trial = roster.filter((r) => r.kind === 'trial').length
  const reopened = roster.filter((r) => r.reopened).length
  const refuted = roster.filter((r) => r.kind === 'refuted' && !r.reopened).length
  return { trial, reopened, refuted, of: roster.length }
}

const excerpt = (s: string, n = 220): string => (s.length > n ? s.slice(0, n) + '…' : s)

/** Markdown roster for /school. Leads are named in words, never backticked — a lead is not a sealed key. */
export function renderSchoolLeads(roster: readonly SchoolLead[]): string {
  const c = leadsCensus(roster)
  const rows = roster.map((r) => {
    const body = pageSafe(excerpt(r.lead).replace(/`/g, "'"))
    const said = r.lesson ? pageSafe(excerpt(r.lesson, 280).replace(/`/g, "'")) : ''
    const lesson = r.reopened
      ? `\n  <br><small>claimed: ${said ? `<q>${said}</q>` : 'nothing recorded'} · owes the sealed theorem that proves what it meant</small>`
      : said ? `\n  <br><small>${said}</small>` : ''
    return `- **${r.reopened ? 'reopened' : r.kind}** · \`${r.handle}\` — ${body}${lesson}`
  })
  return [
    '<!-- leads: GENERATED by scripts/gen-school — every lead from the record, so none is invisible -->',
    '## The leads {#leads}',
    '',
    'Every lead the record carries enrolls here — in trial and refuted — so a curriculum cannot name only what someone',
    'remembered to write about. **All in trial unless verified:** leads in trial are remanded',
    '([open questions](/open-questions)); a refutation is a measurement that closed one. Nothing below is sealed: a',
    'lead is something noticed, and only a Lean proof settles anything',
    '([`legal_only_the_proven_is_admitted`](/theorem/legal_only_the_proven_is_admitted)).',
    'Silence never refutes ([`silence_never_refutes`](/theorem/silence_never_refutes)). A student\'s answer is a',
    '**two-coin deposit**, never a comment ([`two_coins`](/theorem/two_coins)). The same record, addressed the',
    'same way, lives on [the leads page](/leads).',
    '',
    `**${c.of} leads** — ${c.trial} in trial · ${c.reopened} reopened · ${c.refuted} refuted · ${leadsTrialCensus(roster).inTrial} in trial. A refutation stands only when it involutes inside Lean — the lead's claim stated as a proposition named for its handle, and the kernel's proof of its negation; a reopened one keeps what it claimed, word for word.`,
    '',
    ...(rows.length ? rows : ['- none — the record carries no lead today']),
    '<!-- /leads -->',
  ].join('\n')
}
