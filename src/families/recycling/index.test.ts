import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RecyclingFormulas } from './index.js'
import '../../mcp/families.js'

test('recycling: rate, diversion, contamination, recovery, purity, energy, throughput, landfill — crossing to logistics', async (t) => {
  assert.equal(RecyclingFormulas.rate(750, 1000).value, 75, 'three quarters of the waste stream')
  assert.equal(RecyclingFormulas.diversion(600, 1000).value, 60)
  assert.equal(RecyclingFormulas.contamination(50, 1000).value, 5)
  assert.equal(RecyclingFormulas.recovery(900, 1000).value, 90)
  assert.equal(RecyclingFormulas.purity(950, 1000).value, 95)
  assert.equal(RecyclingFormulas.energy(700, 1000).value, 70, 'energy saved over virgin production')
  assert.equal(RecyclingFormulas.throughput(6000, 60).value, 100, 'mass per hour')
  assert.equal(RecyclingFormulas.landfill(600, 1000).value, 40)
  assert.equal(RecyclingFormulas.rate(750, 1000).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('recycling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'recycling', program: ['rate'], params: [750, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `recycling.rate at ${uuid}`)
  uuidReceiptOf('recycling rate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rate 75, diversion 60, contamination 5, recovery 90, purity 95, energy 70, throughput 100, landfill 40; crossing to logistics')
})
