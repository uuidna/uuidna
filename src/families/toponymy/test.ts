import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ToponymyFormulas } from './index.js'
import '../../mcp/families.js'

test('toponymy: placecount, etymologypaths, elementpairs, languagelayers, suffixcombos, distributionsubsets, densityper, variantspellings — crossing to geography', async (t) => {
  assert.equal(ToponymyFormulas.placecount(500, 10).value, 5000)
  assert.equal(ToponymyFormulas.etymologypaths(4).value, 24)
  assert.equal(ToponymyFormulas.elementpairs(12, 2).value, 66)
  assert.equal(ToponymyFormulas.languagelayers(3, 2).value, 5)
  assert.equal(ToponymyFormulas.suffixcombos(10, 3).value, 120)
  assert.equal(ToponymyFormulas.distributionsubsets(5).value, 32)
  assert.equal(ToponymyFormulas.densityper(5000, 100).value, 50)
  assert.equal(ToponymyFormulas.variantspellings(12, 3).value, 36)
  assert.equal(ToponymyFormulas.placecount(500, 10).dst, 'geography')
  assert.equal(hexFamiliesOf().get('toponymy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'toponymy', program: ['placecount'], params: [500, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5000, `toponymy.placecount at ${uuid}`)
  uuidReceiptOf('toponymy placecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; placecount 5000, etymologypaths 24, elementpairs 66, languagelayers 5, suffixcombos 120, distributionsubsets 32, densityper 50, variantspellings 36; crossing to geography')
})
