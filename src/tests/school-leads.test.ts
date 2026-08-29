// school-leads — every lead from the record enrolls at school, or the roster is prose.
//
// CONTROL: an empty record yields an empty roster (unread ≠ empty is a different finder). A held, a refuted,
// and a refused each keep their kind. The live file's three lists all appear — a school that names only held
// is the defect this exists to close. Handles match /leads so two pages cannot address one lead two ways.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'
import { schoolLeads, leadsCensus, renderSchoolLeads, LEAD_KINDS } from '../school/leads/index.js'

test('an empty or unreadable record is an empty roster — not a padded one', () => {
  assert.deepEqual(schoolLeads(null), [])
  assert.deepEqual(schoolLeads(undefined), [])
  assert.deepEqual(schoolLeads({}), [])
  assert.deepEqual(schoolLeads({ held: 'not an array' } as never), [])
  assert.deepEqual(schoolLeads({ held: [{ lead: '   ' }] }), [])
})

test('all three kinds enroll, in kind order, with the /leads handle', () => {
  const roster = schoolLeads({
    held: [{ lead: 'name a finite structure', owes: 'a by decide' }],
    refuted: [{ lead: 'the count was wrong', killed_by: 'measured 3, not 4' }],
    refused: [{ lead: 'fold as the AEAD', boundary: 'RFC 8439 stays' }],
  })
  assert.equal(roster.length, 3)
  assert.deepEqual(roster.map((r) => r.kind), [...LEAD_KINDS])
  assert.equal(roster[0]!.handle, handleOf(toUuid('name a finite structure')))
  assert.match(roster[0]!.lesson, /by decide/)
  assert.match(roster[1]!.lesson, /measured 3/)
  assert.match(roster[2]!.lesson, /RFC 8439/)
  const c = leadsCensus(roster)
  assert.equal(c.of, 3)
  assert.equal(c.held + c.refuted + c.refused, c.of)
})

test('THE LIVE RECORD — every lead enrolls; a school that drops refused or refuted fails here', () => {
  const raw = JSON.parse(readFileSync(join(ROOT, 'lean', 'leads.json'), 'utf8')) as {
    held?: { lead?: string }[]
    refuted?: { lead?: string }[]
    refused?: { lead?: string }[]
  }
  const roster = schoolLeads(raw)
  const held = (raw.held ?? []).filter((r) => String(r.lead ?? '').trim()).length
  const refuted = (raw.refuted ?? []).filter((r) => String(r.lead ?? '').trim()).length
  const refused = (raw.refused ?? []).filter((r) => String(r.lead ?? '').trim()).length
  assert.equal(roster.length, held + refuted + refused, 'held + refuted + refused, none dropped')
  assert.ok(refused > 0, 'the live record carries refusals — they must enroll')
  assert.ok(refuted > 0, 'the live record carries refutals — they must enroll')
  const c = leadsCensus(roster)
  assert.equal(c.held, held)
  assert.equal(c.refuted, refuted)
  assert.equal(c.refused, refused)
  for (const r of roster) {
    assert.equal(r.handle, handleOf(toUuid(r.lead)), 'school handle matches /leads')
    assert.equal(r.handle.length, 8)
  }
})

test('the page names every kind and never back-ticks a lead as if it were sealed', () => {
  const roster = schoolLeads({
    held: [{ lead: 'open door' }],
    refused: [{ lead: 'fold as the AEAD', boundary: 'four widths stay' }],
  })
  const md = renderSchoolLeads(roster)
  assert.match(md, /## The leads \{#leads\}/)
  assert.match(md, /\bheld\b/)
  assert.match(md, /\brefused\b/)
  assert.match(md, /fold as the AEAD/)
  assert.match(md, /legal_only_the_proven_is_admitted/)
  assert.match(md, /silence_never_refutes/)
  assert.doesNotMatch(md, /`fold as the AEAD`/)
  assert.doesNotMatch(md, /`open door`/)
})

test('the school page carries the live roster — every handle, or the mill did not send them', () => {
  const raw = JSON.parse(readFileSync(join(ROOT, 'lean', 'leads.json'), 'utf8')) as Parameters<typeof schoolLeads>[0]
  const roster = schoolLeads(raw)
  const page = readFileSync(join(ROOT, 'docs', 'school.md'), 'utf8')
  assert.match(page, /## The leads \{#leads\}/)
  const c = leadsCensus(roster)
  assert.match(page, new RegExp(`${c.of} leads`))
  for (const r of roster) {
    assert.ok(page.includes('`' + r.handle + '`'), `${r.kind} ${r.handle} must enroll on /school`)
  }
})

test('42 refuted · 20 refused - the ledger boundary and measurement', () => {
  const raw = JSON.parse(readFileSync(join(ROOT, 'lean', 'leads.json'), 'utf8')) as {
    held?: { lead?: string }[]
    refuted?: { lead?: string }[]
    refused?: { lead?: string }[]
  }
  const roster = schoolLeads(raw)
  const c = leadsCensus(roster)
  assert.equal(c.refuted, 42, 'the ledger carries 42 refuted leads (measurement that closed them)')
  assert.equal(c.refused, 20, 'the ledger carries 20 refused leads (boundaries that were read)')
  assert.match(readFileSync(join(ROOT, 'docs', 'school.md'), 'utf8'), /42 refuted/, 'the school page renders the count')
  assert.match(readFileSync(join(ROOT, 'docs', 'school.md'), 'utf8'), /20 refused/, 'the school page renders the count')
})
