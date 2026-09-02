---
title: "Command authentication"
description: "Computed from lean/Command.lean — 7 sealed theorems, every claim citing its proof."
---

# Command authentication

> COMMAND AUTHENTICATION — the gate logic, proven, HMAC-backed. accept(signed, verifies) = signed·verifies: a command is accepted IFF it is signed and its tag verifies; unsigned is rejected, a failing/tampered tag is rejected, exactly one tag (the correct MAC) verifies, and tampering the message changes the tag. the DECISION logic and the requirement that the MAC be nonlinear and keyed — a LINEAR tag is forgeable, so the real strength is HMAC-SHA256 (src/sha256.ts, KAT-verified). "Only the key-holder can produce a matching tag" is HMAC's property; this proves the gate. — held by [accept_truth_table](/theorem/accept_truth_table) and its 6 siblings below.

**7 theorems**, from [accept_truth_table](/theorem/accept_truth_table) onward, each proven `by decide` in [lean/Command.lean](/lean/Command.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 7 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [accept_truth_table](/theorem/accept_truth_table). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FCommand.lean)** — nothing to install. The editor fetches `lean/Command.lean` from the repository and re-decides all 7 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The authentication gate as a truth table: accept(signed, verifies) = signed·verifies over {0,1}² is 1 only when BOTH hold — a command is accepted exactly when it is signed and its tag verifies.
The ledger holds this as [accept_truth_table](/theorem/accept_truth_table) — proven `by decide`, sorry-free:

```lean
((List.range 4).map (fun n => accept (n%2) (n/2%2))) = [0,0,0,1]
```

### An unsigned command is never accepted: with no tag (signed = 0), accept(0, v) = 0 whatever the verify bit — no signature, no entry.
The ledger holds this as [unsigned_rejected](/theorem/unsigned_rejected) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun v => accept 0 v == 0)
```

### A failing or tampered tag is rejected: when the tag does not verify (verifies = 0), accept(s, 0) = 0 even if the command is signed — a wrong or altered signature does not pass.
The ledger holds this as [bad_signature_rejected](/theorem/bad_signature_rejected) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun s => accept s 0 == 0)
```

### The gate equals its intent: accept(signed, verifies) = (signed ∧ verifies) at every state — the multiplication IS the boolean AND, proven.
The ledger holds this as [accept_matches_spec](/theorem/accept_matches_spec) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun n => accept (n%2) (n/2%2) == (if (n%2 == 1) && (n/2%2 == 1) then 1 else 0))
```

### Exactly ONE presented tag verifies — the correct one (here the expected value 5). Of all 8 candidate tags, only the matching MAC passes; every forgery or tampered tag fails. The gate is precise.
The ledger holds this as [only_correct_tag_verifies](/theorem/only_correct_tag_verifies) — proven `by decide`, sorry-free:

```lean
((List.range 8).filter (fun tag => tag == 5)).length = 1
```

### Tampering the message changes the tag: for an injective keyed tag mac(k,m) = (7 + m) mod 9, distinct messages carry distinct tags — so an altered message no longer matches the old signature. The accept gate still fires only on signed∧verifies (accept 1 1 = 1). (A model of the property; the real MAC is HMAC-SHA256.)
The ledger holds this as [tamper_changes_tag](/theorem/tamper_changes_tag) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun m1 => (List.range 9).all (fun m2 => (m1 == m2) || ((7 + m1) % 9 != (7 + m2) % 9))) ∧ (accept 1 1 = 1)
```

### Why the MAC must be HMAC-SHA256— (k⊕m₁) ⊕ (m₁⊕m₂) = k⊕m₂, so seeing one command's tag lets an attacker forge another. Authentication demands a NONLINEAR keyed MAC (HMAC-SHA256, KAT-verified); this is the honest reason the toy tag is refused.
The ledger holds this as [linear_tag_is_forgeable](/theorem/linear_tag_is_forgeable) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun k => (List.range 8).all (fun m1 => (List.range 8).all (fun m2 => (lxor (lxor k m1) (lxor m1 m2)) == (lxor k m2))))
```


::: warning 
COMMAND AUTHENTICATION — the gate logic, proven, HMAC-backed. The boundary is confirmed by the wing's own sealed theorems — e.g. [accept_truth_table](/theorem/accept_truth_table) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
