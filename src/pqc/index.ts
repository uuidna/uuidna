// pqc — post-quantum readiness: suite registry, hybrid derivation, v4 envelopes. Symmetric stack is present;
// ML-KEM / X25519 / ML-DSA instruments are named slots awaiting an external implementation.
import { toUuid } from '../address.js'
import { merkleGravity } from '../gravity/index.js'
import { GROVER_FLOOR_BITS, KEY_BITS, ITER } from '../crypt.js'
import {
  cryptSuites, missingAsymmetricSlots, SYMMETRIC_SUITE_ID, HYBRID_SUITE_ID,
  type CryptoSuite,
} from '../crypt-suites.js'

export {
  cryptSuites, suiteById, suitePolicy, missingAsymmetricSlots,
  SYMMETRIC_SUITE_ID, HYBRID_SUITE_ID,
  type CryptoSuite, type AsymmetricSlot,
} from '../crypt-suites.js'
export { hkdfExtract, hkdfExpand, hkdfSha256 } from '../hkdf.js'
export {
  hybridDerive, hybridDeriveReceipt, canonicalHybridContext,
  type HybridSecrets, type HybridContext, type HybridSubkeys,
} from './hybrid/index.js'
export {
  sealHybrid, openHybrid, type HybridEnvelope, type HybridSealInput, HYBRID_TAG_BYTES,
} from './envelope/index.js'

export interface PqcPosture {
  label: 'PQC-adjacent'
  symmetricPresent: boolean
  hybridProfileRegistered: boolean
  hybridDeployable: boolean
  missing: string[]
  widths: { keyBits: number; groverFloorBits: number; pbkdf2Iter: number }
  suites: CryptoSuite[]
  receipt: string
}

/** pqcPosture() → what the stack provides today vs what the hybrid profile still awaits. */
export function pqcPosture(): PqcPosture {
  const { suites, receipt: suiteReceipt } = cryptSuites()
  const missing = missingAsymmetricSlots()
  const hybrid = suites.find((s) => s.id === HYBRID_SUITE_ID)
  return {
    label: 'PQC-adjacent',
    symmetricPresent: true,
    hybridProfileRegistered: !!hybrid,
    hybridDeployable: missing.length === 0,
    missing,
    widths: { keyBits: KEY_BITS, groverFloorBits: GROVER_FLOOR_BITS, pbkdf2Iter: ITER },
    suites,
    receipt: merkleGravity([suiteReceipt, toUuid('pqc-posture|' + missing.join(','))]),
  }
}
