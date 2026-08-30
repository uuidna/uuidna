import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { adjudicate } from './index.js'
import { gatherOpenLeads, gatherOpenItems } from './school/open/questions/springs.js'
import { ROOT } from './boundary.js'

test('gatherOpenLeads — every lead adjudicates UNVERIFIED', () => {
  for (const item of gatherOpenLeads(ROOT)) {
    assert.equal(adjudicate(item.claim).verdict, 'UNVERIFIED', item.claim.slice(0, 80))
  }
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
