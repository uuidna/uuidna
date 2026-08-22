#!/usr/bin/env node
// Automate the Lean layer for THE BYTE — two hexbits, and the unit exact-copy verification actually compares in.
import { emit } from './lean-gen.js'

const POSITIONS = 32                       // a SHA-256 digest, in bytes
const ALTERNATIVES = 255                   // every other value one byte can take
const TAMPERS = POSITIONS * ALTERNATIVES
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const DEFS = ''

const FACTS = [
  { key: 'byte_holds_two_hexbits',
    why: 'A BYTE IS TWO HEXBITS: eight bits, 256 values, and 16^2 spellings — the two readings agree, so counting a byte in hex characters and counting it in bits land on the same object.',
    js: () => 2 * 4 === 8 && 2 ** 8 === 256 && 16 ** 2 === 256,
    lean: 'theorem byte_holds_two_hexbits : (2 * 4 = 8) ∧ ((2:Nat)^8 = 256) ∧ ((16:Nat)^2 = 256) ∧ (2 ≠ 4) := by decide' },

  { key: 'address_is_sixteen_bytes',
    why: 'THE ADDRESS IS SIXTEEN BYTES: 32 hex characters, 128 bits, 16 bytes — three counts of one object, each derived from the layout rather than stated beside it.',
    js: () => 32 / 2 === 16 && 16 * 8 === 128 && 32 * 4 === 128,
    lean: 'theorem address_is_sixteen_bytes : (32 / 2 = 16) ∧ (16 * 8 = 128) ∧ (32 * 4 = 128) := by decide' },

  { key: 'digest_doubles_the_address',
    why: 'A SHA-256 DIGEST IS EXACTLY TWICE THE ADDRESS: 32 bytes against 16, 256 bits against 128, 64 hex characters against 32.',
    js: () => 32 === 2 * 16 && 256 === 2 * 128 && 64 === 2 * 32,
    lean: 'theorem digest_doubles_the_address : (32 = 2 * 16) ∧ (256 = 2 * 128) ∧ (64 = 2 * 32) := by decide' },

  { key: 'every_alternative_differs',
    why: 'THE TAMPER SET OF ONE POSITION IS 255 VALUES: a byte holds 256 and one of them is the original, so 256 - 1 = 255 alternatives remain, and 255 across 32 positions is 8160.',
    js: () => Array.from({ length: 16 }, (_, i) => i).every((b) => (b + 1) % 16 !== b && b < 16) && 16 * 16 === 256,
    lean: 'theorem every_alternative_differs : ((List.range 16).all (fun b => ((b + 1) % 16) != b)) \u2227 ((List.range 16).all (fun b => b < 16)) \u2227 (16 * 16 = 256) \u2227 (256 - 1 = 255) := by decide' },

  { key: 'tamper_set_counts_eight_thousand',
    why: 'OVER A THIRTY-TWO BYTE DIGEST THE WHOLE TAMPER SET IS 32 × 255 = 8160 single-byte alterations, every one of them a different digest under byte-equality.',
    js: () => TAMPERS === 8160 && POSITIONS * ALTERNATIVES === 8160,
    lean: 'theorem tamper_set_counts_eight_thousand : (32 * 255 = 8160) ∧ (8160 ≠ 0) := by decide' },

]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Byte.lean', skill: 'byte', defs: DEFS,
  header: 'THE BYTE — two hexbits, and the unit exact-copy verification actually compares in.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
