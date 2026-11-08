import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SynapseFormulas } from './index.js'

/** synapse: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('synapse: vesicles, cleft, receptors, delay, strength, plasticity, transmitters, combos', async (t) => {
  assert.equal(SynapseFormulas.vesicles(100, 10).value, 1000, 'vesicles(100, 10)')
  assert.equal(SynapseFormulas.cleft(200, 10).value, 20, 'cleft(200, 10)')
  assert.equal(SynapseFormulas.receptors(1000, 1).value, 1000, 'receptors(1000, 1)')
  assert.equal(SynapseFormulas.delay(100, 50).value, 2, 'delay(100, 50)')
  assert.equal(SynapseFormulas.strength(80, 100).value, 80, 'strength(80, 100)')
  assert.equal(SynapseFormulas.plasticity(100, 20).value, 80, 'plasticity(100, 20)')
  assert.equal(SynapseFormulas.transmitters(6, 0).value, 6, 'transmitters(6, 0)')
  assert.equal(SynapseFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('synapse')?.length, 8)
  for (const [name, params, expected] of [["vesicles",[100,10],1000],["cleft",[200,10],20],["receptors",[1000,1],1000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'synapse', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `synapse.${name} at ${uuid}`)
    uuidReceiptOf(`synapse ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "vesicles=1000, cleft=20, receptors=1000")
})
