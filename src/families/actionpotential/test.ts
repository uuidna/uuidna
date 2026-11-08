import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ActionpotentialFormulas } from './index.js'
import '../../mcp/families.js'

test('actionpotential: amplitude, conductionvelocity, depolarization, frequency, overshoot, propagationtime, refractoryperiod, threshold — crossing to neurology', async (t) => {
  assert.equal(ActionpotentialFormulas.amplitude(100, 30).value, 70, 'full swing trough to peak')
  assert.equal(ActionpotentialFormulas.conductionvelocity(120, 2).value, 60, 'metres per second')
  assert.equal(ActionpotentialFormulas.depolarization(55, 30).value, 25)
  assert.equal(ActionpotentialFormulas.frequency(200, 4).value, 50, 'spikes per second')
  assert.equal(ActionpotentialFormulas.overshoot(100, 85).value, 15)
  assert.equal(ActionpotentialFormulas.propagationtime(100, 50).value, 2)
  assert.equal(ActionpotentialFormulas.refractoryperiod(1, 3).value, 4)
  assert.equal(ActionpotentialFormulas.threshold(70, 15).value, 85)
  assert.equal(ActionpotentialFormulas.conductionvelocity(120, 2).dst, 'neurology')
  assert.equal(hexFamiliesOf().get('actionpotential')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'actionpotential', program: ['conductionvelocity'], params: [120, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `actionpotential.conductionvelocity at ${uuid}`)
  uuidReceiptOf('actionpotential conductionvelocity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; amplitude 70, conductionvelocity 60, depolarization 25, frequency 50, overshoot 15, propagationtime 2, refractoryperiod 4, threshold 85; crossing to neurology')
})
