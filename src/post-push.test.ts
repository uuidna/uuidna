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

// A CANCELLED SECURITY SCAN MUST NOT READ AS A CLEAN ONE. This is exactly the shape being cured: a run that did
// not judge, counted as a judgement in your favour. The release workflows were cancelled by hand earlier today,
// so this is not hypothetical here.
test('cancelled and skipped runs did not judge — they are neither pass nor fail', () => {
  const v = pushVerdict(SHA, [row('security', 'completed', 'cancelled'), row('deploy', 'completed', 'success')])
  assert.deepEqual(v.failing, [], 'a cancelled run is not a failure')
  assert.equal(v.ok, true, 'and it does not block — but it is reported as not having judged')
  assert.equal(v.settled, true)
})

// THE CONTROL: a genuinely green push must pass, or the arm blocks every landing and gets switched off in a week.
test('every workflow green is ok — the arm can pass', () => {
  const v = pushVerdict(SHA, [row('security', 'completed', 'success'), row('deploy', 'completed', 'success'), row('CodeQL Advanced', 'completed', 'success')])
  assert.equal(v.ok, true)
  assert.equal(v.measured, true)
  assert.equal(v.settled, true)
  assert.match(v.reason, /every workflow .* succeeded \(3\)/)
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
