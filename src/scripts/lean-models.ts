#!/usr/bin/env node
// Automate the Lean layer for THE MODEL COMPARISON OVER ALL PUBLIC LIVE DATA — the served page's decidable
// core (the captain's orders: the token-vs-uuidna report becomes a served, SEALED page comparing all models
// at hexbit handling capacity, speed, messaging, crypto security and coverage per token; "widen comparison
// to all public live data"; "fold llm to hexbit pairs"; the eight-pairs-per-handle question answered in
// arithmetic). ALWAYS LIVE: this generator re-reads the public model feed at the src/os boundary, rewrites
// the committed mirror ONLY when the feed moved, and seals from the same data in the same pass — the seal
// can never lag the mirror (the lean-installs pattern, one shelf over). THE HONESTY SPLIT SEALED: arithmetic
// on the published windows is HERE (each of the census's contexts as transient hexbit capacity, the
// text-cost of speaking an address, the cipher's fixed widths, every window finite against 2¹²⁸, the fold
// law to 32 states = 16 pairs, the handle's 8 pairs doubling to 16 when the coins are paid); vendor speeds
// and coverage-per-token are NOT here — absent from the feed and unmeasured respectively, named as such on
// the page in words. COMPUTE → GENERATE → VERIFY.
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { emit, type Fact } from './lean-gen.js'
import { ROOT } from './api.js'
import { fetchPublicModels, renderModelsMirror } from '../os/models/index.js'
import { modelComparison, foldLlm, TOKEN_BYTES, HEXBITS_PER_TOKEN, UUID_TEXT_CHARS, UUID_PAYLOAD_BITS } from '../quantum/models/index.js'
import { MODELS_MIRROR, type ModelsMirror } from '../quantum/models/mirror.js'

// ── always live: refresh the mirror at the boundary, best-effort, then seal from the SAME data ───────────────
// EXCEPT under UUIDNA_PROVE_ALL: the gate's re-prove verifies the COMMITTED world, and the public feed moves
// constantly — a fetch inside the gate rewrote the mirror mid-walk and broke spin's seal every time (found
// 2026-08-22, five blocked pushes deep). Tracking upstream is the deliberate reconcile's act; verification
// proves what is, not what just changed.
const live = process.env.UUIDNA_PROVE_ALL ? null : await fetchPublicModels()
const data: ModelsMirror = live ?? MODELS_MIRROR
if (live) {
  const rendered = renderModelsMirror(live)
  const path = join(ROOT, 'src', 'quantum', 'models', 'mirror.ts')
  const current = existsSync(path) ? readFileSync(path, 'utf8') : ''
  if (current !== rendered) {
    writeFileSync(path, rendered)
    console.log(`✓ quantum/models/mirror — the public feed moved, re-pinned (${live.count} models)`)
  }
} else {
  console.log('· quantum/models — the public feed is unreachable; the committed mirror stands (' + data.count + ' models)')
}

const comparison = modelComparison(data)
const contexts = comparison.rows.map((r) => r.contextTokens)
const transients = comparison.rows.map((r) => r.hexbitCapacity)
const uuidCounts = comparison.rows.map((r) => r.uuidsPerContext)
const N = contexts.length
const biggest = comparison.largestContext
const sampleFold = foldLlm('any model output, of any length')

// a flat 421-element list blows Lean's default recursion ceiling — the census rides as ROWS of 32 (the same
// cure as the boot image's pages), and every fact walks the rows
const chunk = (xs: number[]): number[][] => {
  const rows: number[][] = []
  for (let i = 0; i < xs.length; i += 32) rows.push(xs.slice(i, i + 32))
  return rows
}
const asRows = (xs: number[]): string => `[${chunk(xs).map((r) => `[${r.join(', ')}]`).join(', ')}]`
const L = {
  contexts: asRows(contexts),
  transients: asRows(transients),
  uuidCounts: asRows(uuidCounts),
}

