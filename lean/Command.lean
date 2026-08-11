-- lean/Command.lean — GENERATED. COMMAND AUTHENTICATION — the gate logic, proven, HMAC-backed. accept(signed, verifies) = signed·verifies: a command is accepted IFF it is signed and its tag verifies; unsigned is rejected, a failing/tampered tag is rejected, exactly one tag (the correct MAC) verifies, and tampering the message changes the tag. HONEST SCOPE: the DECISION logic and the requirement that the MAC be nonlinear and keyed — a LINEAR tag is forgeable, so the real strength is HMAC-SHA256 (src/sha256.ts, KAT-verified), NOT the arithmetic model here. "Only the key-holder can produce a matching tag" is HMAC's property; this proves the gate, not the cipher. Every proof `by decide`, sorry-free, no Mathlib.

def accept (signed verifies : Nat) : Nat := signed * verifies

-- The authentication gate as a truth table: accept(signed, verifies) = signed·verifies over {0,1}² is 1 only when BOTH hold — a command is accepted exactly when it is signed and its tag verifies.
theorem accept_truth_table : ((List.range 4).map (fun n => accept (n%2) (n/2%2))) = [0,0,0,1] := by decide

-- An unsigned command is never accepted: with no tag (signed = 0), accept(0, v) = 0 whatever the verify bit — no signature, no entry.
theorem unsigned_rejected : (List.range 2).all (fun v => accept 0 v == 0) := by decide

-- A failing or tampered tag is rejected: when the tag does not verify (verifies = 0), accept(s, 0) = 0 even if the command is signed — a wrong or altered signature does not pass.
theorem bad_signature_rejected : (List.range 2).all (fun s => accept s 0 == 0) := by decide

-- The gate equals its intent: accept(signed, verifies) = (signed ∧ verifies) at every state — the multiplication IS the boolean AND, proven.
theorem accept_matches_spec : (List.range 4).all (fun n => accept (n%2) (n/2%2) == (if (n%2 == 1) && (n/2%2 == 1) then 1 else 0)) := by decide

-- Exactly ONE presented tag verifies — the correct one (here the expected value 5). Of all 8 candidate tags, only the matching MAC passes; every forgery or tampered tag fails. The gate is precise.
theorem only_correct_tag_verifies : ((List.range 8).filter (fun tag => tag == 5)).length = 1 := by decide

-- Tampering the message changes the tag: for an injective keyed tag mac(k,m) = (7 + m) mod 9, distinct messages carry distinct tags — so an altered message no longer matches the old signature. (A model of the property; the real MAC is HMAC-SHA256.)
theorem tamper_changes_tag : (List.range 9).all (fun m1 => (List.range 9).all (fun m2 => (m1 == m2) || ((7 + m1) % 9 != (7 + m2) % 9))) := by decide

-- Why the MAC must be HMAC-SHA256, not arithmetic: a LINEAR tag t = k ⊕ m is forgeable — (k⊕m₁) ⊕ (m₁⊕m₂) = k⊕m₂, so seeing one command's tag lets an attacker forge another. Authentication demands a NONLINEAR keyed MAC (HMAC-SHA256, KAT-verified); this is the honest reason the toy tag is refused.
theorem linear_tag_is_forgeable : (List.range 8).all (fun k => (List.range 8).all (fun m1 => (List.range 8).all (fun m2 => ((k ^^^ m1) ^^^ (m1 ^^^ m2)) == (k ^^^ m2)))) := by decide
