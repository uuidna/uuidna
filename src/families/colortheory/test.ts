import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ColortheoryFormulas } from './index.js'
import '../../mcp/families.js'

test('colortheory: complement, luminance, contrastratio, grayscale, blend, hueshift, saturation, tint — crossing to colorgrading', async (t) => {
  assert.equal(ColortheoryFormulas.complement(120).value, 240, 'the opposite hue on the wheel')
  assert.equal(ColortheoryFormulas.luminance(255, 0, 0).value, 53, 'perceived brightness of pure red')
  assert.equal(ColortheoryFormulas.contrastratio(255, 0).value, 5200, 'white on black, scaled')
  assert.equal(ColortheoryFormulas.grayscale(90, 120, 150).value, 120)
  assert.equal(ColortheoryFormulas.blend(0, 200, 50).value, 100, 'halfway between the two')
  assert.equal(ColortheoryFormulas.hueshift(300, 120).value, 60, 'rotated past 360')
  assert.equal(ColortheoryFormulas.saturation(200, 50).value, 75)
  assert.equal(ColortheoryFormulas.tint(100, 50).value, 177, 'lightened toward white')
  assert.equal(ColortheoryFormulas.complement(120).dst, 'colorgrading')
  assert.equal(hexFamiliesOf().get('colortheory')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'colortheory', program: ['saturation'], params: [200, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `colortheory.saturation at ${uuid}`)
  uuidReceiptOf('colortheory saturation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; complement 240, luminance 53, contrastratio 5200, grayscale 120, blend 100, hueshift 60, saturation 75, tint 177; crossing to colorgrading')
})
