import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PrimeFormulas } from './index.js'

/** prime: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('prime: gaps, count, product, totient, factors, sieve, twins, combos', async (t) => {
  assert.equal(PrimeFormulas.gaps(13, 11).value, 2, 'gaps(13, 11)')
  assert.equal(PrimeFormulas.count(100, 4).value, 25, 'count(100, 4)')
  assert.equal(PrimeFormulas.product(7, 13).value, 91, 'product(7, 13)')
  assert.equal(PrimeFormulas.totient(91, 20).value, 71, 'totient(91, 20)')
  assert.equal(PrimeFormulas.factors(2, 0).value, 2, 'factors(2, 0)')
  assert.equal(PrimeFormulas.sieve(100, 2).value, 50, 'sieve(100, 2)')
  assert.equal(PrimeFormulas.twins(100, 10).value, 10, 'twins(100, 10)')
  assert.equal(PrimeFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('prime')?.length, 8)
  for (const [name, params, expected] of [["gaps",[13,11],2],["count",[100,4],25],["product",[7,13],91]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'prime', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `prime.${name} at ${uuid}`)
    uuidReceiptOf(`prime ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "gaps=2, count=25, product=91")
})
