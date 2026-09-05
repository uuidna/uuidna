import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pushVerdict, parseRunRows, type RunRow } from './post-push.js'

const SHA = '7fdb5c226aa11223344556677889900aabbccdde'
const OTHER = '0000000011112222333344445555666677778888'
const row = (workflowName: string, status: string, conclusion: string | null, headSha = SHA): RunRow =>
  ({ workflowName, status, conclusion, headSha })

// THE ONE THAT MATTERS. A poll is always faster than a queue, so the first question a post-push check asks is
// almost always answered "no runs yet". A check that read that as clean would report green on EVERY push while
// measuring nothing — worse than no check, because it would carry the authority of a verdict.
test('no run for the sha is UNMEASURED, never a pass', () => {
  const v = pushVerdict(SHA, [])
  assert.equal(v.ok, false, 'silence is not success')
  assert.equal(v.measured, false)
  assert.equal(v.settled, false)
  assert.match(v.reason, /UNMEASURED/)
  assert.match(v.reason, /not a pass/)
})

test('runs for a DIFFERENT sha do not answer for this one', () => {
  // The obvious wrong implementation reads the newest run and calls it the verdict. On a shared tree the newest
  // run is regularly a neighbour's push.
  const v = pushVerdict(SHA, [row('security', 'completed', 'success', OTHER)])
  assert.equal(v.measured, false, 'a green run for someone else’s commit says nothing about mine')
  assert.equal(v.ok, false)
})

test('a failing workflow is named, with its conclusion', () => {
  const v = pushVerdict(SHA, [row('security', 'completed', 'failure'), row('deploy', 'completed', 'success')])
  assert.equal(v.ok, false)
  assert.equal(v.settled, true)
  assert.deepEqual(v.failing, ['security (failure)'])
  assert.match(v.reason, /FAILED/)
  assert.match(v.reason, /security/)
})

test('a still-running workflow is pending, not passing and not failing', () => {
  const v = pushVerdict(SHA, [row('CodeQL Advanced', 'in_progress', null), row('deploy', 'completed', 'success')])
  assert.equal(v.ok, false, 'not settled, so not ok')
  assert.equal(v.settled, false)
  assert.deepEqual(v.failing, [])
  assert.deepEqual(v.pending, ['CodeQL Advanced'])
})

// A CANCELLED SECURITY SCAN MUST NOT READ AS A CLEAN ONE. This test USED TO ASSERT ok===true here with a comment
// claiming the cancellation "is reported as not having judged" — and it was not reported anywhere. The comment
// described the behaviour I intended; the code had the behaviour I wrote. uuidna-87 found the hole underneath it
// by handing pushVerdict an ALL-CANCELLED set, which returned ok=true with the reason "every workflow succeeded".
test('a cancelled run is not a failure, and it does not block a push something else judged', () => {
  const v = pushVerdict(SHA, [row('security', 'completed', 'cancelled'), row('deploy', 'completed', 'success')])
  assert.deepEqual(v.failing, [], 'a cancelled run is not a failure')
  assert.equal(v.ok, true, 'deploy judged and passed, so the push is not blocked')
  assert.deepEqual(v.didNotJudge, ['security (cancelled)'])
  assert.match(v.reason, /did NOT judge: security \(cancelled\)/, 'and what did not run must be IN THE REASON, not merely in a field nobody prints')
})

// THE ONE THAT WAS WRONG. A non-empty row set can be EMPTY OF VERDICTS, and `failing.length === 0` over it is
// absence-of-failure, not a pass. Null and [] one layer out from where the same distinction was drawn at the
// deposit door. Not hypothetical: the v0.3.1 release workflows were cancelled BY HAND the same day, and a check
// with this bug would have called that push clean.
test('ALL CANCELLED is UNMEASURED — a set with no judge is not a pass', () => {
  const v = pushVerdict(SHA, [row('security', 'completed', 'cancelled'), row('deploy', 'completed', 'cancelled')])
  assert.equal(v.ok, false, 'nothing judged, so nothing passed')
  assert.equal(v.measured, false, 'measured means something JUDGED, not that a row exists')
  assert.match(v.reason, /NOT ONE JUDGED/)
  assert.match(v.reason, /A cancelled scan is not a clean scan/)
})

test('ALL SKIPPED is UNMEASURED for the same reason', () => {
  const v = pushVerdict(SHA, [row('dependency-review', 'completed', 'skipped')])
  assert.equal(v.ok, false)
  assert.equal(v.measured, false)
})

test('measured is true as soon as ONE run reaches a real verdict, pass or fail', () => {
  assert.equal(pushVerdict(SHA, [row('security', 'completed', 'failure')]).measured, true)
  assert.equal(pushVerdict(SHA, [row('security', 'completed', 'success')]).measured, true)
})

// THE CONTROL: a genuinely green push must pass, or the arm blocks every landing and gets switched off in a week.
test('every workflow green is ok — the arm can pass', () => {
  const v = pushVerdict(SHA, [row('security', 'completed', 'success'), row('deploy', 'completed', 'success'), row('CodeQL Advanced', 'completed', 'success')])
  assert.equal(v.ok, true)
  assert.equal(v.measured, true)
  assert.equal(v.settled, true)
  assert.match(v.reason, /3 workflow\(s\) passed/)
  assert.deepEqual(v.didNotJudge, [])
})

test('parseRunRows refuses a malformed answer rather than reading it as "no failures"', () => {
  assert.throws(() => parseRunRows('{"error":"gh not authenticated"}'), /did not return an array/)
  assert.deepEqual(parseRunRows('[]'), [])
  assert.deepEqual(
    parseRunRows(JSON.stringify([{ workflowName: 'security', headSha: SHA, status: 'completed', conclusion: 'failure' }])),
    [row('security', 'completed', 'failure')])
})

test('a missing conclusion field is null, not the string "undefined"', () => {
  const [r] = parseRunRows(JSON.stringify([{ workflowName: 'x', headSha: SHA, status: 'in_progress' }]))
  assert.equal(r!.conclusion, null)
  assert.equal(pushVerdict(SHA, [r!]).pending.length, 1)
})

// THE REAL EVENT, replayed. On 2026-09-05 the security workflow failed on 44 consecutive pushes while deploy and
// CodeQL passed, and no local gate could see it. This is the row set from that day.
test('the 2026-09-05 event: security red beside two green workflows must not read as a landing', () => {
  const v = pushVerdict(SHA, [
    row('security', 'completed', 'failure'),
    row('deploy', 'completed', 'success'),
    row('CodeQL Advanced', 'completed', 'success'),
  ])
  assert.equal(v.ok, false, 'two of three green is not green')
  assert.deepEqual(v.failing, ['security (failure)'])
})

// A SHORT SHA IS WHAT EVERYONE TYPES. Exact-only matching made the live arm report UNMEASURED for a commit whose
// runs it was already holding — the right refusal for the wrong reason, which is precisely the defect class this
// arm exists to catch: a verdict that does not mean what its words say.
test('a short sha matches its run rows by prefix', () => {
  const v = pushVerdict(SHA.slice(0, 9), [row('security', 'completed', 'failure')])
  assert.equal(v.measured, true, 'the short form must find the runs, not report silence')
  assert.deepEqual(v.failing, ['security (failure)'])
})

test('a sha too short to identify a commit is refused, never guessed at', () => {
  assert.throws(() => pushVerdict('7fdb', [row('security', 'completed', 'success')]), /too short/)
})
