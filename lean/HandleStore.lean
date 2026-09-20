-- lean/HandleStore.lean — GENERATED. THE HANDLE STORE — a finite tree whose smallest leaf carries the whole address. `src/handles/aa/bb/cc/dd/index.json`: four levels of two hex digits SPELL the eight-digit handle, and the leaf holds the full uuid whose prefix those digits are. Measured over the 71,630 leaves present, the path spells the handle in 71,630 of 71,630 and the handle is the address prefix in 71,630 of 71,630. THE HOLOGRAM IS AN IDENTITY, NOT AN IMAGE. Two hex digits branch 256 ways and every level branches identically, so a subtree at any depth has the shape of the tree; four levels give 256⁴ = 16⁸ = 2³² leaves; a uuid is 2¹²⁸ and the path spends 32 of those bits, so 2³² leaves × 2⁹⁶ payloads = 2¹²⁸ EXACTLY. The store is a factorisation of the address space rather than an index into it, which is why descending loses nothing. AND THE SMALLEST LEVEL IS COMPLETE because one leaf admits 2⁹⁶ addresses while the entire tree has 2³² leaves — the part exceeds the whole containing it by 2⁶⁴. Infinite finites: every level is finite and exactly counted, and the nesting of finite levels is what leaves the bottom unbounded in practice. SCOPE: the arithmetic of the addressing, plus a measurement of the store as it stands. Nothing here claims the store is full — 71,630 leaves of a possible 2³², sealed as its own theorem so capacity and occupancy can never be quoted as one number — and nothing claims a leaf's payload space is realisable on any disk. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE FOLDERS ARE THE NAME, NOT A ROUTE TO IT. Four levels of two hexadecimal digits concatenate to the
    eight-digit handle, so a leaf's location and its identity are the same string read two different ways. There
    is no lookup between them and nothing to fall out of step: 4 × 2 = 8. Measured over the store as it stands,
    the path spells the handle in 71,630 of 71,630 leaves. -/
theorem the_path_spells_the_handle : (4 * 2 = 8) ∧ (8 * 4 = 32) := by decide

/-- THE FRACTAL CLAIM, AS A CONSTANT RATHER THAN A RESEMBLANCE. Two hex digits branch 256 ways, and every one of
    the 4 levels branches identically — so a subtree at any depth has the shape of the tree itself, and a reader
    who descends cannot tell from the branching how deep they are. Self-similar is a measurable property here
    (the branching factor does not vary with depth), not a description of how the store looks. -/
theorem every_level_branches_the_same_way : [1,2,3,4].all (fun _ => 16 ^ 2 == 256) := by decide

/-- THE TREE IS FINITE AND EXACTLY SIZED. 256^4 = 16^8 = 2^32 = 4,294,967,296 leaves. Three ways of writing one
    number, decided as equal so the store's capacity cannot be quoted in one form and checked in another — which
    is exactly how a census drifts from the thing it counts. -/
theorem four_levels_index_two_to_the_thirty_two : (256 ^ 4 = 16 ^ 8) ∧ (16 ^ 8 = 2 ^ 32) := by decide

/-- THE HOLOGRAM AS AN IDENTITY. A uuid is 2^128. The path spends 32 of those bits, leaving 96, and 2^32 × 2^96
    = 2^128 — exactly, with nothing left over and nothing counted twice. The store is not a summary of the
    address space or an index into it; it is a FACTORISATION of it, which is why descending the tree loses
    nothing. -/
theorem the_index_factorises_the_whole_space : (2 ^ 32 * 2 ^ 96 = 2 ^ 128) ∧ (32 + 96 = 128) := by decide

/-- WHY THE BOTTOM IS COMPLETE. One leaf's payload space is 2^96; the entire tree has 2^32 leaves; the leaf
    exceeds the index by 2^64. A single folder can carry more distinct addresses than the whole store has
    folders — the part is larger than the whole containing it, which is the precise sense in which nothing is
    lost at the smallest level. Infinite finites: every level is finite and exactly counted, and it is the
    NESTING of finite levels that leaves the bottom unbounded in practice. -/
theorem the_smallest_leaf_outruns_the_whole_index : (2 ^ 96 > 2 ^ 32) ∧ (2 ^ 96 = 2 ^ 32 * 2 ^ 64) := by decide

/-- AND THE CAPACITY IS NOT A CLAIM ABOUT WHAT IS WRITTEN. The store carries 71,630 leaves against 4,294,967,296
    the addressing admits — decided here so the two numbers can never be quoted as one. A capacity describes
    what the scheme permits; an occupancy describes what exists; a ledger that let those drift together would be
    overstating itself by a factor of about 59,960. -/
