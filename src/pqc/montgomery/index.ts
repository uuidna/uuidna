// pqc/montgomery — RFC 7748 X25519 ECDH (vendored noble Montgomery ladder).
import { x25519 } from '../../nobles/x25519.js'

export { x25519 }

export interface X25519KeyPair {
  secretKey: Uint8Array
  publicKey: Uint8Array
}

/** x25519Keygen(seed?) → 32-byte X25519 keypair. */
export function x25519Keygen(seed?: Uint8Array): X25519KeyPair {
  return x25519.keygen(seed)
}

/** x25519PublicKey(secretKey) → Montgomery u-coordinate public key bytes. */
export function x25519PublicKey(secretKey: Uint8Array): Uint8Array {
  return x25519.getPublicKey(secretKey)
}

/** x25519SharedSecret(localSecret, peerPublic) → 32-byte ECDH shared secret. */
export function x25519SharedSecret(localSecret: Uint8Array, peerPublic: Uint8Array): Uint8Array {
  return x25519.getSharedSecret(localSecret, peerPublic)
}
