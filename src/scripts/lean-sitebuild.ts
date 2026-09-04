#!/usr/bin/env node
// THE SITE BUILD, AS ARITHMETIC. Everything below was prose in a comment yesterday: that the container could
// not afford the SSG, that concurrency was not the cause, that the params were never the dominant term — each
// true, each measured, and none of it decidable, which is exactly what this tree does not let a constraint
// stay. A build ceiling written as a sentence gets re-argued
// every time someone reaches for the obvious knob; written as an integer identity it can be re-decided by the
// kernel in a tenth of a second and cannot be argued with at all.
//
// THE UNITS ARE TENTHS OF A MEGABYTE, so every reading is an integer and nothing rounds. The one constant is
// the render phase's RETENTION PER PAGE, 17 tenths (1.7 MB): VitePress holds each rendered page for the whole
// run, so the heap is the page count times that, and no configuration exposes it.
//
// HONEST SCOPE — this is the arithmetic of MEASUREMENTS, not a law of VitePress. The readings are named where
// they are used and each was taken on this tree at 5260 dynamic pages; the retention constant was DERIVED from
// the threshold it explains, so the first fact states CONSISTENCY across three independent readings rather than
// an independent measurement of retention. What the kernel decides is the arithmetic; what a person measured
// stays a measurement.
import { emit, range } from './lean-gen.js'

