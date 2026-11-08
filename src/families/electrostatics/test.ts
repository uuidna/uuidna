import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ElectrostaticsFormulas } from './index.js'
import '../../mcp/families.js'

test('electrostatics: coulomb, field, potential, capacitance, energy, flux, dipole, charge — crossing to electrical', async (t) => {
  assert.equal(ElectrostaticsFormulas.coulomb(12, 15, 3).value, 20, 'force falls off as r²')
  assert.equal(ElectrostaticsFormulas.field(100, 5).value, 4)
  assert.equal(ElectrostaticsFormulas.potential(100, 4).value, 25)
  assert.equal(ElectrostaticsFormulas.capacitance(100, 5).value, 20, 'charge stored per volt')
  assert.equal(ElectrostaticsFormulas.energy(10, 6).value, 30, 'half charge times voltage')
  assert.equal(ElectrostaticsFormulas.flux(1000, 8).value, 125)
  assert.equal(ElectrostaticsFormulas.dipole(7, 9).value, 63)
  assert.equal(ElectrostaticsFormulas.charge(20, 5).value, 100)
  assert.equal(ElectrostaticsFormulas.capacitance(100, 0).value, 0, 'guarded divisor')
  assert.equal(ElectrostaticsFormulas.coulomb(12, 15, 3).dst, 'electrical')
  assert.equal(hexFamiliesOf().get('electrostatics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'electrostatics', program: ['coulomb'], params: [12, 15, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `electrostatics.coulomb at ${uuid}`)
  uuidReceiptOf('electrostatics coulomb', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coulomb 20, field 4, potential 25, capacitance 20, energy 30, flux 125, dipole 63, charge 100; crossing to electrical')
})
