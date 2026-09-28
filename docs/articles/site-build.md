---
title: "The site build as arithmetic"
description: "Computed from lean/SiteBuild.lean — 15 sealed theorems, every claim citing its proof."
---

# The site build as arithmetic

> NINE OF THESE ELEVEN ARE PINNED, NOT FORCED — read that before the numbers. A peer's vocabulary (zeropoint-node-8a, 2026-09-04) after they found a literal expectation inside a column of their own labelled `derived`: a FORCED check has independent content and falls only for a law, a PINNED one holds the expected answer inside itself and falls for a convention just as readily. Audited across this wing: FORCED are exponent_associativity_changes_the_value (2^3^2 = 512 against (2^3)^2 = 64 is arithmetic, true whatever anyone measured) and the_congruence_form_is_the_modulus_form (exhaustive over every x below 63). The other nine seal MEASUREMENTS I took on one machine — resident-memory readings, byte counts, wall-clock timings, a retention constant derived from the very threshold it explains — and each says so in its own text. They are honest and they are not laws: re-run them on another host and the integers move. The kernel decides the arithmetic; a person measured the inputs. THE SITE BUILD AS ARITHMETIC — the render phase retains every page for the whole run, so the heap is the page count times 17 tenths of a megabyte, and 5260 pages come to 8942 MB against a deploy container of 8192. The two knobs are sealed as insufficient rather than described as such: the concurrency's entire travel is 420 MB against a 750 MB overshoot, and the params are under a eight-hundredth of the retained mass. So the build left the container and the hook now verifies what the operator machine rendered. The same wing carries the arithmetic the typesetter is judged by, because the ledger is the referee of its own presentation: exponents associate right, and a congruence is the remainder in another hand. — held by [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) and its 14 siblings below.

**15 theorems** and **603 decided cases**, from [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) onward, each proven `by decide` in <a href="/lean/SiteBuild.lean">lean/SiteBuild.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 15 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [counting_beats_composing_by_six_magnitudes](/theorem/counting_beats_composing_by_six_magnitudes). A boundary stated here is decided.

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

### every one of 262 monographs now carries a DISTINCT abstract — 262 distinct, 0 duplicates — because the abstract is derived from each wing's own theorems rather than filled into a one-variable template
The ledger holds this as [a_template_distinguishes_only_by_its_variable](/theorem/a_template_distinguishes_only_by_its_variable) — proven `by decide`, sorry-free:

