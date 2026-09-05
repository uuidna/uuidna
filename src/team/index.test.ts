import { test } from 'node:test'
import assert from 'node:assert/strict'
import { teamFor, teamSize, skillsFor } from './index.js'
import { SKILLS, theorems } from '../theorems/index.js'
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

// THE FINDING THIS SURFACE MADE ON ITS FIRST REAL RUN, AND ITS CLOSURE. Run over a live telecom estate's
// portfolio, `crypto` came back as a GAP — not a matcher defect: the tree shipped sha256, chacha20, poly1305,
// hmac, pbkdf2 and AEAD, verified against the standards' own vectors, and NO SEALED THEOREM NAMED ANY OF THEM.
// The KAT suite proved the primitives; the ledger claimed nothing about them, so an application needing crypto
// staffed nobody. The earlier version of this test asserted the gap and said that closing it must fail here
// deliberately. It was closed the same day by lean/Crypto.lean, so this now asserts the CLOSURE — and keeps the
// history, because a finding erased once it is fixed teaches nobody why the check exists.
test('crypto is a sealed capability that staffs a seat — the gap this surface found is closed', () => {
  assert.equal(SKILLS.includes('crypto'), true, 'lean/Crypto.lean seals the wing; if this fails the wing was lost')
  const t = teamFor(['crypto'])
  assert.deepEqual(t.gaps, [], 'crypto was the gap; it is a capability now')
  assert.equal(t.seats.length, 1)
  assert.ok(t.seats[0]!.theorems >= 8, 'the wing sealed eight; fewer means theorems were dropped')
  assert.equal(t.seats[0]!.seat, 'crypto')
  // the adjacent capabilities that were always there, so the closure is not mistaken for the whole of crypto
  assert.ok(SKILLS.includes('cipher') && SKILLS.includes('crypt-salt'))
})

// AND THE WING CLAIMS NO SECURITY PROPERTY. The gap was closed by sealing STRUCTURAL laws — how the digests
// tile, how the padding closes, what the envelope costs. If a theorem ever appears claiming collision
// resistance, indistinguishability or unforgeability, it is claiming something the kernel cannot decide, and
// this fails rather than letting the wing quietly grow a claim it cannot carry.
test('the crypto wing seals shape, and claims no security property it could not decide', () => {
  const crypto = theorems().filter((t) => t.skill === 'crypto')
  assert.ok(crypto.length >= 8)
  for (const t of crypto) {
    const claim = (t.key + ' ' + t.name).toLowerCase()
    for (const forbidden of ['collision resistant', 'collision-resistant', 'indistinguishable', 'unforgeable',
      'is secure', 'proves security', 'cryptographically secure']) {
      assert.ok(!claim.includes(forbidden), `${t.key} claims "${forbidden}", which no decidable statement can carry`)
    }
  }
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
  // the gap example was `crypto` until the wing was sealed; it is a capability now, so the check moved to a
  // need the ledger genuinely carries nothing for. The assertion was never about crypto — it is that a need
  // with no sealed capability is REPORTED rather than absorbed into a neighbouring seat.
  const r = callTool('uuidna_team', { need: ['coins', 'legal', 'os', 'zzz-unsealed-capability'] }) as
    { seats: { seat: string; skills: string[]; theorems: number; learningOrder: string[] }[]
      gaps: string[]; matchedSkills: number; receipt: string; honest: string }
  assert.ok(r.seats.length > 0)
  assert.deepEqual(r.gaps, ['zzz-unsealed-capability'], 'the served door must report the gap, not hide it behind a seat')
  assert.equal(r.seats.reduce((n, s) => n + s.skills.length, 0), r.matchedSkills)
  assert.ok(r.seats.every((s) => s.learningOrder.length > 0), 'a seat with no learning order teaches nobody')
  assert.match(r.honest, /NOT a staffing plan|not a staffing plan/)
  assert.deepEqual(callTool('uuidna_team', { need: ['coins', 'legal', 'os', 'zzz-unsealed-capability'] }), r, 'same need, same answer')
})

test('uuidna_team — a need naming nothing sealed returns no seats and says so', () => {
  const r = callTool('uuidna_team', { need: ['zzz-nothing-here'] }) as { seats: unknown[]; gaps: string[] }
  assert.deepEqual(r.seats, [], 'an empty team beats a fabricated one')
  assert.deepEqual(r.gaps, ['zzz-nothing-here'])
})
