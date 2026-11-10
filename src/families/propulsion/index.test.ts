import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PropulsionFormulas } from './index.js'
import '../../mcp/families.js'

test('propulsion: thrust, efficiency, specificfuel, bypass, compression, power, exhaust, massflow — crossing to aerospace', async (t) => {
  assert.equal(PropulsionFormulas.thrust(300, 20).value, 6000, 'pressure over the nozzle area')
  assert.equal(PropulsionFormulas.efficiency(80, 100).value, 80)
  assert.equal(PropulsionFormulas.specificfuel(5, 1000).value, 5, 'SFC proxy')
  assert.equal(PropulsionFormulas.bypass(900, 100).value, 900, 'a high-bypass turbofan')
  assert.equal(PropulsionFormulas.compression(4000, 100).value, 4000)
  assert.equal(PropulsionFormulas.power(500, 20).value, 10000)
  assert.equal(PropulsionFormulas.exhaust(850).value, 850, 'exhaust holds the reading')
  assert.equal(PropulsionFormulas.massflow(12, 300).value, 3600)
  assert.equal(PropulsionFormulas.thrust(300, 20).dst, 'aerospace')
  assert.equal(hexFamiliesOf().get('propulsion')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'propulsion', program: ['thrust'], params: [300, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6000, `propulsion.thrust at ${uuid}`)
  uuidReceiptOf('propulsion thrust', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; thrust 6000, efficiency 80, specificfuel 5, bypass 900, compression 4000, power 10000, exhaust 850, massflow 3600; crossing to aerospace')
})
