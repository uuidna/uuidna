import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PrintmakingFormulas } from './index.js'
import '../../mcp/families.js'

test('printmaking: editionsize, platepasses, registrationlayers, inkcombos, impressionorderings, pressuresetting, colorsubsets, yieldratio — crossing to materials', async (t) => {
  assert.equal(PrintmakingFormulas.editionsize(50, 1).value, 50)
  assert.equal(PrintmakingFormulas.platepasses(4, 2).value, 6)
  assert.equal(PrintmakingFormulas.registrationlayers(4, 0).value, 4)
  assert.equal(PrintmakingFormulas.inkcombos(8, 2).value, 28)
  assert.equal(PrintmakingFormulas.impressionorderings(4).value, 24)
  assert.equal(PrintmakingFormulas.pressuresetting(100, 4).value, 25)
  assert.equal(PrintmakingFormulas.colorsubsets(5).value, 32)
  assert.equal(PrintmakingFormulas.yieldratio(90, 100).value, 90)
  assert.equal(PrintmakingFormulas.editionsize(50, 1).dst, 'materials')
  assert.equal(hexFamiliesOf().get('printmaking')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'printmaking', program: ['editionsize'], params: [50, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `printmaking.editionsize at ${uuid}`)
  uuidReceiptOf('printmaking editionsize', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; editionsize 50, platepasses 6, registrationlayers 4, inkcombos 28, impressionorderings 24, pressuresetting 25, colorsubsets 32, yieldratio 90; crossing to materials')
})
