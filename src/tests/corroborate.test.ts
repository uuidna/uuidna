// corroborate — THE CONTROL THAT WAS MISSING.
//
// discover.ts states this law about itself: "a relation survives only if it holds AND stops holding when an input
// moves. That second test is the whole point — a discoverer without it reports the trivially true as though it were
// found." The corroboration path had no such control, so nothing could tell a verdict that DISCRIMINATES from one
// that always says yes. On 2026-08-20 it did not discriminate: corroborateWithResearch('qwertzuiop asdfghjkl
// yxcvbnm') returned CORROBORATED on a single CrossRef row, while reporter.ts had always required two INDEPENDENT
// SOURCES, requiring two INDEPENDENT sources. A function contradicting the rule it is named for.
//
// These assertions are PURE — the evidence is constructed
// weather. The live behaviour it was found by is recorded above.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { corroborate, toUuid, theorems, type ResearchEvidence } from '../index.js'

// ── THE CONTROL THAT WAS MISSING. discover.ts states this law about itself — "a relation survives only if it holds
// AND stops holding when an input moves" — and the corroboration path had no such control, so nothing could tell a
// verdict that discriminates from one that always says yes. MEASURED on 2026-08-20, before the fix:
// corroborateWithResearch('qwertzuiop asdfghjkl yxcvbnm') returned CORROBORATED on ONE CrossRef row, while
// reporter.ts had always required two INDEPENDENT SOURCES and this is the test that holds it.
test('corroboration needs TWO INDEPENDENT SOURCES — the sealed theorem', () => {
  const ev = (source: string, n: number): ResearchEvidence[] =>
    Array.from({ length: n }, (_, i) => ({ source, address: toUuid(`${source}:${i}`), note: '' }))

  // one row from one stream is what promoted gibberish; eight rows from one stream is the same fact, louder
  assert.equal(corroborate('x', ev('crossref.org', 1)).verdict, 'UNVERIFIED', 'one source is not corroboration')
  assert.equal(corroborate('x', ev('crossref.org', 8)).verdict, 'UNVERIFIED', 'ROWS are not sources — volume is not independence')
  assert.equal(corroborate('x', [...ev('crossref.org', 1), ...ev('zenodo.org', 1)]).verdict, 'CORROBORATED',
    'two independent sources clear the bar')
  assert.equal(corroborate('x', []).verdict, 'UNVERIFIED', 'silence is not-yet')

  // The rule no longer cites a theorem, so there is no citation to check. The purged one — named in words
  // here rather than backticked, because a dead key in backticks is a citation a reader cannot tell from a live
  // one — was the corroboration-needs-two key, and it stated
  // `1 < 2` — two bare literals, which the kernel confirms without ever reaching independence, sources or
  // corroboration. The threshold lives in corroborate.ts, and the assertions above are what hold it: they fail
  // if one source ever clears the bar, which no comparison of 1 to 2 could detect.

  // and the control in the other direction: a LOCAL seal still outranks everything, with no evidence at all
  assert.equal(corroborate('1 < 2', [], () => true).verdict, 'VERIFIED', 'a decidable test still seals alone')
})

