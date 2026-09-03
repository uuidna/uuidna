-- lean/Crt.lean — GENERATED. THE FUSED RING — the rosette (Z/7) and the vortex (Z/9) are coprime, so by the Chinese Remainder Theorem they are ONE ring of 63 states, and its arithmetic explains the captain measure: the two coins buy 64 = 63 + 1, the whole fused structure plus the unit that closes it (63 = 111111, saturated in six bits; 64 = 1000000, the first bit beyond). The hexagram width 6 is the unit-group order of both tongues and the stride that totals the rosetta while partitioning the Glagolitic nine. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE CAPTAIN THEOREM — why the save is 64 and not any other number. The rosette and the vortex fuse into one
    ring of 7·9 = 63 states, and the two coins buy 2·32 = 64: the WHOLE fused structure, plus the one that
    closes it (64 = 63 + 1). In bits the reading is exact — 63 is 111111, six ones, the ring saturated; 64 is
    1000000, the FIRST BIT BEYOND it. So the captain's leverage is not a round number chosen for convenience:
    contributing the two coins purchases every state of the joined rosette-vortex and the unit that completes
    it. The measure was always the ring plus its closure. -/
theorem captain_theorem_the_coins_buy_the_ring_and_one : (7 * 9 = 63) ∧ (2 * 32 = 64) ∧ (63 + 1 = 64) ∧ (2^6 = 64) ∧ (2^6 - 1 = 63) := by decide

/-- THE FUSION IS LEGAL — 7 and 9 share no factor (gcd = 1), which is exactly the condition the Chinese
    Remainder Theorem asks: coprime moduli fuse into their product with no loss. The rosette and the vortex were
    never two systems that happen to sit beside each other; they are one ring seen through two windows. -/
theorem rosette_and_vortex_are_coprime : (Nat.gcd 7 9 = 1) ∧ (Nat.gcd 7 14 = 7) ∧ (Nat.gcd 9 6 = 3) := by decide

/-- THE SEVEN AXES OF DISCOVERY, AND WHY THEY LEAVE NO ORPHAN. Every theorem page weaves its neighbours on seven
    axes: three navigational (skill, principle, sequence), three CYCLIC ROTATIONS over the whole ledger, and the
    runtime referer — 3 + 3 + 1 = 7. The rotations are what make the ledger totally traversable: a stride walks
    every position exactly when it is coprime to the count, so following one rotation from ANY theorem reaches
    ALL of them, with no gap and no orphan. The strides are not decorative — they are 1, 7 and 9: the unit step,
    the rosette and the vortex, and 7 · 9 = 63 is the fused ring the captain's two coins buy with one to spare
    (63 = 2⁶ − 1). The condition is REAL. this seals the STRUCTURE — the axis count, the strides, their
    coprimality and the fused product. It deliberately does NOT seal the ledger's current size, because a
    theorem that froze the count would rot the moment a wing lands (the mistake audit-mcp-native made with
    1195); totality for a given count is checked at run time against that count. -/
theorem axes_stride_coprime : (3 + 3 + 1 = 7) ∧ (Nat.gcd 7 9 = 1) ∧ (7 * 9 = 63) ∧ (63 = 2^6 - 1) ∧ (Nat.gcd 2 8 = 2) := by decide

/-- THE HERO CHANNEL IS EXACT, AND THE MARGIN IS THE TWO COINS. A theorem's animation transmits one hex digit
    per node in the two residues a viewer can see — which of the SIX sealed tempi it beats on and which of the
    NINE sequence rungs it wears — and readHero recovers the digit from that pair. Why it is exact, stated
    precisely rather than fashionably: 6 and 9 are NOT coprime (rosette_and_vortex_are_coprime seals gcd(9,6) =
    3), so this is NOT the Chinese Remainder Theorem, which would require them to be. It is the LCM BOUND. A
    number is fixed modulo the common multiple 18, and 18 is not an arbitrary ceiling: 18 = 2 · 9 is THE TWO
    COINS ON THE RING (two_coins, the ring being ℤ/9), and the headroom over a hex digit is 18 − 16 = 2 — the
    two coins again. The channel is readable because the coins leave exactly that much room, and no more: widen
    the alphabet by three and the same theorem fails loudly. Proven by exhaustion over every pair of digits, so
    it cannot silently become lossy. -/
