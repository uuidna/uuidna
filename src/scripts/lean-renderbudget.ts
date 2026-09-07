#!/usr/bin/env node
// THE RENDER BUDGET, RE-MEASURED — and the four integer facts the re-measurement walked past on the way.
//
// SiteBuild.lean sealed the budget from a two-point threshold at 5260 pages (fails at a 4096 MB cap, builds at
// 4352) and fitted a line to 12037 pages at the pinned 8192 cap. The site then doubled: every theorem gained a
// chunk page, and the count test's majority-margin arm went red at 10344 pages, holding every push. The captain's
// instruction was to re-measure rather than widen, so this wing holds what was MEASURED on 2026-09-07 and states
// the budget from it. Units are whole megabytes for caps and tenths of a megabyte for payloads, so nothing rounds.
//
// HONEST SCOPE. These are the arithmetic of readings taken on one operator machine at 10344 dynamic pages; the
// kernel decides the arithmetic and the readings stay readings. A threshold is the reproducible quantity (the
// resident set is not, as SiteBuild.lean already sealed), and one build above a cap proves the cap is enough for
// THIS tree, never that the line through two caps is a law of the renderer.
import { emit } from './lean-gen.js'

const div = (n: number, d: number): number => (n - (n % d)) / d

const FACTS = [
  { key: 'the_word_and_the_instrument_select_different_populations', name: '811 statements name List.range, 807 have a literal count to widen — the four the word matched and the instrument refused', skill: 'render-budget',
    why: 'THE POPULATION IS THE INSTRUMENT\'S, NOT THE WORD\'S. The bound census widens every literal `List.range N` by one and re-decides; a statement that ranges over a VARIABLE contains the word and offers nothing to widen. Selecting by the regex gave 811, selecting by whether widening changes the statement gave 807, and the first run of the census threw on the first of the four (pairs_share_one_centre) because the two filters disagreed about what a bounded statement is. One filter now serves the census, the generator and the test; the 807 partition 295 load-bearing, 503 survived one step, 7 undecidable widened, 2 undecidable at base.',
    js: () => 811 - 807 === 4 && 295 + 503 + 7 + 2 === 807 && 807 < 811,
    lean: 'theorem the_word_and_the_instrument_select_different_populations : (811 - 807 = 4) ∧ (295 + 503 + 7 + 2 = 807) ∧ (807 < 811) := by decide' },

  { key: 'a_new_tool_pays_at_most_the_mean_wire_cost', name: 'the 258th tool may weigh 416 bytes on tools/list and weighs 373', skill: 'render-budget',
    why: 'THE SHRINK-ONLY RATE, APPLIED TO ONE ARRIVAL. The wire ratchet seals 32183 hundredths of a byte per tool; over 258 tools that is 83032 bytes, the other 257 tools weigh 82616, so the newcomer\'s whole allowance is the difference, 416. The first draft weighed 460 and the ratchet moved the wrong way by 18 hundredths; the essay went to `detail`, which tools/list never sends, and the row weighs 373. A new tool is admitted by costing no more than the mean, which is exactly the friction the ratchet exists to apply.',
    js: () => div(32183 * 258, 100) === 83032 && 83032 - 82616 === 416 && 373 <= 416 && 460 > 416,
    lean: 'theorem a_new_tool_pays_at_most_the_mean_wire_cost : (32183 * 258 / 100 = 83032) ∧ (83032 - 82616 = 416) ∧ (373 ≤ 416) ∧ (460 > 416) := by decide' },

  { key: 'the_citations_were_one_table_shipped_nine_thousand_times', name: '578 tenths of a MB of per-page citations were a 6250-byte table: 9248 copies of it across 10344 pages', skill: 'render-budget',
    why: 'THE DERIVABLE FIELD LEFT THE PAGE BAG. The object pages — 5116 theorems, 144 publications, 5033 chunks, 33 sequence and 18 vector-equilibrium handles, 10344 in all — carried its occupancy citations as an array, 578 tenths of a megabyte across the site out of 1305. The keys per count were identical from page to page: zero disagreements, 36 counts, 6250 bytes once. Shipping the array was shipping that table 9248 times over. With the table loaded once and each page keeping only its own count numbers, the params fell to 725 tenths, a cut of 580, and the rendered citations are byte-identical to the served face on every address checked.',
    js: () => 5116 + 144 + 5033 + 33 + 18 === 10344 && div(57800000, 6250) === 9248 && 1305 - 725 === 580 && 9248 < 10344,
    lean: 'theorem the_citations_were_one_table_shipped_nine_thousand_times : (5116 + 144 + 5033 + 33 + 18 = 10344) ∧ (57800000 / 6250 = 9248) ∧ (1305 - 725 = 580) ∧ (9248 < 10344) := by decide' },

  { key: 'the_missions_are_the_open_records', name: '28 findings + 67 bound wings + 37 symbol wings = 132 missions, each a record a person can close', skill: 'render-budget',
    why: 'THE BOARD IS DERIVED, NOT AUTHORED. A mission is an open record with an exact deliverable: a research finding no theorem seals (28, one each), a wing whose bounds survived one widening step (67 wings carrying 503 keys), a wing whose rosetta rows lack the symbol leg (37 wings carrying 3952 keys). Findings are one mission each because 28 rows is a board; bounds and legs are one mission per wing because 503 and 3952 rows would be a survey. The sum is 132, and 104 of them are wing-level tasks.',
    js: () => 28 + 67 + 37 === 132 && 503 > 67 && 3952 > 37 && 67 + 37 === 104,
    lean: 'theorem the_missions_are_the_open_records : (28 + 67 + 37 = 132) ∧ (503 > 67) ∧ (3952 > 37) ∧ (67 + 37 = 104) := by decide' },
  { key: 'the_retention_model_did_not_survive_the_doubling', name: '10344 pages at 17 tenths each would be 17585 MB, and the site built at the 8192 cap — retention per page is at most 7 tenths at concurrency 2', skill: 'render-budget',
    why: 'THE SEALED MODEL AND THE PINNED CONFIG DISAGREED, AND THE BUILD DECIDED. SiteBuild.lean holds a render retention of 17 tenths of a megabyte per page for the whole run, and beside it a theorem that the concurrency knob moves only 420 MB; docs/.vitepress/config.ts pins buildConcurrency to 2 with a comment saying concurrency is the lever that moves the quantity. At 10344 pages the model predicts 175848 tenths, more than twice the 81920 the cap allows — and the site built at that cap on 2026-09-07 in 393 seconds. So at concurrency 2 the retention per page is at most 81920 / 10344 = 7 tenths, under half the sealed 17. The two sealed readings were taken at different concurrencies; the doubling of the site is what made the difference visible.',
    js: () => 10344 * 17 === 175848 && 175848 > 81920 && div(81920, 10344) === 7 && 7 < 17 && 7 * 2 < 17,
    lean: 'theorem the_retention_model_did_not_survive_the_doubling : (10344 * 17 = 175848) ∧ (175848 > 81920) ∧ (81920 / 10344 = 7) ∧ (7 < 17) ∧ (7 * 2 < 17) := by decide' },

  { key: 'the_budget_re_measured_from_the_resident_reading', name: '5153 MB resident at 10344 pages is 498 KB a page: 6102 pages of headroom under 8192, a budget of 16446, and the largest wing lands 1864 pages inside it', skill: 'render-budget',
    why: 'THE MARGIN RESTATED FROM A READING, WITH THE READING NAMED. One run at a 7168 MB cap, concurrency 2, load average 181, peaked at 5153 MB resident and ended on a full disk (ENOSPC) after 916 seconds with the bundles built and the render under way — no heap failure. Read as a line through the origin, that is 498 KB a page, 6102 pages of headroom under the pinned 8192, a budget of 16446. A resident set is not a threshold (SiteBuild.lean sealed the 1489 MB swing between two readings at one cap), so the arm that protects the next wing is not a half-budget rule but the largest wing this ledger has ever landed: Wave.lean\'s 932 theorems cost two pages each, 1864, and 10344 + 1864 = 12208 sits inside 16446. A wing larger than any landed re-measures before it lands; the count test says so in milliseconds.',
    js: () => div(5153 * 1000, 10344) === 498 && div((8192 - 5153) * 1000, 498) === 6102 && 10344 + 6102 === 16446 && 2 * 932 === 1864 && 10344 + 1864 === 12208 && 12208 < 16446,
    lean: 'theorem the_budget_re_measured_from_the_resident_reading : (5153 * 1000 / 10344 = 498) ∧ ((8192 - 5153) * 1000 / 498 = 6102) ∧ (10344 + 6102 = 16446) ∧ (2 * 932 = 1864) ∧ (10344 + 1864 = 12208) ∧ (12208 < 16446) := by decide' },

  { key: 'the_render_samples_sit_below_the_peak_by_more_than_the_swing', name: 'four samples during rendering — 542, 2610, 501, 1619 MB — sit 2543 MB under the 5153 MB peak, more than the 1489 MB swing two readings at one cap once showed', skill: 'render-budget',
    why: 'WHERE THE PEAK IS NOT, stated no stronger than the samples allow. Sampled fifteen seconds apart while the pages rendered at concurrency 2, the resident set swung 542, 2610, 501, 1619 MB — a collector breathing, not a set growing with every page. The first draft of this fact said the largest sample was under HALF the peak, and the emitter refused it: 2610 doubled is 5220, past 5153. What holds is weaker and still worth sealing: the largest render sample is 2543 MB below the peak, and 2543 exceeds the 1489 MB swing SiteBuild.lean recorded between two readings at one cap — so the gap is larger than the known noise, and the peak belongs to the phase before rendering, the client and server bundles over every page.',
    js: () => 542 < 2610 && 501 < 2610 && 1619 < 2610 && 2610 + 2543 === 5153 && 2543 > 1489 && 2610 * 2 > 5153,
    lean: 'theorem the_render_samples_sit_below_the_peak_by_more_than_the_swing : (542 < 2610) ∧ (501 < 2610) ∧ (1619 < 2610) ∧ (2610 + 2543 = 5153) ∧ (2543 > 1489) ∧ (2610 * 2 > 5153) := by decide' },
]

console.log('computing ' + FACTS.length + ' RENDER-BUDGET facts (the re-measured ceiling, and what the re-measurement found) …')

emit({ file: 'RenderBudget.lean', skill: 'render-budget',
  header: 'THE RENDER BUDGET RE-MEASURED AT 10344 PAGES, with the integer facts found on the way: the population a word selects against the one an instrument selects, the wire allowance of one new tool, the citation table that rode every page, and the mission count. Readings are one machine\'s; the arithmetic is the kernel\'s.',
  facts: FACTS })
