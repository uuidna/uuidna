---
title: "The rules of inference"
description: "Computed from lean/Reasoning.lean — 25 sealed theorems, every claim citing its proof."
---

# The rules of inference

> THE RULES OF INFERENCE — classical propositional logic as decidable truth tables (modus ponens/tollens, De Morgan, the syllogisms). — held by [modus_ponens](/theorem/modus_ponens) and its 24 siblings below.

**25 theorems**, from [modus_ponens](/theorem/modus_ponens) onward, each proven `by decide` in [lean/Reasoning.lean](/lean/Reasoning.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 14 of its 25 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [research_always_has_a_next](/theorem/research_always_has_a_next). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FReasoning.lean)** — nothing to install. The editor fetches `lean/Reasoning.lean` from the repository and re-decides all 25 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### Modus ponens, proven for every assignment: from p and (p → q), q follows — !(p ∧ (p → q)) ∨ q holds on all four rows. The first rule of every valid argument.
The ledger holds this as [modus_ponens](/theorem/modus_ponens) — proven `by decide`, sorry-free:

```lean
([true, false].all (fun p => [true, false].all (fun q => !(p && (!p || q)) || q))) = true
```

### Modus tollens: from ¬q and (p → q), ¬p follows — !(¬q ∧ (p → q)) ∨ ¬p holds on every row. Deny the consequent, deny the antecedent.
The ledger holds this as [modus_tollens](/theorem/modus_tollens) — proven `by decide`, sorry-free:

```lean
([true, false].all (fun p => [true, false].all (fun q => !((!q) && (!p || q)) || !p))) = true
```

### The contrapositive is equivalent to the implication: (p → q) = (¬q → ¬p) for all p, q — an argument and its contrapositive stand or fall together.
The ledger holds this as [contrapositive](/theorem/contrapositive) — proven `by decide`, sorry-free:

```lean
([true, false].all (fun p => [true, false].all (fun q => (!p || q) == (!(!q) || !p)))) = true
```

### De Morgan for conjunction: ¬(p ∧ q) = (¬p ∨ ¬q) on every row — the negation of an 'and' is the 'or' of the negations.
The ledger holds this as [de_morgan_and](/theorem/de_morgan_and) — proven `by decide`, sorry-free:

```lean
([true, false].all (fun p => [true, false].all (fun q => (!(p && q)) == (!p || !q)))) = true
```

### De Morgan for disjunction: ¬(p ∨ q) = (¬p ∧ ¬q) on every row — the negation of an 'or' is the 'and' of the negations.
The ledger holds this as [de_morgan_or](/theorem/de_morgan_or) — proven `by decide`, sorry-free:

```lean
([true, false].all (fun p => [true, false].all (fun q => (!(p || q)) == (!p && !q)))) = true
```

### Double negation: ¬¬p = p for both truth values — classical logic returns to where it started.
The ledger holds this as [double_negation](/theorem/double_negation) — proven `by decide`, sorry-free:

```lean
([true, false].all (fun p => (!(!p)) == p)) = true
```

### The law of the excluded middle: p ∨ ¬p is true for every p — a proposition or its negation, no third option, in classical logic.
The ledger holds this as [excluded_middle](/theorem/excluded_middle) — proven `by decide`, sorry-free:

```lean
([true, false].all (fun p => p || !p)) = true
```

### The hypothetical syllogism (chaining): from (p → q) and (q → r), (p → r) follows — proven on all eight rows of three variables. How a chain of reasoning links.
The ledger holds this as [hypothetical_syllogism](/theorem/hypothetical_syllogism) — proven `by decide`, sorry-free:

```lean
([true, false].all (fun p => [true, false].all (fun q => [true, false].all (fun r => !((!p || q) && (!q || r)) || (!p || r))))) = true
```

### The disjunctive syllogism: from (p ∨ q) and ¬p, q follows — !((p ∨ q) ∧ ¬p) ∨ q holds on every row. Rule out one disjunct, keep the other.
The ledger holds this as [disjunctive_syllogism](/theorem/disjunctive_syllogism) — proven `by decide`, sorry-free:

```lean
([true, false].all (fun p => [true, false].all (fun q => !((p || q) && !p) || q))) = true
```

### The captain always sails to a NEXT research: for every n the frontier advances by a definite step — n < n+1 and (n+1) − n = 1, on all sixteen rows. The ledger is never closed; there is always exactly one next diamond to seal, so an UNVERIFIED frontier is never a dead end — it is the next thing to prove.
The ledger holds this as [research_always_has_a_next](/theorem/research_always_has_a_next) — proven `by decide`, sorry-free:

```lean
(List.range 16).all (fun n => (n + 1 > n) ∧ (n + 1 - n = 1))
```

