// x25519 — RFC 7748 ECDH on Curve25519 (Montgomery ladder; vendored from noble-curves).
import { montgomery, type MontgomeryECDH } from './montgomery.js'
import { mod, pow2 } from './modular.js'
import type { TArg, TRet } from './curve-utils.js'

const _1n = /* @__PURE__ */ BigInt(1)
const _2n = /* @__PURE__ */ BigInt(2)
const _3n = /* @__PURE__ */ BigInt(3)
const _5n = /* @__PURE__ */ BigInt(5)
const _10n = /* @__PURE__ */ BigInt(10)
const _20n = /* @__PURE__ */ BigInt(20)
const _40n = /* @__PURE__ */ BigInt(40)
const _80n = /* @__PURE__ */ BigInt(80)

const P = /* @__PURE__ */ BigInt(
  '0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed',
)

function powPminus2(x: bigint): bigint {
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
  return mod(pow2(pow_p_5_8, _3n, P) * b2, P)
}

function adjustScalarBytes(bytes: TArg<Uint8Array>): TRet<Uint8Array> {
  bytes[0] &= 248
  bytes[31] &= 127
  bytes[31] |= 64
  return bytes as TRet<Uint8Array>
}

/** x25519 — X25519 ECDH (keygen, getPublicKey, getSharedSecret). */
export const x25519: TRet<MontgomeryECDH> = /* @__PURE__ */ montgomery({
  P,
  type: 'x25519',
  adjustScalarBytes,
  powPminus2,
})
