import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ColorgradingFormulas } from './index.js'
import '../../mcp/families.js'

test('colorgrading: gamma, contrast, saturation, whitebalance, luminance, gamut, lift, temperature — crossing to optics', async (t) => {
  assert.equal(ColorgradingFormulas.gamma(200, 90).value, 180, 'a value scaled to 90% gamma')
  assert.equal(ColorgradingFormulas.contrast(100, 2).value, 200, 'doubled at the gain')
  assert.equal(ColorgradingFormulas.saturation(150, 60).value, 90)
  assert.equal(ColorgradingFormulas.whitebalance(200, 320).value, 250, '1.25× gain in 8.8 fixed point')
  assert.equal(ColorgradingFormulas.luminance(100, 200, 50).value, 167, 'Rec.601 luma')
  assert.equal(ColorgradingFormulas.gamut(300, 0, 255).value, 255, 'clamped to the ceiling')
  assert.equal(ColorgradingFormulas.gamut(100, 150, 200).value, 150, 'clamped to the floor')
  assert.equal(ColorgradingFormulas.lift(40, 15).value, 55)
  assert.equal(ColorgradingFormulas.temperature(200, 30).value, 170, 'cooled by the shift')
  assert.equal(ColorgradingFormulas.temperature(10, 30).value, 0, 'floored at 0')
  assert.equal(ColorgradingFormulas.gamma(200, 90).dst, 'optics')
  assert.equal(hexFamiliesOf().get('colorgrading')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'colorgrading', program: ['gamma'], params: [200, 90] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 180, `colorgrading.gamma at ${uuid}`)
  uuidReceiptOf('colorgrading gamma', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gamma 180, contrast 200, saturation 90, whitebalance 250, luminance 167, gamut 255, lift 55, temperature 170; crossing to optics')
})
