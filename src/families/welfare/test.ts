import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WelfareFormulas } from './index.js'
import '../../mcp/families.js'

test('welfare: poverty, gini, benefit, coverage, replacement, dependency, mobility, transfer — crossing to econ', async (t) => {
  assert.equal(WelfareFormulas.poverty(25, 100).value, 25, 'a quarter below the line')
  assert.equal(WelfareFormulas.gini(40, 100).value, 40)
  assert.equal(WelfareFormulas.benefit(1000, 50).value, 20, 'per recipient')
  assert.equal(WelfareFormulas.coverage(80, 100).value, 80)
  assert.equal(WelfareFormulas.replacement(600, 1000).value, 60, 'the benefit replaces 60% of the wage')
  assert.equal(WelfareFormulas.dependency(60, 100).value, 60)
  assert.equal(WelfareFormulas.mobility(30, 100).value, 30)
  assert.equal(WelfareFormulas.transfer(15, 100).value, 15)
  assert.equal(WelfareFormulas.poverty(25, 100).dst, 'econ')
  assert.equal(hexFamiliesOf().get('welfare')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'welfare', program: ['poverty'], params: [25, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `welfare.poverty at ${uuid}`)
  uuidReceiptOf('welfare poverty', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; poverty 25, gini 40, benefit 20, coverage 80, replacement 60, dependency 60, mobility 30, transfer 15; crossing to econ')
})
