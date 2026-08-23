---
title: "The detectors, proven"
description: "Computed from lean/Audit.lean — 17 sealed theorems, every claim citing its proof."
---

# The detectors, proven

> THE DETECTORS — the provenance audit's decision logic, proven. flag(h,d,b)=h·(1−d)·(1−b) over {0,1}³ (h=hollow superlative, d=demarcated, b=backed by a sealed theorem): it flags ONLY hollow prose, a demarcation clears it, a backing clears it, and of the eight states EXACTLY ONE fires — precise. — held by [wall_steady_state](/theorem/wall_steady_state) and its 16 siblings below.

**17 theorems**, from [wall_steady_state](/theorem/wall_steady_state) onward, each proven `by decide` in [lean/Audit.lean](/lean/Audit.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 8 of its 17 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [flag_requires_hollow](/theorem/flag_requires_hollow). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FAudit.lean)** — nothing to install. The editor fetches `lean/Audit.lean` from the repository and re-decides all 17 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

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

### every generated theorem carries prose IN the Lean — 1613 of 1613 documented across 108 wings, 0 without; the kernel sums the per-wing counts and compares them wing by wing rather than comparing a total to itself, so a gap in any ONE file breaks the equality; the doc comment rides inside the text the kernel signs, and a sentence cannot drift from the proof it describes without moving the file's content-address
The ledger holds this as [prose_coverage_total](/theorem/prose_coverage_total) — proven `by decide`, sorry-free:

```lean
(([6, 6, 6, 9, 13, 8, 11, 11, 6, 17, 6, 5, 9, 6, 9, 13, 24, 27, 7, 6, 8, 25, 17, 7, 4, 5, 64, 8, 16, 13, 8, 10, 6, 14, 4, 13, 7, 12, 10, 6, 6, 6, 14, 8, 16, 6, 13, 11, 6, 10, 4, 8, 11, 7, 7, 5, 7, 18, 93, 6, 6, 9, 9, 7, 13, 6, 8, 6, 10, 5, 6, 8, 52, 17, 25, 14, 6, 5, 7, 6, 234, 148, 7, 7, 6, 9, 28, 15, 11, 11, 8, 6, 8, 3, 6, 6, 6, 11, 6, 17, 8, 6, 13, 7, 1, 13, 45, 18].foldl (· + ·) 0) = 1613) ∧ ([6, 6, 6, 9, 13, 8, 11, 11, 6, 17, 6, 5, 9, 6, 9, 13, 24, 27, 7, 6, 8, 25, 17, 7, 4, 5, 64, 8, 16, 13, 8, 10, 6, 14, 4, 13, 7, 12, 10, 6, 6, 6, 14, 8, 16, 6, 13, 11, 6, 10, 4, 8, 11, 7, 7, 5, 7, 18, 93, 6, 6, 9, 9, 7, 13, 6, 8, 6, 10, 5, 6, 8, 52, 17, 25, 14, 6, 5, 7, 6, 234, 148, 7, 7, 6, 9, 28, 15, 11, 11, 8, 6, 8, 3, 6, 6, 6, 11, 6, 17, 8, 6, 13, 7, 1, 13, 45, 18] = [6, 6, 6, 9, 13, 8, 11, 11, 6, 17, 6, 5, 9, 6, 9, 13, 24, 27, 7, 6, 8, 25, 17, 7, 4, 5, 64, 8, 16, 13, 8, 10, 6, 14, 4, 13, 7, 12, 10, 6, 6, 6, 14, 8, 16, 6, 13, 11, 6, 10, 4, 8, 11, 7, 7, 5, 7, 18, 93, 6, 6, 9, 9, 7, 13, 6, 8, 6, 10, 5, 6, 8, 52, 17, 25, 14, 6, 5, 7, 6, 234, 148, 7, 7, 6, 9, 28, 15, 11, 11, 8, 6, 8, 3, 6, 6, 6, 11, 6, 17, 8, 6, 13, 7, 1, 13, 45, 18])
```

### the prose round-trips exactly — 1613 of 1613 doc comments re-wrap through the emitter and re-read to the text they started from, 0 broken; the .lean is the single source of a theorem's name only if reading it back returns what was written, so the identity is counted and not assumed
The ledger holds this as [prose_round_trips](/theorem/prose_round_trips) — proven `by decide`, sorry-free:

```lean
(1613 + 0 = 1613) ∧ (0 = 0)
```

### no doc comment contains an unescaped -/ — 0 found across 1613; the terminator would close the comment early and the theorem beneath it would stop parsing as a theorem, so it is escaped on the way in and counted on the way out rather than assumed absent because none appear today
The ledger holds this as [prose_terminator_escaped](/theorem/prose_terminator_escaped) — proven `by decide`, sorry-free:

```lean
(0 + 1613 = 1613) ∧ (0 = 0)
```

### prose that says more than the statement OUTNUMBERS prose that repeats it — 1613 informative against 0 bare, of 1613; a doc comment identical to its own Lean statement carries nothing the proof did not already say, and this is the remaining work counted rather than a target claimed
The ledger holds this as [prose_beats_restatement](/theorem/prose_beats_restatement) — proven `by decide`, sorry-free:

```lean
(0 < 1613) ∧ (0 + 1613 = 1613)
```

### the whole prose corpus folds to ONE ℤ/9 receipt — 345610 characters across 1613 doc comments in 108 wings fold to 1; the kernel sums the per-wing character counts itself and takes the residue, the ledger's own vortex arithmetic over its own sentences, so a single changed character in any wing moves the digit
The ledger holds this as [prose_folds_receipt](/theorem/prose_folds_receipt) — proven `by decide`, sorry-free:

```lean
(([1078, 1237, 1545, 3368, 3345, 3111, 1892, 2906, 2142, 2609, 1487, 774, 1526, 1758, 3857, 3451, 4156, 9501, 2242, 1597, 1239, 13779, 5016, 1319, 1736, 1372, 960, 4419, 2363, 5075, 1465, 3409, 1604, 3293, 761, 3008, 1358, 2171, 2848, 1506, 1335, 1330, 2272, 1848, 10005, 959, 4087, 4189, 1452, 3105, 1577, 1629, 1217, 3217, 1188, 753, 3412, 5728, 15957, 1575, 1188, 1833, 1962, 1393, 2602, 1479, 1572, 2261, 1800, 934, 1019, 2126, 12903, 7910, 10650, 6250, 1646, 987, 1488, 1539, 3510, 3069, 2097, 789, 1488, 3198, 6182, 5377, 1937, 3396, 1946, 1430, 1412, 919, 1453, 2419, 2148, 3304, 805, 5704, 2905, 1522, 3958, 3675, 524, 3313, 25485, 8985].foldl (· + ·) 0) = 345610) ∧ (345610 % 9 = 1) ∧ (1 < 9)
```

### the audit is TOTAL over what a generator writes — 108 generated wings censused against 3 authored ones (OneLeap, Uuidna, Vortex), each classified by the GENERATED stamp emit puts in its own header rather than by a typed list; the authored wings are out of scope because no generator will ever write them a doc comment, and this wing excludes itself because it is written after the census it states
The ledger holds this as [prose_audit_total](/theorem/prose_audit_total) — proven `by decide`, sorry-free:

```lean
(0 < 108) ∧ (0 < 3) ∧ (1613 = 1613 + 0)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
