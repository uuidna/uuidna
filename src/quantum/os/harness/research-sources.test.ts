import { test } from 'node:test'
import assert from 'node:assert/strict'
import { researchSweep } from '../../../corroborate.js'
import { EXTENDED_RESEARCH_PROBES, EXTENDED_RESEARCH_SOURCE_NAMES } from '../npm/index.js'

test('CERN Open Data is wired in the extended research registry', () => {
  assert.ok(EXTENDED_RESEARCH_SOURCE_NAMES.includes('opendata.cern.ch'))
  assert.ok(EXTENDED_RESEARCH_PROBES.some((p) => p.id === 'opendata.cern.ch'))
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
test('opendata.cern.ch evidence rows are shaped when it answers, and absent when it does not', async () => {
  const probe = EXTENDED_RESEARCH_PROBES.find((p) => p.id === 'opendata.cern.ch')!
  const readings = await researchSweep(probe.query)
  const cern = readings.find((r) => r.source === 'opendata.cern.ch')
  assert.ok(cern, 'research sweep must include opendata.cern.ch — the SWEEP is ours, reachability is theirs')
  if (!cern.reached) {
    assert.ok((cern.why ?? '').length > 0, 'an unreached source must name why')
    assert.equal(cern.evidence.length, 0, 'and carry no evidence — rows without a read is the fabrication that would matter')
    return
  }
  assert.ok(cern.evidence.length >= 1, 'CMS Higgs probe should return at least one open-data record')
  assert.match(cern.evidence[0]!.note, /^CERN OD /)
})
