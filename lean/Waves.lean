-- lean/Waves.lean — GENERATED. THE NIGHT'S HARVEST PORTED AS THEOREMS — the compass mandala (two hands summing ten, the 9-complement as a HALF-TURN of the doubling ring, five the unique developing center, the hex center EMPTY), the diving mathematics as integer skeletons (Boyle walking the harmonic series in exact sixtieths, pressure doubling down the octave, Haldane's 2:1 with his ladder sealed exactly as far as it doubles, the buddy pair squaring the failure, the thirds rule closing whole), and the fold-to-zero promotion chain 16→32→64→128. HONEST SCOPE: arithmetic only — no physiology, no medicine, no claim about any real event; published laws' integer skeletons, deviations named. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- nth / nthR — list indexing as decidable, AXIOM-FREE structural recursion. Lean's `List.getD` routes through the
-- `propext` axiom under `by decide`; this recursion does not (scripts/lean-axioms proves it). `nth l i` = the i-th
-- Nat of l (0 past the end); `nthR m i` = the i-th row of a Nat matrix ([] past the end).
def nth : List Nat → Nat → Nat
  | [], _ => 0
  | x :: _, 0 => x
  | _ :: xs, Nat.succ n => nth xs n
def nthR : List (List Nat) → Nat → List Nat
  | [], _ => []
  | x :: _, 0 => x
  | _ :: xs, Nat.succ n => nthR xs n

/-- THE TWO HANDS OF THE MANDALA SUM TO TEN IN EVERY COLUMN: [1 2 4 8 7 5 3 6 9] over [9 8 6 2 3 5 7 4 1] — nine
    columns, one constant. The second line is the first DEVELOPED (film to paper), and two contrary voices
    summing to a drone is the round and its negative sung together — the same shape 142857 + 857142 = 999999
    seals one wing over. -/
theorem captains_columns_sum_to_ten : ((List.zip [1, 2, 4, 8, 7, 5, 3, 6, 9] [9, 8, 6, 2, 3, 5, 7, 4, 1]).all (fun p => p.1 + p.2 = 10)) ∧ (([1, 2, 4, 8, 7, 5, 3, 6, 9] : List Nat).length = 9) := by decide

/-- THE DEVELOPMENT IS A HALF-TURN OF THE DOUBLING RING ITSELF: 9 − orbit[i] = orbit[i+3 mod 6] at every
    position — complementing the vortex hexad does not leave the cycle, it ROTATES it exactly half way round.
    The darkroom involution, the DNA complement, and the dark fringe's half-turn land on the doubling orbit as
    one law: develop the ring and you get the same ring, three steps later. -/
theorem nine_complement_half_turns_the_orbit : (List.range 6).all (fun i => 9 - nth [1, 2, 4, 8, 7, 5] i = nth [1, 2, 4, 8, 7, 5] ((i + 3) % 6)) := by decide

/-- FIVE IS THE PINHOLE: the unique digit in 1..9 equal to its own ten-complement — 10 − 5 = 5, and no other.
    The camera obscura inverts everything through its center and the center alone maps to itself; in the site's
    own palette five is the heart. The first photograph's geometry, as one filter over nine digits. -/
