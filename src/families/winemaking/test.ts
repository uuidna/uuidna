import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WinemakingFormulas } from './index.js'
import '../../mcp/families.js'

test('winemaking: abv, brix, acidity, sulfite, yield, extraction, fermentation, blend — crossing to cuisine', async (t) => {
  assert.equal(WinemakingFormulas.abv(24, 6).value, 9, 'alcohol from the sugar drop')
  assert.equal(WinemakingFormulas.brix(240, 1000).value, 24, 'must at 24 °Brix')
  assert.equal(WinemakingFormulas.acidity(7, 1000).value, 7, 'grams per litre')
  assert.equal(WinemakingFormulas.sulfite(200, 50).value, 10000, 'SO₂ in milligrams')
  assert.equal(WinemakingFormulas.yield(5000, 650).value, 3250, 'litres from five tonnes')
  assert.equal(WinemakingFormulas.extraction(1000, 70).value, 700, 'juice from the crush')
  assert.equal(WinemakingFormulas.fermentation(24, 0, 12).value, 2, 'two °Brix a day')
  assert.equal(WinemakingFormulas.blend(60, 30, 10).value, 100, 'a hundred parts')
  assert.equal(WinemakingFormulas.abv(24, 6).dst, 'cuisine')
  assert.equal(hexFamiliesOf().get('winemaking')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'winemaking', program: ['yield'], params: [5000, 650] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3250, `winemaking.yield at ${uuid}`)
  uuidReceiptOf('winemaking yield', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; abv 9, brix 24, acidity 7, sulfite 10000, yield 3250, extraction 700, fermentation 2, blend 100; crossing to cuisine')
})
