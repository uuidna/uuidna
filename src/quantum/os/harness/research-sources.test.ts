import { test } from 'node:test'
import assert from 'node:assert/strict'
import { researchSweep } from '../../../corroborate.js'
import { RESEARCH_DOORS, RESEARCH_SOURCE_NAMES, publicApiRegistry } from '../npm/index.js'

// EVERY DOOR IS ASKED THE WAVE'S TOPIC (the captain, 2026-09-14: "there are no special cases. all researched in waves by
// topic and leaned in court"). A door declares only its API's facts; the topic below is this test's input, and the same
// topic reaches every door at once.
//
// WHEN THE ASSERTION IS ABOUT SOMEONE ELSE'S SERVER, IT IS NOT A TEST OF US. On 2026-09-05 the CERN probes went red while
// nothing in this tree had changed: the host answered in 18.2 s against a 10 s cap. So every branch asserts something
// about OUR code: if a door answers, its rows have the shape its reader writes; if it does not, the reading SAYS SO and
// carries no rows — the unread≠empty law, and the failure mode that would actually matter.
const shapedOrSilent = async (topic: string, doors: readonly (readonly [string, RegExp])[]): Promise<void> => {
  const readings = await researchSweep(topic)
  assert.equal(readings.length, RESEARCH_DOORS.length, 'the wave asks every door')
  for (const [host, shape] of doors) {
    assert.ok(RESEARCH_SOURCE_NAMES.includes(host), `${host} is a declared door`)
    const r = readings.find((x) => x.source === host)
    assert.ok(r, `the sweep includes ${host} — the SWEEP is ours, reachability is theirs`)
    if (!r.reached) {
      assert.ok((r.why ?? '').length > 0, `${host}: an unreached door must name why`)
      assert.equal(r.evidence.length, 0, `${host}: and carry no evidence — rows without a read is the fabrication that would matter`)
      continue
    }
    for (const e of r.evidence) assert.match(e.note, shape, `${host}: every row carries the shape its reader writes`)
  }
}

// THE FINDER THAT KEEPS IT FUSED (the captain, 2026-09-14: "all to be fused so noone may inject trojan logic capping
// research"): a door carries its API's facts and its reader and nothing more. Adding a per-door query, override, allow
// flag or prose field turns this red, because the registry adds nothing to a door: its research rows are exactly the doors.
test('every door is its API\'s facts only, and the registry research rows are read off the doors', () => {
  assert.equal(new Set(RESEARCH_SOURCE_NAMES).size, RESEARCH_DOORS.length, 'one door per host')
  for (const d of RESEARCH_DOORS) {
    assert.deepEqual(Object.keys(d).sort(), ['access', 'base', 'host', 'read'], `${d.host} carries no per-door logic beyond its API's facts`)
    assert.match(d.base, /^https:\/\//, `${d.host} declares the base its reader fetches`)
  }
  const rows = publicApiRegistry().research
  assert.deepEqual(rows.map((r) => [r.host, r.base, r.access, r.probe, r.honest]),
    RESEARCH_DOORS.map((d) => [d.host, d.base, d.access, undefined, undefined]), 'the registry adds nothing to a door')
})

test('opendata.cern.ch rows are shaped when it answers, and absent when it does not', async () => {
  await shapedOrSilent('CMS Higgs', [['opendata.cern.ch', /^CERN OD /]])
})

// THE SCRIPTURE DOORS: when a door answers, its rows carry the value our instrument computes (Genesis 1:1 is 2701, the
// count the tradition publishes); when it does not, it says why and carries no rows.
test('sefaria.org and api.quran.com rows carry the reference and its numeral value, or say why they are absent', async () => {
  await shapedOrSilent('Genesis 1:1', [['sefaria.org', /^Sefaria .+: gematria \d+$/], ['api.quran.com', /^Quran \d+:\d+: abjad \d+$/]])
  const sefaria = (await researchSweep('Genesis 1:1')).find((r) => r.source === 'sefaria.org')!
  if (sefaria.reached && sefaria.evidence.length === 1) assert.equal(sefaria.evidence[0]!.note, 'Sefaria Genesis 1:1: gematria 2701')
})

// THE LAW DOORS, UNDER THE SAME LAW (the captain, 2026-09-14: "fuse all law apis"): the publisher's record, shaped, or an
// absence that names why — never a verdict; what they answer is evidence the court leans.
test('the law doors answer with shaped records of the law, or say why they are absent', async () => {
  await shapedOrSilent('data protection', [
    ['federalregister.gov', /^Federal Register /],
    ['courtlistener.com', /^CourtListener /],
    ['legislation.gov.uk', /^UK legislation /],
    ['publications.europa.eu', /^EUR-Lex /],
  ])
})
