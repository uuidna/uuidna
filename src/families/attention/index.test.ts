import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AttentionFormulas } from './index.js'
import '../../mcp/families.js'

test('attention: focus, vigilance, distraction, span, switching, selective, sustained, workload — crossing to psychology', async (t) => {
  assert.equal(AttentionFormulas.focus(45, 60).value, 75, 'three quarters on task')
  assert.equal(AttentionFormulas.vigilance(8, 10).value, 80)
  assert.equal(AttentionFormulas.distraction(12, 4).value, 3, 'three interruptions an hour')
  assert.equal(AttentionFormulas.span(25).value, 25)
  assert.equal(AttentionFormulas.switching(20, 5).value, 4)
  assert.equal(AttentionFormulas.selective(30, 100).value, 30)
  assert.equal(AttentionFormulas.sustained(90, 120).value, 75)
  assert.equal(AttentionFormulas.workload(80, 100).value, 80)
  assert.equal(AttentionFormulas.focus(45, 60).dst, 'psychology')
  assert.equal(hexFamiliesOf().get('attention')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'attention', program: ['focus'], params: [45, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `attention.focus at ${uuid}`)
  uuidReceiptOf('attention focus', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; focus 75, vigilance 80, distraction 3, span 25, switching 4, selective 30, sustained 75, workload 80; crossing to psychology')
})
