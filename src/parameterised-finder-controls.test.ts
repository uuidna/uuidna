// parameterised-finder-controls — HANDING A VIOLATION TO THE FINDERS THAT TAKE THEIR INPUT AS AN ARGUMENT.
//
// lean/finder-controls-baseline.json counts the finders no test has ever shown to FIRE. A finder run only
// against a tree expected to be clean cannot tell "nothing to find" from "cannot find", and 2026-09-05 produced
// five blind ones, each caught by a second instrument or another session rather than by its own suite. The
// conveyor's kernel arm was the worst of them: thirty refusals on record and the kernel behind none, because a
// diagnostic arrived as an empty Buffer and `if (bad)` took the else branch.
//
// These two take pure data, so a violation goes in directly — no fixture, no filesystem, no temp directory.
// Each asserts BOTH directions. A control that only proves firing would equally pass a finder that flags
// everything, which is the failure mode the leak scanner's own exemption exists to avoid.
//
// The tree-reading finders are controlled in src/finder-controls.test.ts, which builds real fixtures for them.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ratchetGaps, type Ratchet } from './scripts/ratchet-gaps.js'
import { contextGaps, type WireTool } from './scripts/context-budget.js'

const ratchet = (over: Partial<Ratchet>): Ratchet =>
  ({ name: 'probe measure', prefix: 'no_such_ratchet_prefix_exists', direction: 'shrink', unit: 'probe', live: () => 1, ...over })

test('ratchetGaps FIRES on a measure with no sealed ceiling — nothing would notice it loosening', () => {
  const gaps = ratchetGaps([ratchet({})])
  assert.equal(gaps.length, 1)
  assert.match(gaps[0]!.what, /NO sealed ratchet/)
  assert.match(gaps[0]!.fix, /no_such_ratchet_prefix_exists_<value>/)
})

test('ratchetGaps FIRES on a measure that cannot be recomputed — unmeasurable is unenforceable', () => {
  const gaps = ratchetGaps([ratchet({ prefix: 'mcp_wire_rate', live: () => { throw new Error('instrument absent') } })])
  assert.equal(gaps.length, 1)
  assert.match(gaps[0]!.what, /could not be recomputed|NO sealed ratchet/)
})

test('ratchetGaps is SILENT on an empty roster — it reports measures, never their absence', () => {
  assert.deepEqual(ratchetGaps([]), [])
})

const tool = (name: string, description: string): WireTool => ({ name, description, inputSchema: { type: 'object' } })

test('contextGaps FIRES on a padded description — the cap is a RATE, so padding cannot hide behind a big surface', () => {
  const gaps = contextGaps([tool('probe_tool', 'x'.repeat(200_000))])
  assert.ok(gaps.length >= 1, 'a 200KB description must be caught')
  assert.match(gaps.map((g) => g.what).join(' '), /bytes per tool|NO ceiling is sealed/)
})

test('contextGaps is SILENT on a lean surface — the control proves it DISCRIMINATES, not that it complains', () => {
  const gaps = contextGaps([tool('a', 'Does one thing. Returns {ok}.'), tool('b', 'Does another. Returns {ok}.')])
  assert.equal(gaps.filter((g) => /bytes per tool/.test(g.what)).length, 0,
    'two short descriptions sit under any sealed rate; a finder that fires here fires on everything')
})
