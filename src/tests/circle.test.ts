// circle — THE CLOSED LOOP'S DECISIONS, tested where they are pure. The driver runs gated commands (untestable
// without landing anything real), but everything it DECIDES BY is a function over the tree's own state: what
// counts as work, what counts as quiet, what a stop's finding says, and that a finding is never swallowed.
// The control that matters: quiet must be a MEASURED conjunction — if any arm of the census is non-zero the
// loop must not call the tree finished, because a circle that stops early leaves work no one is watching.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { workPending, isQuiet, recordFinding, gapOf } from '../scripts/circle.js'

test('the work census measures the tree and names each arm it finds', () => {
  const w = workPending()
  for (const n of [w.dirty, w.ahead, w.pending]) assert.ok(Number.isInteger(n) && n >= 0)
  assert.equal(w.reasons.length, [w.dirty, w.ahead, w.pending].filter((n) => n > 0).length,
    'every non-zero arm names itself, and no zero arm invents a reason')
})

test('CONTROL — quiet is the whole conjunction: any single arm keeps the loop working', () => {
  assert.equal(isQuiet({ dirty: 0, ahead: 0, pending: 0, reasons: [] }), true)
  for (const arm of ['dirty', 'ahead', 'pending'] as const) {
    const w = { dirty: 0, ahead: 0, pending: 0, reasons: [], [arm]: 1 } as ReturnType<typeof workPending>
    assert.equal(isQuiet(w), false, `${arm} alone must keep the circle turning`)
  }
})

test('a stop is FILED, not swallowed — the finding survives on disk with its gap and commit', () => {
  const path = join(mkdtempSync(join(tmpdir(), 'circle-')), 'findings.json')
  recordFinding({ round: 2, verdict: 'land stopped', gap: 'GAP something untaught', commit: 'abc1234' }, path)
  recordFinding({ round: 3, verdict: 'land stopped again', gap: 'GAP another', commit: 'def5678' }, path)
  const all = JSON.parse(readFileSync(path, 'utf8')) as unknown[]
  assert.equal(all.length, 2, 'findings accumulate; a page is never overwritten by the next')
})

test('the gap line is the objection itself, bounded — never the whole log dumped at a reader', () => {
  const log = 'walking…\n✗ guard — precede: 1 gap(s)\n    GAP docs/x.md is staged without its source\n    FIX stage the source'
  const gap = gapOf(log)
  assert.ok(gap.includes('GAP') || gap.includes('✗'), 'the objection is what gets filed')
  assert.ok(gap.length <= 400, 'bounded: a finding is a line to act on, not a transcript')
  assert.ok(gapOf('').length > 0, 'even a silent failure files something a human can chase')
})
