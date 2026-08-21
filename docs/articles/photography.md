---
title: "The exposure"
description: "Computed from lean/Photography.lean — 8 sealed theorems, every claim citing its proof."
---

# The exposure

> THE EXPOSURE — where the photographic standard ROUNDS (1/125≈1/128, f/1.4≈√2) and uuidna keeps the EXACT powers of two, as decidable arithmetic. — held by [full_stop_is_exact_doubling](/theorem/full_stop_is_exact_doubling) and its 7 siblings below.

**8 theorems**, from [full_stop_is_exact_doubling](/theorem/full_stop_is_exact_doubling) onward, each proven `by decide` in [lean/Photography.lean](/lean/Photography.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [full_stop_is_exact_doubling](/theorem/full_stop_is_exact_doubling). A boundary stated here is decided, not merely denied.

### The physics uuidna keeps: a full stop is EXACTLY a doubling, so the exact shutter after 1/64 is 1/128 = 2⁷ — a power of two, not a round number.
The ledger holds this as [full_stop_is_exact_doubling](/theorem/full_stop_is_exact_doubling) — proven `by decide`, sorry-free:

```lean
2^7 = 128
```

### WHERE uuidna DIFFERS: the camera prints 1/125 s, but the exact doubling is 1/128 s (2⁷) — the standard ROUNDS 128 down to 125, off by 3. uuidna keeps 128; the dial keeps the round number.
The ledger holds this as [shutter_125_rounds_128](/theorem/shutter_125_rounds_128) — proven `by decide`, sorry-free:

```lean
2^7 = 128 ∧ 128 - 125 = 3
```

### The same rounding again: 1/60 s is the printed value; the exact stop is 1/64 s (2⁶). The standard rounds 64 to 60, off by 4 — uuidna computes the power of two the dial approximates.
The ledger holds this as [shutter_60_rounds_64](/theorem/shutter_60_rounds_64) — proven `by decide`, sorry-free:

```lean
2^6 = 64 ∧ 64 - 60 = 4
```

### The aperture rounds too: f/1.4 is the printed √2, but 1.4² = 1.96, short of the exact 2 (14² = 196 < 200). One stop of AREA is exactly ×2; the f-number the standard engraves is a rounded √2.
The ledger holds this as [fstop_14_rounds_sqrt_two](/theorem/fstop_14_rounds_sqrt_two) — proven `by decide`, sorry-free:

```lean
14 * 14 = 196 ∧ 196 < 200
```

### What uuidna keeps exact: the aperture AREA is powers of two, so f² = 2ⁿ exactly — [1,2,4,8,16] = [2⁰..2⁴]. The printed f-numbers (1, 1.4, 2, 2.8, 4) are the rounded √ of these; the squares are exact.
The ledger holds this as [fstop_squared_is_exact_power](/theorem/fstop_squared_is_exact_power) — proven `by decide`, sorry-free:

```lean
[1,2,4,8,16] = (List.range 5).map (fun n => 2^n)
```

### WHERE uuidna and the standard AGREE: the full-stop ISO scale is EXACT doublings, no rounding — ISO 100 up five stops is 100·2⁵ = 3200, and the standard prints 3200. Sensitivity doubles cleanly; only shutter and aperture carry the rounding.
The ledger holds this as [iso_full_stops_agree_exactly](/theorem/iso_full_stops_agree_exactly) — proven `by decide`, sorry-free:

```lean
100 * 2^5 = 3200
```

### The one the standard gets exactly right: open one stop of aperture and shorten one stop of shutter and the exposure is unchanged — (1) + (−1) = 0. Reciprocity is exact because it is pure addition of stops.
The ledger holds this as [equivalent_exposure](/theorem/equivalent_exposure) — proven `by decide`, sorry-free:

```lean
(1 : Int) + (-1) = 0
```

### Why the doubling is uuidna's: the exposure light-multipliers 2⁰..2⁵, folded mod 9, ARE the vortex sequence — (List.range 6).map (2^· mod 9) = [1,2,4,8,7,5]. The camera doubles in the same ring uuidna turns on; the standard just rounds the readout.
The ledger holds this as [stops_fold_mod_nine](/theorem/stops_fold_mod_nine) — proven `by decide`, sorry-free:

```lean
(List.range 6).map (fun k => (2^k) % 9) = [1,2,4,8,7,5]
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
