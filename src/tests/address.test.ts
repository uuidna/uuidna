// excludeSortedJson — real behavior on real objects. Determinism here
// is an ECMAScript-spec guarantee (JSON.stringify with a sorted replacer array), verified by actually calling it
// with different key orders and different object shapes.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { excludeSortedJson, toUuid } from '../index.js'

test('same content, different key insertion order → identical output', () => {
  const a = excludeSortedJson({ b: 2, a: 1, c: 3 }, [])
  const b = excludeSortedJson({ a: 1, c: 3, b: 2 }, [])
  assert.equal(a, b)
})

test('excluded keys never appear in the output, regardless of value', () => {
  const out = excludeSortedJson({ email: 'x@example.com', password: 'secret', salt: 'abc' }, ['password', 'salt'])
  assert.ok(!out.includes('password'))
  assert.ok(!out.includes('secret'))
  assert.ok(!out.includes('salt'))
  assert.ok(out.includes('email'))
})

test('a changed value moves the output', () => {
  const a = excludeSortedJson({ email: 'x@example.com' }, [])
  const b = excludeSortedJson({ email: 'y@example.com' }, [])
  assert.notEqual(a, b)
})

test('excluding a different set of keys can change the output even with identical surviving values', () => {
  const withExtra = excludeSortedJson({ a: 1, b: 2 }, [])
  const withoutExtra = excludeSortedJson({ a: 1, b: 2, c: 3 }, ['c'])
  // both end up with only {a:1, b:2} — should match
  assert.equal(withExtra, withoutExtra)
})

test('empty object and fully-excluded object both serialize to an empty-object JSON', () => {
  assert.equal(excludeSortedJson({}, []), '{}')
  assert.equal(excludeSortedJson({ a: 1 }, ['a']), '{}')
})

test('composes with toUuid exactly like the rest of the address layer', () => {
  const addr1 = toUuid(excludeSortedJson({ x: 1, y: 2 }, []))
  const addr2 = toUuid(excludeSortedJson({ y: 2, x: 1 }, []))
  assert.equal(addr1, addr2)
  assert.match(addr1, /^[0-9a-f-]+$/)
})
