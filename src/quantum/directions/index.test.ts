// directions — the fourteen are the FACES of the vector equilibrium, and every superposition gets all of them.
//
// The counts are cheap to assert and prove almost nothing on their own: any fourteen vectors would satisfy
// "there are fourteen". So the load-bearing test is the GEOMETRIC one — each normal must actually cut a face of
// VE, with four vertices on a square and three on a triangle. That is what makes these the directions of this
// solid rather than fourteen arbitrary triples, and it is decidable by walking the twelve vertices.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  DIRECTIONS, SQUARE_NORMALS, TRIANGLE_NORMALS, VE_VERTICES, faceVertices, solveAllAtOnce,
} from './index.js'
import { VE_FACES } from '../../hexbit/index.js'

test('the twelve vertices are the permutations of (±1,±1,0), generated not listed', () => {
  assert.equal(VE_VERTICES.length, 12, 've_twelve_vertices — the cuboctahedron has twelve')
  for (const v of VE_VERTICES) {
    assert.equal(v.filter((c) => c === 0).length, 1, 'exactly one zero coordinate')
    assert.equal(v.filter((c) => c === 1 || c === -1).length, 2, 'and two of unit magnitude')
  }
  assert.equal(new Set(VE_VERTICES.map((v) => v.join(','))).size, 12, 'all distinct')
})

test('there are fourteen directions, and fourteen is the sealed VE_FACES', () => {
  assert.equal(DIRECTIONS.length, 14)
  assert.equal(DIRECTIONS.length, VE_FACES,
    've_fourteen_faces (8 + 6 = 14) and ve_faces_are_handle_hexbit_coins (HANDLE_HEXBITS + HEXBIT_BITS + COINS) '
    + 'are the same number, and this module must not drift from either')
  assert.equal(SQUARE_NORMALS.length, 6)
  assert.equal(TRIANGLE_NORMALS.length, 8)
  assert.equal(new Set(DIRECTIONS.map((d) => d.join(','))).size, 14, 'all distinct')
})

test('EACH NORMAL CUTS A REAL FACE — four vertices on a square, three on a triangle', () => {
  // This is the test that makes the fourteen mean something. A count is satisfied by any fourteen vectors; this
  // is satisfied only by the face normals of THIS solid.
  for (const n of SQUARE_NORMALS)
    assert.equal(faceVertices(n).length, 4, `square face ${n.join(',')} must carry four vertices`)
  for (const n of TRIANGLE_NORMALS)
    assert.equal(faceVertices(n).length, 3, `triangle face ${n.join(',')} must carry three vertices`)
  // and the faces COVER the solid: every vertex lies on at least one face
  const covered = new Set(DIRECTIONS.flatMap((n) => faceVertices(n).map((v) => v.join(','))))
  assert.equal(covered.size, 12, 'every vertex is on a face — the fourteen leave nothing out')
})

test('THE CONTROL — a wrong normal does NOT cut a face, so the test above can fail', () => {
  // Without this, "four vertices" might hold for any direction and the geometry test would be decoration.
  assert.notEqual(faceVertices([1, 1, 0]).length, 4, 'a VERTEX direction is not a square-face normal')
  assert.notEqual(faceVertices([2, 1, 0]).length, 3, 'nor is an arbitrary triple a triangle normal')
})

test('solveAllAtOnce computes ALL fourteen for EVERY item', async () => {
  const seen = new Map<number, Set<string>>()
  const items = [1, 2, 3, 4, 5]
  const out = await solveAllAtOnce(items, (item, d) => {
    if (!seen.has(item)) seen.set(item, new Set())
    seen.get(item)!.add(d.join(','))
    return item * (d[0] + d[1] + d[2])
  })
  assert.equal(out.length, items.length)
  for (const o of out) assert.equal(o.answers.length, 14, 'a unit reporting fewer than fourteen is a sample, not a superposition')
  for (const item of items) assert.equal(seen.get(item)!.size, 14, `item ${item} must be asked in all fourteen directions`)
})

test('and the answer does not depend on completion order or on the lane count', async () => {
  const solve = (item: number, d: readonly [number, number, number]): Promise<number> =>
    // deliberately uneven delays, so completion order differs from dispatch order
    new Promise((r) => setTimeout(() => r(item * 100 + d[0] * 9 + d[1] * 3 + d[2]), (item * 7 + d[0] + 2) % 5))
  const items = [1, 2, 3, 4, 5, 6, 7]
  const fold = (o: Awaited<ReturnType<typeof solveAllAtOnce<number>>>): string =>
    o.map((r) => `${r.item}:${r.answers.map((a) => `${a.d.join('')}=${a.value}`).join('|')}`).join(';')
  const wide = await solveAllAtOnce(items, solve, 7)
  const narrow = await solveAllAtOnce(items, solve, 1)
  assert.equal(fold(wide), fold(narrow),
    'the lane count is how many superpositions run together, never what is computed — a result that moved with '
    + 'the width would mean the concurrency is part of the answer')
})
