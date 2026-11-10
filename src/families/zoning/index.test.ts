import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ZoningFormulas } from './index.js'
import '../../mcp/families.js'

test('zoning: far, coverage, setback, density, height, parking, openspace, lotsize — crossing to governance', async (t) => {
  assert.equal(ZoningFormulas.far(15000, 10000).value, 150, 'a 1.5 floor-area ratio as a percentage')
  assert.equal(ZoningFormulas.coverage(4000, 10000).value, 40, 'footprint covers 40% of the lot')
  assert.equal(ZoningFormulas.setback(100, 20, 15).value, 65, 'buildable depth after setbacks')
  assert.equal(ZoningFormulas.density(120, 4).value, 30, 'thirty units per acre')
  assert.equal(ZoningFormulas.height(60, 12).value, 5, 'five stories under the cap')
  assert.equal(ZoningFormulas.parking(50, 2).value, 100, 'two spaces per unit')
  assert.equal(ZoningFormulas.openspace(10000, 4000).value, 6000)
  assert.equal(ZoningFormulas.lotsize(50000, 5000).value, 10, 'ten lots from the parcel')
  assert.equal(ZoningFormulas.density(120, 4).dst, 'governance')
  assert.equal(hexFamiliesOf().get('zoning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'zoning', program: ['density'], params: [120, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `zoning.density at ${uuid}`)
  uuidReceiptOf('zoning density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; far 150, coverage 40, setback 65, density 30, height 5, parking 100, openspace 6000, lotsize 10; crossing to governance')
})
