import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SignalingFormulas } from './index.js'
import '../../mcp/families.js'

test('signaling: receptoroccupancy, amplification, ec50, cascadegain, secondmessenger, desensitization, dissociation, responsetime — crossing to physiology', async (t) => {
  assert.equal(SignalingFormulas.receptoroccupancy(100, 100).value, 50, 'half the receptors occupied at ligand = kd')
  assert.equal(SignalingFormulas.amplification(10000, 100).value, 100, 'hundredfold amplification')
  assert.equal(SignalingFormulas.ec50(80, 20).value, 50)
  assert.equal(SignalingFormulas.cascadegain(10, 50).value, 500, 'two stages multiply')
  assert.equal(SignalingFormulas.secondmessenger(200, 30).value, 6000)
  assert.equal(SignalingFormulas.desensitization(1000, 400).value, 600)
  assert.equal(SignalingFormulas.desensitization(300, 500).value, 0, 'clamped at zero')
  assert.equal(SignalingFormulas.dissociation(10000, 90).value, 900)
  assert.equal(SignalingFormulas.responsetime(5000, 100).value, 50, 'milliseconds to respond')
  assert.equal(SignalingFormulas.receptoroccupancy(100, 100).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('signaling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'signaling', program: ['receptoroccupancy'], params: [100, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `signaling.receptoroccupancy at ${uuid}`)
  uuidReceiptOf('signaling receptoroccupancy', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; receptoroccupancy 50, amplification 100, ec50 50, cascadegain 500, secondmessenger 6000, desensitization 600, dissociation 900, responsetime 50; crossing to physiology')
})
