---
title: "THE FAMILIES, I"
description: "Computed from lean/FamiliesI.lean — 27 sealed theorems, every claim citing its proof."
---

# THE FAMILIES, I

> THE FAMILIES, I — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. — held by [fam_ichthyology](/theorem/fam_ichthyology) and its 26 siblings below.

**27 theorems** and **10,635 decided cases**, from [fam_ichthyology](/theorem/fam_ichthyology) onward, each proven `by decide` in <a href="/lean/FamiliesI.lean">lean/FamiliesI.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFamiliesI.lean)** — nothing to install. The editor fetches `lean/FamiliesI.lean` from the repository and re-decides all 27 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### ichthyology: condition(1000, 10) = 100000; fecundity(50000, 1000) = 50; schooling(6000, 60) = 100; growth(200, 150) = 50; growth(100, 150) = 0; buoyancy(5, 100) = 5; gillrate(900, 15) = 60; mortality(10, 100) = 10
The ledger holds this as [fam_ichthyology](/theorem/fam_ichthyology) — proven `by decide`, sorry-free:

```lean
((((1000 : Int) * (100000 : Int)) / ((10 : Int) ^ (3 : Nat))) = (100000 : Int)) ∧ (((50000 : Int) / (1000 : Int)) = (50 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (150 : Int))) = (50 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (150 : Int))) = (0 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((900 : Int) / (15 : Int)) = (60 : Int)) ∧ ((((10 : Int) * (100 : Int)) / (100 : Int)) = (10 : Int))
```

### iconography: symbolcount(12, 8) = 20; attributepairs(12, 2) = 66; gesturetypes(5, 3) = 15; colorsubsets(6) = 64; compositionorderings(5) = 120; haloforms(3, 2) = 5; motifcombos(10, 3) = 120; canonratio(80, 100) = 80
The ledger holds this as [fam_iconography](/theorem/fam_iconography) — proven `by decide`, sorry-free:

```lean
(((12 : Int) + (8 : Int)) = (20 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((5 : Int) * (3 : Int)) = (15 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (3 : Int)))) = (120 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int))
```

### idealism: mindcategories(12, 0) = 12; phenomenasubsets(6) = 64; dialecticstages(3) = 6; conceptpairs(10, 2) = 45; absolutelevels(3, 0) = 3; representationmodes(4, 3) = 12; syntheticunity(90, 100) = 90; thesisorderings(5, 2) = 20
The ledger holds this as [fam_idealism](/theorem/fam_idealism) — proven `by decide`, sorry-free:

```lean
(((12 : Int) + (0 : Int)) = (12 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (3 : Int)))) = (6 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((4 : Int) * (3 : Int)) = (12 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (5 : Int)))) / (Int.ofNat (ffact (Int.toNat ((5 : Int) - (2 : Int)))))) = (20 : Int))
```

### identity: assurance(3, 4) = 75; assurance(0, 0) = 0; matchconfidence(18, 20) = 90; documentvalidity(9, 10) = 90; liveness(49, 50) = 98; uniqueness(997, 1000) = 99; stepup(80, 70) = 1; stepup(50, 70) = 0; attestation(45, 50) = 90; federation(8, 10) = 80
The ledger holds this as [fam_identity](/theorem/fam_identity) — proven `by decide`, sorry-free:

```lean
((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ ((((0 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (20 : Int)) = (90 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int)) ∧ ((((49 : Int) * (100 : Int)) / (50 : Int)) = (98 : Int)) ∧ ((((997 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ ((if (if (80 : Int) ≥ (70 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (50 : Int) ≥ (70 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int))
```

### image: pixels(1920, 1080) = 2073600; bytesrgb(1920, 1080, 3) = 6220800; mipmaps(10, 1) = 11; stride(1920, 3) = 5760; channels(3, 1) = 4; aspect(1920, 1080) = 1; blocks(1080, 16) = 68; palettebits(8) = 256
The ledger holds this as [fam_image](/theorem/fam_image) — proven `by decide`, sorry-free:

