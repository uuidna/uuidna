// school-leads — every lead from the record enrolls at school, or the roster is prose.
//
// Counts and handles are DERIVED from lean/leads.json and the roster functions — never pinned as literals.
// A drifting constant is a crack; the live record moves, the invariants stay.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { toUuid } from './index.js'
import { handleOf } from './index.js'
import {
  schoolLeads, leadsCensus, leadsTrialCensus, leadsTrialGaps, leadTrialVerdict,
  renderSchoolLeads, LEAD_KINDS, type LeadKind, type LeadRow, type LeadsRecord,
} from './school/index.js'

const rowText = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')

const nonEmptyRows = (raw: unknown): number =>
  (Array.isArray(raw) ? raw : []).filter((r) => rowText((r as LeadRow).lead)).length

const liveRecord = (): LeadsRecord =>
  JSON.parse(readFileSync(join(ROOT, 'lean', 'leads.json'), 'utf8')) as LeadsRecord

/** Every roster row must mirror its source row: kind, handle, and trial verdict. */
function assertRosterMirrorsRecord(raw: LeadsRecord, roster: ReturnType<typeof schoolLeads>): void {
  const expected = LEAD_KINDS.reduce((n, k) => n + nonEmptyRows(raw[k]), 0)
  assert.equal(roster.length, expected, 'held + refuted + refused with text, none dropped')
  for (const kind of LEAD_KINDS) {
    assert.equal(roster.filter((r) => r.kind === kind).length, nonEmptyRows(raw[kind]),
      `${kind} count matches the record`)
  }
  for (const kind of LEAD_KINDS) {
    for (const row of (Array.isArray(raw[kind]) ? raw[kind]! : [])) {
      const lead = rowText(row.lead)
      if (!lead) continue
      const entry = roster.find((r) => r.kind === kind && r.lead === lead)
      assert.ok(entry, `${kind} lead must enroll: ${lead.slice(0, 60)}`)
      assert.equal(entry.handle, handleOf(toUuid(lead)), 'school handle matches /leads')
      assert.equal(entry.handle.length, 8)
      assert.equal(entry.verdict, leadTrialVerdict(kind, row), 'trial verdict follows settlement fields')
    }
  }
}

/** Census on the rendered page must match what the roster derives — not a stale mill run. */
function assertPageMatchesRoster(page: string, roster: ReturnType<typeof schoolLeads>): void {
  const c = leadsCensus(roster)
  const t = leadsTrialCensus(roster)
  assert.match(page, /## The leads \{#leads\}/)
  assert.match(page, new RegExp(`\\*\\*${c.of} leads\\*\\*`))
  assert.match(page, new RegExp(`${c.held} held`))
  assert.match(page, new RegExp(`${c.refuted} refuted`))
  assert.match(page, new RegExp(`${c.refused} refused`))
  assert.match(page, new RegExp(`${t.inTrial} in trial`))
  assert.match(page, /All in trial unless verified/)
  for (const r of roster) {
    assert.ok(page.includes('`' + r.handle + '`'), `${r.kind} ${r.handle} must enroll on /school`)
  }
}

test('an empty or unreadable record is an empty roster — not a padded one', () => {
  assert.deepEqual(schoolLeads(null), [])
  assert.deepEqual(schoolLeads(undefined), [])
  assert.deepEqual(schoolLeads({}), [])
  assert.deepEqual(schoolLeads({ held: 'not an array' } as never), [])
  assert.deepEqual(schoolLeads({ held: [{ lead: '   ' }] }), [])
})

test('all three kinds enroll in kind order; handles and lessons follow the row', () => {
  const record: LeadsRecord = Object.fromEntries(
    LEAD_KINDS.map((kind, i) => [kind, [{ lead: `${kind}-${i}`, owes: 'owes', killed_by: 'killed', boundary: 'boundary', note: 'note' }]]),
  ) as LeadsRecord
  const roster = schoolLeads(record)
  assert.equal(roster.length, LEAD_KINDS.length)
  assert.deepEqual(roster.map((r) => r.kind), [...LEAD_KINDS])
  for (const r of roster) {
    assert.equal(r.handle, handleOf(toUuid(r.lead)))
    assert.ok(r.lesson.length > 0, 'settlement fields compose the lesson')
  }
  const c = leadsCensus(roster)
  assert.equal(c.of, LEAD_KINDS.length)
  assert.equal(c.held + c.refuted + c.refused, c.of)
})

test('trial law — verdict is IN_TRIAL until killed_by or boundary settles the row', () => {
  const cases: [LeadKind, LeadRow, ReturnType<typeof leadTrialVerdict>][] = [
    ['held', { lead: 'x' }, 'IN_TRIAL'],
    ['refuted', { lead: 'x', killed_by: 'measurement' }, 'REFUTED'],
    ['refuted', { lead: 'x' }, 'IN_TRIAL'],
    ['refused', { lead: 'x', boundary: 'named law' }, 'REFUSED'],
    ['refused', { lead: 'x' }, 'IN_TRIAL'],
  ]
  for (const [kind, row, expected] of cases) {
    assert.equal(leadTrialVerdict(kind, row), expected, `${kind} with ${JSON.stringify(row)}`)
  }
  const record: LeadsRecord = {
    held: [{ lead: 'held-0' }],
    refuted: [{ lead: 'refuted-0', killed_by: 'm' }, { lead: 'refuted-1' }],
    refused: [{ lead: 'refused-0', boundary: 'b' }, { lead: 'refused-1' }],
  }
  const roster = schoolLeads(record)
  const t = leadsTrialCensus(roster)
  assert.equal(t.inTrial, roster.filter((r) => r.verdict === 'IN_TRIAL').length)
  assert.equal(t.refuted, roster.filter((r) => r.verdict === 'REFUTED').length)
  assert.equal(t.refused, roster.filter((r) => r.verdict === 'REFUSED').length)
  assert.equal(t.inTrial, nonEmptyRows(record.held) + leadsTrialGaps(record).length)
  assert.equal(t.refuted + t.refused + t.inTrial, t.of)
})

test('render names every kind; leads stay out of backticks; trial law appears in the header', () => {
  const roster = schoolLeads(Object.fromEntries(
    LEAD_KINDS.map((kind) => [kind, [{ lead: `${kind}-render`, boundary: 'b', killed_by: 'k' }]]),
  ) as LeadsRecord)
  const md = renderSchoolLeads(roster)
  for (const kind of LEAD_KINDS) assert.match(md, new RegExp(`\\b${kind}\\b`))
  assert.match(md, /legal_only_the_proven_is_admitted/)
  assert.match(md, /silence_never_refutes/)
  assert.match(md, /All in trial unless verified/)
  for (const r of roster) assert.doesNotMatch(md, new RegExp('`' + r.lead.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '`'))
})

test('THE LIVE RECORD — roster, trial law, and /school page all derive from lean/leads.json', () => {
  const raw = liveRecord()
  const roster = schoolLeads(raw)
  assertRosterMirrorsRecord(raw, roster)
  assert.deepEqual(leadsTrialGaps(raw), [], `unsettled rows still in trial: ${leadsTrialGaps(raw).join('; ')}`)
  const t = leadsTrialCensus(roster)
  assert.equal(t.inTrial, nonEmptyRows(raw.held), 'only held doors stay in trial when the record is clean')
  assert.equal(t.refuted + t.refused + t.inTrial, t.of)
  assertPageMatchesRoster(readFileSync(join(ROOT, 'docs', 'school.md'), 'utf8'), roster)
})
