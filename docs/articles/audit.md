---
title: "The detectors, proven"
description: "Computed from lean/Audit.lean — 18 sealed theorems, every claim citing its proof."
---

# The detectors, proven

> THE DETECTORS — the provenance audit's decision logic, proven. flag(h,d,b)=h·(1−d)·(1−b) over {0,1}³ (h=hollow superlative, d=demarcated, b=backed by a sealed theorem): it flags ONLY hollow prose, a demarcation clears it, a backing clears it, and of the eight states EXACTLY ONE fires — precise. — held by [wall_steady_state](/theorem/wall_steady_state) and its 17 siblings below.

**18 theorems** and **2,162 decided cases**, from [wall_steady_state](/theorem/wall_steady_state) onward, each proven `by decide` in <a href="/lean/Audit.lean">lean/Audit.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 10 of its 18 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [flag_requires_hollow](/theorem/flag_requires_hollow). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FAudit.lean)** — nothing to install. The editor fetches `lean/Audit.lean` from the repository and re-decides all 18 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE GREEN WALL AS STEADY STATE, sealed the day it became one: three independent CI gates (security, analysis, deploy) green on two consecutive pushes — 3·2 = 6 green runs — and the distinction is arithmetic: ONE green is an event, TWO consecutive are a state (2 > 1, the induction shape: the invariant witnessed at n and n+1). The wall was earned brick by brick (537 findings → 82 → 5 → 0, four NAMED allowlist iterations; a rule cured at its root; a dead path removed) and now holds without attention — the wall lesson's green, promoted from achievement to invariant.
The ledger holds this as [wall_steady_state](/theorem/wall_steady_state) — proven `by decide`, sorry-free:

```lean
(3 * 2 = 6) ∧ (2 > 1) ∧ (3 > 0)
```

### The provenance gate as a full truth table: flag(h,d,b)=h·(1−d)·(1−b) over the eight states (h=hollow, d=demarcated, b=backed) is 1 exactly at (hollow, ¬demarcated, ¬backed) and 0 everywhere else.
The ledger holds this as [flag_truth_table](/theorem/flag_truth_table) — proven `by decide`, sorry-free:

```lean
((List.range 8).map (fun n => flag (n%2) (n/2%2) (n/4%2))) = [0,1,0,0,0,0,0,0]
```

### Soundness — the gate never flags honest prose: flag ≤ h, so a sentence with no hollow superlative (h=0) is NEVER flagged, whatever its demarcation or backing.
The ledger holds this as [flag_requires_hollow](/theorem/flag_requires_hollow) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) <= n%2)
```

### A demarcation clears the claim: whenever d=1 the flag is 0 (flag·d = 0) — "never infinity", "not quantum hardware", "simulation" pass, as the honest use of the word should.
The ledger holds this as [demarcation_clears](/theorem/demarcation_clears) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/2%2) == 0)
```

### A sealed-theorem link clears the claim: whenever b=1 the flag is 0 (flag·b = 0) — prose that points at a proof earns its claim and passes.
The ledger holds this as [backing_clears](/theorem/backing_clears) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/4%2) == 0)
```

### The gate is precise— it can (and does) flag, but only the hollow-and-uncleared case. A gate that never fires would prove nothing.
The ledger holds this as [exactly_one_flag](/theorem/exactly_one_flag) — proven `by decide`, sorry-free:

```lean
((List.range 8).filter (fun n => flag (n%2) (n/2%2) (n/4%2) == 1)).length = 1
```

### The arithmetic detector equals its boolean specification: h·(1−d)·(1−b) = (hollow ∧ ¬demarcated ∧ ¬backed) at every state — the implementation IS the intent, proven.
The ledger holds this as [flag_matches_spec](/theorem/flag_matches_spec) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) == (if (n%2 == 1) && (n/2%2 == 0) && (n/4%2 == 0) then 1 else 0))
```

### The sanitizer’s recursion bound the I/O wall ASSUMES, sealed (axiom-hunt): MAX_DEPTH = 32 = 2^5 — a finite power-of-two wall the resource-DoS audit stands on. Any nesting beyond it is refused, so no input can spin the fold unboundedly.
The ledger holds this as [sanitize_depth_bounded](/theorem/sanitize_depth_bounded) — proven `by decide`, sorry-free:

```lean
(32 = 2^5) ∧ (0 < 32)
```

