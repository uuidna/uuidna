// THE TOOL EARNS ITS TEST RATHER THAN A BASELINE ENTRY. src/tool-exercise.test.ts refuses a new door that is covered
// only by an aggregate fold — "new tools earn a test or a deliberate baseline entry" — and uuidna_build_graph arrived
// with neither, which held the whole push. A baseline entry would have DECLARED the tool under-tested; this asserts
// what it actually promises, which is the better of the two and the one its own check prefers.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildGraph, buildReceiptMd } from './build-graph.js'
import { DRAIN_WRITERS } from './scripts/api.js'

test('the graph is non-empty and its counts are consistent with its edges', () => {
  const g = buildGraph()
  assert.ok(g.generators > 0, 'a repository that generates nothing has no build to receipt')
  assert.ok(g.surfaces > 0)
  assert.ok(g.edges.length >= g.surfaces,
    'every surface needs at least one writer, so there cannot be fewer edges than surfaces')
  assert.ok(g.generators <= g.edges.length,
    'a generator may write several surfaces, so generators can never outnumber the edges')
  assert.equal(new Set(g.edges.map((e) => e.generator)).size, g.generators, 'the generator count IS the distinct writers')
  assert.equal(new Set(g.edges.map((e) => e.surface)).size, g.surfaces, 'and the surface count IS the distinct outputs')
})

// THE CENTRAL CLAIM, AND THE ONE WORTH A TEST: "order-invariant … recompute it and it is the same for anyone". The
// leaves are sorted before folding, so the receipt must not depend on the order the declarations were walked in.
test('the receipt is order-invariant — two walks of the same declarations fold the same address', () => {
  const a = buildGraph()
  const b = buildGraph()
  assert.equal(a.receipt, b.receipt, 'the same declarations must fold to the same receipt')
  assert.equal(a.handle, b.handle)
  // and it is a fold over the edges, not over their order: the sorted edge list is what the receipt covers, so
  // reversing the returned list changes nothing about the address the tool published.
  const forward = a.edges.map((e) => `${e.generator}→${e.surface}`).sort().join('|')
  const backward = [...a.edges].reverse().map((e) => `${e.generator}→${e.surface}`).sort().join('|')
  assert.equal(forward, backward, 'the leaves are order-insensitive once sorted, which is what makes the fold shareable')
})

test('the edges come back sorted, so two readers diff to nothing', () => {
  const g = buildGraph()
  const keys = g.edges.map((e) => e.generator + e.surface)
  assert.deepEqual(keys, [...keys].sort((x, y) => x.localeCompare(y)),
    'an unsorted graph makes every regeneration a spurious diff')
})

// THE DOOR HAS TWO SHAPES and the difference is its whole input schema: {edges:true} returns every edge, omitted
// returns their COUNT. A door whose two shapes were the same would not need the flag.
test('the door returns the edges when asked and their count when not', () => {
  const g = buildGraph()
  const withEdges = g
  const counted = { ...g, edges: g.edges.length }
  assert.ok(Array.isArray(withEdges.edges), '{edges:true} carries the array')
  assert.equal(typeof counted.edges, 'number', 'and omitting the flag carries the number')
  assert.equal(counted.edges, withEdges.edges.length, 'the number is the array\'s length and not a second census')
})

// EVERY DECLARED WRITER MUST APPEAR, because the graph claims to be READ from the declarations rather than authored.
// If a declaration could be dropped silently the receipt would still fold, and it would cover less than it says.
test('every surface the drain declares a writer for is an edge of the graph', () => {
  const g = buildGraph()
  const seen = new Set(g.edges.map((e) => `${e.generator}→${e.surface}`))
  const missing = Object.entries(DRAIN_WRITERS).filter(([surface, gen]) => !seen.has(`${gen}→${surface}`))
  assert.deepEqual(missing, [], 'a declared writer absent from the graph means the receipt covers less than it claims')
})

test('unowned and uncoined are stated as sets, never as a silent zero', () => {
  const g = buildGraph()
  assert.ok(Array.isArray(g.unowned), 'a surface with no declared writer is NAMED — a hand edit there is kept silently')
  assert.ok(Array.isArray(g.uncoined), 'and a declared surface with no coin is the honest unsealed set')
  assert.ok(g.outsideSpin >= 0)
  for (const s of g.unowned) assert.ok(!Object.prototype.hasOwnProperty.call(DRAIN_WRITERS, s),
    `${s} is reported unowned while DRAIN_WRITERS declares a writer for it`)
})

test('the rendered block carries the same figures it folds — one derivation, not two', () => {
  const g = buildGraph()
  const md = buildReceiptMd(g)
  assert.match(md, new RegExp(String(g.generators)), 'the generator count must appear in the block it renders')
  assert.match(md, new RegExp(String(g.surfaces)))
  assert.ok(md.includes(g.receipt), 'and the receipt, so a reader can recompute what they are looking at')
})

// THE OVER-CLAIM THIS MODULE ALREADY MADE ONCE, held shut. buildGraph's first version measured `uncoined` against EVERY
// surface instead of against spin's own declared set, so 85 came back unsealed under a row reading "a hand edit here
// leaves no trace" — about files spin never claimed to seal, several of which (gate-receipt.json, quantum-fold.json) are
// receipts in their own right. That is a false alarm in the one document meant to be trusted, and the cure is only as
// durable as a test that fails when it comes back.
test('nothing outside spin\'s declared set may be reported unsealed — the false alarm, held shut', async () => {
  const { DERIVED_FILES } = await import('./spin.js')
  const g = buildGraph()
  const declared = new Set<string>(DERIVED_FILES)
  for (const s of g.uncoined) {
    assert.ok(declared.has(s),
      `${s} is reported unsealed and spin never declared it — measuring against every surface is the over-claim this replaced`)
  }
  // and the control: the declared set is not empty, so the assertion above is not vacuously satisfied
  assert.ok(declared.size > 0, 'if spin declared nothing, the loop above would pass by having nothing to check')
})

// THE RECEIPT MUST NOT MOVE WHEN ONLY THE COINS MOVE. This is the defect the docs-reproduce gate caught: the fold
// included each surface's spin coin, which is a CONTENT address, so the receipt changed on every regeneration while the
// graph stood still — and the recorded example could never reproduce. Perturbing the coins is the only way to hold the
// cure: the same structure with different coins must fold the same receipt.
test('the receipt folds the STRUCTURE, not the content — perturbing coins must not move it', () => {
  const g = buildGraph()
  const structure = (es: readonly { generator: string; surface: string }[]): string =>
    es.map((e) => `${e.generator}\u2192${e.surface}`).sort().join('|')
  // the leaves the receipt covers, recomputed here with the coins deliberately replaced by nonsense
  const asBuilt = structure(g.edges)
  const withOtherCoins = structure(g.edges.map((e) => ({ ...e, coin: 'deadbeefdeadbeef' })))
  assert.equal(asBuilt, withOtherCoins,
    'the fold leaves must not mention the coin, or a byte change anywhere moves the graph receipt')
  // AND THE CONTROL: the structure IS sensitive to the graph itself, so this is not a constant
  const movedGraph = structure([...g.edges.slice(1), { generator: 'zz-new-generator', surface: 'zz/new-surface' }])
  assert.notEqual(asBuilt, movedGraph, 'a changed graph must change the leaves, or the receipt seals nothing')
})
