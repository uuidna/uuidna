import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ApoptosisFormulas } from './index.js'
import '../../mcp/families.js'

test('apoptosis: deathrate, survivalfraction, caspaseactivity, turnover, clearance, netgrowth, apoptoticindex, halflife — crossing to physiology', async (t) => {
  assert.equal(ApoptosisFormulas.deathrate(250, 1000).value, 25, 'a quarter of the cells dead')
  assert.equal(ApoptosisFormulas.survivalfraction(250, 1000).value, 75, 'three quarters survive')
  assert.equal(ApoptosisFormulas.caspaseactivity(500, 4).value, 2000)
  assert.equal(ApoptosisFormulas.turnover(10000, 50).value, 200, 'cells replaced per day')
  assert.equal(ApoptosisFormulas.clearance(1000, 30).value, 34, 'phagocyte passes to clear the bodies')
  assert.equal(ApoptosisFormulas.netgrowth(800, 300).value, 500)
  assert.equal(ApoptosisFormulas.netgrowth(300, 800).value, 0)
  assert.equal(ApoptosisFormulas.apoptoticindex(15, 1000).value, 15, 'apoptotic cells per thousand')
  assert.equal(ApoptosisFormulas.halflife(240, 4).value, 60)
  assert.equal(ApoptosisFormulas.deathrate(250, 1000).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('apoptosis')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'apoptosis', program: ['clearance'], params: [1000, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 34, `apoptosis.clearance at ${uuid}`)
  uuidReceiptOf('apoptosis clearance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; deathrate 25, survivalfraction 75, caspaseactivity 2000, turnover 200, clearance 34, netgrowth 500, apoptoticindex 15, halflife 60; crossing to physiology')
})
