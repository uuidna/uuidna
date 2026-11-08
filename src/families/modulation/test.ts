import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ModulationFormulas } from './index.js'
import '../../mcp/families.js'

test('modulation: index, bandwidth, sidebands, deviation, carrierpower, symbolrate, bitrate, efficiency — crossing to signal', async (t) => {
  assert.equal(ModulationFormulas.index(50, 100).value, 50, 'index as a percentage')
  assert.equal(ModulationFormulas.bandwidth(75, 15).value, 180, 'Carson bandwidth, FM broadcast')
  assert.equal(ModulationFormulas.sidebands(3).value, 7, 'three pairs plus the carrier')
  assert.equal(ModulationFormulas.deviation(5, 15).value, 75)
  assert.equal(ModulationFormulas.carrierpower(100, 50).value, 200)
  assert.equal(ModulationFormulas.symbolrate(9600, 4).value, 2400, 'baud from the bit rate')
  assert.equal(ModulationFormulas.bitrate(2400, 4).value, 9600, 'bits per second')
  assert.equal(ModulationFormulas.efficiency(9600, 2400).value, 400)
  assert.equal(ModulationFormulas.efficiency(9600, 0).value, 0)
  assert.equal(ModulationFormulas.index(50, 100).dst, 'signal')
  assert.equal(hexFamiliesOf().get('modulation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'modulation', program: ['deviation'], params: [5, 15] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `modulation.deviation at ${uuid}`)
  uuidReceiptOf('modulation deviation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; index 50, bandwidth 180, sidebands 7, deviation 75, carrierpower 200, symbolrate 2400, bitrate 9600, efficiency 400; crossing to signal')
})
