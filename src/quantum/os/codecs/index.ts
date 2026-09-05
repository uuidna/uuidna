// codecs — THE APPLETS THAT NEED A CODEC OR A CONTAINER, ported on the platform's own primitives.
//
// A REFUSAL CORRECTED. The refusal register said the whole compression family was out of scope because "each is
// its own algorithm and container". That is true of bzip2, xz, lzma and zstd, and it was FALSE of gzip: the
// platform ships `CompressionStream('gzip')` and `DecompressionStream('gzip')` — the same class of web
// primitive as fetch and TextEncoder, and this tree has been decoding Alpine's APKINDEX with the latter since
// before the register was written. Refusing what the tree already does is the sharpest form of a stale reason,
// and this is the third one found in two days. The bzip2/xz/zstd families stay refused: no platform codec, and
// a hand-rolled partial would report success over data it never encoded.
//
// WHY THESE ARE ASYNC AND THE REST ARE NOT. The platform codecs are STREAMS. uuidnaExec is synchronous and
// stays so — an async door is added beside it rather than every caller being changed to await a `wc`. That is
// the honest cost of the port and it is paid here, in one place.
//
// BYTES IN A TEXT STORE. Session files hold strings, and gzip output is bytes that are not text. They travel as
// base64, DECLARED rather than assumed: `gzip` answers with base64 and `gunzip` accepts it, so a round trip
// through the session is exact and a reader is never handed mojibake and told it is a compressed file.
import { untarMember } from '../../../os/packages/index.js'

/** the codecs the platform provides, and therefore the only ones ported */
export const PLATFORM_CODECS = ['gzip', 'deflate', 'deflate-raw'] as const
export type PlatformCodec = (typeof PLATFORM_CODECS)[number]

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

/** bytesToBase64(b) → the standard alphabet, padded. Written here rather than borrowed so the codec module has
 *  no dependency on the text applets, which would make one wave's edit break the other's. */
export function bytesToBase64(bytes: Uint8Array): string {
  let out = '', i = 0
  for (; i + 2 < bytes.length; i += 3) {
    const n = (bytes[i]! << 16) | (bytes[i + 1]! << 8) | bytes[i + 2]!
    out += B64[(n >> 18) & 63]! + B64[(n >> 12) & 63]! + B64[(n >> 6) & 63]! + B64[n & 63]!
  }
  const rest = bytes.length - i
  if (rest === 1) {
    const n = bytes[i]! << 16
    out += B64[(n >> 18) & 63]! + B64[(n >> 12) & 63]! + '=='
  } else if (rest === 2) {
    const n = (bytes[i]! << 16) | (bytes[i + 1]! << 8)
    out += B64[(n >> 18) & 63]! + B64[(n >> 12) & 63]! + B64[(n >> 6) & 63]! + '='
  }
  return out
}

/** base64ToBytes(s) → the inverse. Returns null on a character outside the alphabet, never a partial decode. */
export function base64ToBytes(s: string): Uint8Array | null {
  const clean = s.replace(/\s+/g, '').replace(/=+$/, '')
  const out: number[] = []
  let bits = 0, value = 0
  for (const ch of clean) {
    const i = B64.indexOf(ch)
    if (i < 0) return null
    value = (value << 6) | i
    bits += 6
    if (bits >= 8) { bits -= 8; out.push((value >> bits) & 0xff) }
  }
  return new Uint8Array(out)
}

const drain = async (stream: ReadableStream<Uint8Array>): Promise<Uint8Array> => {
  const reader = stream.getReader()
  const parts: Uint8Array[] = []
  let total = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    parts.push(value)
    total += value.length
  }
  const out = new Uint8Array(total)
  let at = 0
  for (const p of parts) { out.set(p, at); at += p.length }
  return out
}

/** compress(bytes, codec) → the encoded member, through the platform's own stream. */
export async function compress(bytes: Uint8Array, codec: PlatformCodec = 'gzip'): Promise<Uint8Array> {
  const cs = new CompressionStream(codec)
  const w = cs.writable.getWriter()
  const written = w.write(new Uint8Array(bytes)).then(() => w.close())
  const [out] = await Promise.all([drain(cs.readable), written])
  return out
}

/** decompress(bytes, codec) → the decoded member. Throws on a corrupt member rather than returning a prefix:
 *  a truncated decode that looked like success is the failure this whole file exists to avoid. */
export async function decompress(bytes: Uint8Array, codec: PlatformCodec = 'gzip'): Promise<Uint8Array> {
  // BOTH ENDS ARE OWNED. `void w.write(...)` left the writer's rejection unowned, so a corrupt member arrived
  // as an unhandled TypeError from the stream adapter — a crash in someone else's file — instead of as this
  // function's own throw that the caller already handles. Awaiting both ends makes the failure land here.
  const ds = new DecompressionStream(codec)
  const w = ds.writable.getWriter()
  const written = w.write(new Uint8Array(bytes)).then(() => w.close()).catch(() => undefined)
  const [out] = await Promise.all([drain(ds.readable), written])
  return out
}

export interface TarEntry { name: string; size: number; kind: 'file' | 'dir' | 'other' }

/** tarEntries(tar) → the members of a POSIX tar, from the 512-byte header blocks. Pure, and it STOPS at the
 *  end-of-archive marker rather than reading padding as a member with an empty name. */
export function tarEntries(tar: Uint8Array): TarEntry[] {
  const out: TarEntry[] = []
  const dec = new TextDecoder()
  for (let at = 0; at + 512 <= tar.length; ) {
    const header = tar.subarray(at, at + 512)
    if (header.every((b) => b === 0)) break                       // the end-of-archive marker
    const name = dec.decode(header.subarray(0, 100)).replace(/\0.*$/, '')
    if (name === '') break
    const octal = dec.decode(header.subarray(124, 136)).replace(/[\0 ]/g, '')
    const size = octal === '' ? 0 : Number.parseInt(octal, 8)
    const flag = String.fromCharCode(header[156] ?? 0)
    out.push({ name, size, kind: flag === '5' ? 'dir' : flag === '0' || flag === '\0' ? 'file' : 'other' })
    at += 512 + size + ((512 - (size % 512)) % 512)
  }
  return out
}

/** tarMember(tar, name) → one member's text, delegating to the untar this tree already ships. */
export const tarMember = (tar: Uint8Array, name: string): string => untarMember(tar, name)
