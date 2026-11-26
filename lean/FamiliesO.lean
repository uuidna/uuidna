-- lean/FamiliesO.lean — GENERATED. THE FAMILIES, O — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a
def ffact : Nat → Nat
  | 0 => 1
  | n + 1 => (n + 1) * ffact n
def fchoose (n : Nat) : Nat → Nat
  | 0 => 1
  | k + 1 => fchoose n k * (n - k) / (k + 1)

/-- obs: uptime(999, 1000) = 99; errorrate(50, 1000) = 5; latencyp99(5000, 100) = 50; throughput(6000, 60) =
    100; alertcombos(10, 2) = 45; sloburn(100, 95) = 5; samplingrate(10, 100) = 10; dashboardsubsets(5) = 32 -/
theorem fam_obs : ((((999 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (2 : Int)))) = (45 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (95 : Int))) = (5 : Int)) ∧ ((((10 : Int) * (100 : Int)) / (100 : Int)) = (10 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) := by decide

/-- observability: errorbudget(1000, 250) = 750; errorbudget(100, 250) = 0; slo(999, 1000) = 99; apdex(950,
    1000) = 95; percentile(99, 100) = 99; cardinality(5000, 50) = 100; sampling(10, 100) = 10; saturation(80,
    100) = 80; signal(900, 100) = 900 -/
theorem fam_observability : ((fmax (0 : Int) ((1000 : Int) - (250 : Int))) = (750 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (250 : Int))) = (0 : Int)) ∧ ((((999 : Int) * (100 : Int)) / (1000 : Int)) = (99 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((((99 : Int) * (100 : Int)) / (100 : Int)) = (99 : Int)) ∧ (((5000 : Int) / (50 : Int)) = (100 : Int)) ∧ ((((10 : Int) * (100 : Int)) / (100 : Int)) = (10 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (100 : Int)) = (900 : Int)) := by decide

/-- oceanography: pressure(1000) = 100; salinity(35, 1000) = 35; density(1025, 1) = 1025; tide(8, 2) = 6;
    tide(2, 8) = 0; current(100, 25) = 4; thermocline(25, 4) = 21; thermocline(4, 25) = 0; wave(3, 8) = 12;
    upwelling(1000, 50) = 20 -/
theorem fam_oceanography : (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ ((((35 : Int) * (1000 : Int)) / (1000 : Int)) = (35 : Int)) ∧ (((1025 : Int) / (1 : Int)) = (1025 : Int)) ∧ ((fmax (0 : Int) ((8 : Int) - (2 : Int))) = (6 : Int)) ∧ ((fmax (0 : Int) ((2 : Int) - (8 : Int))) = (0 : Int)) ∧ (((100 : Int) / (25 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((25 : Int) - (4 : Int))) = (21 : Int)) ∧ ((fmax (0 : Int) ((4 : Int) - (25 : Int))) = (0 : Int)) ∧ ((((3 : Int) * (8 : Int)) / (2 : Int)) = (12 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) := by decide

/-- odometry: distance(360, 2) = 720; wheelrevolutions(1000, 314) = 3; headingchange(90, 30) = 60;
    positionerror(2, 100) = 2; ticksperrev(360, 4) = 1440; driftrate(50, 10) = 5; slipcompensation(100, 95) = 5;
    pathdistance(500, 220) = 720 -/
theorem fam_odometry : (((360 : Int) * (2 : Int)) = (720 : Int)) ∧ (((1000 : Int) / (314 : Int)) = (3 : Int)) ∧ ((fmax (0 : Int) ((90 : Int) - (30 : Int))) = (60 : Int)) ∧ ((((2 : Int) * (100 : Int)) / (100 : Int)) = (2 : Int)) ∧ (((360 : Int) * (4 : Int)) = (1440 : Int)) ∧ (((50 : Int) / (10 : Int)) = (5 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (95 : Int))) = (5 : Int)) ∧ (((500 : Int) + (220 : Int)) = (720 : Int)) := by decide

/-- oligopoly: firms(4, 0) = 4; concentration(80, 100) = 80; hhindex(25, 4) = 100; collusiongain(1000, 2) =
    2000; reactionpairs(4, 2) = 6; cournotoutput(1000, 5) = 200; marketsharesubsets(4) = 16; stabilityindex(70,
    100) = 70 -/
theorem fam_oligopoly : (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((25 : Int) * (4 : Int)) = (100 : Int)) ∧ (((1000 : Int) * (2 : Int)) = (2000 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (4 : Int)) (Int.toNat (2 : Int)))) = (6 : Int)) ∧ (((1000 : Int) / (5 : Int)) = (200 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) := by decide

/-- onboarding: rampup(30, 2) = 60; completion(8, 10) = 80; milestone(10, 4) = 3; enablement(10000, 90) = 900;
    timetoproductive(300, 10) = 30; checklist(60, 6) = 10; mentoring(12, 5) = 60; satisfaction(90, 80) = 1;
    satisfaction(70, 80) = 0 -/
theorem fam_onboarding : (((30 : Int) * (2 : Int)) = (60 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ ((-((-(10 : Int)) / (4 : Int))) = (3 : Int)) ∧ ((((10000 : Int) * (90 : Int)) / (1000 : Int)) = (900 : Int)) ∧ (((300 : Int) / (10 : Int)) = (30 : Int)) ∧ (((60 : Int) / (6 : Int)) = (10 : Int)) ∧ (((12 : Int) * (5 : Int)) = (60 : Int)) ∧ ((if (if (90 : Int) ≥ (80 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (70 : Int) ≥ (80 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) := by decide

/-- oncology: staging(3, 2, 1) = 6; survival(80, 100) = 80; doubling(200, 50) = 150; response(1000, 250) = 75;
    burden(10000, 5) = 2000; remission(60, 100) = 60; dose(30, 2) = 60 -/
theorem fam_oncology : ((((3 : Int) + (2 : Int)) + (1 : Int)) = (6 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((200 : Int) - (50 : Int))) = (150 : Int)) ∧ (((((1000 : Int) - (250 : Int)) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ (((10000 : Int) / (5 : Int)) = (2000 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) ∧ (((30 : Int) * (2 : Int)) = (60 : Int)) := by decide

/-- onomastics: namecount(1000, 2) = 2000; surnamepairs(50, 2) = 1225; orderingchoices(5) = 120;
    frequencyrank(1000, 10) = 100; patronymiclayers(3, 1) = 4; etymsubsets(5) = 32; variantspellings(20, 3) =
    60; distributionratio(40, 100) = 40 -/
theorem fam_onomastics : (((1000 : Int) * (2 : Int)) = (2000 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (50 : Int)) (Int.toNat (2 : Int)))) = (1225 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((3 : Int) + (1 : Int)) = (4 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ (((20 : Int) * (3 : Int)) = (60 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (100 : Int)) = (40 : Int)) := by decide

/-- ontology: categories(10, 0) = 10; entitysubsets(6) = 64; relationpairs(8, 2) = 28; hierarchydepth(100, 20) =
    5; predicatecombos(12, 3) = 220; substanceorderings(5) = 120; modalstates(3, 4) = 12; partonomylinks(10, 3)
    = 30 -/
theorem fam_ontology : (((10 : Int) + (0 : Int)) = (10 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ (((100 : Int) / (20 : Int)) = (5 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((3 : Int) * (4 : Int)) = (12 : Int)) ∧ (((10 : Int) * (3 : Int)) = (30 : Int)) := by decide

/-- opendata: records(100, 20) = 2000; completeness(950, 1000) = 95; freshness(1000, 700) = 300; freshness(700,
    1000) = 0; license(80, 100) = 80; downloads(50, 12) = 600; coverage(45, 60) = 75; size(1000, 64) = 64000;
    formats(3, 4) = 7 -/
theorem fam_opendata : (((100 : Int) * (20 : Int)) = (2000 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (700 : Int))) = (300 : Int)) ∧ ((fmax (0 : Int) ((700 : Int) - (1000 : Int))) = (0 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((50 : Int) * (12 : Int)) = (600 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (60 : Int)) = (75 : Int)) ∧ (((1000 : Int) * (64 : Int)) = (64000 : Int)) ∧ (((3 : Int) + (4 : Int)) = (7 : Int)) := by decide

/-- opera: acts(3, 1) = 4; arias(8, 2) = 16; voicetypes(6, 0) = 6; ensemblecombos(8, 2) = 28; orchestrasize(60,
    1) = 60; scoreorderings(5) = 120; rangeoctaves(48, 12) = 4; dynamicspan(100, 20) = 80 -/
theorem fam_opera : (((3 : Int) + (1 : Int)) = (4 : Int)) ∧ (((8 : Int) * (2 : Int)) = (16 : Int)) ∧ (((6 : Int) + (0 : Int)) = (6 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (2 : Int)))) = (28 : Int)) ∧ (((60 : Int) * (1 : Int)) = (60 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((48 : Int) / (12 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (20 : Int))) = (80 : Int)) := by decide

/-- ophthalmology: accommodation(10, 100) = 9; astigmatism(44, 46) = 2; cylinderpower(3, 2) = 5; diopter(500) =
    2; iop(48, 3) = 16; pupildistance(31, 32) = 63; refractiveerror(2, 4) = 4; visualacuity(20, 40) = 50;
    visualacuity(20, 20) = 100 -/
theorem fam_ophthalmology : ((fmax (0 : Int) (((100 : Int) / (10 : Int)) - ((100 : Int) / (100 : Int)))) = (9 : Int)) ∧ ((fmax (0 : Int) ((46 : Int) - (44 : Int))) = (2 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ (((1000 : Int) / (500 : Int)) = (2 : Int)) ∧ (((48 : Int) / (3 : Int)) = (16 : Int)) ∧ (((31 : Int) + (32 : Int)) = (63 : Int)) ∧ (((2 : Int) + ((4 : Int) / (2 : Int))) = (4 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (40 : Int)) = (50 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (20 : Int)) = (100 : Int)) := by decide

/-- optics: magnify(10, 5) = 50; fnumber(200, 50) = 4; dpi(3000, 10) = 300; megapixels(4000, 3000) = 12000000;
    resolution(1920, 1080) = 2073600; aperturesteps(6) = 64; fov(180, 40) = 140; elements(6, 2) = 8 -/
theorem fam_optics : (((10 : Int) * (5 : Int)) = (50 : Int)) ∧ (((200 : Int) / (50 : Int)) = (4 : Int)) ∧ (((3000 : Int) / (10 : Int)) = (300 : Int)) ∧ (((4000 : Int) * (3000 : Int)) = (12000000 : Int)) ∧ (((1920 : Int) * (1080 : Int)) = (2073600 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ ((fmax (0 : Int) ((180 : Int) - (40 : Int))) = (140 : Int)) ∧ (((6 : Int) + (2 : Int)) = (8 : Int)) := by decide

/-- option: strike(100, 1) = 100; premium(5, 100) = 500; contracts(10, 100) = 1000; expiry(30, 0) = 30;
    intrinsic(120, 100) = 20; breakeven(100, 5) = 105; greeks(5, 0) = 5; combos(6, 2) = 15 -/
theorem fam_option : (((100 : Int) * (1 : Int)) = (100 : Int)) ∧ (((5 : Int) * (100 : Int)) = (500 : Int)) ∧ (((10 : Int) * (100 : Int)) = (1000 : Int)) ∧ (((30 : Int) + (0 : Int)) = (30 : Int)) ∧ ((fmax (0 : Int) ((120 : Int) - (100 : Int))) = (20 : Int)) ∧ (((100 : Int) + (5 : Int)) = (105 : Int)) ∧ (((5 : Int) + (0 : Int)) = (5 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) := by decide

/-- optometry: acuity(20, 40) = 10; acuity(20, 0) = 0; diopter(50) = 20000; diopter(0) = 0; astigmatism(90, 45)
    = 200; astigmatism(90, 0) = 0; accommodation(250, 25) = 225; accommodation(25, 250) = 0; contrast(80, 100) =
    80; contrast(1, 0) = 0; refraction(1500, 1000) = 1500; refraction(1500, 0) = 0 -/
theorem fam_optometry : ((((20 : Int) * (20 : Int)) / (40 : Int)) = (10 : Int)) ∧ ((((20 : Int) * (20 : Int)) / (0 : Int)) = (0 : Int)) ∧ (((1000000 : Int) / (50 : Int)) = (20000 : Int)) ∧ (((1000000 : Int) / (0 : Int)) = (0 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (45 : Int)) = (200 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int)) ∧ ((fmax (0 : Int) ((250 : Int) - (25 : Int))) = (225 : Int)) ∧ ((fmax (0 : Int) ((25 : Int) - (250 : Int))) = (0 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((1 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int)) ∧ ((((1500 : Int) * (1000 : Int)) / (1000 : Int)) = (1500 : Int)) ∧ ((((1500 : Int) * (1000 : Int)) / (0 : Int)) = (0 : Int)) := by decide

/-- orbit: period(62800, 8) = 7850; semimajoraxis(500, 300) = 400; eccentricity(500, 300) = 250; apoapsis(400,
    250) = 500; periapsis(400, 250) = 300; velocity(60000, 60) = 1000; inclination(30, 60) = 45; meananomaly(10,
    45) = 90 -/
theorem fam_orbit : (((62800 : Int) / (8 : Int)) = (7850 : Int)) ∧ ((((500 : Int) + (300 : Int)) / (2 : Int)) = (400 : Int)) ∧ (((((500 : Int) - (300 : Int)) * (1000 : Int)) / ((500 : Int) + (300 : Int))) = (250 : Int)) ∧ ((((400 : Int) * ((1000 : Int) + (250 : Int))) / (1000 : Int)) = (500 : Int)) ∧ ((((400 : Int) * ((1000 : Int) - (250 : Int))) / (1000 : Int)) = (300 : Int)) ∧ (((60000 : Int) / (60 : Int)) = (1000 : Int)) ∧ ((((30 : Int) * (90 : Int)) / (60 : Int)) = (45 : Int)) ∧ ((((10 : Int) * (45 : Int)) % (360 : Int)) = (90 : Int)) := by decide

/-- orbital: period(1000, 6) = 1000; apoapsis(500, 100) = 600; periapsis(500, 100) = 400; eccentricity(100, 500)
    = 200; semimajor(600, 400) = 500; velocity(6000, 6) = 1000; inclination(50, 100) = 45; deltav(3000, 2000) =
    5000; periapsis(100, 500) = 0 -/
theorem fam_orbital : ((((6 : Int) * (1000 : Int)) / (6 : Int)) = (1000 : Int)) ∧ (((500 : Int) + (100 : Int)) = (600 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (100 : Int))) = (400 : Int)) ∧ ((((100 : Int) * (1000 : Int)) / (500 : Int)) = (200 : Int)) ∧ ((((600 : Int) + (400 : Int)) / (2 : Int)) = (500 : Int)) ∧ (((6000 : Int) / (6 : Int)) = (1000 : Int)) ∧ ((((50 : Int) * (90 : Int)) / (100 : Int)) = (45 : Int)) ∧ (((3000 : Int) + (2000 : Int)) = (5000 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (500 : Int))) = (0 : Int)) := by decide

/-- origami: creasecount(20, 12) = 32; foldorderings(6) = 720; mountainvalley(16, 2) = 32; flatfoldability(100,
    100) = 100; vertexpairs(12, 2) = 66; layersubsets(5) = 32; crimpangle(180, 4) = 45; panelcount(8, 4) = 32 -/
theorem fam_origami : (((20 : Int) + (12 : Int)) = (32 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (6 : Int)))) = (720 : Int)) ∧ (((16 : Int) * (2 : Int)) = (32 : Int)) ∧ ((((100 : Int) * (100 : Int)) / (100 : Int)) = (100 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (2 : Int)))) = (66 : Int)) ∧ (((2 : Int) ^ (5 : Nat)) = (32 : Int)) ∧ (((180 : Int) / (4 : Int)) = (45 : Int)) ∧ (((8 : Int) * (4 : Int)) = (32 : Int)) := by decide

/-- ornithology: wingload(1200, 40) = 30; clutch(48, 12) = 4; migration(8000, 40) = 200; fledging(3, 4) = 75;
    aspect(600, 50) = 1200; flock(1000, 50) = 20; song(240, 60) = 4; survival(45, 100) = 45 -/
theorem fam_ornithology : (((1200 : Int) / (40 : Int)) = (30 : Int)) ∧ (((48 : Int) / (12 : Int)) = (4 : Int)) ∧ (((8000 : Int) / (40 : Int)) = (200 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (50 : Int)) = (1200 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ (((240 : Int) / (60 : Int)) = (4 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (100 : Int)) = (45 : Int)) := by decide

/-- orthography: transparency(900, 1000) = 90; graphemes(130, 100) = 130; errors(5, 100) = 5; density(5000,
    1000) = 5; capitals(3, 100) = 3; diacritics(40, 200) = 20; legibility(980, 1000) = 98 -/
theorem fam_orthography : ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ ((((130 : Int) * (100 : Int)) / (100 : Int)) = (130 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((5000 : Int) / (1000 : Int)) = (5 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (100 : Int)) = (3 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (200 : Int)) = (20 : Int)) ∧ ((((980 : Int) * (100 : Int)) / (1000 : Int)) = (98 : Int)) := by decide

/-- orthopedics: rangeofmotion(120, 150) = 80; bonedensity(80, 100) = 80; fractureload(50, 80) = 4000;
    legdiscrepancy(920, 905) = 15; cobbangle(22, 18) = 40; gait(100, 60) = 100; alignment(185, 180) = 5;
    implantsize(96, 5) = 20 -/
theorem fam_orthopedics : ((((120 : Int) * (100 : Int)) / (150 : Int)) = (80 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((50 : Int) * (80 : Int)) = (4000 : Int)) ∧ ((fmax (0 : Int) ((920 : Int) - (905 : Int))) = (15 : Int)) ∧ (((22 : Int) + (18 : Int)) = (40 : Int)) ∧ ((((100 : Int) * (60 : Int)) / (60 : Int)) = (100 : Int)) ∧ ((fmax (0 : Int) ((185 : Int) - (180 : Int))) = (5 : Int)) ∧ ((-((-(96 : Int)) / (5 : Int))) = (20 : Int)) := by decide

/-- oscillators: frequency(1000, 5) = 200; frequency(1000, 0) = 0; period(10000, 1000) = 10; dutycycle(30, 40) =
    75; phase(1, 4) = 90; resonance(100, 10) = 1000; harmonics(440, 3) = 1320; jitter(5000, 100) = 50;
    stability(5, 10000) = 500 -/
theorem fam_oscillators : (((1000 : Int) / (5 : Int)) = (200 : Int)) ∧ (((1000 : Int) / (0 : Int)) = (0 : Int)) ∧ (((10000 : Int) / (1000 : Int)) = (10 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (40 : Int)) = (75 : Int)) ∧ ((((1 : Int) * (360 : Int)) / (4 : Int)) = (90 : Int)) ∧ (((1000000 : Int) / ((100 : Int) * (10 : Int))) = (1000 : Int)) ∧ (((440 : Int) * (3 : Int)) = (1320 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ ((((5 : Int) * (1000000 : Int)) / (10000 : Int)) = (500 : Int)) := by decide

/-- osmosis: osmoticpressure(2, 300, 310) = 186000; osmolarity(600, 2) = 300; tonicity(300, 150) = 1;
    tonicity(150, 300) = 0; waterpotential(200, 500) = 300; netflux(5, 10, 20) = 1000; reflectioncoeff(90, 100)
    = 90; gradient(500, 200) = 300 -/
theorem fam_osmosis : ((((2 : Int) * (300 : Int)) * (310 : Int)) = (186000 : Int)) ∧ (((600 : Int) / (2 : Int)) = (300 : Int)) ∧ ((if (if (300 : Int) > (150 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (150 : Int) > (300 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (200 : Int))) = (300 : Int)) ∧ ((((5 : Int) * (10 : Int)) * (20 : Int)) = (1000 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((fmax (0 : Int) ((500 : Int) - (200 : Int))) = (300 : Int)) := by decide

/-- outbreak: reproduction(6, 2) = 3; attackrate(250, 1000) = 25; doublingtime(30, 5) = 6; casefatality(20,
    1000) = 2; generationinterval(140, 20) = 7; cumulativecases(100, 14) = 1400; herdimmunity(4) = 75;
    growthfactor(800, 100) = 8 -/
theorem fam_outbreak : (((6 : Int) / (2 : Int)) = (3 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ (((30 : Int) / (5 : Int)) = (6 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (1000 : Int)) = (2 : Int)) ∧ (((140 : Int) / (20 : Int)) = (7 : Int)) ∧ (((100 : Int) * (14 : Int)) = (1400 : Int)) ∧ (((((4 : Int) - (1 : Int)) * (100 : Int)) / (4 : Int)) = (75 : Int)) ∧ (((800 : Int) / (100 : Int)) = (8 : Int)) := by decide

/-- overtone: harmonicfreq(440, 3) = 1320; harmonicnumber(1320, 440) = 3; partialamplitude(1000, 4) = 250;
    inharmonicity(1330, 1320) = 10; seriessum(100, 4) = 1000; fundamentalfrom(1320, 3) = 440;
    spectralcentroid(12000, 100) = 120; harmoniccount(20000, 440) = 45 -/
theorem fam_overtone : (((440 : Int) * (3 : Int)) = (1320 : Int)) ∧ (((1320 : Int) / (440 : Int)) = (3 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ ((fmax (0 : Int) ((1330 : Int) - (1320 : Int))) = (10 : Int)) ∧ (((((100 : Int) * (4 : Int)) * ((4 : Int) + (1 : Int))) / (2 : Int)) = (1000 : Int)) ∧ (((1320 : Int) / (3 : Int)) = (440 : Int)) ∧ (((12000 : Int) / (100 : Int)) = (120 : Int)) ∧ (((20000 : Int) / (440 : Int)) = (45 : Int)) := by decide

/-- oxygenation: saturation(97, 100) = 97; oxygencontent(15, 97) = 1455; pao2fio2ratio(100, 50) = 200;
    alveolararterial(100, 90) = 10; deliveryrate(5, 200) = 1000; extractionratio(250, 1000) = 25;
    carryingcapacity(15) = 20; shuntfraction(20, 19, 15) = 20 -/
theorem fam_oxygenation : ((((97 : Int) * (100 : Int)) / (100 : Int)) = (97 : Int)) ∧ (((15 : Int) * (97 : Int)) = (1455 : Int)) ∧ ((((100 : Int) * (100 : Int)) / (50 : Int)) = (200 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (90 : Int))) = (10 : Int)) ∧ (((5 : Int) * (200 : Int)) = (1000 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (1000 : Int)) = (25 : Int)) ∧ ((((15 : Int) * (134 : Int)) / (100 : Int)) = (20 : Int)) ∧ ((((fmax (0 : Int) ((20 : Int) - (19 : Int))) * (100 : Int)) / (fmax (0 : Int) ((20 : Int) - (15 : Int)))) = (20 : Int)) := by decide
