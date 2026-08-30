import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CERN_OD, CERN_PROBE_QUERY, cernPortSearch, renderCernPort } from './index.js'

test('CERN port constants name the open-data API', () => {
  assert.match(CERN_OD, /^https:\/\/opendata\.cern\.ch/)
  assert.ok(CERN_PROBE_QUERY.length >= 3)
})

test('renderCernPort formats declined and answering states', () => {
  const declined = renderCernPort({
    definition: 'uuidnaOS·cern·opendata',
    query: 'x',
    count: 0,
    hits: [],
    declined: true,
    note: 'responded 503',
    receipt: 'abcd1234-0000-4000-8000-000000000000',
    handle: '00000000',
    hexbits: Array(32).fill(0),
    door: 'https://uuidna.com/00000000',
  })
  assert.match(declined, /DECLINED/)
  const ok = renderCernPort({
    definition: 'uuidnaOS·cern·opendata',
    query: 'CMS Higgs',
    count: 1,
    hits: [{ id: '1', title: 'sample', experiment: 'CMS', address: 'a'.repeat(36) }],
    declined: false,
    note: 'ok',
    receipt: 'abcd1234-0000-4000-8000-000000000000',
    handle: '00000000',
    hexbits: Array(32).fill(0),
    door: 'https://uuidna.com/00000000',
  })
  assert.match(ok, /ANSWERING/)
  assert.match(ok, /CMS 1/)
})

test('cernPortSearch reaches opendata.cern.ch for the declared probe', async () => {
  const r = await cernPortSearch(CERN_PROBE_QUERY, 3)
  assert.equal(r.declined, false, r.note)
  assert.ok(r.count >= 1)
  assert.equal(r.definition, 'uuidnaOS·cern·opendata')
})
