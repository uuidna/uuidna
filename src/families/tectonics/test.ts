import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TectonicsFormulas } from './index.js'
import '../../mcp/families.js'

test('tectonics: spreadingrate, straindrate, displacement, slip, convergence, elevation, stress, platevelocity — crossing to seismology', async (t) => {
  assert.equal(TectonicsFormulas.spreadingrate(100, 2).value, 50, 'mm of seafloor per year')
  assert.equal(TectonicsFormulas.straindrate(5, 50).value, 10)
  assert.equal(TectonicsFormulas.displacement(50, 1000).value, 50000, 'a rate held a thousand years')
  assert.equal(TectonicsFormulas.slip(1000, 8).value, 125, 'slip released per event')
  assert.equal(TectonicsFormulas.convergence(40, 30).value, 70, 'two plates closing')
  assert.equal(TectonicsFormulas.elevation(100, 40).value, 60)
  assert.equal(TectonicsFormulas.elevation(40, 100).value, 0)
  assert.equal(TectonicsFormulas.stress(1000, 20).value, 50)
  assert.equal(TectonicsFormulas.platevelocity(300, 6).value, 50)
  assert.equal(TectonicsFormulas.spreadingrate(100, 2).dst, 'seismology')
  assert.equal(hexFamiliesOf().get('tectonics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tectonics', program: ['spreadingrate'], params: [100, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `tectonics.spreadingrate at ${uuid}`)
  uuidReceiptOf('tectonics spreadingrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; spreadingrate 50, straindrate 10, displacement 50000, slip 125, convergence 70, elevation 60, stress 50, platevelocity 50; crossing to seismology')
})
