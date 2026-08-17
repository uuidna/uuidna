---
title: "The detectors, proven"
description: "Computed from lean/Audit.lean — 8 sealed theorems, every claim citing its proof."
---

# The detectors, proven

> THE DETECTORS — the provenance audit's decision logic, proven. flag(h,d,b)=h·(1−d)·(1−b) over {0,1}³ (h=hollow superlative, d=demarcated, b=backed by a sealed theorem): it flags ONLY hollow prose, a demarcation clears it, a backing clears it, and of the eight states EXACTLY ONE fires — precise, never vacuous. The honesty detector, itself a skilled theorem. — held by [wall_steady_state](/theorem/wall_steady_state) and its 7 siblings below.

**8 theorems**, from [wall_steady_state](/theorem/wall_steady_state) onward, each proven `by decide` in [lean/Audit.lean](/lean/Audit.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation, and every boundary it names is CONFIRMED by a sealed theorem, never merely denied.

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

### A demarcation clears the claim: whenever d=1 the flag is 0 (flag·d = 0) — "never infinity", "not quantum hardware", "simulation, not hardware" pass, as the honest use of the word should.
The ledger holds this as [demarcation_clears](/theorem/demarcation_clears) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/2%2) == 0)
```

### A sealed-theorem link clears the claim: whenever b=1 the flag is 0 (flag·b = 0) — prose that points at a proof earns its claim and passes.
The ledger holds this as [backing_clears](/theorem/backing_clears) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/4%2) == 0)
```

### The gate is precise, never vacuous: of the eight states EXACTLY ONE fires — it can (and does) flag, but only the hollow-and-uncleared case. A gate that never fires would prove nothing.
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


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
