import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ElectromagnetismFormulas } from './index.js'
import '../../mcp/families.js'

test('electromagnetism: coulomb, field, flux, induction, wave, impedance, poynting, capacitance — crossing to magnetism', async (t) => {
  assert.equal(ElectromagnetismFormulas.coulomb(6, 7).value, 42, 'a force proxy from two charges')
  assert.equal(ElectromagnetismFormulas.field(100, 5).value, 4, 'the field at a distance')
  assert.equal(ElectromagnetismFormulas.flux(4, 25).value, 100)
  assert.equal(ElectromagnetismFormulas.induction(1000, 8).value, 125, 'Faraday induction')
  assert.equal(ElectromagnetismFormulas.wave(50, 6).value, 300, 'a speed proxy')
  assert.equal(ElectromagnetismFormulas.impedance(240, 10).value, 24, 'Ohm impedance')
  assert.equal(ElectromagnetismFormulas.poynting(12, 9).value, 108)
  assert.equal(ElectromagnetismFormulas.capacitance(1000, 8).value, 125)
  assert.equal(ElectromagnetismFormulas.coulomb(6, 7).dst, 'magnetism')
  assert.equal(hexFamiliesOf().get('electromagnetism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'electromagnetism', program: ['flux'], params: [4, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `electromagnetism.flux at ${uuid}`)
  uuidReceiptOf('electromagnetism flux', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coulomb 42, field 4, flux 100, induction 125, wave 300, impedance 24, poynting 108, capacitance 125; crossing to magnetism')
})
