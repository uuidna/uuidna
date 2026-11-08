import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NumenFormulas } from './index.js'

/** Numerology decoded as exact digit arithmetic — the meaning is a lead, the number is a fact at its hex address. */
test('numen: digit reductions, master numbers, mirrors — exact, their significance left to the discovery', async (t) => {
  assert.equal(NumenFormulas.root(29).value, 11, '29 → 2+9 = 11, a master number kept')
  assert.equal(NumenFormulas.root(28).value, 1, '28 → 10 → 1')
  assert.equal(NumenFormulas.master(29).value, 1, '29 passes 11')
  assert.equal(NumenFormulas.master(28).value, 0)
  assert.equal(NumenFormulas.reduce(29).value, 2, '29 → 11 → 2')
  assert.equal(NumenFormulas.depth(29).value, 2, 'two steps')
  assert.equal(NumenFormulas.mirror(123).value, 321)
  assert.equal(NumenFormulas.palindrome(121).value, 1)
  assert.equal(NumenFormulas.palindrome(123).value, 0)
  assert.equal(NumenFormulas.nine(18).value, 9, 'the nine-wheel keeps 9')
  assert.equal(NumenFormulas.nine(10).value, 1)
  assert.equal(hexFamiliesOf().get('numen')?.length, 7)
  for (const [name, params, expected] of [['root', [29], 11], ['reduce', [29], 2], ['mirror', [123], 321]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'numen', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `numen.${name} at ${uuid}`)
    uuidReceiptOf(`numen ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('7 formulas; exact digit math, significance a lead: root(29)=11 (master), reduce(29)=2, mirror(123)=321')
})
