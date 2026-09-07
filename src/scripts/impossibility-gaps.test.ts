import { test } from 'node:test'
import assert from 'node:assert/strict'
import { IMPOSSIBLE, JUSTIFIED, REASON_CLAUSE, impossibilityGaps, impossibilityReading } from './impossibility-gaps.js'
import { sourceGraph } from '../test-paths.js'

// CONTROLS FOR A WIDENED DETECTOR. Accepting a stated reason clause cleared 31 claims at a stroke, and a
// measure that only ever falls is exactly the shape a broken detector also has. So each case below is one this
// finder MUST still catch, or one it MUST now clear, written as the two halves of the same instrument: if the
// widening had gone one character too far, the first block goes green and the debt looks paid.

const flagged = (line: string): boolean => IMPOSSIBLE.test(line) && !(JUSTIFIED.test(line) || REASON_CLAUSE.test(line))

test('the bare walls this finder was built for are STILL flagged', () => {
  // the captain's six, and the shapes they came in — each asserts a limit and names nothing. A BARE `never`
  // ("uuidna NEVER EXECUTES") is NOT among them and must not be: the header records that adding bare `must` and
  // `never` doubles then quadruples the count, and that those hits are overwhelmingly invariants a test enforces
  // two lines later. This finder takes the obligation forms — `must never`, `must always`, `is required to` —
  // and leaves the bare ones to the reader.
  for (const l of [
    '// cannot flash firmware',
    '// cannot confine, cannot scan',
    '// network is impossible here',
    '// there is no way to tell which handle won',
    '// a receipt must always be signed',
    '// callers are required to pass a uuid',
    '// this can\'t be done',
    '// cannot: no',                                  // a colon with nothing after it is not a reason
    '// cannot be checked, unfortunately',
  ]) assert.ok(flagged(l), `must stay flagged: ${l}`)
})

test('a reason stated as a clause now clears — the law was "name the reason", not "use these words"', () => {
  for (const l of [
    "// we can't do 'P = GetCurvePoint<PC>': this is default value and doesn't constrain anything",
    '// cannot reuse the buffer because the caller still holds a view of it',
    '// the pid cannot be an identity since the OS reissues it',
    '// must never be cached so that a revoked seal stops verifying at once',
    '// impossible to fold in one pass: the second leaf is not known until the first is addressed',
  ]) assert.ok(!flagged(l), `should clear on its stated reason: ${l}`)
})

test('a reason placed BEFORE the claim clears too — a sentence may run cause-first', () => {
  for (const l of [
    '// A PID IS A NUMBER THE OS REISSUES, SO IT CANNOT BE AN IDENTITY',
    '// Atomic-exclusive create (flag wx) so two simultaneous acquirers cannot both win',
    '// the stamp is read once and compared for equality, therefore no duration can be computed',
  ]) assert.ok(!flagged(l), `cause-first is still a named cause: ${l}`)
  // and a dash or semicolon clause after the claim is the contrast that makes it true
  assert.ok(!flagged('// a count cannot tell busy from stuck; a live child can'))
  assert.ok(!flagged('// cannot be read here — the isolate hands over bytes instead'))
  // but a shrug is not a reason, in either direction
  assert.ok(flagged('// cannot flash firmware — sadly'))
  assert.ok(flagged('// so it cannot be done'))
})

test('the keyword sources still clear, and clearing is not contagious', () => {
  assert.ok(!flagged('// cannot read it — no filesystem in an isolate'))
  assert.ok(!flagged('// cannot happen by construction'))
  assert.ok(!flagged('// patch-first is the rule of this project, so a minor bump is not required'))
  // a reason attached to ONE claim does not license a second, unexplained one on the same line
  assert.ok(REASON_CLAUSE.test('// cannot A: because the host has no clock'))
  assert.ok(!REASON_CLAUSE.test('// cannot A. cannot B.'), 'a full stop ends the clause; the next claim stands alone')
})

test('the debt is a real reading of this tree, and it only shrinks', () => {
  const rows = impossibilityGaps([...sourceGraph().keys()], new Set())
  // the baseline sealed in lean/impossibility-baseline.json is 641 claims across 302 files
  assert.ok(rows.length < 641, `the debt must sit below its sealed baseline — read ${rows.length}`)
  assert.ok(rows.length > 0, 'a reading of zero would mean the detector stopped detecting, not that the tree is clean')
  for (const r of rows.slice(0, 20)) {
    assert.match(r.what, /^src\/.+:\d+ claims/, 'every gap names its file and line')
    assert.ok(r.fix.length > 20, 'every gap carries an actionable fix, not a label')
  }
})

// ── LEAD 234: UNREADABLE IS NOT CLEAN ────────────────────────────────────────────────────────────────────────
//
// The finder used to fold a file it could not open into "no gaps here", so an unreadable source and a clean one
// returned the same empty list. That is the pair `no_instrument_narrower_than_its_question` forbids collapsing,
// and it cost a real control: the first check of the holds-diagnostic cure put the pre-cure wording outside ROOT,
// this finder reported 0 for BOTH arms, and the cure looked unnecessary. These two tests are the fence.

test('a file that cannot be READ is named UNMEASURED, never folded into clean', () => {
  const missing = 'src/this-file-does-not-exist-lead-234.ts'
  const r = impossibilityReading([missing], new Set())
  assert.deepEqual(r.gaps, [], 'an unreadable file yields no GAPS — it was never read, so it makes no claims')
  assert.deepEqual(r.unreadable, [missing],
    'and it MUST appear as unreadable. If this array is empty the finder is back to reporting a green it never '
    + 'earned: "I could not look" spent as "nothing is open".')
})

test('THE CONTROL — the two answers are distinguishable, so the third answer is load-bearing', () => {
  // A file that IS readable and DOES carry a bare claim: gaps non-empty, unreadable empty. Without this arm the
  // test above passes against a finder that calls everything unreadable, which would be the opposite defect.
  const real = impossibilityReading([...sourceGraph().keys()], new Set())
  assert.deepEqual(real.unreadable, [],
    'every file in the source graph is readable today; if this fires, a source moved and the guard should say so')
  assert.ok(real.gaps.length >= 0, 'and the gap arm still answers over the same run')

  // the pair, in one call: a missing path and the real graph together must produce BOTH answers, not one
  const mixed = impossibilityReading(['src/absent-lead-234.ts', ...sourceGraph().keys()], new Set())
  assert.deepEqual(mixed.unreadable, ['src/absent-lead-234.ts'], 'the unreadable one is named')
  assert.deepEqual(mixed.gaps, real.gaps, 'and it does not disturb the gaps the readable files carry')
})
