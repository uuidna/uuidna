---
title: "THE FAMILIES, P"
description: "Computed from lean/FamiliesP.lean — 121 sealed theorems, every claim citing its proof."
---

# THE FAMILIES, P

> THE FAMILIES, P — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. — held by [fam_pacing](/theorem/fam_pacing) and its 120 siblings below.

**121 theorems** and **44,161 decided cases**, from [fam_pacing](/theorem/fam_pacing) onward, each proven `by decide` in <a href="/lean/FamiliesP.lean">lean/FamiliesP.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFamiliesP.lean)** — nothing to install. The editor fetches `lean/FamiliesP.lean` from the repository and re-decides all 121 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### pacing: pace(3600, 12) = 300; speed(12000, 120) = 100; spliteven(2400, 8) = 300; negativesplit(310, 300) = 10; targettime(300, 8) = 2400; lapaverage(2400, 8) = 300; effortzone(150, 200) = 75; fade(320, 300) = 20
The ledger holds this as [fam_pacing](/theorem/fam_pacing) — proven `by decide`, sorry-free:

```lean
(((3600 : Int) / (12 : Int)) = (300 : Int)) ∧ (((12000 : Int) / (120 : Int)) = (100 : Int)) ∧ (((2400 : Int) / (8 : Int)) = (300 : Int)) ∧ ((fmax (0 : Int) ((310 : Int) - (300 : Int))) = (10 : Int)) ∧ (((300 : Int) * (8 : Int)) = (2400 : Int)) ∧ (((2400 : Int) / (8 : Int)) = (300 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (200 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((320 : Int) - (300 : Int))) = (20 : Int))
```

### packet: mtu(1500, 0) = 1500; payload(1500, 40) = 1460; fragments(5000, 1480) = 4; headerbits(20, 8) = 160; throughput(1000000, 1000) = 1000; checksum(65535, 256) = 255; flags(6) = 64; pairs(8, 2) = 28
The ledger holds this as [fam_packet](/theorem/fam_packet) — proven `by decide`, sorry-free:

```lean
(((1500 : Int) + (0 : Int)) = (1500 : Int)) ∧ ((fmax (0 : Int) ((1500 : Int) - (40 : Int))) = (1460 : Int)) ∧ ((-((-(5000 : Int)) / (1480 : Int))) = (4 : Int)) ∧ (((20 : Int) * (8 : Int)) = (160 : Int)) ∧ (((1000000 : Int) / (1000 : Int)) = (1000 : Int)) ∧ (((65535 : Int) % (256 : Int)) = (255 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int))
```

### pagination: pages(95, 10) = 10; pageoffset(5, 20) = 80; totalpages(85, 10, 10) = 10; signatures(100, 16) = 7; columns(960, 220, 20) = 4; charsperpage(66, 45) = 2970; pagerange(5, 20) = 100
The ledger holds this as [fam_pagination](/theorem/fam_pagination) — proven `by decide`, sorry-free:

```lean
((-((-(95 : Int)) / (10 : Int))) = (10 : Int)) ∧ (((fmax (0 : Int) ((5 : Int) - (1 : Int))) * (20 : Int)) = (80 : Int)) ∧ ((-((-((85 : Int) + (10 : Int))) / (10 : Int))) = (10 : Int)) ∧ ((-((-(100 : Int)) / (16 : Int))) = (7 : Int)) ∧ ((((960 : Int) + (20 : Int)) / ((220 : Int) + (20 : Int))) = (4 : Int)) ∧ (((66 : Int) * (45 : Int)) = (2970 : Int)) ∧ (((5 : Int) * (20 : Int)) = (100 : Int))
```

### painting: primarycolors(3, 0) = 3; mixingcombos(12, 2) = 66; layercount(5, 3) = 8; huewheel(360, 12) = 30; pigmentsubsets(6) = 64; canvasarea(40, 30) = 1200; valuescale(9, 0) = 9; opacityratio(80, 100) = 80
The ledger holds this as [fam_painting](/theorem/fam_painting) — proven `by decide`, sorry-free:

```lean
(((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((5 : Int) + (3 : Int)) = (8 : Int)) ∧ (((360 : Int) / (12 : Int)) = (30 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ (((40 : Int) * (30 : Int)) = (1200 : Int)) ∧ (((9 : Int) + (0 : Int)) = (9 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### paleoclimate: proxyrecords(40, 20) = 60; temperatureanomaly(150, 120) = 30; co2ppm(280, 1) = 280; cyclelength(41, 1000) = 41000; isotoperatio(18, 20) = 90; interglacials(5, 0) = 5; resolutionyears(10000, 100) = 100; correlationpairs(12, 2) = 66
The ledger holds this as [fam_paleoclimate](/theorem/fam_paleoclimate) — proven `by decide`, sorry-free:

```lean
(((40 : Int) + (20 : Int)) = (60 : Int)) ∧ ((fmax (0 : Int) ((150 : Int) - (120 : Int))) = (30 : Int)) ∧ (((280 : Int) * (1 : Int)) = (280 : Int)) ∧ (((41 : Int) * (1000 : Int)) = (41000 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (20 : Int)) = (90 : Int)) ∧ (((5 : Int) + (0 : Int)) = (5 : Int)) ∧ (((10000 : Int) / (100 : Int)) = (100 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int))
```

### paleography: letterforms(26, 4) = 104; scriptorderings(5) = 120; ligaturepairs(15, 2) = 105; abbreviationsubsets(6) = 64; dateestimate(1200, 800) = 400; handcount(3, 2) = 5; minusculeratio(70, 100) = 70; graphemecombos(22, 3) = 1540
The ledger holds this as [fam_paleography](/theorem/fam_paleography) — proven `by decide`, sorry-free:

```lean
(((26 : Int) * (4 : Int)) = (104 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (15 : Int)) (Int.toNat (2 : Int)))) = (105 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((fmax (0 : Int) ((1200 : Int) - (800 : Int))) = (400 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (22 : Int)) (Int.toNat (3 : Int)))) = (1540 : Int))
```

### paleontology: age(2, 5730) = 11460; decay(1000, 3) = 125; completeness(60, 200) = 30; diversity(120, 40) = 3; stratum(1000, 50) = 20; extinction(75, 100) = 75; size(12, 100) = 1200; abundance(600, 20) = 30
The ledger holds this as [fam_paleontology](/theorem/fam_paleontology) — proven `by decide`, sorry-free:

```lean
(((2 : Int) * (5730 : Int)) = (11460 : Int)) ∧ (((1000 : Int) / ((2 : Int) ^ (3 : Nat))) = (125 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (200 : Int)) = (30 : Int)) ∧ (((120 : Int) / (40 : Int)) = (3 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ (((12 : Int) * (100 : Int)) = (1200 : Int)) ∧ (((600 : Int) / (20 : Int)) = (30 : Int))
```

### papyrology: fragments(40, 20) = 60; joinpairs(40, 2) = 780; columnorderings(6) = 720; linespercolumn(600, 30) = 20; datingrange(300, 100) = 200; recovery(60, 100) = 60; scribalhands(3, 2) = 6; subsetreadings(5) = 32
The ledger holds this as [fam_papyrology](/theorem/fam_papyrology) — proven `by decide`, sorry-free:

```lean
(((40 : Int) + (20 : Int)) = (60 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (40 : Int)) (Int.toNat (2 : Int)))) = (780 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (6 : Int)))) = (720 : Int)) ∧ (((600 : Int) / (30 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (100 : Int))) = (200 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ (((3 : Int) * (2 : Int)) = (6 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int))
```

### parable: elementcount(3, 2) = 5; interpretationpaths(4) = 24; symbolpairs(7, 2) = 21; meaninglayers(4) = 16; charactercount(3, 2) = 5; motifcombos(8, 3) = 56; narrativeorderings(5, 3) = 60; moralcount(1, 3) = 3
The ledger holds this as [fam_parable](/theorem/fam_parable) — proven `by decide`, sorry-free:

```lean
(((3 : Int) + (2 : Int)) = (5 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (7 : Int)) (Int.toNat (2 : Int)))) = (21 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (3 : Int)))) = (56 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (5 : Int)))) / (Int.ofNat (ffact (Int.toNat ((5 : Int) - (3 : Int)))))) = (60 : Int)) ∧ (((1 : Int) * (3 : Int)) = (3 : Int))
```

### parallax: angle(1000, 10) = 100; arcseconds(2) = 7200; baseline(500) = 1000; distance(10) = 100000; errorbudget(1000, 4) = 250; errorbudget(100, 0) = 0; parsecs(326) = 100; propermotion(1000, 10) = 100; tangentialvelocity(10, 100) = 4740
The ledger holds this as [fam_parallax](/theorem/fam_parallax) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((2 : Int) * (3600 : Int)) = (7200 : Int)) ∧ (((500 : Int) * (2 : Int)) = (1000 : Int)) ∧ (((1000000 : Int) / (10 : Int)) = (100000 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((100 : Int) / (0 : Int)) = (0 : Int)) ∧ ((((326 : Int) * (100 : Int)) / (326 : Int)) = (100 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((((10 : Int) * (100 : Int)) * (474 : Int)) / (100 : Int)) = (4740 : Int))
```

### parasitology: prevalence(250, 1000) = 25; intensity(1200, 50) = 24; burden(50, 24) = 1200; abundance(5000, 1000) = 5; aggregation(800, 10) = 80; transmission(500, 20) = 100; lifecycle(4, 7) = 28; infectivity(100, 50) = 1; infectivity(30, 50) = 0
The ledger holds this as [fam_parasitology](/theorem/fam_parasitology) — proven `by decide`, sorry-free:

```lean
((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ (((1200 : Int) / (50 : Int)) = (24 : Int)) ∧ (((50 : Int) * (24 : Int)) = (1200 : Int)) ∧ (((5000 : Int) / (1000 : Int)) = (5 : Int)) ∧ (((800 : Int) / (10 : Int)) = (80 : Int)) ∧ ((((500 : Int) * (20 : Int)) / (100 : Int)) = (100 : Int)) ∧ (((4 : Int) * (7 : Int)) = (28 : Int)) ∧ ((if (if (100 : Int) ≥ (50 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (30 : Int) ≥ (50 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int))
```

### parity: evenbit(7) = 1; evenbit(6) = 0; checkbits(64, 8) = 8; coveragebits(4, 3) = 7; detectrate(990, 1000) = 99; overhead(3, 4) = 75; correctable(3) = 1
The ledger holds this as [fam_parity](/theorem/fam_parity) — proven `by decide`, sorry-free:

```lean
(((7 : Int) % (2 : Int)) = (1 : Int)) ∧ (((6 : Int) % (2 : Int)) = (0 : Int)) ∧ ((-((-(64 : Int)) / (8 : Int))) = (8 : Int)) ∧ (((4 : Int) + (3 : Int)) = (7 : Int)) ∧ ((((990 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ (((fmax (0 : Int) ((3 : Int) - (1 : Int))) / (2 : Int)) = (1 : Int))
```

### partition: durfee(10) = 3; durfeecells(3) = 9; ferrers(3, 4) = 12; atmosttwo(10) = 6; hook(3, 4) = 6; rank(9, 4) = 5; oddavailable(10) = 5
The ledger holds this as [fam_partition](/theorem/fam_partition) — proven `by decide`, sorry-free:

```lean
((Int.ofNat (fsqrt (Int.toNat (10 : Int)))) = (3 : Int)) ∧ (((3 : Int) ^ (2 : Nat)) = (9 : Int)) ∧ (((3 : Int) * (4 : Int)) = (12 : Int)) ∧ ((((10 : Int) / (2 : Int)) + (1 : Int)) = (6 : Int)) ∧ ((((3 : Int) + (4 : Int)) - (1 : Int)) = (6 : Int)) ∧ (((9 : Int) - (4 : Int)) = (5 : Int)) ∧ ((-((-(10 : Int)) / (2 : Int))) = (5 : Int))
```

### partitioning: partitions(1000, 30) = 34; keyspacesplit(1000, 8) = 125; skew(150, 100) = 50; rebalance(1000, 3, 5) = 400; hotpartition(250, 1000) = 25; rangewidth(6000, 60) = 100; coalesce(100, 4) = 25; fanout(10, 5) = 50; skew(80, 100) = 0
The ledger holds this as [fam_partitioning](/theorem/fam_partitioning) — proven `by decide`, sorry-free:

```lean
((-((-(1000 : Int)) / (30 : Int))) = (34 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ ((((fmax (0 : Int) ((150 : Int) - (100 : Int))) * (100 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((((1000 : Int) * (fmax (0 : Int) ((5 : Int) - (3 : Int)))) / (5 : Int)) = (400 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((-((-(100 : Int)) / (4 : Int))) = (25 : Int)) ∧ (((10 : Int) * (5 : Int)) = (50 : Int)) ∧ ((((fmax (0 : Int) ((80 : Int) - (100 : Int))) * (100 : Int)) / (100 : Int)) = (0 : Int))
```

### partner: filter(45, 100) = 45; tier(100, 4) = 25; commission(10000, 15) = 1500; leads(30, 120) = 25; rating(94, 20) = 47; regions(240, 6) = 40; listing(80, 200) = 40
The ledger holds this as [fam_partner](/theorem/fam_partner) — proven `by decide`, sorry-free:

