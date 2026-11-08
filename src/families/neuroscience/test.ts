import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NeuroscienceFormulas } from './index.js'
import '../../mcp/families.js'

test('neuroscience: firing, potential, synapse, conduction, plasticity, refractory, connectivity, threshold — crossing to neurology', async (t) => {
  assert.equal(NeuroscienceFormulas.firing(1000, 10).value, 100, 'spikes per second')
  assert.equal(NeuroscienceFormulas.potential(50, 70).value, -20, 'a negative membrane potential')
  assert.equal(NeuroscienceFormulas.potential(90, 20).value, 70)
  assert.equal(NeuroscienceFormulas.synapse(10000, 100).value, 100, 'synapses per neuron')
  assert.equal(NeuroscienceFormulas.conduction(1200, 10).value, 120)
  assert.equal(NeuroscienceFormulas.plasticity(30, 100).value, 30)
  assert.equal(NeuroscienceFormulas.refractory(2).value, 2)
  assert.equal(NeuroscienceFormulas.connectivity(5000, 100).value, 50)
  assert.equal(NeuroscienceFormulas.threshold(55).value, 55)
  assert.equal(NeuroscienceFormulas.firing(1000, 10).dst, 'neurology')
  assert.equal(hexFamiliesOf().get('neuroscience')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'neuroscience', program: ['synapse'], params: [10000, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `neuroscience.synapse at ${uuid}`)
  uuidReceiptOf('neuroscience synapse', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; firing 100, potential -20/70, synapse 100, conduction 120, plasticity 30, refractory 2, connectivity 50, threshold 55; crossing to neurology')
})
