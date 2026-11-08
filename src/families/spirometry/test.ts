import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SpirometryFormulas } from './index.js'
import '../../mcp/families.js'

test('spirometry: fev1fvcratio, vitalcapacity, fev1, peakflow, forcedvitalcapacity, tidalvolume, residualvolume, totalcapacity — crossing to pulmonology', async (t) => {
  assert.equal(SpirometryFormulas.fev1fvcratio(4000, 5000).value, 80, 'a normal FEV1/FVC ratio')
  assert.equal(SpirometryFormulas.vitalcapacity(3000, 500, 1000).value, 4500)
  assert.equal(SpirometryFormulas.fev1(5000, 80).value, 4000, 'FEV1 from the ratio')
  assert.equal(SpirometryFormulas.peakflow(6000, 10).value, 600)
  assert.equal(SpirometryFormulas.forcedvitalcapacity(5000, 500).value, 4500, 'the forced vital capacity')
  assert.equal(SpirometryFormulas.tidalvolume(6000, 12).value, 500, 'tidal volume per breath')
  assert.equal(SpirometryFormulas.residualvolume(6000, 4500).value, 1500)
  assert.equal(SpirometryFormulas.totalcapacity(4500, 1500).value, 6000, 'total lung capacity')
  assert.equal(SpirometryFormulas.forcedvitalcapacity(500, 5000).value, 0)
  assert.equal(SpirometryFormulas.fev1fvcratio(4000, 5000).dst, 'pulmonology')
  assert.equal(hexFamiliesOf().get('spirometry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'spirometry', program: ['fev1fvcratio'], params: [4000, 5000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `spirometry.fev1fvcratio at ${uuid}`)
  uuidReceiptOf('spirometry fev1fvcratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fev1fvcratio 80, vitalcapacity 4500, fev1 4000, peakflow 600, forcedvitalcapacity 4500, tidalvolume 500, residualvolume 1500, totalcapacity 6000; crossing to pulmonology')
})
