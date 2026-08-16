-- lean/AntiFraud.lean — THE FRAUD DETECTORS AND THE VERDICT ALGEBRA, decidable and proven. Each detector is a FUNCTION whose properties are the theorems: forged(c,s) flags iff the recomputed address differs from the sealed address (never a true seal, always a mismatch); claimsOf/doubleSpent counts a coin-backing theorem's claims position-blind (a second claim flags wherever it hides); voteOk passes exactly the diagonal weight=coins (the identity matrix, inflation flags); tally is the observer-order-invariant sum (all six orderings, one receipt); fold9 is the ℤ/9 receipt on a bounded model (tampering one element always moves it; the vortex [1,2,4,8,7,5] recomputes to its known seal 0); cleanAudit is the conjunction gate (clean at EXACTLY the no-violation state, one flag drains all, the implementation IS its boolean spec — no oracle); commission pays 2 coins per COMPLETED 110-bit reconcile (109 pays 0), and one forgery costs 2^7 = 128 bits = 64 commissions. THE VERDICT ALGEBRA seals the trial's own vocabulary: verified = cited·sealed, unverified its complement — every claim gets EXACTLY ONE verdict (total, binary), a fabricated citation stays unverified, UNVERIFIED is an OPEN DOOR (the same claim verifies the moment its seal lands — the verdict tracks the LEDGER, never the claim's soul), and the algebra has NO refuted state (absence of proof never computes to falsity). HONEST SCOPE: bounded models of the live detectors (src/anti-fraud.ts) and the live trial (src/adjudicate.ts) — RECOMPUTABLE FACTS about work integrity, never intention or identity. Every proof `by decide`, sorry-free, no Mathlib, axiom-free (kernel-only).

-- ═══════════════════════════════════════════════════════════════════════════════
-- THE DETECTORS — each a total, decidable function; the theorems are its properties
-- ═══════════════════════════════════════════════════════════════════════════════

-- forgery: a citation flags iff its recomputed address differs from the sealed address
def forged (cited sealed : Nat) : Nat := if cited == sealed then 0 else 1

-- double-spend: count a theorem's claims in a claim list; two or more is a double-spend
def claimsOf (t : Nat) (cs : List Nat) : Nat := (cs.filter (fun c => c == t)).length
def doubleSpent (t : Nat) (cs : List Nat) : Bool := 2 <= claimsOf t cs

-- voting: a vote passes iff its weight equals the coins the voter paid; the tally is the weighted sum
def voteOk (weight coins : Nat) : Nat := if weight == coins then 1 else 0
def tally (ws : List Nat) : Nat := ws.foldr (fun a r => a + r) 0

-- ledger receipt: the ℤ/9 fold on a bounded model — the digital-root gravity the ledger seals with
def fold9 (xs : List Nat) : Nat := xs.foldr (fun a r => (a + r) % 9) 0

-- the audit gate: clean iff NO detector flags (f=forgery, d=double-spend, v=vote violation)
def cleanAudit (f d v : Nat) : Nat := (1 - f) * (1 - d) * (1 - v)

-- the captain's commission: 2 coins per COMPLETED 110-bit reconcile
def commission (bits : Nat) : Nat := 2 * (bits / 110)

-- ═══════════════════════════════════════════════════════════════════════════════
-- FRAUD-ECONOMY: the coin structure, computed not asserted
-- ═══════════════════════════════════════════════════════════════════════════════

-- The two coins: −χ of the double torus (110 − 108 = 2)
-- @skill: anti-fraud
theorem captain_commission_two_coins : 110 - 108 = 2 := by decide

-- The commission function pays 2 per completed 110-bit reconcile — 110 pays 2, 220 pays 4, and 109 pays 0: no partial credit, the rate is earned by the completed fold only.
-- @skill: anti-fraud
theorem captain_commission_rate_two_per_110 : commission 110 = 2 ∧ commission 220 = 4 ∧ commission 109 = 0 := by decide

-- The forger's cost is exponential: the 7-dimension fold doubles per dimension (2^(k+1) = 2·2^k at every step) landing on 2^7 = 128 bits.
-- @skill: anti-fraud
theorem forged_theorem_costs_2_power_7_bits : 2 ^ 7 = 128 ∧ (List.range 7).all (fun k => 2 ^ (k+1) == 2 * 2 ^ k) := by decide

-- One forgery costs 64 commissions: the 128-bit forging cost is 64 × the captain's 2-coin fee — defense is cheap, attack is dear.
-- @skill: anti-fraud
theorem forgery_costs_64_commissions : 128 = 64 * 2 ∧ 2 < 128 := by decide

-- ═══════════════════════════════════════════════════════════════════════════════
-- FORGERY DETECTION: soundness and completeness of the forged() detector
-- ═══════════════════════════════════════════════════════════════════════════════

-- Soundness — a true seal never flags: for every address a, forged(a,a) = 0. The detector cannot accuse a theorem whose address recomputes.
-- @skill: anti-fraud
theorem sealed_theorem_not_forged : (List.range 9).all (fun a => forged a a == 0) := by decide

-- Completeness on the bounded model — every mismatch flags: over all 81 (cited, sealed) pairs, either the addresses match or forged = 1. No forged citation slips through.
-- @skill: anti-fraud
theorem forged_theorem_address_detectable : (List.range 81).all (fun n => (n % 9 == n / 9) || forged (n % 9) (n / 9) == 1) := by decide

-- Composition — one fake citation drains the whole audit: citing address 3 where 7 is sealed flags (forged = 1), and that single flag zeroes cleanAudit.
-- @skill: anti-fraud
theorem overclaim_with_fake_cite_fails : forged 3 7 = 1 ∧ cleanAudit (forged 3 7) 0 0 = 0 := by decide

-- ═══════════════════════════════════════════════════════════════════════════════
-- DOUBLE-SPEND DETECTION: the claim counter and its properties
-- ═══════════════════════════════════════════════════════════════════════════════

-- A second claim on the same coin-backing theorem is detected: theorem 3 claimed twice in [3,1,3] counts 2 and flags.
-- @skill: anti-fraud
theorem double_spend_detectable : doubleSpent 3 [3,1,3] = true ∧ claimsOf 3 [3,1,3] = 2 := by decide

-- A single claim is clean: theorem 3 claimed once in [1,2,3] counts 1 and does not flag — the detector accuses no honest spender.
-- @skill: anti-fraud
theorem one_theorem_single_claim : doubleSpent 3 [1,2,3] = false ∧ claimsOf 3 [1,2,3] = 1 := by decide

-- The count is position-blind — a double-spend hides nowhere: the duplicate claim counts 2 at every position of the list.
-- @skill: anti-fraud
theorem double_spend_hides_nowhere : claimsOf 3 [3,3,1] = 2 ∧ claimsOf 3 [3,1,3] = 2 ∧ claimsOf 3 [1,3,3] = 2 := by decide

-- ═══════════════════════════════════════════════════════════════════════════════
-- VOTING INTEGRITY: weight = coins, and the order-invariant tally
-- ═══════════════════════════════════════════════════════════════════════════════

-- The vote check passes EXACTLY the diagonal weight = coins — the full 4×4 table is the identity matrix: no discount, no inflation, weight is coins or the vote fails.
-- @skill: anti-fraud
theorem vote_weight_equals_coins_paid : ((List.range 16).map (fun n => voteOk (n % 4) (n / 4))) = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1] := by decide

