---
title: "The prose trial"
description: "Computed from lean/ProseTrial.lean — 6 sealed theorems, every claim citing its proof."
---

# The prose trial

> THE PROSE TRIAL — the derivation law decided by the KERNEL rather than by a string comparison. — held by [orbits_number_six](/theorem/orbits_number_six) and its 5 siblings below.

**6 theorems**, from [orbits_number_six](/theorem/orbits_number_six) onward, each proven `by decide` in [lean/ProseTrial.lean](/lean/ProseTrial.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [forged_order_refused](/theorem/forged_order_refused). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FProseTrial.lean)** — nothing to install. The editor fetches `lean/ProseTrial.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The ledger walks exactly six distinct orbits. Six, and the count is the whole vocabulary — a seventh would be a word nothing proves.
The ledger holds this as [orbits_number_six](/theorem/orbits_number_six) — proven `by decide`, sorry-free:

```lean
orbits.length = 6
```

### THE ORDER IS THE LENGTH. A walk's order — the period any motion derived from it must have — is exactly how many digits its orbit reaches, taken by the kernel rather than asserted: [10, 8, 3, 1, 6, 4].
The ledger holds this as [order_measures_orbit](/theorem/order_measures_orbit) — proven `by decide`, sorry-free:

```lean
orbits.map (fun o => o.length) = [10,8,3,1,6,4]
```

### A FORGED ORDER IS REFUSED, and the refusal is on this line. Move one order by one and the derived list no longer equals it — so a period a person chose can never pass as a period the walk actually reaches.
The ledger holds this as [forged_order_refused](/theorem/forged_order_refused) — proven `by decide`, sorry-free:

```lean
(orbits.map (fun o => o.length) = [10,8,3,1,6,4]) ∧ (orbits.map (fun o => o.length) ≠ [10,8,3,1,6,5])
```

### Every orbit is closed under the reflection dz(x) = 10 − x: the mirror of each member is already a member, so reflecting a finished walk adds no digit and the vocabulary cannot grow by looking at itself.
The ledger holds this as [orbits_reflect_onto_themselves](/theorem/orbits_reflect_onto_themselves) — proven `by decide`, sorry-free:

```lean
orbits.all (fun o => o.all (fun d => o.contains (dz d)))
```

### No two of the six are the same walk — the vocabulary has six words and not five wearing six names. Pairwise distinct, decided rather than assumed.
The ledger holds this as [orbits_are_distinct](/theorem/orbits_are_distinct) — proven `by decide`, sorry-free:

```lean
(orbits.map (fun o => o.length)).eraseDups.length = 6
```

### Zero is in every orbit: dz fixes it, so no walk can leave it behind. The one digit every handle in the ledger reaches, whatever it folds from.
The ledger holds this as [every_orbit_holds_zero](/theorem/every_orbit_holds_zero) — proven `by decide`, sorry-free:

```lean
orbits.all (fun o => o.contains 0)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
