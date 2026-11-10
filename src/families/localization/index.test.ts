import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LocalizationFormulas } from './index.js'
import '../../mcp/families.js'

test('localization: covariance, gain, innovation, confidence, gridresolution, particlecount, updaterate, positionvariance — crossing to control', async (t) => {
  assert.equal(LocalizationFormulas.covariance(4, 4).value, 16)
  assert.equal(LocalizationFormulas.gain(30, 100).value, 30)
  assert.equal(LocalizationFormulas.innovation(120, 100).value, 20)
  assert.equal(LocalizationFormulas.confidence(90, 100).value, 90)
  assert.equal(LocalizationFormulas.gridresolution(1000, 50).value, 20)
  assert.equal(LocalizationFormulas.particlecount(100, 5).value, 500)
  assert.equal(LocalizationFormulas.updaterate(1000, 20).value, 50)
  assert.equal(LocalizationFormulas.positionvariance(400, 4).value, 100)
  assert.equal(LocalizationFormulas.covariance(4, 4).dst, 'control')
  assert.equal(hexFamiliesOf().get('localization')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'localization', program: ['covariance'], params: [4, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 16, `localization.covariance at ${uuid}`)
  uuidReceiptOf('localization covariance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; covariance 16, gain 30, innovation 20, confidence 90, gridresolution 20, particlecount 500, updaterate 50, positionvariance 100; crossing to control')
})
