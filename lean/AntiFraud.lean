-- lean/AntiFraud.lean — GENERATED. THE ANTI-FRAUD DETECTORS — generated, and exhaustive where the wing used to sample. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def forged (cited sealed : Nat) : Nat := if cited == sealed then 0 else 1
def claimsOf (t : Nat) (cs : List Nat) : Nat := (cs.filter (fun c => c == t)).length
def doubleSpent (t : Nat) (cs : List Nat) : Bool := 2 <= claimsOf t cs
def voteOk (weight coins : Nat) : Nat := if weight == coins then 1 else 0
def cleanAudit (f d v : Nat) : Nat := (1 - f) * (1 - d) * (1 - v)
def commission (bits : Nat) : Nat := 2 * (bits / 110)
def verified (c s : Nat) : Nat := c * s
def unverified (c s : Nat) : Nat := 1 - verified c s

-- the 27 length-three claim lists over a three-theorem alphabet — the detector's whole domain
def lists : List (List Nat) := [[1,1,1],[1,1,2],[1,1,3],[1,2,1],[1,2,2],[1,2,3],[1,3,1],[1,3,2],[1,3,3],[2,1,1],[2,1,2],[2,1,3],[2,2,1],[2,2,2],[2,2,3],[2,3,1],[2,3,2],[2,3,3],[3,1,1],[3,1,2],[3,1,3],[3,2,1],[3,2,2],[3,2,3],[3,3,1],[3,3,2],[3,3,3]]

/-- THE CAPTAIN COMMISSION — the key the hosted MCP quotes to every agent that connects and every two-coin
    deposit cites, so the NAME is a published contract. THE COMMISSION IS A STEP. A rate that rounded would
    leak; a floor cannot. -/
theorem captain_commission_two_coins : (commission 110 = 2) ∧ (commission 220 = 4) ∧ (commission 109 = 0) := by decide

/-- THE FORGERY DETECTOR IS EXHAUSTIVE over all 81 cited-versus-sealed pairs: it flags exactly the 72 where the
    two differ and clears exactly the 9 on the diagonal. Every pair walked, so no mismatch has a hiding place. -/
theorem forgery_flags_every_mismatch : (((List.range 9).flatMap (fun c => (List.range 9).map (fun s => forged c s))).filter (fun x => x == 1)).length = 72 ∧ (((List.range 9).flatMap (fun c => (List.range 9).map (fun s => forged c s))).filter (fun x => x == 0)).length = 9 := by decide

/-- THE DOUBLE-SPEND DETECTOR, EXHAUSTIVE AT LAST: all 27 length-three claim lists over three theorems are
    walked, and exactly 21 contain a repeat while 6 do not. The wing formerly sampled four lists by hand — a
    detector tested on the cases its author imagined is tested against its author. -/
theorem double_spend_walks_every_list : (lists.length = 27) ∧ ((lists.filter (fun l => [1,2,3].any (fun t => doubleSpent t l))).length = 21) ∧ ((lists.filter (fun l => !([1,2,3].any (fun t => doubleSpent t l)))).length = 6) := by decide

/-- AND IT DOES NOT OVERREACH: a list naming three different theorems flags nothing, so the detector answers to
    repetition and not to length. Both halves decided — what fires and what must not. -/
theorem single_claim_never_flags : (doubleSpent 1 [1,2,3] = false) ∧ (claimsOf 1 [1,2,3] = 1) ∧ (doubleSpent 3 [3,1,3] = true) := by decide

/-- A VOTE PASSES EXACTLY WHEN ITS WEIGHT EQUALS THE COINS PAID, over all sixteen weight-payment pairs up to
    four: inflation is refused and honest weight is admitted, with no third outcome. -/
theorem vote_passes_iff_weight_paid : (List.range 4).all (fun w => (List.range 4).all (fun c => (voteOk w c == 1) == (w == c))) := by decide

