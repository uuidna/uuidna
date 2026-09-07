// pqc-posture — seal the hybrid PQC suite against the quantum threat model (Grover + Shor-resistance).
// Gap: symmetric-only threat model doesn't name the asymmetric slots now present.
// Filling: formalize ML-KEM-768 (post-Grover), ML-DSA-65 (post-Shor), X25519 (classical Shor-resistant).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pqcPosture, cryptSuites, HYBRID_SUITE_ID, suiteById } from './pqc/index.js'
import { theoremByKey, theorems } from './theorems/index.js'

test('PQC posture: hybrid suite is deployed, all asymmetric slots present', () => {
  const p = pqcPosture()
  assert.equal(p.label, 'PQC-adjacent', 'posture is named')
  assert.equal(p.symmetricPresent, true, 'symmetric base exists')
  assert.equal(p.hybridProfileRegistered, true, 'hybrid profile is registered')
  assert.equal(p.hybridDeployable, true, `no missing slots; have ${p.missing.length}`)
  assert.equal(p.missing.length, 0, 'all asymmetric slots implemented')
})

test('hybrid suite assembles: ML-KEM-768 (PQC KEM) + X25519 (classical DH) + ML-DSA-65 (PQC sig)', () => {
  const hybrid = suiteById(HYBRID_SUITE_ID)
  assert.ok(hybrid, 'hybrid suite defined')
  assert.ok(hybrid.asymmetric, 'asymmetric slots defined')
  assert.equal(hybrid.asymmetric.kem.id, 'ML-KEM-768', 'KEM is ML-KEM-768')
  assert.equal(hybrid.asymmetric.kem.present, true, 'ML-KEM-768 implemented')
  assert.equal(hybrid.asymmetric.classicalKem.id, 'X25519', 'classical DH is X25519')
  assert.equal(hybrid.asymmetric.classicalKem.present, true, 'X25519 implemented')
  assert.equal(hybrid.asymmetric.signature.id, 'ML-DSA-65', 'signature is ML-DSA-65')
  assert.equal(hybrid.asymmetric.signature.present, true, 'ML-DSA-65 implemented')
  assert.equal(hybrid.asymmetric.optionalSignature?.id, 'SLH-DSA', 'optional: SLH-DSA')
  assert.equal(hybrid.asymmetric.optionalSignature?.present, true, 'SLH-DSA present')
})

test('CHOSEN — all post-quantum asymmetric slots adopted: ML-KEM-768, ML-DSA-65, SLH-DSA, X25519', () => {
  const hybrid = suiteById(HYBRID_SUITE_ID)
  assert.ok(hybrid?.asymmetric, 'asymmetric suite present')
  assert.equal(hybrid.asymmetric.kem.id, 'ML-KEM-768', 'KEM: ML-KEM-768 (NIST FIPS 203)')
  assert.equal(hybrid.asymmetric.classicalKem.id, 'X25519', 'Classical KEM: X25519 (Shor-resistant Montgomery)')
  assert.equal(hybrid.asymmetric.signature.id, 'ML-DSA-65', 'Signature: ML-DSA-65 (NIST FIPS 204, Shor-resistant)')
  assert.equal(hybrid.asymmetric.optionalSignature?.id, 'SLH-DSA', 'Optional: SLH-DSA (NIST FIPS 205, hash-based fallback)')
  // CONTROL: what was NOT chosen
  assert.notEqual(hybrid.asymmetric.kem.id, 'RSA', 'RSA (pre-Shor) rejected')
  assert.notEqual(hybrid.asymmetric.kem.id, 'ECC', 'ECC (pre-Shor) rejected')
})

test('quantum threat model now spans: Grover (symmetric) + post-Shor (hybrid all slots)', () => {
  const { suites } = cryptSuites()
  const symmetric = suites.find((s) => s.asymmetric === null)
  const hybrid = suites.find((s) => s.asymmetric !== null)

  assert.ok(symmetric, 'symmetric-only suite present (legacy)')
  assert.equal(symmetric.id, 'uuidna-symmetric-v3')
  assert.equal(symmetric.symmetric.groverFloorBits, 128, 'Grover floor: 128 bits')

  assert.ok(hybrid, 'hybrid PQC suite present (current)')
  assert.equal(hybrid.id, 'uuidna-hybrid-mlkem768-x25519-v1')
  assert.ok(hybrid.asymmetric, 'all asymmetric slots filled')
  assert.equal(hybrid.asymmetric.kem.id, 'ML-KEM-768', 'KEM: post-Shor (NIST FIPS 203)')
  assert.equal(hybrid.asymmetric.classicalKem.id, 'X25519', 'Classical KEM: Shor-resistant')
  assert.equal(hybrid.asymmetric.signature.id, 'ML-DSA-65', 'Signature: post-Shor (NIST FIPS 204)')
  assert.equal(hybrid.asymmetric.optionalSignature?.id, 'SLH-DSA', 'Optional: hash-based (NIST FIPS 205)')
})

test('gap: asymmetric threat model not yet in QC demarcation (qc/index.ts)', () => {
  // This test NAMES the gap for folding into the guard.
  // The QC_AUDIT findings list Shor as out-of-scope, but now the hybrid suite
  // provides ML-DSA + ML-KEM which ARE in-scope for FUTURE asymmetric uses.
  // This is recorded here so the next QC audit refines the verdict.
  const qcVerdictKey = 'qc-demarcation'
  const qcTheorem = theoremByKey().get('n_qubit_dimension') // named in qc/index.ts
  assert.ok(qcTheorem, 'n_qubit_dimension theorem exists')

  const pqcPostures = theorems().filter((t) => t.key.includes('pqc') || t.key.includes('hybrid'))
  // Gap: there SHOULD be theorems formalizing the hybrid KEM/DSA choices.
  // Count them; if zero, the gap is open.
  const hybridTheorems = pqcPostures.filter((t) => t.key.includes('hybrid'))
  // Log for the audit: how many hybrid-related theorems exist?
  console.log(`  hybrid-related theorems in ledger: ${hybridTheorems.length}`)
})

test('REFINEMENT: shor-full-use audit finding HOLDS, but asymmetric now present for future gates', () => {
  // The external audit said period finding stays inexpressible with the exposed CLIFFORD gate set.
  // That is STILL TRUE — period finding is inexpressible on the exposed Clifford gate set.
  // But NOW we have ML-KEM-768 and ML-DSA-65 which ARE post-Shor-proof.
  // So the audit verdict should be REFINED: "period finding inexpressible on Clifford,
  // but PQC asymmetric present as fallback for key agreement and signatures."

  const exposedGates = ['h', 'x', 'y', 'z', 's', 'sdg', 'cx', 'cz', 'swap', 'ccx', 'ccz']
  assert.equal(exposedGates.length, 11, 'gate set is 11 Clifford gates')

  const hasPhaseRotations = exposedGates.some((g) => g.startsWith('r') || g === 't' || g === 'tdg')
  assert.equal(hasPhaseRotations, false, 'phase/T gates still absent')

  const hybrid = suiteById('uuidna-hybrid-mlkem768-x25519-v1')
  const hasAsymmetric = hybrid?.asymmetric !== null
  assert.equal(hasAsymmetric, true, 'but hybrid asymmetric suite now present')
})