```lean
(((1920 : Int) * (1080 : Int)) = (2073600 : Int)) ∧ ((((1920 : Int) * (1080 : Int)) * (3 : Int)) = (6220800 : Int)) ∧ (((10 : Int) + (1 : Int)) = (11 : Int)) ∧ (((1920 : Int) * (3 : Int)) = (5760 : Int)) ∧ (((3 : Int) + (1 : Int)) = (4 : Int)) ∧ (((1920 : Int) / (1080 : Int)) = (1 : Int)) ∧ ((-((-(1080 : Int)) / (16 : Int))) = (68 : Int)) ∧ (((2 : Int) ^ (8 : Nat)) = (256 : Int))
```

### immigration: points(50, 20, 20) = 90; residence(2000, 1825) = 1; residence(1000, 1825) = 0; continuous(90, 180) = 1; quota(5000, 3000) = 3000; sponsorship(40000, 29000) = 1; overstay(400, 365) = 35; naturalization(6, 5) = 1; dependents(2, 3) = 5
The ledger holds this as [fam_immigration](/theorem/fam_immigration) — proven `by decide`, sorry-free:

```lean
((((50 : Int) + (20 : Int)) + (20 : Int)) = (90 : Int)) ∧ ((if (if (2000 : Int) ≥ (1825 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (1000 : Int) ≥ (1825 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (90 : Int) ≤ (180 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((fmin (5000 : Int) (3000 : Int)) = (3000 : Int)) ∧ ((if (if (40000 : Int) ≥ (29000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((fmax (0 : Int) ((400 : Int) - (365 : Int))) = (35 : Int)) ∧ ((if (if (6 : Int) ≥ (5 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ (((2 : Int) + (3 : Int)) = (5 : Int))
```

### immunology: titer(2, 3) = 16; response(1000, 200) = 800; seroconversion(90, 100) = 90; neutralization(45, 50) = 90; cellcount(5000, 10) = 500; cytokine(150, 50) = 100; affinity(300, 100) = 300; boost(400, 100) = 400
The ledger holds this as [fam_immunology](/theorem/fam_immunology) — proven `by decide`, sorry-free:

```lean
(((2 : Int) * ((2 : Int) ^ (3 : Nat))) = (16 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (200 : Int))) = (800 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ (((5000 : Int) / (10 : Int)) = (500 : Int)) ∧ ((fmax (0 : Int) ((150 : Int) - (50 : Int))) = (100 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (100 : Int)) = (300 : Int)) ∧ ((((400 : Int) * (100 : Int)) / (100 : Int)) = (400 : Int))
```

### incidence: rate(50, 100000) = 50; cumulative(25, 1000) = 25; persontime(30, 10000) = 30; relativerisk(40, 10) = 400; attributablerisk(40, 10) = 75; oddsratio(200, 50) = 400; riskdifference(40, 10) = 30; standardized(120, 100) = 120
The ledger holds this as [fam_incidence](/theorem/fam_incidence) — proven `by decide`, sorry-free:

```lean
((((50 : Int) * (100000 : Int)) / (100000 : Int)) = (50 : Int)) ∧ ((((25 : Int) * (1000 : Int)) / (1000 : Int)) = (25 : Int)) ∧ ((((30 : Int) * (10000 : Int)) / (10000 : Int)) = (30 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (10 : Int)) = (400 : Int)) ∧ ((((fmax (0 : Int) ((40 : Int) - (10 : Int))) * (100 : Int)) / (40 : Int)) = (75 : Int)) ∧ ((((200 : Int) * (100 : Int)) / (50 : Int)) = (400 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (10 : Int))) = (30 : Int)) ∧ ((((120 : Int) * (100 : Int)) / (100 : Int)) = (120 : Int))
```

### incident: mttr(600, 8) = 75; mtta(450, 90) = 5; errorbudget(1000, 250) = 750; blastradius(12, 500) = 6000; severity(5, 4) = 20; postmortemscore(9, 10) = 90; recurrence(24, 12) = 2; slaimpact(120, 60) = 1; slaimpact(30, 60) = 0
The ledger holds this as [fam_incident](/theorem/fam_incident) — proven `by decide`, sorry-free:

```lean
(((600 : Int) / (8 : Int)) = (75 : Int)) ∧ (((450 : Int) / (90 : Int)) = (5 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (250 : Int))) = (750 : Int)) ∧ (((12 : Int) * (500 : Int)) = (6000 : Int)) ∧ (((5 : Int) * (4 : Int)) = (20 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int)) ∧ (((24 : Int) / (12 : Int)) = (2 : Int)) ∧ ((if (if (120 : Int) > (60 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (30 : Int) > (60 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int))
```

