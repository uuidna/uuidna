// slimgate — a primed Lean name (two_coins') is its own key, never its stem, by construction: the key pattern takes the
// primes into the name. Held both ways: a primed name is not verified by its stem's seal, and an English possessive
// ("two_coins's proof") still cites the stem it names.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { slimGate } from './slimgate.js'
import { THEOREMS } from './theorems/index.js'

const sealedKey = THEOREMS.find((t) => /_/.test(t.key) && !THEOREMS.some((u) => u.key === t.key + "'"))!.key

test('a primed name is not verified by its sealed stem', () => {
  for (const claim of [`proven in theorem ${sealedKey}'`, `see /theorem/${sealedKey}' here`]) {
    const v = slimGate(claim)
    assert.equal(v.verdict, 'UNVERIFIED', claim)
    assert.deepEqual(v.fabricated, [sealedKey + "'"], claim)
  }
})

test('a declaration of a primed name cites nothing', () => {
  assert.deepEqual(slimGate("theorem brand_new_x' : 1 = 1 := rfl").fabricated, [])
})

test('a fabricated primed citation is named with its prime', () => {
  assert.deepEqual(slimGate("proven in theorem nonexistent_xyz'").fabricated, ["nonexistent_xyz'"])
})

test('the stem and its possessive still cite the sealed stem', () => {
  for (const claim of [`proven in theorem ${sealedKey}`, `theorem ${sealedKey}'s proof`]) {
    const v = slimGate(claim)
    assert.equal(v.verdict, 'VERIFIED', claim)
    assert.deepEqual(v.real, [sealedKey], claim)
  }
})
