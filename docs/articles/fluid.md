---
title: "The fluid grid"
description: "Computed from lean/Fluid.lean — 25 sealed theorems, every claim citing its proof."
---

# The fluid grid

> THE FLUID GRID — the discrete divergence telescopes and sums to zero on every periodic ring, the discrete curl of a gradient vanishes on every cell, one explicit diffusion step stays within its neighbourhood's maximum, and on every periodic ring one explicit diffusion step conserves momentum and never increases the discrete energy, for Nat and for signed fields, each for every length, field and value. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems. — held by [discrete_divergence_telescopes](/theorem/discrete_divergence_telescopes) and its 24 siblings below.

**25 theorems** and **40,127 decided cases**, from [discrete_divergence_telescopes](/theorem/discrete_divergence_telescopes) onward, each checked by the kernel in <a href="/lean/Fluid.lean">lean/Fluid.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 25 of its 25 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [discrete_divergence_telescopes](/theorem/discrete_divergence_telescopes). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFluid.lean)** — nothing to install. The editor fetches `lean/Fluid.lean` from the repository and re-decides all 25 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### DISCRETE DIVERGENCE TELESCOPES, for every field and every length: the shifted sum plus the first value equals the sum plus the last — by induction on the length. What flows in at one end and out at the other is all the interior differences add up to. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [discrete_divergence_telescopes](/theorem/discrete_divergence_telescopes) — proven `by intro`, sorry-free:

```lean
∀ (f : Nat → Nat) (n : Nat), psum (fun i => f (i + 1)) n + f 0 = psum f n + f n
```

### a + k = b + k gives a = b, for every a, b, k — by induction on k through the successor's injectivity. Core's Nat.add_right_cancel depends on propext; this proof depends on no axiom. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [add_right_cancel_by_induction](/theorem/add_right_cancel_by_induction) — proven `by intro`, sorry-free:

```lean
∀ a b k : Nat, a + k = b + k → a = b
```

### ON A PERIODIC RING THE DISCRETE DIVERGENCE SUMS TO ZERO, for every ring size and every field — the universal of which closed_grid_differences_sum_to_zero decides one 4×4 instance. Discrete incompressibility on a closed grid is exact. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [ring_divergence_is_zero](/theorem/ring_divergence_is_zero) — proven `by intro`, sorry-free:

```lean
∀ (f : Nat → Nat) (n : Nat), f n = f 0 → psum (fun i => f (i + 1)) n = psum f n
```

### ONE EXPLICIT DIFFUSION STEP STAYS WITHIN ITS NEIGHBOURHOOD'S MAXIMUM, for every value: with weights 1, 2, 1 the weighted sum a + b + b + c is at most four times the maximum m — the discrete maximum principle that keeps the explicit heat scheme stable at its CFL limit. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [diffusion_step_never_exceeds_the_maximum](/theorem/diffusion_step_never_exceeds_the_maximum) — proven `by intro`, sorry-free:

```lean
∀ a b c m : Nat, a ≤ m → b ≤ m → c ≤ m → a + b + b + c ≤ m + m + m + m
```

### k + a = k + b gives a = b, for every k, a, b — by induction on k through the successor's injectivity, the left twin of add_right_cancel_by_induction. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [add_left_cancel_by_induction](/theorem/add_left_cancel_by_induction) — proven `by intro`, sorry-free:

```lean
∀ k a b : Nat, k + a = k + b → a = b
```

### THE DISCRETE CURL OF A GRADIENT VANISHES on every grid cell: when the four corners are a potential's values (q = p + dx, r = p + dy, and s reached both ways), right-then-up gains exactly what up-then-right gains, dx + dy' = dy + dx'. A gradient flow has no circulation. Stated over Nat on purpose: core's Int.add_comm and Int.add_assoc depend on propext, so the Int form cannot be axiom-free on core alone. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [discrete_curl_of_gradient_vanishes](/theorem/discrete_curl_of_gradient_vanishes) — proven `by intro`, sorry-free:

```lean
∀ p q r s dx dy dx' dy' : Nat, q = p + dx → s = q + dy' → r = p + dy → s = r + dx' → dx + dy' = dy + dx'
```

### (x + y)·z = x·z + y·z, for every x, y, z — right distributivity rebuilt from the left one by commuting the product, because core's Nat.add_mul depends on propext and this proof depends on no axiom. It is algebra over Nat, the bookkeeping the energy estimate needs. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [right_distrib_by_comm](/theorem/right_distrib_by_comm) — proven `by intro`, sorry-free:

```lean
∀ x y z : Nat, (x + y) * z = x * z + y * z
```

### THE SQUARE OF A SUM EXPANDS, for every x and y: (x + y)² = (x² + y²) + (xy + xy), by rewriting alone. It is the binomial square over Nat and nothing more. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [square_of_sum_expands](/theorem/square_of_sum_expands) — proven `by intro`, sorry-free:

```lean
∀ x y : Nat, (x + y) * (x + y) = (x * x + y * y) + (x * y + x * y)
```

