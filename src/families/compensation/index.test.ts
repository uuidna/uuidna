import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CompensationFormulas } from './index.js'
import '../../mcp/families.js'

test('compensation: salary, bonus, equity, raise, band, ratio, benefit, total — crossing to econ', async (t) => {
  assert.equal(CompensationFormulas.salary(50, 2080).value, 104000, 'a year of hours at the hourly rate')
  assert.equal(CompensationFormulas.bonus(104000, 15).value, 15600)
  assert.equal(CompensationFormulas.equity(1000, 25).value, 25000)
  assert.equal(CompensationFormulas.raise(100000, 10).value, 110000, 'the salary after a 10% raise')
  assert.equal(CompensationFormulas.band(80000, 120000).value, 100000, 'the band midpoint')
  assert.equal(CompensationFormulas.ratio(1000000, 50000).value, 20)
  assert.equal(CompensationFormulas.benefit(100000, 30).value, 30000)
  assert.equal(CompensationFormulas.total(100000, 40000).value, 140000)
  assert.equal(CompensationFormulas.ratio(1000000, 0).value, 0)
  assert.equal(CompensationFormulas.salary(50, 2080).dst, 'econ')
  assert.equal(hexFamiliesOf().get('compensation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'compensation', program: ['salary'], params: [50, 2080] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 104000, `compensation.salary at ${uuid}`)
  uuidReceiptOf('compensation salary', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; salary 104000, bonus 15600, equity 25000, raise 110000, band 100000, ratio 20, benefit 30000, total 140000; crossing to econ')
})
