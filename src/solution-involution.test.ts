import { test } from 'node:test'
import assert from 'node:assert/strict'
import { involuteHolds, involuteToVerified } from './solution-involution.js'
import { verifyStatement } from './verify-statement.js'

test('a sealed statement involutes to itself as the verified solution', () => {
  const statement = '(1 * 1) % 9 = 1'
  const run = involuteToVerified(statement)
  assert.equal(run.verified, true)
  assert.equal(run.method, 'negation_involution_solves')
  assert.equal(run.solutions[0]?.key, verifyStatement(statement).key)
  assert.equal(verifyStatement(statement).verdict, 'VERIFIED')
})

test('an unverified claim involutes to sealed solutions in the same call', () => {
  const run = involuteToVerified('a claim with no sealed citation')
  assert.equal(run.verified, false)
  assert.ok(run.solutions.length > 0)
  assert.equal(run.method, 'negation_involution_solves')
  assert.equal(involuteHolds(run), true)
  for (const s of run.solutions) {
    assert.match(s.route, /^\/theorem\//)
    assert.ok(s.key.length > 0)
  }
})

test('involuteHolds on the empty input — the method theorem is present', () => {
  assert.equal(involuteHolds(), true)
})
