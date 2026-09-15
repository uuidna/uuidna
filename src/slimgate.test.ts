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

test('a declaration opening a string literal is not a citation', () => {
  for (const code of [
    "lean: 'theorem mul_add_by_induction : ∀ n : Nat, n * 1 = n := by decide'",
    'lean = "theorem mul_add_by_induction (n : Nat) : n = n := rfl"',
    '{ key: "k", lean: "theorem mul_add_by_induction : 1 = 1 := by decide" }',
    'const src = `theorem mul_add_by_induction : 1 = 1 := by decide`',
    "assert.equal(gate('theorem refused_key : 1 = 1 := by decide').ok, false)",
    "'theorem refused_key : 1 = 1 := by decide'",
    "['theorem refused_key : 1 = 1 := by decide', 'theorem other_key {n : Nat} : n = n := rfl']",
    '{\\"lean\\":\\"theorem refused_key : 1 = 1 := by decide\\"}',
    "`@[simp] private theorem refused_key : 1 = 1 := rfl`",
  ]) assert.deepEqual(slimGate(code).fabricated, [], code)
})

test('CONTROL: prose inside a string, or a quoted name without a binder, still cites', () => {
  assert.deepEqual(slimGate("note('the proof is theorem nonexistent_xyz_123 backs it')").fabricated, ['nonexistent_xyz_123'])
  assert.deepEqual(slimGate("'theorem nonexistent_xyz_123 backs it'").fabricated, ['nonexistent_xyz_123'])
  assert.deepEqual(slimGate('lean: "see theorem nonexistent_xyz_123 : it is sealed"').fabricated, ['nonexistent_xyz_123'])
  // a quote that CLOSES a string before `theorem` opens nothing: `word' theorem x :` is prose after a literal
  assert.deepEqual(slimGate("said 'hi' theorem nonexistent_xyz_123 : proves it").fabricated, ['nonexistent_xyz_123'])
  assert.equal(slimGate(`note('the proof is theorem ${sealedKey} backs it')`).verdict, 'VERIFIED')
})

test('a key ending in _ is a cut prefix, not a citation — and no sealed key ends in _', () => {
  assert.deepEqual(THEOREMS.filter((t) => t.key.replace(/'+$/, '').endsWith('_')).map((t) => t.key), [])
  assert.deepEqual(slimGate("grep -o '/theorem/enumeration_hex4_' dist/index.html").cited, [])
  assert.deepEqual(slimGate('keys start with theorem enumeration_hex4_ and a nibble').cited, [])
  // CONTROL: the whole key after the same prefix is still cited, sealed or not
  assert.deepEqual(slimGate("grep -o '/theorem/enumeration_hex4_zzzz'").fabricated, ['enumeration_hex4_zzzz'])
  assert.deepEqual(slimGate(`grep -o '/theorem/${sealedKey}'`).real, [sealedKey])
})

test('a one-line answer carrying thousands of theorem lines is read in one pass', () => {
  // an MCP answer is ONE line of JSON; the declaration test once read the whole line for every match and never finished
  const row = (i: number): string => `{"key":"k${i}","lean":"theorem ${sealedKey} : 1 = 1 := by decide","why":"backed by theorem ${sealedKey}"}`
  const line = '[' + Array.from({ length: 20000 }, (_, i) => row(i)).join(',') + ']'
  const v = slimGate(line)
  assert.deepEqual(v.real, [sealedKey])
  assert.deepEqual(v.fabricated, [])
})
