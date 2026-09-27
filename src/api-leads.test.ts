// THE POINT OF THESE SOURCES IS THAT THEY CAN HOLD A RELEASE, so each one is shown holding it. A lead source that
// has never been observed to return an open lead is indistinguishable from one wired to nothing — which is exactly
// the state these four artefacts were in before this file existed.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { doiHarvestLeads, releaseLiveLeads, searchFeedLeads, waveQueueLeads, schoolQueueLeads, API_LEAD_READERS , mcpGapLeads } from './api-leads.js'

// ─── absent is UNREAD, and unread blocks ─────────────────────────────────────────────────────────────────────
test('api-leads: an absent artefact is unread, never clean', () => {
  for (const { source, of } of API_LEAD_READERS) {
    const r = of(null)
    assert.equal(r.reached, false, `${source} read an absent artefact as reached`)
    assert.equal(r.open.length, 0, `${source} invented leads from nothing`)
    assert.ok(r.why && r.why.length > 10, `${source} did not say why it could not answer`)
  }
})

// ─── doi-harvest ─────────────────────────────────────────────────────────────────────────────────────────────
test('api-leads: a disagreeing archive record is an open lead', () => {
  // the live artefact's real shape, and its real state: 4 owned, 4 read, 3 agree, 1 disagrees
  const r = doiHarvestLeads({
    owned: 4, readCount: 4, agreeing: 3,
    disagreeing: [{ id: 'uuidna-software:twin', declaredDoi: '10.5281/zenodo.21970356', liveRecordId: '21970356', liveTitle: 'uuidna sync chain' }],
    rows: [{ read: true }, { read: true }, { read: true }, { read: true }],
  })
  assert.equal(r.reached, true)
  assert.equal(r.open.length, 1)
  assert.match(r.open[0]!.what, /10\.5281\/zenodo\.21970356/)
  assert.match(r.open[0]!.owes, /zenodo-seals|cross-declare/)
})

test('api-leads: a record nobody could read is its own lead, so an outage cannot clear every claim', () => {
  const r = doiHarvestLeads({
    owned: 2, readCount: 1, agreeing: 1, disagreeing: [],
    rows: [{ read: true }, { read: false, id: 'clay', declaredDoi: '10.5281/zenodo.21781602', reason: 'zenodo answered 503' }],
  })
  assert.equal(r.open.length, 1, 'an unread record must not vanish into a clean census')
  assert.match(r.open[0]!.owes, /503/)
})

test('api-leads: a zero-owned census is unread rather than a clean sweep', () => {
  assert.equal(doiHarvestLeads({ owned: 0, readCount: 0, agreeing: 0, disagreeing: [], rows: [] }).reached, false)
})

// ─── release-live ────────────────────────────────────────────────────────────────────────────────────────────
test('api-leads: every failed outward check becomes a lead the release must clear', () => {
  const r = releaseLiveLeads({
    version: '0.3.1',
    checks: [
      { name: 'npm-version-published', ok: false, unread: false, measured: '18 versions published, latest 0.3.0', why: 'the version must exist on the registry' },
      { name: 'zenodo-version-deposited', ok: false, unread: false, measured: '17 versioned records, newest 0.3.0', why: 'the archive is where the release is permanent' },
      { name: 'npm-and-zenodo-agree', ok: true, unread: false, measured: 'npm 0.3.0 · zenodo 0.3.0', why: '' },
    ],
  })
  assert.equal(r.open.length, 2)
  assert.equal(r.settled, 1)
  assert.match(r.open[0]!.what, /0\.3\.1/)
})

test('api-leads: an unread outward check owes a re-run, not a fix', () => {
  const r = releaseLiveLeads({
    version: '0.3.0',
    checks: [{ name: 'zenodo-version-deposited', ok: false, unread: true, measured: 'zenodo.org answered 400', why: 'the archive is where the release is permanent' }],
  })
  assert.equal(r.open.length, 1)
  assert.match(r.open[0]!.owes, /unread is not live/)
})

test('api-leads: an empty check battery is unread — a battery of nothing passes everything', () => {
  assert.equal(releaseLiveLeads({ version: '0.3.0', checks: [] }).reached, false)
})