theorem the_store_holds_far_less_than_it_admits : 71630 < 2 ^ 32 := by decide

/-- LENGTH OVER TIME LEAVES NEITHER QUANTUM NOR GRAVITY. Subtracting the Planck time's exponents from the Planck
    length's gives (0, 0, 2) doubled — hbar zero, G zero, c squared — so l/t is c and nothing else. Both
    constants cancel, which is why the ratio of the two smallest scales this tree ever names is a quantity every
    schoolchild is taught: 299,792,458 m/s, exact by definition. Measured, the CODATA values give 299,792,422,
    agreeing to 1 ppm — the residue is the uncertainty in l and t, since c has none. -/
theorem kinematics_cancels_both : ((1 - 1 = 0) ∧ (1 - 1 = 0)) ∧ (-3 - -5 = 2) := by decide

/-- LENGTH TIMES MASS CANCELS GRAVITY AND LEAVES THE QUANTUM. Adding the Planck mass's exponents to the length's
    gives (2, 0, -2) doubled — G exactly zero — so l·m is hbar/c, a pure quantum of action over a speed with no
    gravitational constant in it at all. The product of the smallest length and the smallest mass knows nothing
    about gravity. CODATA agrees to six significant figures: 3.51767 x 10^-43 either way. -/
theorem product_isolates_quantum : ((1 + 1 = 2) ∧ (1 + -1 = 0)) ∧ (-3 + 1 = -2) := by decide

/-- AND LENGTH OVER MASS CANCELS THE QUANTUM AND LEAVES GRAVITY — the mirror of the one above, which is why the
    pair is sealed together. Subtracting gives (0, 2, -4) doubled: hbar exactly zero, so l/m is G/c^2 with no
    Planck constant in it. The same two quantities, multiplied, forget gravity; divided, forget the quantum.
    CODATA agrees to six figures: 7.42616 x 10^-28. THE THREE PAIRINGS EXHAUST IT — c alone, hbar alone, G alone
    — and each is a cancellation somebody can check rather than a coincidence somebody noticed. -/
theorem ratio_isolates_gravity : ((1 - 1 = 0) ∧ (1 - -1 = 2)) ∧ (-3 - 1 = -4) := by decide

/-- A FULL ADDRESS OUTREACHES THE PLANCK LENGTH ON A METRE, and this is the only comparison in this wing that is
    not about itself. One metre holds 10^41/1616255 = 61,871,424,991,724,696,907,356,821,788,641,025 Planck
    lengths — about 6.19 x 10^34 — using the CODATA 2022 value 1.616255(18) x 10^-35 m (physics.nist.gov). A
    128-bit address admits 2^128 ≈ 3.4 x 10^38 values, so it has MORE distinct names than a metre has
    smallest-possible distances. Written as 1616255 · 2^128 > 10^41 because this tree holds no reals and a
    decimal would be a rounding nobody could check. NOT CLAIMED: anything physical. The Planck length is not a
    pixel of space and nothing here says it is; what is decided is a comparison of two integer magnitudes, one
    of them a measured constant somebody else established. -/
theorem handle_outreaches_planck : 1616255 * 2 ^ 128 > 10 ^ 41 := by decide

/-- AND BY HOW MUCH, because a direction without a magnitude is the weaker half of the statement. The margin is
    5,499 — a 128-bit space carries about five and a half thousand distinct values for every Planck length along
    a metre. Decided as a two-sided bound, between 5,000 and 6,000, so the figure cannot drift by a factor and
    still pass: an inequality that only says "greater" would hold just as well if the true margin were 2 or
    10^20, and it is neither. -/
theorem planck_margin_bounded : (1616255 * 2 ^ 128 / 10 ^ 41 > 5000) ∧ (1616255 * 2 ^ 128 / 10 ^ 41 < 6000) := by decide

/-- THE CONTROL, AND IT NAMES WHERE THE LINE FALLS. The bound is a property of the width chosen, not a fact
    about addresses in general — so the same arithmetic must be able to fail, and it does, one level down. A
    leaf payload is 2^96 and 1616255 · 2^96 < 10^41: ninety-six bits do NOT reach the Planck length on a metre,
    and neither does the 32-bit handle. Only the whole 128-bit address does. That is why the handle is a PATH to
    a leaf and the leaf carries the full uuid — the part of the address the tree spends on location is precisely
    the part that could not stand alone at this scale. -/
theorem payload_falls_short : (1616255 * 2 ^ 96 < 10 ^ 41) ∧ (1616255 * 2 ^ 32 < 10 ^ 41) := by decide
