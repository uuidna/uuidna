---
title: "THE FAMILIES, F"
description: "Computed from lean/FamiliesF.lean — 43 sealed theorems, every claim citing its proof."
---

# THE FAMILIES, F

> THE FAMILIES, F — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. — held by [fam_failure](/theorem/fam_failure) and its 42 siblings below.

**43 theorems** and **16,706 decided cases**, from [fam_failure](/theorem/fam_failure) onward, each proven `by decide` in <a href="/lean/FamiliesF.lean">lean/FamiliesF.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFamiliesF.lean)** — nothing to install. The editor fetches `lean/FamiliesF.lean` from the repository and re-decides all 43 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### failure: rpn(8, 5, 4) = 160; severity(7, 3) = 21; occurrence(50, 1000) = 5; detection(80, 100) = 80; criticality(8, 5) = 40; modecount(12, 4) = 48; rootcauses(10, 3) = 30; escaperate(1000, 950) = 5; escaperate(1000, 1100) = 0
The ledger holds this as [fam_failure](/theorem/fam_failure) — proven `by decide`, sorry-free:

```lean
((((8 : Int) * (5 : Int)) * (4 : Int)) = (160 : Int)) ∧ (((7 : Int) * (3 : Int)) = (21 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((8 : Int) * (5 : Int)) = (40 : Int)) ∧ (((12 : Int) * (4 : Int)) = (48 : Int)) ∧ (((10 : Int) * (3 : Int)) = (30 : Int)) ∧ ((((fmax (0 : Int) ((1000 : Int) - (950 : Int))) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((fmax (0 : Int) ((1000 : Int) - (1100 : Int))) * (100 : Int)) / (1000 : Int)) = (0 : Int))
```

### family: support(60000, 20) = 12000; children(400, 3) = 1200; division(500000, 50) = 250000; arrears(12000, 9000) = 3000; maintenance(80000, 30000, 30) = 15000; maintenance(30000, 80000, 30) = 0; imputed(50000, 20000) = 50000; overnights(255, 365) = 69; majority(200) = 1; majority(150) = 0
The ledger holds this as [fam_family](/theorem/fam_family) — proven `by decide`, sorry-free:

```lean
((((60000 : Int) * (20 : Int)) / (100 : Int)) = (12000 : Int)) ∧ (((400 : Int) * (3 : Int)) = (1200 : Int)) ∧ ((((500000 : Int) * (50 : Int)) / (100 : Int)) = (250000 : Int)) ∧ ((fmax (0 : Int) ((12000 : Int) - (9000 : Int))) = (3000 : Int)) ∧ ((((fmax (0 : Int) ((80000 : Int) - (30000 : Int))) * (30 : Int)) / (100 : Int)) = (15000 : Int)) ∧ ((((fmax (0 : Int) ((30000 : Int) - (80000 : Int))) * (30 : Int)) / (100 : Int)) = (0 : Int)) ∧ ((fmax (50000 : Int) (20000 : Int)) = (50000 : Int)) ∧ ((((255 : Int) * (100 : Int)) / (365 : Int)) = (69 : Int)) ∧ ((if (if (200 : Int) ≥ (183 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (150 : Int) ≥ (183 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int))
```

### fatigue: amplitude(300, 100) = 100; cyclestofailure(10000, 50) = 200; endurancelimit(400) = 200; meanstress(300, 100) = 200; minerdamage(50, 200) = 25; safetyfactor(600, 200) = 3; stressrange(300, 100) = 200; stressratio(10, 100) = 10
The ledger holds this as [fam_fatigue](/theorem/fam_fatigue) — proven `by decide`, sorry-free:

```lean
(((fmax (0 : Int) ((300 : Int) - (100 : Int))) / (2 : Int)) = (100 : Int)) ∧ (((10000 : Int) / (50 : Int)) = (200 : Int)) ∧ ((((400 : Int) * (50 : Int)) / (100 : Int)) = (200 : Int)) ∧ ((((300 : Int) + (100 : Int)) / (2 : Int)) = (200 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int)) ∧ (((600 : Int) / (200 : Int)) = (3 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (100 : Int))) = (200 : Int)) ∧ ((((10 : Int) * (100 : Int)) / (100 : Int)) = (10 : Int))
```

### federated: exchanges(10, 5) = 50; updates(5, 3) = 15; params(12, 100) = 1200; shards(1000, 4) = 250; shards(1000, 0) = 0; quorum(5) = 3; quorum(4) = 3; cohorts(4) = 15; straggle(10, 7) = 3; straggle(5, 8) = 0; aggregated(4, 100) = 400
The ledger holds this as [fam_federated](/theorem/fam_federated) — proven `by decide`, sorry-free:

```lean
(((10 : Int) * (5 : Int)) = (50 : Int)) ∧ (((5 : Int) * (3 : Int)) = (15 : Int)) ∧ (((12 : Int) * (100 : Int)) = (1200 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((1000 : Int) / (0 : Int)) = (0 : Int)) ∧ ((((5 : Int) / (2 : Int)) + (1 : Int)) = (3 : Int)) ∧ ((((4 : Int) / (2 : Int)) + (1 : Int)) = (3 : Int)) ∧ ((((2 : Int) ^ (4 : Nat)) - (1 : Int)) = (15 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (7 : Int))) = (3 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (8 : Int))) = (0 : Int)) ∧ (((4 : Int) * (100 : Int)) = (400 : Int))
```

