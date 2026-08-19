import { test } from 'node:test'
import assert from 'node:assert/strict'
import { contrastRatio, realComponentChecks } from './contrast.ts'

test('contrastRatio matches the well-known reference: black on white is exactly 21:1', () => {
  assert.equal(contrastRatio('#000000', '#ffffff'), 21)
})

test('contrastRatio is symmetric — argument order does not matter', () => {
  assert.equal(contrastRatio('#3c3c43', '#ffffff'), contrastRatio('#ffffff', '#3c3c43'))
})

test('contrastRatio of a colour against itself is exactly 1:1 (no contrast)', () => {
  assert.equal(contrastRatio('#67676c', '#67676c'), 1)
})

test('every real colour pair ReferrerNav/ReadAloud actually render meets its WCAG AA threshold', () => {
  const checks = realComponentChecks()
  assert.ok(checks.length > 0, 'sanity: the check list itself must not be empty')
  const failures = checks
    .map((c) => ({ ...c, ratio: contrastRatio(c.fg, c.bg) }))
    .filter((c) => c.ratio < c.threshold)
  assert.deepEqual(
    failures.map((f) => `${f.name}: ${f.ratio.toFixed(2)}:1 < required ${f.threshold}:1`),
    [],
    'a real WCAG contrast failure in a shipped component, not a hypothetical one',
  )
})
