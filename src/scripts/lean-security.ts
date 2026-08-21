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

  // ── THE BIRTHDAY BOUND TURNED ON THIS LEDGER'S OWN STRUCTURE. Computed from the ledger itself, not observed in
  // the world — so no external authority is owed. The empirical-observation verb is deliberately avoided here:
  // the sources finder flagged an earlier draft for it, correctly, since computing over a repo is not an
  // observation of the world. (It reads raw source, so even NAMING that verb in a comment trips it — the same
  // way the determinism scan tripped on a comment naming the builtin maths helper it forbids.)
  // 72 wings share Lean lines across exactly 17 wing-pairs, and 14 of those are single lines between unrelated wings
  // (BioPhysics–Psychology on 2³ = 8, Quantum–Matching on 4·4 = 16). The question was whether those fourteen mean
  // anything. They do not, and the arithmetic below is why — while the ONE dense bond, Core↔Ring at 64 groups
  // against a size-weighted expectation of 1.4, is 45× chance and is the ℤ/9 table deliberately sealed in both
  // wings, already declared in lean/statement-index.json. Two categories, no third.
  { key: 'collisions_under_one',
    why: 'FOURTEEN COINCIDENCES ARE EXACTLY WHAT FOURTEEN EVENTS PREDICT. By linearity of expectation the expected number of COLLIDING pairs among G events over P bins is C(G,2)/P — a rational, needing no approximation. This ledger has 72 wings, so P = 72·71/2 = 2556 possible wing-pairs; the 14 reuse events outside the declared Core/Ring/Vortex cluster give C(14,2) = 14·13/2 = 91, and 91 < 2556, so the expected collision count is 91/2556, under ONE. Fourteen events landing on fourteen distinct pairs is therefore the PREDICTED outcome, not a discovery: the shared facts are the smallest ones (2³ = 8, 4·4 = 16), and a small pool collides at the rate pigeonhole dictates — the same law gematria_forces_collisions states for letter-sums. this seals the EXPECTATION, an exact rational bound; it does not measure the ledger, and a future ledger with different counts must recompute rather than cite this.',
    js: () => 72 * 71 / 2 === 2556 && 14 * 13 / 2 === 91 && 91 < 2556,
    lean: 'theorem collisions_under_one : (72 * 71 / 2 = 2556) ∧ (14 * 13 / 2 = 91) ∧ (91 < 2556) := by decide' },

  { key: 'verify_cheaper_than_forge',
    why: 'The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 < 2^16 (16 < 65536). Anyone rechecks for almost nothing; a forger pays exponentially.',
    js: () => 16 < 2 ** 16,
    lean: 'theorem verify_cheaper_than_forge : 16 < 2^16 := by decide' },

  // ── THE RELEASE CHAIN'S ORDERING, AS ARITHMETIC. A tag fires publish and deploy together. `live` verifies
  // uuidna.com and waits on `publish`, whose prepublishOnly audit runs about nine minutes, while the deploy takes
  // about two — so the site is already updated when live checks it. That margin is a BUDGET, not a proof, so
  // live now blocks on the served feed's own identity instead, bounded at forty probes of fifteen seconds. What is
  // decidable, and worth sealing, is that the bound COVERS the margin: a wait shorter than the gap it must absorb
  // would fail a release that was merely slow, which is the opposite of the honesty it exists to provide.
  { key: 'wait_covers_margin',
    why: 'THE WAIT MUST OUTLAST THE GAP IT ABSORBS. The release chain runs two jobs from one tag: a deploy of about 2 minutes and an audit of about 9, so the worst case a verifier must sit through is 9 − 2 = 7 minutes, or 420 seconds. The bound is 40 probes at 15 seconds = 600 seconds, and 600 > 420 — the wait covers the margin with room, so a release that is merely slow is not failed as if it were broken. the two durations are the DECLARED BUDGET the chain is designed around, not an observation of the world and not a constant of nature — what is sealed is only the COMPARISON between the bound and the gap. A pipeline whose audit outgrows the budget must widen the bound rather than cite this.',
    js: () => 40 * 15 === 600 && (9 - 2) * 60 === 420 && 600 > 420,
    lean: 'theorem wait_covers_margin : (40 * 15 = 600) ∧ ((9 - 2) * 60 = 420) ∧ (600 > 420) := by decide' },

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
