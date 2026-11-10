import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AstronomyFormulas } from './index.js'
import '../../mcp/families.js'

test('astronomy: magnitude, luminosity, parallax, redshift, escape, orbital, density, albedo — crossing to gravity', async (t) => {
  assert.equal(AstronomyFormulas.magnitude(2, 6).value, 4, 'four magnitudes fainter')
  assert.equal(AstronomyFormulas.magnitude(6, 2).value, 0, 'clamped at zero')
  assert.equal(AstronomyFormulas.luminosity(3, 5).value, 45, 'radius² · temp')
  assert.equal(AstronomyFormulas.parallax(100, 50).value, 2000)
  assert.equal(AstronomyFormulas.redshift(1100, 1000).value, 100, 'z ×1000')
  assert.equal(AstronomyFormulas.escape(1000, 10).value, 100)
  assert.equal(AstronomyFormulas.orbital(365, 5).value, 73)
  assert.equal(AstronomyFormulas.density(1000, 8).value, 125)
  assert.equal(AstronomyFormulas.albedo(30, 100).value, 30, 'per cent reflected')
  assert.equal(AstronomyFormulas.luminosity(3, 5).dst, 'gravity')
  assert.equal(hexFamiliesOf().get('astronomy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'astronomy', program: ['parallax'], params: [100, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2000, `astronomy.parallax at ${uuid}`)
  uuidReceiptOf('astronomy parallax', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; magnitude 4, luminosity 45, parallax 2000, redshift 100, escape 100, orbital 73, density 125, albedo 30; crossing to gravity')
})
