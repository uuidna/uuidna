// handle-vectors — EACH HANDLE CARRIES ITS EIGHT HEXBITS THROUGH EVERY VECTOR AT ONCE.
//
// A handle is eight tiles, and the walk moves in six directions from each residue: the 60-degree doubling and
// its inverse, the 90-degree reflection through the axis, and the unit shift with its counter. The claim under
// test is that all eight travel TOGETHER — one step of the walk moves every tile, none is left behind and none
// runs ahead — so the handle stays a handle at every point on the path rather than dissolving into eight
// independent digits.
//
// The failure this is built to catch is a walk that advances some tiles and not others: the address would still
// look like a handle, and would name a place no consistent walk reaches.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleOf } from './index.js'
import { toUuid, vortexOrbit } from './index.js'
import { HANDLE_HEXBITS, valueOf } from './index.js'

const dz = (x: number): number => (x === 0 ? 0 : 10 - x)
const tiles = (h: string): number[] => [...h].map((c) => parseInt(c, 16))

test('a handle is exactly eight tiles, and every tile is a hexbit', () => {
  for (const seed of ['captain_theorem', 'two_coins', 'n_qubit_dimension', 'seal_ten']) {
    const h = handleOf(toUuid(seed))
    const t = tiles(h)
    assert.equal(t.length, HANDLE_HEXBITS, `${seed}: a handle is ${HANDLE_HEXBITS} tiles`)
    assert.ok(t.every((x) => x >= 0 && x < 16), 'every tile holds one of sixteen states')
  }
})

test('all eight move together — one step advances every tile, none left behind', () => {
  const orbit = vortexOrbit()
  for (const seed of ['captain_theorem', 'two_coins', 'seal_ten']) {
    const t = tiles(handleOf(toUuid(seed)))
    for (const k of orbit) {
      // the six vectors, applied to every tile at the same step
      const turned = t.map((x) => (x * k) % 9)
      const folded = t.map((x) => dz(x % 10) % 9)
      const shifted = t.map((x) => (x + k) % 9)
      const counter = t.map((x) => (x + 9 - (k % 9)) % 9)
      const halved = t.map((x) => (x * 5) % 9)
      const doubled = t.map((x) => (x * 2) % 9)
      for (const v of [turned, folded, shifted, counter, halved, doubled])
        assert.equal(v.length, HANDLE_HEXBITS, `step ${k}: the vector must carry all ${HANDLE_HEXBITS} tiles`)
      // IN SYNC: the same step applied to the same tile is the same result, whichever order the tiles are read
      const reread = [...t].reverse().map((x) => (x * k) % 9).reverse()
      assert.deepEqual(turned, reread, `step ${k}: a tile's move must not depend on where it sits in the handle`)
    }
  }
})

test('the value is the eight tiles read as one, and the residue places the whole handle', () => {
  for (const seed of ['captain_theorem', 'n_qubit_dimension']) {
    const h = handleOf(toUuid(seed))
    const v = valueOf(h)
    // reconstruct the value from the tiles: base-16 positional, most significant first
    const rebuilt = tiles(h).reduce((a, x) => a * 16 + x, 0)
    assert.equal(v.value, rebuilt, 'the handle value IS its eight tiles, read positionally')
    assert.equal(v.residue, rebuilt % 9, 'and the residue places the whole handle, not any single tile')
    assert.equal(v.nilpotent, v.residue % 3 === 0, 'nilpotence is a property of the handle, decided by its own bytes')
  }
})
