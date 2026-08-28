// search-feed — most-searched queries ring Lean; loud keys are online doors; silence and harvest are leads.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MOST_SEARCHED, FEED_QUERIES, portalQueries, queriesFromEvidence, searchFeed, titleOf } from '../search-feed.js'

test('meaning is always null — the mill fingerprints structure, never hidden sense', () => {
  const f = searchFeed()
  assert.equal(f.meaning, null)
  assert.ok(f.receipt.length > 8)
  assert.equal(f.door, `https://uuidna.com/${f.handle}`)
  assert.match(f.honest, /Meaning is null/)
})

test('the same declared corpus folds the same receipt', () => {
  assert.equal(searchFeed().receipt, searchFeed().receipt)
})

test('cricket stays silent — a most-searched query with no sealed neighbour is a lead, not a fake match', () => {
  const f = searchFeed()
  assert.ok(f.silent.includes('cricket'), 'cricket has no loud theorem neighbour')
  assert.ok(f.leads.some((l) => l.query === 'cricket' && !l.harvest), 'silence is a lead the desk proposes')
  assert.ok(!f.results.some((d) => d.query === 'cricket'), 'silence never becomes a door')
})

test('FIFA is not chess — stuffing a neighbour into the query is the accident this mill refuses', () => {
  const cup = searchFeed().results.filter((d) => d.query === 'fifa world cup')
  assert.ok(!cup.some((d) => /chess|nim/.test(d.key)), 'football does not ring chess or nim')
})

test('IBM 128 - 70 = 58 harvests as a mint candidate — not a rewrite of the sealed 48-gap', () => {
  const f = searchFeed()
  const ibm = f.leads.filter((l) => l.query === 'quantum advantage' && l.harvest)
  const frags = ibm.map((l) => (l.harvest?.fragment ?? '').replace(/\s+/g, ''))
  assert.ok(frags.some((frag) => frag.includes('128-70=58')), 'the paper arithmetic is a candidate')
  assert.ok(!ibm.some((l) => l.harvest?.key === 'usable_gap_is_two_to_eighty'), '48 stays frozen; 58 is a new bracket')
})

test('loud results are sealed theorem keys, never a count pin on the corpus', () => {
  const f = searchFeed()
  assert.ok(MOST_SEARCHED.length >= 1, 'the corpus is declared')
  for (const d of f.results) {
    assert.match(d.key, /^[a-z0-9_]+$/)
    assert.ok(d.resonance > 0, `${d.key} is loud`)
    assert.ok(d.skill.length > 0)
  }
})

test('a custom corpus is the set — order of listing does not move the receipt', () => {
  const q = [
    { id: 'a', query: 'uuid handle hexbit', source: 'test' },
    { id: 'b', query: 'cricket', source: 'test' },
  ] as const
  const r1 = searchFeed(q)
  const r2 = searchFeed([...q].reverse())
  assert.equal(r1.receipt, r2.receipt)
  assert.ok(r1.silent.includes('b'))
})

test('wired portals sit in the mill — ESCO chemistry, data.europa education, MathOverflow prime', () => {
  const portals = portalQueries()
  assert.ok(portals.some((q) => q.id === 'api-esco' && q.query === 'chemistry'))
  assert.ok(portals.some((q) => q.id === 'api-data-europa' && q.query === 'education'))
  assert.ok(portals.some((q) => q.id === 'api-cordis' && q.query === 'quantum'))
  assert.ok(portals.some((q) => q.source === 'mathoverflow.net' && q.query === 'prime'))
  assert.ok(FEED_QUERIES.some((q) => q.query === 'chemistry'), 'ESCO probe is in the default mill')
  assert.ok(FEED_QUERIES.length >= MOST_SEARCHED.length)
})

test('queriesFromEvidence turns unanswered-math notes into mill queries — title rings, ore harvests', () => {
  assert.equal(titleOf('MO open: Does a finite group of order 58 exist'), 'Does a finite group of order 58 exist')
  const live = queriesFromEvidence([
    { source: 'mathoverflow.net', address: 'c6516523-c0d4-8c08-84a3-ab2d888c0000',
      text: 'MO open: What is the 128 - 70 = 58 gap on 97 physical qubits' },
  ])
  assert.equal(live.length, 1)
  assert.equal(live[0]!.query, 'What is the 128 - 70 = 58 gap on 97 physical qubits')
  assert.ok(live[0]!.ore?.includes('128 - 70 = 58'))
  const f = searchFeed(live)
  const frags = f.leads.filter((l) => l.harvest).map((l) => (l.harvest?.fragment ?? '').replace(/\s+/g, ''))
  assert.ok(frags.some((frag) => frag.includes('128-70=58')), 'the unanswered-math ore harvests')
})

test('searchFeedOnline is the online mill — network stays in unansweredMath / collectApiEvidence', async () => {
  const { searchFeedOnline } = await import('../search-feed-online.js')
  assert.equal(typeof searchFeedOnline, 'function')
})
