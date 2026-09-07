// lane-budget — THE NEIGHBOUR PROBE MUST HAVE THREE ANSWERS, AND ONLY ITS OWN CONTROL EVER PROVED IT DID NOT.
//
// millennium-solutions handed this over as a warning rather than a fix: their neighbour probe called `pgrep -c`,
// which is Linux — macOS has no such flag — so every call threw a usage error, their catch reported ZERO, and the
// term answered "empty machine" for the entire time it was being written. The feature was off and said nothing.
// Verified on this host: `pgrep -c` prints usage.
//
// I THEN REPRODUCED THE DEFECT TWICE IN TEN MINUTES, which is why this file exists rather than a comment:
//   1. piped into `wc -l` — a malformed pattern makes grep fail, wc prints 0, the pipeline exits clean, and the
//      probe reports a MEASURED ZERO for a question it never asked
//   2. added `set -o pipefail` — and over-corrected, because grep exits 1 on NO MATCH, so an idle machine became
//      unmeasurable and every budget halved for no reason
// Only grep's own status separates the three: 0 matched, 1 none (a real measurement), 2 could not run.
//
// The rule underneath is this tree's oldest: unmeasured is not zero. A budget that spends "I could not tell" as
// "nobody is there" is the one that oversubscribes the machine, and an oversubscription is discovered as swap.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runningLike, laneBudget, capacity, LEAN_JOB_BYTES } from './os/host/index.js'

test('a pattern the probe cannot run returns NULL, never zero', () => {
  const n = runningLike('((((')
  assert.equal(n, null,
    'a malformed pattern makes grep exit 2. Reporting 0 here is the defect this file is named for: the probe '
    + 'would answer "empty machine" for a question it could not ask, and every caller would believe it.')
})

test('a pattern that matches nothing returns a MEASURED ZERO, which is not null', () => {
  const n = runningLike('[z]zz-no-such-process-anywhere-zzz')
  assert.equal(n, 0, 'grep exits 1 on no match, and no match IS an answer — collapsing it to null halves every '
    + 'budget on an idle machine, which was the over-correction')
})

test('a pattern that matches returns a count above zero', () => {
  const n = runningLike('[n]ode ')
  assert.ok(typeof n === 'number' && n > 0, 'node is running this very test, so the probe must see at least one')
})

test('THE THREE ANSWERS ARE DISTINGUISHABLE — the property the whole design rests on', () => {
  const cannot = runningLike('((((')
  const none = runningLike('[z]zz-no-such-process-anywhere-zzz')
  const some = runningLike('[n]ode ')
  assert.equal(cannot, null)
  assert.equal(none, 0)
  assert.ok((some ?? 0) > 0)
  assert.notEqual(cannot, none, 'could-not-tell and measured-zero must never be the same value — they were, twice')
})

test('the budget YIELDS to measured neighbours, and NAMES what it could not measure', () => {
  const cap = capacity(0, LEAN_JOB_BYTES)
  const busy = laneBudget(LEAN_JOB_BYTES, '[n]ode ')
  assert.ok(busy.lanes < cap.lanes, 'jobs already running are subtracted, whoever started them — yielding is '
    + 'unilateral and needs no agreement between sessions, which is why it works at all')
  assert.match(busy.binds, /already running, yielded/)

  // UNCAPPED on the captain's word: halving priced a guess as a measurement, in the one case where the
  // instrument had already said it did not know. The width is now the measured capacity with the ignorance
  // NAMED beside it — the three answers stay distinguishable, which is the property that actually matters.
  const blind = laneBudget(LEAN_JOB_BYTES, '((((')
  assert.equal(blind.lanes, cap.lanes, 'an unmeasurable neighbour count no longer halves anything')
  assert.match(blind.binds, /UNMEASURED/, 'and says so, rather than presenting a confident width')
})

test('the width never falls below one, because zero lanes is a stop and not a measurement', () => {
  for (const p of ['[n]ode ', '((((', '[z]zz-none']) assert.ok(laneBudget(LEAN_JOB_BYTES, p).lanes >= 1, p)
  // a job larger than the whole machine still runs, serially
  assert.ok(laneBudget(1024 ** 4, '[z]zz-none').lanes >= 1, 'a terabyte-per-job request still yields one lane')
})
