import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NeuronFormulas } from './index.js'

/** neuron: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('neuron: synapses, dendrites, threshold, spikes, axonlength, refractory, layers, combos', async (t) => {
  assert.equal(NeuronFormulas.synapses(1000, 7).value, 7000, 'synapses(1000, 7)')
  assert.equal(NeuronFormulas.dendrites(1000, 0).value, 1000, 'dendrites(1000, 0)')
  assert.equal(NeuronFormulas.threshold(70, 55).value, 15, 'threshold(70, 55)')
  assert.equal(NeuronFormulas.spikes(100, 10).value, 1000, 'spikes(100, 10)')
  assert.equal(NeuronFormulas.axonlength(100, 1).value, 100, 'axonlength(100, 1)')
  assert.equal(NeuronFormulas.refractory(20, 2).value, 18, 'refractory(20, 2)')
  assert.equal(NeuronFormulas.layers(6, 0).value, 6, 'layers(6, 0)')
  assert.equal(NeuronFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('neuron')?.length, 8)
  for (const [name, params, expected] of [["synapses",[1000,7],7000],["dendrites",[1000,0],1000],["threshold",[70,55],15]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'neuron', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `neuron.${name} at ${uuid}`)
    uuidReceiptOf(`neuron ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "synapses=7000, dendrites=1000, threshold=15")
})
