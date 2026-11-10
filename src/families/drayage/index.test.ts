import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DrayageFormulas } from './index.js'
import '../../mcp/families.js'

test('drayage: costpermove, turntime, containersperday, chassisutilization, waittime, milesperload, demurrage, dualmoves — crossing to supplychain', async (t) => {
  assert.equal(DrayageFormulas.costpermove(150, 4).value, 600)
  assert.equal(DrayageFormulas.turntime(240, 4).value, 60)
  assert.equal(DrayageFormulas.containersperday(96, 8).value, 12)
  assert.equal(DrayageFormulas.chassisutilization(80, 100).value, 80)
  assert.equal(DrayageFormulas.waittime(180, 120).value, 60)
  assert.equal(DrayageFormulas.milesperload(400, 4).value, 100)
  assert.equal(DrayageFormulas.demurrage(3, 150).value, 450)
  assert.equal(DrayageFormulas.dualmoves(40, 100).value, 40)
  assert.equal(DrayageFormulas.costpermove(150, 4).dst, 'supplychain')
  assert.equal(hexFamiliesOf().get('drayage')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'drayage', program: ['costpermove'], params: [150, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 600, `drayage.costpermove at ${uuid}`)
  uuidReceiptOf('drayage costpermove', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; costpermove 600, turntime 60, containersperday 12, chassisutilization 80, waittime 60, milesperload 100, demurrage 450, dualmoves 40; crossing to supplychain')
})
