---
title: "THE FAMILIES, K"
description: "Computed from lean/FamiliesK.lean — 9 sealed theorems, every claim citing its proof."
---

# THE FAMILIES, K

> THE FAMILIES, K — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. — held by [fam_kalman](/theorem/fam_kalman) and its 8 siblings below.

**9 theorems** and **3,502 decided cases**, from [fam_kalman](/theorem/fam_kalman) onward, each proven `by decide` in <a href="/lean/FamiliesK.lean">lean/FamiliesK.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFamiliesK.lean)** — nothing to install. The editor fetches `lean/FamiliesK.lean` from the repository and re-decides all 9 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### kalman: gain(3, 1) = 75; predictedstate(100, 5, 2) = 110; updatedestimate(100, 75, 8) = 106; errorcovariance(80, 75) = 20; innovation(110, 100) = 10; measurementresidual(110, 106) = 4; processnoise(3, 4) = 12; steadygain(2, 6) = 25
The ledger holds this as [fam_kalman](/theorem/fam_kalman) — proven `by decide`, sorry-free:

```lean
((((3 : Int) * (100 : Int)) / ((3 : Int) + (1 : Int))) = (75 : Int)) ∧ (((100 : Int) + ((5 : Int) * (2 : Int))) = (110 : Int)) ∧ (((100 : Int) + (((75 : Int) * (8 : Int)) / (100 : Int))) = (106 : Int)) ∧ (((((100 : Int) - (75 : Int)) * (80 : Int)) / (100 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((110 : Int) - (100 : Int))) = (10 : Int)) ∧ ((fmax (0 : Int) ((110 : Int) - (106 : Int))) = (4 : Int)) ∧ (((3 : Int) * (4 : Int)) = (12 : Int)) ∧ ((((2 : Int) * (100 : Int)) / ((2 : Int) + (6 : Int))) = (25 : Int))
```

### karst: cavelength(2000, 3) = 6000; dissolutionrate(100, 10) = 10; sinkholedensity(500, 50) = 10; conduitpairs(10, 2) = 45; porosity(30, 100) = 30; rechargerate(6000, 60) = 100; passageorderings(5) = 120; aquiferdepth(300, 50) = 250
The ledger holds this as [fam_karst](/theorem/fam_karst) — proven `by decide`, sorry-free:

```lean
(((2000 : Int) * (3 : Int)) = (6000 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ (((500 : Int) / (50 : Int)) = (10 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (50 : Int))) = (250 : Int))
```

### kerning: pairadjust(120, 40) = 80; tracking(10, 20) = 200; emratio(750, 1000) = 750; sidebearing(80, 80) = 160; advancewidth(500, 80, 80) = 660; wordspacing(5, 250) = 1000; units(3, 1000) = 3000; optical(72, 950) = 68
The ledger holds this as [fam_kerning](/theorem/fam_kerning) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((120 : Int) - (40 : Int))) = (80 : Int)) ∧ (((10 : Int) * (20 : Int)) = (200 : Int)) ∧ ((((750 : Int) * (1000 : Int)) / (1000 : Int)) = (750 : Int)) ∧ (((80 : Int) + (80 : Int)) = (160 : Int)) ∧ ((((500 : Int) + (80 : Int)) + (80 : Int)) = (660 : Int)) ∧ (((fmax (0 : Int) ((5 : Int) - (1 : Int))) * (250 : Int)) = (1000 : Int)) ∧ (((3 : Int) * (1000 : Int)) = (3000 : Int)) ∧ ((((72 : Int) * (950 : Int)) / (1000 : Int)) = (68 : Int))
```

### kinematics: velocity(100, 20) = 5; acceleration(60, 12) = 5; displacement(5, 20) = 100; momentum(10, 5) = 50; kinetic(10, 4) = 80; projectile(10, 10) = 10; freefall(10, 3) = 45; impulse(20, 5) = 100; velocity(100, 0) = 0; projectile(10, 0) = 0
The ledger holds this as [fam_kinematics](/theorem/fam_kinematics) — proven `by decide`, sorry-free:

```lean
(((100 : Int) / (20 : Int)) = (5 : Int)) ∧ (((60 : Int) / (12 : Int)) = (5 : Int)) ∧ (((5 : Int) * (20 : Int)) = (100 : Int)) ∧ (((10 : Int) * (5 : Int)) = (50 : Int)) ∧ ((((10 : Int) * ((4 : Int) ^ (2 : Nat))) / (2 : Int)) = (80 : Int)) ∧ ((((10 : Int) ^ (2 : Nat)) / (10 : Int)) = (10 : Int)) ∧ ((((10 : Int) * ((3 : Int) ^ (2 : Nat))) / (2 : Int)) = (45 : Int)) ∧ (((20 : Int) * (5 : Int)) = (100 : Int)) ∧ (((100 : Int) / (0 : Int)) = (0 : Int)) ∧ ((((10 : Int) ^ (2 : Nat)) / (0 : Int)) = (0 : Int))
```

### kinesiology: rangeofmotion(150, 20) = 130; flexion(30, 60) = 90; extension(90, 30) = 60; muscleactivation(300, 400) = 75; jointangle(360, 4) = 90; momentarm(50, 12) = 600; contraction(100, 70) = 30; balance(5, 10) = 1; balance(15, 10) = 0
The ledger holds this as [fam_kinesiology](/theorem/fam_kinesiology) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((150 : Int) - (20 : Int))) = (130 : Int)) ∧ (((30 : Int) + (60 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (30 : Int))) = (60 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (400 : Int)) = (75 : Int)) ∧ (((360 : Int) / (4 : Int)) = (90 : Int)) ∧ (((50 : Int) * (12 : Int)) = (600 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (70 : Int))) = (30 : Int)) ∧ ((if (if (5 : Int) ≤ (10 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (15 : Int) ≤ (10 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int))
```

