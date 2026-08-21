// provenance — BYTE-LEVEL IMAGE (and any-file) PROVENANCE: content-address the EXACT bytes so any later alteration is
// visible. The cryptographic SHA-256 of the raw bytes is the authoritative fingerprint (collision- and preimage-
// resistant), and a uuidna handle (FNV over that hash) indexes it; the container FORMAT is read from the magic bytes.
// Deterministic and offline — the same bytes fingerprint to the same address for everyone; change ONE byte and both
// the hash and the handle move, so a tamper is caught by recomputing and comparing.
//
// HONEST SCOPE: integrity. This proves EXACT-COPY and TAMPER-EVIDENCE of the bytes — NOT authenticity of
// what the image DEPICTS. It says NOTHING about whether an image is a genuine photograph, where or when it was taken,
// whether it shows the poles or anything else, or whether its CONTENT was manipulated before these bytes existed.
// Content authenticity, origin, and liveness are outside uuidna's recomputable model (like voice/video biometrics and
// the aura's "art"). A matching fingerprint proves two files are byte-identical; it never proves a file
// is a truthful record of the world.
import { sha256 } from './sha256.js'
import { toUuid } from './address.js'

export interface ImageProvenance {
  bytes: number            // exact byte length
  format: string           // container format read from the magic bytes (declared
  sha256: string           // hex of SHA-256 over the EXACT bytes — the authoritative exact-copy fingerprint
  handle: string           // a uuidna content-address (FNV over the hash) — a short recomputable id
  honest: string
}

const HONEST =
  'Byte-level provenance: the SHA-256 of the exact bytes (exact-copy + tamper-evidence) and a uuidna handle over it. ' +
  'Change one byte and both move, so a tamper is caught by recomputing. HONEST SCOPE: it fingerprints the BYTES' +
  'the truth of the image — it does NOT verify the picture is genuine, where/when it was taken, that it depicts the ' +
  'poles (or anything), or that its content was not manipulated before these bytes. Content authenticity, origin and ' +
  'liveness are outside the recomputable model. A match proves byte-identity.'

// hex of a byte array — pure string arithmetic, no Math.*
const toHex = (b: Uint8Array): string => { let s = ''; for (const x of b) s += (x < 16 ? '0' : '') + x.toString(16); return s }

// magic-byte format detection — a small, honest set; the DECLARED container.
const startsWith = (b: Uint8Array, sig: number[], off = 0): boolean => sig.every((v, i) => b[off + i] === v)
function detectFormat(b: Uint8Array): string {
  if (startsWith(b, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'png'
  if (startsWith(b, [0xff, 0xd8, 0xff])) return 'jpeg'
  if (startsWith(b, [0x47, 0x49, 0x46, 0x38])) return 'gif'
  if (startsWith(b, [0x52, 0x49, 0x46, 0x46]) && startsWith(b, [0x57, 0x45, 0x42, 0x50], 8)) return 'webp'
  if (startsWith(b, [0x42, 0x4d])) return 'bmp'
  if (startsWith(b, [0x49, 0x49, 0x2a, 0x00]) || startsWith(b, [0x4d, 0x4d, 0x00, 0x2a])) return 'tiff'
  if (startsWith(b, [0x25, 0x50, 0x44, 0x46])) return 'pdf'
  return 'unknown'
}

/** imageProvenance(bytes) → the byte-level provenance fingerprint of a file: its SHA-256 (exact-copy + tamper-evidence),
 *  a uuidna handle, and the container format from the magic bytes. Deterministic and offline. HONEST: it fingerprints
 *  the BYTES, never the truth of what the image depicts — a match proves byte-identity. */
export function imageProvenance(bytes: Uint8Array): ImageProvenance {
  const digest = toHex(sha256(bytes))
  return { bytes: bytes.length, format: detectFormat(bytes), sha256: digest, handle: toUuid('bytes:sha256:' + digest), honest: HONEST }
}

/** verifyImageProvenance(bytes, sha256hex) → recompute the byte fingerprint and compare. True iff the bytes are the
 *  EXACT same file (byte-identical). A tamper — any changed byte — moves the hash and fails. Proves exact-copy, not
 *  content authenticity. */
export function verifyImageProvenance(bytes: Uint8Array, sha256hex: string): boolean {
  return toHex(sha256(bytes)) === sha256hex.toLowerCase()
}
