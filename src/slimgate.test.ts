// slimgate — a Lean declaration defines a name and a placeholder is a cut-off name; neither is a citation. Each rule
// is held both ways: the prose and link citations of a name nobody sealed must still read as fabricated.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { slimGate } from './slimgate.js'
import { THEOREMS } from './theorems/index.js'

const sealedKey = THEOREMS.find((t) => /_/.test(t.key))!.key

test('a Lean block declaring a new theorem is not a fabricated citation', () => {
  for (const block of [
    'theorem brand_new_x : 1 = 1 := rfl',
    'import Mathlib\n\n/-- a new fact -/\ntheorem brand_new_x : 1 = 1 := rfl',
    '/-- doc -/ theorem brand_new_x : 1 = 1 := rfl',
    '@[simp] theorem brand_new_x (n : Nat) : n = n := rfl',
    'private theorem brand_new_x {n : Nat} : n = n := rfl',
    'theorem brand_new_x\n    (n : Nat) : n + 0 = n := rfl',
  ]) assert.deepEqual(slimGate(block).fabricated, [], block)
})

test('CONTROL: prose citing an unsealed theorem is still fabricated, at a line start too', () => {
  assert.deepEqual(slimGate('this is backed by theorem nonexistent_xyz_123').fabricated, ['nonexistent_xyz_123'])
  assert.deepEqual(slimGate('theorem nonexistent_xyz_123 proves it').fabricated, ['nonexistent_xyz_123'])
  assert.deepEqual(slimGate('Backed by theorem nonexistent_xyz_123.').fabricated, ['nonexistent_xyz_123'])
  assert.deepEqual(slimGate('see /theorem/nonexistent_xyz').fabricated, ['nonexistent_xyz'])
})

test('a placeholder cut at < or ${ is not a key', () => {
  assert.deepEqual(slimGate('theorem involution_<handle> : ¬ lead_<handle>').fabricated, [])
  assert.deepEqual(slimGate('prove theorem involution_<handle> for the lead').fabricated, [])
  assert.deepEqual(slimGate('the key is theorem involution_${handle}').fabricated, [])
  assert.deepEqual(slimGate('/theorem/involution_<handle>').fabricated, [])
})

test('CONTROL: a sealed citation still verifies, and a declaration beside it does not break the verdict', () => {
  assert.equal(slimGate(`backed by theorem ${sealedKey}`).verdict, 'VERIFIED')
  assert.equal(slimGate(`theorem brand_new_x : 1 = 1 := rfl\n-- backed by theorem ${sealedKey}`).verdict, 'VERIFIED')
  assert.equal(slimGate(`theorem brand_new_x : 1 = 1 := rfl\n-- backed by theorem nonexistent_xyz_123`).verdict, 'UNVERIFIED')
})