// ─── search-feed ─────────────────────────────────────────────────────────────────────────────────────────────
test('api-leads: a most-searched query the ledger cannot answer is an open lead', () => {
  const r = searchFeedLeads({
    online: true, queries: [{ id: 'gemini' }], results: [{ query: 'maps' }],
    leads: [{ query: 'gemini', what: 'most-searched query "gemini" rings no sealed theorem', owes: 'a `by decide` wing whose key names it' }],
  })
  assert.equal(r.open.length, 1)
  assert.match(r.open[0]!.what, /gemini/)
})

// STALE IS NOT EMPTY, AND IT IS NOT UNREAD EITHER. Returning `unread` here would discard the leads the artefact
// does hold — which was this reader's first behaviour, and the wrong one.
test('api-leads: an offline feed keeps its leads AND adds one for being offline', () => {
  const r = searchFeedLeads({
    online: false, queries: [{ id: 'gemini' }], results: [{ query: 'maps' }],
    leads: [{ query: 'gemini', what: 'most-searched query "gemini" rings no sealed theorem', owes: 'a wing' }],
  })
  assert.equal(r.reached, true, 'the artefact was read — staleness is a finding, not a failure to read')
  assert.equal(r.open.length, 2, 'the offline state is one lead and the known lead is still reported')
  assert.match(r.open[0]!.what, /OFFLINE/)
  assert.match(r.open[1]!.what, /gemini/, 'the real lead must survive a stale feed')
})

test('api-leads: an online feed adds no staleness lead', () => {
  const r = searchFeedLeads({ online: true, queries: [{ id: 'g' }], results: [], leads: [{ what: 'w', owes: 'o' }] })
  assert.equal(r.open.length, 1)
  assert.ok(!r.open.some((l) => /OFFLINE/.test(l.what)))
})

test('api-leads: a feed that asked nothing is unread', () => {
  assert.equal(searchFeedLeads({ online: true, queries: [], results: [], leads: [] }).reached, false)
})

// ─── wave-queue ──────────────────────────────────────────────────────────────────────────────────────────────
test('api-leads: a pending conveyor candidate is open; accepted and refused are both settled', () => {
  const r = waveQueueLeads({
    pending: [{ key: 'wave_probe_eleven_thirteens', why: 'two primes and their product', lean: 'theorem x : (11*13=143) := by decide' }],
    accepted: [{ key: 'a' }, { key: 'b' }],
    refused: [{ key: 'c', reason: 'not a by-decide' }],
  })
  assert.equal(r.open.length, 1)
  assert.equal(r.settled, 3, 'a refusal with a recorded reason is a verdict, not an open question')
  assert.match(r.open[0]!.owes, /kernel probe/)
})

test('api-leads: the live queue state — 0 pending, 963 accepted, 30 refused — holds no lead', () => {
  const r = waveQueueLeads({ pending: [], accepted: Array(963).fill({ key: 'a' }), refused: Array(30).fill({ key: 'b' }) })
  assert.equal(r.reached, true)
  assert.equal(r.open.length, 0)
  assert.equal(r.settled, 993)
})

test('api-leads: every reader is registered, so a new artefact is added in one place', () => {
  assert.equal(API_LEAD_READERS.length, 6)
  assert.deepEqual([...API_LEAD_READERS].map((r) => r.source).sort(),
    ['api-doi-harvest', 'api-release-live', 'api-school-queue', 'api-search-feed', 'api-wave-queue',
      'mcp-self-sufficiency'])
  for (const r of API_LEAD_READERS) assert.match(r.path, /^lean\/.+\.json$/)
})

// ─── school queue: our own edge, asked from outside ──────────────────────────────────────────────────────────
test('api-leads: an unprovisioned production route is an open lead, not a clean run and not a crash', () => {
  const r = schoolQueueLeads({ queue: 'https://uuidna.com/school/submissions?status=queued', state: 'unprovisioned', why: 'storage unavailable (no SCHOOL KV namespace bound)', graded: 0, void: 0 })
  assert.equal(r.reached, true, 'the route answered clearly — that is a reading, not a failure to read')
  assert.equal(r.open.length, 1)
  assert.match(r.open[0]!.owes, /wrangler kv namespace create SCHOOL/)
})

