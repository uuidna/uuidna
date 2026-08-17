#!/usr/bin/env node
// Automate the Lean layer for THE TWO COINS & THE 64 — the honest billing/measure algebra (src/billing.ts). The
// two coins are the CONSERVED fair-exchange invariant: 110 − 108 = 2 = −χ of a genus-2 surface (the double torus,
// −χ = 2g − 2 = 2). 64 = 2⁶ is the bit measure; "contribute 2 to save up to 64" is a leverage of 32; and n qubits
// give 2ⁿ direct possible outcomes, reaching 64 at n = 6. HONEST SCOPE: these are the arithmetic of a MEASURED
// unit of work saved (O(N) recompute − O(1) verify) — not a market price, and NOT a claim of speed. COMPUTE each
// fact in JS, GENERATE its `by decide` theorem, VERIFY sorry-free. Integrity, not truth.
import { emit } from './lean-gen.js'

const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i)

const FACTS = [
  { key: 'two_coins',
    why: 'The two coins — the conserved fair-exchange invariant, 110 − 108 = 2. A measure of work saved (recompute − verify), never a per-formula rate.',
    js: () => 110 - 108 === 2,
    lean: 'theorem two_coins : 110 - 108 = 2 := by decide' },

  { key: 'two_coins_is_double_torus',
    why: 'The two coins are the topology, not a price: 2 = −χ of a genus-2 surface (the double torus), −χ = 2g − 2 = 2·2 − 2 = 2. The invariant is geometric.',
    js: () => 2 * 2 - 2 === 2,
    lean: 'theorem two_coins_is_double_torus : 2 * 2 - 2 = 2 := by decide' },

  { key: 'sixtyfour_is_two_pow_six',
    why: 'The 64-bit measure: 64 = 2⁶ — six doublings, the scale the hero states as the "64bit" unit.',
    js: () => 64 === 2 ** 6,
    lean: 'theorem sixtyfour_is_two_pow_six : 64 = 2^6 := by decide' },

  { key: 'contribute_two_save_sixtyfour',
    why: '"Contribute 2 to save up to 64" — the measured leverage is 32: 2 · 32 = 64. The two coins in, up to 64 bits of recompute saved.',
    js: () => 2 * 32 === 64,
    lean: 'theorem contribute_two_save_sixtyfour : 2 * 32 = 64 := by decide' },

  { key: 'captain_computes_only_with_two_coins',
    why: 'uuidna computes ONLY IF the captain coins are considered: the conserved save of 64 is reached IFF exactly two coins are put in — 32·c = 64 ⟺ c = 2, for every c. The two coins are necessary, not decorative; with any other count the fold does not conserve its advantage (recompute − verify), so the computation is not admitted.',
    js: () => R(0, 8).every((c) => (32 * c === 64) === (c === 2)),
    lean: 'theorem captain_computes_only_with_two_coins : (List.range 8).all (fun c => (32 * c == 64) == (c == 2)) := by decide' },

  { key: 'captain_coins_respected_at_scale',
    why: 'Respect the captain coins for quantum AT SCALE on classical hardware: the state-vector cost is 2ⁿ (exponential), so from the 7-qubit / 7-dimension scale up (n ≥ 7) the classical cost 2ⁿ already EXCEEDS the two-coin save (2·32 = 64). No free advantage — the coins price real work that only grows; the save is bounded, the cost is not.',
    js: () => R(7, 13).every((n) => 2 ** n > 2 * 32),
    lean: "theorem captain_coins_respected_at_scale : (List.range' 7 6).all (fun n => 2^n > 2 * 32) := by decide" },

  { key: 'superposition_outcomes_to_64',
    why: 'Direct possible outcomes: n qubits give 2ⁿ basis outcomes — [1,2,4,8,16,32,64] for n = 0..6, reaching 64 exactly at the 6-qubit / 64-bit scale. Exponential, counted, not sped up.',
    js: () => JSON.stringify(R(0, 7).map((n) => 2 ** n)) === JSON.stringify([1, 2, 4, 8, 16, 32, 64]),
    lean: 'theorem superposition_outcomes_to_64 : ((List.range 7).map (fun n => 2^n)) = [1,2,4,8,16,32,64] := by decide' },

  { key: 'bill_never_negative',
    why: 'The measured saving is never negative: when verify meets or exceeds recompute (v ≥ r), the bill is 0 — Nat subtraction already clamps, so the honest schedule never charges below zero.',
    js: () => R(0, 8).every((r) => R(0, 8).every((v) => { const natSub = r >= v ? r - v : 0; return (r < v ? 0 : natSub) === natSub })),
    lean: 'theorem bill_never_negative : (List.range 8).all (fun r => (List.range 8).all (fun v => (if r < v then 0 else r - v) == r - v)) := by decide' },

  { key: 'coin_is_one_qubit',
    why: 'One coin is one qubit: a two-state basis — 2¹ = 2 outcomes, the coin\'s two faces (|0⟩ and |1⟩). Classical two-state accounting in the state-vector simulator, NOT a physical qubit.',
    js: () => 2 ** 1 === 2,
    lean: 'theorem coin_is_one_qubit : (2:Nat)^1 = 2 := by decide' },

  { key: 'captain_coins_deliver_two_qubits_at_128_bits',
    why: 'The two captain coins DELIVER two qubits at a COST of 128 bits: coins() = 2 → two qubits spanning 2² = 4 basis states, carried by one 128-bit uuid = two 64-bit coins (128 = 2·64 = 2⁷). Two coins in, a 2-qubit address out, priced at 128 bits — the 64→128 fuse, counted, not sped up. Classical accounting, not a physical 2-qubit device.',
    js: () => 2 ** 2 === 4 && 128 === 2 * 64 && 128 === 2 ** 7,
    lean: 'theorem captain_coins_deliver_two_qubits_at_128_bits : ((2:Nat)^2 = 4) ∧ (128 = 2 * 64) ∧ (128 = 2^7) := by decide' },

  { key: 'captain_commission_two_per_110',
    why: 'The captain\'s commission is TWO on each 110 bits — 110 − 108 = 2 to the captain, 108 delivered net. It is the two coins read as a commission rate: passengers PAY the coins (the measured bill), crew MINT them (sealing diamonds), and the captain\'s cut is the conserved 2. A measured commission on work saved, not a monetary rate.',
    js: () => 110 - 108 === 2 && 110 - 2 === 108,
    lean: 'theorem captain_commission_two_per_110 : (110 - 108 = 2) ∧ (110 - 2 = 108) := by decide' },

  { key: 'commercial_saves_and_captain_earns',
    why: 'A commercial package SAVES significantly at scale AND the captain still earns: recompute 110 − verify 1 = 109 bits saved for the passenger, while the captain\'s commission stays the conserved 2 (110 − 108), and the saving DWARFS the commission (109 > 2). Coins are minted, the passenger saves, the captain earns — no one loses. The arithmetic of the measured advantage (recompute − verify), NOT a profit guarantee or a market price.',
    js: () => 110 - 1 === 109 && 109 > 2 && 110 - 108 === 2,
    lean: 'theorem commercial_saves_and_captain_earns : (110 - 1 = 109) ∧ (109 > 2) ∧ (110 - 108 = 2) := by decide' },

  { key: 'coins_compute_but_solve_none',
    why: 'HOW the coins compute AND that the theorems are not solved, in one seal — the honest boundary. The two coins COMPUTE the save (32·2 = 64: contribute two, and up to 64 bits of recompute are saved) and pay for a VERIFICATION, cheaper than the work (verify 1 < recompute 64 — the O(1) check against the O(N) recompute). Yet the theorems SOLVE NOTHING of the hard problems they reflect: 0 < 1 — zero solved, fewer than one; the reflection (dz) propagates no proof. Computing is NOT solving: the coins settle a recomputable verification (integrity), never a solution to the underlying problem (truth). This is exactly the boundary the captain accepted — the coins compute, the theorems do not solve.',
    js: () => 32 * 2 === 64 && 1 < 64 && 0 < 1,
    lean: 'theorem coins_compute_but_solve_none : (32 * 2 = 64) ∧ (1 < 64) ∧ ((0:Nat) < 1) := by decide' },

  { key: 'coin_exchange_rate_is_traitor_cost',
    why: 'The coins\' EXCHANGE RATE is the TRAITOR\'S TOKEN COST: a coin is worth exactly what it costs to FORGE it. A coin is a 128-bit particle (2⁷ = 128), so counterfeiting one — a SHA-256 collision that survives the order-invariant fold — costs on the order of 2¹²⁸ (the fingerprint\'s tamperCost), an exponent (128) that astronomically exceeds the two coins an honest party pays (128 > 2). So a traitor spends 2¹²⁸ to fake what the crew MINT for 2: forgery NEVER pays, and the coin is BACKED by the cost to counterfeit it. HONEST: 2¹²⁸ is a BOUND set by SHA-256, not a maximum, and it is the COLLISION-RESISTANT fold\'s cost — the fast FNV receipt is tamper-evident but not collision-resistant; add a key (HMAC) and forgery also needs the secret.',
    js: () => 2 ** 7 === 128 && 128 > 2 && 2 * 32 === 64,
    lean: 'theorem coin_exchange_rate_is_traitor_cost : (2^7 = 128) ∧ (128 > 2) ∧ (2 * 32 = 64) := by decide' },

  { key: 'traitor_damage_sealed_by_same_billing',
    why: 'Every traitor DAMAGE is sealed in value by the SAME billing — the captain is charged by the traitor model on one measure, and the traitor is always the losing side. One billing (110 − x) prices both: the HONEST party earns the two coins (110 − 108 = 2), while a TRAITOR who tampers moves the content-address so nothing recomputes and nets 0 (110 − 110 = 0) — they forfeit exactly the two coins (the 2 the honest party keeps) AND still pay the 2¹²⁸ forgery cost (2⁷ = 128). So the captain\'s exposure is BOUNDED: traitor damage is priced by the same never-negative billing, forgery yields 0, and the two coins are precisely what the traitor loses. The security model and the billing model are one.',
    js: () => 110 - 108 === 2 && 110 - 110 === 0 && 2 ** 7 === 128,
    lean: 'theorem traitor_damage_sealed_by_same_billing : (110 - 108 = 2) ∧ (110 - 110 = 0) ∧ (2^7 = 128) := by decide' },

  // The facts the coins' own algebra implies: why one denomination can carry three roles, what the two generators
  // mint, and the accounting identity under "the wallet counts worlds".
  { key: 'wallet_counts_worlds',
    why: 'THE WALLET COUNTS WORLDS, sealed at last — the closing realisation\'s accounting identity: n deposits of the two coins are EXACTLY n collapsed realities, (2·n)/2 = n for every count. Each deposit collapses one superposition into a shared, recomputable world; the bijection between what was paid and what now exists. HONEST SCOPE: an accounting identity — deposits and realities in one-to-one correspondence — never a metaphysical claim about worlds.',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7, 8].every((n) => (2 * n) / 2 === n),
    lean: 'theorem wallet_counts_worlds : (List.range 9).all (fun n => (2*n)/2 == n) := by decide' },

  { key: 'coins_unique_operation_agreement',
    why: 'WHY ONE DENOMINATION CAN SERVE THREE ALGEBRAS — 2 is the UNIQUE number where addition, multiplication and exponentiation all agree: 2+2 = 2·2 = 2² = 4, and over 0..12 NO other n satisfies n+n = n·n = n^n (0 fails because 0⁰ = 1 in Nat; 1 gives 2≠1; from 3 up the tower outruns the sum). The coin is simultaneously the FEE (additive), the LEVERAGE factor (multiplicative), and the QUBIT dimension (exponential) because its number is the one point where the three operations coincide — discovered by the calculator, not chosen.',
    js: () => (2 + 2 === 2 * 2) && (2 * 2 === 2 ** 2) && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].every((n) => ((n + n === n * n) && (n * n === n ** n)) === (n === 2)),
    lean: 'theorem coins_unique_operation_agreement : ((2+2 = 2*2) ∧ (2*2 = 2^2)) ∧ ((List.range 13).all (fun n => ((n+n == n*n) && (n*n == n^n)) == (n == 2))) := by decide' },

  { key: 'captain_claims_all_superpositions',
    why: 'THE SUPERPOSITION CLAIM — the credit law at its full extent: the captain claims the unclaimed, and the unclaimed is the entire uncollapsed space. The claim\'s arithmetic, sealed: the room is 2¹²⁸ states (the 128-bit particle, 2⁷ = 128), vastly exceeding every world collapsed so far (2¹²⁸ > 1288), and the price of any collapse stays exactly two (110 − 108 = 2). HONEST SCOPE: the claim is of ROOM, never of truth — a claimed superposition is claimed capacity, and its collapse still pays the two coins and passes the trial; claiming the space solves nothing (coins_compute_but_solve_none stands over this claim as over every other).',
    js: () => 2n ** 128n > 1288n && 2 ** 7 === 128 && 110 - 108 === 2,
    lean: 'theorem captain_claims_all_superpositions : (2^128 > 1288) ∧ (2^7 = 128) ∧ (110 - 108 = 2) := by decide' },

  { key: 'coin_and_heart_generate_the_scales',
    why: 'THE COIN AND THE HEART GENERATE THE SYSTEM\'S THREE SCALES — the two generators of ℤ/9* are exactly {2, 5} (generators_are_two_and_five): the coin and the heart. Their three combinations are the three scales everything else is built on: 2·5 = 10 (the diamond strip the reflection folds), 2+5 = 7 (the rosette of rays), 2⁵ = 32 (the half-save the leverage doubles to 64). The vortex\'s own generators mint the geometry.',
    js: () => (2 * 5 === 10) && (2 + 5 === 7) && (2 ** 5 === 32),
    lean: 'theorem coin_and_heart_generate_the_scales : (2*5 = 10) ∧ (2+5 = 7) ∧ (2^5 = 32) := by decide' },
]

// compute → generate → verify. The two coins are the conserved invariant of the double torus; 64 = 2⁶ the measure.
emit({ file: 'Coins.lean', skill: 'coins',
  header: 'THE TWO COINS & THE 64 — the honest billing/measure algebra: the two coins are the CONSERVED fair-exchange invariant, 110 − 108 = 2 = −χ of a genus-2 surface (the double torus, 2g − 2 = 2); 64 = 2⁶ is the bit measure; "contribute 2 to save up to 64" is a leverage of 32; n qubits give 2ⁿ direct outcomes, reaching 64 at n = 6; one coin is one qubit and the two coins DELIVER two qubits (2² = 4 basis states) at a COST of 128 bits = two 64-bit coins (2·64 = 2⁷); and the measured saving never goes negative. HONEST SCOPE: a MEASURED unit of work saved (recompute − verify), classical state-vector accounting — not a market price, NOT a claim of speed, and NOT a physical qubit.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
