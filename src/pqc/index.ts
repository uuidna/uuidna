// pqc — post-quantum stack in pure TS (nobles): ML-KEM, X25519, ML-DSA, SLH-DSA, hybrid KEM presets.
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
  sealHybrid, openHybrid, sealHybridAuto, openHybridAuto,
  type HybridEnvelope, type HybridSealInput, type HybridSealAutoInput, type HybridRecipientKeys,
  HYBRID_TAG_BYTES,
} from './envelope/index.js'
export {
  ml_kem768, kem768Keygen, kem768Encapsulate, kem768Decapsulate,
  type Kem768KeyPair, type Kem768Encap,
} from './mlkem/index.js'
export {
  ml_dsa65, dsa65Keygen, dsa65Sign, dsa65Verify,
  type Dsa65KeyPair,
} from './mldsa/index.js'
export {
  x25519, x25519Keygen, x25519PublicKey, x25519SharedSecret,
  type X25519KeyPair,
} from './montgomery/index.js'
export {
  hybridKem768X25519, kitchenSinkMlKem768X25519,
  qsfMlKem768P256, hybridKem768P256, hybridKem1024P384,
  combineKEMS, combineSigners, expandSeedXof, _ecdhKem, ecSigner, ed25519Signer,
  type Combiner, type ExpandSeed,
} from './hybridkem/index.js'
export {
  slh_dsa_sha2_128s, slhDsa128sKeygen, slhDsa128sSign, slhDsa128sVerify,
} from './slhdsa/index.js'

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
