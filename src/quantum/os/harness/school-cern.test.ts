import { test } from 'node:test'
import assert from 'node:assert/strict'
import { schoolApiFetch, probeSchoolApis } from '../../../index.js'

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
test('the cern-opendata school rows carry recid and experiment when it answers, and nothing when it does not', async () => {
  const a = await schoolApiFetch('cern-opendata', { text: 'CMS Higgs', limit: 3 })
  if (a.declined) {
    assert.ok((a.note ?? '').length > 0, 'a decline must name itself')
    assert.equal(a.count, 0, 'a declined fetch with rows would be inventing them')
    return
  }
  assert.ok(a.count >= 1, 'CMS Higgs probe should return open-data records')
  assert.ok(a.results[0]?.id, 'each row carries the catalogue recid')
  assert.ok(String(a.results[0]?.experiment ?? '').length > 0)
})

test('the school heartbeat PROBES cern-opendata, and reports its verdict either way', async () => {
  const h = await probeSchoolApis()
  const cern = h.probes.find((p) => p.id === 'cern-opendata')
  assert.ok(cern, 'the heartbeat covering the source is ours; whether the source answers is not')
  assert.equal(typeof cern.ok, 'boolean', 'the probe must reach a verdict rather than omitting the row')
  if (!cern.ok) assert.ok((cern.note ?? '').length > 0, 'a failed probe must carry the reason it failed')
})
