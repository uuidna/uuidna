import { test } from 'node:test'
import assert from 'node:assert/strict'
import { census } from './lean-prose.js'

// FOLD THE FINDER (2026-09-18). prose_coverage_total went red across the whole tree because the census read the
// word "theorem" inside a doc comment as a declaration: Links.lean's sentence "…the three pairs the sealed
// theorem names: for all three…" became a theorem keyed `names` with no doc above it. A declaration starts its
// line; prose is word-wrapped and indented. Both directions are asserted, so the rule cannot be widened back
// without this failing.
const wing = (body: string): string => `-- lean/Fixture.lean — GENERATED.\n\n${body}\n`

test('a declaration at column 0 is counted, with the doc comment above it', () => {
  const c = census(wing('/-- what this decides -/\ntheorem real_one : 1 + 1 = 2 := by decide'))
  assert.equal(c.length, 1)
  assert.equal(c[0]!.key, 'real_one')
  assert.equal(c[0]!.doc, 'what this decides')
})

test('control: the word "theorem" inside a doc comment is prose, not a declaration', () => {
  const c = census(wing(
    '/-- THE BOUNDED SEARCH at each of the three pairs the sealed theorem names: for all three the\n' +
    '    enumeration agrees, which is what := by decide would have to show. -/\n' +
    'theorem real_two : 2 + 2 = 4 := by decide'))
  assert.equal(c.length, 1, 'the indented prose must not be read as a second theorem')
  assert.equal(c[0]!.key, 'real_two')
  assert.ok(c.every((t) => t.doc.length > 0), 'a prose match would arrive undocumented and break prose_coverage_total')
})

test('control: an undocumented declaration is still caught', () => {
  const c = census(wing('theorem bare_one : 3 + 3 = 6 := by decide'))
  assert.equal(c.length, 1)
  assert.equal(c[0]!.doc, '', 'the finder must still see a theorem that carries no prose')
})
