// corroborate — THE CONTROL THAT WAS MISSING.
//
// discover.ts states this law about itself: "a relation survives only if it holds AND stops holding when an input
// moves. That second test is the whole point — a discoverer without it reports the trivially true as though it were
// found." The corroboration path had no such control, so nothing could tell a verdict that DISCRIMINATES from one
// that always says yes. On 2026-08-20 it did not discriminate: corroborateWithResearch('qwertzuiop asdfghjkl
// yxcvbnm') returned CORROBORATED on a single CrossRef row, while reporter.ts had always required two INDEPENDENT
// SOURCES, requiring two INDEPENDENT sources. A function contradicting the rule it is named for.
//
// These assertions are PURE — the evidence is constructed, not fetched, so this proves the RULE rather than the
// weather. The live behaviour it was found by is recorded above, not re-run here.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { corroborate, toUuid, theorems, type ResearchEvidence } from '../index.js'

// ── THE CONTROL THAT WAS MISSING. discover.ts states this law about itself — "a relation survives only if it holds
// AND stops holding when an input moves" — and the corroboration path had no such control, so nothing could tell a
// verdict that discriminates from one that always says yes. MEASURED on 2026-08-20, before the fix:
// corroborateWithResearch('qwertzuiop asdfghjkl yxcvbnm') returned CORROBORATED on ONE CrossRef row, while
// reporter.ts had always required two INDEPENDENT SOURCES and this is the test that holds it.
test('corroboration needs TWO INDEPENDENT SOURCES — the sealed theorem, not one row', () => {
  const ev = (source: string, n: number): ResearchEvidence[] =>
    Array.from({ length: n }, (_, i) => ({ source, address: toUuid(`${source}:${i}`), note: '' }))

  // one row from one stream is what promoted gibberish; eight rows from one stream is the same fact, louder
  assert.equal(corroborate('x', ev('crossref.org', 1)).verdict, 'UNVERIFIED', 'one source is not corroboration')
  assert.equal(corroborate('x', ev('crossref.org', 8)).verdict, 'UNVERIFIED', 'ROWS are not sources — volume is not independence')
  assert.equal(corroborate('x', [...ev('crossref.org', 1), ...ev('zenodo.org', 1)]).verdict, 'CORROBORATED',
    'two independent sources clear the bar')
  assert.equal(corroborate('x', []).verdict, 'UNVERIFIED', 'silence is not-yet, never false')

  // The rule no longer cites a theorem, so there is no citation to check. `corroboration_needs_two` stated
  // `1 < 2` — two bare literals, which the kernel confirms without ever reaching independence, sources or
  // corroboration. The threshold lives in corroborate.ts, and the assertions above are what hold it: they fail
  // if one source ever clears the bar, which no comparison of 1 to 2 could detect.

  // and the control in the other direction: a LOCAL seal still outranks everything, with no evidence at all
  assert.equal(corroborate('1 < 2', [], () => true).verdict, 'VERIFIED', 'a decidable test still seals alone')
})
