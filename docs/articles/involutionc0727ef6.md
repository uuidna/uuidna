---
title: "The involution of lead c0727ef6"
description: "Computed from lean/Involutionc0727ef6.lean — 2 sealed theorems, every claim citing its proof."
---

# The involution of lead c0727ef6

> INVOLUTION c0727ef6: lead c0727ef6 of lean/leads.json (refuted), stated as lead_c0727ef6 over the objects its source derives, and involution_c0727ef6, the kernel's proof of its negation. — held by [seam_census_c0727ef6](/theorem/seam_census_c0727ef6) and its 1 siblings below.

**2 theorems** and **2 decided cases**, from [seam_census_c0727ef6](/theorem/seam_census_c0727ef6) onward, each checked by the kernel in <a href="/lean/Involutionc0727ef6.lean">lean/Involutionc0727ef6.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 2 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [involution_c0727ef6](/theorem/involution_c0727ef6). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FInvolutionc0727ef6.lean)** — nothing to install. The editor fetches `lean/Involutionc0727ef6.lean` from the repository and re-decides all 2 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The census the refutation rests on: the tour has 2 seams and its dz-mirror has 9 — every step of the mirror is a seam, so no map can carry two onto nine.
The ledger holds this as [seam_census_c0727ef6](/theorem/seam_census_c0727ef6) — proven `by decide`, sorry-free:

```lean
(seamPairs tour).length = 2 ∧ (seamPairs (tour.map dz)).length = 9 ∧ (tour.map dz).length = 9
```

### The seams reflect (row1's seams map onto row2's under the mirror) — REFUTED: applying the tour's own law to the mirrored row gives 9 seams where the lead's image gives 2, so the seams do not reflect.
The ledger holds this as [involution_c0727ef6](/theorem/involution_c0727ef6) — proven `by unfold`, sorry-free:

```lean
¬ lead_c0727ef6
```


::: warning 
INVOLUTION c0727ef6: lead c0727ef6 of lean/leads. The boundary is confirmed by the wing's own sealed theorems — e.g. [seam_census_c0727ef6](/theorem/seam_census_c0727ef6) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
