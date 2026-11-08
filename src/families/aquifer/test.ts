import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AquiferFormulas } from './index.js'
import '../../mcp/families.js'

test('aquifer: transmissivity, storativity, drawdown, hydraulicconductivity, porosity, specificyield, rechargerate, wellyield — crossing to hydrology', async (t) => {
  assert.equal(AquiferFormulas.transmissivity(50, 20).value, 1000, 'conductivity over the saturated thickness')
  assert.equal(AquiferFormulas.storativity(3, 10).value, 30)
  assert.equal(AquiferFormulas.drawdown(1000, 50).value, 20, 'pumping felt against transmissivity')
  assert.equal(AquiferFormulas.hydraulicconductivity(600, 3).value, 200)
  assert.equal(AquiferFormulas.porosity(30, 100).value, 30, 'percent pore volume')
  assert.equal(AquiferFormulas.specificyield(18, 100).value, 18)
  assert.equal(AquiferFormulas.rechargerate(5000, 10).value, 500)
  assert.equal(AquiferFormulas.wellyield(20, 5).value, 100, 'specific capacity over drawdown')
  assert.equal(AquiferFormulas.transmissivity(50, 20).dst, 'hydrology')
  assert.equal(hexFamiliesOf().get('aquifer')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'aquifer', program: ['transmissivity'], params: [50, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `aquifer.transmissivity at ${uuid}`)
  uuidReceiptOf('aquifer transmissivity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; transmissivity 1000, storativity 30, drawdown 20, hydraulicconductivity 200, porosity 30, specificyield 18, rechargerate 500, wellyield 100; crossing to hydrology')
})
