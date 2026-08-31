// pqc/envelope — hybrid envelope v4: ML-KEM-768 + X25519 ephemeral ECDH + ChaCha20-Poly1305 body.
import { aeadEncrypt, aeadDecrypt } from '../../chacha.js'
import { merkleFold, toUuid } from '../../address.js'
import { sha256 } from '../../sha256.js'
import { NONCE_BYTES, TAG_BYTES } from '../../crypt.js'
import { HYBRID_SUITE_ID, suiteById } from '../../crypt-suites.js'
import { hybridDerive, canonicalHybridContext, type HybridContext, type HybridSecrets } from '../hybrid/index.js'
import { kem768Encapsulate, kem768Decapsulate } from '../mlkem/index.js'
import { x25519Keygen, x25519SharedSecret } from '../montgomery/index.js'

const enc = new TextEncoder()
const dec = new TextDecoder()
const b64 = (u: Uint8Array): string => { let s = ''; for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s) }
const ub64 = (s: string): Uint8Array => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u }

export interface HybridKemFields {
  algorithm: 'ML-KEM-768'
  keyId: string
  ciphertext: string
}

export interface HybridClassicalFields {
  algorithm: 'X25519'
  ephemeralPublicKey: string
}

export interface HybridEnvelope {
  v: 4
  suite: string
  kem: HybridKemFields
  classical: HybridClassicalFields
  context: HybridContext
  aad: string
  nonce: string
  ct: string
  tag: string
  address: string
  signature?: string
  signatureAlgorithm?: 'ML-DSA-65'
}

export interface HybridSealInput {
  plaintext: string
  secrets: HybridSecrets
  context: HybridContext
  kemCiphertext: Uint8Array
  classicalEphemeralPublic: Uint8Array
  senderKeyId: string
  recipientKeyId: string
}

export interface HybridRecipientKeys {
  kemSecretKey: Uint8Array
  x25519SecretKey: Uint8Array
}

export interface HybridSealAutoInput {
  plaintext: string
  recipientKemPublicKey: Uint8Array
  recipientX25519PublicKey: Uint8Array
  context: HybridContext
  senderKeyId: string
  recipientKeyId: string
}

const foldHybrid = (
  suite: string, aad: string, nonce: string, ct: string, tag: string,
): string => merkleFold([suite, aad, nonce, ct, tag].map(toUuid))

const sealFromParts = (
  plaintext: string,
  secrets: HybridSecrets,
  ctx: HybridContext,
  kemCiphertext: Uint8Array,
  classicalEphemeralPublic: Uint8Array,
): HybridEnvelope => {
  const subkeys = hybridDerive(secrets, ctx)
  const aad = canonicalHybridContext(ctx)
  const nonce = cryptoNonce(ctx)
  const pt = enc.encode(plaintext)
  const { ct, tag } = aeadEncrypt(subkeys.encryption, nonce, pt, enc.encode(aad))
  const base = {
    suite: HYBRID_SUITE_ID,
    kem: { algorithm: 'ML-KEM-768' as const, keyId: ctx.recipientKeyId, ciphertext: b64(kemCiphertext) },
    classical: { algorithm: 'X25519' as const, ephemeralPublicKey: b64(classicalEphemeralPublic) },
    context: ctx,
    aad,
    nonce: b64(nonce),
    ct: b64(ct),
    tag: b64(tag),
  }
  return {
    v: 4,
    ...base,
    address: foldHybrid(base.suite, base.aad, base.nonce, base.ct, base.tag),
  }
}

/** sealHybrid(input) → v4 envelope from caller-supplied KEM bytes and derived secrets. */
export function sealHybrid(input: HybridSealInput): HybridEnvelope {
  const suite = suiteById(input.context.suiteId)
  if (!suite || !suite.asymmetric) throw new Error('pqc: hybrid seal requires the hybrid suite profile')
  const ctx: HybridContext = {
    ...input.context,
    senderKeyId: input.senderKeyId,
    recipientKeyId: input.recipientKeyId,
    suiteId: HYBRID_SUITE_ID,
  }
  return sealFromParts(
    input.plaintext,
    input.secrets,
    ctx,
    input.kemCiphertext,
    input.classicalEphemeralPublic,
  )
}

/** sealHybridAuto(input) → v4 envelope; runs ML-KEM-768 encaps + X25519 ephemeral ECDH. */
export function sealHybridAuto(input: HybridSealAutoInput): HybridEnvelope {
  const suite = suiteById(HYBRID_SUITE_ID)
  if (!suite?.asymmetric?.kem.present || !suite.asymmetric.classicalKem.present)
    throw new Error('pqc: hybrid seal requires ML-KEM-768 and X25519 instruments')
  const ctx: HybridContext = {
    ...input.context,
    senderKeyId: input.senderKeyId,
    recipientKeyId: input.recipientKeyId,
    suiteId: HYBRID_SUITE_ID,
  }
  const eph = x25519Keygen()
  const kem = kem768Encapsulate(input.recipientKemPublicKey)
  const secrets: HybridSecrets = {
    classical: x25519SharedSecret(eph.secretKey, input.recipientX25519PublicKey),
    pqc: kem.sharedSecret,
  }
  return sealFromParts(input.plaintext, secrets, ctx, kem.cipherText, eph.publicKey)
}

/** openHybrid(env, secrets) → plaintext; authenticates AAD and suite before parsing body. */
export function openHybrid(env: HybridEnvelope, secrets: HybridSecrets): string {
  if (env.v !== 4) throw new Error('pqc: not a v4 hybrid envelope')
  if (env.suite !== HYBRID_SUITE_ID) throw new Error(`pqc: refusing suite ${env.suite}`)
  const expect = foldHybrid(env.suite, env.aad, env.nonce, env.ct, env.tag)
  if (env.address !== expect) throw new Error('pqc: hybrid envelope address does not recompute')
  const subkeys = hybridDerive(secrets, env.context)
  const pt = aeadDecrypt(
    subkeys.encryption,
    ub64(env.nonce),
    ub64(env.ct),
    ub64(env.tag),
    enc.encode(env.aad),
  )
  return dec.decode(pt)
}

/** openHybridAuto(env, keys) → plaintext; decapsulates ML-KEM and X25519 from the wire fields. */
export function openHybridAuto(env: HybridEnvelope, keys: HybridRecipientKeys): string {
  const pqc = kem768Decapsulate(ub64(env.kem.ciphertext), keys.kemSecretKey)
  const classical = x25519SharedSecret(keys.x25519SecretKey, ub64(env.classical.ephemeralPublicKey))
  return openHybrid(env, { classical, pqc })
}

const cryptoNonce = (ctx: HybridContext): Uint8Array =>
  sha256(enc.encode('uuidna-hybrid-nonce-v1|' + canonicalHybridContext(ctx))).slice(0, NONCE_BYTES)

export const HYBRID_TAG_BYTES = TAG_BYTES
