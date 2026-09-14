// law-audit — one call judges an agent action by every legal gate; each rule has a control that must fire.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { auditAction } from './law-audit.js'
import { laws } from './laws.js'

test('an action citing a sealed theorem is judged by every gate and carries one receipt', () => {
  const r = auditAction({ agent: 'claude', tool: 'Edit', statement: 'the two coins are conserved, theorem two_coins', cited: ['two_coins'] })
  assert.equal(r.honesty.binary, 1)
  assert.deepEqual(r.forensic.violations, [])
  assert.equal(r.laws.of, laws().laws.length)
  assert.equal(r.clean, r.breaches.length === 0)
  assert.match(r.receipt, /^[0-9a-f-]{36}$/)
  // the same action audits to the same receipt — recomputable by anyone
  assert.equal(auditAction({ agent: 'claude', tool: 'Edit', statement: 'the two coins are conserved, theorem two_coins', cited: ['two_coins'] }).receipt, r.receipt)
})

test('CONTROL: a fabricated citation is a breach, never a clean action', () => {
  const r = auditAction({ agent: 'claude', tool: 'Write', statement: 'proven in theorem nonexistent_xyz', cited: ['nonexistent_xyz'] })
  assert.equal(r.honesty.binary, 0)
  assert.equal(r.clean, false)
  assert.ok(r.breaches.some((b) => /fabricated citation/.test(b)), r.breaches.join('; '))
})

test('a plain act that cites nothing is UNVERIFIED, reported — not a breach', () => {
  const r = auditAction({ agent: 'claude', tool: 'Bash', statement: 'list the files' })
  assert.equal(r.verdict.verdict, 'UNVERIFIED')
  assert.ok(!r.breaches.some((b) => /fabricated/.test(b)))
})
