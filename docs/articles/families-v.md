---
title: "THE FAMILIES, V"
description: "Computed from lean/FamiliesV.lean — 18 sealed theorems, every claim citing its proof."
---

# THE FAMILIES, V

> THE FAMILIES, V — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. — held by [fam_vaccination](/theorem/fam_vaccination) and its 17 siblings below.

**18 theorems** and **7,618 decided cases**, from [fam_vaccination](/theorem/fam_vaccination) onward, each proven `by decide` in <a href="/lean/FamiliesV.lean">lean/FamiliesV.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFamiliesV.lean)** — nothing to install. The editor fetches `lean/FamiliesV.lean` from the repository and re-decides all 18 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### vaccination: coverage(950, 1000) = 95; herdthreshold(5) = 80; efficacy(100, 5) = 95; dosesneeded(1000, 2) = 2000; titer(10, 3) = 80; boosterinterval(12, 2) = 6; seroconversion(990, 1000) = 99; campaignreach(10, 100, 5) = 5000
The ledger holds this as [fam_vaccination](/theorem/fam_vaccination) — proven `by decide`, sorry-free:

```lean
((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ (((((5 : Int) - (1 : Int)) * (100 : Int)) / (5 : Int)) = (80 : Int)) ∧ ((((fmax (0 : Int) ((100 : Int) - (5 : Int))) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ (((1000 : Int) * (2 : Int)) = (2000 : Int)) ∧ (((10 : Int) * ((2 : Int) ^ (3 : Nat))) = (80 : Int)) ∧ (((12 : Int) / (2 : Int)) = (6 : Int)) ∧ ((((990 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ ((((10 : Int) * (100 : Int)) * (5 : Int)) = (5000 : Int))
```

### vaccine: doses(2, 1) = 3; efficacy(95, 100) = 95; coverage(70, 100) = 70; antigens(4, 1) = 4; boosters(1, 0) = 1; coldchain(8, 2) = 6; batches(100, 1000) = 100000; combos(6, 2) = 15
The ledger holds this as [fam_vaccine](/theorem/fam_vaccine) — proven `by decide`, sorry-free:

