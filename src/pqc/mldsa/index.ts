// pqc/mldsa — ML-DSA-65 (FIPS-204) via vendored @noble/post-quantum sources in src/nobles/.
import { ml_dsa65 } from '../../nobles/ml-dsa.js'

export { ml_dsa65 }

export interface Dsa65KeyPair {
  publicKey: Uint8Array
  secretKey: Uint8Array
}

/** dsa65Keygen(seed?) → ML-DSA-65 keypair. */
export function dsa65Keygen(seed?: Uint8Array): Dsa65KeyPair {
  return ml_dsa65.keygen(seed)
}

/** dsa65Sign(message, secretKey, opts?) → signature bytes. */
export function dsa65Sign(
  message: Uint8Array,
  secretKey: Uint8Array,
  opts?: { context?: Uint8Array; extraEntropy?: Uint8Array },
): Uint8Array {
  return ml_dsa65.sign(message, secretKey, opts)
}

/** dsa65Verify(signature, message, publicKey, opts?) → true when valid. */
export function dsa65Verify(
  signature: Uint8Array,
  message: Uint8Array,
  publicKey: Uint8Array,
  opts?: { context?: Uint8Array },
): boolean {
  return ml_dsa65.verify(signature, message, publicKey, opts)
}
