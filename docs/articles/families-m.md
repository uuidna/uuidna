---
title: "THE FAMILIES, M"
description: "Computed from lean/FamiliesM.lean — 67 sealed theorems, every claim citing its proof."
---

# THE FAMILIES, M

> THE FAMILIES, M — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. — held by [fam_machining](/theorem/fam_machining) and its 66 siblings below.

**67 theorems** and **25,824 decided cases**, from [fam_machining](/theorem/fam_machining) onward, each proven `by decide` in <a href="/lean/FamiliesM.lean">lean/FamiliesM.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFamiliesM.lean)** — nothing to install. The editor fetches `lean/FamiliesM.lean` from the repository and re-decides all 67 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### machining: chipload(100, 4) = 25; cuttingspeed(50, 2000) = 314; feedrate(5, 2000) = 10000; materialremoval(3, 10) = 30; passrate(950, 1000) = 95; passrate(0, 0) = 0; surfacefinish(32) = 32; toollife(10000, 25) = 400; toollife(10000, 0) = 0; tolerance(5, 10000) = 500; tolerance(5, 0) = 0
The ledger holds this as [fam_machining](/theorem/fam_machining) — proven `by decide`, sorry-free:

```lean
(((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((((50 : Int) * (2000 : Int)) * (314 : Int)) / (100000 : Int)) = (314 : Int)) ∧ (((5 : Int) * (2000 : Int)) = (10000 : Int)) ∧ (((3 : Int) * (10 : Int)) = (30 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((((0 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int)) ∧ ((32 : Int) = (32 : Int)) ∧ (((10000 : Int) / (25 : Int)) = (400 : Int)) ∧ (((10000 : Int) / (0 : Int)) = (0 : Int)) ∧ ((((5 : Int) * (1000000 : Int)) / (10000 : Int)) = (500 : Int)) ∧ ((((5 : Int) * (1000000 : Int)) / (0 : Int)) = (0 : Int))
```

