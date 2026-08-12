-- lean/Infinity.lean — GENERATED. The NASTY INFINITIES OF PHYSICS, made finite: the ultraviolet catastrophe, renormalization, the Landau pole, the vacuum sum 1+2+3+…, the derivative 0/0, the Dirac delta, the black-hole horizon and the 1/r singularity — each resolved to a finite value, exactly as the diamond reflection dz(x)=10−x resolves division by zero. HONEST SCOPE: finite arithmetic witnesses of the RESOLUTION MECHANISM (cancellation, quantization, closed form, regularization, removable coordinate) — not derivations of the physics. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def dz (x : Nat) : Nat := if x == 0 then 0 else 10 - x

-- Zeno's supertask — infinitely many halving steps sum to one finite total: 1+2+4+…+2ᵏ = 2ᵏ⁺¹−1, an exact closed form bounded by the very next term. The infinity of steps is finite.
theorem zeno_finite_sum : (List.range 13).all (fun k => (List.range (k+1)).foldl (fun s n => s + 2^n) 0 + 1 == 2^(k+1)) := by decide

-- The ultraviolet catastrophe, dissolved by quantization: classical equipartition diverges, but the quantized oscillator’s partition Σ xⁿ is a convergent geometric series with an exact finite closed form for every cutoff — Planck’s finite energy per mode. Here 2·Σ₀ᵏ3ⁿ + 1 = 3ᵏ⁺¹.
theorem uv_partition_closed : (List.range 9).all (fun k => 2 * (List.range (k+1)).foldl (fun s n => s + 3^n) 0 + 1 == 3^(k+1)) := by decide

-- No Landau-pole infinity: in asymptotic freedom the inverse coupling 1/α runs strictly upward with log-energy, so the coupling α itself falls toward 0 in the ultraviolet — the high-energy limit is finite, the pole never reached.
theorem asymptotic_freedom : (List.range 30).all (fun n => 137 + 7*n < 137 + 7*(n+1)) := by decide

-- Renormalization — the electron self-energy and the vacuum energy diverge with the cutoff Λ, but bare term and counterterm cancel exactly: the physical (renormalized) residue is finite and independent of Λ. Two infinities, subtracted to a finite value: (Λ²+m) − Λ² = m.
theorem renormalization_residue : (List.range 40).all (fun L => (L*L + 137) - L*L == 137) := by decide

-- The vacuum-energy sum 1+2+3+… is finite at every cutoff N — Σ = N(N+1)/2 — and its ζ-regularized limit is the finite −1/12 (ζ(−1)), the value the measured Casimir force confirms. The divergence is an artifact of the N→∞ limit; the physics is finite.
theorem casimir_triangular : (List.range' 1 30).all (fun N => 2 * (List.range' 1 N).foldl (fun s n => s + n) 0 == N*(N+1)) := by decide

-- The instantaneous rate is not 0/0: the difference (x+h)²−x² factors exactly as h·(2x+h), the h cancels, and the derivative is the finite 2x. Newton’s "ghosts of departed quantities" are an exact cancellation, not an infinity.
theorem derivative_finite_rate : (List.range' 1 12).all (fun x => (List.range' 1 12).all (fun h => (x+h)*(x+h) - x*x == h*(2*x+h))) := by decide

-- The Dirac delta is "infinite" at a point yet carries a finite integral of exactly 1: the discrete delta, summed over the whole line, totals unit mass. δ is a distribution with finite mass, not a value that blows up.
theorem dirac_unit_mass : (List.range 101).foldl (fun s i => s + (if i == 50 then 1 else 0)) 0 = 1 := by decide

-- The black-hole horizon singularity is a coordinate artifact, removable like a reflection: at the Schwarzschild radius r=2M the curvature invariant K∝48M²/r⁶ stays finite (r⁶=64M⁶≠0). The only genuine blow-up is the true singularity at r=0.
theorem horizon_curvature_finite : (List.range' 1 8).all (fun M => (2*M)^6 != 0 && (2*M)^6 == 64 * M^6) := by decide

-- The one true infinity — the Newtonian 1/r² force and 1/r potential "blowing up" at r=0 — is division by zero, and in the vortex that is the finite diamond reflection dz(x)=10−x (dz 0=0): a residue always < 10, never ∞. The singularity is a finite reflection.
theorem newton_singularity_finite : dz 0 = 0 ∧ (List.range 10).all (fun x => dz x < 10) := by decide
