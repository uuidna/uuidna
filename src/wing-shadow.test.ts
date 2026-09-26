// THE FINDER MUST TELL A SHARED NAME FROM A DISAGREEMENT, because its first version could not and reported 26
// findings where there were 4. Most builtins that share a wing definition's name IMPLEMENT it; that is how the
// independent evaluator reads the wing at all. Only a builtin holding a DIFFERENT value is a defect.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { builtinName, shadowedWingDefs, wingShadowGaps } from './wing-shadow.js'

test('builtinName knows what the evaluator already holds', () => {
  assert.equal(builtinName('units'), true, 'units is the six units of Z/9 — a builtin, and the collision that cost a denial')
  assert.equal(builtinName('siUnits'), false, 'the renamed SI table is the wing\'s own')
  assert.equal(builtinName('definitely_not_a_builtin_name_xyz'), false)
})

test('a faithful builtin is not reported, a disagreeing one is', () => {
  const found = shadowedWingDefs()
  // SiCross once appeared here under the name `units`; the rename is what removed it, and if it returns the finder
  // must say so rather than the census quietly losing a leg again.
  assert.ok(!found.some((f) => f.file === 'SiCross.lean'),
    'SiCross must be clean: its table is siUnits now, which collides with nothing')
  // every finding carries a reason, because "shadowed" alone does not tell a reader what to do
  for (const f of found) assert.ok(f.why.length > 20, `${f.file}::${f.def} reported without a reason`)
})

test('the finder reports far fewer than the names it could have flagged', () => {
  // the name-only question flags every shared name; the value question flags only the disagreements. This pins the
  // difference so a future change that reverts to name-matching is caught by the count rather than by a reading.
  const found = shadowedWingDefs()
  assert.ok(found.length < 12, `expected a handful of genuine collisions, got ${found.length} — has this gone back to matching names?`)
})

test('the gap carries the cure, and says nothing when there is nothing to say', () => {
  const gaps = wingShadowGaps()
  const found = shadowedWingDefs()
  assert.equal(gaps.length, found.length === 0 ? 0 : 1)
  if (gaps.length) {
    assert.match(gaps[0]!.fix, /rename/)
    assert.match(gaps[0]!.what, /builtin/)
  }
})