const FACTS: Fact[] = [
  { key: 'a_token_approximates_eight_hexbits',
    why: `THE OPERATIVE APPROXIMATION, SEALED AS WHAT IT IS: the page's arithmetic runs on 1 token ≈ ${TOKEN_BYTES} bytes, and ${TOKEN_BYTES} bytes are exactly ${HEXBITS_PER_TOKEN} hexbits (${TOKEN_BYTES}·2 nibbles) = ${TOKEN_BYTES * 8} bits. The approximation is declared and the widths under it are exact — the honest shape for a rule of thumb: the ≈ stays in prose, the = gets the kernel.`,
    js: () => TOKEN_BYTES * 2 === HEXBITS_PER_TOKEN && HEXBITS_PER_TOKEN * 4 === 32 && TOKEN_BYTES * 8 === 32,
    stmt: `(${TOKEN_BYTES} * 2 = ${HEXBITS_PER_TOKEN}) ∧ (${HEXBITS_PER_TOKEN} * 4 = 32) ∧ (${TOKEN_BYTES} * 8 = 32)` },

  { key: 'context_windows_are_transient_hexbits',
    why: `HEXBIT HANDLING CAPACITY, FOR THE WHOLE PUBLIC CENSUS, EXACT: every one of the ${N} published context windows (the live feed's full list, ${comparison.smallestContext.toLocaleString('en-US')} to ${biggest.toLocaleString('en-US')} tokens) times ${HEXBITS_PER_TOKEN} is that model's TRANSIENT hexbit capacity — held only until the window closes. The windows are the feed's REPORTED data (source-cited on the page); this seals the multiplication over all ${N}, not the vendors.`,
    js: () => contexts.length === N && N === data.count && contexts.every((c, i) => c * HEXBITS_PER_TOKEN === transients[i]),
    stmt: `(((modelContextRows.map (fun r => r.length)).sum) = ${N}) ∧ ((modelContextRows.map (fun r => r.map (fun c => c * ${HEXBITS_PER_TOKEN}))) = modelTransientRows)` },

  { key: 'speaking_an_address_costs_the_text',
    why: `MESSAGING, MEASURED AT THE WIRE: a uuid spelled as text is ${UUID_TEXT_CHARS} characters = ${UUID_TEXT_CHARS * 8} bits carrying a ${UUID_PAYLOAD_BITS}-bit payload — 44% efficiency (128 of 288 bits), identical for EVERY model in the census, because it is the text's cost, not the model's. The per-window address-carrying capacities are sealed for all ${N} (⌊tokens·${TOKEN_BYTES}/${UUID_TEXT_CHARS}⌋ each). uuidna's own channel skips the text: the channel IS the uuid (128 payload bits per address, receipted).`,
    js: () => UUID_TEXT_CHARS * 8 === 288 && UUID_PAYLOAD_BITS === 128 && 288 > 128 &&
      uuidCounts.every((u, i) => u === (contexts[i]! * TOKEN_BYTES - ((contexts[i]! * TOKEN_BYTES) % UUID_TEXT_CHARS)) / UUID_TEXT_CHARS),
    stmt: `(${UUID_TEXT_CHARS} * 8 = 288) ∧ (288 > 128) ∧ ((modelContextRows.map (fun r => r.map (fun c => (c * ${TOKEN_BYTES}) / ${UUID_TEXT_CHARS}))) = modelUuidCountRows)` },

  { key: 'crypto_widths_are_fixed_not_sampled',
    why: 'CRYPTO SECURITY, THE DECIDABLE PART: the cipher this repo seals runs on FIXED widths — a 256-bit ChaCha20 key (32 bytes), a 128-bit Poly1305 tag (16 bytes), a 600000-iteration PBKDF2 — and 256 = 32·8, 128 = 16·8, exactly. A sampled token stream has no fixed widths to hold: the page states (in words, unsealed, honestly) that model output cannot carry a key or an exact keystream — what is sealed here is only the arithmetic of the cipher that CAN.',
    js: () => 32 * 8 === 256 && 16 * 8 === 128 && 600000 === 6 * 100000,
    stmt: `(32 * 8 = 256) ∧ (16 * 8 = 128) ∧ (600000 = 6 * 100000)` },

  { key: 'every_context_is_finite_against_the_lattice',
    why: `CAPACITY'S CEILING, OVER THE WHOLE CENSUS: the largest published window (${biggest.toLocaleString('en-US')} tokens = ${(biggest * HEXBITS_PER_TOKEN).toLocaleString('en-US')} transient hexbits) — and with it every one of the ${N} — is finite against the address space every fold lands in: 2¹²⁸ states. The ledger's side of the comparison is not a bigger window; it is no window at all.`,
    js: () => 2 ** 128 > biggest * HEXBITS_PER_TOKEN && contexts.every((c) => 2 ** 128 > c * HEXBITS_PER_TOKEN),
    stmt: `(2 ^ 128 > ${biggest} * ${HEXBITS_PER_TOKEN}) ∧ (modelContextRows.all (fun r => r.all (fun c => 2 ^ 128 > c * ${HEXBITS_PER_TOKEN})))` },

  { key: 'llm_folds_to_hexbit_pairs',
    why: `FOLD LLM TO HEXBIT PAIRS — THE FOLD LAW, the page's whole argument as one line: however many tokens a model spends (${sampleFold.approxTokens} in the worked sample, ${sampleFold.transientHexbits} transient states), the fold is a content-address of exactly 32 on-lattice states read as 16 PAIRS — two nibbles to the byte, two coins to the bar — 128/4 = 32, 32/2 = 16, constant in the input length. The token stream is a bet that expires with its window; the fold is the receipt that does not. Coverage per token stays UNVERIFIED until measured (self-report in, division out) — a sealed number nobody measured would be the fabricated citation this very wing exists to make impossible.`,
    js: () => sampleFold.foldedHexbits === 32 && sampleFold.hexbits.length === 32 && sampleFold.foldedPairs === 16 &&
      sampleFold.pairs.length === 16 && sampleFold.pairs.every((p) => p.length === 2 && p.every((h) => Number.isInteger(h) && h >= 0 && h < 16)) &&
      sampleFold.pairs.flat().join(',') === sampleFold.hexbits.join(',') && 128 / 4 === 32 && 32 / 2 === 16 &&
      foldLlm('x').pairs.length === 16 && foldLlm('x'.repeat(9999)).pairs.length === 16,
    stmt: `((128 : Nat) / 4 = 32) ∧ ((32 : Nat) / 2 = 16) ∧ (16 * 2 = 32) ∧ (32 * 4 = 128) ∧ (16 = 2 ^ 4)` },

  { key: 'a_handle_is_eight_pairs_paid_it_is_sixteen',
    why: 'EIGHT PAIRS PER HANDLE — SIXTEEN WHEN THE CAPTAIN COINS ARE PAID, AND 64 IS WHERE TYPOGRAPHY UNLOCKS (the captain\'s question, answered by arithmetic): a handle is the 64-bit coin — 16 hexbits = 8 pairs, and 8 pairs × 8 bits = 64 is the SAME dimension read in inverse (count pairs-of-bits or bits-per-pair: 8 both ways, the square closes the octave, 64 = 8² = 2⁶). Paying the two coins fires the 64→128 fuse (rosette_quantum_doubling_is_two_coins): the handle doubles to the full address — 32 hexbits = 16 pairs. TYPOGRAPHY is the pair read as a byte: one pair = one glyph, so a handle is 8 glyphs, the paid address 16 — the fold coming back as WRITING, the same dimensions reflected inversely from lattice to text.',
    js: () => 64 / 8 === 8 && 8 * 8 === 64 && 64 === 2 ** 6 && 16 / 2 === 8 &&
      2 * 64 === 128 && 2 * 8 === 16 && 128 / 8 === 16 && 32 / 2 === 16,
    stmt: `((64 : Nat) / 8 = 8) ∧ (8 * 8 = 64) ∧ (64 = 2 ^ 6) ∧ (2 * 64 = 128) ∧ (2 * 8 = 16) ∧ ((128 : Nat) / 8 = 16)` },
]

