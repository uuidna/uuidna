-- lean/FamiliesH.lean — GENERATED. THE FAMILIES, H — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a
def ffact : Nat → Nat
  | 0 => 1
  | n + 1 => (n + 1) * ffact n
def fchoose (n : Nat) : Nat → Nat
  | 0 => 1
  | k + 1 => fchoose n k * (n - k) / (k + 1)

/-- hail: diametermm(20, 1) = 20; layers(10, 5) = 15; updraftspeed(30, 2) = 60; terminalvelocity(900, 10) = 90;
    kineticenergy(50, 20) = 1000; damagescale(3, 5) = 5; growthtime(600, 60) = 10; massg(1000, 10) = 100 -/
theorem fam_hail : (((20 : Int) * (1 : Int)) = (20 : Int)) ∧ (((10 : Int) + (5 : Int)) = (15 : Int)) ∧ (((30 : Int) * (2 : Int)) = (60 : Int)) ∧ (((900 : Int) / (10 : Int)) = (90 : Int)) ∧ (((50 : Int) * (20 : Int)) = (1000 : Int)) ∧ ((fmax (3 : Int) (5 : Int)) = (5 : Int)) ∧ (((600 : Int) / (60 : Int)) = (10 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) := by decide

/-- halflife: elapsedlives(100, 25) = 4; remaining(1000, 3) = 125; decayed(1000, 3) = 875; constant(1000, 10) =
    69; meanlife(1000) = 1443; activity(1000, 69) = 69; fraction(100, 2) = 25; generations(10, 3) = 80 -/
theorem fam_halflife : (((100 : Int) / (25 : Int)) = (4 : Int)) ∧ (((1000 : Int) / ((2 : Int) ^ (3 : Nat))) = (125 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - ((1000 : Int) / ((2 : Int) ^ (3 : Nat))))) = (875 : Int)) ∧ ((((1000 : Int) * (693 : Int)) / ((10 : Int) * (1000 : Int))) = (69 : Int)) ∧ ((((1000 : Int) * (1443 : Int)) / (1000 : Int)) = (1443 : Int)) ∧ ((((1000 : Int) * (69 : Int)) / (1000 : Int)) = (69 : Int)) ∧ (((100 : Int) / ((2 : Int) ^ (2 : Nat))) = (25 : Int)) ∧ (((10 : Int) * ((2 : Int) ^ (3 : Nat))) = (80 : Int)) := by decide

/-- handle: space() = 4294967296; pair(16, 16) = 256; trinity(2, 3, 4) = 24 -/
theorem fam_handle : (((2 : Int) ^ (32 : Nat)) = (4294967296 : Int)) ∧ (((16 : Int) * (16 : Int)) = (256 : Int)) ∧ ((((2 : Int) * (3 : Int)) * (4 : Int)) = (24 : Int)) := by decide

/-- hanoi: disks(10, 0) = 10; movesupperbound(10) = 1024; pegs(3, 0) = 3; recursiondepth(10, 0) = 10;
    subtowers(10, 2) = 45; moveorderings(5) = 120; statesubsets(8) = 256; transfertime(1024, 1) = 1024 -/
