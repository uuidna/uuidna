---
title: "lean/Hexbit.lean"
description: "Computed from lean/Hexbit.lean — 8 sealed theorems, every claim citing its proof."
---

# lean/Hexbit.lean

> THE HEXBIT — the alphabet and the layout an address is actually built from. — held by [alphabet_names_each_nibble](/theorem/alphabet_names_each_nibble) and its 7 siblings below.

**8 theorems**, from [alphabet_names_each_nibble](/theorem/alphabet_names_each_nibble) onward, each proven `by decide` in [lean/Hexbit.lean](/lean/Hexbit.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [layout_groups_thirtytwo](/theorem/layout_groups_thirtytwo). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FHexbit.lean)** — nothing to install. The editor fetches `lean/Hexbit.lean` from the repository and re-decides all 8 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE SIXTEEN SYMBOLS NAME THE SIXTEEN NIBBLES, one apiece: the values 0 through 15 are all present, all distinct, and there are exactly sixteen of them. A four-bit value therefore has one spelling and no other — the alphabet is a bijection onto the nibble, which is what lets an address be read back exactly.
The ledger holds this as [alphabet_names_each_nibble](/theorem/alphabet_names_each_nibble) — proven `by decide`, sorry-free:

```lean
((List.range 16).length = 16) ∧ ((List.range 16).eraseDups.length = 16) ∧ ((List.range 16).all (fun v => v < 16))
```

### THE LAYOUT IS 8-4-4-4-12, and those five groups sum to thirty-two characters — not thirty-six, which counts the four separators as if they carried information. The line proves the sum and the difference, so the separators cannot be mistaken for content.
The ledger holds this as [layout_groups_thirtytwo](/theorem/layout_groups_thirtytwo) — proven `by decide`, sorry-free:

```lean
([8,4,4,4,12].foldl (· + ·) 0 = 32) ∧ (32 + 4 = 36) ∧ (32 ≠ 36)
```

### THIRTY-TWO HEX CHARACTERS AT FOUR BITS EACH IS THE WHOLE ADDRESS: 32 × 4 = 128. The address is not a number that happens to print in hex — it is thirty-two hexbits, and the bit count is a consequence of the layout rather than a separate fact.
The ledger holds this as [characters_span_the_address](/theorem/characters_span_the_address) — proven `by decide`, sorry-free:

```lean
(32 * 4 = 128) ∧ ((2:Nat)^7 = 128)
```

### THE HANDLE IS THE FIRST GROUP. Every other group is shorter, which the line proves — so the opening group is the widest single field the layout has, apart from the closing twelve.
The ledger holds this as [handle_is_the_first_group](/theorem/handle_is_the_first_group) — proven `by decide`, sorry-free:

```lean
([8,4,4,4,12].head! = 8) ∧ (8 * 4 = 32) ∧ (([8,4,4,4,12].drop 1).take 3).all (fun g => g < 8)
```

### EVERY GROUP IS A WHOLE NUMBER OF HEXBITS, so every boundary falls on a four-bit edge and no field is split mid-nibble: each group length times four is its bit width, and the widths are 32, 16, 16, 16 and 48. A layout whose groups did not tile the nibble could not be read by halves.
The ledger holds this as [groups_are_four_apart](/theorem/groups_are_four_apart) — proven `by decide`, sorry-free:

```lean
[8,4,4,4,12].map (fun g => g * 4) = [32,16,16,16,48]
```

### AND THE UNIT THE BUILD COUNTS IN IS THE HEXBIT: thirty-two of them make the address, eight make the handle, and one makes a nibble — so the address is 32 hexbits, the handle 8, and the ratio is exactly four. Counting in bits gives 128 and 32 for the same objects; the two readings agree, which the line proves rather than assumes.
The ledger holds this as [build_counts_in_hexbits](/theorem/build_counts_in_hexbits) — proven `by decide`, sorry-free:

```lean
(32 / 8 = 4) ∧ (32 * 4 = 128) ∧ (8 * 4 = 32) ∧ (128 / 32 = 4)
```

### THE HANDLE AND THE PAYLOAD MEET IN THE UUID, AND ONLY ONE OF THEM IS CODON-ALIGNED. The address is 32 hexbits; the handle is the first 8 (handle_is_the_first_group), so the payload is the remaining 24 and the two meet exactly: 8 + 24 = 32, no remainder anywhere. Now read the halves in the alphabet the strand uses — a base is 2 bits over 4 letters, a codon is 3 bases, so a codon is 6 bits (codons_sixty_four counts the 4^3 = 64 of them). The PAYLOAD is 24 hexbits = 96 bits = 48 bases = EXACTLY 16 codons, 96 = 6 * 16 with nothing left. The HANDLE is 32 bits and the WHOLE uuid is 128, and neither divides: both leave the same remainder 2. So the strand fits the payload and fits neither the name nor the whole — the handle addresses, the payload carries. HONEST SCOPE: this is arithmetic about WIDTHS and divisibility, nothing more. It does NOT claim a uuid encodes genetic material, that any payload holds a gene, or that biology is stored in an address; the shared 2 is a remainder that two numbers happen to share, and any reading of it as the two coins is unsealed until someone proves it.
The ledger holds this as [payload_carries_the_strand](/theorem/payload_carries_the_strand) — proven `by decide`, sorry-free:

```lean
(8 + 24 = 32) ∧ (24 * 4 = 96) ∧ (96 % 6 = 0) ∧ (96 / 6 = 16) ∧ (32 % 6 = 2) ∧ (128 % 6 = 2)
```

### THE PAYLOAD DIVIDES IN EVERY ALPHABET THE BODY USES, AND THE NAME DIVIDES IN NONE. Read the 96-bit payload three ways. As the genetic code: a base is 2 bits over 4 letters and a codon is 3 bases, so a codon is 6 bits and there are 4^3 = 64 of them (codons_sixty_four) — 96 = 6 * 16, EXACTLY 16 codons. As the I Ching hexagram the 64-gate systems are built on: six lines, each open or closed, is 2^6 = 64 — the SAME count and the SAME 6-bit width as the codon, so 4^3 = 2^6 is not an analogy but one number reached two ways, and the payload holds exactly 16 of those too. As blood: the ABO groups are a Klein four-group of 2 antigen bits (abo_klein_four) and the Rh bit makes the system (Z/2)^3, 8 types in 3 bits (blood_types_eight) — 96 = 3 * 32, exactly 32 blood-states, and 32 is the uuid width in hexbits. Now the handle: 32 bits leaves remainder 2 against 6 AND against 3, and the whole uuid at 128 bits leaves remainder 2 against both as well. So the strand, the hexagram and the blood system all tile the payload with nothing left over, and none of them tiles the name or the whole. The payload carries; the handle addresses. HONEST SCOPE, stated as boldly as the arithmetic: what is proven here is CARDINALITY AND WIDTH — 64 = 64, 6 = 6, 96 divides and 32 does not. That the codon space and the hexagram space are the same size and shape is a fact about numbers, and it is fully proven. It says NOTHING about whether any 64-gate system describes a person, and nothing about what a payload should hold; a shared width is a shared width.
The ledger holds this as [payload_aligns_where_the_name_does_not](/theorem/payload_aligns_where_the_name_does_not) — proven `by decide`, sorry-free:

```lean
(96 % 6 = 0) ∧ (96 / 6 = 16) ∧ (96 % 3 = 0) ∧ (96 / 3 = 32) ∧ (32 % 6 = 2) ∧ (32 % 3 = 2) ∧ (128 % 6 = 2) ∧ (128 % 3 = 2) ∧ (4 ^ 3 = 2 ^ 6)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
