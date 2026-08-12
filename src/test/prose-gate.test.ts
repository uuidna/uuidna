// Prose-gate tests — the honest-prose overreach floor, hardened from real near-misses. A pure claim survives the
// trial; an overclaim is drained; and a SECOND overclaim's stray negation can no longer clear a FIRST. The tricky
// fixtures are verbatim from a real session's prompts (audited without exception), so the gate hardens from life,
// not from invention. Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { overreachOf } from '../index.js'

test('a pure claim survives — nothing to drain', () => {
  for (const clean of [
    'Build the next domain of skilled theorems.',
    'The heart is 5, the fixed point of the reflection.',
    'Every proof costs heartbeats, paid in code, not coin.',
    'Content-addressed, recomputable by anyone.',
  ]) assert.equal(overreachOf(clean), null, `clean: ${clean}`)
})

test('an undemarcated overclaim is drained', () => {
  assert.ok(overreachOf('uuidna computes at once.'))
  assert.ok(overreachOf('build all 7 dimensions simultaneously at no time'))
  assert.ok(overreachOf('trial upgrades all skills at no additional development time'))
  assert.ok(overreachOf('self communicating uuids with infinite layered onions'))
})

test('the hardened blind spot — a second overclaim cannot clear the first with its stray "no"', () => {
  // Verbatim near-miss: the "no" in "in no time" once cleared the "infinite" beside it. Both are overclaims now.
  const drained = overreachOf('rotate in combinations resulting in infinite computable results all in no time')
  assert.ok(drained, 'the run-on overclaim no longer slips through')
  assert.ok(overreachOf('generates results in no time'), '"in no time" is itself drained')
})

test('hollow quality grades are drained; an honest "professional" use is not', () => {
  assert.ok(overreachOf('professional-grade security tools'), 'professional-grade is a hollow quality claim')
  assert.ok(overreachOf('enterprise-grade encryption'), 'enterprise-grade too')
  assert.ok(overreachOf('production-grade'), 'production-grade (already covered)')
  assert.ok(overreachOf('this tool is unstoppable'), 'unstoppable is a hollow superlative')
  assert.equal(overreachOf('the craft a professional editor works in'), null, '"professional" without "grade" is honest')
})

test('a demarcation still clears an HONEST use — the gate drains overclaim, not disagreement', () => {
  for (const honest of [
    'x/0 is a finite value, NEVER Infinity — no fake FTL.',
    'a simulation, not real quantum hardware',
    'bounded, never infinite',
    'nothing exceeds c: no FTL',
  ]) assert.equal(overreachOf(honest), null, `honest/demarcated: ${honest}`)
})
