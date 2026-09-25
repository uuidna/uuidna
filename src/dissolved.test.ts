import { test } from 'node:test'
import assert from 'node:assert/strict'

import { DISSOLVED, dissolvedGaps } from './dissolved.js'
import { theorems } from './theorems/index.js'

/**
 * The register must be checkable, or it is a list of clever stories — which
 * would be worse here than anywhere else in this tree, this being the file
 * about not fooling yourself.
 */
test('every entry cites something this repository can check, and it resolves', () => {
  assert.deepEqual(dissolvedGaps(), [], 'a citation that does not resolve reads as evidence and is not')
  assert.ok(DISSOLVED.length >= 4, `the register holds ${DISSOLVED.length} entries`)
})

test('every entry names what stayed impossible', () => {
  // An entry with nothing unclaimed is claiming the whole of what it dissolved,
  // which is how a dissolved limit becomes an overclaim.
  for (const entry of DISSOLVED) {
    assert.ok(entry.unclaimed.trim().length > 20, `"${entry.claim}" names nothing it does not claim`)
  }
})

test('every entry says what the limit was ACTUALLY a limit on', () => {
  // That sentence is the method: the impossibility was real and was about
  // something narrower than the goal. An entry without it records an outcome
  // and loses the move that produced it.
  for (const entry of DISSOLVED) {
    assert.ok(entry.actually.trim().length > 20, `"${entry.claim}" does not say what the limit was really about`)
    assert.ok(entry.by.trim().length > 20, `"${entry.claim}" does not say how it was got past`)
  }
})

// ── the guard bites, in each of its three directions ────────────────────────

test('an entry citing nothing is refused', () => {
  const gaps = dissolvedGaps([
    { actually: 'x'.repeat(30), by: 'y'.repeat(30), claim: 'c', unclaimed: 'z'.repeat(30) },
  ])
  assert.equal(gaps.length, 1)
  assert.match(gaps[0]!.what, /cites nothing checkable/)
})

test('an entry citing a theorem the ledger does not serve is refused', () => {
  const gaps = dissolvedGaps([
    { actually: 'x'.repeat(30), by: 'y'.repeat(30), claim: 'c', theorem: 'no_such_theorem_anywhere', unclaimed: 'z'.repeat(30) },
  ])
  assert.match(gaps[0]!.what, /which the ledger does not serve/)
})

test('an entry citing a file that is not in the tree is refused', () => {
  const gaps = dissolvedGaps([
    { actually: 'x'.repeat(30), by: 'y'.repeat(30), claim: 'c', file: 'src/not-a-file.ts', unclaimed: 'z'.repeat(30) },
  ])
  assert.match(gaps[0]!.what, /which is not in the tree/)
})

test('an entry claiming everything it dissolved is refused', () => {
  const gaps = dissolvedGaps([
    { actually: 'x'.repeat(30), by: 'y'.repeat(30), claim: 'c', theorem: theorems()[0]!.key, unclaimed: '   ' },
  ])
  assert.match(gaps[0]!.what, /names nothing it does not claim/)
})

// CONTROL: a well-formed entry passes, so the guard is not simply refusing
// everything handed to it.
test('a well-formed entry passes', () => {
  assert.deepEqual(
    dissolvedGaps([
      {
        actually: 'a limit on the literal, not on the arithmetic',
        by: 'parse as BigInt and narrow only when it fits',
        claim: 'this could not be checked at scale',
        theorem: theorems()[0]!.key,
        unclaimed: 'that the evaluator agrees with the kernel everywhere',
      },
    ]),
    [],
  )
})
