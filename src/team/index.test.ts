import { test } from 'node:test'
import assert from 'node:assert/strict'
import { teamFor, teamSize, skillsFor } from './index.js'
import { SKILLS } from '../theorems/index.js'
import { componentsOf, skillCitationGraph } from '../citations/index.js'
import { callTool } from '../mcp.js'

test('skillsFor matches WHOLE words only — the homograph rule, or every need matches everything', () => {
  assert.deepEqual(skillsFor('os'), ['os'])
  assert.ok(!skillsFor('close').includes('os'), '"close" contains "os" and must not match it')
  assert.ok(!skillsFor('secret').includes('crt'), '"secret" contains "crt" and must not match it')
  assert.deepEqual(skillsFor(''), [], 'an empty need names nothing')
  assert.deepEqual(skillsFor('zzz-no-such-capability'), [])
  assert.ok(skillsFor('science pairs').includes('science-pairs'), 'a hyphenated skill is named in words')
})

test('the seat count IS the component count — it is a property of the work, not a preference', () => {
  const need = ['coins', 'legal', 'os', 'audit']
  const t = teamFor(need)
  const matched = need.flatMap(skillsFor)
  assert.equal(t.seats.length, componentsOf([...new Set(matched)], skillCitationGraph()).length)
  assert.equal(t.seatsAreComponents, true)
  assert.equal(teamSize(need), t.seats.length)
})

test('a seat partitions the matched skills — none dropped, none in two seats', () => {
  const t = teamFor(['coins', 'legal', 'os', 'audit', 'cipher', 'crt', 'memory'])
  const inSeats = t.seats.flatMap((s) => s.skills)
  assert.equal(new Set(inSeats).size, inSeats.length, 'a skill in two seats would double-count the work')
  assert.equal(inSeats.length, t.matchedSkills, 'every matched skill must be seated')
})

test('a need with no sealed capability is a NAMED GAP, never absorbed into a neighbouring seat', () => {
  const t = teamFor(['os', 'zzz-not-a-capability'])
  assert.deepEqual(t.gaps, ['zzz-not-a-capability'])
  assert.ok(t.seats.every((s) => !s.skills.includes('zzz-not-a-capability')))
  const none = teamFor(['zzz-a', 'zzz-b'])
  assert.deepEqual(none.seats, [], 'no capability is no team — not a team of nothing')
  assert.equal(none.gaps.length, 2)
})

// THE FINDING THIS SURFACE MADE ON ITS FIRST REAL RUN, kept as a test so it cannot quietly stop being true.
// Run over a live telecom estate's portfolio, `crypto` came back as a GAP. That is not a matcher defect: the
// tree ships sha256, chacha20, poly1305, hmac, pbkdf2 and AEAD, verified against the standards' own vectors —
// and NO SEALED THEOREM NAMES ANY OF THEM, so the capability axis carries no crypto skill. The KAT suite proves
// the primitives; the ledger claims nothing about them. This asserts the gap as it stands, so that whoever
// closes it by sealing a crypto wing sees this test fail and updates it deliberately.
test('crypto is a real GAP in the capability axis, not a matcher artefact', () => {
  assert.equal(SKILLS.includes('crypto'), false, 'if a crypto skill now exists, this gap has been closed — say so here')
  assert.deepEqual(teamFor(['crypto']).gaps, ['crypto'])
  assert.deepEqual(teamFor(['crypto']).seats, [], 'and it staffs nothing, which is the honest answer')
  // the adjacent capabilities that DO exist, so the gap is not mistaken for "no crypto anywhere"
  assert.ok(SKILLS.includes('cipher') && SKILLS.includes('crypt-salt'))
})

test('a seat names its largest skill, orders learning by what others cite, and points at a practice shelf', () => {
  const t = teamFor(['coins', 'legal'])
  const seat = t.seats[0]!
  assert.ok(seat.skills.includes(seat.seat), 'the seat name must be one of its own skills')
  assert.ok(seat.theorems > 0)
  assert.ok(seat.learningOrder.length > 0 && seat.learningOrder.length <= 8)
  assert.match(seat.shelf.route, /^\//)
  assert.match(seat.handle, /^[0-9a-f]{8}$/)
  assert.equal(seat.escoPhrases.length, seat.skills.length)
})

test('the answer is a function of the need alone — same need, same receipt; different need, different receipt', () => {
  assert.equal(teamFor(['os', 'audit']).receipt, teamFor(['os', 'audit']).receipt)
  assert.notEqual(teamFor(['os', 'audit']).receipt, teamFor(['os', 'legal']).receipt)
  assert.match(teamFor('os').honest, /not a staffing plan/)
})

test('uuidna_team — the served door answers with seats, gaps, and its own honesty', () => {
  const r = callTool('uuidna_team', { need: ['coins', 'legal', 'os', 'crypto'] }) as
    { seats: { seat: string; skills: string[]; theorems: number; learningOrder: string[] }[]
      gaps: string[]; matchedSkills: number; receipt: string; honest: string }
  assert.ok(r.seats.length > 0)
  assert.deepEqual(r.gaps, ['crypto'], 'the served door must report the gap, not hide it behind a seat')
  assert.equal(r.seats.reduce((n, s) => n + s.skills.length, 0), r.matchedSkills)
  assert.ok(r.seats.every((s) => s.learningOrder.length > 0), 'a seat with no learning order teaches nobody')
  assert.match(r.honest, /NOT a staffing plan|not a staffing plan/)
  assert.deepEqual(callTool('uuidna_team', { need: ['coins', 'legal', 'os', 'crypto'] }), r, 'same need, same answer')
})

test('uuidna_team — a need naming nothing sealed returns no seats and says so', () => {
  const r = callTool('uuidna_team', { need: ['zzz-nothing-here'] }) as { seats: unknown[]; gaps: string[] }
  assert.deepEqual(r.seats, [], 'an empty team beats a fabricated one')
  assert.deepEqual(r.gaps, ['zzz-nothing-here'])
})
