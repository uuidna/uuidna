import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { adjudicate } from './index.js'
import { gatherOpenLeads, gatherOpenItems } from './school/open/questions/springs.js'
import { ROOT } from './boundary.js'
import { openLeadsPublic, openLeadVerdict } from './desk/project/surface/index.js'
import { theorems } from './theorems/index.js'
import { handleOf } from './handle.js'
import { toUuid } from './address.js'

test('gatherOpenLeads — every lead adjudicates UNVERIFIED', () => {
  for (const item of gatherOpenLeads(ROOT)) {
    assert.equal(adjudicate(item.claim).verdict, 'UNVERIFIED', item.claim.slice(0, 80))
  }
})

test('openLeadsPublic — a universal claim citing a single-instance theorem stays OPEN, the citation shown as evidence', () => {
  const claim = 'For every size n the commission is two, backed by theorem two_coins.'
  assert.equal(adjudicate(claim).verdict, 'VERIFIED', 'the citation floor alone passes it — which is why it is not the verdict here')
  const r = openLeadsPublic({ items: [{ claim, source: 't' }] })
  assert.equal(r.verified, 0)
  assert.equal(r.open, 1)
  assert.deepEqual(r.items[0]!.cites, ['two_coins'])
  assert.equal(openLeadVerdict(claim).verdict, 'OPEN')
})

test('openLeadsPublic — an exact statement match VERIFIES, spacing normalised; a near miss stays OPEN', () => {
  const r = openLeadsPublic({ items: [{ claim: '110 - 108 = 2', source: 't' }, { claim: '110-108 = 2', source: 't' }, { claim: '110 - 108 = 3', source: 't' }] })
  assert.equal(r.verified, 2)
  assert.deepEqual(r.decided.map((d) => d.key), ['two_coins', 'two_coins'])
  assert.equal(r.open, 1)
  assert.equal(r.items[0]!.claim, '110 - 108 = 3')
})

test('openLeadsPublic — a claim whose involution_<h> : ¬ lead_<h> is sealed is REFUTED; its handle\'s lead is not proved', () => {
  const leads = JSON.parse(readFileSync(join(ROOT, 'lean/leads.json'), 'utf8')) as { refuted: { lead: string }[] }
  const sealedHandles = new Set(theorems().filter((t) => /^involution_[0-9a-f]{8}$/.test(t.key) && t.statement.trim() === `¬ lead_${t.key.slice(11)}`).map((t) => t.key.slice(11)))
  const refuted = leads.refuted.map((r) => r.lead.trim()).filter((l) => sealedHandles.has(handleOf(toUuid(l))))
  assert.ok(refuted.length > 0, 'the ledger holds at least one involution for a recorded lead')
  const r = openLeadsPublic({ items: refuted.map((claim) => ({ claim, source: 't' })) })
  assert.equal(r.refuted, refuted.length)
  assert.equal(r.verified, 0)
  assert.equal(r.open, 0)
  assert.ok(r.decided.every((d) => d.verdict === 'REFUTED' && d.key === `involution_${handleOf(toUuid(d.claim))}`))
})

test('openLeadVerdict — a fixture ledger decides by the claim\'s own handle only', () => {
  const claim = 'the fixture lead'
  const h = handleOf(toUuid(claim))
  assert.equal(openLeadVerdict(claim, [{ key: `involution_${h}`, statement: `¬ lead_${h}` }]).verdict, 'REFUTED')
  assert.equal(openLeadVerdict(claim, [{ key: 'p', statement: `lead_${h}` }]).verdict, 'VERIFIED')
  assert.equal(openLeadVerdict(claim, [{ key: 'involution_0000ffff', statement: '¬ lead_0000ffff' }]).verdict, 'OPEN')
})

test('gatherOpenItems is an alias for gatherOpenLeads', () => {
  assert.deepEqual(gatherOpenItems(ROOT), gatherOpenLeads(ROOT))
})

test('gatherOpenLeads excludes a claim sealed by citation', () => {
  const key = 'two_coins'
  const claim = `The commission is two, backed by theorem ${key}.`
  assert.equal(adjudicate(claim).verdict, 'VERIFIED')
  const leads = gatherOpenLeads(ROOT)
  assert.ok(!leads.some((l) => l.claim === claim), 'a VERIFIED citation is not an open lead')
})

test('gatherOpenLeads excludes closed refuted and refused from lean/leads.json', () => {
  const leads = JSON.parse(readFileSync(join(ROOT, 'lean/leads.json'), 'utf8')) as {
    refuted?: { lead: string; killed_by?: string }[]
    refused?: { lead: string; boundary?: string }[]
  }
  const open = gatherOpenLeads(ROOT)
  for (const r of leads.refuted ?? []) {
    if (r.killed_by && r.lead) assert.ok(!open.some((l) => l.claim === r.lead), 'refuted with killed_by is closed')
  }
  for (const r of leads.refused ?? []) {
    if (r.boundary && r.lead) assert.ok(!open.some((l) => l.claim === r.lead), 'refused with boundary is closed')
  }
})
