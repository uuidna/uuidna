// self-model — the falsifiers for lean/SelfModel.lean. Each sealed fact is re-decided by enumerating src/self-model.ts,
// its figures are read back from the sealed statement, and each has a control: a diagonal without the negation, and a
// map on Bool that does fix a point, which the same checkers must refuse.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theoremFor } from './theorems/index.js'
import { CORNERS } from './affect-trinity.js'
import { models, rows, escapes, diagonal, represented, boolFixed, type Table } from './self-model.js'

const sealed = (key: string): string => {
  const t = theoremFor(key)
  assert.ok(t, `${key} is sealed`)
  return t.statement
}

test('every self-model fact is sealed in SelfModel.lean', () => {
  for (const key of ['self_model_cantor', 'self_model_lawvere', 'self_model_diagonal_escapes', 'self_model_negation_no_fixed_point']) {
    assert.equal(theoremFor(key)?.file, 'SelfModel.lean', key)
  }
})

test('self_model_cantor — on every table of one and two states the diagonal differs from row j at column j', () => {
  assert.match(sealed('self_model_cantor'), /\(fun i => !\(f i i\)\) ≠ f j/)
  for (const n of [1, 2]) for (const t of models(n)) t.forEach((row, j) => assert.notEqual(diagonal(t)[j], row[j]))
})

test('self_model_lawvere — the seal states there is no onto self-model, and no table represents its diagonal', () => {
  assert.match(sealed('self_model_lawvere'), /¬ ∃ e : α → α → Bool, ∀ p : α → Bool, ∃ a, e a = p/)
  for (const n of [1, 2, 3]) { const e = escapes(n); assert.equal(e.escaped, e.tables, `n = ${n}`) }
})

test('self_model_diagonal_escapes — the sealed count is every self-model of the trinity\'s corners, and the diagonal escapes each', () => {
  const m = /models (\d+)\)\.length = (\d+)/.exec(sealed('self_model_diagonal_escapes'))
  const n = Number(m?.[1]), count = Number(m?.[2])
  assert.equal(n, CORNERS.length)
  assert.equal(count, rows(n).length ** n)
  assert.equal(models(n).length, count)
  assert.ok(models(n).every((t) => !represented(t, diagonal(t))))
})

test('self_model_negation_no_fixed_point — negation fixes neither Bool', () => {
  assert.match(sealed('self_model_negation_no_fixed_point'), /\(!b\) ≠ b/)
  assert.deepEqual(boolFixed((b) => !b), [])
})

test('CONTROL: a diagonal without the negation is represented by some table, so the negation is what escapes', () => {
  const copy = (t: Table) => t.map((row, i) => row[i]!)
  const e = escapes(CORNERS.length, copy)
  assert.ok(e.escaped < e.tables, 'the identity diagonal is caught by at least one table')
})

test('CONTROL: a map on Bool with a fixed point gives Lawvere\'s argument nothing to refuse', () => {
  assert.deepEqual(boolFixed((b) => b), [false, true])
  assert.deepEqual(boolFixed(() => true), [true])
})
