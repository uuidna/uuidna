// handle — THE ADDRESS IS THE PATH, AND THE PATH IS THE ADDRESS.
//
// A handle is eight hex characters, which is why it splits FOUR ways at two characters each: cc9c0011 becomes
// cc/9c/00/11. That is not a chosen convention — it is the shape the handles already have. `chunkHandleOf` has
// been producing them all along, and `src/chunks/` already nests them one level deep at two characters. This
// carries the same split to its full depth, so a handle names a directory and a directory names a handle.
//
// WHY FOUR LEVELS AND NOT ONE. A flat store of thousands of payloads is a directory listing; a nested one is an
// index. Each level narrows by 256, so four levels address 4,294,967,296 handles with no directory ever holding
// more than 256 entries — the tree stays balanced without anything balancing it. Sorting is free, because
// lexicographic order over the path IS numeric order over the handle.
//
// THE ROUND TRIP IS THE POINT. `handleOfPath(handlePath(h)) === h` for every valid handle, and the test proves it
// over the live ledger rather than over examples. An address scheme that cannot be inverted is a naming scheme,
// and a naming scheme drifts: today the site derived its structure one way and the MCP catalogue another, and the
// two could not be checked against each other because neither could recover the other's identity. A reversible
// path means the payload store and the tool that serves it are the same object seen twice.
//
// Handles are LOWERCASE hex. Anything else is refused rather than coerced, because a scheme that silently accepts
// a near-miss will happily address two payloads to one place.

import { ROOT, existsRoot, rdRoot } from './boundary.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'

const onHost = (): boolean => ROOT.length > 0

export const HANDLE_ROOT = 'src/handles'

/** eight lowercase hex characters — the shape chunkHandleOf already emits */
const HANDLE = /^[0-9a-f]{8}$/

export const isHandle = (h: string): boolean => HANDLE.test(h)

/** handleOf(address) → THE ONE derivation of a handle from a content-address: strip the hyphens, take eight hex.
 *
 *  It was written three times before it was written once — gen-handle-chunks stripped the hyphens first, while
 *  editor.ts and mcp.ts sliced the raw string — and the three agreed only because a v8 UUID's FIRST GROUP happens
 *  to be exactly eight hex characters. That is agreement by coincidence of formatting
 *  those call sites an address written without hyphens, or one folded to a different shape, and they diverge in
 *  silence. Every handle in the repository now comes from here, so there is one identity scheme and not three
 *  that look alike. Refuses rather than coerces, which is the same law isHandle already holds. */
export function handleOf(address: string): string {
  const hex = String(address).replace(/-/g, '').toLowerCase()
  const handle = hex.slice(0, 8)
  if (!HANDLE.test(handle)) throw new Error(`handle: "${address}" does not begin with eight hex characters`)
  return handle
}

/** seedOf(address) → the handle read as an INTEGER: the one way this repository turns a content-address into a
 *  number. It was six inline expressions before it was one — aura.ts and captain/repos carried character-identical
 *  copies, refactor.ts and holofractal.ts each wrote their own, iq-books a fourth, and css.ts computed the SAME
 *  VALUE by a different route entirely (`Number(BigInt('0x' + h))` where the others used `parseInt(h, 16)`). The
 *  two routes agree — verified over the domain edges and a sweep— which is exactly why the split
 *  survived: nothing ever disagreed, so nothing ever complained, and a reader had no way to tell that six places
 *  meant one thing.
 *
 *  WHAT DELIBERATELY DOES NOT COME HERE, because merging these would be wrong rather than tidy: stream.ts slices
 *  THIRTEEN hex (a wider step, on purpose), the rosette in theorems/index.ts folds the WHOLE address mod 7 (a
 *  different domain, not a truncation), render.ts indexes single digits, and payload-seed expands hex to bits.
 *  Same-looking code, different acts. */
export const seedOf = (address: string): number => parseInt(handleOf(address), 16)

