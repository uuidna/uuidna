import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OutbreakFormulas } from './index.js'
import '../../mcp/families.js'

test('outbreak: reproduction, attackrate, doublingtime, casefatality, generationinterval, cumulativecases, herdimmunity, growthfactor — crossing to epidemiology', async (t) => {
  assert.equal(OutbreakFormulas.reproduction(6, 2).value, 3, 'each case infects three')
  assert.equal(OutbreakFormulas.attackrate(250, 1000).value, 25)
  assert.equal(OutbreakFormulas.doublingtime(30, 5).value, 6, 'six days per doubling')
  assert.equal(OutbreakFormulas.casefatality(20, 1000).value, 2)
  assert.equal(OutbreakFormulas.generationinterval(140, 20).value, 7)
  assert.equal(OutbreakFormulas.cumulativecases(100, 14).value, 1400, 'a fortnight of cases')
  assert.equal(OutbreakFormulas.herdimmunity(4).value, 75, 'the immune share that stalls spread')
  assert.equal(OutbreakFormulas.growthfactor(800, 100).value, 8)
  assert.equal(OutbreakFormulas.reproduction(6, 2).dst, 'epidemiology')
  assert.equal(hexFamiliesOf().get('outbreak')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'outbreak', program: ['reproduction'], params: [6, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `outbreak.reproduction at ${uuid}`)
  uuidReceiptOf('outbreak reproduction', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; reproduction 3, attackrate 25, doublingtime 6, casefatality 2, generationinterval 7, cumulativecases 1400, herdimmunity 75, growthfactor 8; crossing to epidemiology')
})
