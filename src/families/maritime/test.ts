import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MaritimeFormulas } from './index.js'
import '../../mcp/families.js'

test('maritime: demurrage, freight, general average, salvage, tonnage, draft, collision, limitation — crossing to law', async (t) => {
  assert.equal(MaritimeFormulas.demurrage(5, 8).value, 3, 'three days over laytime')
  assert.equal(MaritimeFormulas.demurrage(8, 5).value, 0, 'under laytime, no demurrage')
  assert.equal(MaritimeFormulas.freight(5000, 12).value, 60000)
  assert.equal(MaritimeFormulas.generalaverage(20000, 500000).value, 4, 'a 4% contribution')
  assert.equal(MaritimeFormulas.salvage(1000000, 15).value, 150000)
  assert.equal(MaritimeFormulas.tonnage(100, 20, 8).value, 160)
  assert.equal(MaritimeFormulas.draft(1000, 50).value, 20)
  assert.equal(MaritimeFormulas.collision(3, 4).value, 75, "three-quarters of the collision fault")
  assert.equal(MaritimeFormulas.limitation(5000, 60).value, 300000)
  assert.equal(MaritimeFormulas.freight(5000, 12).dst, 'law')
  assert.equal(hexFamiliesOf().get('maritime')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'maritime', program: ['tonnage'], params: [100, 20, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 160, `maritime.tonnage at ${uuid}`)
  uuidReceiptOf('maritime tonnage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; demurrage 3, freight 60000, generalaverage 4%, salvage 150000, tonnage 160, draft 20, collision 75%, limitation 300000; crossing to law')
})
