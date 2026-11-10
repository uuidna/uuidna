import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhotochemistryFormulas } from './index.js'
import '../../mcp/families.js'

test('photochemistry: quantumyield, absorbance, photonflux, actinometry, bleaching, excitation, lifetime, conversion — crossing to optics', async (t) => {
  assert.equal(PhotochemistryFormulas.quantumyield(90, 100).value, 90, 'ninety percent quantum yield')
  assert.equal(PhotochemistryFormulas.absorbance(2, 3, 100).value, 600, 'Beer–Lambert ε·c·l')
  assert.equal(PhotochemistryFormulas.photonflux(6000, 60).value, 100, 'photons per second')
  assert.equal(PhotochemistryFormulas.actinometry(10000, 90).value, 9000)
  assert.equal(PhotochemistryFormulas.bleaching(1000, 400).value, 600, 'fluorophores surviving')
  assert.equal(PhotochemistryFormulas.bleaching(400, 1000).value, 0, 'nothing survives')
  assert.equal(PhotochemistryFormulas.excitation(500, 4).value, 2000)
  assert.equal(PhotochemistryFormulas.lifetime(5000, 100).value, 50)
  assert.equal(PhotochemistryFormulas.conversion(750, 1000).value, 75, 'percent conversion')
  assert.equal(PhotochemistryFormulas.quantumyield(90, 100).dst, 'optics')
  assert.equal(hexFamiliesOf().get('photochemistry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'photochemistry', program: ['photonflux'], params: [6000, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `photochemistry.photonflux at ${uuid}`)
  uuidReceiptOf('photochemistry photonflux', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; quantumyield 90, absorbance 600, photonflux 100, actinometry 9000, bleaching 600, excitation 2000, lifetime 50, conversion 75; crossing to optics')
})
