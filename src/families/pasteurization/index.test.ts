import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PasteurizationFormulas } from './index.js'
import '../../mcp/families.js'

test('pasteurization: holdtime, temperature, lethality, dvalue, zvalue, reduction, throughput, cooling — crossing to chemistry', async (t) => {
  assert.equal(PasteurizationFormulas.holdtime(300, 20).value, 15, 'seconds in the holding tube')
  assert.equal(PasteurizationFormulas.temperature(72, 3).value, 75, 'HTST final temperature')
  assert.equal(PasteurizationFormulas.lethality(12, 15).value, 180, 'pasteurization units')
  assert.equal(PasteurizationFormulas.dvalue(60, 6).value, 10, 'seconds per log')
  assert.equal(PasteurizationFormulas.zvalue(80, 72).value, 8)
  assert.equal(PasteurizationFormulas.reduction(45, 10).value, 4, 'log reductions achieved')
  assert.equal(PasteurizationFormulas.throughput(500, 8).value, 4000)
  assert.equal(PasteurizationFormulas.cooling(75, 4).value, 71)
  assert.equal(PasteurizationFormulas.cooling(4, 75).value, 0)
  assert.equal(PasteurizationFormulas.holdtime(300, 20).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('pasteurization')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pasteurization', program: ['holdtime'], params: [300, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `pasteurization.holdtime at ${uuid}`)
  uuidReceiptOf('pasteurization holdtime', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; holdtime 15, temperature 75, lethality 180, dvalue 10, zvalue 8, reduction 4, throughput 4000, cooling 71; crossing to chemistry')
})
