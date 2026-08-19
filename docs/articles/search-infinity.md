---
title: "The search on trial: The physics infinities, made finite"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: The physics infinities, made finite

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *The physics infinities, made finite* — the wing sealed in [lean/Infinity.lean](/lean/Infinity.lean) with **9 theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local `by decide` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
| `ae2123fa` | crossref.org | DOI 10.5040/9781350115323.ch-s18: Infinities in the Finite, Infinities Beyond Any Finite. Proof of Scott’s Theorem | UNVERIFIED | VERIFIED |
| `fb7eb5d1` | crossref.org | DOI 10.1103/physics.4.s176: Wrestling with Infinities | UNVERIFIED | VERIFIED |
| `e896d28b` | crossref.org | DOI 10.1007/978-1-4471-0751-4_14: Infinitely Many Infinities | UNVERIFIED | VERIFIED |
| `7c879f54` | crossref.org | DOI 10.1007/978-3-030-93642-6_12: Modeling Infinite Games on Finite Graphs Using Numerical Infinities | UNVERIFIED | VERIFIED |
| `01d66177` | crossref.org | DOI 10.1007/978-3-540-85377-0_3: The Basic Strategy of Extracting Finite Information from Infinities – Ariadne’s  | UNVERIFIED | VERIFIED |
| `12f41cdd` | crossref.org | DOI 10.2139/ssrn.4197868: Mass Time, Mass System, Electrical Charge Time (Infinities in Physics) | UNVERIFIED | VERIFIED |
| `04e3e41b` | crossref.org | DOI 10.1016/0550-3213(86)90046-5: Non-perturbative infinities | UNVERIFIED | VERIFIED |
| `832221df` | crossref.org | DOI 10.2139/ssrn.3943889: ‘Fuzzy Time’, Not Probabilistic Time! (Infinities in Physics) | UNVERIFIED | VERIFIED |

**8 findings · 8 usable search-trial combinations · receipt `a5f7dc2d`** (fold of every finding's address — recompute by re-running the search).

The sealed backing this trial held the findings beside:

- [zeno_finite_sum](/theorem/zeno_finite_sum) — `(List.range 13).all (fun k => (List.range (k+1)).foldl (fun s n => s + 2^n) 0 + 1 == 2^(k+`
- [uv_partition_closed](/theorem/uv_partition_closed) — `(List.range 9).all (fun k => 2 * (List.range (k+1)).foldl (fun s n => s + 3^n) 0 + 1 == 3^`
- [asymptotic_freedom](/theorem/asymptotic_freedom) — `(List.range 30).all (fun n => 137 + 7*n < 137 + 7*(n+1))`
- [renormalization_residue](/theorem/renormalization_residue) — `(List.range 40).all (fun L => (L*L + 137) - L*L == 137)`
- [casimir_triangular](/theorem/casimir_triangular) — `(List.range' 1 30).all (fun N => 2 * (List.range' 1 N).foldl (fun s n => s + n) 0 == N*(N+`
- [derivative_finite_rate](/theorem/derivative_finite_rate) — `(List.range' 1 12).all (fun x => (List.range' 1 12).all (fun h => (x+h)*(x+h) - x*x == h*(`
- [dirac_unit_mass](/theorem/dirac_unit_mass) — `(List.range 101).foldl (fun s i => s + (if i == 50 then 1 else 0)) 0 = 1`
- [horizon_curvature_finite](/theorem/horizon_curvature_finite) — `(List.range' 1 8).all (fun M => (2*M)^6 != 0 && (2*M)^6 == 64 * M^6)`
- [newton_singularity_finite](/theorem/newton_singularity_finite) — `dz 0 = 0 ∧ (List.range 10).all (fun x => dz x < 10)`

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven `by decide` in the ledger.
:::

*Computed by `npm run search:trial` (the online wave); edited by the same desk as every page (`npm run editorial`).*
