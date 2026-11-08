import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BiochemistryFormulas } from './index.js'
import '../../mcp/families.js'

test('biochemistry: bonds, concentration, efficiency, equilibrium, michaelis, molarity, ph, turnover — crossing to chemistry', async (t) => {
  assert.equal(BiochemistryFormulas.bonds(6).value, 5, 'a chain of six atoms has five bonds')
  assert.equal(BiochemistryFormulas.concentration(100, 4).value, 25)
  assert.equal(BiochemistryFormulas.efficiency(80, 100).value, 80, 'percent yield')
  assert.equal(BiochemistryFormulas.equilibrium(200, 100).value, 200)
  assert.equal(BiochemistryFormulas.michaelis(100, 50, 50).value, 50, 'half-saturation gives half vmax')
  assert.equal(BiochemistryFormulas.molarity(180, 18).value, 10)
  assert.equal(BiochemistryFormulas.ph(70, 10).value, 7)
  assert.equal(BiochemistryFormulas.turnover(1000, 10).value, 100, 'kcat proxy')
  assert.equal(BiochemistryFormulas.concentration(100, 4).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('biochemistry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'biochemistry', program: ['turnover'], params: [1000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `biochemistry.turnover at ${uuid}`)
  uuidReceiptOf('biochemistry turnover', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bonds 5, concentration 25, efficiency 80, equilibrium 200, michaelis 50, molarity 10, ph 7, turnover 100; crossing to chemistry')
})
