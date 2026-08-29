import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { adjudicate } from '../adjudicate.js'
import { gatherOpenLeads, gatherOpenItems } from '../school/open/questions/springs.js'
import { ROOT } from '../scripts/api.js'

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

test('gatherOpenLeads includes refuted and refused from lean/leads.json', () => {
  const leads = JSON.parse(readFileSync(join(ROOT, 'lean/leads.json'), 'utf8')) as {
    refuted?: { lead: string; killed_by?: string }[]
    refused?: { lead: string; boundary?: string }[]
  }
  const open = gatherOpenLeads(ROOT)
  const sample = (leads.refuted ?? []).find((r) => r.killed_by && r.lead)
  if (sample) assert.ok(open.some((l) => l.claim === sample.lead), 'refuted lead is an open lead (UNVERIFIED)')
  const bound = (leads.refused ?? []).find((r) => r.boundary && r.lead)
  if (bound) assert.ok(open.some((l) => l.claim === bound.lead), 'refused lead is an open lead (UNVERIFIED)')
})
