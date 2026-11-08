import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HydroFormulas } from './index.js'
import '../../mcp/families.js'

test('hydro: power, head, capacity, efficiency, storage, turbine, penstock, reservoir — crossing to energy', async (t) => {
  assert.equal(HydroFormulas.power(100, 50).value, 4905, 'P = ρgQH proxy')
  assert.equal(HydroFormulas.head(2000, 1000).value, 2)
  assert.equal(HydroFormulas.capacity(45, 100).value, 45, 'capacity factor as a percentage')
  assert.equal(HydroFormulas.efficiency(90, 100).value, 90)
  assert.equal(HydroFormulas.storage(10000, 500).value, 20)
  assert.equal(HydroFormulas.turbine(60, 50).value, 3000)
  assert.equal(HydroFormulas.penstock(200, 1000).value, 20)
  assert.equal(HydroFormulas.reservoir(800, 300).value, 500)
  assert.equal(HydroFormulas.reservoir(300, 800).value, 0, 'never negative')
  assert.equal(HydroFormulas.power(100, 50).dst, 'energy')
  assert.equal(hexFamiliesOf().get('hydro')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hydro', program: ['head'], params: [2000, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `hydro.head at ${uuid}`)
  uuidReceiptOf('hydro head', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; power 4905, head 2, capacity 45, efficiency 90, storage 20, turbine 3000, penstock 20, reservoir 500; crossing to energy')
})
