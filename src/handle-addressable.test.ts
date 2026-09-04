import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { hexPiOf } from './hexagram.js'
import { handleOf } from './handle.js'
import { THEOREMS } from './theorems/index.js'

// ── ONLY ONE OF THE TWO EIGHT-HEX VALUES IS AN ADDRESS, AND THE PAGE MUST SAY SO.
//
// Tested from outside on 2026-09-04: uuidna.com/2c64ada3 answers 200 and uuidna.com/a8e9d305 answers 404. Both
// were printed as identical eight-character chips on the same theorem page, both labelled `-handle`, both
// carrying an attribute called `data-door`. The 404 was CORRECT — the second value is the leading eight nibbles
// of the second 64-bit coin, and no record's address begins with it — so the defect was entirely presentational:
// a reader outside this project could not tell which chip was visitable, and the obvious guess fails.
//
// This is the same fault handleOf's own docstring was written about: three call sites once sliced a raw uuid and
// agreed only because a v8 uuid's first group happens to be eight hex characters. Eight hex characters is not a
// handle; being the START of an address is.

test('the referrer read IS the address handle, and the superposition read is not', () => {
  for (const t of THEOREMS.slice(0, 400)) {
    const pi = hexPiOf(t.address)
    assert.equal(pi.referrer.handle, handleOf(t.address), `${t.key}: the referrer read must be the handle`)
    // the superposition read starts mid-uuid, so it is only accidentally ever equal to the handle
    if (pi.superposition.handle === pi.referrer.handle) continue
    assert.notEqual(pi.superposition.handle, handleOf(t.address))
  }
})

test('no theorem address begins with a superposition read — which is why it 404s', () => {
  const starts = new Set(THEOREMS.map((t) => handleOf(t.address)))
  let checked = 0, resolvable = 0
  for (const t of THEOREMS.slice(0, 600)) {
    const sup = hexPiOf(t.address).superposition.handle
    if (!sup) continue
    checked++
    if (starts.has(sup)) resolvable++
  }
  assert.ok(checked > 100, 'the sample must be real')
  // a collision is possible in principle; what matters is that it is the exception, not the rule
  assert.ok(resolvable * 10 < checked, `${resolvable} of ${checked} superposition reads happen to be handles — presenting them as doors would mislead`)
})

test('the page marks which chip is addressable, visibly and not only in a tooltip', () => {
  const vue = readFileSync(join(ROOT, 'docs', '.vitepress', 'theme', 'HexFace.vue'), 'utf8')
  assert.match(vue, /data-slot="referrer-handle"[\s\S]{0,200}data-addressable="1"/, 'the address handle must be marked addressable')
  assert.match(vue, /data-slot="superposition-handle"[\s\S]{0,200}data-addressable="0"/, 'the coordinate must be marked NOT addressable')
  // A TITLE ATTRIBUTE REQUIRES A POINTER, which a printed page, a PDF and a scraped copy do not have — so a
  // tooltip-only distinction is invisible in exactly the forms a research record travels in. The affordance has
  // to be in the stylesheet as well.
  assert.match(vue, /\[data-addressable="1"\]\s*\{[^}]*text-decoration/, 'the addressable chip needs a visible affordance')
  assert.match(vue, /\[data-addressable="0"\]\s*\{[^}]*font-style/, 'the coordinate needs a visibly different one')
})

// THE WORD `door` MEANT TWO THINGS ON ONE LINE. On these chips it is the hexagram RAY (0..5); a few lines below,
// `door` is a resolvable URL. Renamed here so the number beside a URL does not read as one.
test('the ray is not called a door where a door is a URL', () => {
  const vue = readFileSync(join(ROOT, 'docs', '.vitepress', 'theme', 'HexFace.vue'), 'utf8')
  const chips = /class="hex-pi-handles"[\s\S]*?<\/p>/.exec(vue)?.[0] ?? ''
  assert.ok(chips.length > 0, 'the chip block must exist')
  assert.match(chips, /data-ray=/, 'the hexagram ray is called a ray')
  assert.ok(!/data-door=/.test(chips), 'nothing in the chip block may call a ray a door')
  // and the ray value is still the hexagram ray, 0..5
  for (const t of THEOREMS.slice(0, 50)) {
    const pi = hexPiOf(t.address)
    assert.ok(pi.referrer.door >= 0 && pi.referrer.door < 6, 'a ray is 0..5')
    assert.ok(pi.superposition.door >= 0 && pi.superposition.door < 6)
  }
})
