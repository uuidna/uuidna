-- lean/FamiliesD.lean — GENERATED. THE FAMILIES, D — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a
def fmin (a b : Int) : Int := if a ≤ b then a else b
def ffact : Nat → Nat
  | 0 => 1
  | n + 1 => (n + 1) * ffact n
def fchoose (n : Nat) : Nat → Nat
  | 0 => 1
  | k + 1 => fchoose n k * (n - k) / (k + 1)

/-- dairy: output(30000, 100) = 300; butterfat(40, 1000) = 4; somatic(200000, 1000) = 200; protein(33, 1000) =
    3; conception(45, 100) = 45; feedefficiency(1500, 1000) = 150; persistency(80, 100) = 80 -/
theorem fam_dairy : (((30000 : Int) / (100 : Int)) = (300 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (1000 : Int)) = (4 : Int)) ∧ (((200000 : Int) / (1000 : Int)) = (200 : Int)) ∧ ((((33 : Int) * (100 : Int)) / (1000 : Int)) = (3 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ ((((1500 : Int) * (100 : Int)) / (1000 : Int)) = (150 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) := by decide

/-- dance: tempo(480, 4) = 120; counts(8, 8) = 64; synchrony(9, 10) = 90; steps(5, 4) = 20; phrase(64, 8) = 8;
    elevation(120, 4) = 30; rotation(450) = 90; rotation(-90) = 270; stamina(300, 60) = 500 -/
theorem fam_dance : (((480 : Int) / (4 : Int)) = (120 : Int)) ∧ (((8 : Int) * (8 : Int)) = (64 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int)) ∧ (((5 : Int) * (4 : Int)) = (20 : Int)) ∧ (((64 : Int) / (8 : Int)) = (8 : Int)) ∧ (((120 : Int) / (4 : Int)) = (30 : Int)) ∧ (((((450 : Int) % (360 : Int)) + (360 : Int)) % (360 : Int)) = (90 : Int)) ∧ (((((-90 : Int) % (360 : Int)) + (360 : Int)) % (360 : Int)) = (270 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (60 : Int)) = (500 : Int)) := by decide

/-- datacenter: pue(1500, 1000) = 150; racks(1000, 42) = 24; density(10000, 24) = 240000; coolingload(1000, 150)
    = 500; redundancy(5, 4) = 1; capacity(24, 42) = 1008; power(24, 10) = 240; availability(525000, 525600) =
    99; carbon(1000, 400) = 400000; waterusage(1000, 2) = 2000 -/
theorem fam_datacenter : ((((1500 : Int) * (100 : Int)) / (1000 : Int)) = (150 : Int)) ∧ ((-((-(1000 : Int)) / (42 : Int))) = (24 : Int)) ∧ (((10000 : Int) * (24 : Int)) = (240000 : Int)) ∧ ((((1000 : Int) * ((150 : Int) - (100 : Int))) / (100 : Int)) = (500 : Int)) ∧ (((5 : Int) - (4 : Int)) = (1 : Int)) ∧ (((24 : Int) * (42 : Int)) = (1008 : Int)) ∧ (((24 : Int) * (10 : Int)) = (240 : Int)) ∧ ((((525000 : Int) * (100 : Int)) / (525600 : Int)) = (99 : Int)) ∧ (((1000 : Int) * (400 : Int)) = (400000 : Int)) ∧ (((1000 : Int) * (2 : Int)) = (2000 : Int)) := by decide

/-- dataquality: accuracy(20, 1000) = 98; completeness(950, 1000) = 95; consistency(880, 1000) = 88;
    duplicaterate(30, 1000) = 3; freshness(500, 450) = 50; nullrate(50, 1000) = 5; uniqueness(900, 1000) = 90;
    validity(970, 1000) = 97 -/
theorem fam_dataquality : ((((fmax (0 : Int) ((1000 : Int) - (20 : Int))) * (100 : Int)) / (1000 : Int)) = (98 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((((880 : Int) * (100 : Int)) / (1000 : Int)) = (88 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (1000 : Int)) = (3 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (450 : Int))) = (50 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ ((((970 : Int) * (100 : Int)) / (1000 : Int)) = (97 : Int)) := by decide

/-- deadreckoning: distance(12, 3) = 36; driftangle(10, 60) = 10; elapsedtime(360, 12) = 30; elapsedtime(360, 0)
    = 0; speedmadegood(360, 30) = 12; setandrift(3, 4) = 12; estimatedposition(100, 36) = 136 -/
theorem fam_deadreckoning : (((12 : Int) * (3 : Int)) = (36 : Int)) ∧ ((((10 : Int) * (60 : Int)) / (60 : Int)) = (10 : Int)) ∧ (((360 : Int) / (12 : Int)) = (30 : Int)) ∧ (((360 : Int) / (0 : Int)) = (0 : Int)) ∧ (((360 : Int) / (30 : Int)) = (12 : Int)) ∧ (((3 : Int) * (4 : Int)) = (12 : Int)) ∧ (((100 : Int) + (36 : Int)) = (136 : Int)) := by decide

/-- dedup: hit(9) = 8; saved(9, 100) = 800; logical(9, 100) = 900; physical(1, 100) = 100; ratio(900, 100) =
    900; chunk(10000, 4096) = 3; incref(3) = 4; decref(1) = 0; decref(0) = 0; pinned(2) = 1 -/
theorem fam_dedup : (((9 : Int) - (1 : Int)) = (8 : Int)) ∧ ((((9 : Int) - (1 : Int)) * (100 : Int)) = (800 : Int)) ∧ (((9 : Int) * (100 : Int)) = (900 : Int)) ∧ (((1 : Int) * (100 : Int)) = (100 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (100 : Int)) = (900 : Int)) ∧ ((-((-(10000 : Int)) / (4096 : Int))) = (3 : Int)) ∧ (((3 : Int) + (1 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((1 : Int) - (1 : Int))) = (0 : Int)) ∧ ((fmax (0 : Int) ((0 : Int) - (1 : Int))) = (0 : Int)) ∧ ((if (if (2 : Int) > (0 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) := by decide

/-- delivery: ontime(950, 1000) = 95; density(120, 8) = 15; firstattempt(880, 1000) = 88; lastmile(4500, 900) =
    5; window(270, 300) = 90; returns(30, 1000) = 3; eta(600, 50) = 12; productivity(96, 8) = 12 -/
theorem fam_delivery : ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ (((120 : Int) / (8 : Int)) = (15 : Int)) ∧ ((((880 : Int) * (100 : Int)) / (1000 : Int)) = (88 : Int)) ∧ (((4500 : Int) / (900 : Int)) = (5 : Int)) ∧ ((((270 : Int) * (100 : Int)) / (300 : Int)) = (90 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (1000 : Int)) = (3 : Int)) ∧ (((600 : Int) / (50 : Int)) = (12 : Int)) ∧ (((96 : Int) / (8 : Int)) = (12 : Int)) := by decide

/-- demographics: birthrate(12000, 1000000) = 12; deathrate(8000, 1000000) = 8; growth(12000, 8000) = 4000;
    growth(8000, 12000) = -4000; density(1000000, 500) = 2000; dependency(45, 55) = 81; median(3900, 100) = 39;
    migration(5000, 2000) = 3000; migration(2000, 5000) = -3000; life(820000, 10000) = 82 -/
theorem fam_demographics : ((((12000 : Int) * (1000 : Int)) / (1000000 : Int)) = (12 : Int)) ∧ ((((8000 : Int) * (1000 : Int)) / (1000000 : Int)) = (8 : Int)) ∧ (((12000 : Int) - (8000 : Int)) = (4000 : Int)) ∧ (((8000 : Int) - (12000 : Int)) = (-4000 : Int)) ∧ (((1000000 : Int) / (500 : Int)) = (2000 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (55 : Int)) = (81 : Int)) ∧ (((3900 : Int) / (100 : Int)) = (39 : Int)) ∧ (((5000 : Int) - (2000 : Int)) = (3000 : Int)) ∧ (((2000 : Int) - (5000 : Int)) = (-3000 : Int)) ∧ (((820000 : Int) / (10000 : Int)) = (82 : Int)) := by decide

/-- demography: birthrate(600, 50000) = 12; deathrate(400, 50000) = 8; dependencyratio(600, 1000) = 60;
    doublingtime(2) = 35; lifeexpectancy(60000, 800) = 75; medianage(40000, 1000) = 40; naturalincrease(600,
    400) = 200; naturalincrease(400, 600) = 0; sexratio(5100, 5000) = 102 -/
theorem fam_demography : ((((600 : Int) * (1000 : Int)) / (50000 : Int)) = (12 : Int)) ∧ ((((400 : Int) * (1000 : Int)) / (50000 : Int)) = (8 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (1000 : Int)) = (60 : Int)) ∧ (((70 : Int) / (2 : Int)) = (35 : Int)) ∧ (((60000 : Int) / (800 : Int)) = (75 : Int)) ∧ (((40000 : Int) / (1000 : Int)) = (40 : Int)) ∧ ((fmax (0 : Int) ((600 : Int) - (400 : Int))) = (200 : Int)) ∧ ((fmax (0 : Int) ((400 : Int) - (600 : Int))) = (0 : Int)) ∧ ((((5100 : Int) * (100 : Int)) / (5000 : Int)) = (102 : Int)) := by decide

/-- dentistry: decay(3, 32) = 9; plaque(40, 160) = 25; anesthetic(70, 2) = 140; recall(6, 2) = 4; recall(2, 6) =
    0; restoration(8, 10) = 80; fluoride(700, 1500) = 1; fluoride(2000, 1500) = 0; extraction(1, 32) = 3 -/
theorem fam_dentistry : ((((3 : Int) * (100 : Int)) / (32 : Int)) = (9 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (160 : Int)) = (25 : Int)) ∧ (((70 : Int) * (2 : Int)) = (140 : Int)) ∧ ((fmax (0 : Int) ((6 : Int) - (2 : Int))) = (4 : Int)) ∧ ((fmax (0 : Int) ((2 : Int) - (6 : Int))) = (0 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ ((if (if (700 : Int) ≤ (1500 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (2000 : Int) ≤ (1500 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((1 : Int) * (100 : Int)) / (32 : Int)) = (3 : Int)) := by decide

/-- deontology: duties(7, 3) = 10; maximorderings(4) = 24; dutypairs(10, 2) = 45; universalizability(80, 100) =
    80; imperativesubsets(4) = 16; obligationchains(5, 2) = 20; rightsduties(5, 2) = 10; conflictcount(12, 8) =
    4 -/
theorem fam_deontology : (((7 : Int) + (3 : Int)) = (10 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (5 : Int)))) / (Int.ofNat (ffact (Int.toNat ((5 : Int) - (2 : Int)))))) = (20 : Int)) ∧ (((5 : Int) * (2 : Int)) = (10 : Int)) ∧ ((fmax (0 : Int) ((12 : Int) - (8 : Int))) = (4 : Int)) := by decide

/-- deployment: frequency(30, 30) = 1; leadtime(100, 160) = 60; leadtime(160, 100) = 0; failrate(5, 100) = 5;
    mttr(600, 5) = 120; rollback(2, 100) = 2; availability(999, 1000) = 99; canary(9, 10) = 90 -/
theorem fam_deployment : (((30 : Int) / (30 : Int)) = (1 : Int)) ∧ ((fmax (0 : Int) ((160 : Int) - (100 : Int))) = (60 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (160 : Int))) = (0 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((600 : Int) / (5 : Int)) = (120 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int)) ∧ ((((999 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int)) := by decide

/-- depreciation: straightline(10000, 1000, 5) = 1800; decliningbalance(10000, 20) = 2000;
    unitsofproduction(45000, 9000, 90000) = 4500; bookvalue(10000, 3600) = 6400; accumulated(1800, 3) = 5400;
    salvage(10000, 9000) = 1000; rate(5) = 20; remaining(5, 3) = 2; remaining(3, 5) = 0 -/
theorem fam_depreciation : ((((10000 : Int) - (1000 : Int)) / (5 : Int)) = (1800 : Int)) ∧ ((((10000 : Int) * (20 : Int)) / (100 : Int)) = (2000 : Int)) ∧ ((((45000 : Int) * (9000 : Int)) / (90000 : Int)) = (4500 : Int)) ∧ ((fmax (0 : Int) ((10000 : Int) - (3600 : Int))) = (6400 : Int)) ∧ (((1800 : Int) * (3 : Int)) = (5400 : Int)) ∧ ((fmax (0 : Int) ((10000 : Int) - (9000 : Int))) = (1000 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (3 : Int))) = (2 : Int)) ∧ ((fmax (0 : Int) ((3 : Int) - (5 : Int))) = (0 : Int)) := by decide

/-- derivative: intrinsic(150, 100) = 50; intrinsic(90, 100) = 0; payoff(10, 50) = 500; notional(10, 100, 50) =
    50000; margin(50000, 20) = 10000; leverage(50000, 10000) = 5; breakeven(100, 5) = 105; moneyness(150, 100) =
    1; moneyness(90, 100) = 0; settlement(120, 100, 10) = 200 -/
theorem fam_derivative : ((fmax (0 : Int) ((150 : Int) - (100 : Int))) = (50 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (100 : Int))) = (0 : Int)) ∧ (((10 : Int) * (50 : Int)) = (500 : Int)) ∧ ((((10 : Int) * (100 : Int)) * (50 : Int)) = (50000 : Int)) ∧ ((((50000 : Int) * (20 : Int)) / (100 : Int)) = (10000 : Int)) ∧ (((50000 : Int) / (10000 : Int)) = (5 : Int)) ∧ (((100 : Int) + (5 : Int)) = (105 : Int)) ∧ ((if (if (150 : Int) ≥ (100 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (90 : Int) ≥ (100 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((fmax (0 : Int) ((120 : Int) - (100 : Int))) * (10 : Int)) = (200 : Int)) := by decide

/-- derivatives: intrinsic(120, 100) = 20; intrinsic(80, 100) = 0; leverage(10000, 500) = 20; delta(50, 100) =
    50; premium(20, 5) = 25; payoff(130, 100) = 30; breakeven(100, 5) = 105; moneyness(110, 100) = 110;
    margin(10000, 15) = 1500 -/
theorem fam_derivatives : ((fmax (0 : Int) ((120 : Int) - (100 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (100 : Int))) = (0 : Int)) ∧ (((10000 : Int) / (500 : Int)) = (20 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int)) ∧ (((20 : Int) + (5 : Int)) = (25 : Int)) ∧ ((fmax (0 : Int) ((130 : Int) - (100 : Int))) = (30 : Int)) ∧ (((100 : Int) + (5 : Int)) = (105 : Int)) ∧ ((((110 : Int) * (100 : Int)) / (100 : Int)) = (110 : Int)) ∧ ((((10000 : Int) * (15 : Int)) / (100 : Int)) = (1500 : Int)) := by decide

/-- dermatology: tbsa(9, 2) = 18; melanoma(3, 7) = 10; uv(8, 30) = 240; healing(75, 100) = 75; lesions(100, 5) =
    20; pigmentation(90, 50) = 40; pigmentation(40, 50) = 0; severity(30, 120) = 25; hydration(60, 100) = 60 -/
theorem fam_dermatology : (((9 : Int) * (2 : Int)) = (18 : Int)) ∧ (((3 : Int) + (7 : Int)) = (10 : Int)) ∧ (((8 : Int) * (30 : Int)) = (240 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (50 : Int))) = (40 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (50 : Int))) = (0 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) := by decide

/-- desalination: recovery(45, 100) = 45; salinity(35000, 1000) = 35; permeate(1000, 550) = 450;
    rejection(35000, 350) = 99; flux(1200, 60) = 20; osmotic(35, 300) = 10500; brine(1000, 450) = 550;
    brine(400, 1000) = 0; energy(1500, 500) = 3 -/
theorem fam_desalination : ((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ (((35000 : Int) / (1000 : Int)) = (35 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (550 : Int))) = (450 : Int)) ∧ (((((35000 : Int) - (350 : Int)) * (100 : Int)) / (35000 : Int)) = (99 : Int)) ∧ (((1200 : Int) / (60 : Int)) = (20 : Int)) ∧ (((35 : Int) * (300 : Int)) = (10500 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (450 : Int))) = (550 : Int)) ∧ ((fmax (0 : Int) ((400 : Int) - (1000 : Int))) = (0 : Int)) ∧ (((1500 : Int) / (500 : Int)) = (3 : Int)) := by decide

/-- designtheory: incidences(7, 3) = 21; blocksizes(7, 3) = 21; blocks(7, 3, 3) = 7; replications(7, 3, 7) = 3 -/
theorem fam_designtheory : (((7 : Int) * (3 : Int)) = (21 : Int)) ∧ (((7 : Int) * (3 : Int)) = (21 : Int)) ∧ ((((7 : Int) * (3 : Int)) / (3 : Int)) = (7 : Int)) ∧ ((((7 : Int) * (3 : Int)) / (7 : Int)) = (3 : Int)) := by decide

/-- determinism: causallinks(100, 2) = 200; statechains(5) = 120; eventpairs(12, 2) = 66; freedomdegrees(100,
    100) = 0; predictabilityratio(90, 100) = 90; causalsubsets(5) = 32; branchingfactor(1024, 10) = 102;
    necessitylevel(3, 1) = 4 -/
theorem fam_determinism : (((100 : Int) * (2 : Int)) = (200 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (100 : Int))) = (0 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ (((1024 : Int) / (10 : Int)) = (102 : Int)) ∧ (((3 : Int) + (1 : Int)) = (4 : Int)) := by decide

/-- devtools: coverage(850, 1000) = 85; build(200, 3) = 600; complexity(12, 10) = 4; debt(40, 2) = 80;
    churn(300, 120) = 420; ratio(600, 1200) = 50; bugs(50, 8) = 0; bugs(5000, 8) = 40; velocity(120, 6) = 20 -/
theorem fam_devtools : ((((850 : Int) * (100 : Int)) / (1000 : Int)) = (85 : Int)) ∧ (((200 : Int) * (3 : Int)) = (600 : Int)) ∧ ((((12 : Int) - (10 : Int)) + (2 : Int)) = (4 : Int)) ∧ (((40 : Int) * (2 : Int)) = (80 : Int)) ∧ (((300 : Int) + (120 : Int)) = (420 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (1200 : Int)) = (50 : Int)) ∧ ((((50 : Int) * (8 : Int)) / (1000 : Int)) = (0 : Int)) ∧ ((((5000 : Int) * (8 : Int)) / (1000 : Int)) = (40 : Int)) ∧ (((120 : Int) / (6 : Int)) = (20 : Int)) := by decide

/-- dewpoint: approximation(30, 50) = 20; condensationlevel(30, 20) = 1250; depression(25, 18) = 7;
    frostpoint(5, 2) = 3; humidityfromdew(30, 20) = 50; lclheight(30, 20) = 2280; spread(30, 20) = 10 -/
theorem fam_dewpoint : ((fmax (0 : Int) ((30 : Int) - (((100 : Int) - (50 : Int)) / (5 : Int)))) = (20 : Int)) ∧ (((fmax (0 : Int) ((30 : Int) - (20 : Int))) * (125 : Int)) = (1250 : Int)) ∧ ((fmax (0 : Int) ((25 : Int) - (18 : Int))) = (7 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (2 : Int))) = (3 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - ((fmax (0 : Int) ((30 : Int) - (20 : Int))) * (5 : Int)))) = (50 : Int)) ∧ (((fmax (0 : Int) ((30 : Int) - (20 : Int))) * (228 : Int)) = (2280 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (20 : Int))) = (10 : Int)) := by decide

/-- dialectic: thesisantithesis(1, 1) = 2; syntheses(3, 3) = 9; argumentpairs(10, 2) = 45; stageorderings(4) =
    24; contradictioncount(20, 14) = 6; premisepaths(6, 3) = 120; resolutiondepth(3, 2) = 5; validmoves(4) = 16 -/
theorem fam_dialectic : (((1 : Int) + (1 : Int)) = (2 : Int)) ∧ (((3 : Int) * (3 : Int)) = (9 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (14 : Int))) = (6 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (6 : Int)))) / (Int.ofNat (ffact (Int.toNat ((6 : Int) - (3 : Int)))))) = (120 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) := by decide

/-- dice: outcomes(6, 2) = 36; expectedsum(6, 2) = 7; probabilitypct(6) = 16; range(6, 2) = 10; combinations(6,
    2) = 15; variance(6) = 2; mode(6, 3) = 10 -/
theorem fam_dice : (((6 : Int) ^ (2 : Nat)) = (36 : Int)) ∧ ((((2 : Int) * ((6 : Int) + (1 : Int))) / (2 : Int)) = (7 : Int)) ∧ (((100 : Int) / (6 : Int)) = (16 : Int)) ∧ (((2 : Int) * ((6 : Int) - (1 : Int))) = (10 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) ∧ (((((6 : Int) ^ (2 : Nat)) - (1 : Int)) / (12 : Int)) = (2 : Int)) ∧ (((3 : Int) + (((3 : Int) * ((6 : Int) - (1 : Int))) / (2 : Int))) = (10 : Int)) := by decide

/-- dietetics: caloriesneeded(2000, 1) = 2000; macropct(30, 100) = 30; bmi(7000, 324) = 21; proteingrams(70, 1)
    = 70; mealsperday(3, 2) = 5; waterml(35, 70) = 2450; deficit(2500, 2000) = 500; nutrientcombos(12, 3) = 220 -/
theorem fam_dietetics : (((2000 : Int) * (1 : Int)) = (2000 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((7000 : Int) / (324 : Int)) = (21 : Int)) ∧ (((70 : Int) * (1 : Int)) = (70 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ (((35 : Int) * (70 : Int)) = (2450 : Int)) ∧ ((fmax (0 : Int) ((2500 : Int) - (2000 : Int))) = (500 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int)) := by decide

/-- diffraction: gratingorder(3, 500) = 1500; slitspacing(10000, 500) = 20; resolvingpower(2, 600) = 1200;
    fringespacing(500, 2000, 100) = 10000; braggangle(2, 600, 300) = 2; aperture(10000, 500) = 20;
    rayleighcriterion(500, 1000) = 61; pathdifference(300, 4) = 1200; slitspacing(10000, 0) = 0 -/
theorem fam_diffraction : (((3 : Int) * (500 : Int)) = (1500 : Int)) ∧ (((10000 : Int) / (500 : Int)) = (20 : Int)) ∧ (((2 : Int) * (600 : Int)) = (1200 : Int)) ∧ ((((500 : Int) * (2000 : Int)) / (100 : Int)) = (10000 : Int)) ∧ ((((2 : Int) * (600 : Int)) / ((2 : Int) * (300 : Int))) = (2 : Int)) ∧ (((10000 : Int) / (500 : Int)) = (20 : Int)) ∧ ((((122 : Int) * (500 : Int)) / (1000 : Int)) = (61 : Int)) ∧ (((300 : Int) * (4 : Int)) = (1200 : Int)) ∧ (((10000 : Int) / (0 : Int)) = (0 : Int)) := by decide

/-- diffusion: flux(5, 20) = 100; gradient(100, 40, 3) = 20; meansquare(5, 10) = 100; permeability(10, 6, 4) =
    15; fickrate(5000, 100) = 50; concentrationdrop(90, 25) = 65; concentrationdrop(20, 50) = 0;
    effusionratio(100, 50) = 200 -/
theorem fam_diffusion : (((5 : Int) * (20 : Int)) = (100 : Int)) ∧ (((fmax (0 : Int) ((100 : Int) - (40 : Int))) / (3 : Int)) = (20 : Int)) ∧ ((((2 : Int) * (5 : Int)) * (10 : Int)) = (100 : Int)) ∧ ((((10 : Int) * (6 : Int)) / (4 : Int)) = (15 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (25 : Int))) = (65 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (50 : Int))) = (0 : Int)) ∧ ((((100 : Int) * (100 : Int)) / (50 : Int)) = (200 : Int)) := by decide

/-- diplomacy: consensus(3, 4) = 75; leverage(100, 20) = 5; treaty(18, 20) = 90; tension(120, 12) = 10;
    alliance(12, 30) = 40; sanction(250, 1000) = 25; concession(30, 40) = 75; summit(24, 6) = 4 -/
theorem fam_diplomacy : ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ (((100 : Int) / (20 : Int)) = (5 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (20 : Int)) = (90 : Int)) ∧ (((120 : Int) / (12 : Int)) = (10 : Int)) ∧ ((((12 : Int) * (100 : Int)) / (30 : Int)) = (40 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (40 : Int)) = (75 : Int)) ∧ (((24 : Int) / (6 : Int)) = (4 : Int)) := by decide

/-- discourse: cohesion(45, 100) = 45; coherence(30, 50) = 60; turnlength(1000, 50) = 20; referencechains(120,
    30) = 4; topicshifts(12, 200) = 6; connectives(80, 400) = 20; anaphoradensity(50, 5000) = 10;
    utterancecount(4, 25) = 100 -/
theorem fam_discourse : ((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (50 : Int)) = (60 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ (((120 : Int) / (30 : Int)) = (4 : Int)) ∧ ((((12 : Int) * (100 : Int)) / (200 : Int)) = (6 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (400 : Int)) = (20 : Int)) ∧ ((((50 : Int) * (1000 : Int)) / (5000 : Int)) = (10 : Int)) ∧ (((4 : Int) * (25 : Int)) = (100 : Int)) := by decide

/-- dispatch: queuewait(600, 20) = 30; assignmentrate(120, 4) = 30; idletime(480, 420) = 60; responsetime(600,
    12) = 50; jobspershift(8, 6) = 48; overtimeratio(60, 480) = 12; coverage(18, 20) = 90; backlog(50, 42) = 8 -/
theorem fam_dispatch : (((600 : Int) / (20 : Int)) = (30 : Int)) ∧ (((120 : Int) / (4 : Int)) = (30 : Int)) ∧ ((fmax (0 : Int) ((480 : Int) - (420 : Int))) = (60 : Int)) ∧ (((600 : Int) / (12 : Int)) = (50 : Int)) ∧ (((8 : Int) * (6 : Int)) = (48 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (480 : Int)) = (12 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (20 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (42 : Int))) = (8 : Int)) := by decide

/-- distillation: purity(95, 100) = 95; reflux(80, 20) = 400; plates(300, 25) = 12; volatility(240, 100) = 240;
    recovery(85, 100) = 85; cut(5, 100) = 5; azeotrope(96, 4) = 96 -/
theorem fam_distillation : ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (20 : Int)) = (400 : Int)) ∧ (((300 : Int) / (25 : Int)) = (12 : Int)) ∧ ((((240 : Int) * (100 : Int)) / (100 : Int)) = (240 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ ((((96 : Int) * (100 : Int)) / ((96 : Int) + (4 : Int))) = (96 : Int)) := by decide

/-- distilling: abv(40, 100) = 40; cuts(3, 1) = 4; boilingpoint(78, 100) = 100; refluxratio(50, 10) = 5;
    yieldliters(1000, 10) = 100; platecombos(12, 2) = 66; distillationruns(3, 1) = 3; puritypct(95, 100) = 95 -/
theorem fam_distilling : ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((3 : Int) + (1 : Int)) = (4 : Int)) ∧ ((fmax (78 : Int) (100 : Int)) = (100 : Int)) ∧ (((50 : Int) / (10 : Int)) = (5 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((3 : Int) * (1 : Int)) = (3 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) := by decide

/-- distribution: hubs(100, 30) = 4; spokes(12, 8) = 96; coverage(999, 1000) = 99; density(5000, 100) = 50;
    dropsize(6000, 60) = 100; routes(1000, 5) = 5000; echelon(10000, 90) = 900; reach(99, 95) = 1; reach(90, 95)
    = 0 -/
theorem fam_distribution : ((-((-(100 : Int)) / (30 : Int))) = (4 : Int)) ∧ (((12 : Int) * (8 : Int)) = (96 : Int)) ∧ ((((999 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ ((((10000 : Int) * (90 : Int)) / (1000 : Int)) = (900 : Int)) ∧ ((if (if (99 : Int) ≥ (95 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (90 : Int) ≥ (95 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) := by decide

/-- dividend: pershare(2, 1) = 2; payout(40, 100) = 40; yield(3, 100) = 3; frequency(4, 0) = 4; total(2, 20000)
    = 40000; growth(8, 100) = 8; exdates(4, 0) = 4; combos(6, 2) = 15 -/
theorem fam_dividend : (((2 : Int) * (1 : Int)) = (2 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (100 : Int)) = (3 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ (((2 : Int) * (20000 : Int)) = (40000 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (100 : Int)) = (8 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) := by decide

/-- dns: ttl(3600, 1) = 3600; records(12, 0) = 12; labels(3, 1) = 4; cachehit(90, 100) = 90; queries(1000, 60) =
    60000; zones(10, 5) = 50; nameservers(2, 1) = 3; combos(6, 2) = 15 -/
theorem fam_dns : (((3600 : Int) * (1 : Int)) = (3600 : Int)) ∧ (((12 : Int) + (0 : Int)) = (12 : Int)) ∧ (((3 : Int) + (1 : Int)) = (4 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ (((1000 : Int) * (60 : Int)) = (60000 : Int)) ∧ (((10 : Int) * (5 : Int)) = (50 : Int)) ∧ (((2 : Int) + (1 : Int)) = (3 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) := by decide

/-- dominoes: distinctpairs(7, 2) = 21; doubles(7, 0) = 7; totaltiles(21, 7) = 28; pips(28, 6) = 168;
    chainorderings(6) = 720; handsubsets(7) = 128; maxpip(6, 0) = 6; layoutpaths(7, 2) = 42 -/
theorem fam_dominoes : ((Int.ofNat (fchoose (Int.toNat (7 : Int)) (Int.toNat (2 : Int)))) = (21 : Int)) ∧ (((7 : Int) + (0 : Int)) = (7 : Int)) ∧ (((21 : Int) + (7 : Int)) = (28 : Int)) ∧ (((28 : Int) * (6 : Int)) = (168 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (6 : Int)))) = (720 : Int)) ∧ (((2 : Int) ^ (7 : Nat)) = (128 : Int)) ∧ (((6 : Int) + (0 : Int)) = (6 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (7 : Int)))) / (Int.ofNat (ffact (Int.toNat ((7 : Int) - (2 : Int)))))) = (42 : Int)) := by decide

/-- dosage: perweight(70, 5) = 350; perbsa(2, 100) = 200; daily(250, 3) = 750; divided(750, 3) = 250;
    maximum(900, 800) = 800; maximum(500, 800) = 500; pediatric(140, 35) = 70; maintenance(1000, 25) = 250;
    cumulative(500, 7) = 3500 -/
theorem fam_dosage : (((70 : Int) * (5 : Int)) = (350 : Int)) ∧ (((2 : Int) * (100 : Int)) = (200 : Int)) ∧ (((250 : Int) * (3 : Int)) = (750 : Int)) ∧ (((750 : Int) / (3 : Int)) = (250 : Int)) ∧ ((fmin (900 : Int) (800 : Int)) = (800 : Int)) ∧ ((fmin (500 : Int) (800 : Int)) = (500 : Int)) ∧ ((((140 : Int) * (35 : Int)) / (70 : Int)) = (70 : Int)) ∧ ((((1000 : Int) * (25 : Int)) / (100 : Int)) = (250 : Int)) ∧ (((500 : Int) * (7 : Int)) = (3500 : Int)) := by decide

/-- dosimetry: absorbeddose(600, 12) = 50; equivalentdose(50, 20) = 1000; effectivedose(1000, 12) = 120;
    doserate(1000, 20) = 50; fractionation(6000, 30) = 200; cumulative(200, 30) = 6000; shielding(100, 30) = 4;
    exposuretime(500, 50) = 10 -/
theorem fam_dosimetry : (((600 : Int) / (12 : Int)) = (50 : Int)) ∧ (((50 : Int) * (20 : Int)) = (1000 : Int)) ∧ ((((1000 : Int) * (12 : Int)) / (100 : Int)) = (120 : Int)) ∧ (((1000 : Int) / (20 : Int)) = (50 : Int)) ∧ (((6000 : Int) / (30 : Int)) = (200 : Int)) ∧ (((200 : Int) * (30 : Int)) = (6000 : Int)) ∧ ((-((-(100 : Int)) / (30 : Int))) = (4 : Int)) ∧ ((-((-(500 : Int)) / (50 : Int))) = (10 : Int)) := by decide

/-- download: rate(1000, 10) = 100; eta(1000, 100) = 10; progress(250, 1000) = 25; chunks(1000, 256) = 4;
    resume(300, 1000) = 700; checksum(99, 100) = 99; size(10, 5000) = 50000 -/
theorem fam_download : (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((-((-(1000 : Int)) / (100 : Int))) = (10 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ ((-((-(1000 : Int)) / (256 : Int))) = (4 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (300 : Int))) = (700 : Int)) ∧ ((((99 : Int) * (100 : Int)) / (100 : Int)) = (99 : Int)) ∧ (((10 : Int) * (5000 : Int)) = (50000 : Int)) := by decide

/-- drag: force(1000, 2, 5) = 10; coefficient(50, 100) = 500; induced(30, 6) = 150; parasitic(20, 15) = 35;
    dynamicpressure(2, 10) = 100; terminalvelocity(1000, 25) = 40; frontalarea(12, 5) = 60; reynolds(100, 3, 2)
    = 150 -/
theorem fam_drag : (((((1000 : Int) * (2 : Int)) * (5 : Int)) / (1000 : Int)) = (10 : Int)) ∧ ((((50 : Int) * (1000 : Int)) / (100 : Int)) = (500 : Int)) ∧ ((((30 : Int) * (30 : Int)) / (6 : Int)) = (150 : Int)) ∧ (((20 : Int) + (15 : Int)) = (35 : Int)) ∧ (((((2 : Int) * (10 : Int)) * (10 : Int)) / (2 : Int)) = (100 : Int)) ∧ (((1000 : Int) / (25 : Int)) = (40 : Int)) ∧ (((12 : Int) * (5 : Int)) = (60 : Int)) ∧ ((((100 : Int) * (3 : Int)) / (2 : Int)) = (150 : Int)) := by decide

/-- drayage: costpermove(150, 4) = 600; turntime(240, 4) = 60; containersperday(96, 8) = 12;
    chassisutilization(80, 100) = 80; waittime(180, 120) = 60; milesperload(400, 4) = 100; demurrage(3, 150) =
    450; dualmoves(40, 100) = 40 -/
theorem fam_drayage : (((150 : Int) * (4 : Int)) = (600 : Int)) ∧ (((240 : Int) / (4 : Int)) = (60 : Int)) ∧ (((96 : Int) / (8 : Int)) = (12 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((180 : Int) - (120 : Int))) = (60 : Int)) ∧ (((400 : Int) / (4 : Int)) = (100 : Int)) ∧ (((3 : Int) * (150 : Int)) = (450 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) := by decide

/-- drilling: ropenetration(1200, 10) = 120; mudweight(5200, 100) = 52; torque(500, 12) = 6000; wob(20, 500) =
    10000; hydrostatic(10, 10000) = 5200; annular(12, 5) = 119; bitlife(5000, 3200) = 1800; kick(5500, 5200) =
    300; kick(5000, 5200) = 0 -/
theorem fam_drilling : (((1200 : Int) / (10 : Int)) = (120 : Int)) ∧ (((5200 : Int) / (100 : Int)) = (52 : Int)) ∧ (((500 : Int) * (12 : Int)) = (6000 : Int)) ∧ (((20 : Int) * (500 : Int)) = (10000 : Int)) ∧ (((((10 : Int) * (10000 : Int)) * (52 : Int)) / (1000 : Int)) = (5200 : Int)) ∧ ((fmax (0 : Int) (((12 : Int) ^ (2 : Nat)) - ((5 : Int) ^ (2 : Nat)))) = (119 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (3200 : Int))) = (1800 : Int)) ∧ ((fmax (0 : Int) ((5500 : Int) - (5200 : Int))) = (300 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (5200 : Int))) = (0 : Int)) := by decide

/-- driver: ring(4096, 16) = 256; ring(4096, 0) = 0; dmaPages(5000) = 2; payload(1500, 42) = 1458; payload(20,
    42) = 0; pps(1000000, 1000) = 1000; queues(8) = 16; irq(256) = 64; mmio(4) = 16384; descBytes(256, 16) =
    4096; throughput(1000, 1458) = 1458000; buffers(256, 16) = 4096; coalesce(100, 8) = 13; bandwidth(16, 1000)
    = 16000; completion(256, 100) = 156; doorbell(8, 4) = 32 -/
theorem fam_driver : (((4096 : Int) / (16 : Int)) = (256 : Int)) ∧ (((4096 : Int) / (0 : Int)) = (0 : Int)) ∧ ((-((-(5000 : Int)) / (4096 : Int))) = (2 : Int)) ∧ ((fmax (0 : Int) ((1500 : Int) - (42 : Int))) = (1458 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (42 : Int))) = (0 : Int)) ∧ (((1000000 : Int) / (1000 : Int)) = (1000 : Int)) ∧ (((8 : Int) * (2 : Int)) = (16 : Int)) ∧ (((256 : Int) / (4 : Int)) = (64 : Int)) ∧ (((4 : Int) * (4096 : Int)) = (16384 : Int)) ∧ (((256 : Int) * (16 : Int)) = (4096 : Int)) ∧ (((1000 : Int) * (1458 : Int)) = (1458000 : Int)) ∧ (((256 : Int) * (16 : Int)) = (4096 : Int)) ∧ ((-((-(100 : Int)) / (8 : Int))) = (13 : Int)) ∧ (((16 : Int) * (1000 : Int)) = (16000 : Int)) ∧ (((256 : Int) - (100 : Int)) = (156 : Int)) ∧ (((8 : Int) * (4 : Int)) = (32 : Int)) := by decide

/-- drone: flighttime(5000, 100) = 50; payload(2, 1000) = 2000; rotorcount(4, 0) = 4; range(10, 1000) = 10000;
    thrust(4, 500) = 2000; batterykwh(100, 1) = 100; maxaltitude(120, 1) = 120; stabilitymargin(90, 100) = 90 -/
theorem fam_drone : (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ (((2 : Int) * (1000 : Int)) = (2000 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ (((10 : Int) * (1000 : Int)) = (10000 : Int)) ∧ (((4 : Int) * (500 : Int)) = (2000 : Int)) ∧ (((100 : Int) / (1 : Int)) = (100 : Int)) ∧ (((120 : Int) * (1 : Int)) = (120 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) := by decide

/-- drought: severity(3, 4) = 4; durationmonths(12, 6) = 18; rainfalldeficit(800, 300) = 500; pdsi(8, 4) = 4;
    affectedarea(100, 50) = 5000; waterdeficit(1000, 600) = 400; recoverymonths(6, 3) = 9; impactindex(70, 100)
    = 70 -/
theorem fam_drought : ((fmax (3 : Int) (4 : Int)) = (4 : Int)) ∧ (((12 : Int) + (6 : Int)) = (18 : Int)) ∧ ((fmax (0 : Int) ((800 : Int) - (300 : Int))) = (500 : Int)) ∧ ((fmax (0 : Int) ((8 : Int) - (4 : Int))) = (4 : Int)) ∧ (((100 : Int) * (50 : Int)) = (5000 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (600 : Int))) = (400 : Int)) ∧ (((6 : Int) + (3 : Int)) = (9 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) := by decide

/-- dyeing: shade(3, 100) = 3; liquorratio(2000, 100) = 20; exhaustion(85, 100) = 85; fixation(90, 100) = 90;
    concentration(50, 10) = 5; temperature(30, 2, 30) = 90; fastness(4, 5) = 4; uptake(5, 10) = 50 -/
theorem fam_dyeing : ((((3 : Int) * (100 : Int)) / (100 : Int)) = (3 : Int)) ∧ (((2000 : Int) / (100 : Int)) = (20 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ (((50 : Int) / (10 : Int)) = (5 : Int)) ∧ (((30 : Int) + ((2 : Int) * (30 : Int))) = (90 : Int)) ∧ ((((4 : Int) + (5 : Int)) / (2 : Int)) = (4 : Int)) ∧ (((5 : Int) * (10 : Int)) = (50 : Int)) := by decide

/-- dynamics: force(10, 5) = 50; momentum(10, 20) = 200; impulse(50, 4) = 200; kineticenergy(4, 10) = 200;
    work(10, 5) = 50; power(1000, 20) = 50; acceleration(100, 5) = 20; collision(3, 7, 5) = 50; power(100, 0) =
    0 -/
theorem fam_dynamics : (((10 : Int) * (5 : Int)) = (50 : Int)) ∧ (((10 : Int) * (20 : Int)) = (200 : Int)) ∧ (((50 : Int) * (4 : Int)) = (200 : Int)) ∧ ((((4 : Int) * ((10 : Int) ^ (2 : Nat))) / (2 : Int)) = (200 : Int)) ∧ (((10 : Int) * (5 : Int)) = (50 : Int)) ∧ (((1000 : Int) / (20 : Int)) = (50 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ ((((3 : Int) + (7 : Int)) * (5 : Int)) = (50 : Int)) ∧ (((100 : Int) / (0 : Int)) = (0 : Int)) := by decide
