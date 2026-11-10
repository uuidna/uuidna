import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LensesFormulas } from './index.js'
import '../../mcp/families.js'

test('lenses: focallength, magnification, fnumber, power, imagedistance, fieldofview, numericalaperture, depthoffield — crossing to optics', async (t) => {
  assert.equal(LensesFormulas.focallength(30, 60).value, 20, '20mm from a 30/60 conjugate pair')
  assert.equal(LensesFormulas.magnification(100, 25).value, 4, 'four times magnification')
  assert.equal(LensesFormulas.fnumber(50, 25).value, 2, 'f/2')
  assert.equal(LensesFormulas.power(50).value, 20, '20 diopters for a 50mm lens')
  assert.equal(LensesFormulas.imagedistance(30, 20).value, 60, 'image at 60mm')
  assert.equal(LensesFormulas.fieldofview(1000, 36, 50).value, 720)
  assert.equal(LensesFormulas.numericalaperture(50, 50).value, 500, 'NA 0.5 scaled ×1000')
  assert.equal(LensesFormulas.depthoffield(50, 2, 25).value, 50)
  assert.equal(LensesFormulas.imagedistance(20, 30).value, 0, 'no real image inside the focal length')
  assert.equal(LensesFormulas.focallength(30, 60).dst, 'optics')
  assert.equal(hexFamiliesOf().get('lenses')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'lenses', program: ['focallength'], params: [30, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `lenses.focallength at ${uuid}`)
  uuidReceiptOf('lenses focallength', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; focallength 20, magnification 4, fnumber 2, power 20, imagedistance 60, fieldofview 720, numericalaperture 500, depthoffield 50; crossing to optics')
})
