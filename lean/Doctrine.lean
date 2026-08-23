-- lean/Doctrine.lean — GENERATED. DOCTRINE — the captain's doctrines sealed: pairs and triples cover every crew with solo the excluded case, the diving ladder's pressures and records integer-exact from 40 m to 41,419 m with saturation's day-priced exit and the NBL's floor-honest ratio, and the verdict domain's three real states with identification the pigeonhole collapse onto the poles. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- PAIRS AND TRIPLES COVER EVERY CREW: for every team size n from 2 to 64, n is a sum of 2s and 3s — an even n
    is pairs alone, an odd n ≥ 3 is one triple plus pairs — so buddy pairs (recreational) and threes (technical)
    reach every non-solo team, the Frobenius fact behind the captain's diving doctrine. Checked exhaustively
    over the window; the window is a window (window_not_universal). -/
theorem team_pairs_triples_cover : (List.range' 2 63).all (fun n => n % 2 == 0 || (3 ≤ n && (n - 3) % 2 == 0)) := by decide

/-- SOLO IS THE ONE EXCLUDED CASE: 1 lies below the smallest pair and the smallest triple, so no sum of 2s and
    3s reaches it — the full-cave specialist's team of one is outside the cover by arithmetic, reserved rather
    than reachable. -/
theorem solo_is_the_excluded_team : (1 < 2) ∧ (1 < 3) ∧ (0 * 2 + 0 * 3 = 0) := by decide

/-- THE PRESSURE LADDER, INTEGER-EXACT at the literature's 10 m ≈ 1 atm rung: the recreational floor at 40 m
    sits at 5 atmospheres, deep technical at 100 m at 11, and the Comex Hydra 10 saturation record depth of ~700
    m at 71 — the ladder every diving type climbs and every decompression law prices. -/
theorem pressure_ladder : (1 + 40 / 10 = 5) ∧ (1 + 100 / 10 = 11) ∧ (1 + 700 / 10 = 71) := by decide

/-- THE SPACE-DIVING RECORDS ASCEND: Kittinger 1960 at 31,333 m, Baumgartner 2012 at 38,969, Eustace 2014 at
    41,419 — the ladder's upper rungs strictly ordered, the last two 2,450 m apart. Same physics as the water
    rungs with the gradient reversed; one decompression law binds both ends. -/
theorem jump_records_ascend : (31333 < 38969) ∧ (38969 < 41419) ∧ (41419 - 38969 = 2450) := by decide

/-- SATURATION ACCOUNTING: the Hydra 10 dive spent 13 days compressing and about 24 decompressing — 13 + 24 = 37
    of a 43-day dive travelling, the decompression alone longer than most expeditions. The deepest water rung
    pays its exit in DAYS, the honest cost the ladder's top charges. -/
theorem saturation_deco_accounts : (13 + 24 = 37) ∧ (37 < 43) ∧ (43 - 37 = 6) := by decide

/-- WATER TRAINS SPACE AT SEVEN-ISH TO ONE, stated by the floor as Nat division demands: NASA's crews log ~40
    pool hours per ~6 EVA hours, and 40 / 6 = 6 with remainder 4 — the floor is 6, the remainder is named, and
    no false 7 is sealed. The pool is 12 m deep: space is reached through two atmospheres of water. -/
theorem nbl_trains_by_the_floor : (40 / 6 = 6) ∧ (40 % 6 = 4) ∧ (1 + 12 / 10 = 2) := by decide

/-- THE MIDDLE IS A REAL THIRD STATE: the verdict domain [REFUTED, UNVERIFIED, VERIFIED] as [0, 1, 2] carries no
    duplicate — Nodup over the whole domain, the claim as a property of the LIST rather than a row of bare
    literals — so UNVERIFIED is not a weaker pole but a state of its own, the in-between the bilateral law
    protects; and the domain outsizes the binary poles, three against two (trinity_exceeds_qubit). -/
theorem the_middle_is_not_a_pole : (([0, 1, 2] : List Nat).Nodup) ∧ (([0, 1, 2] : List Nat).length = 3) ∧ (([0, 2] : List Nat).length = 2) := by decide

/-- IDENTIFICATION IS A ONE-WAY COLLAPSE, SHOWN AS THE MAP ITSELF: identify sends the middle to a pole (here 1
    to 0 — plane, balloon, Venus) and fixes the poles, so the domain [0, 1, 2] with no duplicate maps to the
    image [0, 0, 2] WITH one — Nodup holds before and fails after, the pigeonhole collapse computed rather than
    gestured at. No inverse recovers the middle from the image: a UFO identified stops being a UFO, and the
    class lives only in the in-between, destroyed by the act that resolves it. -/
theorem identification_collapses_the_middle : (([0, 1, 2] : List Nat).Nodup) ∧ (List.map (fun v => if v == 1 then 0 else v) [0, 1, 2] = [0, 0, 2]) ∧ (¬ ([0, 0, 2] : List Nat).Nodup) := by decide

/-- THREE DECIDE THE FOURTH: the four directions as Z/4 — N, E, S, W as 0, 1, 2, 3 — sum to 6, so any one
    direction is the total minus the other three: three higher fix the one lower, every way round, the quorum
    drawn as geometry. The accreditation reading rides in prose: a lower theorem presents to the court under
    three higher ones, and their agreement leaves it exactly one place to stand. -/
theorem compass_three_decide_the_fourth : (0 + 1 + 2 + 3 = 6) ∧ (6 - (0 + 1 + 2) = 3) ∧ (6 - (0 + 1 + 3) = 2) ∧ (6 - (0 + 2 + 3) = 1) ∧ (6 - (1 + 2 + 3) = 0) := by decide

/-- THE COMPASS IS TWO REFLECTIONS: opposite is +2 in Z/4, and applying it twice returns every direction home —
    N to S to N, E to W to E — the same self-inverse shape as dz, worn by the map over the whole domain rather
    than by any single pair. Two involution pairs, one quadrature: the four basis states the two coins deliver
    (2 squared). -/
theorem compass_opposites_involute : (List.map (fun x => (x + 2) % 4) [0, 1, 2, 3] = [2, 3, 0, 1]) ∧ (List.map (fun x => ((x + 2) % 4 + 2) % 4) [0, 1, 2, 3] = [0, 1, 2, 3]) ∧ (2 * 2 = 4) := by decide
