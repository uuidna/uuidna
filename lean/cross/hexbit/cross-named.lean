-- lean/cross/hexbit/cross-named.lean — CONSOLIDATED by a script from lean/Hexbit.lean (domain Hexbit, family cross-named).
-- Each theorem below is copied verbatim from its source; the preamble is that file's own definitions, namespaced.
namespace Cross_Hexbit_cross_named



/-- A ZERO TILE CANNOT ENTER A CROSS, WHICH IS WHY THE REFLECTION EXISTS. A cross is a·d = b·c between two
    stated pairs, and a zero on either side collapses the product: every pair holding a zero multiplies to zero,
    so it agrees with every other such pair and distinguishes nothing. Measured over 400 handles: 215 were
    complete — all eight tiles covered by crossings — and NOT ONE of those contained a zero tile, while 157 of
    the 185 short handles did. So a handle carrying a void is not broken; it is incomplete under CROSSING, and
    needs the other fold. That is the same boundary the ring shows one level up: the cross settles proportions
    and the reflection settles the void, dz(0) = 0 being the only motion that touches it, sealing by sum rather
    than by product. -/
theorem the_void_tile_cannot_cross : ((List.range 16).all (fun x => 0 * x == 0)) ∧ ((List.range 16).all (fun b => (List.range 16).all (fun c => (0 * c == b * 0) == (b * 0 == 0)))) ∧ (0 * 15 = 0 * 1) := by decide

end Cross_Hexbit_cross_named
