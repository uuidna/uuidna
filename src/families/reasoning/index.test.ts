import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ReasoningFormulas } from './index.js'
import '../../mcp/families.js'

test('reasoning: inferencesteps, accuracy, deductionvalidity, biasrate, workingmemoryload, responselatency, syllogismscore, confidencecalibration — crossing to cognition', async (t) => {
  assert.equal(ReasoningFormulas.inferencesteps(5, 3).value, 15, 'premises expanded by their rules')
  assert.equal(ReasoningFormulas.accuracy(45, 50).value, 90)
  assert.equal(ReasoningFormulas.deductionvalidity(3, 2).value, 1, 'a valid deduction')
  assert.equal(ReasoningFormulas.deductionvalidity(2, 3).value, 0)
  assert.equal(ReasoningFormulas.biasrate(1, 20).value, 5)
  assert.equal(ReasoningFormulas.workingmemoryload(7, 4).value, 28)
  assert.equal(ReasoningFormulas.responselatency(6000, 120).value, 50, 'milliseconds per response')
  assert.equal(ReasoningFormulas.syllogismscore(8, 5).value, 40)
  assert.equal(ReasoningFormulas.confidencecalibration(80, 60).value, 20, 'overconfident by twenty')
  assert.equal(ReasoningFormulas.confidencecalibration(50, 70).value, 0)
  assert.equal(ReasoningFormulas.inferencesteps(5, 3).dst, 'cognition')
  assert.equal(hexFamiliesOf().get('reasoning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'reasoning', program: ['inferencesteps'], params: [5, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `reasoning.inferencesteps at ${uuid}`)
  uuidReceiptOf('reasoning inferencesteps', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; inferencesteps 15, accuracy 90, deductionvalidity 1, biasrate 5, workingmemoryload 28, responselatency 50, syllogismscore 40, confidencecalibration 20; crossing to cognition')
})
