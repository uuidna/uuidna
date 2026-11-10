import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EnzymologyFormulas } from './index.js'
import '../../mcp/families.js'

test('enzymology: michaelis, velocity, turnover, specificity, inhibition, activity, catalyticefficiency, substrate — crossing to biochemistry', async (t) => {
  assert.equal(EnzymologyFormulas.michaelis(100, 50, 50).value, 50, 'half-saturation gives half Vmax')
  assert.equal(EnzymologyFormulas.velocity(6000, 60).value, 100, 'product per unit time')
  assert.equal(EnzymologyFormulas.turnover(1000, 5).value, 200)
  assert.equal(EnzymologyFormulas.specificity(200, 4).value, 50)
  assert.equal(EnzymologyFormulas.inhibition(100, 25).value, 75, 'a quarter of velocity lost')
  assert.equal(EnzymologyFormulas.activity(50, 20).value, 1000)
  assert.equal(EnzymologyFormulas.catalyticefficiency(200, 4).value, 50000)
  assert.equal(EnzymologyFormulas.substrate(1000, 400).value, 600)
  assert.equal(EnzymologyFormulas.michaelis(100, 50, 50).dst, 'biochemistry')
  assert.equal(hexFamiliesOf().get('enzymology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'enzymology', program: ['michaelis'], params: [100, 50, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `enzymology.michaelis at ${uuid}`)
  uuidReceiptOf('enzymology michaelis', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; michaelis 50, velocity 100, turnover 200, specificity 50, inhibition 75, activity 1000, catalyticefficiency 50000, substrate 600; crossing to biochemistry')
})
