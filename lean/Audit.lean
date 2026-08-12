-- lean/Audit.lean — GENERATED. THE DETECTORS — the provenance audit's decision logic, proven. flag(h,d,b)=h·(1−d)·(1−b) over {0,1}³ (h=hollow superlative, d=demarcated, b=backed by a sealed theorem): it flags ONLY hollow prose, a demarcation clears it, a backing clears it, and of the eight states EXACTLY ONE fires — precise, never vacuous. The honesty detector, itself a skilled theorem. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def flag (h d b : Nat) : Nat := h * (1 - d) * (1 - b)

-- The provenance gate as a full truth table: flag(h,d,b)=h·(1−d)·(1−b) over the eight states (h=hollow, d=demarcated, b=backed) is 1 exactly at (hollow, ¬demarcated, ¬backed) and 0 everywhere else.
theorem flag_truth_table : ((List.range 8).map (fun n => flag (n%2) (n/2%2) (n/4%2))) = [0,1,0,0,0,0,0,0] := by decide

-- Soundness — the gate never flags honest prose: flag ≤ h, so a sentence with no hollow superlative (h=0) is NEVER flagged, whatever its demarcation or backing.
theorem flag_requires_hollow : (List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) <= n%2) := by decide

-- A demarcation clears the claim: whenever d=1 the flag is 0 (flag·d = 0) — "never infinity", "not quantum hardware", "simulation, not hardware" pass, as the honest use of the word should.
theorem demarcation_clears : (List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/2%2) == 0) := by decide

-- A sealed-theorem link clears the claim: whenever b=1 the flag is 0 (flag·b = 0) — prose that points at a proof earns its claim and passes.
theorem backing_clears : (List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/4%2) == 0) := by decide

-- The gate is precise, never vacuous: of the eight states EXACTLY ONE fires — it can (and does) flag, but only the hollow-and-uncleared case. A gate that never fires would prove nothing.
theorem exactly_one_flag : ((List.range 8).filter (fun n => flag (n%2) (n/2%2) (n/4%2) == 1)).length = 1 := by decide

-- The arithmetic detector equals its boolean specification: h·(1−d)·(1−b) = (hollow ∧ ¬demarcated ∧ ¬backed) at every state — the implementation IS the intent, proven.
theorem flag_matches_spec : (List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) == (if (n%2 == 1) && (n/2%2 == 0) && (n/4%2 == 0) then 1 else 0)) := by decide
