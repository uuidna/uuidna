// ed25519 — Ed25519 signatures only (minimal noble-curves vendoring for ecSigner hybrids).
import { sha512 } from './sha2.js'
import { abytes, concatBytes } from './hash-utils.js'
import { asciiToBytes, bytesToNumberLE, type TArg, type TRet } from './curve-utils.js'
import { eddsa, edwards, type EdDSA, type EdDSAOpts, type EdwardsPoint } from './edwards.js'
import { FpSqrtEven, isNegativeLE, mod, pow2 } from './modular.js'

const _0n = /* @__PURE__ */ BigInt(0)
const _1n = /* @__PURE__ */ BigInt(1)
const _2n = /* @__PURE__ */ BigInt(2)
const _3n = /* @__PURE__ */ BigInt(3)
const _5n = /* @__PURE__ */ BigInt(5)
const _10n = /* @__PURE__ */ BigInt(10)
const _20n = /* @__PURE__ */ BigInt(20)
const _40n = /* @__PURE__ */ BigInt(40)
const _80n = /* @__PURE__ */ BigInt(80)

const ed25519_CURVE_p = /* @__PURE__ */ BigInt(
  '0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed',
)

const ed25519_CURVE = {
  p: ed25519_CURVE_p,
  n: BigInt('0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed'),
  h: BigInt(8),
  a: BigInt('0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec'),
  d: BigInt('0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3'),
  Gx: BigInt('0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a'),
  Gy: BigInt('0x6666666666666666666666666666666666666666666666666666666666666658'),
}

function ed25519_pow_2_252_3(x: bigint) {
  const P = ed25519_CURVE_p
  const x2 = (x * x) % P
  const b2 = (x2 * x) % P
  const b4 = (pow2(b2, _2n, P) * b2) % P
  const b5 = (pow2(b4, _1n, P) * x) % P
  const b10 = (pow2(b5, _5n, P) * b5) % P
  const b20 = (pow2(b10, _10n, P) * b10) % P
  const b40 = (pow2(b20, _20n, P) * b20) % P
  const b80 = (pow2(b40, _40n, P) * b40) % P
  const b160 = (pow2(b80, _80n, P) * b80) % P
  const b240 = (pow2(b160, _80n, P) * b80) % P
  const b250 = (pow2(b240, _10n, P) * b10) % P
  const pow_p_5_8 = (pow2(b250, _2n, P) * x) % P
  return { pow_p_5_8, b2 }
}

const ED25519_SQRT_M1 = /* @__PURE__ */ BigInt(
  '19681161376707505956807079304988542015446066515923890162744021073123829784752',
)

function uvRatio(u: bigint, v: bigint): { isValid: boolean; value: bigint } {
  const P = ed25519_CURVE_p
  const v3 = mod(v * v * v, P)
  const v7 = mod(v3 * v3 * v, P)
  const pow = ed25519_pow_2_252_3(u * v7).pow_p_5_8
  let x = mod(u * v3 * pow, P)
  const vx2 = mod(v * x * x, P)
  const root1 = x
  const root2 = mod(x * ED25519_SQRT_M1, P)
  const useRoot1 = vx2 === u
  const useRoot2 = vx2 === mod(-u, P)
  const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P)
  if (useRoot1) x = root1
  if (useRoot2 || noRoot) x = root2
  if (isNegativeLE(x, P)) x = mod(-x, P)
  return { isValid: useRoot1 || useRoot2, value: x }
}

const ed25519_Point = /* @__PURE__ */ edwards(ed25519_CURVE, { uvRatio })
const Fp = ed25519_Point.Fp

function adjustScalarBytes(bytes: TArg<Uint8Array>): TRet<Uint8Array> {
  bytes[0] &= 248
  bytes[31] &= 127
  bytes[31] |= 64
  return bytes as TRet<Uint8Array>
}

function toMontgomery(point: EdwardsPoint): TRet<Uint8Array> {
  const { y } = point
  return Fp.toBytes(Fp.div(_1n + y, _1n - y)) as TRet<Uint8Array>
}

function toMontgomerySecret(secretKey: TArg<Uint8Array>): TRet<Uint8Array> {
  const size = ed25519_Point.Fp.BYTES
  abytes(secretKey, size)
  return adjustScalarBytes(sha512(secretKey.subarray(0, size))).subarray(0, size) as TRet<Uint8Array>
}

function ed(opts: TArg<EdDSAOpts> = {}) {
  return eddsa(ed25519_Point, sha512, {
    adjustScalarBytes,
    toMontgomery,
    toMontgomerySecret,
    zip215: true,
    ...opts,
  })
}

/** ed25519 — Ed25519 sign/verify/keygen. */
export const ed25519: EdDSA = /* @__PURE__ */ ed({})
