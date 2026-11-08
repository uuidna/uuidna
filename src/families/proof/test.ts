import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ProofFormulas } from './index.js'
import '../../mcp/families.js'

test('proof: steps, lemmas, caseorderings, dependencypairs, branchsubsets, qed, axiomsused, inferencepaths — crossing to logic', async (t) => {
  assert.equal(ProofFormulas.steps(10, 5).value, 15)
  assert.equal(ProofFormulas.lemmas(8, 2).value, 16)
  assert.equal(ProofFormulas.caseorderings(4).value, 24)
  assert.equal(ProofFormulas.dependencypairs(10, 2).value, 45)
  assert.equal(ProofFormulas.branchsubsets(5).value, 32)
  assert.equal(ProofFormulas.qed(100, 100).value, 100)
  assert.equal(ProofFormulas.axiomsused(5, 3).value, 8)
  assert.equal(ProofFormulas.inferencepaths(6, 3).value, 120)
  assert.equal(ProofFormulas.steps(10, 5).dst, 'logic')
  assert.equal(hexFamiliesOf().get('proof')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'proof', program: ['steps'], params: [10, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `proof.steps at ${uuid}`)
  uuidReceiptOf('proof steps', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; steps 15, lemmas 16, caseorderings 24, dependencypairs 45, branchsubsets 32, qed 100, axiomsused 8, inferencepaths 120; crossing to logic')
})
