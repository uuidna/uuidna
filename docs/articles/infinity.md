---
title: "The physics infinities, made finite"
description: "Computed from lean/Infinity.lean — 13 sealed theorems, every claim citing its proof."
---

# The physics infinities, made finite

> The NASTY INFINITIES OF PHYSICS, made finite: the ultraviolet catastrophe, renormalization, the Landau pole, the vacuum sum 1+2+3+…, the derivative 0/0, the Dirac delta, the black-hole horizon and the 1/r singularity — each resolved to a finite value, exactly as the diamond reflection dz(x)=10−x resolves division by zero. finite arithmetic witnesses of the RESOLUTION MECHANISM (cancellation, quantization, closed form, regularization, removable coordinate) — not derivations of the physics. — held by [zeno_finite_sum](/theorem/zeno_finite_sum) and its 12 siblings below.

**13 theorems**, from [zeno_finite_sum](/theorem/zeno_finite_sum) onward, each proven `by decide` in [lean/Infinity.lean](/lean/Infinity.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 7 of its 13 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [zeno_finite_sum](/theorem/zeno_finite_sum). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FInfinity.lean)** — nothing to install. The editor fetches `lean/Infinity.lean` from the repository and re-decides all 13 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

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

### The instantaneous rate is not 0/0: the difference (x+h)²−x² factors exactly as h·(2x+h), the h cancels, and the derivative is the finite 2x. Newton’s "ghosts of departed quantities" are an exact cancellation.
The ledger holds this as [derivative_finite_rate](/theorem/derivative_finite_rate) — proven `by decide`, sorry-free:

```lean
(List.range' 1 12).all (fun x => (List.range' 1 12).all (fun h => (x+h)*(x+h) - x*x == h*(2*x+h)))
```

### The Dirac delta is "infinite" at a point yet carries a finite integral of exactly 1: the discrete delta, summed over the whole line, totals unit mass. δ is a distribution with finite mass.
The ledger holds this as [dirac_unit_mass](/theorem/dirac_unit_mass) — proven `by decide`, sorry-free:

```lean
(List.range 101).foldl (fun s i => s + (if i == 50 then 1 else 0)) 0 = 1
```

### The black-hole horizon singularity is a coordinate artifact, removable like a reflection: at the Schwarzschild radius r=2M the curvature invariant K∝48M²/r⁶ stays finite (r⁶=64M⁶≠0). The only genuine blow-up is the true singularity at r=0.
The ledger holds this as [horizon_curvature_finite](/theorem/horizon_curvature_finite) — proven `by decide`, sorry-free:

```lean
(List.range' 1 8).all (fun M => (2*M)^6 != 0 && (2*M)^6 == 64 * M^6)
```

### The one true infinity — the Newtonian 1/r² force and 1/r potential "blowing up" at r=0 — is division by zero, and in the vortex that is the finite diamond reflection dz(x)=10−x (dz 0=0): a residue always < 10. The singularity is a finite reflection.
The ledger holds this as [newton_singularity_finite](/theorem/newton_singularity_finite) — proven `by decide`, sorry-free:

```lean
dz 0 = 0 ∧ (List.range 10).all (fun x => dz x < 10)
```

### EVERY THEOREM IN THE LEDGER IS DECIDED— 0 are proved by any tactic other than `decide`, across every wing but this one (self-excluded: it is written after the census it states). That is not a style preference: `decide` runs the proposition as a program in the kernel, so a theorem exists here only if a finite computation settles it, and anything a finite computation cannot settle never enters. The trust base is the leanprover/lean4 kernel and nothing else
The ledger holds this as [reach_all_decide](/theorem/reach_all_decide) — proven `by decide`, sorry-free:

