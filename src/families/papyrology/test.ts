import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PapyrologyFormulas } from './index.js'
import '../../mcp/families.js'

test('papyrology: fragments, joinpairs, columnorderings, linespercolumn, datingrange, recovery, scribalhands, subsetreadings — crossing to archaeology', async (t) => {
  assert.equal(PapyrologyFormulas.fragments(40, 20).value, 60)
  assert.equal(PapyrologyFormulas.joinpairs(40, 2).value, 780)
  assert.equal(PapyrologyFormulas.columnorderings(6).value, 720)
  assert.equal(PapyrologyFormulas.linespercolumn(600, 30).value, 20)
  assert.equal(PapyrologyFormulas.datingrange(300, 100).value, 200)
  assert.equal(PapyrologyFormulas.recovery(60, 100).value, 60)
  assert.equal(PapyrologyFormulas.scribalhands(3, 2).value, 6)
  assert.equal(PapyrologyFormulas.subsetreadings(5).value, 32)
  assert.equal(PapyrologyFormulas.fragments(40, 20).dst, 'archaeology')
  assert.equal(hexFamiliesOf().get('papyrology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'papyrology', program: ['fragments'], params: [40, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `papyrology.fragments at ${uuid}`)
  uuidReceiptOf('papyrology fragments', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fragments 60, joinpairs 780, columnorderings 720, linespercolumn 20, datingrange 200, recovery 60, scribalhands 6, subsetreadings 32; crossing to archaeology')
})