### TWO PRODUCTS NEVER EXCEED THE SUM OF SQUARES, for every x and y: 2xy ≤ x² + y², the (x − y)² ≥ 0 inequality, proved by writing the larger as the smaller plus a gap d, which leaves exactly d² on the right. It is a pointwise inequality over Nat, not an estimate on any flow. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [two_products_le_sum_of_squares](/theorem/two_products_le_sum_of_squares) — proven `by have`, sorry-free:

```lean
∀ x y : Nat, x * y + x * y ≤ x * x + y * y
```

### THE SQUARE OF A SUM IS AT MOST TWICE THE SUM OF SQUARES, for every x and y: (x + y)² ≤ 2(x² + y²). It is a pointwise convexity inequality over Nat. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [square_of_sum_le_twice_sum_of_squares](/theorem/square_of_sum_le_twice_sum_of_squares) — proven `by intro`, sorry-free:

```lean
∀ x y : Nat, (x + y) * (x + y) ≤ (x * x + y * y) + (x * x + y * y)
```

### THE DIFFUSION STENCIL'S SQUARE IS BOUNDED BY FOUR WEIGHTED ENERGIES, for every a, b, c: (a + 2b + c)² ≤ 4(a² + 2b² + c²), the pointwise convexity step of the discrete energy estimate. It bounds one cell of one step; it is not the estimate itself. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [diffusion_stencil_square_le_weighted_energy](/theorem/diffusion_stencil_square_le_weighted_energy) — proven `by intro`, sorry-free:

```lean
∀ a b c : Nat, (a + b + b + c) * (a + b + b + c) ≤ (a * a + b * b + b * b + c * c) + (a * a + b * b + b * b + c * c) + (a * a + b * b + b * b + c * c) + (a * a + b * b + b * b + c * c)
```

### THE SUM OF FOUR FIELDS IS THE SUM OF THEIR SUMS, for every four fields and every length — by induction on the length. It is linearity of the finite sum over Nat. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [psum_add4](/theorem/psum_add4) — proven `by intro`, sorry-free:

```lean
∀ (a b c d : Nat → Nat) (n : Nat), psum (fun i => a i + b i + c i + d i) n = psum a n + psum b n + psum c n + psum d n
```

### A POINTWISE BOUND SUMS TO A BOUND, for every two fields and every length: f ≤ g cell by cell gives Σ f ≤ Σ g — by induction on the length. It is monotonicity of the finite sum over Nat. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [psum_le_of_pointwise](/theorem/psum_le_of_pointwise) — proven `by intro`, sorry-free:

```lean
∀ (f g : Nat → Nat) (n : Nat), (∀ i : Nat, f i ≤ g i) → psum f n ≤ psum g n
```

### A CYCLIC SHIFT PRESERVES EVERY SUM ON A PERIODIC RING, for every ring size n and every n-periodic field — a corollary of ring_divergence_is_zero. It is a statement about a finite ring of cells. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [ring_shift_preserves_sum](/theorem/ring_shift_preserves_sum) — proven `by intro`, sorry-free:

```lean
∀ (g : Nat → Nat) (n : Nat), (∀ i : Nat, g (i + n) = g i) → psum (fun i => g (i + 1)) n = psum g n
```

### A SHIFT BY TWO PRESERVES EVERY SUM ON A PERIODIC RING, for every ring size n and every n-periodic field — two cyclic shifts in a row. It is a statement about a finite ring of cells. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [ring_double_shift_preserves_sum](/theorem/ring_double_shift_preserves_sum) — proven `by intro`, sorry-free:

```lean
∀ (g : Nat → Nat) (n : Nat), (∀ i : Nat, g (i + n) = g i) → psum (fun i => g (i + 2)) n = psum g n
```

### A CYCLIC SHIFT PRESERVES THE DISCRETE ENERGY, for every ring size n and every n-periodic field: Σ u(i+1)² = Σ u(i)². It is the discrete sum of squares on a finite ring, not a continuous energy. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [ring_shift_preserves_energy](/theorem/ring_shift_preserves_energy) — proven `by intro`, sorry-free:

```lean
∀ (f : Nat → Nat) (n : Nat), (∀ i : Nat, f (i + n) = f i) → psum (fun i => sq (f (i + 1))) n = psum (fun i => sq (f i)) n
```

### FOUR TIMES S IS FOUR COPIES OF S, for every S: 4·S = S + S + S + S, by unfolding the product. It is arithmetic bookkeeping over Nat. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [four_mul_is_four_copies](/theorem/four_mul_is_four_copies) — proven `by intro`, sorry-free:

```lean
∀ S : Nat, 4 * S = S + S + S + S
```

### SIXTEEN TIMES S IS FOUR GROUPS OF FOUR COPIES, for every S, by unfolding the product. It is arithmetic bookkeeping over Nat. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [sixteen_mul_is_four_fours](/theorem/sixteen_mul_is_four_fours) — proven `by intro`, sorry-free:

```lean
∀ S : Nat, 16 * S = (S + S + S + S) + (S + S + S + S) + (S + S + S + S) + (S + S + S + S)
```