```lean
((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ ((((10000 : Int) * (15 : Int)) / (100 : Int)) = (1500 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ ((((94 : Int) * (10 : Int)) / (20 : Int)) = (47 : Int)) ∧ (((240 : Int) / (6 : Int)) = (40 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (200 : Int)) = (40 : Int))
```

### passwords: keyspacebits(96, 32) = 64; keyspacebits(32, 96) = 0; lockoutwindow(100, 10) = 10; rotationdays(90, 3) = 30; minlengthscore(16, 8) = 8; hashcost(12, 50) = 600; mfabonus(3, 20) = 60; reuserisk(10, 3) = 30
The ledger holds this as [fam_passwords](/theorem/fam_passwords) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((96 : Int) - (32 : Int))) = (64 : Int)) ∧ ((fmax (0 : Int) ((32 : Int) - (96 : Int))) = (0 : Int)) ∧ ((-((-(100 : Int)) / (10 : Int))) = (10 : Int)) ∧ (((90 : Int) / (3 : Int)) = (30 : Int)) ∧ ((fmax (0 : Int) ((16 : Int) - (8 : Int))) = (8 : Int)) ∧ (((12 : Int) * (50 : Int)) = (600 : Int)) ∧ (((3 : Int) * (20 : Int)) = (60 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (10 : Int)) = (30 : Int))
```

### pasteurization: holdtime(300, 20) = 15; temperature(72, 3) = 75; lethality(12, 15) = 180; dvalue(60, 6) = 10; zvalue(80, 72) = 8; reduction(45, 10) = 4; throughput(500, 8) = 4000; cooling(75, 4) = 71; cooling(4, 75) = 0
The ledger holds this as [fam_pasteurization](/theorem/fam_pasteurization) — proven `by decide`, sorry-free:

```lean
(((300 : Int) / (20 : Int)) = (15 : Int)) ∧ (((72 : Int) + (3 : Int)) = (75 : Int)) ∧ (((12 : Int) * (15 : Int)) = (180 : Int)) ∧ (((60 : Int) / (6 : Int)) = (10 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (72 : Int))) = (8 : Int)) ∧ (((45 : Int) / (10 : Int)) = (4 : Int)) ∧ (((500 : Int) * (8 : Int)) = (4000 : Int)) ∧ ((fmax (0 : Int) ((75 : Int) - (4 : Int))) = (71 : Int)) ∧ ((fmax (0 : Int) ((4 : Int) - (75 : Int))) = (0 : Int))
```

### patent: term(2026, 20) = 2046; priority(11) = 1; priority(13) = 0; royalty(500000, 4) = 20000; damages(10000, 3) = 30000; claims(3, 17) = 20; infringement(10000, 2000) = 8000; maintenance(10, 1600) = 16000
The ledger holds this as [fam_patent](/theorem/fam_patent) — proven `by decide`, sorry-free:

```lean
(((2026 : Int) + (20 : Int)) = (2046 : Int)) ∧ ((if (if (11 : Int) ≤ (12 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (13 : Int) ≤ (12 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((500000 : Int) * (4 : Int)) / (100 : Int)) = (20000 : Int)) ∧ (((10000 : Int) * (3 : Int)) = (30000 : Int)) ∧ (((3 : Int) + (17 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((10000 : Int) - (2000 : Int))) = (8000 : Int)) ∧ (((10 : Int) * (1600 : Int)) = (16000 : Int))
```

### pathogen: r0(25, 10) = 2; incubation(5, 2) = 7; mortality(2, 100) = 2; transmission(60, 100) = 60; generations(10, 2) = 20; strains(4, 1) = 5; reservoir(3, 0) = 3; combos(6, 2) = 15
The ledger holds this as [fam_pathogen](/theorem/fam_pathogen) — proven `by decide`, sorry-free:

```lean
(((25 : Int) / (10 : Int)) = (2 : Int)) ∧ (((5 : Int) + (2 : Int)) = (7 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ (((10 : Int) * (2 : Int)) = (20 : Int)) ∧ (((4 : Int) + (1 : Int)) = (5 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### pathology: sensitivity(90, 100) = 90; specificity(95, 100) = 95; precision(80, 100) = 80; prevalence(5, 1000) = 0; prevalence(50, 1000) = 5; mitotic(30, 10) = 3; cellularity(2000, 4) = 500; concordance(18, 20) = 90; positivity(45, 150) = 30
The ledger holds this as [fam_pathology](/theorem/fam_pathology) — proven `by decide`, sorry-free:

```lean
((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (1000 : Int)) = (0 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ (((30 : Int) / (10 : Int)) = (3 : Int)) ∧ (((2000 : Int) / (4 : Int)) = (500 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (20 : Int)) = (90 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (150 : Int)) = (30 : Int))
```

### pathplanning: chebyshev(3, 4) = 4; clearance(10, 3) = 7; clearance(3, 10) = 0; euclidsq(3, 4) = 25; heuristic(10, 5) = 15; manhattan(3, 4) = 7; nodesexpanded(4, 5) = 20; pathcost(10, 7) = 70; smoothness(3, 12) = 25
The ledger holds this as [fam_pathplanning](/theorem/fam_pathplanning) — proven `by decide`, sorry-free:

```lean
((fmax (3 : Int) (4 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (3 : Int))) = (7 : Int)) ∧ ((fmax (0 : Int) ((3 : Int) - (10 : Int))) = (0 : Int)) ∧ ((((3 : Int) ^ (2 : Nat)) + ((4 : Int) ^ (2 : Nat))) = (25 : Int)) ∧ (((10 : Int) + (5 : Int)) = (15 : Int)) ∧ (((3 : Int) + (4 : Int)) = (7 : Int)) ∧ (((4 : Int) * (5 : Int)) = (20 : Int)) ∧ (((10 : Int) * (7 : Int)) = (70 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (12 : Int)) = (25 : Int))
```

### patristics: fathercount(8, 4) = 12; worksorderings(6) = 720; councilcombos(7, 3) = 35; influencepairs(12, 2) = 66; eracount(3, 2) = 5; translationways(6, 2) = 30; citationtotal(340, 10) = 3400; orthodoxyratio(90, 100) = 90
The ledger holds this as [fam_patristics](/theorem/fam_patristics) — proven `by decide`, sorry-free:

```lean
(((8 : Int) + (4 : Int)) = (12 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (6 : Int)))) = (720 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (7 : Int)) (Int.toNat (3 : Int)))) = (35 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (6 : Int)))) / (Int.ofNat (ffact (Int.toNat ((6 : Int) - (2 : Int)))))) = (30 : Int)) ∧ (((340 : Int) * (10 : Int)) = (3400 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int))
```

### payables: turnover(900, 100) = 9; dpo(1000, 2000) = 182; aging(1000, 600) = 400; discount(10000, 2) = 200; outstanding(5000, 1500) = 3500; accrual(50, 30) = 1500; settlement(1000, 12) = 84; terms(30, 10) = 20; terms(10, 30) = 0
The ledger holds this as [fam_payables](/theorem/fam_payables) — proven `by decide`, sorry-free:

```lean
(((900 : Int) / (100 : Int)) = (9 : Int)) ∧ ((((1000 : Int) * (365 : Int)) / (2000 : Int)) = (182 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (600 : Int))) = (400 : Int)) ∧ ((((10000 : Int) * (2 : Int)) / (100 : Int)) = (200 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (1500 : Int))) = (3500 : Int)) ∧ (((50 : Int) * (30 : Int)) = (1500 : Int)) ∧ ((-((-(1000 : Int)) / (12 : Int))) = (84 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (10 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (30 : Int))) = (0 : Int))
```

### payload: coverage(8, 11) = 72
The ledger holds this as [fam_payload](/theorem/fam_payload) — proven `by decide`, sorry-free:

```lean
((((8 : Int) * (100 : Int)) / (11 : Int)) = (72 : Int))
```

### payment: fee(10000, 290) = 290; chargeback(5, 1000) = 0; chargeback(50, 1000) = 5; settlement(10000, 320) = 9680; interchange(10000, 2) = 200; fx(10000, 10850) = 10850; payout(50000, 5000) = 45000; decline(30, 1000) = 3; authorization(8000, 10000) = 8000
The ledger holds this as [fam_payment](/theorem/fam_payment) — proven `by decide`, sorry-free:

```lean
((((10000 : Int) * (290 : Int)) / (10000 : Int)) = (290 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (1000 : Int)) = (0 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((fmax (0 : Int) ((10000 : Int) - (320 : Int))) = (9680 : Int)) ∧ ((((10000 : Int) * (2 : Int)) / (100 : Int)) = (200 : Int)) ∧ ((((10000 : Int) * (10850 : Int)) / (10000 : Int)) = (10850 : Int)) ∧ ((fmax (0 : Int) ((50000 : Int) - (5000 : Int))) = (45000 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (1000 : Int)) = (3 : Int)) ∧ ((fmin (8000 : Int) (10000 : Int)) = (8000 : Int))
```

### payroll: gross(5000, 12) = 60000; net(5000, 1500) = 3500; withholding(25, 100) = 25; employees(100, 1) = 100; overtime(10, 45) = 450; deductions(500, 200) = 700; periods(26, 0) = 26; combos(6, 2) = 15
The ledger holds this as [fam_payroll](/theorem/fam_payroll) — proven `by decide`, sorry-free:

```lean
(((5000 : Int) * (12 : Int)) = (60000 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (1500 : Int))) = (3500 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int)) ∧ (((100 : Int) * (1 : Int)) = (100 : Int)) ∧ (((10 : Int) * (45 : Int)) = (450 : Int)) ∧ (((500 : Int) + (200 : Int)) = (700 : Int)) ∧ (((26 : Int) + (0 : Int)) = (26 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### pedagogy: mastery(18, 20) = 90; retention(70, 100) = 70; ratio(300, 12) = 25; completion(80, 100) = 80; engagement(45, 50) = 90; progress(30, 40) = 75; gain(85, 60) = 25; gain(50, 60) = 0; pace(24, 12) = 2
The ledger holds this as [fam_pedagogy](/theorem/fam_pedagogy) — proven `by decide`, sorry-free:

```lean
((((18 : Int) * (100 : Int)) / (20 : Int)) = (90 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ (((300 : Int) / (12 : Int)) = (25 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (40 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((85 : Int) - (60 : Int))) = (25 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (60 : Int))) = (0 : Int)) ∧ (((24 : Int) / (12 : Int)) = (2 : Int))
```

### pediatrics: dose(20, 15) = 300; bsa(36, 100) = 1; growthpercentile(90, 100) = 90; apgar(2, 2, 2) = 6; apgar(2, 2, 1) = 5; bmi(16, 100) = 16; fluidrequirement(8, 100) = 800; heartrate(30, 15) = 120; caloricneed(10, 100) = 1000
The ledger holds this as [fam_pediatrics](/theorem/fam_pediatrics) — proven `by decide`, sorry-free:

```lean
(((20 : Int) * (15 : Int)) = (300 : Int)) ∧ ((((36 : Int) * (100 : Int)) / (3600 : Int)) = (1 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((2 : Int) + (2 : Int)) + (2 : Int)) = (6 : Int)) ∧ ((((2 : Int) + (2 : Int)) + (1 : Int)) = (5 : Int)) ∧ ((((16 : Int) * (10000 : Int)) / ((100 : Int) ^ (2 : Nat))) = (16 : Int)) ∧ (((8 : Int) * (100 : Int)) = (800 : Int)) ∧ ((((30 : Int) * (60 : Int)) / (15 : Int)) = (120 : Int)) ∧ (((10 : Int) * (100 : Int)) = (1000 : Int))
```

### pedology: porosity(40, 100) = 40; moisture(25, 100) = 25; ph(65, 100) = 65; organic(3, 100) = 3; infiltration(120, 60) = 2; texture(70, 10) = 700; erosion(5000, 100) = 50; fertility(900, 30) = 30
The ledger holds this as [fam_pedology](/theorem/fam_pedology) — proven `by decide`, sorry-free:

```lean
((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int)) ∧ ((((65 : Int) * (100 : Int)) / (100 : Int)) = (65 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (100 : Int)) = (3 : Int)) ∧ (((120 : Int) / (60 : Int)) = (2 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (10 : Int)) = (700 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ (((900 : Int) / (30 : Int)) = (30 : Int))
```

### pendulum: period(200, 10) = 20; frequency(100, 5) = 20; length(2, 1) = 2; swings(60, 2) = 120; amplitude(90, 10) = 80; energy(50, 2) = 100; bobmass(5, 1) = 5; combos(6, 2) = 15
The ledger holds this as [fam_pendulum](/theorem/fam_pendulum) — proven `by decide`, sorry-free:

```lean
(((200 : Int) / (10 : Int)) = (20 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ (((2 : Int) * (1 : Int)) = (2 : Int)) ∧ (((60 : Int) * (2 : Int)) = (120 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (10 : Int))) = (80 : Int)) ∧ (((50 : Int) * (2 : Int)) = (100 : Int)) ∧ (((5 : Int) * (1 : Int)) = (5 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### pentomino: pieces(12, 0) = 12; cells(12, 5) = 60; orientations(12, 8) = 96; placementcombos(12, 3) = 220; tilingsubsets(6) = 64; symmetryorderings(4) = 24; boardarea(6, 10) = 60; coverage(100, 100) = 100
The ledger holds this as [fam_pentomino](/theorem/fam_pentomino) — proven `by decide`, sorry-free:

```lean
(((12 : Int) + (0 : Int)) = (12 : Int)) ∧ (((12 : Int) * (5 : Int)) = (60 : Int)) ∧ (((12 : Int) * (8 : Int)) = (96 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ (((6 : Int) * (10 : Int)) = (60 : Int)) ∧ ((((100 : Int) * (100 : Int)) / (100 : Int)) = (100 : Int))
```

### perception: threshold(45, 100) = 45; weber(2, 100) = 2; acuity(600, 10) = 60; contrast(800, 100) = 800; adaptation(100, 30) = 70; sensitivity(90, 100) = 90; illusion(120, 100) = 120
The ledger holds this as [fam_perception](/theorem/fam_perception) — proven `by decide`, sorry-free:

```lean
((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int)) ∧ (((600 : Int) / (10 : Int)) = (60 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (100 : Int)) = (800 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((120 : Int) * (100 : Int)) / (100 : Int)) = (120 : Int))
```

### performance: rating(450, 5) = 90; productivity(1000, 40) = 25; goal(80, 100) = 80; appraisal(80, 90) = 85; improvement(120, 100) = 20; improvement(90, 100) = 0; utilization(32, 40) = 80; throughput(100, 20) = 5; score(90, 2) = 180
The ledger holds this as [fam_performance](/theorem/fam_performance) — proven `by decide`, sorry-free:

```lean
(((450 : Int) / (5 : Int)) = (90 : Int)) ∧ (((1000 : Int) / (40 : Int)) = (25 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((80 : Int) + (90 : Int)) / (2 : Int)) = (85 : Int)) ∧ ((fmax (0 : Int) ((((120 : Int) - (100 : Int)) * (100 : Int)) / (100 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((((90 : Int) - (100 : Int)) * (100 : Int)) / (100 : Int))) = (0 : Int)) ∧ ((((32 : Int) * (100 : Int)) / (40 : Int)) = (80 : Int)) ∧ (((100 : Int) / (20 : Int)) = (5 : Int)) ∧ (((90 : Int) * (2 : Int)) = (180 : Int))
```

### permitting: approval(900, 1000) = 90; backlog(500, 320) = 180; backlog(100, 200) = 0; cycletime(3600, 120) = 30; expiry(100, 365) = 465; fee(200, 75) = 15000; inspections(150, 3) = 450; queue(100, 8) = 13; throughput(600, 30) = 20
The ledger holds this as [fam_permitting](/theorem/fam_permitting) — proven `by decide`, sorry-free:

```lean
((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (320 : Int))) = (180 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (200 : Int))) = (0 : Int)) ∧ (((3600 : Int) / (120 : Int)) = (30 : Int)) ∧ (((100 : Int) + (365 : Int)) = (465 : Int)) ∧ (((200 : Int) * (75 : Int)) = (15000 : Int)) ∧ (((150 : Int) * (3 : Int)) = (450 : Int)) ∧ ((-((-(100 : Int)) / (8 : Int))) = (13 : Int)) ∧ (((600 : Int) / (30 : Int)) = (20 : Int))
```

### permutation: ascents(5) = 4; choose(5, 2) = 10; descents(5) = 4; excedances(5) = 4; inversions(5) = 10; majorindex(5) = 10; ncycles(5) = 24; permutations(5, 2) = 20; transpositions(5) = 4
The ledger holds this as [fam_permutation](/theorem/fam_permutation) — proven `by decide`, sorry-free:

```lean
(((5 : Int) - (1 : Int)) = (4 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (5 : Int)))) / ((Int.ofNat (ffact (Int.toNat (2 : Int)))) * (Int.ofNat (ffact (Int.toNat ((5 : Int) - (2 : Int))))))) = (10 : Int)) ∧ (((5 : Int) - (1 : Int)) = (4 : Int)) ∧ (((5 : Int) - (1 : Int)) = (4 : Int)) ∧ ((((5 : Int) * ((5 : Int) - (1 : Int))) / (2 : Int)) = (10 : Int)) ∧ ((((5 : Int) * ((5 : Int) - (1 : Int))) / (2 : Int)) = (10 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat ((5 : Int) - (1 : Int))))) = (24 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (5 : Int)))) / (Int.ofNat (ffact (Int.toNat ((5 : Int) - (2 : Int)))))) = (20 : Int)) ∧ (((5 : Int) - (1 : Int)) = (4 : Int))
```

### personality: openness(40, 10) = 80; conscientiousness(90, 100) = 90; extraversion(70, 30) = 40; agreeableness(45, 10) = 90; neuroticism(60, 25) = 35; composite(80, 90, 40) = 210; trait(48, 12) = 4; deviation(80, 50) = 30; deviation(40, 50) = 0
The ledger holds this as [fam_personality](/theorem/fam_personality) — proven `by decide`, sorry-free:

```lean
((((40 : Int) * (20 : Int)) / (10 : Int)) = (80 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((70 : Int) - (30 : Int))) = (40 : Int)) ∧ ((((45 : Int) * (20 : Int)) / (10 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((60 : Int) - (25 : Int))) = (35 : Int)) ∧ ((((80 : Int) + (90 : Int)) + (40 : Int)) = (210 : Int)) ∧ (((48 : Int) / (12 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (50 : Int))) = (30 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (50 : Int))) = (0 : Int))
```

### pest: economicthreshold(500, 20) = 25; infestationrate(45, 300) = 15; controlefficacy(80, 100) = 80; damageindex(150, 3) = 450; populationgrowth(1000, 25) = 1250; treatmentcost(40, 15) = 600; survivingfraction(20, 100) = 20; trapcount(1000, 40) = 25
The ledger holds this as [fam_pest](/theorem/fam_pest) — proven `by decide`, sorry-free:

```lean
(((500 : Int) / (20 : Int)) = (25 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (300 : Int)) = (15 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((150 : Int) * (3 : Int)) = (450 : Int)) ∧ (((1000 : Int) + (((1000 : Int) * (25 : Int)) / (100 : Int))) = (1250 : Int)) ∧ (((40 : Int) * (15 : Int)) = (600 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ ((-((-(1000 : Int)) / (40 : Int))) = (25 : Int))
```

### petroleum: api(1000) = 10; recovery(30, 100) = 30; porosity(20, 100) = 20; permeability(1000, 50) = 20; refined(45, 100) = 45; flow(500, 24) = 12000; saturation(70, 100) = 70
The ledger holds this as [fam_petroleum](/theorem/fam_petroleum) — proven `by decide`, sorry-free:

```lean
((((141500 : Int) / (1000 : Int)) - (131 : Int)) = (10 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ (((500 : Int) * (24 : Int)) = (12000 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int))
```

### petrology: colorindex(15, 100) = 15; silicacontent(720, 1000) = 72; porosity(30, 200) = 15; graindensity(5300, 2) = 2650; differentiation(30, 55, 5) = 90; crystallization(40, 50) = 80; modalcomposition(250, 1000) = 25; meltfraction(10, 40) = 25
The ledger holds this as [fam_petrology](/theorem/fam_petrology) — proven `by decide`, sorry-free:

```lean
((((15 : Int) * (100 : Int)) / (100 : Int)) = (15 : Int)) ∧ ((((720 : Int) * (100 : Int)) / (1000 : Int)) = (72 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (200 : Int)) = (15 : Int)) ∧ (((5300 : Int) / (2 : Int)) = (2650 : Int)) ∧ ((((30 : Int) + (55 : Int)) + (5 : Int)) = (90 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (50 : Int)) = (80 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ ((((10 : Int) * (100 : Int)) / (40 : Int)) = (25 : Int))
```

### pharma: dose(70, 10) = 700; halflife(1000, 3) = 125; clearance(1000, 4) = 250; loading(5, 40) = 200; bioavailability(80, 100) = 80; interval(6, 4) = 24; therapeutic(10, 100) = 1000; steadystate(500, 8) = 62
The ledger holds this as [fam_pharma](/theorem/fam_pharma) — proven `by decide`, sorry-free:

```lean
(((70 : Int) * (10 : Int)) = (700 : Int)) ∧ (((1000 : Int) / ((2 : Int) ^ (3 : Nat))) = (125 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((5 : Int) * (40 : Int)) = (200 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((6 : Int) * (4 : Int)) = (24 : Int)) ∧ ((((100 : Int) * (100 : Int)) / (10 : Int)) = (1000 : Int)) ∧ (((500 : Int) / (8 : Int)) = (62 : Int))
```

### pharmacokinetics: volume(1000, 10) = 100; clearancerate(50, 2) = 100; auc(1000, 20) = 50; cmax(500, 10) = 50; steadystate(600, 6) = 100; loadingdose(10, 50) = 500; accumulation(24, 12) = 10; extraction(90, 100) = 90; extraction(45, 90) = 50
The ledger holds this as [fam_pharmacokinetics](/theorem/fam_pharmacokinetics) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((50 : Int) * (2 : Int)) = (100 : Int)) ∧ (((1000 : Int) / (20 : Int)) = (50 : Int)) ∧ (((500 : Int) / (10 : Int)) = (50 : Int)) ∧ (((600 : Int) / (6 : Int)) = (100 : Int)) ∧ (((10 : Int) * (50 : Int)) = (500 : Int)) ∧ ((((5 : Int) * (24 : Int)) / (12 : Int)) = (10 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (90 : Int)) = (50 : Int))
```

### pharmacology: halflife(5000, 100) = 34; clearance(1000, 40) = 25; bioavailability(80, 100) = 80; loading(10, 50) = 500; therapeutic(100, 10) = 10; dose(70, 5) = 350; bound(90, 100) = 90; elimination(100, 25) = 75
The ledger holds this as [fam_pharmacology](/theorem/fam_pharmacology) — proven `by decide`, sorry-free:

```lean
((((5000 : Int) * (693 : Int)) / ((100 : Int) * (1000 : Int))) = (34 : Int)) ∧ (((1000 : Int) / (40 : Int)) = (25 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((10 : Int) * (50 : Int)) = (500 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ (((70 : Int) * (5 : Int)) = (350 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ (((((100 : Int) - (25 : Int)) * (100 : Int)) / (100 : Int)) = (75 : Int))
```

### phenomenology: intentionalacts(5, 3) = 8; reductions(3, 1) = 3; horizonlayers(4) = 16; noesisnoema(2, 3) = 6; epochestages(4) = 24; experiencepairs(8, 2) = 28; consciousnessmodes(6, 0) = 6; givennessratio(70, 100) = 70
The ledger holds this as [fam_phenomenology](/theorem/fam_phenomenology) — proven `by decide`, sorry-free:

```lean
(((5 : Int) + (3 : Int)) = (8 : Int)) ∧ (((3 : Int) * (1 : Int)) = (3 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((2 : Int) * (3 : Int)) = (6 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ (((6 : Int) + (0 : Int)) = (6 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int))
```

### philosophy: validity(3, 4) = 75; consistency(9, 10) = 90; utility(7, 100) = 700; consensus(3, 4) = 75; syllogism(8, 5) = 5; virtue(10, 3) = 7; virtue(3, 10) = 0; entailment(20, 4) = 5
The ledger holds this as [fam_philosophy](/theorem/fam_philosophy) — proven `by decide`, sorry-free:

```lean
((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int)) ∧ (((7 : Int) * (100 : Int)) = (700 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ ((fmin (8 : Int) (5 : Int)) = (5 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (3 : Int))) = (7 : Int)) ∧ ((fmax (0 : Int) ((3 : Int) - (10 : Int))) = (0 : Int)) ∧ (((20 : Int) / (4 : Int)) = (5 : Int))
```

### phonetics: formant(2400, 3) = 800; pitch(2200, 10) = 220; rate(15, 3) = 5; voicing(6, 10) = 60; intensity(70, 100) = 70; vowels(4, 10) = 40
The ledger holds this as [fam_phonetics](/theorem/fam_phonetics) — proven `by decide`, sorry-free:

```lean
(((2400 : Int) / (3 : Int)) = (800 : Int)) ∧ (((2200 : Int) / (10 : Int)) = (220 : Int)) ∧ (((15 : Int) / (3 : Int)) = (5 : Int)) ∧ ((((6 : Int) * (100 : Int)) / (10 : Int)) = (60 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ ((((4 : Int) * (100 : Int)) / (10 : Int)) = (40 : Int))
```

### photochemistry: quantumyield(90, 100) = 90; absorbance(2, 3, 100) = 600; photonflux(6000, 60) = 100; actinometry(10000, 90) = 9000; bleaching(1000, 400) = 600; bleaching(400, 1000) = 0; excitation(500, 4) = 2000; lifetime(5000, 100) = 50; conversion(750, 1000) = 75
The ledger holds this as [fam_photochemistry](/theorem/fam_photochemistry) — proven `by decide`, sorry-free:

```lean
((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((2 : Int) * (3 : Int)) * (100 : Int)) = (600 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((((10000 : Int) * (90 : Int)) / (100 : Int)) = (9000 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (400 : Int))) = (600 : Int)) ∧ ((fmax (0 : Int) ((400 : Int) - (1000 : Int))) = (0 : Int)) ∧ (((500 : Int) * (4 : Int)) = (2000 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ ((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int))
```

### photodiode: responsivity(1000, 2) = 500; photocurrent(500, 4) = 2000; quantumefficiency(80, 100) = 80; darkcurrent(5, 100) = 500; snr(1000, 8) = 125; risetime(50, 10) = 1100; shuntresistance(1000, 4) = 250; saturation(500, 400) = 1; saturation(300, 400) = 0
The ledger holds this as [fam_photodiode](/theorem/fam_photodiode) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (2 : Int)) = (500 : Int)) ∧ (((500 : Int) * (4 : Int)) = (2000 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((5 : Int) * (100 : Int)) = (500 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ (((((22 : Int) * (50 : Int)) * (10 : Int)) / (10 : Int)) = (1100 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ ((if (if (500 : Int) ≥ (400 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (300 : Int) ≥ (400 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int))
```

### photogrammetry: scale(50, 10000) = 5000; overlap(80, 100) = 80; gsd(5, 10000) = 50; basedistance(10000, 80) = 2000; parallax(50, 200) = 25; accuracy(2, 10000) = 2; tiepoints(900, 1000) = 90; reconstruction(10000, 50) = 200
The ledger holds this as [fam_photogrammetry](/theorem/fam_photogrammetry) — proven `by decide`, sorry-free:

```lean
((((50 : Int) * (1000000 : Int)) / (10000 : Int)) = (5000 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((5 : Int) * (10000 : Int)) / (1000 : Int)) = (50 : Int)) ∧ ((((10000 : Int) * ((100 : Int) - (80 : Int))) / (100 : Int)) = (2000 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int)) ∧ ((((2 : Int) * (10000 : Int)) / (10000 : Int)) = (2 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ (((10000 : Int) / (50 : Int)) = (200 : Int))
```

### photography: exposure(8, 125) = 1000; fstop(50, 25) = 20; depthoffield(4, 100) = 25; megapixels(4000, 3000) = 12; crop(24, 36) = 150; dynamicrange(3) = 8; composition(2, 3) = 66
The ledger holds this as [fam_photography](/theorem/fam_photography) — proven `by decide`, sorry-free:

```lean
(((8 : Int) * (125 : Int)) = (1000 : Int)) ∧ ((((50 : Int) * (10 : Int)) / (25 : Int)) = (20 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ ((((4000 : Int) * (3000 : Int)) / (1000000 : Int)) = (12 : Int)) ∧ ((((36 : Int) * (100 : Int)) / (24 : Int)) = (150 : Int)) ∧ (((2 : Int) ^ (3 : Nat)) = (8 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (3 : Int)) = (66 : Int))
```

### photometry: magnitude(25, 10) = 15; flux(10000, 5, 100) = 20; colorindex(15, 12) = 3; colorindex(12, 15) = 0; absolutemagnitude(20, 15) = 5; distancemodulus(20, 5) = 15; apparentmagnitude(5, 15) = 20; extinction(3, 2) = 6; signaltonoise(1000, 20) = 50
The ledger holds this as [fam_photometry](/theorem/fam_photometry) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((25 : Int) - (10 : Int))) = (15 : Int)) ∧ (((10000 : Int) / ((5 : Int) * (100 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((15 : Int) - (12 : Int))) = (3 : Int)) ∧ ((fmax (0 : Int) ((12 : Int) - (15 : Int))) = (0 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (15 : Int))) = (5 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (5 : Int))) = (15 : Int)) ∧ (((5 : Int) + (15 : Int)) = (20 : Int)) ∧ (((3 : Int) * (2 : Int)) = (6 : Int)) ∧ (((1000 : Int) / (20 : Int)) = (50 : Int))
```

### photosynthesis: lightefficiency(84, 100) = 84; carbonfixation(100, 3) = 300; oxygenrelease(1000) = 500; quantumyield(1, 8) = 12; grossproduction(50, 12) = 600; netproduction(600, 100) = 500; netproduction(100, 600) = 0; chlorophyll(1000, 4) = 250; assimilation(1000, 250) = 4
The ledger holds this as [fam_photosynthesis](/theorem/fam_photosynthesis) — proven `by decide`, sorry-free:

```lean
((((84 : Int) * (100 : Int)) / (100 : Int)) = (84 : Int)) ∧ (((100 : Int) * (3 : Int)) = (300 : Int)) ∧ (((1000 : Int) / (2 : Int)) = (500 : Int)) ∧ ((((1 : Int) * (100 : Int)) / (8 : Int)) = (12 : Int)) ∧ (((50 : Int) * (12 : Int)) = (600 : Int)) ∧ ((fmax (0 : Int) ((600 : Int) - (100 : Int))) = (500 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (600 : Int))) = (0 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((1000 : Int) / (250 : Int)) = (4 : Int))
```

### photovoltaic: power(12, 8) = 96; efficiency(220, 1000) = 22; irradiance(1000, 2) = 500; yield(300, 5) = 1500; array(10, 400) = 4000; fillfactor(80, 100) = 80; derate(1000, 20) = 800; derate(100, 150) = 0; payback(2000, 500) = 4
The ledger holds this as [fam_photovoltaic](/theorem/fam_photovoltaic) — proven `by decide`, sorry-free:

```lean
(((12 : Int) * (8 : Int)) = (96 : Int)) ∧ ((((220 : Int) * (100 : Int)) / (1000 : Int)) = (22 : Int)) ∧ (((1000 : Int) / (2 : Int)) = (500 : Int)) ∧ (((300 : Int) * (5 : Int)) = (1500 : Int)) ∧ (((10 : Int) * (400 : Int)) = (4000 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((1000 : Int) * (fmax (0 : Int) ((100 : Int) - (20 : Int)))) / (100 : Int)) = (800 : Int)) ∧ ((((100 : Int) * (fmax (0 : Int) ((100 : Int) - (150 : Int)))) / (100 : Int)) = (0 : Int)) ∧ ((-((-(2000 : Int)) / (500 : Int))) = (4 : Int))
```

### phycology: chlorophyll(500, 8) = 4000; biomass(1000, 5) = 5000; productivity(5000, 100) = 50; bloomdensity(100, 30) = 4; growthrate(1000, 1999) = 99; lipidcontent(300, 1000) = 30; turbidity(10000, 90) = 900; nutrientuptake(99, 95) = 1; nutrientuptake(90, 95) = 0
The ledger holds this as [fam_phycology](/theorem/fam_phycology) — proven `by decide`, sorry-free:

```lean
(((500 : Int) * (8 : Int)) = (4000 : Int)) ∧ (((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ ((-((-(100 : Int)) / (30 : Int))) = (4 : Int)) ∧ ((((fmax (0 : Int) ((1999 : Int) - (1000 : Int))) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ ((((10000 : Int) * (90 : Int)) / (1000 : Int)) = (900 : Int)) ∧ ((if (if (99 : Int) ≥ (95 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (90 : Int) ≥ (95 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int))
```

### physics: force(10, 5) = 50; momentum(10, 20) = 200; work(50, 3) = 150; power(150, 3) = 50; pressure(100, 4) = 25; density(1000, 10) = 100; energylevels(4) = 16; degreesoffreedom(3, 3) = 6
The ledger holds this as [fam_physics](/theorem/fam_physics) — proven `by decide`, sorry-free:

```lean
(((10 : Int) * (5 : Int)) = (50 : Int)) ∧ (((10 : Int) * (20 : Int)) = (200 : Int)) ∧ (((50 : Int) * (3 : Int)) = (150 : Int)) ∧ (((150 : Int) / (3 : Int)) = (50 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((3 : Int) + (3 : Int)) = (6 : Int))
```

### physiology: bmr(70, 24) = 1680; vo2(3500, 70) = 50; clearance(12, 10) = 120; gfr(1800, 20) = 90; osmolality(285, 1000) = 285; ph(74, 100) = 74; tidal(12, 500) = 6000; saturation(98, 100) = 98; saturation(5, 0) = 0
The ledger holds this as [fam_physiology](/theorem/fam_physiology) — proven `by decide`, sorry-free:

```lean
(((70 : Int) * (24 : Int)) = (1680 : Int)) ∧ (((3500 : Int) / (70 : Int)) = (50 : Int)) ∧ (((12 : Int) * (10 : Int)) = (120 : Int)) ∧ (((1800 : Int) / (20 : Int)) = (90 : Int)) ∧ ((((285 : Int) * (1000 : Int)) / (1000 : Int)) = (285 : Int)) ∧ ((((74 : Int) * (100 : Int)) / (100 : Int)) = (74 : Int)) ∧ (((12 : Int) * (500 : Int)) = (6000 : Int)) ∧ ((((98 : Int) * (100 : Int)) / (100 : Int)) = (98 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int))
```

### physiotherapy: rom(90, 120) = 75; strength(100, 80) = 125; recovery(30, 50) = 60; endurance(100, 5) = 20; adherence(18, 20) = 90; pain(8, 3) = 5; gait(1000, 10) = 100; balance(9, 10) = 90
The ledger holds this as [fam_physiotherapy](/theorem/fam_physiotherapy) — proven `by decide`, sorry-free:

```lean
((((90 : Int) * (100 : Int)) / (120 : Int)) = (75 : Int)) ∧ ((((100 : Int) * (100 : Int)) / (80 : Int)) = (125 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (50 : Int)) = (60 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (20 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((8 : Int) - (3 : Int))) = (5 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int))
```

### pickling: acidity(4, 100) = 4; brineratio(5, 100) = 5; phlevel(38, 10) = 3; fermentdays(2, 7) = 14; saltpercent(5, 100) = 5; lacticacid(8, 100) = 8; shelflife(12, 30) = 360; crunchretention(80, 100) = 80
The ledger holds this as [fam_pickling](/theorem/fam_pickling) — proven `by decide`, sorry-free:

```lean
((((4 : Int) * (100 : Int)) / (100 : Int)) = (4 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((38 : Int) / (10 : Int)) = (3 : Int)) ∧ (((2 : Int) * (7 : Int)) = (14 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (100 : Int)) = (8 : Int)) ∧ (((12 : Int) * (30 : Int)) = (360 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### pid: proportional(5, 30) = 150; integral(2, 40) = 80; derivative(3, 10) = 30; output(60, 12, 5) = 77; ziegler(50, 10) = 6; tuning(60, 5) = 12; windup(500, 300) = 300; setpoint(100, 70) = 30; setpoint(70, 100) = 0
The ledger holds this as [fam_pid](/theorem/fam_pid) — proven `by decide`, sorry-free:

```lean
(((5 : Int) * (30 : Int)) = (150 : Int)) ∧ (((2 : Int) * (40 : Int)) = (80 : Int)) ∧ (((3 : Int) * (10 : Int)) = (30 : Int)) ∧ ((((60 : Int) + (12 : Int)) + (5 : Int)) = (77 : Int)) ∧ ((((6 : Int) * (50 : Int)) / ((5 : Int) * (10 : Int))) = (6 : Int)) ∧ (((60 : Int) / (5 : Int)) = (12 : Int)) ∧ ((fmin (500 : Int) (300 : Int)) = (300 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (70 : Int))) = (30 : Int)) ∧ ((fmax (0 : Int) ((70 : Int) - (100 : Int))) = (0 : Int))
```

### piezoelectric: charge(50, 20) = 1000; voltage(1000, 10) = 100; chargeconstant(1000, 50) = 20; resonantfrequency(4000, 2) = 1000; couplingfactor(49, 100) = 49; couplingfactor(0, 100) = 0; capacitance(12, 100, 6) = 200; displacement(100, 20) = 2000; energyharvest(1000, 100) = 50000
The ledger holds this as [fam_piezoelectric](/theorem/fam_piezoelectric) — proven `by decide`, sorry-free:

```lean
(((20 : Int) * (50 : Int)) = (1000 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ (((4000 : Int) / ((2 : Int) * (2 : Int))) = (1000 : Int)) ∧ ((((49 : Int) * (100 : Int)) / (100 : Int)) = (49 : Int)) ∧ ((((0 : Int) * (100 : Int)) / (100 : Int)) = (0 : Int)) ∧ ((((12 : Int) * (100 : Int)) / (6 : Int)) = (200 : Int)) ∧ (((20 : Int) * (100 : Int)) = (2000 : Int)) ∧ ((((1000 : Int) * (100 : Int)) / (2 : Int)) = (50000 : Int))
```

### pilgrimage: stagecount(12, 2) = 14; routeorderings(6) = 720; stationpairs(14, 2) = 91; distance(20, 30) = 600; daysrequired(600, 20) = 30; waypointsubsets(5) = 32; groupsize(40, 1) = 40; restpoints(600, 50) = 12
The ledger holds this as [fam_pilgrimage](/theorem/fam_pilgrimage) — proven `by decide`, sorry-free:

```lean
(((12 : Int) + (2 : Int)) = (14 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (6 : Int)))) = (720 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (14 : Int)) (Int.toNat (2 : Int)))) = (91 : Int)) ∧ (((20 : Int) * (30 : Int)) = (600 : Int)) ∧ (((600 : Int) / (20 : Int)) = (30 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ (((40 : Int) * (1 : Int)) = (40 : Int)) ∧ (((600 : Int) / (50 : Int)) = (12 : Int))
```

### pipeline: duration(100, 340) = 240; duration(340, 100) = 0; bottleneck(60, 240) = 25; parallelism(20, 4) = 5; successrate(95, 100) = 95; queue(30, 4) = 7; cachehit(80, 100) = 80; throughput(120, 8) = 15
The ledger holds this as [fam_pipeline](/theorem/fam_pipeline) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((340 : Int) - (100 : Int))) = (240 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (340 : Int))) = (0 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (240 : Int)) = (25 : Int)) ∧ (((20 : Int) / (4 : Int)) = (5 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ (((30 : Int) / (4 : Int)) = (7 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((120 : Int) / (8 : Int)) = (15 : Int))
```

### piston: displacement(500, 4) = 2000; stroke(80, 1) = 80; bore(86, 1) = 86; compression(100, 10) = 10; force(1000, 5) = 5000; cycles(1000, 2) = 2000; rings(3, 0) = 3; combos(6, 2) = 15
The ledger holds this as [fam_piston](/theorem/fam_piston) — proven `by decide`, sorry-free:

```lean
(((500 : Int) * (4 : Int)) = (2000 : Int)) ∧ (((80 : Int) * (1 : Int)) = (80 : Int)) ∧ (((86 : Int) * (1 : Int)) = (86 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ (((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ (((1000 : Int) * (2 : Int)) = (2000 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### planet: orbit(365, 1) = 365; moons(2, 0) = 2; radius(6371, 1) = 6371; gravity(98, 10) = 9; axialtilt(90, 23) = 67; day(24, 1) = 24; rings(0, 1) = 1; combos(8, 2) = 28
The ledger holds this as [fam_planet](/theorem/fam_planet) — proven `by decide`, sorry-free:

```lean
(((365 : Int) * (1 : Int)) = (365 : Int)) ∧ (((2 : Int) + (0 : Int)) = (2 : Int)) ∧ (((6371 : Int) * (1 : Int)) = (6371 : Int)) ∧ (((98 : Int) / (10 : Int)) = (9 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (23 : Int))) = (67 : Int)) ∧ (((24 : Int) / (1 : Int)) = (24 : Int)) ∧ (((0 : Int) + (1 : Int)) = (1 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int))
```

### planetology: gravity(1000, 10) = 10; escapevelocity(1000, 10) = 100; density(5000, 100) = 50; albedo(30, 100) = 30; insolation(4000, 20) = 10; roche(100, 2) = 200; hillsphere(1000, 10) = 100; equilibrium(1000, 30) = 700
The ledger holds this as [fam_planetology](/theorem/fam_planetology) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / ((10 : Int) ^ (2 : Nat))) = (10 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((4000 : Int) / ((20 : Int) ^ (2 : Nat))) = (10 : Int)) ∧ (((100 : Int) * (2 : Int)) = (200 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((((1000 : Int) * ((100 : Int) - (30 : Int))) / (100 : Int)) = (700 : Int))
```

### plasma: temperature(1000, 40) = 25; density(1000, 10) = 100; debye(1000, 10) = 100; confinement(1000, 20) = 50; ionization(99, 100) = 99; fusion(1000, 100) = 1000; magnetic(1000, 50) = 20; frequency(100, 3) = 300; bytes(64) = 8; hue(3, 64) = 16; hue(0, 64) = 0; near(3, 3) = 1
The ledger holds this as [fam_plasma](/theorem/fam_plasma) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (40 : Int)) = (25 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((1000 : Int) / (20 : Int)) = (50 : Int)) ∧ ((((99 : Int) * (100 : Int)) / (100 : Int)) = (99 : Int)) ∧ ((((1000 : Int) * (100 : Int)) / (100 : Int)) = (1000 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ (((100 : Int) * (3 : Int)) = (300 : Int)) ∧ (((64 : Int) / (8 : Int)) = (8 : Int)) ∧ ((((3 : Int) * (360 : Int)) / (64 : Int)) = (16 : Int)) ∧ ((((0 : Int) * (360 : Int)) / (64 : Int)) = (0 : Int)) ∧ ((if (if (3 : Int) ≤ (3 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int))
```

### platonic: euler(8, 12, 6) = 2
The ledger holds this as [fam_platonic](/theorem/fam_platonic) — proven `by decide`, sorry-free:

```lean
((((8 : Int) - (12 : Int)) + (6 : Int)) = (2 : Int))
```

### podcasting: downloads(50, 2000) = 100000; completion(27, 30) = 90; retention(600, 1000) = 60; cadence(52, 52) = 1; adload(90, 60) = 150; bitrate(9600000, 60) = 160000; rank(50000, 10000) = 5; growth(1200, 1000) = 200; growth(900, 1000) = 0
The ledger holds this as [fam_podcasting](/theorem/fam_podcasting) — proven `by decide`, sorry-free:

```lean
(((50 : Int) * (2000 : Int)) = (100000 : Int)) ∧ ((((27 : Int) * (100 : Int)) / (30 : Int)) = (90 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (1000 : Int)) = (60 : Int)) ∧ (((52 : Int) / (52 : Int)) = (1 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (60 : Int)) = (150 : Int)) ∧ (((9600000 : Int) / (60 : Int)) = (160000 : Int)) ∧ (((50000 : Int) / (10000 : Int)) = (5 : Int)) ∧ ((fmax (0 : Int) ((1200 : Int) - (1000 : Int))) = (200 : Int)) ∧ ((fmax (0 : Int) ((900 : Int) - (1000 : Int))) = (0 : Int))
```

### podiatry: arch(24, 100) = 24; pressure(600, 30) = 20; gait(120, 2) = 60; healing(75, 100) = 75; balance(18, 20) = 90; stride(1500, 1000) = 1
The ledger holds this as [fam_podiatry](/theorem/fam_podiatry) — proven `by decide`, sorry-free:

```lean
((((24 : Int) * (100 : Int)) / (100 : Int)) = (24 : Int)) ∧ (((600 : Int) / (30 : Int)) = (20 : Int)) ∧ (((120 : Int) / (2 : Int)) = (60 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (20 : Int)) = (90 : Int)) ∧ (((1500 : Int) / (1000 : Int)) = (1 : Int))
```

### poker: potodds(90, 10) = 10; outs(9, 2) = 7; equity(9, 2) = 36; expectedvalue(50, 200, 100) = 50; impliedodds(90, 10, 100) = 5; fold(1, 4) = 75; stackratio(1000, 100) = 10; rake(200, 5) = 10
The ledger holds this as [fam_poker](/theorem/fam_poker) — proven `by decide`, sorry-free:

```lean
((((10 : Int) * (100 : Int)) / ((90 : Int) + (10 : Int))) = (10 : Int)) ∧ ((fmax (0 : Int) ((9 : Int) - (2 : Int))) = (7 : Int)) ∧ ((((9 : Int) * (2 : Int)) * (2 : Int)) = (36 : Int)) ∧ (((fmax (0 : Int) (((50 : Int) * (200 : Int)) - (((100 : Int) - (50 : Int)) * (100 : Int)))) / (100 : Int)) = (50 : Int)) ∧ ((((10 : Int) * (100 : Int)) / (((90 : Int) + (10 : Int)) + (100 : Int))) = (5 : Int)) ∧ ((((fmax (0 : Int) ((4 : Int) - (1 : Int))) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ (((1000 : Int) / (100 : Int)) = (10 : Int)) ∧ ((((200 : Int) * (5 : Int)) / (100 : Int)) = (10 : Int))
```

### policy: costbenefit(300, 100) = 300; impact(250, 1000) = 25; adoption(30, 40) = 75; compliance(80, 100) = 80; efficiency(1000, 25) = 40; reach(450, 600) = 75; lag(10, 90) = 80; lag(90, 10) = 0; equity(1000, 4) = 250
The ledger holds this as [fam_policy](/theorem/fam_policy) — proven `by decide`, sorry-free:

```lean
((((300 : Int) * (100 : Int)) / (100 : Int)) = (300 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (40 : Int)) = (75 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((1000 : Int) / (25 : Int)) = (40 : Int)) ∧ ((((450 : Int) * (100 : Int)) / (600 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (10 : Int))) = (80 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (90 : Int))) = (0 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int))
```

### pollination: fruitset(45, 60) = 75; visitationrate(600, 5) = 120; pollenviability(900, 1000) = 90; hivedensity(120, 4) = 30; seedset(200, 15) = 3000; crosspollination(12, 8) = 96; foragerange(15, 40) = 600; yielddependence(1000, 75) = 750
The ledger holds this as [fam_pollination](/theorem/fam_pollination) — proven `by decide`, sorry-free:

```lean
((((45 : Int) * (100 : Int)) / (60 : Int)) = (75 : Int)) ∧ (((600 : Int) / (5 : Int)) = (120 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ (((120 : Int) / (4 : Int)) = (30 : Int)) ∧ (((200 : Int) * (15 : Int)) = (3000 : Int)) ∧ (((12 : Int) * (8 : Int)) = (96 : Int)) ∧ (((15 : Int) * (40 : Int)) = (600 : Int)) ∧ ((((1000 : Int) * (75 : Int)) / (100 : Int)) = (750 : Int))
```

### polygon: interioranglesum(5) = 540; diagonals(6) = 9; exteriorangle(8) = 45; interiorangle(6) = 120; triangles(5) = 3; perimeter(4, 5) = 20; area(10, 4) = 20
The ledger holds this as [fam_polygon](/theorem/fam_polygon) — proven `by decide`, sorry-free:

```lean
((((5 : Int) - (2 : Int)) * (180 : Int)) = (540 : Int)) ∧ ((((6 : Int) * ((6 : Int) - (3 : Int))) / (2 : Int)) = (9 : Int)) ∧ (((360 : Int) / (8 : Int)) = (45 : Int)) ∧ (((((6 : Int) - (2 : Int)) * (180 : Int)) / (6 : Int)) = (120 : Int)) ∧ (((5 : Int) - (2 : Int)) = (3 : Int)) ∧ (((4 : Int) * (5 : Int)) = (20 : Int)) ∧ ((((10 : Int) * (4 : Int)) / (2 : Int)) = (20 : Int))
```

### polyhedron: eulercharacteristic(8, 12, 6) = 2; edges(6, 4) = 12; vertices(12, 6) = 8; faces(8, 12) = 6; facesatvertex(12, 8) = 3; surfacearea(6, 4) = 24; volume(2, 3, 4) = 24
The ledger holds this as [fam_polyhedron](/theorem/fam_polyhedron) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) (((8 : Int) - (12 : Int)) + (6 : Int))) = (2 : Int)) ∧ ((((6 : Int) * (4 : Int)) / (2 : Int)) = (12 : Int)) ∧ ((fmax (0 : Int) (((12 : Int) - (6 : Int)) + (2 : Int))) = (8 : Int)) ∧ ((fmax (0 : Int) (((12 : Int) - (8 : Int)) + (2 : Int))) = (6 : Int)) ∧ ((((2 : Int) * (12 : Int)) / (8 : Int)) = (3 : Int)) ∧ (((6 : Int) * (4 : Int)) = (24 : Int)) ∧ ((((2 : Int) * (3 : Int)) * (4 : Int)) = (24 : Int))
```

### polymer: chains(1000, 100) = 100000; molweight(100, 50) = 5000; monomers(500, 2) = 1000; crosslinks(1000, 10) = 100; tg(200, 100) = 100; degree(10000, 100) = 100; branches(4, 0) = 4; combos(6, 2) = 15
The ledger holds this as [fam_polymer](/theorem/fam_polymer) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) * (100 : Int)) = (100000 : Int)) ∧ (((100 : Int) * (50 : Int)) = (5000 : Int)) ∧ (((500 : Int) * (2 : Int)) = (1000 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (100 : Int))) = (100 : Int)) ∧ (((10000 : Int) / (100 : Int)) = (100 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### polymers: degreeofpolymerization(28000, 28) = 1000; molecularweight(1000, 28) = 28000; crystallinity(65, 100) = 65; glasstransition(378, 60000, 1000) = 318; tensilestrength(5000, 100) = 50; elongation(150, 100) = 150; crosslink(50000, 25) = 2000; viscosity(250, 100) = 250
The ledger holds this as [fam_polymers](/theorem/fam_polymers) — proven `by decide`, sorry-free:

```lean
(((28000 : Int) / (28 : Int)) = (1000 : Int)) ∧ (((1000 : Int) * (28 : Int)) = (28000 : Int)) ∧ ((((65 : Int) * (100 : Int)) / (100 : Int)) = (65 : Int)) ∧ ((fmax (0 : Int) ((378 : Int) - ((60000 : Int) / (1000 : Int)))) = (318 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (100 : Int)) = (150 : Int)) ∧ (((50000 : Int) / (25 : Int)) = (2000 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (100 : Int)) = (250 : Int))
```

### polyphony: voicecount(4, 3) = 12; maxpolyphony(8, 16) = 16; independenceindex(3, 4) = 75; densityratio(7, 10) = 70; overlapcount(12, 5) = 7; textureindex(24, 4) = 6; activevoices(16, 4) = 12
The ledger holds this as [fam_polyphony](/theorem/fam_polyphony) — proven `by decide`, sorry-free:

```lean
(((4 : Int) * (3 : Int)) = (12 : Int)) ∧ ((fmax (8 : Int) (16 : Int)) = (16 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ ((((7 : Int) * (100 : Int)) / (10 : Int)) = (70 : Int)) ∧ ((fmax (0 : Int) ((12 : Int) - (5 : Int))) = (7 : Int)) ∧ (((24 : Int) / (4 : Int)) = (6 : Int)) ∧ ((fmax (0 : Int) ((16 : Int) - (4 : Int))) = (12 : Int))
```

### pomology: yield(200, 150) = 30000; brix(13, 100) = 13; fruitset(300, 1000) = 30; thinning(500, 300) = 200; thinning(100, 200) = 0; caliper(700, 10) = 70; firmness(1000, 20) = 50; harvestindex(450, 1000) = 45; treedensity(10000, 25) = 400
The ledger holds this as [fam_pomology](/theorem/fam_pomology) — proven `by decide`, sorry-free:

```lean
(((200 : Int) * (150 : Int)) = (30000 : Int)) ∧ ((((13 : Int) * (100 : Int)) / (100 : Int)) = (13 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (300 : Int))) = (200 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (200 : Int))) = (0 : Int)) ∧ (((700 : Int) / (10 : Int)) = (70 : Int)) ∧ (((1000 : Int) / (20 : Int)) = (50 : Int)) ∧ ((((450 : Int) * (100 : Int)) / (1000 : Int)) = (45 : Int)) ∧ (((10000 : Int) / (25 : Int)) = (400 : Int))
```

### port: align(1, 4) = 4; align(8, 4) = 8; pad(1, 8) = 7
The ledger holds this as [fam_port](/theorem/fam_port) — proven `by decide`, sorry-free:

```lean
(((-((-(1 : Int)) / (4 : Int))) * (4 : Int)) = (4 : Int)) ∧ (((-((-(8 : Int)) / (4 : Int))) * (4 : Int)) = (8 : Int)) ∧ ((((-((-(1 : Int)) / (8 : Int))) * (8 : Int)) - (1 : Int)) = (7 : Int))
```

### portfolio: allocation(60, 40) = 60; beta(120, 100) = 120; diversification(30, 10) = 3; drawdown(1000, 800) = 20; income(50, 1000) = 5; rebalance(15, 5) = 10; rebalance(3, 5) = 0; sharpe(200, 100) = 200; weight(25, 100) = 25
The ledger holds this as [fam_portfolio](/theorem/fam_portfolio) — proven `by decide`, sorry-free:

```lean
((((60 : Int) * (100 : Int)) / ((60 : Int) + (40 : Int))) = (60 : Int)) ∧ ((((120 : Int) * (100 : Int)) / (100 : Int)) = (120 : Int)) ∧ (((30 : Int) / (10 : Int)) = (3 : Int)) ∧ (((((1000 : Int) - (800 : Int)) * (100 : Int)) / (1000 : Int)) = (20 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((fmax (0 : Int) ((15 : Int) - (5 : Int))) = (10 : Int)) ∧ ((fmax (0 : Int) ((3 : Int) - (5 : Int))) = (0 : Int)) ∧ ((((200 : Int) * (100 : Int)) / (100 : Int)) = (200 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int))
```

### poultry: laying(900, 1000) = 90; hatchability(85, 100) = 85; feedconversion(2000, 1000) = 2; mortality(5, 1000) = 0; density(1200, 100) = 12; dressing(70, 100) = 70; eggmass(1000, 60) = 60000; uniformity(950, 1000) = 95
The ledger holds this as [fam_poultry](/theorem/fam_poultry) — proven `by decide`, sorry-free:

```lean
((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ (((2000 : Int) / (1000 : Int)) = (2 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (1000 : Int)) = (0 : Int)) ∧ (((1200 : Int) / (100 : Int)) = (12 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ (((1000 : Int) * (60 : Int)) = (60000 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int))
```

### powerfactor: ratio(80, 100) = 80; realpower(100, 8) = 800; apparentpower(100, 10) = 1000; reactivepower(1000, 800) = 200; correction(100, 80) = 20; phaseangle(900, 10) = 90; capacitorkvar(600, 10) = 60; efficiency(95, 100) = 95
The ledger holds this as [fam_powerfactor](/theorem/fam_powerfactor) — proven `by decide`, sorry-free:

```lean
((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((100 : Int) * (8 : Int)) = (800 : Int)) ∧ (((100 : Int) * (10 : Int)) = (1000 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (800 : Int))) = (200 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (80 : Int))) = (20 : Int)) ∧ (((900 : Int) / (10 : Int)) = (90 : Int)) ∧ (((600 : Int) / (10 : Int)) = (60 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int))
```

### pragmatics: implicature(30, 40) = 75; deixis(10, 3) = 3; politeness(8, 10) = 80; relevance(9, 10) = 90; turntaking(100, 4) = 25; speechact(45, 50) = 90; presupposition(12, 4) = 3; cooperation(3, 4) = 75
The ledger holds this as [fam_pragmatics](/theorem/fam_pragmatics) — proven `by decide`, sorry-free:

```lean
((((30 : Int) * (100 : Int)) / (40 : Int)) = (75 : Int)) ∧ (((10 : Int) / (3 : Int)) = (3 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ (((12 : Int) / (4 : Int)) = (3 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int))
```

### precipitation: intensity(50, 5) = 10; runoff(200, 75) = 150; accumulation(12, 6) = 72; returnperiod(100, 4) = 25; snowratio(130, 10) = 13; catchmentyield(500, 20) = 10000; raindepth(10000, 500) = 20; infiltration(200, 150) = 50; infiltration(50, 100) = 0
The ledger holds this as [fam_precipitation](/theorem/fam_precipitation) — proven `by decide`, sorry-free:

```lean
(((50 : Int) / (5 : Int)) = (10 : Int)) ∧ ((((200 : Int) * (75 : Int)) / (100 : Int)) = (150 : Int)) ∧ (((12 : Int) * (6 : Int)) = (72 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((130 : Int) / (10 : Int)) = (13 : Int)) ∧ (((500 : Int) * (20 : Int)) = (10000 : Int)) ∧ (((10000 : Int) / (500 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (150 : Int))) = (50 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (100 : Int))) = (0 : Int))
```

### premium: gross(1000, 20) = 1200; net(1200, 15) = 1020; rate(5000, 100) = 50; pure(8000, 200) = 40; expense(1000, 25) = 250; profit(1000, 600, 250) = 150; installment(1200, 12) = 100; earned(1200, 6, 12) = 600
The ledger holds this as [fam_premium](/theorem/fam_premium) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) + (((1000 : Int) * (20 : Int)) / (100 : Int))) = (1200 : Int)) ∧ ((fmax (0 : Int) ((1200 : Int) - (((1200 : Int) * (15 : Int)) / (100 : Int)))) = (1020 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ (((8000 : Int) / (200 : Int)) = (40 : Int)) ∧ ((((1000 : Int) * (25 : Int)) / (100 : Int)) = (250 : Int)) ∧ ((fmax (0 : Int) (((1000 : Int) - (600 : Int)) - (250 : Int))) = (150 : Int)) ∧ ((-((-(1200 : Int)) / (12 : Int))) = (100 : Int)) ∧ ((((1200 : Int) * (6 : Int)) / (12 : Int)) = (600 : Int))
```

### preservation: shelflifedays(30, 12) = 360; wateractivity(85, 100) = 85; phlevel(42, 10) = 4; saltpct(5, 100) = 5; methodsubsets(5) = 32; microbialreduction(99, 100) = 99; temperaturec(25, 4) = 21; spoilagerate(2, 100) = 2
The ledger holds this as [fam_preservation](/theorem/fam_preservation) — proven `by decide`, sorry-free:

```lean
(((30 : Int) * (12 : Int)) = (360 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ (((42 : Int) / (10 : Int)) = (4 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((((99 : Int) * (100 : Int)) / (100 : Int)) = (99 : Int)) ∧ ((fmax (0 : Int) ((25 : Int) - (4 : Int))) = (21 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int))
```

### prevalence: adjustedrate(150, 120, 100) = 125; burden(1200, 20) = 24000; caseload(500, 60000) = 300; confidencewidth(520, 480) = 40; confidencewidth(480, 520) = 0; lifetimeprevalence(2500, 10000) = 25; periodprevalence(300, 200, 50000) = 1000; pointprevalence(50, 20000) = 250; ratio(40, 25) = 160
The ledger holds this as [fam_prevalence](/theorem/fam_prevalence) — proven `by decide`, sorry-free:

```lean
((((150 : Int) * (100 : Int)) / (120 : Int)) = (125 : Int)) ∧ (((1200 : Int) * (20 : Int)) = (24000 : Int)) ∧ ((((500 : Int) * (60000 : Int)) / (100000 : Int)) = (300 : Int)) ∧ ((fmax (0 : Int) ((520 : Int) - (480 : Int))) = (40 : Int)) ∧ ((fmax (0 : Int) ((480 : Int) - (520 : Int))) = (0 : Int)) ∧ ((((2500 : Int) * (100 : Int)) / (10000 : Int)) = (25 : Int)) ∧ (((((300 : Int) + (200 : Int)) * (100000 : Int)) / (50000 : Int)) = (1000 : Int)) ∧ ((((50 : Int) * (100000 : Int)) / (20000 : Int)) = (250 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (25 : Int)) = (160 : Int))
```

### pricing: annual(50, 12) = 600; arr(1000, 12) = 12000; discount(200, 15) = 30; mrr(100, 50) = 5000; savings(50, 500) = 100; savings(40, 600) = 0; seats(10, 25) = 250; tier(12, 3) = 4; upgrade(50, 90) = 40; upgrade(90, 50) = 0
The ledger holds this as [fam_pricing](/theorem/fam_pricing) — proven `by decide`, sorry-free:

```lean
(((50 : Int) * (12 : Int)) = (600 : Int)) ∧ (((1000 : Int) * (12 : Int)) = (12000 : Int)) ∧ ((((200 : Int) * (15 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((100 : Int) * (50 : Int)) = (5000 : Int)) ∧ ((fmax (0 : Int) (((50 : Int) * (12 : Int)) - (500 : Int))) = (100 : Int)) ∧ ((fmax (0 : Int) (((40 : Int) * (12 : Int)) - (600 : Int))) = (0 : Int)) ∧ (((10 : Int) * (25 : Int)) = (250 : Int)) ∧ (((12 : Int) / (3 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (50 : Int))) = (40 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (90 : Int))) = (0 : Int))
```

### primatology: encephalization(1200, 60) = 20000; troop(100, 8) = 12; grooming(500, 20) = 25; dominance(7, 10) = 70; foraging(2000, 8) = 250; kinship(5, 20) = 25; tooluse(15, 30) = 50
The ledger holds this as [fam_primatology](/theorem/fam_primatology) — proven `by decide`, sorry-free:

```lean
((((1200 : Int) * (1000 : Int)) / (60 : Int)) = (20000 : Int)) ∧ (((100 : Int) / (8 : Int)) = (12 : Int)) ∧ (((500 : Int) / (20 : Int)) = (25 : Int)) ∧ ((((7 : Int) * (100 : Int)) / (10 : Int)) = (70 : Int)) ∧ (((2000 : Int) / (8 : Int)) = (250 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (20 : Int)) = (25 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (30 : Int)) = (50 : Int))
```

### prime: gaps(13, 11) = 2; count(100, 4) = 25; product(7, 13) = 91; totient(91, 20) = 71; factors(2, 0) = 2; sieve(100, 2) = 50; twins(100, 10) = 10; combos(6, 2) = 15
The ledger holds this as [fam_prime](/theorem/fam_prime) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((13 : Int) - (11 : Int))) = (2 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((7 : Int) * (13 : Int)) = (91 : Int)) ∧ ((fmax (0 : Int) ((91 : Int) - (20 : Int))) = (71 : Int)) ∧ (((2 : Int) + (0 : Int)) = (2 : Int)) ∧ (((100 : Int) / (2 : Int)) = (50 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### printmaking: editionsize(50, 1) = 50; platepasses(4, 2) = 6; registrationlayers(4, 0) = 4; inkcombos(8, 2) = 28; impressionorderings(4) = 24; pressuresetting(100, 4) = 25; colorsubsets(5) = 32; yieldratio(90, 100) = 90
The ledger holds this as [fam_printmaking](/theorem/fam_printmaking) — proven `by decide`, sorry-free:

```lean
(((50 : Int) * (1 : Int)) = (50 : Int)) ∧ (((4 : Int) + (2 : Int)) = (6 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int))
```

### probability: odds(1, 4) = 25; conditional(30, 60) = 50; expected(200, 25) = 50; bayes(40, 50) = 20; combinations(5, 2) = 10; variance(400, 10) = 40; independence(30, 60) = 50
The ledger holds this as [fam_probability](/theorem/fam_probability) — proven `by decide`, sorry-free:

```lean
((((1 : Int) * (100 : Int)) / (4 : Int)) = (25 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (60 : Int)) = (50 : Int)) ∧ ((((200 : Int) * (25 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((((40 : Int) * (50 : Int)) / (100 : Int)) = (20 : Int)) ∧ (((5 : Int) * (2 : Int)) = (10 : Int)) ∧ (((400 : Int) / (10 : Int)) = (40 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (60 : Int)) = (50 : Int))
```

### procurement: savings(100, 70) = 30; savings(70, 100) = 0; spend(100, 5) = 500; compliance(90, 100) = 90; leadtime(3, 10) = 7; eoq(1000, 50) = 20; supplier(95, 100) = 95; discount(1000, 10) = 100; quality(990, 1000) = 99
The ledger holds this as [fam_procurement](/theorem/fam_procurement) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((100 : Int) - (70 : Int))) = (30 : Int)) ∧ ((fmax (0 : Int) ((70 : Int) - (100 : Int))) = (0 : Int)) ∧ (((100 : Int) * (5 : Int)) = (500 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (3 : Int))) = (7 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((((1000 : Int) * (10 : Int)) / (100 : Int)) = (100 : Int)) ∧ ((((990 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int))
```

### profiling: hotspot(30, 120) = 25; throughput(6000, 60) = 100; allocation(10000, 500) = 20; speedup(300, 100) = 300; overhead(120, 100) = 20; cachehit(950, 1000) = 95; flamegraph(640, 8) = 80; gc(3, 1000) = 3
The ledger holds this as [fam_profiling](/theorem/fam_profiling) — proven `by decide`, sorry-free:

```lean
((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((10000 : Int) / (500 : Int)) = (20 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (100 : Int)) = (300 : Int)) ∧ (((((120 : Int) - (100 : Int)) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ (((640 : Int) / (8 : Int)) = (80 : Int)) ∧ ((((3 : Int) * (1000 : Int)) / (1000 : Int)) = (3 : Int))
```

### project: progress(75, 100) = 75; budget(600, 1000) = 60; schedule(30, 90) = 33; velocity(120, 4) = 30; risk(3, 20) = 15; burndown(40, 100) = 40; milestone(5, 8) = 62; overrun(14, 10) = 4; overrun(8, 10) = 0
The ledger holds this as [fam_project](/theorem/fam_project) — proven `by decide`, sorry-free:

```lean
((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (1000 : Int)) = (60 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (90 : Int)) = (33 : Int)) ∧ (((120 : Int) / (4 : Int)) = (30 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (20 : Int)) = (15 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (8 : Int)) = (62 : Int)) ∧ ((fmax (0 : Int) ((14 : Int) - (10 : Int))) = (4 : Int)) ∧ ((fmax (0 : Int) ((8 : Int) - (10 : Int))) = (0 : Int))
```

### projectile: range(50, 4) = 200; height(500, 10) = 50; time(100, 10) = 10; velocity(20, 3) = 60; angle(90, 45) = 45; impact(30, 2) = 60; arc(45, 45) = 90; combos(6, 2) = 15
The ledger holds this as [fam_projectile](/theorem/fam_projectile) — proven `by decide`, sorry-free:

```lean
(((50 : Int) * (4 : Int)) = (200 : Int)) ∧ (((500 : Int) / (10 : Int)) = (50 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ (((20 : Int) * (3 : Int)) = (60 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (45 : Int))) = (45 : Int)) ∧ (((30 : Int) * (2 : Int)) = (60 : Int)) ∧ (((45 : Int) + (45 : Int)) = (90 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### promotion: discount(1000, 25) = 250; redemption(150, 1000) = 15; lift(1500, 1000) = 50; coupon(5, 2000) = 10000; bundle(1200, 999) = 201; markdown(80, 60) = 25; spiff(40, 25) = 1000; incremental(500, 320) = 180; bundle(900, 1200) = 0
The ledger holds this as [fam_promotion](/theorem/fam_promotion) — proven `by decide`, sorry-free:

```lean
((((1000 : Int) * (25 : Int)) / (100 : Int)) = (250 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (1000 : Int)) = (15 : Int)) ∧ ((((fmax (0 : Int) ((1500 : Int) - (1000 : Int))) * (100 : Int)) / (1000 : Int)) = (50 : Int)) ∧ (((5 : Int) * (2000 : Int)) = (10000 : Int)) ∧ ((fmax (0 : Int) ((1200 : Int) - (999 : Int))) = (201 : Int)) ∧ (((((80 : Int) - (60 : Int)) * (100 : Int)) / (80 : Int)) = (25 : Int)) ∧ (((40 : Int) * (25 : Int)) = (1000 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (320 : Int))) = (180 : Int)) ∧ ((fmax (0 : Int) ((900 : Int) - (1200 : Int))) = (0 : Int))
```

### proof: steps(10, 5) = 15; lemmas(8, 2) = 16; caseorderings(4) = 24; dependencypairs(10, 2) = 45; branchsubsets(5) = 32; qed(100, 100) = 100; axiomsused(5, 3) = 8; inferencepaths(6, 3) = 120
The ledger holds this as [fam_proof](/theorem/fam_proof) — proven `by decide`, sorry-free:

```lean
(((10 : Int) + (5 : Int)) = (15 : Int)) ∧ (((8 : Int) * (2 : Int)) = (16 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((((100 : Int) * (100 : Int)) / (100 : Int)) = (100 : Int)) ∧ (((5 : Int) + (3 : Int)) = (8 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (6 : Int)))) / (Int.ofNat (ffact (Int.toNat ((6 : Int) - (3 : Int)))))) = (120 : Int))
```

### proofing: prooftime(180, 2) = 90; volumegain(180, 100) = 180; temperaturefactor(27, 3) = 9; humiditylevel(75, 100) = 75; fermentationdegree(90, 100) = 90; overproofrisk(200, 180) = 20; doughtemp(24, 3) = 27; yeastdose(1000, 100) = 10
The ledger holds this as [fam_proofing](/theorem/fam_proofing) — proven `by decide`, sorry-free:

```lean
(((180 : Int) / (2 : Int)) = (90 : Int)) ∧ ((((180 : Int) * (100 : Int)) / (100 : Int)) = (180 : Int)) ∧ (((27 : Int) / (3 : Int)) = (9 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (180 : Int))) = (20 : Int)) ∧ (((24 : Int) + (3 : Int)) = (27 : Int)) ∧ (((1000 : Int) / (100 : Int)) = (10 : Int))
```

### property: ltv(80000, 100000) = 80; cap(12000, 200000) = 6; mortgage(10000, 5, 10) = 15000; payment(12000, 12) = 1000; stampduty(50000, 3) = 1500; equity(40000, 25000) = 15000; afford(40000, 4) = 160000; appreciation(50000, 10) = 5000
The ledger holds this as [fam_property](/theorem/fam_property) — proven `by decide`, sorry-free:

```lean
((((80000 : Int) * (100 : Int)) / (100000 : Int)) = (80 : Int)) ∧ ((((12000 : Int) * (100 : Int)) / (200000 : Int)) = (6 : Int)) ∧ (((10000 : Int) + ((((10000 : Int) * (5 : Int)) * (10 : Int)) / (100 : Int))) = (15000 : Int)) ∧ (((12000 : Int) / (12 : Int)) = (1000 : Int)) ∧ ((((50000 : Int) * (3 : Int)) / (100 : Int)) = (1500 : Int)) ∧ ((fmax (0 : Int) ((40000 : Int) - (25000 : Int))) = (15000 : Int)) ∧ (((40000 : Int) * (4 : Int)) = (160000 : Int)) ∧ ((((50000 : Int) * (10 : Int)) / (100 : Int)) = (5000 : Int))
```

### prophecy: fulfillmentratio(8, 10) = 80; symbolcount(7, 3) = 21; timecycles(7, 70) = 490; interpretationcombos(10, 3) = 120; numbersum(12, 12, 12) = 36; sequencepaths(6, 2) = 30; subsetreadings(5) = 32; intervalspan(490, 70) = 420
The ledger holds this as [fam_prophecy](/theorem/fam_prophecy) — proven `by decide`, sorry-free:

```lean
((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ (((7 : Int) * (3 : Int)) = (21 : Int)) ∧ (((7 : Int) * (70 : Int)) = (490 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (3 : Int)))) = (120 : Int)) ∧ ((((12 : Int) + (12 : Int)) + (12 : Int)) = (36 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (6 : Int)))) / (Int.ofNat (ffact (Int.toNat ((6 : Int) - (2 : Int)))))) = (30 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((fmax (0 : Int) ((490 : Int) - (70 : Int))) = (420 : Int))
```

### propulsion: thrust(300, 20) = 6000; efficiency(80, 100) = 80; specificfuel(5, 1000) = 5; bypass(900, 100) = 900; compression(4000, 100) = 4000; power(500, 20) = 10000; massflow(12, 300) = 3600
The ledger holds this as [fam_propulsion](/theorem/fam_propulsion) — proven `by decide`, sorry-free:

```lean
(((300 : Int) * (20 : Int)) = (6000 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((5 : Int) * (1000 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (100 : Int)) = (900 : Int)) ∧ ((((4000 : Int) * (100 : Int)) / (100 : Int)) = (4000 : Int)) ∧ (((500 : Int) * (20 : Int)) = (10000 : Int)) ∧ (((12 : Int) * (300 : Int)) = (3600 : Int))
```

### prosody: syllablecount(100, 2) = 200; stressratio(3, 4) = 75; speechrate(900, 6) = 150; pausecount(100, 7) = 15; pitchrange(300, 120) = 180; pitchrange(100, 150) = 0; meterfeet(10, 2) = 5; rhythmindex(30, 60) = 50; tempo(480, 4) = 120
The ledger holds this as [fam_prosody](/theorem/fam_prosody) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * (2 : Int)) = (200 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ (((900 : Int) / (6 : Int)) = (150 : Int)) ∧ ((-((-(100 : Int)) / (7 : Int))) = (15 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (120 : Int))) = (180 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (150 : Int))) = (0 : Int)) ∧ (((10 : Int) / (2 : Int)) = (5 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (60 : Int)) = (50 : Int)) ∧ (((480 : Int) / (4 : Int)) = (120 : Int))
```

### protein: residues(300, 1) = 300; mass(300, 110) = 33000; domains(3, 0) = 3; foldstates(5) = 32; bonds(299, 1) = 299; helices(8, 4) = 12; contacts(10, 2) = 45; combos(6, 2) = 15
The ledger holds this as [fam_protein](/theorem/fam_protein) — proven `by decide`, sorry-free:

```lean
(((300 : Int) * (1 : Int)) = (300 : Int)) ∧ (((300 : Int) * (110 : Int)) = (33000 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ (((299 : Int) * (1 : Int)) = (299 : Int)) ∧ (((8 : Int) + (4 : Int)) = (12 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### proteomics: abundance(25, 100) = 25; massspec(2400, 3) = 800; coverage(60, 200) = 30; foldchange(300, 100) = 300; digestion(18, 20) = 90; interaction(120, 40) = 3; expression(50000, 1000) = 50
The ledger holds this as [fam_proteomics](/theorem/fam_proteomics) — proven `by decide`, sorry-free:

```lean
((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int)) ∧ (((2400 : Int) / (3 : Int)) = (800 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (200 : Int)) = (30 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (100 : Int)) = (300 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (20 : Int)) = (90 : Int)) ∧ (((120 : Int) / (40 : Int)) = (3 : Int)) ∧ (((50000 : Int) / (1000 : Int)) = (50 : Int))
```

### protocol: layers(7, 0) = 7; states(4, 3) = 12; headers(20, 8) = 160; versions(3, 0) = 3; messages(16, 1) = 16; handshakes(3, 0) = 3; opcodes(4) = 16; combos(7, 2) = 21
The ledger holds this as [fam_protocol](/theorem/fam_protocol) — proven `by decide`, sorry-free:

```lean
(((7 : Int) + (0 : Int)) = (7 : Int)) ∧ (((4 : Int) * (3 : Int)) = (12 : Int)) ∧ (((20 : Int) * (8 : Int)) = (160 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((16 : Int) * (1 : Int)) = (16 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (7 : Int)) (Int.toNat (2 : Int)))) = (21 : Int))
```

### prototyping: fidelity(80, 100) = 80; iterations(12, 4) = 3; coverage(20, 5) = 4; feedback(45, 90) = 50; velocity(30, 6) = 5; reuse(30, 120) = 25; validation(90, 100) = 90; interactivity(15, 30) = 50
The ledger holds this as [fam_prototyping](/theorem/fam_prototyping) — proven `by decide`, sorry-free:

```lean
((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((12 : Int) / (4 : Int)) = (3 : Int)) ∧ (((20 : Int) / (5 : Int)) = (4 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (90 : Int)) = (50 : Int)) ∧ (((30 : Int) / (6 : Int)) = (5 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (30 : Int)) = (50 : Int))
```

### protozoology: cellcount(1000, 10) = 10000; divisionrate(8) = 256; motilitytypes(3, 1) = 4; cystcount(5000, 50) = 100; virulenceindex(70, 100) = 70; speciespairs(12, 2) = 66; generationtime(1440, 8) = 180; infectivity(60, 100) = 60
The ledger holds this as [fam_protozoology](/theorem/fam_protozoology) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) * (10 : Int)) = (10000 : Int)) ∧ (((2 : Int) ^ (8 : Nat)) = (256 : Int)) ∧ (((3 : Int) + (1 : Int)) = (4 : Int)) ∧ (((5000 : Int) / (50 : Int)) = (100 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((1440 : Int) / (8 : Int)) = (180 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int))
```

### psalmody: psalmcount(100, 50) = 150; versesum(150, 16) = 2400; acrosticletters(22, 0) = 22; toneorderings(8) = 40320; parallelismpairs(150, 2) = 11175; antiphonchoices(10, 2) = 90; meterfeet(4, 3) = 12; strophesubsets(5) = 32
The ledger holds this as [fam_psalmody](/theorem/fam_psalmody) — proven `by decide`, sorry-free:

```lean
(((100 : Int) + (50 : Int)) = (150 : Int)) ∧ (((150 : Int) * (16 : Int)) = (2400 : Int)) ∧ (((22 : Int) + (0 : Int)) = (22 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (8 : Int)))) = (40320 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (150 : Int)) (Int.toNat (2 : Int)))) = (11175 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (10 : Int)))) / (Int.ofNat (ffact (Int.toNat ((10 : Int) - (2 : Int)))))) = (90 : Int)) ∧ (((4 : Int) * (3 : Int)) = (12 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int))
```

### psu: watts(12, 50) = 600; efficiency(540, 600) = 90; headroom(850, 600) = 250; rails(4, 20) = 80; loadpercent(600, 850) = 70; dissipation(600, 540) = 60; current(600, 12) = 50; redundancy(3, 2) = 1; peak(600, 2) = 1200
The ledger holds this as [fam_psu](/theorem/fam_psu) — proven `by decide`, sorry-free:

```lean
(((12 : Int) * (50 : Int)) = (600 : Int)) ∧ ((((540 : Int) * (100 : Int)) / (600 : Int)) = (90 : Int)) ∧ (((850 : Int) - (600 : Int)) = (250 : Int)) ∧ (((4 : Int) * (20 : Int)) = (80 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (850 : Int)) = (70 : Int)) ∧ (((600 : Int) - (540 : Int)) = (60 : Int)) ∧ (((600 : Int) / (12 : Int)) = (50 : Int)) ∧ (((3 : Int) - (2 : Int)) = (1 : Int)) ∧ (((600 : Int) * (2 : Int)) = (1200 : Int))
```

### psych: competency(18, 15) = 1; competency(10, 15) = 0; risk(6, 4) = 10; insanity(3, 2, 4) = 1; insanity(1, 1, 4) = 0; malingering(5, 3) = 1; restoration(8, 6) = 1; recidivism(4, 3) = 12; dangerousness(5, 4) = 20
The ledger holds this as [fam_psych](/theorem/fam_psych) — proven `by decide`, sorry-free:

```lean
((if (if (18 : Int) ≥ (15 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (10 : Int) ≥ (15 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((6 : Int) + (4 : Int)) = (10 : Int)) ∧ ((if (if ((3 : Int) + (2 : Int)) ≥ (4 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if ((1 : Int) + (1 : Int)) ≥ (4 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (5 : Int) ≥ (3 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (8 : Int) ≥ (6 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ (((4 : Int) * (3 : Int)) = (12 : Int)) ∧ (((5 : Int) * (4 : Int)) = (20 : Int))
```

### psychiatry: severity(45, 100) = 45; remission(60, 200) = 30; relapse(20, 100) = 20; adherence(27, 30) = 90; response(20, 5) = 75; risk(3, 12) = 25; wellbeing(8, 3) = 5; wellbeing(3, 8) = 0
The ledger holds this as [fam_psychiatry](/theorem/fam_psychiatry) — proven `by decide`, sorry-free:

```lean
((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (200 : Int)) = (30 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ ((((27 : Int) * (100 : Int)) / (30 : Int)) = (90 : Int)) ∧ (((((20 : Int) - (5 : Int)) * (100 : Int)) / (20 : Int)) = (75 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (12 : Int)) = (25 : Int)) ∧ ((fmax (0 : Int) ((8 : Int) - (3 : Int))) = (5 : Int)) ∧ ((fmax (0 : Int) ((3 : Int) - (8 : Int))) = (0 : Int))
```

### psychology: iq(12, 10) = 120; correlation(80, 100) = 80; reliability(90, 100) = 90; reaction(5000, 20) = 250; conditioning(45, 50) = 90; recall(7, 10) = 70; arousal(80, 30) = 50; arousal(20, 30) = 0; conformity(6, 8) = 75
The ledger holds this as [fam_psychology](/theorem/fam_psychology) — proven `by decide`, sorry-free:

```lean
((((12 : Int) * (100 : Int)) / (10 : Int)) = (120 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ (((5000 : Int) / (20 : Int)) = (250 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ ((((7 : Int) * (100 : Int)) / (10 : Int)) = (70 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (30 : Int))) = (50 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (30 : Int))) = (0 : Int)) ∧ ((((6 : Int) * (100 : Int)) / (8 : Int)) = (75 : Int))
```

### psychometrics: reliability(85, 100) = 85; validity(75, 100) = 75; standardscore(130, 100, 15) = 200; standardscore(90, 100, 15) = 0; percentile(84, 100) = 84; itemdifficulty(60, 80) = 75; discrimination(18, 6, 20) = 60; cronbach(10, 20, 100) = 88; normalization(40, 50, 100) = 80
The ledger holds this as [fam_psychometrics](/theorem/fam_psychometrics) — proven `by decide`, sorry-free:

```lean
((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((((fmax (0 : Int) ((130 : Int) - (100 : Int))) * (100 : Int)) / (15 : Int)) = (200 : Int)) ∧ ((((fmax (0 : Int) ((90 : Int) - (100 : Int))) * (100 : Int)) / (15 : Int)) = (0 : Int)) ∧ ((((84 : Int) * (100 : Int)) / (100 : Int)) = (84 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (80 : Int)) = (75 : Int)) ∧ ((((fmax (0 : Int) ((18 : Int) - (6 : Int))) * (100 : Int)) / (20 : Int)) = (60 : Int)) ∧ (((((10 : Int) * (fmax (0 : Int) ((100 : Int) - (20 : Int)))) * (100 : Int)) / ((fmax (1 : Int) ((10 : Int) - (1 : Int))) * (100 : Int))) = (88 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (50 : Int)) = (80 : Int))
```

### psychophysics: weberfraction(5, 100) = 50; weberfraction(5, 0) = 0; jnd(200, 50) = 10; thresholds(75, 100) = 75; stevenspower(120, 50) = 60; sensitivity(40, 10) = 400; reactiontime(200, 600, 30) = 220; adaptation(100, 3, 10) = 70; magnitude(25, 4) = 100
The ledger holds this as [fam_psychophysics](/theorem/fam_psychophysics) — proven `by decide`, sorry-free:

```lean
((((5 : Int) * (1000 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((((5 : Int) * (1000 : Int)) / (0 : Int)) = (0 : Int)) ∧ ((((200 : Int) * (50 : Int)) / (1000 : Int)) = (10 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((((120 : Int) * (50 : Int)) / (100 : Int)) = (60 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (10 : Int)) = (400 : Int)) ∧ (((200 : Int) + ((600 : Int) / (30 : Int))) = (220 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - ((3 : Int) * (10 : Int)))) = (70 : Int)) ∧ (((25 : Int) * (4 : Int)) = (100 : Int))
```

### publishing: royalty(10000, 12) = 1200; pages(90000, 300) = 300; margin(1000, 400) = 60; print(5000, 16) = 80000; returns(150, 1000) = 15; readership(30000, 10000) = 3; backlist(80, 200) = 40; impact(1200, 100) = 12
The ledger holds this as [fam_publishing](/theorem/fam_publishing) — proven `by decide`, sorry-free:

```lean
((((10000 : Int) * (12 : Int)) / (100 : Int)) = (1200 : Int)) ∧ (((90000 : Int) / (300 : Int)) = (300 : Int)) ∧ (((((1000 : Int) - (400 : Int)) * (100 : Int)) / (1000 : Int)) = (60 : Int)) ∧ (((5000 : Int) * (16 : Int)) = (80000 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (1000 : Int)) = (15 : Int)) ∧ (((30000 : Int) / (10000 : Int)) = (3 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (200 : Int)) = (40 : Int)) ∧ (((1200 : Int) / (100 : Int)) = (12 : Int))
```

### pulley: ratio(400, 100) = 4; effort(1000, 4) = 250; wheels(4, 0) = 4; load(250, 4) = 1000; segments(4, 1) = 4; advantage(400, 100) = 4; tension(1000, 4) = 250; combos(6, 2) = 15
The ledger holds this as [fam_pulley](/theorem/fam_pulley) — proven `by decide`, sorry-free:

```lean
(((400 : Int) / (100 : Int)) = (4 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ (((250 : Int) * (4 : Int)) = (1000 : Int)) ∧ (((4 : Int) * (1 : Int)) = (4 : Int)) ∧ (((400 : Int) / (100 : Int)) = (4 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### pulmonology: fev1(80, 100) = 80; tidal(500, 12) = 6000; saturation(98, 100) = 98; compliance(500, 5) = 100; deadspace(150, 500) = 30; resistance(20, 4) = 5; diffusion(250, 10) = 25
The ledger holds this as [fam_pulmonology](/theorem/fam_pulmonology) — proven `by decide`, sorry-free:

```lean
((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((500 : Int) * (12 : Int)) = (6000 : Int)) ∧ ((((98 : Int) * (100 : Int)) / (100 : Int)) = (98 : Int)) ∧ (((500 : Int) / (5 : Int)) = (100 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (500 : Int)) = (30 : Int)) ∧ (((20 : Int) / (4 : Int)) = (5 : Int)) ∧ (((250 : Int) / (10 : Int)) = (25 : Int))
```

### pulsar: spinfrequency(1800, 60) = 30; perioddderivative(1000, 50) = 20; characteristicage(1000, 5) = 100; magneticfield(50, 2) = 10; spindownluminosity(2, 30, 3) = 180; dispersionmeasure(30, 100) = 3000; braking(100, 10, 3) = 3; braking(100, 0, 3) = 0; pulsewidth(1000, 5) = 50
The ledger holds this as [fam_pulsar](/theorem/fam_pulsar) — proven `by decide`, sorry-free:

```lean
(((1800 : Int) / (60 : Int)) = (30 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ (((1000 : Int) / ((2 : Int) * (5 : Int))) = (100 : Int)) ∧ ((Int.ofNat (fsqrt (Int.toNat ((50 : Int) * (2 : Int))))) = (10 : Int)) ∧ ((((2 : Int) * (30 : Int)) * (3 : Int)) = (180 : Int)) ∧ (((30 : Int) * (100 : Int)) = (3000 : Int)) ∧ ((((100 : Int) * (3 : Int)) / ((10 : Int) ^ (2 : Nat))) = (3 : Int)) ∧ ((((100 : Int) * (3 : Int)) / ((0 : Int) ^ (2 : Nat))) = (0 : Int)) ∧ ((((1000 : Int) * (5 : Int)) / (100 : Int)) = (50 : Int))
```

### pump: flow(50, 60) = 3000; head(100, 20) = 80; power(5, 1000) = 5000; stages(3, 1) = 4; efficiency(75, 100) = 75; impellers(2, 1) = 3; throughput(6000, 60) = 100; combos(6, 2) = 15
The ledger holds this as [fam_pump](/theorem/fam_pump) — proven `by decide`, sorry-free:

```lean
(((50 : Int) * (60 : Int)) = (3000 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (20 : Int))) = (80 : Int)) ∧ (((5 : Int) * (1000 : Int)) = (5000 : Int)) ∧ (((3 : Int) + (1 : Int)) = (4 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ (((2 : Int) + (1 : Int)) = (3 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### puppetry: strings(9, 0) = 9; jointcount(12, 2) = 24; controlbars(2, 1) = 3; manipulators(1, 1) = 2; gesturecombos(10, 3) = 120; articulationpoints(8, 2) = 16; riggingsubsets(4) = 16; motionrange(180, 2) = 90
The ledger holds this as [fam_puppetry](/theorem/fam_puppetry) — proven `by decide`, sorry-free:

```lean
(((9 : Int) + (0 : Int)) = (9 : Int)) ∧ (((12 : Int) * (2 : Int)) = (24 : Int)) ∧ (((2 : Int) + (1 : Int)) = (3 : Int)) ∧ (((1 : Int) + (1 : Int)) = (2 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (3 : Int)))) = (120 : Int)) ∧ (((8 : Int) * (2 : Int)) = (16 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((180 : Int) / (2 : Int)) = (90 : Int))
```

### pwm: dutycycle(25, 100) = 25; averagevoltage(1200, 100) = 12; period(1000000, 1000) = 1000; resolution(256, 1) = 256; onpulse(1000, 4) = 250; frequency(1000000, 1000) = 1000; ripple(5, 100) = 5; effectivepower(75, 100) = 75
The ledger holds this as [fam_pwm](/theorem/fam_pwm) — proven `by decide`, sorry-free:

```lean
((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int)) ∧ (((1200 : Int) / (100 : Int)) = (12 : Int)) ∧ (((1000000 : Int) / (1000 : Int)) = (1000 : Int)) ∧ (((256 : Int) * (1 : Int)) = (256 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((1000000 : Int) / (1000 : Int)) = (1000 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int))
```


::: warning 
THE FAMILIES, P — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. The boundary is confirmed by the wing's own sealed theorems — e.g. [fam_pacing](/theorem/fam_pacing) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
