---
title: "THE FAMILIES, W"
description: "Computed from lean/FamiliesW.lean — 21 sealed theorems, every claim citing its proof."
---

# THE FAMILIES, W

> THE FAMILIES, W — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. — held by [fam_walkability](/theorem/fam_walkability) and its 20 siblings below.

**21 theorems** and **7,703 decided cases**, from [fam_walkability](/theorem/fam_walkability) onward, each proven `by decide` in <a href="/lean/FamiliesW.lean">lean/FamiliesW.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFamiliesW.lean)** — nothing to install. The editor fetches `lean/FamiliesW.lean` from the repository and re-decides all 21 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### walkability: walkscore(45, 50) = 90; amenityaccess(18, 24) = 75; sidewalkratio(360, 400) = 90; crossingdensity(12, 2000) = 6; walkshed(80, 15) = 1200; pedestriansafety(5, 100) = 95; transitproximity(200, 800) = 75; slopepenalty(8, 100) = 8
The ledger holds this as [fam_walkability](/theorem/fam_walkability) — proven `by decide`, sorry-free:

```lean
((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (24 : Int)) = (75 : Int)) ∧ ((((360 : Int) * (100 : Int)) / (400 : Int)) = (90 : Int)) ∧ ((((12 : Int) * (1000 : Int)) / (2000 : Int)) = (6 : Int)) ∧ (((80 : Int) * (15 : Int)) = (1200 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (((5 : Int) * (100 : Int)) / (100 : Int)))) = (95 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (((200 : Int) * (100 : Int)) / (800 : Int)))) = (75 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (100 : Int)) = (8 : Int))
```

### warehouse: scanrows(10000, 25) = 2500; partitionprune(64, 50) = 14; columnsize(1000, 8) = 8000; compressionratio(1000, 250) = 4; querycost(500, 2, 100) = 1100; materialized(1000, 24) = 976; cardinality(250, 1000) = 25; clustering(1000, 8) = 125
The ledger holds this as [fam_warehouse](/theorem/fam_warehouse) — proven `by decide`, sorry-free:

```lean
((((10000 : Int) * (25 : Int)) / (100 : Int)) = (2500 : Int)) ∧ ((fmax (0 : Int) ((64 : Int) - (50 : Int))) = (14 : Int)) ∧ (((1000 : Int) * (8 : Int)) = (8000 : Int)) ∧ (((1000 : Int) / (250 : Int)) = (4 : Int)) ∧ ((((500 : Int) * (2 : Int)) + (100 : Int)) = (1100 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (24 : Int))) = (976 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ ((-((-(1000 : Int)) / (8 : Int))) = (125 : Int))
```

### warehousing: utilization(750, 1000) = 75; pickrate(600, 8) = 75; accuracy(990, 1000) = 99; turnover(5000, 1000) = 5; dock(30, 10) = 300; slotting(800, 1000) = 80; throughput(7000, 7) = 1000; cube(600, 1000) = 60
The ledger holds this as [fam_warehousing](/theorem/fam_warehousing) — proven `by decide`, sorry-free:

```lean
((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ (((600 : Int) / (8 : Int)) = (75 : Int)) ∧ ((((990 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ (((5000 : Int) / (1000 : Int)) = (5 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (10 : Int)) = (300 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (1000 : Int)) = (80 : Int)) ∧ (((7000 : Int) / (7 : Int)) = (1000 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (1000 : Int)) = (60 : Int))
```

### wastewater: aeration(1000, 30) = 34; bod(300, 200) = 60000; clarifier(1200, 40) = 30; cod(200, 2) = 400; loading(6000, 50) = 120; removal(200, 20) = 90; retention(4800, 200) = 24; sludge(150, 7) = 1050; removal(100, 100) = 0
The ledger holds this as [fam_wastewater](/theorem/fam_wastewater) — proven `by decide`, sorry-free:

```lean
((-((-(1000 : Int)) / (30 : Int))) = (34 : Int)) ∧ (((300 : Int) * (200 : Int)) = (60000 : Int)) ∧ (((1200 : Int) / (40 : Int)) = (30 : Int)) ∧ (((200 : Int) * (2 : Int)) = (400 : Int)) ∧ (((6000 : Int) / (50 : Int)) = (120 : Int)) ∧ (((((200 : Int) - (20 : Int)) * (100 : Int)) / (200 : Int)) = (90 : Int)) ∧ (((4800 : Int) / (200 : Int)) = (24 : Int)) ∧ (((150 : Int) * (7 : Int)) = (1050 : Int)) ∧ (((((100 : Int) - (100 : Int)) * (100 : Int)) / (100 : Int)) = (0 : Int))
```

