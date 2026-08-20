// adjudicate — a qualifier belongs to the clause it qualifies.
//
// DEMARCATED was tested against the whole sentence, so ONE hedge word anywhere disarmed the Clay collision check.
// Appending "and no counterexample remains" to a Riemann claim flipped it from UNVERIFIED to VERIFIED, and the
// security audit guarding this reported ok throughout, because it probes only two fixed sentence shapes.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { statusCollisions } from '../adjudicate.js'

// ── THE EVASIONS. Each of these returned zero collisions before the fix.
test('a hedge in a TRAILING clause does not disarm the claim', () => {
  for (const evasion of [
    'we prove the Riemann hypothesis and no counterexample remains',
    'uuidna has solved the Riemann hypothesis; nothing is left open',
    'we solved the Hodge conjecture, bounded and finite',
    'we proved the Riemann hypothesis — nothing further is open',
  ]) assert.ok(statusCollisions(evasion).length > 0, `evasion slipped through: ${evasion}`)
})

test('the bare claim still collides — the fix did not weaken detection', () => {
  assert.ok(statusCollisions('we prove the Riemann hypothesis').length > 0)
})

// ── THE CONTROL. A genuine demarcation must still pass, or the check becomes unusable.
test('a hedge IN the claim clause demarcates, as it always did', () => {
  for (const honest of [
    'we do not claim to have solved the Riemann hypothesis',
    'we never solved the Riemann hypothesis',
    'the Riemann hypothesis is open',
    'uuidna has not solved any Clay problem',
  ]) assert.equal(statusCollisions(honest).length, 0, `honest demarcation wrongly flagged: ${honest}`)
})

test('a sentence with no self-voice or no solve verb is not a claim at all', () => {
  assert.equal(statusCollisions('the Riemann hypothesis concerns the zeta function').length, 0)
  assert.equal(statusCollisions('somebody proved something once').length, 0)
})
