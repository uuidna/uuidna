import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { trialBookLead, trialAllBookLeads, bookTrialsUntried } from './index.js'
// ROOT IS IMPORTED, NOT RE-DERIVED — this file sits ONE level under the root, and the local
// `join(import.meta.dirname, '..', '..')` it used to carry climbed two, landing OUTSIDE the repo. The read then
// ENOENT'd before a single assertion ran, so the live book-leads fold was not being tested at all. boundary.ts
// declares the resolution once for exactly this reason; the fourth file this session found re-deriving it.
import { ROOT } from './boundary.js'

test('trialBookLead — remands narrative claim as UNVERIFIED', () => {
  const row = trialBookLead({
    claim: 'the vessel shall bear twelve souls upon the deep',
    sentence: '…twelve souls…',
    book: { id: 45493, title: 'On Yacht Sailing', address: 'fec13c42-2180-8890-83eb-c1e7fbd7300d' },
  })
  assert.equal(row.verdict, 'UNVERIFIED')
  assert.equal(row.instrumentValid, true)
  assert.match(row.receipt, /^[0-9a-f-]{36}$/)
})

test('trialAllBookLeads — folds live book-leads.json', () => {
  const raw = JSON.parse(readFileSync(join(ROOT, 'book-leads.json'), 'utf8')) as {
    lead: Parameters<typeof trialAllBookLeads>[0]
  }
  const record = trialAllBookLeads(raw.lead)
  assert.equal(record.count, raw.lead.length)
  assert.equal(record.verified + record.unverified, record.count)
  assert.equal(bookTrialsUntried(raw.lead.length, record), 0)
})
