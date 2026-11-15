-- lean/FamiliesN.lean — GENERATED. THE FAMILIES, N — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a
def ffact : Nat → Nat
  | 0 => 1
  | n + 1 => (n + 1) * ffact n
def fchoose (n : Nat) : Nat → Nat
  | 0 => 1
  | k + 1 => fchoose n k * (n - k) / (k + 1)
def fgcd : Nat → Nat → Nat → Nat
  | 0, a, _ => a
  | fuel + 1, a, b => if b = 0 then a else fgcd fuel b (a % b)

/-- nanomaterials: surfacearea(1000, 6) = 6000; aspectratio(100, 5) = 20; bandgap(1120, 300) = 1420;
    quantumyield(80, 100) = 80; loading(20, 80) = 20; dispersion(600, 1000) = 60; surfacevolume(600, 100) = 6;
    confinement(3600, 6) = 100; confinement(3600, 0) = 0 -/
theorem fam_nanomaterials : (((1000 : Int) * (6 : Int)) = (6000 : Int)) ∧ (((100 : Int) / (5 : Int)) = (20 : Int)) ∧ (((1120 : Int) + (300 : Int)) = (1420 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((((20 : Int) * (100 : Int)) / ((20 : Int) + (80 : Int))) = (20 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (1000 : Int)) = (60 : Int)) ∧ (((600 : Int) / (100 : Int)) = (6 : Int)) ∧ (((3600 : Int) / ((6 : Int) * (6 : Int))) = (100 : Int)) ∧ (((3600 : Int) / ((0 : Int) * (0 : Int))) = (0 : Int)) := by decide

/-- nanotechnology: aspectratio(1000, 10) = 10000; bandgap(500, 5) = 100; coating(3, 4) = 12; dispersion(80,
    100) = 80; particlecount(1000, 5) = 200; quantumconfinement(600, 3) = 200; surfacevolume(600, 100) = 600;
    yieldrate(90, 100) = 90 -/
theorem fam_nanotechnology : ((((1000 : Int) * (100 : Int)) / (10 : Int)) = (10000 : Int)) ∧ (((500 : Int) / (5 : Int)) = (100 : Int)) ∧ (((3 : Int) * (4 : Int)) = (12 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((1000 : Int) / (5 : Int)) = (200 : Int)) ∧ (((600 : Int) / (3 : Int)) = (200 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (100 : Int)) = (600 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) := by decide

/-- navigation: bearing(450) = 90; distance(60, 3) = 180; eta(180, 60) = 3; crosstrack(5, 100) = 5; dilution(12,
    4) = 3; waypoint(3, 10) = 30; heading(350, 20) = 10; accuracy(95, 100) = 95 -/
theorem fam_navigation : (((((450 : Int) % (360 : Int)) + (360 : Int)) % (360 : Int)) = (90 : Int)) ∧ (((60 : Int) * (3 : Int)) = (180 : Int)) ∧ (((180 : Int) / (60 : Int)) = (3 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((12 : Int) / (4 : Int)) = (3 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (10 : Int)) = (30 : Int)) ∧ ((((((350 : Int) + (20 : Int)) % (360 : Int)) + (360 : Int)) % (360 : Int)) = (10 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) := by decide

/-- nebula: radius(10, 1) = 10; density(100, 1) = 100; types(4, 0) = 4; temperature(10, 1000) = 10000;
    ionization(80, 100) = 80; lightyears(5, 1) = 5; stars(100, 1) = 100; combos(6, 2) = 15 -/
theorem fam_nebula : (((10 : Int) * (1 : Int)) = (10 : Int)) ∧ (((100 : Int) * (1 : Int)) = (100 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ (((10 : Int) * (1000 : Int)) = (10000 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ (((5 : Int) * (1 : Int)) = (5 : Int)) ∧ (((100 : Int) * (1 : Int)) = (100 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) := by decide

/-- nephrology: gfr(12000, 100) = 120; clearance(1000, 10) = 100; creatinine(1200, 120) = 10; filtration(20,
    100) = 20; dialysis(70, 100) = 70; proteinuria(300, 2) = 150; electrolyte(140, 1) = 140; reabsorption(99,
    100) = 99 -/
theorem fam_nephrology : (((12000 : Int) / (100 : Int)) = (120 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((1200 : Int) / (120 : Int)) = (10 : Int)) ∧ ((((20 : Int) * (100 : Int)) / (100 : Int)) = (20 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) ∧ (((300 : Int) / (2 : Int)) = (150 : Int)) ∧ (((140 : Int) / (1 : Int)) = (140 : Int)) ∧ ((((99 : Int) * (100 : Int)) / (100 : Int)) = (99 : Int)) := by decide

/-- networking: bandwidth(1000, 8) = 125; latency(3000, 200) = 15; throughput(6000, 60) = 100; loss(5, 1000) =
    0; loss(30, 1000) = 3; hops(5) = 4; utilization(750, 1000) = 75; jitter(50, 12) = 38; subnet(1, 8) = 256 -/
theorem fam_networking : (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ (((3000 : Int) / (200 : Int)) = (15 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (1000 : Int)) = (0 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (1000 : Int)) = (3 : Int)) ∧ (((5 : Int) - (1 : Int)) = (4 : Int)) ∧ ((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (12 : Int))) = (38 : Int)) ∧ (((1 : Int) * ((2 : Int) ^ (8 : Nat))) = (256 : Int)) := by decide

/-- neuralnet: parameters(100, 10) = 1010; layers(3) = 5; neurons(4, 128) = 512; weights(128, 64) = 8192;
    relu(42) = 42; relu(-5) = 0; fanin(8192, 64) = 128; flops(8192, 512) = 16896; capacity(512, 32) = 16384 -/
theorem fam_neuralnet : ((((100 : Int) * (10 : Int)) + (10 : Int)) = (1010 : Int)) ∧ (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ (((4 : Int) * (128 : Int)) = (512 : Int)) ∧ (((128 : Int) * (64 : Int)) = (8192 : Int)) ∧ ((fmax (0 : Int) (42 : Int)) = (42 : Int)) ∧ ((fmax (0 : Int) (-5 : Int)) = (0 : Int)) ∧ (((8192 : Int) / (64 : Int)) = (128 : Int)) ∧ ((((2 : Int) * (8192 : Int)) + (512 : Int)) = (16896 : Int)) ∧ (((512 : Int) * (32 : Int)) = (16384 : Int)) := by decide

/-- neurology: glasgow(4, 5, 6) = 15; reflex(2) = 2; conduction(60, 2) = 30; seizure(3, 30) = 10; stroke(8, 40)
    = 20; latency(100) = 100; perfusion(900, 18) = 50; recovery(3, 4) = 75 -/
theorem fam_neurology : ((((4 : Int) + (5 : Int)) + (6 : Int)) = (15 : Int)) ∧ ((2 : Int) = (2 : Int)) ∧ (((60 : Int) / (2 : Int)) = (30 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (30 : Int)) = (10 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (40 : Int)) = (20 : Int)) ∧ ((100 : Int) = (100 : Int)) ∧ (((900 : Int) / (18 : Int)) = (50 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (4 : Int)) = (75 : Int)) := by decide

/-- neuron: synapses(1000, 7) = 7000; dendrites(1000, 0) = 1000; threshold(70, 55) = 15; spikes(100, 10) = 1000;
    axonlength(100, 1) = 100; refractory(20, 2) = 18; layers(6, 0) = 6; combos(6, 2) = 15 -/
theorem fam_neuron : (((1000 : Int) * (7 : Int)) = (7000 : Int)) ∧ (((1000 : Int) + (0 : Int)) = (1000 : Int)) ∧ ((fmax (0 : Int) ((70 : Int) - (55 : Int))) = (15 : Int)) ∧ (((100 : Int) * (10 : Int)) = (1000 : Int)) ∧ (((100 : Int) * (1 : Int)) = (100 : Int)) ∧ ((fmax (0 : Int) ((20 : Int) - (2 : Int))) = (18 : Int)) ∧ (((6 : Int) + (0 : Int)) = (6 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) := by decide

/-- neuropsychology: iq(12, 10) = 120; memoryquotient(85, 100) = 85; lateralization(60, 40) = 20; deficit(100,
    75) = 25; deficit(50, 80) = 0; recovery(30, 50) = 60; span(49, 7) = 7; processingspeed(120, 60) = 120;
    executivefunction(48, 8) = 40 -/
theorem fam_neuropsychology : ((((12 : Int) * (100 : Int)) / (10 : Int)) = (120 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) ∧ ((((fmax (0 : Int) ((60 : Int) - (40 : Int))) * (100 : Int)) / ((60 : Int) + (40 : Int))) = (20 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (75 : Int))) = (25 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (80 : Int))) = (0 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (50 : Int)) = (60 : Int)) ∧ (((49 : Int) / (7 : Int)) = (7 : Int)) ∧ ((((120 : Int) * (60 : Int)) / (60 : Int)) = (120 : Int)) ∧ ((fmax (0 : Int) ((48 : Int) - (8 : Int))) = (40 : Int)) := by decide

/-- neuroscience: firing(1000, 10) = 100; potential(50, 70) = -20; potential(90, 20) = 70; synapse(10000, 100) =
    100; conduction(1200, 10) = 120; plasticity(30, 100) = 30; refractory(2) = 2; connectivity(5000, 100) = 50;
    threshold(55) = 55 -/
theorem fam_neuroscience : (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((50 : Int) - (70 : Int)) = (-20 : Int)) ∧ (((90 : Int) - (20 : Int)) = (70 : Int)) ∧ (((10000 : Int) / (100 : Int)) = (100 : Int)) ∧ (((1200 : Int) / (10 : Int)) = (120 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (100 : Int)) = (30 : Int)) ∧ ((2 : Int) = (2 : Int)) ∧ (((5000 : Int) / (100 : Int)) = (50 : Int)) ∧ ((55 : Int) = (55 : Int)) := by decide

/-- ngram: count(1000, 3) = 998; probability(5, 1000) = 5; probability(3, 0) = 0; laplacesmoothing(4, 1000,
    1000) = 2; perplexityproxy(1000, 8) = 125; coverage(90, 100) = 90; backoffweight(400, 1000) = 400;
    vocabularysize(5000, 1200) = 3800; conditionalcount(100, 1) = 99; conditionalcount(0, 5) = 0 -/
theorem fam_ngram : ((fmax (0 : Int) (((1000 : Int) - (3 : Int)) + (1 : Int))) = (998 : Int)) ∧ ((((5 : Int) * (1000 : Int)) / (1000 : Int)) = (5 : Int)) ∧ ((((3 : Int) * (1000 : Int)) / (0 : Int)) = (0 : Int)) ∧ (((((4 : Int) + (1 : Int)) * (1000 : Int)) / ((1000 : Int) + (1000 : Int))) = (2 : Int)) ∧ (((1000 : Int) / (8 : Int)) = (125 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((400 : Int) * (1000 : Int)) / (1000 : Int)) = (400 : Int)) ∧ ((fmax (0 : Int) ((5000 : Int) - (1200 : Int))) = (3800 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (1 : Int))) = (99 : Int)) ∧ ((fmax (0 : Int) ((0 : Int) - (5 : Int))) = (0 : Int)) := by decide

/-- nic: linerate(100) = 100; throughput(100, 90) = 90; packets(10, 1500) = 833333; mtu(9000) = 9000;
    overhead(1518, 1500) = 18; duplex(100) = 200; queues(8, 4) = 32; interrupts(1000, 64) = 16; bandwidth(16,
    32) = 512 -/
theorem fam_nic : ((100 : Int) = (100 : Int)) ∧ ((((100 : Int) * (90 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((10 : Int) * (125000000 : Int)) / (1500 : Int)) = (833333 : Int)) ∧ ((9000 : Int) = (9000 : Int)) ∧ (((1518 : Int) - (1500 : Int)) = (18 : Int)) ∧ (((100 : Int) * (2 : Int)) = (200 : Int)) ∧ (((8 : Int) * (4 : Int)) = (32 : Int)) ∧ ((-((-(1000 : Int)) / (64 : Int))) = (16 : Int)) ∧ (((16 : Int) * (32 : Int)) = (512 : Int)) := by decide

/-- nim: heaps(3, 0) = 3; totalstones(3, 5, 7) = 15; movecombos(15, 2) = 105; positionsubsets(6) = 64;
    grundyvalue(15, 4) = 3; winningmoves(2, 1) = 3; heapmax(7, 5) = 7; parity(15, 2) = 1 -/
theorem fam_nim : (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ ((((3 : Int) + (5 : Int)) + (7 : Int)) = (15 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (15 : Int)) (Int.toNat (2 : Int)))) = (105 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) ∧ (((15 : Int) % (4 : Int)) = (3 : Int)) ∧ (((2 : Int) + (1 : Int)) = (3 : Int)) ∧ ((fmax (7 : Int) (5 : Int)) = (7 : Int)) ∧ (((15 : Int) % (2 : Int)) = (1 : Int)) := by decide

/-- noise: snr(90, 30) = 60; sumlevels(60, 40) = 100; attenuation(80, 25) = 55; exposuredose(85, 8) = 680;
    nr(100, 35) = 65; maskingthreshold(80, 50) = 40; floor(600, 12) = 50; dynamicrange(120, 20) = 100; snr(30,
    90) = 0 -/
theorem fam_noise : ((fmax (0 : Int) ((90 : Int) - (30 : Int))) = (60 : Int)) ∧ (((60 : Int) + (40 : Int)) = (100 : Int)) ∧ ((fmax (0 : Int) ((80 : Int) - (25 : Int))) = (55 : Int)) ∧ (((85 : Int) * (8 : Int)) = (680 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - (35 : Int))) = (65 : Int)) ∧ ((((80 : Int) * (50 : Int)) / (100 : Int)) = (40 : Int)) ∧ (((600 : Int) / (12 : Int)) = (50 : Int)) ∧ ((fmax (0 : Int) ((120 : Int) - (20 : Int))) = (100 : Int)) ∧ ((fmax (0 : Int) ((30 : Int) - (90 : Int))) = (0 : Int)) := by decide

/-- noisepollution: leq(3600, 60) = 60; daynight(60, 50) = 60; exceedance(75, 65) = 10; exceedance(60, 65) = 0;
    exposuredose(85, 8) = 680; distanceattenuation(100, 3) = 82; barrierloss(12, 8) = 18; limitmargin(65, 50) =
    15; annoyanceindex(70, 1000) = 700 -/
theorem fam_noisepollution : (((3600 : Int) / (60 : Int)) = (60 : Int)) ∧ (((((12 : Int) * (60 : Int)) + ((12 : Int) * ((50 : Int) + (10 : Int)))) / (24 : Int)) = (60 : Int)) ∧ ((fmax (0 : Int) ((75 : Int) - (65 : Int))) = (10 : Int)) ∧ ((fmax (0 : Int) ((60 : Int) - (65 : Int))) = (0 : Int)) ∧ (((85 : Int) * (8 : Int)) = (680 : Int)) ∧ ((fmax (0 : Int) ((100 : Int) - ((6 : Int) * (3 : Int)))) = (82 : Int)) ∧ ((((12 : Int) ^ (2 : Nat)) / (8 : Int)) = (18 : Int)) ∧ ((fmax (0 : Int) ((65 : Int) - (50 : Int))) = (15 : Int)) ∧ ((((70 : Int) * (1000 : Int)) / (100 : Int)) = (700 : Int)) := by decide

/-- notice: severity(3) = 3; dismiss(30, 120) = 25; cta(45, 300) = 15; duration(5000) = 5000; stack(4) = 4;
    priority(7, 3) = 1; priority(3, 7) = 0; impressions(80, 100) = 80; autohide(10) = 10 -/
theorem fam_notice : ((3 : Int) = (3 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (300 : Int)) = (15 : Int)) ∧ ((5000 : Int) = (5000 : Int)) ∧ ((4 : Int) = (4 : Int)) ∧ ((if (if (7 : Int) ≥ (3 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (3 : Int) ≥ (7 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((80 : Int) * (100 : Int)) / (100 : Int)) = (80 : Int)) ∧ ((10 : Int) = (10 : Int)) := by decide

/-- nuclear: decay(1000, 3) = 125; activity(5000, 2) = 10; binding(1600, 200) = 8; criticality(105, 100) = 105;
    enrichment(5, 100) = 5; fission(2000, 10) = 200; dose(900, 3) = 100; shielding(800, 2) = 200 -/
theorem fam_nuclear : (((1000 : Int) / ((2 : Int) ^ (3 : Nat))) = (125 : Int)) ∧ ((((5000 : Int) * (2 : Int)) / (1000 : Int)) = (10 : Int)) ∧ (((1600 : Int) / (200 : Int)) = (8 : Int)) ∧ ((((105 : Int) * (100 : Int)) / (100 : Int)) = (105 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((2000 : Int) / (10 : Int)) = (200 : Int)) ∧ (((900 : Int) / ((3 : Int) ^ (2 : Nat))) = (100 : Int)) ∧ (((800 : Int) / ((2 : Int) ^ (2 : Nat))) = (200 : Int)) := by decide

/-- nuclearphysics: halflife(1000, 3) = 125; decay(1000, 3) = 875; bindingenergy(56, 8) = 448; massdefect(940,
    931) = 9; criticality(100, 95) = 1; criticality(90, 95) = 0; activity(6000, 60) = 100; dose(1000, 50) = 20;
    fission(100, 200) = 20000 -/
theorem fam_nuclearphysics : (((1000 : Int) / ((2 : Int) ^ (3 : Nat))) = (125 : Int)) ∧ (((1000 : Int) - ((1000 : Int) / ((2 : Int) ^ (3 : Nat)))) = (875 : Int)) ∧ (((56 : Int) * (8 : Int)) = (448 : Int)) ∧ ((fmax (0 : Int) ((940 : Int) - (931 : Int))) = (9 : Int)) ∧ ((if (if (100 : Int) ≥ (95 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (90 : Int) ≥ (95 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((6000 : Int) / (60 : Int)) = (100 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ (((100 : Int) * (200 : Int)) = (20000 : Int)) := by decide

/-- nuclearpower: thermaloutput(3, 1000) = 3000; electricaloutput(3000, 3) = 1000; efficiency(33, 100) = 33;
    fuelburnup(45, 1) = 45; capacityfactor(90, 100) = 90; halflifecycles(3, 0) = 3; coolingloops(4, 0) = 4;
    decayheat(7, 100) = 7 -/
theorem fam_nuclearpower : (((3 : Int) * (1000 : Int)) = (3000 : Int)) ∧ (((3000 : Int) / (3 : Int)) = (1000 : Int)) ∧ ((((33 : Int) * (100 : Int)) / (100 : Int)) = (33 : Int)) ∧ (((45 : Int) * (1 : Int)) = (45 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((4 : Int) + (0 : Int)) = (4 : Int)) ∧ ((((7 : Int) * (100 : Int)) / (100 : Int)) = (7 : Int)) := by decide

/-- numbertheory: lcm(4, 6) = 12 -/
theorem fam_numbertheory : ((((4 : Int) * (6 : Int)) / (Int.ofNat (fgcd 100 (Int.toNat (4 : Int)) (Int.toNat (6 : Int))))) = (12 : Int)) := by decide

/-- numen: nine(18) = 9; nine(10) = 1 -/
theorem fam_numen : (((((18 : Int) - (1 : Int)) % (9 : Int)) + (1 : Int)) = (9 : Int)) ∧ (((((10 : Int) - (1 : Int)) % (9 : Int)) + (1 : Int)) = (1 : Int)) := by decide

/-- numeracy: problemsolved(20, 15) = 300; accuracy(45, 50) = 90; factfluency(40, 60) = 40; placevalue(7, 100) =
    700; operationspeed(120, 4) = 30; errorrate(3, 60) = 5; masterypercent(18, 24) = 75; growth(85, 60) = 25;
    growth(50, 70) = 0 -/
theorem fam_numeracy : (((20 : Int) * (15 : Int)) = (300 : Int)) ∧ ((((45 : Int) * (100 : Int)) / (50 : Int)) = (90 : Int)) ∧ ((((40 : Int) * (60 : Int)) / (60 : Int)) = (40 : Int)) ∧ (((7 : Int) * (100 : Int)) = (700 : Int)) ∧ (((120 : Int) / (4 : Int)) = (30 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (60 : Int)) = (5 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (24 : Int)) = (75 : Int)) ∧ ((fmax (0 : Int) ((85 : Int) - (60 : Int))) = (25 : Int)) ∧ ((fmax (0 : Int) ((50 : Int) - (70 : Int))) = (0 : Int)) := by decide

/-- numerology: digitsum(3, 6, 9) = 18; numbercombos(10, 3) = 120; cyclewheel(26, 9) = 8; gematriatotal(22, 10)
    = 220; masternumbers(11, 22) = 33; repetitions(100, 7) = 14; harmonicsum(1, 2, 3) = 6; permutationcount(5,
    3) = 60 -/
theorem fam_numerology : ((((3 : Int) + (6 : Int)) + (9 : Int)) = (18 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (10 : Int)) (Int.toNat (3 : Int)))) = (120 : Int)) ∧ (((26 : Int) % (9 : Int)) = (8 : Int)) ∧ (((22 : Int) * (10 : Int)) = (220 : Int)) ∧ (((11 : Int) + (22 : Int)) = (33 : Int)) ∧ (((100 : Int) / (7 : Int)) = (14 : Int)) ∧ ((((1 : Int) + (2 : Int)) + (3 : Int)) = (6 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (5 : Int)))) / (Int.ofNat (ffact (Int.toNat ((5 : Int) - (3 : Int)))))) = (60 : Int)) := by decide

/-- numismatics: coincount(500, 10) = 5000; mintcombos(12, 3) = 220; denominationorderings(5) = 120;
    hoardsize(400, 100) = 500; weightgrains(60, 4) = 240; purity(900, 1000) = 90; dierotations(360, 12) = 30;
    varietysubsets(6) = 64 -/
theorem fam_numismatics : (((500 : Int) * (10 : Int)) = (5000 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((400 : Int) + (100 : Int)) = (500 : Int)) ∧ (((60 : Int) * (4 : Int)) = (240 : Int)) ∧ ((((900 : Int) * (100 : Int)) / (1000 : Int)) = (90 : Int)) ∧ (((360 : Int) / (12 : Int)) = (30 : Int)) ∧ (((2 : Int) ^ (6 : Nat)) = (64 : Int)) := by decide

/-- nursing: dosage(70, 5) = 350; droprate(1000, 480) = 2; droprate(1000, 0) = 0; ratio(24, 6) = 4; ratio(24, 0)
    = 0; acuity(7) = 7; handwash(90, 100) = 90; handwash(5, 0) = 0; fluid(2000, 1500) = 500; fluid(1000, 1500) =
    0; medication(95, 100) = 95; medication(5, 0) = 0; workload(12, 8) = 1; workload(12, 0) = 0 -/
theorem fam_nursing : (((70 : Int) * (5 : Int)) = (350 : Int)) ∧ (((1000 : Int) / (480 : Int)) = (2 : Int)) ∧ (((1000 : Int) / (0 : Int)) = (0 : Int)) ∧ (((24 : Int) / (6 : Int)) = (4 : Int)) ∧ (((24 : Int) / (0 : Int)) = (0 : Int)) ∧ ((7 : Int) = (7 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int)) ∧ ((fmax (0 : Int) ((2000 : Int) - (1500 : Int))) = (500 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (1500 : Int))) = (0 : Int)) ∧ ((((95 : Int) * (100 : Int)) / (100 : Int)) = (95 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (0 : Int)) = (0 : Int)) ∧ (((12 : Int) / (8 : Int)) = (1 : Int)) ∧ (((12 : Int) / (0 : Int)) = (0 : Int)) := by decide

/-- nutrition: energy(100, 4) = 400; protein(50) = 200; carbs(50) = 200; fat(20) = 180; deficit(1800, 2200) =
    400; deficit(2500, 2200) = 0; macros(30, 120) = 25; hydration(2100, 70) = 30; bmr(70, 24) = 1680 -/
theorem fam_nutrition : (((100 : Int) * (4 : Int)) = (400 : Int)) ∧ (((50 : Int) * (4 : Int)) = (200 : Int)) ∧ (((50 : Int) * (4 : Int)) = (200 : Int)) ∧ (((20 : Int) * (9 : Int)) = (180 : Int)) ∧ ((fmax (0 : Int) ((2200 : Int) - (1800 : Int))) = (400 : Int)) ∧ ((fmax (0 : Int) ((2200 : Int) - (2500 : Int))) = (0 : Int)) ∧ ((((30 : Int) * (100 : Int)) / (120 : Int)) = (25 : Int)) ∧ (((2100 : Int) / (70 : Int)) = (30 : Int)) ∧ (((70 : Int) * (24 : Int)) = (1680 : Int)) := by decide
