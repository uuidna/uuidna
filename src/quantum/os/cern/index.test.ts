import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CERN_OD, CERN_PROBE_QUERY, cernPortSearch, renderCernPort, topicalTo } from './index.js'

test('CERN port constants name the open-data API', () => {
  assert.match(CERN_OD, /^https:\/\/opendata\.cern\.ch/)
  assert.ok(CERN_PROBE_QUERY.length >= 3)
})

test('renderCernPort formats declined and answering states', () => {
  const declined = renderCernPort({
    definition: 'uuidnaOS·cern·opendata',
    query: 'x',
    count: 0,
    topical: 0,
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
    topical: 1,
    hits: [{ id: '1', title: 'sample', experiment: 'CMS', address: 'a'.repeat(36), topical: true }],
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

// WHEN THE ASSERTION IS ABOUT SOMEONE ELSE'S SERVER, IT IS NOT A TEST OF US. These CERN probes asserted
// `reached === true`, and on 2026-09-05 all three went red while nothing in this tree had changed: the host was
// answering opendata.cern.ch in 18.2s against a 10s cap. A red suite that means "their server is slow today"
// costs exactly what a flaky test costs — it stops being read. The journals test was folded for this same
// defect once already (it asserted a 6/10 threshold that measured other people's 429s).
//
// SO BOTH BRANCHES NOW ASSERT SOMETHING ABOUT OUR CODE. If CERN answers, the rows must have the shape we claim.
// If it does not answer, the reading must SAY SO and carry no fabricated rows — which is the unread≠empty law
// this tree holds everywhere else, and the failure mode that would actually matter. The test still fails on our
// bug in either weather; it no longer fails on theirs.
test('cernPortSearch answers with shaped rows when CERN answers, and reports unread when it does not', async () => {
  const r = await cernPortSearch(CERN_PROBE_QUERY, 3)
  assert.equal(r.definition, 'uuidnaOS·cern·opendata', 'the definition is ours and holds in either weather')
  if (r.declined) {
    assert.ok((r.note ?? '').length > 0, 'a declined read must say why — silence would be indistinguishable from an empty catalogue')
    assert.equal(r.count, 0, 'and it must carry NO rows: an unread source that reported records would be fabricating them')
    return
  }
  assert.ok(r.count >= 1, 'a reached probe that returns nothing for this query is our parsing, not their outage')
})

// A COINCIDENCE IS NOT A HIT. Measured 2026-11-09: "dimensional analysis units" returned three OPERA neutrino datasets
// (recids 13155, 13100, 10000), shaped exactly like the Higgs control's ATLAS records. The pair below holds both
// directions with the measured titles, so neither a floor that marks everything topical nor one that marks nothing passes.
test('topicalTo marks a title that shares the query\'s words and leaves a catalogue coincidence unmarked', () => {
  const opera = ['Electronic detector data for electron neutrino appearance studies',
    'Electronic detector data for neutrino-induced charmed hadron production studies',
    'Electronic detector data for tau neutrino appearance studies']
  for (const t of opera) assert.equal(topicalTo('dimensional analysis units', t), false, `not about the query: ${t}`)
  assert.equal(topicalTo('Higgs boson', 'Higgs boson candidate events in the four-lepton channel'), true, 'the control is about its query')
  assert.equal(topicalTo('neutrino appearance', opera[0]!), true, 'the same title is topical to a query that names it')
})
