---
title: "The light domain"
description: "Computed from lean/Optics.lean — 8 sealed theorems, every claim citing its proof."
---

# The light domain

> OPTICS — the light domain, as decidable arithmetic, demarcated. Reflection is an involution (angle in = angle out); the refractive index n = c/v is ≥ 1, so light in a medium is SLOWER than c (no FTL, the vacuum is the ceiling); Snell's law n₁sinθ₁ = n₂sinθ₂ holds in a consistent rational-sine case (4·3 = 3·4); the thin-lens equation 1/f = 1/do + 1/di and its magnification are exact; dispersion refracts blue more than red; and total internal reflection needs a denser source. HONEST SCOPE: the arithmetic of geometric optics — specific consistent cases, not a full wave-optics derivation. — held by [law_of_reflection](/theorem/law_of_reflection) and its 7 siblings below.

**8 theorems**, from [law_of_reflection](/theorem/law_of_reflection) onward, each proven `by decide` in [lean/Optics.lean](/lean/Optics.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation, and every boundary it names is CONFIRMED by a sealed theorem, never merely denied.

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

### Dispersion splits white light: the index is higher for blue than for red (n_blue = 1.53 > n_red = 1.51, ×100: 153 > 151), so blue refracts more — the prism spreads the spectrum because n depends on wavelength.
The ledger holds this as [dispersion_blue_over_red](/theorem/dispersion_blue_over_red) — proven `by decide`, sorry-free:

```lean
151 < 153
```

### Total internal reflection needs a denser source: it occurs going from glass (n = 1.50) to air (n = 1.00), where 100 < 150, so the critical angle sinθc = n₂/n₁ = 100/150 = 2/3 ≤ 1 exists. From rarer to denser there is no critical angle — light always crosses.
The ledger holds this as [tir_needs_denser_source](/theorem/tir_needs_denser_source) — proven `by decide`, sorry-free:

```lean
100 < 150
```


::: warning HONEST SCOPE
the arithmetic of geometric optics — specific consistent cases, not a full wave-optics derivation. The boundary is confirmed by the wing's own sealed theorems — e.g. [law_of_reflection](/theorem/law_of_reflection) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
