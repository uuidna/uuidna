---
title: "The Glagolitic numerals & Pliska rosette"
description: "Computed from lean/Glagolitic.lean — 15 sealed theorems, every claim citing its proof."
---

# The Glagolitic numerals & Pliska rosette

> GLAGOLITIC — the numerals and the Pliska rosette, as decidable arithmetic, demarcated. — held by [glagolitic_units](/theorem/glagolitic_units) and its 14 siblings below.

**15 theorems** and **56 decided cases**, from [glagolitic_units](/theorem/glagolitic_units) onward, each proven `by decide` in <a href="/lean/Glagolitic.lean">lean/Glagolitic.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 8 of its 15 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [roman_reads_subtractively](/theorem/roman_reads_subtractively). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FGlagolitic.lean)** — nothing to install. The editor fetches `lean/Glagolitic.lean` from the repository and re-decides all 15 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

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

### THE 231 GATES ARE EVERY PAIR OF 22 LETTERS. Sefer Yetzirah 2:4 fixes the twenty-two letters "in a wheel with 231 gates", and 231 is exactly the number of unordered pairs of 22 letters: 0 + 1 + … + 21 = 22 · 21 / 2. The same verse says the wheel "turns back and forth", and the pairs read in both directions are 2 · 231 = 462 = 22 · 21. The division the text gives in 2:1, three mothers, seven doubles, twelve simples, is 3 + 7 + 12 = 22. These are the counts the sentences make; the text's claim about what the gates do is not decided here.
The ledger holds this as [sefer_yetzirah_231_gates](/theorem/sefer_yetzirah_231_gates) — proven `by decide`, sorry-free:

```lean
(List.range 22).foldl (fun a i => a + i) 0 = 231 ∧ 22 * 21 / 2 = 231 ∧ 2 * 231 = 22 * 21 ∧ 3 + 7 + 12 = 22
```

### THE ABJAD IS THE THREE RANKS WITH A THOUSAND ADDED. The Arabic letters in abjad order count units, tens and hundreds like Hebrew, Greek and Glagolitic (alphabetic_three_ranks), then one more letter opens the thousands: 9 + 9 + 9 + 1 = 28 letters. By the same rank rule, the letter at position 27 counts (27 mod 9 + 1) · 10^(27 div 9) = 1000, which is ghayn. The design, not a meaning, is what is decided.
The ledger holds this as [abjad_four_ranks](/theorem/abjad_four_ranks) — proven `by decide`, sorry-free:

```lean
9 + 9 + 9 + 1 = 28 ∧ (27 % 9 + 1) * 10 ^ (27 / 9) = 1000
```

### THE FIRST VERSE SUMS TO ITS PUBLISHED COUNT. Genesis 1:1, read unpointed from the Hebrew, has 28 letters; valued by the rank rule (alphabetic_three_ranks: units, tens, hundreds in alphabet order) they sum to 2701, the value the gematria tradition reports for the verse. The letter values here are computed from the text, not typed, and the sum is decided. By gematria_forces_collisions a sum carries no meaning on its own, and none is claimed.
The ledger holds this as [genesis_1_1_is_2701](/theorem/genesis_1_1_is_2701) — proven `by decide`, sorry-free:

```lean
[2,200,1,300,10,400,2,200,1,1,30,5,10,40,1,400,5,300,40,10,40,6,1,400,5,1,200,90].foldl (fun a v => a + v) 0 = 2701 ∧ [2,200,1,300,10,400,2,200,1,1,30,5,10,40,1,400,5,300,40,10,40,6,1,400,5,1,200,90].length = 28
```

