import { test } from 'node:test'
import assert from 'node:assert/strict'
import { portAll, renderPortAll } from './index.js'

test('EVERY package gets an identity — this half is complete and always was', () => {
  // portApp folds published metadata; it needs no pattern and no opinion. Counting successes rather than
  // trusting totality, because a row whose fold failed would be a real finding.
  const c = portAll()
  assert.equal(c.identities, c.packages, 'a package without an address would be a package uuidna cannot cite')
  assert.ok(c.packages > 28000)
})

test('classification and identity are DIFFERENT numbers, and both are reported', () => {
  // Averaging them would hide which one is a measurement with known failures.
  const c = portAll()
  assert.ok(c.classified < c.packages, 'not every package is placed, and pretending otherwise is the overclaim')
  assert.equal(c.classified + c.unclassified, c.packages, 'placed and unplaced must partition the catalogue')
})

test('the remainder is DESCRIBED, not dismissed', () => {
  const c = portAll()
  assert.ok(c.remainder.length > 0)
  assert.ok(c.remainder.every((r) => r.count > 0))
  const named = c.remainder.reduce((s, r) => s + r.count, 0)
  assert.ok(named > 0 && named <= c.unclassified, 'the described groups cannot exceed the remainder they describe')
})

test('the honest note names what widening the patterns would cost', () => {
  // The temptation is to close the gap by loosening. This tree measured that: loosening bio collects ovmf
  // (BIOS), loosening chemistry collects btrbk (atomic). A wider pattern finds homonyms, not members.
  assert.match(portAll().honest, /ovmf|BIOS/)
  assert.match(portAll().honest, /averaging them would hide/)
})

test('the census recomputes and renders', () => {
  assert.equal(portAll().receipt, portAll().receipt)
  assert.match(renderPortAll(portAll())[0]!, /^port all: \d+\/\d+ identities/)
})