// ── THE DENOMINATOR (2026-08-25). "Two independent sources" is a threshold over a set nobody was measuring.
//
// Every research source returned `[]` for three different worlds — the archive answered and held nothing, the
// archive REFUSED (rate-limit, 503), and the archive was never reached (offline, DNS, timeout) — so
// `independentSources >= 2` counted against a denominator that could silently shrink from five to two. With three
// archives down the bar became "two of the two that answered" and nothing said so; with all five down, a claim the
// world attests loudly came back UNVERIFIED, which reads as "nothing attests this" and was really "I could not ask".
//
// THE RULE: a silence only means something if the threshold was REACHABLE. The bar is two answering sources, so
// with fewer than two answers CORROBORATED was unreachable whatever the archives hold — that is UNMEASURED, and a
// caller does something different with it (retry) than with UNVERIFIED (think).
test('UNVERIFIED and UNMEASURED are different facts — silence versus deafness', async () => {
  const { corroborate, reachOf } = await import('../corroborate.js')
  const ev = (source: string): ResearchEvidence[] => [{ source, address: toUuid(source), note: '' }]

  // all five answered, none attests: the world was ASKED and said nothing. That is a real, weak datum.
  const asked = reachOf([
    { source: 'a', reached: true, why: null, evidence: [] }, { source: 'b', reached: true, why: null, evidence: [] },
    { source: 'c', reached: true, why: null, evidence: [] }, { source: 'd', reached: true, why: null, evidence: [] },
    { source: 'e', reached: true, why: null, evidence: [] },
  ])
  assert.equal(asked.answered, 5)
  assert.equal(corroborate('x', [], undefined, asked).verdict, 'UNVERIFIED', 'asked and unattested is not-yet')

  // nobody answered: the same empty evidence, a completely different fact about the world
  const deaf = reachOf([
    { source: 'a', reached: false, why: 'offline', evidence: [] }, { source: 'b', reached: false, why: 'HTTP 503', evidence: [] },
    { source: 'c', reached: false, why: 'timeout', evidence: [] }, { source: 'd', reached: false, why: 'DNS', evidence: [] },
    { source: 'e', reached: false, why: 'offline', evidence: [] },
  ])
  assert.equal(corroborate('x', [], undefined, deaf).verdict, 'UNMEASURED', 'unasked is not unattested')
  assert.deepEqual(corroborate('x', [], undefined, deaf).reach?.unreachable.length, 5, 'and it names who was missing')

  // ONE answering source cannot reach the bar even in principle, so its silence measures the network
  const one = reachOf([
    { source: 'a', reached: true, why: null, evidence: [] }, { source: 'b', reached: false, why: 'offline', evidence: [] },
  ])
  assert.equal(corroborate('x', [], undefined, one).verdict, 'UNMEASURED',
    'with one answer the two-source bar was unreachable whatever the archives hold')

  // TWO answered and TWO attest — the threshold is met and reachability changes nothing
  const two = reachOf([
    { source: 'crossref.org', reached: true, why: null, evidence: [] },
    { source: 'zenodo.org', reached: true, why: null, evidence: [] },
    { source: 'c', reached: false, why: 'offline', evidence: [] },
  ])
  assert.equal(corroborate('x', [...ev('crossref.org'), ...ev('zenodo.org')], undefined, two).verdict, 'CORROBORATED',
    'a partial sweep that still clears the bar is corroboration, not a maybe')

  // AND A LOCAL SEAL OUTRANKS A DEAF SWEEP: a by-decide proof needs no archive at all.
  assert.equal(corroborate('1 < 2', [], () => true, deaf).verdict, 'VERIFIED')
})

test('THE MUTATION: without reach, the verdict is exactly what it always was', async () => {
  const { corroborate } = await import('../corroborate.js')
  // every existing caller passes no reach and must be unmoved — the new state is opt-in, not a reinterpretation
  // of old results. Delete the `reach &&` guard and this becomes UNMEASURED, which would silently restate every
  // historical UNVERIFIED as "we never looked".
  assert.equal(corroborate('x', []).verdict, 'UNVERIFIED', 'no reach reported → the old meaning, unchanged')
  assert.equal(corroborate('x', []).reach, undefined, 'and no denominator is invented')
})

test('a source READING tells apart answered-with-nothing, refused, and never-reached', async () => {
  const { reachOf } = await import('../corroborate.js')
  const r = reachOf([
    { source: 'found', reached: true, why: null, evidence: [{ source: 'found', address: toUuid('x'), note: '' }] },
    { source: 'empty', reached: true, why: null, evidence: [] },      // looked, had none — a datum about the world
    { source: 'refused', reached: false, why: 'answered HTTP 429', evidence: [] },
    { source: 'offline', reached: false, why: 'fetch failed', evidence: [] },
  ])
  assert.equal(r.asked, 4)
  assert.equal(r.answered, 2, 'an archive that LOOKED and found nothing still answered')
  assert.deepEqual(r.unreachable, ['refused', 'offline'], 'and the two that did not are named, with reasons kept')
})
