import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MagnetismFormulas } from './index.js'
import '../../mcp/families.js'

test('magnetism: field, force, flux, induction, torque, permeability, reluctance, dipole — crossing to energy', async (t) => {
  assert.equal(MagnetismFormulas.field(5, 200).value, 1000, 'ampere-turns of a solenoid')
  assert.equal(MagnetismFormulas.force(3, 40).value, 120, 'Lorentz force on a moving charge')
  assert.equal(MagnetismFormulas.flux(10, 50).value, 500)
  assert.equal(MagnetismFormulas.induction(1000, 4).value, 250, 'Faraday EMF')
  assert.equal(MagnetismFormulas.induction(1000, 0).value, 0, 'guarded time')
  assert.equal(MagnetismFormulas.torque(6, 7).value, 42)
  assert.equal(MagnetismFormulas.permeability(900, 3).value, 300)
  assert.equal(MagnetismFormulas.permeability(900, 0).value, 0, 'guarded current')
  assert.equal(MagnetismFormulas.reluctance(5, 2).value, 2500, 'length over area, scaled')
  assert.equal(MagnetismFormulas.reluctance(5, 0).value, 0, 'guarded area')
  assert.equal(MagnetismFormulas.dipole(100, 4).value, 25)
  assert.equal(MagnetismFormulas.dipole(100, 0).value, 0, 'guarded distance')
  assert.equal(MagnetismFormulas.field(5, 200).dst, 'energy')
  assert.equal(hexFamiliesOf().get('magnetism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'magnetism', program: ['flux'], params: [10, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `magnetism.flux at ${uuid}`)
  uuidReceiptOf('magnetism flux', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; field 1000, force 120, flux 500, induction 250, torque 42, permeability 300, reluctance 2500, dipole 25; crossing to energy')
})
