import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CollateralFormulas } from './index.js'
import '../../mcp/families.js'

test('collateral: loantovalue, haircut, marginrequirement, coverageratio, collateralvalue, shortfall, overcollateralization, callthreshold — crossing to banking', async (t) => {
  assert.equal(CollateralFormulas.loantovalue(8000, 10000).value, 80, 'an 80% loan-to-value')
  assert.equal(CollateralFormulas.haircut(1000, 15).value, 150)
  assert.equal(CollateralFormulas.marginrequirement(10000, 25).value, 2500, 'a quarter of the position')
  assert.equal(CollateralFormulas.coverageratio(15000, 10000).value, 150)
  assert.equal(CollateralFormulas.collateralvalue(200, 50).value, 10000)
  assert.equal(CollateralFormulas.shortfall(5000, 3000).value, 2000, 'posted below required')
  assert.equal(CollateralFormulas.shortfall(3000, 5000).value, 0)
  assert.equal(CollateralFormulas.overcollateralization(15000, 10000).value, 50, '50% over-collateralized')
  assert.equal(CollateralFormulas.callthreshold(1000, 80).value, 800)
  assert.equal(CollateralFormulas.loantovalue(8000, 10000).dst, 'banking')
  assert.equal(hexFamiliesOf().get('collateral')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'collateral', program: ['coverageratio'], params: [15000, 10000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `collateral.coverageratio at ${uuid}`)
  uuidReceiptOf('collateral coverageratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; loantovalue 80, haircut 150, marginrequirement 2500, coverageratio 150, collateralvalue 10000, shortfall 2000, overcollateralization 50, callthreshold 800; crossing to banking')
})
