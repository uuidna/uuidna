import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ThermochemistryFormulas } from './index.js'
import '../../mcp/families.js'

test('thermochemistry: enthalpy, entropy, gibbs, heatcapacity, calorimetry, bondenergy, hesslaw, activationenergy — crossing to chemistry', async (t) => {
  assert.equal(ThermochemistryFormulas.enthalpy(2, 286).value, 572, 'two moles of water formation')
  assert.equal(ThermochemistryFormulas.entropy(900, 300).value, 3)
  assert.equal(ThermochemistryFormulas.gibbs(1000, 300, 2).value, 400, 'enthalpy left after the temperature claims the entropy')
  assert.equal(ThermochemistryFormulas.gibbs(500, 300, 2).value, 0, 'the temperature claims it all')
  assert.equal(ThermochemistryFormulas.heatcapacity(400, 8).value, 50)
  assert.equal(ThermochemistryFormulas.calorimetry(100, 4, 25).value, 10000, 'heat to warm the water')
  assert.equal(ThermochemistryFormulas.bondenergy(4, 413).value, 1652, 'four C–H bonds')
  assert.equal(ThermochemistryFormulas.hesslaw(100, 200, 300).value, 600)
  assert.equal(ThermochemistryFormulas.activationenergy(150, 50).value, 100, 'the forward barrier over the reverse')
  assert.equal(ThermochemistryFormulas.activationenergy(50, 150).value, 0)
  assert.equal(ThermochemistryFormulas.enthalpy(2, 286).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('thermochemistry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'thermochemistry', program: ['gibbs'], params: [1000, 300, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `thermochemistry.gibbs at ${uuid}`)
  uuidReceiptOf('thermochemistry gibbs', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; enthalpy 572, entropy 3, gibbs 400, heatcapacity 50, calorimetry 10000, bondenergy 1652, hesslaw 600, activationenergy 100; crossing to chemistry')
})
