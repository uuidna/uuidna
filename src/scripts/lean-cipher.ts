#!/usr/bin/env node
// Automate the Lean layer for CRYPTO ∩ DNA — the shared algebra of ciphers and the strand, and its HONEST limits.
// Bases A=0, C=1, G=2, T=3; complement comp(x)=3−x pairs A↔T and C↔G. From that one reflection the whole domain
// reads off: base-pairing is a fixed-key XOR (a one-time-pad step), the pad is self-inverse, but key reuse leaks
// the plaintext XOR (why a step must ADVANCE), a linear fold is malleable (a receipt is integrity, not a seal),
// the transport leaks message length, translation is lossy (never a cipher), an affine S-box is invertible but
// linear, and Grover only HALVES the key (256→128, not a break). This script COMPUTES each fact in JS (self-
// proving), GENERATES its `by decide` Lean theorem, writes lean/Cipher.lean, and VERIFIES it compiles sorry-free.
// HONEST SCOPE: these are the decidable BOUNDS of the algebra — what it guarantees and what it cannot. Secrecy is
// ChaCha20-Poly1305 (src/crypt.ts); these theorems are the demarcation, computed, not a claim of a secure cipher.
import { emit, LXOR_DEF } from './lean-gen.js'

const comp = (x: number) => 3 - x // the base-pair complement — the diamond reflection on {A,C,G,T} = {0,1,2,3}
const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i) // [a, b)
const div = (a: number, b: number) => (a - (a % b)) / b // integer floor division — no Math.* (the two-coins guard)

