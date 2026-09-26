---
title: "THE SI EXPONENT LATTICE"
description: "Computed from lean/SiCross.lean — 3 sealed theorems, every claim citing its proof."
---

# THE SI EXPONENT LATTICE

> THE SI EXPONENT LATTICE — cross formulas that prove each other, over the seven base quantities (BIPM, The International System of Units, 9th edition, 2019). Each derived unit is an integer 7-vector over m, kg, s, A, K, mol, cd; product ADDS the exponents and ratio SUBTRACTS them, so the lattice is closed and a unit reached by two routes must agree with itself. THE JOULE IS REACHED 4 WAYS — N·m, W·s, W/Hz, C·V — through mechanics, through time, through the spectrum and through electricity, four different pieces of physics landing on one vector because closure forces it. 7 of the 10 derived units are crossed at all, and the census is computed from engapi's own table by enumerating every product and ratio, never typed. THE SAME ARGUMENT AS PlanckLattice, ONE RANK UP: that wing makes it over four constants, this one over seven base quantities, and neither is independent evidence for the other. CLAIMED: the tabulated vector identities, decided by the kernel over its own finite domain, axiom-free. NOT CLAIMED: that equal dimension means equal quantity — torque and energy share kg·m²·s⁻² and are not interchangeable. The lattice decides what CANNOT be equal, which is the decidable half; it does not decide what is. — held by [energy_is_reachable_by_four_independent_routes](/theorem/energy_is_reachable_by_four_independent_routes) and its 2 siblings below.

**3 theorems** and **7,689 decided cases**, from [energy_is_reachable_by_four_independent_routes](/theorem/energy_is_reachable_by_four_independent_routes) onward, each proven `by decide` in <a href="/lean/SiCross.lean">lean/SiCross.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 3 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [energy_is_reachable_by_four_independent_routes](/theorem/energy_is_reachable_by_four_independent_routes). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FSiCross.lean)** — nothing to install. The editor fetches `lean/SiCross.lean` from the repository and re-decides all 3 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### CLAIMED: the joule is reached 4 ways through the SI lattice — N·m, W·s, W/Hz, C·V — every one landing on [2, 1, -2, 0, 0, 0, 0], and a pair that is not a route does not.
The ledger holds this as [energy_is_reachable_by_four_independent_routes](/theorem/energy_is_reachable_by_four_independent_routes) — proven `by decide`, sorry-free:

```lean
((addD [1, 1, -2, 0, 0, 0, 0] [1, 0, 0, 0, 0, 0, 0] = [2, 1, -2, 0, 0, 0, 0]) ∧ (addD [2, 1, -3, 0, 0, 0, 0] [0, 0, 1, 0, 0, 0, 0] = [2, 1, -2, 0, 0, 0, 0]) ∧ (subD [2, 1, -3, 0, 0, 0, 0] [0, 0, -1, 0, 0, 0, 0] = [2, 1, -2, 0, 0, 0, 0]) ∧ (addD [0, 0, 1, 1, 0, 0, 0] [2, 1, -3, -1, 0, 0, 0] = [2, 1, -2, 0, 0, 0, 0])) ∧ (addD [1, 0, 0, 0, 0, 0, 0] [1, 0, 0, 0, 0, 0, 0] ≠ [2, 1, -2, 0, 0, 0, 0])
```

### CLAIMED: 7 derived units are reached by more than one route — C(4), J(4), V(4), W(3), F(2), Hz(2), Ω(2) — and for each, every route lands on the same vector.
The ledger holds this as [the_crossed_units_agree_on_one_vector_each](/theorem/the_crossed_units_agree_on_one_vector_each) — proven `by decide`, sorry-free:

