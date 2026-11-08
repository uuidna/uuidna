import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SolidFormulas } from './index.js'
import '../../mcp/families.js'

test('solid: cubevolume, cuboidvolume, prismvolume, pyramidvolume, cubesurface, cuboidsurface, spherevolumeproxy, cylindervolumeproxy — crossing to geometry', async (t) => {
  assert.equal(SolidFormulas.cubevolume(10).value, 1000, 'a ten-unit cube')
  assert.equal(SolidFormulas.cuboidvolume(2, 3, 4).value, 24)
  assert.equal(SolidFormulas.prismvolume(6, 10).value, 60)
  assert.equal(SolidFormulas.pyramidvolume(30, 10).value, 100, 'a third of base times height')
  assert.equal(SolidFormulas.cubesurface(10).value, 600)
  assert.equal(SolidFormulas.cuboidsurface(2, 3, 4).value, 52)
  assert.equal(SolidFormulas.spherevolumeproxy(3).value, 113)
  assert.equal(SolidFormulas.cylindervolumeproxy(5, 10).value, 785)
  assert.equal(SolidFormulas.cubevolume(10).dst, 'geometry')
  assert.equal(hexFamiliesOf().get('solid')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'solid', program: ['cubevolume'], params: [10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `solid.cubevolume at ${uuid}`)
  uuidReceiptOf('solid cubevolume', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cubevolume 1000, cuboidvolume 24, prismvolume 60, pyramidvolume 100, cubesurface 600, cuboidsurface 52, spherevolumeproxy 113, cylindervolumeproxy 785; crossing to geometry')
})