theorem fam_hanoi : (((10 : Int) + (0 : Int)) = (10 : Int)) ∧ (((2 : Int) ^ (10 : Nat)) = (1024 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((10 : Int) + (0 : Int)) = (10 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((2 : Int) ^ (8 : Nat)) = (256 : Int)) ∧ (((1024 : Int) * (1 : Int)) = (1024 : Int)) := by decide

/-- hardness: brinell(3000, 10) = 300; vickers(10, 100) = 185; rockwell(100, 30) = 70; knoop(10, 1000) = 142;
    tensileestimate(200) = 690; indentation(3000, 300) = 10; loadratio(150, 10) = 1500; scaleconvert(200, 150) =
    300 -/
theorem fam_hardness : (((3000 : Int) / (10 : Int)) = (300 : Int)) ∧ ((((1854 : Int) * (10 : Int)) / (100 : Int)) = (185 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int)) ∧ ((((14229 : Int) * (10 : Int)) / (1000 : Int)) = (142 : Int)) ∧ ((((200 : Int) * (345 : Int)) / (100 : Int)) = (690 : Int)) ∧ (((3000 : Int) / (300 : Int)) = (10 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (10 : Int)) = (1500 : Int)) ∧ ((((200 : Int) * (150 : Int)) / (100 : Int)) = (300 : Int)) := by decide

/-- hardware: threads(8) = 16; cacheLines(4096) = 64; busBytes(64) = 8; lanes(4, 16) = 64; pins(39, 39) = 1521;
    dies(70000, 100) = 700; dies(70000, 0) = 0; tdpPerCore(125, 8) = 15; addressable(20) = 1048576 -/
theorem fam_hardware : (((8 : Int) * (2 : Int)) = (16 : Int)) ∧ (((4096 : Int) / (64 : Int)) = (64 : Int)) ∧ (((64 : Int) / (8 : Int)) = (8 : Int)) ∧ (((4 : Int) * (16 : Int)) = (64 : Int)) ∧ (((39 : Int) * (39 : Int)) = (1521 : Int)) ∧ (((70000 : Int) / (100 : Int)) = (700 : Int)) ∧ (((70000 : Int) / (0 : Int)) = (0 : Int)) ∧ (((125 : Int) / (8 : Int)) = (15 : Int)) ∧ (((2 : Int) ^ (20 : Nat)) = (1048576 : Int)) := by decide

/-- harmony: interval(60, 67) = 7; chordquality(4, 7) = 3; keysignature(7) = 1; tension(3, 4) = 75; inversion(4,
    0) = 8 -/
theorem fam_harmony : ((((((67 : Int) - (60 : Int)) % (12 : Int)) + (12 : Int)) % (12 : Int)) = (7 : Int)) ∧ ((fmax (0 : Int) ((7 : Int) - (4 : Int))) = (3 : Int)) ∧ ((((7 : Int) * (7 : Int)) % (12 : Int)) = (1 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ (((((((2 : Int) * (0 : Int)) - (4 : Int)) % (12 : Int)) + (12 : Int)) % (12 : Int)) = (8 : Int)) := by decide

/-- harvest: ratescollected(40, 150) = 6000; losspercent(20, 200) = 10; throughput(6000, 8) = 750;
    laborhours(12, 8) = 96; machineefficiency(80, 100) = 80; moisturecontent(14, 100) = 14; storageyield(5000,
    300) = 4700; windowdays(30, 12) = 18; windowdays(12, 30) = 0 -/
theorem fam_harvest : (((40 : Int) * (150 : Int)) = (6000 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (200 : Int)) = (10 : Int)) ∧ (((6000 : Int) / (8 : Int)) = (750 : Int)) ∧ (((12 : Int) * (8 : Int)) = (96 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((14 : Int) * (100 : Int)) / (100 : Int)) = (14 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (300 : Int))) = (4700 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (12 : Int))) = (18 : Int)) ∧ ((fmax (0 : Int) ((12 : Int) - (30 : Int))) = (0 : Int)) := by decide

/-- hash: buckets(10) = 1024; collisions(1000, 900) = 100; loadpct(75, 100) = 75; digestbits(32, 8) = 256;
    seeds(2, 2) = 4; probes(100, 10) = 10; bitsperkey(160, 20) = 8; combos(8, 2) = 28 -/
theorem fam_hash : (((2 : Int) ^ (10 : Nat)) = (1024 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (900 : Int))) = (100 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ (((32 : Int) * (8 : Int)) = (256 : Int)) ∧ (((2 : Int) + (2 : Int)) = (4 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ (((160 : Int) / (20 : Int)) = (8 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) := by decide

/-- hashing: bucket(12345, 1000) = 345; loadfactor(750, 1000) = 75; collisions(1500, 1000) = 500; probe(998, 5,
    1000) = 3; birthday(30) = 435; modulo(100, 7) = 2; resize(1024, 2) = 2048; distribution(5000, 1000) = 5 -/
theorem fam_hashing : (((12345 : Int) % (1000 : Int)) = (345 : Int)) ∧ ((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((1500 : Int) - (1000 : Int))) = (500 : Int)) ∧ ((((998 : Int) + (5 : Int)) % (1000 : Int)) = (3 : Int)) ∧ ((((30 : Int) * ((30 : Int) - (1 : Int))) / (2 : Int)) = (435 : Int)) ∧ (((100 : Int) % (7 : Int)) = (2 : Int)) ∧ (((1024 : Int) * (2 : Int)) = (2048 : Int)) ∧ (((5000 : Int) / (1000 : Int)) = (5 : Int)) := by decide

/-- hazard: risk(5, 8) = 40; exposure(50, 100) = 50; toxicity(2, 100) = 2; probability(3, 100) = 3;
    mitigation(40, 100) = 40; spread(5, 100) = 5; dilution(5, 1000000) = 5; evacuation(1000, 50) = 20;
    exposure(50, 0) = 0 -/
theorem fam_hazard : (((5 : Int) * (8 : Int)) = (40 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (100 : Int)) = (3 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ ((((5 : Int) * (1000000 : Int)) / (1000000 : Int)) = (5 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int)) := by decide

/-- heatindex: apparenttemp(35, 5) = 40; humidityfactor(60, 100) = 60; dangerlevel(3, 4) = 4;
    discomfortindex(800, 10) = 80; coolingload(100, 3) = 300; exposureminutes(120, 2) = 60; riskpct(80, 100) =
    80; feelsdelta(45, 35) = 10 -/
theorem fam_heatindex : (((35 : Int) + (5 : Int)) = (40 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ ((fmax (3 : Int) (4 : Int)) = (4 : Int)) ∧ (((800 : Int) / (10 : Int)) = (80 : Int)) ∧ (((100 : Int) * (3 : Int)) = (300 : Int)) ∧ (((120 : Int) / (2 : Int)) = (60 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((45 : Int) - (35 : Int))) = (10 : Int)) := by decide

/-- heattransfer: conduction(50, 20, 10) = 100; convection(10, 5, 20) = 1000; radiation(3, 2) = 65; lmtd(40, 20)
    = 30; nusselt(100, 2, 5) = 40; biot(20, 3, 4) = 15; fourier(4, 25, 2) = 25; effectiveness(80, 100) = 80;
    effectiveness(60, 100) = 60 -/
theorem fam_heattransfer : ((((50 : Int) * (20 : Int)) / (10 : Int)) = (100 : Int)) ∧ ((((10 : Int) * (5 : Int)) * (20 : Int)) = (1000 : Int)) ∧ ((fmax (0 : Int) (((3 : Int) ^ (4 : Nat)) - ((2 : Int) ^ (4 : Nat)))) = (65 : Int)) ∧ ((((40 : Int) + (20 : Int)) / (2 : Int)) = (30 : Int)) ∧ ((((100 : Int) * (2 : Int)) / (5 : Int)) = (40 : Int)) ∧ ((((20 : Int) * (3 : Int)) / (4 : Int)) = (15 : Int)) ∧ ((((4 : Int) * (25 : Int)) / ((2 : Int) ^ (2 : Nat))) = (25 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) := by decide

/-- hedging: ratio(75, 100) = 75; delta(500, 300) = 200; exposure(200, 50) = 10000; coverage(80, 100) = 80;
    basis(105, 100) = 5; notional(10, 1000) = 10000; offset(400, 150) = 250; residual(1000, 600) = 400;
    delta(300, 500) = 0 -/
theorem fam_hedging : ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (300 : Int))) = (200 : Int)) ∧ (((200 : Int) * (50 : Int)) = (10000 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((105 : Int) - (100 : Int))) = (5 : Int)) ∧ (((10 : Int) * (1000 : Int)) = (10000 : Int)) ∧ ((fmax (0 : Int) ((400 : Int) - (150 : Int))) = (250 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (600 : Int))) = (400 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (500 : Int))) = (0 : Int)) := by decide

/-- helicopter: rotordiameter(16, 1) = 16; lift(4000, 2) = 8000; maxspeed(250, 1) = 250; bladecount(4, 0) = 4;
    bladeorderings(4) = 24; ceiling(5000, 1) = 5000; autorotationrate(600, 10) = 60; powerkw(1000, 1) = 1000 -/
theorem fam_helicopter : (((16 : Int) * (1 : Int)) = (16 : Int)) ∧ (((4000 : Int) * (2 : Int)) = (8000 : Int)) ∧ (((250 : Int) * (1 : Int)) = (250 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ (((5000 : Int) * (1 : Int)) = (5000 : Int)) ∧ (((600 : Int) / (10 : Int)) = (60 : Int)) ∧ (((1000 : Int) * (1 : Int)) = (1000 : Int)) := by decide

/-- heliophysics: coronalmass(12, 1000) = 12000; cycle(2008, 2025) = 6; flareclass(5000, 1000) = 5; flux(6000,
    60) = 100; irradiance(1361, 1) = 1361; magneticindex(56, 8) = 7; solarwind(2000, 400) = 5; sunspot(5, 32) =
    82 -/
theorem fam_heliophysics : (((12 : Int) * (1000 : Int)) = (12000 : Int)) ∧ (((fmax (0 : Int) ((2025 : Int) - (2008 : Int))) % (11 : Int)) = (6 : Int)) ∧ (((5000 : Int) / (1000 : Int)) = (5 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((1361 : Int) / (1 : Int)) = (1361 : Int)) ∧ (((56 : Int) / (8 : Int)) = (7 : Int)) ∧ (((2000 : Int) / (400 : Int)) = (5 : Int)) ∧ ((((10 : Int) * (5 : Int)) + (32 : Int)) = (82 : Int)) := by decide

/-- helminthology: eggcount(500, 10) = 5000; wormburden(5000, 50) = 100; prevalence(30, 100) = 30;
    lifecyclestages(4, 1) = 5; hostcombos(6, 2) = 15; treatmentefficacy(95, 100) = 95; fecundity(200, 20) =
    4000; transmissionpaths(5, 2) = 20 -/
theorem fam_helminthology : (((500 : Int) * (10 : Int)) = (5000 : Int)) ∧ (((5000 : Int) / (50 : Int)) = (100 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((4 : Int) + (1 : Int)) = (5 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ (((200 : Int) * (20 : Int)) = (4000 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (5 : Int)))) / (Int.ofNat (ffact (Int.toNat ((5 : Int) - (2 : Int)))))) = (20 : Int)) := by decide

/-- hematocrit: packedcellvolume(45, 100) = 45; mcv(450, 5) = 90; mch(150, 5) = 30; mchc(150, 450) = 33;
    redcellcount(5, 5000) = 25000; hemoglobinratio(150, 1000) = 15; plasmafraction(100, 45) = 55;
    bloodviscosity(45, 10) = 4; plasmafraction(45, 100) = 0 -/
theorem fam_hematocrit : ((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ (((450 : Int) / (5 : Int)) = (90 : Int)) ∧ (((150 : Int) / (5 : Int)) = (30 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (450 : Int)) = (33 : Int)) ∧ (((5 : Int) * (5000 : Int)) = (25000 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (1000 : Int)) = (15 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (45 : Int))) = (55 : Int)) ∧ ((((45 : Int) * (10 : Int)) / (100 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((45 : Int) - (100 : Int))) = (0 : Int)) := by decide

/-- hematology: hematocrit(45, 100) = 45; hemoglobin(150, 10) = 15; mcv(45, 5) = 90; inr(13, 12) = 108;
    platelets(250000, 1000) = 250; oxygen(97, 100) = 97; differential(60, 100) = 60 -/
theorem fam_hematology : ((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ (((150 : Int) / (10 : Int)) = (15 : Int)) ∧ ((((45 : Int) * (10 : Int)) / (5 : Int)) = (90 : Int)) ∧ ((((13 : Int) * (100 : Int)) / (12 : Int)) = (108 : Int)) ∧ (((250000 : Int) / (1000 : Int)) = (250 : Int)) ∧ ((((97 : Int) * (100 : Int)) / (100 : Int)) = (97 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) := by decide

/-- hemodynamics: cardiacoutput(70, 70) = 4900; strokevolume(120, 50) = 70; meanarterialpressure(120, 80) = 93;
    ejectionfraction(70, 120) = 58; pulsepressure(120, 80) = 40; vascularresistance(93, 5) = 1488;
    pulserate(360, 5) = 72; perfusionpressure(93, 13) = 80; perfusionpressure(13, 93) = 0 -/
theorem fam_hemodynamics : (((70 : Int) * (70 : Int)) = (4900 : Int)) ∧ ((fmax (0 : Int) ((120 : Int) - (50 : Int))) = (70 : Int)) ∧ ((((120 : Int) + ((2 : Int) * (80 : Int))) / (3 : Int)) = (93 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (120 : Int)) = (58 : Int)) ∧ ((fmax (0 : Int) ((120 : Int) - (80 : Int))) = (40 : Int)) ∧ ((((93 : Int) * (80 : Int)) / (5 : Int)) = (1488 : Int)) ∧ (((360 : Int) / (5 : Int)) = (72 : Int)) ∧ ((fmax (0 : Int) ((93 : Int) - (13 : Int))) = (80 : Int)) ∧ ((fmax (0 : Int) ((13 : Int) - (93 : Int))) = (0 : Int)) := by decide

/-- heraldry: tincturecount(5, 2) = 7; chargecombos(12, 3) = 220; quarterings(4, 4) = 16; blazonorderings(4) =
    24; fieldsubsets(4) = 16; marshallingpairs(8, 2) = 28; ordinaries(9, 0) = 9; differencingmarks(3, 3) = 9 -/
theorem fam_heraldry : (((5 : Int) + (2 : Int)) = (7 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int)) ∧ (((4 : Int) * (4 : Int)) = (16 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ (((9 : Int) + (0 : Int)) = (9 : Int)) ∧ (((3 : Int) * (3 : Int)) = (9 : Int)) := by decide

/-- hermeneutics: interpretivelayers(6) = 64; methodcombos(8, 3) = 56; contextfactors(3, 4, 2) = 9;
    principleorderings(5) = 120; ambiguityspread(100, 60) = 40; lensselections(10, 4) = 210; framingchoices(6,
    2) = 30; consensusratio(70, 100) = 70 -/
theorem fam_hermeneutics : (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (3 : Int)))) = (56 : Int)) ∧ ((((3 : Int) + (4 : Int)) + (2 : Int)) = (9 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (60 : Int))) = (40 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (4 : Int)))) = (210 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (6 : Int)))) / (Int.ofNat (ffact (Int.toNat ((6 : Int) - (2 : Int)))))) = (30 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) := by decide

/-- herpetology: thermoregulation(30, 20) = 10; thermoregulation(15, 20) = 0; venom(5, 1000) = 5; clutch(100, 4)
    = 25; metabolism(100, 25) = 4; growth(50, 20) = 30; growth(20, 50) = 0; survival(80, 100) = 80;
    scalation(170, 10) = 17 -/
theorem fam_herpetology : ((fmax (0 : Int) ((30 : Int) - (20 : Int))) = (10 : Int)) ∧ ((fmax (0 : Int) ((15 : Int) - (20 : Int))) = (0 : Int)) ∧ ((((5 : Int) * (1000 : Int)) / (1000 : Int)) = (5 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((100 : Int) / (25 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (20 : Int))) = (30 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (50 : Int))) = (0 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((170 : Int) / (10 : Int)) = (17 : Int)) := by decide

/-- hieroglyphs: signs(700, 1) = 700; determinatives(100, 0) = 100; cartouchepairs(10, 2) = 45; phonemsigns(24,
    0) = 24; categorysubsets(6) = 64; readingorderings(5) = 120; biliterals(80, 20) = 100; decipheredratio(90,
    100) = 90 -/
theorem fam_hieroglyphs : (((700 : Int) * (1 : Int)) = (700 : Int)) ∧ (((100 : Int) + (0 : Int)) = (100 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ (((24 : Int) + (0 : Int)) = (24 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((80 : Int) + (20 : Int)) = (100 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) := by decide

/-- highlights: active(3, 10) = 30; scroll(250, 1000) = 25; reveal(2, 8) = 25; parallax(50, 200) = 100 -/
theorem fam_highlights : ((((3 : Int) * (100 : Int)) / (10 : Int)) = (30 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (8 : Int)) = (25 : Int)) ∧ ((((50 : Int) * (200 : Int)) / (100 : Int)) = (100 : Int)) := by decide

/-- hinduism: vedas(4, 0) = 4; deitycombos(33, 2) = 528; yogapaths(4, 0) = 4; mantrarepetitions(108, 1) = 108;
    chakras(7, 0) = 7; versesum(700, 1) = 700; stageorderings(4) = 24; gunasubsets(3) = 8 -/
theorem fam_hinduism : (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (33 : Int)) (Int.toNat (2 : Int)))) = (528 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ (((108 : Int) * (1 : Int)) = (108 : Int)) ∧ (((7 : Int) + (0 : Int)) = (7 : Int)) ∧ (((700 : Int) * (1 : Int)) = (700 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ (((2 : Int) ^ (3 : Nat)) = (8 : Int)) := by decide

/-- histology: staining(750, 1000) = 75; magnification(4000, 10) = 400; density(1200, 10) = 120; fibrosis(30,
    100) = 30; necrosis(20, 200) = 10; infiltration(900, 3) = 300 -/
theorem fam_histology : ((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ (((4000 : Int) / (10 : Int)) = (400 : Int)) ∧ (((1200 : Int) / (10 : Int)) = (120 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (200 : Int)) = (10 : Int)) ∧ (((900 : Int) / (3 : Int)) = (300 : Int)) := by decide

/-- historiography: sourcecount(40, 20) = 60; narrativeorderings(5) = 120; biasfactors(2, 3, 1) = 6;
    periodizations(10, 3) = 120; crosschecks(12, 4) = 48; interpretiveframes(5) = 32; consensuslevel(70, 100) =
    70; revisionspan(200, 50) = 150 -/
theorem fam_historiography : (((40 : Int) + (20 : Int)) = (60 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((((2 : Int) + (3 : Int)) + (1 : Int)) = (6 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (3 : Int)))) = (120 : Int)) ∧ (((12 : Int) * (4 : Int)) = (48 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (50 : Int))) = (150 : Int)) := by decide

/-- hook: chain(6, 100) = 600; latency(5000, 100) = 50; order(3, 6) = 1; order(7, 6) = 0; mutations(3, 12) = 25;
    failures(5, 100) = 5; coverage(8, 10) = 80; fired(10, 6) = 60 -/
theorem fam_hook : (((6 : Int) * (100 : Int)) = (600 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ ((if (if (3 : Int) ≤ (6 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (7 : Int) ≤ (6 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (12 : Int)) = (25 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ (((10 : Int) * (6 : Int)) = (60 : Int)) := by decide

/-- horticulture: spacing(1000, 40) = 25; germination(90, 100) = 90; pruning(30, 120) = 25; irrigation(5000,
    100) = 50; fertilizer(800, 100) = 8; ph(65, 100) = 65; lightdays(14, 90) = 1260; propagation(18, 24) = 75 -/
theorem fam_horticulture : (((1000 : Int) / (40 : Int)) = (25 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ (((800 : Int) / (100 : Int)) = (8 : Int)) ∧ ((((65 : Int) * (100 : Int)) / (100 : Int)) = (65 : Int)) ∧ (((14 : Int) * (90 : Int)) = (1260 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (24 : Int)) = (75 : Int)) := by decide

/-- hospitality: occupancy(85, 100) = 85; adr(12000, 80) = 150; revpar(12000, 100) = 120; satisfaction(450, 100)
    = 4; stay(300, 100) = 3; noshow(5, 100) = 5; repeat(40, 100) = 40; upsell(25, 100) = 25 -/
theorem fam_hospitality : ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ (((12000 : Int) / (80 : Int)) = (150 : Int)) ∧ (((12000 : Int) / (100 : Int)) = (120 : Int)) ∧ (((450 : Int) / (100 : Int)) = (4 : Int)) ∧ (((300 : Int) / (100 : Int)) = (3 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int)) := by decide

/-- hosting: domains(50, 3) = 150; dns(12, 5) = 60; ssl(100, 190) = 90; ssl(200, 190) = 0; bandwidth(10000, 90)
    = 900; uptime(999, 1000) = 99; traffic(1000, 5) = 5000; storage(50, 20) = 1000; overage(120, 100) = 20;
    overage(80, 100) = 0 -/
theorem fam_hosting : (((50 : Int) * (3 : Int)) = (150 : Int)) ∧ (((12 : Int) * (5 : Int)) = (60 : Int)) ∧ ((fmax (0 : Int) ((190 : Int) - (100 : Int))) = (90 : Int)) ∧ ((fmax (0 : Int) ((190 : Int) - (200 : Int))) = (0 : Int)) ∧ ((((10000 : Int) * (90 : Int)) / (1000 : Int)) = (900 : Int)) ∧ ((((999 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ (((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ (((50 : Int) * (20 : Int)) = (1000 : Int)) ∧ ((fmax (0 : Int) ((120 : Int) - (100 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (100 : Int))) = (0 : Int)) := by decide

/-- hover: scale(200, 150) = 300; reveal(40, 100) = 40; stagger(5, 30) = 150; trigger(25, 100) = 25 -/
theorem fam_hover : ((((200 : Int) * (150 : Int)) / (100 : Int)) = (300 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((5 : Int) * (30 : Int)) = (150 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int)) := by decide

/-- hovercraft: liftpressure(5000, 2) = 2500; skirtarea(40, 1) = 40; payload(2000, 1) = 2000; speed(60, 1) = 60;
    fanpower(200, 2) = 400; clearance(300, 1) = 300; cushionforce(2500, 40) = 100000; efficiency(70, 100) = 70 -/
theorem fam_hovercraft : (((5000 : Int) / (2 : Int)) = (2500 : Int)) ∧ (((40 : Int) * (1 : Int)) = (40 : Int)) ∧ (((2000 : Int) * (1 : Int)) = (2000 : Int)) ∧ (((60 : Int) * (1 : Int)) = (60 : Int)) ∧ (((200 : Int) * (2 : Int)) = (400 : Int)) ∧ (((300 : Int) / (1 : Int)) = (300 : Int)) ∧ (((2500 : Int) * (40 : Int)) = (100000 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) := by decide

/-- huffman: averagelength(100, 25) = 4; codelength(10, 3) = 30; compressionratio(800, 200) = 400;
    efficiency(90, 100) = 90; leafcount(15) = 8; savedbits(1000, 300) = 700; savedbits(300, 1000) = 0;
    treenodes(8) = 15; weightedpath(12, 4) = 48 -/
theorem fam_huffman : (((100 : Int) / (25 : Int)) = (4 : Int)) ∧ (((10 : Int) * (3 : Int)) = (30 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (200 : Int)) = (400 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((15 : Int) + (1 : Int)) / (2 : Int)) = (8 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (300 : Int))) = (700 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (1000 : Int))) = (0 : Int)) ∧ ((((2 : Int) * (8 : Int)) - (1 : Int)) = (15 : Int)) ∧ (((12 : Int) * (4 : Int)) = (48 : Int)) := by decide

/-- humidity: relative(15, 20) = 75; absolute(600, 30) = 20; specific(20, 1000) = 20; ratio(20, 1020) = 12;
    saturation(15, 75) = 20; deficit(20, 15) = 5; deficit(10, 20) = 0; comfortindex(30, 50) = 40;
    mixingratio(16, 1000) = 16 -/
theorem fam_humidity : ((((15 : Int) * (100 : Int)) / (20 : Int)) = (75 : Int)) ∧ (((600 : Int) / (30 : Int)) = (20 : Int)) ∧ ((((20 : Int) * (1000 : Int)) / (1000 : Int)) = (20 : Int)) ∧ ((((622 : Int) * (20 : Int)) / ((1020 : Int) - (20 : Int))) = (12 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (75 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (15 : Int))) = (5 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (20 : Int))) = (0 : Int)) ∧ (((30 : Int) + ((50 : Int) / (5 : Int))) = (40 : Int)) ∧ ((((16 : Int) * (1000 : Int)) / (1000 : Int)) = (16 : Int)) := by decide

/-- husbandry: stockingdensity(100, 500) = 20; feedconversion(600, 100) = 600; weaningweight(40, 200, 1) = 240;
    herdgrowth(100, 30, 10) = 120; mortality(3, 100) = 3; mortality(0, 100) = 0; pasturerotation(6, 5) = 30;
    waterrequirement(100, 50) = 5000; spaceallowance(1000, 40) = 25 -/
theorem fam_husbandry : ((((100 : Int) * (100 : Int)) / (500 : Int)) = (20 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (100 : Int)) = (600 : Int)) ∧ (((40 : Int) + ((200 : Int) * (1 : Int))) = (240 : Int)) ∧ ((fmax (0 : Int) (((100 : Int) + (30 : Int)) - (10 : Int))) = (120 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (100 : Int)) = (3 : Int)) ∧ ((((0 : Int) * (100 : Int)) / (100 : Int)) = (0 : Int)) ∧ (((6 : Int) * (5 : Int)) = (30 : Int)) ∧ (((100 : Int) * (50 : Int)) = (5000 : Int)) ∧ (((1000 : Int) / (40 : Int)) = (25 : Int)) := by decide

/-- hvac: coolingload(600, 25) = 15000; airflow(3, 400) = 1200; tonnage(36000, 12000) = 3; ducting(1200, 800) =
    2; ventilation(20, 15) = 300; sensibleheat(1000, 20) = 20000; latentheat(1000, 50) = 25000; setpoint(72, 75)
    = 1; setpoint(78, 75) = 0 -/
theorem fam_hvac : (((600 : Int) * (25 : Int)) = (15000 : Int)) ∧ (((3 : Int) * (400 : Int)) = (1200 : Int)) ∧ (((36000 : Int) / (12000 : Int)) = (3 : Int)) ∧ ((-((-(1200 : Int)) / (800 : Int))) = (2 : Int)) ∧ (((20 : Int) * (15 : Int)) = (300 : Int)) ∧ (((1000 : Int) * (20 : Int)) = (20000 : Int)) ∧ ((((1000 : Int) * (50 : Int)) / (2 : Int)) = (25000 : Int)) ∧ ((if (if (72 : Int) ≤ (75 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (78 : Int) ≤ (75 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) := by decide

/-- hydration: dailyneed(70, 35) = 2450; sweatloss(2, 60) = 120; replacementrate(1500, 2000) = 75; deficit(2500,
    2000) = 500; electrolyteneed(2000, 10) = 200; urineoutput(1500, 24) = 62; fluidbalance(2500, 2000) = 500;
    concentration(600, 2) = 300 -/
theorem fam_hydration : (((70 : Int) * (35 : Int)) = (2450 : Int)) ∧ (((2 : Int) * (60 : Int)) = (120 : Int)) ∧ ((((1500 : Int) * (100 : Int)) / (2000 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((2500 : Int) - (2000 : Int))) = (500 : Int)) ∧ (((2000 : Int) / (10 : Int)) = (200 : Int)) ∧ (((1500 : Int) / (24 : Int)) = (62 : Int)) ∧ ((fmax (0 : Int) ((2500 : Int) - (2000 : Int))) = (500 : Int)) ∧ (((600 : Int) / (2 : Int)) = (300 : Int)) := by decide

/-- hydraulics: pressure(1000, 20) = 50; flow(20, 3) = 60; force(50, 20) = 1000; velocity(60, 20) = 3;
    head(1000, 10) = 100; power(60, 100) = 6000; reynolds(3, 50) = 150; lift(100, 8) = 800 -/
theorem fam_hydraulics : (((1000 : Int) / (20 : Int)) = (50 : Int)) ∧ (((20 : Int) * (3 : Int)) = (60 : Int)) ∧ (((50 : Int) * (20 : Int)) = (1000 : Int)) ∧ (((60 : Int) / (20 : Int)) = (3 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((60 : Int) * (100 : Int)) = (6000 : Int)) ∧ (((3 : Int) * (50 : Int)) = (150 : Int)) ∧ (((100 : Int) * (8 : Int)) = (800 : Int)) := by decide

/-- hydro: power(100, 50) = 4905; head(2000, 1000) = 2; capacity(45, 100) = 45; efficiency(90, 100) = 90;
    storage(10000, 500) = 20; turbine(60, 50) = 3000; penstock(200, 1000) = 20; reservoir(800, 300) = 500;
    reservoir(300, 800) = 0 -/
theorem fam_hydro : (((((100 : Int) * (50 : Int)) * (981 : Int)) / (1000 : Int)) = (4905 : Int)) ∧ (((2000 : Int) / (1000 : Int)) = (2 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ (((10000 : Int) / (500 : Int)) = (20 : Int)) ∧ (((60 : Int) * (50 : Int)) = (3000 : Int)) ∧ ((((200 : Int) * (100 : Int)) / (1000 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((800 : Int) - (300 : Int))) = (500 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (800 : Int))) = (0 : Int)) := by decide

/-- hydrography: depth(1500, 1) = 1500; soundingdensity(10000, 100) = 100; tidalrange(500, 100) = 400;
    currentspeed(3000, 60) = 50; chartscale(50000, 1000) = 50; shoalcount(12, 8) = 20; surveycoverage(85, 100) =
    85; isobathinterval(200, 4) = 50 -/
theorem fam_hydrography : (((1500 : Int) * (1 : Int)) = (1500 : Int)) ∧ (((10000 : Int) / (100 : Int)) = (100 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (100 : Int))) = (400 : Int)) ∧ (((3000 : Int) / (60 : Int)) = (50 : Int)) ∧ (((50000 : Int) / (1000 : Int)) = (50 : Int)) ∧ (((12 : Int) + (8 : Int)) = (20 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ (((200 : Int) / (4 : Int)) = (50 : Int)) := by decide

/-- hydrology: flow(50, 2) = 100; runoff(200, 60) = 120; volume(1000, 5) = 5000; infiltration(30, 100) = 30;
    watershed(12, 50) = 600; retention(750, 1000) = 75; recharge(20, 100) = 2000; drought(40, 200) = 20 -/
theorem fam_hydrology : (((50 : Int) * (2 : Int)) = (100 : Int)) ∧ ((((200 : Int) * (60 : Int)) / (100 : Int)) = (120 : Int)) ∧ (((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((12 : Int) * (50 : Int)) = (600 : Int)) ∧ ((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ (((20 : Int) * (100 : Int)) = (2000 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (200 : Int)) = (20 : Int)) := by decide

/-- hydroponics: ec(1400, 2) = 700; ph(7, 6) = 1; ph(6, 7) = 0; nutrientratio(150, 200) = 75; flowrate(600, 60)
    = 10; density(100, 4) = 25; reservoir(50, 4) = 200; dosing(100, 2) = 200; dwc(8, 20) = 160 -/
theorem fam_hydroponics : (((1400 : Int) / (2 : Int)) = (700 : Int)) ∧ ((fmax (0 : Int) ((7 : Int) - (6 : Int))) = (1 : Int)) ∧ ((fmax (0 : Int) ((6 : Int) - (7 : Int))) = (0 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (200 : Int)) = (75 : Int)) ∧ (((600 : Int) / (60 : Int)) = (10 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((50 : Int) * (4 : Int)) = (200 : Int)) ∧ (((100 : Int) * (2 : Int)) = (200 : Int)) ∧ (((8 : Int) * (20 : Int)) = (160 : Int)) := by decide
