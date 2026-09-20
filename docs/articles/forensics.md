---
title: "The forensic odds"
description: "Computed from lean/Forensics.lean — 3 sealed theorems, every claim citing its proof."
---

# The forensic odds

> FORENSICS — the odds a forger faces, against the ledger and the store as they stand. A framed address must be one of the 71,022 sealed v8 addresses (122 free bits), so a guess hits with odds below 2^-105; a guessed handle hits one of 71,626 leaves with odds below 2^-15; and 16-bit handles would already collide by pigeonhole, the control that shows the bound can fail. The detectors are src/forensics.ts and AntiFraud.lean; this wing seals their margin. NOT CLAIMED: that a forger guesses uniformly, or anything about the hash beyond its output layout. — held by [forged_address_odds_are_negligible](/theorem/forged_address_odds_are_negligible) and its 2 siblings below.

**3 theorems** and **3 decided cases**, from [forged_address_odds_are_negligible](/theorem/forged_address_odds_are_negligible) onward, each proven `by decide` in <a href="/lean/Forensics.lean">lean/Forensics.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 3 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [forged_address_odds_are_negligible](/theorem/forged_address_odds_are_negligible). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FForensics.lean)** — nothing to install. The editor fetches `lean/Forensics.lean` from the repository and re-decides all 3 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### A GUESSED ADDRESS DOES NOT LAND. The ledger holds 71,022 distinct addresses, every one a v8 uuid with 122 free bits, so a forger who invents an address and frames it as sealed hits a real one with odds below 2^-105: 71,022 × 2^105 < 2^122. forensics() flags every miss as a false address — run here on a forged address (flagged) and a sealed one (passed) — so a false trial cannot survive except by that chance, and the chance is sealed. Counted from the ledger at generation, never typed.
The ledger holds this as [forged_address_odds_are_negligible](/theorem/forged_address_odds_are_negligible) — proven `by decide`, sorry-free:

```lean
71022 * 2 ^ 105 < 2 ^ 122
```

### A GUESSED HANDLE RARELY LANDS EITHER. The handle store holds 71,626 leaves in a 32-bit handle space, so a guessed handle names an occupied leaf with odds below 2^-15: 71,626 × 2^15 < 2^32. The odds are far weaker than an address's, which is why a handle is only ever the PATH to a leaf and the leaf itself carries the full uuid that forensics() checks.
The ledger holds this as [forged_handle_odds_are_small](/theorem/forged_handle_odds_are_small) — proven `by decide`, sorry-free:

```lean
71626 * 2 ^ 15 < 2 ^ 32
```

### THE CONTROL: THE BOUND CAN FAIL. With 16-bit handles the store's 71,626 leaves would outnumber the 65,536 handles available, so two leaves would be forced to share one — pigeonhole, not chance — and the store refuses any collision. The odds above are a property of the widths chosen, and a width too small is refuted by the same arithmetic; that is why a handle carries 32 bits.
The ledger holds this as [sixteen_bit_handles_would_collide](/theorem/sixteen_bit_handles_would_collide) — proven `by decide`, sorry-free:

```lean
71626 > 2 ^ 16
```


::: warning 
FORENSICS — the odds a forger faces, against the ledger and the store as they stand. The boundary is confirmed by the wing's own sealed theorems — e.g. [forged_address_odds_are_negligible](/theorem/forged_address_odds_are_negligible) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
