import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CalculusFormulas } from './index.js'
import '../../mcp/families.js'

test('calculus: derivative, integral, slope, area, limit, rate, series, tangent — crossing to code', async (t) => {
  assert.equal(CalculusFormulas.derivative(3, 4).value, 12, 'the power rule on 3x^4')
  assert.equal(CalculusFormulas.integral(12, 3).value, 3)
  assert.equal(CalculusFormulas.slope(10, 2).value, 5, 'a secant slope')
  assert.equal(CalculusFormulas.area(6, 7).value, 42, 'a Riemann rectangle')
  assert.equal(CalculusFormulas.limit(100, 4).value, 25)
  assert.equal(CalculusFormulas.rate(60, 12).value, 5, 'average rate of change')
  assert.equal(CalculusFormulas.series(8, 3).value, 24, 'a partial sum proxy')
  assert.equal(CalculusFormulas.tangent(5, 6).value, 30)
  assert.equal(CalculusFormulas.derivative(3, 4).dst, 'code')
  assert.equal(hexFamiliesOf().get('calculus')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'calculus', program: ['area'], params: [6, 7] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 42, `calculus.area at ${uuid}`)
  uuidReceiptOf('calculus area', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; derivative 12, integral 3, slope 5, area 42, limit 25, rate 5, series 24, tangent 30; crossing to code')
})
