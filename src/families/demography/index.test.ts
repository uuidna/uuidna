import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DemographyFormulas } from './index.js'
import '../../mcp/families.js'

test('demography: birthrate, deathrate, dependencyratio, doublingtime, lifeexpectancy, medianage, naturalincrease, sexratio — crossing to sociology', async (t) => {
  assert.equal(DemographyFormulas.birthrate(600, 50000).value, 12, 'twelve births per thousand')
  assert.equal(DemographyFormulas.deathrate(400, 50000).value, 8)
  assert.equal(DemographyFormulas.dependencyratio(600, 1000).value, 60, 'sixty dependents per hundred workers')
  assert.equal(DemographyFormulas.doublingtime(2).value, 35, 'rule of 70')
  assert.equal(DemographyFormulas.lifeexpectancy(60000, 800).value, 75)
  assert.equal(DemographyFormulas.medianage(40000, 1000).value, 40)
  assert.equal(DemographyFormulas.naturalincrease(600, 400).value, 200, 'births over deaths')
  assert.equal(DemographyFormulas.naturalincrease(400, 600).value, 0)
  assert.equal(DemographyFormulas.sexratio(5100, 5000).value, 102, 'men per hundred women')
  assert.equal(DemographyFormulas.birthrate(600, 50000).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('demography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'demography', program: ['birthrate'], params: [600, 50000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `demography.birthrate at ${uuid}`)
  uuidReceiptOf('demography birthrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; birthrate 12, deathrate 8, dependencyratio 60, doublingtime 35, lifeexpectancy 75, medianage 40, naturalincrease 200, sexratio 102; crossing to sociology')
})
