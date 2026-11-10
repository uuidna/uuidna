import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LeverageFormulas } from './index.js'
import '../../mcp/families.js'

test('leverage: debttoequity, debtratio, equitymultiplier, interestcoverage, capitalratio, degreeofleverage, marginratio, gearingratio — crossing to banking', async (t) => {
  assert.equal(LeverageFormulas.debttoequity(60, 40).value, 150, 'geared half again over equity')
  assert.equal(LeverageFormulas.debtratio(40, 100).value, 40)
  assert.equal(LeverageFormulas.equitymultiplier(200, 50).value, 400, 'assets four times equity')
  assert.equal(LeverageFormulas.interestcoverage(5000, 1000).value, 5)
  assert.equal(LeverageFormulas.capitalratio(12, 150).value, 8, 'eight percent capital held')
  assert.equal(LeverageFormulas.degreeofleverage(300, 120).value, 250)
  assert.equal(LeverageFormulas.marginratio(25, 200).value, 12)
  assert.equal(LeverageFormulas.gearingratio(60, 40).value, 60, 'sixty percent geared')
  assert.equal(LeverageFormulas.gearingratio(0, 0).value, 0)
  assert.equal(LeverageFormulas.debttoequity(60, 40).dst, 'banking')
  assert.equal(hexFamiliesOf().get('leverage')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'leverage', program: ['interestcoverage'], params: [5000, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `leverage.interestcoverage at ${uuid}`)
  uuidReceiptOf('leverage interestcoverage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; debttoequity 150, debtratio 40, equitymultiplier 400, interestcoverage 5, capitalratio 8, degreeofleverage 250, marginratio 12, gearingratio 60; crossing to banking')
})
