// stream — encrypted UUID messaging streams. Onion-seal a message under N passphrases (each a real
// ChaCha20-Poly1305 layer, crypt.ts), then carry the outer envelope ENTIRELY inside a chain of uuids (imprint.ts).
// openStream peels the layers back to the plaintext. The message channel IS the uuid stream — no separate blob.
//
//  (integrity
//  · Layers are BOUNDED (1..MAX_LAYERS). Each onion wrap re-encodes the layer below as base64
//    JSON, so the sealed size grows ~(4/3)^N — unbounded depth is physically impossible.
//    The "infinities" in this repo are the FINITE Lean witnesses (lean/Infinity.lean).
//  · Secrecy comes ONLY from the ChaCha20-Poly1305 layers. The uuid transport (imprint) is NOT encryption — its
//    bits are public and hide nothing; opening still needs every passphrase, applied outermost-first.
//  · The stream's receipt is a public 7d-fold content-address (non-crypto FNV). In a CHAIN it is not passive:
//    each link's receipt ROTATES the next link's step (sealChain — the referer sequence), so the whole stream
//    is forward-linked and every step is fresh. That rotation buys FRESHNESS, LINKAGE and accidental-tamper-
//    evidence (a dropped/reordered/edited link breaks the referer) — NOT secrecy and NOT a binding commitment
//    (FNV is not collision-resistant). Secrecy and authentication stay with the ChaCha20-Poly1305 layers + tag.
import { encrypt, decrypt, type Sealed } from './crypt.js'
import { imprintTextChain, readImprintTextChain } from './imprint.js'
import { merkleFold, toUuid } from './address.js'
import { HEXBIT_STATES, SAFE_HEXBITS, HANDLE_HEXBITS } from './hexbit/index.js'
import { balanceStream, jobHandles, mapAcross, type StreamBalance } from './quantum/apps/balancer.js'

/** Bounded onion depth. Each layer re-base64s the one below (~4/3× size), so depth is finite by construction. */
export const MAX_LAYERS = HEXBIT_STATES

/** A sealed stream: the onion ciphertext carried as a uuid chain, its layer count, and its 7d-fold receipt. */
export interface Stream {
  uuids: string[]
  layers: number
  receipt: string
}

const check = (passphrases: readonly string[]): void => {
  if (passphrases.length < 1) throw new Error('stream: need at least 1 passphrase — 1 encryption layer')
  if (passphrases.length > MAX_LAYERS)
    throw new Error(`stream: ${passphrases.length} layers > MAX_LAYERS ${MAX_LAYERS} — layers are bounded`)
}

/** sealStream(message, passphrases[, step]) → a uuid chain carrying the onion-sealed message. Layer order:
 *  passphrases[0] is the INNERMOST wrap, passphrases[n-1] the OUTERMOST. Pass an advancing `step` (the crypt
 *  salt) so a repeated message seals differently across a stream — the equality leak stays closed. */
export function sealStream(message: string, passphrases: readonly string[], step?: number): Stream {
  check(passphrases)
  let payload = message
  for (const p of passphrases) payload = JSON.stringify(encrypt(payload, p, step))
  const uuids = imprintTextChain(payload)
  return { uuids, layers: passphrases.length, receipt: merkleFold(uuids) }
}

/** openStream(uuids, passphrases) → the original message. Peels the onion OUTERMOST-first, applying the
 *  passphrases in REVERSE order (passphrases[n-1] … passphrases[0]). A wrong passphrase, a reordered key list,
 *  or a tampered chain throws (Poly1305 authentication). */
export function openStream(uuids: readonly string[], passphrases: readonly string[]): string {
  check(passphrases)
  let payload = readImprintTextChain(uuids)
  for (let i = passphrases.length - 1; i >= 0; i--) {
    const sealed = JSON.parse(payload) as Sealed
    payload = decrypt(sealed, passphrases[i])
  }
  return payload
}

/** Independent messages each get a handle so the CPU/GPU balancer can residue-map them. */
export function streamHandles(messages: readonly string[], start = 0): string[] {
  return jobHandles('stream', messages, start)
}

/** Same seals as a serial map, assigned across the CPU/GPU fleet. Onion layers and sealChain stay serial. */
export function sealMessagesAcross(
  messages: readonly string[],
  passphrases: readonly string[],
  cpuWorkers: number = HANDLE_HEXBITS,
  start = 0,
): { streams: Stream[]; balance: StreamBalance } {
  const handles = streamHandles(messages, start)
  const balance = balanceStream(handles, cpuWorkers)
  const streams = mapAcross(handles, balance.workers, (i) => sealStream(messages[i]!, passphrases, start + i))
  return { streams, balance }
}

/** sealMessages — one stream per message, step advancing, routed through the CPU/GPU fleet. */
export function sealMessages(messages: readonly string[], passphrases: readonly string[], start = 0): Stream[] {
  return sealMessagesAcross(messages, passphrases, HANDLE_HEXBITS, start).streams
}

/** openMessages(streams, passphrases) → the original messages, in order. */
export function openMessages(streams: readonly Stream[], passphrases: readonly string[]): string[] {
  return streams.map((s) => openStream(s.uuids, passphrases))
}

/** A ratchet link: a sealed Stream plus the `referer` (the prior link's receipt) and the `step` that receipt
 *  rotated to. The chain is forward-linked — link i's receipt is link i+1's referer. */
export interface Link extends Stream {
  referer: string
  step: number
}

export const GENESIS = 'uuidna-genesis' // the chain's zeroth referer — toUuid(GENESIS) seeds the first step

/** Rotate a receipt (uuid) to a non-negative step: the first 13 hex nibbles (52 bits, a safe integer). Content-
 *  derived and deterministic, so the same referer always rotates to the same step, and distinct links differ. */
const stepOf = (referer: string): number => parseInt(referer.replace(/-/g, '').slice(0, SAFE_HEXBITS), 16)

/** sealChain(messages, passphrases[, genesis]) → a forward-linked (ratcheting) stream. Each message onion-seals
 *  at a step ROTATED from the prior link's receipt (the referer), so every step is fresh and the whole stream is
 *  content-chained. Public rotation: freshness + linkage + accidental-tamper-evidence. */
export function sealChain(messages: readonly string[], passphrases: readonly string[], genesis = GENESIS): Link[] {
  check(passphrases)
  const out: Link[] = []
  let referer = toUuid(genesis)
  for (const m of messages) {
    const step = stepOf(referer)
    const s = sealStream(m, passphrases, step)
    out.push({ ...s, referer, step })
    referer = s.receipt // this link's receipt hardens the next — the rotation
  }
  return out
}

/** openChain(links, passphrases[, genesis]) → the original messages, in order. Verifies the referer chain rotates
 *  correctly and each receipt matches its uuids BEFORE decrypting — a dropped, reordered, or edited link throws. */
export function openChain(links: readonly Link[], passphrases: readonly string[], genesis = GENESIS): string[] {
  check(passphrases)
  const out: string[] = []
  let referer = toUuid(genesis)
  for (const link of links) {
    if (link.referer !== referer) throw new Error('stream: broken chain — referer mismatch (a link was dropped, reordered, or tampered)')
    if (link.step !== stepOf(referer)) throw new Error('stream: broken chain — step did not rotate from its referer')
    if (merkleFold(link.uuids) !== link.receipt) throw new Error('stream: receipt does not match its uuid chain')
    out.push(openStream(link.uuids, passphrases))
    referer = link.receipt // rotate to the next
  }
  return out
}
