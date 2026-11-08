import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EmissionsFormulas } from './index.js'
import '../../mcp/families.js'

test('emissions: intensity, percapita, reduction, scope, equivalent, tax, allowance, sequestration — crossing to climate', async (t) => {
  assert.equal(EmissionsFormulas.intensity(1000, 40).value, 25, 'emissions per unit of output')
  assert.equal(EmissionsFormulas.percapita(8000, 1000).value, 8)
  assert.equal(EmissionsFormulas.reduction(1000, 750).value, 25, 'a quarter cut against baseline')
  assert.equal(EmissionsFormulas.scope(300, 1000).value, 30, 'direct share of total')
  assert.equal(EmissionsFormulas.equivalent(50, 25).value, 1250, 'CO2e proxy')
  assert.equal(EmissionsFormulas.tax(1000, 15).value, 150)
  assert.equal(EmissionsFormulas.allowance(1200, 1000).value, 200, 'overage past the cap')
  assert.equal(EmissionsFormulas.allowance(800, 1000).value, 0)
  assert.equal(EmissionsFormulas.sequestration(250, 1000).value, 25)
  assert.equal(EmissionsFormulas.intensity(1000, 40).dst, 'climate')
  assert.equal(hexFamiliesOf().get('emissions')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'emissions', program: ['intensity'], params: [1000, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `emissions.intensity at ${uuid}`)
  uuidReceiptOf('emissions intensity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; intensity 25, percapita 8, reduction 25, scope 30, equivalent 1250, tax 150, allowance 200, sequestration 25; crossing to climate')
})
