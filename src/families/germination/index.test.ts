import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GerminationFormulas } from './index.js'
import '../../mcp/families.js'

test('germination: rate, meantime, energy, viability, speedindex, uniformity, finalpercent, vigorindex — crossing to botany', async (t) => {
  assert.equal(GerminationFormulas.rate(200, 10).value, 20, 'twenty seeds a day')
  assert.equal(GerminationFormulas.meantime(500, 100).value, 5, 'five days to emerge on average')
  assert.equal(GerminationFormulas.energy(80, 100).value, 80)
  assert.equal(GerminationFormulas.viability(95, 100).value, 95)
  assert.equal(GerminationFormulas.speedindex(50, 10).value, 500, 'a fast push')
  assert.equal(GerminationFormulas.uniformity(14, 3).value, 11, 'eleven days of spread')
  assert.equal(GerminationFormulas.uniformity(3, 14).value, 0)
  assert.equal(GerminationFormulas.finalpercent(90, 100).value, 90)
  assert.equal(GerminationFormulas.vigorindex(85, 12).value, 1020)
  assert.equal(GerminationFormulas.rate(200, 10).dst, 'botany')
  assert.equal(hexFamiliesOf().get('germination')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'germination', program: ['rate'], params: [200, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `germination.rate at ${uuid}`)
  uuidReceiptOf('germination rate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rate 20, meantime 5, energy 80, viability 95, speedindex 500, uniformity 11, finalpercent 90, vigorindex 1020; crossing to botany')
})
