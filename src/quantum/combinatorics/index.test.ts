import { test } from 'node:test'
import assert from 'node:assert/strict'

import { crossings, isClosed, routeText, routesTo, type LatticePoint } from './index.js'
import { BASE_DIMENSIONS, DERIVED } from '../os/engapi/index.js'

const SI: LatticePoint[] = [
  ...BASE_DIMENSIONS.map((u, i) => ({ name: u, vector: BASE_DIMENSIONS.map((_, k) => (k === i ? 1 : 0)) })),
  ...DERIVED.map((d) => ({ name: d.unit, vector: [...d.dim] })),
]
/** the Planck lattice, rank FOUR — the same argument this module exists to stop writing twice */
const PLANCK: LatticePoint[] = [
  { name: 'l', vector: [1, 1, -3, 0] }, { name: 'm', vector: [1, -1, 1, 0] },
  { name: 't', vector: [1, 1, -5, 0] }, { name: 'T', vector: [1, -1, 5, -2] },
]

/** One instrument, two ranks. If it only ever worked at seven it would be the SI census wearing a general name. */
test('closure holds at rank seven and at rank four', () => {
  assert.equal(isClosed(SI), true)
  assert.equal(isClosed(PLANCK), true)
})

/**
 * ROUTE LENGTH CHANGES THE ANSWER, which is why it is a parameter. Force is reached ONCE by pairs and three
 * times once triples are allowed — a census taken at one length and reported as "the crossings" would call
 * force uncrossed, a statement about the census rather than about the lattice.
 */
test('force crosses only at length three', () => {
  const pairs = routesTo('N', SI, 2), triples = routesTo('N', SI, 3)
  assert.equal(pairs.length, 1)
  assert.ok(triples.length > pairs.length)
  assert.ok(triples.map(routeText).includes('J/m'))
})

/** A product is order-free and a ratio is not — counting a·b twice would measure the enumeration, not the lattice. */
test('products count once, ratios count both ways', () => {
  const j = routesTo('J', SI, 2)
  const products = j.filter((r) => r.kind === 'product').map(routeText)
  assert.deepEqual(products, [...new Set(products)], 'a product was enumerated twice')
  for (const r of j.filter((x) => x.kind === 'product')) {
    assert.ok(r.parts[0] <= r.parts[1], `${routeText(r)} is not in name order, so its mirror will double it`)
  }
  // and the ratio direction is genuinely distinguished
  const v = routesTo('V', SI, 2).filter((r) => r.kind === 'ratio').map(routeText)
  assert.ok(v.includes('W/A') && !v.includes('A/W'))
})

/** The joule is the crossing this whole argument was found on — pinned, so a table change has to say so. */
test('the joule is reached four ways by pairs', () => {
  const j = routesTo('J', SI, 2).map(routeText).sort()
  assert.deepEqual(j, ['C·V', 'N·m', 'W/Hz', 'W·s'])
})

/** Crossings are ordered by how heavily crossed they are, because a reader takes the top row. */
test('crossings are ordered by route count', () => {
  const counts = crossings(SI, 2).map((c) => c.routes.length)
  assert.deepEqual(counts, [...counts].sort((a, b) => b - a))
  assert.ok(crossings(SI, 2).every((c) => c.routes.length >= 2))
})

/**
 * THE REFUSALS ARE THE POINT, not decoration. A lattice whose points disagree about the basis has no closure,
 * so every route it reported would be an artefact of the mismatch — answering anyway is worse than refusing.
 */
test('a malformed lattice is refused rather than answered', () => {
  assert.throws(() => isClosed([{ name: 'a', vector: [1, 0] }, { name: 'b', vector: [1, 0, 0] }]), /REFUSED/)
  assert.throws(() => isClosed([{ name: 'a', vector: [0.5, 0] }]), /REFUSED/)
  assert.throws(() => routesTo('J', SI, 1), /REFUSED/)
  assert.throws(() => routesTo('no_such_unit', SI, 2), /REFUSED/)
})
