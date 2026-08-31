// curve-keygen — minimal keygen helper for Montgomery ECDH (from noble-curves abstract/curve).
import type { TArg, TRet } from './curve-utils.js'

export interface CurveLengths {
  secretKey: number
  publicKey: number
  seed?: number
}

type KeygenFn = (seed?: Uint8Array) => { secretKey: Uint8Array; publicKey: Uint8Array }

/** createKeygen(randomSecretKey, getPublicKey) → seeded keypair generator. */
export function createKeygen(
  randomSecretKey: Function,
  getPublicKey: (secretKey: TArg<Uint8Array>) => TRet<Uint8Array>,
): TRet<KeygenFn> {
  return function keygen(seed?: TArg<Uint8Array>) {
    const secretKey = randomSecretKey(seed) as TRet<Uint8Array>
    return { secretKey, publicKey: getPublicKey(secretKey) as TRet<Uint8Array> }
  }
}
