import { test } from 'node:test'
import assert from 'node:assert/strict'
import { citationEdges, citersOf, skillCitationGraph, componentsOf } from './index.js'
import { theorems, SKILLS } from '../theorems/index.js'

test('every citation edge points from a sealed key to a DIFFERENT sealed key', () => {
  const keys = new Set((theorems() as { key: string }[]).map((t) => t.key))
  const edges = citationEdges()
  assert.ok(edges.length > 0, 'the ledger cites itself; zero edges would mean the scan is broken')
  for (const e of edges) {
    assert.ok(keys.has(e.from), `${e.from} is not a sealed key`)
    assert.ok(keys.has(e.to), `${e.to} is not a sealed key`)
    assert.notEqual(e.from, e.to, 'a name containing its own key is not a citation')
  }
  assert.deepEqual(citationEdges(), edges, 'the scan must be deterministic')
})

test('citersOf inverts the edge list exactly — no edge is lost or invented', () => {
  const edges = citationEdges()
  const map = citersOf()
  let total = 0
  for (const [cited, citers] of map) {
    total += citers.length
    for (const c of citers) assert.ok(edges.some((e) => e.from === c && e.to === cited), `${c}→${cited} is not an edge`)
  }
  assert.equal(total, edges.length, 'the inversion must carry every edge and no more')
})

test('the skill graph drops self-edges: a skill citing itself is depth, not a relation', () => {
  for (const e of skillCitationGraph()) {
    assert.notEqual(e.a, e.b, 'a self-edge would put every skill in one seat by construction')
    assert.ok(e.edges >= 1)
    assert.ok(e.a < e.b, 'the pair is unordered and stored in sorted order, so it cannot appear twice')
  }
})

test('componentsOf partitions: every node lands in exactly one component', () => {
  const comps = componentsOf(SKILLS, skillCitationGraph())
  const flat = comps.flat()
  assert.equal(flat.length, SKILLS.length, 'every skill must appear')
  assert.equal(new Set(flat).size, SKILLS.length, 'and no skill twice')
  // adjacency must be RESPECTED: two adjacent skills land in the same component by the definition of a
  // connected component, so a split pair means the walk stopped early rather than that the graph is sparse
  const where = new Map(comps.flatMap((c, i) => c.map((s) => [s, i] as const)))
  for (const e of skillCitationGraph()) assert.equal(where.get(e.a), where.get(e.b), `${e.a} and ${e.b} are adjacent`)
})

// THE CONTROL. componentsOf on a graph with no edges must give one component per node, and on a complete graph
// exactly one — otherwise it is not computing components, it is returning its input in some order.
test('componentsOf answers the two extremes correctly', () => {
  const nodes = ['a', 'b', 'c', 'd']
  assert.equal(componentsOf(nodes, []).length, 4, 'no edges is four seats')
  assert.equal(componentsOf(nodes, [{ a: 'a', b: 'b' }, { a: 'b', b: 'c' }, { a: 'c', b: 'd' }]).length, 1,
    'a path through all four is one seat')
  assert.deepEqual(componentsOf(nodes, [{ a: 'a', b: 'b' }]).map((c) => c.length), [2, 1, 1])
  assert.deepEqual(componentsOf(nodes, [{ a: 'a', b: 'zzz-absent' }]).length, 4, 'an edge to a node not present is ignored')
})
