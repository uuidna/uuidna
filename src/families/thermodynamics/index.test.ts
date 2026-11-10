import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ThermodynamicsFormulas } from './index.js'
import '../../mcp/families.js'

test('thermodynamics: carnot, work, efficiency, entropy, heatflow, cop, expansion, internal, gibbs — crossing to heat', async (t) => {
  assert.equal(ThermodynamicsFormulas.carnot(400, 300).value, 25, 'carnot ceiling from the two reservoirs')
  assert.equal(ThermodynamicsFormulas.work(100, 5).value, 500)
  assert.equal(ThermodynamicsFormulas.efficiency(40, 100).value, 40)
  assert.equal(ThermodynamicsFormulas.entropy(1000, 250).value, 4)
  assert.equal(ThermodynamicsFormulas.heatflow(50, 8).value, 400)
  assert.equal(ThermodynamicsFormulas.cop(300, 100).value, 300, 'heat moved per unit work, ×100')
  assert.equal(ThermodynamicsFormulas.expansion(1000, 7).value, 1007)
  assert.equal(ThermodynamicsFormulas.internal(500, 200).value, 300, 'first law ΔU = Q − W')
  assert.equal(ThermodynamicsFormulas.internal(200, 500).value, 0)
  assert.equal(ThermodynamicsFormulas.gibbs(1000, 300).value, 700, 'gibbs free energy = enthalpy − heat')
  assert.equal(ThermodynamicsFormulas.gibbs(300, 1000).value, 0, 'free energy floored at zero when heat exceeds enthalpy')
  assert.equal(ThermodynamicsFormulas.gibbs(1000, 300).dst, 'heat')
  assert.equal(ThermodynamicsFormulas.carnot(400, 300).dst, 'heat')
  assert.equal(hexFamiliesOf().get('thermodynamics')?.length, 9)
  const uuid = qpuHexUuidOf({ family: 'thermodynamics', program: ['work'], params: [100, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `thermodynamics.work at ${uuid}`)
  uuidReceiptOf('thermodynamics work', contentUuidOf(run), { uuid })
  t.diagnostic('9 formulas; carnot 25, work 500, efficiency 40, entropy 4, heatflow 400, cop 300, expansion 1007, internal 300, gibbs 700; crossing to heat')
})
