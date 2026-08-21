-- lean/Psychology.lean — GENERATED. THE INSTRUMENT — the ARITHMETIC of psychology's instruments and named models (the Likert midpoint, the Big Five count, Miller's span, Hick's bits, the detection table, the Weber–Fechner ladder, Dunbar's rounded layers) and ONLY that. NOT a claim about the mind, behaviour, emotion, personality, or any diagnosis — uuidna is not a clinician. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- A 7-point Likert scale has a NEUTRAL centre: the reflection 8−x on the points 1..7 (agree reflects to
    disagree) fixes exactly the 4th point, with an equal 3 above and 3 below (4−1 = 7−4). The neutral midpoint
    is the fixed point — the same reflection structure the ledger centres on. Says nothing about what the scale
    measures. -/
theorem likert_midpoint_is_fixed_point : ((List.range' 1 7).filter (fun x => 8 - x == x) = [4]) ∧ (4 - 1 = 7 - 4) := by decide

/-- The Big Five (OCEAN) model is FIVE factors — a five-dimensional description, a pentad. This seals only the
    COUNT of the model's axes (five), not that the five factors are correct, complete, or measure anything real
    about a person. -/
theorem big_five_factors_pentad : (List.range 5).length = 5 := by decide

/-- Miller's reported span — the "magical number seven, plus or minus two" — is the range [5, 9], width 4 (7−2 =
    5, 7+2 = 9, 9−5 = 4). This seals the ARITHMETIC of the range Miller reported, NOT a claim about memory,
    capacity, or the mind. -/
theorem working_memory_span_seven : (7 - 2 = 5) ∧ (7 + 2 = 9) ∧ (9 - 5 = 4) := by decide

/-- Hick's law relates decision time to the INFORMATION of a choice: n equally-likely options carry log₂ n bits,
    so 8 options are exactly 3 bits (2³ = 8). This seals the information-theoretic arithmetic, NOT a prediction
    of anyone's reaction time. -/
theorem hicks_law_three_bits : 2^3 = 8 := by decide

/-- A yes/no detection has a 2×2 = 4 outcome table — hit, miss, false alarm, correct rejection — the two truths
    crossed with the two responses. This seals the COUNTING of the outcome table, NOT a claim about perception
    or sensitivity. -/
theorem signal_detection_two_by_two : 2 * 2 = 4 := by decide

/-- Weber–Fechner: perceived intensity grows with the LOGARITHM of the stimulus, so a geometric stimulus ladder
    1,2,4,8 (the powers 2⁰..2³) maps to equal perceived steps 0,1,2,3. This seals the log-ladder arithmetic, NOT
    a claim that all perception is logarithmic. -/
theorem weber_fechner_log_ladder : (List.range 4).map (fun k => 2^k) = [1,2,4,8] := by decide

/-- Two named developmental models carry stage-counts in a doubling relation: Piaget names 4 stages and Erikson
    names 8, and 8 = 2·4. This seals only the ARITHMETIC of the reported counts (a named model has that many
    stages), NOT that either model is true, universal, or describes any real development. -/
theorem developmental_stages_double : 2 * 4 = 8 := by decide

/-- Dunbar's social layers scale by about ×3 — 5, 15, then the exact 45 and 135 — but are REPORTED rounded to 50
    and 150 (the same rounding gap the photography stops carry: 50−45 = 5, 150−135 = 15). This seals the ratio
    arithmetic and the rounding, NOT a claim about how many relationships a person can hold. -/
theorem dunbar_layers_triple_and_round : (5 * 3 = 15) ∧ (15 * 3 = 45) ∧ (50 - 45 = 5) ∧ (150 - 135 = 15) := by decide