### waterquality: wqi(270, 3) = 90; dissolvedoxygen(8, 10) = 80; bod(9, 3) = 6; turbidity(5, 4) = 20; hardness(40, 10) = 120; phindex(9, 7) = 2; phindex(6, 7) = 0; nitrate(45, 50) = 90; coliform(1000, 100) = 10
The ledger holds this as [fam_waterquality](/theorem/fam_waterquality) — proven `by decide`, sorry-free:

```lean
(((270 : Int) / (3 : Int)) = (90 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((9 : Int) - (3 : Int))) = (6 : Int)) ∧ (((5 : Int) * (4 : Int)) = (20 : Int)) ∧ ((((40 : Int) * (2 : Int)) + ((10 : Int) * (4 : Int))) = (120 : Int)) ∧ ((fmax (0 : Int) ((9 : Int) - (7 : Int))) = (2 : Int)) ∧ ((fmax (0 : Int) ((6 : Int) - (7 : Int))) = (0 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ (((1000 : Int) / (100 : Int)) = (10 : Int))
```

### watershed: runoff(200, 60) = 120; drainagedensity(1500, 30) = 50; timeofconcentration(3600, 2) = 1800; peakflow(50, 20, 100) = 1000; infiltration(200, 120) = 80; catchmentarea(500, 300) = 150000; basinrelief(1200, 300) = 900
The ledger holds this as [fam_watershed](/theorem/fam_watershed) — proven `by decide`, sorry-free:

```lean
((((200 : Int) * (60 : Int)) / (100 : Int)) = (120 : Int)) ∧ (((1500 : Int) / (30 : Int)) = (50 : Int)) ∧ (((3600 : Int) / (2 : Int)) = (1800 : Int)) ∧ (((((100 : Int) * (50 : Int)) * (20 : Int)) / (100 : Int)) = (1000 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (120 : Int))) = (80 : Int)) ∧ (((500 : Int) * (300 : Int)) = (150000 : Int)) ∧ ((fmax (0 : Int) ((1200 : Int) - (300 : Int))) = (900 : Int))
```

### waveform: period(1000) = 1000; amplitude(100, 20) = 40; rmsvalue(1000) = 707; dutycycle(25, 100) = 25; crestfactor(1000, 707) = 1414; peaktopeak(100, 30) = 70; frequencyfromperiod(1000) = 1000; slewrate(1000, 50) = 20
The ledger holds this as [fam_waveform](/theorem/fam_waveform) — proven `by decide`, sorry-free:

```lean
(((1000000 : Int) / (1000 : Int)) = (1000 : Int)) ∧ (((fmax (0 : Int) ((100 : Int) - (20 : Int))) / (2 : Int)) = (40 : Int)) ∧ ((((1000 : Int) * (707 : Int)) / (1000 : Int)) = (707 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int)) ∧ ((((1000 : Int) * (1000 : Int)) / (707 : Int)) = (1414 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int)) ∧ (((1000000 : Int) / (1000 : Int)) = (1000 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int))
```

### wavelet: levels(1024, 128) = 8; scale(3, 7) = 21; coefficients(1024, 4) = 256; compression(1000, 100) = 90; decomposition(1, 7) = 8; energy(16, 256) = 4096; vanishingmoments(8) = 4; detailcoeffs(1000, 16) = 63; compression(1000, 1000) = 0
The ledger holds this as [fam_wavelet](/theorem/fam_wavelet) — proven `by decide`, sorry-free:

```lean
(((1024 : Int) / (128 : Int)) = (8 : Int)) ∧ (((3 : Int) * (7 : Int)) = (21 : Int)) ∧ (((1024 : Int) / (4 : Int)) = (256 : Int)) ∧ (((((1000 : Int) - (100 : Int)) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ (((1 : Int) + (7 : Int)) = (8 : Int)) ∧ (((16 : Int) * (256 : Int)) = (4096 : Int)) ∧ (((8 : Int) / (2 : Int)) = (4 : Int)) ∧ ((-((-(1000 : Int)) / (16 : Int))) = (63 : Int)) ∧ (((((1000 : Int) - (1000 : Int)) * (100 : Int)) / (1000 : Int)) = (0 : Int))
```