### feed: relevance(9, 12) = 75; recency(2460010, 2460000) = 10; signal(120, 45) = 165; trend(30, 12) = 18; trend(12, 30) = -18; velocity(48, 6) = 8; reach(5, 14) = 70; score(200, 3) = 5000
The ledger holds this as [fam_feed](/theorem/fam_feed) — proven `by decide`, sorry-free:

```lean
((((9 : Int) * (100 : Int)) / (12 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((2460010 : Int) - (2460000 : Int))) = (10 : Int)) ∧ (((120 : Int) + (45 : Int)) = (165 : Int)) ∧ (((30 : Int) - (12 : Int)) = (18 : Int)) ∧ (((12 : Int) - (30 : Int)) = (-18 : Int)) ∧ (((48 : Int) / (6 : Int)) = (8 : Int)) ∧ (((5 : Int) * (14 : Int)) = (70 : Int)) ∧ ((((200 : Int) * (100 : Int)) / ((3 : Int) + (1 : Int))) = (5000 : Int))
```

### feedback: closedloopgain(1000, 9) = 100; dampingratio(50, 100) = 50; errorsignal(100, 70) = 30; errorsignal(50, 80) = 0; looptransfer(50, 3) = 150; overshoot(120, 100) = 20; sensitivity(3) = 25; settlingtime(5, 4) = 20; steadystateerror(100, 9) = 10
The ledger holds this as [fam_feedback](/theorem/fam_feedback) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / ((1 : Int) + (9 : Int))) = (100 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (70 : Int))) = (30 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (80 : Int))) = (0 : Int)) ∧ (((50 : Int) * (3 : Int)) = (150 : Int)) ∧ ((((fmax (0 : Int) ((120 : Int) - (100 : Int))) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ (((100 : Int) / ((1 : Int) + (3 : Int))) = (25 : Int)) ∧ (((5 : Int) * (4 : Int)) = (20 : Int)) ∧ (((100 : Int) / ((1 : Int) + (9 : Int))) = (10 : Int))
```

### feedlot: rationcost(500, 8) = 4000; dailygain(360, 180) = 2; daysonfeed(1200, 600, 3) = 200; dryintake(2400, 120) = 20; feedefficiency(1200, 200) = 6; energydensity(6000, 100) = 60; proteinratio(45, 300) = 15; breakeven(900, 1200) = 75; dailygain(100, 0) = 0
The ledger holds this as [fam_feedlot](/theorem/fam_feedlot) — proven `by decide`, sorry-free:

```lean
(((500 : Int) * (8 : Int)) = (4000 : Int)) ∧ (((360 : Int) / (180 : Int)) = (2 : Int)) ∧ ((-((-(fmax (0 : Int) ((1200 : Int) - (600 : Int)))) / (3 : Int))) = (200 : Int)) ∧ (((2400 : Int) / (120 : Int)) = (20 : Int)) ∧ (((1200 : Int) / (200 : Int)) = (6 : Int)) ∧ (((6000 : Int) / (100 : Int)) = (60 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (300 : Int)) = (15 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1200 : Int)) = (75 : Int)) ∧ (((100 : Int) / (0 : Int)) = (0 : Int))
```

### fermentation: biomass(10000, 100) = 100; conversion(80, 100) = 80; ethanol(45, 50) = 90; inoculation(5, 100) = 5; output(60, 100) = 60; ph(30, 100) = 30; rate(1200, 48) = 25
The ledger holds this as [fam_fermentation](/theorem/fam_fermentation) — proven `by decide`, sorry-free:

```lean
(((10000 : Int) / (100 : Int)) = (100 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((1200 : Int) / (48 : Int)) = (25 : Int))
```

### ferry: capacity(200, 2) = 400; crossingtime(60, 1) = 60; vehicledecks(2, 1) = 3; dailycrossings(1440, 90) = 16; loadfactor(75, 100) = 75; turnaroundmin(60, 2) = 30; routepairs(8, 2) = 28; throughput(400, 16) = 6400
The ledger holds this as [fam_ferry](/theorem/fam_ferry) — proven `by decide`, sorry-free:

```lean
(((200 : Int) * (2 : Int)) = (400 : Int)) ∧ (((60 : Int) / (1 : Int)) = (60 : Int)) ∧ (((2 : Int) + (1 : Int)) = (3 : Int)) ∧ (((1440 : Int) / (90 : Int)) = (16 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ (((60 : Int) / (2 : Int)) = (30 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ (((400 : Int) * (16 : Int)) = (6400 : Int))
```

### fertilization: nitrogenrate(200, 50) = 150; npkratio(10, 40) = 25; applicationrate(50, 120) = 6000; nutrientuptake(8, 25) = 200; leachingloss(200, 15) = 30; soiltestindex(60, 40) = 150; splitapplication(180, 3) = 60; efficiency(120, 200) = 60; efficiency(50, 0) = 0
The ledger holds this as [fam_fertilization](/theorem/fam_fertilization) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((200 : Int) - (50 : Int))) = (150 : Int)) ∧ ((((10 : Int) * (100 : Int)) / (40 : Int)) = (25 : Int)) ∧ (((50 : Int) * (120 : Int)) = (6000 : Int)) ∧ (((8 : Int) * (25 : Int)) = (200 : Int)) ∧ ((((200 : Int) * (15 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (40 : Int)) = (150 : Int)) ∧ (((180 : Int) / (3 : Int)) = (60 : Int)) ∧ ((((120 : Int) * (100 : Int)) / (200 : Int)) = (60 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int))
```

### field: group(100, 4) = 25; indexed(3, 12) = 25; length(40, 100) = 1; length(140, 100) = 0; localized(6, 12) = 50; required(9, 12) = 75
The ledger holds this as [fam_field](/theorem/fam_field) — proven `by decide`, sorry-free:

```lean
(((100 : Int) / (4 : Int)) = (25 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (12 : Int)) = (25 : Int)) ∧ ((if (if (40 : Int) ≤ (100 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (140 : Int) ≤ (100 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((6 : Int) * (100 : Int)) / (12 : Int)) = (50 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (12 : Int)) = (75 : Int))
```

### filtering: cutoff(48000, 4) = 12000; passband(3000, 1000) = 2000; stopband(4000, 500) = 4500; rolloff(4) = 24; order(96, 24) = 4; groupdelay(101) = 50; attenuation(4, 3) = 72; bandwidth(12000, 4) = 3000; passband(1000, 3000) = 0
The ledger holds this as [fam_filtering](/theorem/fam_filtering) — proven `by decide`, sorry-free:

```lean
(((48000 : Int) / (4 : Int)) = (12000 : Int)) ∧ ((fmax (0 : Int) ((3000 : Int) - (1000 : Int))) = (2000 : Int)) ∧ (((4000 : Int) + (500 : Int)) = (4500 : Int)) ∧ (((4 : Int) * (6 : Int)) = (24 : Int)) ∧ ((-((-(96 : Int)) / (24 : Int))) = (4 : Int)) ∧ (((fmax (0 : Int) ((101 : Int) - (1 : Int))) / (2 : Int)) = (50 : Int)) ∧ ((((4 : Int) * (6 : Int)) * (3 : Int)) = (72 : Int)) ∧ (((12000 : Int) / (4 : Int)) = (3000 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (3000 : Int))) = (0 : Int))
```

### filters: cutoff(1000, 10) = 100; rolloff(2, 3) = 36; qfactor(1000, 50) = 20; bandwidth(2000, 500) = 1500; order(60, 6) = 10; passband(100, 3) = 97; stopband(4, 20) = 80; ripple(1000, 5) = 50; cutoff(0, 10) = 0
The ledger holds this as [fam_filters](/theorem/fam_filters) — proven `by decide`, sorry-free:

```lean
((((10 : Int) ^ (6 : Nat)) / ((1000 : Int) * (10 : Int))) = (100 : Int)) ∧ ((((2 : Int) * (6 : Int)) * (3 : Int)) = (36 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((2000 : Int) - (500 : Int))) = (1500 : Int)) ∧ ((-((-(60 : Int)) / (6 : Int))) = (10 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (3 : Int))) = (97 : Int)) ∧ (((4 : Int) * (20 : Int)) = (80 : Int)) ∧ ((((1000 : Int) * (5 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((((10 : Int) ^ (6 : Nat)) / ((0 : Int) * (10 : Int))) = (0 : Int))
```

### financial: breakeven(100000, 40) = 2500; payback(50000, 12000) = 5; roi(15000, 10000) = 50; margin(200000, 120000) = 40; leverage(300000, 100000) = 3; burn(80000, 50000) = 30000; burn(50000, 80000) = 0; runway(300000, 30000) = 10; compound(1000, 10, 3) = 1331
The ledger holds this as [fam_financial](/theorem/fam_financial) — proven `by decide`, sorry-free:

```lean
((-((-(100000 : Int)) / (40 : Int))) = (2500 : Int)) ∧ ((-((-(50000 : Int)) / (12000 : Int))) = (5 : Int)) ∧ (((((15000 : Int) - (10000 : Int)) * (100 : Int)) / (10000 : Int)) = (50 : Int)) ∧ (((((200000 : Int) - (120000 : Int)) * (100 : Int)) / (200000 : Int)) = (40 : Int)) ∧ (((300000 : Int) / (100000 : Int)) = (3 : Int)) ∧ ((fmax (0 : Int) ((80000 : Int) - (50000 : Int))) = (30000 : Int)) ∧ ((fmax (0 : Int) ((50000 : Int) - (80000 : Int))) = (0 : Int)) ∧ (((300000 : Int) / (30000 : Int)) = (10 : Int)) ∧ ((((1000 : Int) * (((100 : Int) + (10 : Int)) ^ (3 : Nat))) / ((100 : Int) ^ (3 : Nat))) = (1331 : Int))
```

### firewall: blockrate(250, 1000) = 25; throughput(60000, 60) = 1000; falseblock(3, 250) = 1; connections(800, 1000) = 80; inspection(900, 1000) = 90; coverage(48, 64) = 75
The ledger holds this as [fam_firewall](/theorem/fam_firewall) — proven `by decide`, sorry-free:

```lean
((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ (((60000 : Int) / (60 : Int)) = (1000 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (250 : Int)) = (1 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (1000 : Int)) = (80 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ ((((48 : Int) * (100 : Int)) / (64 : Int)) = (75 : Int))
```

### firmware: sectors(1024, 512) = 2; sectors(1024, 0) = 0; words(16) = 4; pages(1000, 256) = 3; checksumWords(16) = 8; bootBlocks(8192, 4096) = 2; slots(1048576, 524288) = 2; otaDelta(5000, 4000) = 1000; otaDelta(100, 200) = 0; image(32, 4096) = 131072; freespace(8192, 5000) = 3192; crc(64, 4) = 256; stack(8, 256) = 2048; isr(64, 4) = 256; watchdog(1000, 10) = 100; flashcycles(5000, 100000) = 5
The ledger holds this as [fam_firmware](/theorem/fam_firmware) — proven `by decide`, sorry-free:

```lean
(((1024 : Int) / (512 : Int)) = (2 : Int)) ∧ (((1024 : Int) / (0 : Int)) = (0 : Int)) ∧ (((16 : Int) / (4 : Int)) = (4 : Int)) ∧ (((1000 : Int) / (256 : Int)) = (3 : Int)) ∧ (((16 : Int) / (2 : Int)) = (8 : Int)) ∧ (((8192 : Int) / (4096 : Int)) = (2 : Int)) ∧ (((1048576 : Int) / (524288 : Int)) = (2 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (4000 : Int))) = (1000 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (200 : Int))) = (0 : Int)) ∧ (((32 : Int) * (4096 : Int)) = (131072 : Int)) ∧ (((8192 : Int) - (5000 : Int)) = (3192 : Int)) ∧ (((64 : Int) * (4 : Int)) = (256 : Int)) ∧ (((8 : Int) * (256 : Int)) = (2048 : Int)) ∧ (((64 : Int) * (4 : Int)) = (256 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((((5000 : Int) * (100 : Int)) / (100000 : Int)) = (5 : Int))
```

### fishery: catch(40, 25) = 1000; biomass(2000, 3) = 6000; quota(5000, 1200) = 3800; quota(1000, 1200) = 0; cpue(1000, 40) = 2500; sustainable(800, 1000) = 1; sustainable(1200, 1000) = 0; bycatch(150, 1000) = 15; spawning(10000, 20) = 2000; mortality(250, 1000) = 25
The ledger holds this as [fam_fishery](/theorem/fam_fishery) — proven `by decide`, sorry-free:

```lean
(((40 : Int) * (25 : Int)) = (1000 : Int)) ∧ (((2000 : Int) * (3 : Int)) = (6000 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (1200 : Int))) = (3800 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (1200 : Int))) = (0 : Int)) ∧ ((((1000 : Int) * (100 : Int)) / (40 : Int)) = (2500 : Int)) ∧ ((if (if (800 : Int) ≤ (1000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (1200 : Int) ≤ (1000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (1000 : Int)) = (15 : Int)) ∧ ((((10000 : Int) * (20 : Int)) / (100 : Int)) = (2000 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int))
```

### fitness: volume(3, 10) = 30; onerm(100, 5) = 115; heartrate(40) = 180; zone(135, 180) = 75; pace(5, 1500) = 300; calories(8, 30) = 240; recovery(100, 4) = 25; progress(120, 100) = 20; progress(80, 100) = 0
The ledger holds this as [fam_fitness](/theorem/fam_fitness) — proven `by decide`, sorry-free:

```lean
(((3 : Int) * (10 : Int)) = (30 : Int)) ∧ ((((100 : Int) * ((100 : Int) + ((5 : Int) * (3 : Int)))) / (100 : Int)) = (115 : Int)) ∧ ((fmax (0 : Int) ((220 : Int) - (40 : Int))) = (180 : Int)) ∧ ((((135 : Int) * (100 : Int)) / (180 : Int)) = (75 : Int)) ∧ (((1500 : Int) / (5 : Int)) = (300 : Int)) ∧ (((8 : Int) * (30 : Int)) = (240 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ ((fmax (0 : Int) ((120 : Int) - (100 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (100 : Int))) = (0 : Int))
```

### fleet: availability(95, 100) = 95; downtime(5, 100) = 5; utilization(60, 80) = 75; maintenance(12000, 40) = 300; lifecycle(80000, 100000) = 80; idle(20, 80) = 25; replacement(6, 10) = 60; telematics(6000, 120) = 50
The ledger holds this as [fam_fleet](/theorem/fam_fleet) — proven `by decide`, sorry-free:

```lean
((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (80 : Int)) = (75 : Int)) ∧ (((12000 : Int) / (40 : Int)) = (300 : Int)) ∧ ((((80000 : Int) * (100 : Int)) / (100000 : Int)) = (80 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (80 : Int)) = (25 : Int)) ∧ ((((6 : Int) * (100 : Int)) / (10 : Int)) = (60 : Int)) ∧ (((6000 : Int) / (120 : Int)) = (50 : Int))
```

### flightdynamics: loadfactor(2400, 1000) = 240; stallspeed(600, 2) = 300; turnrate(300, 20) = 15; climbgradient(500, 10000) = 5; wingloading(1200, 16) = 75; thrusttoweight(300, 1000) = 30; rangefactor(500, 6) = 3000; bankangle(173, 100) = 173; turnrate(300, 0) = 0
The ledger holds this as [fam_flightdynamics](/theorem/fam_flightdynamics) — proven `by decide`, sorry-free:

```lean
((((2400 : Int) * (100 : Int)) / (1000 : Int)) = (240 : Int)) ∧ (((600 : Int) / (2 : Int)) = (300 : Int)) ∧ (((300 : Int) / (20 : Int)) = (15 : Int)) ∧ ((((500 : Int) * (100 : Int)) / (10000 : Int)) = (5 : Int)) ∧ (((1200 : Int) / (16 : Int)) = (75 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ (((500 : Int) * (6 : Int)) = (3000 : Int)) ∧ ((((173 : Int) * (100 : Int)) / (100 : Int)) = (173 : Int)) ∧ (((300 : Int) / (0 : Int)) = (0 : Int))
```

### floriculture: bloomrate(120, 6) = 20; stemlength(12, 3) = 36; vaselife(14, 5) = 9; yield(200, 8) = 1600; spacing(1000, 25) = 40; gradeout(500, 40) = 460; petalcount(5, 8) = 40; forcing(300, 250) = 1; forcing(200, 250) = 0
The ledger holds this as [fam_floriculture](/theorem/fam_floriculture) — proven `by decide`, sorry-free:

```lean
(((120 : Int) / (6 : Int)) = (20 : Int)) ∧ (((12 : Int) * (3 : Int)) = (36 : Int)) ∧ ((fmax (0 : Int) ((14 : Int) - (5 : Int))) = (9 : Int)) ∧ (((200 : Int) * (8 : Int)) = (1600 : Int)) ∧ (((1000 : Int) / (25 : Int)) = (40 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (40 : Int))) = (460 : Int)) ∧ (((5 : Int) * (8 : Int)) = (40 : Int)) ∧ ((if (if (300 : Int) ≥ (250 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (200 : Int) ≥ (250 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int))
```

### fluid: flow(50, 60) = 3000; volume(10, 5, 2) = 100; head(100, 20) = 80; pipearea(78, 1) = 78; throughput(6000, 60) = 100; litres(1000, 5) = 5000; pressuredrop(300, 120) = 180; valves(4, 2) = 6
The ledger holds this as [fam_fluid](/theorem/fam_fluid) — proven `by decide`, sorry-free:

```lean
(((50 : Int) * (60 : Int)) = (3000 : Int)) ∧ ((((10 : Int) * (5 : Int)) * (2 : Int)) = (100 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (20 : Int))) = (80 : Int)) ∧ (((78 : Int) * (1 : Int)) = (78 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (120 : Int))) = (180 : Int)) ∧ (((4 : Int) + (2 : Int)) = (6 : Int))
```

### fluiddynamics: reynolds(200, 3, 2) = 300; flowrate(5, 20) = 100; pressuredrop(100, 8, 4) = 200; velocity(1000, 25) = 40; bernoulli(100, 2, 10) = 200; viscosity(500, 10) = 50; froude(20, 10, 2) = 20; machnumber(680, 340) = 200
The ledger holds this as [fam_fluiddynamics](/theorem/fam_fluiddynamics) — proven `by decide`, sorry-free:

```lean
((((200 : Int) * (3 : Int)) / (2 : Int)) = (300 : Int)) ∧ (((5 : Int) * (20 : Int)) = (100 : Int)) ∧ ((((100 : Int) * (8 : Int)) / (4 : Int)) = (200 : Int)) ∧ (((1000 : Int) / (25 : Int)) = (40 : Int)) ∧ (((100 : Int) + ((((2 : Int) * (10 : Int)) * (10 : Int)) / (2 : Int))) = (200 : Int)) ∧ (((500 : Int) / (10 : Int)) = (50 : Int)) ∧ ((((20 : Int) * (20 : Int)) / ((10 : Int) * (2 : Int))) = (20 : Int)) ∧ ((((680 : Int) * (100 : Int)) / (340 : Int)) = (200 : Int))
```

### folklore: taletypes(200, 100) = 300; motifcombos(20, 3) = 1140; variantorderings(5) = 120; transmissionpaths(8, 3) = 336; regionsubsets(6) = 64; performercount(12, 5) = 60; diffusionrate(60, 100) = 60; collectionsize(300, 200) = 500
The ledger holds this as [fam_folklore](/theorem/fam_folklore) — proven `by decide`, sorry-free:

```lean
(((200 : Int) + (100 : Int)) = (300 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (20 : Int)) (Int.toNat (3 : Int)))) = (1140 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (8 : Int)))) / (Int.ofNat (ffact (Int.toNat ((8 : Int) - (3 : Int)))))) = (336 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ (((12 : Int) * (5 : Int)) = (60 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ (((300 : Int) + (200 : Int)) = (500 : Int))
```

### foodsafety: dangerzonehours(2, 2) = 4; pathogenpairs(10, 2) = 45; cookingtempc(74, 75) = 75; coolingtime(360, 2) = 180; contaminationrate(3, 100) = 3; haccppoints(7, 0) = 7; logreduction(5) = 32; compliancepct(95, 100) = 95
The ledger holds this as [fam_foodsafety](/theorem/fam_foodsafety) — proven `by decide`, sorry-free:

```lean
(((2 : Int) + (2 : Int)) = (4 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ ((fmax (74 : Int) (75 : Int)) = (75 : Int)) ∧ (((360 : Int) / (2 : Int)) = (180 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (100 : Int)) = (3 : Int)) ∧ (((7 : Int) + (0 : Int)) = (7 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int))
```

### forensic: likelihood(1000, 1) = 1000000; points(12) = 1; points(8) = 0; rarity(1000000, 8000000000) = 8000
The ledger holds this as [fam_forensic](/theorem/fam_forensic) — proven `by decide`, sorry-free:

```lean
((((1000 : Int) * (1000 : Int)) / (1 : Int)) = (1000000 : Int)) ∧ ((if (if (12 : Int) ≥ (12 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (8 : Int) ≥ (12 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((8000000000 : Int) / (1000000 : Int)) = (8000 : Int))
```

### forestry: volume(30, 20) = 18; density(1200, 4) = 300; carbon(5000, 47) = 2350; growth(120, 100) = 20; growth(100, 120) = 0; canopy(700, 1000) = 70; harvest(1000, 30) = 300; rotation(80, 60) = 1; rotation(40, 60) = 0; regeneration(1500, 4) = 6000
The ledger holds this as [fam_forestry](/theorem/fam_forestry) — proven `by decide`, sorry-free:

```lean
(((((30 : Int) ^ (2 : Nat)) * (20 : Int)) / (1000 : Int)) = (18 : Int)) ∧ (((1200 : Int) / (4 : Int)) = (300 : Int)) ∧ ((((5000 : Int) * (47 : Int)) / (100 : Int)) = (2350 : Int)) ∧ ((fmax (0 : Int) ((120 : Int) - (100 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (120 : Int))) = (0 : Int)) ∧ ((((700 : Int) * (100 : Int)) / (1000 : Int)) = (70 : Int)) ∧ ((((1000 : Int) * (30 : Int)) / (100 : Int)) = (300 : Int)) ∧ ((if (if (80 : Int) ≥ (60 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (40 : Int) ≥ (60 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((1500 : Int) * (4 : Int)) = (6000 : Int))
```

### forging: force(500, 20) = 10000; reduction(200, 50) = 75; reduction(50, 80) = 0; strain(20, 100) = 20; dieload(10000, 4) = 2500; flowstress(300, 3) = 900; upsetratio(90, 30) = 3; energy(10000, 5) = 50000; draft(100, 60) = 40
The ledger holds this as [fam_forging](/theorem/fam_forging) — proven `by decide`, sorry-free:

```lean
(((500 : Int) * (20 : Int)) = (10000 : Int)) ∧ ((((fmax (0 : Int) ((200 : Int) - (50 : Int))) * (100 : Int)) / (200 : Int)) = (75 : Int)) ∧ ((((fmax (0 : Int) ((50 : Int) - (80 : Int))) * (100 : Int)) / (50 : Int)) = (0 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ (((10000 : Int) / (4 : Int)) = (2500 : Int)) ∧ (((300 : Int) * (3 : Int)) = (900 : Int)) ∧ (((90 : Int) / (30 : Int)) = (3 : Int)) ∧ (((10000 : Int) * (5 : Int)) = (50000 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (60 : Int))) = (40 : Int))
```

### formant: centerfrequency(500, 700) = 600; bandwidth(700, 500) = 200; f1f2ratio(1500, 500) = 300; vowelspace(200, 300) = 60000; formantspacing(3000, 4) = 1000; qfactor(600, 200) = 3; dispersion(3500, 500, 4) = 1000; resonancepeak(12, 5) = 60
The ledger holds this as [fam_formant](/theorem/fam_formant) — proven `by decide`, sorry-free:

```lean
((((500 : Int) + (700 : Int)) / (2 : Int)) = (600 : Int)) ∧ ((fmax (0 : Int) ((700 : Int) - (500 : Int))) = (200 : Int)) ∧ ((((1500 : Int) * (100 : Int)) / (500 : Int)) = (300 : Int)) ∧ (((200 : Int) * (300 : Int)) = (60000 : Int)) ∧ (((3000 : Int) / ((4 : Int) - (1 : Int))) = (1000 : Int)) ∧ (((600 : Int) / (200 : Int)) = (3 : Int)) ∧ ((((3500 : Int) - (500 : Int)) / ((4 : Int) - (1 : Int))) = (1000 : Int)) ∧ (((12 : Int) * (5 : Int)) = (60 : Int))
```

### forms: completion(750, 1000) = 75; abandonment(250, 1000) = 25; fields(3, 12) = 25; conversion(120, 1000) = 12; validation(45, 300) = 15; time(6000, 100) = 60; response(880, 1000) = 88; dropoff(40, 500) = 8
The ledger holds this as [fam_forms](/theorem/fam_forms) — proven `by decide`, sorry-free:

```lean
((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (12 : Int)) = (25 : Int)) ∧ ((((120 : Int) * (100 : Int)) / (1000 : Int)) = (12 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (300 : Int)) = (15 : Int)) ∧ (((6000 : Int) / (100 : Int)) = (60 : Int)) ∧ ((((880 : Int) * (100 : Int)) / (1000 : Int)) = (88 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (500 : Int)) = (8 : Int))
```

### fourier: binwidth(44100, 441) = 100; fftoperations(1024, 10) = 10240; frequencyresolution(48000, 240) = 200; fundamentalfrequency(44100, 100) = 441; harmonics(440, 5) = 2200; leakage(1000, 850) = 150; leakage(100, 200) = 0; nyquist(44100) = 22050; spectralpower(3, 4) = 25
The ledger holds this as [fam_fourier](/theorem/fam_fourier) — proven `by decide`, sorry-free:

```lean
(((44100 : Int) / (441 : Int)) = (100 : Int)) ∧ (((1024 : Int) * (10 : Int)) = (10240 : Int)) ∧ (((48000 : Int) / (240 : Int)) = (200 : Int)) ∧ (((44100 : Int) / (100 : Int)) = (441 : Int)) ∧ (((440 : Int) * (5 : Int)) = (2200 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (850 : Int))) = (150 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (200 : Int))) = (0 : Int)) ∧ (((44100 : Int) / (2 : Int)) = (22050 : Int)) ∧ ((((3 : Int) * (3 : Int)) + ((4 : Int) * (4 : Int))) = (25 : Int))
```

### fpga: luts(100, 8) = 800; ffs(100, 16) = 1600; dsp(10, 48) = 480; bram(400, 36) = 14400; fmax(2000) = 500; utilization(60, 100) = 60; pipeline(5, 3) = 8; throughput(500, 2) = 1000; io(8, 50) = 400
The ledger holds this as [fam_fpga](/theorem/fam_fpga) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * (8 : Int)) = (800 : Int)) ∧ (((100 : Int) * (16 : Int)) = (1600 : Int)) ∧ (((10 : Int) * (48 : Int)) = (480 : Int)) ∧ (((400 : Int) * (36 : Int)) = (14400 : Int)) ∧ (((1000000 : Int) / (2000 : Int)) = (500 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ (((5 : Int) + (3 : Int)) = (8 : Int)) ∧ (((500 : Int) * (2 : Int)) = (1000 : Int)) ∧ (((8 : Int) * (50 : Int)) = (400 : Int))
```

### fractal: boxcount(2, 3) = 8; dimensionscaled(2, 3) = 666; hausdorffscaled(3, 2) = 1500; iterationdepth(2, 3) = 15; perimetergrowth(3, 2) = 48; piececount(3, 4) = 81; scaleratio(100, 4) = 25; scaleratio(100, 0) = 0; selfsimilarity(5, 3) = 15
The ledger holds this as [fam_fractal](/theorem/fam_fractal) — proven `by decide`, sorry-free:

```lean
(((2 : Int) ^ (3 : Nat)) = (8 : Int)) ∧ ((((2 : Int) * (1000 : Int)) / (3 : Int)) = (666 : Int)) ∧ ((((3 : Int) * (1000 : Int)) / (2 : Int)) = (1500 : Int)) ∧ (((((2 : Int) ^ (4 : Nat)) - (1 : Int)) / ((2 : Int) - (1 : Int))) = (15 : Int)) ∧ (((3 : Int) * ((4 : Int) ^ (2 : Nat))) = (48 : Int)) ∧ (((3 : Int) ^ (4 : Nat)) = (81 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((100 : Int) / (0 : Int)) = (0 : Int)) ∧ (((5 : Int) * (3 : Int)) = (15 : Int))
```

### fracture: toughness(50, 4) = 200; stressintensity(2, 50, 4) = 400; criticalcrack(200, 50) = 4; energyrelease(50, 4, 10) = 20; griffith(5, 100) = 500; notchsensitivity(80, 100) = 80; crackgrowth(1000, 3) = 3000; failurestress(200, 4) = 50
The ledger holds this as [fam_fracture](/theorem/fam_fracture) — proven `by decide`, sorry-free:

```lean
(((50 : Int) * (4 : Int)) = (200 : Int)) ∧ ((((4 : Int) * (2 : Int)) * (50 : Int)) = (400 : Int)) ∧ (((200 : Int) / (50 : Int)) = (4 : Int)) ∧ ((((50 : Int) * (4 : Int)) / (10 : Int)) = (20 : Int)) ∧ (((5 : Int) * (100 : Int)) = (500 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((1000 : Int) * (3 : Int)) = (3000 : Int)) ∧ (((200 : Int) / (4 : Int)) = (50 : Int))
```

### freight: rate(500, 2) = 1000; weight(20, 50) = 1000; volume(2, 3, 4) = 24; density(1000, 4) = 250; chargeable(300, 500) = 500; chargeable(600, 500) = 600; ton(5000) = 5; lane(400, 3) = 1200; surcharge(1000, 15) = 150
The ledger holds this as [fam_freight](/theorem/fam_freight) — proven `by decide`, sorry-free:

```lean
(((500 : Int) * (2 : Int)) = (1000 : Int)) ∧ (((20 : Int) * (50 : Int)) = (1000 : Int)) ∧ ((((2 : Int) * (3 : Int)) * (4 : Int)) = (24 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ ((fmax (300 : Int) (500 : Int)) = (500 : Int)) ∧ ((fmax (600 : Int) (500 : Int)) = (600 : Int)) ∧ (((5000 : Int) / (1000 : Int)) = (5 : Int)) ∧ (((400 : Int) * (3 : Int)) = (1200 : Int)) ∧ ((((1000 : Int) * (15 : Int)) / (100 : Int)) = (150 : Int))
```

### friction: force(100, 1) = 100; coefficient(40, 100) = 40; heat(50, 3) = 150; distance(1000, 10) = 100; normal(100, 9) = 900; work(40, 10) = 400; surfaces(2, 0) = 2; combos(6, 2) = 15
The ledger holds this as [fam_friction](/theorem/fam_friction) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * (1 : Int)) = (100 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((50 : Int) * (3 : Int)) = (150 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((100 : Int) * (9 : Int)) = (900 : Int)) ∧ (((40 : Int) * (10 : Int)) = (400 : Int)) ∧ (((2 : Int) + (0 : Int)) = (2 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### frontend: pages(120, 3) = 360; fetch(5, 2) = 10; build(360, 20) = 7200; cache(950, 1000) = 95; hydration(12, 48) = 25; headless(40, 6) = 240; isr(3600, 60) = 60
The ledger holds this as [fam_frontend](/theorem/fam_frontend) — proven `by decide`, sorry-free:

```lean
(((120 : Int) * (3 : Int)) = (360 : Int)) ∧ (((5 : Int) * (2 : Int)) = (10 : Int)) ∧ (((360 : Int) * (20 : Int)) = (7200 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((((12 : Int) * (100 : Int)) / (48 : Int)) = (25 : Int)) ∧ (((40 : Int) * (6 : Int)) = (240 : Int)) ∧ (((3600 : Int) / (60 : Int)) = (60 : Int))
```

### frontogenesis: temperaturegradient(100, 4) = 25; frontspeed(600, 10) = 60; fronttypes(4, 0) = 4; convergencerate(5, 3) = 15; baroclinicity(70, 100) = 70; pressuretrough(1013, 990) = 23; liftingindex(10, 4) = 6; intensification(80, 100) = 80
The ledger holds this as [fam_frontogenesis](/theorem/fam_frontogenesis) — proven `by decide`, sorry-free:

```lean
(((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((600 : Int) / (10 : Int)) = (60 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ (((5 : Int) * (3 : Int)) = (15 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ ((fmax (0 : Int) ((1013 : Int) - (990 : Int))) = (23 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (4 : Int))) = (6 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### fuelcell: cellvoltage(1, 700) = 700; stackvoltage(100, 700) = 70000; efficiency(60, 100) = 60; currentdensity(1000, 1) = 1000; powerdensity(700, 1) = 700; stackcells(100, 1) = 100; h2consumption(1000, 2) = 500; degradation(90, 100) = 90
The ledger holds this as [fam_fuelcell](/theorem/fam_fuelcell) — proven `by decide`, sorry-free:

```lean
(((1 : Int) * (700 : Int)) = (700 : Int)) ∧ (((100 : Int) * (700 : Int)) = (70000 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ (((1000 : Int) / (1 : Int)) = (1000 : Int)) ∧ (((700 : Int) * (1 : Int)) = (700 : Int)) ∧ (((100 : Int) * (1 : Int)) = (100 : Int)) ∧ (((1000 : Int) / (2 : Int)) = (500 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int))
```

### fulfillment: rate(950, 1000) = 95; cycle(4800, 100) = 48; accuracy(980, 1000) = 98; backorder(500, 320) = 180; perfectorder(920, 1000) = 92; pick(600, 5) = 120; pack(100, 12) = 9; ship(200, 7) = 1400
The ledger holds this as [fam_fulfillment](/theorem/fam_fulfillment) — proven `by decide`, sorry-free:

```lean
((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ (((4800 : Int) / (100 : Int)) = (48 : Int)) ∧ ((((980 : Int) * (100 : Int)) / (1000 : Int)) = (98 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (320 : Int))) = (180 : Int)) ∧ ((((920 : Int) * (100 : Int)) / (1000 : Int)) = (92 : Int)) ∧ (((600 : Int) / (5 : Int)) = (120 : Int)) ∧ ((-((-(100 : Int)) / (12 : Int))) = (9 : Int)) ∧ (((200 : Int) * (7 : Int)) = (1400 : Int))
```

### funnel: conversion(250, 1000) = 25; dropoff(300, 1000) = 30; steprate(900, 1000) = 90; velocity(600, 30) = 20; bottleneck(450, 1000) = 45; value(10000, 50) = 200; abandonment(700, 1000) = 70; throughput(480, 8) = 60
The ledger holds this as [fam_funnel](/theorem/fam_funnel) — proven `by decide`, sorry-free:

```lean
((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ (((600 : Int) / (30 : Int)) = (20 : Int)) ∧ ((((450 : Int) * (100 : Int)) / (1000 : Int)) = (45 : Int)) ∧ (((10000 : Int) / (50 : Int)) = (200 : Int)) ∧ ((((700 : Int) * (100 : Int)) / (1000 : Int)) = (70 : Int)) ∧ (((480 : Int) / (8 : Int)) = (60 : Int))
```

### futures: forwardprice(100, 5, 2) = 110; basis(110, 100) = 10; marginrequirement(10000, 10) = 1000; contractvalue(50, 100) = 5000; rollyield(110, 100) = 10; notional(50, 100, 2) = 10000; maintenancemargin(1000, 75) = 750; settlementprice(110, 90, 100) = 100
The ledger holds this as [fam_futures](/theorem/fam_futures) — proven `by decide`, sorry-free:

```lean
((((100 : Int) * ((100 : Int) + ((5 : Int) * (2 : Int)))) / (100 : Int)) = (110 : Int)) ∧ ((fmax (0 : Int) ((110 : Int) - (100 : Int))) = (10 : Int)) ∧ ((((10000 : Int) * (10 : Int)) / (100 : Int)) = (1000 : Int)) ∧ (((50 : Int) * (100 : Int)) = (5000 : Int)) ∧ ((((fmax (0 : Int) ((110 : Int) - (100 : Int))) * (100 : Int)) / (100 : Int)) = (10 : Int)) ∧ ((((50 : Int) * (100 : Int)) * (2 : Int)) = (10000 : Int)) ∧ ((((1000 : Int) * (75 : Int)) / (100 : Int)) = (750 : Int)) ∧ (((((110 : Int) + (90 : Int)) + (100 : Int)) / (3 : Int)) = (100 : Int))
```

### fuzzing: iterations(10000, 5) = 50000; inputspace(16) = 65536; crashcombos(10, 2) = 45; coveragepct(80, 100) = 80; seedcount(50, 50) = 100; mutationpaths(6, 2) = 30; uniquecrashes(100, 88) = 12; throughput(60000, 60) = 1000
The ledger holds this as [fam_fuzzing](/theorem/fam_fuzzing) — proven `by decide`, sorry-free:

```lean
(((10000 : Int) * (5 : Int)) = (50000 : Int)) ∧ (((2 : Int) ^ (16 : Nat)) = (65536 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((50 : Int) + (50 : Int)) = (100 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (6 : Int)))) / (Int.ofNat (ffact (Int.toNat ((6 : Int) - (2 : Int)))))) = (30 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (88 : Int))) = (12 : Int)) ∧ (((60000 : Int) / (60 : Int)) = (1000 : Int))
```


::: warning 
THE FAMILIES, F — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. The boundary is confirmed by the wing's own sealed theorems — e.g. [fam_failure](/theorem/fam_failure) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
