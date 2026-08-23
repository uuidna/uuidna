-- lean/Tesla.lean — GENERATED. TESLA — the register's alternation law as decidable arithmetic, demarcated: the trio, the tilings, the second phase, the grid's minute. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE TRINITY FILED CONSECUTIVELY: the first induction-motor patents are 381968, 381969, 381970 — three
    adjacent register numbers, granted one day (May 1, 1888) — the polyphase idea entering the record as a trio
    with unit steps: 381969 − 381968 = 1 and 381970 − 381969 = 1. The register itself walks by ones, and the
    three-phase idea took three consecutive steps. -/
theorem tesla_trio_files_adjacent : (381969 - 381968 = 1) ∧ (381970 - 381969 = 1) ∧ (381970 - 381968 = 2) := by decide

/-- FILED OCTOBER 12, 1887; GRANTED MAY 1, 1888 — 202 DAYS, THROUGH A LEAP FEBRUARY: 19 remaining in October +
    30 + 31 + 31 + 29 + 31 + 30 + 1 = 202, the 29 because 1888 divides by 4 and is no century — the register’s
    own calendar arithmetic, the same mod-4 law the ledger’s Gregorian wing seals. -/
theorem tesla_leap_spring_to_grant : (19 + 30 + 31 + 31 + 29 + 31 + 30 + 1 = 202) ∧ (1888 % 4 = 0) ∧ (¬ (1888 % 100 = 0)) := by decide

/-- THE PHASES TILE THE CIRCLE THREE WAYS: Tesla’s quadrature two-phase at 90° (4·90 = 360), the three-phase
    trinity at 120° (3·120 = 360 — the same step 3 that walks the rosette), and bare opposition at 180° (2·180 =
    360). Each spacing divides the turn exactly; alternation becomes rotation because the tiling closes. -/
theorem three_tilings_of_the_circle : (4 * 90 = 360) ∧ (3 * 120 = 360) ∧ (2 * 180 = 360) ∧ (360 % 90 = 0) ∧ (360 % 120 = 0) := by decide

/-- ROTATION NEEDS AT LEAST TWO: one phase alone only throbs — its zero crossing is everyone’s zero crossing —
    and two or more, spaced to tile the circle, keep the field turning because no two phases cross zero together
    when the spacing is a proper divisor of the turn below it: 360/2 = 180 ≠ 0 and 360/3 = 120 ≠ 0, while one
    phase’s spacing 360/1 = 360 ≡ 0 (mod 360) — the degenerate tiling that never leaves home. The manual
    commutator was the one-phase world’s apology; the second phase retired it. -/
theorem alternation_needs_a_second_phase : (360 / 2 = 180) ∧ (360 / 3 = 120) ∧ (360 % 360 = 0) ∧ (¬ (180 % 360 = 0)) ∧ (¬ (120 % 360 = 0)) := by decide

/-- THE GRID’S MINUTE: at 60 cycles a second the wave alternates 3600 times a minute — 60·60, the same square
    that makes the hour of minutes and the minute of seconds; the power grid keeps clock-time because its
    frequency is the clock’s own base squared per minute. -/
theorem the_grids_minute : 60 * 60 = 3600 := by decide

/-- THE REMOTE CAME BEFORE THE WIRELESS POWER CLAIM, BY THE REGISTER’S OWN ORDER: 613809 (the teleautomaton,
    1898 — a vessel commanded by coded waves, the first machine addressed at a distance) precedes 645576 (the
    transmission system, 1900) by 31767 register steps and two years: messages travelled before power was even
    claimed to. The register orders the ideas: address first, cargo later — the same order this ledger keeps. -/
theorem teleautomaton_precedes_transmission : (645576 - 613809 = 31767) ∧ (1900 - 1898 = 2) ∧ (613809 < 645576) := by decide