### waypoint: legdistance(30, 40) = 2500; eta(1000, 50) = 20; crosstrack(50, 30) = 1600; totalroute(5, 120) = 600; bearingdelta(350, 10) = 20; fuelburn(1000, 25) = 250; groundspeed(900, 15) = 60; turnradius(200, 10) = 4000
The ledger holds this as [fam_waypoint](/theorem/fam_waypoint) — proven `by decide`, sorry-free:

```lean
((((30 : Int) ^ (2 : Nat)) + ((40 : Int) ^ (2 : Nat))) = (2500 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) (((50 : Int) ^ (2 : Nat)) - ((30 : Int) ^ (2 : Nat)))) = (1600 : Int)) ∧ (((5 : Int) * (120 : Int)) = (600 : Int)) ∧ ((((((10 : Int) - (350 : Int)) % (360 : Int)) + (360 : Int)) % (360 : Int)) = (20 : Int)) ∧ ((((1000 : Int) * (25 : Int)) / (100 : Int)) = (250 : Int)) ∧ (((900 : Int) / (15 : Int)) = (60 : Int)) ∧ ((((200 : Int) ^ (2 : Nat)) / (10 : Int)) = (4000 : Int))
```

### weather: heatindex(30, 80) = 38; windchill(10, 50) = 5; windchill(3, 90) = 0; dewpoint(25, 50) = 15; pressure(1013, 800) = 913; pressure(50, 8000) = 0; precipitation(60, 4) = 15; humidity(40, 50) = 80
The ledger holds this as [fam_weather](/theorem/fam_weather) — proven `by decide`, sorry-free:

```lean
(((30 : Int) + ((80 : Int) / (10 : Int))) = (38 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - ((50 : Int) / (10 : Int)))) = (5 : Int)) ∧ ((fmax (0 : Int) ((3 : Int) - ((90 : Int) / (10 : Int)))) = (0 : Int)) ∧ (((25 : Int) - (((100 : Int) - (50 : Int)) / (5 : Int))) = (15 : Int)) ∧ ((fmax (0 : Int) ((1013 : Int) - ((800 : Int) / (8 : Int)))) = (913 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - ((8000 : Int) / (8 : Int)))) = (0 : Int)) ∧ (((60 : Int) / (4 : Int)) = (15 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (50 : Int)) = (80 : Int))
```

### weaving: threadcount(80, 60) = 140; warp(800, 10) = 80; weft(600, 10) = 60; density(80, 60) = 4800; cover(28, 56) = 50; pickrate(6000, 60) = 100; width(800, 80) = 10; gsm(50, 2500) = 200
The ledger holds this as [fam_weaving](/theorem/fam_weaving) — proven `by decide`, sorry-free:

```lean
(((80 : Int) + (60 : Int)) = (140 : Int)) ∧ (((800 : Int) / (10 : Int)) = (80 : Int)) ∧ (((600 : Int) / (10 : Int)) = (60 : Int)) ∧ (((80 : Int) * (60 : Int)) = (4800 : Int)) ∧ ((((28 : Int) * (100 : Int)) / (56 : Int)) = (50 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((800 : Int) / (80 : Int)) = (10 : Int)) ∧ ((((50 : Int) * (10000 : Int)) / (2500 : Int)) = (200 : Int))
```

### website: coverage(30, 30) = 100; coverage(24, 30) = 80; gap(26, 30) = 4; gap(30, 30) = 0; parity(31, 30) = 1; parity(28, 30) = 0; blocks(30, 30) = 100; collections(12, 12) = 100; plugins(16, 12) = 133; dirs(21, 21) = 100
The ledger holds this as [fam_website](/theorem/fam_website) — proven `by decide`, sorry-free:

```lean
((((30 : Int) * (100 : Int)) / (30 : Int)) = (100 : Int)) ∧ ((((24 : Int) * (100 : Int)) / (30 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (26 : Int))) = (4 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (30 : Int))) = (0 : Int)) ∧ ((if (if (31 : Int) ≥ (30 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (28 : Int) ≥ (30 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (30 : Int)) = (100 : Int)) ∧ ((((12 : Int) * (100 : Int)) / (12 : Int)) = (100 : Int)) ∧ ((((16 : Int) * (100 : Int)) / (12 : Int)) = (133 : Int)) ∧ ((((21 : Int) * (100 : Int)) / (21 : Int)) = (100 : Int))
```

### welding: heatinput(24, 200) = 4800; travelspeed(600, 120) = 5; deposition(3600, 2) = 1800; penetration(8, 10) = 80; dilution(30, 100) = 30; porosity(5, 100) = 5; duty(6, 10) = 60; strength(85, 100) = 85
The ledger holds this as [fam_welding](/theorem/fam_welding) — proven `by decide`, sorry-free:

```lean
(((24 : Int) * (200 : Int)) = (4800 : Int)) ∧ (((600 : Int) / (120 : Int)) = (5 : Int)) ∧ (((3600 : Int) / (2 : Int)) = (1800 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ ((((6 : Int) * (100 : Int)) / (10 : Int)) = (60 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int))
```

### welfare: poverty(25, 100) = 25; gini(40, 100) = 40; benefit(1000, 50) = 20; coverage(80, 100) = 80; replacement(600, 1000) = 60; dependency(60, 100) = 60; mobility(30, 100) = 30; transfer(15, 100) = 15
The ledger holds this as [fam_welfare](/theorem/fam_welfare) — proven `by decide`, sorry-free:

```lean
((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (1000 : Int)) = (60 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (100 : Int)) = (15 : Int))
```

### wind: power(50, 50, 1) = 2500; turbines(20, 4) = 24; capacity(35, 100) = 35; rated(3, 1000) = 3000; tipratio(70, 10) = 7; farm(20, 2000) = 40000; blades(3, 0) = 3; pairs(8, 2) = 28
The ledger holds this as [fam_wind](/theorem/fam_wind) — proven `by decide`, sorry-free:

```lean
((((50 : Int) * (50 : Int)) * (1 : Int)) = (2500 : Int)) ∧ (((20 : Int) + (4 : Int)) = (24 : Int)) ∧ ((((35 : Int) * (100 : Int)) / (100 : Int)) = (35 : Int)) ∧ (((3 : Int) * (1000 : Int)) = (3000 : Int)) ∧ (((70 : Int) / (10 : Int)) = (7 : Int)) ∧ (((20 : Int) * (2000 : Int)) = (40000 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int))
```