/** laneOf(address, lanes) → which executor this work belongs to, decided by the address itself.
 *
 *  THE ADDRESS IS ALREADY THE ROUTING DECISION. A handle is eight hex characters off a content-address, so its
 *  bits are uniform by construction — which makes the residue a balanced shard key that needs no scheduler, no
 *  queue state and no coordination between lanes. The same input lands on the same lane on every host and every
 *  run, which is the property an arrival-order pool cannot offer: there, assignment depends on who finished first,
 *  so two runs of identical work distribute differently and a timing that moves cannot be attributed.
 *
 *  This is the mod-9 router of src/hardware one level up — addressing as a residue rather than a range — and it
 *  is safe here for the same reason the fold tree is: merkleGravity is order-invariant, so which lane did which
 *  piece cannot change the result, only when it arrives.
 *
 *  WHAT IT COSTS, SAID PLAINLY. Deterministic assignment is NOT work-conserving. An arrival-order pool never lets
 *  a lane idle while work remains; a keyed one can finish five buckets and sit waiting on the sixth, because the
 *  residue knows nothing about how long a piece takes. That trade is real and belongs to the caller: take this
 *  where reproducibility is worth more than makespan, and the arrival pool where it is not. */
export const laneOf = (address: string, lanes: number): number =>
  lanes < 2 ? 0 : seedOf(address) % lanes

/** split a handle into its four parts: cc9c0011 -> ['cc','9c','00','11'] */
export function handleParts(handle: string): string[] {
  if (!isHandle(handle)) throw new Error(`handle must be eight lowercase hex characters, got ${JSON.stringify(handle)}`)
  return [handle.slice(0, 2), handle.slice(2, 4), handle.slice(4, 6), handle.slice(6, 8)]
}

/** Four IPv4 octets — the handle already is a /32. Two hex characters are one octet (00..ff). */
export const HANDLE_OCTETS = 4

const HEX = '0123456789abcdef'
const octetSpan = (): number => {
  let n = 1
  for (let i = 0; i < 2; i++) n = n * HEX.length
  return n
}
const octetBits = (): number => {
  const span = octetSpan()
  let bits = 0
  let n = 1
  while (n < span) { n = n + n; bits++ }
  return bits
}

/** IPv4 netmasks on a handle: /8 /16 /24 /32 — one octet of prefix per step. */
export const ipv4Masks = (): readonly number[] => {
  const b = octetBits()
  const out: number[] = []
  for (let i = 1; i <= HANDLE_OCTETS; i++) out.push(b * i)
  return out
}

/** handleOctets(handle) → four integers 0..255, IPv4 dotted-quad order. */
export function handleOctets(handle: string): [number, number, number, number] {
  const p = handleParts(handle)
  return [parseInt(p[0]!, 16), parseInt(p[1]!, 16), parseInt(p[2]!, 16), parseInt(p[3]!, 16)]
}

/** octetsToHandle(a,b,c,d) → the handle those four octets name. Inverse of handleOctets. */
export function octetsToHandle(a: number, b: number, c: number, d: number): string {
  const span = octetSpan()
  const hex = (n: number): string => {
    if (!Number.isInteger(n) || n < 0 || n >= span) throw new Error(`handle: octet ${n} is not 0..${span - 1}`)
    return HEX[(n - n % 16) / 16]! + HEX[n % 16]!
  }
  return hex(a) + hex(b) + hex(c) + hex(d)
}

/** handleIpv4(handle) → dotted-quad, e.g. cc9c0011 → 204.156.0.17 */
export const handleIpv4 = (handle: string): string => handleOctets(handle).join('.')

/** cidrNetwork(handle, maskBits) → the IPv4 network this handle sits on at that mask (/8 /16 /24 /32). */
export function cidrNetwork(handle: string, maskBits: number): { cidr: string; mask: number; octets: [number, number, number, number] } {
  const bits = octetBits()
  const masks = ipv4Masks()
  if (!masks.includes(maskBits)) throw new Error(`handle: /${maskBits} is not an IPv4 netmask (need /${masks.join(', /')})`)
  const keep = maskBits / bits
  const o = handleOctets(handle)
  const net: [number, number, number, number] = [0, 0, 0, 0]
  for (let i = 0; i < HANDLE_OCTETS; i++) net[i] = i < keep ? o[i]! : 0
  return { cidr: net.join('.') + '/' + maskBits, mask: maskBits, octets: net }
}

/** cidrHostSpan(maskBits) → how many handles sit in one network of that mask: 2^(32−mask). Doubling, never a log. */
export function cidrHostSpan(maskBits: number): number {
  const bits = octetBits()
  const total = bits * HANDLE_OCTETS
  const masks = ipv4Masks()
  if (!masks.includes(maskBits)) throw new Error(`handle: /${maskBits} is not an IPv4 netmask`)
  let n = 1
  for (let i = 0; i < total - maskBits; i++) n = n + n
  return n
}