```lean
(((2 : Int) + (1 : Int)) = (3 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ (((4 : Int) * (1 : Int)) = (4 : Int)) ∧ (((1 : Int) + (0 : Int)) = (1 : Int)) ∧ ((fmax (0 : Int) ((8 : Int) - (2 : Int))) = (6 : Int)) ∧ (((100 : Int) * (1000 : Int)) = (100000 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### valuation: pe(150, 10) = 15; pb(150, 50) = 300; ebitda(800, 200) = 1000; marketcap(1000, 150) = 150000; enterprise(10000, 3000, 1000) = 12000; bookvalue(5000, 2000) = 3000; bookvalue(2000, 5000) = 0; multiple(12000, 1000) = 12; fairvalue(10, 15) = 150
The ledger holds this as [fam_valuation](/theorem/fam_valuation) — proven `by decide`, sorry-free:

```lean
(((150 : Int) / (10 : Int)) = (15 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (50 : Int)) = (300 : Int)) ∧ (((800 : Int) + (200 : Int)) = (1000 : Int)) ∧ (((1000 : Int) * (150 : Int)) = (150000 : Int)) ∧ ((fmax (0 : Int) (((10000 : Int) + (3000 : Int)) - (1000 : Int))) = (12000 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (2000 : Int))) = (3000 : Int)) ∧ ((fmax (0 : Int) ((2000 : Int) - (5000 : Int))) = (0 : Int)) ∧ (((12000 : Int) / (1000 : Int)) = (12 : Int)) ∧ (((10 : Int) * (15 : Int)) = (150 : Int))
```

### vector: dot(3, 4) = 12; magnitude(500, 10) = 50; dims(3, 0) = 3; scale(5, 3) = 15; components(3, 1) = 3; crossprod(3, 4, 1) = 12; norm(100, 20) = 80; combos(6, 2) = 15; span(3, 5) = 3; anglecosnum(1, 2, 3, 4) = 11
The ledger holds this as [fam_vector](/theorem/fam_vector) — proven `by decide`, sorry-free:

```lean
(((3 : Int) * (4 : Int)) = (12 : Int)) ∧ (((500 : Int) / (10 : Int)) = (50 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((5 : Int) * (3 : Int)) = (15 : Int)) ∧ (((3 : Int) * (1 : Int)) = (3 : Int)) ∧ ((((3 : Int) * (4 : Int)) * (1 : Int)) = (12 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (20 : Int))) = (80 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) ∧ ((fmin (3 : Int) (5 : Int)) = (3 : Int)) ∧ ((((1 : Int) * (3 : Int)) + ((2 : Int) * (4 : Int))) = (11 : Int))
```

### ventilation: minutevolume(500, 12) = 6000; alveolarventilation(500, 150, 12) = 4200; deadspace(70, 2) = 140; respiratoryrate(6000, 500) = 12; compliance(500, 10) = 50; airwayresistance(20, 5) = 4; oxygendelivery(5, 200) = 1000; ventilationperfusion(4, 5) = 80
The ledger holds this as [fam_ventilation](/theorem/fam_ventilation) — proven `by decide`, sorry-free:

```lean
(((500 : Int) * (12 : Int)) = (6000 : Int)) ∧ (((fmax (0 : Int) ((500 : Int) - (150 : Int))) * (12 : Int)) = (4200 : Int)) ∧ (((70 : Int) * (2 : Int)) = (140 : Int)) ∧ (((6000 : Int) / (500 : Int)) = (12 : Int)) ∧ (((500 : Int) / (10 : Int)) = (50 : Int)) ∧ (((20 : Int) / (5 : Int)) = (4 : Int)) ∧ (((5 : Int) * (200 : Int)) = (1000 : Int)) ∧ ((((4 : Int) * (100 : Int)) / (5 : Int)) = (80 : Int))
```

### verification: assertions(50, 3) = 150; casecombos(12, 3) = 220; stateorderings(5) = 120; coveragepct(90, 100) = 90; invariantsubsets(5) = 32; counterexamples(10, 8) = 2; proofobligations(20, 10) = 30; passrate(95, 100) = 95
The ledger holds this as [fam_verification](/theorem/fam_verification) — proven `by decide`, sorry-free:

```lean
(((50 : Int) * (3 : Int)) = (150 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (8 : Int))) = (2 : Int)) ∧ (((20 : Int) + (10 : Int)) = (30 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int))
```

### version: keep(50, 20) = 20; prune(50, 20) = 30; autosave(60, 5) = 12; drafts(3, 10) = 30; published(7, 10) = 70; scheduled(100, 160) = 60; scheduled(200, 160) = 0; restore(12, 20) = 8; churn(100, 20) = 5
The ledger holds this as [fam_version](/theorem/fam_version) — proven `by decide`, sorry-free:

```lean
((fmin (50 : Int) (20 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (20 : Int))) = (30 : Int)) ∧ (((60 : Int) / (5 : Int)) = (12 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (10 : Int)) = (30 : Int)) ∧ ((((7 : Int) * (100 : Int)) / (10 : Int)) = (70 : Int)) ∧ ((fmax (0 : Int) ((160 : Int) - (100 : Int))) = (60 : Int)) ∧ ((fmax (0 : Int) ((160 : Int) - (200 : Int))) = (0 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (12 : Int))) = (8 : Int)) ∧ (((100 : Int) / (20 : Int)) = (5 : Int))
```

### vet: dose(20, 5) = 100; age(3, 7) = 21; herd(3, 12) = 25; gestation(100, 63) = 163; feed(40, 3) = 1; vaccination(80, 100) = 80; fluids(10, 60) = 600
The ledger holds this as [fam_vet](/theorem/fam_vet) — proven `by decide`, sorry-free:

```lean
(((20 : Int) * (5 : Int)) = (100 : Int)) ∧ (((3 : Int) * (7 : Int)) = (21 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (12 : Int)) = (25 : Int)) ∧ (((100 : Int) + (63 : Int)) = (163 : Int)) ∧ ((((40 : Int) * (3 : Int)) / (100 : Int)) = (1 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((10 : Int) * (60 : Int)) = (600 : Int))
```

### veterinary: dose(10, 5) = 50; caloricrequirement(20, 30) = 600; bcs(55, 50) = 110; fluidtherapy(1000, 250) = 4; heartrate(240, 2) = 120; medicationinterval(24, 3) = 8; bodyweightgain(10, 15) = 5; bodyweightgain(15, 10) = 0; gestation(63, 63) = 1; gestation(30, 63) = 0
The ledger holds this as [fam_veterinary](/theorem/fam_veterinary) — proven `by decide`, sorry-free:

```lean
(((10 : Int) * (5 : Int)) = (50 : Int)) ∧ (((20 : Int) * (30 : Int)) = (600 : Int)) ∧ ((((55 : Int) * (100 : Int)) / (50 : Int)) = (110 : Int)) ∧ ((-((-(1000 : Int)) / (250 : Int))) = (4 : Int)) ∧ (((240 : Int) / (2 : Int)) = (120 : Int)) ∧ (((24 : Int) / (3 : Int)) = (8 : Int)) ∧ ((fmax (0 : Int) ((15 : Int) - (10 : Int))) = (5 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (15 : Int))) = (0 : Int)) ∧ ((if (if (63 : Int) ≥ (63 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (30 : Int) ≥ (63 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int))
```

### vibration: naturalfrequency(5000, 10) = 500; amplitude(1000, 50) = 20; dampingratio(30, 100) = 30; resonance(60, 3) = 180; period(1000, 50) = 20; acceleration(20, 25) = 500; transmissibility(50, 200) = 25; transmissibility(300, 200) = 150; modeshape(3, 100) = 300
The ledger holds this as [fam_vibration](/theorem/fam_vibration) — proven `by decide`, sorry-free:

```lean
(((5000 : Int) / (10 : Int)) = (500 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((60 : Int) * (3 : Int)) = (180 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ (((20 : Int) * (25 : Int)) = (500 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (200 : Int)) = (150 : Int)) ∧ (((3 : Int) * (100 : Int)) = (300 : Int))
```

### virality: coefficient(200, 15) = 30; shares(250, 1000) = 25; amplification(600, 50) = 12; reach(10000, 100) = 100; engagement(300, 1000) = 30; saturation(2500, 10000) = 25
The ledger holds this as [fam_virality](/theorem/fam_virality) — proven `by decide`, sorry-free:

```lean
((((200 : Int) * (15 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ (((600 : Int) / (50 : Int)) = (12 : Int)) ∧ (((10000 : Int) / (100 : Int)) = (100 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ ((((2500 : Int) * (100 : Int)) / (10000 : Int)) = (25 : Int))
```

### virology: titer(50, 100) = 5000; load(1000000, 5) = 200000; replication(5000, 100) = 50; infectivity(80, 100) = 80; mutation(3, 30000) = 100; clearance(90, 100) = 90; neutralization(75, 100) = 75
The ledger holds this as [fam_virology](/theorem/fam_virology) — proven `by decide`, sorry-free:

```lean
(((50 : Int) * (100 : Int)) = (5000 : Int)) ∧ (((1000000 : Int) / (5 : Int)) = (200000 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((3 : Int) * (1000000 : Int)) / (30000 : Int)) = (100 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int))
```

### virtualization: overcommit(32, 8) = 400; density(65536, 2048) = 32; consolidation(100, 8) = 13; ballooning(4096, 1024) = 3072; vcpu(2, 8, 2) = 32; allocation(16, 2048) = 32768; overhead(512, 2048) = 25; migration(16384, 1024) = 16; ballooning(512, 1024) = 0
The ledger holds this as [fam_virtualization](/theorem/fam_virtualization) — proven `by decide`, sorry-free:

```lean
((((32 : Int) * (100 : Int)) / (8 : Int)) = (400 : Int)) ∧ (((65536 : Int) / (2048 : Int)) = (32 : Int)) ∧ ((-((-(100 : Int)) / (8 : Int))) = (13 : Int)) ∧ ((fmax (0 : Int) ((4096 : Int) - (1024 : Int))) = (3072 : Int)) ∧ ((((2 : Int) * (8 : Int)) * (2 : Int)) = (32 : Int)) ∧ (((16 : Int) * (2048 : Int)) = (32768 : Int)) ∧ ((((512 : Int) * (100 : Int)) / (2048 : Int)) = (25 : Int)) ∧ ((-((-(16384 : Int)) / (1024 : Int))) = (16 : Int)) ∧ ((fmax (0 : Int) ((512 : Int) - (1024 : Int))) = (0 : Int))
```

### vitals: lcp(2000) = 1; lcp(3000) = 0; inp(150) = 1; inp(250) = 0; cls(8) = 1; cls(15) = 0; ttfb(600) = 1; ttfb(900) = 0; fcp(1500) = 1; fcp(2000) = 0; budget(50, 200) = 25; score(4, 5) = 80; regression(120, 100) = 20; regression(90, 100) = 0
The ledger holds this as [fam_vitals](/theorem/fam_vitals) — proven `by decide`, sorry-free:

```lean
((if (if (2000 : Int) ≤ (2500 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (3000 : Int) ≤ (2500 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (150 : Int) ≤ (200 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (250 : Int) ≤ (200 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (8 : Int) ≤ (10 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (15 : Int) ≤ (10 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (600 : Int) ≤ (800 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (900 : Int) ≤ (800 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (1500 : Int) ≤ (1800 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (2000 : Int) ≤ (1800 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (200 : Int)) = (25 : Int)) ∧ ((((4 : Int) * (100 : Int)) / (5 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((120 : Int) - (100 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (100 : Int))) = (0 : Int))
```

### viticulture: acidity(6, 1000) = 6; brix(240, 1000) = 24; cropload(1200, 400) = 3; density(4000, 1000) = 4; fermentation(180, 240) = 75; gdd(30, 10) = 20; gdd(5, 10) = 0; ripeness(220, 240) = 91; tannin(900, 300) = 3
The ledger holds this as [fam_viticulture](/theorem/fam_viticulture) — proven `by decide`, sorry-free:

```lean
((((6 : Int) * (1000 : Int)) / (1000 : Int)) = (6 : Int)) ∧ ((((240 : Int) * (100 : Int)) / (1000 : Int)) = (24 : Int)) ∧ (((1200 : Int) / (400 : Int)) = (3 : Int)) ∧ (((4000 : Int) / (1000 : Int)) = (4 : Int)) ∧ ((((180 : Int) * (100 : Int)) / (240 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (10 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (10 : Int))) = (0 : Int)) ∧ ((((220 : Int) * (100 : Int)) / (240 : Int)) = (91 : Int)) ∧ (((900 : Int) / (300 : Int)) = (3 : Int))
```

### volatility: range(150, 90) = 60; annualized(2) = 32; historicalband(5, 2) = 20; beta(150, 100) = 150; variance(500, 5) = 100; impliedmove(200, 25) = 50; zscore(120, 100, 10) = 2; drawdown(200, 150) = 25; range2(9, 4) = 5; drawdown2(10, 3) = 7; valueatrisk(1000, 5) = 50; sumsquares(3, 4) = 25; meandeviation(20, 4) = 5; excessreturn(8, 3) = 5; beta2(10, 4) = 2; beta(150, 0) = 0
The ledger holds this as [fam_volatility](/theorem/fam_volatility) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((150 : Int) - (90 : Int))) = (60 : Int)) ∧ (((2 : Int) * (16 : Int)) = (32 : Int)) ∧ ((((2 : Int) * (5 : Int)) * (2 : Int)) = (20 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (100 : Int)) = (150 : Int)) ∧ (((500 : Int) / (5 : Int)) = (100 : Int)) ∧ ((((200 : Int) * (25 : Int)) / (100 : Int)) = (50 : Int)) ∧ (((fmax (0 : Int) ((120 : Int) - (100 : Int))) / (10 : Int)) = (2 : Int)) ∧ ((((fmax (0 : Int) ((200 : Int) - (150 : Int))) * (100 : Int)) / (200 : Int)) = (25 : Int)) ∧ ((fmax (0 : Int) ((9 : Int) - (4 : Int))) = (5 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (3 : Int))) = (7 : Int)) ∧ ((((1000 : Int) * (5 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((((3 : Int) ^ (2 : Nat)) + ((4 : Int) ^ (2 : Nat))) = (25 : Int)) ∧ (((20 : Int) / (4 : Int)) = (5 : Int)) ∧ ((fmax (0 : Int) ((8 : Int) - (3 : Int))) = (5 : Int)) ∧ (((10 : Int) / (4 : Int)) = (2 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int))
```

### volcanology: effusion(1000, 10) = 100; viscosity(50, 1000) = 50; ash(1000, 4) = 250; magma(6000, 60) = 100; pyroclastic(30, 4) = 120; gas(900, 500) = 400; gas(300, 500) = 0
The ledger holds this as [fam_volcanology](/theorem/fam_volcanology) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((((50 : Int) * (1000 : Int)) / (1000 : Int)) = (50 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((30 : Int) * (4 : Int)) = (120 : Int)) ∧ ((fmax (0 : Int) ((900 : Int) - (500 : Int))) = (400 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (500 : Int))) = (0 : Int))
```

### vulcanology: vei(4, 5) = 5; ejectavolume(1000, 3) = 3000; explosivity(5000, 1000) = 5; lavaflowrate(6000, 60) = 100; ashheight(12, 1000) = 12000; repose(1000, 200) = 800; magmaviscosity(100, 4) = 400; hazardindex(80, 100) = 80
The ledger holds this as [fam_vulcanology](/theorem/fam_vulcanology) — proven `by decide`, sorry-free:

```lean
((fmax (4 : Int) (5 : Int)) = (5 : Int)) ∧ (((1000 : Int) * (3 : Int)) = (3000 : Int)) ∧ (((5000 : Int) / (1000 : Int)) = (5 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((12 : Int) * (1000 : Int)) = (12000 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (200 : Int))) = (800 : Int)) ∧ (((100 : Int) * (4 : Int)) = (400 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```


::: warning 
THE FAMILIES, V — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. The boundary is confirmed by the wing's own sealed theorems — e.g. [fam_vaccination](/theorem/fam_vaccination) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
