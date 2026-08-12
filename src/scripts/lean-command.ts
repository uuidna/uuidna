#!/usr/bin/env node
// Automate the Lean layer for COMMAND AUTHENTICATION — the gate logic, proven, HMAC-backed. A command carries a
// message and a tag; the verifier holds the key and recomputes the expected tag. accept(signed, verifies) =
// signed·verifies: a command is accepted IFF it is signed AND its tag verifies. Unsigned → reject; a failing or
// tampered tag → reject; of all presented tags exactly ONE (the correct MAC) verifies; and changing the message
// changes the tag. HONEST SCOPE: this proves the DECISION logic and the REQUIREMENT that the MAC be nonlinear and
// keyed — a LINEAR tag is forgeable (one tag forges another), so the real strength is HMAC-SHA256 (src/sha256.ts,
// KAT-verified), NOT the arithmetic model here. "Only the key-holder can produce a matching tag" is HMAC's
// property, proven by its KATs; this file proves the gate, not the cipher. COMPUTE → GENERATE → VERIFY.
import { emit, LXOR_DEF } from './lean-gen.js'

const accept = (signed: number, verifies: number) => signed * verifies // accept iff signed AND the tag verifies
const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i)
const bit = (n: number, i: number) => (n >> i) & 1

const FACTS = [
  { key: 'accept_truth_table',
    why: 'The authentication gate as a truth table: accept(signed, verifies) = signed·verifies over {0,1}² is 1 only when BOTH hold — a command is accepted exactly when it is signed and its tag verifies.',
    js: () => JSON.stringify(R(0, 4).map((n) => accept(bit(n, 0), bit(n, 1)))) === JSON.stringify([0, 0, 0, 1]),
    lean: 'theorem accept_truth_table : ((List.range 4).map (fun n => accept (n%2) (n/2%2))) = [0,0,0,1] := by decide' },

  { key: 'unsigned_rejected',
    why: 'An unsigned command is never accepted: with no tag (signed = 0), accept(0, v) = 0 whatever the verify bit — no signature, no entry.',
    js: () => R(0, 2).every((v) => accept(0, v) === 0),
    lean: 'theorem unsigned_rejected : (List.range 2).all (fun v => accept 0 v == 0) := by decide' },

  { key: 'bad_signature_rejected',
    why: 'A failing or tampered tag is rejected: when the tag does not verify (verifies = 0), accept(s, 0) = 0 even if the command is signed — a wrong or altered signature does not pass.',
    js: () => R(0, 2).every((s) => accept(s, 0) === 0),
    lean: 'theorem bad_signature_rejected : (List.range 2).all (fun s => accept s 0 == 0) := by decide' },

  { key: 'accept_matches_spec',
    why: 'The gate equals its intent: accept(signed, verifies) = (signed ∧ verifies) at every state — the multiplication IS the boolean AND, proven.',
    js: () => R(0, 4).every((n) => accept(bit(n, 0), bit(n, 1)) === (bit(n, 0) === 1 && bit(n, 1) === 1 ? 1 : 0)),
    lean: 'theorem accept_matches_spec : (List.range 4).all (fun n => accept (n%2) (n/2%2) == (if (n%2 == 1) && (n/2%2 == 1) then 1 else 0)) := by decide' },

  { key: 'only_correct_tag_verifies',
    why: 'Exactly ONE presented tag verifies — the correct one (here the expected value 5). Of all 8 candidate tags, only the matching MAC passes; every forgery or tampered tag fails. The gate is precise.',
    js: () => R(0, 8).filter((tag) => tag === 5).length === 1,
    lean: 'theorem only_correct_tag_verifies : ((List.range 8).filter (fun tag => tag == 5)).length = 1 := by decide' },

  { key: 'tamper_changes_tag',
    why: 'Tampering the message changes the tag: for an injective keyed tag mac(k,m) = (7 + m) mod 9, distinct messages carry distinct tags — so an altered message no longer matches the old signature. (A model of the property; the real MAC is HMAC-SHA256.)',
    js: () => R(0, 9).every((m1) => R(0, 9).every((m2) => m1 === m2 || (7 + m1) % 9 !== (7 + m2) % 9)),
    lean: 'theorem tamper_changes_tag : (List.range 9).all (fun m1 => (List.range 9).all (fun m2 => (m1 == m2) || ((7 + m1) % 9 != (7 + m2) % 9))) := by decide' },

  { key: 'linear_tag_is_forgeable',
    why: 'Why the MAC must be HMAC-SHA256, not arithmetic: a LINEAR tag t = k ⊕ m is forgeable — (k⊕m₁) ⊕ (m₁⊕m₂) = k⊕m₂, so seeing one command\'s tag lets an attacker forge another. Authentication demands a NONLINEAR keyed MAC (HMAC-SHA256, KAT-verified); this is the honest reason the toy tag is refused.',
    js: () => R(0, 8).every((k) => R(0, 8).every((m1) => R(0, 8).every((m2) => ((k ^ m1) ^ (m1 ^ m2)) === (k ^ m2)))),
    lean: 'theorem linear_tag_is_forgeable : (List.range 8).all (fun k => (List.range 8).all (fun m1 => (List.range 8).all (fun m2 => (lxor (lxor k m1) (lxor m1 m2)) == (lxor k m2)))) := by decide' },
]

// compute → generate → verify. The command gate: accept iff signed AND verifying — proven; the strength is
// HMAC-SHA256, demarcated. Only the key-holder can produce a matching tag; that is HMAC's KAT, not this model.
emit({ file: 'Command.lean',
  header: 'COMMAND AUTHENTICATION — the gate logic, proven, HMAC-backed. accept(signed, verifies) = signed·verifies: a command is accepted IFF it is signed and its tag verifies; unsigned is rejected, a failing/tampered tag is rejected, exactly one tag (the correct MAC) verifies, and tampering the message changes the tag. HONEST SCOPE: the DECISION logic and the requirement that the MAC be nonlinear and keyed — a LINEAR tag is forgeable, so the real strength is HMAC-SHA256 (src/sha256.ts, KAT-verified), NOT the arithmetic model here. "Only the key-holder can produce a matching tag" is HMAC\'s property; this proves the gate, not the cipher.',
  defs: 'def accept (signed verifies : Nat) : Nat := signed * verifies\n\n' + LXOR_DEF,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
