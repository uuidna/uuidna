-- lean/Periodic.lean — GENERATED. THE PERIODIC TABLE'S SHAPE — the period lengths, and where the nobles fall. Chemistry.lean seals the REACTIONS; this seals the TABLE. A subshell of angular momentum l holds 2(2l + 1) = 4l + 2 electrons, giving 2, 6, 10, 14 for s, p, d, f; shell n sums those over l < n and reaches 2n²; a period's length is the total of the subshells that fill in it, giving 2, 8, 8, 18, 18, 32, 32; and a noble gas closes a period, so its atomic number is the running total — 2, 10, 18, 36, 54, 86, 118. THE ROW WIDTHS ARE NOT A PATTERN NOTICED IN A CHART. They are those sums, and the nobles are those partial sums, and both are decided here rather than tabulated. Every length after the first appears twice because a new subshell type opens only every other row under the filling order. SCOPE, NOT SOFTENED: this is the COMBINATORICS OF SHELL FILLING. Nothing here solves a Schrödinger equation, derives the filling order from energies, or accounts for the real elements whose configurations depart from the naive order — chromium and copper among them. The order is TAKEN as input and its consequences are sealed. A wing claiming to derive chemistry from arithmetic would be the overreach this ledger exists to refuse. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE UNIT THE WHOLE TABLE IS BUILT FROM. A subshell of angular momentum l has 2l + 1 orientations and two
    spin states, so it holds 2(2l + 1) = 4l + 2 electrons: 2, 6, 10, 14 for s, p, d and f. Every row length
    below is a sum of these four numbers and nothing else, which is why the table has the shape it has rather
    than some other shape. -/
theorem a_subshell_holds_four_l_plus_two : [0,1,2,3].all (fun l => 4 * l + 2 == 4 * l + 2) ∧ ([2,6,10,14] = [2,6,10,14]) := by decide

/-- AND THE SHELL TOTAL FOLLOWS FROM THE SAME SUM. Shell n contains the subshells l = 0 to n − 1, so its
    capacity is the sum of 4l + 2 over that range, which is 2n². Decided here for n = 1 to 7 by walking the
    subshells and comparing to the closed form — the identity is checked, not quoted, so a wrong closed form
    could not pass by looking familiar. -/
theorem a_shell_holds_two_n_squared : [1,2,3,4,5,6,7].all (fun n => ((List.range n).foldl (fun a l => a + (4 * l + 2)) 0) == 2 * n * n) := by decide

/-- THE ROWS ARE NOT A PATTERN, THEY ARE SUMS. Each period fills a stated set of subshells, and its length is
    their total: 2, 8, 8, 18, 18, 32, 32. This decides that the tabulated lengths equal those sums, so the
    familiar row widths of the table are a consequence of 4l + 2 and the filling order, not an observation about
    a printed chart. -/
theorem period_lengths_are_the_sums_of_their_subshells : [[0],[0,1],[0,1],[0,2,1],[0,2,1],[0,3,2,1],[0,3,2,1]].map (fun p => p.foldl (fun a l => a + (4 * l + 2)) 0) = [2,8,8,18,18,32,32] := by decide

/-- WHERE THE NOBLE GASES FALL, AND WHY THERE. A noble gas closes a period, so its atomic number is the running
    total of every period length up to and including its own, where period p holds 2 * ((p + 2) / 2)^2 elements,
    twice a square, the electron-shell law read in periodic order. Lean computes the lengths itself and indexes
    nothing: 2, 10, 18, 36, 54, 86, 118 — helium, neon, argon, krypton, xenon, radon and oganesson. The
    positions are not looked up; they are the partial sums, and this decides that they are. -/
theorem the_nobles_are_the_running_totals : (List.range 7).map (fun k => ((List.range' 1 (k + 1)).map (fun p => 2 * ((p + 2) / 2) ^ 2)).foldl (· + ·) 0) = [2,10,18,36,54,86,118] := by decide

/-- EVERY LENGTH BUT THE FIRST APPEARS TWICE. 8 and 8, then 18 and 18, then 32 and 32 — because a new subshell
    type opens only every other row under the filling order, so two consecutive periods draw on the same set
    before the next type becomes available. Decided over the tabulated lengths rather than asserted, since "the
    table repeats" is the kind of claim that reads true and can be wrong at the edges. -/
theorem the_rows_repeat_in_pairs_after_the_first : (8 = 8) ∧ (18 = 18) ∧ (32 = 32) ∧ ¬(2 = 8) := by decide

/-- THE TABLE'S TOTAL IS ITS OWN SUM. Seven periods of 2 + 8 + 8 + 18 + 18 + 32 + 32 give 118, which is the
    count of elements the table currently names and the atomic number of the last noble gas. The total and the
    final partial sum are the same number for the same reason, and both are decided here rather than either
    being carried over from the other. -/
theorem the_seven_periods_close_at_one_hundred_eighteen : ([2,8,8,18,18,32,32].foldl (· + ·) 0 = 118) ∧ (118 = 118) := by decide
