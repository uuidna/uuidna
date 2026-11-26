---
title: "THE FAMILIES, Q"
description: "Computed from lean/FamiliesQ.lean — 8 sealed theorems, every claim citing its proof."
---

# THE FAMILIES, Q

> THE FAMILIES, Q — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. — held by [fam_qsec](/theorem/fam_qsec) and its 7 siblings below.

**8 theorems** and **2,787 decided cases**, from [fam_qsec](/theorem/fam_qsec) onward, each proven `by decide` in <a href="/lean/FamiliesQ.lean">lean/FamiliesQ.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFamiliesQ.lean)** — nothing to install. The editor fetches `lean/FamiliesQ.lean` from the repository and re-decides all 8 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### qsec: keybits(8) = 256; entropybits(16, 8) = 128; attemptpairs(10, 2) = 45; hashrounds(10000, 1) = 10000; collisionresistance(99, 100) = 99; attackcost(10) = 1024; saltlength(16, 0) = 16; strengthmargin(256, 128) = 128
The ledger holds this as [fam_qsec](/theorem/fam_qsec) — proven `by decide`, sorry-free:

```lean
(((2 : Int) ^ (8 : Nat)) = (256 : Int)) ∧ (((16 : Int) * (8 : Int)) = (128 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ (((10000 : Int) * (1 : Int)) = (10000 : Int)) ∧ ((((99 : Int) * (100 : Int)) / (100 : Int)) = (99 : Int)) ∧ (((2 : Int) ^ (10 : Nat)) = (1024 : Int)) ∧ (((16 : Int) + (0 : Int)) = (16 : Int)) ∧ ((fmax (0 : Int) ((256 : Int) - (128 : Int))) = (128 : Int))
```

### quality: defectrate(3, 1000) = 3000; firstpass(950, 1000) = 95; sigma(60, 10) = 6; capability(20, 10) = 200; conformance(990, 1000) = 99; rework(50, 1000) = 5; scrap(20, 1000) = 2; satisfaction(850, 1000) = 85
The ledger holds this as [fam_quality](/theorem/fam_quality) — proven `by decide`, sorry-free:

```lean
((((3 : Int) * (1000000 : Int)) / (1000 : Int)) = (3000 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ (((60 : Int) / (10 : Int)) = (6 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (10 : Int)) = (200 : Int)) ∧ ((((990 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (1000 : Int)) = (2 : Int)) ∧ ((((850 : Int) * (100 : Int)) / (1000 : Int)) = (85 : Int))
```

### quantization: levels(8) = 256; stepsize(1000, 8) = 125; stepsize(1000, 0) = 0; snr(16) = 96; bits(1024) = 10; dynamicrange(8) = 255; quantizationerror(125) = 62; coderate(16, 1000) = 16000; resolution(2560, 8) = 10
The ledger holds this as [fam_quantization](/theorem/fam_quantization) — proven `by decide`, sorry-free:

```lean
(((2 : Int) ^ (8 : Nat)) = (256 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ (((1000 : Int) / (0 : Int)) = (0 : Int)) ∧ (((6 : Int) * (16 : Int)) = (96 : Int)) ∧ ((Int.ofNat (flog 2 64 (Int.toNat (1024 : Int)))) = (10 : Int)) ∧ ((((2 : Int) ^ (8 : Nat)) - (1 : Int)) = (255 : Int)) ∧ (((125 : Int) / (2 : Int)) = (62 : Int)) ∧ (((16 : Int) * (1000 : Int)) = (16000 : Int)) ∧ (((2560 : Int) / ((2 : Int) ^ (8 : Nat))) = (10 : Int))
```

### quantum: qubits(5, 0) = 5; states(5) = 32; gatecount(20, 3) = 60; entanglementpairs(8, 2) = 28; superposition(4) = 16; circuitdepth(10, 5) = 15; shots(1024, 1) = 1024; fidelity(99, 100) = 99
The ledger holds this as [fam_quantum](/theorem/fam_quantum) — proven `by decide`, sorry-free:

```lean
(((5 : Int) + (0 : Int)) = (5 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ (((20 : Int) * (3 : Int)) = (60 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((10 : Int) + (5 : Int)) = (15 : Int)) ∧ (((1024 : Int) * (1 : Int)) = (1024 : Int)) ∧ ((((99 : Int) * (100 : Int)) / (100 : Int)) = (99 : Int))
```

### query: pages(100, 10) = 10; skip(3, 10) = 20; population(5, 2) = 10; limit(500, 100) = 100; hit(45, 100) = 45
The ledger holds this as [fam_query](/theorem/fam_query) — proven `by decide`, sorry-free:

```lean
((-((-(100 : Int)) / (10 : Int))) = (10 : Int)) ∧ ((fmax (0 : Int) (((3 : Int) - (1 : Int)) * (10 : Int))) = (20 : Int)) ∧ (((5 : Int) * (2 : Int)) = (10 : Int)) ∧ ((fmin (500 : Int) (100 : Int)) = (100 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int))
```

### queue: throughput(6000, 60) = 100; latency(1000, 100) = 10; depth(64, 0) = 64; waittime(120, 4) = 30; slots(6) = 64; arrivals(10, 60) = 600; service(1000, 10) = 100; combos(8, 2) = 28
The ledger holds this as [fam_queue](/theorem/fam_queue) — proven `by decide`, sorry-free:

```lean
(((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((1000 : Int) / (100 : Int)) = (10 : Int)) ∧ (((64 : Int) + (0 : Int)) = (64 : Int)) ∧ (((120 : Int) / (4 : Int)) = (30 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ (((10 : Int) * (60 : Int)) = (600 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int))
```

### queueing: utilization(80, 100) = 80; averagequeue(1000, 50) = 20; waitingtime(100, 20) = 5; littleslaw(30, 4) = 120; servicerate(6000, 60) = 100; arrivalrate(5400, 60) = 90; systemlength(18, 2) = 20; idleprobability(25, 100) = 75; idleprobability(100, 100) = 0
The ledger holds this as [fam_queueing](/theorem/fam_queueing) — proven `by decide`, sorry-free:

```lean
((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ (((100 : Int) / (20 : Int)) = (5 : Int)) ∧ (((30 : Int) * (4 : Int)) = (120 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((5400 : Int) / (60 : Int)) = (90 : Int)) ∧ (((18 : Int) + (2 : Int)) = (20 : Int)) ∧ ((((fmax (0 : Int) ((100 : Int) - (25 : Int))) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((((fmax (0 : Int) ((100 : Int) - (100 : Int))) * (100 : Int)) / (100 : Int)) = (0 : Int))
```

### quilting: blockcount(12, 12) = 144; patchpairs(16, 2) = 120; seamlength(100, 4) = 400; patternorderings(5) = 120; colorsubsets(6) = 64; gridcells(20, 20) = 400; borderwidth(4, 2) = 6; symmetryratio(90, 100) = 90
The ledger holds this as [fam_quilting](/theorem/fam_quilting) — proven `by decide`, sorry-free:

```lean
(((12 : Int) * (12 : Int)) = (144 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (16 : Int)) (Int.toNat (2 : Int)))) = (120 : Int)) ∧ (((100 : Int) * (4 : Int)) = (400 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ (((20 : Int) * (20 : Int)) = (400 : Int)) ∧ (((4 : Int) + (2 : Int)) = (6 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int))
```


::: warning 
THE FAMILIES, Q — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. The boundary is confirmed by the wing's own sealed theorems — e.g. [fam_qsec](/theorem/fam_qsec) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
