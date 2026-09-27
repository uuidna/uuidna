import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  DIMENSIONS,
  LEARNING_AREAS,
  areaSpread,
  areaTerms,
  candidateAreaFor,
  schoolAreas,
  type LearningArea,
} from './school-areas.js'

test('the twelve areas are the captain\'s, in the captain\'s order, each with subjects', () => {
  assert.equal(LEARNING_AREAS.length, 12)
  assert.deepEqual(LEARNING_AREAS.map((a) => a.n), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  assert.equal(LEARNING_AREAS[0]!.name, 'Body, Movement & Performance')
  for (const a of LEARNING_AREAS) assert.ok(a.subjects.length >= 9, `${a.name} carries its subjects`)
})

// THE DIMENSIONS ARE NOT AREAS, and nothing may be assigned to them — scoring wings against "Reflecting" would
// manufacture a reading this file has no evidence for.
test('four transversal dimensions are recorded, and are not among the areas', () => {
  assert.deepEqual(DIMENSIONS.map((d) => d.name), ['Making', 'Understanding', 'Encountering', 'Reflecting'])
  const names = new Set(LEARNING_AREAS.map((a) => a.name))
  for (const d of DIMENSIONS) assert.ok(!names.has(d.name))
})

test('areaSpread discounts a word many areas use and leaves a unique one alone', () => {
  const spread = areaSpread()
  assert.ok((spread.get('and') ?? 0) > 1, '"and" is shared across areas')
  assert.equal(spread.get('textile'), 1, '"textile" belongs to one area only')
  assert.equal(spread.get('circus'), 1)
})

test('candidateAreaFor suggests the area whose characteristic vocabulary a wing shares, with the words', () => {
  const p = candidateAreaFor('Acoustics.lean', 'the physics of sound, a chemistry of air, measured')
  assert.equal(p.area, 'Mathematics & Natural Sciences')
  assert.ok(p.on.includes('physics'))
  assert.ok(p.score > 0)
})

// A WING NO VOCABULARY REACHES IS NAMED, never filed under a default.
test('candidateAreaFor reports no area rather than guessing one', () => {
  const p = candidateAreaFor('Nowhere.lean', 'zzzz qqqq')
  assert.equal(p.area, null)
  assert.equal(p.score, 0)
  assert.deepEqual(p.on, [])
})

test('a unique word outweighs several shared ones', () => {
  const shared = candidateAreaFor('A.lean', 'and and and work studies')
  const unique = candidateAreaFor('B.lean', 'circus')
  assert.equal(unique.area, 'Body, Movement & Performance')
  assert.ok(unique.score >= shared.score, 'one unique subject word beats a pile of connectives')
})

test('schoolAreas places wings, names the unplaced, and names the EMPTY areas', () => {
  const rows = [
    { wing: 'Acoustics.lean', subject: 'the physics of sound', principles: ['the sounding'] },
    { wing: 'Looms.lean', subject: 'textile work on a loom', principles: ['the weave'] },
    { wing: 'Nowhere.lean', subject: 'zzzz', principles: ['nothing'] },
  ]
  const { census, unplaced, empty } = schoolAreas(rows)
  assert.deepEqual(unplaced, ['Nowhere.lean'])
  const art = census.find((c) => c.area.n === 2)!
  assert.deepEqual(art.wings, ['Looms.lean'])
  assert.deepEqual(art.principles, ['the weave'])
  // ten of the twelve areas hold nothing in this small world, and each is NAMED
  assert.equal(empty.length, 10)
  assert.ok(empty.includes('Environment of the Self'))
})

test('areaTerms reads the captain\'s subject words, lowercased and split', () => {
  const body = areaTerms(LEARNING_AREAS[0]!)
  assert.ok(body.has('circus'))
  assert.ok(body.has('rhythm'))
  assert.ok(body.has('sports'))
})

// THE GUARD AGAINST A VACUOUS GREEN.
test('an empty school reports emptiness, and all twelve areas as empty', () => {
  const { census, unplaced, empty } = schoolAreas([])
  assert.equal(census.length, 12)
  assert.deepEqual(unplaced, [])
  assert.equal(empty.length, 12)
})

test('a custom area set is honoured, so the taxonomy is data and not hardcoded', () => {
  const only: LearningArea[] = [{ n: 1, name: 'Only', subjects: ['juggling'] }]
  const p = candidateAreaFor('X.lean', 'juggling three clubs', only)
  assert.equal(p.area, 'Only')
})