### indexing: selectivity(5, 1000) = 0; cardinality(900, 1000) = 90; fanout(1000, 10) = 100; depth(1000000, 100) = 10000; scan(250, 1000) = 25; coverage(80, 100) = 80; bloat(200, 1000) = 20; speedup(5000, 100) = 5000
The ledger holds this as [fam_indexing](/theorem/fam_indexing) — proven `by decide`, sorry-free:

```lean
((((5 : Int) * (100 : Int)) / (1000 : Int)) = (0 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((1000000 : Int) / (100 : Int)) = (10000 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((200 : Int) * (100 : Int)) / (1000 : Int)) = (20 : Int)) ∧ ((((5000 : Int) * (100 : Int)) / (100 : Int)) = (5000 : Int))
```

### inductor: inductance(100, 1) = 100; reactance(628, 10) = 6280; energy(100, 2) = 50; timeconstant(100, 10) = 10; turnspairs(10, 2) = 45; quality(100, 2) = 50; seriessum(100, 200) = 300; coupling(90, 100) = 90
The ledger holds this as [fam_inductor](/theorem/fam_inductor) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * (1 : Int)) = (100 : Int)) ∧ (((628 : Int) * (10 : Int)) = (6280 : Int)) ∧ (((100 : Int) / (2 : Int)) = (50 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ (((100 : Int) / (2 : Int)) = (50 : Int)) ∧ (((100 : Int) + (200 : Int)) = (300 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int))
```

### inequality: giniscaled(40, 1) = 40; quintileratio(800, 100) = 8; palmaratio(200, 100) = 2; lorenzgap(50, 40) = 10; percentilepairs(10, 2) = 45; topshare(20, 100) = 20; deciles(10, 0) = 10; theilindex(350, 100) = 3
The ledger holds this as [fam_inequality](/theorem/fam_inequality) — proven `by decide`, sorry-free:

```lean
(((40 : Int) / (1 : Int)) = (40 : Int)) ∧ (((800 : Int) / (100 : Int)) = (8 : Int)) ∧ (((200 : Int) / (100 : Int)) = (2 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (40 : Int))) = (10 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ (((10 : Int) + (0 : Int)) = (10 : Int)) ∧ (((350 : Int) / (100 : Int)) = (3 : Int))
```

### inflation: cpi(100, 3) = 300; ratepct(4, 100) = 4; realvalue(1000, 40) = 960; pricelevel(100, 8) = 108; purchasingpower(96, 100) = 96; indexorderings(4) = 24; basketitems(80, 1) = 80; erosion(100, 96) = 4
The ledger holds this as [fam_inflation](/theorem/fam_inflation) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * (3 : Int)) = (300 : Int)) ∧ ((((4 : Int) * (100 : Int)) / (100 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (40 : Int))) = (960 : Int)) ∧ (((100 : Int) + (8 : Int)) = (108 : Int)) ∧ ((((96 : Int) * (100 : Int)) / (100 : Int)) = (96 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ (((80 : Int) * (1 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (96 : Int))) = (4 : Int))
```

### informatics: bandwidth(1000, 8) = 125; bits(10) = 80; compression(1000, 250) = 400; entropy(1000, 8) = 125; index(10000, 500) = 20; precision(80, 100) = 80; recall(80, 200) = 40; redundancy(30, 100) = 30
The ledger holds this as [fam_informatics](/theorem/fam_informatics) — proven `by decide`, sorry-free:

```lean
(((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ (((10 : Int) * (8 : Int)) = (80 : Int)) ∧ ((((1000 : Int) * (100 : Int)) / (250 : Int)) = (400 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ (((10000 : Int) / (500 : Int)) = (20 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (200 : Int)) = (40 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int))
```

### ingestion: eventrate(6000, 60) = 100; backpressure(1200, 1000) = 200; bufferfill(750, 1000) = 75; watermark(1000, 30) = 34; lag(10000, 9500) = 500; batchsize(1000, 8) = 125; retrybudget(2, 5) = 3; checkpoint(1050, 100) = 1000; backpressure(800, 1000) = 0
The ledger holds this as [fam_ingestion](/theorem/fam_ingestion) — proven `by decide`, sorry-free:

```lean
(((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((fmax (0 : Int) ((1200 : Int) - (1000 : Int))) = (200 : Int)) ∧ ((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ ((-((-(1000 : Int)) / (30 : Int))) = (34 : Int)) ∧ ((fmax (0 : Int) ((10000 : Int) - (9500 : Int))) = (500 : Int)) ∧ ((-((-(1000 : Int)) / (8 : Int))) = (125 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (2 : Int))) = (3 : Int)) ∧ ((((1050 : Int) / (100 : Int)) * (100 : Int)) = (1000 : Int)) ∧ ((fmax (0 : Int) ((800 : Int) - (1000 : Int))) = (0 : Int))
```

### inspection: defectrate(50, 1000) = 5; sampling(1000, 40) = 25; aql(4, 500) = 8; acceptance(3, 5) = 1; acceptance(7, 5) = 0; firstpass(950, 1000) = 95; rework(20, 15) = 300; scrap(25, 1000) = 2; coverage(800, 1000) = 80
The ledger holds this as [fam_inspection](/theorem/fam_inspection) — proven `by decide`, sorry-free:

```lean
((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((-((-(1000 : Int)) / (40 : Int))) = (25 : Int)) ∧ ((((4 : Int) * (1000 : Int)) / (500 : Int)) = (8 : Int)) ∧ ((if (if (3 : Int) ≤ (5 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (7 : Int) ≤ (5 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ (((20 : Int) * (15 : Int)) = (300 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (1000 : Int)) = (2 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (1000 : Int)) = (80 : Int))
```

### insurance: premium(100000, 2) = 2000; claim(5000, 500) = 4500; claim(300, 500) = 0; coinsurance(10000, 60, 100) = 6000; indemnity(8000, 5000) = 5000; lossratio(70000, 100000) = 70; reserve(50000, 30000) = 20000; subrogation(8000, 10000) = 8000; copay(4000, 20) = 800; premium2(5, 1000) = 50; claimratio(20, 100) = 20; retained(100, 30) = 70; coinsurance2(100, 80) = 80; ceded(100, 40) = 60; frequencyseverity(3, 4) = 12; solvencymargin(100, 70) = 30
The ledger holds this as [fam_insurance](/theorem/fam_insurance) — proven `by decide`, sorry-free:

```lean
((((100000 : Int) * (2 : Int)) / (100 : Int)) = (2000 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (500 : Int))) = (4500 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (500 : Int))) = (0 : Int)) ∧ ((((10000 : Int) * (60 : Int)) / (100 : Int)) = (6000 : Int)) ∧ ((fmin (8000 : Int) (5000 : Int)) = (5000 : Int)) ∧ ((((70000 : Int) * (100 : Int)) / (100000 : Int)) = (70 : Int)) ∧ ((fmax (0 : Int) ((50000 : Int) - (30000 : Int))) = (20000 : Int)) ∧ ((fmin (8000 : Int) (10000 : Int)) = (8000 : Int)) ∧ ((((4000 : Int) * (20 : Int)) / (100 : Int)) = (800 : Int)) ∧ ((((5 : Int) * (1000 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int)) ∧ ((((100 : Int) * (80 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (40 : Int))) = (60 : Int)) ∧ (((3 : Int) * (4 : Int)) = (12 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (70 : Int))) = (30 : Int))
```

### interaction: fitts(500, 10) = 5000; clicks(10, 2) = 5; feedback(300, 100) = 200; affordance(8, 10) = 80; flow(90, 10) = 90
The ledger holds this as [fam_interaction](/theorem/fam_interaction) — proven `by decide`, sorry-free:

```lean
((((500 : Int) * (100 : Int)) / (10 : Int)) = (5000 : Int)) ∧ (((10 : Int) / (2 : Int)) = (5 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (100 : Int))) = (200 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ ((((90 : Int) * (100 : Int)) / ((90 : Int) + (10 : Int))) = (90 : Int))
```

### interconnect: lanes(4, 16) = 64; bandwidth(16, 32) = 512; throughput(130, 128, 130) = 128; latency(5, 100) = 500; width(16, 1) = 16; topology(8, 3) = 12; duplex(512) = 1024; transfers(32, 16) = 512; overhead(130, 128) = 2; hops(8) = 7
The ledger holds this as [fam_interconnect](/theorem/fam_interconnect) — proven `by decide`, sorry-free:

```lean
(((4 : Int) * (16 : Int)) = (64 : Int)) ∧ (((16 : Int) * (32 : Int)) = (512 : Int)) ∧ ((((130 : Int) * (128 : Int)) / (130 : Int)) = (128 : Int)) ∧ (((5 : Int) * (100 : Int)) = (500 : Int)) ∧ (((16 : Int) * (1 : Int)) = (16 : Int)) ∧ ((((8 : Int) * (3 : Int)) / (2 : Int)) = (12 : Int)) ∧ (((512 : Int) * (2 : Int)) = (1024 : Int)) ∧ (((32 : Int) * (16 : Int)) = (512 : Int)) ∧ (((130 : Int) - (128 : Int)) = (2 : Int)) ∧ (((8 : Int) - (1 : Int)) = (7 : Int))
```

### interestrate: simpleinterest(60000, 20) = 3000; apr(5, 100) = 5; compoundperiods(12, 1) = 12; doublingyears(72, 8) = 9; discountfactor(95, 100) = 95; yieldcurve(2, 3, 4) = 9; spread(500, 350) = 150; realrate(5, 2) = 3
The ledger holds this as [fam_interestrate](/theorem/fam_interestrate) — proven `by decide`, sorry-free:

```lean
(((60000 : Int) / (20 : Int)) = (3000 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((12 : Int) * (1 : Int)) = (12 : Int)) ∧ (((72 : Int) / (8 : Int)) = (9 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((((2 : Int) + (3 : Int)) + (4 : Int)) = (9 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (350 : Int))) = (150 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (2 : Int))) = (3 : Int))
```

### interference: beatfrequency(440, 435) = 5; constructive(3, 4) = 7; destructive(7, 2) = 5; fringecount(1000, 25) = 40; opticalpath(2, 500) = 1000; phasedifference(250, 500) = 180; thinfilm(2, 150) = 600; visibility(80, 20) = 60
The ledger holds this as [fam_interference](/theorem/fam_interference) — proven `by decide`, sorry-free:

```lean
((fmax (0 : Int) ((440 : Int) - (435 : Int))) = (5 : Int)) ∧ (((3 : Int) + (4 : Int)) = (7 : Int)) ∧ ((fmax (0 : Int) ((7 : Int) - (2 : Int))) = (5 : Int)) ∧ (((1000 : Int) / (25 : Int)) = (40 : Int)) ∧ (((2 : Int) * (500 : Int)) = (1000 : Int)) ∧ ((((250 : Int) * (360 : Int)) / (500 : Int)) = (180 : Int)) ∧ ((((2 : Int) * (2 : Int)) * (150 : Int)) = (600 : Int)) ∧ (((((80 : Int) - (20 : Int)) * (100 : Int)) / ((80 : Int) + (20 : Int))) = (60 : Int))
```

### interleaving: depth(4, 8) = 32; span(32, 10) = 320; blocksize(1000, 8) = 125; delay(100, 4) = 25; burstprotection(50, 10) = 40; matrixcells(16, 16) = 256; spreadfactor(240, 8) = 30; latency(32, 5) = 160
The ledger holds this as [fam_interleaving](/theorem/fam_interleaving) — proven `by decide`, sorry-free:

```lean
(((4 : Int) * (8 : Int)) = (32 : Int)) ∧ (((32 : Int) * (10 : Int)) = (320 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (10 : Int))) = (40 : Int)) ∧ (((16 : Int) * (16 : Int)) = (256 : Int)) ∧ (((240 : Int) / (8 : Int)) = (30 : Int)) ∧ (((32 : Int) * (5 : Int)) = (160 : Int))
```

### invariant: conditions(5, 3) = 8; preconditionpairs(8, 2) = 28; stateorderings(4) = 24; holdratio(100, 100) = 100; clausesubsets(5) = 32; violations(10, 10) = 0; strengthlevels(3, 1) = 4; checkpaths(5, 2) = 20
The ledger holds this as [fam_invariant](/theorem/fam_invariant) — proven `by decide`, sorry-free:

```lean
(((5 : Int) + (3 : Int)) = (8 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ ((((100 : Int) * (100 : Int)) / (100 : Int)) = (100 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (10 : Int))) = (0 : Int)) ∧ (((3 : Int) + (1 : Int)) = (4 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (5 : Int)))) / (Int.ofNat (ffact (Int.toNat ((5 : Int) - (2 : Int)))))) = (20 : Int))
```

### inverter: efficiency(950, 1000) = 95; power(230, 10) = 2300; thd(5, 100) = 5; dcac(1000, 95) = 950; clipping(250, 230) = 20; clipping(200, 230) = 0; rating(1000, 80) = 800; loss(1000, 950) = 50; powerfactor(800, 1000) = 80
The ledger holds this as [fam_inverter](/theorem/fam_inverter) — proven `by decide`, sorry-free:

```lean
((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ (((230 : Int) * (10 : Int)) = (2300 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ ((((1000 : Int) * (95 : Int)) / (100 : Int)) = (950 : Int)) ∧ ((fmax (0 : Int) ((250 : Int) - (230 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (230 : Int))) = (0 : Int)) ∧ ((((1000 : Int) * (80 : Int)) / (100 : Int)) = (800 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (950 : Int))) = (50 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (1000 : Int)) = (80 : Int))
```

### invoice: subtotal(100, 5) = 500; tax(20, 100) = 20; total(500, 100) = 600; lineitems(8, 0) = 8; discount(10, 100) = 10; duedays(30, 0) = 30; overdue(45, 30) = 15; combos(6, 2) = 15
The ledger holds this as [fam_invoice](/theorem/fam_invoice) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * (5 : Int)) = (500 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ (((500 : Int) + (100 : Int)) = (600 : Int)) ∧ (((8 : Int) + (0 : Int)) = (8 : Int)) ∧ ((((10 : Int) * (100 : Int)) / (100 : Int)) = (10 : Int)) ∧ (((30 : Int) + (0 : Int)) = (30 : Int)) ∧ ((fmax (0 : Int) ((45 : Int) - (30 : Int))) = (15 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int))
```

### iot: sampling(100, 60) = 6000; battery(2000, 50) = 40; telemetry(500, 12) = 6000; duty(15, 60) = 25; latency(4, 12) = 48; payload(8, 4) = 32; heartbeat(3600, 60) = 60; range(100, 5) = 20
The ledger holds this as [fam_iot](/theorem/fam_iot) — proven `by decide`, sorry-free:

```lean
(((100 : Int) * (60 : Int)) = (6000 : Int)) ∧ (((2000 : Int) / (50 : Int)) = (40 : Int)) ∧ (((500 : Int) * (12 : Int)) = (6000 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (60 : Int)) = (25 : Int)) ∧ (((4 : Int) * (12 : Int)) = (48 : Int)) ∧ (((8 : Int) * (4 : Int)) = (32 : Int)) ∧ (((3600 : Int) / (60 : Int)) = (60 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int))
```

### irrigation: requirement(500, 25) = 12500; efficiency(850, 1000) = 85; runtime(6000, 50) = 120; application(10000, 500) = 20; evapotranspiration(60, 90) = 54; uniformity(80, 100) = 80; flowrate(200, 4) = 800; schedule(100, 30) = 70; schedule(20, 30) = 0
The ledger holds this as [fam_irrigation](/theorem/fam_irrigation) — proven `by decide`, sorry-free:

```lean
(((500 : Int) * (25 : Int)) = (12500 : Int)) ∧ ((((850 : Int) * (100 : Int)) / (1000 : Int)) = (85 : Int)) ∧ (((6000 : Int) / (50 : Int)) = (120 : Int)) ∧ (((10000 : Int) / (500 : Int)) = (20 : Int)) ∧ ((((60 : Int) * (90 : Int)) / (100 : Int)) = (54 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((200 : Int) * (4 : Int)) = (800 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (30 : Int))) = (0 : Int))
```


::: warning 
THE FAMILIES, I — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. The boundary is confirmed by the wing's own sealed theorems — e.g. [fam_ichthyology](/theorem/fam_ichthyology) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
