import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PatristicsFormulas } from './index.js'
import '../../mcp/families.js'

test('patristics: fathercount, worksorderings, councilcombos, influencepairs, eracount, translationways, citationtotal, orthodoxyratio — crossing to sociology', async (t) => {
  assert.equal(PatristicsFormulas.fathercount(8, 4).value, 12)
  assert.equal(PatristicsFormulas.worksorderings(6).value, 720)
  assert.equal(PatristicsFormulas.councilcombos(7, 3).value, 35)
  assert.equal(PatristicsFormulas.influencepairs(12, 2).value, 66)
  assert.equal(PatristicsFormulas.eracount(3, 2).value, 5)
  assert.equal(PatristicsFormulas.translationways(6, 2).value, 30)
  assert.equal(PatristicsFormulas.citationtotal(340, 10).value, 3400)
  assert.equal(PatristicsFormulas.orthodoxyratio(90, 100).value, 90)
  assert.equal(PatristicsFormulas.fathercount(8, 4).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('patristics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'patristics', program: ['fathercount'], params: [8, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `patristics.fathercount at ${uuid}`)
  uuidReceiptOf('patristics fathercount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fathercount 12, worksorderings 720, councilcombos 35, influencepairs 66, eracount 5, translationways 30, citationtotal 3400, orthodoxyratio 90; crossing to sociology')
})
