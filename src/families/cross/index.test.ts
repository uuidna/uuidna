import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { verifyHex } from '../verify.js'
import { CrossDomainFormulas as C } from './index.js'
import '../../mcp/families.js'

/** THE CROSS-DOMAIN BRIDGES, EXACT. Each formula carries a value from one domain to another: a medical keyspace is
 *  2^keyLen · patientCount, an enterprise risk is 1/(1 + proofCount) (falling as proofs accrue), a BB84 compression
 *  ratio is 1/(1 + log2 keyLen), an alert urgency is anomalies/(signals + 1). Deterministic; the live pipeline pieces
 *  are exercised elsewhere, these are the arithmetic each bridge states. */
test('cross: the cross-domain bridges compute the exact value each states', async (t) => {
  // keyspace = 2^keyLen · patientCount — the A000079 powers of two the discovery matches on OEIS
  assert.equal(C.medSecureWithQSec(2, 5).value, 64)
  assert.equal(C.medSecureWithQSec(3, 4).value, 48)
  assert.equal(C.medSecureWithQSec(1, 10).value, 1024, '2^10 for one patient')
  // enterprise risk = 1/(1 + proofCount), falling as proofs accrue
  assert.equal(C.quantumToEnterprise(0).value, 1, 'no proof, full risk')
  assert.equal(C.quantumToEnterprise(99).value, 0.01, '99 proofs, 1/100 risk')
  assert.ok(C.quantumToEnterprise(10).value < C.quantumToEnterprise(1).value, 'more proofs, less risk')
  // BB84 compression ratio = 1/(1 + log2 keyLen)
  assert.equal(C.bb84ToCompress(256).value, 1 / (1 + Math.log2(256)), '1/(1 + 8) = 1/9')
  // alert urgency = anomalies / (signals + 1)
  assert.equal(C.observabilityToUI(10, 100).value, 10 / 101)
  assert.equal(C.observabilityToUI(0, 100).value, 0, 'no anomalies, no urgency')
  // model accuracy = 1 - 1/(1 + signalCount/100)
  assert.equal(C.observabilityToML(100).value, 0.5, '100 signals halve the gap')
  // health = max(0, 1 - build/300) · max(0, 1 - test/180): full when nothing is spent
  assert.equal(C.deploymentToObs(0, 0).value, 1)
  // compressed size = signalLen · (1 - keyLen/(keyLen + signalLen))
  assert.equal(C.compressQSecSignals(1000, 256).value, 1000 * (1 - 256 / 1256))
  assert.equal(C.medSecureWithQSec(2, 5).dst, 'qsec')
  assert.equal(C.quantumToEnterprise(0).dst, 'enterprise')
  // the clean, ≤3-param, integer-valued ones also run at their hex address through the MCP
  await verifyHex('cross', 10, [['medSecureWithQSec', [2, 5], 64], ['medSecureWithQSec', [1, 10], 1024], ['quantumToEnterprise', [0], 1], ['observabilityToUI', [0, 100], 0]])
  t.diagnostic('10 bridges; keyspace 2^keyLen·patients (OEIS A000079), risk 1/(1+proofs), BB84 1/(1+log2 keyLen), urgency anomalies/(signals+1)')
})
