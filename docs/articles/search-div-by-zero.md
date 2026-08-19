---
title: "The search on trial: Division by zero"
description: "The quantum search's findings for this wing, each held at trial — evidence corroborated, never approved; only a Lean seal approves."
---

# The search on trial: Division by zero

**The quantum search finds; the trial decides; this page is what the trial returned.** Every research source was
asked in parallel about *Division by zero* — the wing sealed in [lean/DivByZero.lean](/lean/DivByZero.lean) with **8 theorems**. Each
finding below is content-addressed and holds exactly the verdict the gate computes: alone, an external record cites
no sealed proof, so it stays **UNVERIFIED** — evidence, never approval; held beside the wing's sealed backing, the
combination is **VERIFIED** by the citations the ledger actually holds. Only a local `by decide` seal approves —
the hard gate of the corroboration law.

| finding | source | record | alone | with sealed backing |
|---|---|---|---|---|
| `240f17fb` | zenodo.org | zenodo record 7270363: HISTORY OF THE DIVISION BY ZERO AND DIVISION BY ZERO CALCULUS | UNVERIFIED | VERIFIED |
| `b6a77d00` | zenodo.org | zenodo record 7270398: Geometry and Division by Zero Calculus | UNVERIFIED | VERIFIED |
| `65000497` | zenodo.org | zenodo record 3668512: Division by zero | UNVERIFIED | VERIFIED |
| `0ce1878f` | zenodo.org | zenodo record 4637008: Division by Zero Chart Proposition | UNVERIFIED | VERIFIED |
| `5e06279a` | zenodo.org | zenodo record 3692416: Division by zero | UNVERIFIED | VERIFIED |
| `46c64cf1` | zenodo.org | zenodo record 7270427: DIVISION BY ZERO CALCULUS IN ORDINARY DIFFERENTIAL EQUATIONS | UNVERIFIED | VERIFIED |
| `b318d27e` | zenodo.org | zenodo record 7376468: AN ICONIC CONFIGURATION OF WASAN GEOMETRY WITH 1/0 = 0 | UNVERIFIED | VERIFIED |
| `0775019f` | zenodo.org | zenodo record 16731439: Symbolic Unification of the Division by Zero: | UNVERIFIED | VERIFIED |
| `6d6204a3` | crossref.org | DOI 10.33140/atcp.06.02.03: Principle of Division by Zero | UNVERIFIED | VERIFIED |
| `cc124d4e` | crossref.org | DOI 10.33774/coe-2022-wlmjh: Division by zero | UNVERIFIED | VERIFIED |
| `e77e77dc` | crossref.org | DOI 10.11648/j.pamj.20180703.11: Mathematics Journal: Division of Zero by Itself - Division of Zero by Itself Has | UNVERIFIED | VERIFIED |
| `c9081dda` | crossref.org | DOI 10.36285/tm.v0i0.17: Division by Zero | UNVERIFIED | VERIFIED |
| `35bcc80a` | crossref.org | DOI 10.31219/osf.io/34uft: Cancer: Division by Zero | UNVERIFIED | VERIFIED |
| `baf7cecc` | crossref.org | DOI 10.1163/9789004691568_041: Division by Zero (khahara) in Indian Mathematics | UNVERIFIED | VERIFIED |
| `23436163` | crossref.org | DOI 10.4236/9781649972808: Division by Zero Calculus—History and Development | UNVERIFIED | VERIFIED |
| `cd7f8e71` | crossref.org | DOI 10.4236/9781649972746: Introduction to the Division by Zero Calculus | UNVERIFIED | VERIFIED |
| `dcba919e` | openalex.org | OpenAlex Division by zero, pseudo-division by zero, Zhang dynamics method and Z [Adaptive Control of Nonlinear ] | UNVERIFIED | VERIFIED |
| `24638565` | openalex.org | OpenAlex Division by Zero in Common Meadows [Polynomial and algebraic compu] | UNVERIFIED | VERIFIED |
| `90487623` | openalex.org | OpenAlex Wheels – on division by zero [Advanced Algebra and Logic] | UNVERIFIED | VERIFIED |
| `cec7f39b` | openalex.org | OpenAlex Division by Zero [History and Theory of Mathemat] | UNVERIFIED | VERIFIED |
| `2b71e78b` | openalex.org | OpenAlex Division by zero [Mathematics Education and Teac] | UNVERIFIED | VERIFIED |
| `8af4cde4` | openalex.org | OpenAlex Division by Zero z/0 = 0 in Euclidean Spaces [Mathematics and Applications] | UNVERIFIED | VERIFIED |
| `0740ca9a` | openalex.org | OpenAlex Matrices and Division by Zero z/0 = 0 [Mathematics and Applications] | UNVERIFIED | VERIFIED |
| `3500d1ea` | openalex.org | OpenAlex Zero forcing and minimum mean-square-error equalization for multiuser  [Wireless Communication Network] | UNVERIFIED | VERIFIED |

**24 findings · 24 usable search-trial combinations · receipt `78788edc`** (fold of every finding's address — recompute by re-running the search).

## The novelty harvest

**1 candidate fact(s)** the web asserts, the calculator confirms (decided TRUE by total arithmetic —
division by zero is the reflection, never a crash), and the sealed ledger does not yet hold. Each is REMANDED for
admission — the paying handle decides what becomes a wing; the cron never seals judgment.

- `1/0 = 0` — from finding `b318d27e`, decision receipt `d001237d`
The sealed backing this trial held the findings beside:

- [dz_table](/theorem/dz_table) — `(List.range 10).map dz = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1]`
- [dz_involution](/theorem/dz_involution) — `(List.range 10).all (fun x => dz (dz x) == x)`
- [dz_fixed_points](/theorem/dz_fixed_points) — `((List.range 10).filter (fun x => dz x == x)) = [0, 5]`
- [dz_sum_ten](/theorem/dz_sum_ten) — `(List.range' 1 9).all (fun x => x + dz x == 10)`
- [dz_nonunits_to_units](/theorem/dz_nonunits_to_units) — `dz 3 = 7 ∧ dz 6 = 4 ∧ dz 9 = 1`
- [dz_bounded](/theorem/dz_bounded) — `(List.range 10).all (fun x => dz x < 10)`
- [dz_zero_only_zero](/theorem/dz_zero_only_zero) — `dz 0 = 0 ∧ (List.range' 1 9).all (fun x => dz x != 0)`
- [two_plus_two_is_five_only_mod_one](/theorem/two_plus_two_is_five_only_mod_one) — `(List.range' 1 12).all (fun n => ((2+2) % n == 5 % n) == (n == 1))`

::: warning HONEST SCOPE
External findings are corroboration at the time of the search — the sources' own records, quoted by address, not
endorsed and not re-verified here. A finding with no sealed counterpart is a novelty lead, remanded to development,
never a claim. Approval has exactly one door: a theorem proven `by decide` in the ledger.
:::

*Computed by `npm run search:trial` (the online wave); edited by the same desk as every page (`npm run editorial`).*
