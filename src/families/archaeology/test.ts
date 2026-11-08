import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ArchaeologyFormulas } from './index.js'
import '../../mcp/families.js'

test('archaeology: carbon, stratum, age, artifacts, seriation, typology, excavation, dating — crossing to cern', async (t) => {
  assert.equal(ArchaeologyFormulas.carbon(3).value, 17190, 'three half-lives of carbon-14')
  assert.equal(ArchaeologyFormulas.stratum(5, 20).value, 100)
  assert.equal(ArchaeologyFormulas.age(1200, 2024).value, 824, 'years since the find')
  assert.equal(ArchaeologyFormulas.artifacts(150, 5).value, 30, 'finds per square metre')
  assert.equal(ArchaeologyFormulas.seriation(100, 450).value, 350)
  assert.equal(ArchaeologyFormulas.typology(30, 120).value, 25)
  assert.equal(ArchaeologyFormulas.excavation(1000, 50).value, 20, 'days to dig')
  assert.equal(ArchaeologyFormulas.dating(25, 100).value, 25)
  assert.equal(ArchaeologyFormulas.carbon(3).dst, 'cern')
  assert.equal(hexFamiliesOf().get('archaeology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'archaeology', program: ['stratum'], params: [5, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `archaeology.stratum at ${uuid}`)
  uuidReceiptOf('archaeology stratum', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; carbon 17190, stratum 100, age 824, artifacts 30, seriation 350, typology 25, excavation 20, dating 25; crossing to cern')
})
