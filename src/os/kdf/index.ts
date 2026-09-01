// @non-harmonic: reaches the HOST's accelerated crypto when it exists — a fact about the machine, not a theorem.
//
// os/kdf — WARM THE SESSION KEY WITH WHATEVER THE HOST HAS, then let the synchronous path run free.
//
// THE WALL, measured in a real browser on /os: chatSend #0 cost 25.7 s in a background tab (8.5 s on mount)
// because deriving the session key runs PBKDF2 at 600,000 iterations in pure TypeScript. chatSend #1 on the same
// session cost 2.4 ms — about 10,700× cheaper — because the ratchet rotates from a key already in hand. The
// design was never the problem; the FIRST derivation was, and a multi-second wait before a first message is a
// wall a person actually hits.
//
// Node has had the cure all along: crypt.ts reaches node:crypto's pbkdf2Sync when it is there. A browser has an
// equally good primitive in crypto.subtle.deriveBits — and it is ASYNC, which is why it could not simply be
// dropped into a synchronous send. It does not have to be. The derivation is CACHED, so an async warmer can
// compute the key with the host's primitive, put it in the cache, and every synchronous send afterwards finds it
// already there. The sync API keeps its shape and the pure implementation stays the definition.
//
// IT VERIFIES ITSELF ONCE, AND THAT IS NOT OPTIONAL. A wrong key does not fail loudly here — it seals messages
// that nobody, including the sender, can ever open, and the failure surfaces long after the cause. So the first
// warm derives the same key BOTH ways for a throwaway input and compares them byte for byte; if the host's
// answer disagrees with the pure implementation, the accelerator is refused for the rest of the process and
// everything falls back to the slow path that is known to be right. Slow and correct beats fast and unopenable.
import { ITER, SALT_BYTES, kdfCacheKey, primeKdfCache } from '../../crypt.js'
import { pbkdf2Sha256, sha256 } from '../../sha256.js'
import { KEY_BYTES } from '../../hexbit/index.js'

const enc = new TextEncoder()

/** the salt encryptSession derives for a session — the same string, or the warmed key lands under the wrong door */
export const sessionSalt = (session: string): Uint8Array =>
  sha256(enc.encode('uuidna-session-salt-v3|' + session)).slice(0, SALT_BYTES)

type Subtle = {
  importKey: (f: string, k: Uint8Array, a: string, e: boolean, u: string[]) => Promise<unknown>
  deriveBits: (a: unknown, k: unknown, n: number) => Promise<ArrayBuffer>
}

const subtleOf = (): Subtle | null => {
  const c = (globalThis as { crypto?: { subtle?: Subtle } }).crypto
  return c?.subtle && typeof c.subtle.deriveBits === 'function' ? c.subtle : null
}

let trusted: boolean | null = null   // null = not yet checked; false = the host disagreed and is refused

async function hostDerive(subtle: Subtle, pass: Uint8Array, salt: Uint8Array, iter: number): Promise<Uint8Array> {
  const material = await subtle.importKey('raw', pass, 'PBKDF2', false, ['deriveBits'])
  const bits = await subtle.deriveBits({ name: 'PBKDF2', salt, iterations: iter, hash: 'SHA-256' }, material, KEY_BYTES * 8)
  return new Uint8Array(bits)
}

/** does this host's PBKDF2 agree with ours? Checked ONCE, on a throwaway input, at a cheap iteration count. */
async function hostAgrees(subtle: Subtle): Promise<boolean> {
  if (trusted !== null) return trusted
  try {
    // 1,000 iterations: enough to exercise the same code path, cheap enough to check on every process that warms
    const pass = enc.encode('uuidna-kdf-selftest'), salt = enc.encode('uuidna-kdf-salt-0123')
    const host = await hostDerive(subtle, pass, salt, 1000)
    const pure = pbkdf2Sha256(pass, salt, 1000, KEY_BYTES)
    trusted = host.length === pure.length && host.every((b, i) => b === pure[i])
  } catch { trusted = false }
  return trusted
}

export type WarmResult =
  | { warmed: true; by: 'host-subtle'; ms: null }
  | { warmed: false; why: 'no accelerated primitive on this host' | 'host PBKDF2 disagreed with ours — refused' | 'the derivation threw' }

/** warmSession(passphrase, session) → derive the session key with the host's primitive and cache it.
 *
 *  Returns warmed:false honestly rather than throwing; the caller can still send, it will simply pay the pure
 *  cost. Idempotent: warming twice puts the same key in the same slot. */
export async function warmSession(passphrase: string, session: string): Promise<WarmResult> {
  const subtle = subtleOf()
  if (!subtle) return { warmed: false, why: 'no accelerated primitive on this host' }
  if (!(await hostAgrees(subtle))) return { warmed: false, why: 'host PBKDF2 disagreed with ours — refused' }
  try {
    const pass = enc.encode(passphrase)
    const salt = sessionSalt(session)
    const key = await hostDerive(subtle, pass, salt, ITER)
    primeKdfCache(kdfCacheKey(pass, salt, ITER), key)
    return { warmed: true, by: 'host-subtle', ms: null }
  } catch {
    return { warmed: false, why: 'the derivation threw' }
  }
}
