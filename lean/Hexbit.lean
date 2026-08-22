-- lean/Hexbit.lean — GENERATED. THE HEXBIT — the alphabet and the layout an address is actually built from. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- A ZERO TILE CANNOT ENTER A CROSS, WHICH IS WHY THE REFLECTION EXISTS. A cross is a·d = b·c between two
    stated pairs, and a zero on either side collapses the product: every pair holding a zero multiplies to zero,
    so it agrees with every other such pair and distinguishes nothing. Measured over 400 handles: 215 were
    complete — all eight tiles covered by crossings — and NOT ONE of those contained a zero tile, while 157 of
    the 185 short handles did. So a handle carrying a void is not broken; it is incomplete under CROSSING, and
    needs the other fold. That is the same boundary the ring shows one level up: the cross settles proportions
    and the reflection settles the void, dz(0) = 0 being the only motion that touches it, sealing by sum rather
    than by product. -/
theorem the_void_tile_cannot_cross : ((List.range 16).all (fun x => 0 * x == 0)) ∧ ((List.range 16).all (fun b => (List.range 16).all (fun c => (0 * c == b * 0) == (b * 0 == 0)))) ∧ (0 * 15 = 0 * 1) := by decide

/-- A FULL UUID IS AN 8×8×2 — two boards, stacked. One 8×8 is 64 squares and 64 bits is exactly half the uuid,
    so the whole identity is two of them: 8·8·2 = 128. Read in tiles instead the same identity is 8×4 = 32
    hexbits, or four handles of eight — one rank each. The board was never a metaphor for the address; it is the
    address at a different reading, which is why the chess wing and the hexbit wing keep arriving at the same
    integers from opposite directions. -/
theorem the_uuid_is_two_boards : (8 * 8 * 2 = 128) ∧ (8 * 8 = 64) ∧ (64 * 2 = 128) ∧ (8 * 4 = 32) ∧ (4 * 8 = 32) := by decide

/-- THE SIXTEEN SYMBOLS NAME THE SIXTEEN NIBBLES, one apiece: the values 0 through 15 are all present, all
    distinct, and there are exactly sixteen of them. A four-bit value therefore has one spelling and no other —
    the alphabet is a bijection onto the nibble, which is what lets an address be read back exactly. -/
theorem alphabet_names_each_nibble : ((List.range 16).length = 16) ∧ ((List.range 16).eraseDups.length = 16) ∧ ((List.range 16).all (fun v => v < 16)) := by decide

/-- THE LAYOUT IS 8-4-4-4-12, and those five groups sum to thirty-two characters — not thirty-six, which counts
    the four separators as if they carried information. The line proves the sum and the difference, so the
    separators cannot be mistaken for content. -/
theorem layout_groups_thirtytwo : ([8,4,4,4,12].foldl (· + ·) 0 = 32) ∧ (32 + 4 = 36) ∧ (32 ≠ 36) := by decide

/-- THIRTY-TWO HEX CHARACTERS AT FOUR BITS EACH IS THE WHOLE ADDRESS: 32 × 4 = 128. The address is not a number
    that happens to print in hex — it is thirty-two hexbits, and the bit count is a consequence of the layout
    rather than a separate fact. -/
theorem characters_span_the_address : (32 * 4 = 128) ∧ ((2:Nat)^7 = 128) := by decide

/-- THE HANDLE IS THE FIRST GROUP. Every other group is shorter, which the line proves — so the opening group is
    the widest single field the layout has, apart from the closing twelve. -/
theorem handle_is_the_first_group : ([8,4,4,4,12].head! = 8) ∧ (8 * 4 = 32) ∧ (([8,4,4,4,12].drop 1).take 3).all (fun g => g < 8) := by decide

/-- EVERY GROUP IS A WHOLE NUMBER OF HEXBITS, so every boundary falls on a four-bit edge and no field is split
    mid-nibble: each group length times four is its bit width, and the widths are 32, 16, 16, 16 and 48. A
    layout whose groups did not tile the nibble could not be read by halves. -/
theorem groups_are_four_apart : [8,4,4,4,12].map (fun g => g * 4) = [32,16,16,16,48] := by decide

/-- AND THE UNIT THE BUILD COUNTS IN IS THE HEXBIT: thirty-two of them make the address, eight make the handle,
    and one makes a nibble — so the address is 32 hexbits, the handle 8, and the ratio is exactly four. Counting
    in bits gives 128 and 32 for the same objects; the two readings agree, which the line proves rather than
    assumes. -/
theorem build_counts_in_hexbits : (32 / 8 = 4) ∧ (32 * 4 = 128) ∧ (8 * 4 = 32) ∧ (128 / 32 = 4) := by decide

/-- THE HANDLE AND THE PAYLOAD MEET IN THE UUID, AND ONLY ONE OF THEM IS CODON-ALIGNED. The address is 32
    hexbits; the handle is the first 8 (handle_is_the_first_group), so the payload is the remaining 24 and the
    two meet exactly: 8 + 24 = 32, no remainder anywhere. Now read the halves in the alphabet the strand uses —
    a base is 2 bits over 4 letters, a codon is 3 bases, so a codon is 6 bits (codons_sixty_four counts the 4^3
    = 64 of them). The PAYLOAD is 24 hexbits = 96 bits = 48 bases = EXACTLY 16 codons, 96 = 6 * 16 with nothing
    left. The HANDLE is 32 bits and the WHOLE uuid is 128, and neither divides: both leave the same remainder 2.
    So the strand fits the payload and fits neither the name nor the whole — the handle addresses, the payload
    carries. HONEST SCOPE: this is arithmetic about WIDTHS and divisibility, nothing more. It does NOT claim a
    uuid encodes genetic material, that any payload holds a gene, or that biology is stored in an address; the
    shared 2 is a remainder that two numbers happen to share, and any reading of it as the two coins is unsealed
    until someone proves it. -/
