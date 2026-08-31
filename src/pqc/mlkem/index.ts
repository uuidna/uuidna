// pqc/mlkem — ML-KEM-768 (FIPS-203) via vendored @noble/post-quantum sources in src/nobles/.
import { ml_kem768 } from '../../nobles/ml-kem.js'

export { ml_kem768 }

export interface Kem768KeyPair {
  publicKey: Uint8Array
  secretKey: Uint8Array
}

export interface Kem768Encap {
  cipherText: Uint8Array
  sharedSecret: Uint8Array
}

/** kem768Keygen(seed?) → ML-KEM-768 keypair; 64-byte seed fixes both keys (NIST byte order). */
export function kem768Keygen(seed?: Uint8Array): Kem768KeyPair {
  return ml_kem768.keygen(seed)
}

/** kem768Encapsulate(publicKey, msg?) → ciphertext + 32-byte shared secret. */
export function kem768Encapsulate(publicKey: Uint8Array, msg?: Uint8Array): Kem768Encap {
  return ml_kem768.encapsulate(publicKey, msg)
}

/** kem768Decapsulate(cipherText, secretKey) → 32-byte shared secret (implicit rejection on bad ciphertext). */
export function kem768Decapsulate(cipherText: Uint8Array, secretKey: Uint8Array): Uint8Array {
  return ml_kem768.decapsulate(cipherText, secretKey)
}
