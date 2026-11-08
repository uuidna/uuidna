import { aeadOpen, aeadSeal, concat, drbgOf, ed25519PublicKey, ed25519Sign, ed25519Verify, equal, fromHex, sha256, sha512, utf8, uuidOfBytes, x25519PublicKey, x25519Shared } from './crypt.js'
import { QuantumSecureSignalling } from '../families/signal/index.js'
import { BB84_RAW, SecureChat } from '../mcp/secure-chat-rbac.js'
import { HologramStreams, holoEntryHolds, holoStreamHolds } from '../families/holo/index.js'

export interface Attack {
  name: string
  target: string
  trials: number
  /** trials in which the attack got through */
  breaches: number
  resisted: boolean
  detail: string
}

const P = (1n << 255n) - 19n
const L = (1n << 252n) + 27742317777372353535851937790883648493n
const le = (v: bigint, n = 32): Uint8Array => {
  const out = new Uint8Array(n)
  for (let i = 0; i < n; i++, v >>= 8n) out[i] = Number(v & 0xffn)
  return out
}
const leBig = (b: Uint8Array): bigint => b.reduceRight((v, x) => (v << 8n) | BigInt(x), 0n)

const attack = (name: string, target: string, trials: number, breached: (i: number) => boolean, detail: string): Attack => {
  let breaches = 0
  for (let i = 0; i < trials; i++) if (breached(i)) breaches++
  return { name, target, trials, breaches, resisted: breaches === 0, detail }
}

/** The attack inputs: a fixed seed, so every attack draws the same bytes on every run and in any order. */
const FIXTURE = sha256(utf8('qpu crypt-attacks fixture'))
const fixture = (n: number): Uint8Array => drbgOf(FIXTURE)(n)

/** A signature that verifies under a small-order public key for any message: S = s, R = sB. */
const smallOrderForgery = (A: Uint8Array, message: Uint8Array): boolean => {
  const seed = fixture(32)
  const h = sha512(seed).slice(0, 32)
  h[0]! &= 248
  h[31]! &= 127
  h[31]! |= 64
  return ed25519Verify(A, message, concat(ed25519PublicKey(seed), le(leBig(h) % L)))
}

const LOW_ORDER_U = [0n, 1n, P - 1n, P, P + 1n].map((v) => le(v)).concat(
  ['e0eb7a7c3b41b8ae1656e3faf19fc46ada098deb9c32b1fd866205165f49b800', '5f9c95bca3508c24b1d0b1559c83ef5b04445cc4581c8e86d8224eddd09f1157'].map(fromHex),
)

const chatOf = () => {
  const chat = new SecureChat()
  const tokens = Object.fromEntries(['alice', 'bob', 'carol', 'eve'].map((u) => [u, chat.registerUser(u, 'user')]))
  return { chat, tokens, signaller: chat.getSignaller(), key: (u: string) => chat.getKeyId(u)! }
}