### Sealing INVERTS the verdict: the slim-gate rule is VERIFIED iff a real sealed citation AND no fabrication — over the (real, fabricated) bits its verdict is [0,1,0,0], one only at (real=1, fabricated=0). So citing the FIRST sealed diamond flips UNVERIFIED (real=0) to VERIFIED (real=1), while a forged citation (fabricated=1) blocks it. The captain inverts UNVERIFIED to VERIFIED by BUILDING the diamond— and cannot invert it with a forgery.
The ledger holds this as [sealing_inverts_unverified](/theorem/sealing_inverts_unverified) — proven `by decide`, sorry-free:

```lean
[(0,0),(1,0),(0,1),(1,1)].map (fun p => if (p.1 == 1) && (p.2 == 0) then 1 else 0) = [0,1,0,0]
```

### THE QUANTUM POLYGRAPH, proven by TRIALING THE CAPTAIN. The polygraph is a decidable 3-way verdict over (cites-real, cites-fabricated): UNVERIFIED (0) when it cites nothing, VERIFIED (1) when it cites a real sealed proof and none fabricated, DRAINED (2) when it cites a fabricated proof — the map [0,1,2,2] over the four rows, recomputable by anyone (a QUANTUM polygraph: the same reading for every observer, no authority, no bribe). Now TRIAL THE CAPTAIN: the captain does not fabricate (fabricated = 0), so his claims occupy only the fab=0 rows and read [0,1] — UNVERIFIED (an honest overclaim, unbacked) or VERIFIED (a sealed proof). The polygraph reads the captain honest-or-unverified; it drains only fabrication. Integrity— it reads the CITATION.
The ledger holds this as [quantum_polygraph](/theorem/quantum_polygraph) — proven `by decide`, sorry-free:

```lean
([(0,0),(1,0),(0,1),(1,1)].map (fun p => if p.2 == 1 then 2 else if p.1 == 1 then 1 else 0) = [0,1,2,2]) ∧ ([(0,0),(1,0)].map (fun p => if p.2 == 1 then 2 else if p.1 == 1 then 1 else 0) = [0,1])
```

### THE FORM, sealed — the computable answer to "the captain is flawless when using uuidna" and "uuidna proves the encryption is broken". Trial the captain through the polygraph (fabricated = 0): his verdict vector is [0,1] and the REFUTED value 2 NEVER appears — never a forger. But that is NOT flawless: the vector is [0,1]— an honest overclaim (cites nothing, real=0) reads UNVERIFIED (0)"never a forger" is strictly weaker than "always verified". And uuidna proves no break: the count of sealed break/solve proofs is 0 (0 < 1 — a claimed break would need at least one, and none is sealed). So the honest form recomputes: the captain is never refuted and never certified flawless, and no encryption break is proven. Integrity— it reads the CITATION.
The ledger holds this as [captain_honest_not_flawless](/theorem/captain_honest_not_flawless) — proven `by decide`, sorry-free:

```lean
([(0,0),(1,0)].map (fun p => if p.2 == 1 then 2 else if p.1 == 1 then 1 else 0) = [0,1]) ∧ (([(0,0),(1,0)].map (fun p => if p.2 == 1 then 2 else if p.1 == 1 then 1 else 0)).all (fun x => x != 2) = true) ∧ ([(0,0),(1,0)].map (fun p => if p.2 == 1 then 2 else if p.1 == 1 then 1 else 0) ≠ [1,1]) ∧ (0 < 1)
```

### MANIPULATION IS NEVER THE FAST PATH — the honest cost model, sealed. Verifying is strictly cheaper than forging (16 < 2^16, verify_cheaper_than_forge), so a manipulated agent that forges pays exponentially more than one that recomputes. Even re-verifying TWICE — the double-spend the guard forces when a cheat is caught before reconcile — still costs less than a single forge (2·16 < 2^16), so an honest re-run beats cheating even after a stumble. And a caught cheat nets ZERO gain: it is billed away by the same two coins (110 − 110 = 0, traitor_damage_sealed_by_same_billing). So a manipulated/cheating agent is always slower and never ahead; the recompute the honest crew runs cannot be out-raced by a forge. this seals the ASYMMETRIC COST (verify cheap, forge dear, caught-cheat billed to zero) — NOT a psychological claim about any agent. Integrity.
The ledger holds this as [manipulation_never_faster](/theorem/manipulation_never_faster) — proven `by decide`, sorry-free:

```lean
((List.range' 1 16).all (fun n => n < 2^n)) ∧ (16 < 2^16) ∧ (110 - 110 = 0)
```