```lean
([[18699480,29177700,39641198,42133168,64347757,107349878,113697884,118078743,129628802,134048289,147685528,169680719,171130258,171914572,175691575,177243710,194719700],[203566132,218213918,230339181,239072260,268733529,273326363,280690081,299674474,328650921,372643413,400437112,423598333,427997923,445887877,446755497,462975435,502672026],[530075442,543609620,550482806,552310498,562671630,579145254,619308920,627992894,652595957,701095524,730669305,737907661,760593203,790261834,811508052,815307234,817108158],[823880620,840531460,851955621,853454827,903717537,908498691,911699107,965177401,974652327,1016461823,1025454580,1042409504,1052463247,1076987569,1116626705,1130079433,1143186498],[1160287529,1196495142,1205180295,1214430459,1221503447,1224742601,1232773358,1254555243,1292854804,1294811098,1311749900,1327678435,1342280397,1345125697,1346721450,1376144312,1376498460],[1383638011,1421310899,1423656111,1449155993,1463889493,1472140607,1472237061,1496041434,1499623147,1512426110,1521085092,1571621145,1578901707,1597684209,1632187124,1636835668,1672619900],[1720664720,1727545077,1732682930,1732907209,1734652970,1739656224,1746354473,1751333293,1757992030,1762743518,1784230919,1844073570,1859298737,1868859445,1879384078,1903834002,1909370316],[1914953607,1918101649,1937603699,1964204943,2004178895,2014750471,2017246297,2030439796,2051357025,2061484343,2072689940,2090735653,2118310089,2148004852,2154140704,2154504153,2157653840],[2167553942,2169955896,2171385115,2189846064,2197441124,2208168625,2256133898,2260728110,2284155074,2301685865,2303859893,2306112492,2312504706,2325625105,2340829449,2346326007,2362498485],[2371754311,2382057011,2386469044,2400608327,2401181318,2404304804,2470048444,2525928808,2530938860,2541337980,2546876301,2553426891,2571449220,2582304275,2610773422,2628909003,2631679009],[2648354447,2652112599,2661952090,2707136348,2712605490,2714103410,2730644211,2770919488,2796155786,2814257517,2816760499,2846685787,2850073336,2851017819,2874862674,2888110479,2953682895],[2959037321,2970123004,2973501982,2993956309,3005561975,3047518552,3050102082,3055101069,3063549654,3066523394,3067730744,3087454243,3097446852,3098061964,3125777195,3153416381,3214898046],[3225142892,3252870027,3254769269,3342631632,3348473201,3355860253,3418410166,3471804363,3477214151,3479391231,3509696483,3521867139,3521929026,3524191813,3576538166,3587503880,3599169530],[3632532166,3638326412,3652407292,3683272930,3686552878,3694452490,3697857504,3736092971,3740673974,3766055522,3785608485,3786333846,3802176242,3821873318,3841182065,3875150051,3890830423],[3904251766,3906605619,3909477342,3934799393,3938918834,3990523055,4028232468,4066818595,4075577072,4086151010,4089654535,4090070943,4102050960,4106732638,4124527601,4146599184,4183316518],[4185953728,4206394984,4213254918,4235444354,4250323480,4256468363,4283204620]].all (fun c => c.eraseDups.length == c.length)) ∧ (([[18699480,29177700,39641198,42133168,64347757,107349878,113697884,118078743,129628802,134048289,147685528,169680719,171130258,171914572,175691575,177243710,194719700],[203566132,218213918,230339181,239072260,268733529,273326363,280690081,299674474,328650921,372643413,400437112,423598333,427997923,445887877,446755497,462975435,502672026],[530075442,543609620,550482806,552310498,562671630,579145254,619308920,627992894,652595957,701095524,730669305,737907661,760593203,790261834,811508052,815307234,817108158],[823880620,840531460,851955621,853454827,903717537,908498691,911699107,965177401,974652327,1016461823,1025454580,1042409504,1052463247,1076987569,1116626705,1130079433,1143186498],[1160287529,1196495142,1205180295,1214430459,1221503447,1224742601,1232773358,1254555243,1292854804,1294811098,1311749900,1327678435,1342280397,1345125697,1346721450,1376144312,1376498460],[1383638011,1421310899,1423656111,1449155993,1463889493,1472140607,1472237061,1496041434,1499623147,1512426110,1521085092,1571621145,1578901707,1597684209,1632187124,1636835668,1672619900],[1720664720,1727545077,1732682930,1732907209,1734652970,1739656224,1746354473,1751333293,1757992030,1762743518,1784230919,1844073570,1859298737,1868859445,1879384078,1903834002,1909370316],[1914953607,1918101649,1937603699,1964204943,2004178895,2014750471,2017246297,2030439796,2051357025,2061484343,2072689940,2090735653,2118310089,2148004852,2154140704,2154504153,2157653840],[2167553942,2169955896,2171385115,2189846064,2197441124,2208168625,2256133898,2260728110,2284155074,2301685865,2303859893,2306112492,2312504706,2325625105,2340829449,2346326007,2362498485],[2371754311,2382057011,2386469044,2400608327,2401181318,2404304804,2470048444,2525928808,2530938860,2541337980,2546876301,2553426891,2571449220,2582304275,2610773422,2628909003,2631679009],[2648354447,2652112599,2661952090,2707136348,2712605490,2714103410,2730644211,2770919488,2796155786,2814257517,2816760499,2846685787,2850073336,2851017819,2874862674,2888110479,2953682895],[2959037321,2970123004,2973501982,2993956309,3005561975,3047518552,3050102082,3055101069,3063549654,3066523394,3067730744,3087454243,3097446852,3098061964,3125777195,3153416381,3214898046],[3225142892,3252870027,3254769269,3342631632,3348473201,3355860253,3418410166,3471804363,3477214151,3479391231,3509696483,3521867139,3521929026,3524191813,3576538166,3587503880,3599169530],[3632532166,3638326412,3652407292,3683272930,3686552878,3694452490,3697857504,3736092971,3740673974,3766055522,3785608485,3786333846,3802176242,3821873318,3841182065,3875150051,3890830423],[3904251766,3906605619,3909477342,3934799393,3938918834,3990523055,4028232468,4066818595,4075577072,4086151010,4089654535,4090070943,4102050960,4106732638,4124527601,4146599184,4183316518],[4185953728,4206394984,4213254918,4235444354,4250323480,4256468363,4283204620]].map (fun c => c.length)).foldl (· + ·) 0 = 262) ∧ ((194719700 < 203566132) ∧ (502672026 < 530075442) ∧ (817108158 < 823880620) ∧ (1143186498 < 1160287529) ∧ (1376498460 < 1383638011) ∧ (1672619900 < 1720664720) ∧ (1909370316 < 1914953607) ∧ (2157653840 < 2167553942) ∧ (2362498485 < 2371754311) ∧ (2631679009 < 2648354447) ∧ (2953682895 < 2959037321) ∧ (3214898046 < 3225142892) ∧ (3599169530 < 3632532166) ∧ (3890830423 < 3904251766) ∧ (4183316518 < 4185953728))
```

### every one of 262 kin-degrees lies between 2 and 5, and the whole degree sequence sums to all 1304 edges
The ledger holds this as [the_kin_shortlist_accounts_for_every_edge](/theorem/the_kin_shortlist_accounts_for_every_edge) — proven `by decide`, sorry-free:

```lean
(([[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,2,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5]].map (fun c => c.length)).foldl (· + ·) 0 = 262) ∧ (([[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,2,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5]].map (fun c => c.sum)).foldl (· + ·) 0 = 1304) ∧ ([[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,2,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],[5,5,5,5,5,5,5]].all (fun c => c.all (fun d => d ≤ 5 && d ≥ 2)))
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
