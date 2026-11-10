import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DesalinationFormulas } from './index.js'
import '../../mcp/families.js'

test('desalination: recovery, salinity, permeate, rejection, flux, osmotic, brine, energy — crossing to chemistry', async (t) => {
  assert.equal(DesalinationFormulas.recovery(45, 100).value, 45, '45% of the feed recovered')
  assert.equal(DesalinationFormulas.salinity(35000, 1000).value, 35, 'seawater concentration')
  assert.equal(DesalinationFormulas.permeate(1000, 550).value, 450)
  assert.equal(DesalinationFormulas.rejection(35000, 350).value, 99, 'salt rejection')
  assert.equal(DesalinationFormulas.flux(1200, 60).value, 20, 'litres per square metre')
  assert.equal(DesalinationFormulas.osmotic(35, 300).value, 10500)
  assert.equal(DesalinationFormulas.brine(1000, 450).value, 550)
  assert.equal(DesalinationFormulas.brine(400, 1000).value, 0, 'mass balance never goes negative')
  assert.equal(DesalinationFormulas.energy(1500, 500).value, 3, 'kWh per cubic metre')
  assert.equal(DesalinationFormulas.recovery(45, 100).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('desalination')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'desalination', program: ['flux'], params: [1200, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `desalination.flux at ${uuid}`)
  uuidReceiptOf('desalination flux', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; recovery 45, salinity 35, permeate 450, rejection 99, flux 20, osmotic 10500, brine 550, energy 3; crossing to chemistry')
})