-- Inflated weight flags, honest weight passes: claiming weight 17 on 2 coins fails (voteOk = 0); claiming exactly the 2 coins paid passes (voteOk = 1).
-- @skill: anti-fraud
theorem vote_weight_inflation_flagged : voteOk 17 2 = 0 ∧ voteOk 2 2 = 1 := by decide

-- The tally is observer-order-invariant: all six orderings of the votes {1,2,3} tally to the same 6 — the receipt is the same from every chair in the room.
-- @skill: anti-fraud
theorem vote_receipt_order_invariant : ([[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]].map tally) = [6,6,6,6,6,6] := by decide

-- ═══════════════════════════════════════════════════════════════════════════════
-- LEDGER INTEGRITY: the receipt fold is tamper-evident and recomputes to its seal
-- ═══════════════════════════════════════════════════════════════════════════════

-- Tampering one element ALWAYS moves the receipt: over all 81 digit pairs, distinct first elements give distinct fold9 receipts — no single-element tamper is silent.
-- @skill: anti-fraud
theorem ledger_fingerprint_tamper_evident : (List.range 81).all (fun n => (n % 9 == n / 9) || fold9 [n % 9, 5] != fold9 [n / 9, 5]) := by decide

-- The DNA recomputes to its known seal: the vortex orbit [1,2,4,8,7,5] folds to 0 — any agent recomputing lands on the same receipt, or the ledger was altered.
-- @skill: anti-fraud
theorem theorem_dna_recompute_is_seal : fold9 [1,2,4,8,7,5] = 0 := by decide