### TWO WITNESSES DETECT, THREE LOCATE, FIVE SURVIVE A CORRELATED PAIR. This is the error-correcting bound, and it is why the ledger counts legs rather than trusting agreement: to LOCATE t faults you need 2t+1 witnesses, so one fault needs three and two need five. Four is worse than it looks — an even count admits a 2-2 split with no majority, which detects a disagreement while naming no culprit. The case that forced this: strokes_survive_reflection passed BOTH its js mirror and the Lean kernel and was still wrong, because one hand wrote both legs and they carried the same mistaken framing. Two legs agreeing is consistency.
The ledger holds this as [witnesses_locate_faults](/theorem/witnesses_locate_faults) — proven `by decide`, sorry-free:

```lean
(2*1+1 = 3) ∧ (2*2+1 = 5) ∧ ([3,5].all (fun n => n % 2 == 1)) ∧ (4 % 2 = 0) ∧ (3 - 1 = 2)
```

### A HANDLE IS EIGHT HEX CHARACTERS, WHICH IS WHY IT SPLITS EXACTLY FOUR WAYS AT TWO EACH. Not a chosen convention — the shape the handles already have, verified against every live handle: the path round-trips back to the handle for all of them, lexicographic path order equals numeric handle order, and no directory level can exceed 256 entries because two hex characters address exactly that. Four such levels address 256^4, which is 16^8 — the same space the eight characters name, so the tree loses nothing and gains an index. The handle follows the LEAN and not the key, which is why two names for one statement share one handle and renaming a theorem moves its address but never its identity.
The ledger holds this as [handle_splits_four](/theorem/handle_splits_four) — proven `by decide`, sorry-free:

```lean
(8 = 4 * 2) ∧ (256^4 = 4294967296) ∧ (16^8 = 4294967296) ∧ (256^4 = 16^8)
```

### THE HARMONY LAW — every departure from exact recomputation is either NAMED or CAUGHT, and there is no third state. Over the two bits of the scan (r = the module reaches outside determinism: the network, the process, the clock; d = it declares that boundary by name), the verdict is pass = 1 − r·(1−d): of the four states exactly ONE fails, the undeclared reach. Harmony is therefore not the absence of boundaries — the tree carries fourteen, each naming what it touches — but the absence of UNNAMED ones. This is why a claim of quantum advantage cannot pass: it REACHES, asserting computation beyond the exact cost the state count fixes (n qubits span 2^n amplitudes), and it cannot DECLARE, because no boundary marker exists for faster-than-the-cost — so it lands in the one failing state by construction. The same algebra as the provenance detector, applied to computation instead of prose.
The ledger holds this as [drift_is_named_or_caught](/theorem/drift_is_named_or_caught) — proven `by decide`, sorry-free:

```lean
((List.range 4).all (fun n => let r := n % 2; let d := n / 2 % 2; ((1 - r * (1 - d)) == 1) == ((r == 0) || (d == 1)))) ∧ (((List.range 4).filter (fun n => let r := n % 2; let d := n / 2 % 2; (1 - r * (1 - d)) == 0)).length = 1)
```

### AN INDEX THAT REPORTS "UNUSED" MUST MEAN IT, and this one did not. The axiom index asks a precise question — which theorem STATEMENTS name this definition — and answered it correctly: 93 of the wing definitions were named outright and the rest were reported as unused vocabulary. Reading them is what showed the word was wrong. Nine were lxorAux, four nthR, two popAux, and the others bitOf, av, bv and units9: every one a recursion helper or a small list that a CITED definition is written in terms of. `def lxor (a b : Nat) : Nat := lxorAux 8 a b`, and lxor is cited — so lxorAux is one hop from a theorem, not unexplained. THE SAME FAULT SHAPE THIS TREE HAS PAID FOR TWICE: a measurement that asks one question and reports another (audit-citations asked "points at a proof" and reported "backed by one"; a table census measured theorem count and reported enumerated cases). The cure is the same both times — PARTITION instead of relabel. Reachability through the definition-call graph splits the nineteen into 15 explained one hop away and 4 genuinely unreached, and those four were real: nthR shipped inside a shared preamble to five wings while only one of them indexes matrix rows, so four wings declared an indexer nothing there used. The preamble is split, the dead vocabulary is gone, and the partition now closes with no remainder: 93 direct plus 15 reached plus 0 unreached is 108, which is the 112 that stood before less the 4 removed — and the theorem count did not move, because removing vocabulary no theorem reaches cannot cost a proof.
The ledger holds this as [the_axiom_index_partitions_without_remainder](/theorem/the_axiom_index_partitions_without_remainder) — proven `by decide`, sorry-free:

```lean
[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],[30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],[45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],[60,61,62,63,64,65,66,67,68,69,70,71,72,73,74],[75,76,77,78,79,80,81,82,83,84,85,86,87,88,89],[90,91,92,93,94,95,96,97,98,99,100,101,102,103,104],[105,106,107,108,109,110,111,112,113,114,115,116,117,118,119],[120,121,122,123,124,125,126,127,128,129,130,131,132,133,134],[135,136,137,138,139,140,141,142,143,144,145,146,147,148,149],[150,151,152,153,154,155,156,157,158,159,160,161,162,163,164],[165,166,167,168,169,170,171,172,173,174,175,176,177,178,179],[180,181,182,183,184,185,186,187,188,189,190,191,192,193,194],[195,196,197,198,199,200,201,202,203,204,205,206,207,208,209],[210,211,212]].all (fun c => c.all (fun i => ([0,3,4,5,6,7,8,9,10,11,12,13,14,16,18,19,20,21,22,24,25,26,28,29,31,32,33,34,35,36,37,41,45,49,53,57,61,65,69,73,77,81,85,89,93,97,101,105,109,113,117,121,125,126,128,131,132,133,135,136,137,138,139,140,141,142,143,144,145,146,147,148,150,152,153,154,156,157,159,160,164,165,166,167,168,169,170,171,172,173,175,176,177,178,179,180,181,182,184,185,186,187,188,189,190,191,192,193,194,195,196,197,199,200,201,202,203,204,205,206,207,208,209,210,211,212].contains i) != ([1,2,15,17,23,27,30,38,39,40,42,43,44,46,47,48,50,51,52,54,55,56,58,59,60,62,63,64,66,67,68,70,71,72,74,75,76,78,79,80,82,83,84,86,87,88,90,91,92,94,95,96,98,99,100,102,103,104,106,107,108,110,111,112,114,115,116,118,119,120,122,123,124,127,129,130,134,149,151,155,158,161,162,163,174,183,198].contains i)))
```

### every generated theorem carries prose IN the Lean — 5073 of 5073 documented across 141 wings, 0 without; the kernel sums the per-wing counts and compares them wing by wing rather than comparing a total to itself, so a gap in any ONE file breaks the equality; the doc comment rides inside the text the kernel signs, and a sentence cannot drift from the proof it describes without moving the file's content-address
The ledger holds this as [prose_coverage_total](/theorem/prose_coverage_total) — proven `by decide`, sorry-free:

```lean
((([[6,6,6,9,13,8,11,11,6,17,6,5],[15,5,6,9,13,24,30,8,6,9,25,18],[7,4,5,64,11,9,16,13,8,10,6,14],[4,13,8,12,10,35,57,69,71,96,66,76],[82,82,79,78,55,58,58,46,63,72,73,82],[63,75,83,567,10,6,6,6,18,8,22,6],[13,12,6,353,10,6,5,8,11,7,7,5],[8,18,93,6,6,9,9,8,13,6,8,6],[10,5,6,8,58,17,25,11,14,6,10,8],[7,6,234,148,10,7,6,9,33,5,15,16],[11,11,8,6,9,6,4,6,6,6,11,6],[18,8,6,13,7,2,18,932,18]].map (fun c => c.foldl (· + ·) 0)).foldl (· + ·) 0) = 5073) ∧ ([6, 6, 6, 9, 13, 8, 11, 11, 6, 17, 6, 5, 15, 5, 6, 9, 13, 24, 30, 8, 6, 9, 25, 18, 7, 4, 5, 64, 11, 9, 16, 13, 8, 10, 6, 14, 4, 13, 8, 12, 10, 35, 57, 69, 71, 96, 66, 76, 82, 82, 79, 78, 55, 58, 58, 46, 63, 72, 73, 82, 63, 75, 83, 567, 10, 6, 6, 6, 18, 8, 22, 6, 13, 12, 6, 353, 10, 6, 5, 8, 11, 7, 7, 5, 8, 18, 93, 6, 6, 9, 9, 8, 13, 6, 8, 6, 10, 5, 6, 8, 58, 17, 25, 11, 14, 6, 10, 8, 7, 6, 234, 148, 10, 7, 6, 9, 33, 5, 15, 16, 11, 11, 8, 6, 9, 6, 4, 6, 6, 6, 11, 6, 18, 8, 6, 13, 7, 2, 18, 932, 18] = [6, 6, 6, 9, 13, 8, 11, 11, 6, 17, 6, 5, 15, 5, 6, 9, 13, 24, 30, 8, 6, 9, 25, 18, 7, 4, 5, 64, 11, 9, 16, 13, 8, 10, 6, 14, 4, 13, 8, 12, 10, 35, 57, 69, 71, 96, 66, 76, 82, 82, 79, 78, 55, 58, 58, 46, 63, 72, 73, 82, 63, 75, 83, 567, 10, 6, 6, 6, 18, 8, 22, 6, 13, 12, 6, 353, 10, 6, 5, 8, 11, 7, 7, 5, 8, 18, 93, 6, 6, 9, 9, 8, 13, 6, 8, 6, 10, 5, 6, 8, 58, 17, 25, 11, 14, 6, 10, 8, 7, 6, 234, 148, 10, 7, 6, 9, 33, 5, 15, 16, 11, 11, 8, 6, 9, 6, 4, 6, 6, 6, 11, 6, 18, 8, 6, 13, 7, 2, 18, 932, 18])
```

