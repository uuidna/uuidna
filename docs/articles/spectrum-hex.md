---
title: "lean/SpectrumHex.lean"
description: "Computed from lean/SpectrumHex.lean — 6 sealed theorems, every claim citing its proof."
---

# lean/SpectrumHex.lean

> THE COLOUR AS SIX HEXBITS — the spectrum sized in the unit the machine writes it in. — held by [colour_is_six_hexbits](/theorem/colour_is_six_hexbits) and its 5 siblings below.

**6 theorems**, from [colour_is_six_hexbits](/theorem/colour_is_six_hexbits) onward, each proven `by decide` in [lean/SpectrumHex.lean](/lean/SpectrumHex.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [channel_is_two_hexbits](/theorem/channel_is_two_hexbits). A boundary stated here is decided, not merely denied.

### A COLOUR IS SIX HEX CHARACTERS: #RRGGBB at four bits each is 24 bits, and 16^6 equals 2^24 exactly — the hexadecimal reading and the binary reading are one number, 16777216 colours.
The ledger holds this as [colour_is_six_hexbits](/theorem/colour_is_six_hexbits) — proven `by decide`, sorry-free:

```lean
(6 * 4 = 24) ∧ ((16:Nat)^6 = (2:Nat)^24) ∧ ((16:Nat)^6 = 16777216)
```

### EACH CHANNEL IS TWO HEXBITS — one byte, 256 levels — and three channels of eight bits close the twenty-four. The colour is not a number that prints in hex; it is three bytes, and the hex is how a byte is spelled.
The ledger holds this as [channel_is_two_hexbits](/theorem/channel_is_two_hexbits) — proven `by decide`, sorry-free:

```lean
(2 * 4 = 8) ∧ ((2:Nat)^8 = 256) ∧ (3 * 8 = 24) ∧ (3 * 2 = 6)
```

### THE GREYS ARE THE DIAGONAL: red, green and blue equal gives 256 colours out of 16777216 — one in 65536, which is 2^16. Two of the three channels carry no information on that diagonal, and the line proves the ratio rather than describing it.
The ledger holds this as [greys_are_one_in_sixtyfive_thousand](/theorem/greys_are_one_in_sixtyfive_thousand) — proven `by decide`, sorry-free:

```lean
((16:Nat)^6 / 256 = 65536) ∧ ((2:Nat)^16 = 65536) ∧ (256 * 65536 = 16777216)
```

### THE THREE-DIGIT SHORTHAND #RGB EXPANDS EACH CHARACTER TWICE, so it reaches 16^3 = 4096 colours — one in 4096 of the full space. A palette written in shorthand is not a small notation for all colours; it is a notation for a sixteen-thousandth of them.
The ledger holds this as [shorthand_covers_one_in_four_thousand](/theorem/shorthand_covers_one_in_four_thousand) — proven `by decide`, sorry-free:

```lean
((16:Nat)^3 = 4096) ∧ ((16:Nat)^6 / (16:Nat)^3 = 4096) ∧ ((16:Nat)^3 * 4096 = 16777216)
```

### THE HUE WHEEL DOES NOT DIVIDE BY SIXTEEN: 16 x 22 = 352 and 16 x 23 = 368 straddle 360, so no whole-degree step cuts the circle into sixteen. It divides by NINE at 40 degrees and by SIX at 60 — the storage is hexadecimal while the geometry is not, and the line proves the failure rather than leaving it implied.
The ledger holds this as [spectrum_refuses_sixteen](/theorem/spectrum_refuses_sixteen) — proven `by decide`, sorry-free:

```lean
(16 * 22 < 360) ∧ (360 < 16 * 23) ∧ (360 % 9 = 0) ∧ (360 % 6 = 0) ∧ (360 % 16 ≠ 0)
```

### THE DIVISORS THE WHEEL ADMITS below twenty are 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20 — nine and six among them, sixteen not. Forty degrees is the ninefold step the aura already walks, sixty the sextant of primaries and secondaries.
The ledger holds this as [wheel_divides_by_nine_and_six](/theorem/wheel_divides_by_nine_and_six) — proven `by decide`, sorry-free:

```lean
(((List.range' 1 20).filter (fun d => 360 % d == 0)) = [1,2,3,4,5,6,8,9,10,12,15,18,20]) ∧ (360 / 9 = 40) ∧ (360 / 6 = 60)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
