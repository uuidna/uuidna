// quantum/models — THE MODEL COMPARISON OVER ALL PUBLIC LIVE DATA, honest by construction (the captain's
// orders, 2026-08-22: the token-vs-uuidna report becomes a served, sealed page comparing all models at hexbit
// handling capacity, speed, messaging, crypto security and coverage per token; "widen comparison to all
// public live data"; "fold llm to hexbit pairs"). THE HONESTY SPLIT, exactly as everywhere in this tree:
// what the PUBLIC FEED publishes (every routed model's context window and per-token prices) is DATA — read
// live at the src/os boundary, committed as the mirror this module computes from, carried with its source,
// never benchmarked here; what ARITHMETIC decides (hexbits per context, messaging cost, the address space,
// the fold law) is COMPUTED here and SEALED in lean/Models.lean; and what only a measurement could settle
// (a model's actual speed, its coverage per token) is REPORTED-elsewhere or UNVERIFIED — named as such on
// the page, never invented, because a sealed number nobody measured is exactly the fabricated citation the
// gate drains. PRICES STAY VERBATIM STRINGS: published labels, not numbers this tree computes on (no floats).
// THE OPERATIVE APPROXIMATION, declared once: 1 token ≈ 4 bytes = 8 hexbits; the ≈ stays prose, the = seals.
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'
import { compileToHexbits, hexbitDoorOf } from '../os/index.js'
import { UUID_HEXBITS, COINS, HEXBIT_BITS, UUID_BITS } from '../../hexbit/index.js'
import { MODELS_MIRROR, type MirrorModel, type ModelsMirror } from './mirror.js'

// the declared approximation and the fixed widths the arithmetic runs on — sealed in Models.lean
export const TOKEN_BYTES = HEXBIT_BITS
export const HEXBITS_PER_TOKEN = HEXBIT_BITS * COINS
export const UUID_TEXT_CHARS = UUID_HEXBITS + HEXBIT_BITS
export const UUID_PAYLOAD_BITS = UUID_BITS

// integer division, no Math.* anywhere (the house law): exact for the non-negative integers this page divides
const idiv = (a: number, b: number): number => (a - (a % b)) / b

/** One computed comparison row — the published figures plus the arithmetic on them, nothing else. */
export interface ModelRow extends MirrorModel {
  hexbitCapacity: number       // TRANSIENT hexbits one context can hold: contextTokens × 8 — then the window closes
  uuidsPerContext: number      // messages: how many uuid addresses fit, spelled as text (⌊tokens×4 / 36⌋)
}

const row = (m: MirrorModel): ModelRow => ({
  ...m,
  hexbitCapacity: m.contextTokens * HEXBITS_PER_TOKEN,
  uuidsPerContext: idiv(m.contextTokens * TOKEN_BYTES, UUID_TEXT_CHARS),
})

/** The uuidna side — computed from the repo's own sealed figures, not reported by anyone. */
export interface UuidnaRow {
  hexbitCapacity: string; speed: string; messaging: string; cryptoSecurity: string; coveragePerToken: string
}

export const UUIDNA_ROW: UuidnaRow = {
  hexbitCapacity: '2^128 addressable states (32 hexbits per address), PERMANENT — the ledger outlives every context window',
  speed: 'mint/verify O(1) per receipt after a one-time kernel proof; no sampling loop (uuidna_gate_status recomputes live)',
  messaging: 'the channel IS the uuid: 128 payload bits per address, sealed ratchet (uuidna_send/receive), every message receipted',
  cryptoSecurity: 'pure-TS ChaCha20-Poly1305 (256-bit key, 128-bit tag), PBKDF2-600k, KAT-verified against published vectors — sealed, recomputable',
  coveragePerToken: 'every claim pays two coins (a citation or a recomputation) — coverage is receipted, not estimated',
}

/** foldLlm(text) → FOLD ANY MODEL'S OUTPUT TO HEXBIT PAIRS: however many tokens a model spent, the fold is
 *  the content-address — exactly 32 on-lattice states read as 16 PAIRS (two nibbles to the byte, two coins
 *  to the bar), permanent, recomputable by anyone. The bet becomes a receipt. Any model, any length. */
export function foldLlm(text: string): { address: string; hexbits: number[]; pairs: [number, number][]; approxTokens: number; transientHexbits: number; foldedHexbits: number; foldedPairs: number; foldNote: string } {
  const approxTokens = idiv(text.length + TOKEN_BYTES - 1, TOKEN_BYTES)   // ceiling by integers, no Math.*
  const address = toUuid('llm-fold|' + text)
  const hexbits = compileToHexbits(address)
  const foldedPairs = UUID_HEXBITS / COINS
  const pairs = Array.from({ length: foldedPairs }, (_, i) => [hexbits[2 * i]!, hexbits[2 * i + 1]!] as [number, number])
  return {
    address, ...hexbitDoorOf(address), pairs,
    approxTokens, transientHexbits: approxTokens * HEXBITS_PER_TOKEN, foldedHexbits: UUID_HEXBITS, foldedPairs,
    foldNote: 'every fold is UUID_HEXBITS states = UUID_HEXBITS/COINS pairs whatever the input length — the token stream was transient, the address is not',
  }
}

/** The whole comparison over ALL public live data: every mirrored model's row computed, the census figures
 *  (count, the largest and smallest windows, the total transient capacity of every window at once), the
 *  uuidna row from the repo's own seals, one receipt, and the receipt compiled to the lattice. */
export interface ModelComparison {
  source: string; endpoint: string
  count: number
  rows: ModelRow[]             // ALL of them, sorted: widest window first, then by id — abundance is the census
  largestContext: number
  smallestContext: number
  totalTransientHexbits: number
  uuidna: UuidnaRow
  receipt: string
  hexbits: number[]
}

let CACHE: ModelComparison | null = null

export function modelComparison(m: ModelsMirror = MODELS_MIRROR): ModelComparison {
  if (m === MODELS_MIRROR && CACHE) return CACHE
  const rows = m.models.map(row).sort((a, b) => b.contextTokens - a.contextTokens || (a.id < b.id ? -1 : 1))
  const contexts = rows.map((r) => r.contextTokens)
  const out: ModelComparison = {
    source: m.source, endpoint: m.endpoint, count: rows.length, rows,
    largestContext: contexts.reduce((x, y) => (y > x ? y : x), 0),
    smallestContext: contexts.reduce((x, y) => (y < x ? y : x), contexts[0] ?? 0),
    totalTransientHexbits: rows.reduce((s, r) => s + r.hexbitCapacity, 0),
    uuidna: UUIDNA_ROW,
    receipt: merkleGravity([toUuid('models|' + m.source + '|' + m.count), ...rows.map((r) => toUuid(`model|${r.id}|${r.contextTokens}|${r.hexbitCapacity}|${r.uuidsPerContext}`))]),
    hexbits: [],
  }
  Object.assign(out, hexbitDoorOf(out.receipt))
  if (m === MODELS_MIRROR) CACHE = out
  return out
}
