import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CensusFormulas } from './index.js'
import '../../mcp/families.js'

test('census: density, growth, medianage, dependency, participation, response, undercount, apportionment — crossing to sociology', async (t) => {
  assert.equal(CensusFormulas.density(60000, 30).value, 2000, 'people per unit of land')
  assert.equal(CensusFormulas.growth(1100, 1000).value, 10, 'ten percent growth')
  assert.equal(CensusFormulas.medianage(3500, 100).value, 35)
  assert.equal(CensusFormulas.dependency(500, 1000).value, 50)
  assert.equal(CensusFormulas.participation(630, 1000).value, 63, 'labour force participation rate')
  assert.equal(CensusFormulas.response(750, 1000).value, 75)
  assert.equal(CensusFormulas.undercount(1000, 970).value, 30, 'thirty people missed')
  assert.equal(CensusFormulas.undercount(900, 1000).value, 0)
  assert.equal(CensusFormulas.apportionment(60000, 120).value, 500)
  assert.equal(CensusFormulas.density(60000, 30).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('census')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'census', program: ['density'], params: [60000, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2000, `census.density at ${uuid}`)
  uuidReceiptOf('census density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; density 2000, growth 10, medianage 35, dependency 50, participation 63, response 75, undercount 30, apportionment 500; crossing to sociology')
})
