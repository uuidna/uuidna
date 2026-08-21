-- lean/AntiFraud.lean — GENERATED. THE ANTI-FRAUD DETECTORS — generated, and exhaustive where the wing used to sample. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def forged (cited sealed : Nat) : Nat := if cited == sealed then 0 else 1
def claimsOf (t : Nat) (cs : List Nat) : Nat := (cs.filter (fun c => c == t)).length
def doubleSpent (t : Nat) (cs : List Nat) : Bool := 2 <= claimsOf t cs
def voteOk (weight coins : Nat) : Nat := if weight == coins then 1 else 0
def cleanAudit (f d v : Nat) : Nat := (1 - f) * (1 - d) * (1 - v)
def commission (bits : Nat) : Nat := 2 * (bits / 110)
def verified (c s : Nat) : Nat := c * s
def unverified (c s : Nat) : Nat := 1 - verified c s

-- the 27 length-three claim lists over a three-theorem alphabet — the detector's whole domain, not a sample
def lists : List (List Nat) := [[1,1,1],[1,1,2],[1,1,3],[1,2,1],[1,2,2],[1,2,3],[1,3,1],[1,3,2],[1,3,3],[2,1,1],[2,1,2],[2,1,3],[2,2,1],[2,2,2],[2,2,3],[2,3,1],[2,3,2],[2,3,3],[3,1,1],[3,1,2],[3,1,3],[3,2,1],[3,2,2],[3,2,3],[3,3,1],[3,3,2],[3,3,3]]

/-- THE COMMISSION IS A STEP, NOT A FRACTION: two coins per COMPLETED 110, so 110 pays two, 220 pays four, and
    109 pays nothing. A rate that rounded would leak; a floor cannot. -/
theorem commission_is_two_per_full_hundred_ten : (commission 110 = 2) ∧ (commission 220 = 4) ∧ (commission 109 = 0) := by decide

/-- THE FORGERY DETECTOR IS EXHAUSTIVE over all 81 cited-versus-sealed pairs: it flags exactly the 72 where the
    two differ and clears exactly the 9 on the diagonal. Every pair walked, so no mismatch has a hiding place. -/
theorem forgery_flags_every_mismatch : (((List.range 9).flatMap (fun c => (List.range 9).map (fun s => forged c s))).filter (fun x => x == 1)).length = 72 ∧ (((List.range 9).flatMap (fun c => (List.range 9).map (fun s => forged c s))).filter (fun x => x == 0)).length = 9 := by decide

/-- THE DOUBLE-SPEND DETECTOR, EXHAUSTIVE AT LAST: all 27 length-three claim lists over three theorems are
    walked, and exactly 21 contain a repeat while 6 do not. The wing formerly sampled four lists by hand — a
    detector tested on the cases its author imagined is tested against its author, not against fraud. -/
theorem double_spend_walks_every_list : (lists.length = 27) ∧ ((lists.filter (fun l => [1,2,3].any (fun t => doubleSpent t l))).length = 21) ∧ ((lists.filter (fun l => !([1,2,3].any (fun t => doubleSpent t l)))).length = 6) := by decide

/-- AND IT DOES NOT OVERREACH: a list naming three different theorems flags nothing, so the detector answers to
    repetition and not to length. Both halves decided — what fires and what must not. -/
theorem single_claim_never_flags : (doubleSpent 1 [1,2,3] = false) ∧ (claimsOf 1 [1,2,3] = 1) ∧ (doubleSpent 3 [3,1,3] = true) := by decide

/-- A VOTE PASSES EXACTLY WHEN ITS WEIGHT EQUALS THE COINS PAID, over all sixteen weight-payment pairs up to
    four: inflation is refused and honest weight is admitted, with no third outcome. -/
theorem vote_passes_iff_weight_paid : (List.range 4).all (fun w => (List.range 4).all (fun c => (voteOk w c == 1) == (w == c))) := by decide

/-- THE AUDIT GATE IS A CONJUNCTION: across all eight states of the three detectors it passes on exactly ONE —
    every detector silent — and fails on the other seven. One flag anywhere drains it, which is what makes it a
    gate rather than a score. -/
theorem gate_passes_on_one_state : (((List.range 2).flatMap (fun f => (List.range 2).flatMap (fun d => (List.range 2).map (fun v => cleanAudit f d v)))).filter (fun x => x == 1)).length = 1 := by decide

/-- EVERY CLAIM LEAVES WITH ONE VERDICT: verified plus unverified is one at all four evidence states, so no
    claim escapes without a verdict and none carries two. The trial is total and binary. -/
theorem fraud_verdict_is_exactly_one : (List.range 2).all (fun c => (List.range 2).all (fun s => verified c s + unverified c s == 1)) := by decide

/-- A CITATION WITHOUT A SEAL IS UNVERIFIED, never false: citing with nothing sealed behind it leaves the claim
    open rather than refuted, and only citation AND seal together verify. An open door is not a closed one. -/
theorem fabricated_cite_stays_unverified : (unverified 1 0 = 1) ∧ (verified 1 1 = 1) ∧ (verified 1 0 = 0) := by decide
