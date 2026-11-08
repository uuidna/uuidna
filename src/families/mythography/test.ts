import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MythographyFormulas } from './index.js'
import '../../mcp/families.js'

test('mythography: mythcount, variantpaths, motifpairs, typeindex, culturesubsets, diffusionlinks, archetypecombos, versioncount — crossing to anthropology', async (t) => {
  assert.equal(MythographyFormulas.mythcount(200, 100).value, 300)
  assert.equal(MythographyFormulas.variantpaths(5).value, 120)
  assert.equal(MythographyFormulas.motifpairs(20, 2).value, 190)
  assert.equal(MythographyFormulas.typeindex(50, 10).value, 500)
  assert.equal(MythographyFormulas.culturesubsets(6).value, 64)
  assert.equal(MythographyFormulas.diffusionlinks(12, 5).value, 60)
  assert.equal(MythographyFormulas.archetypecombos(12, 3).value, 220)
  assert.equal(MythographyFormulas.versioncount(40, 20).value, 60)
  assert.equal(MythographyFormulas.mythcount(200, 100).dst, 'anthropology')
  assert.equal(hexFamiliesOf().get('mythography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mythography', program: ['mythcount'], params: [200, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `mythography.mythcount at ${uuid}`)
  uuidReceiptOf('mythography mythcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; mythcount 300, variantpaths 120, motifpairs 190, typeindex 500, culturesubsets 64, diffusionlinks 60, archetypecombos 220, versioncount 60; crossing to anthropology')
})
