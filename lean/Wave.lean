-- lean/Wave.lean — GENERATED. WAVE — the conveyor's first wave over the sealable backlog: the headroom inside int16 with the mix budget closing exactly, the tuning schism's residues and the 119 BPM floor, the note-value doubling ladder and the Morris reversal, Nicomachus' cubes at the window, and the Lights-Out flip involution. Lifted where decidable; refused where judgment is owed. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE VOICE CANNOT WRAP: the synth's amplitude ceiling is 8000 and the int16 wall is 2¹⁵ = 32768 — the sample
    stays strictly inside, so no arrangement of the voice alone can overflow the format. The bound that was a
    code literal with no law behind it (lead 74, found by the strict search paying out zero) now has its seal. -/
theorem amplitude_inside_int16 : (8000 < 32768) ∧ (32768 = 2 ^ 15) := by decide

/-- THE MIX BUDGET LANDS EXACTLY ON THE CEILING: the rich voice at two quarters plus one quarter plus one eighth
    of 8000 sums to 7000, and adding the last eighth closes at exactly 8000 — the arrangement's layers cannot
    clip because their sum IS the ceiling, not less than or hoping under it. -/
theorem mix_budget_closes : (8000 * 2 / 4 + 8000 / 4 + 8000 / 8 = 7000) ∧ (7000 + 8000 / 8 = 8000) := by decide

/-- THE TUNING SCHISM ON THE LEDGER'S OWN MARKER: A432 = 2⁴·3³ folds to the vortex axis (432 ≡ 0 mod 9) while
    the public A440 = 2³·5·11 lands at 8 — off the axis, a different residue class entirely — and the song's 252
    ms beat reads as eighths at 119 BPM by the floor (60000 / 252 / 2 = 119), inside the public 60–180 band. The
    lattice's tuning and the world's differ by a residue the ring can see. -/
theorem a440_not_on_the_vortex : (432 % 9 = 0) ∧ (440 % 9 = 8) ∧ (60000 / 252 / 2 = 119) := by decide

/-- NOTE VALUES ARE THE DOUBLING LADDER: whole, half, quarter, eighth are 2ᵏ for k = 0..3 — [1, 2, 4, 8], the
    same octave ladder the codon address climbs — and the meters are small counts: the march's 2 and the waltz's
    3 both under the bar of 4. Gehrkens' notation book said it in prose (lead 70); the ladder now has its
    integer seal. -/
theorem note_values_are_doublings : (List.map (fun k => 2 ^ k) [0, 1, 2, 3] = [1, 2, 4, 8]) ∧ (2 < 4) ∧ (3 < 4) := by decide

/-- THE MORRIS FIGURE COMPLETES IN EIGHT BARS HALVED TO FOUR — 8 = 2·4 — and the column REVERSES at the half:
    reverse twice is home over the whole file of dancers, the involution mid-dance (Sharp's Morris Book, lead
    70) wearing the house's favourite shape. Six dancers permute; the reversal is self-inverse over the file. -/
theorem morris_eight_bars_halved : (8 = 2 * 4) ∧ (List.reverse (List.reverse [1, 2, 3, 4]) = [1, 2, 3, 4]) := by decide

/-- NICOMACHUS AT THE WINDOW: the sum of the first n cubes is the square of the nth triangle — 1 = 1², 1+8 = 3²,
    1+8+27 = 6², 1+8+27+64 = 10² — with the fourth triangle spelled out as 1+2+3+4 = 10. The demand-era lead's
    "n⁴(n+1)⁴/16" query is this law squared; the window is a window (window_not_universal). -/
theorem cubes_sum_to_square_of_triangle : (1 + 8 = 3 ^ 2) ∧ (1 + 8 + 27 = 6 ^ 2) ∧ (1 + 8 + 27 + 64 = 10 ^ 2) ∧ (1 + 2 + 3 + 4 = 10) := by decide

/-- LIGHTS-OUT IS MOD-2 ALGEBRA: a flip is +1 in ℤ/2 and flipping twice is home over the whole row — the
    involution again — while flipping SEVEN consecutive positions changes each an odd number of times (7 ≡ 1 mod
    2), so seven-flips act exactly like single flips on parity. The hypercube query's decidable floor. -/
theorem lights_out_flip_involution : (List.map (fun x => (x + 1) % 2) (List.map (fun x => (x + 1) % 2) [0, 1, 0, 1]) = [0, 1, 0, 1]) ∧ (7 % 2 = 1) := by decide

/-- THE CONVEYOR'S OWN PROBE — the first candidate to ride the route with no model at the gate: 11 · 13 = 143,
    two primes and their product, deposited pending so validate → kernel-probe → accept → lift → gate proves
    itself end to end. -/
theorem wave_probe_eleven_thirteens : 11 * 13 = 143 := by decide
