---
title: "The search on trial: lean/Seats.lean"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: lean/Seats.lean

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *lean/Seats.lean* — the wing sealed in [lean/Seats.lean](/lean/Seats.lean) with **6 theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local `by decide` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
| `ae48480b` | crossref.org | DOI 10.1016/s0123-5923(07)70026-8: MEDICIÓN EN LEAN MANUFACTURING: RELACIONES ENTRE ACTIVIDADES LEAN Y MÉTRICAS LEA | UNVERIFIED | VERIFIED |
| `19a536ed` | crossref.org | DOI 10.1002/9781119271703.ch4: Lean Enterprise vs. Lean Manufacturing | UNVERIFIED | VERIFIED |
| `c6cc659b` | crossref.org | DOI 10.56238/revgeov16n5-155: DO LEAN AO LEAN 4.0: UMA REVISÃO CRÍTICA DO LEAN THINKING NA GESTÃO EMPRESARIAL  | UNVERIFIED | VERIFIED |
| `7e31cf18` | crossref.org | DOI 10.5040/9781350891289: Pitcher's Lean | UNVERIFIED | VERIFIED |
| `00a4f0a7` | crossref.org | DOI 10.1201/b15730-6: The Economics of Lean | UNVERIFIED | VERIFIED |
| `87674b6c` | crossref.org | DOI 10.4324/9781420080971-12: Leading a Lean Operation | UNVERIFIED | VERIFIED |
| `8c228c78` | crossref.org | DOI 10.1002/9781119271703.ch8: The Lean Mindset | UNVERIFIED | VERIFIED |
| `954af3ae` | crossref.org | DOI 10.5772/intechopen.97573: Introduction to Lean Waste and Lean Tools | UNVERIFIED | VERIFIED |

**8 findings · 8 usable search-trial combinations · receipt `08304df6`** (fold of every finding's address — recompute by re-running the search).

The sealed backing this trial held the findings beside:

- [fullest_seat_ceiling](/theorem/fullest_seat_ceiling) — `seatCases.map (fun c => fullest c.1 c.2) = [2,3,12,1,1]`
- [excess_forces_sharing](/theorem/excess_forces_sharing) — `(seatCases.filter (fun c => c.1 > c.2)).all (fun c => fullest c.1 c.2 ≥ 2)`
- [fit_shares_nothing](/theorem/fit_shares_nothing) — `(seatCases.filter (fun c => c.1 ≤ c.2)).all (fun c => fullest c.1 c.2 = 1)`
- [powers_are_not_the_bound](/theorem/powers_are_not_the_bound) — `((2:Nat)^8 ≠ (11 + 10 - 1) / 10) ∧ ((2:Nat)^10 ≠ (21 + 10 - 1) / 10)`
- [digits_split_five_five](/theorem/digits_split_five_five) — `(([2,6,7,8,9] ++ [0,1,3,4,5]).length = 10) ∧ ((List.range 10).all (fun d => ([2,6,7,8,9] +`
- [ten_seats_bound_any_ring](/theorem/ten_seats_bound_any_ring) — `(11 > 10) ∧ ((11 + 10 - 1) / 10 ≥ 2)`

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven `by decide` in the ledger.
:::

*Computed by `npm run search:trial` (the online wave); edited by the same desk as every page (`npm run editorial`).*
