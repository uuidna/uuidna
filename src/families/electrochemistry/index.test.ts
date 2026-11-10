import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ElectrochemistryFormulas } from './index.js'
import '../../mcp/families.js'

test('electrochemistry: faraday, cellpotential, current, electrolysis, conductivity, nernst, capacity, efficiency — crossing to chemistry', async (t) => {
  assert.equal(ElectrochemistryFormulas.faraday(1000, 4).value, 250)
  assert.equal(ElectrochemistryFormulas.cellpotential(80, 30).value, 50, 'cathode over anode')
  assert.equal(ElectrochemistryFormulas.cellpotential(30, 80).value, -50, 'potential can be negative')
  assert.equal(ElectrochemistryFormulas.current(600, 60).value, 10, 'charge per second')
  assert.equal(ElectrochemistryFormulas.electrolysis(9650, 965).value, 10, 'moles deposited')
  assert.equal(ElectrochemistryFormulas.conductivity(100, 5).value, 20)
  assert.equal(ElectrochemistryFormulas.nernst(100, 20).value, 80)
  assert.equal(ElectrochemistryFormulas.nernst(20, 100).value, -80, 'shift can exceed standard')
  assert.equal(ElectrochemistryFormulas.capacity(1000, 4).value, 250)
  assert.equal(ElectrochemistryFormulas.efficiency(90, 100).value, 90, 'coulombic efficiency')
  assert.equal(ElectrochemistryFormulas.faraday(1000, 4).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('electrochemistry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'electrochemistry', program: ['current'], params: [600, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `electrochemistry.current at ${uuid}`)
  uuidReceiptOf('electrochemistry current', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; faraday 250, cellpotential 50/-50, current 10, electrolysis 10, conductivity 20, nernst 80/-80, capacity 250, efficiency 90; crossing to chemistry')
})
