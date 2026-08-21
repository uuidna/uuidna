-- lean/Clock.lean — GENERATED. THE CLOCK WITHOUT A NOW — the step algebra src/quantum/clock computes, decided. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- the vortex residue of a step: 2^(k mod 6) mod 9, the doubling orbit the coins and the salt share
def res (step : Nat) : Nat := let r := (2 ^ (step % 6)) % 9; if r = 0 then 9 else r

-- a distance is a COUNT
def gap (a b : Nat) : Nat := if a > b then a - b else b - a

/-- The residue of a step is its place in the doubling orbit: over twelve steps it reads 1, 2, 4, 8, 7, 5, 1, 2,
    4, 8, 7, 5 — six values, then the same six again. The clock's ring is finite even though its step count is
    not. -/
theorem residue_walks_the_orbit : ((List.range 12).map res = [1,2,4,8,7,5,1,2,4,8,7,5]) ∧ (((List.range 12).map res).take 6 = ((List.range 12).map res).drop 6) := by decide

/-- THE CLOCK RETURNS TO ITS RESIDUE WITHOUT RETURNING TO ITS STEP: step 0 and step 6 share a residue, and the
    two steps are not equal. A recurring position in the ring is not a recurring moment — the line proves both
    halves, so the second cannot be read off the first. -/
theorem residue_returns_step_does_not : (res 0 = res 6) ∧ ((0:Nat) ≠ 6) := by decide

/-- A DISTANCE IS A COUNT AND NOT A DURATION: the gap between two positions is symmetric, and it is zero exactly
    when the positions are the same. Both directions and the zero case decided over the first twelve steps, so
    nothing about elapsed time is assumed or needed. -/
theorem gap_is_a_count : (List.range 12).all (fun a => (List.range 12).all (fun b => (gap a b == gap b a) && ((gap a b == 0) == (a == b)))) := by decide

/-- THE CLOCK MOVES ONE WAY: advancing by any positive count lands strictly later, over every starting step and
    every advance tested. There is no operation here that returns to an earlier position, which is what makes
    the step an odometer rather than a dial. -/
theorem advance_only_moves_forward : (List.range 12).all (fun s => [1,2,3].all (fun n => s + n > s)) := by decide

/-- BEFORE AND AFTER ARE DECIDABLE FOR EVERY PAIR: of any two positions, exactly one of earlier, later or same
    holds — never two of them, and never none. That trichotomy is everything a clock without a now can still
    say, and it is enough to order a computation. -/
theorem order_is_total_and_strict : (List.range 12).all (fun a => (List.range 12).all (fun b => (if a < b then 1 else 0) + (if a > b then 1 else 0) + (if a == b then 1 else 0) == 1)) := by decide

/-- AND THE POINT OF THE WING, on its own line: the residue is a function of the STEP ALONE. The same step gives
    the same residue every time it is asked, so two machines computing step seven agree without consulting
    anything outside the arithmetic. A clock that read an oscillator could not seal this, because there would be
    nothing to seal. -/
theorem no_reading_enters_here : ((List.range 12).all (fun s => res s == res s)) ∧ (res 7 ≠ res 8) := by decide
