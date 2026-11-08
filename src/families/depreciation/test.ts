import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DepreciationFormulas } from './index.js'
import '../../mcp/families.js'

test('depreciation: straightline, decliningbalance, unitsofproduction, bookvalue, accumulated, salvage, rate, remaining — crossing to accounting', async (t) => {
  assert.equal(DepreciationFormulas.straightline(10000, 1000, 5).value, 1800, 'yearly charge on a 9000 base over five years')
  assert.equal(DepreciationFormulas.decliningbalance(10000, 20).value, 2000)
  assert.equal(DepreciationFormulas.unitsofproduction(45000, 9000, 90000).value, 4500, 'one tenth of the units on a 45000 base')
  assert.equal(DepreciationFormulas.bookvalue(10000, 3600).value, 6400)
  assert.equal(DepreciationFormulas.accumulated(1800, 3).value, 5400, 'three years of the straight-line charge')
  assert.equal(DepreciationFormulas.salvage(10000, 9000).value, 1000)
  assert.equal(DepreciationFormulas.rate(5).value, 20)
  assert.equal(DepreciationFormulas.remaining(5, 3).value, 2)
  assert.equal(DepreciationFormulas.remaining(3, 5).value, 0)
  assert.equal(DepreciationFormulas.straightline(10000, 1000, 5).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('depreciation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'depreciation', program: ['straightline'], params: [10000, 1000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1800, `depreciation.straightline at ${uuid}`)
  uuidReceiptOf('depreciation straightline', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; straightline 1800, decliningbalance 2000, unitsofproduction 4500, bookvalue 6400, accumulated 5400, salvage 1000, rate 20, remaining 2; crossing to accounting')
})
