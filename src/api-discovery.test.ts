import { test } from 'node:test'
import assert from 'node:assert/strict'
import { deriveSchema, discoveryOf, methodsOf, quantitiesOf } from './api-discovery.js'

test('deriveSchema — reads the paths and kinds a response actually carried', () => {
  const f = deriveSchema({ name: 'curcumin', mass: 368.38, tags: ['a', 'b'], meta: { ok: true } })
  const paths = f.map((x) => x.path).sort()
  assert.ok(paths.includes('name'))
  assert.ok(paths.includes('mass'))
  assert.ok(paths.includes('tags'))
  assert.ok(paths.includes('tags[]'))
  assert.ok(paths.includes('meta.ok'))
  assert.equal(f.find((x) => x.path === 'mass')!.kind, 'number')
})

// A NUMBER'S VALUE IS KEPT AS AN EXACT DECIMAL STRING, so nothing downstream is lost to a float.
test('deriveSchema — a number keeps its exact decimal sample', () => {
  const f = deriveSchema({ k: 1.380649e-23, n: 299792458 })
  assert.equal(f.find((x) => x.path === 'n')!.sample, '299792458')
  assert.ok(f.find((x) => x.path === 'k')!.sample!.length > 0)
})

// THE BOUNDS ARE REAL: an unbounded walk over a deep response is how a probe becomes a denial of service.
test('deriveSchema — depth and array width are bounded', () => {
  const deep = { a: { b: { c: { d: { e: { f: { g: 1 } } } } } } }
  const f = deriveSchema(deep, 3)
  assert.ok(!f.some((x) => x.path.includes('.e.')), 'stopped at the declared depth')
  const wide = { xs: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
  assert.equal(deriveSchema(wide, 6, 2).filter((x) => x.path === 'xs[]').length, 1,
    'one element teaches what a homogeneous array holds')
})

// BOOKKEEPING IS NOT A QUANTITY: crossing a record id against a sealed constant is the digit coincidence this tree
// spent the afternoon learning to refuse.
test('quantitiesOf — ids, counts, pages and timestamps are refused', () => {
  const f = deriveSchema({
    id: 38, totalCount: 1200, page: 2, timestamp: 1759000000, year: 2026,
    molecularWeight: 368.38, meltingPoint: 183,
  })
  const q = quantitiesOf(f).map((x) => x.path).sort()
  assert.deepEqual(q, ['meltingPoint', 'molecularWeight'])
})

test('quantitiesOf — a nested bookkeeping field is refused by its path, not only its leaf', () => {
  const f = deriveSchema({ result: { hits: { total: 55 }, mass: 12.5 } })
  const q = quantitiesOf(f).map((x) => x.path)
  assert.ok(q.includes('result.mass'))
  assert.ok(!q.some((p) => p.includes('total')))
})

test('methodsOf — an array is listable, an object expandable, a number crossable, a string matchable', () => {
  const m = methodsOf(deriveSchema({ xs: [1], obj: { a: 1 }, n: 5, s: 'x' }))
  const kinds = new Map(m.map((x) => [x.path, x.kind]))
  assert.equal(kinds.get('xs'), 'list')
  assert.equal(kinds.get('obj'), 'expand')
  assert.equal(kinds.get('n'), 'cross')
  assert.equal(kinds.get('s'), 'match')
})

// "DID NOT ANSWER" AND "ANSWERED WITH NOTHING" ARE DIFFERENT, and collapsing them is how an outage reads as a clean
// probe.
test('discoveryOf — a probe that did not answer has a NULL schema, not an empty one', () => {
  const d = discoveryOf('mpns', null, 'registration required and no key is held')
  assert.equal(d.fields, null)
  assert.deepEqual(d.quantities, [])
  assert.match(d.why, /registration/)
})

test('discoveryOf — an empty object answered, and says so with an empty field list', () => {
  const d = discoveryOf('x', {}, 'answered')
  assert.notEqual(d.fields, null)
  assert.equal(d.quantities.length, 0)
})
