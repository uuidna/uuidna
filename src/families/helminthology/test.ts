import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HelminthologyFormulas } from './index.js'
import '../../mcp/families.js'

test('helminthology: eggcount, wormburden, prevalence, lifecyclestages, hostcombos, treatmentefficacy, fecundity, transmissionpaths — crossing to microbiology', async (t) => {
  assert.equal(HelminthologyFormulas.eggcount(500, 10).value, 5000)
  assert.equal(HelminthologyFormulas.wormburden(5000, 50).value, 100)
  assert.equal(HelminthologyFormulas.prevalence(30, 100).value, 30)
  assert.equal(HelminthologyFormulas.lifecyclestages(4, 1).value, 5)
  assert.equal(HelminthologyFormulas.hostcombos(6, 2).value, 15)
  assert.equal(HelminthologyFormulas.treatmentefficacy(95, 100).value, 95)
  assert.equal(HelminthologyFormulas.fecundity(200, 20).value, 4000)
  assert.equal(HelminthologyFormulas.transmissionpaths(5, 2).value, 20)
  assert.equal(HelminthologyFormulas.eggcount(500, 10).dst, 'microbiology')
  assert.equal(hexFamiliesOf().get('helminthology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'helminthology', program: ['eggcount'], params: [500, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5000, `helminthology.eggcount at ${uuid}`)
  uuidReceiptOf('helminthology eggcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; eggcount 5000, wormburden 100, prevalence 30, lifecyclestages 5, hostcombos 15, treatmentefficacy 95, fecundity 4000, transmissionpaths 20; crossing to microbiology')
})
