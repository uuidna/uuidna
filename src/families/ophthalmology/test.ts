import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OphthalmologyFormulas } from './index.js'
import '../../mcp/families.js'

test('ophthalmology: accommodation, astigmatism, cylinderpower, diopter, iop, pupildistance, refractiveerror, visualacuity — crossing to optics', async (t) => {
  assert.equal(OphthalmologyFormulas.accommodation(10, 100).value, 9, 'nine diopters of amplitude')
  assert.equal(OphthalmologyFormulas.astigmatism(44, 46).value, 2, 'two diopters of corneal cylinder')
  assert.equal(OphthalmologyFormulas.cylinderpower(3, 2).value, 5)
  assert.equal(OphthalmologyFormulas.diopter(500).value, 2, 'a half-metre focal length')
  assert.equal(OphthalmologyFormulas.iop(48, 3).value, 16, 'mean pressure in mmHg')
  assert.equal(OphthalmologyFormulas.pupildistance(31, 32).value, 63, 'binocular PD in mm')
  assert.equal(OphthalmologyFormulas.refractiveerror(2, 4).value, 4, 'spherical equivalent')
  assert.equal(OphthalmologyFormulas.visualacuity(20, 40).value, 50)
  assert.equal(OphthalmologyFormulas.visualacuity(20, 20).value, 100, 'normal acuity')
  assert.equal(OphthalmologyFormulas.diopter(500).dst, 'optics')
  assert.equal(hexFamiliesOf().get('ophthalmology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ophthalmology', program: ['diopter'], params: [500] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `ophthalmology.diopter at ${uuid}`)
  uuidReceiptOf('ophthalmology diopter', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; accommodation 9, astigmatism 2, cylinderpower 5, diopter 2, iop 16, pupildistance 63, refractiveerror 4, visualacuity 50; crossing to optics')
})
