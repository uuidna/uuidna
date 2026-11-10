import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { IdentityFormulas } from './index.js'
import '../../mcp/families.js'

// the identity domain as NIST SP 800-63-3 writes it: assurance is IAL/AAL as a ratio of factors satisfied over
// required, match/liveness are what a verifier measures, uniqueness is dedup across the enrolled pool, step-up fires
// when risk crosses the threshold, attestation is a signed device claim, federation is a verified asserted claim.
test('identity: assurance, matchconfidence, documentvalidity, liveness, uniqueness, stepup, attestation, federation — crossing to auth', async (t) => {
  assert.equal(IdentityFormulas.assurance(3, 4).value, 75, 'three of four factors satisfied = IAL/AAL 75%')
  assert.equal(IdentityFormulas.assurance(0, 0).value, 0, 'no required factors holds no assurance')
  assert.equal(IdentityFormulas.matchconfidence(18, 20).value, 90, 'eighteen of twenty claimed attributes matched')
  assert.equal(IdentityFormulas.matchconfidence(21, 20).holds, false, 'more matched than claimed is unlawful')
  assert.equal(IdentityFormulas.documentvalidity(9, 10).value, 90, 'nine of ten document fields valid')
  assert.equal(IdentityFormulas.liveness(49, 50).value, 98, 'forty-nine of fifty liveness checks live')
  assert.equal(IdentityFormulas.uniqueness(997, 1000).value, 99, 'nine hundred ninety-seven distinct of a thousand enrolled')
  assert.equal(IdentityFormulas.stepup(80, 70).value, 1, 'risk at or above threshold demands another factor')
  assert.equal(IdentityFormulas.stepup(50, 70).value, 0, 'risk below threshold needs no step-up')
  assert.equal(IdentityFormulas.attestation(45, 50).value, 90, 'forty-five of fifty devices signed an attestation')
  assert.equal(IdentityFormulas.federation(8, 10).value, 80, 'eight of ten asserted claims verified by the provider')
  assert.equal(IdentityFormulas.assurance(3, 4).dst, 'auth', 'identity crosses into auth — the subject auth decides on')
  assert.equal(hexFamiliesOf().get('identity')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'identity', program: ['assurance'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `identity.assurance at ${uuid}`)
  uuidReceiptOf('identity assurance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas (NIST SP 800-63-3 assurance model); assurance 75, matchconfidence 90, documentvalidity 90, liveness 98, uniqueness 99, stepup 1/0, attestation 90, federation 80; crossing to auth')
})
