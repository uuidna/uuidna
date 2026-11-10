import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CuisineFormulas } from './index.js'
import '../../mcp/families.js'

test('cuisine: cooked, hydration, portion, proof, ratio, reduction, scaling, temperature — crossing to nutrition', async (t) => {
  assert.equal(CuisineFormulas.cooked(75, 100).value, 75, 'cooked yield as a percentage')
  assert.equal(CuisineFormulas.hydration(650, 1000).value, 65, 'baker\'s hydration')
  assert.equal(CuisineFormulas.portion(2400, 8).value, 300, 'grams per guest')
  assert.equal(CuisineFormulas.proof(120, 24).value, 2880, 'fermentation proof proxy')
  assert.equal(CuisineFormulas.ratio(500, 1000).value, 50, 'fat to flour')
  assert.equal(CuisineFormulas.reduction(1000, 250).value, 75, 'reduced by three quarters')
  assert.equal(CuisineFormulas.scaling(150, 4).value, 600, 'four servings')
  assert.equal(CuisineFormulas.temperature(212).value, 100, 'boiling')
  assert.equal(CuisineFormulas.temperature(32).value, 0, 'freezing')
  assert.equal(CuisineFormulas.cooked(75, 100).dst, 'nutrition')
  assert.equal(hexFamiliesOf().get('cuisine')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cuisine', program: ['portion'], params: [2400, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `cuisine.portion at ${uuid}`)
  uuidReceiptOf('cuisine portion', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cooked 75, hydration 65, portion 300, proof 2880, ratio 50, reduction 75, scaling 600, temperature 100/0; crossing to nutrition')
})
