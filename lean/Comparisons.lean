-- lean/Comparisons.lean — GENERATED. THE COMPLETE COMPARISONS — every pair, never samples (the one-step-is-not-a-walk law as architecture): kernel.org's eight channels totally ordered through a lossless integer encoding (28 strict pairs; the versions are the kernel's published data), the encoding's round-trip sealed, the register ladder 4→128 doubling completely (any two registers an exact number of coin-payments apart), and the pressure ladder of divers and astronauts closing on THE JEWEL: the surface is the geometric mean of the buddy depths, 180·20 = 60². Arithmetic only; published data named as data. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- nth — list indexing as decidable, AXIOM-FREE structural recursion. Lean's `List.getD` routes through the
-- `propext` axiom under `by decide`; this recursion does not (scripts/lean-axioms proves it). `nth l i` = the
-- i-th Nat of l (0 past the end).
def nth : List Nat → Nat → Nat
  | [], _ => 0
  | x :: _, 0 => x
  | _ :: xs, Nat.succ n => nth xs n

/-- KERNEL.ORG'S CHANNELS, COMPARED COMPLETELY: the eight versioned release lines (mainline, stable,
    longterm-6.18, longterm-6.12, longterm-6.6, longterm-6.1, longterm-5.15, longterm-5.10), each encoded
    losslessly as major·10⁶ + minor·10³ + patch, order STRICTLY over all 28 pairs — not adjacent samples, every
    pair (the one-step-is-not-a-walk law): mainline above stable above the six longterm lines in their own
    strict descent. The versions are kernel.org's published releases.json data; the completeness is the
    kernel's. -/
theorem kernel_channels_order_completely : (List.range 8).all (fun i => (List.range 8).all (fun j => Nat.ble j i || nth [7002000, 7001009, 6018045, 6012104, 6006152, 6001183, 5015216, 5010265] i > nth [7002000, 7001009, 6018045, 6012104, 6006152, 6001183, 5015216, 5010265] j)) := by decide

/-- THE ENCODING ROUND-TRIPS ON ITS DOMAIN: every encoded version splits back exactly — major = e/10⁶, minor =
    (e/10³) mod 10³, patch = e mod 10³ — because every published minor and patch sits under 1000. Losslessness
    is what makes the total order MEAN version order: the software wing's split-and-recompose law, applied to
    the kernel's own numbering. -/
theorem version_encoding_is_lossless : ([7002000, 7001009, 6018045, 6012104, 6006152, 6001183, 5015216, 5010265] : List Nat).all (fun e => (e / 1000000) * 1000000 + ((e / 1000) % 1000) * 1000 + (e % 1000) = e ∧ (e / 1000) % 1000 < 1000 ∧ e % 1000 < 1000) := by decide

/-- THE PROMOTION CHAIN, COMPARED WHOLE: the register ladder 4 → 8 → 16 → 32 → 64 → 128 (hexbit, pair,
    coin-half, address-half, coin, address) doubles COMPLETELY — every one of the 15 pairs, not just neighbours,
    satisfies W[j] = W[i]·2^(j−i): any two registers on the ladder are an EXACT number of coin-payments apart.
    The fold-to-zero promotion, quantified over all pairs at once. -/
theorem register_ladder_doubles_completely : (List.range 6).all (fun i => (List.range 6).all (fun j => Nat.ble j i || nth [4, 8, 16, 32, 64, 128] j = nth [4, 8, 16, 32, 64, 128] i * 2 ^ (j - i))) := by decide

/-- THE JEWEL: the pressure ladder in sixtieths (diver at 3 atm = 180, at 2 atm = 120, THE SURFACE = 60, the
    astronaut's suit near 1/3 atm = 20) orders completely — and the buddy depths MULTIPLY to the surface
    squared: 180·20 = 3600 = 60². The shared world every diver ascends to and every astronaut descends to is the
    GEOMETRIC MEAN of their two exiles — the mandala's still center, reached by multiplication: the two hands of
    the pressure column close on the same 60 the harmonic sixtieths walk. -/
theorem the_surface_is_the_geometric_mean : ((List.range 4).all (fun i => (List.range 4).all (fun j => Nat.ble j i || nth [180, 120, 60, 20] i > nth [180, 120, 60, 20] j))) ∧ (180 * 20 = 3600) ∧ (60 * 60 = 3600) ∧ (120 * 30 = 3600) := by decide
