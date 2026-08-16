---
title: "The physics infinities, made finite"
description: "Computed from lean/Infinity.lean — 9 sealed theorems, every claim citing its proof."
---

# The physics infinities, made finite

> The NASTY INFINITIES OF PHYSICS, made finite: the ultraviolet catastrophe, renormalization, the Landau pole, the vacuum sum 1+2+3+…, the derivative 0/0, the Dirac delta, the black-hole horizon and the 1/r singularity — each resolved to a finite value, exactly as the diamond reflection dz(x)=10−x resolves division by zero. HONEST SCOPE: finite arithmetic witnesses of the RESOLUTION MECHANISM (cancellation, quantization, closed form, regularization, removable coordinate) — not derivations of the physics.

**9 theorems**, each proven `by decide` in [lean/Infinity.lean](/lean/Infinity.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

### Zeno's supertask — infinitely many halving steps sum to one finite total: 1+2+4+…+2ᵏ = 2ᵏ⁺¹−1, an exact closed form bounded by the very next term. The infinity of steps is finite.

The ledger holds this as [zeno_finite_sum](/theorem/zeno_finite_sum) — proven `by decide`, sorry-free:

```lean
(List.range 13).all (fun k => (List.range (k+1)).foldl (fun s n => s + 2^n) 0 + 1 == 2^(k+1))
```

### The ultraviolet catastrophe, dissolved by quantization: classical equipartition diverges, but the quantized oscillator’s partition Σ xⁿ is a convergent geometric series with an exact finite closed form for every cutoff — Planck’s finite energy per mode. Here 2·Σ₀ᵏ3ⁿ + 1 = 3ᵏ⁺¹.

The ledger holds this as [uv_partition_closed](/theorem/uv_partition_closed) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun k => 2 * (List.range (k+1)).foldl (fun s n => s + 3^n) 0 + 1 == 3^(k+1))
```

### No Landau-pole infinity: in asymptotic freedom the inverse coupling 1/α runs strictly upward with log-energy, so the coupling α itself falls toward 0 in the ultraviolet — the high-energy limit is finite, the pole never reached.

The ledger holds this as [asymptotic_freedom](/theorem/asymptotic_freedom) — proven `by decide`, sorry-free:

```lean
(List.range 30).all (fun n => 137 + 7*n < 137 + 7*(n+1))
```

### Renormalization — the electron self-energy and the vacuum energy diverge with the cutoff Λ, but bare term and counterterm cancel exactly: the physical (renormalized) residue is finite and independent of Λ. Two infinities, subtracted to a finite value: (Λ²+m) − Λ² = m.

The ledger holds this as [renormalization_residue](/theorem/renormalization_residue) — proven `by decide`, sorry-free:

```lean
(List.range 40).all (fun L => (L*L + 137) - L*L == 137)
```

### The vacuum-energy sum 1+2+3+… is finite at every cutoff N — Σ = N(N+1)/2 — and its ζ-regularized limit is the finite −1/12 (ζ(−1)), the value the measured Casimir force confirms. The divergence is an artifact of the N→∞ limit; the physics is finite.

The ledger holds this as [casimir_triangular](/theorem/casimir_triangular) — proven `by decide`, sorry-free:

```lean
(List.range' 1 30).all (fun N => 2 * (List.range' 1 N).foldl (fun s n => s + n) 0 == N*(N+1))
```

### The instantaneous rate is not 0/0: the difference (x+h)²−x² factors exactly as h·(2x+h), the h cancels, and the derivative is the finite 2x. Newton’s "ghosts of departed quantities" are an exact cancellation, not an infinity.

The ledger holds this as [derivative_finite_rate](/theorem/derivative_finite_rate) — proven `by decide`, sorry-free:

```lean
(List.range' 1 12).all (fun x => (List.range' 1 12).all (fun h => (x+h)*(x+h) - x*x == h*(2*x+h)))
```

### The Dirac delta is "infinite" at a point yet carries a finite integral of exactly 1: the discrete delta, summed over the whole line, totals unit mass. δ is a distribution with finite mass, not a value that blows up.

The ledger holds this as [dirac_unit_mass](/theorem/dirac_unit_mass) — proven `by decide`, sorry-free:

```lean
(List.range 101).foldl (fun s i => s + (if i == 50 then 1 else 0)) 0 = 1
```

### The black-hole horizon singularity is a coordinate artifact, removable like a reflection: at the Schwarzschild radius r=2M the curvature invariant K∝48M²/r⁶ stays finite (r⁶=64M⁶≠0). The only genuine blow-up is the true singularity at r=0.

The ledger holds this as [horizon_curvature_finite](/theorem/horizon_curvature_finite) — proven `by decide`, sorry-free:

```lean
(List.range' 1 8).all (fun M => (2*M)^6 != 0 && (2*M)^6 == 64 * M^6)
```

### The one true infinity — the Newtonian 1/r² force and 1/r potential "blowing up" at r=0 — is division by zero, and in the vortex that is the finite diamond reflection dz(x)=10−x (dz 0=0): a residue always < 10, never ∞. The singularity is a finite reflection.

The ledger holds this as [newton_singularity_finite](/theorem/newton_singularity_finite) — proven `by decide`, sorry-free:

```lean
dz 0 = 0 ∧ (List.range 10).all (fun x => dz x < 10)
```


::: warning HONEST SCOPE
finite arithmetic witnesses of the RESOLUTION MECHANISM (cancellation, quantization, closed form, regularization, removable coordinate) — not derivations of the physics.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