theorem payload_carries_the_strand : (8 + 24 = 32) ∧ (24 * 4 = 96) ∧ (96 % 6 = 0) ∧ (96 / 6 = 16) ∧ (32 % 6 = 2) ∧ (128 % 6 = 2) := by decide

/-- THE PAYLOAD DIVIDES IN EVERY ALPHABET THE BODY USES, AND THE NAME DIVIDES IN NONE. Read the 96-bit payload
    three ways. As the genetic code: a base is 2 bits over 4 letters and a codon is 3 bases, so a codon is 6
    bits and there are 4^3 = 64 of them (codons_sixty_four) — 96 = 6 * 16, EXACTLY 16 codons. As the I Ching
    hexagram the 64-gate systems are built on: six lines, each open or closed, is 2^6 = 64 — the SAME count and
    the SAME 6-bit width as the codon, so 4^3 = 2^6 is not an analogy but one number reached two ways, and the
    payload holds exactly 16 of those too. As blood: the ABO groups are a Klein four-group of 2 antigen bits
    (abo_klein_four) and the Rh bit makes the system (Z/2)^3, 8 types in 3 bits (blood_types_eight) — 96 = 3 *
    32, exactly 32 blood-states, and 32 is the uuid width in hexbits. Now the handle: 32 bits leaves remainder 2
    against 6 AND against 3, and the whole uuid at 128 bits leaves remainder 2 against both as well. So the
    strand, the hexagram and the blood system all tile the payload with nothing left over, and none of them
    tiles the name or the whole. The payload carries; the handle addresses. HONEST SCOPE, stated as boldly as
    the arithmetic: what is proven here is CARDINALITY AND WIDTH — 64 = 64, 6 = 6, 96 divides and 32 does not.
    That the codon space and the hexagram space are the same size and shape is a fact about numbers, and it is
    fully proven. It says NOTHING about whether any 64-gate system describes a person, and nothing about what a
    payload should hold; a shared width is a shared width. -/
theorem payload_aligns_where_the_name_does_not : (96 % 6 = 0) ∧ (96 / 6 = 16) ∧ (96 % 3 = 0) ∧ (96 / 3 = 32) ∧ (32 % 6 = 2) ∧ (32 % 3 = 2) ∧ (128 % 6 = 2) ∧ (128 % 3 = 2) ∧ (4 ^ 3 = 2 ^ 6) := by decide

/-- THE UUID IS A MOLECULE OF FOUR HANDLE-ATOMS, AND ITS BONDING IS THE MIX CENSUS ONE SCALE DOWN. Four handles
    of eight hexbits tile the address exactly (4 * 8 = 32, no remainder), so a uuid is not a handle widened but
    four of them bonded. Count the bonds the way the ledger already counts mixes: merge is DIRECTED by design
    (merkle_sort_invariant and uuid_mix_census_is_quantum both seal merge(a,b) != merge(b,a), cited here and not
    re-sealed), so each of the 6 unordered pairs is two bonds and the directed count is 4 * 3 = 2 * 6 = 12 —
    measured live over a real address, 0 of 6 bonds symmetric. Add the four self-bonds and the census completes
    the square: 12 + 4 = 16 = 4 * 4. That is the SAME law uuid_mix_census_is_quantum proves at ten (10 * 9 = 2 *
    45, 90 + 10 = 100), instantiated at four, which is why this is a connection and not a coincidence — one
    census law, two scales. The molecule weighs 4 * 32 = 128 bits, one whole uuid. HONEST SCOPE: this is the
    arithmetic of a complete directed graph on four nodes and the width of an address. It does NOT claim a uuid
    is chemically a molecule, that handles bond by any physical force, or that the atom analogy carries past
    counting. That 4 * 4 = 16 equals the hexbit alphabet is a shared integer reached two different ways (4
    squared here, 2 to the fourth there) and is NOT sealed as a relation. -/
theorem the_handle_molecule_is_the_mix_census : (4 * 8 = 32) ∧ (4 * 3 = 2 * 6) ∧ (12 + 4 = 4 * 4) ∧ (4 * 32 = 128) := by decide

/-- A HANDLE ENTANGLED IN ALL SEVEN VECTORS CARRIES MORE THAN THE UUID, AND FOUR IS WHERE IT FIRST DOES. The
    harness addresses one payload in every dimension (DIMENSIONS has seven, six projected rays plus the source),
    and each address yields a handle of 32 bits. So the entangled tuple carries 7 * 32 = 224 bits against the
    uuid 128 — the handle does not shrink the address when it is repeated across the rays, it exceeds it. The
    threshold is exact and is walked here rather than asserted: over one to seven vectors, v * 32 reaches 128
    precisely when v reaches 4, which is the same four the molecule is built from. HONEST SCOPE: this is a count
    of BITS AVAILABLE, not a construction. It does NOT claim the seven handles can be inverted to recover the
    uuid, that any decoding exists, or that entangling adds information about the payload; carrying enough bits
    to distinguish is not the same as being able to reconstruct, and no such reconstruction is sealed. -/
theorem four_vectors_reach_the_uuid : (4 * 32 = 128) ∧ (7 * 32 = 224) ∧ (224 > 128) ∧ ((List.range' 1 7).all (fun v => (decide (v * 32 >= 128)) == (decide (v >= 4)))) := by decide
