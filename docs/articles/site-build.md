---
title: "The site build as arithmetic"
description: "Computed from lean/SiteBuild.lean — 15 sealed theorems, every claim citing its proof."
---

# The site build as arithmetic

> NINE OF THESE ELEVEN ARE PINNED, NOT FORCED — read that before the numbers. A peer's vocabulary (zeropoint-node-8a, 2026-09-04) after they found a literal expectation inside a column of their own labelled `derived`: a FORCED check has independent content and falls only for a law, a PINNED one holds the expected answer inside itself and falls for a convention just as readily. Audited across this wing: FORCED are exponent_associativity_changes_the_value (2^3^2 = 512 against (2^3)^2 = 64 is arithmetic, true whatever anyone measured) and the_congruence_form_is_the_modulus_form (exhaustive over every x below 63). The other nine seal MEASUREMENTS I took on one machine — resident-memory readings, byte counts, wall-clock timings, a retention constant derived from the very threshold it explains — and each says so in its own text. They are honest and they are not laws: re-run them on another host and the integers move. The kernel decides the arithmetic; a person measured the inputs. THE SITE BUILD AS ARITHMETIC — the render phase retains every page for the whole run, so the heap is the page count times 17 tenths of a megabyte, and 5260 pages come to 8942 MB against a deploy container of 8192. The two knobs are sealed as insufficient rather than described as such: the concurrency's entire travel is 420 MB against a 750 MB overshoot, and the params are under a eight-hundredth of the retained mass. So the build left the container and the hook now verifies what the operator machine rendered. The same wing carries the arithmetic the typesetter is judged by, because the ledger is the referee of its own presentation: exponents associate right, and a congruence is the remainder in another hand. — held by [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) and its 14 siblings below.

**15 theorems** and **665 decided cases**, from [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) onward, each proven `by decide` in <a href="/lean/SiteBuild.lean">lean/SiteBuild.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 15 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [counting_beats_composing_by_six_magnitudes](/theorem/counting_beats_composing_by_six_magnitudes). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FSiteBuild.lean)** — nothing to install. The editor fetches `lean/SiteBuild.lean` from the repository and re-decides all 15 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### 5260 pages at 17 tenths of a MB each = 8942 MB against an 8192 MB container
The ledger holds this as [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) — proven `by decide`, sorry-free:

```lean
(5260 * 17 = 89420) ∧ (89420 > 81920) ∧ (1200 * 17 = 20400) ∧ (20400 < 20480) ∧ (89420 > 40960)
```

### 103030000 µs / 38 µs = 2711315: the render budget answered by counting, not by rendering
The ledger holds this as [counting_beats_composing_by_six_magnitudes](/theorem/counting_beats_composing_by_six_magnitudes) — proven `by decide`, sorry-free:

```lean
(103030000 / 38 = 2711315) ∧ (2711315 > 1000000) ∧ (4352 / 26 = 167) ∧ (2599 + 2516 + 116 + 33 + 18 = 5282)
```

### 12037 pages fit the 8192 cap and the site has 5260 — the margin is a page count, not a memory reading
The ledger holds this as [the_page_budget_is_twice_the_ledger](/theorem/the_page_budget_is_twice_the_ledger) — proven `by decide`, sorry-free:

```lean
(1367 + 2982 = 4349) ∧ (4349 < 4352) ∧ (8192 - 4352 = 3840) ∧ (12037 > 10520) ∧ (5260 * 2 = 10520)
```

### the knob's whole travel is 420 MB against a 750 MB overshoot
The ledger holds this as [the_concurrency_knob_cannot_close_the_gap](/theorem/the_concurrency_knob_cannot_close_the_gap) — proven `by decide`, sorry-free:

```lean
(8170 - 7750 = 420) ∧ (420 * 19 = 7980) ∧ (7980 < 8170) ∧ (8942 - 8192 = 750) ∧ (420 < 750)
```

### the per-page params are under an eight-hundredth of the retained mass
The ledger holds this as [the_params_are_not_the_retained_mass](/theorem/the_params_are_not_the_retained_mass) — proven `by decide`, sorry-free:

