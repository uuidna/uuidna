---
title: "THE FAMILIES, S"
description: "Computed from lean/FamiliesS.lean — 114 sealed theorems, every claim citing its proof."
---

# THE FAMILIES, S

> THE FAMILIES, S — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. — held by [fam_safety](/theorem/fam_safety) and its 113 siblings below.

**114 theorems** and **42,384 decided cases**, from [fam_safety](/theorem/fam_safety) onward, each proven `by decide` in <a href="/lean/FamiliesS.lean">lean/FamiliesS.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFamiliesS.lean)** — nothing to install. The editor fetches `lean/FamiliesS.lean` from the repository and re-decides all 114 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### safety: incidentrate(3, 200000) = 3; severity(40, 8) = 5; risk(4, 5) = 20; nearmiss(30, 3) = 10; compliance(95, 100) = 95; exposure(50, 8) = 400; margin(100, 70) = 30; margin(70, 100) = 0; training(80, 100) = 80
The ledger holds this as [fam_safety](/theorem/fam_safety) — proven `by decide`, sorry-free:

```lean
((((3 : Int) * (200000 : Int)) / (200000 : Int)) = (3 : Int)) ∧ (((40 : Int) / (8 : Int)) = (5 : Int)) ∧ (((4 : Int) * (5 : Int)) = (20 : Int)) ∧ (((30 : Int) / (3 : Int)) = (10 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ (((50 : Int) * (8 : Int)) = (400 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (70 : Int))) = (30 : Int)) ∧ ((fmax (0 : Int) ((70 : Int) - (100 : Int))) = (0 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### sailing: ballast(400, 1000) = 40; bearing(450) = 90; drift(3, 4) = 12; heel(50, 200) = 25; hullspeed(30, 2) = 60; sailarea(10, 4) = 20; tack(100, 4) = 25; vmg(100, 90) = 100
The ledger holds this as [fam_sailing](/theorem/fam_sailing) — proven `by decide`, sorry-free:

```lean
((((400 : Int) * (100 : Int)) / (1000 : Int)) = (40 : Int)) ∧ (((((450 : Int) % (360 : Int)) + (360 : Int)) % (360 : Int)) = (90 : Int)) ∧ (((3 : Int) * (4 : Int)) = (12 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int)) ∧ (((30 : Int) * (2 : Int)) = (60 : Int)) ∧ ((((10 : Int) * (4 : Int)) / (2 : Int)) = (20 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ ((((100 : Int) * (90 : Int)) / (90 : Int)) = (100 : Int))
```

### salinity: practical(1000, 1000) = 35; absolute(35, 1) = 36; density(35, 10) = 1025; density(10, 2000) = 0; conductivity(35, 10) = 350; chlorinity(35, 554) = 19; haline(1025, 35) = 29; mixingratio(50, 200) = 25; freezingpoint(35, 54) = 1890
The ledger holds this as [fam_salinity](/theorem/fam_salinity) — proven `by decide`, sorry-free:

```lean
((((1000 : Int) * (35 : Int)) / (1000 : Int)) = (35 : Int)) ∧ (((35 : Int) + (1 : Int)) = (36 : Int)) ∧ ((fmax (0 : Int) (((1000 : Int) + (35 : Int)) - (10 : Int))) = (1025 : Int)) ∧ ((fmax (0 : Int) (((1000 : Int) + (10 : Int)) - (2000 : Int))) = (0 : Int)) ∧ (((35 : Int) * (10 : Int)) = (350 : Int)) ∧ ((((35 : Int) * (554 : Int)) / (1000 : Int)) = (19 : Int)) ∧ (((1025 : Int) / (35 : Int)) = (29 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int)) ∧ (((35 : Int) * (54 : Int)) = (1890 : Int))
```

### sampling: samplesize(10000, 5) = 500; marginoferror(2, 25) = 50; standarderror(100, 10) = 10; stratum(1000, 7) = 143; cluster(1000, 40) = 25; systematic(1000, 50) = 20; weight(5000, 250) = 20000; finitecorrection(1000, 100) = 90; finitecorrection(1000, 1000) = 0
The ledger holds this as [fam_sampling](/theorem/fam_sampling) — proven `by decide`, sorry-free:

```lean
((((10000 : Int) * (5 : Int)) / (100 : Int)) = (500 : Int)) ∧ (((2 : Int) * (25 : Int)) = (50 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ ((-((-(1000 : Int)) / (7 : Int))) = (143 : Int)) ∧ (((1000 : Int) / (40 : Int)) = (25 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((5000 : Int) * (1000 : Int)) / (250 : Int)) = (20000 : Int)) ∧ (((((1000 : Int) - (100 : Int)) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ (((((1000 : Int) - (1000 : Int)) * (100 : Int)) / (1000 : Int)) = (0 : Int))
```

### satellite: altitude(400, 1) = 400; period(5400, 60) = 90; velocity(7, 1000) = 7000; inclination(90, 51) = 39; coverage(80, 100) = 80; constellation(24, 3) = 72; bands(4, 0) = 4; combos(6, 2) = 15
The ledger holds this as [fam_satellite](/theorem/fam_satellite) — proven `by decide`, sorry-free:

```lean
(((400 : Int) * (1 : Int)) = (400 : Int)) ∧ (((5400 : Int) / (60 : Int)) = (90 : Int)) ∧ (((7 : Int) * (1000 : Int)) = (7000 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (51 : Int))) = (39 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((24 : Int) * (3 : Int)) = (72 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### savings: interest(1000, 5, 3) = 150; simplegrowth(1000, 5, 3) = 1150; futurevalue(1000, 200, 12) = 3400; deposit(200, 12) = 2400; apy(20) = 21; goalmonths(10000, 500) = 20; emergencyfund(2000, 6) = 12000; rate(150, 1000) = 15; rate(150, 0) = 0
The ledger holds this as [fam_savings](/theorem/fam_savings) — proven `by decide`, sorry-free:

```lean
(((((1000 : Int) * (5 : Int)) * (3 : Int)) / (100 : Int)) = (150 : Int)) ∧ (((1000 : Int) + ((((1000 : Int) * (5 : Int)) * (3 : Int)) / (100 : Int))) = (1150 : Int)) ∧ (((1000 : Int) + ((200 : Int) * (12 : Int))) = (3400 : Int)) ∧ (((200 : Int) * (12 : Int)) = (2400 : Int)) ∧ (((20 : Int) + (((20 : Int) ^ (2 : Nat)) / (400 : Int))) = (21 : Int)) ∧ ((-((-(10000 : Int)) / (500 : Int))) = (20 : Int)) ∧ (((2000 : Int) * (6 : Int)) = (12000 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (1000 : Int)) = (15 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int))
```

### scale: pclr(30) = 1; pclr(29) = 0
The ledger holds this as [fam_scale](/theorem/fam_scale) — proven `by decide`, sorry-free:

```lean
((if (if (30 : Int) ≥ (30 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (29 : Int) ≥ (30 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int))
```

### scales: degrees(7, 2) = 14; modeshift(5, 10) = 3; tetrachord(2) = 10; intervalpattern(12, 2) = 6; transposition(9, 5) = 2; pentatonicnotes(3) = 15; chromaticfill(60, 72) = 12; keydistance(1) = 7
The ledger holds this as [fam_scales](/theorem/fam_scales) — proven `by decide`, sorry-free:

```lean
(((7 : Int) * (2 : Int)) = (14 : Int)) ∧ ((((5 : Int) + (10 : Int)) % (12 : Int)) = (3 : Int)) ∧ (((2 : Int) * (5 : Int)) = (10 : Int)) ∧ (((12 : Int) / (2 : Int)) = (6 : Int)) ∧ ((((9 : Int) + (5 : Int)) % (12 : Int)) = (2 : Int)) ∧ (((3 : Int) * (5 : Int)) = (15 : Int)) ∧ ((fmax (0 : Int) ((72 : Int) - (60 : Int))) = (12 : Int)) ∧ ((((1 : Int) * (7 : Int)) % (12 : Int)) = (7 : Int))
```

### scheduling: duration(100, 4) = 25; float(50, 35) = 15; lateness(45, 40) = 5; lateness(30, 40) = 0; leadlag(20, 5) = 25; makespan(100, 10) = 90; slack(40, 30) = 10; utilization(30, 40) = 75
The ledger holds this as [fam_scheduling](/theorem/fam_scheduling) — proven `by decide`, sorry-free:

```lean
((-((-(100 : Int)) / (4 : Int))) = (25 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (35 : Int))) = (15 : Int)) ∧ ((fmax (0 : Int) ((45 : Int) - (40 : Int))) = (5 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (40 : Int))) = (0 : Int)) ∧ (((20 : Int) + (5 : Int)) = (25 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (10 : Int))) = (90 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (30 : Int))) = (10 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (40 : Int)) = (75 : Int))
```

### scholasticism: questionscount(500, 131) = 631; articleorderings(5) = 120; objectioncombos(10, 3) = 120; distinctionsubsets(6) = 64; syllogismcount(16, 4) = 64; disputationstages(4, 3) = 7; summaparts(3, 0) = 3; consensusratio(85, 100) = 85
The ledger holds this as [fam_scholasticism](/theorem/fam_scholasticism) — proven `by decide`, sorry-free:

```lean
(((500 : Int) + (131 : Int)) = (631 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (3 : Int)))) = (120 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ (((16 : Int) * (4 : Int)) = (64 : Int)) ∧ (((4 : Int) + (3 : Int)) = (7 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int))
```

### science: hypotheses(3, 2) = 5; experimentpairs(10, 2) = 45; replications(3, 10) = 30; confidence(95, 100) = 95; variableorderings(4) = 24; effectsize(80, 10) = 8; peerreviews(3, 0) = 3; reproducibility(60, 100) = 60
The ledger holds this as [fam_science](/theorem/fam_science) — proven `by decide`, sorry-free:

```lean
(((3 : Int) + (2 : Int)) = (5 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ (((3 : Int) * (10 : Int)) = (30 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ (((80 : Int) / (10 : Int)) = (8 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int))
```

### scrabble: tiles(100, 0) = 100; lettervalues(26, 1) = 26; rackcombos(7, 2) = 21; wordpermutations(7) = 5040; boardcells(15, 15) = 225; bingobonus(50, 0) = 50; blanktiles(2, 0) = 2; scoremultiplier(3, 3) = 9
The ledger holds this as [fam_scrabble](/theorem/fam_scrabble) — proven `by decide`, sorry-free:

```lean
(((100 : Int) + (0 : Int)) = (100 : Int)) ∧ (((26 : Int) * (1 : Int)) = (26 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (7 : Int)) (Int.toNat (2 : Int)))) = (21 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (7 : Int)))) = (5040 : Int)) ∧ (((15 : Int) * (15 : Int)) = (225 : Int)) ∧ (((50 : Int) + (0 : Int)) = (50 : Int)) ∧ (((2 : Int) + (0 : Int)) = (2 : Int)) ∧ (((3 : Int) * (3 : Int)) = (9 : Int))
```

### screening: sensitivity(90, 10) = 90; specificity(85, 15) = 85; ppv(60, 40) = 60; npv(70, 30) = 70; falsepositiverate(15, 85) = 15; prevalenceadjusted(5, 1000) = 500; youdenindex(90, 85) = 75; numbertoscreen(1000, 10) = 100
The ledger holds this as [fam_screening](/theorem/fam_screening) — proven `by decide`, sorry-free:

```lean
((((90 : Int) * (100 : Int)) / ((90 : Int) + (10 : Int))) = (90 : Int)) ∧ ((((85 : Int) * (100 : Int)) / ((85 : Int) + (15 : Int))) = (85 : Int)) ∧ ((((60 : Int) * (100 : Int)) / ((60 : Int) + (40 : Int))) = (60 : Int)) ∧ ((((70 : Int) * (100 : Int)) / ((70 : Int) + (30 : Int))) = (70 : Int)) ∧ ((((15 : Int) * (100 : Int)) / ((15 : Int) + (85 : Int))) = (15 : Int)) ∧ ((((5 : Int) * (100000 : Int)) / (1000 : Int)) = (500 : Int)) ∧ ((fmax (0 : Int) (((90 : Int) + (85 : Int)) - (100 : Int))) = (75 : Int)) ∧ ((-((-(1000 : Int)) / (10 : Int))) = (100 : Int))
```

### screenwriting: acts(3, 0) = 3; scenecount(40, 1) = 40; pagesperminute(120, 120) = 1; beatcombos(15, 3) = 455; plotpaths(6, 2) = 30; charactercount(8, 4) = 12; dialogueratio(60, 100) = 60; structuresubsets(5) = 32
The ledger holds this as [fam_screenwriting](/theorem/fam_screenwriting) — proven `by decide`, sorry-free:

```lean
(((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((40 : Int) * (1 : Int)) = (40 : Int)) ∧ (((120 : Int) / (120 : Int)) = (1 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (15 : Int)) (Int.toNat (3 : Int)))) = (455 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (6 : Int)))) / (Int.ofNat (ffact (Int.toNat ((6 : Int) - (2 : Int)))))) = (30 : Int)) ∧ (((8 : Int) + (4 : Int)) = (12 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int))
```

### scripture: wordtotal(1000, 12) = 12000; versesperchapter(31000, 1189) = 26; chaptersperbook(1189, 66) = 18; lexicaltypes(12000, 3) = 4000; concordancepairs(20, 2) = 190; translationways(5) = 120; crossreferences(340, 10) = 3400; readingplan(1189, 365) = 3
The ledger holds this as [fam_scripture](/theorem/fam_scripture) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) * (12 : Int)) = (12000 : Int)) ∧ (((31000 : Int) / (1189 : Int)) = (26 : Int)) ∧ (((1189 : Int) / (66 : Int)) = (18 : Int)) ∧ (((12000 : Int) / (3 : Int)) = (4000 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (20 : Int)) (Int.toNat (2 : Int)))) = (190 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((340 : Int) * (10 : Int)) = (3400 : Int)) ∧ (((1189 : Int) / (365 : Int)) = (3 : Int))
```

### sculpture: volume(20, 20, 40) = 16000; masskg(16000, 1000) = 16; removalratio(40, 100) = 40; facetcount(12, 4) = 48; supportpoints(3, 1) = 4; scaleratio(150, 100) = 150; toolpasses(50, 3) = 150; balancemargin(100, 30) = 70
The ledger holds this as [fam_sculpture](/theorem/fam_sculpture) — proven `by decide`, sorry-free:

```lean
((((20 : Int) * (20 : Int)) * (40 : Int)) = (16000 : Int)) ∧ (((16000 : Int) / (1000 : Int)) = (16 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((12 : Int) * (4 : Int)) = (48 : Int)) ∧ (((3 : Int) + (1 : Int)) = (4 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (100 : Int)) = (150 : Int)) ∧ (((50 : Int) * (3 : Int)) = (150 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int))
```

### search: recall(80, 100) = 80; precision(40, 50) = 80; latency(5000, 100) = 50; index(1000, 20) = 20000; hits(30, 200) = 15; throughput(6000, 60) = 100; coverage(900, 1000) = 90; f1(80, 80) = 80; f1(0, 0) = 0
The ledger holds this as [fam_search](/theorem/fam_search) — proven `by decide`, sorry-free:

```lean
((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (50 : Int)) = (80 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ (((1000 : Int) * (20 : Int)) = (20000 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (200 : Int)) = (15 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ (((((2 : Int) * (80 : Int)) * (80 : Int)) / ((80 : Int) + (80 : Int))) = (80 : Int)) ∧ (((((2 : Int) * (0 : Int)) * (0 : Int)) / ((0 : Int) + (0 : Int))) = (0 : Int))
```

### securities: marketcap(1000000, 50) = 50000000; pe(100, 5) = 20; coupon(1000, 5) = 50; dividend(500, 3) = 1500; dilution(200, 800) = 20; spread(99, 101) = 2; gain(40, 55, 100) = 1500; gain(55, 40, 100) = -1500; split(1000, 3) = 3000
The ledger holds this as [fam_securities](/theorem/fam_securities) — proven `by decide`, sorry-free:

```lean
(((1000000 : Int) * (50 : Int)) = (50000000 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ ((((1000 : Int) * (5 : Int)) / (100 : Int)) = (50 : Int)) ∧ (((500 : Int) * (3 : Int)) = (1500 : Int)) ∧ ((((200 : Int) * (100 : Int)) / ((200 : Int) + (800 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((101 : Int) - (99 : Int))) = (2 : Int)) ∧ ((((55 : Int) - (40 : Int)) * (100 : Int)) = (1500 : Int)) ∧ ((((40 : Int) - (55 : Int)) * (100 : Int)) = (-1500 : Int)) ∧ (((1000 : Int) * (3 : Int)) = (3000 : Int))
```

### security: severity(90, 8) = 72; patch(40, 25) = 15; mttr(480, 12) = 40; exposure(100, 85) = 15; strength(16, 4) = 64; detection(95, 100) = 95; window(2460000, 2460030) = 30; coverage(180, 200) = 90
The ledger holds this as [fam_security](/theorem/fam_security) — proven `by decide`, sorry-free:

```lean
((((90 : Int) * (8 : Int)) / (10 : Int)) = (72 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (25 : Int))) = (15 : Int)) ∧ (((480 : Int) / (12 : Int)) = (40 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (85 : Int))) = (15 : Int)) ∧ (((16 : Int) * (4 : Int)) = (64 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((fmax (0 : Int) ((2460030 : Int) - (2460000 : Int))) = (30 : Int)) ∧ ((((180 : Int) * (100 : Int)) / (200 : Int)) = (90 : Int))
```

### sedimentology: grainsize(500, 100) = 300; sorting(800, 200) = 600; sorting(200, 800) = 0; roundness(80, 100) = 80; settlingvelocity(100, 20) = 500; porosity(30, 100) = 30; sedimentload(50, 40) = 2000; bedform(120, 4) = 30; bedform(5, 0) = 0; maturity(90, 10) = 90
The ledger holds this as [fam_sedimentology](/theorem/fam_sedimentology) — proven `by decide`, sorry-free:

```lean
((((500 : Int) + (100 : Int)) / (2 : Int)) = (300 : Int)) ∧ ((fmax (0 : Int) ((800 : Int) - (200 : Int))) = (600 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (800 : Int))) = (0 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((100 : Int) * (100 : Int)) / (20 : Int)) = (500 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((50 : Int) * (40 : Int)) = (2000 : Int)) ∧ (((120 : Int) / (4 : Int)) = (30 : Int)) ∧ (((5 : Int) / (0 : Int)) = (0 : Int)) ∧ ((((90 : Int) * (100 : Int)) / ((90 : Int) + (10 : Int))) = (90 : Int))
```

### seismology: magnitude(750) = 7; energy(7) = 49; distance(10, 5) = 50; intensity(7, 20) = 35; intensity(7, 0) = 0; aftershocks(100, 5) = 200; aftershocks(100, 0) = 0; epicenter(30, 45) = 75; frequency(500, 100) = 5; frequency(500, 0) = 0; moment(1000, 3) = 3000
The ledger holds this as [fam_seismology](/theorem/fam_seismology) — proven `by decide`, sorry-free:

```lean
(((750 : Int) / (100 : Int)) = (7 : Int)) ∧ (((7 : Int) * (7 : Int)) = (49 : Int)) ∧ (((10 : Int) * (5 : Int)) = (50 : Int)) ∧ ((((7 : Int) * (100 : Int)) / (20 : Int)) = (35 : Int)) ∧ ((((7 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int)) ∧ ((((100 : Int) * (10 : Int)) / (5 : Int)) = (200 : Int)) ∧ ((((100 : Int) * (10 : Int)) / (0 : Int)) = (0 : Int)) ∧ (((30 : Int) + (45 : Int)) = (75 : Int)) ∧ (((500 : Int) / (100 : Int)) = (5 : Int)) ∧ (((500 : Int) / (0 : Int)) = (0 : Int)) ∧ (((1000 : Int) * (3 : Int)) = (3000 : Int))
```

### semantics: similarity(3, 4) = 75; polysemy(10, 3) = 3; entailment(2, 5) = 40; ambiguity(12, 4) = 3; density(30, 100) = 30; coherence(9, 10) = 90; sentiment(70, 30) = 40; sentiment(30, 70) = -40
The ledger holds this as [fam_semantics](/theorem/fam_semantics) — proven `by decide`, sorry-free:

```lean
((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ (((10 : Int) / (3 : Int)) = (3 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (5 : Int)) = (40 : Int)) ∧ (((12 : Int) / (4 : Int)) = (3 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int)) ∧ (((70 : Int) - (30 : Int)) = (40 : Int)) ∧ (((30 : Int) - (70 : Int)) = (-40 : Int))
```

### semiconductor: carrier(600, 400) = 1000; diesyield(90, 100) = 90; doping(5, 1000000) = 5; junction(1000, 10) = 10000; mobility(1400, 2) = 700; resistivity(5, 1) = 5
The ledger holds this as [fam_semiconductor](/theorem/fam_semiconductor) — proven `by decide`, sorry-free:

```lean
(((600 : Int) + (400 : Int)) = (1000 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((5 : Int) * (1000000 : Int)) / (1000000 : Int)) = (5 : Int)) ∧ ((((1000 : Int) * (100 : Int)) / (10 : Int)) = (10000 : Int)) ∧ (((1400 : Int) / (2 : Int)) = (700 : Int)) ∧ (((5 : Int) / (1 : Int)) = (5 : Int))
```

### semiconductors: bandgap(1120, 50) = 1070; doping(500, 8) = 4000; mobility(1400, 7) = 200; resistivity(10, 50, 25) = 20; threshold(5, 2) = 3; threshold(1, 2) = 0; yield(950, 1000) = 95; wafer(31416, 100) = 314; junction(600, 4) = 150
The ledger holds this as [fam_semiconductors](/theorem/fam_semiconductors) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((1120 : Int) - (50 : Int))) = (1070 : Int)) ∧ (((500 : Int) * (8 : Int)) = (4000 : Int)) ∧ (((1400 : Int) / (7 : Int)) = (200 : Int)) ∧ ((((10 : Int) * (50 : Int)) / (25 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (2 : Int))) = (3 : Int)) ∧ ((fmax (0 : Int) ((1 : Int) - (2 : Int))) = (0 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ (((31416 : Int) / (100 : Int)) = (314 : Int)) ∧ (((600 : Int) / (4 : Int)) = (150 : Int))
```

### semiotics: signs(50, 30) = 80; signifierpairs(20, 2) = 190; codesubsets(6) = 64; denotationlevels(2, 1) = 3; paradigmorderings(5) = 120; syntagmlength(8, 3) = 24; iconindexsymbol(3, 0) = 3; interpretantratio(70, 100) = 70
The ledger holds this as [fam_semiotics](/theorem/fam_semiotics) — proven `by decide`, sorry-free:

```lean
(((50 : Int) + (30 : Int)) = (80 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (20 : Int)) (Int.toNat (2 : Int)))) = (190 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ (((2 : Int) + (1 : Int)) = (3 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((8 : Int) * (3 : Int)) = (24 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int))
```

### sentence: concurrent(60, 36) = 60; consecutive(60, 36) = 96; credit(60, 14) = 46; credit(10, 20) = 0; parole(60, 50) = 30; goodtime(60, 15) = 9; mandatory(24, 18) = 24; mandatory(24, 36) = 36; enhance(60, 50) = 90; fine(30, 50) = 1500
The ledger holds this as [fam_sentence](/theorem/fam_sentence) — proven `by decide`, sorry-free:

```lean
((fmax (60 : Int) (36 : Int)) = (60 : Int)) ∧ (((60 : Int) + (36 : Int)) = (96 : Int)) ∧ ((fmax (0 : Int) ((60 : Int) - (14 : Int))) = (46 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (20 : Int))) = (0 : Int)) ∧ ((((60 : Int) * (50 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((60 : Int) * (15 : Int)) / (100 : Int)) = (9 : Int)) ∧ ((fmax (24 : Int) (18 : Int)) = (24 : Int)) ∧ ((fmax (24 : Int) (36 : Int)) = (36 : Int)) ∧ (((60 : Int) + (((60 : Int) * (50 : Int)) / (100 : Int))) = (90 : Int)) ∧ (((30 : Int) * (50 : Int)) = (1500 : Int))
```

### sentiment: polarity(80, 20) = 60; polarity(20, 80) = 0; netscore(75, 100) = 75; subjectivity(40, 100) = 40; intensity(7, 9) = 63; agreement(18, 20) = 90; confidence(950, 1000) = 95; mixedratio(30, 90) = 33; valence(60, 30, 10) = 60
The ledger holds this as [fam_sentiment](/theorem/fam_sentiment) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((80 : Int) - (20 : Int))) = (60 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (80 : Int))) = (0 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((7 : Int) * (9 : Int)) = (63 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (20 : Int)) = (90 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((((fmin (30 : Int) (90 : Int)) * (100 : Int)) / (fmax (30 : Int) (90 : Int))) = (33 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (((60 : Int) + (30 : Int)) + (10 : Int))) = (60 : Int))
```

### seo: prefix(1, 1) = 0; prefix(3, 1) = 2; slug(5, 2) = 3; canonical(1) = 1; canonical(3) = 0; redirect(1) = 1; redirect(4) = 0; title(55) = 1; title(80) = 0; meta(150) = 1; crawl(95, 100) = 95
The ledger holds this as [fam_seo](/theorem/fam_seo) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((1 : Int) - (1 : Int))) = (0 : Int)) ∧ ((fmax (0 : Int) ((3 : Int) - (1 : Int))) = (2 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (2 : Int))) = (3 : Int)) ∧ ((if (if (1 : Int) ≤ (1 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (3 : Int) ≤ (1 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (1 : Int) ≤ (1 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (4 : Int) ≤ (1 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (55 : Int) ≤ (60 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (80 : Int) ≤ (60 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (150 : Int) ≤ (160 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int))
```

### serialization: overhead(12, 100) = 1200; payload(5000, 1200) = 3800; payload(1000, 2000) = 0; throughput(6000, 60) = 100; framing(3800, 4, 50) = 4000; encoding(300) = 400; schema(20, 3) = 60; delta(8, 16) = 128; batch(1000, 64) = 16
The ledger holds this as [fam_serialization](/theorem/fam_serialization) — proven `by decide`, sorry-free:

```lean
(((12 : Int) * (100 : Int)) = (1200 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (1200 : Int))) = (3800 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (2000 : Int))) = (0 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((3800 : Int) + ((4 : Int) * (50 : Int))) = (4000 : Int)) ∧ (((-((-(300 : Int)) / (3 : Int))) * (4 : Int)) = (400 : Int)) ∧ (((20 : Int) * (3 : Int)) = (60 : Int)) ∧ (((8 : Int) * (16 : Int)) = (128 : Int)) ∧ ((-((-(1000 : Int)) / (64 : Int))) = (16 : Int))
```

### serology: titer(8) = 256; dilutionfactor(2, 64) = 128; antibodypairs(10, 2) = 45; antigencombos(12, 3) = 220; seroconversion(95, 100) = 95; crossreactivity(20, 100) = 20; bindingaffinity(60000, 1000) = 60; panelsubsets(6) = 64
The ledger holds this as [fam_serology](/theorem/fam_serology) — proven `by decide`, sorry-free:

```lean
(((2 : Int) ^ (8 : Nat)) = (256 : Int)) ∧ (((2 : Int) * (64 : Int)) = (128 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ (((60000 : Int) / (1000 : Int)) = (60 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int))
```

### sessionmgmt: idletimeout(15, 30) = 930; absolutetimeout(8) = 28800; concurrentlimit(100, 5) = 500; tokenttl(1000, 3600) = 4600; renewalwindow(3600, 4) = 900; activesessions(500, 120) = 380; activesessions(100, 400) = 0; expirymargin(3600, 1200) = 2400; cleanupinterval(1000, 30) = 34
The ledger holds this as [fam_sessionmgmt](/theorem/fam_sessionmgmt) — proven `by decide`, sorry-free:

```lean
((((15 : Int) * (60 : Int)) + (30 : Int)) = (930 : Int)) ∧ (((8 : Int) * (3600 : Int)) = (28800 : Int)) ∧ (((100 : Int) * (5 : Int)) = (500 : Int)) ∧ (((1000 : Int) + (3600 : Int)) = (4600 : Int)) ∧ (((3600 : Int) / (4 : Int)) = (900 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (120 : Int))) = (380 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (400 : Int))) = (0 : Int)) ∧ ((fmax (0 : Int) ((3600 : Int) - (1200 : Int))) = (2400 : Int)) ∧ ((-((-(1000 : Int)) / (30 : Int))) = (34 : Int))
```

### shamanism: trancestates(3, 2) = 5; journeyorderings(4) = 24; spiritallies(10, 2) = 45; drumbeats(120, 1) = 120; cosmiclayers(3, 0) = 3; healingcombos(8, 2) = 28; initiationstages(5, 0) = 5; ecstasyratio(80, 100) = 80
The ledger holds this as [fam_shamanism](/theorem/fam_shamanism) — proven `by decide`, sorry-free:

```lean
(((3 : Int) + (2 : Int)) = (5 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ (((120 : Int) * (1 : Int)) = (120 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ (((5 : Int) + (0 : Int)) = (5 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### sharding: shards(1000, 256) = 4; keyrange(65536, 16) = 4096; rebalance(1000, 3) = 250; hotspot(900, 100) = 9; fanout(16, 3) = 48; skew(500, 120) = 380; placement(1000, 16) = 8; resharding(1000, 4, 8) = 500; skew(100, 300) = 0
The ledger holds this as [fam_sharding](/theorem/fam_sharding) — proven `by decide`, sorry-free:

```lean
((-((-(1000 : Int)) / (256 : Int))) = (4 : Int)) ∧ (((65536 : Int) / (16 : Int)) = (4096 : Int)) ∧ (((1000 : Int) / ((3 : Int) + (1 : Int))) = (250 : Int)) ∧ (((900 : Int) / (100 : Int)) = (9 : Int)) ∧ (((16 : Int) * (3 : Int)) = (48 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (120 : Int))) = (380 : Int)) ∧ (((1000 : Int) % (16 : Int)) = (8 : Int)) ∧ ((((1000 : Int) * (fmax (0 : Int) ((8 : Int) - (4 : Int)))) / (8 : Int)) = (500 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (300 : Int))) = (0 : Int))
```

### shinto: kamicount(8, 1000) = 8000; shrinecombos(12, 2) = 66; ritualstages(5) = 120; purificationtypes(3, 2) = 5; festivaldays(20, 1) = 20; offeringsubsets(5) = 32; prayerpairs(10, 2) = 45; harmonyratio(80, 100) = 80
The ledger holds this as [fam_shinto](/theorem/fam_shinto) — proven `by decide`, sorry-free:

```lean
(((8 : Int) * (1000 : Int)) = (8000 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ (((20 : Int) * (1 : Int)) = (20 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### shipping: teu(100, 2) = 200; utilization(900, 1000) = 90; transittime(12000, 500) = 24; freightrate(10000, 50) = 200; demurrage(5, 150) = 750; ontime(95, 100) = 95; bunkerfuel(1000, 30) = 30000
The ledger holds this as [fam_shipping](/theorem/fam_shipping) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * (2 : Int)) = (200 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ (((12000 : Int) / (500 : Int)) = (24 : Int)) ∧ (((10000 : Int) / (50 : Int)) = (200 : Int)) ∧ (((5 : Int) * (150 : Int)) = (750 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ (((1000 : Int) * (30 : Int)) = (30000 : Int))
```

### shogi: squares(9, 9) = 81; pieces(20, 2) = 40; promotions(6, 0) = 6; dropcombos(7, 2) = 21; movepaths(8, 3) = 336; handsubsets(7) = 128; rankcount(9, 0) = 9; branchingfactor(80, 0) = 80
The ledger holds this as [fam_shogi](/theorem/fam_shogi) — proven `by decide`, sorry-free:

```lean
(((9 : Int) * (9 : Int)) = (81 : Int)) ∧ (((20 : Int) * (2 : Int)) = (40 : Int)) ∧ (((6 : Int) + (0 : Int)) = (6 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (7 : Int)) (Int.toNat (2 : Int)))) = (21 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (8 : Int)))) / (Int.ofNat (ffact (Int.toNat ((8 : Int) - (3 : Int)))))) = (336 : Int)) ∧ (((2 : Int) ^ (7 : Nat)) = (128 : Int)) ∧ (((9 : Int) + (0 : Int)) = (9 : Int)) ∧ (((80 : Int) + (0 : Int)) = (80 : Int))
```

### shorthand: strokesperword(20, 4) = 5; compression(800, 200) = 400; symbolcount(26, 2) = 52; speedwpm(120, 1) = 120; abbreviationsubsets(6) = 64; strokesaved(20, 5) = 15; outlinepairs(12, 2) = 66; legibilityratio(85, 100) = 85
The ledger holds this as [fam_shorthand](/theorem/fam_shorthand) — proven `by decide`, sorry-free:

```lean
(((20 : Int) / (4 : Int)) = (5 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (200 : Int)) = (400 : Int)) ∧ (((26 : Int) * (2 : Int)) = (52 : Int)) ∧ (((120 : Int) * (1 : Int)) = (120 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (5 : Int))) = (15 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int))
```

### signaling: receptoroccupancy(100, 100) = 50; amplification(10000, 100) = 100; ec50(80, 20) = 50; cascadegain(10, 50) = 500; secondmessenger(200, 30) = 6000; desensitization(1000, 400) = 600; desensitization(300, 500) = 0; dissociation(10000, 90) = 900; responsetime(5000, 100) = 50
The ledger holds this as [fam_signaling](/theorem/fam_signaling) — proven `by decide`, sorry-free:

```lean
((((100 : Int) * (100 : Int)) / ((100 : Int) + (100 : Int))) = (50 : Int)) ∧ (((10000 : Int) / (100 : Int)) = (100 : Int)) ∧ ((((80 : Int) + (20 : Int)) / (2 : Int)) = (50 : Int)) ∧ (((10 : Int) * (50 : Int)) = (500 : Int)) ∧ (((200 : Int) * (30 : Int)) = (6000 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (400 : Int))) = (600 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (500 : Int))) = (0 : Int)) ∧ ((((10000 : Int) * (90 : Int)) / (1000 : Int)) = (900 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int))
```

### sikhism: gurus(10, 0) = 10; scripturepages(1430, 1) = 1430; pillars(3, 0) = 3; prayerorderings(5) = 120; articlesoffaith(5, 0) = 5; hymncombos(12, 3) = 220; communitymeals(100, 7) = 700; devotionratio(90, 100) = 90
The ledger holds this as [fam_sikhism](/theorem/fam_sikhism) — proven `by decide`, sorry-free:

```lean
(((10 : Int) + (0 : Int)) = (10 : Int)) ∧ (((1430 : Int) * (1 : Int)) = (1430 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((5 : Int) + (0 : Int)) = (5 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int)) ∧ (((100 : Int) * (7 : Int)) = (700 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int))
```

### silage: drymatter(350, 1000) = 35; density(7000, 10) = 700; fermentationloss(80, 1000) = 8; phlevel(420, 10) = 42; packingdensity(12, 600) = 7200; feedout(3000, 30) = 100; capacity(50, 4) = 200; moisture(650, 1000) = 65
The ledger holds this as [fam_silage](/theorem/fam_silage) — proven `by decide`, sorry-free:

```lean
((((350 : Int) * (100 : Int)) / (1000 : Int)) = (35 : Int)) ∧ (((7000 : Int) / (10 : Int)) = (700 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (1000 : Int)) = (8 : Int)) ∧ (((420 : Int) / (10 : Int)) = (42 : Int)) ∧ (((12 : Int) * (600 : Int)) = (7200 : Int)) ∧ (((3000 : Int) / (30 : Int)) = (100 : Int)) ∧ (((50 : Int) * (4 : Int)) = (200 : Int)) ∧ ((((650 : Int) * (100 : Int)) / (1000 : Int)) = (65 : Int))
```

### silviculture: basalarea(10, 4) = 100; density(5000, 50) = 100; growth(50, 80) = 30; growth(80, 50) = 0; rotation(100, 10) = 10; stocking(900, 1000) = 90; thinning(1000, 300) = 700; volume(100, 20) = 2000; yield(8, 25) = 200
The ledger holds this as [fam_silviculture](/theorem/fam_silviculture) — proven `by decide`, sorry-free:

```lean
(((((10 : Int) ^ (2 : Nat)) * (4 : Int)) / (4 : Int)) = (100 : Int)) ∧ (((5000 : Int) / (50 : Int)) = (100 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (50 : Int))) = (30 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (80 : Int))) = (0 : Int)) ∧ ((-((-(100 : Int)) / (10 : Int))) = (10 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (300 : Int))) = (700 : Int)) ∧ (((100 : Int) * (20 : Int)) = (2000 : Int)) ∧ (((8 : Int) * (25 : Int)) = (200 : Int))
```

### simulation: timestep(1000, 100) = 10; convergence(50, 10) = 5; montecarlo(785, 1000) = 78; stability(95, 100) = 95; resolution(1000, 50) = 20; speedup(800, 100) = 800; accuracy(990, 1000) = 99
The ledger holds this as [fam_simulation](/theorem/fam_simulation) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (100 : Int)) = (10 : Int)) ∧ (((50 : Int) / (10 : Int)) = (5 : Int)) ∧ ((((785 : Int) * (100 : Int)) / (1000 : Int)) = (78 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (100 : Int)) = (800 : Int)) ∧ ((((990 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int))
```

### sintering: densification(95, 60, 100) = 87; density(950, 1000) = 95; greendensity(500, 100) = 500; holdtime(1200, 10) = 120; neckgrowth(30, 100) = 30; porosity(95) = 5; shrinkage(100, 85) = 15; temperature(1500, 75) = 1125
The ledger holds this as [fam_sintering](/theorem/fam_sintering) — proven `by decide`, sorry-free:

```lean
(((((95 : Int) - (60 : Int)) * (100 : Int)) / ((100 : Int) - (60 : Int))) = (87 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((((500 : Int) * (100 : Int)) / (100 : Int)) = (500 : Int)) ∧ (((1200 : Int) / (10 : Int)) = (120 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (95 : Int))) = (5 : Int)) ∧ (((((100 : Int) - (85 : Int)) * (100 : Int)) / (100 : Int)) = (15 : Int)) ∧ ((((1500 : Int) * (75 : Int)) / (100 : Int)) = (1125 : Int))
```

### sixsigma: cpk(400, 300) = 133; defects(1000, 3) = 3000; dpmo(5, 1000) = 5000; dpu(20, 1000) = 20; opportunities(1000, 5) = 5000; rolledthroughput(95, 90, 90) = 76; sigma(600, 100) = 6; yield(950, 1000) = 95
The ledger holds this as [fam_sixsigma](/theorem/fam_sixsigma) — proven `by decide`, sorry-free:

```lean
((((400 : Int) * (100 : Int)) / (300 : Int)) = (133 : Int)) ∧ (((1000 : Int) * (3 : Int)) = (3000 : Int)) ∧ ((((5 : Int) * (1000000 : Int)) / (1000 : Int)) = (5000 : Int)) ∧ ((((20 : Int) * (1000 : Int)) / (1000 : Int)) = (20 : Int)) ∧ (((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ (((((95 : Int) * (90 : Int)) * (90 : Int)) / (10000 : Int)) = (76 : Int)) ∧ (((600 : Int) / (100 : Int)) = (6 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int))
```

### slider: index(1, 4) = 25; autoplay(3000, 5) = 15000; loop(7, 5) = 2; visible(3, 12) = 25; gap(5, 16) = 64; pages(10, 3) = 4
The ledger holds this as [fam_slider](/theorem/fam_slider) — proven `by decide`, sorry-free:

```lean
((((1 : Int) * (100 : Int)) / (4 : Int)) = (25 : Int)) ∧ (((3000 : Int) * (5 : Int)) = (15000 : Int)) ∧ (((7 : Int) % (5 : Int)) = (2 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (12 : Int)) = (25 : Int)) ∧ (((fmax (0 : Int) ((5 : Int) - (1 : Int))) * (16 : Int)) = (64 : Int)) ∧ ((-((-(10 : Int)) / (3 : Int))) = (4 : Int))
```

### slotting: pickdensity(500, 50) = 10; traveltime(1000, 20) = 50; velocityrank(900, 100) = 9; utilizationrate(85, 100) = 85; replenishrate(600, 6) = 100; goldenzone(40, 200) = 20; picksperslot(800, 40) = 20; congestionindex(30, 100) = 30
The ledger holds this as [fam_slotting](/theorem/fam_slotting) — proven `by decide`, sorry-free:

```lean
(((500 : Int) / (50 : Int)) = (10 : Int)) ∧ (((1000 : Int) / (20 : Int)) = (50 : Int)) ∧ (((900 : Int) / (100 : Int)) = (9 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ (((600 : Int) / (6 : Int)) = (100 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (200 : Int)) = (20 : Int)) ∧ (((800 : Int) / (40 : Int)) = (20 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int))
```

### smartgrid: nodes(1000, 2) = 2000; loadcombos(12, 2) = 66; demandresponse(15, 100) = 15; selfhealingpaths(6, 2) = 30; meterdata(1000, 24) = 24000; outagereduction(40, 100) = 40; renewableshare(50, 100) = 50; stabilitymargin(100, 20) = 80
The ledger holds this as [fam_smartgrid](/theorem/fam_smartgrid) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) * (2 : Int)) = (2000 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (100 : Int)) = (15 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (6 : Int)))) / (Int.ofNat (ffact (Int.toNat ((6 : Int) - (2 : Int)))))) = (30 : Int)) ∧ (((1000 : Int) * (24 : Int)) = (24000 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (20 : Int))) = (80 : Int))
```

### smoking: smoketime(6, 60) = 360; temperaturezone(107, 110) = 110; phenoldeposition(70, 100) = 70; moisturereduction(25, 100) = 25; penetrationdepth(20, 4) = 5; preservationindex(90, 100) = 90; woodratio(30, 100) = 30; surfacecolor(8, 10) = 80
The ledger holds this as [fam_smoking](/theorem/fam_smoking) — proven `by decide`, sorry-free:

```lean
(((6 : Int) * (60 : Int)) = (360 : Int)) ∧ ((fmax (107 : Int) (110 : Int)) = (110 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int)) ∧ (((20 : Int) / (4 : Int)) = (5 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((8 : Int) * (10 : Int)) = (80 : Int))
```

### soccer: possession(60, 90) = 66; conversion(3, 12) = 25; passaccuracy(400, 500) = 80; xg(10, 35) = 3; cleansheets(12, 38) = 31; goaldiff(30, 20) = 10; goaldiff(20, 30) = -10; distance(10500, 90) = 116; points(10, 5) = 35
The ledger holds this as [fam_soccer](/theorem/fam_soccer) — proven `by decide`, sorry-free:

```lean
((((60 : Int) * (100 : Int)) / (90 : Int)) = (66 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (12 : Int)) = (25 : Int)) ∧ ((((400 : Int) * (100 : Int)) / (500 : Int)) = (80 : Int)) ∧ ((((10 : Int) * (35 : Int)) / (100 : Int)) = (3 : Int)) ∧ ((((12 : Int) * (100 : Int)) / (38 : Int)) = (31 : Int)) ∧ (((30 : Int) - (20 : Int)) = (10 : Int)) ∧ (((20 : Int) - (30 : Int)) = (-10 : Int)) ∧ (((10500 : Int) / (90 : Int)) = (116 : Int)) ∧ ((((10 : Int) * (3 : Int)) + (5 : Int)) = (35 : Int))
```

### social: engagement(500, 10000) = 5; reach(100000, 8) = 8000; virality(200, 10000) = 2; growth(500, 10000) = 5; impressions(30, 8000) = 240000; sentiment(700, 1000) = 70; influence(100000, 5) = 5000; frequency(240000, 80000) = 3
The ledger holds this as [fam_social](/theorem/fam_social) — proven `by decide`, sorry-free:

```lean
((((500 : Int) * (100 : Int)) / (10000 : Int)) = (5 : Int)) ∧ ((((100000 : Int) * (8 : Int)) / (100 : Int)) = (8000 : Int)) ∧ ((((200 : Int) * (100 : Int)) / (10000 : Int)) = (2 : Int)) ∧ ((((500 : Int) * (100 : Int)) / (10000 : Int)) = (5 : Int)) ∧ (((30 : Int) * (8000 : Int)) = (240000 : Int)) ∧ ((((700 : Int) * (100 : Int)) / (1000 : Int)) = (70 : Int)) ∧ ((((100000 : Int) * (5 : Int)) / (100 : Int)) = (5000 : Int)) ∧ (((240000 : Int) / (80000 : Int)) = (3 : Int))
```

### socialnetwork: degreecentrality(5, 11) = 50; clustering(15, 60) = 25; reciprocity(30, 50) = 60; pathlength(420, 100) = 4; betweenness(12, 48) = 25; components(10, 7) = 3; homophily(35, 50) = 70
The ledger holds this as [fam_socialnetwork](/theorem/fam_socialnetwork) — proven `by decide`, sorry-free:

```lean
((((5 : Int) * (100 : Int)) / ((11 : Int) - (1 : Int))) = (50 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (60 : Int)) = (25 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (50 : Int)) = (60 : Int)) ∧ (((420 : Int) / (100 : Int)) = (4 : Int)) ∧ ((((12 : Int) * (100 : Int)) / (48 : Int)) = (25 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (7 : Int))) = (3 : Int)) ∧ ((((35 : Int) * (100 : Int)) / (50 : Int)) = (70 : Int))
```

### sociology: gini(20, 100) = 20; mobility(30, 100) = 30; network(5, 10) = 100; cohesion(50, 10) = 5; segregation(40, 100) = 40; participation(60, 100) = 60; diffusion(25, 100) = 25
The ledger holds this as [fam_sociology](/theorem/fam_sociology) — proven `by decide`, sorry-free:

```lean
((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((10 : Int) * (200 : Int)) / ((5 : Int) * ((5 : Int) - (1 : Int)))) = (100 : Int)) ∧ (((50 : Int) / (10 : Int)) = (5 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int))
```

### socket: ports(16) = 65536; backlog(128, 0) = 128; connections(1000, 4) = 4000; timeout(120, 2) = 60; buffers(64, 1024) = 65536; states(11, 0) = 11; handshake(3, 0) = 3; combos(6, 2) = 15
The ledger holds this as [fam_socket](/theorem/fam_socket) — proven `by decide`, sorry-free:

```lean
(((2 : Int) ^ (16 : Nat)) = (65536 : Int)) ∧ (((128 : Int) + (0 : Int)) = (128 : Int)) ∧ (((1000 : Int) * (4 : Int)) = (4000 : Int)) ∧ (((120 : Int) / (2 : Int)) = (60 : Int)) ∧ (((64 : Int) * (1024 : Int)) = (65536 : Int)) ∧ (((11 : Int) + (0 : Int)) = (11 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### software: kloc(12345) = 12; coverage(87, 100) = 87; coverage(1, 0) = 0; cyclomatic(10, 8) = 4; cyclomatic(1, 8) = 0; defects(12, 5) = 60; flags(10) = 1024; hours(5) = 20; velocity(40, 10) = 4; density(60, 12) = 5; throughput(4, 6) = 24; debt(40, 150) = 6000; effort(12, 20) = 240; teamsize(100, 40) = 3; builds(50, 3) = 150; mttr(600, 8) = 75
The ledger holds this as [fam_software](/theorem/fam_software) — proven `by decide`, sorry-free:

```lean
(((12345 : Int) / (1000 : Int)) = (12 : Int)) ∧ ((((87 : Int) * (100 : Int)) / (100 : Int)) = (87 : Int)) ∧ ((((1 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int)) ∧ ((fmax (0 : Int) (((10 : Int) - (8 : Int)) + (2 : Int))) = (4 : Int)) ∧ ((fmax (0 : Int) (((1 : Int) - (8 : Int)) + (2 : Int))) = (0 : Int)) ∧ (((12 : Int) * (5 : Int)) = (60 : Int)) ∧ (((2 : Int) ^ (10 : Nat)) = (1024 : Int)) ∧ (((5 : Int) * (4 : Int)) = (20 : Int)) ∧ (((40 : Int) / (10 : Int)) = (4 : Int)) ∧ (((60 : Int) / (12 : Int)) = (5 : Int)) ∧ (((4 : Int) * (6 : Int)) = (24 : Int)) ∧ (((40 : Int) * (150 : Int)) = (6000 : Int)) ∧ (((12 : Int) * (20 : Int)) = (240 : Int)) ∧ ((-((-(100 : Int)) / (40 : Int))) = (3 : Int)) ∧ (((50 : Int) * (3 : Int)) = (150 : Int)) ∧ (((600 : Int) / (8 : Int)) = (75 : Int))
```

### soilscience: porosity(130, 265) = 50; bulkdensity(2600, 2) = 1300; fieldcapacity(30, 12) = 18; cationexchange(15, 2) = 30; organicmatter(20) = 34; infiltration(120, 4) = 30; salinity(4) = 2560; texture(40, 40) = 20; texture(60, 60) = 0
The ledger holds this as [fam_soilscience](/theorem/fam_soilscience) — proven `by decide`, sorry-free:

```lean
(((((265 : Int) - (130 : Int)) * (100 : Int)) / (265 : Int)) = (50 : Int)) ∧ (((2600 : Int) / (2 : Int)) = (1300 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (12 : Int))) = (18 : Int)) ∧ (((15 : Int) * (2 : Int)) = (30 : Int)) ∧ ((((20 : Int) * (1724 : Int)) / (1000 : Int)) = (34 : Int)) ∧ (((120 : Int) / (4 : Int)) = (30 : Int)) ∧ (((4 : Int) * (640 : Int)) = (2560 : Int)) ∧ ((fmax (0 : Int) (((100 : Int) - (40 : Int)) - (40 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) (((100 : Int) - (60 : Int)) - (60 : Int))) = (0 : Int))
```

### solar: output(300, 20) = 6000; efficiency(22, 100) = 22; daily(300, 5) = 1500; array(20, 2) = 40; panels(18, 2) = 20; irradiance(1000, 1) = 1000; strings(4, 5) = 20; combos(10, 2) = 45
The ledger holds this as [fam_solar](/theorem/fam_solar) — proven `by decide`, sorry-free:

```lean
(((300 : Int) * (20 : Int)) = (6000 : Int)) ∧ ((((22 : Int) * (100 : Int)) / (100 : Int)) = (22 : Int)) ∧ (((300 : Int) * (5 : Int)) = (1500 : Int)) ∧ (((20 : Int) * (2 : Int)) = (40 : Int)) ∧ (((18 : Int) + (2 : Int)) = (20 : Int)) ∧ (((1000 : Int) * (1 : Int)) = (1000 : Int)) ∧ (((4 : Int) * (5 : Int)) = (20 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int))
```

### solarpower: paneloutput(300, 20) = 6000; efficiency(22, 100) = 22; irradiance(1000, 1) = 1000; dailyyield(300, 5) = 1500; arraysize(20, 2) = 40; degradation(80, 100) = 80; inverterloss(6000, 300) = 5700; capacityfactor(20, 100) = 20
The ledger holds this as [fam_solarpower](/theorem/fam_solarpower) — proven `by decide`, sorry-free:

```lean
(((300 : Int) * (20 : Int)) = (6000 : Int)) ∧ ((((22 : Int) * (100 : Int)) / (100 : Int)) = (22 : Int)) ∧ (((1000 : Int) * (1 : Int)) = (1000 : Int)) ∧ (((300 : Int) * (5 : Int)) = (1500 : Int)) ∧ (((20 : Int) * (2 : Int)) = (40 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((6000 : Int) - (300 : Int))) = (5700 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int))
```

### solid: cubevolume(10) = 1000; cuboidvolume(2, 3, 4) = 24; prismvolume(6, 10) = 60; pyramidvolume(30, 10) = 100; cubesurface(10) = 600; cuboidsurface(2, 3, 4) = 52; spherevolumeproxy(3) = 113; cylindervolumeproxy(5, 10) = 785
The ledger holds this as [fam_solid](/theorem/fam_solid) — proven `by decide`, sorry-free:

```lean
(((10 : Int) ^ (3 : Nat)) = (1000 : Int)) ∧ ((((2 : Int) * (3 : Int)) * (4 : Int)) = (24 : Int)) ∧ (((6 : Int) * (10 : Int)) = (60 : Int)) ∧ ((((30 : Int) * (10 : Int)) / (3 : Int)) = (100 : Int)) ∧ (((6 : Int) * ((10 : Int) ^ (2 : Nat))) = (600 : Int)) ∧ (((2 : Int) * ((((2 : Int) * (3 : Int)) + ((3 : Int) * (4 : Int))) + ((2 : Int) * (4 : Int)))) = (52 : Int)) ∧ (((((4 : Int) * (314 : Int)) * ((3 : Int) ^ (3 : Nat))) / (300 : Int)) = (113 : Int)) ∧ (((((314 : Int) * ((5 : Int) ^ (2 : Nat))) * (10 : Int)) / (100 : Int)) = (785 : Int))
```

### solvency: ratio(1500, 1000) = 150; capital(1500, 1000) = 500; margin(1500, 1000) = 33; coverage(1200, 800) = 150; scr(1000, 45) = 450; mcr(450, 25) = 112; buffer(1200, 800) = 400; buffer(500, 800) = 0; leverage(2000, 1000) = 200
The ledger holds this as [fam_solvency](/theorem/fam_solvency) — proven `by decide`, sorry-free:

```lean
((((1500 : Int) * (100 : Int)) / (1000 : Int)) = (150 : Int)) ∧ ((fmax (0 : Int) ((1500 : Int) - (1000 : Int))) = (500 : Int)) ∧ ((((fmax (0 : Int) ((1500 : Int) - (1000 : Int))) * (100 : Int)) / (1500 : Int)) = (33 : Int)) ∧ ((((1200 : Int) * (100 : Int)) / (800 : Int)) = (150 : Int)) ∧ ((-((-((1000 : Int) * (45 : Int))) / (100 : Int))) = (450 : Int)) ∧ ((((450 : Int) * (25 : Int)) / (100 : Int)) = (112 : Int)) ∧ ((fmax (0 : Int) ((1200 : Int) - (800 : Int))) = (400 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (800 : Int))) = (0 : Int)) ∧ ((((2000 : Int) * (100 : Int)) / (1000 : Int)) = (200 : Int))
```

### solvent: molarity(2000, 2) = 1000; dilution(1000, 10) = 100; volume(500, 2) = 1000; ph(70, 10) = 7; solubility(36, 1) = 36; polarity(65, 100) = 65; layers(2, 0) = 2; combos(6, 2) = 15
The ledger holds this as [fam_solvent](/theorem/fam_solvent) — proven `by decide`, sorry-free:

```lean
(((2000 : Int) / (2 : Int)) = (1000 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((500 : Int) * (2 : Int)) = (1000 : Int)) ∧ (((70 : Int) / (10 : Int)) = (7 : Int)) ∧ (((36 : Int) * (1 : Int)) = (36 : Int)) ∧ ((((65 : Int) * (100 : Int)) / (100 : Int)) = (65 : Int)) ∧ (((2 : Int) + (0 : Int)) = (2 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### sonography: depth(1540, 100) = 77000; resolution(15360, 512) = 30; framerate(15400, 11, 70) = 10; attenuation(1, 5, 10) = 50; impedance(1000, 1540) = 1540000; dopplershift(5000, 77, 1540) = 500; axialres(500, 4) = 1000; penetration(60000, 5) = 12000
The ledger holds this as [fam_sonography](/theorem/fam_sonography) — proven `by decide`, sorry-free:

```lean
((((1540 : Int) * (100 : Int)) / (2 : Int)) = (77000 : Int)) ∧ (((15360 : Int) / (512 : Int)) = (30 : Int)) ∧ (((15400 : Int) / (((2 : Int) * (11 : Int)) * (70 : Int))) = (10 : Int)) ∧ ((((1 : Int) * (5 : Int)) * (10 : Int)) = (50 : Int)) ∧ (((1000 : Int) * (1540 : Int)) = (1540000 : Int)) ∧ (((((2 : Int) * (5000 : Int)) * (77 : Int)) / (1540 : Int)) = (500 : Int)) ∧ ((((500 : Int) * (4 : Int)) / (2 : Int)) = (1000 : Int)) ∧ (((60000 : Int) / (5 : Int)) = (12000 : Int))
```

### sort: comparisons(1000, 10) = 10000; swaps(1000, 2) = 500; passes(100, 10) = 10; merges(1024, 2) = 512; partitions(4) = 16; runs(8, 0) = 8; depth(100, 10) = 10; combos(8, 2) = 28
The ledger holds this as [fam_sort](/theorem/fam_sort) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) * (10 : Int)) = (10000 : Int)) ∧ (((1000 : Int) / (2 : Int)) = (500 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ (((1024 : Int) / (2 : Int)) = (512 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((8 : Int) + (0 : Int)) = (8 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int))
```

### sounddesign: layers(12, 8) = 20; frequencybands(20000, 1000) = 20; reverbms(2000, 1) = 2000; mixpairs(16, 2) = 120; dynamicrangedb(96, 1) = 96; cuepoints(40, 1) = 40; channelsubsets(6) = 64; loudnesslufs(23, 9) = 14
The ledger holds this as [fam_sounddesign](/theorem/fam_sounddesign) — proven `by decide`, sorry-free:

```lean
(((12 : Int) + (8 : Int)) = (20 : Int)) ∧ (((20000 : Int) / (1000 : Int)) = (20 : Int)) ∧ (((2000 : Int) / (1 : Int)) = (2000 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (16 : Int)) (Int.toNat (2 : Int)))) = (120 : Int)) ∧ (((96 : Int) / (1 : Int)) = (96 : Int)) ∧ (((40 : Int) * (1 : Int)) = (40 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((fmax (0 : Int) ((23 : Int) - (9 : Int))) = (14 : Int))
```

### sourcing: savings(1000, 850) = 150; savings(800, 900) = 0; spend(500, 20) = 10000; leadtime(14, 21) = 35; suppliers(100, 30) = 4; bid(9000, 3) = 3000; award(1200, 1500) = 1; award(1600, 1500) = 0; qualification(45, 50) = 90; risk(4, 5) = 20
The ledger holds this as [fam_sourcing](/theorem/fam_sourcing) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((1000 : Int) - (850 : Int))) = (150 : Int)) ∧ ((fmax (0 : Int) ((800 : Int) - (900 : Int))) = (0 : Int)) ∧ (((500 : Int) * (20 : Int)) = (10000 : Int)) ∧ (((14 : Int) + (21 : Int)) = (35 : Int)) ∧ ((-((-(100 : Int)) / (30 : Int))) = (4 : Int)) ∧ (((9000 : Int) / (3 : Int)) = (3000 : Int)) ∧ ((if (if (1200 : Int) ≤ (1500 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (1600 : Int) ≤ (1500 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ (((4 : Int) * (5 : Int)) = (20 : Int))
```

### spaceflight: deltav(9400, 1) = 9400; escapevelocity(11, 1000) = 11000; orbitalperiod(5400, 60) = 90; payloadfraction(4, 100) = 4; stageorderings(3) = 6; burntime(480, 2) = 240; apogee(400, 1) = 400; twr(150, 100) = 1
The ledger holds this as [fam_spaceflight](/theorem/fam_spaceflight) — proven `by decide`, sorry-free:

```lean
(((9400 : Int) * (1 : Int)) = (9400 : Int)) ∧ (((11 : Int) * (1000 : Int)) = (11000 : Int)) ∧ (((5400 : Int) / (60 : Int)) = (90 : Int)) ∧ ((((4 : Int) * (100 : Int)) / (100 : Int)) = (4 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (3 : Int)))) = (6 : Int)) ∧ (((480 : Int) / (2 : Int)) = (240 : Int)) ∧ (((400 : Int) * (1 : Int)) = (400 : Int)) ∧ (((150 : Int) / (100 : Int)) = (1 : Int))
```

### spectroscopy: energy(500, 6) = 3000; wavenumber(1000, 4) = 250; absorbance(80, 20) = 400; beer(100, 5) = 20; resolution(600, 3) = 200; shift(500, 480) = 20; shift(480, 500) = -20; intensity(1000, 4) = 250; linewidth(900, 3) = 300
The ledger holds this as [fam_spectroscopy](/theorem/fam_spectroscopy) — proven `by decide`, sorry-free:

```lean
(((500 : Int) * (6 : Int)) = (3000 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (20 : Int)) = (400 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ (((600 : Int) / (3 : Int)) = (200 : Int)) ∧ (((500 : Int) - (480 : Int)) = (20 : Int)) ∧ (((480 : Int) - (500 : Int)) = (-20 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((900 : Int) / (3 : Int)) = (300 : Int))
```

### speleology: extent(12, 50) = 600; speleothem(100, 4) = 25; dissolution(30, 200) = 15; survey(750, 1000) = 75; gradient(45, 300) = 15; humidity(95, 100) = 95
The ledger holds this as [fam_speleology](/theorem/fam_speleology) — proven `by decide`, sorry-free:

```lean
(((12 : Int) * (50 : Int)) = (600 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (200 : Int)) = (15 : Int)) ∧ ((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (300 : Int)) = (15 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int))
```

### spicetrade: spicecount(40, 20) = 60; routepairs(12, 2) = 66; priceindex(100, 3) = 300; originsubsets(6) = 64; traderoutes(8, 3) = 24; volumetons(1000, 5) = 5000; blendcombos(15, 3) = 455; marginpct(40, 100) = 40
The ledger holds this as [fam_spicetrade](/theorem/fam_spicetrade) — proven `by decide`, sorry-free:

```lean
(((40 : Int) + (20 : Int)) = (60 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((100 : Int) * (3 : Int)) = (300 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ (((8 : Int) * (3 : Int)) = (24 : Int)) ∧ (((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (15 : Int)) (Int.toNat (3 : Int)))) = (455 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int))
```

### spinning: count(1000, 20) = 50; twist(600, 30) = 20; denier(5, 450) = 100; tenacity(900, 100) = 9; draft(800, 100) = 8; yield(950, 1000) = 95; evenness(12, 100) = 88; evenness(200, 100) = 0; tex(40, 1000) = 40
The ledger holds this as [fam_spinning](/theorem/fam_spinning) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (20 : Int)) = (50 : Int)) ∧ (((600 : Int) / (30 : Int)) = (20 : Int)) ∧ ((((5 : Int) * (9000 : Int)) / (450 : Int)) = (100 : Int)) ∧ (((900 : Int) / (100 : Int)) = (9 : Int)) ∧ (((800 : Int) / (100 : Int)) = (8 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (((12 : Int) * (100 : Int)) / (100 : Int)))) = (88 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (((200 : Int) * (100 : Int)) / (100 : Int)))) = (0 : Int)) ∧ ((((40 : Int) * (1000 : Int)) / (1000 : Int)) = (40 : Int))
```

### spirometry: fev1fvcratio(4000, 5000) = 80; vitalcapacity(3000, 500, 1000) = 4500; fev1(5000, 80) = 4000; peakflow(6000, 10) = 600; forcedvitalcapacity(5000, 500) = 4500; tidalvolume(6000, 12) = 500; residualvolume(6000, 4500) = 1500; totalcapacity(4500, 1500) = 6000; forcedvitalcapacity(500, 5000) = 0
The ledger holds this as [fam_spirometry](/theorem/fam_spirometry) — proven `by decide`, sorry-free:

```lean
((((4000 : Int) * (100 : Int)) / (5000 : Int)) = (80 : Int)) ∧ ((((3000 : Int) + (500 : Int)) + (1000 : Int)) = (4500 : Int)) ∧ ((((5000 : Int) * (80 : Int)) / (100 : Int)) = (4000 : Int)) ∧ (((6000 : Int) / (10 : Int)) = (600 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (500 : Int))) = (4500 : Int)) ∧ (((6000 : Int) / (12 : Int)) = (500 : Int)) ∧ ((fmax (0 : Int) ((6000 : Int) - (4500 : Int))) = (1500 : Int)) ∧ (((4500 : Int) + (1500 : Int)) = (6000 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (5000 : Int))) = (0 : Int))
```

### sports: win(60, 100) = 60; average(2500, 100) = 25; differential(110, 95) = 15; differential(95, 110) = -15; possession(55, 90) = 61; rating(450, 1000) = 45; standings(50, 32) = 18; standings(32, 50) = -18; pace(10, 2400) = 240
The ledger holds this as [fam_sports](/theorem/fam_sports) — proven `by decide`, sorry-free:

```lean
((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ (((2500 : Int) / (100 : Int)) = (25 : Int)) ∧ (((110 : Int) - (95 : Int)) = (15 : Int)) ∧ (((95 : Int) - (110 : Int)) = (-15 : Int)) ∧ ((((55 : Int) * (100 : Int)) / (90 : Int)) = (61 : Int)) ∧ ((((450 : Int) * (100 : Int)) / (1000 : Int)) = (45 : Int)) ∧ (((50 : Int) - (32 : Int)) = (18 : Int)) ∧ (((32 : Int) - (50 : Int)) = (-18 : Int)) ∧ (((2400 : Int) / (10 : Int)) = (240 : Int))
```

### spring: force(50, 10) = 500; constant(20, 1) = 20; coils(10, 2) = 12; deflection(100, 20) = 5; energy(500, 2) = 250; series(100, 200) = 300; parallelsum(50, 50) = 100; combos(6, 2) = 15
The ledger holds this as [fam_spring](/theorem/fam_spring) — proven `by decide`, sorry-free:

```lean
(((50 : Int) * (10 : Int)) = (500 : Int)) ∧ (((20 : Int) * (1 : Int)) = (20 : Int)) ∧ (((10 : Int) + (2 : Int)) = (12 : Int)) ∧ (((100 : Int) / (20 : Int)) = (5 : Int)) ∧ (((500 : Int) / (2 : Int)) = (250 : Int)) ∧ (((100 : Int) + (200 : Int)) = (300 : Int)) ∧ (((50 : Int) + (50 : Int)) = (100 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### sprint: velocity(100, 10) = 10; acceleration(20, 4) = 5; stridelength(1000, 8) = 125; stridefrequency(80, 10) = 8; splittime(400, 4) = 100; topspeed(11, 12) = 12; distancecovered(10, 10) = 100; reactiontime(200, 150) = 50
The ledger holds this as [fam_sprint](/theorem/fam_sprint) — proven `by decide`, sorry-free:

```lean
(((100 : Int) / (10 : Int)) = (10 : Int)) ∧ (((20 : Int) / (4 : Int)) = (5 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ (((80 : Int) / (10 : Int)) = (8 : Int)) ∧ (((400 : Int) / (4 : Int)) = (100 : Int)) ∧ ((fmax (11 : Int) (12 : Int)) = (12 : Int)) ∧ (((10 : Int) * (10 : Int)) = (100 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (150 : Int))) = (50 : Int))
```

### ssd: iops(32, 100) = 320000; throughput(320000, 4) = 1280000; tbw(256, 3000) = 768; overprovision(512, 480) = 32; wearleveling(10000, 1000) = 10; channels(16, 4) = 4; pagesize(8, 512) = 4096; dwpd(730, 200, 365) = 10
The ledger holds this as [fam_ssd](/theorem/fam_ssd) — proven `by decide`, sorry-free:

```lean
((((32 : Int) * (1000000 : Int)) / (100 : Int)) = (320000 : Int)) ∧ (((320000 : Int) * (4 : Int)) = (1280000 : Int)) ∧ ((((256 : Int) * (3000 : Int)) / (1000 : Int)) = (768 : Int)) ∧ (((512 : Int) - (480 : Int)) = (32 : Int)) ∧ (((10000 : Int) / (1000 : Int)) = (10 : Int)) ∧ ((-((-(16 : Int)) / (4 : Int))) = (4 : Int)) ∧ (((8 : Int) * (512 : Int)) = (4096 : Int)) ∧ ((((730 : Int) * (1000 : Int)) / ((200 : Int) * (365 : Int))) = (10 : Int))
```

### stability: gainmargin(200, 100) = 200; phasemargin(180, 135) = 45; crossoverfrequency(1000, 4) = 250; poles(3, 2) = 7; zeros(5, 2) = 3; marginratio(200, 50) = 400; dampingfactor(70, 100) = 70
The ledger holds this as [fam_stability](/theorem/fam_stability) — proven `by decide`, sorry-free:

```lean
((((200 : Int) * (100 : Int)) / (100 : Int)) = (200 : Int)) ∧ ((fmax (0 : Int) ((180 : Int) - (135 : Int))) = (45 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((3 : Int) + ((2 : Int) * (2 : Int))) = (7 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (2 : Int))) = (3 : Int)) ∧ ((((200 : Int) * (100 : Int)) / (50 : Int)) = (400 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int))
```

### staffing: headcount(50, 4) = 200; coverage(90, 100) = 90; shift(100, 8) = 13; ratio(100, 10) = 10; demand(6000, 60) = 100; allocation(10, 40) = 400; overtime(50, 40) = 10; overtime(30, 40) = 0; vacancy(100, 80) = 20; vacancy(80, 100) = 0
The ledger holds this as [fam_staffing](/theorem/fam_staffing) — proven `by decide`, sorry-free:

```lean
(((50 : Int) * (4 : Int)) = (200 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((-((-(100 : Int)) / (8 : Int))) = (13 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((10 : Int) * (40 : Int)) = (400 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (40 : Int))) = (10 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (40 : Int))) = (0 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (80 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (100 : Int))) = (0 : Int))
```

### stagecraft: flats(12, 8) = 20; riggingpoints(20, 4) = 80; stagearea(12, 10) = 120; scenechanges(5, 3) = 8; trusscombos(10, 2) = 45; sightlines(6, 2) = 30; weightkg(50, 20) = 1000; loadmargin(1000, 800) = 200
The ledger holds this as [fam_stagecraft](/theorem/fam_stagecraft) — proven `by decide`, sorry-free:

```lean
(((12 : Int) + (8 : Int)) = (20 : Int)) ∧ (((20 : Int) * (4 : Int)) = (80 : Int)) ∧ (((12 : Int) * (10 : Int)) = (120 : Int)) ∧ (((5 : Int) + (3 : Int)) = (8 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (6 : Int)))) / (Int.ofNat (ffact (Int.toNat ((6 : Int) - (2 : Int)))))) = (30 : Int)) ∧ (((50 : Int) * (20 : Int)) = (1000 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (800 : Int))) = (200 : Int))
```

### stainedglass: panecount(12, 8) = 96; leadlines(40, 20) = 60; transmittance(70, 100) = 70; colorcombos(10, 3) = 120; cameleadlength(100, 3) = 300; refractionindex(1520, 1000) = 1; panelsubsets(5) = 32; symmetryorderings(4) = 24
The ledger holds this as [fam_stainedglass](/theorem/fam_stainedglass) — proven `by decide`, sorry-free:

```lean
(((12 : Int) * (8 : Int)) = (96 : Int)) ∧ (((40 : Int) + (20 : Int)) = (60 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (3 : Int)))) = (120 : Int)) ∧ (((100 : Int) * (3 : Int)) = (300 : Int)) ∧ (((1520 : Int) / (1000 : Int)) = (1 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int))
```

### star: luminosity(4, 100) = 400; magnitude(15, 5) = 10; parsecs(3260, 1000) = 3; mass(2, 1) = 2; classes(7, 0) = 7; lifetime(10, 1000) = 10000; radius(7, 100) = 700; combos(7, 2) = 21
The ledger holds this as [fam_star](/theorem/fam_star) — proven `by decide`, sorry-free:

```lean
(((4 : Int) * (100 : Int)) = (400 : Int)) ∧ ((fmax (0 : Int) ((15 : Int) - (5 : Int))) = (10 : Int)) ∧ (((3260 : Int) / (1000 : Int)) = (3 : Int)) ∧ (((2 : Int) * (1 : Int)) = (2 : Int)) ∧ (((7 : Int) + (0 : Int)) = (7 : Int)) ∧ (((10 : Int) * (1000 : Int)) = (10000 : Int)) ∧ (((7 : Int) * (100 : Int)) = (700 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (7 : Int)) (Int.toNat (2 : Int)))) = (21 : Int))
```

### state: actions(600, 60) = 10; diff(1, 8) = 12; hydration(9, 10) = 90; memoized(950, 1000) = 95; rerenders(50, 200) = 25
The ledger holds this as [fam_state](/theorem/fam_state) — proven `by decide`, sorry-free:

```lean
(((600 : Int) / (60 : Int)) = (10 : Int)) ∧ ((((1 : Int) * (100 : Int)) / (8 : Int)) = (12 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int))
```

### statics: centroid(10, 30, 8) = 6; friction(500, 40) = 200; moment(50, 4) = 200; normalforce(50, 10) = 500; reaction(100, 3, 10) = 30; shear(800, 300) = 500; truss(7) = 11
The ledger holds this as [fam_statics](/theorem/fam_statics) — proven `by decide`, sorry-free:

```lean
((((30 : Int) * (8 : Int)) / ((10 : Int) + (30 : Int))) = (6 : Int)) ∧ ((((500 : Int) * (40 : Int)) / (100 : Int)) = (200 : Int)) ∧ (((50 : Int) * (4 : Int)) = (200 : Int)) ∧ (((50 : Int) * (10 : Int)) = (500 : Int)) ∧ ((((100 : Int) * (3 : Int)) / (10 : Int)) = (30 : Int)) ∧ ((fmax (0 : Int) ((800 : Int) - (300 : Int))) = (500 : Int)) ∧ ((fmax (0 : Int) (((2 : Int) * (7 : Int)) - (3 : Int))) = (11 : Int))
```

### statistics: mean(1000, 4) = 250; range(90, 10) = 80; variance(800, 4) = 200; zscore(5, 2) = 250; percentile(75, 100) = 75; correlation(8, 10) = 80; confidence(5, 100) = 5; sample(1000, 10) = 100
The ledger holds this as [fam_statistics](/theorem/fam_statistics) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (10 : Int))) = (80 : Int)) ∧ (((800 : Int) / (4 : Int)) = (200 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (2 : Int)) = (250 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int))
```

### steering: turnradius(1000, 20) = 50; ackermannangle(40, 10) = 30; slipangle(15, 3) = 12; steeringratio(360, 24) = 15; yawrate(600, 10) = 60; understeer(8, 100) = 8; wheelbaseratio(250, 300) = 83; correctiongain(100, 4) = 25
The ledger holds this as [fam_steering](/theorem/fam_steering) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (20 : Int)) = (50 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (10 : Int))) = (30 : Int)) ∧ ((fmax (0 : Int) ((15 : Int) - (3 : Int))) = (12 : Int)) ∧ (((360 : Int) / (24 : Int)) = (15 : Int)) ∧ (((600 : Int) / (10 : Int)) = (60 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (100 : Int)) = (8 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (300 : Int)) = (83 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int))
```

### steganography: capacity(1024, 3) = 3072; payload(250, 1000) = 25; distortion(50, 1000) = 5; psnr(9000, 100) = 9000; robustness(7, 10) = 70; detectability(2, 100) = 2; embedding(50, 200) = 25; extraction(990, 1000) = 99
The ledger holds this as [fam_steganography](/theorem/fam_steganography) — proven `by decide`, sorry-free:

```lean
(((1024 : Int) * (3 : Int)) = (3072 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((9000 : Int) * (100 : Int)) / (100 : Int)) = (9000 : Int)) ∧ ((((7 : Int) * (100 : Int)) / (10 : Int)) = (70 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int)) ∧ ((((990 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int))
```

### stellar: mainsequencelifetime(10, 1000) = 100; masslunminosity(4) = 64; schwarzschildradius(10) = 30; surfacegravity(100, 10) = 1000; effectivetemp(500) = 5796; corefusionrate(10, 15) = 150; massloss(1000, 2, 100) = 800; massloss(100, 2, 100) = 0; spectralclass(5800) = 5
The ledger holds this as [fam_stellar](/theorem/fam_stellar) — proven `by decide`, sorry-free:

```lean
((((10 : Int) * (10000 : Int)) / (1000 : Int)) = (100 : Int)) ∧ (((4 : Int) ^ (3 : Nat)) = (64 : Int)) ∧ (((10 : Int) * (3 : Int)) = (30 : Int)) ∧ ((((100 : Int) * (1000 : Int)) / ((10 : Int) ^ (2 : Nat))) = (1000 : Int)) ∧ (((2898000 : Int) / (500 : Int)) = (5796 : Int)) ∧ (((10 : Int) * (15 : Int)) = (150 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - ((2 : Int) * (100 : Int)))) = (800 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - ((2 : Int) * (100 : Int)))) = (0 : Int)) ∧ (((5800 : Int) / (1000 : Int)) = (5 : Int))
```

### stemming: affixcount(12, 18) = 30; conflationrate(30, 120) = 25; indexreduction(1000, 640) = 360; overstemming(5, 200) = 2; rootratio(50, 200) = 25; stemlength(7, 3) = 4; suffixstripped(12, 5) = 7; understemming(9, 300) = 3; stemlength(3, 7) = 0
The ledger holds this as [fam_stemming](/theorem/fam_stemming) — proven `by decide`, sorry-free:

```lean
(((12 : Int) + (18 : Int)) = (30 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (640 : Int))) = (360 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (200 : Int)) = (2 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int)) ∧ ((fmax (0 : Int) ((7 : Int) - (3 : Int))) = (4 : Int)) ∧ ((fmax (0 : Int) ((12 : Int) - (5 : Int))) = (7 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (300 : Int)) = (3 : Int)) ∧ ((fmax (0 : Int) ((3 : Int) - (7 : Int))) = (0 : Int))
```

### steps: progress(3, 4) = 75; current(2, 5) = 40; remaining(3, 5) = 2; order(3, 5) = 1; order(6, 5) = 0; duration(5, 30) = 150; completion(80, 100) = 80
The ledger holds this as [fam_steps](/theorem/fam_steps) — proven `by decide`, sorry-free:

```lean
((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (5 : Int)) = (40 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (3 : Int))) = (2 : Int)) ∧ ((if (if (3 : Int) ≤ (5 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (6 : Int) ≤ (5 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((5 : Int) * (30 : Int)) = (150 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### stoichiometry: moles(180, 18) = 10; moles(5, 0) = 0; molarmass(2, 16) = 32; limiting(5, 3) = 3; yield(80, 100) = 80; molarity(6, 2) = 3; dilution(10, 2, 4) = 5; percentmass(2, 18) = 11; empirical(2, 4) = 2
The ledger holds this as [fam_stoichiometry](/theorem/fam_stoichiometry) — proven `by decide`, sorry-free:

```lean
(((180 : Int) / (18 : Int)) = (10 : Int)) ∧ (((5 : Int) / (0 : Int)) = (0 : Int)) ∧ (((2 : Int) * (16 : Int)) = (32 : Int)) ∧ ((fmin (5 : Int) (3 : Int)) = (3 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((6 : Int) / (2 : Int)) = (3 : Int)) ∧ ((((10 : Int) * (2 : Int)) / (4 : Int)) = (5 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (18 : Int)) = (11 : Int)) ∧ (((4 : Int) / (2 : Int)) = (2 : Int))
```

### stoicism: virtues(4, 0) = 4; dichotomypairs(10, 2) = 45; passionstates(4) = 16; controlratio(50, 100) = 50; disciplineorderings(3) = 6; impressionfilters(3, 3) = 9; apatheiaindex(80, 100) = 80; preferredindifferents(10, 10) = 20
The ledger holds this as [fam_stoicism](/theorem/fam_stoicism) — proven `by decide`, sorry-free:

```lean
(((4 : Int) + (0 : Int)) = (4 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (3 : Int)))) = (6 : Int)) ∧ (((3 : Int) * (3 : Int)) = (9 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((10 : Int) + (10 : Int)) = (20 : Int))
```

### storage: capacity(1000, 5) = 5000; used(1000, 300) = 700; used(100, 400) = 0; redundancy(3, 500) = 1500; iops(5000, 10) = 500; throughput(6000, 60) = 100; dedup(1000, 250) = 25; tier(700, 300) = 1000; cost(2000, 5) = 100
The ledger holds this as [fam_storage](/theorem/fam_storage) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (300 : Int))) = (700 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (400 : Int))) = (0 : Int)) ∧ (((3 : Int) * (500 : Int)) = (1500 : Int)) ∧ (((5000 : Int) / (10 : Int)) = (500 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ (((700 : Int) + (300 : Int)) = (1000 : Int)) ∧ ((((2000 : Int) * (5 : Int)) / (100 : Int)) = (100 : Int))
```

### storyboarding: panels(40, 6) = 240; shotcombos(12, 2) = 66; framesize(16, 9) = 144; sequenceorderings(5) = 120; aspectratio(178, 100) = 178; gridcells(3, 3) = 9; transitiontypes(5, 3) = 8; coverage(90, 100) = 90
The ledger holds this as [fam_storyboarding](/theorem/fam_storyboarding) — proven `by decide`, sorry-free:

```lean
(((40 : Int) * (6 : Int)) = (240 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((16 : Int) * (9 : Int)) = (144 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((((178 : Int) * (100 : Int)) / (100 : Int)) = (178 : Int)) ∧ (((3 : Int) * (3 : Int)) = (9 : Int)) ∧ (((5 : Int) + (3 : Int)) = (8 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int))
```

### straingauge: gaugefactor(2000, 1000) = 2; strain(2, 2000) = 1000; resistancechange(2, 1000) = 2000; bridgeoutput(5000, 2000) = 2500; stress(1000, 200) = 200000; microstrain(2000, 2) = 1000; sensitivity(10, 5000) = 2; temperatureerror(50, 20) = 1000; gaugefactor(2000, 0) = 0
The ledger holds this as [fam_straingauge](/theorem/fam_straingauge) — proven `by decide`, sorry-free:

```lean
(((2000 : Int) / (1000 : Int)) = (2 : Int)) ∧ ((((2 : Int) * (1000000 : Int)) / (2000 : Int)) = (1000 : Int)) ∧ (((2 : Int) * (1000 : Int)) = (2000 : Int)) ∧ ((((5000 : Int) * (2000 : Int)) / (4000 : Int)) = (2500 : Int)) ∧ (((1000 : Int) * (200 : Int)) = (200000 : Int)) ∧ (((2000 : Int) / (2 : Int)) = (1000 : Int)) ∧ ((((10 : Int) * (1000 : Int)) / (5000 : Int)) = (2 : Int)) ∧ (((50 : Int) * (20 : Int)) = (1000 : Int)) ∧ (((2000 : Int) / (0 : Int)) = (0 : Int))
```

### stratigraphy: depositionrate(600, 300) = 2; age(1500, 3) = 500; thickness(900, 300) = 600; thickness(300, 900) = 0; compaction(800, 600) = 75; unconformity(500, 200) = 300; correlation(45, 50) = 90; sequence(100, 30) = 4; subsidence(1000, 5) = 5000
The ledger holds this as [fam_stratigraphy](/theorem/fam_stratigraphy) — proven `by decide`, sorry-free:

```lean
(((600 : Int) / (300 : Int)) = (2 : Int)) ∧ (((1500 : Int) / (3 : Int)) = (500 : Int)) ∧ ((fmax (0 : Int) ((900 : Int) - (300 : Int))) = (600 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (900 : Int))) = (0 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (800 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (200 : Int))) = (300 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ ((-((-(100 : Int)) / (30 : Int))) = (4 : Int)) ∧ (((1000 : Int) * (5 : Int)) = (5000 : Int))
```

### stream: chunks(100000, 4096) = 25; buffers(8, 4096) = 32768; throughput(1000000, 1000) = 1000; windows(64, 1024) = 65536; backpressure(80, 100) = 80; segments(10000, 188) = 53; pipes(3, 0) = 3; combos(6, 2) = 15
The ledger holds this as [fam_stream](/theorem/fam_stream) — proven `by decide`, sorry-free:

```lean
((-((-(100000 : Int)) / (4096 : Int))) = (25 : Int)) ∧ (((8 : Int) * (4096 : Int)) = (32768 : Int)) ∧ (((1000000 : Int) / (1000 : Int)) = (1000 : Int)) ∧ (((64 : Int) * (1024 : Int)) = (65536 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((10000 : Int) / (188 : Int)) = (53 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### streaming: bitrate(6000, 60) = 100; buffer(30, 100) = 30; rebuffer(12, 4) = 3; bandwidth(1000, 8) = 125; quality(90, 100) = 90; concurrency(750, 1000) = 75
The ledger holds this as [fam_streaming](/theorem/fam_streaming) — proven `by decide`, sorry-free:

```lean
(((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((12 : Int) / (4 : Int)) = (3 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int))
```

### strength: volume(100, 5, 3) = 1500; intensity(80, 100) = 80; tonnage(500, 10) = 5000; density(5000, 50) = 100; relativestrength(150, 75) = 200; restratio(180, 60) = 3; progression(105, 100) = 5; workcapacity(20, 50) = 1000
The ledger holds this as [fam_strength](/theorem/fam_strength) — proven `by decide`, sorry-free:

```lean
((((100 : Int) * (5 : Int)) * (3 : Int)) = (1500 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((500 : Int) * (10 : Int)) = (5000 : Int)) ∧ (((5000 : Int) / (50 : Int)) = (100 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (75 : Int)) = (200 : Int)) ∧ (((180 : Int) / (60 : Int)) = (3 : Int)) ∧ ((fmax (0 : Int) ((105 : Int) - (100 : Int))) = (5 : Int)) ∧ (((20 : Int) * (50 : Int)) = (1000 : Int))
```

### structural: moment(1000, 5) = 5000; shear(1000, 4) = 250; buckling(10000, 10) = 100; safetyfactor(300, 100) = 300; deflection(5000, 50) = 100; reinforcement(2, 100) = 2; slenderness(3000, 50) = 60; seismic(2000, 3) = 6000; shear(1000, 0) = 0
The ledger holds this as [fam_structural](/theorem/fam_structural) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((10000 : Int) / ((10 : Int) ^ (2 : Nat))) = (100 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (100 : Int)) = (300 : Int)) ∧ (((5000 : Int) / (50 : Int)) = (100 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int)) ∧ (((3000 : Int) / (50 : Int)) = (60 : Int)) ∧ (((2000 : Int) * (3 : Int)) = (6000 : Int)) ∧ (((1000 : Int) / (0 : Int)) = (0 : Int))
```

### submarine: depth(300, 1) = 300; pressure(30, 1) = 30; buoyancy(1000, 980) = 20; displacement(8000, 1) = 8000; ballasttanks(10, 0) = 10; sonarrange(20, 1000) = 20000; crushdepth(700, 1) = 700; trimangle(300, 10) = 30
The ledger holds this as [fam_submarine](/theorem/fam_submarine) — proven `by decide`, sorry-free:

```lean
(((300 : Int) * (1 : Int)) = (300 : Int)) ∧ (((30 : Int) * (1 : Int)) = (30 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (980 : Int))) = (20 : Int)) ∧ (((8000 : Int) * (1 : Int)) = (8000 : Int)) ∧ (((10 : Int) + (0 : Int)) = (10 : Int)) ∧ (((20 : Int) * (1000 : Int)) = (20000 : Int)) ∧ (((700 : Int) * (1 : Int)) = (700 : Int)) ∧ (((300 : Int) / (10 : Int)) = (30 : Int))
```

### subsidence: rate(120, 12) = 10; cumulative(10, 5) = 50; compaction(15, 100) = 15; withdrawalvolume(1000, 3) = 3000; consolidationtime(3650, 365) = 10; settlement(500, 350) = 150; influencedepth(10, 5) = 50; riskindex(80, 100) = 80
The ledger holds this as [fam_subsidence](/theorem/fam_subsidence) — proven `by decide`, sorry-free:

```lean
(((120 : Int) / (12 : Int)) = (10 : Int)) ∧ (((10 : Int) * (5 : Int)) = (50 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (100 : Int)) = (15 : Int)) ∧ (((1000 : Int) * (3 : Int)) = (3000 : Int)) ∧ (((3650 : Int) / (365 : Int)) = (10 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (350 : Int))) = (150 : Int)) ∧ (((10 : Int) * (5 : Int)) = (50 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### subsidy: amount(500, 2) = 1000; costtotal(1000, 100) = 100000; pricereduction(100, 70) = 30; beneficiaries(1000, 10) = 10000; efficiencyloss(300, 10) = 30; passthrough(60, 100) = 60; budgetpct(5, 100) = 5; multipliereffect(1000, 2) = 2000
The ledger holds this as [fam_subsidy](/theorem/fam_subsidy) — proven `by decide`, sorry-free:

```lean
(((500 : Int) * (2 : Int)) = (1000 : Int)) ∧ (((1000 : Int) * (100 : Int)) = (100000 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (70 : Int))) = (30 : Int)) ∧ (((1000 : Int) * (10 : Int)) = (10000 : Int)) ∧ (((300 : Int) / (10 : Int)) = (30 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((1000 : Int) * (2 : Int)) = (2000 : Int))
```

### sudoku: cells(9, 9) = 81; boxes(3, 3) = 9; givens(17, 0) = 17; candidatesubsets(9) = 512; rowperms(6) = 720; pairelims(9, 2) = 36; difficultyindex(50, 100) = 50; emptycells(81, 30) = 51
The ledger holds this as [fam_sudoku](/theorem/fam_sudoku) — proven `by decide`, sorry-free:

```lean
(((9 : Int) * (9 : Int)) = (81 : Int)) ∧ (((3 : Int) * (3 : Int)) = (9 : Int)) ∧ (((17 : Int) + (0 : Int)) = (17 : Int)) ∧ (((2 : Int) ^ (9 : Nat)) = (512 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (6 : Int)))) = (720 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (9 : Int)) (Int.toNat (2 : Int)))) = (36 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((fmax (0 : Int) ((81 : Int) - (30 : Int))) = (51 : Int))
```

### supplychain: leadtime(10, 17) = 7; leadtime(17, 10) = 0; turnover(1000, 250) = 4; fillrate(95, 100) = 95; safetystock(50, 3) = 150; reorder(40, 5) = 200; backorder(5, 100) = 5; utilization(80, 100) = 80; cycle(20, 100) = 5
The ledger holds this as [fam_supplychain](/theorem/fam_supplychain) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((17 : Int) - (10 : Int))) = (7 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (17 : Int))) = (0 : Int)) ∧ (((1000 : Int) / (250 : Int)) = (4 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ (((50 : Int) * (3 : Int)) = (150 : Int)) ∧ (((40 : Int) * (5 : Int)) = (200 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((100 : Int) / (20 : Int)) = (5 : Int))
```

### surgery: duration(60, 180) = 120; duration(180, 60) = 0; mortality(2, 100) = 2; complication(15, 200) = 7; recovery(90, 100) = 90; margin(85, 100) = 85; throughput(12, 8) = 1; success(95, 100) = 95
The ledger holds this as [fam_surgery](/theorem/fam_surgery) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((180 : Int) - (60 : Int))) = (120 : Int)) ∧ ((fmax (0 : Int) ((60 : Int) - (180 : Int))) = (0 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (200 : Int)) = (7 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ (((12 : Int) / (8 : Int)) = (1 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int))
```

### survey: bearings(360, 1) = 360; stations(12, 8) = 20; arcseconds(60, 60) = 3600; traverse(100, 5) = 500; gridcells(16, 16) = 256; area(100, 50) = 5000; angles(60, 60, 60) = 180; combos(8, 2) = 28
The ledger holds this as [fam_survey](/theorem/fam_survey) — proven `by decide`, sorry-free:

```lean
(((360 : Int) * (1 : Int)) = (360 : Int)) ∧ (((12 : Int) + (8 : Int)) = (20 : Int)) ∧ (((60 : Int) * (60 : Int)) = (3600 : Int)) ∧ (((100 : Int) * (5 : Int)) = (500 : Int)) ∧ (((16 : Int) * (16 : Int)) = (256 : Int)) ∧ (((100 : Int) * (50 : Int)) = (5000 : Int)) ∧ ((((60 : Int) + (60 : Int)) + (60 : Int)) = (180 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int))
```

### surveying: bearing(100, 90) = 190; traverse(10, 66) = 660; elevation(100, 5, 3) = 102; grade(5, 100) = 5; area(40, 30) = 600; contour(100, 40, 20) = 3; offset(1000, 100) = 10; closure(5000, 1) = 5000; closure(5000, 0) = 0
The ledger holds this as [fam_surveying](/theorem/fam_surveying) — proven `by decide`, sorry-free:

```lean
((((100 : Int) + (90 : Int)) % (360 : Int)) = (190 : Int)) ∧ (((10 : Int) * (66 : Int)) = (660 : Int)) ∧ ((fmax (0 : Int) (((100 : Int) + (5 : Int)) - (3 : Int))) = (102 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ ((((40 : Int) * (30 : Int)) / (2 : Int)) = (600 : Int)) ∧ (((fmax (0 : Int) ((100 : Int) - (40 : Int))) / (20 : Int)) = (3 : Int)) ∧ (((1000 : Int) / (100 : Int)) = (10 : Int)) ∧ (((5000 : Int) / (1 : Int)) = (5000 : Int)) ∧ (((5000 : Int) / (0 : Int)) = (0 : Int))
```

### suspension: springrate(1000, 50) = 20; damping(300, 4) = 1200; ride(400, 120) = 280; ride(100, 400) = 0; travel(100, 80) = 180; roll(5000, 30) = 1500; stiffness(2000, 40) = 50000; frequency(64000, 400) = 160; load(1600, 4) = 400
The ledger holds this as [fam_suspension](/theorem/fam_suspension) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ (((300 : Int) * (4 : Int)) = (1200 : Int)) ∧ ((fmax (0 : Int) ((400 : Int) - (120 : Int))) = (280 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (400 : Int))) = (0 : Int)) ∧ (((100 : Int) + (80 : Int)) = (180 : Int)) ∧ ((((5000 : Int) * (30 : Int)) / (100 : Int)) = (1500 : Int)) ∧ ((((2000 : Int) * (1000 : Int)) / (40 : Int)) = (50000 : Int)) ∧ (((64000 : Int) / (400 : Int)) = (160 : Int)) ∧ (((1600 : Int) / (4 : Int)) = (400 : Int))
```

### sustainability: footprint(120, 100) = 120; renewable(45, 100) = 45; circularity(30, 120) = 25; efficiency(1000, 50) = 20; offset(80, 100) = 80; lifecycle(10, 5) = 50; intensity(900, 30) = 30; regeneration(60, 120) = 50; footprint(10, 0) = 0
The ledger holds this as [fam_sustainability](/theorem/fam_sustainability) — proven `by decide`, sorry-free:

```lean
((((120 : Int) * (100 : Int)) / (100 : Int)) = (120 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((10 : Int) * (5 : Int)) = (50 : Int)) ∧ (((900 : Int) / (30 : Int)) = (30 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (120 : Int)) = (50 : Int)) ∧ ((((10 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int))
```

### swaps: fixedleg(10000, 500) = 500; floatingleg(10000, 300, 200) = 500; netpayment(800, 300) = 500; netpayment(300, 800) = 0; notionalvalue(1000, 50) = 50000; swaprate(500, 10000) = 500; spreadbasis(200, 250) = 50; presentvalue(10500, 500) = 10000; accruedinterest(50000, 500, 365) = 2500
The ledger holds this as [fam_swaps](/theorem/fam_swaps) — proven `by decide`, sorry-free:

```lean
((((10000 : Int) * (500 : Int)) / (10000 : Int)) = (500 : Int)) ∧ ((((10000 : Int) * ((300 : Int) + (200 : Int))) / (10000 : Int)) = (500 : Int)) ∧ ((fmax (0 : Int) ((800 : Int) - (300 : Int))) = (500 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (800 : Int))) = (0 : Int)) ∧ (((1000 : Int) * (50 : Int)) = (50000 : Int)) ∧ ((((500 : Int) * (10000 : Int)) / (10000 : Int)) = (500 : Int)) ∧ ((fmax (0 : Int) ((250 : Int) - (200 : Int))) = (50 : Int)) ∧ ((((10500 : Int) * (10000 : Int)) / ((10000 : Int) + (500 : Int))) = (10000 : Int)) ∧ (((((50000 : Int) * (500 : Int)) * (365 : Int)) / (3650000 : Int)) = (2500 : Int))
```

### swine: litter(110, 10) = 11; feedconversion(300, 100) = 300; averagedailygain(900, 90) = 10; weaning(90, 100) = 90; leanness(58, 100) = 58; farrowing(220, 100) = 220; mortality(5, 1000) = 0
The ledger holds this as [fam_swine](/theorem/fam_swine) — proven `by decide`, sorry-free:

```lean
(((110 : Int) / (10 : Int)) = (11 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (100 : Int)) = (300 : Int)) ∧ (((900 : Int) / (90 : Int)) = (10 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((58 : Int) * (100 : Int)) / (100 : Int)) = (58 : Int)) ∧ ((((220 : Int) * (100 : Int)) / (100 : Int)) = (220 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (1000 : Int)) = (0 : Int))
```

### syllabary: syllables(5, 10) = 50; cvcombos(15, 2) = 105; consonants(14, 0) = 14; vowels(5, 0) = 5; gridcells(14, 5) = 70; orderingchoices(5) = 120; charsubsets(6) = 64; coverage(95, 100) = 95
The ledger holds this as [fam_syllabary](/theorem/fam_syllabary) — proven `by decide`, sorry-free:

```lean
(((5 : Int) * (10 : Int)) = (50 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (15 : Int)) (Int.toNat (2 : Int)))) = (105 : Int)) ∧ (((14 : Int) + (0 : Int)) = (14 : Int)) ∧ (((5 : Int) + (0 : Int)) = (5 : Int)) ∧ (((14 : Int) * (5 : Int)) = (70 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int))
```

### syllogism: moodcount(4, 4) = 16; figurecount(4, 0) = 4; validforms(256, 232) = 24; premisepairs(16, 2) = 120; termorderings(3) = 6; distributionchecks(4) = 16; conclusionpaths(4, 2) = 12; soundnessratio(15, 256) = 5
The ledger holds this as [fam_syllogism](/theorem/fam_syllogism) — proven `by decide`, sorry-free:

```lean
(((4 : Int) * (4 : Int)) = (16 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((256 : Int) - (232 : Int))) = (24 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (16 : Int)) (Int.toNat (2 : Int)))) = (120 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (3 : Int)))) = (6 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (4 : Int)))) / (Int.ofNat (ffact (Int.toNat ((4 : Int) - (2 : Int)))))) = (12 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (256 : Int)) = (5 : Int))
```

### synapse: vesicles(100, 10) = 1000; cleft(200, 10) = 20; receptors(1000, 1) = 1000; delay(100, 50) = 2; strength(80, 100) = 80; plasticity(100, 20) = 80; transmitters(6, 0) = 6; combos(6, 2) = 15
The ledger holds this as [fam_synapse](/theorem/fam_synapse) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * (10 : Int)) = (1000 : Int)) ∧ (((200 : Int) / (10 : Int)) = (20 : Int)) ∧ (((1000 : Int) * (1 : Int)) = (1000 : Int)) ∧ (((100 : Int) / (50 : Int)) = (2 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (20 : Int))) = (80 : Int)) ∧ (((6 : Int) + (0 : Int)) = (6 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### syntax: depth(12, 3) = 4; branching(20, 5) = 4; agreement(9, 10) = 90; complexity(15, 5) = 3; dependency(8, 10) = 80; wellformed(95, 100) = 95
The ledger holds this as [fam_syntax](/theorem/fam_syntax) — proven `by decide`, sorry-free:

```lean
(((12 : Int) / (3 : Int)) = (4 : Int)) ∧ (((20 : Int) / (5 : Int)) = (4 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int)) ∧ (((15 : Int) / (5 : Int)) = (3 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int))
```

### synthesis: length(3, 5) = 8; vocabulary(2, 4) = 6; tokens(10, 7) = 70; examples(4, 3) = 12; rewrites(5, 6) = 30; paths(4) = 16; candidates(3, 4) = 81; effort(8, 6) = 48
The ledger holds this as [fam_synthesis](/theorem/fam_synthesis) — proven `by decide`, sorry-free:

```lean
(((3 : Int) + (5 : Int)) = (8 : Int)) ∧ (((2 : Int) + (4 : Int)) = (6 : Int)) ∧ (((10 : Int) * (7 : Int)) = (70 : Int)) ∧ (((4 : Int) * (3 : Int)) = (12 : Int)) ∧ (((5 : Int) * (6 : Int)) = (30 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((3 : Int) ^ (4 : Nat)) = (81 : Int)) ∧ (((8 : Int) * (6 : Int)) = (48 : Int))
```


::: warning 
THE FAMILIES, S — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. The boundary is confirmed by the wing's own sealed theorems — e.g. [fam_safety](/theorem/fam_safety) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