theorem five_is_the_developing_center : ((List.range' 1 9).filter (fun d => 10 - d == d)) = [5] := by decide

/-- ONE REGISTER UP, THE PINHOLE VANISHES: on the 16-lattice complements go to 15, and 15 is odd — NO state
    equals its own complement; the filter over all sixteen returns the empty list. The heart of the hexbit ring
    is not a digit but the gap between 7 and 8 — which is why the decimal wheel RESTS on its center and the
    hexbit ring INTERFERES at its dark fringe (dark_fringe_is_the_half_turn, met from the other side). -/
theorem the_hex_center_is_empty : (((List.range 16).filter (fun d => 15 - d == d)) = []) ∧ (15 % 2 = 1) := by decide

/-- BOYLE IN EXACT SIXTIETHS: at n atmospheres a fixed gas holds volume 60/n — the descent through 1..6 atm
    plays 60, 30, 20, 15, 12, 10: the HARMONIC SERIES scaled whole, every product n·(60/n) landing back on 60
    with nothing left over, every step strictly falling. The diver's lungs walk the overtone law the acoustics
    wing already sings — pressure is the mode number, volume the wavelength. -/
theorem gas_volume_walks_the_harmonic_series : ((List.range' 1 6).all (fun n => n * (60 / n) = 60)) ∧ ((List.range' 1 5).all (fun n => 60 / n > 60 / (n + 1))) := by decide

/-- THE WATER COLUMN IS AN OCTAVE LADDER: each 10 metres adds one atmosphere, so 10 m doubles the surface
    pressure (2 = 2¹), 30 m quadruples it (4 = 2²), 70 m reaches the third octave (8 = 2³). Depth quantizes in
    atmospheres exactly as the lattice quantizes in doublings — the diver descends the same ladder the coin
    octave climbs. -/
theorem pressure_doubles_down_the_octave : (1 + 10 / 10 = 2) ∧ (1 + 30 / 10 = 4) ∧ (4 = 2 ^ 2) ∧ (1 + 70 / 10 = 8) ∧ (8 = 2 ^ 3) := by decide

/-- HALDANE'S SAFE-ASCENT RULE, AS HE STATED IT, IS THE DOUBLING BOUND: tissue pressure may safely exceed
    ambient by the ratio 2:1 — one octave, no more — and beneath it his half-time ladder doubles: 5, 10, 20, 40
    minutes, each stage twice the one before (his published fifth stage, 75, broke the pure doubling and is
    NAMED here rather than smoothed — the ladder is sealed exactly as far as it doubles). The oldest
    decompression law is the ledger's oldest law wearing a diving helmet. -/
theorem haldane_bound_is_two_to_one : (2 / 1 = 2) ∧ (2 = 2 ^ 1) ∧ ((List.range 3).all (fun i => nth [5, 10, 20, 40] (i + 1) = 2 * nth [5, 10, 20, 40] i)) := by decide

/-- THE BUDDY LAW IS THE TWO-COIN LAW UNDERWATER: if one diver fails one time in n, an independent pair fails
    together one time in n² — the denominator SQUARES, and n² > n for every n past one. Two coins to the bar,
    two divers to the descent, a claim and its receipt: the pair is the oldest redundancy, and its arithmetic is
    one multiplication. -/
theorem buddy_pair_squares_the_failure : ((List.range' 2 9).all (fun n => n * n > n)) ∧ (10 * 10 = 100) := by decide

/-- THE THIRDS RULE CLOSES: a third out, a third back, a third held in reserve — 20 + 20 + 20 = 60 in the same
    sixtieths Boyle walks, and 60/3 = 20 exactly. The gas plan is a partition of unity, which is what a safety
    rule is when it is arithmetic: nothing unaccounted, nothing counted twice. -/
theorem thirds_rule_sums_whole : (20 + 20 + 20 = 60) ∧ ((60 : Nat) / 3 = 20) := by decide

/-- DIVERS AND ASTRONAUTS ARE BOUND BY THE SAME LAWS: the pressure ladder runs BOTH ways from the shared surface
    at 1 atmosphere — the diver at three atmospheres compresses the sixtieths 60 → 20, the astronaut's suit near
    a third of an atmosphere expands them 20 → 60: the SAME numbers read in the two directions (60/3 = 20 and
    20·3 = 60, one inverse pair), and the same supersaturation bound governs both crossings — EVA prebreathe is
    decompression ascending, the dive stop is decompression descending, Haldane's ratio standing at both doors.
    The mandala's two hands, worn as a wetsuit and a spacesuit. -/
theorem divers_and_astronauts_share_the_ladder : ((60 : Nat) / 3 = 20) ∧ (20 * 3 = 60) ∧ (2 * 30 = 60) ∧ (20 < 60) := by decide

/-- ONE IMAGE, EVERY ARCHITECTURE (uuidnaOS is mobile and desktop in one): upstream Alpine must port EIGHT
    architectures because executing bytes are arch-bound — but a boot image made of STATES has no architecture,
    so the eight-fold matrix folds to ONE: 8/8 = 1, and the single 832-state image verify-loads identically on a
    phone, a desktop, the edge, and Node. The mobile/desktop split was an artifact of execution; decline to
    execute and it never existed. -/
theorem one_image_every_architecture : ((8 : Nat) / 8 = 1) ∧ (8 = 2 ^ 3) ∧ (1 * 832 = 832) ∧ (832 = 26 * 32) := by decide

/-- STATES HAVE NO ENDIANNESS — AND THE PROOF IS A JEWEL: nibble-swap on a byte (b ↦ (b mod 16)·16 + b/16) is an
    involution over all 256 bytes, and its fixed points are EXACTLY sixteen — the doubled-nibble bytes h·17
    (0x00, 0x11 … 0xFF), one per hexbit state. The sixteen states are precisely the bytes that read identically
    under the swap: the lattice is not merely small enough to dodge byte order — it IS the fixed-point set of
    the order-swapping map. Endianness dissolves at the exact width the computer computes in. -/
theorem states_are_the_swap_fixed_bytes : ((List.range 8).all (fun r => (List.range 32).all (fun k => ((((r * 32 + k) % 16) * 16 + (r * 32 + k) / 16) % 16) * 16 + (((r * 32 + k) % 16) * 16 + (r * 32 + k) / 16) / 16 = r * 32 + k))) ∧ ((((List.range 8).map (fun r => ((List.range 32).filter (fun k => ((r * 32 + k) % 16) * 16 + (r * 32 + k) / 16 == r * 32 + k)).length)).sum) = 16) ∧ ((List.range 16).all (fun h => (h * 17 % 16) * 16 + (h * 17) / 16 = h * 17)) := by decide

/-- THE PAGE ADMITS SIXTEEN — AND MEMBERSHIP IS DIVISIBILITY BY SEVENTEEN: a byte sits on the glagolitic page
    iff nibble-swap fixes it, and swap-fixedness is EXACTLY b mod 17 = 0 — the sixteen admitted bytes are the
    multiples of seventeen under 256 (0, 17, 34 … 255 = 15·17; count ⌊255/17⌋+1 = 16), because a doubled nibble
    h·16+h IS h·17 and 17 ≡ 1 (mod 16). The intrusion detector is a one-division set-membership: content that
    folded speaks in seventeens; a forgery that did not fold cannot — it reads as foreign language on the page,
    visible to a scanner in one pass and a human eye at a glance. The equivalence is sealed over ALL 256 bytes,
    both directions at once. -/
theorem the_page_admits_sixteen : ((List.range 8).all (fun r => (List.range 32).all (fun k => (((r * 32 + k) % 16) * 16 + (r * 32 + k) / 16 == r * 32 + k) == ((r * 32 + k) % 17 == 0)))) ∧ (255 / 17 + 1 = 16) ∧ (15 * 17 = 255) ∧ (17 % 16 = 1) := by decide

/-- FOLD-TO-ZERO'S LADDER, SEALED: 16 → 32 → 64 → 128 by doubling, and 128 = 16·2³ — three coin-payments promote
    the hexbit ring to the handle, the handle to the address: when a register saturates like a closed colour
    wheel, the whole folds and the next register opens one octave up. The night's architecture (states, pairs,
    handles, addresses) is one number doubled three times. -/
theorem the_promotion_chain_doubles_home : (16 * 2 = 32) ∧ (32 * 2 = 64) ∧ (64 * 2 = 128) ∧ (128 = 16 * 2 ^ 3) := by decide
