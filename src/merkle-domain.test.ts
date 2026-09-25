import { test } from 'node:test'
import assert from 'node:assert/strict'

import { leafHash, merge, merkleFold, toUuid } from './address.js'
import { merkleRoot } from './merkle.js'

const a = toUuid('leaf-a'), b = toUuid('leaf-b'), c = toUuid('leaf-c')

/**
 * THE WITNESS THAT WAS REAL, kept so the fault cannot return unnoticed.
 *
 * An internal node is merge(x, y); an untagged leaf is a bare address; both are the same shape. Until the leaf
 * tag went in, [merge(a,b), c] folded to the IDENTICAL root as [a, b, c] — two different leaf sets satisfying
 * one commitment, which is a commitment to neither. The Zenodo crypto report predicted exactly this
 * ("without distinct leaf and node prefixes, a leaf encoding could be confused with an internal-node
 * encoding"); this is the measured instance of it in this tree.
 */
test('an internal node offered as a leaf does not reproduce the root', () => {
  const internal = merge(...([a, b].sort() as [string, string]))
  assert.notEqual(merkleFold([a, b, c]), merkleFold([internal, c]))
  assert.notEqual(merkleRoot([a, b, c]), merkleRoot([merge(a, b), c]))
})

/**
 * THE GUARD MUST BE ABLE TO FAIL. If the tag were dropped the collision returns, so the untagged fold is
 * rebuilt here and shown to collide — otherwise the test above passes for reasons nobody checked.
 */
test('the same fold without the tag does collide — the tag is what prevents it', () => {
  const untagged = (leaves: readonly string[]): string => {
    let layer = [...leaves].sort()
    while (layer.length > 1) {
      const next: string[] = []
      for (let i = 0; i < layer.length; i += 2) {
        const l = layer[i], r = layer[i + 1]
        next.push(r === undefined ? l : merge(l, r))
      }
      layer = next
    }
    return layer[0]
  }
  const internal = merge(...([a, b].sort() as [string, string]))
  assert.equal(untagged([a, b, c]), untagged([internal, c]))
})

/** ONE definition of a leaf, so the ordered tree and the unordered fold cannot drift on what a leaf is. */
test('both constructions tag a leaf the same way', () => {
  assert.equal(leafHash(a), toUuid('leaf:' + a))
  // a node's preimage starts with an address, a leaf's with "leaf:" — the prefixes never coincide, by
  // construction, since an address is hex and "leaf:" is not
  assert.ok(!merge(a, b).startsWith('leaf:'))
})

/** The fold still does its job: order-independent, and distinct sets give distinct roots. */
test('the fold stays order-independent and separates distinct sets', () => {
  assert.equal(merkleFold([a, b, c]), merkleFold([c, a, b]))
  assert.notEqual(merkleFold([a, b, c]), merkleFold([a, b]))
  assert.notEqual(merkleFold([a, b, c]), merkleFold([a, b, c, c]))
  assert.equal(merkleFold([]), toUuid('empty-mind'))
})
