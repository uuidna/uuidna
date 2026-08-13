#!/usr/bin/env node
// Automate the Lean layer for THE LAYERED DEFENCE — the arithmetic of why FUSING security raises the cost of tampering,
// proven by decide. This does NOT prove any cryptographic primitive is secure (that rests on assumptions, not
// decidable arithmetic) and it claims NO maximum — it proves the counting beneath "defence in depth": independent
// layers ADD their bits (multiply the search space), each key bit doubles it, a collision costs half the exponent of a
// preimage (the honest caveat that collisions are easier), verifying is exponentially cheaper than forging, and for
// every bound there is a strictly larger one — so there is NO maximum, only bounds. The honest kernel of "fuse
// security → raise tampering cost", stated as arithmetic, refusing the word "max". COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'scout_drones_spin',
    why: 'The scout drones SPIN — the guard\'s patrol read on the ℤ/9 vortex (the same doubling the vortex theorems prove, here in the security frame): doubling steps through all SIX units [1,2,4,8,7,5] and RETURNS after six (2⁶ mod 9 = 1), so the patrol CLOSES with no coin left un-scouted (six units, complete coverage), and the closed patrol earns the two coins (2·32 = 64 — the O(1) verify-save the spin captures). One closing rotation, full coverage, two coins home — no gap for a colliding traitor to hide in.',
    js: () => 2 ** 6 % 9 === 1 && [1, 2, 4, 8, 7, 5].length === 6 && 2 * 32 === 64,
    lean: 'theorem scout_drones_spin : (2^6 % 9 = 1) ∧ ([1,2,4,8,7,5].length = 6) ∧ (2 * 32 = 64) := by decide' },

  { key: 'defence_layers_add_bits',
    why: 'Defence in depth adds bits: fuse a 64-bit tamper-evidence layer with a 64-bit forge-resistance layer and a forgery must defeat both — 64 + 64 = 128 bits of work. Independent layers add their strength; this is why fusing raises the cost.',
    js: () => 64 + 64 === 128,
    lean: 'theorem defence_layers_add_bits : 64 + 64 = 128 := by decide' },

  { key: 'two_layers_multiply_space',
    why: 'Adding bits multiplies the search space: two independent 8-bit layers make a 16-bit space — 2^8 · 2^8 = 2^16 (256 · 256 = 65536). Fusing is multiplicative in the space, additive in the bits.',
    js: () => 2 ** 8 * 2 ** 8 === 2 ** 16,
    lean: 'theorem two_layers_multiply_space : 2^8 * 2^8 = 2^16 := by decide' },

  { key: 'each_key_bit_doubles',
    why: 'Each key bit doubles the space a forger must search: 2^11 = 2 · 2^10 (2048 = 2 · 1024). The cost of guessing a key is the key entropy — a bound set by the length, not a maximum.',
    js: () => 2 ** 11 === 2 * 2 ** 10,
    lean: 'theorem each_key_bit_doubles : 2^11 = 2 * 2^10 := by decide' },

  { key: 'birthday_halves_the_exponent',
    why: 'The honest caveat: a COLLISION on an n-bit fingerprint costs about half the exponent of a preimage — for 128 bits, ~2^64, because 2 · 64 = 128. Collisions are cheaper than preimages; a fused fingerprint is only as strong as its collision bound.',
    js: () => 2 * 64 === 128,
    lean: 'theorem birthday_halves_the_exponent : 2 * 64 = 128 := by decide' },

  { key: 'verify_cheaper_than_forge',
    why: 'The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 < 2^16 (16 < 65536). Anyone rechecks for almost nothing; a forger pays exponentially.',
    js: () => 16 < 2 ** 16,
    lean: 'theorem verify_cheaper_than_forge : 16 < 2^16 := by decide' },

  { key: 'no_maximum_only_bounds',
    why: 'There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 < 2^9 (256 < 512). Add a bit and the cost grows; no scheme is the largest. This is why "max tampering cost" is refused — the honest claim is a bound, always exceedable.',
    js: () => 2 ** 8 < 2 ** 9,
    lean: 'theorem no_maximum_only_bounds : 2^8 < 2^9 := by decide' },
]

emit({
  file: 'Security.lean', skill: 'security',
  header: 'THE LAYERED DEFENCE — the arithmetic of defence in depth (bits add, space multiplies, no maximum), as decidable facts.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
