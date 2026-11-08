import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VerificationFormulas } from './index.js'
import '../../mcp/families.js'

test('verification: assertions, casecombos, stateorderings, coveragepct, invariantsubsets, counterexamples, proofobligations, passrate — crossing to logic', async (t) => {
  assert.equal(VerificationFormulas.assertions(50, 3).value, 150)
  assert.equal(VerificationFormulas.casecombos(12, 3).value, 220)
  assert.equal(VerificationFormulas.stateorderings(5).value, 120)
  assert.equal(VerificationFormulas.coveragepct(90, 100).value, 90)
  assert.equal(VerificationFormulas.invariantsubsets(5).value, 32)
  assert.equal(VerificationFormulas.counterexamples(10, 8).value, 2)
  assert.equal(VerificationFormulas.proofobligations(20, 10).value, 30)
  assert.equal(VerificationFormulas.passrate(95, 100).value, 95)
  assert.equal(VerificationFormulas.assertions(50, 3).dst, 'logic')
  assert.equal(hexFamiliesOf().get('verification')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'verification', program: ['assertions'], params: [50, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `verification.assertions at ${uuid}`)
  uuidReceiptOf('verification assertions', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; assertions 150, casecombos 220, stateorderings 120, coveragepct 90, invariantsubsets 32, counterexamples 2, proofobligations 30, passrate 95; crossing to logic')
})
