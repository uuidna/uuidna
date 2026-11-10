import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BiogeographyFormulas } from './index.js'
import '../../mcp/families.js'

test('biogeography: speciescount, endemismratio, rangesize, dispersalpaths, islandpairs, latitudegradient, habitatsubsets, turnoverrate — crossing to geography', async (t) => {
  assert.equal(BiogeographyFormulas.speciescount(500, 10).value, 5000)
  assert.equal(BiogeographyFormulas.endemismratio(30, 100).value, 30)
  assert.equal(BiogeographyFormulas.rangesize(200, 300).value, 60000)
  assert.equal(BiogeographyFormulas.dispersalpaths(5).value, 120)
  assert.equal(BiogeographyFormulas.islandpairs(15, 2).value, 105)
  assert.equal(BiogeographyFormulas.latitudegradient(1000, 10).value, 100)
  assert.equal(BiogeographyFormulas.habitatsubsets(6).value, 64)
  assert.equal(BiogeographyFormulas.turnoverrate(40, 100).value, 40)
  assert.equal(BiogeographyFormulas.speciescount(500, 10).dst, 'geography')
  assert.equal(hexFamiliesOf().get('biogeography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'biogeography', program: ['speciescount'], params: [500, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5000, `biogeography.speciescount at ${uuid}`)
  uuidReceiptOf('biogeography speciescount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; speciescount 5000, endemismratio 30, rangesize 60000, dispersalpaths 120, islandpairs 105, latitudegradient 100, habitatsubsets 64, turnoverrate 40; crossing to geography')
})