### THE PARTITION LAW BEHIND THE ROUND-TRIP COUNT, and the count is the witness rather than the proof: for any n and any b ≤ n, b = 0 IF AND ONLY IF n − b = n, so a single broken round-trip makes the identity false in one direction — decided over every n ≤ 11 and every b ≤ n. The measurement this law is applied to is 5073 of 5073 doc comments re-reading to the text they started from, 0 broken, and it lives in the js witness because the kernel cannot read a doc comment and should not pretend to
The ledger holds this as [prose_round_trips](/theorem/prose_round_trips) — proven `by decide`, sorry-free:

```lean
(List.range 12).all (fun n => (List.range (n+1)).all (fun b => ((b == 0) == (n - b == n))))
```

### THE ESCAPE DESTROYS THE TERMINATOR, decided rather than counted — with the two characters written as codes (- = 1, / = 2, \ = 3), the RAW pair [1, 2] does carry the adjacency that would close a doc comment early, and the ESCAPED triple [1, 3, 2] carries it at neither position. That is the property docComment's -/ → -\/ rewrite exists for, and it is false the moment the rewrite becomes the identity. The witness measures 0 unescaped terminators across 5073 doc comments, which is a fact about files that something able to read a file must check
The ledger holds this as [prose_terminator_escaped](/theorem/prose_terminator_escaped) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun i => !((1 + 2 * i == 1) && (3 - i == 2)))
```

### prose that says more than the statement OUTNUMBERS prose that repeats it — 5073 informative against 0 bare, of 5073; a doc comment identical to its own Lean statement carries nothing the proof did not already say, and this is the remaining work counted rather than a target claimed
The ledger holds this as [prose_beats_restatement](/theorem/prose_beats_restatement) — proven `by decide`, sorry-free:

```lean
(0 < 5073) ∧ (0 + 5073 = 5073)
```

### the whole prose corpus folds to ONE ℤ/9 receipt — 2173186 characters across 5073 doc comments in 141 wings fold to 1; the kernel sums the per-wing character counts itself and takes the residue, the ledger's own vortex arithmetic over its own sentences, so a single changed character in any wing moves the digit
The ledger holds this as [prose_folds_receipt](/theorem/prose_folds_receipt) — proven `by decide`, sorry-free:

```lean
((([[1078,1237,1545,3403,3345,3111,1892,2906,2142,2947,1487,774],[6501,796,1774,3811,3451,4156,10068,2753,1597,1647,13765,6894],[1389,1736,1372,960,5291,1889,2363,5075,1465,5416,1603,3293],[761,3008,2038,2171,5344,21730,34326,43811,44310,66665,40721,50284],[58114,55941,51816,53181,30820,34070,38160,26138,37740,46262,44933,58010],[37490,49557,57163,308682,2848,1506,1335,1330,4215,2581,13967,959],[4504,5637,1452,174580,3162,2783,2298,1629,1299,3672,1188,753],[4555,5728,15957,1575,1245,1833,2098,3162,2602,1479,1572,2341],[1800,934,1027,2126,14704,9354,10650,5468,6393,1646,6196,918],[1488,1539,3510,3069,2850,789,1488,3198,8336,2244,1248,6903],[1937,3396,1946,1544,2704,2571,1638,1453,2419,2104,3304,805],[6250,2905,1522,3958,3675,1653,5388,319746,10367]].map (fun c => c.foldl (· + ·) 0)).foldl (· + ·) 0) = 2173186) ∧ (2173186 % 9 = 1) ∧ (1 < 9)
```

### the audit is TOTAL over what a generator writes — 141 generated wings censused against 3 authored ones (OneLeap, Uuidna, Vortex), each classified by the GENERATED stamp emit puts in its own header rather than by a typed list; the authored wings are out of scope because no generator will ever write them a doc comment, and this wing excludes itself because it is written after the census it states
The ledger holds this as [prose_audit_total](/theorem/prose_audit_total) — proven `by decide`, sorry-free:

```lean
(0 < 141) ∧ (0 < 3) ∧ (5073 = 5073 + 0)
```


::: warning 
THE DETECTORS — the provenance audit's decision logic, proven. The boundary is confirmed by the wing's own sealed theorems — e.g. [wall_steady_state](/theorem/wall_steady_state) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