export const attacksOf = (): Attack[] => {
  const m = utf8('transfer 100 to bob')
  const seed = fixture(32)
  const pub = ed25519PublicKey(seed)
  const sig = ed25519Sign(seed, m)
  const { chat, tokens, signaller, key } = chatOf()
  const body = utf8('the meeting moved to 9')
  const msg = chat.sendMessage(tokens.alice!, ['bob', 'carol'], 'plan', body)!
  const toBob = msg.signals.bob!
  const decrypts = (signal: typeof toBob, recipient: string, sender = 'alice') => {
    try {
      return equal(signaller.decryptSignal(signal, key(recipient), key(sender)), body)
    } catch {
      return false
    }
  }
  const key32 = fixture(32), nonce = fixture(12), aad = utf8('header')
  const sealed = aeadSeal(key32, nonce, body, aad)
  const flip = (b: Uint8Array, at: number) => {
    const c = b.slice()
    c[at % c.length]! ^= 1
    return c
  }

  const scales = ['occupancy', 'skill', 'access', 'mcp', 'faces']
  const holo = new HologramStreams(scales, FIXTURE)
  const other = new HologramStreams(scales, sha256(utf8('crypt-attacks other hologram')))
  const stream = [0, 1, 2, 3].map((i) => holo.append('skill', { part: i }))
  const foreign = [0, 1].map((i) => other.append('skill', { part: i }))
  const keys = holo.publicKeys()

  return [
    attack('hologram payload tamper', 'hologram', 1, () => holoEntryHolds(stream[1]!, keys, { part: 9 }), 'fragment checked against another value'),
    attack('hologram reorder', 'hologram', 1, () => holoStreamHolds([stream[1]!, stream[0]!, stream[2]!, stream[3]!], keys), 'two fragments swapped'),
    attack('hologram splice', 'hologram', 1, () => holoStreamHolds([stream[0]!, foreign[1]!, stream[2]!, stream[3]!], keys), "a fragment from another hologram's stream"),
    attack('hologram root swap', 'hologram', 1, () => holoEntryHolds({ ...stream[2]!, root: foreign[1]!.root }, keys), 'fragment claims another whole'),
    attack('hologram prev rewrite', 'hologram', 1, () => holoEntryHolds({ ...stream[2]!, prev: stream[0]!.uuid }, keys), 'history rewritten'),
    attack('hologram signature forgery', 'hologram', 1, () => holoEntryHolds({ ...stream[3]!, signature: foreign[1]!.signature }, keys), 'signature lifted from another fragment'),
    attack('ed25519 identity public key', 'ed25519', 16, () => smallOrderForgery(le(1n), fixture(32)), 'forge for any message under A = identity'),
    attack('ed25519 order-2 public key', 'ed25519', 16, () => smallOrderForgery(le(P - 1n), fixture(32)), 'forge under A = (0, -1); succeeds whenever k is even'),
    attack('ed25519 malleability S + L', 'ed25519', 1, () => ed25519Verify(pub, m, concat(sig.subarray(0, 32), le(leBig(sig.subarray(32)) + L))), 'second valid signature from the first'),
    attack('ed25519 non-canonical R', 'ed25519', 1, () => ed25519Verify(pub, m, concat(le(P + 1n), sig.subarray(32))), 'R with y = p + 1'),
    attack('ed25519 bit-flip forgery', 'ed25519', 64, (i) => ed25519Verify(pub, m, flip(sig, i)), 'every bit position of the signature'),
    attack('ed25519 message substitution', 'ed25519', 1, () => ed25519Verify(pub, utf8('transfer 900 to eve'), sig), 'same signature, other message'),
    attack('x25519 low-order points', 'x25519', LOW_ORDER_U.length, (i) => x25519Shared(fixture(32), LOW_ORDER_U[i]!) !== null, 'u in {0, 1, p-1, p, p+1} and the two order-8 points'),
    attack('x25519 contributory', 'x25519', 4, () => equal(x25519Shared(fixture(32), x25519PublicKey(fixture(32)))!, new Uint8Array(32)), 'honest exchange yields zero'),
    attack('aead ciphertext tamper', 'chacha20-poly1305', sealed.length, (i) => aeadOpen(key32, nonce, flip(sealed, i), aad) !== null, 'every byte of ciphertext and tag'),
    attack('aead header tamper', 'chacha20-poly1305', 1, () => aeadOpen(key32, nonce, sealed, utf8('Header')) !== null, 'associated data changed'),
    attack('aead truncation', 'chacha20-poly1305', 1, () => aeadOpen(key32, nonce, sealed.subarray(0, sealed.length - 1), aad) !== null, 'tag shortened'),
    attack('aead wrong nonce', 'chacha20-poly1305', 1, () => aeadOpen(key32, fixture(12), sealed, aad) !== null, 'nonce replaced'),
    attack('bb84 intercept-resend', 'bb84', 200, () => QuantumSecureSignalling.sift(QuantumSecureSignalling.BB84KeyGen(BB84_RAW, FIXTURE), true, FIXTURE).holds, `Eve measures every qubit; QBER must exceed the bound (raw ${BB84_RAW})`),
    attack('chat impersonation', 'chat', 1, () => decrypts({ ...toBob, signature: ed25519Sign(fixture(32), concat(utf8(`${toBob.id}|${key('alice')}|${key('bob')}`), toBob.nonce, toBob.signal)) }, 'bob'), 'Eve re-signs a signal as Alice'),
    attack('chat redirect', 'chat', 1, () => decrypts(toBob, 'carol'), "Bob's signal presented to Carol"),
    attack('chat envelope swap', 'chat', 1, () => chat.decryptMessageBody({ ...msg, signals: { ...msg.signals, carol: toBob } }, tokens.carol!) !== null, "Carol's envelope replaced by Bob's"),
    attack('chat outsider read', 'chat', 1, () => chat.decryptMessageBody(msg, tokens.eve!) !== null, 'Eve is not a recipient'),
    attack('chat ciphertext tamper', 'chat', 1, () => decrypts({ ...toBob, signal: flip(toBob.signal, 3) }, 'bob'), 'one bit of the sealed body'),
    attack('chat two-time pad', 'chat', 1, () => {
      const again = chat.sendMessage(tokens.alice!, ['bob'], 'plan', body)!.signals.bob!
      return equal(again.signal.subarray(0, body.length), toBob.signal.subarray(0, body.length))
    }, 'same plaintext twice must not give the same keystream'),
    attack('drbg repetition', 'drbg', 1, () => { const draw = drbgOf(FIXTURE); return new Set(Array.from({ length: 4096 }, () => uuidOfBytes(draw(16)))).size !== 4096 }, 'the first 4096 UUIDs of the fixed stream'),
    attack('drbg monobit', 'drbg', 1, () => {
      const bytes = fixture(1 << 17)
      let ones = 0
      for (const b of bytes) for (let x = b; x; x &= x - 1) ones++
      const n = bytes.length * 8
      return Math.abs(ones - n / 2) > 4 * Math.sqrt(n / 4)
    }, 'bit balance within 4 sigma over 2^20 bits'),
  ]
}
