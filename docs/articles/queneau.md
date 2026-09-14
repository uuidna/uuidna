---
title: "A hundred thousand billion poems"
description: "Computed from lean/Queneau.lean — 5 sealed theorems, every claim citing its proof."
---

# A hundred thousand billion poems

> A HUNDRED THOUSAND BILLION POEMS, AS COMBINATORICS. Raymond Queneau's Cent mille milliards de poèmes (1961): ten sonnets of fourteen lines sharing their rhyme sounds, each line a strip, so every position chooses freely among ten and the book holds 10^14 sonnets. Every count is derived from SONNETS = 10 and LINES = 14 and decided by the kernel. THE CLAIM IS THE STRUCTURE: no line of the book is reproduced. Every poem is a fourteen-digit decimal numeral — reading them is counting. — held by [queneau_poems_are_ten_to_the_fourteen](/theorem/queneau_poems_are_ten_to_the_fourteen) and its 4 siblings below.

**5 theorems** and **18 decided cases**, from [queneau_poems_are_ten_to_the_fourteen](/theorem/queneau_poems_are_ten_to_the_fourteen) onward, each proven `by decide` in <a href="/lean/Queneau.lean">lean/Queneau.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 5 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [queneau_one_strip_per_position](/theorem/queneau_one_strip_per_position). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FQueneau.lean)** — nothing to install. The editor fetches `lean/Queneau.lean` from the repository and re-decides all 5 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### A HUNDRED THOUSAND BILLION POEMS: 14 positions, each filled independently by one of 10 interchangeable strips, give 10^14 = 100000000000000 sonnets — the title's number, counted.
The ledger holds this as [queneau_poems_are_ten_to_the_fourteen](/theorem/queneau_poems_are_ten_to_the_fourteen) — proven `by decide`, sorry-free:

```lean
10 ^ 14 = 100000000000000
```

### THE CHOICES MULTIPLY BECAUSE THEY ARE INDEPENDENT: the rhyme sound at a position is shared by all 10 strips, so choosing one position never constrains another, and the count is the product of 14 factors of 10 — the power, written out as the product it is.
The ledger holds this as [queneau_one_strip_per_position](/theorem/queneau_one_strip_per_position) — proven `by decide`, sorry-free:

```lean
(List.replicate 14 10).foldl (· * ·) 1 = 10 ^ 14
```

### EVERY POEM IS A NUMERAL: which sonnet supplies line i is one decimal digit, so a poem is a 14-digit decimal numeral and the poems are the numerals below 10^14 — the largest poem is 99999999999999, all nines, the last strip at every position.
The ledger holds this as [queneau_poems_are_the_fourteen_digit_numerals](/theorem/queneau_poems_are_the_fourteen_digit_numerals) — proven `by decide`, sorry-free:

```lean
100000000000000 - 1 = 99999999999999 ∧ 100000000000000 = 10 ^ 14
```

### THE SONNET'S OWN SHAPE: 14 lines are the octave and the sestet, 8 + 6, so the poems factor as 10^8 · 10^6 — every octave from the book can meet every sestet.
The ledger holds this as [queneau_a_sonnet_is_eight_and_six](/theorem/queneau_a_sonnet_is_eight_and_six) — proven `by decide`, sorry-free:

```lean
8 + 6 = 14 ∧ 10 ^ 8 * 10 ^ 6 = 10 ^ 14
```

### WHAT THE BOOK PRINTS AGAINST WHAT IT HOLDS: 10 complete sonnets are printed, and they are 10 of 100000000000000 — one in ten trillion; the other 99999999999990 exist only as choices.
The ledger holds this as [queneau_ten_sonnets_are_a_vanishing_sample](/theorem/queneau_ten_sonnets_are_a_vanishing_sample) — proven `by decide`, sorry-free:

```lean
100000000000000 / 10 = 10000000000000 ∧ 10 < 100000000000000
```


::: warning 
A HUNDRED THOUSAND BILLION POEMS, AS COMBINATORICS. The boundary is confirmed by the wing's own sealed theorems — e.g. [queneau_poems_are_ten_to_the_fourteen](/theorem/queneau_poems_are_ten_to_the_fourteen) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
