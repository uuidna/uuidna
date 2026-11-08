import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HarvestFormulas } from './index.js'
import '../../mcp/families.js'

test('harvest: ratescollected, losspercent, throughput, laborhours, machineefficiency, moisturecontent, storageyield, windowdays — crossing to agriculture', async (t) => {
  assert.equal(HarvestFormulas.ratescollected(40, 150).value, 6000, 'forty acres at a hundred fifty a piece')
  assert.equal(HarvestFormulas.losspercent(20, 200).value, 10)
  assert.equal(HarvestFormulas.throughput(6000, 8).value, 750, 'units an hour')
  assert.equal(HarvestFormulas.laborhours(12, 8).value, 96)
  assert.equal(HarvestFormulas.machineefficiency(80, 100).value, 80)
  assert.equal(HarvestFormulas.moisturecontent(14, 100).value, 14)
  assert.equal(HarvestFormulas.storageyield(5000, 300).value, 4700, 'what survives to store')
  assert.equal(HarvestFormulas.windowdays(30, 12).value, 18)
  assert.equal(HarvestFormulas.windowdays(12, 30).value, 0)
  assert.equal(HarvestFormulas.ratescollected(40, 150).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('harvest')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'harvest', program: ['ratescollected'], params: [40, 150] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6000, `harvest.ratescollected at ${uuid}`)
  uuidReceiptOf('harvest ratescollected', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ratescollected 6000, losspercent 10, throughput 750, laborhours 96, machineefficiency 80, moisturecontent 14, storageyield 4700, windowdays 18; crossing to agriculture')
})
