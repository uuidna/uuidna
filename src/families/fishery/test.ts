import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FisheryFormulas } from './index.js'
import '../../mcp/families.js'

test('fishery: catch, biomass, quota, cpue, sustainable, bycatch, spawning, mortality — crossing to environment', async (t) => {
  assert.equal(FisheryFormulas.catch(40, 25).value, 1000, 'effort landed at a rate')
  assert.equal(FisheryFormulas.biomass(2000, 3).value, 6000)
  assert.equal(FisheryFormulas.quota(5000, 1200).value, 3800, 'allowance remaining')
  assert.equal(FisheryFormulas.quota(1000, 1200).value, 0, 'quota exhausted')
  assert.equal(FisheryFormulas.cpue(1000, 40).value, 2500)
  assert.equal(FisheryFormulas.sustainable(800, 1000).value, 1, 'within recruitment')
  assert.equal(FisheryFormulas.sustainable(1200, 1000).value, 0)
  assert.equal(FisheryFormulas.bycatch(150, 1000).value, 15)
  assert.equal(FisheryFormulas.spawning(10000, 20).value, 2000)
  assert.equal(FisheryFormulas.mortality(250, 1000).value, 25)
  assert.equal(FisheryFormulas.catch(40, 25).dst, 'environment')
  assert.equal(hexFamiliesOf().get('fishery')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'fishery', program: ['catch'], params: [40, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `fishery.catch at ${uuid}`)
  uuidReceiptOf('fishery catch', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; catch 1000, biomass 6000, quota 3800, cpue 2500, sustainable 1, bycatch 15, spawning 2000, mortality 25; crossing to environment')
})
