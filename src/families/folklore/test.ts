import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FolkloreFormulas } from './index.js'
import '../../mcp/families.js'

test('folklore: taletypes, motifcombos, variantorderings, transmissionpaths, regionsubsets, performercount, diffusionrate, collectionsize — crossing to sociology', async (t) => {
  assert.equal(FolkloreFormulas.taletypes(200, 100).value, 300)
  assert.equal(FolkloreFormulas.motifcombos(20, 3).value, 1140)
  assert.equal(FolkloreFormulas.variantorderings(5).value, 120)
  assert.equal(FolkloreFormulas.transmissionpaths(8, 3).value, 336)
  assert.equal(FolkloreFormulas.regionsubsets(6).value, 64)
  assert.equal(FolkloreFormulas.performercount(12, 5).value, 60)
  assert.equal(FolkloreFormulas.diffusionrate(60, 100).value, 60)
  assert.equal(FolkloreFormulas.collectionsize(300, 200).value, 500)
  assert.equal(FolkloreFormulas.taletypes(200, 100).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('folklore')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'folklore', program: ['taletypes'], params: [200, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `folklore.taletypes at ${uuid}`)
  uuidReceiptOf('folklore taletypes', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; taletypes 300, motifcombos 1140, variantorderings 120, transmissionpaths 336, regionsubsets 64, performercount 60, diffusionrate 60, collectionsize 500; crossing to sociology')
})
