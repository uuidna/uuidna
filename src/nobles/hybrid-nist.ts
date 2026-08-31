// hybrid-nist — QSF + NIST-curve hybrid KEM presets and ecSigner (noble-post-quantum hybrid extensions).
import { asciiToBytes, concatBytes } from './curve-utils.js'
import { ed25519 } from './ed25519.js'
import type { EdDSA } from './edwards.js'
import { combineKEMS, expandSeedXof } from './hybrid.js'
import { ml_kem1024, ml_kem768 } from './ml-kem.js'
import { p256, p384 } from './nist.js'
import { abytes, astring, cleanBytes, randomBytes, validateSigOpts, validateVerOpts, type KEM, type Signer, type TArg, type TRet } from './pq-utils.js'
import { ahash } from './hash-utils.js'
import { sha3_256, shake256 } from './sha3.js'
import type { CHash } from './hash-utils.js'
import type { ECDSA } from './weierstrass.js'

type XOF = typeof shake256

/** ecSigner(curve) → generic Signer wrapper (Ed25519). */
export function ecSigner(curve: EdDSA): TRet<Signer> {
  return {
    lengths: {
      secretKey: curve.lengths.secretKey,
      publicKey: curve.lengths.publicKey,
      seed: curve.lengths.seed,
      signature: curve.lengths.signature,
      signRand: 0,
    },
    keygen: (seed?: TArg<Uint8Array>) => curve.keygen(seed) as TRet<{ secretKey: Uint8Array; publicKey: Uint8Array }>,
    getPublicKey: (secretKey: TArg<Uint8Array>) => curve.getPublicKey(secretKey) as TRet<Uint8Array>,
    sign: (message, secretKey, opts = {}) => {
      opts = validateSigOpts(opts)
      if (opts.extraEntropy !== undefined) throw new Error('ecSigner does not support extraEntropy')
      if (opts.context !== undefined) throw new Error('ecSigner does not support context')
      return curve.sign(message, secretKey) as TRet<Uint8Array>
    },
    verify: (signature, message, publicKey, opts = {}) => {
      opts = validateVerOpts(opts)
      if (opts.context !== undefined) throw new Error('ecSigner does not support context')
      return curve.verify(signature, message, publicKey)
    },
  }
}

/** QSF(label, pqc, curveKem, xof, kdf) → SP 800-227-style hybrid KEM. */
export function QSF(label: string, pqc: KEM, curveKEM: KEM, xof: XOF, kdf: CHash): TRet<KEM> {
  astring(label, 'label')
  ahash(xof)
  ahash(kdf)
  return combineKEMS(
    32,
    kdf.outputLen,
    expandSeedXof(xof),
    (pk: TArg<Uint8Array[]>, ct: TArg<Uint8Array[]>, ss: TArg<Uint8Array[]>) => kdf(concatBytes(ss[0], ss[1], ct[1], pk[1], asciiToBytes(label))) as TRet<Uint8Array>,
    pqc,
    curveKEM,
  )
}

function nistCurveKem(curve: ECDSA, scalarLen: number, elemLen: number, nseed: number): TRet<KEM> {
  const Fn = curve.Point.Fn
  if (!Fn) throw new Error('no Point.Fn')
  function rejectionSampling(seed: TArg<Uint8Array>): TRet<{ secretKey: Uint8Array; publicKey: Uint8Array }> {
    let sk: bigint
    for (let start = 0, end = scalarLen; ; start = end, end += scalarLen) {
      if (end > seed.length) throw new Error('rejection sampling failed')
      sk = Fn.fromBytes(seed.subarray(start, end), true)
      if (Fn.isValidNot0(sk)) break
    }
    const secretKey = Fn.toBytes(Fn.create(sk))
    const publicKey = curve.getPublicKey(secretKey, false)
    return { secretKey, publicKey } as TRet<{ secretKey: Uint8Array; publicKey: Uint8Array }>
  }
  const decapsulate = (cipherText: TArg<Uint8Array>, secretKey: TArg<Uint8Array>) =>
    curve.getSharedSecret(secretKey, cipherText).subarray(1) as TRet<Uint8Array>
  return {
    lengths: { secretKey: scalarLen, publicKey: elemLen, seed: nseed, msg: nseed, cipherText: elemLen },
    keygen(seed: TArg<Uint8Array> = randomBytes(nseed)) {
      abytes(seed, nseed, 'seed')
      return rejectionSampling(seed)
    },
    getPublicKey(secretKey: TArg<Uint8Array>) {
      return curve.getPublicKey(secretKey, false) as TRet<Uint8Array>
    },
    encapsulate(publicKey: TArg<Uint8Array>, rand: TArg<Uint8Array> = randomBytes(nseed)) {
      abytes(rand, nseed, 'rand')
      let ek: Uint8Array | undefined
      try {
        ek = rejectionSampling(rand).secretKey
        return { sharedSecret: decapsulate(publicKey, ek), cipherText: curve.getPublicKey(ek, false) as TRet<Uint8Array> }
      } finally {
        if (ek) cleanBytes(ek)
      }
    },
    decapsulate,
  }
}

function concreteHybridKem(label: string, mlkem: KEM, curve: ECDSA, nseed: number): TRet<KEM> {
  const { secretKey: scalarLen, publicKeyUncompressed: elemLen } = curve.lengths
  if (!scalarLen || !elemLen) throw new Error('wrong curve')
  const curveKem = nistCurveKem(curve, scalarLen, elemLen, nseed)
  const totalSeedLen = 64 + nseed
  return combineKEMS(
    32,
    32,
    (seed: TArg<Uint8Array>): TRet<Uint8Array> => {
      abytes(seed, 32)
      return shake256(seed, { dkLen: totalSeedLen }) as TRet<Uint8Array>
    },
    (pk: TArg<Uint8Array[]>, ct: TArg<Uint8Array[]>, ss: TArg<Uint8Array[]>) => sha3_256(concatBytes(ss[0], ss[1], ct[1], pk[1], asciiToBytes(label))),
    mlkem,
    curveKem,
  )
}

const p256kem = /* @__PURE__ */ nistCurveKem(p256, p256.lengths.secretKey!, p256.lengths.publicKeyUncompressed!, 128)

export const QSF_ml_kem768_p256: TRet<KEM> = QSF(
  'QSF-KEM(ML-KEM-768,P-256)-XOF(SHAKE256)-KDF(SHA3-256)',
  ml_kem768,
  p256kem,
  shake256,
  sha3_256,
)

export const ml_kem768_p256: TRet<KEM> = concreteHybridKem('MLKEM768-P256', ml_kem768, p256, 128)
export const ml_kem1024_p384: TRet<KEM> = concreteHybridKem('MLKEM1024-P384', ml_kem1024, p384, 48)
export const ed25519Signer = /* @__PURE__ */ ecSigner(ed25519)
