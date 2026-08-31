// nist — P-256 and P-384 ECDH/ECDSA (minimal noble-curves vendoring for hybrid KEM presets).
import { sha256, sha384 } from './sha2.js'
import { ecdsa, weierstrass, type ECDSA, type WeierstrassOpts } from './weierstrass.js'

const p256_CURVE: WeierstrassOpts<bigint> = {
  p: BigInt('0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff'),
  n: BigInt('0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551'),
  h: BigInt(1),
  a: BigInt('0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc'),
  b: BigInt('0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b'),
  Gx: BigInt('0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296'),
  Gy: BigInt('0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5'),
}

const p384_CURVE: WeierstrassOpts<bigint> = {
  p: BigInt('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff'),
  n: BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973'),
  h: BigInt(1),
  a: BigInt('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc'),
  b: BigInt('0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef'),
  Gx: BigInt('0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7'),
  Gy: BigInt('0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f'),
}

const p256_Point = /* @__PURE__ */ weierstrass(p256_CURVE)
const p384_Point = /* @__PURE__ */ weierstrass(p384_CURVE)

/** NIST P-256 (secp256r1) ECDSA + ECDH. */
export const p256: ECDSA = /* @__PURE__ */ ecdsa(p256_Point, sha256)

/** NIST P-384 (secp384r1) ECDSA + ECDH. */
export const p384: ECDSA = /* @__PURE__ */ ecdsa(p384_Point, sha384)
