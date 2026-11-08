import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StabilityFormulas } from './index.js'
import '../../mcp/families.js'

test('stability: gainmargin, phasemargin, crossoverfrequency, poles, zeros, routhcriterion, marginratio, dampingfactor — crossing to control', async (t) => {
  assert.equal(StabilityFormulas.gainmargin(200, 100).value, 200, 'twice the gain limit')
  assert.equal(StabilityFormulas.phasemargin(180, 135).value, 45)
  assert.equal(StabilityFormulas.crossoverfrequency(1000, 4).value, 250, 'crossover over four poles')
  assert.equal(StabilityFormulas.poles(3, 2).value, 7)
  assert.equal(StabilityFormulas.zeros(5, 2).value, 3)
  assert.equal(StabilityFormulas.routhcriterion(0).value, 1, 'stable: no sign changes')
  assert.equal(StabilityFormulas.routhcriterion(2).value, 0)
  assert.equal(StabilityFormulas.marginratio(200, 50).value, 400)
  assert.equal(StabilityFormulas.dampingfactor(70, 100).value, 70, 'seventy percent of critical')
  assert.equal(StabilityFormulas.gainmargin(200, 100).dst, 'control')
  assert.equal(hexFamiliesOf().get('stability')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'stability', program: ['crossoverfrequency'], params: [1000, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 250, `stability.crossoverfrequency at ${uuid}`)
  uuidReceiptOf('stability crossoverfrequency', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gainmargin 200, phasemargin 45, crossoverfrequency 250, poles 7, zeros 3, routhcriterion 1, marginratio 400, dampingfactor 70; crossing to control')
})
