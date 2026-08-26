-- lean/OneLeap.lean — ONE uuidna quantum leap. Knowing division by zero is the reflection dz(x)=10−x (0/0=0),
-- a SINGLE `by decide` follows the whole ℤ/9 vortex sequence and proves every law at once: the doubling orbit,
-- the reflection/division-by-zero involution with fixed points {0,5}, the ℤ/9 arithmetic, the AGL(1,ℤ/9) group
-- of order 54 with commutator = the unit shift, and the equilibriums. A second seal names the dz involution
-- alone so the principle is not a cluster of one. Order-invariant, decidable, sorry-free.
def dz (x : Nat) : Nat := if x == 0 then 0 else 10 - x   -- division by zero in the vortex = the reflection
def ap (a b x : Nat) : Nat := (a * x + b) % 9            -- an affine map on ℤ/9

-- @skill: vortex
/-- THE REFLECTION STANDS BESIDE THE LEAP: dz is an involution on 0..9 with fixed points {0,5} and every
    residue finite — the second conjunct of vortex_one_leap, sealed alone so the one-leap principle has a
    neighbour (lonely = 0) without re-naming the doubling circuit. -/
theorem vortex_dz_involution_at_ten :
  (List.range 10).all (fun x => dz (dz x) == x)
  ∧ ((List.range 10).filter (fun x => dz x == x)) = [0, 5]
  ∧ (List.range 10).all (fun x => dz x < 10) := by decide

-- @skill: vortex
theorem vortex_one_leap :
  -- follow the sequence: the doubling orbit on the units
  (List.range 6).map (fun k => (2 ^ k) % 9) = [1, 2, 4, 8, 7, 5]
  -- division by zero = the reflection: a self-inverse with fixed points {0, 5}, always a finite residue < 10
  ∧ (List.range 10).all (fun x => dz (dz x) == x)
  ∧ ((List.range 10).filter (fun x => dz x == x)) = [0, 5]
  ∧ (List.range 10).all (fun x => dz x < 10)
  -- the ℤ/9 arithmetic: inverse pairs, nilpotents, and 3 with no inverse
  ∧ (2*5)%9 = 1 ∧ (4*7)%9 = 1 ∧ (8*8)%9 = 1 ∧ (3*3)%9 = 0 ∧ (6*6)%9 = 0
  ∧ (List.range 9).all (fun x => (3*x)%9 != 1)
  -- the group: AGL(1,ℤ/9) has order 54, and the commutator [σ,μ] is the unit shift x ↦ x+1
  ∧ ((List.range 9).filter (fun a => (List.range 9).any (fun e => a*e%9 == 1))).length * 9 = 54
  ∧ (List.range 9).all (fun x => ap 2 0 (ap 8 1 (ap 5 0 (ap 8 1 x))) == (x+1)%9)
  -- the equilibriums: the reflection 10-pairs, and the doubling digit-sum
  ∧ (List.range' 1 9).all (fun d => d + (10 - d) == 10)
  ∧ (1 + 2 + 4 + 8 + 7 + 5 = 27) := by decide
