import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TotemismFormulas } from './index.js'
import '../../mcp/families.js'

test('totemism: clans, totempairs, lineageorderings, taboocount, kinshipsubsets, emblemcombos, descentgroups, exogamyratio — crossing to sociology', async (t) => {
  assert.equal(TotemismFormulas.clans(8, 4).value, 12)
  assert.equal(TotemismFormulas.totempairs(12, 2).value, 66)
  assert.equal(TotemismFormulas.lineageorderings(5).value, 120)
  assert.equal(TotemismFormulas.taboocount(10, 5).value, 15)
  assert.equal(TotemismFormulas.kinshipsubsets(5).value, 32)
  assert.equal(TotemismFormulas.emblemcombos(10, 3).value, 120)
  assert.equal(TotemismFormulas.descentgroups(4, 3).value, 12)
  assert.equal(TotemismFormulas.exogamyratio(60, 100).value, 60)
  assert.equal(TotemismFormulas.clans(8, 4).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('totemism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'totemism', program: ['clans'], params: [8, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `totemism.clans at ${uuid}`)
  uuidReceiptOf('totemism clans', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; clans 12, totempairs 66, lineageorderings 120, taboocount 15, kinshipsubsets 32, emblemcombos 120, descentgroups 12, exogamyratio 60; crossing to sociology')
})
