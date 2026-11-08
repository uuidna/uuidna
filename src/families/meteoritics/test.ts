import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MeteoriticsFormulas } from './index.js'
import '../../mcp/families.js'

test('meteoritics: energy, crater, ablation, flux, velocity, composition, magnitude, survival — crossing to astronomy', async (t) => {
  assert.equal(MeteoriticsFormulas.energy(10, 20).value, 2000, 'half mass times speed squared')
  assert.equal(MeteoriticsFormulas.crater(2000, 5).value, 400)
  assert.equal(MeteoriticsFormulas.ablation(100, 30).value, 70, 'mass shed in flight')
  assert.equal(MeteoriticsFormulas.flux(1000, 50).value, 20, 'falls per unit area')
  assert.equal(MeteoriticsFormulas.velocity(6000, 60).value, 100)
  assert.equal(MeteoriticsFormulas.composition(30, 120).value, 25, 'metal percentage')
  assert.equal(MeteoriticsFormulas.magnitude(900, 3).value, 100)
  assert.equal(MeteoriticsFormulas.survival(100, 70).value, 30, 'mass through the air')
  assert.equal(MeteoriticsFormulas.survival(50, 80).value, 0)
  assert.equal(MeteoriticsFormulas.energy(10, 20).dst, 'astronomy')
  assert.equal(hexFamiliesOf().get('meteoritics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'meteoritics', program: ['crater'], params: [2000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `meteoritics.crater at ${uuid}`)
  uuidReceiptOf('meteoritics crater', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; energy 2000, crater 400, ablation 70, flux 20, velocity 100, composition 25, magnitude 100, survival 30; crossing to astronomy')
})
