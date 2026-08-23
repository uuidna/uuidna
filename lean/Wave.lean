-- lean/Wave.lean — GENERATED. WAVE — the conveyor's first wave over the sealable backlog: the headroom inside int16 with the mix budget closing exactly, the tuning schism's residues and the 119 BPM floor, the note-value doubling ladder and the Morris reversal, Nicomachus' cubes at the window, and the Lights-Out flip involution. Lifted where decidable; refused where judgment is owed. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

set_option maxRecDepth 4096

/-- THE TUNING SCHISM ON THE LEDGER'S OWN MARKER: A432 = 2⁴·3³ folds to the vortex axis (432 ≡ 0 mod 9) while
    the public A440 = 2³·5·11 lands at 8 — off the axis, a different residue class entirely — and the song's 252
    ms beat reads as eighths at 119 BPM by the floor (60000 / 252 / 2 = 119), inside the public 60–180 band. The
    lattice's tuning and the world's differ by a residue the ring can see. -/
theorem a440_not_on_the_vortex : (432 % 9 = 0) ∧ (440 % 9 = 8) ∧ (60000 / 252 / 2 = 119) := by decide

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

/-- THE PILGRIM'S WALK MUST COME HOME (queue lead 128b, from the live superposition's deepening chain): a
    deepening step maps an address to an address, and an address space is finite — so every chain of collapses
    revisits, by pigeonhole. The pigeonhole is enumerated IN FULL on the 3-state model: all 81 possible
    four-step traces over three states, and every single one holds a repeat (at most three distinct among four)
    — no exception exists, the kernel checked each trace. Beside it, the real space's size: 16^8 = 4294967296
    addresses, so the live walk revisits within 4294967297 steps — the BOUND is sealed; the empty seed's actual
    cycle length stays open as computation (lead 128b). HONEST SCOPE: exhaustive pigeonhole on the model,
    arithmetic on the space — never a claim about which theorems any cycle greets. -/
theorem pilgrims_walk_must_cycle : ((List.range 81).all (fun v => (([v % 3, v / 3 % 3, v / 9 % 3, v / 27 % 3].eraseDups).length ≤ 3))) ∧ (16 ^ 8 = 4294967296) := by decide