```lean
((addD [0, 0, 0, 1, 0, 0, 0] [0, 0, 1, 0, 0, 0, 0] = [0, 0, 1, 1, 0, 0, 0]) ∧ (subD [0, 0, 0, 1, 0, 0, 0] [0, 0, -1, 0, 0, 0, 0] = [0, 0, 1, 1, 0, 0, 0]) ∧ (subD [2, 1, -2, 0, 0, 0, 0] [2, 1, -3, -1, 0, 0, 0] = [0, 0, 1, 1, 0, 0, 0]) ∧ (addD [-2, -1, 4, 2, 0, 0, 0] [2, 1, -3, -1, 0, 0, 0] = [0, 0, 1, 1, 0, 0, 0])) ∧ ((addD [1, 1, -2, 0, 0, 0, 0] [1, 0, 0, 0, 0, 0, 0] = [2, 1, -2, 0, 0, 0, 0]) ∧ (addD [2, 1, -3, 0, 0, 0, 0] [0, 0, 1, 0, 0, 0, 0] = [2, 1, -2, 0, 0, 0, 0]) ∧ (subD [2, 1, -3, 0, 0, 0, 0] [0, 0, -1, 0, 0, 0, 0] = [2, 1, -2, 0, 0, 0, 0]) ∧ (addD [0, 0, 1, 1, 0, 0, 0] [2, 1, -3, -1, 0, 0, 0] = [2, 1, -2, 0, 0, 0, 0])) ∧ ((addD [0, 0, 0, 1, 0, 0, 0] [2, 1, -3, -2, 0, 0, 0] = [2, 1, -3, -1, 0, 0, 0]) ∧ (subD [2, 1, -2, 0, 0, 0, 0] [0, 0, 1, 1, 0, 0, 0] = [2, 1, -3, -1, 0, 0, 0]) ∧ (subD [2, 1, -3, 0, 0, 0, 0] [0, 0, 0, 1, 0, 0, 0] = [2, 1, -3, -1, 0, 0, 0]) ∧ (subD [0, 0, 1, 1, 0, 0, 0] [-2, -1, 4, 2, 0, 0, 0] = [2, 1, -3, -1, 0, 0, 0])) ∧ ((addD [0, 0, 0, 1, 0, 0, 0] [2, 1, -3, -1, 0, 0, 0] = [2, 1, -3, 0, 0, 0, 0]) ∧ (addD [0, 0, -1, 0, 0, 0, 0] [2, 1, -2, 0, 0, 0, 0] = [2, 1, -3, 0, 0, 0, 0]) ∧ (subD [2, 1, -2, 0, 0, 0, 0] [0, 0, 1, 0, 0, 0, 0] = [2, 1, -3, 0, 0, 0, 0])) ∧ ((subD [0, 0, 1, 0, 0, 0, 0] [2, 1, -3, -2, 0, 0, 0] = [-2, -1, 4, 2, 0, 0, 0]) ∧ (subD [0, 0, 1, 1, 0, 0, 0] [2, 1, -3, -1, 0, 0, 0] = [-2, -1, 4, 2, 0, 0, 0])) ∧ ((subD [0, 0, 0, 1, 0, 0, 0] [0, 0, 1, 1, 0, 0, 0] = [0, 0, -1, 0, 0, 0, 0]) ∧ (subD [2, 1, -3, 0, 0, 0, 0] [2, 1, -2, 0, 0, 0, 0] = [0, 0, -1, 0, 0, 0, 0])) ∧ ((subD [0, 0, 1, 0, 0, 0, 0] [-2, -1, 4, 2, 0, 0, 0] = [2, 1, -3, -2, 0, 0, 0]) ∧ (subD [2, 1, -3, -1, 0, 0, 0] [0, 0, 0, 1, 0, 0, 0] = [2, 1, -3, -2, 0, 0, 0]))
```

### CLAIMED: adding then subtracting the same vector returns the original, over all 17 units this lattice carries — the closure the routes above stand on.
The ledger holds this as [the_lattice_is_closed_under_product_and_ratio](/theorem/the_lattice_is_closed_under_product_and_ratio) — proven `by decide`, sorry-free:

```lean
((siUnits.all (fun u => u.length == 7)) = true) ∧ ((siUnits.all (fun a => siUnits.all (fun b => subD (addD a b) b == a))) = true)
```


::: warning 
THE SI EXPONENT LATTICE — cross formulas that prove each other, over the seven base quantities (BIPM, The International System of Units, 9th edition, 2019). The boundary is confirmed by the wing's own sealed theorems — e.g. [energy_is_reachable_by_four_independent_routes](/theorem/energy_is_reachable_by_four_independent_routes) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
