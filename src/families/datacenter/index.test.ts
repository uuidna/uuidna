import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DatacenterFormulas } from './index.js'
import '../../mcp/families.js'

test('datacenter: PUE, racks, density, availability and the facility picture — crossing to hardware', async (t) => {
  assert.equal(DatacenterFormulas.pue(1500, 1000).value, 150, 'PUE×100 = 1.50')
  assert.equal(DatacenterFormulas.racks(1000, 42).value, 24, 'racks to hold the servers')
  assert.equal(DatacenterFormulas.density(10000, 24).value, 240000, 'total IT watts')
  assert.equal(DatacenterFormulas.coolingload(1000, 150).value, 500, 'overhead watts at 1.50')
  assert.equal(DatacenterFormulas.redundancy(5, 4).value, 1, 'spare units')
  assert.equal(DatacenterFormulas.capacity(24, 42).value, 1008, 'rack units')
  assert.equal(DatacenterFormulas.power(24, 10).value, 240, 'racks × per-rack kW')
  assert.equal(DatacenterFormulas.availability(525000, 525600).value, 99, 'uptime of the year')
  assert.equal(DatacenterFormulas.carbon(1000, 400).value, 400000, 'grams CO₂ from kWh')
  assert.equal(DatacenterFormulas.waterusage(1000, 2).value, 2000, 'litres per IT kWh')
  assert.equal(DatacenterFormulas.pue(1500, 1000).dst, 'hardware')
  assert.equal(hexFamiliesOf().get('datacenter')?.length, 10)
  const uuid = qpuHexUuidOf({ family: 'datacenter', program: ['pue'], params: [1500, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `datacenter.pue at ${uuid}`)
  uuidReceiptOf('datacenter pue', contentUuidOf(run), { uuid })
  t.diagnostic('10 formulas; pue 150, racks 24, density 240000, coolingload 500, redundancy 1, capacity 1008, power 240, availability 99%, carbon 400000, waterusage 2000; crossing to hardware')
})
