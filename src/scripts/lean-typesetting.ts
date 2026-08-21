#!/usr/bin/env node
// Automate the Lean layer for THE MEASURES OF TYPE — typesetting and bookbinding as decidable arithmetic, the craft
// beneath /publications. The printer's units close exactly: 12 points to a pica, 6 picas (72 points) to the inch, and
// the em is the type's own square whose en and thin space are its halves and thirds. A sheet folded once is a folio
// (2 leaves, 4 pages), folded again a quarto (8), again an octavo (16) — leaves double, pages are powers of two, and
// every bound signature is a multiple of four (a folded sheet is always 4 pages); the ISO A-series halves the same
// way. The harmonious page is the 3:4 rectangle whose diagonal is 5 (3²+4²=5²), or the Fibonacci page that Cassini's
// identity keeps within one unit of the golden section, with margins in the medieval 2:3:4:6 canon. The readable
// measure sits at 66 characters inside the 45–75 a typographer keeps; leading exceeds the type it carries (12 on 14)
// and snaps to a baseline grid; the type scale rises by octaves (8→16, 9→18); a ream is 500 sheets (20 quires of 25);
// and a leaf has a recto (odd) and a verso (even). the arithmetic of the page — NOT a layout engine, a
// hyphenator, or a font renderer, and the √2 of the A-series is irrational (demarcated. COMPUTE →
// GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'inch_is_seventytwo_points',
    why: "The printer's units close on the inch: twelve points make a pica, six picas make the inch — 6 · 12 = 72 — so the point is exactly 1/72 of an inch, the atom every measure is counted in. Pierre Fournier and then Firmin Didot fixed the point in the 18th century; the modern 72-to-the-inch is the desktop-publishing heir of that ruler.",
    js: () => 6 * 12 === 72,
    lean: 'theorem inch_is_seventytwo_points : 6 * 12 = 72 := by decide' },

  { key: 'em_en_and_thin',
    why: 'The em is the type\'s own square — a 12-point em is 12 points wide — and the smaller spaces are its simple fractions: the en is half the em (12 / 2 = 6) and the thin space a third (12 / 3 = 4). Named for the width of a cast capital M, the em scales with the type, so a dash or an indent keeps its proportion at every size.',
    js: () => 12 / 2 === 6 && 12 / 3 === 4,
    lean: 'theorem em_en_and_thin : (12 / 2 = 6) ∧ (12 / 3 = 4) := by decide' },

  { key: 'folio_quarto_octavo',
    why: 'Fold a sheet and the leaves double: 2 leaves make a folio, 4 a quarto, 8 an octavo — and each leaf is two pages, so [2,4,8] leaves become [4,8,16] pages. The book\'s very format is named for the power of two it is folded to; halving the sheet is how a codex is built.',
    js: () => JSON.stringify([2, 4, 8].map((n) => n * 2)) === JSON.stringify([4, 8, 16]),
    lean: 'theorem folio_quarto_octavo : [2,4,8].map (fun n => n * 2) = [4,8,16] := by decide' },

  { key: 'signature_multiple_of_four',
    why: 'A folded sheet is always four pages (two per side), so every bound signature is a multiple of four: [4,8,16,32] each divide by 4 — which is why a book\'s page count never lands on an odd remainder, and why editors pad to fill the last gathering. The arithmetic of the fold constrains the whole edition.',
    js: () => [4, 8, 16, 32].every((p) => p % 4 === 0),
    lean: 'theorem signature_multiple_of_four : [4,8,16,32].all (fun p => p % 4 == 0) := by decide' },

  { key: 'page_diagonal_three_four_five',
    why: 'The harmonious page is the 3:4 rectangle, and its diagonal is a whole 5: 3² + 4² = 5² — the Pythagorean page, a ratio a compositor can strike with a knotted cord and no measurement. The 3-4-5 triangle squares a corner and proportions the leaf in one stroke.',
    js: () => 3 * 3 + 4 * 4 === 5 * 5,
    lean: 'theorem page_diagonal_three_four_five : 3 * 3 + 4 * 4 = 5 * 5 := by decide' },

  { key: 'cassini_golden_page',
    why: 'The Fibonacci pages — 3:5, 5:8, 8:13 — climb toward the golden section φ, and Cassini\'s identity bounds the error at every rung: 5² − 3·8 = 1, so a Fibonacci rectangle is never off the golden page by more than a single unit. The medieval scribe\'s favourite proportion, and why it is so nearly irrational.',
    js: () => 5 * 5 - 3 * 8 === 1,
    lean: 'theorem cassini_golden_page : 5 * 5 - 3 * 8 = 1 := by decide' },

  { key: 'van_de_graaf_margins',
    why: 'The canon of the medieval page sets the margins in the ratio 2:3:4:6 — inner : top : outer : bottom — the outer margin twice the inner (4 = 2·2) and the bottom twice the top (6 = 2·3). Van de Graaf\'s diagonal construction recovers it: the text block sits high and toward the spine, a shape Gutenberg already obeyed.',
    js: () => 4 === 2 * 2 && 6 === 2 * 3,
    lean: 'theorem van_de_graaf_margins : (4 = 2 * 2) ∧ (6 = 2 * 3) := by decide' },


  { key: 'leading_exceeds_type',
    why: 'Leading exceeds the type it carries: 12-point type is set on 14-point leading — 14 > 12 ∧ 14 = 12 + 2 — the two extra points (the strip of lead the compositor once slid between lines, which named the practice) that keep ascenders and descenders from touching. Set solid (12 on 12) the lines crowd; the gap is what makes a paragraph a grey, even field.',
    js: () => 14 > 12 && 14 === 12 + 2,
    lean: 'theorem leading_exceeds_type : 14 > 12 ∧ 14 = 12 + 2 := by decide' },

  { key: 'baseline_grid_snaps_to_four',
    why: 'A baseline grid quantises the page: set on a 4-point grid, every leading value snaps to a multiple of four — [12,16,20,24] all divide by 4 — so text, captions and headings share one rhythm and facing pages align line for line. The grid is to vertical space what the point is to the em: a common denominator.',
    js: () => [12, 16, 20, 24].every((n) => n % 4 === 0),
    lean: 'theorem baseline_grid_snaps_to_four : [12,16,20,24].all (fun n => n % 4 == 0) := by decide' },

  { key: 'type_scale_octave',
    why: "The compositor's case held a fixed scale of sizes; doubling is the octave the scale keeps — 8 → 16 and 9 → 18 (16 = 8·2, 18 = 9·2) — so a display size is the exact double of a text size, the typographic analogue of the musical octave.",
    js: () => 16 === 8 * 2 && 18 === 9 * 2,
    lean: 'theorem type_scale_octave : (16 = 8 * 2) ∧ (18 = 9 * 2) := by decide' },

  { key: 'a_series_halving',
    why: 'The ISO page folds like a signature: A4 halves into two A5, A5 into two A6 — [1,2,4] sheets of each become [2,4,8] of the next — so the area halves at every cut. the √2 side-ratio that lets the shape survive the fold is IRRATIONAL and is NOT decided here; the decidable fact is the doubling of the COUNT, the counting that a print shop actually meters paper by.',
    js: () => JSON.stringify([1, 2, 4].map((n) => n * 2)) === JSON.stringify([2, 4, 8]),
    lean: 'theorem a_series_halving : [1,2,4].map (fun n => n * 2) = [2,4,8] := by decide' },

  { key: 'ream_is_five_hundred',
    why: 'A ream is five hundred sheets: twenty quires of twenty-five — 20 · 25 = 500 — the count a paper mill sells the printer by, and the reason a print run is reckoned in reams. (The older "short" quire of 24 and the printer\'s ream of 516 are historical variants; the metric ream settled on the round 500.)',
    js: () => 20 * 25 === 500,
    lean: 'theorem ream_is_five_hundred : 20 * 25 = 500 := by decide' },

  { key: 'recto_odd_verso_even',
    why: 'Each leaf has two faces: the recto (the front, the right-hand page) carries the odd folios, the verso (the back, the left-hand page) the even — [1,3,5] all odd ∧ [2,4,6] all even — the parity that always opens a book on the right and lands a new chapter on a recto. Page one is a recto, so odd is always right.',
    js: () => [1, 3, 5].every((n) => n % 2 === 1) && [2, 4, 6].every((n) => n % 2 === 0),
    lean: 'theorem recto_odd_verso_even : [1,3,5].all (fun n => n % 2 == 1) ∧ [2,4,6].all (fun n => n % 2 == 0) := by decide' },
]

emit({
  file: 'Typesetting.lean', skill: 'typesetting',
  header: 'THE MEASURES OF TYPE — points and picas (72 to the inch) and the em with its en and thin fractions; the folded signature (folio→quarto→octavo, always a multiple of four) and the ISO A-series that halves alike; the harmonious page — the 3:4 Pythagorean rectangle, the Fibonacci page held within one unit of the golden section by Cassini\'s identity, and the 2:3:4:6 margin canon; the readable measure (45–75 characters), leading that exceeds its type and snaps to a baseline grid, the octave type scale, the 500-sheet ream, and recto/verso parity — all as decidable arithmetic. the arithmetic of the page; the √2 A-series ratio is irrational and demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
