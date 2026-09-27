import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scienceClasses, terms, weigh, type WingSubject } from './science-classes.js'

test('terms — lowercases, drops digits and punctuation, keeps words of three or more', () => {
  assert.deepEqual(terms('CERN Open Data, 38 records!'), ['cern', 'open', 'data', 'records'])
})

// THE WHOLE CLAIM OF THE METHOD: a word every header uses is discounted to nothing WITHOUT a stopword list.
test('weigh — a term every wing uses scores zero, however often one wing repeats it', () => {
  const subjects: WingSubject[] = [
    { wing: 'A.lean', subject: 'the the the the cern', principles: ['a'] },
    { wing: 'B.lean', subject: 'the geometry', principles: ['b'] },
    { wing: 'C.lean', subject: 'the geometry', principles: ['c'] },
  ]
  const w = weigh(subjects)
  assert.equal(w.get('A.lean')!.get('the'), undefined)
  assert.ok((w.get('A.lean')!.get('cern') ?? 0) > 0)
})

test('scienceClasses — wings sharing a word form a class and bring their principles; a lone wing cannot', () => {
  const subjects: WingSubject[] = [
    { wing: 'Cern.lean', subject: 'cern collision data', principles: ['the CMS records'] },
    { wing: 'CernLinks.lean', subject: 'cern crossings', principles: ['the CERN crossings'] },
    { wing: 'Affine.lean', subject: 'geometry of the affine plane', principles: ['the affine group'] },
  ]
  const { classes, unclassed } = scienceClasses(subjects)
  // Affine.lean shares no word with the other two, and a class needs two wings — so it is unplaced, by design.
  assert.deepEqual(unclassed, ['Affine.lean'])
  const cern = classes.find((c) => c.joinedOn === 'cern')
  assert.ok(cern, 'the two CERN wings should share a class')
  assert.deepEqual(cern!.wings, ['Cern.lean', 'CernLinks.lean'])
  assert.deepEqual(cern!.principles, ['the CERN crossings', 'the CMS records'])
})

// A WING THIS METHOD LEAVES UNPLACED IS A FACT ABOUT THE METHOD — no candidate term reaches it, which is a property of
// the scoring rather than of the wing. Sweeping it into an "other" class would make the partition look total when it is
// not.
test('scienceClasses — an unplaceable wing is NAMED, never swept into a default bucket', () => {
  const subjects: WingSubject[] = [
    { wing: 'A.lean', subject: 'same words here', principles: ['a'] },
    { wing: 'B.lean', subject: 'same words here', principles: ['b'] },
    { wing: 'Empty.lean', subject: '', principles: ['e'] },
  ]
  const { classes, unclassed } = scienceClasses(subjects)
  // A and B share a vocabulary, so they SHOULD share a class — two wings saying the same thing is the signal, not
  // noise. Only the wing with no header at all stays unplaced — by construction, since an empty header yields no terms
  // and a candidate must be a term some wing uses — and it is named rather than bucketed.
  assert.deepEqual(unclassed, ['Empty.lean'])
  assert.equal(classes.length, 1)
  assert.deepEqual(classes[0]!.wings, ['A.lean', 'B.lean'])
})

test('scienceClasses — deterministic: a rerun on the same corpus gives the identical partition', () => {
  const subjects: WingSubject[] = [
    { wing: 'X.lean', subject: 'alpha beta', principles: ['x'] },
    { wing: 'Y.lean', subject: 'beta gamma', principles: ['y'] },
    { wing: 'Z.lean', subject: 'gamma delta', principles: ['z'] },
  ]
  const a = JSON.stringify(scienceClasses(subjects))
  const b = JSON.stringify(scienceClasses([...subjects]))
  assert.equal(a, b)
})

test('scienceClasses — a principle sealed in two wings is not double-counted inside one class', () => {
  const subjects: WingSubject[] = [
    { wing: 'A.lean', subject: 'cern one', principles: ['shared'] },
    { wing: 'B.lean', subject: 'cern two', principles: ['shared'] },
    { wing: 'C.lean', subject: 'geometry plane figures', principles: ['other'] },
  ]
  const cls = scienceClasses(subjects).classes.find((c) => c.wings.length === 2)
  assert.ok(cls)
  assert.deepEqual(cls!.principles, ['shared'])
})

// THE GUARD AGAINST A VACUOUS GREEN.
test('scienceClasses — an empty corpus reports emptiness, not a successful partition', () => {
  const { classes, unclassed } = scienceClasses([])
  assert.deepEqual(classes, [])
  assert.deepEqual(unclassed, [])
})
