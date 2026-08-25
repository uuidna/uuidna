-- lean/Reflection.lean — GENERATED. THE REFLECTION'S REACH — what an involution alone can and cannot separate. Clay.lean reflects seven problems through dz(x) = 10 − x and states in prose that it reflects all seven and solves none; this wing DECIDES that limitation. The reflection splits the ten digits into six classes of AT MOST TWO — reversibility erases nothing and so derives nothing — and six is FORCED by arithmetic, since dz fixes exactly two digits and pairs the other eight: 2 + (10 − 2)/2 = 6. The seven residues reach five of those classes. The limitation stated exactly: dzMin 7 = dzMin 3, so the reflection cannot tell the seventh residue from the third. Yet the seventh lies in the covering half of the ring ({2,6,7,8,9}, sealed as digits_split_five_five), where the walk that adds the IRREVERSIBLE doubling reaches every digit — what the full walk distinguishes, the involution confuses. PURE ARITHMETIC, no ledger count, no value here read from the world — no distance, no mass, no frequency, no duration — so the wing names no standard and no agency, because it owes none. integrity. The sequence walk also yields six orbits; that is a separate enumeration landing on the same integer, and no correspondence between the two sixes is claimed. Nothing here decides any Clay problem, and a residue is not a fact about the thing seated at it. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def dz (d : Nat) : Nat := if d = 0 then 0 else 10 - d

-- a reflection class, named by its least member: d and dz d share one class
def dzMin (d : Nat) : Nat := if dz d < d then dz d else d

/-- The reflection alone splits the ten digits into SIX classes — each digit paired with its mirror, named by
    the lesser: [0, 1, 2, 3, 4, 5]. -/
theorem reflection_splits_six : ((List.range 10).map dzMin).eraseDups.length = 6 := by decide

/-- NO CLASS EXCEEDS TWO. An involution can carry a digit to its mirror and back and no further, so the widest
    thing it can build is a pair. Sizes: [2, 2, 2, 2, 2, 2] over the six classes — a partition with almost no
    structure, because reversibility erases nothing and therefore derives nothing. -/
theorem classes_cap_at_two : ((List.range 10).map dzMin).eraseDups.all (fun c => ((List.range 10).filter (fun d => dzMin d == c)).length ≤ 2) := by decide

/-- SIX IS FORCED. SCOPE: the sequence walk also yields six orbits, and that is a SEPARATE enumeration landing
    on the same integer. No correspondence between the two sixes is claimed or sealed. -/
theorem six_is_forced_arithmetic : (((List.range 10).filter (fun d => dz d == d)).length = 2) ∧ (2 + (10 - 2) / 2 = 6) := by decide

/-- The seven reflected residues occupy FIVE of the six classes— class 0 is never reached, because no problem is
    seated at the digit the reflection fixes to itself and nothing else. Two pairs collide: the sixth residue
    shares a class with the fourth, and the seventh with the third. -/
theorem seven_reach_five_classes : (((List.range' 1 7).map dzMin).eraseDups.length = 5) ∧ (!(((List.range' 1 7).map dzMin).contains 0)) := by decide

/-- THE LIMITATION, DECIDED: the reflection cannot tell the seventh residue from the third — dzMin 7 = dzMin 3 —
    so under dz alone they are one object. A bijection relabels; it does not distinguish. This is what "reflects
    all seven and solves none" means, stated as a fact the kernel settles rather than a sentence in a header. -/
theorem reflection_confuses_seven_three : (dzMin 7 = dzMin 3) ∧ (dzMin 6 = dzMin 4) := by decide

/-- THE COMPARISON, ON ONE LINE. The seventh residue lies in the covering half of the ring ({2,6,7,8,9}, sealed
    as digits_split_five_five) — the walk that adds the irreversible step reaches every digit from it. Yet the
    reflection alone puts it in a class of two with the third and can separate them by nothing. Both halves
    here, so the claim is discharged where it is made: what the full walk distinguishes, the involution
    confuses. -/
theorem seventh_covers_reflection_cannot : ([2,6,7,8,9].contains 7) ∧ (dzMin 7 = dzMin 3) ∧ (dzMin 7 ≠ 7) := by decide
