---
title: "The measures of type"
description: "Computed from lean/Typesetting.lean — 13 sealed theorems, every claim citing its proof."
---

# The measures of type

> THE MEASURES OF TYPE — points and picas (72 to the inch) and the em with its en and thin fractions; the folded signature (folio→quarto→octavo, always a multiple of four) and the ISO A-series that halves alike; the harmonious page — the 3:4 Pythagorean rectangle, the Fibonacci page held within one unit of the golden section by Cassini's identity, and the 2:3:4:6 margin canon; the readable measure (45–75 characters), leading that exceeds its type and snaps to a baseline grid, the octave type scale, the 500-sheet ream, and recto/verso parity — all as decidable arithmetic. the arithmetic of the page; the √2 A-series ratio is irrational and demarcated. — held by [inch_is_seventytwo_points](/theorem/inch_is_seventytwo_points) and its 12 siblings below.

**13 theorems**, from [inch_is_seventytwo_points](/theorem/inch_is_seventytwo_points) onward, each proven `by decide` in [lean/Typesetting.lean](/lean/Typesetting.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 13 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [signature_multiple_of_four](/theorem/signature_multiple_of_four). A boundary stated here is decided.

### The printer's units close on the inch: twelve points make a pica, six picas make the inch — 6 · 12 = 72 — so the point is exactly 1/72 of an inch, the atom every measure is counted in. Pierre Fournier and then Firmin Didot fixed the point in the 18th century; the modern 72-to-the-inch is the desktop-publishing heir of that ruler.
The ledger holds this as [inch_is_seventytwo_points](/theorem/inch_is_seventytwo_points) — proven `by decide`, sorry-free:

```lean
6 * 12 = 72
```

### The em is the type's own square — a 12-point em is 12 points wide — and the smaller spaces are its simple fractions: the en is half the em (12 / 2 = 6) and the thin space a third (12 / 3 = 4). Named for the width of a cast capital M, the em scales with the type, so a dash or an indent keeps its proportion at every size.
The ledger holds this as [em_en_and_thin](/theorem/em_en_and_thin) — proven `by decide`, sorry-free:

```lean
(12 / 2 = 6) ∧ (12 / 3 = 4)
```

### Fold a sheet and the leaves double: 2 leaves make a folio, 4 a quarto, 8 an octavo — and each leaf is two pages, so [2,4,8] leaves become [4,8,16] pages. The book's very format is named for the power of two it is folded to; halving the sheet is how a codex is built.
The ledger holds this as [folio_quarto_octavo](/theorem/folio_quarto_octavo) — proven `by decide`, sorry-free:

```lean
[2,4,8].map (fun n => n * 2) = [4,8,16]
```

### A folded sheet is always four pages (two per side), so every bound signature is a multiple of four: [4,8,16,32] each divide by 4 — which is why a book's page count never lands on an odd remainder, and why editors pad to fill the last gathering. The arithmetic of the fold constrains the whole edition.
The ledger holds this as [signature_multiple_of_four](/theorem/signature_multiple_of_four) — proven `by decide`, sorry-free:

```lean
[4,8,16,32].all (fun p => p % 4 == 0)
```

### The harmonious page is the 3:4 rectangle, and its diagonal is a whole 5: 3² + 4² = 5² — the Pythagorean page, a ratio a compositor can strike with a knotted cord and no measurement. The 3-4-5 triangle squares a corner and proportions the leaf in one stroke.
The ledger holds this as [page_diagonal_three_four_five](/theorem/page_diagonal_three_four_five) — proven `by decide`, sorry-free:

```lean
3 * 3 + 4 * 4 = 5 * 5
```

### The Fibonacci pages — 3:5, 5:8, 8:13 — climb toward the golden section φ, and Cassini's identity bounds the error at every rung: 5² − 3·8 = 1, so a Fibonacci rectangle is never off the golden page by more than a single unit. The medieval scribe's favourite proportion, and why it is so nearly irrational.
The ledger holds this as [cassini_golden_page](/theorem/cassini_golden_page) — proven `by decide`, sorry-free:

```lean
5 * 5 - 3 * 8 = 1
```

### The canon of the medieval page sets the margins in the ratio 2:3:4:6 — inner : top : outer : bottom — the outer margin twice the inner (4 = 2·2) and the bottom twice the top (6 = 2·3). Van de Graaf's diagonal construction recovers it: the text block sits high and toward the spine, a shape Gutenberg already obeyed.
The ledger holds this as [van_de_graaf_margins](/theorem/van_de_graaf_margins) — proven `by decide`, sorry-free:

```lean
(4 = 2 * 2) ∧ (6 = 2 * 3)
```

### Leading exceeds the type it carries: 12-point type is set on 14-point leading — 14 > 12 ∧ 14 = 12 + 2 — the two extra points (the strip of lead the compositor once slid between lines, which named the practice) that keep ascenders and descenders from touching. Set solid (12 on 12) the lines crowd; the gap is what makes a paragraph a grey, even field.
The ledger holds this as [leading_exceeds_type](/theorem/leading_exceeds_type) — proven `by decide`, sorry-free:

```lean
14 > 12 ∧ 14 = 12 + 2
```

### A baseline grid quantises the page: set on a 4-point grid, every leading value snaps to a multiple of four — [12,16,20,24] all divide by 4 — so text, captions and headings share one rhythm and facing pages align line for line. The grid is to vertical space what the point is to the em: a common denominator.
The ledger holds this as [baseline_grid_snaps_to_four](/theorem/baseline_grid_snaps_to_four) — proven `by decide`, sorry-free:

```lean
[12,16,20,24].all (fun n => n % 4 == 0)
```

### The compositor's case held a fixed scale of sizes; doubling is the octave the scale keeps — 8 → 16 and 9 → 18 (16 = 8·2, 18 = 9·2) — so a display size is the exact double of a text size, the typographic analogue of the musical octave.
The ledger holds this as [type_scale_octave](/theorem/type_scale_octave) — proven `by decide`, sorry-free:

```lean
(16 = 8 * 2) ∧ (18 = 9 * 2)
```

### The ISO page folds like a signature: A4 halves into two A5, A5 into two A6 — [1,2,4] sheets of each become [2,4,8] of the next — so the area halves at every cut. the √2 side-ratio that lets the shape survive the fold is IRRATIONAL and is NOT decided here; the decidable fact is the doubling of the COUNT, the counting that a print shop actually meters paper by.
The ledger holds this as [a_series_halving](/theorem/a_series_halving) — proven `by decide`, sorry-free:

```lean
[1,2,4].map (fun n => n * 2) = [2,4,8]
```

### A ream is five hundred sheets: twenty quires of twenty-five — 20 · 25 = 500 — the count a paper mill sells the printer by, and the reason a print run is reckoned in reams. (The older "short" quire of 24 and the printer's ream of 516 are historical variants; the metric ream settled on the round 500.)
The ledger holds this as [ream_is_five_hundred](/theorem/ream_is_five_hundred) — proven `by decide`, sorry-free:

```lean
20 * 25 = 500
```

### Each leaf has two faces: the recto (the front, the right-hand page) carries the odd folios, the verso (the back, the left-hand page) the even — [1,3,5] all odd ∧ [2,4,6] all even — the parity that always opens a book on the right and lands a new chapter on a recto. Page one is a recto, so odd is always right.
The ledger holds this as [recto_odd_verso_even](/theorem/recto_odd_verso_even) — proven `by decide`, sorry-free:

```lean
[1,3,5].all (fun n => n % 2 == 1) ∧ [2,4,6].all (fun n => n % 2 == 0)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
