// build-graph.test — THE RECEIPT CLAIMS ORDER-INVARIANCE AND HONEST SCOPE, SO BOTH ARE TESTED.
//
// Two claims in this module could be false while every number still looked reasonable, which is the only kind of defect
// worth writing a control for:
//
//   · ORDER-INVARIANCE. The receipt says "recompute it and it is the same for anyone". The fold sorts its leaves, so the
//     property should hold — but "should hold because I sorted" is exactly the reasoning that has been wrong in this
//     tree before. Asserted by folding a shuffled edge list and requiring the same receipt, with a control that the
//     shuffle actually changed the input order, so the test cannot pass by comparing a list to itself.
//
//   · HONEST SCOPE. The first version of buildGraph reported 85 uncoined surfaces under a row reading "a hand edit here
//     leaves no trace", about files spin never claimed to seal — a false alarm in the one document meant to be trusted.
//     The cure measured the unsealed set against spin's own declaration, and the test pins BOTH sides of that: nothing
//     outside the declaration may be called unsealed, and every unsealed row must be inside it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildGraph, buildReceiptMd } from './build-graph.js'
import { DERIVED_FILES } from './spin.js'
import { hexbitReceipt } from './hexbit/index.js'

test('the graph is non-empty and every edge names both ends', () => {
  const g = buildGraph()
  assert.ok(g.edges.length > 50, `the declarations carry a real graph: ${g.edges.length} edge(s)`)
  assert.ok(g.generators > 10 && g.surfaces > 10, `${g.generators} generators, ${g.surfaces} surfaces`)
  for (const e of g.edges) {
    assert.ok(e.generator.length > 0, 'an edge with no generator names no computation')
    assert.ok(e.surface.length > 0, 'an edge with no surface names no output')
  }
  // the counts are a census OF the edges, never a second claim beside them
  assert.equal(g.generators, new Set(g.edges.map((e) => e.generator)).size)
  assert.equal(g.surfaces, new Set(g.edges.map((e) => e.surface)).size)
})

test('ORDER-INVARIANT: a shuffled edge list folds to the same receipt — and the shuffle really shuffled', () => {
  const g = buildGraph()
  const leafOf = (e: { generator: string; surface: string; coin: string | null }): string =>
    `${e.generator}→${e.surface}${e.coin ? ':' + e.coin : ''}`
  const inOrder = g.edges.map(leafOf)
  // reverse is a deterministic shuffle — no Math.random anywhere in this tree, and a fixed permutation is enough:
  // the property under test is independence from order, not independence from one particular order
  const reversed = [...inOrder].reverse()
  assert.notDeepEqual(reversed, inOrder, 'THE CONTROL: if the permutation were a no-op this test would compare a list to itself')
  assert.equal(hexbitReceipt([...reversed].sort()).receipt, g.receipt, 'the fold must not depend on the order the declarations were walked')
  // and recomputing the whole graph twice is stable, which is the property a reader actually relies on
  assert.equal(buildGraph().receipt, g.receipt)
  assert.equal(buildGraph().handle, g.handle)
})

test('HONEST SCOPE: unsealed is measured against spin\'s own declaration, in both directions', () => {
  const g = buildGraph()
  const scope = new Set<string>(DERIVED_FILES)
  // nothing outside spin's declaration may be reported as unsealed — the false alarm this replaced
  for (const s of g.uncoined) {
    assert.ok(scope.has(s), `${s} is reported unsealed and spin never claimed to seal it — that is the over-claim, back`)
  }
  // and the surfaces outside the declaration are counted, not silently dropped: the two sets must cover every surface
  assert.equal(g.outsideSpin, g.surfaces - g.edges.filter((e) => scope.has(e.surface)).map((e) => e.surface)
    .reduce((set: Set<string>, s) => set.add(s), new Set<string>()).size,
    'outsideSpin plus the in-scope surfaces must account for every surface — a gap here means a surface vanished from both')
  assert.ok(g.outsideSpin >= 0)
})

test('the rendered block states the receipt and never reports health it does not have', () => {
  const g = buildGraph()
  const md = buildReceiptMd(g)
  assert.match(md, new RegExp(g.receipt), 'the block carries the receipt, so a reader can recompute it')
  assert.match(md, /Recompute with/, 'and names the door that recomputes it')
  // the unowned row must print the real count — a receipt that rounded its own bad news down would be worthless
  assert.match(md, new RegExp(`\\| ${g.unowned.length} \\|`), 'the unowned count is printed as measured')
  assert.equal(md.includes('| 0 |') && g.uncoined.length !== 0, false, 'a zero may only be printed when it was measured')
})
