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

// ── WHAT THE SECURITY COSTS, PRICED ON THIS MACHINE (the captain: "let the stats show the security level") ────
//
// The same clock that measures speed can price an attacker's guess, and the two numbers belong side by side
// because they are the same number seen from opposite ends. Every millisecond a legitimate first send waits is
// a millisecond an attacker pays PER GUESS — that is what 600,000 iterations buys, and it is the honest reading
// of "highest speed comes at highest security": the cost is real, it is paid once by the user and once per
// attempt by everyone else.
//
// WHAT IS SEALED AND WHAT IS MEASURED are kept apart here, because they are different kinds of fact. The bit
// widths are sealed theorems — KEY_BITS = 256, the address 128, the Grover floor 128 (sha256_grover_margin_is_
// the_address). The guess rate is MEASURED on whatever host is asking, and it is the softest figure on the page.
//
// AND THE ATTACKER IS NOT USING THIS LAPTOP. A defender measures one derivation on one core in a browser; an
// adversary buys GPUs and runs thousands of PBKDF2 lanes in parallel, and published figures put that advantage
// in the 10³–10⁴ range for PBKDF2-HMAC-SHA256. So the number reported is DEFENDER-RATE, stated as such, with the
// adversary factor named rather than folded in — a security claim that quietly assumes the attacker shares your
// hardware is not a security claim.
import { KEY_BITS, GROVER_FLOOR_BITS, ADDRESS_BYTES as ADDR_BYTES } from '../../hexbit/index.js'

export interface SecurityLevel {
  /** SEALED — bit widths the ledger proves, not measured here */
  sealed: { keyBits: number; addressBits: number; groverFloorBits: number; iterations: number; aead: string; kdf: string }
  /** MEASURED — one full session derivation on this host, in milliseconds */
  derivationMs: number | null
  /** derived from the measurement: how many passphrase guesses one core of THIS host manages per second */
  defenderGuessesPerSecond: number | null
  /** the order-of-magnitude advantage a GPU adversary is generally credited with for PBKDF2-HMAC-SHA256 */
  adversaryFactor: number
  honest: string
}

/** securityLevel() → what is proven, what was measured here, and what an adversary changes about the reading. */
export async function securityLevel(): Promise<SecurityLevel> {
  const subtle = subtleOf()
  let derivationMs: number | null = null
  if (subtle && (await hostAgrees(subtle))) {
    const pass = enc.encode('uuidna-security-probe')
    const salt = sessionSalt('uuidna-security-probe')
    const t0 = Date.now()
    await hostDerive(subtle, pass, salt, ITER)
    derivationMs = Date.now() - t0
  }
  return {
    sealed: {
      keyBits: KEY_BITS,
      addressBits: ADDR_BYTES * 8,
      groverFloorBits: GROVER_FLOOR_BITS,
      iterations: ITER,
      aead: 'ChaCha20-Poly1305 (RFC 8439)',
      kdf: 'PBKDF2-HMAC-SHA256',
    },
    derivationMs,
    // integer-exact: guesses per second is 1000/ms, floored, and a derivation too fast to time reports null
    defenderGuessesPerSecond: derivationMs && derivationMs > 0 ? Number(1000n / BigInt(derivationMs)) : null,
    adversaryFactor: 1000,
    honest:
      'The bit widths are SEALED (KEY_BITS, the address, the Grover floor). The guess rate is MEASURED on this ' +
      'host, one core, and is the softest figure here: a GPU adversary running PBKDF2 lanes in parallel is ' +
      'generally credited with a 10^3-10^4 advantage, which is named rather than folded in. What 600,000 ' +
      'iterations buys is that every guess costs an attacker what your first send cost you — once for you, ' +
      'once per attempt for them.',
  }
}
