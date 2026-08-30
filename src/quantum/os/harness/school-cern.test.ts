import { test } from 'node:test'
import assert from 'node:assert/strict'
import { schoolApiFetch, probeSchoolApis } from '../../../index.js'

test('cern-opendata answers its declared school probe with structured rows', async () => {
  const a = await schoolApiFetch('cern-opendata', { text: 'CMS Higgs', limit: 3 })
  assert.equal(a.declined, false, a.note ?? 'CERN Open Data declined')
  assert.ok(a.count >= 1, 'CMS Higgs probe should return open-data records')
  assert.ok(a.results[0]?.id, 'each row carries the catalogue recid')
  assert.ok(String(a.results[0]?.experiment ?? '').length > 0)
})

test('school heartbeat includes cern-opendata when the API is live', async () => {
  const h = await probeSchoolApis()
  const cern = h.probes.find((p) => p.id === 'cern-opendata')
  assert.ok(cern, 'heartbeat must probe cern-opendata')
  assert.equal(cern.ok, true, cern.note)
})
