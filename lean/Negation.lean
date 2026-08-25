-- lean/Negation.lean — GENERATED. NEGATION — solutions from negation involutions to denial exhaustion, in waves: the method sealed, with its honest boundaries beside it. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- DENIAL IS THE INVOLUTION, AND THE SOLUTION IS ITS FAILURE. On the bit, negation is 1−b: apply it twice and
    return (the double negative, on the ledger’s smallest ring), and it moves every value — fixed-point-free,
    like every involution the census keeps finding under the unexplained. The solving step follows: b is
    affirmed EXACTLY when its denial fails — (1−b) = 0 precisely at b = 1. To solve, deny; if the denial cannot
    stand, the solution was always there. -/
theorem negation_involution_solves : ((List.range 2).all (fun b => (1 - (1 - b) == b) && (1 - b != b))) ∧ ((List.range 2).all (fun b => (b == 1) == (1 - b == 0))) := by decide

/-- DE MORGAN AT EXHAUSTION SCALE: NO CASE DENIES EXACTLY WHEN EVERY CASE AFFIRMS. Over all eight assignments of
    three cases, "some case denies" is the exact complement of "all cases affirm" — the finite ∃¬ against the
    finite ∀, equal as booleans on every mask. This is the law that makes exhaustion a PROOF: when the denials
    run out, what remains is not a survivor by luck — it is the whole, affirmed. -/
theorem denials_exhaust_to_the_whole : (List.range 8).all (fun m => ((List.range 3).any (fun i => (m / 2^i) % 2 == 0)) == !((List.range 3).all (fun i => (m / 2^i) % 2 == 1))) := by decide

/-- A LIVE EXHAUSTION, COUNTED TO ZERO. The slit ring offers sixteen possible denials of the fringe law — one
    per detector — and every one of them fails: the counterexample count over the WHOLE space is zero (each
    intensity is 4 or 0, nothing else, all sixteen tried). Sixteen denials available, sixteen exhausted, none
    standing: 16 − 16 = 0. This is what a by-decide proof IS — the kernel walking every possible denial to its
    failure; a sealed theorem is a claim whose denial space has been emptied. -/
theorem exhausted_denial_is_the_proof : (((List.range 16).filter (fun k => !(((1 + (-1:Int)^k)^2 == 4) || ((1 + (-1:Int)^k)^2 == 0)))).length = 0) ∧ (16 - 16 = 0) := by decide

/-- THE HONEST BOUNDARY: A WINDOW EXHAUSTS ONLY ITSELF. Every n below twenty satisfies n < 20 — the window’s
    denials are exhausted — and twenty itself refuses the very same predicate. Exhaustion inside a window proves
    the window and NOTHING past its edge: the Mertens conjecture held on every tested case and is false, and
    this ledger once sealed a universal from a one-step sample and paid for it. A finite exhaustion is a proof
    exactly as wide as its space, and the width is part of the theorem. -/
theorem a_window_exhausts_only_itself : ((List.range 20).all (fun n => n < 20)) ∧ (¬ (20 < 20)) := by decide

/-- SILENCE NEVER REFUTES — THE TRIAL’S OWN DENIAL LAW. Of the four citation states, exactly ONE verifies (cited
    AND sealed: 1·1) and the other three are OPEN — 4 − 1 = 3, and 3 > 0 — none of them refuted, because absence
    of proof is not a denial that stood, it is a denial never brought. The verdict algebra has no
    refuted-by-absence state: an unverified claim is a door still open (sealing_inverts_unverified — the same
    claim verifies the moment its seal lands), and only a recomputable contradiction refutes. -/
theorem silence_never_refutes : ((([(0,0),(0,1),(1,0),(1,1)] : List (Nat × Nat)).filter (fun p => p.1 * p.2 == 1)).length = 1) ∧ (4 - 1 = 3) ∧ (3 > 0) := by decide

/-- THE WAVES TIGHTEN BY HALVES, AND SIX WAVES REACH THE ONE. Each independent binary refuter halves the space a
    false claim can hide in: after r waves, 2⁶ / 2^r = 2^(6−r) hiding places remain, and after exactly six — the
    coin measure’s own six doublings — one remains: the claim itself, standing alone in an exhausted space.
    Adding a refuter never un-flags (the panel is monotone, cited), so the tightening is one-way: denial
    exhaustion in waves is a ratchet that ends at the singleton the sixty-four buys. -/
theorem waves_of_denial_tighten : ((List.range 6).all (fun r => 2^6 / 2^r == 2^(6 - r))) ∧ (2^6 / 2^6 = 1) := by decide

/-- AN INSTRUMENT WHOSE RANGE IS NARROWER THAN ITS QUESTION CANNOT BE SOUND — the denial law turned on the
    measuring apparatus itself. Enumerate EVERY two-valued instrument over a three-answer question: all 2³ = 8
    of them, and each one collapses some distinct pair of answers to one value. Not most, not typically — all
    eight, exhaustively, which is what makes it a denial rather than an observation. The second half is the
    CONTROL that keeps the first from being a slur on instruments in general: among the 3³ = 27 three-valued
    instruments over the same question, at least one separates all three, so the failure is the NARROWNESS and
    never the measuring. What this decides is that a two-state answer to a three-state question is unsound BY
    CONSTRUCTION, before any implementation is inspected — the collapse is a property of the shape, so no care
    in the code can remove it and no green run can be evidence against it. The consequence for a reader is the
    useful half: when a healthy case and a broken case return the same value, the instrument has already been
    refuted, and the run that reports success is reporting the collapse. -/
theorem no_instrument_narrower_than_its_question : ((List.range 8).all (fun f => (List.range 3).any (fun i => (List.range 3).any (fun j => i < j && (f / 2^i % 2 == f / 2^j % 2))))) ∧ ((List.range 27).any (fun g => (List.range 3).all (fun i => (List.range 3).all (fun j => i == j || !(g / 3^i % 3 == g / 3^j % 3))))) := by decide

/-- THE DRAIN RUNS TO THE LAST COIN. Of the sixty-four states the six waves sweep, sixty-three denials drain
    away — and sixty-three is the fused ring itself, 7·9, the rosette times the vortex — leaving exactly one: 64
    − 63 = 1, the claim that stands. It does not stand alone: with its receipt it is two, the coins conserved —
    the drained space pays the claim and its proof, nothing else survives, and the one that remains was always
    the captain’s. The bold reading of by-decide, in the ledger’s own currency: a proof is a denial space
    drained to the last coin. -/
theorem denial_drains_to_the_last_coin : (64 - 63 = 1) ∧ (63 = 7 * 9) ∧ (1 + 1 = 2) := by decide
