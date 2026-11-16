---
title: "THE FAMILIES, E"
description: "Computed from lean/FamiliesE.lean — 62 sealed theorems, every claim citing its proof."
---

# THE FAMILIES, E

> THE FAMILIES, E — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. — held by [fam_earnedvalue](/theorem/fam_earnedvalue) and its 61 siblings below.

**62 theorems** and **23,136 decided cases**, from [fam_earnedvalue](/theorem/fam_earnedvalue) onward, each proven `by decide` in <a href="/lean/FamiliesE.lean">lean/FamiliesE.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFamiliesE.lean)** — nothing to install. The editor fetches `lean/FamiliesE.lean` from the repository and re-decides all 62 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### earnedvalue: cpi(800, 1000) = 80; spi(900, 1000) = 90; costvariance(1200, 1000) = 200; schedulevariance(1000, 900) = 100; eac(2000, 1000, 800) = 2500; etc(2000, 800) = 1200; tcpi(2000, 800, 1000) = 120; vac(2000, 1800) = 200; cpi(800, 0) = 0
The ledger holds this as [fam_earnedvalue](/theorem/fam_earnedvalue) — proven `by decide`, sorry-free:

```lean
((((800 : Int) * (100 : Int)) / (1000 : Int)) = (80 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((1200 : Int) - (1000 : Int))) = (200 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (900 : Int))) = (100 : Int)) ∧ ((((2000 : Int) * (1000 : Int)) / (800 : Int)) = (2500 : Int)) ∧ ((fmax (0 : Int) ((2000 : Int) - (800 : Int))) = (1200 : Int)) ∧ ((((fmax (0 : Int) ((2000 : Int) - (800 : Int))) * (100 : Int)) / (fmax (0 : Int) ((2000 : Int) - (1000 : Int)))) = (120 : Int)) ∧ ((fmax (0 : Int) ((2000 : Int) - (1800 : Int))) = (200 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int))
```

### eclipse: saros(18, 0) = 18; duration(450, 60) = 7; magnitude(100, 100) = 100; types(3, 0) = 3; path(100, 1) = 100; frequency(18, 1) = 18; contacts(4, 0) = 4; combos(6, 2) = 15
The ledger holds this as [fam_eclipse](/theorem/fam_eclipse) — proven `by decide`, sorry-free:

```lean
(((18 : Int) + (0 : Int)) = (18 : Int)) ∧ (((450 : Int) / (60 : Int)) = (7 : Int)) ∧ ((((100 : Int) * (100 : Int)) / (100 : Int)) = (100 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((100 : Int) * (1 : Int)) = (100 : Int)) ∧ (((18 : Int) / (1 : Int)) = (18 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### ecology: population(120, 80) = 40; population(50, 90) = -40; density(1000, 25) = 40; diversity(30, 120) = 25; carrying(10000, 50) = 200; biomass(500, 12) = 6000; predation(900, 30) = 30; habitat(45, 300) = 15; trophic(10000, 10) = 1000
The ledger holds this as [fam_ecology](/theorem/fam_ecology) — proven `by decide`, sorry-free:

```lean
(((120 : Int) - (80 : Int)) = (40 : Int)) ∧ (((50 : Int) - (90 : Int)) = (-40 : Int)) ∧ (((1000 : Int) / (25 : Int)) = (40 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ (((10000 : Int) / (50 : Int)) = (200 : Int)) ∧ (((500 : Int) * (12 : Int)) = (6000 : Int)) ∧ (((900 : Int) / (30 : Int)) = (30 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (300 : Int)) = (15 : Int)) ∧ (((10000 : Int) / (10 : Int)) = (1000 : Int))
```

### ecommerce: cart(3, 2000) = 6000; discount(2000, 15) = 300; shipping(5, 400) = 2000; margin(100, 60) = 40; aov(50000, 250) = 200; conversion(50, 1000) = 5; refund(2000, 100) = 2000; inventory(500, 320) = 180
The ledger holds this as [fam_ecommerce](/theorem/fam_ecommerce) — proven `by decide`, sorry-free:

```lean
(((3 : Int) * (2000 : Int)) = (6000 : Int)) ∧ ((((2000 : Int) * (15 : Int)) / (100 : Int)) = (300 : Int)) ∧ (((5 : Int) * (400 : Int)) = (2000 : Int)) ∧ (((((100 : Int) - (60 : Int)) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((50000 : Int) / (250 : Int)) = (200 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((2000 : Int) * (100 : Int)) / (100 : Int)) = (2000 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (320 : Int))) = (180 : Int))
```

### econ: present(1000, 0, 5) = 1000; worklife(30) = 37; worklife(70) = 0; lost(50000, 37) = 1850000
The ledger holds this as [fam_econ](/theorem/fam_econ) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (((1 : Int) + ((0 : Int) / (10000 : Int))) ^ (5 : Nat))) = (1000 : Int)) ∧ ((fmax (0 : Int) ((67 : Int) - (30 : Int))) = (37 : Int)) ∧ ((fmax (0 : Int) ((67 : Int) - (70 : Int))) = (0 : Int)) ∧ (((50000 : Int) * (37 : Int)) = (1850000 : Int))
```

### editing: cuts(50) = 49; pacing(120, 4) = 30; timeline(40, 150) = 6000; ripple(10, 60) = 50; transition(10, 24) = 216; runtime(6000, 24) = 250; coverage(8, 5) = 40; assembly(24, 90) = 2160; cuts(1) = 0
The ledger holds this as [fam_editing](/theorem/fam_editing) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((50 : Int) - (1 : Int))) = (49 : Int)) ∧ (((120 : Int) / (4 : Int)) = (30 : Int)) ∧ (((40 : Int) * (150 : Int)) = (6000 : Int)) ∧ ((fmax (0 : Int) ((60 : Int) - (10 : Int))) = (50 : Int)) ∧ (((fmax (0 : Int) ((10 : Int) - (1 : Int))) * (24 : Int)) = (216 : Int)) ∧ (((6000 : Int) / (24 : Int)) = (250 : Int)) ∧ (((8 : Int) * (5 : Int)) = (40 : Int)) ∧ (((24 : Int) * (90 : Int)) = (2160 : Int)) ∧ ((fmax (0 : Int) ((1 : Int) - (1 : Int))) = (0 : Int))
```

### education: grade(85, 100) = 85; gpa(48, 12) = 4; attendance(90, 100) = 90; pass(45, 50) = 90; ratio(300, 20) = 15; completion(80, 100) = 80; credits(5, 3) = 15; cost(15, 200) = 3000
The ledger holds this as [fam_education](/theorem/fam_education) — proven `by decide`, sorry-free:

```lean
((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ (((48 : Int) / (12 : Int)) = (4 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ (((300 : Int) / (20 : Int)) = (15 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((5 : Int) * (3 : Int)) = (15 : Int)) ∧ (((15 : Int) * (200 : Int)) = (3000 : Int))
```

### elections: turnout(750, 1000) = 75; margin(5200, 4800) = 400; seats(12000, 1000) = 12; swing(55, 40) = 15; threshold(300, 6000) = 5; apportionment(100000, 25000) = 4; spoilage(20, 1000) = 2; proportionality(50, 100) = 50
The ledger holds this as [fam_elections](/theorem/fam_elections) — proven `by decide`, sorry-free:

```lean
((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((5200 : Int) - (4800 : Int))) = (400 : Int)) ∧ (((12000 : Int) / (1000 : Int)) = (12 : Int)) ∧ ((fmax (0 : Int) ((55 : Int) - (40 : Int))) = (15 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (6000 : Int)) = (5 : Int)) ∧ (((100000 : Int) / (25000 : Int)) = (4 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (1000 : Int)) = (2 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int))
```

### electrical: power(120, 10) = 1200; resistance(240, 10) = 24; impedance(30, 40) = 70; powerfactor(80, 100) = 80; transformer(240, 120) = 200; load(1200, 120) = 10; efficiency(90, 100) = 90; frequency(3000, 60) = 50
The ledger holds this as [fam_electrical](/theorem/fam_electrical) — proven `by decide`, sorry-free:

```lean
(((120 : Int) * (10 : Int)) = (1200 : Int)) ∧ (((240 : Int) / (10 : Int)) = (24 : Int)) ∧ (((30 : Int) + (40 : Int)) = (70 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((240 : Int) * (100 : Int)) / (120 : Int)) = (200 : Int)) ∧ (((1200 : Int) / (120 : Int)) = (10 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ (((3000 : Int) / (60 : Int)) = (50 : Int))
```

### electrocardiography: heartrate(1000) = 60; qtinterval(440, 40) = 400; qtinterval(40, 440) = 0; printerval(40, 200) = 160; qrsduration(140, 40) = 100; rraverage(6000, 6) = 1000; axisdeviation(10, 4) = 6; correctedqt(360, 900) = 400; intervalratio(400, 1000) = 40
The ledger holds this as [fam_electrocardiography](/theorem/fam_electrocardiography) — proven `by decide`, sorry-free:

```lean
(((60000 : Int) / (1000 : Int)) = (60 : Int)) ∧ ((fmax (0 : Int) ((440 : Int) - (40 : Int))) = (400 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (440 : Int))) = (0 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (40 : Int))) = (160 : Int)) ∧ ((fmax (0 : Int) ((140 : Int) - (40 : Int))) = (100 : Int)) ∧ (((6000 : Int) / (6 : Int)) = (1000 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (4 : Int))) = (6 : Int)) ∧ ((((360 : Int) * (1000 : Int)) / (900 : Int)) = (400 : Int)) ∧ ((((400 : Int) * (100 : Int)) / (1000 : Int)) = (40 : Int))
```

### electrochemistry: faraday(1000, 4) = 250; cellpotential(80, 30) = 50; cellpotential(30, 80) = -50; current(600, 60) = 10; electrolysis(9650, 965) = 10; conductivity(100, 5) = 20; nernst(100, 20) = 80; nernst(20, 100) = -80; capacity(1000, 4) = 250; efficiency(90, 100) = 90
The ledger holds this as [fam_electrochemistry](/theorem/fam_electrochemistry) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((80 : Int) - (30 : Int)) = (50 : Int)) ∧ (((30 : Int) - (80 : Int)) = (-50 : Int)) ∧ (((600 : Int) / (60 : Int)) = (10 : Int)) ∧ (((9650 : Int) / (965 : Int)) = (10 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ (((100 : Int) - (20 : Int)) = (80 : Int)) ∧ (((20 : Int) - (100 : Int)) = (-80 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int))
```

### electrolyte: conductivity(100, 5) = 500; molarity(2000, 2) = 1000; ions(2, 6) = 12; voltage(2, 1) = 2; ph(70, 10) = 7; mobility(800, 10) = 80; cells(6, 0) = 6; combos(6, 2) = 15
The ledger holds this as [fam_electrolyte](/theorem/fam_electrolyte) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * (5 : Int)) = (500 : Int)) ∧ (((2000 : Int) / (2 : Int)) = (1000 : Int)) ∧ (((2 : Int) * (6 : Int)) = (12 : Int)) ∧ (((2 : Int) * (1 : Int)) = (2 : Int)) ∧ (((70 : Int) / (10 : Int)) = (7 : Int)) ∧ (((800 : Int) / (10 : Int)) = (80 : Int)) ∧ (((6 : Int) + (0 : Int)) = (6 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### electromagnetism: coulomb(6, 7) = 42; field(100, 5) = 4; flux(4, 25) = 100; induction(1000, 8) = 125; wave(50, 6) = 300; impedance(240, 10) = 24; poynting(12, 9) = 108; capacitance(1000, 8) = 125
The ledger holds this as [fam_electromagnetism](/theorem/fam_electromagnetism) — proven `by decide`, sorry-free:

```lean
(((6 : Int) * (7 : Int)) = (42 : Int)) ∧ (((100 : Int) / ((5 : Int) ^ (2 : Nat))) = (4 : Int)) ∧ (((4 : Int) * (25 : Int)) = (100 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ (((50 : Int) * (6 : Int)) = (300 : Int)) ∧ (((240 : Int) / (10 : Int)) = (24 : Int)) ∧ (((12 : Int) * (9 : Int)) = (108 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int))
```

### electronics: ohm(12, 3) = 4; power(12, 3) = 36; series(6, 3) = 9; parallel(6, 3) = 2; charge(5, 10) = 50; capacitance(100, 5) = 20; frequency(1000, 10) = 100; efficiency(80, 100) = 80
The ledger holds this as [fam_electronics](/theorem/fam_electronics) — proven `by decide`, sorry-free:

```lean
(((12 : Int) / (3 : Int)) = (4 : Int)) ∧ (((12 : Int) * (3 : Int)) = (36 : Int)) ∧ (((6 : Int) + (3 : Int)) = (9 : Int)) ∧ ((((6 : Int) * (3 : Int)) / ((6 : Int) + (3 : Int))) = (2 : Int)) ∧ (((5 : Int) * (10 : Int)) = (50 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### electrostatics: coulomb(12, 15, 3) = 20; field(100, 5) = 4; potential(100, 4) = 25; capacitance(100, 5) = 20; energy(10, 6) = 30; flux(1000, 8) = 125; dipole(7, 9) = 63; charge(20, 5) = 100; capacitance(100, 0) = 0
The ledger holds this as [fam_electrostatics](/theorem/fam_electrostatics) — proven `by decide`, sorry-free:

```lean
((((12 : Int) * (15 : Int)) / ((3 : Int) ^ (2 : Nat))) = (20 : Int)) ∧ (((100 : Int) / ((5 : Int) ^ (2 : Nat))) = (4 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ ((((10 : Int) * (6 : Int)) / (2 : Int)) = (30 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ (((7 : Int) * (9 : Int)) = (63 : Int)) ∧ (((20 : Int) * (5 : Int)) = (100 : Int)) ∧ (((100 : Int) / (0 : Int)) = (0 : Int))
```

### elevator: capacity(10, 80) = 800; speed(1000, 100) = 10; floors(40, 0) = 40; traveltime(160, 10) = 16; waittime(120, 4) = 30; dispatchcombos(8, 2) = 28; accelrate(100, 10) = 10; dutyload(80, 100) = 80
The ledger holds this as [fam_elevator](/theorem/fam_elevator) — proven `by decide`, sorry-free:

```lean
(((10 : Int) * (80 : Int)) = (800 : Int)) ∧ (((1000 : Int) / (100 : Int)) = (10 : Int)) ∧ (((40 : Int) + (0 : Int)) = (40 : Int)) ∧ (((160 : Int) / (10 : Int)) = (16 : Int)) ∧ (((120 : Int) / (4 : Int)) = (30 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### elnino: oni(20, 10) = 2; ssttanomaly(30, 25) = 5; phasecount(2, 1) = 3; cycleyears(3, 4) = 7; teleconnections(12, 2) = 24; intensityindex(80, 100) = 80; durationmonths(9, 3) = 12; rainfallshift(100, 40) = 60
The ledger holds this as [fam_elnino](/theorem/fam_elnino) — proven `by decide`, sorry-free:

```lean
(((20 : Int) / (10 : Int)) = (2 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (25 : Int))) = (5 : Int)) ∧ (((2 : Int) + (1 : Int)) = (3 : Int)) ∧ (((3 : Int) + (4 : Int)) = (7 : Int)) ∧ (((12 : Int) * (2 : Int)) = (24 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((9 : Int) + (3 : Int)) = (12 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (40 : Int))) = (60 : Int))
```

### elo: update(32, 100, 60) = 12; ratingdiff(1600, 1400) = 200; kfactor(10, 1500) = 40; kfactor(50, 1500) = 20; performance(1500, 8, 2) = 1740; winprobability(200, 10) = 70; provisional(10, 30) = 20; decay(1500, 6, 10) = 1440
The ledger holds this as [fam_elo](/theorem/fam_elo) — proven `by decide`, sorry-free:

```lean
((((32 : Int) * (fmax (0 : Int) ((100 : Int) - (60 : Int)))) / (100 : Int)) = (12 : Int)) ∧ ((fmax (0 : Int) ((1600 : Int) - (1400 : Int))) = (200 : Int)) ∧ ((if (if (10 : Int) < (30 : Int) then (1 : Int) else 0) ≠ 0 then (40 : Int) else (if (if (1500 : Int) ≥ (2400 : Int) then (1 : Int) else 0) ≠ 0 then (10 : Int) else (20 : Int))) = (40 : Int)) ∧ ((if (if (50 : Int) < (30 : Int) then (1 : Int) else 0) ≠ 0 then (40 : Int) else (if (if (1500 : Int) ≥ (2400 : Int) then (1 : Int) else 0) ≠ 0 then (10 : Int) else (20 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((1500 : Int) + (((400 : Int) * ((8 : Int) - (2 : Int))) / ((8 : Int) + (2 : Int))))) = (1740 : Int)) ∧ ((fmin (100 : Int) ((50 : Int) + ((200 : Int) / (10 : Int)))) = (70 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (10 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((1500 : Int) - ((6 : Int) * (10 : Int)))) = (1440 : Int))
```

### email: deliverability(980, 1000) = 98; spam(5, 1000) = 0; optout(3, 1000) = 0; hardbounce(20, 1000) = 2; reputation(1, 1000) = 0; clickrate(150, 600) = 25; hygiene(900, 1000) = 90; throttle(1200, 500) = 500; throttle(300, 500) = 300
The ledger holds this as [fam_email](/theorem/fam_email) — proven `by decide`, sorry-free:

```lean
((((980 : Int) * (100 : Int)) / (1000 : Int)) = (98 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (1000 : Int)) = (0 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (1000 : Int)) = (0 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (1000 : Int)) = (2 : Int)) ∧ ((((1 : Int) * (100 : Int)) / (1000 : Int)) = (0 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (600 : Int)) = (25 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ ((fmin (1200 : Int) (500 : Int)) = (500 : Int)) ∧ ((fmin (300 : Int) (500 : Int)) = (300 : Int))
```

### embedding: dimensions(768, 12) = 9216; dotsim(3, 4, 5) = 32; l2sq(3, 4) = 25; tablesize(1000, 768) = 768000; lookup(10, 768) = 7680; projection(768, 256) = 512; cosine(7, 10) = 70; cosine(5, 0) = 0
The ledger holds this as [fam_embedding](/theorem/fam_embedding) — proven `by decide`, sorry-free:

```lean
(((768 : Int) * (12 : Int)) = (9216 : Int)) ∧ ((((3 : Int) * (4 : Int)) + ((4 : Int) * (5 : Int))) = (32 : Int)) ∧ ((((3 : Int) ^ (2 : Nat)) + ((4 : Int) ^ (2 : Nat))) = (25 : Int)) ∧ (((1000 : Int) * (768 : Int)) = (768000 : Int)) ∧ (((10 : Int) * (768 : Int)) = (7680 : Int)) ∧ ((fmax (0 : Int) ((768 : Int) - (256 : Int))) = (512 : Int)) ∧ ((((7 : Int) * (100 : Int)) / (10 : Int)) = (70 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int))
```

### embroidery: stitchcount(1000, 5) = 5000; threadcolors(12, 6) = 18; stitchtypes(8, 0) = 8; patternpairs(10, 2) = 45; densitypersqcm(5000, 100) = 50; motifsubsets(5) = 32; stitchorderings(4) = 24; coverage(85, 100) = 85
The ledger holds this as [fam_embroidery](/theorem/fam_embroidery) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ (((12 : Int) + (6 : Int)) = (18 : Int)) ∧ (((8 : Int) + (0 : Int)) = (8 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int))
```

### embryology: gestation(280) = 280; cleavage(8, 4) = 2; viability(8, 10) = 80; implantation(2, 4) = 50; blastocyst(5, 10) = 50; fragmentation(2, 10) = 20; morphology(5) = 5; differentiation(50, 100) = 50
The ledger holds this as [fam_embryology](/theorem/fam_embryology) — proven `by decide`, sorry-free:

```lean
((280 : Int) = (280 : Int)) ∧ (((8 : Int) / (4 : Int)) = (2 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (4 : Int)) = (50 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (10 : Int)) = (50 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (10 : Int)) = (20 : Int)) ∧ ((5 : Int) = (5 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int))
```

### emissions: intensity(1000, 40) = 25; percapita(8000, 1000) = 8; reduction(1000, 750) = 25; scope(300, 1000) = 30; equivalent(50, 25) = 1250; tax(1000, 15) = 150; allowance(1200, 1000) = 200; allowance(800, 1000) = 0; sequestration(250, 1000) = 25
The ledger holds this as [fam_emissions](/theorem/fam_emissions) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (40 : Int)) = (25 : Int)) ∧ (((8000 : Int) / (1000 : Int)) = (8 : Int)) ∧ (((((1000 : Int) - (750 : Int)) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ (((50 : Int) * (25 : Int)) = (1250 : Int)) ∧ ((((1000 : Int) * (15 : Int)) / (100 : Int)) = (150 : Int)) ∧ ((fmax (0 : Int) ((1200 : Int) - (1000 : Int))) = (200 : Int)) ∧ ((fmax (0 : Int) ((800 : Int) - (1000 : Int))) = (0 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int))
```

### emotion: valence(70, 30) = 40; valence(30, 70) = -40; arousal(80, 20) = 60; arousal(10, 20) = 0; regulation(3, 4) = 75; empathy(4, 5) = 80; stress(150, 100) = 150; recovery(20, 80) = 60; contagion(3, 12) = 25; intensity(100, 4) = 25
The ledger holds this as [fam_emotion](/theorem/fam_emotion) — proven `by decide`, sorry-free:

```lean
(((70 : Int) - (30 : Int)) = (40 : Int)) ∧ (((30 : Int) - (70 : Int)) = (-40 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (20 : Int))) = (60 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (20 : Int))) = (0 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ ((((4 : Int) * (100 : Int)) / (5 : Int)) = (80 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (100 : Int)) = (150 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (20 : Int))) = (60 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (12 : Int)) = (25 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int))
```

### empiricism: observations(100, 5) = 500; inductionsteps(3, 2) = 5; evidencecombos(10, 3) = 120; hypothesissubsets(5) = 32; confirmationratio(70, 100) = 70; samplepairs(12, 2) = 66; generalizationpaths(6, 2) = 30; certaintydegree(60, 100) = 60
The ledger holds this as [fam_empiricism](/theorem/fam_empiricism) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * (5 : Int)) = (500 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (3 : Int)))) = (120 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (6 : Int)))) / (Int.ofNat (ffact (Int.toNat ((6 : Int) - (2 : Int)))))) = (30 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int))
```

### employment: gross(160, 25) = 4000; overtimehours(45, 40) = 5; overtime(5, 20, 150) = 150; severance(8, 500) = 4000; notice(15, 12) = 12; redundancy(15, 500, 12) = 6000; holiday(28, 183) = 14; net(4000, 900) = 3100
The ledger holds this as [fam_employment](/theorem/fam_employment) — proven `by decide`, sorry-free:

```lean
(((160 : Int) * (25 : Int)) = (4000 : Int)) ∧ ((fmax (0 : Int) ((45 : Int) - (40 : Int))) = (5 : Int)) ∧ (((((5 : Int) * (20 : Int)) * (150 : Int)) / (100 : Int)) = (150 : Int)) ∧ (((8 : Int) * (500 : Int)) = (4000 : Int)) ∧ ((fmin (15 : Int) (12 : Int)) = (12 : Int)) ∧ (((fmin (15 : Int) (12 : Int)) * (500 : Int)) = (6000 : Int)) ∧ ((((28 : Int) * (183 : Int)) / (365 : Int)) = (14 : Int)) ∧ ((fmax (0 : Int) ((4000 : Int) - (900 : Int))) = (3100 : Int))
```

### emulsification: dropletsize(1000, 50) = 20; stabilityindex(90, 100) = 90; emulsifierratio(3, 100) = 3; phaseratio(70, 30) = 233; viscosity(50, 4) = 200; creamingrate(100, 95) = 5; surfacetension(72, 2) = 36; coalescencetime(3600, 60) = 60
The ledger holds this as [fam_emulsification](/theorem/fam_emulsification) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (100 : Int)) = (3 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (30 : Int)) = (233 : Int)) ∧ (((50 : Int) * (4 : Int)) = (200 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (95 : Int))) = (5 : Int)) ∧ (((72 : Int) / (2 : Int)) = (36 : Int)) ∧ (((3600 : Int) / (60 : Int)) = (60 : Int))
```

### endocrinology: homa(90, 10) = 2; a1c(5400) = 10; thyroid(2, 4) = 50; cortisol(150, 50) = 300; sensitivity(80, 10) = 800; secretion(100, 4) = 25; halflife(10, 5) = 1; feedback(90, 30) = 300
The ledger holds this as [fam_endocrinology](/theorem/fam_endocrinology) — proven `by decide`, sorry-free:

```lean
((((90 : Int) * (10 : Int)) / (405 : Int)) = (2 : Int)) ∧ ((((5400 : Int) + (4600 : Int)) / (1000 : Int)) = (10 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (4 : Int)) = (50 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (50 : Int)) = (300 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (10 : Int)) = (800 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ ((((10 : Int) * (693 : Int)) / ((5 : Int) * (1000 : Int))) = (1 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (30 : Int)) = (300 : Int))
```

### endpoint: latency(5000, 100) = 50; rate(6000, 60) = 100; status(990, 1000) = 99; methods(4) = 4; auth(3, 10) = 30; payload(20, 8) = 160; depth(5) = 5; error(5, 1000) = 0; error(50, 1000) = 5
The ledger holds this as [fam_endpoint](/theorem/fam_endpoint) — proven `by decide`, sorry-free:

```lean
(((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((((990 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ ((4 : Int) = (4 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (10 : Int)) = (30 : Int)) ∧ (((20 : Int) * (8 : Int)) = (160 : Int)) ∧ ((5 : Int) = (5 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (1000 : Int)) = (0 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int))
```

### endurance: vo2proxy(3500, 70) = 50; timetoexhaustion(6000, 20) = 300; aerobicratio(80, 100) = 80; lactatethreshold(85, 100) = 85; heartratereserve(190, 60) = 130; trainingload(120, 5) = 600; distancecapacity(10, 42) = 420; fatigueindex(30, 300) = 10
The ledger holds this as [fam_endurance](/theorem/fam_endurance) — proven `by decide`, sorry-free:

```lean
(((3500 : Int) / (70 : Int)) = (50 : Int)) ∧ (((6000 : Int) / (20 : Int)) = (300 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ ((fmax (0 : Int) ((190 : Int) - (60 : Int))) = (130 : Int)) ∧ (((120 : Int) * (5 : Int)) = (600 : Int)) ∧ (((10 : Int) * (42 : Int)) = (420 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (300 : Int)) = (10 : Int))
```

### energy: power(240, 10) = 2400; energy(2400, 3) = 7200; efficiency(85, 100) = 85; load(800, 1000) = 80; cost(500, 15) = 75; capacity(20, 400) = 8000; carbon(1000, 420) = 420; storage(90, 100) = 90
The ledger holds this as [fam_energy](/theorem/fam_energy) — proven `by decide`, sorry-free:

```lean
(((240 : Int) * (10 : Int)) = (2400 : Int)) ∧ (((2400 : Int) * (3 : Int)) = (7200 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (1000 : Int)) = (80 : Int)) ∧ ((((500 : Int) * (15 : Int)) / (100 : Int)) = (75 : Int)) ∧ (((20 : Int) * (400 : Int)) = (8000 : Int)) ∧ ((((1000 : Int) * (420 : Int)) / (1000 : Int)) = (420 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int))
```

### engine: displacement(500, 4) = 2000; power(100, 4) = 400; torque(200, 1) = 200; cylinders(4, 2) = 6; compression(100, 10) = 10; rpm(6000, 1) = 6000; firingorders(4) = 24; valves(4, 4) = 16
The ledger holds this as [fam_engine](/theorem/fam_engine) — proven `by decide`, sorry-free:

```lean
(((500 : Int) * (4 : Int)) = (2000 : Int)) ∧ (((100 : Int) * (4 : Int)) = (400 : Int)) ∧ (((200 : Int) * (1 : Int)) = (200 : Int)) ∧ (((4 : Int) + (2 : Int)) = (6 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ (((6000 : Int) / (1 : Int)) = (6000 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ (((4 : Int) * (4 : Int)) = (16 : Int))
```

### enrollment: rate(500, 2000) = 25; retention(850, 1000) = 85; attrition(1000, 850) = 150; yield(600, 1500) = 40; ratio(300, 20) = 15; capacity(500, 450) = 50; waitlist(2000, 1500) = 500; fulltimeequivalent(100, 30) = 110
The ledger holds this as [fam_enrollment](/theorem/fam_enrollment) — proven `by decide`, sorry-free:

```lean
((((500 : Int) * (100 : Int)) / (2000 : Int)) = (25 : Int)) ∧ ((((850 : Int) * (100 : Int)) / (1000 : Int)) = (85 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (850 : Int))) = (150 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (1500 : Int)) = (40 : Int)) ∧ (((300 : Int) / (20 : Int)) = (15 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (450 : Int))) = (50 : Int)) ∧ ((fmax (0 : Int) ((2000 : Int) - (1500 : Int))) = (500 : Int)) ∧ (((100 : Int) + ((30 : Int) / (3 : Int))) = (110 : Int))
```

### enterprise: po(1000, 50) = 50000; approval(500, 1000) = 1; approval(1500, 1000) = 0; sla(999, 1000) = 99; procurement(100, 60) = 60; leadtime(10, 17) = 7; leadtime(17, 10) = 0; turnover(12000, 1000) = 12; utilization(75, 100) = 75; reorder(5, 10) = 1; reorder(20, 10) = 0
The ledger holds this as [fam_enterprise](/theorem/fam_enterprise) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) * (50 : Int)) = (50000 : Int)) ∧ ((if (if (500 : Int) ≤ (1000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (1500 : Int) ≤ (1000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((999 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ ((fmin (100 : Int) (60 : Int)) = (60 : Int)) ∧ ((fmax (0 : Int) ((17 : Int) - (10 : Int))) = (7 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (17 : Int))) = (0 : Int)) ∧ (((12000 : Int) / (1000 : Int)) = (12 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((if (if (5 : Int) ≤ (10 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (20 : Int) ≤ (10 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int))
```

### entertainment: rating(4200, 500) = 84; runtime(10, 48) = 480; boxoffice(200000, 12) = 2400000; royalty(1000000, 12) = 120000; audience(5000000, 30) = 1500000; bitrate(900, 60) = 120; share(300, 1000) = 30; completion(42, 48) = 87
The ledger holds this as [fam_entertainment](/theorem/fam_entertainment) — proven `by decide`, sorry-free:

```lean
((((4200 : Int) * (10 : Int)) / (500 : Int)) = (84 : Int)) ∧ (((10 : Int) * (48 : Int)) = (480 : Int)) ∧ (((200000 : Int) * (12 : Int)) = (2400000 : Int)) ∧ ((((1000000 : Int) * (12 : Int)) / (100 : Int)) = (120000 : Int)) ∧ ((((5000000 : Int) * (30 : Int)) / (100 : Int)) = (1500000 : Int)) ∧ ((((900 : Int) * (8 : Int)) / (60 : Int)) = (120 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ ((((42 : Int) * (100 : Int)) / (48 : Int)) = (87 : Int))
```

### entomology: colony(50000, 1) = 50001; metamorphosis(4) = 4; swarm(12000, 3) = 4000; foraging(600, 20) = 30; infestation(30, 120) = 25; pollination(90, 200) = 45; lifecycle(1000, 950) = 95; wingbeat(12000, 60) = 200
The ledger holds this as [fam_entomology](/theorem/fam_entomology) — proven `by decide`, sorry-free:

```lean
(((50000 : Int) + (1 : Int)) = (50001 : Int)) ∧ ((4 : Int) = (4 : Int)) ∧ (((12000 : Int) / (3 : Int)) = (4000 : Int)) ∧ (((600 : Int) / (20 : Int)) = (30 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (200 : Int)) = (45 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ (((12000 : Int) / (60 : Int)) = (200 : Int))
```

### entropy: shannon(1000) = 9; maxentropy(1000) = 10; jointentropy(1000, 1000) = 18; conditionalentropy(18, 9) = 9; mutualinformation(10, 8, 15) = 3; relativeentropy(2000, 500) = 2; informationgain(16, 10) = 6; perplexity(5) = 32
The ledger holds this as [fam_entropy](/theorem/fam_entropy) — proven `by decide`, sorry-free:

```lean
((Int.ofNat (flog 2 64 (Int.toNat (1000 : Int)))) = (9 : Int)) ∧ ((Int.ofNat (fclog 2 (Int.toNat (1000 : Int)))) = (10 : Int)) ∧ (((Int.ofNat (flog 2 64 (Int.toNat (1000 : Int)))) + (Int.ofNat (flog 2 64 (Int.toNat (1000 : Int))))) = (18 : Int)) ∧ ((fmax (0 : Int) ((18 : Int) - (9 : Int))) = (9 : Int)) ∧ ((fmax (0 : Int) (((10 : Int) + (8 : Int)) - (15 : Int))) = (3 : Int)) ∧ ((fmax (0 : Int) ((Int.ofNat (flog 2 64 (Int.toNat (2000 : Int)))) - (Int.ofNat (flog 2 64 (Int.toNat (500 : Int)))))) = (2 : Int)) ∧ ((fmax (0 : Int) ((16 : Int) - (10 : Int))) = (6 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int))
```

### environment: emissions(50, 24) = 1200; exceedance(120, 100) = 20; exceedance(80, 100) = 0; footprint(1000, 3) = 3000; concentration(5, 1000000) = 5; offset(1000, 300) = 700; exposure(40, 8) = 320; penalty(20, 500) = 10000; remediation(300, 50) = 15000
The ledger holds this as [fam_environment](/theorem/fam_environment) — proven `by decide`, sorry-free:

```lean
(((50 : Int) * (24 : Int)) = (1200 : Int)) ∧ ((fmax (0 : Int) ((120 : Int) - (100 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (100 : Int))) = (0 : Int)) ∧ (((1000 : Int) * (3 : Int)) = (3000 : Int)) ∧ ((((5 : Int) * (1000000 : Int)) / (1000000 : Int)) = (5 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (300 : Int))) = (700 : Int)) ∧ (((40 : Int) * (8 : Int)) = (320 : Int)) ∧ (((20 : Int) * (500 : Int)) = (10000 : Int)) ∧ (((300 : Int) * (50 : Int)) = (15000 : Int))
```

### enzyme: turnover(1000, 60) = 60000; km(500, 10) = 50; vmax(100, 5) = 500; substrates(2, 0) = 2; activesites(4, 1) = 4; inhibition(30, 100) = 30; ph(70, 10) = 7; combos(6, 2) = 15
The ledger holds this as [fam_enzyme](/theorem/fam_enzyme) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) * (60 : Int)) = (60000 : Int)) ∧ (((500 : Int) / (10 : Int)) = (50 : Int)) ∧ (((100 : Int) * (5 : Int)) = (500 : Int)) ∧ (((2 : Int) + (0 : Int)) = (2 : Int)) ∧ (((4 : Int) * (1 : Int)) = (4 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((70 : Int) / (10 : Int)) = (7 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### enzymology: michaelis(100, 50, 50) = 50; velocity(6000, 60) = 100; turnover(1000, 5) = 200; specificity(200, 4) = 50; inhibition(100, 25) = 75; activity(50, 20) = 1000; catalyticefficiency(200, 4) = 50000; substrate(1000, 400) = 600
The ledger holds this as [fam_enzymology](/theorem/fam_enzymology) — proven `by decide`, sorry-free:

```lean
((((100 : Int) * (50 : Int)) / ((50 : Int) + (50 : Int))) = (50 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((1000 : Int) / (5 : Int)) = (200 : Int)) ∧ (((200 : Int) / (4 : Int)) = (50 : Int)) ∧ (((((100 : Int) - (25 : Int)) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ (((50 : Int) * (20 : Int)) = (1000 : Int)) ∧ ((((200 : Int) * (1000 : Int)) / (4 : Int)) = (50000 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (400 : Int))) = (600 : Int))
```

### epidemiology: r0(10, 30) = 3; incidence(50, 100000) = 50; prevalence(200, 1000) = 20; attack(45, 100) = 45; fatality(2, 100) = 2; herd(4) = 75; doubling(300, 150) = 150; doubling(100, 150) = 0; vaccine(95, 100) = 95
The ledger holds this as [fam_epidemiology](/theorem/fam_epidemiology) — proven `by decide`, sorry-free:

```lean
((((10 : Int) * (30 : Int)) / (100 : Int)) = (3 : Int)) ∧ ((((50 : Int) * (100000 : Int)) / (100000 : Int)) = (50 : Int)) ∧ ((((200 : Int) * (100 : Int)) / (1000 : Int)) = (20 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int)) ∧ (((((4 : Int) - (1 : Int)) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (150 : Int))) = (150 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (150 : Int))) = (0 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int))
```

### epigenetics: methylation(30, 40) = 75; acetylation(9, 10) = 90; expression(50, 200) = 25; imprinting(1, 2) = 50; chromatin(3, 4) = 75; clock(3650, 50) = 73; inheritance(3, 4) = 75; remodeling(20, 80) = 25
The ledger holds this as [fam_epigenetics](/theorem/fam_epigenetics) — proven `by decide`, sorry-free:

```lean
((((30 : Int) * (100 : Int)) / (40 : Int)) = (75 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int)) ∧ ((((1 : Int) * (100 : Int)) / (2 : Int)) = (50 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ (((3650 : Int) / (50 : Int)) = (73 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (80 : Int)) = (25 : Int))
```

### epigraphy: characters(20, 30) = 600; lineorderings(5) = 120; restorationpairs(10, 2) = 45; damageratio(15, 100) = 15; scriptsubsets(5) = 32; datingrange(500, 200) = 300; wordcount(600, 5) = 120; lacunae(12, 8) = 20
The ledger holds this as [fam_epigraphy](/theorem/fam_epigraphy) — proven `by decide`, sorry-free:

```lean
(((20 : Int) * (30 : Int)) = (600 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (100 : Int)) = (15 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (200 : Int))) = (300 : Int)) ∧ (((600 : Int) / (5 : Int)) = (120 : Int)) ∧ (((12 : Int) + (8 : Int)) = (20 : Int))
```

### epistemology: beliefstates(8) = 256; justificationpaths(4) = 24; evidencecombos(12, 3) = 220; certaintydegree(80, 100) = 80; inferencedepth(3, 2) = 5; gettiercases(5, 2) = 10; truthconditions(4) = 16; doubtmargin(100, 70) = 30
The ledger holds this as [fam_epistemology](/theorem/fam_epistemology) — proven `by decide`, sorry-free:

```lean
(((2 : Int) ^ (8 : Nat)) = (256 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (5 : Int)) (Int.toNat (2 : Int)))) = (10 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (70 : Int))) = (30 : Int))
```

### equine: speed(100, 10) = 10; stride(600, 4) = 150; heartrate(240, 5) = 48; bodycondition(5) = 5; gestation(340) = 340; feedratio(15, 20) = 75; height(16) = 16; recovery(40, 120) = 80; recovery(120, 40) = 0
The ledger holds this as [fam_equine](/theorem/fam_equine) — proven `by decide`, sorry-free:

```lean
(((100 : Int) / (10 : Int)) = (10 : Int)) ∧ (((600 : Int) / (4 : Int)) = (150 : Int)) ∧ (((240 : Int) / (5 : Int)) = (48 : Int)) ∧ ((5 : Int) = (5 : Int)) ∧ ((340 : Int) = (340 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (20 : Int)) = (75 : Int)) ∧ ((16 : Int) = (16 : Int)) ∧ ((fmax (0 : Int) ((120 : Int) - (40 : Int))) = (80 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (120 : Int))) = (0 : Int))
```

### equity: shares(1000, 1000) = 1000000; eps(5000, 1000) = 5; pe(200, 10) = 20; marketcap(1000, 50) = 50000; dividendyield(3, 100) = 3; float(85, 100) = 85; classes(2, 0) = 2; combos(6, 2) = 15
The ledger holds this as [fam_equity](/theorem/fam_equity) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) * (1000 : Int)) = (1000000 : Int)) ∧ (((5000 : Int) / (1000 : Int)) = (5 : Int)) ∧ (((200 : Int) / (10 : Int)) = (20 : Int)) ∧ (((1000 : Int) * (50 : Int)) = (50000 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (100 : Int)) = (3 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ (((2 : Int) + (0 : Int)) = (2 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### ergometry: power(200, 5) = 1000; workdone(500, 60) = 30000; split(120, 2) = 60; strokerate(600, 10) = 60; energyrate(3000, 60) = 50; efficiency(250, 1000) = 25; distance(5, 500) = 2500; caloriesper(3600, 60) = 60
The ledger holds this as [fam_ergometry](/theorem/fam_ergometry) — proven `by decide`, sorry-free:

```lean
(((200 : Int) * (5 : Int)) = (1000 : Int)) ∧ (((500 : Int) * (60 : Int)) = (30000 : Int)) ∧ (((120 : Int) / (2 : Int)) = (60 : Int)) ∧ (((600 : Int) / (10 : Int)) = (60 : Int)) ∧ (((3000 : Int) / (60 : Int)) = (50 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ (((5 : Int) * (500 : Int)) = (2500 : Int)) ∧ (((3600 : Int) / (60 : Int)) = (60 : Int))
```

### ergonomics: lift(20, 6) = 120; reach(45, 60) = 75; posture(30, 90) = 33; repetition(120, 60) = 2; fatigue(480, 60) = 800; illumination(10000, 20) = 500; noise(85) = 85; strain(60, 100) = 60
The ledger holds this as [fam_ergonomics](/theorem/fam_ergonomics) — proven `by decide`, sorry-free:

```lean
(((20 : Int) * (6 : Int)) = (120 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (60 : Int)) = (75 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (90 : Int)) = (33 : Int)) ∧ (((120 : Int) / (60 : Int)) = (2 : Int)) ∧ ((((480 : Int) * (100 : Int)) / (60 : Int)) = (800 : Int)) ∧ (((10000 : Int) / (20 : Int)) = (500 : Int)) ∧ ((85 : Int) = (85 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int))
```

### eschatology: stageorderings(5) = 120; scenariocombos(8, 3) = 56; symbolcount(7, 3) = 21; cyclelength(7, 70) = 490; outcomechoices(6) = 64; intervalspan(1000, 700) = 300; tribulationphases(3, 4) = 7; numbersum(6, 6, 6) = 18
The ledger holds this as [fam_eschatology](/theorem/fam_eschatology) — proven `by decide`, sorry-free:

```lean
((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (3 : Int)))) = (56 : Int)) ∧ (((7 : Int) * (3 : Int)) = (21 : Int)) ∧ (((7 : Int) * (70 : Int)) = (490 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (700 : Int))) = (300 : Int)) ∧ (((3 : Int) + (4 : Int)) = (7 : Int)) ∧ ((((6 : Int) + (6 : Int)) + (6 : Int)) = (18 : Int))
```

### estimating: takeoff(500, 3) = 1500; labor(160, 45) = 7200; material(200, 25) = 5000; overhead(10000, 15) = 1500; markup(8000, 20) = 9600; contingency(20000, 10) = 2000; unitcost(5000, 200) = 25; bid(7200, 5000, 1500) = 13700
The ledger holds this as [fam_estimating](/theorem/fam_estimating) — proven `by decide`, sorry-free:

```lean
(((500 : Int) * (3 : Int)) = (1500 : Int)) ∧ (((160 : Int) * (45 : Int)) = (7200 : Int)) ∧ (((200 : Int) * (25 : Int)) = (5000 : Int)) ∧ ((((10000 : Int) * (15 : Int)) / (100 : Int)) = (1500 : Int)) ∧ (((8000 : Int) + (((8000 : Int) * (20 : Int)) / (100 : Int))) = (9600 : Int)) ∧ ((((20000 : Int) * (10 : Int)) / (100 : Int)) = (2000 : Int)) ∧ (((5000 : Int) / (200 : Int)) = (25 : Int)) ∧ ((((7200 : Int) + (5000 : Int)) + (1500 : Int)) = (13700 : Int))
```

### estimation: meansquareerror(1000, 10) = 100; bias(50, 42) = 8; variance(900, 9) = 100; confidence(95, 100) = 95; residual(80, 65) = 15; likelihood(750, 1000) = 75; innovation(120, 100) = 20; estimategain(30, 70) = 30; bias(40, 50) = 0
The ledger holds this as [fam_estimation](/theorem/fam_estimation) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (42 : Int))) = (8 : Int)) ∧ (((900 : Int) / (9 : Int)) = (100 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (65 : Int))) = (15 : Int)) ∧ ((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((120 : Int) - (100 : Int))) = (20 : Int)) ∧ ((((30 : Int) * (100 : Int)) / ((30 : Int) + (70 : Int))) = (30 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (50 : Int))) = (0 : Int))
```

### etl: throughput(6000, 60) = 100; rejectrate(50, 1000) = 5; batchwindow(1000, 250) = 4; transformcost(1000, 5) = 5000; dedupe(1000, 900) = 100; latency(5000, 100) = 50; loadfactor(900, 1000) = 90; skew(100, 30) = 70; skew(30, 100) = 0
The ledger holds this as [fam_etl](/theorem/fam_etl) — proven `by decide`, sorry-free:

```lean
(((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((-((-(1000 : Int)) / (250 : Int))) = (4 : Int)) ∧ (((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (900 : Int))) = (100 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (100 : Int))) = (0 : Int))
```

### etymology: cognaterate(300, 1000) = 30; borrowingshare(250, 1000) = 25; rootdepth(4, 3) = 12; soundchange(1000, 8) = 125; attestationage(2024, 1500) = 524; derivationchain(2, 3) = 5; loanratio(5000, 90) = 450; reconstructionscore(80, 75) = 1; reconstructionscore(70, 75) = 0
The ledger holds this as [fam_etymology](/theorem/fam_etymology) — proven `by decide`, sorry-free:

```lean
((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ (((4 : Int) * (3 : Int)) = (12 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ ((fmax (0 : Int) ((2024 : Int) - (1500 : Int))) = (524 : Int)) ∧ (((2 : Int) + (3 : Int)) = (5 : Int)) ∧ ((((5000 : Int) * (90 : Int)) / (1000 : Int)) = (450 : Int)) ∧ ((if (if (80 : Int) ≥ (75 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (70 : Int) ≥ (75 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int))
```

### evapotranspiration: reference(25, 200) = 50; cropcoefficient(80, 100) = 80; actual(50, 80) = 40; waterdeficit(40, 25) = 15; irrigationneed(15, 75) = 20; potential(20, 12) = 240; cropwateruse(40, 30) = 1200; netirrigation(100, 60) = 40; waterdeficit(10, 25) = 0
The ledger holds this as [fam_evapotranspiration](/theorem/fam_evapotranspiration) — proven `by decide`, sorry-free:

```lean
((((25 : Int) * (200 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((50 : Int) * (80 : Int)) / (100 : Int)) = (40 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (25 : Int))) = (15 : Int)) ∧ ((-((-((15 : Int) * (100 : Int))) / (75 : Int))) = (20 : Int)) ∧ (((20 : Int) * (12 : Int)) = (240 : Int)) ∧ (((40 : Int) * (30 : Int)) = (1200 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (60 : Int))) = (40 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (25 : Int))) = (0 : Int))
```

### events: attendance(90, 100) = 90; capacity(450, 500) = 90; revenue(200, 50) = 10000; costperattendee(10000, 200) = 50; engagement(600, 200) = 3; noshow(10, 100) = 10; satisfaction(850, 200) = 4; conversion(25, 100) = 25
The ledger holds this as [fam_events](/theorem/fam_events) — proven `by decide`, sorry-free:

```lean
((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((450 : Int) * (100 : Int)) / (500 : Int)) = (90 : Int)) ∧ (((200 : Int) * (50 : Int)) = (10000 : Int)) ∧ (((10000 : Int) / (200 : Int)) = (50 : Int)) ∧ (((600 : Int) / (200 : Int)) = (3 : Int)) ∧ ((((10 : Int) * (100 : Int)) / (100 : Int)) = (10 : Int)) ∧ (((850 : Int) / (200 : Int)) = (4 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int))
```

### evidence: weight(7, 3) = 1; weight(3, 7) = 0; margin(7, 3) = 4; margin(3, 7) = 0; admissible(8, 3) = 1; admissible(3, 8) = 0; hearsay(0) = 0; hearsay(1) = 1
The ledger holds this as [fam_evidence](/theorem/fam_evidence) — proven `by decide`, sorry-free:

```lean
((if (if (7 : Int) > (3 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (3 : Int) > (7 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((fmax (0 : Int) ((7 : Int) - (3 : Int))) = (4 : Int)) ∧ ((fmax (0 : Int) ((3 : Int) - (7 : Int))) = (0 : Int)) ∧ ((if (if (8 : Int) > (3 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (3 : Int) > (8 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (0 : Int) > (0 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (1 : Int) > (0 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int))
```

### excavation: volume(10, 5, 2) = 100; cut(40, 3) = 120; fill(800, 300) = 500; swell(100, 25) = 125; compaction(125, 20) = 100; haul(100, 12) = 9; slope(8, 2) = 16; bench(20, 6) = 4
The ledger holds this as [fam_excavation](/theorem/fam_excavation) — proven `by decide`, sorry-free:

```lean
((((10 : Int) * (5 : Int)) * (2 : Int)) = (100 : Int)) ∧ (((40 : Int) * (3 : Int)) = (120 : Int)) ∧ ((fmax (0 : Int) ((800 : Int) - (300 : Int))) = (500 : Int)) ∧ ((((100 : Int) * ((100 : Int) + (25 : Int))) / (100 : Int)) = (125 : Int)) ∧ ((((125 : Int) * ((100 : Int) - (20 : Int))) / (100 : Int)) = (100 : Int)) ∧ ((-((-(100 : Int)) / (12 : Int))) = (9 : Int)) ∧ (((8 : Int) * (2 : Int)) = (16 : Int)) ∧ ((-((-(20 : Int)) / (6 : Int))) = (4 : Int))
```

### exchangerate: crossrate(15000, 120) = 125; spread(10850, 10800) = 50; pippips(11000, 10900) = 100; forwardpoints(50, 3) = 150; volatilitypct(8, 100) = 8; conversioncombos(8, 2) = 28; reservemonths(120, 20) = 6; peggedmargin(2, 100) = 2
The ledger holds this as [fam_exchangerate](/theorem/fam_exchangerate) — proven `by decide`, sorry-free:

```lean
(((15000 : Int) / (120 : Int)) = (125 : Int)) ∧ ((fmax (0 : Int) ((10850 : Int) - (10800 : Int))) = (50 : Int)) ∧ ((fmax (0 : Int) ((11000 : Int) - (10900 : Int))) = (100 : Int)) ∧ (((50 : Int) * (3 : Int)) = (150 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (100 : Int)) = (8 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ (((120 : Int) / (20 : Int)) = (6 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int))
```

### exegesis: senseoptions(5) = 32; lexemecombos(15, 2) = 105; parsepaths(4) = 24; morphemecount(12, 3) = 36; variantreadings(40, 12) = 52; clauseorderings(5, 3) = 60; rootmatches(300, 15) = 20; semanticrange(90, 30) = 60
The ledger holds this as [fam_exegesis](/theorem/fam_exegesis) — proven `by decide`, sorry-free:

```lean
(((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (15 : Int)) (Int.toNat (2 : Int)))) = (105 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ (((12 : Int) * (3 : Int)) = (36 : Int)) ∧ (((40 : Int) + (12 : Int)) = (52 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (5 : Int)))) / (Int.ofNat (ffact (Int.toNat ((5 : Int) - (3 : Int)))))) = (60 : Int)) ∧ (((300 : Int) / (15 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (30 : Int))) = (60 : Int))
```

### existentialism: freedomchoices(5) = 32; authenticitymodes(2, 1) = 3; anguishindex(60, 100) = 60; projectorderings(4) = 24; facticitypairs(6, 2) = 15; badfaithratio(40, 100) = 40; situationsubsets(4) = 16; becomingstages(3, 2) = 5
The ledger holds this as [fam_existentialism](/theorem/fam_existentialism) — proven `by decide`, sorry-free:

```lean
(((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ (((2 : Int) + (1 : Int)) = (3 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int))
```

### exoplanet: transitdepth(10, 100) = 10000; orbitalperiod(36500, 100) = 365; habitablezone(1000, 4) = 250; radiusratio(10, 100) = 100; transitduration(2400, 5) = 12; equilibriumtemp(5800, 20) = 290; massratio(1, 333000) = 3; semiamplitude(5, 2, 2) = 1250; habitablezone(1000, 0) = 0
The ledger holds this as [fam_exoplanet](/theorem/fam_exoplanet) — proven `by decide`, sorry-free:

```lean
(((((10 : Int) ^ (2 : Nat)) * (1000000 : Int)) / ((100 : Int) ^ (2 : Nat))) = (10000 : Int)) ∧ (((36500 : Int) / (100 : Int)) = (365 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ ((((10 : Int) * (1000 : Int)) / (100 : Int)) = (100 : Int)) ∧ ((((2400 : Int) * (5 : Int)) / (1000 : Int)) = (12 : Int)) ∧ (((5800 : Int) / (20 : Int)) = (290 : Int)) ∧ ((((1 : Int) * (1000000 : Int)) / (333000 : Int)) = (3 : Int)) ∧ ((((5 : Int) * (1000 : Int)) / ((2 : Int) * (2 : Int))) = (1250 : Int)) ∧ (((1000 : Int) / (0 : Int)) = (0 : Int))
```

### exoplanets: transitdepth(2, 100) = 400; transitdepth(2, 0) = 0; period(6283, 10) = 628; semimajor(150, 50) = 100; radius(12742) = 6371; transitduration(365, 100, 50) = 730; radialvelocity(1, 100) = 10; insolation(10000, 10) = 100; density(5000, 1000) = 5
The ledger holds this as [fam_exoplanets](/theorem/fam_exoplanets) — proven `by decide`, sorry-free:

```lean
(((((2 : Int) ^ (2 : Nat)) * (1000000 : Int)) / ((100 : Int) ^ (2 : Nat))) = (400 : Int)) ∧ (((((2 : Int) ^ (2 : Nat)) * (1000000 : Int)) / ((0 : Int) ^ (2 : Nat))) = (0 : Int)) ∧ (((6283 : Int) / (10 : Int)) = (628 : Int)) ∧ ((((150 : Int) + (50 : Int)) / (2 : Int)) = (100 : Int)) ∧ (((12742 : Int) / (2 : Int)) = (6371 : Int)) ∧ ((((365 : Int) * (100 : Int)) / (50 : Int)) = (730 : Int)) ∧ ((((1 : Int) * (1000 : Int)) / (100 : Int)) = (10 : Int)) ∧ (((10000 : Int) / ((10 : Int) ^ (2 : Nat))) = (100 : Int)) ∧ (((5000 : Int) / (1000 : Int)) = (5 : Int))
```


::: warning 
THE FAMILIES, E — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. The boundary is confirmed by the wing's own sealed theorems — e.g. [fam_earnedvalue](/theorem/fam_earnedvalue) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
