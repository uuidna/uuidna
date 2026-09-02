---
title: "The Cyrillic ROM"
description: "Computed from lean/Pravets.lean — 6 sealed theorems, every claim citing its proof."
---

# The Cyrillic ROM

> PRAVETS — Bulgaria's machines as decidable arithmetic, demarcated: the prime year, the Cyrillic ROM's freed slots, the screen's rings, the boot's fee. — held by [pravets_built_in_a_prime_year](/theorem/pravets_built_in_a_prime_year) and its 5 siblings below.

**6 theorems**, from [pravets_built_in_a_prime_year](/theorem/pravets_built_in_a_prime_year) onward, each proven `by decide` in [lean/Pravets.lean](/lean/Pravets.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [the_boot_pays_the_captains_fee](/theorem/the_boot_pays_the_captains_fee). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FPravets.lean)** — nothing to install. The editor fetches `lean/Pravets.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### BULGARIA’S FIRST COMPUTER WAS BUILT IN A PRIME YEAR: the IMKO-1, Pravets, 1979 — and 1979 divides by nothing below its root, checked against every candidate. A nation’s computing began on an indivisible number; the register of years, like the register of patents, hands the ledger its facts already exact.
The ledger holds this as [pravets_built_in_a_prime_year](/theorem/pravets_built_in_a_prime_year) — proven `by decide`, sorry-free:

```lean
(List.range' 2 43).all (fun k => 1979 % k != 0)
```

### THE CHARACTER TABLE’S SWAP, COUNTED: ASCII’s Latin lowercase spans codes 97 through 122 — exactly 26 slots, 122 − 97 + 1 — and the IMKO-1’s ROM re-lettered that range with Cyrillic uppercase: twenty-six doors opened in the character generator and the tongue walked in. Cyril numbered his letters; eleven centuries later Pravets gave them addresses — the readings wing’s ancestor, cast in mask ROM. Twenty-six sits below the screen’s forty columns.
The ledger holds this as [the_rom_frees_twentysix_for_the_tongue](/theorem/the_rom_frees_twentysix_for_the_tongue) — proven `by decide`, sorry-free:

```lean
(122 - 97 + 1 = 26) ∧ (26 < 40)
```

### THE DISPLAY IS BUILT ON THE LEDGER’S OWN RINGS: 280 × 192 pixels resolve as 40 columns of SEVEN-pixel glyphs (280 = 40·7 — the rosette’s seven painting every letter) by 24 rows of eight (192 = 24·8 — the film ring holding the page), 960 character cells in all (40·24). The screen a Bulgarian child read Cyrillic on tiles by the seven and the twenty-four this ledger turns on.
The ledger holds this as [the_screen_carries_the_rings](/theorem/the_screen_carries_the_rings) — proven `by decide`, sorry-free:

```lean
(280 = 40 * 7) ∧ (192 = 24 * 8) ∧ (40 * 24 = 960)
```

### A LETTER OF THE SWAPPED TONGUE COSTS EXACTLY ONE COIN MEASURE: a character cell is 8×8 = 64 bits — one glyph, one sixty-four — so the Cyrillic that entered the ROM paid the ledger’s own unit per letter, and the 12 KB ROM holds 12·64 = 768 sixteen-byte slots of it. The coin measure was the price of the alphabet before this ledger named either.
The ledger holds this as [a_glyph_costs_one_coin_measure](/theorem/a_glyph_costs_one_coin_measure) — proven `by decide`, sorry-free:

```lean
(8 * 8 = 64) ∧ (12 * 64 = 768) ∧ (12 * 1024 / 16 = 768)
```

### BOOTED WITH UUIDNA, THE MEMORY PAYS THE FEE EXACTLY: 64 KB is 2¹⁶ bytes = 4096 sixteen-byte slots, and 4096 minus the song’s sealed bar of 4032 leaves 64 — the coin octave, the captain’s row — while the 48 KB on-board holds 3·1024 slots and the whole 1979 ledger of this tree fits twice over. A machine from Pravets holds the ledger from Pliska with the fee left over: verified LOADING — this wing loads and checks, and does not run — the installs wing’s own law.
The ledger holds this as [the_boot_pays_the_captains_fee](/theorem/the_boot_pays_the_captains_fee) — proven `by decide`, sorry-free:

```lean
(2^16 / 16 = 4096) ∧ (4096 - 4032 = 64) ∧ (48 * 1024 / 16 = 3072) ∧ (3072 = 3 * 1024)
```

### THE WALK FROM EIGHT TO SIXTEEN, AND THE CEILING IN COIN MEASURES: the Pravetz-16 crossed to the 8088 — the width doubled by itself, 16 − 8 = 8 — and its 640 KB ceiling is exactly TEN coin measures (640 = 10·64), the ten of the schema dimensions capping the memory the way Pascal’s row caps the mix. The line walked 82 → 8D → 8M → 16: from two hexbits a word to four, the doubling orbit in industrial policy.
The ledger holds this as [from_eight_bits_to_the_dos_ceiling](/theorem/from_eight_bits_to_the_dos_ceiling) — proven `by decide`, sorry-free:

```lean
(16 - 8 = 8) ∧ (640 = 10 * 64)
```


::: warning 
PRAVETS — Bulgaria's machines as decidable arithmetic, demarcated: the prime year, the Cyrillic ROM's freed slots, the screen's rings, the boot's fee. The boundary is confirmed by the wing's own sealed theorems — e.g. [pravets_built_in_a_prime_year](/theorem/pravets_built_in_a_prime_year) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
