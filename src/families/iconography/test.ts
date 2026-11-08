import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { IconographyFormulas } from './index.js'
import '../../mcp/families.js'

test('iconography: symbolcount, attributepairs, gesturetypes, colorsubsets, compositionorderings, haloforms, motifcombos, canonratio — crossing to anthropology', async (t) => {
  assert.equal(IconographyFormulas.symbolcount(12, 8).value, 20)
  assert.equal(IconographyFormulas.attributepairs(12, 2).value, 66)
  assert.equal(IconographyFormulas.gesturetypes(5, 3).value, 15)
  assert.equal(IconographyFormulas.colorsubsets(6).value, 64)
  assert.equal(IconographyFormulas.compositionorderings(5).value, 120)
  assert.equal(IconographyFormulas.haloforms(3, 2).value, 5)
  assert.equal(IconographyFormulas.motifcombos(10, 3).value, 120)
  assert.equal(IconographyFormulas.canonratio(80, 100).value, 80)
  assert.equal(IconographyFormulas.symbolcount(12, 8).dst, 'anthropology')
  assert.equal(hexFamiliesOf().get('iconography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'iconography', program: ['symbolcount'], params: [12, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `iconography.symbolcount at ${uuid}`)
  uuidReceiptOf('iconography symbolcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; symbolcount 20, attributepairs 66, gesturetypes 15, colorsubsets 64, compositionorderings 120, haloforms 5, motifcombos 120, canonratio 80; crossing to anthropology')
})
