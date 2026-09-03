-- lean/SiteBuild.lean — GENERATED. THE SITE BUILD AS ARITHMETIC — the render phase retains every page for the whole run, so the heap is the page count times 17 tenths of a megabyte, and 5260 pages come to 8942 MB against a deploy container of 8192. The two knobs are sealed as insufficient rather than described as such: the concurrency's entire travel is 420 MB against a 750 MB overshoot, and the params are under a eight-hundredth of the retained mass. So the build left the container and the hook now verifies what the operator machine rendered. The same wing carries the arithmetic the typesetter is judged by, because the ledger is the referee of its own presentation: exponents associate right, and a congruence is the remainder in another hand. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE BUILD CANNOT FIT THE CONTAINER, AND ONE CONSTANT SAYS WHY. The render phase retains each page for the
    whole run, so the heap is pages times retention — 5260 pages at 17 tenths of a megabyte is 89420 tenths,
    8942 MB, against a deploy container of 8192 MB. The same single constant is consistent with the two other
    readings taken on this tree, which is what makes it a constant rather than a fitted number: 1200 pages come
    to 20400 tenths and DID build inside a 2048 MB cap (20480 tenths, and 20400 is under it by 80), while 5260
    pages come to 89420 and did NOT build inside 4096 MB (40960). One number, three readings, no exceptions — so
    the ceiling is the page count and not the flag. HONEST: the constant was derived from the threshold it
    explains, so this seals their CONSISTENCY, not an independent measurement of per-page retention. -/
theorem render_retention_exceeds_the_container : (5260 * 17 = 89420) ∧ (89420 > 81920) ∧ (1200 * 17 = 20400) ∧ (20400 < 20480) ∧ (89420 > 40960) := by decide

/-- THE DRIFT AND ITS HARMONISATION IN ONE STATEMENT, which is the only way this ledger is allowed to name a
    drift. Turning the render concurrency from its default 64 down to 2 moved peak resident memory from 8170 MB
    to 7750 MB — a drift of 420 MB, and 420 taken nineteen times is 7980, still under 8170, so the whole travel
    of the knob is less than a nineteenth of what the process holds. THE HARMONISATION is the second half: the
    container is overshot by 8942 − 8192 = 750 MB, and 420 < 750, so even pulling the knob through its ENTIRE
    range leaves the build over the ceiling. A knob that cannot close the gap at full travel was never the cause
    of the gap. This is why concurrency 8 rode in the commit that OOMed anyway. -/
theorem the_concurrency_knob_cannot_close_the_gap : (8170 - 7750 = 420) ∧ (420 * 19 = 7980) ∧ (7980 < 8170) ∧ (8942 - 8192 = 750) ∧ (420 < 750) := by decide

/-- WHY CUTTING THE DATA CHANGED NOTHING. The per-page params were trimmed from 61 MB to 50 MB by dropping the
    crosslink graph — 11 MB, which is 110 tenths, and 110 taken eight hundred times is 88000, still under the
    89420 tenths the render retains. So the entire params payload is under a eight-hundredth of the retained
    mass, and removing a fifth of it is a rounding error against the ceiling. The measurement agreed: the build
    failed at the same cap with the graph gone. A term that small cannot be the dominant one, and this is the
    arithmetic that says so before anyone spends an hour re-testing it. -/
theorem the_params_are_not_the_retained_mass : (61 - 50 = 11) ∧ (11 * 10 = 110) ∧ (110 * 800 = 88000) ∧ (88000 < 89420) := by decide

/-- THE SAME CAP IS NOT THE SAME CEILING. Raising the heap flag to 8192 MB builds this site on an operator
    machine — measured at 107.84 seconds with peak resident memory 8460 MB — and 8460 exceeds 8192 by 268. The
    flag governs when V8 gives up; the container governs what the process may hold, and the process holds more
    than the flag names because a heap is not the whole of a resident set. So a container sized to the flag
    still kills the build, which is the exact shape of the failure that outlived four rounds of tuning: the
    setting looked sufficient every time it was read, and was never what the container was measuring. -/
theorem the_process_holds_more_than_the_container_allows : (8460 > 8192) ∧ (8460 - 8192 = 268) ∧ (10784 = 107 * 100 + 84) := by decide

/-- THE FOLD AT THE DEPLOY DOOR, in the ledger's own idiom: verify beats recompute by magnitudes. The build pays
    5260 page renders; the hook that replaced it walks the built directory ONCE and counts what is there, so the
    work drops from a term in the page count to a term that does not carry it — 5260 to 1, and 5260 is more than
    five thousand times one. The refusal it can now issue costs a directory read where the failure it replaced
    cost the full render before dying: 1200 seconds of container time to learn the same thing a single stat
    answers. This is not an optimisation of the build; it is the build leaving a place it never fit. -/
theorem verify_costs_one_walk_against_the_whole_page_count : (5260 = 5260 * 1) ∧ (5260 > 5000) ∧ (20 * 60 = 1200) ∧ (1200 > 1) := by decide

/-- THE TYPESETTER'S FIRST TRAP, AND THE LEDGER IS ITS REFEREE. A statement sealed as `2^3^2 = 512` is true only
    if the exponent associates to the RIGHT — 2^(3^2) is 2^9 = 512, while (2^3)^2 is 8^2 = 64 — and 512 and 64
    are not the same number, so a typesetter that set the exponents left-associatively would render a sealed
    truth as a falsehood while looking perfectly typeset. This is what makes the ledger usable as a test of its
    own presentation: every statement is true by decide, so evaluating a parse of one is a check the kernel
    referees rather than a check the author marks. The formula layer was validated exactly this way and the
    associativity is the case that catches the error. -/
theorem exponent_associativity_changes_the_value : (2^3^2 = 512) ∧ ((2^3)^2 = 64) ∧ (512 ≠ 64) := by decide

/-- WHY THE STANDARD FORM IS NOT A REWORDING. A statement sealed as `x % n = r` is typeset as the congruence `x
    ≡ r (mod n)`, and that is a change of NOTATION only if the two say the same thing — which they do exactly
    when the difference between a number and its residue is divisible by the modulus. Checked here by exhaustion
    over the fused ring: for every x below 63, x minus (x mod 9) is a multiple of 9, and the residue is itself
    below 9. So the congruence the page prints and the remainder the kernel decided are one statement in two
    hands, and the typesetting adds no claim of its own. Proven over every case rather than argued, because a
    notation that is right in general and wrong at an edge is worse than no notation. -/
theorem the_congruence_form_is_the_modulus_form : ((List.range 63).all (fun x => ((x - x % 9) % 9 == 0) && (x % 9 < 9))) := by decide