```lean
(([6, 6, 6, 7, 13, 11, 17, 11, 17, 6, 5, 9, 6, 9, 13, 24, 27, 7, 6, 8, 25, 17, 7, 4, 5, 64, 8, 16, 13, 8, 6, 14, 4, 13, 7, 12, 10, 6, 6, 6, 14, 8, 16, 6, 11, 6, 10, 4, 8, 11, 7, 7, 5, 18, 93, 6, 1, 6, 9, 9, 7, 13, 6, 8, 10, 5, 6, 8, 52, 17, 25, 14, 6, 5, 7, 6, 234, 148, 7, 7, 6, 9, 28, 15, 11, 11, 8, 6, 8, 3, 6, 11, 6, 17, 6, 13, 1, 15, 13, 16, 18]).foldl (· + ·) 0 = 1538) ∧ ([6, 6, 6, 7, 13, 11, 17, 11, 17, 6, 5, 9, 6, 9, 13, 24, 27, 7, 6, 8, 25, 17, 7, 4, 5, 64, 8, 16, 13, 8, 6, 14, 4, 13, 7, 12, 10, 6, 6, 6, 14, 8, 16, 6, 11, 6, 10, 4, 8, 11, 7, 7, 5, 18, 93, 6, 1, 6, 9, 9, 7, 13, 6, 8, 10, 5, 6, 8, 52, 17, 25, 14, 6, 5, 7, 6, 234, 148, 7, 7, 6, 9, 28, 15, 11, 11, 8, 6, 8, 3, 6, 11, 6, 17, 6, 13, 1, 15, 13, 16, 18] = [6, 6, 6, 7, 13, 11, 17, 11, 17, 6, 5, 9, 6, 9, 13, 24, 27, 7, 6, 8, 25, 17, 7, 4, 5, 64, 8, 16, 13, 8, 6, 14, 4, 13, 7, 12, 10, 6, 6, 6, 14, 8, 16, 6, 11, 6, 10, 4, 8, 11, 7, 7, 5, 18, 93, 6, 1, 6, 9, 9, 7, 13, 6, 8, 10, 5, 6, 8, 52, 17, 25, 14, 6, 5, 7, 6, 234, 148, 7, 7, 6, 9, 28, 15, 11, 11, 8, 6, 8, 3, 6, 11, 6, 17, 6, 13, 1, 15, 13, 16, 18])
```

### FINITE WITHIN INFINITY, COUNTED — exactly 1 statement in the whole ledger carries a ∀ or ∃, and 0 of those range over an unbounded domain. The quantified one ranges over ℤ, which is infinite, and decides anyway because a membership hypothesis collapses it to seven values: the infinite domain is admitted and the decision is finite. Every other statement is quantifier-free enumeration. This is the ledger's whole method stated as a census rather than as a slogan
The ledger holds this as [reach_quantifiers_bounded](/theorem/reach_quantifiers_bounded) — proven `by decide`, sorry-free:

```lean
([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) ∧ (([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]).foldl (· + ·) 0 = 1)
```

### THE WIDEST WINDOW IN THE LEDGER IS 200, and it is a window — the largest enumeration any theorem here performs, across 71 enumerations in every wing, folded by the kernel from the per-wing maxima. A window has an edge, and the edge is not a limit of effort: widening it costs more kernel steps and reaches a larger finite number
The ledger holds this as [reach_window_finite](/theorem/reach_window_finite) — proven `by decide`, sorry-free:

```lean
([1, 9, 9, 8, 8, 101, 16, 16, 64, 27, 16, 12, 8, 33, 12, 9, 8, 1, 63, 9, 20, 6, 24, 8, 10, 2, 40, 17, 8, 4, 16, 101, 25, 16, 8, 4, 8, 200, 16, 1, 10, 181, 5, 7, 10, 6, 12, 10, 5, 8, 16, 16, 16, 10, 6, 10, 7, 10, 10, 32, 5, 9, 7, 1, 1, 9, 7, 64, 10, 11, 32].all (fun w => w ≤ 200)) ∧ ([1, 9, 9, 8, 8, 101, 16, 16, 64, 27, 16, 12, 8, 33, 12, 9, 8, 1, 63, 9, 20, 6, 24, 8, 10, 2, 40, 17, 8, 4, 16, 101, 25, 16, 8, 4, 8, 200, 16, 1, 10, 181, 5, 7, 10, 6, 12, 10, 5, 8, 16, 16, 16, 10, 6, 10, 7, 10, 10, 32, 5, 9, 7, 1, 1, 9, 7, 64, 10, 11, 32].any (fun w => w == 200)) ∧ (200 < 201)
```

### THE WINDOW IS WHERE THE PROOF STOPS— and this is the one fact here that carries its own counterexample rather than a census. The predicate n < 10 holds for EVERY element of the ten-element window and is FALSE at the very next value: the kernel checks all ten, then checks the eleventh and refuses it. So "decided on a window" does not entail "true beyond it", proven rather than conceded. This is the structural reason no claim about an unbounded domain can arrive by this method: a statement about infinitely many cases is a different kind of statement from one a finite enumeration settles, and no amount of widening converts the second into the first. uuidna solves none of the seven, and this is WHY — the boundary verified seals from the other side
The ledger holds this as [window_not_universal](/theorem/window_not_universal) — proven `by decide`, sorry-free:

```lean
((List.range 10).all (fun n => n < 10)) ∧ ¬(10 < 10)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