for (const f of FACTS) if (!f.js!()) throw new Error('offline audit FAILED before seal: ' + f.key)

const defs = `-- the PUBLIC FEED's reported context windows (data, source-cited on the page) as ROWS of 32 — a flat
-- ${N}-element list exceeds the kernel's recursion ceiling; the rows carry the same census within it
def modelContextRows : List (List Nat) := ${L.contexts}
def modelTransientRows : List (List Nat) := ${L.transients}
def modelUuidCountRows : List (List Nat) := ${L.uuidCounts}`

emit({ file: 'Models.lean', skill: 'models', defs,
  header: `THE MODEL COMPARISON OVER ALL PUBLIC LIVE DATA — the decidable core of the served page /models: the declared token≈4-byte approximation's exact widths, all ${N} of the public feed's reported context windows as transient hexbit capacity, the 288-bit cost of speaking a 128-bit address in text (identical for every model), the cipher's fixed widths against a sampler's none, every window finite against 2¹²⁸, THE FOLD LAW (any model's output folds to exactly 32 on-lattice states = 16 pairs), and the handle's eight pairs doubling to sixteen when the captain coins are paid (64 = 8², typography unlocked). Vendor speeds and coverage-per-token are NOT here — absent from the feed and unmeasured respectively, named as such on the page.`,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
