import { test } from 'node:test'
import assert from 'node:assert/strict'
import { researchSweep } from '../../../corroborate.js'
import { EXTENDED_RESEARCH_PROBES, EXTENDED_RESEARCH_SOURCE_NAMES } from '../npm/index.js'

test('CERN Open Data is wired in the extended research registry', () => {
  assert.ok(EXTENDED_RESEARCH_SOURCE_NAMES.includes('opendata.cern.ch'))
  assert.ok(EXTENDED_RESEARCH_PROBES.some((p) => p.id === 'opendata.cern.ch'))
})

test('opendata.cern.ch answers the CMS Higgs probe with evidence rows', async () => {
  const probe = EXTENDED_RESEARCH_PROBES.find((p) => p.id === 'opendata.cern.ch')!
  const readings = await researchSweep(probe.query)
  const cern = readings.find((r) => r.source === 'opendata.cern.ch')
  assert.ok(cern, 'research sweep must include opendata.cern.ch')
  assert.equal(cern.reached, true, cern.why ?? 'CERN Open Data unreachable')
  assert.ok(cern.evidence.length >= 1, 'CMS Higgs probe should return at least one open-data record')
  assert.match(cern.evidence[0]!.note, /^CERN OD /)
})
