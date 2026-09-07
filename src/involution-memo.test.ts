// involution-memo — THE FALSIFIER LEG MUST NOT DEPEND ON WHAT IT WAS ASKED BEFORE.
//
// Lead 159, found by running a peer's corruption probe against the wing-def evaluator sealed the day before.
// Three defects, two fixed here and one left NAMED below rather than hidden:
//
//   1. THE MEMO KEYED ON wingSource.LENGTH, so two different wings of equal length shared one verdict and the
//      answer depended on which was asked first. A key that paraphrases its input is the same fault as a failure
//      log that does not carry the HEAD it was produced against — it cannot be known stale BY CONSTRUCTION,
//      because nothing in the key names the source it read, so staleness is unobservable rather than merely
//      unnoticed; only suspected.
//   2. A NULLARY DEF WAS BOUND AS A FUNCTION, not its value: `d.params.length === 0 ? build([]) : build([])`,
//      both arms identical. So a theorem stated through `def agl : List Nat := [...]` never read the list.
//   3. STILL OPEN, AND NARROWER THAN IT FIRST LOOKED. Many wing defs are answered by a name the evaluator matches
//      before consulting the environment, so the wing is not read for them. That is only a defect for SOME of
//      them, and the distinction is the whole point of a second leg:
//        - a name backed by a REIMPLEMENTATION (lxor, comp, flag, blt …) is exactly what the second leg should
//          be — the wing computes one way, the evaluator another, and their agreeing is the check.
//        - a name backed by a STORED COPY of the wing's own literal table (agl, tour, caps, words, orbits …) is
//          not a second opinion at all: the evaluator holds the same numbers, so agreement is guaranteed and
//          corrupting the wing changes no verdict. Those are the ones that owe a fix.
//      The counts are deliberately not written here — a census in prose is stale the moment a wing lands — but the
//      copies are the short list and the reimplementations are the long one. The test below holds the SHAPE.
//
// WHY THE ORDER-REVERSED FORM. A single call cannot see a memo defect, and neither can two calls in one order:
// only asking the same question of two different wings, in both orders, distinguishes a verdict from a cache hit.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { holds } from './involution/index.js'

// two wing sources of EQUAL LENGTH and different meaning — the collision the length key could not see
const PLUS_ONE = 'def kk (x : Nat) : Nat := x + 1'
const PLUS_NINE = 'def kk (x : Nat) : Nat := x + 9'

test('the verdict does not depend on which equal-length wing was asked first', () => {
  assert.equal(PLUS_ONE.length, PLUS_NINE.length,
    'the fixture only tests the defect while the two sources are the same length')
  assert.equal(holds('kk 1 = 2', PLUS_ONE), true, 'x + 1 makes it true')
  assert.equal(holds('kk 1 = 2', PLUS_NINE), false,
    'x + 9 makes it FALSE — and with the memo keyed on source LENGTH this returned true, because the first '
    + 'answer was reused for a different wing of the same size')
})

test('and the reverse order gives the same two answers — the control that makes the test above mean something', () => {
  // Asked the other way round in the same process. If the key were length-shaped these two would disagree with
  // the pair above; one order alone can never show that.
  assert.equal(holds('kk 1 = 2', PLUS_NINE), false)
  assert.equal(holds('kk 1 = 2', PLUS_ONE), true)
})

test('a nullary def is evaluated to its value, so a mutation in its body is visible', () => {
  assert.equal(holds('zzlist.length = 3', 'def zzlist : List Nat := [1,2,3]'), true)
  assert.equal(holds('zzlist.length = 3', 'def zzlist : List Nat := [1,2,3,4]'), false,
    'the body moved, so the verdict must move. Both arms of the old ternary were identical, which bound the def '
    + 'as a function and left every theorem stated through it reading nothing.')
  assert.equal(holds('zzlist.length = 4', 'def zzlist : List Nat := [1,2,3,4]'), true)
})

test('THE NAMED LIMIT (lead 159, open): a name the evaluator has built in ignores the wing entirely', () => {
  // `agl` is answered at src/involution/index.ts by a STORED COPY of the wing's own list, matched before the
  // environment. So the wing source is not consulted and no corruption of it can be detected — and unlike a name
  // backed by a reimplementation, there is no independent computation here to disagree. This asserts the CURRENT
  // behaviour so
  // the shadowing is a fence rather than a surprise: when it is fixed, this assertion should be INVERTED, not
  // deleted — `holds('agl.length = 54', '')` should then be null, and the shadowed census should fall. The census
  // is left to be recomputed rather than written down, because a count in prose is stale the moment a wing lands.
  assert.equal(holds('agl.length = 54', ''), true,
    'answered with NO wing source at all — the evaluator is reading its own copy, not the wing')
  assert.equal(holds('bogusnamexyz.length = 54', ''), null,
    'CONTROL: a name it does not know returns null, so the line above is shadowing and not a parser accident')
})
