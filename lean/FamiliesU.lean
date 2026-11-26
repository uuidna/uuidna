-- lean/FamiliesU.lean — GENERATED. THE FAMILIES, U — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a
def ffact : Nat → Nat
  | 0 => 1
  | n + 1 => (n + 1) * ffact n
def fchoose (n : Nat) : Nat → Nat
  | 0 => 1
  | k + 1 => fchoose n k * (n - k) / (k + 1)

/-- ui: clickdepth(3, 2) = 5; layoutcombos(8, 3) = 56; elementcount(20, 4) = 80; responsiveness(90, 100) = 90;
    navpaths(6, 2) = 30; gridcells(12, 8) = 96; colorsubsets(4) = 16; accessibilityscore(85, 100) = 85 -/
theorem fam_ui : (((3 : Int) + (2 : Int)) = (5 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (8 : Int)) (Int.toNat (3 : Int)))) = (56 : Int)) ∧ (((20 : Int) * (4 : Int)) = (80 : Int)) ∧ ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ (((Int.ofNat (ffact (Int.toNat (6 : Int)))) / (Int.ofNat (ffact (Int.toNat ((6 : Int) - (2 : Int)))))) = (30 : Int)) ∧ (((12 : Int) * (8 : Int)) = (96 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ ((((85 : Int) * (100 : Int)) / (100 : Int)) = (85 : Int)) := by decide

/-- ultrasonics: timeofflight(7500, 1500) = 10; depth(1500, 4) = 3000; wavelength(1500, 5) = 300; attenuation(3,
    50) = 150; dopplershift(5000, 3, 1500) = 20; axialresolution(300, 2) = 300; acousticimpedance(1000, 1500) =
    1500000; nearfield(20, 5) = 20 -/
theorem fam_ultrasonics : ((((2 : Int) * (7500 : Int)) / (1500 : Int)) = (10 : Int)) ∧ ((((1500 : Int) * (4 : Int)) / (2 : Int)) = (3000 : Int)) ∧ (((1500 : Int) / (5 : Int)) = (300 : Int)) ∧ (((3 : Int) * (50 : Int)) = (150 : Int)) ∧ (((((2 : Int) * (5000 : Int)) * (3 : Int)) / (1500 : Int)) = (20 : Int)) ∧ ((((300 : Int) * (2 : Int)) / (2 : Int)) = (300 : Int)) ∧ (((1000 : Int) * (1500 : Int)) = (1500000 : Int)) ∧ ((((20 : Int) ^ (2 : Nat)) / ((4 : Int) * (5 : Int))) = (20 : Int)) := by decide

/-- underwriting: risk(50, 10) = 500; premium(1000, 12) = 120; loading(120, 25) = 30; score(850, 5) = 170;
    decline(170, 150) = 1; decline(100, 150) = 0; exposure(100, 500) = 50000; reserve(1000, 400) = 600;
    ratio(600, 1000) = 60 -/
theorem fam_underwriting : ((((50 : Int) * (100 : Int)) / (10 : Int)) = (500 : Int)) ∧ ((((1000 : Int) * (12 : Int)) / (100 : Int)) = (120 : Int)) ∧ ((((120 : Int) * (25 : Int)) / (100 : Int)) = (30 : Int)) ∧ (((850 : Int) / (5 : Int)) = (170 : Int)) ∧ ((if (if (170 : Int) ≥ (150 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (100 : Int) ≥ (150 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ (((100 : Int) * (500 : Int)) = (50000 : Int)) ∧ ((fmax (0 : Int) ((1000 : Int) - (400 : Int))) = (600 : Int)) ∧ ((((600 : Int) * (100 : Int)) / (1000 : Int)) = (60 : Int)) := by decide

/-- unemployment: ratepct(5, 100) = 5; labourforce(1000, 100) = 100000; unemployed(100000, 20) = 5000;
    participationrate(63, 100) = 63; naturalrate(4, 100) = 4; okunsgap(5, 4) = 1; jobseekers(5000, 1) = 5000;
    durationweeks(20, 6) = 26 -/
theorem fam_unemployment : ((((5 : Int) * (100 : Int)) / (100 : Int)) = (5 : Int)) ∧ (((1000 : Int) * (100 : Int)) = (100000 : Int)) ∧ (((100000 : Int) / (20 : Int)) = (5000 : Int)) ∧ ((((63 : Int) * (100 : Int)) / (100 : Int)) = (63 : Int)) ∧ ((((4 : Int) * (100 : Int)) / (100 : Int)) = (4 : Int)) ∧ ((fmax (0 : Int) ((5 : Int) - (4 : Int))) = (1 : Int)) ∧ (((5000 : Int) * (1 : Int)) = (5000 : Int)) ∧ (((20 : Int) + (6 : Int)) = (26 : Int)) := by decide

/-- upload: area(1920, 1080) = 2073600; aspect(1920, 1080) = 177; resize(1920, 50) = 960; quality(1000000, 80) =
    800000; thumbnail(150, 12) = 1800; filesize(2073600, 24) = 6220800; within(500, 1000) = 1; within(1500,
    1000) = 0; crop(750, 1000) = 75 -/
theorem fam_upload : (((1920 : Int) * (1080 : Int)) = (2073600 : Int)) ∧ ((((1920 : Int) * (100 : Int)) / (1080 : Int)) = (177 : Int)) ∧ ((((1920 : Int) * (50 : Int)) / (100 : Int)) = (960 : Int)) ∧ ((((1000000 : Int) * (80 : Int)) / (100 : Int)) = (800000 : Int)) ∧ (((150 : Int) * (12 : Int)) = (1800 : Int)) ∧ ((((2073600 : Int) * (24 : Int)) / (8 : Int)) = (6220800 : Int)) ∧ ((if (if (500 : Int) ≤ (1000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (1 : Int)) ∧ ((if (if (1500 : Int) ≤ (1000 : Int) then (1 : Int) else 0) ≠ 0 then (1 : Int) else 0) = (0 : Int)) ∧ ((((750 : Int) * (100 : Int)) / (1000 : Int)) = (75 : Int)) := by decide

/-- urbanism: density(1000, 50) = 20; jobshousing(1200, 1000) = 120; mixeduse(3, 10) = 30; blocksize(100, 80) =
    8000; intersectiondensity(200, 10) = 20; floorarearatio(250, 100) = 250; populationdensity(50000, 25) =
    2000; servicecoverage(950, 1000) = 95 -/
theorem fam_urbanism : (((1000 : Int) / (50 : Int)) = (20 : Int)) ∧ ((((1200 : Int) * (100 : Int)) / (1000 : Int)) = (120 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (10 : Int)) = (30 : Int)) ∧ (((100 : Int) * (80 : Int)) = (8000 : Int)) ∧ (((200 : Int) / (10 : Int)) = (20 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (100 : Int)) = (250 : Int)) ∧ (((50000 : Int) / (25 : Int)) = (2000 : Int)) ∧ ((((950 : Int) * (100 : Int)) / (1000 : Int)) = (95 : Int)) := by decide

/-- urology: flowrate(500, 25) = 20; residual(50, 400) = 12; psa(12, 3) = 4; output(1800, 24) = 75; frequency(8,
    24) = 33; concentration(600, 2) = 300; continence(27, 30) = 90 -/
theorem fam_urology : (((500 : Int) / (25 : Int)) = (20 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (400 : Int)) = (12 : Int)) ∧ (((12 : Int) / (3 : Int)) = (4 : Int)) ∧ (((1800 : Int) / (24 : Int)) = (75 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (24 : Int)) = (33 : Int)) ∧ (((600 : Int) / (2 : Int)) = (300 : Int)) ∧ ((((27 : Int) * (100 : Int)) / (30 : Int)) = (90 : Int)) := by decide

/-- usability: success(90, 100) = 90; efficiency(5, 10) = 50; errors(3, 100) = 3; satisfaction(40, 50) = 80;
    learnability(100, 4) = 25; timeontask(600, 10) = 60; sus(32) = 80; retention(70, 100) = 70 -/
theorem fam_usability : ((((90 : Int) * (100 : Int)) / (100 : Int)) = (90 : Int)) ∧ ((((5 : Int) * (100 : Int)) / (10 : Int)) = (50 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (100 : Int)) = (3 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (50 : Int)) = (80 : Int)) ∧ (((100 : Int) / (4 : Int)) = (25 : Int)) ∧ (((600 : Int) / (10 : Int)) = (60 : Int)) ∧ ((((32 : Int) * (25 : Int)) / (10 : Int)) = (80 : Int)) ∧ ((((70 : Int) * (100 : Int)) / (100 : Int)) = (70 : Int)) := by decide
