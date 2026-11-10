import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { UnemploymentFormulas } from './index.js'
import '../../mcp/families.js'

test('unemployment: ratepct, labourforce, unemployed, participationrate, naturalrate, okunsgap, jobseekers, durationweeks — crossing to macroeconomics', async (t) => {
  assert.equal(UnemploymentFormulas.ratepct(5, 100).value, 5)
  assert.equal(UnemploymentFormulas.labourforce(1000, 100).value, 100000)
  assert.equal(UnemploymentFormulas.unemployed(100000, 20).value, 5000)
  assert.equal(UnemploymentFormulas.participationrate(63, 100).value, 63)
  assert.equal(UnemploymentFormulas.naturalrate(4, 100).value, 4)
  assert.equal(UnemploymentFormulas.okunsgap(5, 4).value, 1)
  assert.equal(UnemploymentFormulas.jobseekers(5000, 1).value, 5000)
  assert.equal(UnemploymentFormulas.durationweeks(20, 6).value, 26)
  assert.equal(UnemploymentFormulas.ratepct(5, 100).dst, 'macroeconomics')
  assert.equal(hexFamiliesOf().get('unemployment')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'unemployment', program: ['ratepct'], params: [5, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `unemployment.ratepct at ${uuid}`)
  uuidReceiptOf('unemployment ratepct', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ratepct 5, labourforce 100000, unemployed 5000, participationrate 63, naturalrate 4, okunsgap 1, jobseekers 5000, durationweeks 26; crossing to macroeconomics')
})
