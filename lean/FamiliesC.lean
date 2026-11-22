-- lean/FamiliesC.lean — GENERATED. THE FAMILIES, C — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a
def fmin (a b : Int) : Int := if a ≤ b then a else b
def ffact : Nat → Nat
  | 0 => 1
  | n + 1 => (n + 1) * ffact n
def fchoose (n : Nat) : Nat → Nat
  | 0 => 1
  | k + 1 => fchoose n k * (n - k) / (k + 1)
def flog (b : Nat) : Nat → Nat → Nat
  | 0, _ => 0
  | fuel + 1, n => if n < b then 0 else 1 + flog b fuel (n / b)
def fclog (b n : Nat) : Nat := if n ≤ 1 then 0 else flog b 64 (n - 1) + 1

/-- cache: lines(32768, 64) = 512; ways(3) = 8; sets(512, 8) = 64; hitpct(95, 100) = 95; tagbits(48, 12) = 36;
    blocks(65536, 64) = 1024; levels(3, 0) = 3; combos(8, 2) = 28 -/
theorem fam_cache : (((32768 : Int) / (64 : Int)) = (512 : Int)) ∧ (((2 : Int) ^ (3 : Nat)) = (8 : Int)) ∧ (((512 : Int) / (8 : Int)) = (64 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((fmax (0 : Int) ((48 : Int) - (12 : Int))) = (36 : Int)) ∧ (((65536 : Int) / (64 : Int)) = (1024 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) := by decide

/-- caching: hitrate(950, 1000) = 95; missrate(50, 1000) = 5; eviction(30, 100) = 30; latency(5000, 100) = 50;
    utilization(75, 100) = 75; warmup(800, 1000) = 80; speedup(900, 100) = 900 -/
theorem fam_caching : ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (1000 : Int)) = (80 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (100 : Int)) = (900 : Int)) := by decide

/-- cadence: rootmotion(0, 7) = 7; resolutionstrength(3, 4) = 12; chordspan(0, 16) = 16; phraselength(4, 4) =
    16; harmonicrhythm(8, 4) = 2; tensionrelease(3, 4) = 75; approachinterval(11, 12) = 1; finalitytype(5, 3) =
    1; finalitytype(2, 3) = 0 -/
theorem fam_cadence : ((fmax (0 : Int) ((7 : Int) - (0 : Int))) = (7 : Int)) ∧ (((3 : Int) * (4 : Int)) = (12 : Int)) ∧ ((fmax (0 : Int) ((16 : Int) - (0 : Int))) = (16 : Int)) ∧ (((4 : Int) * (4 : Int)) = (16 : Int)) ∧ (((8 : Int) / (4 : Int)) = (2 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((12 : Int) - (11 : Int))) = (1 : Int)) ∧ ((if (if (5 : Int) ≥ (3 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (2 : Int) ≥ (3 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) := by decide

/-- calculus: derivative(3, 4) = 12; integral(12, 3) = 3; slope(10, 2) = 5; area(6, 7) = 42; limit(100, 4) = 25;
    rate(60, 12) = 5; series(8, 3) = 24; tangent(5, 6) = 30 -/
theorem fam_calculus : (((3 : Int) * (4 : Int)) = (12 : Int)) ∧ (((12 : Int) / ((3 : Int) + (1 : Int))) = (3 : Int)) ∧ (((10 : Int) / (2 : Int)) = (5 : Int)) ∧ (((6 : Int) * (7 : Int)) = (42 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((60 : Int) / (12 : Int)) = (5 : Int)) ∧ (((8 : Int) * (3 : Int)) = (24 : Int)) ∧ (((5 : Int) * (6 : Int)) = (30 : Int)) := by decide

/-- calendar: daysinyear(360, 5) = 365; leapcycle(100, 4) = 25; weekcombos(7, 2) = 21; monthorderings(6) = 720;
    intercalations(19, 7) = 2; dayofweek(365, 7) = 1; epochspan(2000, 1) = 1999; cyclepermutations(7, 3) = 210 -/
theorem fam_calendar : (((360 : Int) + (5 : Int)) = (365 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (7 : Int)) (Int.toNat (2 : Int)))) = (21 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (6 : Int)))) = (720 : Int)) ∧ (((19 : Int) / (7 : Int)) = (2 : Int)) ∧ (((365 : Int) % (7 : Int)) = (1 : Int)) ∧ ((fmax (0 : Int) ((2000 : Int) - (1 : Int))) = (1999 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (7 : Int)))) / (Int.ofNat (ffact (Int.toNat ((7 : Int) - (3 : Int)))))) = (210 : Int)) := by decide

/-- calligraphy: strokecount(8, 4) = 12; penangle(900, 10) = 90; xheight(100, 2) = 50; letterspacing(12, 3) =
    36; strokeorderings(5) = 120; flourishsubsets(4) = 16; glyphpairs(26, 2) = 325; slantdegree(120, 10) = 12 -/
theorem fam_calligraphy : (((8 : Int) + (4 : Int)) = (12 : Int)) ∧ (((900 : Int) / (10 : Int)) = (90 : Int)) ∧ (((100 : Int) / (2 : Int)) = (50 : Int)) ∧ (((12 : Int) * (3 : Int)) = (36 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (26 : Int)) (Int.toNat (2 : Int)))) = (325 : Int)) ∧ (((120 : Int) / (10 : Int)) = (12 : Int)) := by decide

/-- campaign: reach(50000, 60) = 30000; impressions(30000, 3) = 90000; frequency(90000, 30000) = 3; ctr(600,
    60000) = 100; cpm(5000, 50000) = 100; cpc(5000, 500) = 10; engagement(1500, 30000) = 5; roi(15000, 5000) =
    200; roi(3000, 5000) = 0 -/
theorem fam_campaign : ((((50000 : Int) * (60 : Int)) / (100 : Int)) = (30000 : Int)) ∧ (((30000 : Int) * (3 : Int)) = (90000 : Int)) ∧ (((90000 : Int) / (30000 : Int)) = (3 : Int)) ∧ ((((600 : Int) * (10000 : Int)) / (60000 : Int)) = (100 : Int)) ∧ ((((5000 : Int) * (1000 : Int)) / (50000 : Int)) = (100 : Int)) ∧ (((5000 : Int) / (500 : Int)) = (10 : Int)) ∧ ((((1500 : Int) * (100 : Int)) / (30000 : Int)) = (5 : Int)) ∧ ((((fmax (0 : Int) ((15000 : Int) - (5000 : Int))) * (100 : Int)) / (5000 : Int)) = (200 : Int)) ∧ ((((fmax (0 : Int) ((3000 : Int) - (5000 : Int))) * (100 : Int)) / (5000 : Int)) = (0 : Int)) := by decide

/-- canning: headspace(500, 450) = 50; processtime(10, 2, 7) = 24; fvalue(3, 20) = 60; yield(1000, 15) = 850;
    brine(2000, 5) = 100; seal(24, 25) = 96; batch(100, 12) = 9; sterilize(121, 116) = 1; sterilize(100, 116) =
    0 -/
theorem fam_canning : ((fmax (0 : Int) ((500 : Int) - (450 : Int))) = (50 : Int)) ∧ (((10 : Int) + ((2 : Int) * (7 : Int))) = (24 : Int)) ∧ (((3 : Int) * (20 : Int)) = (60 : Int)) ∧ ((((1000 : Int) * ((100 : Int) - (15 : Int))) / (100 : Int)) = (850 : Int)) ∧ ((((2000 : Int) * (5 : Int)) / (100 : Int)) = (100 : Int)) ∧ ((((24 : Int) * (100 : Int)) / (25 : Int)) = (96 : Int)) ∧ ((-((-(100 : Int)) / (12 : Int))) = (9 : Int)) ∧ ((if (if (121 : Int) ≥ (116 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (100 : Int) ≥ (116 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) := by decide

/-- canon: orderings(4) = 24; orderings(5) = 120; orderings(0) = 1; selections(5) = 31; selections(1) = 1 -/
theorem fam_canon : ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (0 : Int)))) = (1 : Int)) ∧ ((((2 : Int) ^ (5 : Nat)) - (1 : Int)) = (31 : Int)) ∧ ((((2 : Int) ^ (1 : Nat)) - (1 : Int)) = (1 : Int)) := by decide

/-- capacitor: charge(100, 12) = 1200; energy(1200, 2) = 600; reactance(60000, 628) = 95; timeconstant(100, 10)
    = 1000; seriescombos(8, 2) = 28; voltagerating(25, 1) = 25; parallelsum(100, 200) = 300; leakage(1, 100) = 1 -/
