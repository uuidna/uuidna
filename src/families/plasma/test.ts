import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PlasmaFormulas } from './index.js'
import '../../mcp/families.js'

test('plasma: temperature, density, debye, confinement, ionization, fusion, magnetic, frequency — crossing to energy', async (t) => {
  assert.equal(PlasmaFormulas.temperature(1000, 40).value, 25, 'energy per particle')
  assert.equal(PlasmaFormulas.density(1000, 10).value, 100)
  assert.equal(PlasmaFormulas.debye(1000, 10).value, 100)
  assert.equal(PlasmaFormulas.confinement(1000, 20).value, 50, 'confinement time')
  assert.equal(PlasmaFormulas.ionization(99, 100).value, 99)
  assert.equal(PlasmaFormulas.fusion(1000, 100).value, 1000, 'Q factor %')
  assert.equal(PlasmaFormulas.magnetic(1000, 50).value, 20, 'beta proxy')
  assert.equal(PlasmaFormulas.frequency(100, 3).value, 300, 'plasma frequency proxy')
  assert.equal(PlasmaFormulas.bytes(64).value, 8, '64-bit simhash is 8 bytes a page')
  assert.equal(PlasmaFormulas.hue(3, 64).value, 16, 'k = 3 sits at hue 16')
  assert.equal(PlasmaFormulas.hue(0, 64).value, 0, 'identical sketches sit at hue 0')
  assert.equal(PlasmaFormulas.near(3, 3).value, 1, 'within k is a lead')
  assert.equal(PlasmaFormulas.near(4, 3).holds, false, 'past k is not a near lead')
  assert.equal(PlasmaFormulas.temperature(1000, 40).dst, 'energy')
  assert.equal(PlasmaFormulas.hue(3, 64).dst, 'colortheory')
  assert.equal(hexFamiliesOf().get('plasma')?.length, 11)
  const uuid = qpuHexUuidOf({ family: 'plasma', program: ['density'], params: [1000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `plasma.density at ${uuid}`)
  uuidReceiptOf('plasma density', contentUuidOf(run), { uuid })
  t.diagnostic('11 formulas; temperature 25, density 100, debye 100, confinement 50, ionization 99, fusion 1000, magnetic 20, frequency 300, bytes 8, hue 16, near 1; physics crosses to energy, the fingerprint hue crosses to colortheory')
})