### DISCRETE MOMENTUM IS CONSERVED BY ONE DIFFUSION STEP ON A PERIODIC RING, for every ring size n and every n-periodic Nat field: Σ (u(i) + 2u(i+1) + u(i+2)) = 4 Σ u(i), i.e. the new field sums to the old one at λ = 1/4. It is exact conservation for this explicit scheme on a finite ring. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [diffusion_step_conserves_momentum](/theorem/diffusion_step_conserves_momentum) — proven `by intro`, sorry-free:

```lean
∀ (f : Nat → Nat) (n : Nat), (∀ i : Nat, f (i + n) = f i) → psum (step f) n = 4 * psum f n
```

### THE ENERGY BOUND FROM A POINTWISE STENCIL BOUND, for every ring size n, every n-periodic field g and every field h dominated cell by cell by the diffusion stencil of g: Σ h² ≤ 16 Σ g². It is the summed form of the stencil inequality on a finite ring. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [ring_energy_bound_of_pointwise](/theorem/ring_energy_bound_of_pointwise) — proven `by intro`, sorry-free:

```lean
∀ (g h : Nat → Nat) (n : Nat), (∀ i : Nat, g (i + n) = g i) → (∀ i : Nat, h i ≤ g i + g (i + 1) + g (i + 1) + g (i + 2)) → psum (fun i => sq (h i)) n ≤ 16 * psum (fun i => sq (g i)) n
```

### ONE EXPLICIT DIFFUSION STEP NEVER INCREASES THE DISCRETE ENERGY ON A PERIODIC RING, for every ring size n and every n-periodic Nat field: Σ (u(i) + 2u(i+1) + u(i+2))² ≤ 16 Σ u(i)², i.e. Σ u'² ≤ Σ u² at λ = 1/4. The constant 16 is tight — a constant field attains it, and the mirror checks that 15 fails on some sampled ring. It is the discrete energy estimate for this one explicit scheme on a finite ring. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [diffusion_step_never_increases_energy](/theorem/diffusion_step_never_increases_energy) — proven `by intro`, sorry-free:

```lean
∀ (f : Nat → Nat) (n : Nat), (∀ i : Nat, f (i + n) = f i) → psum (fun i => sq (step f i)) n ≤ 16 * psum (fun i => sq (f i)) n
```

### THE DISTANCE OF A NATURAL DIFFERENCE IS AT MOST THE SUM, for every m and k: |m − k| ≤ m + k, by case analysis on Int.subNatNat. It is an integer inequality, a step toward the triangle inequality. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [natAbs_subNatNat_le](/theorem/natAbs_subNatNat_le) — proven `by intro`, sorry-free:

```lean
∀ m k : Nat, (Int.subNatNat m k).natAbs ≤ m + k
```

### THE TRIANGLE INEQUALITY FOR natAbs, for every pair of integers: |a + b| ≤ |a| + |b|, by case analysis on the constructors, because core's Int.natAbs_add_le depends on propext and this proof depends on no axiom. It is an integer inequality. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [natAbs_triangle](/theorem/natAbs_triangle) — proven `by intro`, sorry-free:

```lean
∀ a b : Int, (a + b).natAbs ≤ a.natAbs + b.natAbs
```

### THE NAT SQUARE OF natAbs IS THE INTEGER SQUARE, for every integer x: |x|·|x| = x·x — core's Int.natAbs_mul_self, which depends on no axiom. It lets the signed energy be counted in Nat. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [sq_natAbs_is_the_square](/theorem/sq_natAbs_is_the_square) — proven `by exact`, sorry-free:

```lean
∀ x : Int, ((sq x.natAbs : Nat) : Int) = x * x
```

### ONE EXPLICIT DIFFUSION STEP NEVER INCREASES THE ENERGY OF A SIGNED FIELD ON A PERIODIC RING, for every ring size n and every n-periodic Int field u: Σ |u(i) + 2u(i+1) + u(i+2)|² ≤ 16 Σ |u(i)|², the squares taken as natAbs · natAbs, which equals u · u (sq_natAbs_is_the_square). The weights matter: the mirror checks that the unstable weights 1, −1, 1 grow the energy of some sampled ring. It is the discrete energy estimate for this one explicit scheme on a finite ring. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
The ledger holds this as [signed_diffusion_step_never_increases_energy](/theorem/signed_diffusion_step_never_increases_energy) — proven `by intro`, sorry-free:

```lean
∀ (u : Nat → Int) (n : Nat), (∀ i : Nat, u (i + n) = u i) → psum (fun i => sq (stepZ u i).natAbs) n ≤ 16 * psum (fun i => sq (u i).natAbs) n
```


::: warning 
THE FLUID GRID — the discrete divergence telescopes and sums to zero on every periodic ring, the discrete curl of a gradient vanishes on every cell, one explicit diffusion step stays within its neighbourhood's maximum, and on every periodic ring one explicit diffusion step conserves momentum and never increases the discrete energy, for Nat and for signed fields, each for every length, field and value. The boundary is confirmed by the wing's own sealed theorems — e.g. [discrete_divergence_telescopes](/theorem/discrete_divergence_telescopes) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