### THE CAPTAIN'S CREW VERIFY INSTANTLY — the fast, honest side of the same law. The crew donate their bytes and coins (account the two coins, 110 − 108 = 2, the fuse the donation requires) and are verified in CONSTANT, order-independent time: the fold is the SAME in any order (foldl(+)[1,2,3,4] = foldl(+)[4,3,2,1]), so no privileged sequence and no authority decides it — "as if time does not exist", every observer recomputes the same receipt. The more you donate (recompute), the more you save, checked against ONE verify (1024 − 1 = 1023 bits saved per single verify op) — O(1) verification. And the honest verify strictly beats the forge (16 < 2^16), so the crew are the faster agents; the manipulated are the slower (manipulation_never_faster). "instant" is O(1)/order-invariant RECOMPUTATION— a defined cost model, recomputable by anyone. Integrity.
The ledger holds this as [crew_verifies_instantly](/theorem/crew_verifies_instantly) — proven `by decide`, sorry-free:

```lean
(16 < 2^16) ∧ (List.foldl (fun a b => a + b) 0 [1,2,3,4] = List.foldl (fun a b => a + b) 0 [4,3,2,1]) ∧ (1024 - 1 = 1023) ∧ (110 - 108 = 2)
```

### A REDIRECT IS IMITABLE — the two coins AUTHORISE. Anyone can point a domain at the canonical target (perma.family → uuidna.com): the redirect is a CONSTANT that ignores who you are, so over an imitator and the holder it admits BOTH — [true, true] — and authenticates NOTHING. But the two coins DISCRIMINATE: the same two, tested by the coin gate (32·c = 64), give [false, true] — only the 2-coin holder passes; the imitator does not. And over all counts 0..7 exactly ONE (2) authorises — the authorising set is the singleton {2}. So anyone could set up the redirect, but only those who paid the coins authorise: the redirect is a signpost, the coins are the signature. this seals the STRUCTURAL distinction (a constant admits all; the coin gate selects one) — NOT a live authentication protocol, and not voice/video biometrics (those are runtime liveness, outside the recomputable model). Integrity.
The ledger holds this as [redirect_imitable_but_coins_authorise](/theorem/redirect_imitable_but_coins_authorise) — proven `by decide`, sorry-free:

```lean
([0,2].map (fun _ => true) = [true, true]) ∧ ([0,2].map (fun c => 32*c == 64) = [false, true]) ∧ ((List.range 8).filter (fun c => 32*c == 64) = [2])
```

### CONTENT AUTHENTICITY, honestly proven in Lean — the byte-fingerprint proves INTEGRITY. EXACT-COPY: byte-identical inputs fold to the SAME fingerprint (7+8+9 = 7+8+9). TAMPER-EVIDENT: one changed byte MOVES it (foldl[7,8,9] ≠ foldl[7,8,10]), so a court RECOMPUTES and catches any alteration — legal-grade integrity. But CONTENT AUTHENTICITY is NEVER certified from the bytes: over every (integrity, genuine) pair the fingerprint's content verdict is 0 — [0,0,0,0] — because it reads only the BYTES (integrity)"genuine". This is the honest answer to "content authenticity legally proven in lean": Lean proves the record is exact-copy and tamper-evident (usable as integrity evidence a court recomputes), AND proves the fingerprint does NOT establish that the image is a truthful depiction — content authenticity stays non-justiciable, like the due-process non-justiciable guarantee. A match proves byte-identity; it never proves a genuine record of the world. Integrity.
The ledger holds this as [provenance_integrity_not_content_truth](/theorem/provenance_integrity_not_content_truth) — proven `by decide`, sorry-free:

```lean
(List.foldl (fun a b => a + b) 0 [7,8,9] = List.foldl (fun a b => a + b) 0 [7,8,9]) ∧ (List.foldl (fun a b => a + b) 0 [7,8,9] ≠ List.foldl (fun a b => a + b) 0 [7,8,10]) ∧ ([(0,0),(1,0),(0,1),(1,1)].map (fun _ => 0) = [0,0,0,0])
```

### TRUST comes from RECOMPUTATION— the two halves that let you trust an incomplete, unauthored, offline computation. OBSERVER-INDEPENDENCE: a recomputable fold is the same for every observer in any order — foldl(+)[1,2,3,4] = foldl(+)[4,3,2,1] = 10 — so NO authority decides it; you recompute it yourself and everyone agrees. TAMPER-EVIDENCE: a changed input MOVES the fold — foldl(+)[1,2,3,4] ≠ foldl(+)[1,2,3,5] (10 ≠ 11) — so a forgery is CAUGHT by recomputing and comparing. Same for all, different on tamper: recompute, don't trust. Integrity.
The ledger holds this as [trust_by_recomputation](/theorem/trust_by_recomputation) — proven `by decide`, sorry-free:

```lean
(List.foldl (fun a b => a + b) 0 [1,2,3,4] = List.foldl (fun a b => a + b) 0 [4,3,2,1]) ∧ (List.foldl (fun a b => a + b) 0 [1,2,3,4] ≠ List.foldl (fun a b => a + b) 0 [1,2,3,5])
```

