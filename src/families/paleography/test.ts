import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PaleographyFormulas } from './index.js'
import '../../mcp/families.js'

test('paleography: letterforms, scriptorderings, ligaturepairs, abbreviationsubsets, dateestimate, handcount, minusculeratio, graphemecombos — crossing to linguistics', async (t) => {
  assert.equal(PaleographyFormulas.letterforms(26, 4).value, 104)
  assert.equal(PaleographyFormulas.scriptorderings(5).value, 120)
  assert.equal(PaleographyFormulas.ligaturepairs(15, 2).value, 105)
  assert.equal(PaleographyFormulas.abbreviationsubsets(6).value, 64)
  assert.equal(PaleographyFormulas.dateestimate(1200, 800).value, 400)
  assert.equal(PaleographyFormulas.handcount(3, 2).value, 5)
  assert.equal(PaleographyFormulas.minusculeratio(70, 100).value, 70)
  assert.equal(PaleographyFormulas.graphemecombos(22, 3).value, 1540)
  assert.equal(PaleographyFormulas.letterforms(26, 4).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('paleography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'paleography', program: ['letterforms'], params: [26, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 104, `paleography.letterforms at ${uuid}`)
  uuidReceiptOf('paleography letterforms', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; letterforms 104, scriptorderings 120, ligaturepairs 105, abbreviationsubsets 64, dateestimate 400, handcount 5, minusculeratio 70, graphemecombos 1540; crossing to linguistics')
})
