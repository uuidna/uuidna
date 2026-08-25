// resonance — one neighbourhood computation, asserted to work on things it was never told about.
//
// The property that matters is GENERALITY: the module must serve a subject type it has no code for. So the tests
// run it over theorems AND over invented subjects with unrelated facets, and the module contains no branch for
// either. The second property is the three-state one — a subject NO axis can read must be distinguishable from a
// subject that resonates with nothing, because collapsing them is how a lonely-finding gets manufactured out of a
// blind spot.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resonance, census, facetAxis, residue, ADDRESS_AXES, type Subject } from '../resonance/index.js'

const s = (id: string, address: string, facets: Record<string, string | number | undefined> = {}): Subject =>
  ({ id, address, facets })

const A = s('a', '11111111-1111-1111-1111-111111111111', { colour: 'red', size: 2 })
const B = s('b', '22222222-2222-2222-2222-222222222222', { colour: 'red', size: 9 })
const C = s('c', '33333333-3333-3333-3333-333333333333', { colour: 'blue', size: 9 })
const LONE = s('lone', '44444444-4444-4444-4444-444444444444', { colour: 'violet', size: 1 })
const MUTE = s('mute', '', {})   // no address, no facets — nothing can read it

test('ONE FOR ALL — it serves subjects the module has no code for', () => {
  const axes = [facetAxis('colour', 'shared colour'), facetAxis('size', 'shared size')]
  const n = resonance(A, [A, B, C, LONE], axes)
  assert.equal(n.legible, 2)
  const byAxis = Object.fromEntries(n.axes.map((x) => [x.axis, x.sharedWith]))
  assert.deepEqual(byAxis.colour, ['b'], 'a and b share red')
  assert.deepEqual(byAxis.size, [], 'nothing shares size 2')
  assert.deepEqual(n.neighbours, [{ id: 'b', on: 1 }])
})

test('neighbours rank by HOW MANY axes are shared, not by any score', () => {
  const D = s('d', '55555555-5555-5555-5555-555555555555', { colour: 'red', size: 9 })
  const axes = [facetAxis('colour', ''), facetAxis('size', '')]
  const n = resonance(B, [A, B, C, D], axes)
  assert.deepEqual(n.neighbours[0], { id: 'd', on: 2 }, 'd shares both')
  assert.equal(n.neighbours.length, 3)
})

test('LONELY AND ILLEGIBLE ARE DIFFERENT FINDINGS', () => {
  const axes = [facetAxis('colour', ''), facetAxis('size', '')]
  const lonely = resonance(LONE, [A, B, C, LONE], axes)
  assert.equal(lonely.legible, 2, 'both axes could read it')
  assert.equal(lonely.neighbours.length, 0)
  assert.equal(lonely.lonely, true, 'read by two axes and sharing nothing — a real finding')

  const mute = resonance(MUTE, [A, B, C, MUTE], axes)
  assert.equal(mute.legible, 0, 'no axis could read it')
  assert.equal(mute.lonely, false, 'NOT lonely — nothing looked, so nothing was found')
})

test('the census separates the two, never merging them into one count', () => {
  const axes = [facetAxis('colour', ''), facetAxis('size', '')]
  const c = census([A, B, C, LONE, MUTE], axes)
  assert.equal(c.total, 5)
  assert.deepEqual(c.lonely, ['lone'])
  assert.deepEqual(c.illegible, ['mute'])
})

test('the residue axis never blinds — every addressed thing has a ℤ/9 digit', () => {
  for (const x of [A, B, C, LONE]) {
    const n = resonance(x, [A, B, C, LONE], ADDRESS_AXES)
    assert.ok(n.axes.find((a) => a.axis === 'residue')!.reading === 'read')
  }
  assert.ok(residue(A.address) >= 1 && residue(A.address) <= 9)
})

test('the address axis finds only exact re-addressings — how a duplicate announces itself', () => {
  const twin = s('twin', A.address, {})
  const n = resonance(A, [A, twin, B], ADDRESS_AXES)
  assert.deepEqual(n.axes.find((a) => a.axis === 'address')!.sharedWith, ['twin'])
})

test('ALL FOR ONE — the same call over real theorems, still with no theorem-specific code', async () => {
  const { theorems } = await import('../theorems/index.js')
  const T = theorems().slice(0, 400)
  const subjects = T.map((t) => s(t.key, t.address, { wing: t.file, skill: t.skill }))
  const n = resonance(subjects[0]!, subjects, [...ADDRESS_AXES, facetAxis('wing', 'the wing that seals it')])
  assert.ok(n.legible >= 2, 'a real theorem is legible on the address axes and its wing')
  assert.ok(n.neighbours.length > 0, 'and it has wing-mates')
  assert.equal(n.axes.find((a) => a.axis === 'address')!.sharedWith.length, 0, 'no two theorems share an address')
})