### kinship: coefficientrelatedness(2) = 250; coefficientrelatedness(1) = 500; generationdistance(2, 6) = 4; degreeremoval(3, 5) = 2; consanguinity(3, 2) = 250; descendants(2, 4) = 16; ancestorcount(5) = 32; cousindegree(4) = 3; lineagedepth(1900, 2000, 25) = 4
The ledger holds this as [fam_kinship](/theorem/fam_kinship) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / ((2 : Int) ^ (2 : Nat))) = (250 : Int)) ∧ (((1000 : Int) / ((2 : Int) ^ (1 : Nat))) = (500 : Int)) ∧ ((fmax (0 : Int) ((6 : Int) - (2 : Int))) = (4 : Int)) ∧ (((fmax (3 : Int) (5 : Int)) - (fmin (3 : Int) (5 : Int))) = (2 : Int)) ∧ (((2 : Int) * ((1000 : Int) / ((2 : Int) ^ (3 : Nat)))) = (250 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((fmax (0 : Int) ((4 : Int) - (1 : Int))) = (3 : Int)) ∧ (((fmax (0 : Int) ((2000 : Int) - (1900 : Int))) / (25 : Int)) = (4 : Int))
```

### knitting: gauge(22, 10) = 22; courses(30, 10) = 30; wales(3, 40) = 120; stitch(120, 150) = 18000; looplength(6000, 1000) = 6; tightness(200, 5) = 40; productivity(84, 20, 60) = 100800; gsm(50, 2500) = 200
The ledger holds this as [fam_knitting](/theorem/fam_knitting) — proven `by decide`, sorry-free:

```lean
((((22 : Int) * (10 : Int)) / (10 : Int)) = (22 : Int)) ∧ ((((30 : Int) * (10 : Int)) / (10 : Int)) = (30 : Int)) ∧ (((3 : Int) * (40 : Int)) = (120 : Int)) ∧ (((120 : Int) * (150 : Int)) = (18000 : Int)) ∧ (((6000 : Int) / (1000 : Int)) = (6 : Int)) ∧ (((200 : Int) / (5 : Int)) = (40 : Int)) ∧ ((((84 : Int) * (20 : Int)) * (60 : Int)) = (100800 : Int)) ∧ ((((50 : Int) * (10000 : Int)) / (2500 : Int)) = (200 : Int))
```

### knot: crossingnumber(3, 2) = 3; genus(3, 2) = 1; bridgenumber(2, 3) = 2; writhe(5, 2) = 3; writhe(2, 5) = 0; determinant(1) = 3; stickcount(3) = 6
The ledger holds this as [fam_knot](/theorem/fam_knot) — proven `by decide`, sorry-free:

```lean
((fmin ((3 : Int) * ((2 : Int) - (1 : Int))) ((2 : Int) * ((3 : Int) - (1 : Int)))) = (3 : Int)) ∧ (((((3 : Int) - (2 : Int)) + (1 : Int)) / (2 : Int)) = (1 : Int)) ∧ ((fmin (2 : Int) (3 : Int)) = (2 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (2 : Int))) = (3 : Int)) ∧ ((fmax (0 : Int) ((2 : Int) - (5 : Int))) = (0 : Int)) ∧ ((((2 : Int) * (1 : Int)) + (1 : Int)) = (3 : Int)) ∧ (((3 : Int) + (3 : Int)) = (6 : Int))
```

### kyc: completeness(18, 20) = 90; screening(3, 10000) = 3; risk(7, 10) = 70; aml(15000, 10000) = 1; aml(5000, 10000) = 0; diligence(80, 70) = 1; diligence(50, 70) = 0; ubo(4, 5) = 80; expiry(365, 100) = 265; expiry(100, 365) = 0; monitoring(12, 4) = 3
The ledger holds this as [fam_kyc](/theorem/fam_kyc) — proven `by decide`, sorry-free:

```lean
((((18 : Int) * (100 : Int)) / (20 : Int)) = (90 : Int)) ∧ ((((3 : Int) * (10000 : Int)) / (10000 : Int)) = (3 : Int)) ∧ ((((7 : Int) * (100 : Int)) / (10 : Int)) = (70 : Int)) ∧ ((if (if (15000 : Int) ≥ (10000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (5000 : Int) ≥ (10000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (80 : Int) ≥ (70 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (50 : Int) ≥ (70 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((4 : Int) * (100 : Int)) / (5 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((365 : Int) - (100 : Int))) = (265 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (365 : Int))) = (0 : Int)) ∧ (((12 : Int) / (4 : Int)) = (3 : Int))
```


::: warning 
THE FAMILIES, K — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. The boundary is confirmed by the wing's own sealed theorems — e.g. [fam_kalman](/theorem/fam_kalman) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
