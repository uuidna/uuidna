import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HorticultureFormulas } from './index.js'
import '../../mcp/families.js'

test('horticulture: spacing, germination, pruning, irrigation, fertilizer, ph, lightdays, propagation — crossing to botany', async (t) => {
  assert.equal(HorticultureFormulas.spacing(1000, 40).value, 25, 'ground per plant')
  assert.equal(HorticultureFormulas.germination(90, 100).value, 90)
  assert.equal(HorticultureFormulas.pruning(30, 120).value, 25)
  assert.equal(HorticultureFormulas.irrigation(5000, 100).value, 50)
  assert.equal(HorticultureFormulas.fertilizer(800, 100).value, 8)
  assert.equal(HorticultureFormulas.ph(65, 100).value, 65)
  assert.equal(HorticultureFormulas.lightdays(14, 90).value, 1260, 'light banked over the season')
  assert.equal(HorticultureFormulas.propagation(18, 24).value, 75)
  assert.equal(HorticultureFormulas.spacing(1000, 40).dst, 'botany')
  assert.equal(hexFamiliesOf().get('horticulture')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'horticulture', program: ['spacing'], params: [1000, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `horticulture.spacing at ${uuid}`)
  uuidReceiptOf('horticulture spacing', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; spacing 25, germination 90, pruning 25, irrigation 50, fertilizer 8, ph 65, lightdays 1260, propagation 75; crossing to botany')
})