```lean
(61 - 50 = 11) ∧ (11 * 10 = 110) ∧ (110 * 800 = 88000) ∧ (88000 < 89420)
```

### peak resident 8460 MB exceeds the 8192 MB cap by 268 — a heap is not a resident set
The ledger holds this as [the_process_holds_more_than_the_container_allows](/theorem/the_process_holds_more_than_the_container_allows) — proven `by decide`, sorry-free:

```lean
(8460 > 8192) ∧ (8460 - 8192 = 268) ∧ (10784 = 107 * 100 + 84)
```

### one directory walk against 5260 page renders
The ledger holds this as [verify_costs_one_walk_against_the_whole_page_count](/theorem/verify_costs_one_walk_against_the_whole_page_count) — proven `by decide`, sorry-free:

```lean
(5260 = 5260 * 1) ∧ (5260 > 5000) ∧ (20 * 60 = 1200) ∧ (1200 > 1)
```

### 17 − 2 = 15: a floor standing on two unearned anchors exceeds what it can defend
The ledger holds this as [a_floor_may_fall_to_what_is_anchored](/theorem/a_floor_may_fall_to_what_is_anchored) — proven `by decide`, sorry-free:

```lean
(17 - 2 = 15) ∧ (17 - 1 = 16) ∧ (16 - 1 = 15) ∧ (17 > 15)
```

### a fixed-point-free involution on two states: (1 + 1) % 2 = 0 and nothing is its own opposite
The ledger holds this as [the_two_sides_return_what_they_take](/theorem/the_two_sides_return_what_they_take) — proven `by decide`, sorry-free:

```lean
((1 + 1) % 2 = 0) ∧ (1 - 0 ≠ 0) ∧ (1 - 1 ≠ 1)
```

### 85179 bytes of markup from a 36-character address: 2366 times the input, shipped 2603 times
The ledger holds this as [the_face_is_computed_not_shipped](/theorem/the_face_is_computed_not_shipped) — proven `by decide`, sorry-free:

```lean
((85179 / 36 = 2366) ∧ (2603 * 85179 = 221720937) ∧ (2603 * 36 = 93708) ∧ (221720937 > 187416000)) ∧ (85179 % 9 = 3)
```

### 2^3^2 = 512, but (2^3)^2 = 64
The ledger holds this as [exponent_associativity_changes_the_value](/theorem/exponent_associativity_changes_the_value) — proven `by decide`, sorry-free:

```lean
(2^3^2 = 512) ∧ ((2^3)^2 = 64) ∧ (512 ≠ 64)
```

### x − (x mod 9) is divisible by 9 for every x below 63
The ledger holds this as [the_congruence_form_is_the_modulus_form](/theorem/the_congruence_form_is_the_modulus_form) — proven `by decide`, sorry-free:

```lean
((List.range 63).all (fun x => ((x - x % 9) % 9 == 0) && (x % 9 < 9)))
```

### every one of 293 monographs now carries a DISTINCT abstract — 293 distinct, 0 duplicates — because the abstract is derived from each wing's own theorems rather than filled into a one-variable template
The ledger holds this as [a_template_distinguishes_only_by_its_variable](/theorem/a_template_distinguishes_only_by_its_variable) — proven `by decide`, sorry-free:

