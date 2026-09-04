import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  FUNDING_ROUTES, OPEN_LICENCES, DISQUALIFYING_CLAUSES, licenceObjections,
  evidencePack, eligibilityFor, fundingReport, fundingBlockers,
} from './funding.js'
import { THEOREMS } from './theorems/index.js'
import { publications } from './publish.js'
import { propositionAddress } from './proposition-address.js'
import { STANDING_DOI } from './handle-permanence.js'

// ELIGIBILITY IS THE ONLY PART OF A FUNDING EFFORT THAT CANNOT BE ARGUED WITH, so it is measured and the
// measurement is allowed to say no. A module reporting every route as promising would cost the captain sixty
// days on an application that fails at the gate.

test('the licence test names WHICH restriction disqualifies, not merely that one does', () => {
  const o = licenceObjections('CC-BY-NC-ND-4.0')
  assert.deepEqual(o.map((x) => x.code).sort(), ['NC', 'ND'], 'both restrictions must be named')
  for (const c of o) assert.ok(c.freedomBroken.length > 0, 'each must say which freedom it breaks')
  // and each alone is enough
  assert.deepEqual(licenceObjections('CC-BY-NC-4.0').map((x) => x.code), ['NC'])
  assert.deepEqual(licenceObjections('CC-BY-ND-4.0').map((x) => x.code), ['ND'])
  assert.deepEqual(licenceObjections('CC-BY-4.0'), [], 'CC-BY carries neither')
  assert.deepEqual(licenceObjections('Apache-2.0'), [])
})

test('no licence on the accepted list carries a disqualifying clause — the list is consistent with its own test', () => {
  for (const l of OPEN_LICENCES)
    assert.deepEqual(licenceObjections(l), [], `${l} is listed as open but fails the freedom test`)
  assert.ok(DISQUALIFYING_CLAUSES.length >= 2)
})

test('the evidence pack IS the live ledger, not a remembered figure', () => {
  const p = evidencePack()
  assert.equal(p.theorems, THEOREMS.length)
  assert.equal(p.propositions, new Set(THEOREMS.map((t) => propositionAddress(t.statement))).size)
  assert.equal(p.renamings, p.theorems - p.propositions)
  assert.equal(p.publications, publications().length)
  assert.equal(p.archiveDoi, STANDING_DOI, 'the pack must cite the one archive constant')
  assert.equal(p.axiomFree, true)
  assert.equal(p.claimsAllBacked, true)
})

// THE MEASUREMENT MUST BE ABLE TO SAY NO, and today it does.
test('NLnet is BLOCKED on the licence, and the blocker is the licence rather than a vague concern', () => {
  const nl = FUNDING_ROUTES.find((r) => r.id === 'nlnet-ngi-zero')!
  const el = eligibilityFor(nl, evidencePack(), '2026-09-04')
  assert.equal(el.eligible, false)
  assert.deepEqual(el.blockers.map((b) => b.requirement), ['open-licence'])
  assert.match(el.blockers[0]!.measured, /NC \(NonCommercial\) and ND \(NoDerivatives\)/)
  assert.match(el.blockers[0]!.toMeet, /separate, openly-licensed work/i, 'the fix must not require relicensing the archive')
})

test('a route with no unmet requirement reports eligible', () => {
  const h = FUNDING_ROUTES.find((r) => r.id === 'harmonic-research')!
  const el = eligibilityFor(h, evidencePack(), '2026-09-04')
  assert.equal(el.eligible, true)
  assert.deepEqual(el.blockers, [])
})

// TIME IS DATA. The countdown takes a reference date because a wall clock is not permitted here, and the
// arithmetic is checked against a case computed by hand: 2026-09-04 to 2026-11-03 is 26 + 31 + 3 = 60 days.
test('the deadline countdown is arithmetic over a supplied date, and it is correct', () => {
  const nl = FUNDING_ROUTES.find((r) => r.id === 'nlnet-ngi-zero')!
  assert.equal(eligibilityFor(nl, evidencePack(), '2026-09-04').daysLeft, 60)
  assert.equal(eligibilityFor(nl, evidencePack(), '2026-11-03').daysLeft, 0, 'the deadline day is zero days left')
  assert.equal(eligibilityFor(nl, evidencePack(), '2026-11-04').daysLeft, -1, 'past the deadline goes negative, not absent')
  // a rolling route has no countdown at all — absent, never zero
  const s = FUNDING_ROUTES.find((r) => r.id === 'continuous-sponsorship')!
  assert.equal(eligibilityFor(s, evidencePack(), '2026-09-04').daysLeft, null)
  // and with no reference date there is no countdown, rather than a guessed one
  assert.equal(eligibilityFor(nl, evidencePack()).daysLeft, null)
})

test('every route names a verified date and a real URL — no route on hearsay', () => {
  for (const r of FUNDING_ROUTES) {
    assert.match(r.verified, /^\d{4}-\d{2}-\d{2}$/, `${r.id}: no verification date`)
    assert.match(r.url, /^https:\/\//, `${r.id}: no URL to check`)
    assert.ok(r.fit.length > 40, `${r.id}: a fit that cannot be stated is not a fit`)
    if (r.deadline) assert.match(r.deadline, /^\d{4}-\d{2}-\d{2}$/)
  }
})

test('the report partitions eligible from blocked, and the blockers carry their fix', () => {
  const rep = fundingReport('2026-09-04')
  assert.equal(rep.eligible.length + rep.blocked.length, FUNDING_ROUTES.length, 'every route lands in exactly one side')
  assert.ok(rep.blocked.length > 0, 'a report with nothing blocked would not be measuring')
  const blockers = fundingBlockers()
  assert.ok(blockers.length > 0, 'the licence blocker must be reported, not smoothed away')
  for (const b of blockers) {
    assert.ok(b.what.length > 20, 'a blocker must say what it is')
    assert.ok(b.fix.length > 40, 'a blocker with no stated remedy is just bad news')
  }
})

test('the receipt is deterministic for a given date', () => {
  assert.equal(fundingReport('2026-09-04').receipt, fundingReport('2026-09-04').receipt)
})
