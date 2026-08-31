// pqc/slhdsa — SLH-DSA-128s (FIPS-205) via vendored noble sources.
import { slh_dsa_sha2_128s } from '../../nobles/slh-dsa.js'

export { slh_dsa_sha2_128s }

/** slhDsa128sKeygen(seed?) → SLH-DSA-SHA2-128s keypair. */
export function slhDsa128sKeygen(seed?: Uint8Array) {
  return slh_dsa_sha2_128s.keygen(seed)
}

/** slhDsa128sSign(message, secretKey) → signature bytes. */
export function slhDsa128sSign(message: Uint8Array, secretKey: Uint8Array): Uint8Array {
  return slh_dsa_sha2_128s.sign(message, secretKey)
}

/** slhDsa128sVerify(signature, message, publicKey) → true when valid. */
export function slhDsa128sVerify(signature: Uint8Array, message: Uint8Array, publicKey: Uint8Array): boolean {
  return slh_dsa_sha2_128s.verify(signature, message, publicKey)
}
