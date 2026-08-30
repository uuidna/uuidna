// hero-channel — hero SVG is iching-only for the moment; read-back via orbit nodes resumes when that layer returns.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  heroAnimation, readHero, theorems, vortexOrbit, durationVars, coins, fuseLadder,
  heroAt, resolveReferrer, coinHexFromHandle, ichingGatesOf,
} from '../index.js'
import { referrerDoorOf, HEXAGRAM_BITS } from '../hexagram.js'
import { handleOf } from '../handle.js'
import { heroAnimationOf } from '../render.js'
import { COINS } from '../hexbit/index.js'

test('iching hero svg carries handle and door, not the legacy orbit channel', () => {
  const h = heroAnimation('two_coins')
  assert.match(h.svg, /data-handle="[0-9a-f]{8}"/)
  assert.match(h.svg, /data-door="\d+"/)
  assert.match(h.svg, /data-slot="gate"/)
  const read = readHero(h.svg)
  assert.equal(read.carried, 0)
  assert.equal(read.complete, false)
})

test('different theorems animate differently — the channel distinguishes, it does not decorate', () => {
  const [a, b, c] = ['two_coins', 'vortex_orbit', 'codons_four_cubed'].map((k) => heroAnimation(k).svg)
  assert.notEqual(a, b)
  assert.notEqual(b, c)
  assert.notEqual(a, c)
  assert.equal(heroAnimation('two_coins').svg, a)
})

test('the lcm bound makes the read exact — and the margin over a hex digit is exactly the two coins', () => {
  const tempi = Object.keys(durationVars()).length
  assert.equal(tempi, 6, 'six sealed tempi')
  const seen = new Map<string, number>()
  for (let d = 0; d < 16; d++) {
    const pair: string = `${d % tempi}:${d % 9}`
    assert.equal(seen.has(pair), false, `residue pair ${pair} would be ambiguous between ${seen.get(pair)} and ${d}`)
    seen.set(pair, d)
  }
})

test('a foreign animation is refused', () => {
  const forged = '<svg><circle data-seq="3"><animate dur="123ms"/></circle></svg>'
  assert.equal(readHero(forged).carried, 0)
  assert.equal(readHero(forged).complete, false)
})

test('the hero fuses only when captain coins are contributed at each rung', () => {
  const paid = heroAnimation('two_coins')
  assert.equal(paid.fused, true)
  assert.deepEqual([...paid.sequence], vortexOrbit())
  assert.deepEqual([...paid.sequence], [...fuseLadder(1, coins())])
  assert.match(paid.svg, /data-fused="1"/)
  assert.match(paid.svg, /data-period="/)
  assert.ok(paid.ten.period > 0)
  assert.ok(paid.ten.rotation > 0)
  assert.doesNotMatch(heroAnimation('two_coins').svg, /will not fuse/)
  assert.deepEqual([...fuseLadder(1, 0)], [1])
})

test('heroAt: two handles differ in boards, hsl, and referrer door', () => {
  const a = heroAt(resolveReferrer('caf5e83a'))
  const b = heroAt(resolveReferrer('0333fd7e'))
  assert.notEqual(a.hsl, b.hsl)
  assert.notEqual(a.handle, b.handle)
  assert.notEqual(JSON.stringify(a.boards), JSON.stringify(b.boards))
  assert.equal(a.referrerDoor, referrerDoorOf(a.handle))
  assert.equal(b.referrerDoor, referrerDoorOf(b.handle))
  assert.equal(a.boards.length, COINS)
  assert.equal(a.boards[0]!.length, a.gates)
  assert.equal(a.boards[0]![0]!.lines.length, HEXAGRAM_BITS)
})

test('ichingGatesOf: six lines per gate from gate index bits', () => {
  const gates = ichingGatesOf(Array(64).fill(0))
  assert.equal(gates.length, 64)
  assert.deepEqual(gates[5]!.lines, [1, 0, 1, 0, 0, 0])
})

test('coinHexFromHandle: two coins overlap by two handle nibbles', () => {
  const a = heroAt(resolveReferrer('caf5e83a'))
  assert.equal(a.coinColors[0].hex, coinHexFromHandle(a.handle, 0))
  assert.equal(a.coinColors[1].hex, coinHexFromHandle(a.handle, 2))
  assert.notEqual(a.coinColors[0].hex, a.coinColors[1].hex)
  assert.match(a.coinColors[0].hex, /^#[0-9a-f]{6}$/)
  assert.equal(a.handleColors.length, 8)
})

test('heroAnimationOf(referrer) stamps handle, door, and iching gates on svg', () => {
  const addr = theorems()[0]!.address
  const h = heroAnimationOf(addr)
  assert.equal(h.handle, handleOf(addr))
  assert.match(h.svg, new RegExp(`data-handle="${h.handle}"`))
  assert.match(h.svg, /data-door="\d+"/)
  assert.match(h.svg, /data-slot="gate"/)
  assert.match(h.svg, /data-coin-a="#[0-9a-f]{6}"/)
  assert.match(h.svg, /hero-coin/)
})