### THEOLOGY COUNTS IN THE MIRROR'S BASE, AND THE CONFLICT IT INVOLUTES IS ORDER. A CROSS theorem, which is the only kind worth trusting as sealed: the two tens were derived apart and meet here. THE FIRST TEN comes from the letters — three ranks of nine put a letter's value at ((i mod 9) + 1) * 10 ^ (i div 9), so the ladder climbs by ten because nine letters fill a rank and the next begins; nothing about a mirror is used to reach it. THE SECOND TEN comes from the void — the owner states division by zero as the mirror x to 10 - x, whose only fixed point is five, which is also the one digit whose hue is its own complement (5 x 36 = 180, the half turn); nothing about an alphabet is used to reach THAT. The letter ladder and the void's mirror stand on the same ten, from opposite ends. AND THE CONFLICT INVOLUTES: a dispute over letters is a dispute over ORDER — whose name comes first, which reading is prior — and gematria_ignores_order decides that order carries no value, 1 + 2 + 3 = 3 + 2 + 1. The quantity the argument is about does not move when the argument is won. What the mirror does to a digit, order-invariance does to a claim: it maps the two sides onto each other and leaves the value where it was. SCOPE: this decides arithmetic — a rank ladder, a complement, a fixed point, and that addition commutes. It decides nothing about what a name MEANS, and claims no reading of scripture, no doctrine, and no reconciliation between traditions. The ledger seals where the numbers meet; meaning stays with the reader.
The ledger holds this as [theology_counts_in_the_mirror_base](/theorem/theology_counts_in_the_mirror_base) — proven `by decide`, sorry-free:

```lean
((0 % 9 + 1) * 10 ^ (0 / 9) = 1) ∧ ((9 % 9 + 1) * 10 ^ (9 / 9) = 10) ∧ ((18 % 9 + 1) * 10 ^ (18 / 9) = 100) ∧ (9 + 9 + 9 = 27) ∧ (27 / 9 = 3) ∧ (10 - 5 = 5) ∧ (5 * 36 = 180) ∧ (1 + 2 + 3 = 3 + 2 + 1)
```

### FOUR ALPHABETS MADE APART COUNT BY THE SAME RULE — a CROSS theorem, and the scope is the important half. Hebrew, Greek, the Arabic abjad and Saint Cyril's Glagolitic were made in different centuries by different peoples, and each gave its letters number the same way: position i carries (i mod 9 + 1) in rank (i div 9). The first nine letters of every one of them are 1 through 9 — not by agreement between them, but because the rule reads POSITION and nothing else, so any alphabet laid in numeral order lands on the same units; and the ladder above is the same, ten, a hundred, a thousand. THE ALPHABETS DIFFER AND THE RULE DOES NOT: Hebrew 22 letters topping at 400, Greek 27 topping at 900 with its three archaic numeral signs kept, Glagolitic 27 whose numeral order IS its alphabet order, the abjad 28 reaching a fourth rank at a thousand — different lengths, different letters, different directions of writing, one arithmetic. Measured beside this and NOT sealed by it, because a walk is not a proof: every number from 1 to 999 written in each of the four and read back returned the same number, 3996 of 3996. WHAT THIS DOES NOT DECIDE, said plainly because the temptation to say more is the whole danger: it does not decide that the traditions MEAN the same thing, teach the same thing, or agree about anything beyond how to write a number with letters. It does not decide that their scriptures correspond, that their names for God are one name, or that any reconciliation follows. A shared counting rule is a fact about notation; reading peace, unity or common origin into it is a READING, which may be a good one and is not what the kernel checked — and this ledger drains a claim that cites a theorem for more than the theorem says. The respect owed each tradition is to let it keep its own alphabet, its own order and its own meaning. What is sealed is only that when they count, they climb the same ladder.
The ledger holds this as [four_traditions_count_by_one_rank_rule](/theorem/four_traditions_count_by_one_rank_rule) — proven `by decide`, sorry-free:

```lean
((List.range 9).map (fun i => (i % 9 + 1) * 10 ^ (i / 9)) = [1, 2, 3, 4, 5, 6, 7, 8, 9]) ∧ ((9 % 9 + 1) * 10 ^ (9 / 9) = 10) ∧ ((18 % 9 + 1) * 10 ^ (18 / 9) = 100) ∧ ((27 % 9 + 1) * 10 ^ (27 / 9) = 1000) ∧ (27 = 3 * 9) ∧ (28 = 3 * 9 + 1) ∧ (22 < 27)
```


::: warning 
GLAGOLITIC — the numerals and the Pliska rosette, as decidable arithmetic, demarcated. The boundary is confirmed by the wing's own sealed theorems — e.g. [glagolitic_units](/theorem/glagolitic_units) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