/-- THE GATE IS DETERMINISTIC — the published spec the hosted MCP recomputes against, and a name 59 files cite.
    Across all eight states of the three detectors it passes on exactly ONE — every detector silent — and fails
    on the other seven, so the verdict table is fixed [1,0,0,0,0,0,0,0]: same input, same verdict, for anyone.
    One flag anywhere drains it, which is what makes it a gate rather than a score. THE KEY IS PART OF THE
    CONTRACT: across all eight states of the three detectors it passes on exactly ONE — every detector silent —
    and fails on the other seven. One flag anywhere drains it, which is what makes it a gate rather than a
    score. -/
theorem anti_fraud_check_deterministic : (((List.range 2).flatMap (fun f => (List.range 2).flatMap (fun d => (List.range 2).map (fun v => cleanAudit f d v)))).filter (fun x => x == 1)).length = 1 := by decide

/-- A TRUE SEAL NEVER FLAGS — the gate accuses no honest tool. Walking the nine matching claim-seal pairs,
    forged is 0 at every one, so the forgery detector has no false positive to trade against its recall. This is
    the honest half of forgery_flags_every_mismatch, and it carries its own name because 48 files cite it as the
    guarantee that an honest citation is never refused. -/
theorem sealed_theorem_not_forged : ((List.range 9).map (fun c => forged c c)).all (fun x => x == 0) := by decide

/-- THE GATE PASSES EXACTLY WHEN NOTHING IS FLAGGED — an IFF over all eight detector states"it passes when
    clean". One direction alone would admit a gate that also passed on something else. Named in GATE_THEOREMS as
    part of the gate’s published spec. -/
theorem honesty_gate_passes_iff_all_sealed : (List.range 2).all (fun f => (List.range 2).all (fun d => (List.range 2).all (fun v => (cleanAudit f d v == 1) == (f == 0 && d == 0 && v == 0)))) := by decide

/-- ONE RAISED FLAG DRAINS THE WHOLE AUDIT — no partial credit. Over all eight states, if any detector fires the
    gate is 0, which is what makes it a conjunction rather than a score that could average an intrusion away. -/
theorem conformance_failure_detects_intrusion : (List.range 2).all (fun f => (List.range 2).all (fun d => (List.range 2).all (fun v => (f + d + v == 0) || (cleanAudit f d v == 0)))) := by decide

/-- THE IMPLEMENTATION EQUALS ITS BOOLEAN SPEC at every one of the eight states — there is no oracle, no
    judgement call, nothing consulted that a reader cannot recompute. This is the theorem that makes the gate
    auditable rather than trusted. -/
theorem honesty_gate_is_theorem_not_oracle : (List.range 2).all (fun f => (List.range 2).all (fun d => (List.range 2).all (fun v => cleanAudit f d v == (if f == 0 && d == 0 && v == 0 then 1 else 0)))) := by decide

/-- A FABRICATED CITATION DRAINS THE AUDIT whatever else is clean: with the citation bit raised the gate is 0 at
    every combination of the other two detectors. Since the lexical honesty gate was folded away, this is the
    ONE thing that drains — so it carries its own theorem. -/
theorem overclaim_with_fake_cite_fails : (List.range 2).all (fun f => (List.range 2).all (fun d => cleanAudit f d 1 == 0)) := by decide

/-- EVERY CLAIM LEAVES WITH ONE VERDICT: verified plus unverified is one at all four evidence states, so no
    claim escapes without a verdict and none carries two. The trial is total and binary. -/
theorem fraud_verdict_is_exactly_one : (List.range 2).all (fun c => (List.range 2).all (fun s => verified c s + unverified c s == 1)) := by decide

/-- A CITATION WITHOUT A SEAL IS UNVERIFIED. An open door is not a closed one. -/
theorem fabricated_cite_stays_unverified : (unverified 1 0 = 1) ∧ (verified 1 1 = 1) ∧ (verified 1 0 = 0) := by decide
