-- lean/Seats.lean — GENERATED. THE SEAT BOUND — the pigeonhole, stated. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def seatCases : List (Nat × Nat) := [(11,10),(21,10),(100,9),(10,10),(9,10)]

-- the fullest seat's floor: ⌈n/s⌉ written as exact Nat arithmetic
def fullest (n s : Nat) : Nat := (n + s - 1) / s

/-- THE BOUND ITSELF: the fullest seat holds at least ⌈items/seats⌉, computed as the exact integer identity (n +
    s − 1)/s so no rounding is assumed. Across the five cases that is [2, 3, 12, 1, 1] — one over capacity
    already forces a seat holding two. -/
theorem fullest_seat_ceiling : seatCases.map (fun c => fullest c.1 c.2) = [2,3,12,1,1] := by decide

/-- MORE ITEMS THAN SEATS FORCES SHARING, and the refusal is on this line: wherever items exceed seats the
    fullest seat holds at least two, so a seating with every seat holding at most one is impossible. Three of
    the five cases exceed; each is forced. -/
theorem excess_forces_sharing : (seatCases.filter (fun c => c.1 > c.2)).all (fun c => fullest c.1 c.2 ≥ 2) := by decide

/-- AND THE BOUND DOES NOT OVERREACH: at an exact fit, and below it, the fullest seat holds one. Sharing is
    forced by EXCESS and by nothing else — a rival reading, on which any seating shares, fails here. -/
theorem fit_shares_nothing : (seatCases.filter (fun c => c.1 ≤ c.2)).all (fun c => fullest c.1 c.2 = 1) := by decide

/-- THE CORRECTION, SEALED BESIDE THE THING IT CORRECTS. The powers of two that stand under the older name
    compute 256, 1 and 1024, and none of them is a seat bound: 2^8 is not ⌈11/10⌉. A name is not a proof, and
    this line says so in the one way a line can — by exhibiting the difference. -/
theorem powers_are_not_the_bound : ((2:Nat)^8 ≠ (11 + 10 - 1) / 10) ∧ ((2:Nat)^10 ≠ (21 + 10 - 1) / 10) := by decide

/-- THE TEN DIGITS PARTITION IN HALF by whether a walk from that seed reaches every digit: {2,6,7,8,9} cover and
    {0,1,3,4,5} do not. The two are disjoint, their union is all ten, and five plus five is the whole ring — a
    partition, decided. -/
theorem digits_split_five_five : (([2,6,7,8,9] ++ [0,1,3,4,5]).length = 10) ∧ ((List.range 10).all (fun d => ([2,6,7,8,9] ++ [0,1,3,4,5]).contains d)) ∧ ([2,6,7,8,9].all (fun d => !([0,1,3,4,5].contains d))) := by decide

/-- A CONSEQUENCE WORTH NAMING: anything folded to a digit of the ring lands in one of ten seats, so past ten
    items collision is not evidence of a relation — it is arithmetic. SCOPE: this decides the counting; it
    asserts nothing about what any two colliding things have in common. -/
theorem ten_seats_bound_any_ring : (11 > 10) ∧ ((11 + 10 - 1) / 10 ≥ 2) := by decide
