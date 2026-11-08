import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WeldingFormulas } from './index.js'
import '../../mcp/families.js'

test('welding: heatinput, travelspeed, deposition, penetration, dilution, porosity, duty, strength — crossing to materials', async (t) => {
  assert.equal(WeldingFormulas.heatinput(24, 200).value, 4800, 'arc power in watts')
  assert.equal(WeldingFormulas.travelspeed(600, 120).value, 5, 'mm per second')
  assert.equal(WeldingFormulas.deposition(3600, 2).value, 1800)
  assert.equal(WeldingFormulas.penetration(8, 10).value, 80, 'percent of thickness fused')
  assert.equal(WeldingFormulas.dilution(30, 100).value, 30)
  assert.equal(WeldingFormulas.porosity(5, 100).value, 5, 'defects per unit length')
  assert.equal(WeldingFormulas.duty(6, 10).value, 60, 'duty cycle percent')
  assert.equal(WeldingFormulas.strength(85, 100).value, 85, 'joint efficiency')
  assert.equal(WeldingFormulas.heatinput(24, 200).dst, 'materials')
  assert.equal(hexFamiliesOf().get('welding')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'welding', program: ['penetration'], params: [8, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `welding.penetration at ${uuid}`)
  uuidReceiptOf('welding penetration', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; heatinput 4800, travelspeed 5, deposition 1800, penetration 80, dilution 30, porosity 5, duty 60, strength 85; crossing to materials')
})
