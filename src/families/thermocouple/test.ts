import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ThermocoupleFormulas } from './index.js'
import '../../mcp/families.js'

test('thermocouple: emf, temperature, coldjunction, sensitivity, linearization, resolution, driftcompensation, rangespan — crossing to electronics', async (t) => {
  assert.equal(ThermocoupleFormulas.emf(41, 100).value, 4100, 'type-K emf over 100°C')
  assert.equal(ThermocoupleFormulas.temperature(4100, 41).value, 100, 'temperature read back')
  assert.equal(ThermocoupleFormulas.coldjunction(250, 25).value, 225)
  assert.equal(ThermocoupleFormulas.sensitivity(4100, 100).value, 41, 'µV per °C')
  assert.equal(ThermocoupleFormulas.linearization(41, 100, 5).value, 4105)
  assert.equal(ThermocoupleFormulas.resolution(4096, 16).value, 256)
  assert.equal(ThermocoupleFormulas.driftcompensation(4100, 50).value, 4050)
  assert.equal(ThermocoupleFormulas.rangespan(1370, 0).value, 1370, 'type-K span')
  assert.equal(ThermocoupleFormulas.temperature(100, 0).value, 0, 'guarded division')
  assert.equal(ThermocoupleFormulas.emf(41, 100).dst, 'electronics')
  assert.equal(hexFamiliesOf().get('thermocouple')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'thermocouple', program: ['emf'], params: [41, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4100, `thermocouple.emf at ${uuid}`)
  uuidReceiptOf('thermocouple emf', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; emf 4100, temperature 100, coldjunction 225, sensitivity 41, linearization 4105, resolution 256, driftcompensation 4050, rangespan 1370; crossing to electronics')
})
