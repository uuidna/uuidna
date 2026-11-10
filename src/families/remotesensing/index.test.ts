import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RemotesensingFormulas } from './index.js'
import '../../mcp/families.js'

test('remotesensing: ndvi, resolution, reflectance, classification, bands, revisit, cloudcover, swath — crossing to geography', async (t) => {
  assert.equal(RemotesensingFormulas.ndvi(80, 40).value, 33, 'vegetation index of a healthy scene')
  assert.equal(RemotesensingFormulas.resolution(4000, 1000).value, 4)
  assert.equal(RemotesensingFormulas.reflectance(40, 80).value, 50)
  assert.equal(RemotesensingFormulas.classification(900, 1000).value, 90, 'classification accuracy')
  assert.equal(RemotesensingFormulas.bands(12).value, 12)
  assert.equal(RemotesensingFormulas.revisit(16).value, 16)
  assert.equal(RemotesensingFormulas.cloudcover(30, 100).value, 30)
  assert.equal(RemotesensingFormulas.swath(700, 10).value, 7000)
  assert.equal(RemotesensingFormulas.ndvi(80, 40).dst, 'geography')
  assert.equal(hexFamiliesOf().get('remotesensing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'remotesensing', program: ['ndvi'], params: [80, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 33, `remotesensing.ndvi at ${uuid}`)
  uuidReceiptOf('remotesensing ndvi', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ndvi 33, resolution 4, reflectance 50, classification 90, bands 12, revisit 16, cloudcover 30, swath 7000; crossing to geography')
})
