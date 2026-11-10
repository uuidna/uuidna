import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MonasticismFormulas } from './index.js'
import '../../mcp/families.js'

test('monasticism: hoursofprayer, ruleclauses, officeorderings, vowcombos, communitysize, dailycycle, silenceratio, obediencelevels — crossing to sociology', async (t) => {
  assert.equal(MonasticismFormulas.hoursofprayer(7, 1).value, 8)
  assert.equal(MonasticismFormulas.ruleclauses(73, 1).value, 73)
  assert.equal(MonasticismFormulas.officeorderings(7).value, 5040)
  assert.equal(MonasticismFormulas.vowcombos(3, 2).value, 3)
  assert.equal(MonasticismFormulas.communitysize(12, 2).value, 24)
  assert.equal(MonasticismFormulas.dailycycle(1440, 8).value, 180)
  assert.equal(MonasticismFormulas.silenceratio(16, 24).value, 66)
  assert.equal(MonasticismFormulas.obediencelevels(3).value, 8)
  assert.equal(MonasticismFormulas.hoursofprayer(7, 1).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('monasticism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'monasticism', program: ['hoursofprayer'], params: [7, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8, `monasticism.hoursofprayer at ${uuid}`)
  uuidReceiptOf('monasticism hoursofprayer', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; hoursofprayer 8, ruleclauses 73, officeorderings 5040, vowcombos 3, communitysize 24, dailycycle 180, silenceratio 66, obediencelevels 8; crossing to sociology')
})
