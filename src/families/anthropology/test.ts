import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AnthropologyFormulas } from './index.js'
import '../../mcp/families.js'

test('anthropology: kinship, diffusion, lineage, artifacts, stratigraphy, language, migration, ritual — crossing to sociology', async (t) => {
  assert.equal(AnthropologyFormulas.kinship(120, 4).value, 30, 'kin per generation')
  assert.equal(AnthropologyFormulas.diffusion(30, 120).value, 25)
  assert.equal(AnthropologyFormulas.lineage(900, 3).value, 300, 'descendants per founder')
  assert.equal(AnthropologyFormulas.artifacts(500, 10).value, 50)
  assert.equal(AnthropologyFormulas.stratigraphy(240, 8).value, 30)
  assert.equal(AnthropologyFormulas.language(60, 200).value, 30, 'cognate %')
  assert.equal(AnthropologyFormulas.migration(1000, 25).value, 40, 'distance per generation')
  assert.equal(AnthropologyFormulas.ritual(9, 12).value, 75)
  assert.equal(AnthropologyFormulas.kinship(120, 4).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('anthropology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'anthropology', program: ['lineage'], params: [900, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `anthropology.lineage at ${uuid}`)
  uuidReceiptOf('anthropology lineage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; kinship 30, diffusion 25, lineage 300, artifacts 50, stratigraphy 30, language 30, migration 40, ritual 75; crossing to sociology')
})