/** cidrContains(outer, inner) → inner's address sits in outer's network and outer is a strictly shorter prefix. */
export function cidrContains(outer: { cidr: string; mask: number; octets: readonly number[] }, inner: { mask: number; octets: readonly number[] }): boolean {
  if (outer.mask >= inner.mask) return false
  const bits = octetBits()
  const keep = outer.mask / bits
  for (let i = 0; i < keep; i++) if (outer.octets[i] !== inner.octets[i]) return false
  return true
}

/** Reverse by path parts — a prefix of k chunks becomes a suffix of k chunks. Involution. */
export function reverseHandle(handle: string): string {
  return handleParts(handle).reverse().join('')
}

/** the path a handle's payload lives at */
export const handlePath = (handle: string, file = 'index.json'): string =>
  [HANDLE_ROOT, ...handleParts(handle), file].join('/')

/** the inverse: recover the handle from a path. Returns null when the path is not in the store, so a caller can
 *  tell "not ours" from "malformed" rather than being handed a plausible-looking wrong answer. */
export function handleOfPath(path: string): string | null {
  const parts = path.split('/')
  const at = parts.indexOf(HANDLE_ROOT.split('/').pop()!)
  if (at < 0 || parts.length < at + 5) return null
  const handle = parts.slice(at + 1, at + 5).join('')
  return isHandle(handle) ? handle : null
}

/** every directory level a handle occupies, outermost first — what a writer must create before writing */
export const handleDirs = (handle: string): string[] =>
  handleParts(handle).map((_, i, all) => [HANDLE_ROOT, ...all.slice(0, i + 1)].join('/'))

/** Lexicographic order over paths equals numeric order over handles. This is what makes the store sortable
 *  without an index, and it is checkable rather than asserted. */
export const pathOrderMatchesHandleOrder = (handles: readonly string[]): boolean => {
  const byHandle = [...handles].sort()
  const byPath = [...handles].sort((a, b) => (handlePath(a) < handlePath(b) ? -1 : handlePath(a) > handlePath(b) ? 1 : 0))
  return byHandle.every((h, i) => h === byPath[i])
}

const HANDLE_THEOREMS = [
  'handle_splits_four',
  'handle_is_the_first_group',
  'message_carries_address',
  'payload_carries_the_strand',
] as const

/** resolveHandleInput — address or eight-hex handle; refuses ambiguous input. */
export function resolveHandleInput(input: { address?: string; handle?: string }): { address?: string; handle: string } {
  const h = input.handle ? String(input.handle).toLowerCase() : ''
  const addr = input.address ? String(input.address) : ''
  if (h && addr && handleOf(addr) !== h) throw new Error('handle and address disagree')
  if (h) {
    if (!isHandle(h)) throw new Error(`handle: "${h}" is not eight lowercase hex characters`)
    return { handle: h, ...(addr ? { address: addr } : {}) }
  }
  if (!addr) throw new Error('pass address or handle')
  return { address: addr, handle: handleOf(addr) }
}

/** handleWitness — live path round-trip + sealed width citations (LDAP is structural parallel only). */
export function handleWitness(input: { address?: string; handle?: string; loadPayload?: boolean }) {
  const { address, handle } = resolveHandleInput(input)
  const path = handlePath(handle)
  const recovered = handleOfPath(path)
  const roundTrip = recovered === handle && path === handlePath(handle)
  const payloadPresent = onHost() && existsRoot(path)
  const payload = input.loadPayload && payloadPresent ? JSON.parse(rdRoot(path)) as unknown : null
  const receipt = merkleGravity([toUuid('handle|' + handle), toUuid(String(roundTrip)), ...(address ? [address] : [])])
  return {
    address,
    handle,
    path,
    parts: handleParts(handle),
    roundTrip,
    payloadPresent,
    ...(payload !== null ? { payload } : {}),
    theorems: [...HANDLE_THEOREMS],
    ldapParallel: {
      uuidna: { levels: 4, width: 2, derived: true, root: HANDLE_ROOT, leaf: 'index.json' },
      ldap: { shape: 'variable DN components', assigned: true, note: 'external directory standard — not sealed here' },
    },
    receipt,
  }
}
