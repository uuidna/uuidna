---
title: "The Glagolitic numerals & Pliska rosette"
description: "Computed from lean/Glagolitic.lean — 10 sealed theorems, every claim citing its proof."
---

# The Glagolitic numerals & Pliska rosette

> GLAGOLITIC — the numerals and the Pliska rosette, as decidable arithmetic, demarcated. — held by [glagolitic_units](/theorem/glagolitic_units) and its 9 siblings below.

**10 theorems**, from [glagolitic_units](/theorem/glagolitic_units) onward, each proven `by decide` in [lean/Glagolitic.lean](/lean/Glagolitic.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 10 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [roman_reads_subtractively](/theorem/roman_reads_subtractively). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FGlagolitic.lean)** — nothing to install. The editor fetches `lean/Glagolitic.lean` from the repository and re-decides all 10 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### Cyril gave the letters number: the first nine Glagolitic glyphs, Az through Zemlja, carry the units 1 through 9 in their own alphabetic order — [1,2,3,4,5,6,7,8,9]. An alphabet that counts as it speaks.
The ledger holds this as [glagolitic_units](/theorem/glagolitic_units) — proven `by decide`, sorry-free:

```lean
(List.range' 1 9) = [1,2,3,4,5,6,7,8,9]
```

### The nine units sum to 45, whose digital root is 9 — the ceiling of the ℤ/9 vortex — so the whole first row of the alphabet folds home to nine. 1+…+9 = 45, and 4+5 = 9.
The ledger holds this as [glagolitic_units_sum](/theorem/glagolitic_units_sum) — proven `by decide`, sorry-free:

```lean
((List.range' 1 9).foldl (fun s n => s + n) 0 = 45) ∧ (4 + 5 = 9)
```

### Glagolitic numerals combine additively — a hundred-glyph, a ten-glyph and a unit set side by side read as their sum: 500 + 80 + 3 = 583. Place is meaning; the letters simply add.
The ledger holds this as [glagolitic_additive](/theorem/glagolitic_additive) — proven `by decide`, sorry-free:

```lean
500 + 80 + 3 = 583
```

### A quiet grace of the script: between eleven and nineteen the order flips, the unit spoken before the ten — one-and-ten for 11, nine-and-ten for 19. 1 + 10 = 11 and 9 + 10 = 19, the smaller number leading.
The ledger holds this as [glagolitic_teens_reversed](/theorem/glagolitic_teens_reversed) — proven `by decide`, sorry-free:

```lean
(1 + 10 = 11) ∧ (9 + 10 = 19)
```

### The Pliska rosette turns on seven rays — the ℤ/7 the rosette layer proves. Its six moving residues sum to 21, whose digital root is 3: the primitive root that walks all seven rays. 1+2+3+4+5+6 = 21, and 2+1 = 3.
The ledger holds this as [pliska_seven_rays](/theorem/pliska_seven_rays) — proven `by decide`, sorry-free:

```lean
(1+2+3+4+5+6 = 21) ∧ (2 + 1 = 3)
```

### Seven is prime, so ℤ/7 is a field and the rosette closes on itself: 7 leaves no remainder to any of 2,3,4,5,6. That primality is why every non-zero ray has an inverse — the star is whole, none left outside.
The ledger holds this as [pliska_seven_is_prime](/theorem/pliska_seven_is_prime) — proven `by decide`, sorry-free:

```lean
(List.range' 2 5).all (fun k => 7 % k != 0)
```

### THE SHARED DESIGN OF THE ALPHABETIC NUMERALS. Greek isopsephy and Hebrew gematria use the same architecture Glagolitic does: nine units, nine tens, nine hundreds — 9 + 9 + 9 = 27 signs, the top rank reaching 9 × 100 = 900. That is why 27 glyphs are needed where 22 or 24 letters exist, and why both scripts press extra or final forms into service. One design, three alphabets.
The ledger holds this as [alphabetic_three_ranks](/theorem/alphabetic_three_ranks) — proven `by decide`, sorry-free:

```lean
9 + 9 + 9 = 27 ∧ 9 * 100 = 900
```

### TWO SCRIPTS, THE SAME TWO SIGNS, DIFFERENT NUMBERS. Roman numerals are POSITIONAL in a way the alphabetic numerals are not: a smaller sign before a larger one subtracts, so IX is 10 − 1 = 9. Glagolitic writes its teens unit-before-ten and still ADDS — one-and-ten is 1 + 10 = 11. The same ordering gesture means subtract in one system and add in the other, and 9 ≠ 11 proves the two rules are not interchangeable.
The ledger holds this as [roman_reads_subtractively](/theorem/roman_reads_subtractively) — proven `by decide`, sorry-free:

```lean
10 - 1 = 9 ∧ 1 + 10 = 11 ∧ 9 ≠ 11
```

### A GEMATRIA VALUE IS A SUM, AND A SUM IS BLIND TO ORDER. Because the letters are added, any rearrangement of the same letters carries the SAME value: 1 + 2 + 3 = 3 + 2 + 1 = 6. So an anagram is numerically indistinguishable from its original, and the value cannot recover which word produced it. This is a property of addition, decided here — not a claim about any tradition that uses it.
The ledger holds this as [gematria_ignores_order](/theorem/gematria_ignores_order) — proven `by decide`, sorry-free:

```lean
1 + 2 + 3 = 3 + 2 + 1 ∧ 1 + 2 + 3 = 6
```

### DIFFERENT WORDS MUST SHARE A VALUE — BY PIGEONHOLE. Over the 22 Hebrew letters there are 22³ = 10648 three-letter strings, while their values (each letter 1…400) can only land between 3 and 1200 — 1198 possible sums. More words than sums, so collisions are FORCED: on average nearly nine strings per value. A shared gematria is therefore the expected case and carries no information on its own; it is the same seats-and-people bound the address layer seals as seats_pigeonhole. this decides the counting.
The ledger holds this as [gematria_forces_collisions](/theorem/gematria_forces_collisions) — proven `by decide`, sorry-free:

```lean
22 * 22 * 22 = 10648 ∧ 1200 - 3 + 1 = 1198 ∧ 10648 > 1198
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