const FACTS = [
  { key: 'dna_complement_involution',
    why: 'Base-pairing is a self-inverse map: the complement comp(x)=3−x applied twice is the identity (A↔T↔A, C↔G↔C) — a decrypt that equals its encrypt, like the diamond reflection.',
    js: () => R(0, 4).every((x) => comp(comp(x)) === x),
    lean: 'theorem dna_complement_involution : (List.range 4).all (fun x => 3 - (3 - x) == x) := by decide' },

  { key: 'dna_complement_fixed_point_free',
    why: 'The complement has NO fixed point — no base pairs with itself — so, like a good permutation cipher, it moves every symbol.',
    js: () => R(0, 4).every((x) => comp(x) !== x),
    lean: 'theorem dna_complement_fixed_point_free : (List.range 4).all (fun x => 3 - x != x) := by decide' },

  { key: 'complement_is_xor_key3',
    why: 'Base-pairing IS a XOR cipher: on the 2-bit encoding comp(x)=3−x equals x XOR 3 — a one-time-pad STEP with the fixed pad 3. Real, but a FIXED pad is public, not secret.',
    js: () => R(0, 4).every((x) => comp(x) === (x ^ 3)),
    lean: 'theorem complement_is_xor_key3 : (List.range 4).all (fun x => 3 - x == lxor x 3) := by decide' },

  { key: 'otp_self_inverse',
    why: 'The one-time-pad is its own inverse (Vernam): (m ⊕ k) ⊕ k = m for every symbol and key — the one information-theoretically secure primitive, WHEN the key is fresh and never reused.',
    js: () => R(0, 16).every((m) => R(0, 16).every((k) => ((m ^ k) ^ k) === m)),
    lean: 'theorem otp_self_inverse : (List.range 16).all (fun m => (List.range 16).all (fun k => lxor (lxor m k) k == m)) := by decide' },

  { key: 'otp_key_reuse_leaks_xor',
    why: 'Key reuse is fatal: two messages under the SAME key leak their plaintext XOR — (m₁⊕k) ⊕ (m₂⊕k) = m₁⊕m₂, independent of k. The honest reason a step MUST advance (the ratchet), and why a fixed-pad complement hides nothing.',
    js: () => R(0, 8).every((m1) => R(0, 8).every((m2) => R(0, 8).every((k) => (((m1 ^ k) ^ (m2 ^ k)) === (m1 ^ m2))))),
    lean: 'theorem otp_key_reuse_leaks_xor : (List.range 8).all (fun m1 => (List.range 8).all (fun m2 => (List.range 8).all (fun k => (lxor (lxor m1 k) (lxor m2 k)) == (lxor m1 m2)))) := by decide' },

  { key: 'xor_fold_is_malleable',
    why: 'A linear (XOR) fold is malleable: flipping the input by d flips the fold by exactly d — (a⊕d)⊕a = d — so it binds nothing an adversary cannot adjust. A content-address is INTEGRITY/routing, NOT a binding one-way seal.',
    js: () => R(0, 16).every((a) => R(0, 16).every((d) => (((a ^ d) ^ a) === d))),
    lean: 'theorem xor_fold_is_malleable : (List.range 16).all (fun a => (List.range 16).all (fun d => lxor (lxor a d) a == d)) := by decide' },

  { key: 'transport_leaks_length',
    why: 'The uuid transport leaks SIZE: a message of b bits occupies ⌈b/115⌉ uuids, a step function of length — content is hidden by the cipher, message LENGTH is not (the chain grows in whole-uuid quanta of 115 bits).',
    js: () => div(1 + 114, 115) === 1 && div(115 + 114, 115) === 1 && div(116 + 114, 115) === 2 && div(230 + 114, 115) === 2 && div(231 + 114, 115) === 3,
    lean: 'theorem transport_leaks_length : ((1 + 114) / 115 = 1) ∧ ((115 + 114) / 115 = 1) ∧ ((116 + 114) / 115 = 2) ∧ ((230 + 114) / 115 = 2) ∧ ((231 + 114) / 115 = 3) := by decide' },

  { key: 'codons_four_cubed',
    why: 'The genetic code reads bases three at a time: 4³ = 64 codons — the DNA alphabet cubed, the domain the code maps from.',
    js: () => 4 ** 3 === 64,
    lean: 'theorem codons_four_cubed : 4^3 = 64 := by decide' },

  { key: 'translation_is_lossy',
    why: 'Translation is LOSSY, never a cipher: 64 codons map onto only 21 outcomes (20 amino acids + stop), and 64 > 21, so by pigeonhole the map cannot be injective — a hash-like reduction that cannot be inverted, not encryption.',
    js: () => 4 ** 3 > 21,
    lean: 'theorem translation_is_lossy : 4^3 > 21 := by decide' },

  { key: 'affine_is_permutation',
    why: 'An affine substitution E(x)=2x+3 over ℤ/5 is a bijection — it hits every residue, so it is an invertible S-box (unlike lossy translation). But it is LINEAR, hence weak: two known plaintext pairs recover it. Invertible ≠ secure.',
    js: () => R(0, 5).every((y) => R(0, 5).some((x) => ((2 * x + 3) % 5) === y)),
    lean: 'theorem affine_is_permutation : (List.range 5).all (fun y => (List.range 5).any (fun x => (2*x + 3) % 5 == y)) := by decide' },

  { key: 'grover_quadratic_bound',
    why: 'The honest quantum posture: Grover’s search is a QUADRATIC speedup, not a break — a 2n-bit key space costs ~2ⁿ work ((2ⁿ)² = 2²ⁿ), so a 256-bit key falls to ~128-bit, still strong. Symmetric-only means no Shor target at all.',
    js: () => R(0, 27).every((n) => 2 ** n * 2 ** n === 2 ** (2 * n)),
    lean: 'theorem grover_quadratic_bound : (List.range 27).all (fun n => 2^n * 2^n == 2^(2*n)) := by decide' },
]

// compute → generate → verify, via the shared pipeline (JS-checks every fact, writes the file + manifest, and
// compiles it sorry-free with `lean`). Crypto ∩ DNA — the shared algebra and its honest limits, demarcated.
emit({ file: 'Cipher.lean', defs: LXOR_DEF,
  header: 'CRYPTO ∩ DNA — the shared algebra of ciphers and the strand, and its HONEST limits: base-pairing is a fixed-key XOR (a one-time-pad step), the pad is self-inverse but key reuse leaks the plaintext XOR, a linear fold is malleable (a receipt is integrity, not a seal), the transport leaks message length, translation is lossy (never a cipher), an affine S-box is invertible but linear, and Grover only halves the key (256→128). HONEST SCOPE: these are the DECIDABLE BOUNDS of the algebra — what it guarantees and what it cannot; secrecy itself is ChaCha20-Poly1305, not this.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