test('api-leads: a broken route is a lead too, and says so differently', () => {
  const r = schoolQueueLeads({ queue: 'q', state: 'broken', why: 'the queue answered 500' })
  assert.equal(r.open.length, 1)
  assert.match(r.open[0]!.what, /500/)
})

test('api-leads: a graded queue holds no lead, but a VOID submission does', () => {
  assert.equal(schoolQueueLeads({ state: 'graded', graded: 4, void: 0 }).open.length, 0)
  const v = schoolQueueLeads({ state: 'graded', graded: 4, void: 2 })
  assert.equal(v.open.length, 1)
  assert.match(v.open[0]!.what, /VOID/)
  assert.equal(v.settled, 4)
})

test('api-leads: a state this reader does not understand is unread, never assumed clean', () => {
  assert.equal(schoolQueueLeads({ state: 'something-new' }).reached, false)
  assert.equal(schoolQueueLeads({}).reached, false)
})

// THE DEADLOCK GUARD, from the lead side: an uncut release must open no lead, or publish.yml can never publish.
test('api-leads: a pending outward check opens no lead — otherwise the release gate blocks its own release', () => {
  const r = releaseLiveLeads({
    version: '0.3.1',
    checks: [
      { name: 'npm-version-published', ok: false, unread: false, pending: true, measured: 'no tag v0.3.1 exists', why: 'w' },
      { name: 'npm-tarball-complete', ok: true, unread: false, pending: false, measured: 'fine', why: '' },
    ],
  })
  assert.equal(r.open.length, 0, 'pending is "not yet", never a finding')
  assert.equal(r.reached, true)
})

test('api-leads: the same check without pending IS a lead', () => {
  const r = releaseLiveLeads({
    version: '0.3.1',
    checks: [{ name: 'npm-version-published', ok: false, unread: false, pending: false, measured: 'latest 0.3.0', why: 'it must exist' }],
  })
  assert.equal(r.open.length, 1)
})

test('api-leads: an ungraded but EMPTY queue holds no lead; waiting work does', () => {
  assert.equal(schoolQueueLeads({ state: 'ungraded', why: 'no lean here', graded: 0, void: 0 }).open.length, 0)
  const w = schoolQueueLeads({ state: 'ungraded', why: 'no lean here', graded: 0, void: 3 })
  assert.equal(w.open.length, 1)
  assert.match(w.open[0]!.what, /3 submission/)
})


// ── MCP SELF-SUFFICIENCY ────────────────────────────────────────────────────────────────────────────────────────

// UNREAD IS NOT ZERO GAPS, and here it is the likeliest state: the door requests accumulate in dist/, which a clean
// checkout does not carry, so CI reads nothing unless the census was generated and committed.
test('mcpGapLeads — an absent census is UNREAD and names how to produce it', () => {
  const r = mcpGapLeads(null)
  assert.equal(r.reached, false)
  assert.match(String(r.why), /gen-mcp-gaps/)
  assert.deepEqual(r.open, [])
})

test('mcpGapLeads — a census declaring no gaps at all is a reader failure, not a clean bill', () => {
  const r = mcpGapLeads({ kind: 'mcp-gap-census', records: 0, distinct: 0, gaps: [] })
  assert.equal(r.reached, false)
  assert.match(String(r.why), /reader failure/)
})

// ONLY THE REPEATED GAPS OPEN A LEAD: one escape is an escape, twice is the tree saying the door is load-bearing.
test('mcpGapLeads — a gap recorded once is settled evidence; recorded twice it opens a lead', () => {
  const r = mcpGapLeads({
    gaps: [
      { gap: 'no door commits a pathspec', hits: 15 },
      { gap: 'no door reads a broken source', hits: 2 },
      { gap: 'a one-off nobody needed again', hits: 1 },
    ],
  })
  assert.equal(r.reached, true)
  assert.equal(r.open.length, 2)
  assert.equal(r.settled, 1, 'the single escape counts as settled evidence, not as an open lead')
  assert.match(r.open[0]!.what, /15 times/)
  assert.match(r.open[0]!.owes, /build the door/)
})

test('mcpGapLeads — every lead carries the source, so the gate can attribute it', () => {
  const r = mcpGapLeads({ gaps: [{ gap: 'x', hits: 3 }] })
  assert.equal(r.open[0]!.source, 'mcp-self-sufficiency')
})
