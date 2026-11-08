import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NumeracyFormulas } from './index.js'
import '../../mcp/families.js'

test('numeracy: problemsolved, accuracy, factfluency, placevalue, operationspeed, errorrate, masterypercent, growth — crossing to pedagogy', async (t) => {
  assert.equal(NumeracyFormulas.problemsolved(20, 15).value, 300, 'problems over the sessions')
  assert.equal(NumeracyFormulas.accuracy(45, 50).value, 90)
  assert.equal(NumeracyFormulas.factfluency(40, 60).value, 40, 'facts per minute')
  assert.equal(NumeracyFormulas.placevalue(7, 100).value, 700)
  assert.equal(NumeracyFormulas.operationspeed(120, 4).value, 30, 'operations per minute')
  assert.equal(NumeracyFormulas.errorrate(3, 60).value, 5)
  assert.equal(NumeracyFormulas.masterypercent(18, 24).value, 75)
  assert.equal(NumeracyFormulas.growth(85, 60).value, 25, 'the gain')
  assert.equal(NumeracyFormulas.growth(50, 70).value, 0)
  assert.equal(NumeracyFormulas.problemsolved(20, 15).dst, 'pedagogy')
  assert.equal(hexFamiliesOf().get('numeracy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'numeracy', program: ['operationspeed'], params: [120, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `numeracy.operationspeed at ${uuid}`)
  uuidReceiptOf('numeracy operationspeed', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; problemsolved 300, accuracy 90, factfluency 40, placevalue 700, operationspeed 30, errorrate 5, masterypercent 75, growth 25; crossing to pedagogy')
})