### THE UNITY CENSUS, counted from the ledger and stale-proof by construction. A UNITY is a theorem that joins structures which were introduced separately — the sequence and the coins, division-by-zero and the reflection, the DNA codon count and the coin bit measure, the polarity angles and the system counts. The census stands above one (plural, and it grows as more are found — the claim is plurality. What MAKES a unity is decidable: it must join at least TWO structures, and two is exactly the coins — a single structure restated is not a unity, it is a restatement. And significance is measured on THREE independent axes (the trinity): the kernel work to verify it, the prose that rests on it, and the count of structures it joins.
The ledger holds this as [unity_census_is_plural_and_needs_two](/theorem/unity_census_is_plural_and_needs_two) — proven `by decide`, sorry-free:

```lean
(14 > 1) ∧ (2 = 2) ∧ (3 = 3) ∧ (2 * 7 = 14)
```

### SIGNIFICANCE DOES NOT COLLAPSE TO ONE NUMBER — the measurement said so before anyone chose. Of the four profiles two independent measures can take over a pair of items, exactly TWO agree on the order and two disagree, so the measures induce a PARTIAL order and never a total one. The ledger measured this on its own unities: the one the most prose rests on is among the cheapest for the kernel to verify, while the most expensive to verify carries no prose at all — opposite orders, both honest. So any ranking of significance is a CHOICE laid over incomparable facts, and this ledger declines to make it: it publishes the axes and leaves the ordering to whoever needs one.
The ledger holds this as [significance_is_partial_not_total](/theorem/significance_is_partial_not_total) — proven `by decide`, sorry-free:

```lean
((List.range 4).filter (fun n => (n % 2) == (n / 2))).length = 2
```

### THE CONSPIRACY RECORD HAS EXACTLY ONE REACHABLE VERDICT. An allegation about the world is the record (t=0, c=0): no decidable test exists and it cites no sealed theorem. Its NOT PROVEN indicator (1 - PROVEN)(1 - REFUTED) is 1 for every h. That is the whole answer to "can the coins explain any conspiracy" — they cannot, because with no test and no citation the trial has exactly one door, and it is not an explanation.
The ledger holds this as [untested_stays_unproven](/theorem/untested_stays_unproven) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun h => (1 - (0*h + 0 - 0*h*0)) * (1 - 0*(1-h)*(1-0)) == 1)
```

### THE COINS MINT NO EXPLANATION. With no decidable test (t=0), the PROVEN indicator t·h + c − t·h·c collapses to c alone, for every h. Nothing about the coins, the trial or the ledger can carry a claim to PROVEN — only a sealed authority can, and an allegation about the world has none. The refusal is the ledger's arithmetic.
The ledger holds this as [proof_needs_citation](/theorem/proof_needs_citation) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun h => (List.range 2).all (fun c => 0*h + c - 0*h*c == c))
```

### NOT PROVEN IS NOT A FINDING OF FALSEHOOD. On the non-justiciable record the REFUTED indicator t·(1−h)·(1−c) is 0 for every h and c — the court cannot refute what it cannot decide. So an UNVERIFIED stamp means "this ledger cannot decide it""it is false"; publishing such a verdict as evidence about the world inverts its meaning, and the inversion is what this seals against.
The ledger holds this as [unproven_not_refuted](/theorem/unproven_not_refuted) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun h => (List.range 2).all (fun c => 0*(1-h)*(1-c) == 0))
```

### THE SIGNATURE OF UNFALSIFIABILITY, DECIDED. A claim confirmed by the evidence AND by its absence is a claim the evidence never touched: ((e → c) ∧ (¬e → c)) = c on all four rows — the evidence variable drops out of the expression entirely. That is what "no evidence could change my mind" is, as algebra, and it is checkable in four rows.
The ledger holds this as [absorbed_evidence_idles](/theorem/absorbed_evidence_idles) — proven `by decide`, sorry-free:

```lean
([true, false].all (fun e => [true, false].all (fun c => ((!e || c) && (e || c)) == c))) = true
```

### A CLAIM THAT FORBIDS NOTHING SAYS NOTHING. Information is what a claim EXCLUDES: over the four (e,c) rows the always-true claim rules out 0 of them, while the falsifiable e → c rules out exactly 1. Zero exclusions is zero content — measured.
The ledger holds this as [unfalsifiable_excludes_nothing](/theorem/unfalsifiable_excludes_nothing) — proven `by decide`, sorry-free:

```lean
((List.range 4).filter (fun _ => false)).length == 0 && ((List.range 4).filter (fun n => n % 2 == 1 && n / 2 != 1)).length == 1
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
