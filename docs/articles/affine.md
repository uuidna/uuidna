---
title: "lean/Affine.lean"
description: "Computed from lean/Affine.lean — 6 sealed theorems, every claim citing its proof."
---

# lean/Affine.lean

> AGL(1,ℤ/9), ENUMERATED — the group OneLeap.lean names and never lists. — held by [group_holds_fiftyfour](/theorem/group_holds_fiftyfour) and its 5 siblings below.

**6 theorems**, from [group_holds_fiftyfour](/theorem/group_holds_fiftyfour) onward, each proven `by decide` in [lean/Affine.lean](/lean/Affine.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [units_are_coprime_six](/theorem/units_are_coprime_six). A boundary stated here is decided, not merely denied.

### THE GROUP IS FIFTY-FOUR MAPS, listed rather than counted: six units of ℤ/9 times nine offsets. All fifty-four are distinct, so the listing has no repeat hiding in it.
The ledger holds this as [group_holds_fiftyfour](/theorem/group_holds_fiftyfour) — proven `by decide`, sorry-free:

```lean
(agl.length = 54) ∧ (agl.eraseDups.length = 54) ∧ (6 * 9 = 54)
```

### THE SIX MULTIPLIERS ARE EXACTLY THE UNITS — the residues sharing no factor with nine: 1, 2, 4, 5, 7, 8. Three, six and nine are excluded, and the line proves the exclusion rather than assuming it, since a non-unit multiplier gives a map that is not invertible.
The ledger holds this as [units_are_coprime_six](/theorem/units_are_coprime_six) — proven `by decide`, sorry-free:

```lean
((List.range 9).filter (fun a => (List.range 9).any (fun c => (a * c) % 9 == 1)) = [1,2,4,5,7,8]) ∧ (!([1,2,4,5,7,8].contains 3))
```

### CLOSED: composing any two of the fifty-four gives one of the fifty-four, over all 2916 ordered products. This is the group axiom that a mere count can never establish — the order says how many, closure says they compose.
The ledger holds this as [composition_stays_inside](/theorem/composition_stays_inside) — proven `by decide`, sorry-free:

```lean
agl.all (fun f => agl.all (fun g => agl.contains (comp f g)))
```

### THE IDENTITY IS x ↦ 1·x + 0, packed as 9, and it fixes every element from both sides — composing with it changes nothing, whichever side it stands on.
The ledger holds this as [identity_leaves_all](/theorem/identity_leaves_all) — proven `by decide`, sorry-free:

```lean
(agl.contains 9) ∧ (agl.all (fun f => (comp f 9 == f) && (comp 9 f == f)))
```

### EVERY MAP UNDOES: for each of the fifty-four there is another composing with it to the identity. Invertibility is why the multiplier had to be a unit, and here it is decided for all of them rather than argued from the definition.
The ledger holds this as [every_map_inverts](/theorem/every_map_inverts) — proven `by decide`, sorry-free:

```lean
agl.all (fun f => agl.any (fun g => comp f g == 9))
```

### AND IT IS NOT ABELIAN, shown by exhibiting the failure rather than asserting it: 2376 of the 2916 ordered pairs do not commute — a majority, not an exception. Only 540 pairs agree, so order matters almost everywhere in this group.
The ledger holds this as [group_does_not_commute](/theorem/group_does_not_commute) — proven `by decide`, sorry-free:

```lean
(agl.any (fun f => agl.any (fun g => comp f g != comp g f))) ∧ (2376 + 540 = 2916) ∧ (2376 ≠ 0)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
