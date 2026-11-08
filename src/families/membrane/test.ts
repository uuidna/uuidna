import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MembraneFormulas } from './index.js'
import '../../mcp/families.js'

test('membrane: restingpotential, nernst, permeability, fluidity, surfacearea, transportrate, capacitance, selectivity — crossing to biochemistry', async (t) => {
  assert.equal(MembraneFormulas.restingpotential(90, 20).value, 70, 'the standing charge difference')
  assert.equal(MembraneFormulas.nernst(2, 1).value, 122, '61 mV per decade, monovalent')
  assert.equal(MembraneFormulas.permeability(1000, 10, 5).value, 20)
  assert.equal(MembraneFormulas.fluidity(300, 10).value, 30)
  assert.equal(MembraneFormulas.surfacearea(5).value, 300, '12 · r²')
  assert.equal(MembraneFormulas.transportrate(6000, 60).value, 100, 'molecules per second')
  assert.equal(MembraneFormulas.capacitance(1000, 10).value, 100)
  assert.equal(MembraneFormulas.selectivity(95, 100).value, 95, 'highly selective')
  assert.equal(MembraneFormulas.selectivity(50, 100).value, 50)
  assert.equal(MembraneFormulas.restingpotential(90, 20).dst, 'biochemistry')
  assert.equal(hexFamiliesOf().get('membrane')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'membrane', program: ['transportrate'], params: [6000, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `membrane.transportrate at ${uuid}`)
  uuidReceiptOf('membrane transportrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; restingpotential 70, nernst 122, permeability 20, fluidity 30, surfacearea 300, transportrate 100, capacitance 100, selectivity 95; crossing to biochemistry')
})
