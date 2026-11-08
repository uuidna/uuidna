import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ToolingFormulas } from './index.js'
import '../../mcp/families.js'

test('tooling: life, wear, feed, speed, depth, cavities, maintenance, utilization — crossing to mechanical', async (t) => {
  assert.equal(ToolingFormulas.life(10000, 250).value, 40, 'parts per tool before end of life')
  assert.equal(ToolingFormulas.wear(500, 3).value, 1500)
  assert.equal(ToolingFormulas.feed(2000, 2).value, 4000, 'table feed mm/min')
  assert.equal(ToolingFormulas.speed(1000, 314).value, 314, 'surface speed m/min')
  assert.equal(ToolingFormulas.depth(100, 8).value, 13, 'depth per pass')
  assert.equal(ToolingFormulas.cavities(1200, 150).value, 8)
  assert.equal(ToolingFormulas.maintenance(5000, 500).value, 10)
  assert.equal(ToolingFormulas.utilization(18, 24).value, 75, 'utilization percent')
  assert.equal(ToolingFormulas.life(10000, 250).dst, 'mechanical')
  assert.equal(hexFamiliesOf().get('tooling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tooling', program: ['life'], params: [10000, 250] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `tooling.life at ${uuid}`)
  uuidReceiptOf('tooling life', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; life 40, wear 1500, feed 4000, speed 314, depth 13, cavities 8, maintenance 10, utilization 75; crossing to mechanical')
})