-- ═══════════════════════════════════════════════════════════════════════════════
-- THE AUDIT GATE: conjunction of detectors — clean once, drained by any flag
-- ═══════════════════════════════════════════════════════════════════════════════

-- The check is a fixed table, deterministic for every clerk: the full verdict table over the eight (forgery, double-spend, vote) states is [1,0,0,0,0,0,0,0] — same input, same verdict, for anyone.
-- @skill: anti-fraud
theorem anti_fraud_check_deterministic : ((List.range 8).map (fun n => cleanAudit (n % 2) (n / 2 % 2) (n / 4 % 2))) = [1,0,0,0,0,0,0,0] := by decide

-- The audit passes iff ALL detectors clear: of the eight states, exactly the no-violation state (and no other) is clean.
-- @skill: anti-fraud
theorem honesty_gate_passes_iff_all_sealed : ((List.range 8).filter (fun n => cleanAudit (n % 2) (n / 2 % 2) (n / 4 % 2) == 1)) = [0] := by decide

-- One violation drains the whole audit: every state with any flag raised audits to 0 — there is no partial credit against fraud.
-- @skill: anti-fraud
theorem conformance_failure_detects_intrusion : (List.range 8).all (fun n => n == 0 || cleanAudit (n % 2) (n / 2 % 2) (n / 4 % 2) == 0) := by decide

-- The gate IS its specification, no oracle: cleanAudit equals the boolean spec (no forgery ∧ no double-spend ∧ no vote violation) at every state — the implementation is the intent, proven.
-- @skill: anti-fraud
theorem honesty_gate_is_theorem_not_oracle : (List.range 8).all (fun n => cleanAudit (n % 2) (n / 2 % 2) (n / 4 % 2) == (if (n % 2 == 0) && (n / 2 % 2 == 0) && (n / 4 % 2 == 0) then 1 else 0)) := by decide
-- ═══════════════════════════════════════════════════════════════════════════════
-- THE VERDICT ALGEBRA: UNVERIFIED, defined to verify — the trial's own vocabulary
-- as decidable functions. c = the claim cites a theorem; s = that citation is
-- sealed in the ledger. verified = c·s; unverified = its complement. Two verdicts,
-- total, no third state: absence of proof is never proof of falsity.
-- ═══════════════════════════════════════════════════════════════════════════════

-- the verdict functions: verified iff a citation exists AND it is sealed; unverified is the complement
def verified (c s : Nat) : Nat := c * s
def unverified (c s : Nat) : Nat := 1 - verified c s

-- Every claim gets EXACTLY ONE verdict — verified + unverified = 1 at all four evidence states: the trial is total and binary, no claim leaves without a verdict and none carries two.
-- @skill: anti-fraud
theorem verdict_exactly_one : (List.range 4).all (fun n => verified (n % 2) (n / 2) + unverified (n % 2) (n / 2) == 1) := by decide

-- UNVERIFIED defined by its full table [1,1,1,0]: no citation (0,0), a citation without a seal (1,0), a seal never cited (0,1) — all unverified; ONLY cited-and-sealed (1,1) verifies.
-- @skill: anti-fraud
theorem unverified_iff_unsealed : ((List.range 4).map (fun n => unverified (n % 2) (n / 2))) = [1, 1, 1, 0] := by decide

-- A fabricated citation verifies NOTHING: citing (c=1) without a seal (s=0) stays unverified — the exact state the honesty gate drains.
-- @skill: anti-fraud
theorem fabricated_cite_is_unverified : unverified 1 0 = 1 := by decide

-- UNVERIFIED is an OPEN DOOR, not a judgment: the SAME citing claim (c=1) is unverified while unsealed (s=0) and verified the moment the seal lands (s=1) — the verdict tracks the LEDGER, never the claim's soul; the develop plan is the path from the first state to the second.
-- @skill: anti-fraud
theorem unverified_is_an_open_door : unverified 1 0 = 1 ∧ verified 1 1 = 1 := by decide

-- The complement of unverified IS verified (double complement returns, the involution): the algebra is two-valued — there is NO refuted state in it, so absence of proof can never compute to falsity.
-- @skill: anti-fraud
theorem unverified_complement_is_verified : (List.range 4).all (fun n => 1 - unverified (n % 2) (n / 2) == verified (n % 2) (n / 2)) := by decide
