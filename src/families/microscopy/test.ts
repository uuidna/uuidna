import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MicroscopyFormulas } from './index.js'
import '../../mcp/families.js'

test('microscopy: magnification, resolution, numericalaperture, fieldofview, depthoffield, totalmag, workingdistance, pixelsize — crossing to optics', async (t) => {
  assert.equal(MicroscopyFormulas.magnification(40, 10).value, 400, 'objective times eyepiece')
  assert.equal(MicroscopyFormulas.resolution(500, 2).value, 125)
  assert.equal(MicroscopyFormulas.resolution(500, 0).value, 0, 'aperture guard')
  assert.equal(MicroscopyFormulas.numericalaperture(1, 55).value, 55)
  assert.equal(MicroscopyFormulas.fieldofview(20, 40).value, 500, 'microns across the field')
  assert.equal(MicroscopyFormulas.depthoffield(500, 5).value, 20)
  assert.equal(MicroscopyFormulas.totalmag(40, 10, 2).value, 800, 'through the camera adapter')
  assert.equal(MicroscopyFormulas.workingdistance(300, 2).value, 150)
  assert.equal(MicroscopyFormulas.pixelsize(36000, 6000).value, 6)
  assert.equal(MicroscopyFormulas.magnification(40, 10).dst, 'optics')
  assert.equal(hexFamiliesOf().get('microscopy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'microscopy', program: ['magnification'], params: [40, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `microscopy.magnification at ${uuid}`)
  uuidReceiptOf('microscopy magnification', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; magnification 400, resolution 125, numericalaperture 55, fieldofview 500, depthoffield 20, totalmag 800, workingdistance 150, pixelsize 6; crossing to optics')
})
