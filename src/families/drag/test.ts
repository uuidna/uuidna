import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DragFormulas } from './index.js'
import '../../mcp/families.js'

test('drag: force, coefficient, induced, parasitic, dynamicpressure, terminalvelocity, frontalarea, reynolds — crossing to aerodynamics', async (t) => {
  assert.equal(DragFormulas.force(1000, 2, 5).value, 10, 'drag force from q, cd, area')
  assert.equal(DragFormulas.coefficient(50, 100).value, 500)
  assert.equal(DragFormulas.induced(30, 6).value, 150, 'induced drag from lift')
  assert.equal(DragFormulas.parasitic(20, 15).value, 35)
  assert.equal(DragFormulas.dynamicpressure(2, 10).value, 100, 'half rho v squared')
  assert.equal(DragFormulas.terminalvelocity(1000, 25).value, 40)
  assert.equal(DragFormulas.frontalarea(12, 5).value, 60)
  assert.equal(DragFormulas.reynolds(100, 3, 2).value, 150, 'Reynolds number of the flow')
  assert.equal(DragFormulas.force(1000, 2, 5).dst, 'aerodynamics')
  assert.equal(hexFamiliesOf().get('drag')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'drag', program: ['force'], params: [1000, 2, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `drag.force at ${uuid}`)
  uuidReceiptOf('drag force', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; force 10, coefficient 500, induced 150, parasitic 35, dynamicpressure 100, terminalvelocity 40, frontalarea 60, reynolds 150; crossing to aerodynamics')
})
