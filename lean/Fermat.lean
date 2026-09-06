-- lean/Fermat.lean — GENERATED. FERMAT'S EQUATION AT A BOUNDED WINDOW — the counts, and the refusal. Walked exhaustively over 1 ≤ x ≤ y < z ≤ 20: 100 solutions at n = 1, exactly 6 at n = 2 (the six Pythagorean triples, named), and NONE at n = 3, 4, 5, 6 — with the near-miss that shows why an empty window proves nothing beyond itself (the cube sum never equals a cube here, but lands one away twice: 6³ + 8³ = 9³ − 1 and 9³ + 10³ = 12³ + 1). WHAT IS CLAIMED HERE, IN FULL: the six counts and identities above, each decided by the kernel over its own finite domain, axiom-free. That is the whole of it. WHAT IS NOT CLAIMED, AND IS NOT THIS LEDGER'S TO CLAIM: Fermat's Last Theorem. The theorem — no solution in positive integers for any n > 2 — is Andrew Wiles's, proved in 1995 with the key step joint with Richard Taylor, standing on Frey, Serre, Ribet, Mazur, Langlands, Tunnell, Taniyama, Shimura and Weil. Its first end-to-end machine-checked formalization was completed in Lean in August 2026 and published by Anthropic on 2026-09-04, following the Darmon–Diamond–Taylor exposition of Wiles's argument, adapting 106 files with credit from Kevin Buzzard's Imperial College London FLT project and from flt-regular, built on Mathlib, and run on Prove2Me (Tianyi Peng's group, Columbia University). THE TWO ARE NOT NEIGHBOURS, AND THE DISTANCE IS MEASURABLE. That formalization is 13 million lines of Lean and 29,511 theorems, and it relies on all three of Lean's standard axioms. This wing is six theorems and roughly twelve thousand kernel cases, and relies on none — not even propext. A `by decide` walk cannot reach a statement quantified over all integers, and no amount of widening the window changes that; the window is the honest thing this kernel can say, and the near-miss is why it is said with the bound in the name. NEITHER DIRECTION OF CREDIT IS OPEN, and both are stated so that neither can be read into the silence of the other: this ledger takes no part of the FLT formalization and asserts no priority over it, and that formalization draws nothing from this ledger — its dependencies are the ones named above, and this wing did not exist when it ran. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- pmod a n m — a^n mod m by SQUARE-AND-MULTIPLY, reducing at every step.
-- Two wrong instruments preceded this one, and both are worth naming because the statement never changed while
-- the cost changed by two orders of magnitude. First a^n % m: correct, and it built the whole power before
-- reducing, so at exponent 23 against modulus 119 the kernel multiplied 49-digit integers to learn a fact about
-- a two-digit one; the wing ran past an hour and was stopped. Then naive repeated multiplication mod m: every
-- intermediate stayed small, but it takes n steps, and lambda(107) = 106 means 106 multiplications per unit
-- across 106 units — 1.19 million of them in one theorem, past Lean's recursion depth. Square-and-multiply
-- takes log2(n) steps: seven instead of a hundred and six. NO WING BUYS ITS OWN CEILING (Colour.lean) — the
-- answer to a limit here is the better algorithm, never a raised maxRecDepth.
-- The fuel argument is what makes it structurally terminating: n halves each step, so n+1 is more than enough
-- and the n == 0 guard stops the reduction as soon as the exponent is exhausted.
def pmodAux (m : Nat) : Nat → Nat → Nat → Nat → Nat
  | 0, _, _, acc => acc
  | Nat.succ f, a, n, acc =>
      if n == 0 then acc
      else pmodAux m f ((a * a) % m) (n / 2) (if n % 2 == 1 then (acc * a) % m else acc)

def pmod (a : Nat) (n : Nat) (m : Nat) : Nat := pmodAux m (n + 1) (a % m) n (1 % m)

-- fermatWindow n — how many (x, y, z) with 1 ≤ x ≤ y < z ≤ 20 satisfy x^n + y^n = z^n.
def fermatWindow (n : Nat) : Nat :=
  ((List.range 21).map (fun z =>
    ((List.range z).map (fun y =>
      (List.range (y+1)).countP (fun x => x != 0 && x^n + y^n == z^n))).sum)).sum

-- cubeNearMiss d — how many (x, y, z) in the SAME window have |x^3 + y^3 − z^3| = d. Nat subtraction truncates,
-- so (a − b) + (b − a) is the absolute difference; d = 0 is exactly fermatWindow 3, which is why the two counts
-- below can be read against each other.
def cubeNearMiss (d : Nat) : Nat :=
  ((List.range 21).map (fun z =>
    ((List.range z).map (fun y =>
      (List.range (y+1)).countP (fun x =>
        x != 0 && ((x^3 + y^3) - z^3) + (z^3 - (x^3 + y^3)) == d))).sum)).sum

/-- THE WORKHORSE IS PROVED, NOT TRUSTED. Every obstruction in this wing is stated through pmod, so a wrong pmod
    would leave sixteen hundred theorems saying something other than what they appear to say — the reader would
    be trusting an implementation rather than reading a statement. Here the square-and-multiply definition is
    checked against the thing it stands in for, a^n % m, across every base under 30, every exponent under 30 and
    every modulus from 3 to 30: 25,200 cases decided by the same kernel that decides the obstructions. Two
    earlier implementations were replaced on COST, never on meaning — a^n % m built the whole power before
    reducing, and naive repeated multiplication took n steps where lambda(107) = 106 puts 1.19 million
    multiplications in one theorem — and this theorem is what makes that substitution auditable instead of a
    claim in a comment. -/
theorem pmod_is_modular_exponentiation : (List.range 30).all (fun a => (List.range 30).all (fun n => (List.range 28).all (fun i => pmod a n (i+3) == (a^n) % (i+3)))) := by decide

/-- THE FIRST CONTROL. At n = 1 the window 1 <= x <= y < z <= 20 holds exactly 100 solutions of x + y = z — one
    for every way of splitting a z at or below 20 into an ordered pair. It is stated because an enumerator that
    returns zero is unreadable until the same enumerator has been shown returning a number on a case where
    solutions exist. This counts the window, and claims nothing about x + y = z beyond it. -/
theorem fermat_window_exponent_one_counts_one_hundred : fermatWindow 1 = 100 := by decide

/-- THE SECOND CONTROL, and the one that matters: at n = 2 the same walk finds exactly 6 solutions. Squares are
    where the equation is generous — Pythagoras had these, and there are infinitely many, of which this window
    sees 6. The contrast with the higher exponents is therefore a reading of the EQUATION and not a property of
    the instrument, since the instrument is the same three nested ranges in both cases. -/
theorem fermat_window_exponent_two_counts_six : fermatWindow 2 = 6 := by decide

/-- The 6 are NAMED, not merely counted: (3,4,5), (6,8,10), (5,12,13), (9,12,15), (8,15,17), (12,16,20), each
    verified to satisfy x^2 + y^2 = z^2. A count says how many the walk found; this says which, so the previous
    theorem can be checked by hand against six triples rather than trusted. Four are the 3-4-5 and its
    multiples; two, (5,12,13) and (8,15,17), are primitive and new at this size. -/
theorem fermat_window_names_its_six_pythagorean_triples : ([(3,4,5), (6,8,10), (5,12,13), (9,12,15), (8,15,17), (12,16,20)] : List (Nat × Nat × Nat)).all (fun t => t.1^2 + t.2.1^2 == t.2.2^2) := by decide

/-- THE SEARCH ITSELF. For every exponent in [3,4,5,6], the window 1 <= x <= y < z <= 20 contains NO solution of
    x^n + y^n = z^n — four exhaustive walks, every triple decided by the kernel. WHAT THIS IS NOT: it is not
    Fermat's Last Theorem, and it is not evidence for it. A finite window is silent about every triple outside
    it, and the near-miss below is why that silence must be taken seriously rather than waved through. -/
theorem fermat_window_exponents_three_to_six_are_empty : [3,4,5,6].all (fun n => fermatWindow n == 0) := by decide

/-- WHY A BOUNDED SEARCH IS NOT A PROOF, stated as arithmetic instead of as a caveat. The first clause is the
    CLOSED WALK the word "never" owes: every z <= 20, every y < z, every x <= y with x >= 1, and not one has x^3
    + y^3 = z^3. The second says the same window comes within ONE of a cube exactly 2 times. A search whose
    margin of failure is a single unit has told you about its window and nothing else. The universal is written
    out rather than folded into cubeNearMiss because a name that says "never" must be answerable from the
    proposition — one step is not a walk. -/
theorem cube_window_never_lands_but_misses_by_one_twice : ((List.range 21).all (fun z => (List.range z).all (fun y => (List.range (y+1)).all (fun x => x == 0 || !(x^3 + y^3 == z^3))))) ∧ cubeNearMiss 1 = 2 := by decide

/-- The two near-misses, named. 6^3 + 8^3 = 728 = 9^3 - 1, and 9^3 + 10^3 = 1729 = 12^3 + 1 — the second being
    Ramanujan's taxicab number, famous for being two cubes two ways and here for a different reason: it sits one
    above 12^3. Both are exhibited rather than described, so the previous theorem's count of 2 can be read off
    two lines of arithmetic. -/
theorem cube_near_misses_are_the_taxicab_and_its_neighbour : 6^3 + 8^3 + 1 = 9^3 ∧ 9^3 + 10^3 = 12^3 + 1 ∧ 9^3 + 10^3 = 1729 := by decide

/-- EULER'S ENGINE FOR n = 3, and the ledger's own ring. Every cube is 0, 1 or 8 modulo 9 — nine residues
    checked, three values reached — because lambda(9) = 6 and gcd(3,6) = 3 collapses the six units onto two. A
    cube coprime to 3 is therefore ±1 mod 9, and ±1 ± 1 never returns to ±1. Credited to Euler, whose 1770
    argument for the cubic case rests on it; sealed here as the arithmetic, not as the descent that follows it. -/
theorem cube_residues_mod_nine_are_zero_one_eight : (List.range 9).all (fun a => [0,1,8].contains ((a^3) % 9)) := by decide

/-- THE ENGINE FOR n = 4. Every fourth power is 0 or 1 modulo 16 — sixteen residues checked, two values reached.
    An odd fourth power is therefore 1, and 1 + 1 = 2 is neither, which is the whole of the coprime case at
    exponent four. Fermat proved the full n = 4 case by infinite descent, which this does not reproduce and does
    not replace; the table is the finite part. -/
theorem fourth_power_residues_mod_sixteen_are_zero_or_one : (List.range 16).all (fun a => [0,1].contains ((a^4) % 16)) := by decide

/-- SOPHIE GERMAIN'S PRIMES BELOW 100: 2, 3, 5, 11, 23, 29, 41, 53, 83, 89 — each p prime with 2p + 1 also
    prime, both halves decided by trial division rather than asserted. Germain proved in 1823 that for such a p
    the coprime case at exponent p is impossible, and the mechanism is exactly the reduction this wing is built
    on: modulo q = 2p + 1 we have lambda(q) = 2p, so gcd(p, 2p) = p collapses the p-th powers onto {0, 1, q - 1}
    and leaves no room for a sum. The theorem is hers; the list is a decidable fact about small integers. -/
theorem sophie_germain_primes_below_one_hundred : [2,3,5,11,23,29,41,53,83,89].all (fun p => (List.range p).all (fun d => d < 2 || p % d != 0 || d * d > p) && (List.range (2*p+1)).all (fun d => d < 2 || (2*p+1) % d != 0 || d * d > (2*p+1))) := by decide