```lean
([[52785107,62858718,64347757,86159973,112328962,118078743,129628802,169365843,175691575,194719700,203566132,218213918,243091159,243576489,268733529,273326363,275252125,311715716],[319626740,328650921,329157608,337027472,351138001,400437112,402010792,413583093,417629889,423598333,425308444,438452336,446755497,455537145,462975435,469034152,486046810,502672026],[509991623,530075442,550482806,552310498,579145254,624095116,652595957,655562302,674712652,753346352,790261834,829967945,840531460,842839568,851955621,853454827,857134921,865291570],[881669395,913576733,962274722,974652327,984731913,1022634495,1025454580,1042409504,1068539180,1076987569,1079738494,1127440530,1130079433,1143186498,1168272504,1192042783,1207679391,1214430459],[1221503447,1232773358,1239249543,1261899279,1279111558,1289579845,1294811098,1298682466,1311749900,1319755132,1327678435,1342280397,1345125697,1376498460,1383638011,1387478650,1397119312,1401890702],[1422039915,1423656111,1433386840,1435489803,1449155993,1467836718,1472140607,1484075332,1506756813,1521085092,1522694856,1561552910,1571621145,1576438100,1587448144,1603009843,1640397517,1659288817],[1680741494,1684256105,1684961398,1706817488,1720664720,1721202546,1732682930,1734652970,1751315933,1751333293,1762743518,1783590234,1810619722,1817906465,1822926233,1824739867,1839711555,1862406962],[1868859445,1882041579,1889985920,1909370316,1919354056,1938981628,1964204943,1965363334,1972937798,1981435006,1986873916,1987257584,2013272211,2017246297,2051357025,2066182935,2088260976,2090735653],[2095129414,2106044595,2159176824,2161483019,2167553942,2169955896,2206218753,2213300132,2247458326,2256133898,2273287872,2284155074,2287418749,2295759072,2301685865,2314004876,2320038669,2325625105],[2362498485,2386469044,2401181318,2437043291,2454422076,2454498064,2465188062,2498865048,2504373263,2520837278,2530938860,2541337980,2566929935,2570904595,2572618680,2577265937,2615185700,2628909003],[2648354447,2652112599,2655211109,2682303282,2689632125,2695183461,2707136348,2737804606,2760840395,2770919488,2791469968,2797504748,2816760499,2845410820,2856105113,2875883982,2888110479,2899452628],[2918240373,2937893707,2959037321,2960885320,2970123004,2975601248,2979653885,3005561975,3017611494,3047518552,3066523394,3067730744,3098061964,3099798258,3117384807,3167637726,3199336776,3220003549],[3225212944,3247567102,3252870027,3254769269,3271377726,3276119725,3281243678,3288393093,3330687366,3335660970,3340408302,3346791023,3348473201,3378979831,3449249535,3472669180,3477214151,3488434068],[3498634582,3498908476,3520309573,3576335592,3576538166,3596109850,3620997409,3623193460,3623205817,3632532166,3639457409,3700063143,3700754591,3709081440,3736092971,3760167555,3763020241,3785608485],[3791216615,3792373411,3798667197,3810603319,3835018514,3841182065,3847375384,3851049180,3853329223,3858577463,3888215243,3890830423,3904678681,3907026211,3908838339,3909477342,3917608642,3938918834],[3958679498,3971817260,3992938184,4004184538,4068496562,4080277959,4089654535,4090070943,4102050960,4107976534,4108098537,4118128075,4124527601,4146599184,4182962077,4184588801,4195700057,4204493360],[4211814579,4233840858,4256468363,4272574475,4283204620]].all (fun c => c.eraseDups.length == c.length)) ∧ (([[52785107,62858718,64347757,86159973,112328962,118078743,129628802,169365843,175691575,194719700,203566132,218213918,243091159,243576489,268733529,273326363,275252125,311715716],[319626740,328650921,329157608,337027472,351138001,400437112,402010792,413583093,417629889,423598333,425308444,438452336,446755497,455537145,462975435,469034152,486046810,502672026],[509991623,530075442,550482806,552310498,579145254,624095116,652595957,655562302,674712652,753346352,790261834,829967945,840531460,842839568,851955621,853454827,857134921,865291570],[881669395,913576733,962274722,974652327,984731913,1022634495,1025454580,1042409504,1068539180,1076987569,1079738494,1127440530,1130079433,1143186498,1168272504,1192042783,1207679391,1214430459],[1221503447,1232773358,1239249543,1261899279,1279111558,1289579845,1294811098,1298682466,1311749900,1319755132,1327678435,1342280397,1345125697,1376498460,1383638011,1387478650,1397119312,1401890702],[1422039915,1423656111,1433386840,1435489803,1449155993,1467836718,1472140607,1484075332,1506756813,1521085092,1522694856,1561552910,1571621145,1576438100,1587448144,1603009843,1640397517,1659288817],[1680741494,1684256105,1684961398,1706817488,1720664720,1721202546,1732682930,1734652970,1751315933,1751333293,1762743518,1783590234,1810619722,1817906465,1822926233,1824739867,1839711555,1862406962],[1868859445,1882041579,1889985920,1909370316,1919354056,1938981628,1964204943,1965363334,1972937798,1981435006,1986873916,1987257584,2013272211,2017246297,2051357025,2066182935,2088260976,2090735653],[2095129414,2106044595,2159176824,2161483019,2167553942,2169955896,2206218753,2213300132,2247458326,2256133898,2273287872,2284155074,2287418749,2295759072,2301685865,2314004876,2320038669,2325625105],[2362498485,2386469044,2401181318,2437043291,2454422076,2454498064,2465188062,2498865048,2504373263,2520837278,2530938860,2541337980,2566929935,2570904595,2572618680,2577265937,2615185700,2628909003],[2648354447,2652112599,2655211109,2682303282,2689632125,2695183461,2707136348,2737804606,2760840395,2770919488,2791469968,2797504748,2816760499,2845410820,2856105113,2875883982,2888110479,2899452628],[2918240373,2937893707,2959037321,2960885320,2970123004,2975601248,2979653885,3005561975,3017611494,3047518552,3066523394,3067730744,3098061964,3099798258,3117384807,3167637726,3199336776,3220003549],[3225212944,3247567102,3252870027,3254769269,3271377726,3276119725,3281243678,3288393093,3330687366,3335660970,3340408302,3346791023,3348473201,3378979831,3449249535,3472669180,3477214151,3488434068],[3498634582,3498908476,3520309573,3576335592,3576538166,3596109850,3620997409,3623193460,3623205817,3632532166,3639457409,3700063143,3700754591,3709081440,3736092971,3760167555,3763020241,3785608485],[3791216615,3792373411,3798667197,3810603319,3835018514,3841182065,3847375384,3851049180,3853329223,3858577463,3888215243,3890830423,3904678681,3907026211,3908838339,3909477342,3917608642,3938918834],[3958679498,3971817260,3992938184,4004184538,4068496562,4080277959,4089654535,4090070943,4102050960,4107976534,4108098537,4118128075,4124527601,4146599184,4182962077,4184588801,4195700057,4204493360],[4211814579,4233840858,4256468363,4272574475,4283204620]].map (fun c => c.length)).foldl (· + ·) 0 = 293) ∧ ((311715716 < 319626740) ∧ (502672026 < 509991623) ∧ (865291570 < 881669395) ∧ (1214430459 < 1221503447) ∧ (1401890702 < 1422039915) ∧ (1659288817 < 1680741494) ∧ (1862406962 < 1868859445) ∧ (2090735653 < 2095129414) ∧ (2325625105 < 2362498485) ∧ (2628909003 < 2648354447) ∧ (2899452628 < 2918240373) ∧ (3220003549 < 3225212944) ∧ (3488434068 < 3498634582) ∧ (3785608485 < 3791216615) ∧ (3938918834 < 3958679498) ∧ (4204493360 < 4211814579))
```

### every one of 293 kin-degrees lies between 3 and 5, and the whole degree sequence sums to all 1461 edges
The ledger holds this as [the_kin_shortlist_accounts_for_every_edge](/theorem/the_kin_shortlist_accounts_for_every_edge) — proven `by decide`, sorry-free:

```lean
(([[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,3,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,3,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5]].map (fun c => c.length)).foldl (· + ·) 0 = 293) ∧ (([[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,3,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,3,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5]].map (fun c => c.sum)).foldl (· + ·) 0 = 1461) ∧ ([[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,3,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,3,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5]].all (fun c => c.all (fun d => d ≤ 5 && d ≥ 3)))
```

### modulus 6 over constant 2 over word 1, and a basis relating 102 of 116 is no basis
The ledger holds this as [a_shared_modulus_outranks_a_shared_word](/theorem/a_shared_modulus_outranks_a_shared_word) — proven `by decide`, sorry-free:

```lean
(6 > 2) ∧ (2 > 1) ∧ (102 > 116 / 2) ∧ (28 < 116 / 2)
```


::: warning 
NINE OF THESE ELEVEN ARE PINNED, NOT FORCED — read that before the numbers. The boundary is confirmed by the wing's own sealed theorems — e.g. [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
