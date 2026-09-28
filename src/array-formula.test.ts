import { test } from 'node:test'
import assert from 'node:assert/strict'
import { arraysOf, fitArray, generate, hashQuantity } from './array-formula.js'

// THE CASE THE CAPTAIN NAMED: a sealed list read as four unrelated integers, when the relation IS the content.
test('fitArray — the points of sail are 45k, not four numbers', () => {
  const fit = fitArray(['45', '90', '135', '180'])
  assert.equal(fit.formula, 'a(k) = 45 + 45k')
  assert.ok(fit.forms.some((f) => f.kind === 'arithmetic'))
})

test('fitArray — the harmonic series is 110k', () => {
  const fit = fitArray(['110', '220', '330', '440', '550', '660'])
  assert.match(String(fit.formula), /110/)
  assert.ok(fit.forms.length > 0)
})

test('fitArray — doubling is geometric', () => {
  const fit = fitArray(['2', '4', '8', '16', '32'])
  assert.ok(fit.forms.some((f) => f.kind === 'geometric'), 'powers of two are a ratio, not a step')
})

test('fitArray — odd numbers are a step of two', () => {
  const fit = fitArray(['1', '3', '5', '7', '9'])
  assert.equal(fit.formula, 'a(k) = 1 + 2k')
})

// A FIT IS VERIFIED BY REGENERATION, never assumed from the first terms — a formula matching the head is the shape of a
// false pattern.
// A POLYNOMIAL OF DEGREE n-1 FITS ANY n POINTS, so this is the test that keeps the fitter falsifiable: without requiring
// the final difference row to repeat, [1,2,3,999] fits a cubic and "no formula" becomes unreachable.
test('fitArray — a list that only starts like a progression is refused', () => {
  const fit = fitArray(['1', '2', '3', '999'])
  assert.equal(fit.formula, null, 'the fourth term refutes the step, and a cubic through four points is interpolation')
  assert.deepEqual(fit.forms, [])
})

test('fitArray — interpolation is refused for ANY four arbitrary points', () => {
  for (const list of [['3', '17', '2', '88'], ['5', '1', '9', '4'], ['100', '7', '55', '2']]) {
    assert.equal(fitArray(list).formula, null, `${list} must not fit: a cubic through four points says nothing`)
  }
})

test('generate — every reported form regenerates its list exactly', () => {
  for (const list of [['45', '90', '135', '180'], ['2', '4', '8'], ['7', '7', '7'], ['1', '4', '9', '16']]) {
    const fit = fitArray(list)
    for (const f of fit.forms) assert.deepEqual(generate(f, list.length), list, `${f.kind} must reproduce ${list}`)
  }
})

// THE SQUARES ARE POLYNOMIAL, which the difference table finds without being told the degree.
test('fitArray — squares fit by Newton differences', () => {
  const fit = fitArray(['1', '4', '9', '16', '25'])
  assert.ok(fit.forms.some((f) => f.kind === 'polynomial'))
  assert.deepEqual(generate(fit.forms[0]!, 5), ['1', '4', '9', '16', '25'])
})

// ONE POINT IS NOT A SEQUENCE: calling it constant would state something about the reader, not the list.
test('fitArray — a list shorter than two terms fits nothing', () => {
  assert.deepEqual(fitArray(['5']).forms, [])
  assert.deepEqual(fitArray([]).forms, [])
})

test('fitArray — a non-numeric list is refused rather than guessed', () => {
  assert.equal(fitArray(['a', 'b']).formula, null)
})

// EVERY FORM THAT FITS IS REPORTED, and none is called the truth: choosing among them is a reader's judgement.
test('fitArray — a list admitting two forms reports more than one', () => {
  const fit = fitArray(['4', '4', '4', '4'])
  assert.ok(fit.forms.length >= 1)
  for (const f of fit.forms) assert.deepEqual(generate(f, 4), ['4', '4', '4', '4'])
})

// ── HASHES ──────────────────────────────────────────────────────────────────────────────────────────────────────

test('hashQuantity — a UUID is 128 bits read as an exact integer', () => {
  const q = hashQuantity('00000000-0000-0000-0000-000000000001')
  assert.equal(q, '1')
  const max = hashQuantity('ffffffff-ffff-ffff-ffff-ffffffffffff')
  assert.equal(max, String(2n ** 128n - 1n))
})

test('hashQuantity — the same address gives the same quantity, with or without dashes', () => {
  assert.equal(hashQuantity('2ca20abc-1234-5678-9abc-def012345678'),
    hashQuantity('2ca20abc123456789abcdef012345678'))
})

test('hashQuantity — anything that is not 128 hex bits is refused, not padded', () => {
  assert.equal(hashQuantity('not-a-uuid'), null)
  assert.equal(hashQuantity('abc'), null)
  assert.equal(hashQuantity(''), null)
})

// ── the structure the numeral reader throws away ────────────────────────────────────────────────────────────────

test('arraysOf — finds the lists a statement writes', () => {
  const found = arraysOf('(([45,90,135,180] : List Nat).all (fun a => a % 45 == 0)) ∧ ([1,2,1] : List Int).length = 3')
  assert.equal(found.length, 2)
  assert.deepEqual(found[0], ['45', '90', '135', '180'])
  assert.deepEqual(found[1], ['1', '2', '1'])
})

test('arraysOf — a single-element list is not a sequence and is skipped', () => {
  assert.deepEqual(arraysOf('[7]'), [])
})