### macroeconomics: gdp(1000, 500) = 1500; inflation(110, 100) = 10; unemployment(5, 100) = 5; growth(110, 100) = 10; multiplier(100, 80) = 500; velocity(2000, 100) = 20; deficit(1000, 700) = 300; debt(300, 1000) = 30
The ledger holds this as [fam_macroeconomics](/theorem/fam_macroeconomics) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) + (500 : Int)) = (1500 : Int)) ∧ (((((110 : Int) - (100 : Int)) * (100 : Int)) / (100 : Int)) = (10 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((((110 : Int) - (100 : Int)) * (100 : Int)) / (100 : Int)) = (10 : Int)) ∧ ((((100 : Int) * (100 : Int)) / ((100 : Int) - (80 : Int))) = (500 : Int)) ∧ (((2000 : Int) / (100 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (700 : Int))) = (300 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int))
```

### magnetism: field(5, 200) = 1000; force(3, 40) = 120; flux(10, 50) = 500; induction(1000, 4) = 250; induction(1000, 0) = 0; torque(6, 7) = 42; permeability(900, 3) = 300; permeability(900, 0) = 0; reluctance(5, 2) = 2500; reluctance(5, 0) = 0; dipole(100, 4) = 25; dipole(100, 0) = 0
The ledger holds this as [fam_magnetism](/theorem/fam_magnetism) — proven `by decide`, sorry-free:

```lean
(((5 : Int) * (200 : Int)) = (1000 : Int)) ∧ (((3 : Int) * (40 : Int)) = (120 : Int)) ∧ (((10 : Int) * (50 : Int)) = (500 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((1000 : Int) / (0 : Int)) = (0 : Int)) ∧ (((6 : Int) * (7 : Int)) = (42 : Int)) ∧ (((900 : Int) / (3 : Int)) = (300 : Int)) ∧ (((900 : Int) / (0 : Int)) = (0 : Int)) ∧ ((((5 : Int) * (1000 : Int)) / (2 : Int)) = (2500 : Int)) ∧ ((((5 : Int) * (1000 : Int)) / (0 : Int)) = (0 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((100 : Int) / (0 : Int)) = (0 : Int))
```

### magnetometry: fieldstrength(50000, 1) = 50000; anomaly(52000, 50000) = 2000; declination(15, 3) = 12; inclination(900, 10) = 90; gradient(2000, 100) = 20; surveylines(40, 10) = 400; susceptibility(1000, 100) = 10; reversalcount(5, 3) = 8
The ledger holds this as [fam_magnetometry](/theorem/fam_magnetometry) — proven `by decide`, sorry-free:

```lean
(((50000 : Int) * (1 : Int)) = (50000 : Int)) ∧ ((fmax (0 : Int) ((52000 : Int) - (50000 : Int))) = (2000 : Int)) ∧ ((fmax (0 : Int) ((15 : Int) - (3 : Int))) = (12 : Int)) ∧ (((900 : Int) / (10 : Int)) = (90 : Int)) ∧ (((2000 : Int) / (100 : Int)) = (20 : Int)) ∧ (((40 : Int) * (10 : Int)) = (400 : Int)) ∧ (((1000 : Int) / (100 : Int)) = (10 : Int)) ∧ (((5 : Int) + (3 : Int)) = (8 : Int))
```

### maillard: reactionrate(75, 100) = 75; browningindex(6, 12) = 72; temperaturefactor(180, 30) = 6; aminosugarratio(40, 60) = 66; flavorcompounds(12, 8) = 96; phfactor(70, 10) = 7; timetocolor(300, 5) = 60; crustthickness(10, 3) = 7
The ledger holds this as [fam_maillard](/theorem/fam_maillard) — proven `by decide`, sorry-free:

```lean
((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ (((6 : Int) * (12 : Int)) = (72 : Int)) ∧ (((180 : Int) / (30 : Int)) = (6 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (60 : Int)) = (66 : Int)) ∧ (((12 : Int) * (8 : Int)) = (96 : Int)) ∧ (((70 : Int) / (10 : Int)) = (7 : Int)) ∧ (((300 : Int) / (5 : Int)) = (60 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (3 : Int))) = (7 : Int))
```

### malacology: shellwhorls(5, 2) = 7; spiralratio(161, 100) = 161; speciescount(800, 10) = 8000; radulateeth(100, 5) = 500; chambercount(30, 0) = 30; growthlines(12, 3) = 36; shellcombos(10, 2) = 45; aperturesize(100, 4) = 25
The ledger holds this as [fam_malacology](/theorem/fam_malacology) — proven `by decide`, sorry-free:

```lean
(((5 : Int) + (2 : Int)) = (7 : Int)) ∧ ((((161 : Int) * (100 : Int)) / (100 : Int)) = (161 : Int)) ∧ (((800 : Int) * (10 : Int)) = (8000 : Int)) ∧ (((100 : Int) * (5 : Int)) = (500 : Int)) ∧ (((30 : Int) + (0 : Int)) = (30 : Int)) ∧ (((12 : Int) * (3 : Int)) = (36 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int))
```

### malware: detection(950, 1000) = 95; falsepositive(5, 1000) = 0; spread(30, 100) = 30; signatures(50000) = 50000; quarantine(90, 100) = 90; dwell(21) = 21; entropy(7, 10) = 70; remediation(80, 100) = 80
The ledger holds this as [fam_malware](/theorem/fam_malware) — proven `by decide`, sorry-free:

```lean
((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (1000 : Int)) = (0 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((50000 : Int) = (50000 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((21 : Int) = (21 : Int)) ∧ ((((7 : Int) * (100 : Int)) / (10 : Int)) = (70 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### mammalogy: gestation(280) = 280; metabolism(70, 3) = 210; homerange(70, 4) = 280; litter(12, 3) = 4; lactation(6000, 60) = 100; territory(100, 25) = 4; thermoneutral(37, 20) = 17; thermoneutral(20, 37) = 0; survival(80, 100) = 80
The ledger holds this as [fam_mammalogy](/theorem/fam_mammalogy) — proven `by decide`, sorry-free:

```lean
((280 : Int) = (280 : Int)) ∧ (((70 : Int) * (3 : Int)) = (210 : Int)) ∧ (((70 : Int) * (4 : Int)) = (280 : Int)) ∧ (((12 : Int) / (3 : Int)) = (4 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((100 : Int) / (25 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((37 : Int) - (20 : Int))) = (17 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (37 : Int))) = (0 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### manifold: dimension(5, 2) = 3; genus(0) = 1; bettinumber(10, 4) = 6; eulercharacteristic(8, 12, 6) = 2; chartcount(100, 30) = 4; boundarycomponents(10, 7) = 3; homologyrank(1, 2, 1) = 4
The ledger holds this as [fam_manifold](/theorem/fam_manifold) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((5 : Int) - (2 : Int))) = (3 : Int)) ∧ ((fmax (0 : Int) (((2 : Int) - (0 : Int)) / (2 : Int))) = (1 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (4 : Int))) = (6 : Int)) ∧ ((fmax (0 : Int) (((8 : Int) + (6 : Int)) - (12 : Int))) = (2 : Int)) ∧ ((-((-(100 : Int)) / (30 : Int))) = (4 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (7 : Int))) = (3 : Int)) ∧ ((((1 : Int) + (2 : Int)) + (1 : Int)) = (4 : Int))
```

### manipulator: dof(6, 0) = 6; reach(3, 400) = 1200; payload(600, 3) = 200; workspace(10, 5) = 500; jointrange(270, 90) = 180; repeatability(100, 8) = 12; linkspeed(1000, 4) = 250; singularities(2, 1, 2) = 5; payload(100, 0) = 0
The ledger holds this as [fam_manipulator](/theorem/fam_manipulator) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((6 : Int) - (0 : Int))) = (6 : Int)) ∧ (((3 : Int) * (400 : Int)) = (1200 : Int)) ∧ (((600 : Int) / (3 : Int)) = (200 : Int)) ∧ ((((10 : Int) * (10 : Int)) * (5 : Int)) = (500 : Int)) ∧ ((fmax (0 : Int) ((270 : Int) - (90 : Int))) = (180 : Int)) ∧ (((100 : Int) / (8 : Int)) = (12 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ ((((2 : Int) + (1 : Int)) + (2 : Int)) = (5 : Int)) ∧ (((100 : Int) / (0 : Int)) = (0 : Int))
```

### manufacturing: throughput(1200, 8) = 150; oee(90, 80) = 72; defects(5, 1000) = 0; cycletime(480, 120) = 4; yield(950, 1000) = 95; takt(28800, 240) = 120; inventory(500, 50) = 10; capacity(12, 100) = 1200
The ledger holds this as [fam_manufacturing](/theorem/fam_manufacturing) — proven `by decide`, sorry-free:

```lean
(((1200 : Int) / (8 : Int)) = (150 : Int)) ∧ ((((90 : Int) * (80 : Int)) / (100 : Int)) = (72 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (1000 : Int)) = (0 : Int)) ∧ (((480 : Int) / (120 : Int)) = (4 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ (((28800 : Int) / (240 : Int)) = (120 : Int)) ∧ (((500 : Int) / (50 : Int)) = (10 : Int)) ∧ (((12 : Int) * (100 : Int)) = (1200 : Int))
```

### marination: penetrationdepth(20, 4) = 5; aciduptake(15, 100) = 15; tenderization(40, 100) = 40; marinatetime(4, 60) = 240; saltdiffusion(100, 10) = 10; flavorload(12, 5) = 60; phshift(60, 45) = 15; weightgain(8, 100) = 8
The ledger holds this as [fam_marination](/theorem/fam_marination) — proven `by decide`, sorry-free:

```lean
(((20 : Int) / (4 : Int)) = (5 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (100 : Int)) = (15 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((4 : Int) * (60 : Int)) = (240 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ (((12 : Int) * (5 : Int)) = (60 : Int)) ∧ ((fmax (0 : Int) ((60 : Int) - (45 : Int))) = (15 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (100 : Int)) = (8 : Int))
```

### maritime: demurrage(5, 8) = 3; demurrage(8, 5) = 0; freight(5000, 12) = 60000; generalaverage(20000, 500000) = 4; salvage(1000000, 15) = 150000; tonnage(100, 20, 8) = 160; draft(1000, 50) = 20; collision(3, 4) = 75; limitation(5000, 60) = 300000
The ledger holds this as [fam_maritime](/theorem/fam_maritime) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((8 : Int) - (5 : Int))) = (3 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (8 : Int))) = (0 : Int)) ∧ (((5000 : Int) * (12 : Int)) = (60000 : Int)) ∧ ((((20000 : Int) * (100 : Int)) / (500000 : Int)) = (4 : Int)) ∧ ((((1000000 : Int) * (15 : Int)) / (100 : Int)) = (150000 : Int)) ∧ (((((100 : Int) * (20 : Int)) * (8 : Int)) / (100 : Int)) = (160 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ (((5000 : Int) * (60 : Int)) = (300000 : Int))
```

### marketing: roas(40000, 10000) = 400; cpc(5000, 2500) = 2; cpm(5000, 1000000) = 5; cpl(10000, 200) = 50; roi(15000, 10000) = 50; roi(5000, 10000) = -50; budget(500, 30) = 15000; reach(15000, 5) = 3000000; churn(50, 1000) = 5
The ledger holds this as [fam_marketing](/theorem/fam_marketing) — proven `by decide`, sorry-free:

```lean
((((40000 : Int) * (100 : Int)) / (10000 : Int)) = (400 : Int)) ∧ (((5000 : Int) / (2500 : Int)) = (2 : Int)) ∧ ((((5000 : Int) * (1000 : Int)) / (1000000 : Int)) = (5 : Int)) ∧ (((10000 : Int) / (200 : Int)) = (50 : Int)) ∧ (((((15000 : Int) - (10000 : Int)) * (100 : Int)) / (10000 : Int)) = (50 : Int)) ∧ (((((5000 : Int) - (10000 : Int)) * (100 : Int)) / (10000 : Int)) = (-50 : Int)) ∧ (((500 : Int) * (30 : Int)) = (15000 : Int)) ∧ ((((15000 : Int) * (1000 : Int)) / (5 : Int)) = (3000000 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int))
```

### masonry: bricks(10, 60) = 600; mortar(600, 2) = 1200; courses(1000, 75) = 13; bond(1000, 250) = 4; wall(5, 3) = 15; joint(13, 10) = 130; coverage(600, 60) = 10; waste(600, 5) = 30
The ledger holds this as [fam_masonry](/theorem/fam_masonry) — proven `by decide`, sorry-free:

```lean
(((10 : Int) * (60 : Int)) = (600 : Int)) ∧ (((600 : Int) * (2 : Int)) = (1200 : Int)) ∧ (((1000 : Int) / (75 : Int)) = (13 : Int)) ∧ (((1000 : Int) / (250 : Int)) = (4 : Int)) ∧ (((5 : Int) * (3 : Int)) = (15 : Int)) ∧ (((13 : Int) * (10 : Int)) = (130 : Int)) ∧ (((600 : Int) / (60 : Int)) = (10 : Int)) ∧ ((((600 : Int) * (5 : Int)) / (100 : Int)) = (30 : Int))
```

### materials: stress(1000, 10) = 100; strain(5, 100) = 5; density(1000, 10) = 100; modulus(200, 2) = 100; hardness(500, 5) = 100; fatigue(100, 1000) = 1; fatigue(2000, 1000) = 0; thermal(10, 12) = 120; yield(50, 100) = 1; yield(150, 100) = 0
The ledger holds this as [fam_materials](/theorem/fam_materials) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((200 : Int) / (2 : Int)) = (100 : Int)) ∧ (((500 : Int) / (5 : Int)) = (100 : Int)) ∧ ((if (if (100 : Int) ≤ (1000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (2000 : Int) ≤ (1000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((10 : Int) * (12 : Int)) = (120 : Int)) ∧ ((if (if (50 : Int) ≤ (100 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (150 : Int) ≤ (100 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int))
```

### matrix: elements(4, 4) = 16; mults(4, 4, 4) = 64; adds(16, 3) = 48; trace(10, 6) = 16; rank(4, 3) = 3; determinant(100, 40) = 60; transpose(4, 4) = 16; combos(4, 2) = 6; ranknullity(2, 3) = 5; nullity(4, 1) = 3; symmetricentries(4) = 10; offdiagonal(4) = 12; identitytrace(5) = 5; minors(4) = 16
The ledger holds this as [fam_matrix](/theorem/fam_matrix) — proven `by decide`, sorry-free:

```lean
(((4 : Int) * (4 : Int)) = (16 : Int)) ∧ ((((4 : Int) * (4 : Int)) * (4 : Int)) = (64 : Int)) ∧ (((16 : Int) * (3 : Int)) = (48 : Int)) ∧ (((10 : Int) + (6 : Int)) = (16 : Int)) ∧ ((fmin (4 : Int) (3 : Int)) = (3 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (40 : Int))) = (60 : Int)) ∧ (((4 : Int) * (4 : Int)) = (16 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (4 : Int)) (Int.toNat (2 : Int)))) = (6 : Int)) ∧ (((2 : Int) + (3 : Int)) = (5 : Int)) ∧ (((4 : Int) - (1 : Int)) = (3 : Int)) ∧ ((((4 : Int) * ((4 : Int) + (1 : Int))) / (2 : Int)) = (10 : Int)) ∧ (((4 : Int) * ((4 : Int) - (1 : Int))) = (12 : Int)) ∧ ((5 : Int) = (5 : Int)) ∧ (((4 : Int) ^ (2 : Nat)) = (16 : Int))
```

### mealplanning: meals(3, 7) = 21; portions(4, 3) = 12; caloriesperday(2000, 1) = 2000; ingredientpairs(20, 2) = 190; weeklyorderings(5) = 120; varietysubsets(5) = 32; prepminutes(30, 7) = 210; budgetpermeal(100, 21) = 4
The ledger holds this as [fam_mealplanning](/theorem/fam_mealplanning) — proven `by decide`, sorry-free:

```lean
(((3 : Int) * (7 : Int)) = (21 : Int)) ∧ (((4 : Int) * (3 : Int)) = (12 : Int)) ∧ (((2000 : Int) * (1 : Int)) = (2000 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (20 : Int)) (Int.toNat (2 : Int)))) = (190 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ (((30 : Int) * (7 : Int)) = (210 : Int)) ∧ (((100 : Int) / (21 : Int)) = (4 : Int))
```

### mechanical: torque(100, 5) = 500; power(9549, 1000) = 1000; stress(1000, 20) = 50; strain(5, 1000) = 5; gear(60, 20) = 300; efficiency(80, 100) = 80; thermal(1000, 25) = 40; spring(500, 10) = 50
The ledger holds this as [fam_mechanical](/theorem/fam_mechanical) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * (5 : Int)) = (500 : Int)) ∧ ((((9549 : Int) * (1000 : Int)) / (9549 : Int)) = (1000 : Int)) ∧ (((1000 : Int) / (20 : Int)) = (50 : Int)) ∧ ((((5 : Int) * (1000 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (20 : Int)) = (300 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((1000 : Int) / (25 : Int)) = (40 : Int)) ∧ (((500 : Int) / (10 : Int)) = (50 : Int))
```

### med: bmi(80, 180) = 24; dose(70, 5) = 350; gcs(4, 5, 6) = 15; gcs(1, 1, 1) = 3; map(120, 80) = 93; packyears(20, 15) = 15; impairment(30, 100) = 30; causation(250, 100) = 250; frequency(8) = 3
The ledger holds this as [fam_med](/theorem/fam_med) — proven `by decide`, sorry-free:

```lean
((((80 : Int) * (10000 : Int)) / ((180 : Int) ^ (2 : Nat))) = (24 : Int)) ∧ (((70 : Int) * (5 : Int)) = (350 : Int)) ∧ ((((4 : Int) + (5 : Int)) + (6 : Int)) = (15 : Int)) ∧ ((((1 : Int) + (1 : Int)) + (1 : Int)) = (3 : Int)) ∧ ((((120 : Int) + ((2 : Int) * (80 : Int))) / (3 : Int)) = (93 : Int)) ∧ ((((20 : Int) * (15 : Int)) / (20 : Int)) = (15 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (100 : Int)) = (250 : Int)) ∧ (((24 : Int) / (8 : Int)) = (3 : Int))
```

### media: aspect(1600, 900) = 177; gallery(10, 3) = 4; lazy(6, 10) = 60; caption(80, 120) = 1; caption(200, 120) = 0; sizes(5) = 5; fit(800, 1000) = 80; load(10000, 500) = 20; ratio(1600, 900) = 1; ratio(900, 1600) = 0
The ledger holds this as [fam_media](/theorem/fam_media) — proven `by decide`, sorry-free:

```lean
((((1600 : Int) * (100 : Int)) / (900 : Int)) = (177 : Int)) ∧ ((-((-(10 : Int)) / (3 : Int))) = (4 : Int)) ∧ ((((6 : Int) * (100 : Int)) / (10 : Int)) = (60 : Int)) ∧ ((if (if (80 : Int) ≤ (120 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (200 : Int) ≤ (120 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((5 : Int) = (5 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (1000 : Int)) = (80 : Int)) ∧ (((10000 : Int) / (500 : Int)) = (20 : Int)) ∧ ((if (if (1600 : Int) ≥ (900 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (900 : Int) ≥ (1600 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int))
```

### meiosis: gametes(10) = 40; haploid(46) = 23; crossovers(23, 2) = 46; recombinants(15, 100) = 15; variation(4, 4) = 16; diploidrestore(23) = 46; chromatids(46) = 92; segregation(100, 3, 4) = 75; segregation(100, 1, 0) = 0
The ledger holds this as [fam_meiosis](/theorem/fam_meiosis) — proven `by decide`, sorry-free:

```lean
(((10 : Int) * (4 : Int)) = (40 : Int)) ∧ (((46 : Int) / (2 : Int)) = (23 : Int)) ∧ (((23 : Int) * (2 : Int)) = (46 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (100 : Int)) = (15 : Int)) ∧ (((4 : Int) * (4 : Int)) = (16 : Int)) ∧ (((23 : Int) * (2 : Int)) = (46 : Int)) ∧ (((46 : Int) * (2 : Int)) = (92 : Int)) ∧ ((((100 : Int) * (3 : Int)) / (4 : Int)) = (75 : Int)) ∧ ((((100 : Int) * (1 : Int)) / (0 : Int)) = (0 : Int))
```

### melody: range(60, 48) = 12; contour(20, 8) = 12; stepleap(80, 20) = 80; phraselength(64, 8) = 8; motifrepeat(48, 4) = 12; pitchclass(64) = 4; transposition(60, 7) = 7; density(100, 50) = 200; phraselength(64, 0) = 0
The ledger holds this as [fam_melody](/theorem/fam_melody) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((60 : Int) - (48 : Int))) = (12 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (8 : Int))) = (12 : Int)) ∧ ((((80 : Int) * (100 : Int)) / ((80 : Int) + (20 : Int))) = (80 : Int)) ∧ (((64 : Int) / (8 : Int)) = (8 : Int)) ∧ (((48 : Int) / (4 : Int)) = (12 : Int)) ∧ (((64 : Int) % (12 : Int)) = (4 : Int)) ∧ ((((60 : Int) + (7 : Int)) % (12 : Int)) = (7 : Int)) ∧ ((((100 : Int) * (100 : Int)) / (50 : Int)) = (200 : Int)) ∧ (((64 : Int) / (0 : Int)) = (0 : Int))
```

### membrane: restingpotential(90, 20) = 70; nernst(2, 1) = 122; permeability(1000, 10, 5) = 20; fluidity(300, 10) = 30; surfacearea(5) = 300; transportrate(6000, 60) = 100; capacitance(1000, 10) = 100; selectivity(95, 100) = 95; selectivity(50, 100) = 50
The ledger holds this as [fam_membrane](/theorem/fam_membrane) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((90 : Int) - (20 : Int))) = (70 : Int)) ∧ ((((61 : Int) * (2 : Int)) / (1 : Int)) = (122 : Int)) ∧ (((1000 : Int) / ((10 : Int) * (5 : Int))) = (20 : Int)) ∧ (((300 : Int) / (10 : Int)) = (30 : Int)) ∧ (((12 : Int) * ((5 : Int) ^ (2 : Nat))) = (300 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int))
```

### memory: retention(90, 100) = 90; forgetting(10, 100) = 10; recall(75, 100) = 75; recognition(95, 100) = 95; span(7) = 7; consolidation(80, 100) = 80; interference(20, 100) = 20; spacing(12, 3) = 4
The ledger holds this as [fam_memory](/theorem/fam_memory) — proven `by decide`, sorry-free:

```lean
((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((10 : Int) * (100 : Int)) / (100 : Int)) = (10 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((7 : Int) = (7 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ (((12 : Int) / (3 : Int)) = (4 : Int))
```

### merchandising: margin(100, 60) = 40; markup(100, 80) = 25; sellthrough(75, 100) = 75; turnover(1000, 200) = 5; facings(120, 8) = 15; planogram(5, 20) = 100; assortment(12, 30) = 360; gmroi(500, 250) = 200
The ledger holds this as [fam_merchandising](/theorem/fam_merchandising) — proven `by decide`, sorry-free:

```lean
(((((100 : Int) - (60 : Int)) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((((100 : Int) - (80 : Int)) * (100 : Int)) / (80 : Int)) = (25 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ (((1000 : Int) / (200 : Int)) = (5 : Int)) ∧ (((120 : Int) / (8 : Int)) = (15 : Int)) ∧ (((5 : Int) * (20 : Int)) = (100 : Int)) ∧ (((12 : Int) * (30 : Int)) = (360 : Int)) ∧ ((((500 : Int) * (100 : Int)) / (250 : Int)) = (200 : Int))
```

### merkle: leaves(4) = 16; treeheight(4, 0) = 4; proofsize(4, 32) = 128; hashcombos(8, 2) = 28; nodecount(2, 15) = 30; siblingpairs(16, 2) = 120; rootpaths(4, 2) = 12; verificationsteps(4, 1) = 5
The ledger holds this as [fam_merkle](/theorem/fam_merkle) — proven `by decide`, sorry-free:

```lean
(((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ (((4 : Int) * (32 : Int)) = (128 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ (((2 : Int) * (15 : Int)) = (30 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (16 : Int)) (Int.toNat (2 : Int)))) = (120 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (4 : Int)))) / (Int.ofNat (ffact (Int.toNat ((4 : Int) - (2 : Int)))))) = (12 : Int)) ∧ (((4 : Int) + (1 : Int)) = (5 : Int))
```

### messaging: delivery(950, 1000) = 95; open(300, 950) = 31; bounce(50, 1000) = 5; latency(4000, 1000) = 4; queue(1000, 700) = 300; throughput(6000, 60) = 100; cost(100000, 50) = 5000; retry(10, 3) = 3
The ledger holds this as [fam_messaging](/theorem/fam_messaging) — proven `by decide`, sorry-free:

```lean
((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (950 : Int)) = (31 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ (((4000 : Int) / (1000 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (700 : Int))) = (300 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((((100000 : Int) * (50 : Int)) / (1000 : Int)) = (5000 : Int)) ∧ ((fmin (10 : Int) (3 : Int)) = (3 : Int))
```

### metabolism: bmr(1500, 1) = 1500; atp(36, 1) = 36; calories(2000, 1) = 2000; pathways(3, 0) = 3; glucose(180, 6) = 30; oxygen(250, 1) = 250; enzymes(100, 5) = 500; combos(6, 2) = 15
The ledger holds this as [fam_metabolism](/theorem/fam_metabolism) — proven `by decide`, sorry-free:

```lean
(((1500 : Int) * (1 : Int)) = (1500 : Int)) ∧ (((36 : Int) * (1 : Int)) = (36 : Int)) ∧ (((2000 : Int) * (1 : Int)) = (2000 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((180 : Int) / (6 : Int)) = (30 : Int)) ∧ (((250 : Int) * (1 : Int)) = (250 : Int)) ∧ (((100 : Int) * (5 : Int)) = (500 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### metabolomics: concentration(1000, 50) = 20; flux(12, 5) = 60; pathway(100, 8) = 12; foldchange(300, 100) = 300; turnover(25, 200) = 12; retention(42) = 42; ratio(45, 90) = 50; coverage(80, 100) = 80
The ledger holds this as [fam_metabolomics](/theorem/fam_metabolomics) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ (((12 : Int) * (5 : Int)) = (60 : Int)) ∧ (((100 : Int) / (8 : Int)) = (12 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (100 : Int)) = (300 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (200 : Int)) = (12 : Int)) ∧ ((42 : Int) = (42 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (90 : Int)) = (50 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### metallurgy: hardness(600, 3) = 200; alloy(18, 100) = 18; tensile(5000, 25) = 200; ductility(120, 100) = 20; grain(1000, 25) = 40; modulus(400, 2) = 200; fatigue(1000000, 500) = 2000; corrosion(15, 100) = 15
The ledger holds this as [fam_metallurgy](/theorem/fam_metallurgy) — proven `by decide`, sorry-free:

```lean
(((600 : Int) / (3 : Int)) = (200 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (100 : Int)) = (18 : Int)) ∧ (((5000 : Int) / (25 : Int)) = (200 : Int)) ∧ (((((120 : Int) - (100 : Int)) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ (((1000 : Int) / (25 : Int)) = (40 : Int)) ∧ (((400 : Int) / (2 : Int)) = (200 : Int)) ∧ (((1000000 : Int) / (500 : Int)) = (2000 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (100 : Int)) = (15 : Int))
```

### meteoritics: energy(10, 20) = 2000; crater(2000, 5) = 400; ablation(100, 30) = 70; flux(1000, 50) = 20; velocity(6000, 60) = 100; composition(30, 120) = 25; magnitude(900, 3) = 100; survival(100, 70) = 30; survival(50, 80) = 0
The ledger holds this as [fam_meteoritics](/theorem/fam_meteoritics) — proven `by decide`, sorry-free:

```lean
((((10 : Int) * ((20 : Int) ^ (2 : Nat))) / (2 : Int)) = (2000 : Int)) ∧ (((2000 : Int) / (5 : Int)) = (400 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ (((900 : Int) / ((3 : Int) ^ (2 : Nat))) = (100 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (70 : Int))) = (30 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (80 : Int))) = (0 : Int))
```

### meteorology: humidity(75, 100) = 75; dewpoint(20, 5) = 15; heatindex(30, 10) = 40; windchill(10, 4) = 6; pressure(1013, 13) = 1000; lapse(25, 6) = 19; precipitation(1000, 50) = 20; visibility(80, 40) = 200
The ledger holds this as [fam_meteorology](/theorem/fam_meteorology) — proven `by decide`, sorry-free:

```lean
((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (5 : Int))) = (15 : Int)) ∧ (((30 : Int) + (10 : Int)) = (40 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (4 : Int))) = (6 : Int)) ∧ ((fmax (0 : Int) ((1013 : Int) - (13 : Int))) = (1000 : Int)) ∧ ((fmax (0 : Int) ((25 : Int) - (6 : Int))) = (19 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (40 : Int)) = (200 : Int))
```

### microbiology: growth(100, 3) = 800; generation(600, 3) = 200; cfu(50, 1000) = 50000; mic(8) = 8; resistance(25, 100) = 25; zone(18) = 18; viability(950, 1000) = 95; od(1000, 10) = 100
The ledger holds this as [fam_microbiology](/theorem/fam_microbiology) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * ((2 : Int) ^ (3 : Nat))) = (800 : Int)) ∧ (((600 : Int) / (3 : Int)) = (200 : Int)) ∧ (((50 : Int) * (1000 : Int)) = (50000 : Int)) ∧ ((8 : Int) = (8 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int)) ∧ ((18 : Int) = (18 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int))
```

### microeconomics: elasticity(20, 5) = 400; surplus(100, 70) = 30; marginal(500, 25) = 20; equilibrium(80, 100) = 20; utility(90, 30) = 3; profit(1000, 600) = 400; monopoly(60, 100) = 60; deadweight(15, 100) = 15; elasticity(20, 0) = 0; surplus(50, 70) = 0
The ledger holds this as [fam_microeconomics](/theorem/fam_microeconomics) — proven `by decide`, sorry-free:

```lean
((((20 : Int) * (100 : Int)) / (5 : Int)) = (400 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (70 : Int))) = (30 : Int)) ∧ (((500 : Int) / (25 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (80 : Int))) = (20 : Int)) ∧ (((90 : Int) / (30 : Int)) = (3 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (600 : Int))) = (400 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (100 : Int)) = (15 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (70 : Int))) = (0 : Int))
```

### microscopy: magnification(40, 10) = 400; resolution(500, 2) = 125; resolution(500, 0) = 0; numericalaperture(1, 55) = 55; fieldofview(20, 40) = 500; depthoffield(500, 5) = 20; totalmag(40, 10, 2) = 800; workingdistance(300, 2) = 150; pixelsize(36000, 6000) = 6
The ledger holds this as [fam_microscopy](/theorem/fam_microscopy) — proven `by decide`, sorry-free:

```lean
(((40 : Int) * (10 : Int)) = (400 : Int)) ∧ (((500 : Int) / ((2 : Int) * (2 : Int))) = (125 : Int)) ∧ (((500 : Int) / ((2 : Int) * (0 : Int))) = (0 : Int)) ∧ (((1 : Int) * (55 : Int)) = (55 : Int)) ∧ ((((20 : Int) * (1000 : Int)) / (40 : Int)) = (500 : Int)) ∧ (((500 : Int) / ((5 : Int) * (5 : Int))) = (20 : Int)) ∧ ((((40 : Int) * (10 : Int)) * (2 : Int)) = (800 : Int)) ∧ (((300 : Int) / (2 : Int)) = (150 : Int)) ∧ (((36000 : Int) / (6000 : Int)) = (6 : Int))
```

### migration: netmigration(5000, 3000) = 2000; netmigration(3000, 5000) = 0; grossflow(5000, 3000) = 8000; rate(2000, 50000) = 40; pushpull(30, 70) = 40; remittanceshare(300, 1500) = 20; settlementratio(800, 1000) = 80; returnrate(250, 1000) = 25; integrationindex(60, 90, 3) = 51
The ledger holds this as [fam_migration](/theorem/fam_migration) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((5000 : Int) - (3000 : Int))) = (2000 : Int)) ∧ ((fmax (0 : Int) ((3000 : Int) - (5000 : Int))) = (0 : Int)) ∧ (((5000 : Int) + (3000 : Int)) = (8000 : Int)) ∧ ((((2000 : Int) * (1000 : Int)) / (50000 : Int)) = (40 : Int)) ∧ ((fmax (0 : Int) ((70 : Int) - (30 : Int))) = (40 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1500 : Int)) = (20 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (1000 : Int)) = (80 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ (((((60 : Int) + (90 : Int)) + (3 : Int)) / (3 : Int)) = (51 : Int))
```

### milling: extraction(720, 1000) = 72; yield(1000, 75) = 750; throughput(6000, 60) = 100; flour(1000, 250) = 750; bran(1000, 750) = 250; fineness(950, 1000) = 95; moisture(14, 100) = 14; blend(600, 300, 100) = 1000
The ledger holds this as [fam_milling](/theorem/fam_milling) — proven `by decide`, sorry-free:

```lean
((((720 : Int) * (100 : Int)) / (1000 : Int)) = (72 : Int)) ∧ ((((1000 : Int) * (75 : Int)) / (100 : Int)) = (750 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (250 : Int))) = (750 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (750 : Int))) = (250 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((((14 : Int) * (100 : Int)) / (100 : Int)) = (14 : Int)) ∧ ((((600 : Int) + (300 : Int)) + (100 : Int)) = (1000 : Int))
```

### mime: gestures(12, 8) = 20; illusiontypes(4, 3) = 12; isolationpoints(6, 6) = 12; sequenceorderings(4) = 24; gesturepairs(12, 2) = 66; tempobeats(60, 1) = 60; spacegrid(8, 8) = 64; claritypct(90, 100) = 90
The ledger holds this as [fam_mime](/theorem/fam_mime) — proven `by decide`, sorry-free:

```lean
(((12 : Int) + (8 : Int)) = (20 : Int)) ∧ (((4 : Int) * (3 : Int)) = (12 : Int)) ∧ (((6 : Int) + (6 : Int)) = (12 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((60 : Int) * (1 : Int)) = (60 : Int)) ∧ (((8 : Int) * (8 : Int)) = (64 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int))
```

### mineralogy: hardness(7) = 7; density(300, 100) = 3; cleavage(3) = 3; refraction(544, 1) = 544000; grade(25, 75) = 25; crystallinity(80, 100) = 80; purity(90, 100) = 90; specific(2650, 1000) = 2650
The ledger holds this as [fam_mineralogy](/theorem/fam_mineralogy) — proven `by decide`, sorry-free:

```lean
((7 : Int) = (7 : Int)) ∧ (((300 : Int) / (100 : Int)) = (3 : Int)) ∧ ((3 : Int) = (3 : Int)) ∧ ((((544 : Int) * (1000 : Int)) / (1 : Int)) = (544000 : Int)) ∧ ((((25 : Int) * (100 : Int)) / ((25 : Int) + (75 : Int))) = (25 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((2650 : Int) * (1000 : Int)) / (1000 : Int)) = (2650 : Int))
```

### mining: grade(5, 1000) = 5000; recovery(90, 100) = 90; reserves(1000000, 5000) = 5000; stripping(300, 100) = 300; cutoff(5000, 3000) = 1; cutoff(2000, 3000) = 0; throughput(12000, 24) = 500; yield(80, 100) = 80; cost(500, 7) = 3500
The ledger holds this as [fam_mining](/theorem/fam_mining) — proven `by decide`, sorry-free:

```lean
((((5 : Int) * (1000000 : Int)) / (1000 : Int)) = (5000 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((1000000 : Int) * (5000 : Int)) / (1000000 : Int)) = (5000 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (100 : Int)) = (300 : Int)) ∧ ((if (if (5000 : Int) ≥ (3000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (2000 : Int) ≥ (3000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((12000 : Int) / (24 : Int)) = (500 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((500 : Int) * (7 : Int)) = (3500 : Int))
```

### mitosis: cellcount(5, 3) = 40; chromosomes(100, 46) = 4600; cyclelength(11, 8, 5) = 24; doublingtime(48, 4) = 12; generations(48, 24) = 2; growthfraction(300, 1000) = 30; mitoticindex(50, 1000) = 5; phasefraction(6, 24) = 25
The ledger holds this as [fam_mitosis](/theorem/fam_mitosis) — proven `by decide`, sorry-free:

```lean
(((5 : Int) * ((2 : Int) ^ (3 : Nat))) = (40 : Int)) ∧ (((100 : Int) * (46 : Int)) = (4600 : Int)) ∧ ((((11 : Int) + (8 : Int)) + (5 : Int)) = (24 : Int)) ∧ (((48 : Int) / (4 : Int)) = (12 : Int)) ∧ (((48 : Int) / (24 : Int)) = (2 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((6 : Int) * (100 : Int)) / (24 : Int)) = (25 : Int))
```

### mixing: gain(100, 3) = 300; headroom(24, 18) = 6; headroom(18, 24) = 0; pan(25, 75) = 25; compression(100, 40, 4) = 55; compression(30, 40, 4) = 30; ratio(100, 25) = 4; loudness(600, 8) = 75; crossfade(100, 200, 25) = 125; bus(8, 125) = 1000
The ledger holds this as [fam_mixing](/theorem/fam_mixing) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * (3 : Int)) = (300 : Int)) ∧ ((fmax (0 : Int) ((24 : Int) - (18 : Int))) = (6 : Int)) ∧ ((fmax (0 : Int) ((18 : Int) - (24 : Int))) = (0 : Int)) ∧ ((((25 : Int) * (100 : Int)) / ((25 : Int) + (75 : Int))) = (25 : Int)) ∧ ((if (if (100 : Int) ≤ (40 : Int) then (1 : Int) else 0) ≠ 0 then (100 : Int) else ((40 : Int) + (((100 : Int) - (40 : Int)) / (4 : Int)))) = (55 : Int)) ∧ ((if (if (30 : Int) ≤ (40 : Int) then (1 : Int) else 0) ≠ 0 then (30 : Int) else ((40 : Int) + (((30 : Int) - (40 : Int)) / (4 : Int)))) = (30 : Int)) ∧ (((100 : Int) / (25 : Int)) = (4 : Int)) ∧ (((600 : Int) / (8 : Int)) = (75 : Int)) ∧ (((((100 : Int) * ((100 : Int) - (25 : Int))) + ((200 : Int) * (25 : Int))) / (100 : Int)) = (125 : Int)) ∧ (((8 : Int) * (125 : Int)) = (1000 : Int))
```

### mixology: abv(40, 100) = 40; dilution(60, 20) = 25; ratio(60, 20) = 3; sugarcontent(200, 50) = 100; servings(750, 50) = 15; pour(3, 30) = 90; balance(20, 12) = 8; strength(40, 90) = 36
The ledger holds this as [fam_mixology](/theorem/fam_mixology) — proven `by decide`, sorry-free:

```lean
((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ ((((20 : Int) * (100 : Int)) / ((60 : Int) + (20 : Int))) = (25 : Int)) ∧ (((60 : Int) / (20 : Int)) = (3 : Int)) ∧ ((((200 : Int) * (50 : Int)) / (100 : Int)) = (100 : Int)) ∧ (((750 : Int) / (50 : Int)) = (15 : Int)) ∧ (((3 : Int) * (30 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (12 : Int))) = (8 : Int)) ∧ ((((40 : Int) * (90 : Int)) / (100 : Int)) = (36 : Int))
```

### ml: parameters(1000, 12) = 12000; accuracy(95, 100) = 95; featurecombos(20, 3) = 1140; epochs(50, 1) = 50; layersubsets(6) = 64; learningrate(1000, 100) = 10; gradientsteps(1000, 10) = 10000; f1score(88, 100) = 88
The ledger holds this as [fam_ml](/theorem/fam_ml) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) * (12 : Int)) = (12000 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (20 : Int)) (Int.toNat (3 : Int)))) = (1140 : Int)) ∧ (((50 : Int) * (1 : Int)) = (50 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ (((1000 : Int) / (100 : Int)) = (10 : Int)) ∧ (((1000 : Int) * (10 : Int)) = (10000 : Int)) ∧ ((((88 : Int) * (100 : Int)) / (100 : Int)) = (88 : Int))
```

### mobility: modeshare(45, 100) = 45; commutetime(30, 60) = 30; triprate(300, 100) = 3; accessibility(1000, 20) = 50; congestion(90, 60) = 150; vehicleoccupancy(120, 40) = 3; farecost(12, 3) = 36; networkcoverage(80, 100) = 80; triprate(10, 0) = 0
The ledger holds this as [fam_mobility](/theorem/fam_mobility) — proven `by decide`, sorry-free:

```lean
((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ ((((30 : Int) * (60 : Int)) / (60 : Int)) = (30 : Int)) ∧ (((300 : Int) / (100 : Int)) = (3 : Int)) ∧ (((1000 : Int) / (20 : Int)) = (50 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (60 : Int)) = (150 : Int)) ∧ (((120 : Int) / (40 : Int)) = (3 : Int)) ∧ (((12 : Int) * (3 : Int)) = (36 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((10 : Int) / (0 : Int)) = (0 : Int))
```

### modular: residue(100, 7) = 2; inverse(22, 7) = 3; classes(1000, 26) = 12; order(6, 2) = 3; power(8) = 256; gcd(12, 18) = 12; ring(7, 0) = 7; combos(8, 2) = 28
The ledger holds this as [fam_modular](/theorem/fam_modular) — proven `by decide`, sorry-free:

```lean
(((100 : Int) % (7 : Int)) = (2 : Int)) ∧ (((22 : Int) / (7 : Int)) = (3 : Int)) ∧ (((1000 : Int) % (26 : Int)) = (12 : Int)) ∧ (((6 : Int) / (2 : Int)) = (3 : Int)) ∧ (((2 : Int) ^ (8 : Nat)) = (256 : Int)) ∧ ((fmin (12 : Int) (18 : Int)) = (12 : Int)) ∧ (((7 : Int) + (0 : Int)) = (7 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int))
```

### modulation: index(50, 100) = 50; bandwidth(75, 15) = 180; sidebands(3) = 7; deviation(5, 15) = 75; carrierpower(100, 50) = 200; symbolrate(9600, 4) = 2400; bitrate(2400, 4) = 9600; efficiency(9600, 2400) = 400; efficiency(9600, 0) = 0
The ledger holds this as [fam_modulation](/theorem/fam_modulation) — proven `by decide`, sorry-free:

```lean
((((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int)) ∧ (((2 : Int) * ((75 : Int) + (15 : Int))) = (180 : Int)) ∧ ((((2 : Int) * (3 : Int)) + (1 : Int)) = (7 : Int)) ∧ (((5 : Int) * (15 : Int)) = (75 : Int)) ∧ ((((100 : Int) ^ (2 : Nat)) / (50 : Int)) = (200 : Int)) ∧ (((9600 : Int) / (4 : Int)) = (2400 : Int)) ∧ (((2400 : Int) * (4 : Int)) = (9600 : Int)) ∧ ((((9600 : Int) * (100 : Int)) / (2400 : Int)) = (400 : Int)) ∧ ((((9600 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int))
```

### monasticism: hoursofprayer(7, 1) = 8; ruleclauses(73, 1) = 73; officeorderings(7) = 5040; vowcombos(3, 2) = 3; communitysize(12, 2) = 24; dailycycle(1440, 8) = 180; silenceratio(16, 24) = 66; obediencelevels(3) = 8
The ledger holds this as [fam_monasticism](/theorem/fam_monasticism) — proven `by decide`, sorry-free:

```lean
(((7 : Int) + (1 : Int)) = (8 : Int)) ∧ (((73 : Int) * (1 : Int)) = (73 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (7 : Int)))) = (5040 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (3 : Int)) (Int.toNat (2 : Int)))) = (3 : Int)) ∧ (((12 : Int) * (2 : Int)) = (24 : Int)) ∧ (((1440 : Int) / (8 : Int)) = (180 : Int)) ∧ ((((16 : Int) * (100 : Int)) / (24 : Int)) = (66 : Int)) ∧ (((2 : Int) ^ (3 : Nat)) = (8 : Int))
```

### monitoring: uptime(999, 1000) = 99; mttr(600, 5) = 120; mttf(8760, 12) = 730; alerts(30, 120) = 25; apdex(950, 1000) = 95; noise(20, 80) = 25; coverage(85, 100) = 85; incidents(3, 12) = 25
The ledger holds this as [fam_monitoring](/theorem/fam_monitoring) — proven `by decide`, sorry-free:

```lean
((((999 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ (((600 : Int) / (5 : Int)) = (120 : Int)) ∧ (((8760 : Int) / (12 : Int)) = (730 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (80 : Int)) = (25 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (12 : Int)) = (25 : Int))
```

### monopoly: marketshare(90, 100) = 90; markup(40, 100) = 40; deadweightloss(500, 10) = 50; lernerindex(40, 100) = 40; outputreduction(1000, 600) = 400; pricemargin(150, 100) = 50; barriersubsets(5) = 32; profitmax(10000, 2) = 5000
The ledger holds this as [fam_monopoly](/theorem/fam_monopoly) — proven `by decide`, sorry-free:

```lean
((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((500 : Int) / (10 : Int)) = (50 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (600 : Int))) = (400 : Int)) ∧ ((fmax (0 : Int) ((150 : Int) - (100 : Int))) = (50 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ (((10000 : Int) / (2 : Int)) = (5000 : Int))
```

### monorail: speed(8000, 60) = 133; headwayseconds(600, 10) = 60; capacity(200, 6) = 1200; stations(12, 8) = 20; traveltime(3600, 133) = 27; accelrate(100, 10) = 10; gradientpct(6, 100) = 6; throughput(1200, 10) = 12000
The ledger holds this as [fam_monorail](/theorem/fam_monorail) — proven `by decide`, sorry-free:

```lean
(((8000 : Int) / (60 : Int)) = (133 : Int)) ∧ (((600 : Int) / (10 : Int)) = (60 : Int)) ∧ (((200 : Int) * (6 : Int)) = (1200 : Int)) ∧ (((12 : Int) + (8 : Int)) = (20 : Int)) ∧ (((3600 : Int) / (133 : Int)) = (27 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ ((((6 : Int) * (100 : Int)) / (100 : Int)) = (6 : Int)) ∧ (((1200 : Int) * (10 : Int)) = (12000 : Int))
```

### monsoon: onsetday(150, 10) = 160; rainfall(800, 1) = 800; durationdays(120, 0) = 120; windreversal(180, 90) = 180; intensityindex(70, 100) = 70; rainydays(120, 2) = 60; deficitpct(20, 100) = 20; cyclelength(12, 1) = 12
The ledger holds this as [fam_monsoon](/theorem/fam_monsoon) — proven `by decide`, sorry-free:

```lean
(((150 : Int) + (10 : Int)) = (160 : Int)) ∧ (((800 : Int) * (1 : Int)) = (800 : Int)) ∧ (((120 : Int) + (0 : Int)) = (120 : Int)) ∧ ((fmax (180 : Int) (90 : Int)) = (180 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ (((120 : Int) / (2 : Int)) = (60 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ (((12 : Int) * (1 : Int)) = (12 : Int))
```

### moon: phase(29, 8) = 5; distance(384, 1000) = 384000; period(27, 0) = 27; diameter(3474, 1) = 3474; tides(2, 1) = 2; libration(8, 1) = 7; craters(1000, 100) = 100000; combos(6, 2) = 15
The ledger holds this as [fam_moon](/theorem/fam_moon) — proven `by decide`, sorry-free:

```lean
(((29 : Int) % (8 : Int)) = (5 : Int)) ∧ (((384 : Int) * (1000 : Int)) = (384000 : Int)) ∧ (((27 : Int) + (0 : Int)) = (27 : Int)) ∧ (((3474 : Int) * (1 : Int)) = (3474 : Int)) ∧ (((2 : Int) * (1 : Int)) = (2 : Int)) ∧ ((fmax (0 : Int) ((8 : Int) - (1 : Int))) = (7 : Int)) ∧ (((1000 : Int) * (100 : Int)) = (100000 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### morphology: morphemes(300, 100) = 3; inflection(6, 8) = 75; derivation(50, 10) = 5; affixation(30, 20) = 150; productivity(5, 1000) = 0; allomorphy(12, 4) = 3; transparency(70, 100) = 70; density(150, 100) = 150
The ledger holds this as [fam_morphology](/theorem/fam_morphology) — proven `by decide`, sorry-free:

```lean
(((300 : Int) / (100 : Int)) = (3 : Int)) ∧ ((((6 : Int) * (100 : Int)) / (8 : Int)) = (75 : Int)) ∧ (((50 : Int) / (10 : Int)) = (5 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (20 : Int)) = (150 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (1000 : Int)) = (0 : Int)) ∧ (((12 : Int) / (4 : Int)) = (3 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (100 : Int)) = (150 : Int))
```

### mortgage: ltv(160, 200) = 80; dti(2000, 5000) = 40; downpayment(200, 160) = 40; principal(1200, 500) = 700; interestportion(50000, 6) = 250; equity(50000, 30000) = 20000; pmi(85, 80) = 1; pmi(75, 80) = 0; affordability(12000, 4) = 48000
The ledger holds this as [fam_mortgage](/theorem/fam_mortgage) — proven `by decide`, sorry-free:

```lean
((((160 : Int) * (100 : Int)) / (200 : Int)) = (80 : Int)) ∧ ((((2000 : Int) * (100 : Int)) / (5000 : Int)) = (40 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (160 : Int))) = (40 : Int)) ∧ ((fmax (0 : Int) ((1200 : Int) - (500 : Int))) = (700 : Int)) ∧ ((((50000 : Int) * (6 : Int)) / (1200 : Int)) = (250 : Int)) ∧ ((fmax (0 : Int) ((50000 : Int) - (30000 : Int))) = (20000 : Int)) ∧ ((if (if (85 : Int) > (80 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (75 : Int) > (80 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((12000 : Int) * (4 : Int)) = (48000 : Int))
```

### mosaic: tilecount(40, 30) = 1200; tessellationangle(360, 6) = 60; groutratio(10, 100) = 10; colorcombos(12, 3) = 220; symmetryorderings(4) = 24; gridcells(50, 50) = 2500; tilesubsets(5) = 32; coverage(95, 100) = 95
The ledger holds this as [fam_mosaic](/theorem/fam_mosaic) — proven `by decide`, sorry-free:

```lean
(((40 : Int) * (30 : Int)) = (1200 : Int)) ∧ (((360 : Int) / (6 : Int)) = (60 : Int)) ∧ ((((10 : Int) * (100 : Int)) / (100 : Int)) = (10 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ (((50 : Int) * (50 : Int)) = (2500 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int))
```

### motion: frames(1000, 60) = 60; fps(120, 2) = 60; delay(4) = 300; stagger(5, 50) = 250; total(300, 150) = 450; progress(150, 300) = 50; easing(12) = 12
The ledger holds this as [fam_motion](/theorem/fam_motion) — proven `by decide`, sorry-free:

```lean
((((1000 : Int) * (60 : Int)) / (1000 : Int)) = (60 : Int)) ∧ (((120 : Int) / (2 : Int)) = (60 : Int)) ∧ (((4 : Int) * (75 : Int)) = (300 : Int)) ∧ (((5 : Int) * (50 : Int)) = (250 : Int)) ∧ (((300 : Int) + (150 : Int)) = (450 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (300 : Int)) = (50 : Int)) ∧ ((12 : Int) = (12 : Int))
```

### motivation: expectancy(8, 10) = 80; valence(100, 40) = 60; valence(30, 50) = 0; instrumentality(9, 10) = 90; drive(6, 7) = 42; incentive(50, 4) = 200; persistence(100, 8) = 12; goalgradient(100, 30) = 4; selfefficacy(7, 8) = 87
The ledger holds this as [fam_motivation](/theorem/fam_motivation) — proven `by decide`, sorry-free:

```lean
((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (40 : Int))) = (60 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (50 : Int))) = (0 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int)) ∧ (((6 : Int) * (7 : Int)) = (42 : Int)) ∧ (((50 : Int) * (4 : Int)) = (200 : Int)) ∧ (((100 : Int) / (8 : Int)) = (12 : Int)) ∧ ((-((-(100 : Int)) / (30 : Int))) = (4 : Int)) ∧ ((((7 : Int) * (100 : Int)) / (8 : Int)) = (87 : Int))
```

### mtbf: meantime(8760, 3) = 2920; failurerate(5, 1000000) = 5; mttr(48, 6) = 8; uptime(990, 10) = 99; hazardrate(2, 100, 10000) = 2; cumulativehours(100, 500) = 50000; fits(1, 1000000) = 1000; operatinglife(50000, 12000) = 38000; operatinglife(10000, 12000) = 0
The ledger holds this as [fam_mtbf](/theorem/fam_mtbf) — proven `by decide`, sorry-free:

```lean
(((8760 : Int) / (3 : Int)) = (2920 : Int)) ∧ ((((5 : Int) * (1000000 : Int)) / (1000000 : Int)) = (5 : Int)) ∧ (((48 : Int) / (6 : Int)) = (8 : Int)) ∧ ((((990 : Int) * (100 : Int)) / ((990 : Int) + (10 : Int))) = (99 : Int)) ∧ ((((2 : Int) * (1000000 : Int)) / ((100 : Int) * (10000 : Int))) = (2 : Int)) ∧ (((100 : Int) * (500 : Int)) = (50000 : Int)) ∧ ((((1 : Int) * (1000000000 : Int)) / (1000000 : Int)) = (1000 : Int)) ∧ ((fmax (0 : Int) ((50000 : Int) - (12000 : Int))) = (38000 : Int)) ∧ ((fmax (0 : Int) ((10000 : Int) - (12000 : Int))) = (0 : Int))
```

### music: interval(7) = 7; octave(60) = 5; bpm(240, 4) = 60; beats(4, 4) = 16; frequency(440, 12) = 751; transpose(60, 7) = 67; bars(16, 4) = 4; tempo(500, 1) = 120
The ledger holds this as [fam_music](/theorem/fam_music) — proven `by decide`, sorry-free:

```lean
((7 : Int) = (7 : Int)) ∧ (((60 : Int) / (12 : Int)) = (5 : Int)) ∧ (((240 : Int) / (4 : Int)) = (60 : Int)) ∧ (((4 : Int) * (4 : Int)) = (16 : Int)) ∧ ((((440 : Int) * ((1000 : Int) + ((12 : Int) * (59 : Int)))) / (1000 : Int)) = (751 : Int)) ∧ (((60 : Int) + (7 : Int)) = (67 : Int)) ∧ (((16 : Int) / (4 : Int)) = (4 : Int)) ∧ (((60000 : Int) / (500 : Int)) = (120 : Int))
```

### mutation: rate(1000000, 1000) = 1000; types(3, 0) = 3; substitutions(100, 3) = 300; frequency(5, 1000) = 5; hotspots(10, 2) = 20; silent(25, 100) = 25; generations(100, 1) = 100; combos(6, 2) = 15
The ledger holds this as [fam_mutation](/theorem/fam_mutation) — proven `by decide`, sorry-free:

```lean
(((1000000 : Int) / (1000 : Int)) = (1000 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((100 : Int) * (3 : Int)) = (300 : Int)) ∧ ((((5 : Int) * (1000 : Int)) / (1000 : Int)) = (5 : Int)) ∧ (((10 : Int) * (2 : Int)) = (20 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int)) ∧ (((100 : Int) * (1 : Int)) = (100 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### mycology: colonization(750, 1000) = 75; decomposition(300, 1000) = 30; efficiency(500, 1000) = 50; fruiting(100, 10) = 10; germination(450, 1000) = 45; growth(100, 3) = 800; mycelium(50, 4) = 200; spore(10000, 100) = 100
The ledger holds this as [fam_mycology](/theorem/fam_mycology) — proven `by decide`, sorry-free:

```lean
((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ ((((500 : Int) * (100 : Int)) / (1000 : Int)) = (50 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ ((((450 : Int) * (100 : Int)) / (1000 : Int)) = (45 : Int)) ∧ (((100 : Int) * ((2 : Int) ^ (3 : Nat))) = (800 : Int)) ∧ (((50 : Int) * (4 : Int)) = (200 : Int)) ∧ (((10000 : Int) / (100 : Int)) = (100 : Int))
```

### myrmecology: colonysize(10000, 5) = 50000; castecount(3, 1) = 4; foragingpaths(5) = 120; pheromonetrails(12, 4) = 48; nestchambers(40, 20) = 60; tandempairs(20, 2) = 190; workerratio(95, 100) = 95; broodstages(4, 0) = 4
The ledger holds this as [fam_myrmecology](/theorem/fam_myrmecology) — proven `by decide`, sorry-free:

```lean
(((10000 : Int) * (5 : Int)) = (50000 : Int)) ∧ (((3 : Int) + (1 : Int)) = (4 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((12 : Int) * (4 : Int)) = (48 : Int)) ∧ (((40 : Int) + (20 : Int)) = (60 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (20 : Int)) (Int.toNat (2 : Int)))) = (190 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int))
```

### mysticism: stages(3, 4) = 7; ascentorderings(7) = 5040; unionstates(5) = 32; virtuecombos(7, 3) = 35; contemplationlevels(3, 3) = 9; darknesslight(100, 40) = 60; numberpaths(10, 3) = 720; illuminationratio(70, 100) = 70
The ledger holds this as [fam_mysticism](/theorem/fam_mysticism) — proven `by decide`, sorry-free:

```lean
(((3 : Int) + (4 : Int)) = (7 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (7 : Int)))) = (5040 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (7 : Int)) (Int.toNat (3 : Int)))) = (35 : Int)) ∧ (((3 : Int) * (3 : Int)) = (9 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (40 : Int))) = (60 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (10 : Int)))) / (Int.ofNat (ffact (Int.toNat ((10 : Int) - (3 : Int)))))) = (720 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int))
```

### mythography: mythcount(200, 100) = 300; variantpaths(5) = 120; motifpairs(20, 2) = 190; typeindex(50, 10) = 500; culturesubsets(6) = 64; diffusionlinks(12, 5) = 60; archetypecombos(12, 3) = 220; versioncount(40, 20) = 60
The ledger holds this as [fam_mythography](/theorem/fam_mythography) — proven `by decide`, sorry-free:

```lean
(((200 : Int) + (100 : Int)) = (300 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (20 : Int)) (Int.toNat (2 : Int)))) = (190 : Int)) ∧ (((50 : Int) * (10 : Int)) = (500 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ (((12 : Int) * (5 : Int)) = (60 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int)) ∧ (((40 : Int) + (20 : Int)) = (60 : Int))
```

### mythology: pantheonsize(12, 3) = 15; deitypairs(12, 2) = 66; archetypecount(7, 2) = 14; narrativeorderings(6) = 720; motifsubsets(5) = 32; genealogylinks(12, 3) = 36; questcombos(10, 3) = 120; variantcount(40, 20) = 60
The ledger holds this as [fam_mythology](/theorem/fam_mythology) — proven `by decide`, sorry-free:

```lean
(((12 : Int) + (3 : Int)) = (15 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((7 : Int) * (2 : Int)) = (14 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (6 : Int)))) = (720 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ (((12 : Int) * (3 : Int)) = (36 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (3 : Int)))) = (120 : Int)) ∧ (((40 : Int) + (20 : Int)) = (60 : Int))
```


::: warning 
THE FAMILIES, M — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. The boundary is confirmed by the wing's own sealed theorems — e.g. [fam_machining](/theorem/fam_machining) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