### windchill: index(50, 20) = 40; apparenttemp(80, 50) = 85; frostbitetime(10, 15) = 20; heatindex(90, 60) = 95; windfactor(20) = 30; exposurerisk(5, 10) = 1; exposurerisk(20, 10) = 0; effectivetemp(50, 20, 40) = 42; gustadjust(20, 40) = 30
The ledger holds this as [fam_windchill](/theorem/fam_windchill) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((50 : Int) - ((20 : Int) / (2 : Int)))) = (40 : Int)) ∧ (((80 : Int) + ((50 : Int) / (10 : Int))) = (85 : Int)) ∧ ((((10 : Int) * (30 : Int)) / (15 : Int)) = (20 : Int)) ∧ (((90 : Int) + (((90 : Int) * (60 : Int)) / (1000 : Int))) = (95 : Int)) ∧ ((((20 : Int) * (3 : Int)) / (2 : Int)) = (30 : Int)) ∧ ((if (if (5 : Int) ≤ (10 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (20 : Int) ≤ (10 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((fmax (0 : Int) (((50 : Int) - ((20 : Int) / (2 : Int))) + ((40 : Int) / (20 : Int)))) = (42 : Int)) ∧ ((((20 : Int) + (40 : Int)) / (2 : Int)) = (30 : Int))
```

### windpower: turbineoutput(2, 1000) = 2000; sweptarea(50, 50) = 2500; capacityfactor(35, 100) = 35; cutinspeed(3, 0) = 3; ratedpower(3, 1000) = 3000; tipspeedratio(70, 10) = 7; farmoutput(20, 2000) = 40000; availability(95, 100) = 95
The ledger holds this as [fam_windpower](/theorem/fam_windpower) — proven `by decide`, sorry-free:

```lean
(((2 : Int) * (1000 : Int)) = (2000 : Int)) ∧ (((50 : Int) * (50 : Int)) = (2500 : Int)) ∧ ((((35 : Int) * (100 : Int)) / (100 : Int)) = (35 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((3 : Int) * (1000 : Int)) = (3000 : Int)) ∧ (((70 : Int) / (10 : Int)) = (7 : Int)) ∧ (((20 : Int) * (2000 : Int)) = (40000 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int))
```

### winemaking: abv(24, 6) = 9; brix(240, 1000) = 24; acidity(7, 1000) = 7; sulfite(200, 50) = 10000; yield(5000, 650) = 3250; extraction(1000, 70) = 700; fermentation(24, 0, 12) = 2; blend(60, 30, 10) = 100
The ledger holds this as [fam_winemaking](/theorem/fam_winemaking) — proven `by decide`, sorry-free:

```lean
(((((24 : Int) - (6 : Int)) * (55 : Int)) / (100 : Int)) = (9 : Int)) ∧ ((((240 : Int) * (100 : Int)) / (1000 : Int)) = (24 : Int)) ∧ ((((7 : Int) * (1000 : Int)) / (1000 : Int)) = (7 : Int)) ∧ (((200 : Int) * (50 : Int)) = (10000 : Int)) ∧ ((((5000 : Int) * (650 : Int)) / (1000 : Int)) = (3250 : Int)) ∧ ((((1000 : Int) * (70 : Int)) / (100 : Int)) = (700 : Int)) ∧ ((((24 : Int) - (0 : Int)) / (12 : Int)) = (2 : Int)) ∧ ((((60 : Int) + (30 : Int)) + (10 : Int)) = (100 : Int))
```

### wireframe: grid(960, 12) = 80; gutter(240, 12) = 20; density(50, 1000) = 5; whitespace(40, 100) = 40; alignment(9, 10) = 90; fold(3, 10) = 30; fidelity(2, 10) = 20
The ledger holds this as [fam_wireframe](/theorem/fam_wireframe) — proven `by decide`, sorry-free:

```lean
(((960 : Int) / (12 : Int)) = (80 : Int)) ∧ (((240 : Int) / (12 : Int)) = (20 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (10 : Int)) = (30 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (10 : Int)) = (20 : Int))
```

### woodworking: boardfeet(96, 12) = 8; expansion(100, 5) = 50; jointstrength(12, 250) = 3000; kerf(10, 3) = 30; moisture(120, 100) = 20; usage(80, 100) = 80; waste(20, 100) = 20
The ledger holds this as [fam_woodworking](/theorem/fam_woodworking) — proven `by decide`, sorry-free:

```lean
((((96 : Int) * (12 : Int)) / (144 : Int)) = (8 : Int)) ∧ ((((5 : Int) * (1000 : Int)) / (100 : Int)) = (50 : Int)) ∧ (((12 : Int) * (250 : Int)) = (3000 : Int)) ∧ (((10 : Int) * (3 : Int)) = (30 : Int)) ∧ (((((120 : Int) - (100 : Int)) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int))
```

### workspace: volume(10, 10, 10) = 1000; reachradius(100, 20) = 80; area(40, 30) = 1200; dexterityindex(80, 100) = 80; singularitymargin(90, 15) = 75; jointrange(180, 30) = 150; coveragepct(850, 1000) = 85; envelopeheight(200, 2) = 100
The ledger holds this as [fam_workspace](/theorem/fam_workspace) — proven `by decide`, sorry-free:

```lean
((((10 : Int) * (10 : Int)) * (10 : Int)) = (1000 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (20 : Int))) = (80 : Int)) ∧ (((40 : Int) * (30 : Int)) = (1200 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (15 : Int))) = (75 : Int)) ∧ ((fmax (0 : Int) ((180 : Int) - (30 : Int))) = (150 : Int)) ∧ ((((850 : Int) * (100 : Int)) / (1000 : Int)) = (85 : Int)) ∧ (((200 : Int) / (2 : Int)) = (100 : Int))
```


::: warning 
THE FAMILIES, W — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. The boundary is confirmed by the wing's own sealed theorems — e.g. [fam_walkability](/theorem/fam_walkability) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
