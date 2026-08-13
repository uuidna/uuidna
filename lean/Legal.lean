-- lean/Legal.lean — GENERATED. The LEGAL VOCABULARY of the trial as decidable theorems — PROVEN (admitted), REFUTED (recomputably wrong), NOT PROVEN (dismissed without prejudice), REMAND (to development trial). Only the proven stays; the non-justiciable is never refuted Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- the legal verdict over the record: t = a decidable test exists (justiciable), h = it holds, c = cites a sealed authority
def lp (t h c : Nat) : Nat := t*h + c - t*h*c            -- PROVEN: (test holds) OR (cites a sealed authority)
def lr (t h c : Nat) : Nat := t * (1 - h) * (1 - c)      -- REFUTED: a test EXISTS and FAILS, uncited (recomputable contradiction)
def lrem (t h c : Nat) : Nat := 1 - lp t h c             -- REMAND: not admitted → development trial (recycled, not discarded)
def lnp (t h c : Nat) : Nat := (1 - lp t h c) * (1 - lr t h c)  -- NOT PROVEN: neither (non-justiciable / unbacked)

-- the trial returns EXACTLY ONE verdict per record — PROVEN, REFUTED or NOT PROVEN partition the eight records (their indicators sum to 1)
theorem legal_verdict_is_exactly_one : (List.range 8).all (fun n => let t := n%2; let h := n/2%2; let c := n/4%2; lp t h c + lr t h c + lnp t h c == 1) := by decide

-- only the PROVEN is ADMITTED — a claim is admitted exactly when a decidable test holds OR it cites a sealed authority; nothing else stays
theorem legal_only_the_proven_is_admitted : (List.range 8).all (fun n => let t := n%2; let h := n/2%2; let c := n/4%2; (lp t h c == 1) == ((c == 1) || (t == 1 && h == 1))) := by decide

-- the court may not refute the NON-JUSTICIABLE — with no decidable test (t=0) the verdict is NEVER REFUTED (it is PROVEN if cited, else NOT PROVEN); you cannot refute what you cannot decide
theorem legal_non_justiciable_is_never_refuted : (List.range 2).all (fun h => (List.range 2).all (fun c => lr 0 h c == 0)) := by decide

-- REFUTED is precise: it holds exactly when a decidable test EXISTS and FAILS and no sealed authority is cited (t=1 ∧ h=0 ∧ c=0) — a recomputable contradiction, never otherwise
theorem legal_refuted_iff_test_fails_uncited : (List.range 8).all (fun n => let t := n%2; let h := n/2%2; let c := n/4%2; (lr t h c == 1) == (t == 1 && h == 0 && c == 0)) := by decide

-- nothing is discarded: every record is either ADMITTED (PROVEN) or REMANDED, and REMAND is exactly REFUTED plus NOT PROVEN — both routed to development trial, never deleted
theorem legal_remand_is_total_nothing_discarded : (List.range 8).all (fun n => let t := n%2; let h := n/2%2; let c := n/4%2; (lp t h c + lrem t h c == 1) && (lrem t h c == lr t h c + lnp t h c)) := by decide

-- the captain theorem sealed INTO the trial: of every contribution k, the ONLY one that computes the conserved save (2·32 = 64) is the TWO coins — the computing contributions are exactly [2]. So a claim computes at trial iff it contributes the two coins (a sealed proof); every other contribution is remanded, uncomputed. The coin form of legal_only_the_proven_is_admitted, and the contrapositive of captain_computes_only_with_two_coins: only those that did not contribute the coins did not compute
theorem trial_computes_only_with_two_coins : (List.range 8).filter (fun k => 32 * k == 64) = [2] := by decide
