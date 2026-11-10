import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BioindicatorFormulas } from './index.js'
import '../../mcp/families.js'

test('bioindicator: abundanceratio, biotic, diversityindex, evenness, pollutionload, sensitivity, speciesrichness, tolerancescore — crossing to ecology', async (t) => {
  assert.equal(BioindicatorFormulas.abundanceratio(400, 1000).value, 40, 'two-fifths of the community')
  assert.equal(BioindicatorFormulas.biotic(350, 50).value, 7, 'average biotic score')
  assert.equal(BioindicatorFormulas.diversityindex(25, 50).value, 50)
  assert.equal(BioindicatorFormulas.evenness(45, 60).value, 75)
  assert.equal(BioindicatorFormulas.pollutionload(50, 200).value, 10000)
  assert.equal(BioindicatorFormulas.sensitivity(40, 15).value, 25, 'sensitive species lost')
  assert.equal(BioindicatorFormulas.sensitivity(15, 40).value, 0)
  assert.equal(BioindicatorFormulas.speciesrichness(12, 8, 5).value, 25, 'distinct taxa across three strata')
  assert.equal(BioindicatorFormulas.tolerancescore(12, 40).value, 30)
  assert.equal(BioindicatorFormulas.abundanceratio(400, 1000).dst, 'ecology')
  assert.equal(hexFamiliesOf().get('bioindicator')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'bioindicator', program: ['diversityindex'], params: [25, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `bioindicator.diversityindex at ${uuid}`)
  uuidReceiptOf('bioindicator diversityindex', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; abundanceratio 40, biotic 7, diversityindex 50, evenness 75, pollutionload 10000, sensitivity 25, speciesrichness 25, tolerancescore 30; crossing to ecology')
})