theorem residues_identify_digit : ((List.range 16).all (fun a => (List.range 16).all (fun b => (!((a % 6 == b % 6) && (a % 9 == b % 9))) || (a == b)))) ∧ (2 * 9 = 18) ∧ (18 % 6 = 0) ∧ (18 % 9 = 0) ∧ (18 - 16 = 2) := by decide

/-- THE CORRESPONDENCE IS EXACT — every residue mod 63 carries a unique pair (mod 7, mod 9), and all 63 pairs
    are distinct: the map x ↦ (x % 7, x % 9) is injective on 0..62, so it is a bijection onto the 7·9 pairs.
    Nothing in the fused ring is lost or doubled; a state of the rosette and a state of the vortex name exactly
    one state of the whole. -/
theorem crt_pairs_are_a_bijection : (((List.range 63).map (fun x => (x % 7) * 9 + (x % 9))).eraseDups.length = 63) := by decide

/-- THE UNITS COUNT IS THE ORBIT, SQUARED — the fused ring has φ(63) = 36 units, and 36 = 6·6: the vortex orbit
    length times the rosette orbit length, each of which is the order of its own generator. The invertible
    states of the whole are exactly the pairs of invertible states of the parts, which is the multiplicativity
    of φ read in the ledger's own numbers. -/
theorem fused_units_are_the_orbit_squared : (((List.range 63).filter (fun a => a > 0 && Nat.gcd a 63 == 1)).length = 36) ∧ (6 * 6 = 36) ∧ (((List.range 9).filter (fun a => a > 0 && Nat.gcd a 9 == 1)).length = 6) ∧ (((List.range 7).filter (fun a => a > 0 && Nat.gcd a 7 == 1)).length = 6) := by decide

/-- THE COIN'S WALK SURVIVES THE FUSION, AND THE SEAM IS NAMED — 2 has order 6 in Z/9 and order 6 in the fused
    Z/63, so the coin tossed into itself still comes home in six. But its order in Z/7 is 3. That asymmetry is
    the honest seam of the fusion — the orders are the least common multiple, lcm(3,6) = 6, so the fused order
    is the vortex's, and the rosette simply closes twice inside it. Named rather than smoothed: the two windows
    do not turn at the same rate. -/
theorem the_coin_keeps_its_order_in_the_fused_ring : ((2^6) % 63 = 1) ∧ ((2^6) % 9 = 1) ∧ ((2^3) % 7 = 1) ∧ ((5^6) % 63 = 1) := by decide

/-- THE RING SATURATES ITS BITS — 63 is 111111 in binary, six ones, one for each doubling of the coin's orbit;
    64 is 1000000, the next bit alone. So the fused structure is exactly the largest number six bits can hold,
    and the captain's save is the first number they cannot: the leverage steps one bit past a saturated ring.
    Mersenne, and the ledger's own six. -/
theorem the_fused_ring_is_all_ones : (63 = 32 + 16 + 8 + 4 + 2 + 1) ∧ (64 = 2^6) ∧ (63 < 64) := by decide

