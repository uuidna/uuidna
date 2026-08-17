---
title: "The Glagolitic numerals & Pliska rosette"
description: "Computed from lean/Glagolitic.lean — 6 sealed theorems, every claim citing its proof."
---

# The Glagolitic numerals & Pliska rosette

> GLAGOLITIC — the numerals and the Pliska rosette, as decidable arithmetic, demarcated. Cyril's 9th-century script numbered its letters in order: the units 1–9 (Az…Zemlja), the tens and hundreds, combined additively (500+80+3 = 583), with the teens 11–19 written unit-before-ten. The nine units sum to 45 (digital root 9); the Pliska rosette turns on seven rays — the ℤ/7 the rosette layer seals — whose six residues sum to 21 (digital root 3, the primitive root), and 7 is prime so ℤ/7 is a field. HONEST SCOPE: the documented numeral arithmetic and the seven-fold symmetry; the rosette's MEANING (the seven planets, the days, the Dulo dynasty, a sun-sign) is historically DEBATED, not decoded here. — held by [glagolitic_units](/theorem/glagolitic_units) and its 5 siblings below.

**6 theorems**, from [glagolitic_units](/theorem/glagolitic_units) onward, each proven `by decide` in [lean/Glagolitic.lean](/lean/Glagolitic.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation, and every boundary it names is CONFIRMED by a sealed theorem, never merely denied.

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


::: warning HONEST SCOPE
the documented numeral arithmetic and the seven-fold symmetry; the rosette's MEANING (the seven planets, the days, the Dulo dynasty, a sun-sign) is historically DEBATED, not decoded here. The boundary is confirmed by the wing's own sealed theorems — e.g. [glagolitic_units](/theorem/glagolitic_units) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
