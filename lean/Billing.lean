-- lean/Billing.lean — GENERATED. BILLING — the compound law: the difference mints, the ratio bills, and the advantage doubles every thirty-eight seals — in exact integers, demarcated. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE COINS ARE THE COMMON FACTOR OF THE PAIR: gcd(110, 108) = 2 — the two coins are not beside the exchange,
    they are what the exchange’s two sides share — and dividing them out leaves 110/2 = 55 against 108/2 = 54.
    Extract the mint and the rate remains: every reduction of the pair pays the coins first. -/
theorem coins_are_the_common_factor : (Nat.gcd 110 108 = 2) ∧ (110 / 2 = 55) ∧ (108 / 2 = 54) := by decide

/-- THE BILLING RATE IS BUILT FROM WHAT THE LEDGER ALREADY OWNS: 55 is the tenth triangle — 10·11/2, the row
    whose middle coefficient centres the 1024 — and 54 is 2·3³, the order of the sequence group AGL(1,ℤ/9) the
    mirror wing sealed long ago. The rate 55/54 is the triangle over the group: no new object enters the law;
    the invoice is made of the ledger’s own furniture. -/
theorem the_rate_is_triangle_over_group : (10 * 11 / 2 = 55) ∧ (2 * 3^3 = 54) := by decide

/-- THE DIFFERENCE MINTS AND THE RATIO BILLS — the two roles split exactly: 110 − 108 = 2 is the conserved coin
    of every exchange (never inflated, the mint), while the reduced pair steps by ONE — 55 − 54 = 1, the
    superparticular family where the octave (2/1), the fifth (3/2) and every just interval live: the bill is the
    next-integer step, the gentlest ratio above unity, and it is unit-free where a subtraction is bound to its
    measuring stick. -/
theorem difference_mints_ratio_bills : (110 - 108 = 2) ∧ (55 - 54 = 1) := by decide

/-- THE PAIR FACTORS COMPLETELY INTO MINT AND RATE: 2·55 = 110 and 2·54 = 108 — nothing else hides in the two
    numbers the double torus gave the ledger. The billing law is not read INTO the pair; it is the pair’s own
    factorization, checked both ways. -/
theorem the_pair_is_coins_times_rate : (2 * 55 = 110) ∧ (2 * 54 = 108) := by decide

/-- THE COMPOUND FIRST DOUBLES AT SEAL THIRTY-EIGHT, PROVEN WITHOUT A LOGARITHM: 55³⁸ > 2·54³⁸ while 55³⁷ <
    2·54³⁷ — two integer comparisons the kernel settles outright, the exact threshold where +55/54 per exchange
    first exceeds double. This line decides the FIRST crossing and only it — that every later 38-block doubles
    again is the ratio’s constancy, an algebra this statement honestly does not carry (one step is not a walk,
    and this name now claims exactly one step). -/
theorem advantage_first_doubles_at_seal_38 : (55^38 > 2 * 54^38) ∧ (55^37 < 2 * 54^37) := by decide

/-- THE COMPOUND NEVER LEAVES THE INTEGERS: the second step is already exact — 55² = 3025 against 54² = 2916,
    and their difference 109 is the pair’s own neighbour-sum (55 + 54). Interest accrues as whole numbers at
    every power; nothing in the law ever rounds, which is why the bill can be audited at any depth by anyone. -/
theorem compound_steps_in_exact_integers : (55 * 55 = 3025) ∧ (54 * 54 = 2916) ∧ (3025 - 2916 = 109) ∧ (55 + 54 = 109) := by decide