const FACTS = [
  { key: 'render_retention_exceeds_the_container', name: '5260 pages at 17 tenths of a MB each = 8942 MB against an 8192 MB container', skill: 'site-build',
    why: 'THE BUILD CANNOT FIT THE CONTAINER, AND ONE CONSTANT SAYS WHY. The render phase retains each page for the whole run, so the heap is pages times retention — 5260 pages at 17 tenths of a megabyte is 89420 tenths, 8942 MB, against a deploy container of 8192 MB. The same single constant is consistent with the two other readings taken on this tree, which is what makes it a constant rather than a fitted number: 1200 pages come to 20400 tenths and DID build inside a 2048 MB cap (20480 tenths, and 20400 is under it by 80), while 5260 pages come to 89420 and did NOT build inside 4096 MB (40960). One number, three readings, no exceptions — so the ceiling is the page count and not the flag. HONEST — AND THE WORD IS *PINNED*, not forced. The constant was DERIVED FROM the threshold it explains, so this seals the CONSISTENCY of three readings under one number and not an independent measurement of per-page retention. A forced check would fall for a law and stand for a convention; a pinned one falls for either, because the expected value is inside it. Naming that distinction is a peer\'s correction (zeropoint-node-8a, 2026-09-04) after they found a literal expectation inside a column of their own labelled `derived`: the honesty was already in this sentence, the vocabulary was not, and "seals" reads as forced to anyone who did not write it.',
    js: () => 5260 * 17 === 89420 && 89420 > 81920 && 1200 * 17 === 20400 && 20400 < 20480 && 89420 > 40960,
    lean: 'theorem render_retention_exceeds_the_container : (5260 * 17 = 89420) ∧ (89420 > 81920) ∧ (1200 * 17 = 20400) ∧ (20400 < 20480) ∧ (89420 > 40960) := by decide' },

  { key: 'counting_beats_composing_by_six_magnitudes', name: '103030000 µs / 38 µs = 2711315: the render budget answered by counting, not by rendering',
    why: 'THE LEDGER\'S OWN LAW, INSTANTIATED ON ITS OWN BUILD. verify_beats_recompute_by_magnitudes says the saving is a magnitude and not a rate; here is the render budget paying it. The question is "how close is the site to the render ceiling", and there were three ways to answer it. RENDER IT: 103030 ms and a 4352 MB heap threshold. COMPOSE EVERY PAGE\'S PARAMS and take the length, which is what the first version of the guard did: 915 ms and 119 MB, because allObjectPaths builds 5282 objects to return them. COUNT: five array lengths, 38 µs warm and 26 MB — since buildChunks already caches, the second call costs six microseconds and the ledger\'s own arrays carry the rest. 103030000 µs over 38 is 2711315, past a million, and 4352 MB over 26 is 167. Six orders of magnitude in time and a hundred and sixty-seven in memory, for the identical answer. AND THE CHEAP PATH MAY NOT DISAGREE WITH THE DEAR ONE: objectPageCount().total must equal allObjectPaths().length, asserted in the test, because a fast answer that drifts from the slow one is worse than the slow one. The parts sum: 2599 theorems + 2516 chunks + 116 publications + 33 sequence + 18 vector-equilibrium = 5282.',
    js: () => 38 * 2711315 <= 103030000 && 38 * 2711316 > 103030000 && 2711315 > 1000000
      && 26 * 167 <= 4352 && 2599 + 2516 + 116 + 33 + 18 === 5282,
    lean: 'theorem counting_beats_composing_by_six_magnitudes : (103030000 / 38 = 2711315) ∧ (2711315 > 1000000) ∧ (4352 / 26 = 167) ∧ (2599 + 2516 + 116 + 33 + 18 = 5282) := by decide' },

  { key: 'the_page_budget_is_twice_the_ledger', name: '12037 pages fit the 8192 cap and the site has 5260 — the margin is a page count, not a memory reading',
    why: 'THE MARGIN WAS BEING READ OFF THE WRONG QUANTITY, and I was the one reading it. I reported peak resident memory creeping 8460 to 8997 MB against an 8192 MB heap cap as a shrinking margin. Those do not compare: a resident set includes native memory, the bundler\'s native module and the collector\'s semispaces, so it EXCEEDS the heap cap as a matter of course. Worse, re-measuring showed the number is not even stable — the same cap gave 7580 MB on one run and 9069 on the next, a swing of 1489, so a two-sample trend was noise. WHAT IS REPRODUCIBLE IS THE THRESHOLD: at 5260 pages the build fails at a 4096 MB cap and succeeds at 4352, and it failed at 4096 twice. So the real margin is 8192 − 4352 = 3840 MB, 47% of the cap unused. IN PAGES, which is the quantity that actually grows: two measured thresholds — 1200 pages inside 2048, 5260 inside 4352 — give 567 thousandths of a megabyte per page over a 1367 MB base, and that line reaches 12037 pages at the 8192 cap, more than twice the 5260 the site has. HONEST: a line through two points DESCRIBES those points, it does not predict a third, and the 4349 it computes for today lands 3 MB under the measured 4352 because the line was fitted to that measurement. What is sealed is the threshold, the unused 3840, and the budget the line implies — so the next person asks a page count instead of squinting at a resident set.',
    // integer division by remainder — Math.* is a hard-reject tree-wide, and a floor is a subtraction away
    js: () => { const base = 1367, per = 567, cap = 8192
      const div = (n: number, d: number): number => (n - (n % d)) / d
      return base + div(5260 * per, 1000) === 4349 && 4349 < 4352 && cap - 4352 === 3840
        && div((cap - base) * 1000, per) === 12037 && 12037 > 5260 * 2 },
    lean: 'theorem the_page_budget_is_twice_the_ledger : (1367 + 2982 = 4349) ∧ (4349 < 4352) ∧ (8192 - 4352 = 3840) ∧ (12037 > 10520) ∧ (5260 * 2 = 10520) := by decide' },

  { key: 'the_concurrency_knob_cannot_close_the_gap', name: 'the knob\'s whole travel is 420 MB against a 750 MB overshoot', skill: 'site-build',
    why: 'THE DRIFT AND ITS HARMONISATION IN ONE STATEMENT, which is the only way this ledger is allowed to name a drift. Turning the render concurrency from its default 64 down to 2 moved peak resident memory from 8170 MB to 7750 MB — a drift of 420 MB, and 420 taken nineteen times is 7980, still under 8170, so the whole travel of the knob is less than a nineteenth of what the process holds. THE HARMONISATION is the second half: the container is overshot by 8942 − 8192 = 750 MB, and 420 < 750, so even pulling the knob through its ENTIRE range leaves the build over the ceiling. A knob that cannot close the gap at full travel was never the cause of the gap. This is why concurrency 8 rode in the commit that OOMed anyway.',
    js: () => 8170 - 7750 === 420 && 420 * 19 === 7980 && 7980 < 8170 && 8942 - 8192 === 750 && 420 < 750,
    lean: 'theorem the_concurrency_knob_cannot_close_the_gap : (8170 - 7750 = 420) ∧ (420 * 19 = 7980) ∧ (7980 < 8170) ∧ (8942 - 8192 = 750) ∧ (420 < 750) := by decide' },

  { key: 'the_params_are_not_the_retained_mass', name: 'the per-page params are under an eight-hundredth of the retained mass', skill: 'site-build',
    why: 'WHY CUTTING THE DATA CHANGED NOTHING. The per-page params were trimmed from 61 MB to 50 MB by dropping the crosslink graph — 11 MB, which is 110 tenths, and 110 taken eight hundred times is 88000, still under the 89420 tenths the render retains. So the entire params payload is under a eight-hundredth of the retained mass, and removing a fifth of it is a rounding error against the ceiling. The measurement agreed: the build failed at the same cap with the graph gone. A term that small cannot be the dominant one, and this is the arithmetic that says so before anyone spends an hour re-testing it.',
    js: () => 61 - 50 === 11 && 11 * 10 === 110 && 110 * 800 === 88000 && 88000 < 89420,
    lean: 'theorem the_params_are_not_the_retained_mass : (61 - 50 = 11) ∧ (11 * 10 = 110) ∧ (110 * 800 = 88000) ∧ (88000 < 89420) := by decide' },

  // NO `name` ON THIS ONE, DELIBERATELY, AND IT IS NOT AN OVERSIGHT — the other six in this wing carry human
  // names. Naming it moved the note rosetta reads from this `why` (which says "measured at 107.84 seconds") to
  // the short name, and `measured at` is one alternative of the WITNESS pattern, so the rename DROPPED a witness
  // leg and the floor — which may only rise — refused the change as a regression.
  //
  // THE LEG WAS NEVER EARNED. A witness must be "something outside this repository that a stranger could consult
  // — a published standard, a named author, a measured artefact"; this is a stopwatch reading on one operator's
  // machine. Measured from git: FLOOR was `witness: 16` at 7946c0e4, before this wing, and this theorem's own
  // text raised it to 17. So my wing inflated the scarcest and most load-bearing census in the ledger, silently,
  // because the ratchet only ever checks for LOSS.
  //
  // Correcting it means lowering a published floor, and the tool has no path for that on purpose: it cannot tell
  // a false anchor being removed from a real one being lost. Lowering it is the captain's call, not a side effect
  // of my renaming pass — so the pre-wing state stands here and the finding is reported instead of acted on.
  { key: 'the_process_holds_more_than_the_container_allows', name: 'peak resident 8460 MB exceeds the 8192 MB cap by 268 — a heap is not a resident set', skill: 'site-build',
    why: 'THE SAME CAP IS NOT THE SAME CEILING. Raising the heap flag to 8192 MB builds this site on an operator machine — measured at 107.84 seconds with peak resident memory 8460 MB — and 8460 exceeds 8192 by 268. The flag governs when V8 gives up; the container governs what the process may hold, and the process holds more than the flag names because a heap is not the whole of a resident set. So a container sized to the flag still kills the build, which is the exact shape of the failure that outlived four rounds of tuning: the setting looked sufficient every time it was read, and was never what the container was measuring.',
    js: () => 8460 > 8192 && 8460 - 8192 === 268 && 10784 === 107 * 100 + 84,
    lean: 'theorem the_process_holds_more_than_the_container_allows : (8460 > 8192) ∧ (8460 - 8192 = 268) ∧ (10784 = 107 * 100 + 84) := by decide' },

  { key: 'verify_costs_one_walk_against_the_whole_page_count', name: 'one directory walk against 5260 page renders', skill: 'site-build',
    why: 'THE FOLD AT THE DEPLOY DOOR, in the ledger\'s own idiom: verify beats recompute by magnitudes. The build pays 5260 page renders; the hook that replaced it walks the built directory ONCE and counts what is there, so the work drops from a term in the page count to a term that does not carry it — 5260 to 1, and 5260 is more than five thousand times one. The refusal it can now issue costs a directory read where the failure it replaced cost the full render before dying: 1200 seconds of container time to learn the same thing a single stat answers. This is not an optimisation of the build; it is the build leaving a place it never fit.',
    js: () => 5260 === 5260 * 1 && 5260 > 5000 && 20 * 60 === 1200 && 1200 > 1,
    lean: 'theorem verify_costs_one_walk_against_the_whole_page_count : (5260 = 5260 * 1) ∧ (5260 > 5000) ∧ (20 * 60 = 1200) ∧ (1200 > 1) := by decide' },

  { key: 'a_floor_may_fall_to_what_is_anchored', name: '17 − 2 = 15: a floor standing on two unearned anchors exceeds what it can defend',
    why: 'A RATCHET IS AN AXIOM UNTIL IT IS A THEOREM (the captain, 2026-09-04: the absolute refusal "needs to be replaced by theorems exactly as the axioms are replaced"). The anchoring floor may only RISE, enforced as an imperative refusal, and that imperative cannot tell two opposite things apart: a surviving theorem quietly DROPPING an anchor it earned, and a floor being corrected because an anchor was never earned at all. This ledger produced the second case within a day — the floor stood at 16, a wing added a theorem whose own text said "measured at 107.84 seconds", the WITNESS pattern read that as an external anchor, and the floor rose to 17 on a stopwatch reading from one operator machine that no stranger can consult. Then the law was applied and a SECOND unearned anchor came out, older than mine: s4_parity was anchored by \'measured by inversion count\', which is this project computing about itself — the sentence the law names as the thing that is not a witness. So the floor stood two above its defensible height, 17 − 1 = 16 and 16 − 1 = 15, and 15 is what the law can defend while 17 is strictly above it. THE RULE THIS SEALS: a floor may rise to the number of legs that are externally anchored, and may FALL to that same number, because falling to a count you can defend is a correction and not a loss. What it may never do is fall below it. The imperative is now a computed predicate — a lost leg is a REGRESSION only where the leg is still earned, and a CORRECTION where the text no longer earns it — and both are reported rather than one being silently impossible.',
    js: () => { const floorWas = 17; const unearned = 2; const defensible = 15; return floorWas - unearned === defensible && floorWas - 1 === 16 && 16 - 1 === defensible && floorWas > defensible },
    lean: 'theorem a_floor_may_fall_to_what_is_anchored : (17 - 2 = 15) ∧ (17 - 1 = 16) ∧ (16 - 1 = 15) ∧ (17 > 15) := by decide' },

  { key: 'the_wire_rate_rose_by_restored_copy', name: '32293 − 32183 = 110 hundredths per tool: 280 bytes of sentence a parser had been cutting',
    why: 'RAISING A SHRINK-ONLY MEASURE COSTS A THEOREM, which is the friction that stops a gate being widened to fit the change that broke it — so this is the payment, with the arithmetic that decomposes the rise. The MCP wire rate was sealed at 32183 hundredths of a byte per tool over 242 tools (77885 bytes). It now reads 32293 over 255 tools (82349). The total grew 82349 − 77885 = 4464 bytes, of which 13 new tools at the OLD rate account for 13 · 32183 = 418379 hundredths — 4184 bytes — leaving 280. And 280 bytes is exactly the rate rise across the surface: 110 · 255 = 28050 hundredths. So the density did move, by 1.10 bytes per tool, and the cause is not new prose: the sentence splitter treated the period in a decimal as a sentence end, so `CC-BY-NC-ND-4.0` cut at the `.` and 45 tools served 23 to 56 characters where their author had written a full first sentence. Fixing that restored the copy; 41 of the 280 bytes are the ellipses that now mark a truncation instead of splicing a fragment into `Returns {…}`. The rate may only shrink, and this is the exception stated in full rather than a re-seal made quietly.',
    js: () => 32293 - 32183 === 110 && 255 - 242 === 13 && 110 * 255 === 28050 && 82349 - 77885 === 4464 && 13 * 32183 === 418379,
    lean: 'theorem the_wire_rate_rose_by_restored_copy : (32293 - 32183 = 110) ∧ (255 - 242 = 13) ∧ (110 * 255 = 28050) ∧ (82349 - 77885 = 4464) ∧ (13 * 32183 = 418379) := by decide' },

  { key: 'exponent_associativity_changes_the_value', name: '2^3^2 = 512, but (2^3)^2 = 64', skill: 'typesetting',
    why: 'THE TYPESETTER\'S FIRST TRAP, AND THE LEDGER IS ITS REFEREE. A statement sealed as `2^3^2 = 512` is true only if the exponent associates to the RIGHT — 2^(3^2) is 2^9 = 512, while (2^3)^2 is 8^2 = 64 — and 512 and 64 are not the same number, so a typesetter that set the exponents left-associatively would render a sealed truth as a falsehood while looking perfectly typeset. This is what makes the ledger usable as a test of its own presentation: every statement is true by decide, so evaluating a parse of one is a check the kernel referees rather than a check the author marks. The formula layer was validated exactly this way and the associativity is the case that catches the error.',
    js: () => { const right = 2 ** (3 ** 2); const left = (2 ** 3) ** 2; return right !== left && right === 512 && left === 64 },
    lean: 'theorem exponent_associativity_changes_the_value : (2^3^2 = 512) ∧ ((2^3)^2 = 64) ∧ (512 ≠ 64) := by decide' },

  { key: 'the_congruence_form_is_the_modulus_form', name: 'x − (x mod 9) is divisible by 9 for every x below 63', skill: 'typesetting',
    why: 'WHY THE STANDARD FORM IS NOT A REWORDING. A statement sealed as `x % n = r` is typeset as the congruence `x ≡ r (mod n)`, and that is a change of NOTATION only if the two say the same thing — which they do exactly when the difference between a number and its residue is divisible by the modulus. Checked here by exhaustion over the fused ring: for every x below 63, x minus (x mod 9) is a multiple of 9, and the residue is itself below 9. So the congruence the page prints and the remainder the kernel decided are one statement in two hands, and the typesetting adds no claim of its own. Proven over every case rather than argued, because a notation that is right in general and wrong at an edge is worse than no notation.',
    js: () => range(63).every((x) => (x - (x % 9)) % 9 === 0 && x % 9 < 9),
    lean: 'theorem the_congruence_form_is_the_modulus_form : ((List.range 63).all (fun x => ((x - x % 9) % 9 == 0) && (x % 9 < 9))) := by decide' },
]

console.log('computing ' + FACTS.length + ' SITE-BUILD facts (the render ceiling as arithmetic, and the typesetting it referees) …')

emit({ file: 'SiteBuild.lean', skill: 'site-build',
  header: 'THE SITE BUILD AS ARITHMETIC — the render phase retains every page for the whole run, so the heap is the page count times 17 tenths of a megabyte, and 5260 pages come to 8942 MB against a deploy container of 8192. The two knobs are sealed as insufficient rather than described as such: the concurrency\'s entire travel is 420 MB against a 750 MB overshoot, and the params are under a eight-hundredth of the retained mass. So the build left the container and the hook now verifies what the operator machine rendered. The same wing carries the arithmetic the typesetter is judged by, because the ledger is the referee of its own presentation: exponents associate right, and a congruence is the remainder in another hand.',
  facts: FACTS })
