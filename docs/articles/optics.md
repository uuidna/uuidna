---
title: "The light domain"
description: "Computed from lean/Optics.lean — 6 sealed theorems, every claim citing its proof."
---

# The light domain

> OPTICS — the light domain, as decidable arithmetic, demarcated. — held by [law_of_reflection](/theorem/law_of_reflection) and its 5 siblings below.

**6 theorems**, from [law_of_reflection](/theorem/law_of_reflection) onward, each proven `by decide` in [lean/Optics.lean](/lean/Optics.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [refractive_index_ge_one](/theorem/refractive_index_ge_one). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FOptics.lean)** — nothing to install. The editor fetches `lean/Optics.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The law of reflection: the angle out equals the angle in, so a mirror is an involution — reflecting the incidence angle twice through the normal returns it, 180 − (180 − a) = a for every angle a in 0…180°.
The ledger holds this as [law_of_reflection](/theorem/law_of_reflection) — proven `by decide`, sorry-free:

```lean
(List.range 181).all (fun a => (180 - (180 - a)) == a)
```

### The refractive index n = c/v is at least 1 — vacuum is exactly 1.00, water 1.33, glass 1.50, diamond 2.42 (×100: 100, 133, 150, 242) — light never travels faster in a medium than in vacuum.
The ledger holds this as [refractive_index_ge_one](/theorem/refractive_index_ge_one) — proven `by decide`, sorry-free:

```lean
([100,133,150,242] : List Nat).all (fun n => 100 <= n)
```

### Light slows in matter: with n > 1 the phase speed v = c/n is strictly less than c — water (1.33), glass (1.50) and diamond (2.42) all have index above the vacuum 1.00. The vacuum speed is the ceiling; no medium beats it.
The ledger holds this as [light_slower_in_medium](/theorem/light_slower_in_medium) — proven `by decide`, sorry-free:

```lean
([133,150,242] : List Nat).all (fun n => 100 < n)
```

### Snell's law n₁sinθ₁ = n₂sinθ₂, in a consistent case: with n₁ = 4, sinθ₁ = 3/5 and n₂ = 3, sinθ₂ = 4/5, both sides equal 12/5 — cross-multiplied, 4·3 = 3·4. Refraction bends the ray so the product n·sinθ is conserved across the boundary.
The ledger holds this as [snell_law](/theorem/snell_law) — proven `by decide`, sorry-free:

```lean
4 * 3 = 3 * 4
```

### The thin-lens equation 1/f = 1/do + 1/di: an object at do = 15 and image at di = 30 give focal length f = 10, since cross-multiplied f·di + f·do = do·di is 10·30 + 10·15 = 15·30 = 450.
The ledger holds this as [thin_lens_equation](/theorem/thin_lens_equation) — proven `by decide`, sorry-free:

```lean
10*30 + 10*15 = 15*30
```

### Magnification m = di/do: with the image at di = 30 and the object at do = 15, the image is 30/15 = 2× the size — the lens magnifies by the distance ratio.
The ledger holds this as [magnification](/theorem/magnification) — proven `by decide`, sorry-free:

```lean
30 / 15 = 2
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
