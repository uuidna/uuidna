import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { JewelryFormulas } from './index.js'
import '../../mcp/families.js'

test('jewelry: caratweight, facetcount, karatfineness, stonecombos, settingprongs, metalgrams, symmetryorderings, pricetotal — crossing to materials', async (t) => {
  assert.equal(JewelryFormulas.caratweight(5, 200).value, 1000)
  assert.equal(JewelryFormulas.facetcount(57, 1).value, 57)
  assert.equal(JewelryFormulas.karatfineness(18, 24).value, 75)
  assert.equal(JewelryFormulas.stonecombos(12, 3).value, 220)
  assert.equal(JewelryFormulas.settingprongs(4, 2).value, 6)
  assert.equal(JewelryFormulas.metalgrams(10, 5).value, 50)
  assert.equal(JewelryFormulas.symmetryorderings(4).value, 24)
  assert.equal(JewelryFormulas.pricetotal(2000, 3).value, 6000)
  assert.equal(JewelryFormulas.caratweight(5, 200).dst, 'materials')
  assert.equal(hexFamiliesOf().get('jewelry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'jewelry', program: ['caratweight'], params: [5, 200] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `jewelry.caratweight at ${uuid}`)
  uuidReceiptOf('jewelry caratweight', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; caratweight 1000, facetcount 57, karatfineness 75, stonecombos 220, settingprongs 6, metalgrams 50, symmetryorderings 24, pricetotal 6000; crossing to materials')
})
