import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BiodiversityFormulas } from './index.js'
import '../../mcp/families.js'

test('biodiversity: richness, evenness, shannon, simpson, endemism, turnover, abundance, rarity — crossing to ecology', async (t) => {
  assert.equal(BiodiversityFormulas.richness(42).value, 42, 'the species present')
  assert.equal(BiodiversityFormulas.evenness(1000, 10).value, 100, 'individuals per species')
  assert.equal(BiodiversityFormulas.shannon(25, 100).value, 25)
  assert.equal(BiodiversityFormulas.simpson(60, 100).value, 60, 'the dominant share')
  assert.equal(BiodiversityFormulas.endemism(30, 100).value, 30)
  assert.equal(BiodiversityFormulas.turnover(40, 100).value, 40)
  assert.equal(BiodiversityFormulas.abundance(1000, 25).value, 40, 'count per area')
  assert.equal(BiodiversityFormulas.rarity(15, 100).value, 15)
  assert.equal(BiodiversityFormulas.richness(42).dst, 'ecology')
  assert.equal(hexFamiliesOf().get('biodiversity')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'biodiversity', program: ['evenness'], params: [1000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `biodiversity.evenness at ${uuid}`)
  uuidReceiptOf('biodiversity evenness', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; richness 42, evenness 100, shannon 25, simpson 60, endemism 30, turnover 40, abundance 40, rarity 15; crossing to ecology')
})
