import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RetirementFormulas } from './index.js'
import '../../mcp/families.js'

test('retirement: nestegg, withdrawalrate, replacementratio, contributions, yearsofincome, matchvalue, drawdown, shortfall — crossing to econ', async (t) => {
  assert.equal(RetirementFormulas.nestegg(50000, 30).value, 1500000, 'thirty years of saving')
  assert.equal(RetirementFormulas.withdrawalrate(400, 10000).value, 4, 'the four-percent rule')
  assert.equal(RetirementFormulas.replacementratio(40000, 50000).value, 80)
  assert.equal(RetirementFormulas.contributions(500, 30).value, 180000, 'monthly over a career')
  assert.equal(RetirementFormulas.yearsofincome(60000, 2000).value, 30)
  assert.equal(RetirementFormulas.matchvalue(6000, 50).value, 3000, 'a half-match')
  assert.equal(RetirementFormulas.drawdown(50000, 2000).value, 48000)
  assert.equal(RetirementFormulas.shortfall(60000, 45000).value, 15000, 'the savings gap')
  assert.equal(RetirementFormulas.shortfall(45000, 60000).value, 0)
  assert.equal(RetirementFormulas.nestegg(50000, 30).dst, 'econ')
  assert.equal(hexFamiliesOf().get('retirement')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'retirement', program: ['nestegg'], params: [50000, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1500000, `retirement.nestegg at ${uuid}`)
  uuidReceiptOf('retirement nestegg', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; nestegg 1500000, withdrawalrate 4, replacementratio 80, contributions 180000, yearsofincome 30, matchvalue 3000, drawdown 48000, shortfall 15000; crossing to econ')
})
