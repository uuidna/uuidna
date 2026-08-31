// pqc/hybridkem — hybrid KEM presets: X25519, NIST curves, QSF, KitchenSink, combiners.
import { hkdfExpand, hkdfExtract } from '../../hkdf.js'
import { ml_kem768 } from '../../nobles/ml-kem.js'
import { shake256 } from '../../nobles/sha3.js'
import {
  _ecdhKem, combineKEMS, combineSigners, expandSeedXof, ml_kem768_x25519,
  type Combiner, type ExpandSeed,
} from '../../nobles/hybrid.js'
import {
  QSF_ml_kem768_p256, ml_kem768_p256, ml_kem1024_p384,
  ecSigner, ed25519Signer,
} from '../../nobles/hybrid-nist.js'
import { x25519 } from '../../nobles/x25519.js'
import { asciiToBytes, concatBytes, numberToBytesBE, type TRet } from '../../nobles/curve-utils.js'
import { cleanBytes, type KEM } from '../../nobles/pq-utils.js'

export {
  _ecdhKem, combineKEMS, combineSigners, expandSeedXof, ml_kem768_x25519,
  type Combiner, type ExpandSeed,
  QSF_ml_kem768_p256 as qsfMlKem768P256,
  ml_kem768_p256 as hybridKem768P256,
  ml_kem1024_p384 as hybridKem1024P384,
  ecSigner,
  ed25519Signer,
}
export { ml_kem768_x25519 as hybridKem768X25519 }

const x25519kem = /* @__PURE__ */ _ecdhKem(x25519)

/** createKitchenSink(label, pqc, curveKem, xof) → HKDF-SHA256 hybrid KEM combiner. */
export function createKitchenSink(
  label: string,
  pqc: KEM,
  curveKEM: KEM,
  xof: typeof shake256,
): TRet<KEM> {
  return combineKEMS(
    32,
    32,
    expandSeedXof(xof),
    (pk: Uint8Array[], ct: Uint8Array[], ss: Uint8Array[]) => {
      const preimage = concatBytes(ss[0], ss[1], ct[0], pk[0], ct[1], pk[1], asciiToBytes(label))
      const len = 32
      const ikm = concatBytes(asciiToBytes('hybrid_prk'), preimage)
      const prk = hkdfExtract(new Uint8Array(0), ikm)
      const info = concatBytes(
        numberToBytesBE(len, 2),
        asciiToBytes('shared_secret'),
        asciiToBytes(''),
      )
      const res = hkdfExpand(prk, info, len)
      cleanBytes(prk, info, ikm, preimage)
      return res
    },
    pqc,
    curveKEM,
  )
}

/** kitchenSinkMlKem768X25519 — KitchenSink preset (ML-KEM-768 + X25519, SHAKE256 expand, HKDF-SHA256 combine). */
export const kitchenSinkMlKem768X25519: TRet<KEM> = /* @__PURE__ */ createKitchenSink(
  'KitchenSink-KEM(ML-KEM-768,X25519)-XOF(SHAKE256)-KDF(HKDF-SHA-256)',
  ml_kem768,
  x25519kem,
  shake256,
)
