import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BotanyFormulas } from './index.js'
import '../../mcp/families.js'

test('botany: photosynthesis, germination, transpiration, growth, leafarea, chlorophyll, cropyield, pollination — crossing to agriculture', async (t) => {
  assert.equal(BotanyFormulas.photosynthesis(10, 5).value, 50, 'light captured into sugar')
  assert.equal(BotanyFormulas.germination(80, 100).value, 80)
  assert.equal(BotanyFormulas.transpiration(20, 3).value, 60)
  assert.equal(BotanyFormulas.growth(150, 40).value, 110, 'biomass gained')
  assert.equal(BotanyFormulas.growth(40, 150).value, 0, 'no negative growth')
  assert.equal(BotanyFormulas.leafarea(12, 5).value, 60)
  assert.equal(BotanyFormulas.chlorophyll(75, 100).value, 75)
  assert.equal(BotanyFormulas.cropyield(5000, 20).value, 250, 'yield per field')
  assert.equal(BotanyFormulas.pollination(90, 120).value, 75)
  assert.equal(BotanyFormulas.photosynthesis(10, 5).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('botany')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'botany', program: ['leafarea'], params: [12, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `botany.leafarea at ${uuid}`)
  uuidReceiptOf('botany leafarea', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; photosynthesis 50, germination 80, transpiration 60, growth 110, leafarea 60, chlorophyll 75, cropyield 250, pollination 75; crossing to agriculture')
})
