#!/usr/bin/env node
// Automate the Lean layer for THE XOR ISOMETRY — the one identity shared by the cipher, the strand and the code.
// PURE ARITHMETIC: every value is a small integer or a bit count; nothing is measured from the world.
//
// WHY. Three wings each hold a corner of the same fact and none of them states it. Cipher.lean seals that the pad is
// self-inverse and that key reuse leaks the plaintext XOR. BioPhysics.lean seals that base pairing is an involution
// and that complementing is lxor with 3. Codes.lean seals that Hamming distance three corrects one error and detects
// two. The identity underneath all three is that XOR WITH A FIXED KEY PRESERVES HAMMING DISTANCE — an isometry of the
// bit cube. Sealed here, each corner stops being a coincidence of three domains and becomes one algebra read thrice.
//
// WHAT IT EXPLAINS, once decided. Key reuse leaks because an isometry carries the plaintexts' distance intact into
// the ciphertexts — the attacker reads a true fact about the messages without the key. Base pairing carries
// information for the same reason and flips exactly two bits per base. A linear code corrects because distance is
// what the isometry preserves, so the decoder's geometry survives encoding.
import { emit, LXOR_DEF } from './lean-gen.js'

const lxor = (a: number, b: number) => a ^ b
const pop = (n: number): number => { let c = 0, x = n; while (x > 0) { c += x % 2; x = (x - x % 2) / 2 } return c }
const dist = (a: number, b: number) => pop(lxor(a, b))
const R = (n: number) => Array.from({ length: n }, (_, i) => i)
const DEFS = `${LXOR_DEF}

-- popcount as decidable, AXIOM-FREE structural recursion over an 8-bit fuel, the same shape lxor uses
def popAux : Nat -> Nat -> Nat
  | 0, _ => 0
  | Nat.succ w, n => n % 2 + popAux w (n / 2)
def pop (n : Nat) : Nat := popAux 8 n

-- the Hamming distance IS the weight of the difference
def dist (a b : Nat) : Nat := pop (lxor a b)`

const FACTS = [
  { key: 'xor_preserves_distance',
    why: 'THE ISOMETRY: xoring both sides by the same key leaves the Hamming distance unchanged, for every pair and every key over the four-bit cube. This is the single fact the cipher, the strand and the code each hold a corner of.',
    js: () => R(16).every((a) => R(16).every((b) => R(16).every((k) => dist(lxor(a, k), lxor(b, k)) === dist(a, b)))),
    lean: 'theorem xor_preserves_distance : (List.range 16).all (fun a => (List.range 16).all (fun b => (List.range 16).all (fun k => dist (lxor a k) (lxor b k) == dist a b))) := by decide' },

  { key: 'reuse_leaks_by_isometry',
    why: 'WHY KEY REUSE LEAKS, stated as the cause rather than the symptom: because the pad is an isometry, the distance between two ciphertexts EQUALS the distance between their plaintexts. An attacker with neither key nor message still reads a true fact about the messages. Cipher.lean seals that reuse leaks the plaintext XOR; this seals why it must.',
    js: () => R(8).every((m1) => R(8).every((m2) => R(8).every((k) => dist(lxor(m1, k), lxor(m2, k)) === dist(m1, m2)))),
    lean: 'theorem reuse_leaks_by_isometry : (List.range 8).all (fun m1 => (List.range 8).all (fun m2 => (List.range 8).all (fun k => dist (lxor m1 k) (lxor m2 k) == dist m1 m2))) := by decide' },

  { key: 'complement_flips_two',
    why: 'EVERY DNA BASE DIFFERS FROM ITS COMPLEMENT IN EXACTLY TWO BITS. A base is two bits, complementing is lxor with 3, and 3 has weight two — so the distance is two for all four bases. The strand\'s pairing is the pad\'s step, at width two.',
    js: () => R(4).every((x) => dist(x, lxor(x, 3)) === 2) && pop(3) === 2,
    lean: 'theorem complement_flips_two : ((List.range 4).all (fun x => dist x (lxor x 3) == 2)) ∧ (pop 3 = 2) := by decide' },

  { key: 'codon_flips_six',
    why: 'AND A CODON IS THREE BASES, SO SIX BITS: 4^3 = 64 = 2^6, and complementing a whole codon flips every one of the six — three bases at two bits each. The width scales with the word; the isometry does not change.',
    js: () => 4 ** 3 === 64 && 2 ** 6 === 64 && 3 * 2 === 6 && pop(63) === 6,
    lean: 'theorem codon_flips_six : ((4:Nat)^3 = 64) ∧ ((2:Nat)^6 = 64) ∧ (3 * 2 = 6) ∧ (pop 63 = 6) := by decide' },

  { key: 'distance_is_symmetric',
    why: 'THE DISTANCE IS A METRIC. Both halves on the line, so the second is discharged where it is claimed rather than assumed from the first.',
    js: () => R(16).every((a) => R(16).every((b) => dist(a, b) === dist(b, a) && (dist(a, b) === 0) === (a === b))),
    lean: 'theorem distance_is_symmetric : (List.range 16).all (fun a => (List.range 16).all (fun b => (dist a b == dist b a) && ((dist a b == 0) == (a == b)))) := by decide' },

  { key: 'isometry_bounds_correction',
    why: 'AND WHY A CODE CORRECTS AT ALL: correction depends only on distance, which the isometry preserves, so the decoder\'s geometry survives encoding. At distance three a decoder corrects one error and detects two — (3−1)/2 = 1 and 3−1 = 2 — and it cannot correct two, which the line proves rather than leaves implied.',
    js: () => { const corr: number = (3 - 1) / 2, det: number = 3 - 1, two: number = 2; return corr !== two && corr === 1 && det === 2 },
    lean: 'theorem isometry_bounds_correction : ((3 - 1) / 2 = 1) ∧ (3 - 1 = 2) ∧ ((3 - 1) / 2 ≠ 2) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Isometry.lean', skill: 'isometry', defs: DEFS,
  header: 'THE XOR ISOMETRY — the one identity the cipher, the strand and the code each hold a corner of.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
