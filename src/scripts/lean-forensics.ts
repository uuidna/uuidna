#!/usr/bin/env node
// Automate the Lean layer for FORENSICS — the odds a forged claim faces: it passes only by landing on one of the ledger's
// own addresses, and that chance is the sealed ratio below. src/forensics.ts catches a false trial
// by recomputation: a cited key must be sealed, a framed address must be one of the ledger's addresses, a {text →
// address} claim must recompute. AntiFraud.lean decides those detectors on small samples; this wing seals the ODDS a
// forger faces against the ledger and the store AS THEY STAND, counted at generation and never typed: a guessed
// address lands on a sealed one, or a guessed handle on an occupied leaf, only with the stated vanishing odds. Beside
// them the control: a sixteen-bit handle space is already too small for the store, so the bound can fail, which is why
// a handle carries thirty-two bits. The mirror runs the real forensics() on a forged and a sealed address.
// COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'
import { THEOREMS } from '../theorems/index.js'
import { forensics } from '../forensics.js'
import { toUuid } from '../address.js'
import { buildHandleRecords } from './gen-handle-store.js'
import { bitsOf } from '../hexbit/index.js'

// a v8 uuid spends 4 bits on the version and 2 on the variant; the rest are the address's own
const UUID_BITS = 128, VERSION_BITS = 4, VARIANT_BITS = 2
const FREE_BITS = UUID_BITS - VERSION_BITS - VARIANT_BITS
const V8 = /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const HANDLE_BITS = 32
const SHORT_HANDLE_BITS = 16

const ADDRESSES = new Set(THEOREMS.map((t) => t.address))
const notV8 = [...ADDRESSES].filter((a) => !V8.test(a))
if (notV8.length) throw new Error(`lean-forensics: ${notV8.length} sealed address(es) are not v8 — the ${FREE_BITS}-bit premise fails (e.g. ${notV8[0]})`)
const ADDRS = ADDRESSES.size
const LEAVES = buildHandleRecords().length

// the smallest b with n < 2^b is the width of n + 1 states — the ledger's one bit-width, exact integers
const ADDR_ODDS = FREE_BITS - bitsOf(ADDRS + 1)          // a guess hits a sealed address with odds below 2^-ADDR_ODDS
const HANDLE_ODDS = HANDLE_BITS - bitsOf(LEAVES + 1)     // a guess hits an occupied leaf with odds below 2^-HANDLE_ODDS

// the detector the odds protect, run for real: a framed address that is not sealed is flagged, a sealed one passes
const FORGED = toUuid('lean-forensics: an address no theorem carries')
const SEALED = THEOREMS[0]!.address
const forgedCaught = !ADDRESSES.has(FORGED) && forensics(`sealed at address ${FORGED}`).violations.some((v) => v.kind === 'false-address')
const sealedPasses = !forensics(`sealed at address ${SEALED}`).violations.some((v) => v.kind === 'false-address')
const nf = (n: number): string => n.toLocaleString('en-US')

const FACTS = [
  { key: 'forged_address_odds_are_negligible',
    why: `A GUESSED ADDRESS DOES NOT LAND. The ledger holds ${nf(ADDRS)} distinct addresses, every one a v8 uuid with ${FREE_BITS} free bits, so a forger who invents an address and frames it as sealed hits a real one with odds below 2^-${ADDR_ODDS}: ${nf(ADDRS)} × 2^${ADDR_ODDS} < 2^${FREE_BITS}. forensics() flags every miss as a false address — run here on a forged address (flagged) and a sealed one (passed) — so a false trial cannot survive except by that chance, and the chance is sealed. Counted from the ledger at generation, never typed.`,
    js: () => BigInt(ADDRS) * 2n ** BigInt(ADDR_ODDS) < 2n ** BigInt(FREE_BITS) && forgedCaught && sealedPasses,
    lean: `theorem forged_address_odds_are_negligible : ${ADDRS} * 2 ^ ${ADDR_ODDS} < 2 ^ ${FREE_BITS} := by decide` },

  { key: 'forged_handle_odds_are_small',
    why: `A GUESSED HANDLE RARELY LANDS EITHER. The handle store holds ${nf(LEAVES)} leaves in a ${HANDLE_BITS}-bit handle space, so a guessed handle names an occupied leaf with odds below 2^-${HANDLE_ODDS}: ${nf(LEAVES)} × 2^${HANDLE_ODDS} < 2^${HANDLE_BITS}. The odds are far weaker than an address's, which is why a handle is only ever the PATH to a leaf and the leaf itself carries the full uuid that forensics() checks.`,
    js: () => BigInt(LEAVES) * 2n ** BigInt(HANDLE_ODDS) < 2n ** BigInt(HANDLE_BITS),
    lean: `theorem forged_handle_odds_are_small : ${LEAVES} * 2 ^ ${HANDLE_ODDS} < 2 ^ ${HANDLE_BITS} := by decide` },

  { key: 'sixteen_bit_handles_would_collide',
    why: `THE CONTROL: THE BOUND CAN FAIL. With ${SHORT_HANDLE_BITS}-bit handles the store's ${nf(LEAVES)} leaves would outnumber the ${nf(2 ** SHORT_HANDLE_BITS)} handles available, so two leaves would be forced to share one — pigeonhole, not chance — and the store refuses any collision. The odds above are a property of the widths chosen, and a width too small is refuted by the same arithmetic; that is why a handle carries ${HANDLE_BITS} bits.`,
    js: () => LEAVES > 2 ** SHORT_HANDLE_BITS,
    lean: `theorem sixteen_bit_handles_would_collide : ${LEAVES} > 2 ^ ${SHORT_HANDLE_BITS} := by decide` },
]

emit({ file: 'Forensics.lean', skill: 'forensics',
  header: `FORENSICS — the odds a forger faces, against the ledger and the store as they stand. A framed address must be one of the ${nf(ADDRS)} sealed v8 addresses (${FREE_BITS} free bits), so a guess hits with odds below 2^-${ADDR_ODDS}; a guessed handle hits one of ${nf(LEAVES)} leaves with odds below 2^-${HANDLE_ODDS}; and ${SHORT_HANDLE_BITS}-bit handles would already collide by pigeonhole, the control that shows the bound can fail. The detectors are src/forensics.ts and AntiFraud.lean; this wing seals their margin. NOT CLAIMED: that a forger guesses uniformly, or anything about the hash beyond its output layout.`,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
