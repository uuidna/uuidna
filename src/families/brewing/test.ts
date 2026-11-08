import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BrewingFormulas } from './index.js'
import '../../mcp/families.js'

test('brewing: abv, attenuation, ibu, srm, efficiency, gravity, carbonation, mash — crossing to cuisine', async (t) => {
  assert.equal(BrewingFormulas.abv(1075, 1000).value, 1000, 'abv x100 proxy from the gravity drop')
  assert.equal(BrewingFormulas.attenuation(100, 20).value, 80, 'apparent attenuation percent')
  assert.equal(BrewingFormulas.ibu(5, 100).value, 500)
  assert.equal(BrewingFormulas.srm(400, 10).value, 40, 'colour proxy')
  assert.equal(BrewingFormulas.efficiency(75, 100).value, 75, 'brewhouse efficiency percent')
  assert.equal(BrewingFormulas.gravity(50, 10).value, 5000, 'wort gravity points')
  assert.equal(BrewingFormulas.carbonation(100, 10).value, 10)
  assert.equal(BrewingFormulas.mash(500, 1000).value, 50, 'mash ratio percent')
  assert.equal(BrewingFormulas.attenuation(100, 20).dst, 'cuisine')
  assert.equal(hexFamiliesOf().get('brewing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'brewing', program: ['ibu'], params: [5, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `brewing.ibu at ${uuid}`)
  uuidReceiptOf('brewing ibu', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; abv 1000, attenuation 80, ibu 500, srm 40, efficiency 75, gravity 5000, carbonation 10, mash 50; crossing to cuisine')
})
