// the tautology rule for test assertions, held to the measurement that shaped it: a determinism check (one
// expression twice, nothing between) is NOT a tautology; the same text after a mutation in the same test IS; the
// arguments are read through parentheses; and the committed dead line is the control that must be caught.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { tautologicalAsserts, sameExpressionAsserts, topLevelArgs } from './assert-tautology.js'

test('arguments are split at depth zero — a call inside an argument does not end it', () => {
  assert.deepEqual(topLevelArgs("f(g(a, b)['k'], g(a, b)['k'], 'msg')", 1).map((s) => s.trim()), ["g(a, b)['k']", "g(a, b)['k']", "'msg'"])
})

test('a determinism check is a survey row, never a gap; the same text after a mutation is the gap', () => {
  const determinism = "test('d', () => {\n  assert.equal(gridRoot(), gridRoot(), 'deterministic')\n})\n"
  assert.equal(sameExpressionAsserts(determinism).length, 1, 'the survey sees it')
  assert.deepEqual(tautologicalAsserts(determinism), [], 'nothing happens between the two calls, so it tests what it says')
  const dead = "test('x', () => {\n  const c = committedTree()\n  writeFileSync(join(root, 'a.ts'), 'v2')\n  assert.equal(fileManifest(c)['src/a.ts'], fileManifest(c)['src/a.ts'], 'stable')\n})\n"
  assert.deepEqual(tautologicalAsserts(dead).map((t) => t.line), [4], 'CONTROL — the committed dead line, by shape')
})

test('a comparison of two different expressions is never named, mutation or not', () => {
  const src = "test('y', () => {\n  const before = f(a)\n  writeFileSync(p, 'v2')\n  assert.equal(f(a), before, 'moved')\n  assert.notEqual(f(a), f(b))\n})\n"
  assert.deepEqual(tautologicalAsserts(src), [])
  assert.deepEqual(sameExpressionAsserts(src), [])
})

test('KNOWN LIMIT (lead 237) — a determinism check after an UNRELATED fixture write is named, falsely, and the file says so', () => {
  // the narrowing that would clear this also clears the real dead line (its write targets the directory, its
  // assertion reads the committed tree), so the boundary is documented here rather than guessed past
  const src = "test('z', () => {\n  writeFileSync(f, 'seed')\n  assert.equal(gridRoot(), gridRoot(), 'deterministic')\n})\n"
  assert.deepEqual(tautologicalAsserts(src).map((t) => t.line), [3], 'the current behaviour, held so a change to it is a decision')
})
