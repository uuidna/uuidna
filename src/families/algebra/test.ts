import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AlgebraFormulas } from './index.js'
import '../../mcp/families.js'

test('algebra: linear, quadratic, discriminant, slope, factorial, gcd, power, roots — crossing to code', async (t) => {
  assert.equal(AlgebraFormulas.linear(3, 7).value, 21, 'a line through the origin')
  assert.equal(AlgebraFormulas.quadratic(2, 5).value, 50)
  assert.equal(AlgebraFormulas.discriminant(2, 1).value, 0, 'b² − 4ac = 4 − 4')
  assert.equal(AlgebraFormulas.discriminant(1, 1).value, -3, 'the discriminant may be negative')
  assert.equal(AlgebraFormulas.slope(10, 4).value, 250)
  assert.equal(AlgebraFormulas.factorial(5).value, 120, '5!')
  assert.equal(AlgebraFormulas.gcd(12, 8).value, 4)
  assert.equal(AlgebraFormulas.power(2, 5).value, 32)
  assert.equal(AlgebraFormulas.roots(2, 3).value, -8, 'the roots discriminant may be negative')
  assert.equal(AlgebraFormulas.linear(3, 7).dst, 'code')
  assert.equal(hexFamiliesOf().get('algebra')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'algebra', program: ['power'], params: [2, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 32, `algebra.power at ${uuid}`)
  uuidReceiptOf('algebra power', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; linear 21, quadratic 50, discriminant 0/−3, slope 250, factorial 120, gcd 4, power 32, roots −8; crossing to code')
})
