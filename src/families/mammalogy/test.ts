import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MammalogyFormulas } from './index.js'
import '../../mcp/families.js'

test('mammalogy: gestation, metabolism, homerange, litter, lactation, territory, thermoneutral, survival — crossing to zoology', async (t) => {
  assert.equal(MammalogyFormulas.gestation(280).value, 280, 'days carried')
  assert.equal(MammalogyFormulas.metabolism(70, 3).value, 210)
  assert.equal(MammalogyFormulas.homerange(70, 4).value, 280)
  assert.equal(MammalogyFormulas.litter(12, 3).value, 4, 'young per birth')
  assert.equal(MammalogyFormulas.lactation(6000, 60).value, 100)
  assert.equal(MammalogyFormulas.territory(100, 25).value, 4)
  assert.equal(MammalogyFormulas.thermoneutral(37, 20).value, 17, 'the gap to the air')
  assert.equal(MammalogyFormulas.thermoneutral(20, 37).value, 0)
  assert.equal(MammalogyFormulas.survival(80, 100).value, 80, 'four in five live')
  assert.equal(MammalogyFormulas.gestation(280).dst, 'zoology')
  assert.equal(hexFamiliesOf().get('mammalogy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mammalogy', program: ['territory'], params: [100, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `mammalogy.territory at ${uuid}`)
  uuidReceiptOf('mammalogy territory', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gestation 280, metabolism 210, homerange 280, litter 4, lactation 100, territory 4, thermoneutral 17, survival 80; crossing to zoology')
})
