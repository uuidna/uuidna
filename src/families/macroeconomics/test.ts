import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MacroeconomicsFormulas } from './index.js'
import '../../mcp/families.js'

test('macroeconomics: gdp, inflation, unemployment, growth, multiplier, velocity, deficit, debt — crossing to econ', async (t) => {
  assert.equal(MacroeconomicsFormulas.gdp(1000, 500).value, 1500, 'output as spending')
  assert.equal(MacroeconomicsFormulas.inflation(110, 100).value, 10)
  assert.equal(MacroeconomicsFormulas.unemployment(5, 100).value, 5)
  assert.equal(MacroeconomicsFormulas.growth(110, 100).value, 10)
  assert.equal(MacroeconomicsFormulas.multiplier(100, 80).value, 500, 'the reach of a dollar')
  assert.equal(MacroeconomicsFormulas.velocity(2000, 100).value, 20)
  assert.equal(MacroeconomicsFormulas.deficit(1000, 700).value, 300)
  assert.equal(MacroeconomicsFormulas.debt(300, 1000).value, 30, 'debt-to-GDP')
  assert.equal(MacroeconomicsFormulas.gdp(1000, 500).dst, 'econ')
  assert.equal(hexFamiliesOf().get('macroeconomics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'macroeconomics', program: ['multiplier'], params: [100, 80] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `macroeconomics.multiplier at ${uuid}`)
  uuidReceiptOf('macroeconomics multiplier', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gdp 1500, inflation 10, unemployment 5, growth 10, multiplier 500, velocity 20, deficit 300, debt 30; crossing to econ')
})
