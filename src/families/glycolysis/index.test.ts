import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GlycolysisFormulas } from './index.js'
import '../../mcp/families.js'

test('glycolysis: flux, gluconeogenesis, glucoseconsumed, lactate, nadh, netatp, phosphorylation, pyruvate — crossing to biochemistry', async (t) => {
  assert.equal(GlycolysisFormulas.flux(600, 60).value, 10, 'glucose molecules per second')
  assert.equal(GlycolysisFormulas.gluconeogenesis(10).value, 5, 'five glucose rebuilt from ten pyruvate')
  assert.equal(GlycolysisFormulas.glucoseconsumed(100).value, 50)
  assert.equal(GlycolysisFormulas.lactate(5).value, 10)
  assert.equal(GlycolysisFormulas.nadh(5).value, 10)
  assert.equal(GlycolysisFormulas.netatp(5, 10).value, 10, 'net 2 ATP per glucose')
  assert.equal(GlycolysisFormulas.netatp(1, 10).value, 0, 'investment exceeds payoff, clamped to 0')
  assert.equal(GlycolysisFormulas.phosphorylation(5).value, 10)
  assert.equal(GlycolysisFormulas.pyruvate(5).value, 10, 'two pyruvate per glucose')
  assert.equal(GlycolysisFormulas.flux(600, 60).dst, 'biochemistry')
  assert.equal(hexFamiliesOf().get('glycolysis')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'glycolysis', program: ['flux'], params: [600, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `glycolysis.flux at ${uuid}`)
  uuidReceiptOf('glycolysis flux', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; flux 10, gluconeogenesis 5, glucoseconsumed 50, lactate 10, nadh 10, netatp 10, phosphorylation 10, pyruvate 10; crossing to biochemistry')
})
