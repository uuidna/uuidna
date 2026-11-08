import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CargoFormulas } from './index.js'
import '../../mcp/families.js'

test('cargo: teu, utilization, stowage, deadweight, manifest, palletize, containers, loadfactor — crossing to logistics', async (t) => {
  assert.equal(CargoFormulas.teu(300, 150).value, 600, 'forties count double')
  assert.equal(CargoFormulas.utilization(950, 1000).value, 95)
  assert.equal(CargoFormulas.stowage(500, 33).value, 16500)
  assert.equal(CargoFormulas.deadweight(40000, 5000, 3000).value, 48000, 'cargo, fuel and ballast')
  assert.equal(CargoFormulas.manifest(200, 25).value, 5000)
  assert.equal(CargoFormulas.palletize(1000, 48).value, 21, 'pallets for the carton run')
  assert.equal(CargoFormulas.containers(5000, 300).value, 17, 'containers for the unit run')
  assert.equal(CargoFormulas.loadfactor(800, 1000).value, 80)
  assert.equal(CargoFormulas.teu(300, 150).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('cargo')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cargo', program: ['palletize'], params: [1000, 48] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 21, `cargo.palletize at ${uuid}`)
  uuidReceiptOf('cargo palletize', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; teu 600, utilization 95, stowage 16500, deadweight 48000, manifest 5000, palletize 21, containers 17, loadfactor 80; crossing to logistics')
})
