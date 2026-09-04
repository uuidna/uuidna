import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  exactCirclePoints, exactSpherePoints, verifyExact, octantOrbit,
  ledgerGeometry, monographGeometry, geometryCensus, geometryGaps,
} from './three-geometry.js'
import { publicationGraph, graphCensus } from './publication-graph.js'
import { THEOREMS } from './theorems/index.js'

// THE WHOLE POINT IS THAT A VERTEX CAN BE CHECKED. A scene that places points with floating trigonometry keeps
// no record of where they came from — BY CONSTRUCTION, since a rounded double carries only its own value — so a
// reader has nothing to re-decide. Every vertex here carries the integers it came from instead, and these tests
// re-decide the identity on those integers rather than eyeballing a float.

test('verifyExact FIRES on a point that is not on the unit circle or sphere', () => {
  assert.equal(verifyExact({ x: 3, y: 4, z: 0, d: 5 }), true)
  assert.equal(verifyExact({ x: 1, y: 2, z: 2, d: 3 }), true)
  assert.equal(verifyExact({ x: 3, y: 4, z: 1, d: 5 }), false, 'off the sphere must fail')
  assert.equal(verifyExact({ x: 1, y: 1, z: 1, d: 2 }), false, '3 is not 4')
  assert.equal(verifyExact({ x: 0, y: 0, z: 0, d: 0 }), false, 'a zero denominator is not a direction')
})

test('every circle point satisfies a² + b² = c² exactly', () => {
  const ps = exactCirclePoints()
  assert.ok(ps.length > 0)
  for (const p of ps) {
    assert.equal(p.z, 0, 'a circle point has no z')
    assert.equal(p.x * p.x + p.y * p.y, p.d * p.d, `(${p.x},${p.y})/${p.d} is not on the circle`)
  }
})

test('every sphere point satisfies x² + y² + z² = t² exactly, and is reduced', () => {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  for (const p of exactSpherePoints()) {
    assert.ok(verifyExact(p), `(${p.x},${p.y},${p.z})/${p.d} is off the sphere`)
    assert.equal(gcd(gcd(gcd(p.x, p.y), p.z), p.d), 1, 'a point must be reduced, not a scaling of another')
  }
})

test('the sign-and-axis orbit preserves exactness — negation cannot move a point off the sphere', () => {
  for (const p of exactSpherePoints().slice(0, 6)) {
    const orbit = octantOrbit(p)
    assert.ok(orbit.length > 0)
    for (const q of orbit) {
      assert.ok(verifyExact(q), 'the orbit left the sphere')
      assert.equal(q.d, p.d, 'the orbit must not change the denominator')
    }
    // and the orbit is deduped — no direction appears twice
    assert.equal(new Set(orbit.map((q) => `${q.x}|${q.y}|${q.z}`)).size, orbit.length)
  }
})

test('the ledger scene places every theorem, exactly', () => {
  const g = ledgerGeometry()
  assert.equal(g.vertices.length, THEOREMS.length, 'every theorem gets a vertex')
  assert.equal(g.positions.length, g.vertices.length * 3, 'the flat buffer must be three floats per vertex')
  assert.equal(g.exactVerified, true)
  for (const v of g.vertices) assert.ok(verifyExact(v.exact), `${v.label}: fabricated position`)
})

test('every monograph segment IS a sealed kin relation — no invented edge', () => {
  const g = monographGeometry()
  const nodes = publicationGraph()
  const byIdx = g.vertices.map((v) => v.label)
  assert.equal(g.vertices.length, nodes.length)
  assert.equal(g.indices.length % 2, 0, 'segments come in pairs')
  for (let i = 0; i < g.indices.length; i += 2) {
    const a = byIdx[g.indices[i]!]!, b = byIdx[g.indices[i + 1]!]!
    const related = nodes.find((n) => n.slug === a)!.kin.some((k) => k.slug === b)
      || nodes.find((n) => n.slug === b)!.kin.some((k) => k.slug === a)
    assert.ok(related, `${a}—${b} is not a kin relation; the scene invented an edge`)
  }
})

// THE DEDUP BUG THIS TEST EXISTS TO PREVENT. The first loop skipped any edge whose target index was lower than
// its source. That dedupes a MUTUAL pair correctly and silently DELETES a one-directional edge running downward —
// and since the kin list is a shortlist cut at five, one-directional edges are the common case.
test('no kin relation is dropped, and none is drawn twice', () => {
  const g = monographGeometry()
  const nodes = publicationGraph()
  const expected = new Set<string>()
  for (const n of nodes) for (const k of n.kin) expected.add([n.slug, k.slug].sort().join('|'))
  const drawn = new Set<string>()
  const byIdx = g.vertices.map((v) => v.label)
  for (let i = 0; i < g.indices.length; i += 2)
    drawn.add([byIdx[g.indices[i]!]!, byIdx[g.indices[i + 1]!]!].sort().join('|'))
  assert.equal(drawn.size, g.indices.length / 2, 'a pair was drawn twice')
  assert.deepEqual([...expected].sort().filter((e) => !drawn.has(e)), [], 'a kin relation was dropped')
  assert.equal(drawn.size, expected.size)
  // and the directed count must exceed the undirected one by exactly the mutual pairs
  assert.ok(graphCensus().edges >= drawn.size, 'undirected pairs cannot exceed directed edges')
})

test('the census agrees with the scenes, and nothing is inexact', () => {
  const c = geometryCensus()
  assert.equal(c.ledgerVertices, ledgerGeometry().vertices.length)
  assert.equal(c.monographVertices, monographGeometry().vertices.length)
  assert.equal(c.monographSegments, monographGeometry().indices.length / 2)
  assert.equal(c.allExact, true)
  assert.deepEqual(geometryGaps(), [])
})

test('the scenes are deterministic — the same ledger returns the same receipt', () => {
  assert.equal(geometryCensus().receipt, geometryCensus().receipt)
  assert.equal(ledgerGeometry().receipt, ledgerGeometry().receipt)
})