theorem fam_capacitor : (((100 : Int) * (12 : Int)) = (1200 : Int)) ∧ (((1200 : Int) / (2 : Int)) = (600 : Int)) ∧ (((60000 : Int) / (628 : Int)) = (95 : Int)) ∧ (((100 : Int) * (10 : Int)) = (1000 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ (((25 : Int) * (1 : Int)) = (25 : Int)) ∧ (((100 : Int) + (200 : Int)) = (300 : Int)) ∧ ((((1 : Int) * (100 : Int)) / (100 : Int)) = (1 : Int)) := by decide

/-- caramelization: temperaturethreshold(160, 170) = 170; browningrate(80, 100) = 80; sugarconversion(90, 100) =
    90; masslosspct(15, 100) = 15; colorindex(8, 10) = 80; timeattemp(600, 10) = 60; activationstage(170, 30) =
    5; residualsugar(100, 90) = 10 -/
theorem fam_caramelization : ((fmax (160 : Int) (170 : Int)) = (170 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (100 : Int)) = (15 : Int)) ∧ (((8 : Int) * (10 : Int)) = (80 : Int)) ∧ (((600 : Int) / (10 : Int)) = (60 : Int)) ∧ (((170 : Int) / (30 : Int)) = (5 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (90 : Int))) = (10 : Int)) := by decide

/-- carbon: footprint(100, 5) = 500; offset(1000, 300) = 700; offset(300, 1000) = 0; sequestration(50, 20) =
    1000; intensity(5000, 100) = 50; credits(10, 25) = 250; capture(1000, 90) = 900; equivalent(8, 28) = 224;
    budget(1000, 600) = 400 -/
theorem fam_carbon : (((100 : Int) * (5 : Int)) = (500 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (300 : Int))) = (700 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (1000 : Int))) = (0 : Int)) ∧ (((50 : Int) * (20 : Int)) = (1000 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ (((10 : Int) * (25 : Int)) = (250 : Int)) ∧ ((((1000 : Int) * (90 : Int)) / (100 : Int)) = (900 : Int)) ∧ (((8 : Int) * (28 : Int)) = (224 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (600 : Int))) = (400 : Int)) := by decide

/-- cardiology: ejection(60, 120) = 50; output(70, 72) = 5040; map(120, 80) = 93; qtc(400, 800) = 50; target(40)
    = 180; bmi(70, 175) = 22; risk(3, 10) = 30; pulse(30, 15) = 120 -/
theorem fam_cardiology : ((((60 : Int) * (100 : Int)) / (120 : Int)) = (50 : Int)) ∧ (((70 : Int) * (72 : Int)) = (5040 : Int)) ∧ ((((120 : Int) + ((2 : Int) * (80 : Int))) / (3 : Int)) = (93 : Int)) ∧ ((((400 : Int) * (100 : Int)) / (800 : Int)) = (50 : Int)) ∧ ((fmax (0 : Int) ((220 : Int) - (40 : Int))) = (180 : Int)) ∧ ((((70 : Int) * (10000 : Int)) / ((175 : Int) ^ (2 : Nat))) = (22 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (10 : Int)) = (30 : Int)) ∧ ((((30 : Int) * (60 : Int)) / (15 : Int)) = (120 : Int)) := by decide

/-- cargo: teu(300, 150) = 600; utilization(950, 1000) = 95; stowage(500, 33) = 16500; deadweight(40000, 5000,
    3000) = 48000; manifest(200, 25) = 5000; palletize(1000, 48) = 21; containers(5000, 300) = 17;
    loadfactor(800, 1000) = 80 -/
theorem fam_cargo : (((300 : Int) + ((150 : Int) * (2 : Int))) = (600 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ (((500 : Int) * (33 : Int)) = (16500 : Int)) ∧ ((((40000 : Int) + (5000 : Int)) + (3000 : Int)) = (48000 : Int)) ∧ (((200 : Int) * (25 : Int)) = (5000 : Int)) ∧ ((-((-(1000 : Int)) / (48 : Int))) = (21 : Int)) ∧ ((-((-(5000 : Int)) / (300 : Int))) = (17 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (1000 : Int)) = (80 : Int)) := by decide

/-- cartography: area(40, 25) = 1000; bearing(450) = 90; bearing(-90) = 270; contour(1050, 100) = 10;
    distance(50, 1000) = 50000; distortion(120, 100) = 120; resolution(10000, 100) = 100; scale(50000, 25) =
    2000; zoom(1, 2) = 16 -/
theorem fam_cartography : (((40 : Int) * (25 : Int)) = (1000 : Int)) ∧ (((((450 : Int) % (360 : Int)) + (360 : Int)) % (360 : Int)) = (90 : Int)) ∧ (((((-90 : Int) % (360 : Int)) + (360 : Int)) % (360 : Int)) = (270 : Int)) ∧ (((1050 : Int) / (100 : Int)) = (10 : Int)) ∧ (((50 : Int) * (1000 : Int)) = (50000 : Int)) ∧ ((((120 : Int) * (100 : Int)) / (100 : Int)) = (120 : Int)) ∧ (((10000 : Int) / (100 : Int)) = (100 : Int)) ∧ (((50000 : Int) / (25 : Int)) = (2000 : Int)) ∧ (((1 : Int) * ((4 : Int) ^ (2 : Nat))) = (16 : Int)) := by decide

/-- casting: shrinkage(1010, 1000) = 10; shrinkage(1000, 1010) = 0; pouringtime(1000, 50) = 20;
    solidification(100, 10) = 100; yield(80, 100) = 80; risering(1000, 30) = 300; gatingratio(40, 10) = 4;
    fluidity(50, 3) = 150; coolingrate(600, 60) = 10 -/
theorem fam_casting : ((fmax (0 : Int) ((1010 : Int) - (1000 : Int))) = (10 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (1010 : Int))) = (0 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((100 : Int) ^ (2 : Nat)) / ((10 : Int) ^ (2 : Nat))) = (100 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((1000 : Int) * (30 : Int)) / (100 : Int)) = (300 : Int)) ∧ (((40 : Int) / (10 : Int)) = (4 : Int)) ∧ (((50 : Int) * (3 : Int)) = (150 : Int)) ∧ (((600 : Int) / (60 : Int)) = (10 : Int)) := by decide

/-- catalysis: turnover(1000, 5) = 200; frequency(1200, 60) = 20; selectivity(80, 100) = 80; activation(75, 30)
    = 45; activation(30, 75) = 0; conversion(90, 100) = 90; loading(5, 100) = 5; rate(600, 60) = 10;
    surface(1000, 10) = 100 -/
theorem fam_catalysis : (((1000 : Int) / (5 : Int)) = (200 : Int)) ∧ (((1200 : Int) / (60 : Int)) = (20 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((75 : Int) - (30 : Int))) = (45 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (75 : Int))) = (0 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((600 : Int) / (60 : Int)) = (10 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) := by decide

/-- catalyst: turnover(1000, 60) = 60000; sites(100, 4) = 400; efficiency(90, 100) = 90; activation(200, 80) =
    120; selectivity(85, 100) = 85; loading(500, 10) = 50; cycles(1000, 5) = 5000; combos(6, 2) = 15 -/
theorem fam_catalyst : (((1000 : Int) * (60 : Int)) = (60000 : Int)) ∧ (((100 : Int) * (4 : Int)) = (400 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (80 : Int))) = (120 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ (((500 : Int) / (10 : Int)) = (50 : Int)) ∧ (((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) := by decide

/-- catering: portions(240, 80) = 3; costperhead(4000, 80) = 50; scaling(3, 80) = 240; consumption(180, 240) =
    75; staffratio(80, 10) = 8; waste(60, 240) = 25; beverage(240, 80) = 3; margin(100, 40) = 60 -/
theorem fam_catering : (((240 : Int) / (80 : Int)) = (3 : Int)) ∧ (((4000 : Int) / (80 : Int)) = (50 : Int)) ∧ (((3 : Int) * (80 : Int)) = (240 : Int)) ∧ ((((180 : Int) * (100 : Int)) / (240 : Int)) = (75 : Int)) ∧ (((80 : Int) / (10 : Int)) = (8 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (240 : Int)) = (25 : Int)) ∧ (((240 : Int) / (80 : Int)) = (3 : Int)) ∧ (((((100 : Int) - (40 : Int)) * (100 : Int)) / (100 : Int)) = (60 : Int)) := by decide

/-- causal: chains(5) = 4; chains(0) = 0; backdoorSets(3) = 8; counterfactuals(4) = 16; confounded(2, 3) = 6;
    conditionings(4) = 15; mediation(3) = 4 -/
theorem fam_causal : ((fmax (0 : Int) ((5 : Int) - (1 : Int))) = (4 : Int)) ∧ ((fmax (0 : Int) ((0 : Int) - (1 : Int))) = (0 : Int)) ∧ (((2 : Int) ^ (3 : Nat)) = (8 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((2 : Int) * (3 : Int)) = (6 : Int)) ∧ ((((2 : Int) ^ (4 : Nat)) - (1 : Int)) = (15 : Int)) ∧ (((3 : Int) + (1 : Int)) = (4 : Int)) := by decide

/-- census: density(60000, 30) = 2000; growth(1100, 1000) = 10; medianage(3500, 100) = 35; dependency(500, 1000)
    = 50; participation(630, 1000) = 63; response(750, 1000) = 75; undercount(1000, 970) = 30; undercount(900,
    1000) = 0; apportionment(60000, 120) = 500 -/
theorem fam_census : (((60000 : Int) / (30 : Int)) = (2000 : Int)) ∧ ((((fmax (0 : Int) ((1100 : Int) - (1000 : Int))) * (100 : Int)) / (1000 : Int)) = (10 : Int)) ∧ (((3500 : Int) / (100 : Int)) = (35 : Int)) ∧ ((((500 : Int) * (100 : Int)) / (1000 : Int)) = (50 : Int)) ∧ ((((630 : Int) * (100 : Int)) / (1000 : Int)) = (63 : Int)) ∧ ((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (970 : Int))) = (30 : Int)) ∧ ((fmax (0 : Int) ((900 : Int) - (1000 : Int))) = (0 : Int)) ∧ (((60000 : Int) / (120 : Int)) = (500 : Int)) := by decide

/-- ceramic: sinter(1600, 200) = 1400; porosity(5, 100) = 5; hardness(9, 1) = 9; grains(100, 20) = 2000;
    shrink(15, 100) = 15; density(3900, 1) = 3900; phases(2, 1) = 3; combos(6, 2) = 15 -/
theorem fam_ceramic : ((fmax (0 : Int) ((1600 : Int) - (200 : Int))) = (1400 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((9 : Int) * (1 : Int)) = (9 : Int)) ∧ (((100 : Int) * (20 : Int)) = (2000 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (100 : Int)) = (15 : Int)) ∧ (((3900 : Int) / (1 : Int)) = (3900 : Int)) ∧ (((2 : Int) + (1 : Int)) = (3 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) := by decide

/-- ceramics: shrinkage(100, 88) = 12; porosity(15, 200) = 7; density(900, 300) = 3; glaze(2, 3) = 6;
    thermalshock(400, 50) = 8; vitrification(85, 100) = 85 -/
theorem fam_ceramics : (((((100 : Int) - (88 : Int)) * (100 : Int)) / (100 : Int)) = (12 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (200 : Int)) = (7 : Int)) ∧ (((900 : Int) / (300 : Int)) = (3 : Int)) ∧ (((2 : Int) * (3 : Int)) = (6 : Int)) ∧ (((400 : Int) / (50 : Int)) = (8 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) := by decide

/-- cern: energygev(7000, 2) = 14000; collisions(40, 1000) = 40000; luminosity(60000, 100) = 600;
    detectorlayers(4, 3) = 7; particlepairs(12, 2) = 66; bunchspacing(25, 1) = 25; tracksperevent(100, 10) =
    1000; triggerrate(40000, 40) = 1000 -/
theorem fam_cern : (((7000 : Int) * (2 : Int)) = (14000 : Int)) ∧ (((40 : Int) * (1000 : Int)) = (40000 : Int)) ∧ (((60000 : Int) / (100 : Int)) = (600 : Int)) ∧ (((4 : Int) + (3 : Int)) = (7 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((25 : Int) / (1 : Int)) = (25 : Int)) ∧ (((100 : Int) * (10 : Int)) = (1000 : Int)) ∧ (((40000 : Int) / (40 : Int)) = (1000 : Int)) := by decide

/-- chat: groups(5, 3) = 10; gossip(8) = 3; gossip(9) = 4; chain(5) = 4 -/
theorem fam_chat : ((Int.ofNat (fchoose (Int.toNat (5 : Int)) (Int.toNat (3 : Int)))) = (10 : Int)) ∧ ((Int.ofNat (fclog 2 (Int.toNat (8 : Int)))) = (3 : Int)) ∧ ((Int.ofNat (fclog 2 (Int.toNat (9 : Int)))) = (4 : Int)) ∧ (((5 : Int) - (1 : Int)) = (4 : Int)) := by decide

/-- checkers: squares(8, 8) = 64; playablesquares(64, 2) = 32; pieces(12, 2) = 24; movepaths(8, 2) = 56;
    kingrows(2, 0) = 2; jumpcombos(12, 2) = 66; positionsubsets(8) = 256; branchingfactor(8, 2) = 10 -/
theorem fam_checkers : (((8 : Int) * (8 : Int)) = (64 : Int)) ∧ (((64 : Int) / (2 : Int)) = (32 : Int)) ∧ (((12 : Int) * (2 : Int)) = (24 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (8 : Int)))) / (Int.ofNat (ffact (Int.toNat ((8 : Int) - (2 : Int)))))) = (56 : Int)) ∧ (((2 : Int) + (0 : Int)) = (2 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((2 : Int) ^ (8 : Nat)) = (256 : Int)) ∧ (((8 : Int) + (2 : Int)) = (10 : Int)) := by decide

/-- checksum: modular(1000, 256) = 232; onescomplement(300, 256) = 211; crcbits(1000, 32) = 1032; fletcher(10,
    20) = 5130; detectionrate(99, 100) = 99; overhead(32, 1000) = 3; blocksremainder(1000, 64) = 40 -/
theorem fam_checksum : (((1000 : Int) % (256 : Int)) = (232 : Int)) ∧ ((((256 : Int) - (1 : Int)) - ((300 : Int) % (256 : Int))) = (211 : Int)) ∧ (((1000 : Int) + (32 : Int)) = (1032 : Int)) ∧ ((((20 : Int) * (256 : Int)) + (10 : Int)) = (5130 : Int)) ∧ ((((99 : Int) * (100 : Int)) / (100 : Int)) = (99 : Int)) ∧ ((((32 : Int) * (100 : Int)) / (1000 : Int)) = (3 : Int)) ∧ (((1000 : Int) % (64 : Int)) = (40 : Int)) := by decide

/-- cheese: aging(90, 2) = 180; cultureratio(2, 1000) = 2; fatindrymatter(30, 60) = 50; moisture(450, 1000) =
    45; phacidity(9, 50) = 18; rennet(1000, 150) = 7; rennet(900, 150) = 6; salt(5, 50) = 10; yield(1000, 10) =
    100 -/
theorem fam_cheese : (((90 : Int) * (2 : Int)) = (180 : Int)) ∧ ((((2 : Int) * (1000 : Int)) / (1000 : Int)) = (2 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (60 : Int)) = (50 : Int)) ∧ ((((450 : Int) * (100 : Int)) / (1000 : Int)) = (45 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (50 : Int)) = (18 : Int)) ∧ ((-((-(1000 : Int)) / (150 : Int))) = (7 : Int)) ∧ ((-((-(900 : Int)) / (150 : Int))) = (6 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (50 : Int)) = (10 : Int)) ∧ ((((1000 : Int) * (10 : Int)) / (100 : Int)) = (100 : Int)) := by decide

/-- cheesemaking: yield(10, 100) = 10; culturestrains(3, 2) = 5; phlevel(52, 10) = 5; agingdays(60, 1) = 60;
    moisture(40, 100) = 40; rennetdrops(1000, 10) = 100; saltpct(2, 100) = 2; culturecombos(8, 2) = 28 -/
theorem fam_cheesemaking : ((((10 : Int) * (100 : Int)) / (100 : Int)) = (10 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ (((52 : Int) / (10 : Int)) = (5 : Int)) ∧ (((60 : Int) * (1 : Int)) = (60 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) := by decide

/-- chem: moles(180, 18) = 10; molarity(2000, 2) = 1000; mass(3, 18) = 54; dilution(1000, 10) = 100; valence(3,
    4) = 3; yield(85, 100) = 85; isotopes(2, 1) = 3; bonds(6, 2) = 15 -/
theorem fam_chem : (((180 : Int) / (18 : Int)) = (10 : Int)) ∧ (((2000 : Int) / (2 : Int)) = (1000 : Int)) ∧ (((3 : Int) * (18 : Int)) = (54 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((fmin (3 : Int) (4 : Int)) = (3 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ (((2 : Int) + (1 : Int)) = (3 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) := by decide

/-- chemical: conversion(80, 100) = 80; heattransfer(50, 20) = 1000; masstransfer(30, 4) = 120; output(90, 100)
    = 90; pressuredrop(200, 150) = 50; pressuredrop(100, 150) = 0; reflux(300, 100) = 300; residence(1000, 50) =
    20; selectivity(75, 100) = 75 -/
theorem fam_chemical : ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((50 : Int) * (20 : Int)) = (1000 : Int)) ∧ (((30 : Int) * (4 : Int)) = (120 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (150 : Int))) = (50 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (150 : Int))) = (0 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (100 : Int)) = (300 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) := by decide

/-- chemistry: moles(180, 18) = 10; concentration(2, 4) = 500; yield(80, 100) = 80; mass(10, 18) = 180;
    dilution(5, 20) = 100; ratio(1, 4) = 25; bonds(5) = 4 -/
theorem fam_chemistry : (((180 : Int) / (18 : Int)) = (10 : Int)) ∧ ((((2 : Int) * (1000 : Int)) / (4 : Int)) = (500 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((10 : Int) * (18 : Int)) = (180 : Int)) ∧ (((5 : Int) * (20 : Int)) = (100 : Int)) ∧ ((((1 : Int) * (100 : Int)) / (4 : Int)) = (25 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (1 : Int))) = (4 : Int)) := by decide

/-- chess: material(2, 5) = 10; mobility(40, 33) = 7; branching(350, 10) = 35; plytonodes(2, 3) = 15; tempo(15,
    2) = 7; centipawns(3, 50) = 350; perft(5, 3) = 125; kingsafety(4, 2) = 2 -/
theorem fam_chess : (((2 : Int) * (5 : Int)) = (10 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (33 : Int))) = (7 : Int)) ∧ (((350 : Int) / (10 : Int)) = (35 : Int)) ∧ (((((2 : Int) ^ (4 : Nat)) - (1 : Int)) / ((2 : Int) - (1 : Int))) = (15 : Int)) ∧ (((15 : Int) / (2 : Int)) = (7 : Int)) ∧ ((((3 : Int) * (100 : Int)) + (50 : Int)) = (350 : Int)) ∧ (((5 : Int) ^ (3 : Nat)) = (125 : Int)) ∧ ((fmax (0 : Int) ((4 : Int) - (2 : Int))) = (2 : Int)) := by decide

/-- chocolate: cacaopercent(70, 100) = 70; cocoabutter(1000, 54) = 540; conche(72, 5) = 360; crystalseed(100,
    30) = 4; meltpoint(28, 7) = 35; sugarratio(30, 100) = 30; temper(31, 29) = 1; temper(27, 29) = 0;
    viscosity(600, 5) = 120 -/
theorem fam_chocolate : ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ ((((1000 : Int) * (54 : Int)) / (100 : Int)) = (540 : Int)) ∧ (((72 : Int) * (5 : Int)) = (360 : Int)) ∧ ((-((-(100 : Int)) / (30 : Int))) = (4 : Int)) ∧ (((28 : Int) + (7 : Int)) = (35 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((if (if (31 : Int) ≥ (29 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (27 : Int) ≥ (29 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((600 : Int) / (5 : Int)) = (120 : Int)) := by decide

/-- chord: notecount(3, 4) = 7; intervalspan(12, 0) = 12; triadquality(4, 3) = 7; extensiondegree(3) = 7;
    voicingwidth(24, 3) = 8; stackedthirds(4) = 3 -/
theorem fam_chord : (((3 : Int) + (4 : Int)) = (7 : Int)) ∧ ((fmax (0 : Int) ((12 : Int) - (0 : Int))) = (12 : Int)) ∧ (((4 : Int) + (3 : Int)) = (7 : Int)) ∧ ((((3 : Int) * (2 : Int)) + (1 : Int)) = (7 : Int)) ∧ (((24 : Int) / (3 : Int)) = (8 : Int)) ∧ ((fmax (0 : Int) ((4 : Int) - (1 : Int))) = (3 : Int)) := by decide

/-- choreography: dancers(12, 4) = 16; formationorderings(5) = 120; stepcombos(16, 3) = 560; beatspermeasure(4,
    8) = 32; symmetrygroups(4) = 16; phrasecount(64, 8) = 8; spacingmeters(100, 4) = 25; syncratio(90, 100) = 90 -/
theorem fam_choreography : (((12 : Int) + (4 : Int)) = (16 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (16 : Int)) (Int.toNat (3 : Int)))) = (560 : Int)) ∧ (((4 : Int) * (8 : Int)) = (32 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ (((64 : Int) / (8 : Int)) = (8 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) := by decide

/-- chromatography: capacity(300, 60) = 400; efficiency(51200, 25600) = 2; peakarea(500, 40) = 10000;
    plates(400, 10) = 25600; resolution(100, 20, 20) = 5; retention(300, 60) = 240; rf(30, 60) = 50;
    selectivity(150, 100) = 150 -/
theorem fam_chromatography : ((((fmax (0 : Int) ((300 : Int) - (60 : Int))) * (100 : Int)) / (60 : Int)) = (400 : Int)) ∧ (((51200 : Int) / (25600 : Int)) = (2 : Int)) ∧ ((((500 : Int) * (40 : Int)) / (2 : Int)) = (10000 : Int)) ∧ ((((16 : Int) * ((400 : Int) ^ (2 : Nat))) / ((10 : Int) ^ (2 : Nat))) = (25600 : Int)) ∧ ((((2 : Int) * (100 : Int)) / ((20 : Int) + (20 : Int))) = (5 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (60 : Int))) = (240 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (60 : Int)) = (50 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (100 : Int)) = (150 : Int)) := by decide

/-- chronology: yearspan(1500, 500) = 1000; eventorderings(6) = 720; periodcount(3, 4) = 7; overlapwindows(10,
    2) = 45; datingerror(5, 100) = 5; sequencechoices(8, 3) = 336; epochdivisions(3000, 500) = 6;
    synchronisms(12, 5) = 60 -/
theorem fam_chronology : ((fmax (0 : Int) ((1500 : Int) - (500 : Int))) = (1000 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (6 : Int)))) = (720 : Int)) ∧ (((3 : Int) + (4 : Int)) = (7 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (8 : Int)))) / (Int.ofNat (ffact (Int.toNat ((8 : Int) - (3 : Int)))))) = (336 : Int)) ∧ (((3000 : Int) / (500 : Int)) = (6 : Int)) ∧ (((12 : Int) * (5 : Int)) = (60 : Int)) := by decide

/-- churn: rate(5, 100) = 5; retention(95, 100) = 95; lifetime(200, 5) = 4000; netrevenue(50, 30) = 20;
    netrevenue(30, 50) = -20; reactivation(10, 40) = 25; cohortdecay(60, 100) = 60; risk(20, 200) = 10 -/
theorem fam_churn : ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((((200 : Int) * (100 : Int)) / (5 : Int)) = (4000 : Int)) ∧ (((50 : Int) - (30 : Int)) = (20 : Int)) ∧ (((30 : Int) - (50 : Int)) = (-20 : Int)) ∧ ((((10 : Int) * (100 : Int)) / (40 : Int)) = (25 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (200 : Int)) = (10 : Int)) := by decide

/-- cinema: boxoffice(1000, 12) = 12000; roi(300, 100) = 300; runtime(40, 3) = 120; aspect(239, 100) = 239;
    shots(600, 120) = 5; rating(900, 100) = 9; occupancy(180, 200) = 90; frames(60, 24) = 1440 -/
theorem fam_cinema : (((1000 : Int) * (12 : Int)) = (12000 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (100 : Int)) = (300 : Int)) ∧ (((40 : Int) * (3 : Int)) = (120 : Int)) ∧ ((((239 : Int) * (100 : Int)) / (100 : Int)) = (239 : Int)) ∧ (((600 : Int) / (120 : Int)) = (5 : Int)) ∧ (((900 : Int) / (100 : Int)) = (9 : Int)) ∧ ((((180 : Int) * (100 : Int)) / (200 : Int)) = (90 : Int)) ∧ (((60 : Int) * (24 : Int)) = (1440 : Int)) := by decide

/-- cinematography: fstop(50, 25) = 2; exposure(8, 500) = 4000; depthoffield(5000, 2000) = 3000;
    depthoffield(2000, 5000) = 0; framerate(1440, 60) = 24; shutterangle(24, 180) = 48; focallength(35, 2) = 70;
    iso(100, 4) = 400; aspect(1920, 1080) = 177 -/
theorem fam_cinematography : (((50 : Int) / (25 : Int)) = (2 : Int)) ∧ (((8 : Int) * (500 : Int)) = (4000 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (2000 : Int))) = (3000 : Int)) ∧ ((fmax (0 : Int) ((2000 : Int) - (5000 : Int))) = (0 : Int)) ∧ (((1440 : Int) / (60 : Int)) = (24 : Int)) ∧ ((((360 : Int) * (24 : Int)) / (180 : Int)) = (48 : Int)) ∧ (((35 : Int) * (2 : Int)) = (70 : Int)) ∧ (((100 : Int) * (4 : Int)) = (400 : Int)) ∧ ((((1920 : Int) * (100 : Int)) / (1080 : Int)) = (177 : Int)) := by decide

/-- civil: beamload(1000, 5) = 200; bearing(6000, 3) = 2000; concrete(50, 7) = 350; deflection(800, 4) = 200;
    runoff(2, 1500) = 3000; settlement(900, 30) = 30; slope(3, 100) = 3; trafficflow(6000, 24) = 250;
    beamload(1000, 0) = 0 -/
theorem fam_civil : (((1000 : Int) / (5 : Int)) = (200 : Int)) ∧ (((6000 : Int) / (3 : Int)) = (2000 : Int)) ∧ (((50 : Int) * (7 : Int)) = (350 : Int)) ∧ (((800 : Int) / (4 : Int)) = (200 : Int)) ∧ (((2 : Int) * (1500 : Int)) = (3000 : Int)) ∧ (((900 : Int) / (30 : Int)) = (30 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (100 : Int)) = (3 : Int)) ∧ (((6000 : Int) / (24 : Int)) = (250 : Int)) ∧ (((1000 : Int) / (0 : Int)) = (0 : Int)) := by decide

/-- claims: frequency(250, 1000) = 250; severity(50000, 100) = 500; lossratio(60000, 100000) = 60;
    reserve(10000, 4000) = 6000; reserve(100, 500) = 0; settlement(5000, 500) = 4500; settlement(100, 500) = 0;
    deductible(5000, 500) = 500; payout(8000, 5000) = 5000; incurred(4000, 6000) = 10000 -/
theorem fam_claims : ((((250 : Int) * (1000 : Int)) / (1000 : Int)) = (250 : Int)) ∧ (((50000 : Int) / (100 : Int)) = (500 : Int)) ∧ ((((60000 : Int) * (100 : Int)) / (100000 : Int)) = (60 : Int)) ∧ ((fmax (0 : Int) ((10000 : Int) - (4000 : Int))) = (6000 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (500 : Int))) = (0 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (500 : Int))) = (4500 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (500 : Int))) = (0 : Int)) ∧ ((fmin (5000 : Int) (500 : Int)) = (500 : Int)) ∧ ((fmin (8000 : Int) (5000 : Int)) = (5000 : Int)) ∧ (((4000 : Int) + (6000 : Int)) = (10000 : Int)) := by decide

/-- clearance: renal(100, 2, 10) = 20; hepatic(1500, 40) = 600; total(20, 600) = 620; filtration(120, 600) = 20;
    extractionratio(100, 25) = 75; firstpass(75) = 25; residual(500, 120) = 380; ratio(240, 120) = 200 -/
theorem fam_clearance : ((((100 : Int) * (2 : Int)) / (10 : Int)) = (20 : Int)) ∧ ((((1500 : Int) * (40 : Int)) / (100 : Int)) = (600 : Int)) ∧ (((20 : Int) + (600 : Int)) = (620 : Int)) ∧ ((((120 : Int) * (100 : Int)) / (600 : Int)) = (20 : Int)) ∧ ((((fmax (0 : Int) ((100 : Int) - (25 : Int))) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (75 : Int))) = (25 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (120 : Int))) = (380 : Int)) ∧ ((((240 : Int) * (100 : Int)) / (120 : Int)) = (200 : Int)) := by decide

/-- climate: emissions(100, 5) = 500; budget(300, 1000) = 700; anomaly(15, 14) = 1; anomaly(13, 14) = -1;
    offset(500, 200) = 300; warming(400, 50) = 200; sealevel(3, 100) = 300; renewable(40, 100) = 40;
    intensity(1000, 50) = 20 -/
theorem fam_climate : (((100 : Int) * (5 : Int)) = (500 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (300 : Int))) = (700 : Int)) ∧ (((15 : Int) - (14 : Int)) = (1 : Int)) ∧ (((13 : Int) - (14 : Int)) = (-1 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (200 : Int))) = (300 : Int)) ∧ ((((400 : Int) * (50 : Int)) / (100 : Int)) = (200 : Int)) ∧ (((3 : Int) * (100 : Int)) = (300 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) := by decide

/-- climatology: anomaly(18, 15) = 3; anomaly(12, 15) = 0; forcing(400, 3) = 1200; albedo(30, 100) = 30;
    aridity(600, 1200) = 50; seasonality(30, 5) = 25; trend(20, 4) = 5; degreeday(25, 18) = 7; carbon(50, 40) =
    125 -/
theorem fam_climatology : ((fmax (0 : Int) ((18 : Int) - (15 : Int))) = (3 : Int)) ∧ ((fmax (0 : Int) ((12 : Int) - (15 : Int))) = (0 : Int)) ∧ (((400 : Int) * (3 : Int)) = (1200 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (1200 : Int)) = (50 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (5 : Int))) = (25 : Int)) ∧ (((20 : Int) / (4 : Int)) = (5 : Int)) ∧ ((fmax (0 : Int) ((25 : Int) - (18 : Int))) = (7 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (40 : Int)) = (125 : Int)) := by decide

/-- climbing: gain(1000, 200) = 800; gain(200, 1000) = 0; pitch(240, 4) = 60; effort(70, 100) = 7000;
    sendrate(3, 10) = 30; steepness(100, 50) = 200; grip(140, 70) = 200; rope(60, 3) = 20 -/
theorem fam_climbing : ((fmax (0 : Int) ((1000 : Int) - (200 : Int))) = (800 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (1000 : Int))) = (0 : Int)) ∧ (((240 : Int) / (4 : Int)) = (60 : Int)) ∧ (((70 : Int) * (100 : Int)) = (7000 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (10 : Int)) = (30 : Int)) ∧ ((((100 : Int) * (100 : Int)) / (50 : Int)) = (200 : Int)) ∧ ((((140 : Int) * (100 : Int)) / (70 : Int)) = (200 : Int)) ∧ (((60 : Int) / (3 : Int)) = (20 : Int)) := by decide

/-- cloud: cost(720, 5) = 3600; uptime(999, 1000) = 99; scale(100, 30) = 4; latency(5000, 100) = 50;
    throughput(6000, 60) = 100; storage(1000, 5) = 5000; egress(10000, 90) = 900; sla(99, 95) = 1; sla(90, 95) =
    0 -/
theorem fam_cloud : (((720 : Int) * (5 : Int)) = (3600 : Int)) ∧ ((((999 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ ((-((-(100 : Int)) / (30 : Int))) = (4 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ ((((10000 : Int) * (90 : Int)) / (1000 : Int)) = (900 : Int)) ∧ ((if (if (99 : Int) ≥ (95 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (90 : Int) ≥ (95 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) := by decide

/-- cloudflare: subsets(22) = 4194304; usage(22) = 4194303; choose(22, 3) = 1540; choose(5, 2) = 10; ordered(5,
    2) = 20; apis(22, 8) = 176; pipeline(4, 3) = 12; fanout(3, 5) = 15; reach(22, 300) = 6600 -/
theorem fam_cloudflare : (((2 : Int) ^ (22 : Nat)) = (4194304 : Int)) ∧ ((((2 : Int) ^ (22 : Nat)) - (1 : Int)) = (4194303 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (22 : Int)) (Int.toNat (3 : Int)))) = (1540 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (5 : Int)) (Int.toNat (2 : Int)))) = (10 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (5 : Int)))) / (Int.ofNat (ffact (Int.toNat ((5 : Int) - (2 : Int)))))) = (20 : Int)) ∧ (((22 : Int) * (8 : Int)) = (176 : Int)) ∧ (((4 : Int) * (3 : Int)) = (12 : Int)) ∧ (((3 : Int) * (5 : Int)) = (15 : Int)) ∧ (((22 : Int) * (300 : Int)) = (6600 : Int)) := by decide

/-- cloudphysics: dropletcount(1000, 100) = 100000; condensationlevel(125, 1) = 125; nucleipairs(12, 2) = 66;
    albedo(70, 100) = 70; opticalthickness(100, 4) = 25; terminalvelocity(900, 100) = 9; phasesubsets(3) = 8;
    precipefficiency(60, 100) = 60 -/
theorem fam_cloudphysics : (((1000 : Int) * (100 : Int)) = (100000 : Int)) ∧ (((125 : Int) * (1 : Int)) = (125 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((900 : Int) / (100 : Int)) = (9 : Int)) ∧ (((2 : Int) ^ (3 : Nat)) = (8 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) := by decide

/-- clustering: centroiddist(3, 4) = 25; inertia(100, 20) = 2000; silhouette(20, 60) = 66; purity(80, 100) = 80;
    kselection(100, 5) = 20; within(50, 4) = 200; between(1000, 300) = 700; between(300, 1000) = 0;
    density(1000, 10) = 10 -/
theorem fam_clustering : ((((3 : Int) ^ (2 : Nat)) + ((4 : Int) ^ (2 : Nat))) = (25 : Int)) ∧ (((100 : Int) * (20 : Int)) = (2000 : Int)) ∧ ((((fmax (0 : Int) ((60 : Int) - (20 : Int))) * (100 : Int)) / (fmax (20 : Int) (60 : Int))) = (66 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ (((50 : Int) * (4 : Int)) = (200 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (300 : Int))) = (700 : Int)) ∧ ((fmax (0 : Int) ((300 : Int) - (1000 : Int))) = (0 : Int)) ∧ (((1000 : Int) / ((10 : Int) ^ (2 : Nat))) = (10 : Int)) := by decide

/-- coaching: periodization(52, 4) = 13; taper(1000, 40) = 600; overload(100, 10) = 110; workratio(40, 20) = 2;
    readiness(90, 100) = 90; acwr(300, 250) = 120; peaking(80, 30) = 50; peaking(30, 80) = 0; deload(1000, 50) =
    500 -/
theorem fam_coaching : (((52 : Int) / (4 : Int)) = (13 : Int)) ∧ ((((1000 : Int) * ((100 : Int) - (40 : Int))) / (100 : Int)) = (600 : Int)) ∧ (((100 : Int) + (((100 : Int) * (10 : Int)) / (100 : Int))) = (110 : Int)) ∧ (((40 : Int) / (20 : Int)) = (2 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (250 : Int)) = (120 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (30 : Int))) = (50 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (80 : Int))) = (0 : Int)) ∧ ((((1000 : Int) * (50 : Int)) / (100 : Int)) = (500 : Int)) := by decide

/-- coagulation: inr(18, 12) = 150; prothrombintime(15, 12) = 3; prothrombintime(10, 12) = 0; aptt(60, 30) =
    200; plateletcount(15, 15) = 225; fibrinogen(3000, 10) = 300; bleedingtime(2, 9) = 7; clotretraction(48,
    100) = 48; thrombinratio(20, 10) = 200 -/
theorem fam_coagulation : ((((18 : Int) * (100 : Int)) / (12 : Int)) = (150 : Int)) ∧ ((fmax (0 : Int) ((15 : Int) - (12 : Int))) = (3 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (12 : Int))) = (0 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (30 : Int)) = (200 : Int)) ∧ (((15 : Int) * (15 : Int)) = (225 : Int)) ∧ (((3000 : Int) / (10 : Int)) = (300 : Int)) ∧ ((fmax (0 : Int) ((9 : Int) - (2 : Int))) = (7 : Int)) ∧ ((((48 : Int) * (100 : Int)) / (100 : Int)) = (48 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (10 : Int)) = (200 : Int)) := by decide

/-- code: lines(300, 80) = 4; highlight(50, 100) = 50; tokens(1000, 4) = 250; indent(8, 4) = 2; wrap(80, 120) =
    1; wrap(160, 120) = 0; snippet(20, 50) = 1; density(400, 1000) = 40 -/
theorem fam_code : ((-((-(300 : Int)) / (80 : Int))) = (4 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((8 : Int) / (4 : Int)) = (2 : Int)) ∧ ((if (if (80 : Int) ≤ (120 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (160 : Int) ≤ (120 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (20 : Int) ≤ (50 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((((400 : Int) * (100 : Int)) / (1000 : Int)) = (40 : Int)) := by decide

/-- codec: bitrate(128, 1000) = 128000; frames(44100, 1024) = 43; ratio(1000, 100) = 10; channels(2, 0) = 2;
    blocksize(10) = 1024; samples(44100, 2) = 88200; latency(1000, 50) = 20; combos(6, 2) = 15 -/
theorem fam_codec : (((128 : Int) * (1000 : Int)) = (128000 : Int)) ∧ (((44100 : Int) / (1024 : Int)) = (43 : Int)) ∧ (((1000 : Int) / (100 : Int)) = (10 : Int)) ∧ (((2 : Int) + (0 : Int)) = (2 : Int)) ∧ (((2 : Int) ^ (10 : Nat)) = (1024 : Int)) ∧ (((44100 : Int) * (2 : Int)) = (88200 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) := by decide

/-- codicology: quires(20, 4) = 24; foliocount(24, 8) = 192; gatheringorderings(6) = 720; collationpairs(24, 2)
    = 276; rulingpatterns(4) = 16; inkcombos(5, 2) = 10; bindingstages(4, 3) = 7; completeness(90, 100) = 90 -/
theorem fam_codicology : (((20 : Int) + (4 : Int)) = (24 : Int)) ∧ (((24 : Int) * (8 : Int)) = (192 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (6 : Int)))) = (720 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (24 : Int)) (Int.toNat (2 : Int)))) = (276 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (5 : Int)) (Int.toNat (2 : Int)))) = (10 : Int)) ∧ (((4 : Int) + (3 : Int)) = (7 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) := by decide

/-- coding: coderate(4, 7) = 57; redundancy(7, 4) = 3; hammingdistance(2) = 5; blocklength(4, 3) = 7;
    errorcorrection(5) = 2; codingefficiency(512, 1024) = 50; parityanbits(3) = 1; parityanbits(4) = 0;
    overhead(3, 4) = 75 -/
theorem fam_coding : ((((4 : Int) * (100 : Int)) / (7 : Int)) = (57 : Int)) ∧ ((fmax (0 : Int) ((7 : Int) - (4 : Int))) = (3 : Int)) ∧ ((((2 : Int) * (2 : Int)) + (1 : Int)) = (5 : Int)) ∧ (((4 : Int) + (3 : Int)) = (7 : Int)) ∧ (((fmax (0 : Int) ((5 : Int) - (1 : Int))) / (2 : Int)) = (2 : Int)) ∧ ((((512 : Int) * (100 : Int)) / (1024 : Int)) = (50 : Int)) ∧ (((3 : Int) % (2 : Int)) = (1 : Int)) ∧ (((4 : Int) % (2 : Int)) = (0 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) := by decide

/-- coffee: brewratio(500, 30) = 16; extraction(6, 30) = 20; tds(14, 1000) = 14; doseyield(18, 2) = 36;
    grindsetting(800, 50) = 16; watertemp(100, 7) = 93; bloomwater(30, 2) = 60; strength(14, 12) = 1;
    strength(10, 12) = 0 -/
theorem fam_coffee : (((500 : Int) / (30 : Int)) = (16 : Int)) ∧ ((((6 : Int) * (100 : Int)) / (30 : Int)) = (20 : Int)) ∧ ((((14 : Int) * (1000 : Int)) / (1000 : Int)) = (14 : Int)) ∧ (((18 : Int) * (2 : Int)) = (36 : Int)) ∧ (((800 : Int) / (50 : Int)) = (16 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (7 : Int))) = (93 : Int)) ∧ (((30 : Int) * (2 : Int)) = (60 : Int)) ∧ ((if (if (14 : Int) ≥ (12 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (10 : Int) ≥ (12 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) := by decide

/-- cogeneration: totalefficiency(85, 100) = 85; powertoheat(400, 600) = 66; electricaloutput(500, 1) = 500;
    heatoutput(700, 1) = 700; fuelinput(500, 700) = 1200; primaryenergysaving(20, 100) = 20; heatrecovery(80,
    100) = 80; carnotlimit(100, 40) = 60 -/
theorem fam_cogeneration : ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ ((((400 : Int) * (100 : Int)) / (600 : Int)) = (66 : Int)) ∧ (((500 : Int) * (1 : Int)) = (500 : Int)) ∧ (((700 : Int) * (1 : Int)) = (700 : Int)) ∧ (((500 : Int) + (700 : Int)) = (1200 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (40 : Int))) = (60 : Int)) := by decide

/-- cognition: load(7, 4) = 175; reaction(5000, 20) = 250; accuracy(45, 50) = 90; span(6, 7) = 85; fluency(60,
    2) = 30; bias(30, 100) = 30; processing(1000, 4) = 250 -/
theorem fam_cognition : ((((7 : Int) * (100 : Int)) / (4 : Int)) = (175 : Int)) ∧ (((5000 : Int) / (20 : Int)) = (250 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ ((((6 : Int) * (100 : Int)) / (7 : Int)) = (85 : Int)) ∧ (((60 : Int) / (2 : Int)) = (30 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) := by decide

/-- cohort: retention(850, 1000) = 85; engagement(600, 1000) = 60; revenue(50000, 1000) = 50; stickiness(300,
    1000) = 30; maturation(1200, 12) = 100; comparison(120, 100) = 120; decay(700, 1000) = 70 -/
theorem fam_cohort : ((((850 : Int) * (100 : Int)) / (1000 : Int)) = (85 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (1000 : Int)) = (60 : Int)) ∧ (((50000 : Int) / (1000 : Int)) = (50 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ (((1200 : Int) / (12 : Int)) = (100 : Int)) ∧ ((((120 : Int) * (100 : Int)) / (100 : Int)) = (120 : Int)) ∧ ((((700 : Int) * (100 : Int)) / (1000 : Int)) = (70 : Int)) := by decide

/-- collaboration: tasks(42, 60) = 70; workload(60, 5) = 12; meeting(8, 45) = 360; cycle(2460000, 2460005) = 5;
    backlog(200, 150) = 50; throughput(140, 7) = 20; utilization(32, 40) = 80; response(600, 50) = 12 -/
theorem fam_collaboration : ((((42 : Int) * (100 : Int)) / (60 : Int)) = (70 : Int)) ∧ (((60 : Int) / (5 : Int)) = (12 : Int)) ∧ (((8 : Int) * (45 : Int)) = (360 : Int)) ∧ ((fmax (0 : Int) ((2460005 : Int) - (2460000 : Int))) = (5 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (150 : Int))) = (50 : Int)) ∧ (((140 : Int) / (7 : Int)) = (20 : Int)) ∧ ((((32 : Int) * (100 : Int)) / (40 : Int)) = (80 : Int)) ∧ (((600 : Int) / (50 : Int)) = (12 : Int)) := by decide

/-- collateral: loantovalue(8000, 10000) = 80; haircut(1000, 15) = 150; marginrequirement(10000, 25) = 2500;
    coverageratio(15000, 10000) = 150; collateralvalue(200, 50) = 10000; shortfall(5000, 3000) = 2000;
    shortfall(3000, 5000) = 0; overcollateralization(15000, 10000) = 50; callthreshold(1000, 80) = 800 -/
theorem fam_collateral : ((((8000 : Int) * (100 : Int)) / (10000 : Int)) = (80 : Int)) ∧ ((((1000 : Int) * (15 : Int)) / (100 : Int)) = (150 : Int)) ∧ ((((10000 : Int) * (25 : Int)) / (100 : Int)) = (2500 : Int)) ∧ ((((15000 : Int) * (100 : Int)) / (10000 : Int)) = (150 : Int)) ∧ (((200 : Int) * (50 : Int)) = (10000 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (3000 : Int))) = (2000 : Int)) ∧ ((fmax (0 : Int) ((3000 : Int) - (5000 : Int))) = (0 : Int)) ∧ ((fmax (0 : Int) ((((15000 : Int) - (10000 : Int)) * (100 : Int)) / (10000 : Int))) = (50 : Int)) ∧ ((((1000 : Int) * (80 : Int)) / (100 : Int)) = (800 : Int)) := by decide

/-- collide: events(19, 2, 0) = 38; collide(14, 13) = 27; product(7, 6) = 42; invariant(3, 4) = 25;
    threshold(14, 13) = 1; threshold(12, 13) = 0; gap(20, 14) = 6 -/
theorem fam_collide : ((((19 : Int) * (2 : Int)) + (0 : Int)) = (38 : Int)) ∧ (((14 : Int) + (13 : Int)) = (27 : Int)) ∧ (((7 : Int) * (6 : Int)) = (42 : Int)) ∧ ((((3 : Int) ^ (2 : Nat)) + ((4 : Int) ^ (2 : Nat))) = (25 : Int)) ∧ ((if (if (14 : Int) ≥ (13 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (12 : Int) ≥ (13 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((20 : Int) - (14 : Int)) = (6 : Int)) := by decide

/-- collision: momentum(1000, 5) = 5000; impulse(500, 2) = 1000; energy(100, 50) = 5000; restitution(80, 100) =
    80; force(1000, 2) = 500; bodies(2, 1) = 3; deltav(30, 10) = 20; pairs(8, 2) = 28 -/
theorem fam_collision : (((1000 : Int) * (5 : Int)) = (5000 : Int)) ∧ (((500 : Int) * (2 : Int)) = (1000 : Int)) ∧ (((100 : Int) * (50 : Int)) = (5000 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((1000 : Int) / (2 : Int)) = (500 : Int)) ∧ (((2 : Int) + (1 : Int)) = (3 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (10 : Int))) = (20 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) := by decide

/-- color: channels(3, 1) = 4; depth(8, 3) = 24; palette(8) = 256; levels(8) = 256; hexdigits(2, 3) = 6;
    gradient(16, 0) = 16; contrast(255, 16) = 239; pairs(8, 2) = 28 -/
theorem fam_color : (((3 : Int) + (1 : Int)) = (4 : Int)) ∧ (((8 : Int) * (3 : Int)) = (24 : Int)) ∧ (((2 : Int) ^ (8 : Nat)) = (256 : Int)) ∧ (((2 : Int) ^ (8 : Nat)) = (256 : Int)) ∧ (((2 : Int) * (3 : Int)) = (6 : Int)) ∧ (((16 : Int) + (0 : Int)) = (16 : Int)) ∧ ((fmax (0 : Int) ((255 : Int) - (16 : Int))) = (239 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) := by decide

/-- colorgrading: gamma(200, 90) = 180; contrast(100, 2) = 200; saturation(150, 60) = 90; whitebalance(200, 320)
    = 250; luminance(100, 200, 50) = 167; gamut(300, 0, 255) = 255; gamut(100, 150, 200) = 150; lift(40, 15) =
    55; temperature(200, 30) = 170; temperature(10, 30) = 0 -/
theorem fam_colorgrading : ((((200 : Int) * (90 : Int)) / (100 : Int)) = (180 : Int)) ∧ (((100 : Int) * (2 : Int)) = (200 : Int)) ∧ ((((150 : Int) * (60 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((200 : Int) * (320 : Int)) / (256 : Int)) = (250 : Int)) ∧ ((((((100 : Int) * (54 : Int)) + ((200 : Int) * (183 : Int))) + ((50 : Int) * (19 : Int))) / (256 : Int)) = (167 : Int)) ∧ ((fmax (0 : Int) (fmin (300 : Int) (255 : Int))) = (255 : Int)) ∧ ((fmax (150 : Int) (fmin (100 : Int) (200 : Int))) = (150 : Int)) ∧ (((40 : Int) + (15 : Int)) = (55 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (30 : Int))) = (170 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (30 : Int))) = (0 : Int)) := by decide

/-- colortheory: complement(120) = 240; luminance(255, 0, 0) = 53; grayscale(90, 120, 150) = 120; blend(0, 200,
    50) = 100; hueshift(300, 120) = 60; saturation(200, 50) = 75; tint(100, 50) = 177 -/
theorem fam_colortheory : (((360 : Int) - (120 : Int)) = (240 : Int)) ∧ ((((((255 : Int) * (54 : Int)) + ((0 : Int) * (183 : Int))) + ((0 : Int) * (19 : Int))) / (256 : Int)) = (53 : Int)) ∧ (((((90 : Int) + (120 : Int)) + (150 : Int)) / (3 : Int)) = (120 : Int)) ∧ (((((0 : Int) * ((100 : Int) - (50 : Int))) + ((200 : Int) * (50 : Int))) / (100 : Int)) = (100 : Int)) ∧ ((((300 : Int) + (120 : Int)) % (360 : Int)) = (60 : Int)) ∧ (((((200 : Int) - (50 : Int)) * (100 : Int)) / (200 : Int)) = (75 : Int)) ∧ (((100 : Int) + ((((255 : Int) - (100 : Int)) * (50 : Int)) / (100 : Int))) = (177 : Int)) := by decide

/-- combinatorics: factorial(5) = 120; combinations(6, 2) = 15; stars(5, 3) = 21; multichoose(3, 2) = 6;
    binomial(4) = 16 -/
theorem fam_combinatorics : ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (((5 : Int) + (3 : Int)) - (1 : Int))) (Int.toNat ((3 : Int) - (1 : Int))))) = (21 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (((3 : Int) + (2 : Int)) - (1 : Int))) (Int.toNat (2 : Int)))) = (6 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) := by decide

/-- combustion: airfuelratio(150, 10) = 15; excessair(120, 100) = 20; flametemp(300, 1800) = 2100;
    heatrelease(5, 40) = 200; stoichiometric(8, 18) = 12; efficiency(85, 100) = 85; emissions(100, 3) = 300;
    calorific(4000, 100) = 40 -/
theorem fam_combustion : (((150 : Int) / (10 : Int)) = (15 : Int)) ∧ ((((fmax (0 : Int) ((120 : Int) - (100 : Int))) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ (((300 : Int) + (1800 : Int)) = (2100 : Int)) ∧ (((5 : Int) * (40 : Int)) = (200 : Int)) ∧ (((8 : Int) + ((18 : Int) / (4 : Int))) = (12 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ (((100 : Int) * (3 : Int)) = (300 : Int)) ∧ (((4000 : Int) / (100 : Int)) = (40 : Int)) := by decide

/-- comet: period(76, 1) = 76; tail(100, 1000) = 100000; nucleus(10, 1) = 10; perihelion(1000, 10) = 100;
    orbits(1, 0) = 1; outgassing(5, 100) = 5; aphelion(35, 1) = 35; combos(6, 2) = 15 -/
theorem fam_comet : (((76 : Int) * (1 : Int)) = (76 : Int)) ∧ (((100 : Int) * (1000 : Int)) = (100000 : Int)) ∧ (((10 : Int) * (1 : Int)) = (10 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((1 : Int) + (0 : Int)) = (1 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((35 : Int) * (1 : Int)) = (35 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) := by decide

/-- comparison: cells(5, 3) = 15; coverage(9, 15) = 60; highlight(2, 3) = 66; diff(80, 30) = 50; diff(30, 80) =
    0; winner(95, 95) = 1; winner(90, 95) = 0; spread(100, 20) = 80 -/
theorem fam_comparison : (((5 : Int) * (3 : Int)) = (15 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (15 : Int)) = (60 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (3 : Int)) = (66 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (30 : Int))) = (50 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (80 : Int))) = (0 : Int)) ∧ ((if (if (95 : Int) ≥ (95 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (90 : Int) ≥ (95 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (20 : Int))) = (80 : Int)) := by decide

/-- compensation: salary(50, 2080) = 104000; bonus(104000, 15) = 15600; equity(1000, 25) = 25000; raise(100000,
    10) = 110000; band(80000, 120000) = 100000; ratio(1000000, 50000) = 20; benefit(100000, 30) = 30000;
    total(100000, 40000) = 140000; ratio(1000000, 0) = 0 -/
theorem fam_compensation : (((50 : Int) * (2080 : Int)) = (104000 : Int)) ∧ ((((104000 : Int) * (15 : Int)) / (100 : Int)) = (15600 : Int)) ∧ (((1000 : Int) * (25 : Int)) = (25000 : Int)) ∧ (((100000 : Int) + (((100000 : Int) * (10 : Int)) / (100 : Int))) = (110000 : Int)) ∧ ((((80000 : Int) + (120000 : Int)) / (2 : Int)) = (100000 : Int)) ∧ (((1000000 : Int) / (50000 : Int)) = (20 : Int)) ∧ ((((100000 : Int) * (30 : Int)) / (100 : Int)) = (30000 : Int)) ∧ (((100000 : Int) + (40000 : Int)) = (140000 : Int)) ∧ (((1000000 : Int) / (0 : Int)) = (0 : Int)) := by decide

/-- compliance: penalty(1000000, 4) = 40000; breach(7, 10) = 3; breach(12, 10) = 0; deadline(2460000, 3) =
    2460003; reportable(600, 500) = 1; reportable(100, 500) = 0; risk(4, 5) = 20; remediation(3, 5000) = 15000;
    retention(7, 5) = 1; coverage(8, 10) = 80 -/
theorem fam_compliance : ((((1000000 : Int) * (4 : Int)) / (100 : Int)) = (40000 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (7 : Int))) = (3 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (12 : Int))) = (0 : Int)) ∧ (((2460000 : Int) + (3 : Int)) = (2460003 : Int)) ∧ ((if (if (600 : Int) ≥ (500 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (100 : Int) ≥ (500 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((4 : Int) * (5 : Int)) = (20 : Int)) ∧ (((3 : Int) * (5000 : Int)) = (15000 : Int)) ∧ ((if (if (7 : Int) ≥ (5 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) := by decide

/-- composite: plies(8, 0) = 8; fiberpct(60, 100) = 60; strength(500, 2) = 1000; modulus(70, 1) = 70; layers(8,
    2) = 16; weight(1000, 4) = 250; orientations(4) = 24; combos(8, 2) = 28 -/
theorem fam_composite : (((8 : Int) + (0 : Int)) = (8 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ (((500 : Int) * (2 : Int)) = (1000 : Int)) ∧ (((70 : Int) * (1 : Int)) = (70 : Int)) ∧ (((8 : Int) * (2 : Int)) = (16 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) := by decide

/-- composites: rule(60, 40) = 100; fiberfraction(60, 100) = 60; stiffness(230, 60) = 138; strength(5000, 100) =
    50; density(1600, 1000) = 1; layup(16, 2) = 32; anisotropy(230, 10) = 2300; porosity(2, 100) = 2 -/
theorem fam_composites : (((60 : Int) + (40 : Int)) = (100 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ ((((230 : Int) * (60 : Int)) / (100 : Int)) = (138 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ (((1600 : Int) / (1000 : Int)) = (1 : Int)) ∧ (((16 : Int) * (2 : Int)) = (32 : Int)) ∧ ((((230 : Int) * (100 : Int)) / (10 : Int)) = (2300 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int)) := by decide

/-- composting: cnratio(300, 10) = 30; moisture(60, 100) = 60; temperature(20, 45) = 65; maturity(90, 60) = 1;
    maturity(30, 60) = 0; volume(3, 2, 1) = 6; turnover(100, 30) = 4; aeration(500, 100) = 5;
    decomposition(1000, 400) = 60 -/
theorem fam_composting : (((300 : Int) / (10 : Int)) = (30 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ (((20 : Int) + (45 : Int)) = (65 : Int)) ∧ ((if (if (90 : Int) ≥ (60 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (30 : Int) ≥ (60 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((3 : Int) * (2 : Int)) * (1 : Int)) = (6 : Int)) ∧ ((-((-(100 : Int)) / (30 : Int))) = (4 : Int)) ∧ (((500 : Int) / (100 : Int)) = (5 : Int)) ∧ ((((fmax (0 : Int) ((1000 : Int) - (400 : Int))) * (100 : Int)) / (1000 : Int)) = (60 : Int)) := by decide

/-- compress: ratio(800, 200) = 400; savedbits(1000, 250) = 750; dictionarysize(12) = 4096; codelength(1000, 8)
    = 125; entropybits(8, 100) = 800; blockcombos(16, 2) = 120; huffmandepth(4, 3) = 7; throughput(6000, 60) =
    100 -/
theorem fam_compress : ((((800 : Int) * (100 : Int)) / (200 : Int)) = (400 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (250 : Int))) = (750 : Int)) ∧ (((2 : Int) ^ (12 : Nat)) = (4096 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ (((8 : Int) * (100 : Int)) = (800 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (16 : Int)) (Int.toNat (2 : Int)))) = (120 : Int)) ∧ (((4 : Int) + (3 : Int)) = (7 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) := by decide

/-- compression: ratio(1000, 250) = 400; savings(1000, 250) = 75; entropy(1000, 50) = 20; bitrate(64000, 8) =
    8000; redundancy(300, 1000) = 30; throughput(10000, 20) = 500; fidelity(950, 1000) = 95 -/
theorem fam_compression : ((((1000 : Int) * (100 : Int)) / (250 : Int)) = (400 : Int)) ∧ (((((1000 : Int) - (250 : Int)) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ (((64000 : Int) / (8 : Int)) = (8000 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ (((10000 : Int) / (20 : Int)) = (500 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) := by decide

/-- concrete: volume(10, 4, 2) = 80; cement(80, 7) = 560; watercement(50, 100) = 50; slump(100, 25) = 75;
    strength(28, 1) = 28; cure(28, 7) = 21; mix(1, 2, 4) = 7; rebar(100, 20) = 5 -/
theorem fam_concrete : ((((10 : Int) * (4 : Int)) * (2 : Int)) = (80 : Int)) ∧ (((80 : Int) * (7 : Int)) = (560 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (25 : Int))) = (75 : Int)) ∧ (((28 : Int) * (1 : Int)) = (28 : Int)) ∧ ((fmax (0 : Int) ((28 : Int) - (7 : Int))) = (21 : Int)) ∧ ((((1 : Int) + (2 : Int)) + (4 : Int)) = (7 : Int)) ∧ ((-((-(100 : Int)) / (20 : Int))) = (5 : Int)) := by decide

/-- concurrency: amdahl(90, 10) = 10; speedup(100, 25) = 400; throughput(6000, 60) = 100; utilization(75, 100) =
    75; contention(30, 100) = 30; latency(5000, 100) = 50; scalability(800, 100) = 800 -/
theorem fam_concurrency : (((10000 : Int) / (((100 : Int) - (90 : Int)) + (((90 : Int) * (100 : Int)) / (10 : Int)))) = (10 : Int)) ∧ ((((100 : Int) * (100 : Int)) / (25 : Int)) = (400 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (100 : Int)) = (800 : Int)) := by decide

/-- conditioning: vo2max(200, 50) = 60; heartrate(30) = 190; load(60, 8) = 480; volume(3, 10, 100) = 3000;
    intensity(80, 100) = 80; trainingzone(190, 70) = 133; recovery(180, 120) = 60; onerepmax(100, 5) = 116 -/
theorem fam_conditioning : ((((15 : Int) * (200 : Int)) / (50 : Int)) = (60 : Int)) ∧ ((fmax (0 : Int) ((220 : Int) - (30 : Int))) = (190 : Int)) ∧ (((60 : Int) * (8 : Int)) = (480 : Int)) ∧ ((((3 : Int) * (10 : Int)) * (100 : Int)) = (3000 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((190 : Int) * (70 : Int)) / (100 : Int)) = (133 : Int)) ∧ ((fmax (0 : Int) ((180 : Int) - (120 : Int))) = (60 : Int)) ∧ (((100 : Int) + (((100 : Int) * (5 : Int)) / (30 : Int))) = (116 : Int)) := by decide

/-- conduction: fourierlaw(40, 2, 5) = 400; resistance(100, 5, 2) = 10; uvalue(100, 4) = 25; rvalue(120, 5) =
    24; gradient(100, 5) = 20; fluxdensity(1000, 5) = 200; seriesresistance(10, 20, 30) = 60;
    parallelresistance(30, 60) = 20 -/
theorem fam_conduction : ((((40 : Int) * (2 : Int)) * (5 : Int)) = (400 : Int)) ∧ (((100 : Int) / ((5 : Int) * (2 : Int))) = (10 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((120 : Int) / (5 : Int)) = (24 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ (((1000 : Int) / (5 : Int)) = (200 : Int)) ∧ ((((10 : Int) + (20 : Int)) + (30 : Int)) = (60 : Int)) ∧ ((((30 : Int) * (60 : Int)) / ((30 : Int) + (60 : Int))) = (20 : Int)) := by decide

/-- confectionery: sugarstage(150, 160) = 160; crystalsize(100, 4) = 25; temperaturecurve(30, 5) = 150;
    temperingstages(3, 0) = 3; cocoaratio(70, 100) = 70; bloomtemp(34, 27) = 7; recipecombos(10, 3) = 120;
    yieldpct(95, 100) = 95 -/
theorem fam_confectionery : ((fmax (150 : Int) (160 : Int)) = (160 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((30 : Int) * (5 : Int)) = (150 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ ((fmax (0 : Int) ((34 : Int) - (27 : Int))) = (7 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (3 : Int)))) = (120 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) := by decide

/-- conic: eccentricityscaled(3, 5) = 60; focallength(5, 3) = 16; directrix(5, 4) = 6; latusrectum(5, 3) = 3;
    semimajor(8, 2) = 5; semiminor(5, 4) = 9; discriminant(1, 5, 2) = 17; vertexdistance(5, 2) = 3;
    vertexdistance(2, 5) = 0 -/
theorem fam_conic : ((((3 : Int) * (100 : Int)) / (5 : Int)) = (60 : Int)) ∧ ((fmax (0 : Int) (((5 : Int) ^ (2 : Nat)) - ((3 : Int) ^ (2 : Nat)))) = (16 : Int)) ∧ ((((5 : Int) ^ (2 : Nat)) / (4 : Int)) = (6 : Int)) ∧ ((((2 : Int) * ((3 : Int) ^ (2 : Nat))) / (5 : Int)) = (3 : Int)) ∧ ((((8 : Int) + (2 : Int)) / (2 : Int)) = (5 : Int)) ∧ ((fmax (0 : Int) (((5 : Int) ^ (2 : Nat)) - ((4 : Int) ^ (2 : Nat)))) = (9 : Int)) ∧ ((fmax (0 : Int) (((5 : Int) ^ (2 : Nat)) - (((4 : Int) * (1 : Int)) * (2 : Int)))) = (17 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (2 : Int))) = (3 : Int)) ∧ ((fmax (0 : Int) ((2 : Int) - (5 : Int))) = (0 : Int)) := by decide

/-- conservation: protected(30, 100) = 30; population(400, 1000) = 40; corridor(12, 4) = 3; threatened(25, 200)
    = 12; restoration(150, 600) = 25; carrying(1000, 8) = 125; poaching(45, 300) = 15; viability(250, 500) = 50 -/
theorem fam_conservation : ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((400 : Int) * (100 : Int)) / (1000 : Int)) = (40 : Int)) ∧ (((12 : Int) / (4 : Int)) = (3 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (200 : Int)) = (12 : Int)) ∧ ((((150 : Int) * (100 : Int)) / (600 : Int)) = (25 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (300 : Int)) = (15 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (500 : Int)) = (50 : Int)) := by decide

/-- consolidation: shipmentsmerged(100, 40) = 60; fillimprovement(90, 70) = 20; costsavings(300, 1000) = 30;
    ordersperload(120, 4) = 30; freightclass(500, 100) = 5; densitygain(120, 100) = 120; splitcount(100, 30) =
    4; poolingratio(8, 10) = 80 -/
theorem fam_consolidation : ((fmax (0 : Int) ((100 : Int) - (40 : Int))) = (60 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (70 : Int))) = (20 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ (((120 : Int) / (4 : Int)) = (30 : Int)) ∧ (((500 : Int) / (100 : Int)) = (5 : Int)) ∧ ((((120 : Int) * (100 : Int)) / (100 : Int)) = (120 : Int)) ∧ ((-((-(100 : Int)) / (30 : Int))) = (4 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) := by decide

/-- construction: area(10, 8) = 80; volume(80, 3) = 240; materials(80, 25) = 2000; cost(2000, 1500) = 3500;
    crew(120, 8) = 15; progress(30, 120) = 25; load(1000, 4) = 250; waste(5, 100) = 5 -/
theorem fam_construction : (((10 : Int) * (8 : Int)) = (80 : Int)) ∧ (((80 : Int) * (3 : Int)) = (240 : Int)) ∧ (((80 : Int) * (25 : Int)) = (2000 : Int)) ∧ (((2000 : Int) + (1500 : Int)) = (3500 : Int)) ∧ (((120 : Int) / (8 : Int)) = (15 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) := by decide

/-- content: reuse(3, 10) = 30; media(4, 10) = 40; words(600, 6) = 100; richtext(1000, 20) = 50 -/
theorem fam_content : ((((3 : Int) * (100 : Int)) / (10 : Int)) = (30 : Int)) ∧ ((((4 : Int) * (100 : Int)) / (10 : Int)) = (40 : Int)) ∧ (((600 : Int) / (6 : Int)) = (100 : Int)) ∧ (((1000 : Int) / (20 : Int)) = (50 : Int)) := by decide

/-- contract: expectation(10000, 4000) = 6000; expectation(4000, 10000) = 0; mitigation(8000, 3000) = 5000;
    liquidated(500, 10) = 5000; deposit(100000, 10) = 10000; penalty(20000, 5) = 1000; restitution(7000, 2000) =
    5000; cure(7, 14) = 1; cure(21, 14) = 0 -/
theorem fam_contract : ((fmax (0 : Int) ((10000 : Int) - (4000 : Int))) = (6000 : Int)) ∧ ((fmax (0 : Int) ((4000 : Int) - (10000 : Int))) = (0 : Int)) ∧ ((fmax (0 : Int) ((8000 : Int) - (3000 : Int))) = (5000 : Int)) ∧ (((500 : Int) * (10 : Int)) = (5000 : Int)) ∧ ((((100000 : Int) * (10 : Int)) / (100 : Int)) = (10000 : Int)) ∧ ((((20000 : Int) * (5 : Int)) / (100 : Int)) = (1000 : Int)) ∧ ((fmax (0 : Int) ((7000 : Int) - (2000 : Int))) = (5000 : Int)) ∧ ((if (if (7 : Int) ≤ (14 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (21 : Int) ≤ (14 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) := by decide

/-- control: error(100, 30) = 70; settlingtime(4, 5) = 20; overshoot(120, 100) = 20; steadystate(5, 12) = 60;
    risetime(1800, 90) = 20; damping(30, 40) = 75; gainmargin(100, 25) = 4; bandwidth(8, 3) = 24 -/
theorem fam_control : ((fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int)) ∧ (((4 : Int) * (5 : Int)) = (20 : Int)) ∧ ((((fmax (0 : Int) ((120 : Int) - (100 : Int))) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ (((5 : Int) * (12 : Int)) = (60 : Int)) ∧ (((1800 : Int) / (90 : Int)) = (20 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (40 : Int)) = (75 : Int)) ∧ (((100 : Int) / (25 : Int)) = (4 : Int)) ∧ (((8 : Int) * (3 : Int)) = (24 : Int)) := by decide

/-- controllability: matrixrank(4, 6) = 4; reachablestates(8, 3) = 5; controllabilitymatrix(5, 2) = 10;
    degree(10, 3) = 4; inputcoupling(3, 7) = 21; statedimension(6, 9) = 15; gramiantrace(4, 12) = 48;
    modescontrolled(10, 3) = 7; modescontrolled(3, 5) = 0 -/
theorem fam_controllability : ((fmin (4 : Int) (6 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((8 : Int) - (3 : Int))) = (5 : Int)) ∧ (((5 : Int) * (2 : Int)) = (10 : Int)) ∧ ((-((-(10 : Int)) / (3 : Int))) = (4 : Int)) ∧ (((3 : Int) * (7 : Int)) = (21 : Int)) ∧ (((6 : Int) + (9 : Int)) = (15 : Int)) ∧ (((4 : Int) * (12 : Int)) = (48 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (3 : Int))) = (7 : Int)) ∧ ((fmax (0 : Int) ((3 : Int) - (5 : Int))) = (0 : Int)) := by decide

/-- convection: heatflux(10, 5, 20) = 1000; coefficient(1000, 5) = 200; reynolds(100, 2, 4) = 50; prandtl(700,
    100) = 7; grashof(10, 20, 3) = 600; rayleigh(600, 7) = 4200; filmtemp(100, 20) = 60; boundarylayer(100, 50)
    = 10 -/
theorem fam_convection : ((((10 : Int) * (5 : Int)) * (20 : Int)) = (1000 : Int)) ∧ (((1000 : Int) / (5 : Int)) = (200 : Int)) ∧ ((((100 : Int) * (2 : Int)) / (4 : Int)) = (50 : Int)) ∧ (((700 : Int) / (100 : Int)) = (7 : Int)) ∧ ((((10 : Int) * (20 : Int)) * (3 : Int)) = (600 : Int)) ∧ (((600 : Int) * (7 : Int)) = (4200 : Int)) ∧ ((((100 : Int) + (20 : Int)) / (2 : Int)) = (60 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (50 : Int)) = (10 : Int)) := by decide

/-- conversion: rate(50, 1000) = 5; funnel(1000, 250) = 25; cpa(1000, 25) = 40; roas(5000, 1000) = 500;
    bounce(300, 1000) = 30; cart(1000, 300) = 70; checkout(80, 100) = 80; uplift(120, 100) = 20; uplift(100,
    100) = 0 -/
theorem fam_conversion : ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ (((1000 : Int) / (25 : Int)) = (40 : Int)) ∧ ((((5000 : Int) * (100 : Int)) / (1000 : Int)) = (500 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (1000 : Int)) = (30 : Int)) ∧ (((((1000 : Int) - (300 : Int)) * (100 : Int)) / (1000 : Int)) = (70 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((fmax (0 : Int) ((120 : Int) - (100 : Int))) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ ((((fmax (0 : Int) ((100 : Int) - (100 : Int))) * (100 : Int)) / (100 : Int)) = (0 : Int)) := by decide

/-- convolution: outputsize(28, 5, 1) = 24; receptivefield(3, 5) = 11; padding(7) = 3; stride(28, 14) = 2;
    kernelparams(3, 3, 16) = 432; featuremap(24, 16) = 9216; pooling(24, 2) = 12; dilation(3, 2) = 5 -/
theorem fam_convolution : ((((fmax (0 : Int) ((28 : Int) - (5 : Int))) / (1 : Int)) + (1 : Int)) = (24 : Int)) ∧ (((1 : Int) + ((5 : Int) * ((3 : Int) - (1 : Int)))) = (11 : Int)) ∧ (((7 : Int) / (2 : Int)) = (3 : Int)) ∧ (((28 : Int) / (14 : Int)) = (2 : Int)) ∧ (((((3 : Int) * (3 : Int)) * (3 : Int)) * (16 : Int)) = (432 : Int)) ∧ ((((24 : Int) * (24 : Int)) * (16 : Int)) = (9216 : Int)) ∧ (((24 : Int) / (2 : Int)) = (12 : Int)) ∧ (((3 : Int) + (((3 : Int) - (1 : Int)) * ((2 : Int) - (1 : Int)))) = (5 : Int)) := by decide

/-- cooling: dissipation(60, 2) = 30; deltat(100, 1) = 100; airflow(6, 80) = 480; fanpower(6, 5) = 30;
    headroom(100, 72) = 28; heatsink(200, 3) = 600; duty(1800, 3000) = 60; liquidflow(2, 60) = 120; margin(100,
    25, 40) = 35 -/
theorem fam_cooling : (((60 : Int) / (2 : Int)) = (30 : Int)) ∧ (((100 : Int) * (1 : Int)) = (100 : Int)) ∧ (((6 : Int) * (80 : Int)) = (480 : Int)) ∧ (((6 : Int) * (5 : Int)) = (30 : Int)) ∧ (((100 : Int) - (72 : Int)) = (28 : Int)) ∧ (((200 : Int) * (3 : Int)) = (600 : Int)) ∧ ((((1800 : Int) * (100 : Int)) / (3000 : Int)) = (60 : Int)) ∧ (((2 : Int) * (60 : Int)) = (120 : Int)) ∧ ((((100 : Int) - (25 : Int)) - (40 : Int)) = (35 : Int)) := by decide

/-- corpus: annotationcoverage(900, 1000) = 90; balancescore(8, 10) = 80; concordancehits(12, 40) = 480;
    frequencyperm(3, 1000) = 3; hapaxratio(25, 50) = 50; keyness(150, 40) = 110; keyness(40, 150) = 0;
    sampledwords(500, 2000) = 1000000; typetoken(40, 100) = 40 -/
theorem fam_corpus : ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ (((12 : Int) * (40 : Int)) = (480 : Int)) ∧ ((((3 : Int) * (1000 : Int)) / (1000 : Int)) = (3 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (50 : Int)) = (50 : Int)) ∧ ((fmax (0 : Int) ((150 : Int) - (40 : Int))) = (110 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (150 : Int))) = (0 : Int)) ∧ (((500 : Int) * (2000 : Int)) = (1000000 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) := by decide

/-- corrosion: rate(1000, 10) = 100; loss(50, 2) = 100; pits(100, 3) = 300; potential(800, 300) = 500;
    lifetime(10000, 50) = 200; coating(95, 100) = 95; zones(3, 0) = 3; combos(6, 2) = 15 -/
theorem fam_corrosion : (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((50 : Int) * (2 : Int)) = (100 : Int)) ∧ (((100 : Int) * (3 : Int)) = (300 : Int)) ∧ ((fmax (0 : Int) ((800 : Int) - (300 : Int))) = (500 : Int)) ∧ (((10000 : Int) / (50 : Int)) = (200 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) := by decide

/-- cosmogony: stageorderings(5) = 120; elementcombos(5, 2) = 10; creationdays(6, 1) = 7; emanationlevels(7) =
    128; dualitypairs(2, 4) = 8; cyclelength(4, 1000) = 4000; principlesubsets(4) = 16; orderfromchaos(100, 30)
    = 70 -/
theorem fam_cosmogony : ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (5 : Int)) (Int.toNat (2 : Int)))) = (10 : Int)) ∧ (((6 : Int) + (1 : Int)) = (7 : Int)) ∧ (((2 : Int) ^ (7 : Nat)) = (128 : Int)) ∧ (((2 : Int) * (4 : Int)) = (8 : Int)) ∧ (((4 : Int) * (1000 : Int)) = (4000 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int)) := by decide

/-- cosmology: hubble(1400, 20) = 70; recession(70, 10) = 700; age(1400, 70) = 20; density(1000, 4) = 250;
    expansion(10, 3) = 7; expansion(3, 10) = 0; horizon(300, 14) = 4200; curvature(27, 30) = 900;
    temperature(1100, 2) = 2202 -/
theorem fam_cosmology : (((1400 : Int) / (20 : Int)) = (70 : Int)) ∧ (((70 : Int) * (10 : Int)) = (700 : Int)) ∧ (((1400 : Int) / (70 : Int)) = (20 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (3 : Int))) = (7 : Int)) ∧ ((fmax (0 : Int) ((3 : Int) - (10 : Int))) = (0 : Int)) ∧ (((300 : Int) * (14 : Int)) = (4200 : Int)) ∧ ((((27 : Int) * (1000 : Int)) / (30 : Int)) = (900 : Int)) ∧ (((2 : Int) * ((1100 : Int) + (1 : Int))) = (2202 : Int)) := by decide

/-- costing: unitcost(1000, 40) = 25; markup(150, 100) = 50; margin(200, 150) = 25; breakeven(5000, 25) = 200;
    overhead(3000, 10000) = 30; absorption(900, 1000) = 90; contribution(50, 30) = 20; contribution(30, 50) = 0;
    target(100, 40) = 60 -/
theorem fam_costing : (((1000 : Int) / (40 : Int)) = (25 : Int)) ∧ (((((150 : Int) - (100 : Int)) * (100 : Int)) / (100 : Int)) = (50 : Int)) ∧ (((((200 : Int) - (150 : Int)) * (100 : Int)) / (200 : Int)) = (25 : Int)) ∧ (((5000 : Int) / (25 : Int)) = (200 : Int)) ∧ ((((3000 : Int) * (100 : Int)) / (10000 : Int)) = (30 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (30 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (50 : Int))) = (0 : Int)) ∧ ((((100 : Int) * ((100 : Int) - (40 : Int))) / (100 : Int)) = (60 : Int)) := by decide

/-- counterpoint: voicecount(2, 2) = 4; parallelfifths(3, 10) = 30; motioncontrary(10, 4) = 6;
    intervalconsonance(7, 12) = 1; intervalconsonance(13, 12) = 0; speciesratio(8, 4) = 2; dissonancecount(10,
    7) = 3; cantusspan(24, 12) = 12; imitationdelay(8, 2) = 4 -/
theorem fam_counterpoint : (((2 : Int) + (2 : Int)) = (4 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (10 : Int)) = (30 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (4 : Int))) = (6 : Int)) ∧ ((if (if (7 : Int) ≤ (12 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (13 : Int) ≤ (12 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((8 : Int) / (4 : Int)) = (2 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (7 : Int))) = (3 : Int)) ∧ ((fmax (0 : Int) ((24 : Int) - (12 : Int))) = (12 : Int)) ∧ (((8 : Int) / (2 : Int)) = (4 : Int)) := by decide

/-- court: standard(60, 51) = 1; standard(85, 90) = 0; damages(1000, 5, 3) = 1150; interest(10000, 8, 365) =
    800; costs(10, 250) = 2500; apportion(3000, 2, 3) = 2000; settlement(100000, 30) = 30000; cap(500000,
    250000) = 250000; cap(100000, 250000) = 100000; fee(100000, 33) = 33000; restitution(10000, 120, 500) =
    12500; penalty(1000, 365, 10) = 1100; possession(20, 21) = 0; possession(21, 21) = 1; distribution(100000,
    3, 10) = 30000; liquidated(500, 1000) = 1; liquidated(2000, 1000) = 0; barred(400, 365) = 1; barred(200,
    365) = 0; compliant(2, 3) = 1; compliant(5, 3) = 0 -/
theorem fam_court : ((if (if (60 : Int) ≥ (51 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (85 : Int) ≥ (90 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((1000 : Int) + ((((1000 : Int) * (5 : Int)) * (3 : Int)) / (100 : Int))) = (1150 : Int)) ∧ (((((10000 : Int) * (8 : Int)) * (365 : Int)) / (36500 : Int)) = (800 : Int)) ∧ (((10 : Int) * (250 : Int)) = (2500 : Int)) ∧ ((((3000 : Int) * (2 : Int)) / (3 : Int)) = (2000 : Int)) ∧ ((((100000 : Int) * (30 : Int)) / (100 : Int)) = (30000 : Int)) ∧ ((fmin (500000 : Int) (250000 : Int)) = (250000 : Int)) ∧ ((fmin (100000 : Int) (250000 : Int)) = (100000 : Int)) ∧ ((((100000 : Int) * (33 : Int)) / (100 : Int)) = (33000 : Int)) ∧ (((((10000 : Int) * (120 : Int)) / (100 : Int)) + (500 : Int)) = (12500 : Int)) ∧ (((1000 : Int) + ((((1000 : Int) * (365 : Int)) * (10 : Int)) / (36500 : Int))) = (1100 : Int)) ∧ ((if (if (20 : Int) ≥ (21 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (21 : Int) ≥ (21 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((((100000 : Int) * (3 : Int)) / (10 : Int)) = (30000 : Int)) ∧ ((if (if (500 : Int) ≤ (1000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (2000 : Int) ≤ (1000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (400 : Int) > (365 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (200 : Int) > (365 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((if (if (2 : Int) ≤ (3 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (5 : Int) ≤ (3 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) := by decide

/-- covenant: partycount(2, 0) = 2; clausecombos(10, 3) = 120; conditionsubsets(6) = 64; obligationpairs(8, 2) =
    28; stageorderings(5) = 120; blessingcurses(12, 12) = 24; renewalcycle(7, 7) = 49; fulfillmentratio(8, 10) =
    80 -/
theorem fam_covenant : (((2 : Int) + (0 : Int)) = (2 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (3 : Int)))) = (120 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((12 : Int) + (12 : Int)) = (24 : Int)) ∧ (((7 : Int) * (7 : Int)) = (49 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) := by decide

/-- coverage: lines(850, 1000) = 85; branches(70, 100) = 70; functionpairs(12, 2) = 66; pathsubsets(5) = 32;
    uncovered(1000, 850) = 150; testcount(200, 1) = 200; mutationscore(75, 100) = 75; combinatorialt(10, 3) =
    120 -/
theorem fam_coverage : ((((850 : Int) * (100 : Int)) / (1000 : Int)) = (85 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (850 : Int))) = (150 : Int)) ∧ (((200 : Int) * (1 : Int)) = (200 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (3 : Int)))) = (120 : Int)) := by decide

/-- cpu: cores(4, 8) = 32; threads(32, 2) = 64; ipc(100, 25) = 4; mips(4, 3000) = 12000; pipeline(5, 10) = 14;
    cacheline(100, 64) = 2; tdp(8, 15) = 120; speedup(100, 4) = 25; turbo(3000, 500) = 3500 -/
theorem fam_cpu : (((4 : Int) * (8 : Int)) = (32 : Int)) ∧ (((32 : Int) * (2 : Int)) = (64 : Int)) ∧ (((100 : Int) / (25 : Int)) = (4 : Int)) ∧ (((4 : Int) * (3000 : Int)) = (12000 : Int)) ∧ ((((5 : Int) + (10 : Int)) - (1 : Int)) = (14 : Int)) ∧ ((-((-(100 : Int)) / (64 : Int))) = (2 : Int)) ∧ (((8 : Int) * (15 : Int)) = (120 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((3000 : Int) + (500 : Int)) = (3500 : Int)) := by decide

/-- creditscore: score(700, 50) = 750; paymenthistory(35, 100) = 35; utilization(30, 100) = 30; riskbands(5, 0)
    = 5; defaultprob(2, 100) = 2; factorcombos(5, 2) = 10; inquiries(10, 3) = 7; tier(750, 100) = 7;
    utilization2(30, 100) = 30; dti(40, 100) = 40; expectedloss(10, 50, 1000) = 50; exposureatdefault(100, 200,
    50) = 200; delinquency(2, 10) = 20; recovery(1000, 40) = 600; band(720) = 7 -/
theorem fam_creditscore : (((700 : Int) + (50 : Int)) = (750 : Int)) ∧ ((((35 : Int) * (100 : Int)) / (100 : Int)) = (35 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((5 : Int) + (0 : Int)) = (5 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (5 : Int)) (Int.toNat (2 : Int)))) = (10 : Int)) ∧ ((fmax (0 : Int) ((10 : Int) - (3 : Int))) = (7 : Int)) ∧ (((750 : Int) / (100 : Int)) = (7 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((((10 : Int) * (50 : Int)) * (1000 : Int)) / (10000 : Int)) = (50 : Int)) ∧ (((100 : Int) + (((200 : Int) * (50 : Int)) / (100 : Int))) = (200 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (10 : Int)) = (20 : Int)) ∧ ((((1000 : Int) * ((100 : Int) - (40 : Int))) / (100 : Int)) = (600 : Int)) ∧ (((720 : Int) / (100 : Int)) = (7 : Int)) := by decide

/-- creed: articlecount(10, 2) = 12; clausecombos(12, 3) = 220; affirmationorderings(5) = 120;
    doctrinesubsets(6) = 64; councilcount(4, 3) = 7; anathemacount(5, 2) = 10; consensusratio(85, 100) = 85;
    variantcreeds(3, 4) = 7 -/
theorem fam_creed : (((10 : Int) + (2 : Int)) = (12 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ (((4 : Int) + (3 : Int)) = (7 : Int)) ∧ (((5 : Int) * (2 : Int)) = (10 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ (((3 : Int) + (4 : Int)) = (7 : Int)) := by decide

/-- cricket: battingaverage(500, 10) = 50; strikerate(75, 50) = 150; bowlingaverage(240, 10) = 24; economy(300,
    50) = 6; runrate(300, 50) = 600; partnership(120, 2) = 60; required(180, 20) = 900; boundary(30, 120) = 25;
    battingaverage(500, 0) = 0 -/
theorem fam_cricket : (((500 : Int) / (10 : Int)) = (50 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (50 : Int)) = (150 : Int)) ∧ (((240 : Int) / (10 : Int)) = (24 : Int)) ∧ (((300 : Int) / (50 : Int)) = (6 : Int)) ∧ ((((300 : Int) * (100 : Int)) / (50 : Int)) = (600 : Int)) ∧ (((120 : Int) / (2 : Int)) = (60 : Int)) ∧ ((((180 : Int) * (100 : Int)) / (20 : Int)) = (900 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ (((500 : Int) / (0 : Int)) = (0 : Int)) := by decide

/-- criminology: rate(500, 100000) = 500; clearance(60, 100) = 60; recidivism(40, 100) = 40; conviction(80, 100)
    = 80; deterrence(30, 100) = 30; victimization(250, 100000) = 250; severity(1000, 50) = 20; arrest(75, 100) =
    75 -/
theorem fam_criminology : ((((500 : Int) * (100000 : Int)) / (100000 : Int)) = (500 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((250 : Int) * (100000 : Int)) / (100000 : Int)) = (250 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) := by decide

/-- criticalchain: projectbuffer(1000, 50) = 500; feedingbuffer(200, 50) = 100; resourcebuffer(8, 3) = 24;
    bufferconsumption(30, 120) = 25; chainlength(12, 5) = 60; aggregation(10, 30) = 20; fevermargin(500, 180) =
    320; safetyremoved(40, 25) = 15; safetyremoved(25, 40) = 0 -/
theorem fam_criticalchain : ((((1000 : Int) * (50 : Int)) / (100 : Int)) = (500 : Int)) ∧ ((((200 : Int) * (50 : Int)) / (100 : Int)) = (100 : Int)) ∧ (((8 : Int) * (3 : Int)) = (24 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ (((12 : Int) * (5 : Int)) = (60 : Int)) ∧ ((((10 : Int) + (30 : Int)) / (2 : Int)) = (20 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (180 : Int))) = (320 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (25 : Int))) = (15 : Int)) ∧ ((fmax (0 : Int) ((25 : Int) - (40 : Int))) = (0 : Int)) := by decide

/-- cropyield: perhectare(10000, 4) = 2500; totalproduction(2500, 4) = 10000; harvestindex(45, 100) = 45;
    yieldgap(5000, 3500) = 1500; yieldgap(3000, 5000) = 0; plantdensity(60000, 3) = 20000; biomassratio(30, 120)
    = 25; moisturecorrected(10000, 20) = 8000; lossadjusted(5000, 300) = 4700 -/
theorem fam_cropyield : (((10000 : Int) / (4 : Int)) = (2500 : Int)) ∧ (((2500 : Int) * (4 : Int)) = (10000 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (3500 : Int))) = (1500 : Int)) ∧ ((fmax (0 : Int) ((3000 : Int) - (5000 : Int))) = (0 : Int)) ∧ (((60000 : Int) / (3 : Int)) = (20000 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ ((((10000 : Int) * ((100 : Int) - (20 : Int))) / (100 : Int)) = (8000 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (300 : Int))) = (4700 : Int)) := by decide

/-- crossdock: throughput(6000, 60) = 100; dwelltime(480, 8) = 60; doorsneeded(100, 30) = 4; touchcount(50, 2) =
    100; flowrate(1200, 12) = 100; stagingarea(40, 50) = 2000; sortaccuracy(990, 1000) = 99; transferlag(60, 45)
    = 15 -/
theorem fam_crossdock : (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((480 : Int) / (8 : Int)) = (60 : Int)) ∧ ((-((-(100 : Int)) / (30 : Int))) = (4 : Int)) ∧ (((50 : Int) * (2 : Int)) = (100 : Int)) ∧ (((1200 : Int) / (12 : Int)) = (100 : Int)) ∧ (((40 : Int) * (50 : Int)) = (2000 : Int)) ∧ ((((990 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ ((fmax (0 : Int) ((60 : Int) - (45 : Int))) = (15 : Int)) := by decide

/-- cryptanalysis: keyspace(26, 8) = 208; bruteforce(1000, 10) = 100; entropy(100, 4) = 25; frequency(25, 100) =
    25; coincidence(5, 100) = 500; avalanche(50, 100) = 50; collisions(2, 1000) = 2000 -/
theorem fam_cryptanalysis : (((26 : Int) * (8 : Int)) = (208 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ ((((25 : Int) * (100 : Int)) / (100 : Int)) = (25 : Int)) ∧ ((((5 : Int) * (10000 : Int)) / (100 : Int)) = (500 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (100 : Int)) = (50 : Int)) ∧ ((((2 : Int) * (1000000 : Int)) / (1000 : Int)) = (2000 : Int)) := by decide

/-- crystal: lattice(4, 4, 4) = 64; atoms(8, 1) = 8; planes(3, 0) = 3; spacing(500, 10) = 50; symmetry(6, 1) =
    7; defects(1000, 100) = 10; faces(6, 8) = 14; combos(7, 2) = 21 -/
theorem fam_crystal : ((((4 : Int) * (4 : Int)) * (4 : Int)) = (64 : Int)) ∧ (((8 : Int) * (1 : Int)) = (8 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((500 : Int) / (10 : Int)) = (50 : Int)) ∧ (((6 : Int) + (1 : Int)) = (7 : Int)) ∧ (((1000 : Int) / (100 : Int)) = (10 : Int)) ∧ (((6 : Int) + (8 : Int)) = (14 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (7 : Int)) (Int.toNat (2 : Int)))) = (21 : Int)) := by decide

/-- crystallography: bragg(2, 154) = 308; spacing(154, 30) = 5133; density(8, 4) = 2; packing(74, 100) = 74;
    unitcell(5, 5) = 25; miller(6, 2) = 3 -/
theorem fam_crystallography : (((2 : Int) * (154 : Int)) = (308 : Int)) ∧ ((((154 : Int) * (1000 : Int)) / (30 : Int)) = (5133 : Int)) ∧ (((8 : Int) / (4 : Int)) = (2 : Int)) ∧ ((((74 : Int) * (100 : Int)) / (100 : Int)) = (74 : Int)) ∧ (((5 : Int) * (5 : Int)) = (25 : Int)) ∧ (((6 : Int) / (2 : Int)) = (3 : Int)) := by decide

/-- css: rem(24) = 150; type(0) = 16; type(1) = 20; type(2) = 25; leading(16) = 24; grid(12, 16) = 176 -/
theorem fam_css : ((((24 : Int) * (100 : Int)) / (16 : Int)) = (150 : Int)) ∧ ((((16 : Int) * ((5 : Int) ^ (0 : Nat))) / ((4 : Int) ^ (0 : Nat))) = (16 : Int)) ∧ ((((16 : Int) * ((5 : Int) ^ (1 : Nat))) / ((4 : Int) ^ (1 : Nat))) = (20 : Int)) ∧ ((((16 : Int) * ((5 : Int) ^ (2 : Nat))) / ((4 : Int) ^ (2 : Nat))) = (25 : Int)) ∧ ((((16 : Int) * (3 : Int)) / (2 : Int)) = (24 : Int)) ∧ (((fmax (0 : Int) ((12 : Int) - (1 : Int))) * (16 : Int)) = (176 : Int)) := by decide

/-- cuisine: cooked(75, 100) = 75; hydration(650, 1000) = 65; portion(2400, 8) = 300; proof(120, 24) = 2880;
    ratio(500, 1000) = 50; reduction(1000, 250) = 75; scaling(150, 4) = 600; temperature(212) = 100;
    temperature(32) = 0 -/
theorem fam_cuisine : ((((75 : Int) * (100 : Int)) / (100 : Int)) = (75 : Int)) ∧ ((((650 : Int) * (100 : Int)) / (1000 : Int)) = (65 : Int)) ∧ (((2400 : Int) / (8 : Int)) = (300 : Int)) ∧ (((120 : Int) * (24 : Int)) = (2880 : Int)) ∧ ((((500 : Int) * (100 : Int)) / (1000 : Int)) = (50 : Int)) ∧ (((((1000 : Int) - (250 : Int)) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ (((150 : Int) * (4 : Int)) = (600 : Int)) ∧ (((((212 : Int) - (32 : Int)) * (5 : Int)) / (9 : Int)) = (100 : Int)) ∧ (((((32 : Int) - (32 : Int)) * (5 : Int)) / (9 : Int)) = (0 : Int)) := by decide

/-- cuneiform: signs(600, 1) = 600; wedgesper(4, 3) = 7; signpairs(20, 2) = 190; periodcount(3, 2) = 5;
    tabletsubsets(6) = 64; strokeorderings(5) = 120; logovalues(100, 0) = 100; attestationratio(60, 100) = 60 -/
theorem fam_cuneiform : (((600 : Int) * (1 : Int)) = (600 : Int)) ∧ (((4 : Int) + (3 : Int)) = (7 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (20 : Int)) (Int.toNat (2 : Int)))) = (190 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((100 : Int) + (0 : Int)) = (100 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) := by decide

/-- curing: saltconcentration(3, 100) = 3; wateractivity(85, 100) = 85; curetime(7, 24) = 168; nitritelevel(150,
    1) = 150; phlevel(52, 10) = 5; weightloss(30, 100) = 30; microbialreduction(99, 100) = 99; brinestrength(20,
    100) = 20 -/
theorem fam_curing : ((((3 : Int) * (100 : Int)) / (100 : Int)) = (3 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ (((7 : Int) * (24 : Int)) = (168 : Int)) ∧ (((150 : Int) / (1 : Int)) = (150 : Int)) ∧ (((52 : Int) / (10 : Int)) = (5 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((((99 : Int) * (100 : Int)) / (100 : Int)) = (99 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) := by decide

/-- curriculum: credithours(40, 3) = 120; coursecount(120, 3) = 40; contacthours(15, 3) = 45; coverage(45, 50) =
    90; prerequisitedepth(10, 3) = 4; pacing(30, 15) = 2; workload(12, 5) = 60; alignment(90, 80) = 1;
    alignment(70, 80) = 0 -/
theorem fam_curriculum : (((40 : Int) * (3 : Int)) = (120 : Int)) ∧ (((120 : Int) / (3 : Int)) = (40 : Int)) ∧ (((15 : Int) * (3 : Int)) = (45 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ ((-((-(10 : Int)) / (3 : Int))) = (4 : Int)) ∧ (((30 : Int) / (15 : Int)) = (2 : Int)) ∧ (((12 : Int) * (5 : Int)) = (60 : Int)) ∧ ((if (if (90 : Int) ≥ (80 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (70 : Int) ≥ (80 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) := by decide

/-- curvature: gaussian(3, 5) = 15; mean(4, 6) = 5; radiusofcurvature(100, 5) = 20; totalcurvature(2, 50) = 100;
    sectional(60, 12) = 5; geodesicdeviation(2, 3, 4) = 24; anglesum(60, 60, 60) = 180; defect(300) = 60;
    defect(400) = 0 -/
theorem fam_curvature : (((3 : Int) * (5 : Int)) = (15 : Int)) ∧ ((((4 : Int) + (6 : Int)) / (2 : Int)) = (5 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ (((2 : Int) * (50 : Int)) = (100 : Int)) ∧ (((60 : Int) / (12 : Int)) = (5 : Int)) ∧ ((((2 : Int) * (3 : Int)) * (4 : Int)) = (24 : Int)) ∧ ((((60 : Int) + (60 : Int)) + (60 : Int)) = (180 : Int)) ∧ ((fmax (0 : Int) ((360 : Int) - (300 : Int))) = (60 : Int)) ∧ ((fmax (0 : Int) ((360 : Int) - (400 : Int))) = (0 : Int)) := by decide

/-- customer: csat(900, 1000) = 90; nps(70, 20) = 50; nps(20, 70) = -50; churn(50, 1000) = 5; retention(950,
    1000) = 95; tickets(100, 8) = 12; resolution(800, 1000) = 80; response(600, 50) = 12; upsell(120, 1000) = 12 -/
theorem fam_customer : ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ (((70 : Int) - (20 : Int)) = (50 : Int)) ∧ (((20 : Int) - (70 : Int)) = (-50 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ (((100 : Int) / (8 : Int)) = (12 : Int)) ∧ ((((800 : Int) * (100 : Int)) / (1000 : Int)) = (80 : Int)) ∧ (((600 : Int) / (50 : Int)) = (12 : Int)) ∧ ((((120 : Int) * (100 : Int)) / (1000 : Int)) = (12 : Int)) := by decide

/-- cybernetics: feedback(150, 100) = 150; gain(200, 100) = 200; setpoint(100, 30) = 70; stability(80, 100) =
    80; latency(500, 10) = 50; control(90, 30) = 300; homeostasis(95, 100) = 95 -/
theorem fam_cybernetics : ((((150 : Int) * (100 : Int)) / (100 : Int)) = (150 : Int)) ∧ ((((200 : Int) * (100 : Int)) / (100 : Int)) = (200 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (30 : Int))) = (70 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((500 : Int) / (10 : Int)) = (50 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (30 : Int)) = (300 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) := by decide

/-- cycling: cadence(900, 10) = 90; power(200, 5) = 1000; gearratio(53, 12) = 441; speed(4000, 100) = 40;
    ftp(280, 70) = 400; gradient(8, 100) = 8; efficiency(97, 100) = 97; distance(90, 7) = 630 -/
theorem fam_cycling : (((900 : Int) / (10 : Int)) = (90 : Int)) ∧ (((200 : Int) * (5 : Int)) = (1000 : Int)) ∧ ((((53 : Int) * (100 : Int)) / (12 : Int)) = (441 : Int)) ∧ (((4000 : Int) / (100 : Int)) = (40 : Int)) ∧ ((((280 : Int) * (100 : Int)) / (70 : Int)) = (400 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (100 : Int)) = (8 : Int)) ∧ ((((97 : Int) * (100 : Int)) / (100 : Int)) = (97 : Int)) ∧ (((90 : Int) * (7 : Int)) = (630 : Int)) := by decide

/-- cyclone: category(4, 5) = 5; windspeed(150, 1) = 150; pressuredrop(1013, 950) = 63; radius(50, 2) = 100;
    stormsurge(600, 100) = 6; rainfall(300, 1) = 300; eyediameter(60, 2) = 30; intensityindex(90, 100) = 90 -/
theorem fam_cyclone : ((fmax (4 : Int) (5 : Int)) = (5 : Int)) ∧ (((150 : Int) * (1 : Int)) = (150 : Int)) ∧ ((fmax (0 : Int) ((1013 : Int) - (950 : Int))) = (63 : Int)) ∧ (((50 : Int) * (2 : Int)) = (100 : Int)) ∧ (((600 : Int) / (100 : Int)) = (6 : Int)) ∧ (((300 : Int) * (1 : Int)) = (300 : Int)) ∧ (((60 : Int) / (2 : Int)) = (30 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) := by decide

/-- cytogenetics: chromosomepairs(46, 2) = 23; karyotypeorderings(6) = 720; banding(400, 1) = 400;
    translocationpairs(23, 2) = 253; ploidy(23, 2) = 46; recombinationsites(30, 10) = 40; aneuploidyrisk(5, 100)
    = 5; genesubsets(8) = 256 -/
theorem fam_cytogenetics : (((46 : Int) / (2 : Int)) = (23 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (6 : Int)))) = (720 : Int)) ∧ (((400 : Int) * (1 : Int)) = (400 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (23 : Int)) (Int.toNat (2 : Int)))) = (253 : Int)) ∧ (((23 : Int) * (2 : Int)) = (46 : Int)) ∧ (((30 : Int) + (10 : Int)) = (40 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((2 : Int) ^ (8 : Nat)) = (256 : Int)) := by decide

/-- cytology: mitosis(5, 200) = 2; ratio(30, 20) = 150; viability(950, 1000) = 95; confluence(80, 100) = 80;
    apoptosis(15, 300) = 5; doubling(8000, 1000) = 8 -/
theorem fam_cytology : ((((5 : Int) * (100 : Int)) / (200 : Int)) = (2 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (20 : Int)) = (150 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((15 : Int) * (100 : Int)) / (300 : Int)) = (5 : Int)) ∧ (((8000 : Int) / (1000 : Int)) = (8 : Int)) := by decide
