import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MicroeconomicsFormulas } from './index.js'
import '../../mcp/families.js'

test('microeconomics: elasticity, surplus, marginal, equilibrium, utility, profit, monopoly, deadweight — crossing to econ', async (t) => {
  assert.equal(MicroeconomicsFormulas.elasticity(20, 5).value, 400, 'percent quantity change per unit price')
  assert.equal(MicroeconomicsFormulas.surplus(100, 70).value, 30, 'consumer surplus')
  assert.equal(MicroeconomicsFormulas.marginal(500, 25).value, 20, 'marginal cost per unit')
  assert.equal(MicroeconomicsFormulas.equilibrium(80, 100).value, 20, 'shortage')
  assert.equal(MicroeconomicsFormulas.utility(90, 30).value, 3, 'utility per unit cost')
  assert.equal(MicroeconomicsFormulas.profit(1000, 600).value, 400, 'firm profit')
  assert.equal(MicroeconomicsFormulas.monopoly(60, 100).value, 60, 'market share percent')
  assert.equal(MicroeconomicsFormulas.deadweight(15, 100).value, 15, 'welfare lost percent')
  assert.equal(MicroeconomicsFormulas.elasticity(20, 0).value, 0, 'guarded division')
  assert.equal(MicroeconomicsFormulas.surplus(50, 70).value, 0, 'no negative surplus')
  assert.equal(MicroeconomicsFormulas.elasticity(20, 5).dst, 'econ')
  assert.equal(hexFamiliesOf().get('microeconomics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'microeconomics', program: ['surplus'], params: [100, 70] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `microeconomics.surplus at ${uuid}`)
  uuidReceiptOf('microeconomics surplus', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; elasticity 400, surplus 30, marginal 20, equilibrium 20, utility 3, profit 400, monopoly 60, deadweight 15; crossing to econ')
})
