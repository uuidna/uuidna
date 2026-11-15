-- lean/FamiliesJ.lean — GENERATED. THE FAMILIES, J — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a
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

/-- jainism: vows(5, 0) = 5; principles(3, 0) = 3; tirthankaras(24, 0) = 24; karmatypes(8, 0) = 8;
    substancecombos(6, 2) = 15; stageorderings(5) = 120; nonviolencelevels(5, 0) = 5; liberationpaths(3) = 8 -/
theorem fam_jainism : (((5 : Int) + (0 : Int)) = (5 : Int)) ∧ (((3 : Int) + (0 : Int)) = (3 : Int)) ∧ (((24 : Int) + (0 : Int)) = (24 : Int)) ∧ (((8 : Int) + (0 : Int)) = (8 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (6 : Int)) (Int.toNat (2 : Int)))) = (15 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (5 : Int)))) = (120 : Int)) ∧ (((5 : Int) + (0 : Int)) = (5 : Int)) ∧ (((2 : Int) ^ (3 : Nat)) = (8 : Int)) := by decide

/-- jetstream: windspeed(100, 2) = 200; altitude(10, 1000) = 10000; latitude(50, 10) = 60; meandercount(5, 3) =
    8; waveamplitude(1000, 4) = 250; rossbynumber(100, 10) = 10; coresubsets(4) = 16; shearindex(60, 100) = 60 -/
theorem fam_jetstream : (((100 : Int) * (2 : Int)) = (200 : Int)) ∧ (((10 : Int) * (1000 : Int)) = (10000 : Int)) ∧ (((50 : Int) + (10 : Int)) = (60 : Int)) ∧ (((5 : Int) + (3 : Int)) = (8 : Int)) ∧ (((1000 : Int) / (4 : Int)) = (250 : Int)) ∧ (((100 : Int) / (10 : Int)) = (10 : Int)) ∧ (((2 : Int) ^ (4 : Nat)) = (16 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (100 : Int)) = (60 : Int)) := by decide

/-- jewelry: caratweight(5, 200) = 1000; facetcount(57, 1) = 57; karatfineness(18, 24) = 75; stonecombos(12, 3)
    = 220; settingprongs(4, 2) = 6; metalgrams(10, 5) = 50; symmetryorderings(4) = 24; pricetotal(2000, 3) =
    6000 -/
theorem fam_jewelry : (((5 : Int) * (200 : Int)) = (1000 : Int)) ∧ (((57 : Int) * (1 : Int)) = (57 : Int)) ∧ ((((18 : Int) * (100 : Int)) / (24 : Int)) = (75 : Int)) ∧ ((Int.ofNat (fchoose (Int.toNat (12 : Int)) (Int.toNat (3 : Int)))) = (220 : Int)) ∧ (((4 : Int) + (2 : Int)) = (6 : Int)) ∧ (((10 : Int) * (5 : Int)) = (50 : Int)) ∧ ((Int.ofNat (ffact (Int.toNat (4 : Int)))) = (24 : Int)) ∧ (((2000 : Int) * (3 : Int)) = (6000 : Int)) := by decide

/-- jitter: meandeviation(400, 8) = 50; bufferdepth(20, 3) = 60; peaktopeak(120, 40) = 80; peaktopeak(40, 120) =
    0; playoutdelay(50, 10, 4) = 90; rfc3550estimate(16, 48) = 18; packetspacing(1000, 50) = 20 -/
theorem fam_jitter : (((400 : Int) / (8 : Int)) = (50 : Int)) ∧ (((20 : Int) * (3 : Int)) = (60 : Int)) ∧ ((fmax (0 : Int) ((120 : Int) - (40 : Int))) = (80 : Int)) ∧ ((fmax (0 : Int) ((40 : Int) - (120 : Int))) = (0 : Int)) ∧ (((50 : Int) + ((10 : Int) * (4 : Int))) = (90 : Int)) ∧ (((16 : Int) + ((fmax (0 : Int) ((48 : Int) - (16 : Int))) / (16 : Int))) = (18 : Int)) ∧ (((1000 : Int) / (50 : Int)) = (20 : Int)) := by decide

/-- job: makespan(10, 3) = 4; agents(10, 4) = 3; rounds(8) = 3; rounds(1) = 0; messages(4) = 6 -/
theorem fam_job : ((-((-(10 : Int)) / (3 : Int))) = (4 : Int)) ∧ ((-((-(10 : Int)) / (4 : Int))) = (3 : Int)) ∧ ((Int.ofNat (fclog 2 (Int.toNat (8 : Int)))) = (3 : Int)) ∧ ((Int.ofNat (fclog 2 (Int.toNat (1 : Int)))) = (0 : Int)) ∧ (((2 : Int) * ((4 : Int) - (1 : Int))) = (6 : Int)) := by decide

/-- journalism: readability(300, 20) = 15; inverted(40, 200) = 20; sources(8, 10) = 80; deadline(14, 18) = 4;
    deadline(20, 18) = 0; engagement(50, 1000) = 5; wordcount(12, 80) = 960; factcheck(9, 10) = 90; bias(3, 300)
    = 1 -/
theorem fam_journalism : (((300 : Int) / (20 : Int)) = (15 : Int)) ∧ ((((40 : Int) * (100 : Int)) / (200 : Int)) = (20 : Int)) ∧ ((((8 : Int) * (100 : Int)) / (10 : Int)) = (80 : Int)) ∧ ((fmax (0 : Int) ((18 : Int) - (14 : Int))) = (4 : Int)) ∧ ((fmax (0 : Int) ((18 : Int) - (20 : Int))) = (0 : Int)) ∧ ((((50 : Int) * (100 : Int)) / (1000 : Int)) = (5 : Int)) ∧ (((12 : Int) * (80 : Int)) = (960 : Int)) ∧ ((((9 : Int) * (100 : Int)) / (10 : Int)) = (90 : Int)) ∧ ((((3 : Int) * (100 : Int)) / (300 : Int)) = (1 : Int)) := by decide

/-- jumping: height(500, 2) = 250; hangtime(1000, 10) = 100; takeoffvelocity(3, 2) = 6; horizontalrange(5, 8) =
    40; power(800, 3) = 2400; approachspeed(3000, 300) = 10; impulse(70, 5) = 350; netheight(250, 30) = 220 -/
theorem fam_jumping : (((500 : Int) / (2 : Int)) = (250 : Int)) ∧ (((1000 : Int) / (10 : Int)) = (100 : Int)) ∧ (((3 : Int) * (2 : Int)) = (6 : Int)) ∧ (((5 : Int) * (8 : Int)) = (40 : Int)) ∧ (((800 : Int) * (3 : Int)) = (2400 : Int)) ∧ (((3000 : Int) / (300 : Int)) = (10 : Int)) ∧ (((70 : Int) * (5 : Int)) = (350 : Int)) ∧ ((fmax (0 : Int) ((250 : Int) - (30 : Int))) = (220 : Int)) := by decide
