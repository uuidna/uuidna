// tool-exercise — THE UNDER-COVERAGE DEBT ONLY SHRINKS. audit-tool-exercise splits the MCP tools into those a
// test names directly and those covered only by an aggregate fold; this holds the split as a ratchet: a NEW
// aggregate-only tool (a handler shipped with no dedicated test) fails here by name, and a baseline entry that
// has EARNED a dedicated test must be removed. No count is pinned — the census is derived live, so the guard
// rides the sequence (lead 104): the ledger grows, the tool set grows, and the debt list is checked against
// what IS, never against a frozen number.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { toolExercise, baselineGaps } from './scripts/audit-tool-exercise.js'

test('the under-tested set is DECLARED and does not grow — new tools earn a test or a deliberate baseline entry', () => {
  const gaps = baselineGaps()
  assert.deepEqual(gaps, [], gaps.map((g) => g.what).join(' · ') || 'clean')
})

test('the census is honest — directly-exercised and aggregate-only partition the tools exactly', () => {
  const c = toolExercise()
  assert.equal(c.directlyExercised.length + c.aggregateOnly.length, c.tools, 'every tool is in exactly one class')
  assert.equal(new Set([...c.directlyExercised, ...c.aggregateOnly]).size, c.tools, 'no tool in both classes')
  assert.ok(c.directlyExercised.length > 0, 'some tools have dedicated tests — the lower bound is real, not zero')
  // the baseline is a subset of what IS aggregate-only (a declared debt cannot name a tool that is now tested)
  const sealed = JSON.parse(readFileSync(join(ROOT, 'lean', 'tool-exercise-baseline.json'), 'utf8')) as { aggregateOnly: string[] }
  const now = new Set(c.aggregateOnly)
  for (const t of sealed.aggregateOnly) assert.ok(now.has(t), `baseline names ${t} as under-tested but it now has a dedicated test — the list must shrink`)
})