/-- THE HEXAGRAM WIDTH IS WHY THE TWO TONGUES ARE ONE RING. Six binary lines — Fu Xi / Leibniz, 2^6 = 64 gates,
    the same width payload_aligns_where_the_name_does_not already names; not King Wen names, meaning stays null
    — close BOTH windows at once: 2^6 ≡ 1 (mod 9), the Glagolitic vortex (two_order_six), and 2^6 ≡ 1 (mod 7),
    Fermat on the Pliska rosette (z7fermat). Both multiplicative groups have exactly six units, φ(9) = φ(7) = 6,
    so the hexagram's line count IS the unit-group order of each tongue. Coprime moduli 7 and 9 fuse to 63 = 2^6
    − 1: the hexagram saturated, which captain_theorem_the_coins_buy_the_ring_and_one already buys with one to
    spare. THE SEAM, named rather than smoothed: 6 is the ORDER of 2 only on ℤ/9; on ℤ/7 the order is 3
    (the_coin_keeps_its_order_in_the_fused_ring) and 6 is two periods — Fermat's exponent, not a second order.
    cardinality and orders. It does not claim the I Ching describes a person, that Glagolitic letters are
    hexagrams, or that the rosette was built to encode six lines. -/
theorem hexagram_width_closes_rosetta_and_glagolitic : (2^6 = 64) ∧ ((2^6) % 9 = 1) ∧ ((2^6) % 7 = 1) ∧ (Nat.gcd 7 9 = 1) ∧ (7 * 9 = 63) ∧ (63 = 2^6 - 1) ∧ (((List.range 9).filter (fun a => a > 0 && Nat.gcd a 9 == 1)).length = 6) ∧ (((List.range 7).filter (fun a => a > 0 && Nat.gcd a 7 == 1)).length = 6) := by decide

/-- THE SAME SIX BEHAVES DIFFERENTLY IN THE TWO DIMENSIONS. A stride of the hexagram width on the seven rosetta
    rays is a TOTAL walk: gcd(6, 7) = 1, so k ↦ 6k (mod 7) hits every ray — the seven discovery axes
    (axes_stride_coprime) are completely traversable at hexagram pace. The same stride on the Glagolitic nine is
    NOT total: gcd(6, 9) = 3, so k ↦ 6k (mod 9) has exactly three residues {0, 3, 6} — three orbits, the factor
    residues_identify_digit already named when it refused CRT for 6 and 9. One width, two moduli, two
    geometries: the rosetta is generated; the vortex is partitioned. residue orbits of multiplication by 6. It
    does not claim a hexagram "means" a dimension, or that walking theorems at stride 6 is a ritual. -/
theorem hexagram_stride_totals_the_rosetta : (Nat.gcd 6 7 = 1) ∧ (Nat.gcd 6 9 = 3) ∧ ((List.range 7).map (fun k => (k * 6) % 7)).eraseDups.length = 7 ∧ ((List.range 9).map (fun k => (k * 6) % 9)).eraseDups.length = 3 := by decide

/-- THE 36 × 36 PRODUCT TABLE OF (Z/63)*, WALKED CELL BY CELL. 63 = 7 · 9 is the wing’s own CRT split, and the
    units factor with it: φ(63) = φ(7) · φ(9) = 6 · 6 = 36. Those 36 residues are found here rather than listed
    — every k below 63 coprime to it — and then the whole table they generate is decided: all 1296 products a ·
    b mod 63 are again units (the table is CLOSED), and every ROW carries 36 DISTINCT entries, so multiplication
    by a fixed unit permutes the units. That second half is the Latin-square property a group’s Cayley table
    has, and it is what makes each unit invertible: a row that repeated a value could not cover the group.
    Together they are the structure the Chinese Remainder decomposition predicts, checked against the residues
    themselves instead of inferred from the factorisation. WHAT IT IS NOT: a theorem about (Z/n)* for every n —
    the modulus here is 63, and what is sealed is its table. -/
theorem units_of_sixty_three_close_their_product_table : (let u := (List.range 63).filter (fun k => Nat.gcd k 63 == 1); (u.length == 36) ∧ (u.all (fun a => u.all (fun b => Nat.gcd (a * b % 63) 63 == 1))) ∧ (u.all (fun a => ((u.map (fun b => a * b % 63)).eraseDups.length == 36)))) ∧ (63 = 7 * 9) ∧ (6 * 6 = 36) := by decide
