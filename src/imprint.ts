// imprint — a REVERSIBLE binary↔uuid codec. NOT reversing the one-way FNV address (that cannot be undone),
// and NOT encryption (no key, no secrecy). It CONSTRUCTS a uuid whose 128 bits carry a message and reads
// them back exactly. A uuid holds 128 bits; 6 are reserved (4 version + 2 variant) and 7 hold a length
// header → up to 115 message bits per uuid. Round-trips exactly for L ≤ CAPACITY.

const RESERVED = new Set([48, 49, 50, 51, 64, 65])
const LEN_BITS = 7
const FREE = Array.from({ length: 128 }, (_, i) => i).filter((i) => !RESERVED.has(i))
export const CAPACITY = FREE.length - LEN_BITS // 115 message bits per uuid

const isBits = (s: string): boolean => /^[01]*$/.test(s)
const num2bits = (n: number, width: number): string => n.toString(2).padStart(width, '0').slice(-width)

function bitsToUuid(bits: readonly number[]): string {
  let hex = ''
  for (let byte = 0; byte < 16; byte++) {
    let v = 0
    for (let b = 0; b < 8; b++) v = (v << 1) | bits[byte * 8 + b]
    hex += v.toString(16).padStart(2, '0')
  }
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

function uuidToBits(uuid: string): number[] {
  const hex = uuid.replace(/-/g, '')
  if (!/^[0-9a-f]{32}$/i.test(hex)) throw new Error('imprint: not a 32-hex uuid')
  const bits: number[] = []
  for (const ch of hex) {
    const nib = parseInt(ch, 16)
    for (let b = 3; b >= 0; b--) bits.push((nib >> b) & 1)
  }
  return bits
}

/** imprint(message) → a valid uuid carrying the binary message ('0'/'1', length ≤ CAPACITY) in its free bits. */
export function imprint(message: string): string {
  if (!isBits(message)) throw new Error('imprint: message must be a binary string of 0/1')
  if (message.length > CAPACITY) throw new Error(`imprint: message ${message.length} bits > capacity ${CAPACITY}`)
  const bits = new Array(128).fill(0)
  bits[48] = 1; bits[49] = 0; bits[50] = 0; bits[51] = 0
  bits[64] = 1; bits[65] = 0
  const payload = num2bits(message.length, LEN_BITS) + message
  for (let i = 0; i < payload.length; i++) bits[FREE[i]] = payload.charCodeAt(i) - 48
  return bitsToUuid(bits)
}

/** readImprint(uuid) → the exact binary message imprinted by imprint(). Inverse of imprint. */
export function readImprint(uuid: string): string {
  const bits = uuidToBits(uuid)
  const free = FREE.map((i) => bits[i])
  let len = 0
  for (let i = 0; i < LEN_BITS; i++) len = (len << 1) | free[i]
  if (len > CAPACITY) throw new Error('imprint: length header out of range — uuid was not imprinted by imprint()')
  return free.slice(LEN_BITS, LEN_BITS + len).join('')
}

/** roundTrips(message) → true iff readImprint(imprint(message)) === message. */
export function roundTrips(message: string): boolean {
  try { return readImprint(imprint(message)) === message } catch { return false }
}

/** imprintChain(bits) → a CHAIN of uuids carrying a binary message of ANY length (CAPACITY-bit chunks). */
export function imprintChain(bits: string): string[] {
  if (!/^[01]*$/.test(bits)) throw new Error('imprintChain: message must be a binary string')
  if (bits.length === 0) return [imprint('')]
  const out: string[] = []
  for (let i = 0; i < bits.length; i += CAPACITY) out.push(imprint(bits.slice(i, i + CAPACITY)))
  return out
}

/** readImprintChain(uuids) → recover the full binary message, exactly. */
export function readImprintChain(uuids: readonly string[]): string {
  return uuids.map((u) => readImprint(u)).join('')
}

const _enc = new TextEncoder() // hoisted: one encoder, not a new allocation per call (DRY)
/** imprintTextChain(text) → a uuid chain carrying arbitrary UTF-8 text of any length. */
export function imprintTextChain(text: string): string[] {
  const bytes = [..._enc.encode(text)]
  return imprintChain(bytes.map((b) => num2bits(b, 8)).join(''))
}

/** readImprintTextChain(uuids) → recover the full text from its uuid chain, exactly. */
export function readImprintTextChain(uuids: readonly string[]): string {
  const bits = readImprintChain(uuids)
  const bytes: number[] = []
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2))
  return new TextDecoder().decode(new Uint8Array(bytes))
}
