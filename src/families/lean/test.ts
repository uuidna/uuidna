import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LeanFormulas } from './index.js'
import '../../mcp/families.js'

test('lean: valueadd, waste, flow, pull, kanban, changeover, oee, leadtime — crossing to manufacturing', async (t) => {
  assert.equal(LeanFormulas.valueadd(30, 120).value, 25, 'a quarter of the cycle adds value')
  assert.equal(LeanFormulas.waste(120, 30).value, 90, 'ninety units of waste left')
  assert.equal(LeanFormulas.flow(1000, 20).value, 50, 'fifty units a day')
  assert.equal(LeanFormulas.pull(100, 40).value, 60, 'sixty to replenish')
  assert.equal(LeanFormulas.kanban(120, 5, 20).value, 30, 'thirty cards for the cell')
  assert.equal(LeanFormulas.changeover(8, 15).value, 120, 'two hours of setup')
  assert.equal(LeanFormulas.oee(90, 95, 99).value, 84)
  assert.equal(LeanFormulas.leadtime(10, 30, 5).value, 45, 'forty-five minutes end to end')
  assert.equal(LeanFormulas.valueadd(30, 120).dst, 'manufacturing')
  assert.equal(hexFamiliesOf().get('lean')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'lean', program: ['kanban'], params: [120, 5, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `lean.kanban at ${uuid}`)
  uuidReceiptOf('lean kanban', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; valueadd 25, waste 90, flow 50, pull 60, kanban 30, changeover 120, oee 84, leadtime 45; crossing to manufacturing')
})
