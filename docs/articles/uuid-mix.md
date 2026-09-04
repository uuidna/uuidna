---
title: "The uuid mix space"
description: "Computed from lean/UuidMix.lean — 2 sealed theorems, every claim citing its proof."
---

# The uuid mix space

> THE UUID MIX SPACE — the census of mixing the ten RFC 9562 uuid types (nil, v1…v8, max), folded to ONE quantum seal: the directed census doubles the pairs (10·9 = 2·45, because merge(a,b) ≠ merge(b,a)), the self-mixes complete the square (90 + 10 = 10²), and Pascal's row 10 folds to the 1024 lattice — the 10-qubit basis, whose dimension is already sealed as optimisation_space_is_qubit_dimension and is cited here, never re-sealed. the counting arithmetic of the mix space, not any uuid version's bit layout, and no cryptographic claim. — held by [uuid_mix_census_is_quantum](/theorem/uuid_mix_census_is_quantum) and its 1 siblings below.

**2 theorems**, from [uuid_mix_census_is_quantum](/theorem/uuid_mix_census_is_quantum) onward, each proven `by decide` in <a href="/lean/UuidMix.lean">lean/UuidMix.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 2 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [uuid_mix_census_is_quantum](/theorem/uuid_mix_census_is_quantum). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FUuidMix.lean)** — nothing to install. The editor fetches `lean/UuidMix.lean` from the repository and re-decides all 2 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The uuid mix census, one quantum seal: the directed census doubles the 45 pairs (10·9 = 2·45 — merge(a,b) ≠ merge(b,a), so both directions count, verified live as 90 distinct addresses); the 10 self-mixes complete the square (90 + 10 = 10²); and Pascal's row 10 — the mixes of every size, 1 empty through 1 total fusion — folds to exactly 1024, the 10-qubit lattice (dimension sealed as optimisation_space_is_qubit_dimension, cited not re-sealed). Three counts, one conjunction: the mix space is a qubit basis counted whole.
The ledger holds this as [uuid_mix_census_is_quantum](/theorem/uuid_mix_census_is_quantum) — proven `by decide`, sorry-free:

```lean
(10 * 9 = 2 * 45) ∧ (90 + 10 = 10 * 10) ∧ (1 + 10 + 45 + 120 + 210 + 252 + 210 + 120 + 45 + 10 + 1 = 1024)
```

### THE MIX SPACE IS ITS OWN MIRROR, AND THE MIRROR'S SIGNATURE IS ZERO. Pascal's row 10 — the count of mixes using exactly k of the ten types — reads the same forwards and backwards: choosing which k to include is the same act as choosing which 10−k to leave out, so the row is a palindrome by construction and not by coincidence. Its ALTERNATING sum vanishes: 1 − 10 + 45 − 120 + 210 − 252 + 210 − 120 + 45 − 10 + 1 = 0, which is the mirror's own signature — pair each mix with its complement, one of the pair has an even membership and the other odd, and they cancel exactly. The same fact counted forwards: the even-membership mixes number 1+45+210+210+45+1 = 512 and the odd-membership mixes 10+120+252+120+10 = 512, each exactly 2⁹, so the 1024 splits in half by PARITY and not merely by size. And the row has a unique maximum at its centre, 252 at k = 5 — the half-and-half mix is the most numerous, once, with no tie. this is the arithmetic of the census, the same scope as the theorem beside it — a statement about how many mixes there are of each size, never about what any mix MEANS or about any uuid version's bit layout.
The ledger holds this as [the_mix_space_is_its_own_mirror](/theorem/the_mix_space_is_its_own_mirror) — proven `by decide`, sorry-free:

```lean
([1,10,45,120,210,252,210,120,45,10,1] : List Nat).reverse = [1,10,45,120,210,252,210,120,45,10,1] ∧ (1 + 45 + 210 + 210 + 45 + 1 = 512) ∧ (10 + 120 + 252 + 120 + 10 = 512) ∧ (512 + 512 = 1024) ∧ (([1,10,45,120,210,252,210,120,45,10,1] : List Nat).filter (fun c => c == 252)).length = 1
```


::: warning 
THE UUID MIX SPACE — the census of mixing the ten RFC 9562 uuid types (nil, v1…v8, max), folded to ONE quantum seal: the directed census doubles the pairs (10·9 = 2·45, because merge(a,b) ≠ merge(b,a)), the self-mixes complete the square (90 + 10 = 10²), and Pascal's row 10 folds to the 1024 lattice — the 10-qubit basis, whose dimension is already sealed as optimisation_space_is_qubit_dimension and is cited here, never re-sealed. The boundary is confirmed by the wing's own sealed theorems — e.g. [uuid_mix_census_is_quantum](/theorem/uuid_mix_census_is_quantum) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
