-- lean/LandRights.lean — GENERATED. The right to land and the public's access to it — integers from src/rights/land-instruments.json, each instrument read from its official source; integrity of the table, not legal advice Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- each of the 12 instruments that carry both years entered into force no earlier than it was adopted -/
theorem land_rights_enter_force_no_earlier_than_adopted : ([(1966, 1976), (1966, 1976), (1989, 1991), (1998, 2001), (1981, 1986), (1969, 1978), (1957, 1957), (2004, 2004), (1991, 1991), (2007, 2008), (2011, 2011), (1999, 2000)].all (fun p => p.1 ≤ p.2)) ∧ ([(1966, 1976), (1966, 1976), (1989, 1991), (1998, 2001), (1981, 1986), (1969, 1978), (1957, 1957), (2004, 2004), (1991, 1991), (2007, 2008), (2011, 2011), (1999, 2000)].map (fun p => p.2 - p.1) = [10, 10, 2, 3, 5, 9, 0, 0, 0, 1, 0, 1]) := by decide

/-- every one of the 5 recorded votes adds up to its total and carries its majority -/
theorem land_rights_recorded_votes_carry_their_majorities : ([(48, 0, 8), (143, 4, 11), (121, 8, 54), (161, 0, 8), (43, 0, 4)].all (fun v => v.1 > v.2.1 + v.2.2)) ∧ ([(48, 0, 8), (143, 4, 11), (121, 8, 54), (161, 0, 8), (43, 0, 4)].map (fun v => v.1 + v.2.1 + v.2.2) = [56, 158, 183, 169, 47]) := by decide

/-- each of the 2 environment-right resolutions drew zero votes against -/
theorem the_environment_right_drew_no_vote_against : ([0, 0].length > 0) ∧ ([0, 0].all (fun n => n == 0)) := by decide

/-- the innmark closed season sums to 168 days over its 7 month segments -/
theorem norway_innmark_is_closed_one_hundred_sixty_eight_days : 30 - 30 + 1 + [31, 30, 31, 31, 30].foldl (· + ·) 0 + 14 = 168 := by decide

/-- all 15 access instruments were adopted after the Charter of the Forest -/
theorem access_laws_stand_centuries_after_the_charter_of_the_forest : ([1948, 1966, 2012, 1974, 1998, 1957, 2003, 2000, 2004, 2013, 1991, 2007, 2011, 1999, 1892].all (fun y => 1217 < y)) ∧ ([1948, 1966, 2012, 1974, 1998, 1957, 2003, 2000, 2004, 2013, 1991, 2007, 2011, 1999, 1892].map (fun y => y - 1217) = [731, 749, 795, 757, 781, 740, 786, 783, 787, 796, 774, 790, 794, 782, 675]) := by decide

/-- Bulgaria’s 4 access instruments were each adopted in a later year, the constitution first -/
theorem bulgarias_access_instruments_follow_its_constitution : ([1991, 1999, 2007, 2011].length > 1) ∧ (([1991, 1999, 2007, 2011].zip [1991, 1999, 2007, 2011].tail).all (fun p => p.1 < p.2)) := by decide

/-- every one of the 16 access instruments records a qualification -/
theorem every_access_instrument_is_qualified : ([133, 119, 98, 209, 88, 111, 133, 143, 485, 213, 124, 256, 265, 150, 109, 110].length > 0) ∧ ([133, 119, 98, 209, 88, 111, 133, 143, 485, 213, 124, 256, 265, 150, 109, 110].all (fun n => n > 0)) := by decide
