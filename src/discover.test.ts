// discover — hold every candidate at once, and refute in the same pass.
//
// Proposing relations singly is how noise gets sealed: in one session I claimed a count was 2 x 42 (it was 73) and
// that 42 tiles 432 (7 does not divide 72). Both looked like structure and were arithmetic. RIGIDITY is the
// refutation — move an input by one and require the relation to break.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { discover, rigid, superposition } from './index.js'

// ── THE LIMITATION, asserted so it cannot be forgotten. Rigidity perturbs each value INDEPENDENTLY, so it cannot
// see that one value was DERIVED from the others. `renames` is defined as keys - distinct; moving keys alone
// produces a state that cannot exist, the relation breaks, and the tool calls it rigid. It is not a discovery.
// A survivor is therefore a candidate only against values that are independently measured — feed it derived
// quantities and it will confirm their definitions back to you.
test('rigidity CANNOT detect definitional dependence — the tool reports a definition as rigid', () => {
  const r = discover([{ name: 'keys', n: 100 }, { name: 'distinct', n: 60 }, { name: 'renames', n: 40 }])
  assert.ok(r.survived.some((x) => x.form === 'keys - distinct = renames'),
    'documented blind spot: renames is DERIVED from the other two, and perturbing them independently is incoherent')
})

test('rigidity is the refutation — a relation that survives a moved input is not describing these numbers', () => {
  const vs = [{ name: 'a', n: 6 }, { name: 'b', n: 7 }, { name: 'c', n: 42 }]
  const always = () => true
  assert.equal(rigid(always, vs), false, 'a test that cannot fail is never rigid')
})

test('divisibility by one is caught as limp', () => {
  const r = discover([{ name: 'n', n: 42 }, { name: 'one', n: 1 }, { name: 'other', n: 9 }])
  const div = [...r.survived, ...r.limp].find((x) => x.form === 'one divides n')
  assert.ok(div, 'the relation holds')
  assert.equal(div!.rigid, false, 'everything is divisible by one — arithmetic')
})

test('the superposition is enumerated whole', () => {
  const n = superposition([{ name: 'a', n: 2 }, { name: 'b', n: 3 }, { name: 'c', n: 6 }]).length
  assert.ok(n > 20, `expected the full cross-product of forms, saw ${n}`)
})
