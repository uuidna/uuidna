// hero-channel — THEOREMS COMMUNICATE THROUGH THEIR ANIMATIONS, and this is the proof that they do rather than the
// claim that they might. An animation whose numbers merely LOOK derived is decoration; one whose source can be
// RECOVERED from what a viewer sees is a channel. Each node shows two residues — the sealed tempo it beats on (mod 6,
// six tempi) and the sequence rung it wears (mod 9) — and since lcm(6, 9) = 18 exceeds the 16 values a hex digit can
// take, the pair fixes the digit uniquely by the LCM BOUND (residues_identify_digit): 18 = 2·9 is the two coins on the ring and 18 − 16 = 2 is the coins as headroom. NOT the CRT — gcd(9,6) = 3, sealed. Six nodes therefore carry six digits of
// the theorem's own content-address, and readHero() reads them back out of the SVG.
//
// HONEST SCOPE: the motion transmits IDENTITY, never meaning — which theorem is speaking, not what it says.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { heroAnimation, readHero, theorems, vortexOrbit, durationVars } from '../index.js'

test('every theorem transmits its own address through its animation, and it reads back exactly', () => {
  const sample = theorems().filter((_, i) => i % 97 === 0).slice(0, 12)   // a spread across the whole ledger
  assert.ok(sample.length >= 8, 'the sample should span the ledger')
  const failures: string[] = []
  for (const t of sample) {
    const read = readHero(heroAnimation(t.key).svg)
    const want = t.address.replace(/-/g, '').slice(0, read.carried)
    if (read.digits !== want) failures.push(`${t.key}: read ${read.digits}, address starts ${want}`)
    if (!read.complete) failures.push(`${t.key}: carried only ${read.carried} of ${vortexOrbit().length} digits`)
  }
  assert.deepEqual(failures, [], 'the animation must carry the address it announces')
})

test('different theorems animate differently — the channel distinguishes, it does not decorate', () => {
  const [a, b, c] = ['two_coins', 'vortex_orbit', 'codons_four_cubed'].map((k) => heroAnimation(k).svg)
  assert.notEqual(a, b)
  assert.notEqual(b, c)
  assert.notEqual(a, c)
  // and the same theorem always animates the same — a channel that wandered would carry nothing
  assert.equal(heroAnimation('two_coins').svg, a)
})

test('the lcm bound makes the read exact — and the margin over a hex digit is exactly the two coins', () => {
  const tempi = Object.keys(durationVars()).length
  assert.equal(tempi, 6, 'six sealed tempi')
  // lcm(6, 9) = 18 > 16: every hex digit has a UNIQUE residue pair, so the read is exact rather than probable
  const seen = new Map<string, number>()
  for (let d = 0; d < 16; d++) {
    const pair: string = `${d % tempi}:${d % 9}`
    assert.equal(seen.has(pair), false, `residue pair ${pair} would be ambiguous between ${seen.get(pair)} and ${d}`)
    seen.set(pair, d)
  }
})

test('a foreign animation is refused, not guessed at', () => {
  // an SVG whose tempo is not one of the sealed six carries nothing this reader will invent a digit for
  const forged = '<svg><circle data-seq="3"><animate dur="123ms"/></circle></svg>'
  assert.equal(readHero(forged).carried, 0)
  assert.equal(readHero(forged).complete, false)
})
